package egiskorea.com.job.tran.popltn.web;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.job.tran.popltn.service.PopulationInfoService;
import egiskorea.com.job.tran.popltn.service.PopulationVO;
import egovframework.rte.fdl.property.EgovPropertyService;

/**
 * @Description 교통분석  controller 클래스
 * @author 플랫폼개발부문 DT플랫폼 
 * @since 2023.05.12
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.12   황의현           최초 생성
 *  2023.05.17   백승석           데이터 조회 처리 생성
 *  </pre>
 */

@Controller
@RequestMapping("/job/tran/popltn")
public class PopulationInfoController {
	
	@Resource(name = "populationInfoService")
	private PopulationInfoService populationInfoService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;

	private static final Logger logger = LoggerFactory.getLogger(PopulationInfoController.class);
	
	/**
	 * 인구정보 목록 조회
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/tral/popltn/selectPopulationInfoList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectPopulationInfoList.do")
	public String selectPopulationInfoList(
			ModelMap model) throws Exception{
		logger.info("selectPopulationInfoList.do");
		
		return "egiskorea/com/job/tran/popltn/selectPopulationInfoList";
	}
	
	/**
	 * 인구정보 면 정보 조회
	 * @param populationVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectMyeonPopulationInfoList.do")
	@ResponseBody
	public ModelAndView selectMyeonPopulationInfoList(
			PopulationVO populationVO) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		List<PopulationVO> list = null;
		String geom = "";
		
		list = populationInfoService.selectMyeonPopulationInfoList(populationVO);
		geom = populationInfoService.selectPopulationCenter(populationVO);
		
		mav.addObject("resultList", list);
		mav.addObject("geomCenter", geom);
		
		return mav;
	}
	
	/**
	 * 검색 기준 년월 조회 
	 * @param populationVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectStandardYmList.do")
	@ResponseBody
	public ModelAndView selectStandardYmList(
			PopulationVO populationVO) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		List<String> list = null;
		
		list = populationInfoService.selectStandardYmList(populationVO);
		
		mav.addObject("resultList", list);
		
		return mav;
	}
	
	/**
	 * 양평군 전체 인구 정보 조회
	 * @param populationVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectAllPopulationInfoList.do")
	@ResponseBody
	public ModelAndView selectAllPopulationInfoList(
			PopulationVO populationVO) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		List<PopulationVO> list = null;
		String geom = "";
		
		list = populationInfoService.selectAllPopulationInfoList(populationVO);
		geom = populationInfoService.selectPopulationCenter(populationVO);
		
		mav.addObject("resultList", list);
		mav.addObject("geomCenter", geom);
		
		return mav;
	}
	
	/************************* GRID 화면************************/
	/**
	 * 검색 기준 년월 조회 - grid화면
	 * @param populationVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectGridStandardYmList.do")
	@ResponseBody
	public ModelAndView selectGridStandardYmList(
			PopulationVO populationVO) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		List<String> list = null;
		
		list = populationInfoService.selectGridStandardYmList(populationVO);
		
		mav.addObject("resultList", list);
		
		return mav;
	}
	
	/**
	 * 면 단위 조회
	 * @param populationVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectGridMyeonPopulationInfoList.do")
	@ResponseBody
	public ModelAndView selectGridMyeonPopulationInfoList(
			PopulationVO populationVO) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		List<PopulationVO> list = null;
		String geom = "";
		
		list = populationInfoService.selectGridMyeonPopulationInfoList(populationVO);
		geom = populationInfoService.selectGridPopulationCenter(populationVO);
		
		mav.addObject("resultList", list);
		mav.addObject("geomCenter", geom);
		
		return mav;
	}
	
}
