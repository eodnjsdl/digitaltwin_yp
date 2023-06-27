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
import egiskorea.com.job.adas.publnd.service.PbprtAccdtVO;
import egiskorea.com.job.cmss.service.TgdSccoEmdVO;

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
	
//	/** 공통공간검색 서비스단 */
//	@Resource(name = "commonnessSpaceSearchService") 
//	private CommonnessSpaceSearchService commonnessSpaceSearchService;
	
	private static final Logger logger = LoggerFactory.getLogger(AdministAssetsMngController.class);
	
	/** 동시 입력 및 현재 상태 */
	private int dataCountForProgress = 0;
	private boolean isUploading = false;
	
	public int getDataCountForProgress() {
		return dataCountForProgress;
	}

	public void setDataCountForProgress(int dataCountForProgress) {
		this.dataCountForProgress = dataCountForProgress;
	}
	
	public boolean isUploading() {
		return isUploading;
	}
	
	public void setUploading(boolean isUploading) {
		this.isUploading = isUploading;
	}
	
	/**
	 * 행정자산관리 목록 화면
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectAdministAssetsInfoListView.do")
	public String selectAdministAssetsMngList(TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception {
		logger.info("selectAdministAssetsMngList.do");
		
//		// 읍면동 목록
//		Map<String, Object> map = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		List<String> yearList = null;
		
		yearList = administAssetsService.selectAdministAssetsYearList();
		
//		model.addAttribute("sccoEndList", map.get("resultList"));
		model.addAttribute("yearList", yearList);
		
		return "egiskorea/com/job/adas/asmng/selectAdministAssetsInfoList";
	}
	
	/**
	 * 등록 화면 호출
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertAdministAssets.do")
	public String insertAdministAssets() throws Exception {
		
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
		resultCount = administAssetsService.selectAdministAssetsTotCnt(administAssetsVO);
		
		mav.addObject("resultList", resultList);
		mav.addObject("resultCount", resultCount);
		
		return mav;
	}
	
	/**
	 * CSV 업로드
	 * @param request
	 * @param mpRequest
	 * @param administAssetsVO
	 * @return
	 * @throws FileNotFoundException 
	 */
	@RequestMapping(value ="/insertAdministAssetsInfoCSV.do")
	@ResponseBody
	public ModelAndView insertAdministAssetsInfoCSV(HttpServletRequest request,
			MultipartHttpServletRequest mpRequest,
			AdministAssetsVO administAssetsVO) throws FileNotFoundException {
		ModelAndView mav = new ModelAndView("jsonView");
		
		String year = request.getParameter("year");
		
		MultipartFile file = mpRequest.getFile("fileUpload");
		
		List<AdministAssetsVO> administAssetsList = new ArrayList<AdministAssetsVO>();
		setUploading(true);
		int result = 0;
		boolean isSuccess = false;
		try {
			if (isUploading()) {
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
					if (dataCount > 6) {
						result = 0;
						int offset = 0;
//					int offset = 16;
//					List<AdministAssetsVO> subList = new ArrayList<>();
//					for (int i = 0; i < offset; i++) {
//						subList.add(administAssetsList.get(i));
//						if (subList.size() == 16) {
//							result += administAssetsService.insertAdministAssetsInfoByCSV(subList);
//							if (dataCount - offset < 16) {
//								subList = new ArrayList<>();
//								for (int j = offset; j < dataCount; j++) {
//									subList.add(administAssetsList.get(j));
//								}
//								result += administAssetsService.insertAdministAssetsInfoByCSV(subList);
//							} else {
//								offset += 16;
//								subList = new ArrayList<>();
//							}
//						}
//					}
						
						for (int i = 1; i <= (dataCount / 6); i++) {
							List<AdministAssetsVO> subList = new ArrayList<>();
							subList = administAssetsList.subList(offset, i * 6);
							result += administAssetsService.insertAdministAssetsInfoByCSV(subList);
							offset = i * 6;
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
				isSuccess = true;
				System.out.println("트랜젝션 배치" + " 소요시간  : " + resutTime/1000 + "(ms)");
			}
		} catch (FileNotFoundException e) {
			e.getMessage();
		} catch (SQLException e) {
			e.getMessage();
		} catch (Exception e) {
			e.getMessage();
		} finally {
			// 변수 초기화
			setDataCountForProgress(0);
			setUploading(false);
		}
		
		int count = 0;
		count = administAssetsService.selectAdministAssetsTotCnt(administAssetsVO);
		
		if (result > 0) {
			mav.addObject("resultCnt", count);
		}
		
		mav.addObject("isSuccess", isSuccess);
		mav.addObject("year", year);
		
		return mav;
	}
	
	/**
	 * CSV 업로드 진행률
	 * @return
	 */
	@RequestMapping(value = "/csvUploadProgress.do")
	@ResponseBody
	public ModelAndView csvUploadprogress(AdministAssetsVO administAssetsVO) {
		ModelAndView mav = new ModelAndView("jsonView");
		double currDataCount = 0;
		double totalDataCount = 0;
		double progress = 0;
		
		totalDataCount = (double) getDataCountForProgress();
		currDataCount = (double) administAssetsService.selectAdministAssetsTotCnt(administAssetsVO);
		
		progress = Math.floor((currDataCount / totalDataCount) * 100);
		
		mav.addObject("progress", progress);
		mav.addObject("count", currDataCount);
		
		return mav;
	}
	
	@RequestMapping(value = "/csvUploadIsUploading.do")
	@ResponseBody
	public ModelAndView csvUploadIsUploading() {
		ModelAndView mav = new ModelAndView("jsonView");
		String process = "";
		boolean uploading = false;
		
		if (isUploading()) {
			process = "작업 중";
			uploading = true;
		} else {
			process = "작업 없음";
		}
		
		mav.addObject("uploading", uploading);
		mav.addObject("process", process);
		
		return mav;
	}
	
	@RequestMapping(value = "/insertPublndToPbprtAccdt.do")
	@ResponseBody
	public ModelAndView insertPublndToPbprtAccdt(PbprtAccdtVO pbprtAccdtVO) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		
		int result = 0;
		
		result = administAssetsService.insertPublndToPbprtAccdt(pbprtAccdtVO);
		
		if (result > 0) {
			mav.addObject("result", "success");
		} else {
			mav.addObject("result", "fail");
		}
		
		
		return mav;
	}
}
