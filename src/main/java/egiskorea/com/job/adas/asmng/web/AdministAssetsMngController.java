package egiskorea.com.job.adas.asmng.web;

import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.job.adas.asmng.service.AdministAssetsService;
import egiskorea.com.job.adas.asmng.service.AdministAssetsVO;
import egovframework.rte.fdl.property.EgovPropertyService;

/**
 * @Description 행정자산관리 Controller 클래스
 * @since 2023.05.24
 * @version 1.0
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.24   백승석            최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/job/adas/asmng")
public class AdministAssetsMngController {

	@Resource(name = "administAssetsService")
	private AdministAssetsService administAssetsService;
	
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;
	
	private static final Logger logger = LoggerFactory.getLogger(AdministAssetsMngController.class);
	
	private int dataCountForProgress = 0;
	
	public int getDataCountForProgress() {
		return dataCountForProgress;
	}

	public void setDataCountForProgress(int dataCountForProgress) {
		this.dataCountForProgress = dataCountForProgress;
	}
	
	/**
	 * 행정자산관리 목록 화면
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectAdministAssetsInfoListView.do")
	public String selectAdministAssetsMngList(
			ModelMap model) throws Exception {
		logger.info("selectAdministAssetsMngList.do");
		
		List<String> yearList = null;
		
		yearList = administAssetsService.selectAdministAssetsYearList();
		
		model.addAttribute("yearList", yearList);
		
		return "egiskorea/com/job/adas/asmng/selectAdministAssetsInfoList";
	}
	
	/**
	 * 등록 화면 호출
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertAdministAssets.do")
	public String insertAdministAssets(
//			AdministAssetsVO administAssetsVO,
//			ModelMap model
			) throws Exception {
		
		return "egiskorea/com/job/adas/asmng/insertAdministAssets";
	}
	
	/**
	 * 행정자산관리 목록 조회
	 * @param administAssetsVO
	 * @return
	 */
	@RequestMapping(value = "/selectAdministAssetsInfoList.do")
	@ResponseBody
	public ModelAndView selectAdministAssetsInfoList (AdministAssetsVO administAssetsVO) {
		ModelAndView mav = new ModelAndView("jsonView");
		
		List<AdministAssetsVO> resultList = null;
		int resultCount = 0;
		
		resultList = administAssetsService.selectAdministAssetsInfoList(administAssetsVO);
		resultCount = administAssetsService.selectAdministAssetsTotCnt();
		
		mav.addObject("resultList", resultList);
		mav.addObject("resultCount", resultCount);
		
		return mav;
	}
	
	@RequestMapping(value ="/insertAdministAssetsInfoCSV.do")
	@ResponseBody
	public ModelAndView insertAdministAssetsInfoCSV(HttpServletRequest request,
			MultipartHttpServletRequest mpRequest,
			AdministAssetsVO administAssetsVO) {
		ModelAndView mav = new ModelAndView("jsonView");
		
		String year = request.getParameter("year");
		
		MultipartFile file = mpRequest.getFile("fileUpload");
		
		List<AdministAssetsVO> administAssetsList = new ArrayList<AdministAssetsVO>();
		int result = 0;
		try {
			// 지정된 연도가 있으면 지우고 새로 업로드하기
			administAssetsVO.setYear(year);
			result = administAssetsService.deleteAdministAssetsInfo(administAssetsVO);
			administAssetsList = administAssetsService.csvUploadHelper(file, year);
			
			int dataCount = administAssetsList.size();
//			result += administAssetsService.csvUploadHelper(file, year);
			// 전역 변수
			setDataCountForProgress(dataCount);
			long startTime = System.currentTimeMillis();
			if (dataCount > 0) {
				if (dataCount > 10) {
					result = 0;
					int offset = 0;
					for (int i = 1; i <= (dataCount / 7); i++) {
						List<AdministAssetsVO> subList = new ArrayList<>();
						subList = administAssetsList.subList(offset, i * 7);
						result += administAssetsService.insertAdministAssetsInfoByCSV(subList);
						offset = i * 7;
					}
					if (offset != dataCount) {
						List<AdministAssetsVO> subList = new ArrayList<>();
						subList = administAssetsList.subList(offset, dataCount);
						// 끊고 남은 데이터
						result += administAssetsService.insertAdministAssetsInfoByCSV(subList);
					}
				} else {
					result = administAssetsService.insertAdministAssetsInfoByCSV(administAssetsList);
				}
			}
			long endTime = System.currentTimeMillis();
	        long resutTime = endTime - startTime;
	        System.out.println("트랜젝션 배치" + " 소요시간  : " + resutTime/1000 + "(ms)");
		} catch (FileNotFoundException e) {
			e.getMessage();
		} catch (SQLException e) {
			e.getMessage();
		} catch (Exception e) {
			e.getMessage();
		}
		
		// 변수 초기화
		setDataCountForProgress(0);
		
		if (result > 0) {
			mav.addObject("resultCd", result);
		} else {
			mav.addObject("resultCd", result);
		}
		
		mav.addObject("year", year);
		
		return mav;
	}
	
	@RequestMapping(value = "/csvUploadProgress.do")
	@ResponseBody
	public ModelAndView csvUploadprogress() {
		ModelAndView mav = new ModelAndView("jsonView");
		double currDataCount = 0;
		double totalDataCount = 0;
		double progress = 0;
		
		totalDataCount = (double) getDataCountForProgress();
		currDataCount = (double) administAssetsService.selectAdministAssetsTotCnt();
		
		progress = Math.floor((currDataCount / totalDataCount) * 100);
		
		mav.addObject("progress", progress);
		mav.addObject("count", currDataCount);
		
		return mav;
	}
	
}
