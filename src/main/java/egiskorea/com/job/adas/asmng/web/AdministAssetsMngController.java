package egiskorea.com.job.adas.asmng.web;

import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
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
		
		int result = 0;
		int count = administAssetsService.selectAdministAssetsTotCnt();
		String year = request.getParameter("year");
		
		MultipartFile file = mpRequest.getFile("fileUpload");
		
		List<AdministAssetsVO> administAssetsList = new ArrayList<AdministAssetsVO>();
		try {
			administAssetsList = administAssetsService.csvUploadHelper(file, year);
			int dataCount = administAssetsList.size();
			if (dataCount > 0) {
				// 지정된 연도가 있으면 지우고 새로 업로드하기
				administAssetsVO.setYear(year);
				result = administAssetsService.deleteAdministAssetsInfo(administAssetsVO);
				if (dataCount > 1000) {
					int offset = 0;
					for (int i = 1; i <= (dataCount / 1000); i++) {
						result += administAssetsService.insertAdministAssetsInfoByCSV(administAssetsList.subList(offset, i * 1000));
						offset = i * 1000;
					}
					result += administAssetsService.insertAdministAssetsInfoByCSV(administAssetsList.subList(offset, dataCount));
				}
			}
		} catch (FileNotFoundException e) {
			e.getMessage();
		} catch (SQLException e) {
			e.getMessage();
		} catch (Exception e) {
			e.getMessage();
		}
		
		if (result > 0) {
			mav.addObject("resultCd", result);
		} else {
			mav.addObject("resultCd", result);
		}
		
		mav.addObject("year", year);
		
		return mav;
	}
	
}
