package egiskorea.com.job.sffm.web;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.cmm.service.impl.ExcelView;
import egiskorea.com.job.sffm.service.SafetyFacilLampMng;
import egiskorea.com.job.sffm.service.SafetyFacilLampMngVO;
import egiskorea.com.job.sffm.service.SafetyFacilitiesMngService;
import egiskorea.com.job.ugtm.service.UnderWaterUseFacilVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 안전시설물관리 controller 클래스
 * @author 플랫폼개발부문 DT플랫폼 한유경
 * @since 2022.02.27
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.27   한유경            최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/job/sffm")
public class SafetyFacilitiesMngController {
	
	private static final Logger logger = LoggerFactory.getLogger(SafetyFacilitiesMngController.class);
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	/** safetyFacilitiesMngService */
	@Resource(name = "safetyFacilitiesMngService")
	private SafetyFacilitiesMngService safetyFacilitiesMngService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	/**
	 * 안전시설물관리 > 가로등관리 목록
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/sffm/safetyFacilLampMngList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSafetyFacilLampMngList.do")
	public String selectSafetyFacilLampMngList(
			@ModelAttribute("searchVO") SafetyFacilLampMngVO safetyFacilLampMngVO,
			ModelMap model/*, HttpServletRequest request*/) throws Exception{

		
		return "egiskorea/com/job/sffm/safetyFacilLampMngList";
	}
	
	/**
	 * 안전시설물관리 > 가로등관리 등록페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/sffm/insertSafetyFacilLampMngView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertSafetyFacilLampMngView.do")
	public String insertSafetyFacilLampMngView(
			ModelMap model) throws Exception{
		
		return "egiskorea/com/job/sffm/insertSafetyFacilLampMngView";
	}
	/**
	 * 안전시설물관리 > 가로등관리 수정페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/sffm/updateSafetyFacilLampMngView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateSafetyFacilLampMngView.do")
	public String updateSafetyFacilLampMngView(
			@ModelAttribute("safetyFacilLampMngVO") SafetyFacilLampMngVO safetyFacilLampMngVO,
			ModelMap model) throws Exception{
		SafetyFacilLampMng result = safetyFacilitiesMngService.selectSafetyFacilLampMng(safetyFacilLampMngVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/sffm/updateSafetyFacilLampMngView";
	}
	
	/**
	 * 안전시설물관리 > 가로등관리 상세페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/sffm/selectSafetyFacilLampMng"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSafetyFacilLampMng.do")
	public String selectSafetyFacilLampMng(
			@ModelAttribute("safetyFacilLampMngVO") SafetyFacilLampMngVO safetyFacilLampMngVO,
			ModelMap model) throws Exception{
		
		SafetyFacilLampMng result = safetyFacilitiesMngService.selectSafetyFacilLampMng(safetyFacilLampMngVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/sffm/safetyFacilLampMng";
	}
	
	/**
	 * 안전시설물관리 > 가로등관리 삭제
	 * 
	 * @param 
	 * @param model
	 * @return ModelAndView
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteSffm.do")
	public ModelAndView deleteSffm(ModelMap model, HttpServletRequest request) throws Exception { 
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		SafetyFacilLampMng sffmVO = new SafetyFacilLampMng();
		sffmVO.setGid(Integer.parseInt(request.getParameter("gid")));
		
		try {
			safetyFacilitiesMngService.deleteSffm(sffmVO);
			mav.addObject("result", "success");
		}catch(Exception e ) {
			logger.info(e.getMessage());
			mav.addObject("result", "fail");
		}
		
		
		return mav;
	}
	
	/**
	 * 안전시설물관리 > 가로등관리 등록
	 * 
	 * @param 
	 * @param model
	 * @return ModelAndView
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertSffm.do")
	public ModelAndView insertSffm(ModelMap model, HttpServletRequest request) throws Exception { 
		
		SafetyFacilLampMng sffmVO = new SafetyFacilLampMng();
		ModelAndView mav = new ModelAndView("jsonView");
		
		sffmVO.setManageNo(request.getParameter("manageNo"));
		sffmVO.setInstlDe(request.getParameter("instlDe"));
		sffmVO.setAdres(request.getParameter("adres"));
		sffmVO.setStrtlgtCnt(Integer.parseInt(request.getParameter("strtlgtCnt")));
		sffmVO.setLat(Double.parseDouble(request.getParameter("lat")));
		sffmVO.setLon(Double.parseDouble(request.getParameter("lon")));
		sffmVO.setAlttd(Double.parseDouble(request.getParameter("alt")));
		sffmVO.setStdde(request.getParameter("stdde"));
		
		safetyFacilitiesMngService.insertSffm(sffmVO);
		
		try {
			safetyFacilitiesMngService.updateSffm(sffmVO);
			mav.addObject("result", "success");
		}catch(Exception e ) {
			logger.info(e.getMessage());
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	/**
	 * 안전시설물관리 > 가로등관리 수정
	 * 
	 * @param 
	 * @param model
	 * @return ModelAndView
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/updateSffm.do")
	public ModelAndView updateSffm(ModelMap model, HttpServletRequest request) throws Exception { 
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		SafetyFacilLampMng sffmVO = new SafetyFacilLampMng();
		
		sffmVO.setGid(Integer.parseInt(request.getParameter("gid")));
		sffmVO.setManageNo(request.getParameter("manageNo"));
		sffmVO.setInstlDe(request.getParameter("instlDe"));
		sffmVO.setAdres(request.getParameter("adres"));
		sffmVO.setStrtlgtCnt(Integer.parseInt(request.getParameter("strtlgtCnt")));
		sffmVO.setLat(Double.parseDouble(request.getParameter("lat")));
		sffmVO.setLon(Double.parseDouble(request.getParameter("lon")));
		sffmVO.setAlttd(Double.parseDouble(request.getParameter("alt")));
		sffmVO.setStdde(request.getParameter("stdde"));
		
		try {
			safetyFacilitiesMngService.updateSffm(sffmVO);
			mav.addObject("result", "success");
		}catch(Exception e ) {
			logger.info(e.getMessage());
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
}
