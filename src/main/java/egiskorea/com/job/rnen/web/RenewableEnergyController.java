package egiskorea.com.job.rnen.web;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import egiskorea.com.cmm.service.impl.ExcelView;
import egiskorea.com.job.cmss.service.CommonnessSpaceSearchService;
import egiskorea.com.job.cmss.service.TgdSccoEmdVO;
import egiskorea.com.job.rnen.service.RenewableEnergy;
import egiskorea.com.job.rnen.service.RenewableEnergyService;
import egiskorea.com.job.rnen.service.RenewableEnergyVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 신재생에너지 controller 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2021.12.29
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.29   전영후            최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/job/rnen")
public class RenewableEnergyController {
	
	private static final Logger logger = LoggerFactory.getLogger(RenewableEnergyController.class);
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	/** renewableEnergyService */
	@Resource(name = "renewableEnergyService")
	private RenewableEnergyService renewableEnergyService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	/** 공통공간검색 서비스단 */
	@Resource(name = "commonnessSpaceSearchService") 
	private CommonnessSpaceSearchService commonnessSpaceSearchService;
	
	/**
	 * 신재생에너지 > 태양광발전소 목록
	 * 
	 * @param model
	 * @return "egiskorea/com/job/rnen/renewableEnergyList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRenewableEnergyList.do")
	public String selectRenewableEnergyList(
			@ModelAttribute("searchVO") RenewableEnergyVO renewableEnergyVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{ 
		// 읍면동 리스트
		Map<String, Object> map = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		// 사업구분 리스트
		Map<String, Object> map2 = renewableEnergyService.selectRenewalbeEnergyBsnsSeList(renewableEnergyVO);
		
		model.addAttribute("sccoEndList", map.get("resultList"));
		model.addAttribute("bsnsSeList", map2.get("resultList"));
		
		return "egiskorea/com/job/rnen/renewableEnergyList";
	}
	
	/**
	 * 신재생에너지 > 태양광발전소 등록페이지 호출
	 * 
	 * @param model
	 * @return "egiskorea/com/job/rnen/insertRenewableEnergyView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertRenewableEnergyView.do")
	public String insertRenewableEnergyView(
			RenewableEnergyVO renewableEnergyVO,
			ModelMap model) throws Exception{
		
		// 사업구분 리스트
		Map<String, Object> map3 = renewableEnergyService.selectRenewalbeEnergyBsnsSeList(renewableEnergyVO);
		
		model.addAttribute("bsnsSeList", map3.get("resultList"));
		
		return "egiskorea/com/job/rnen/insertRenewableEnergyView";
	}
	
	/**
	 * 신재생에너지 > 태양광발전소 등록
	 * 
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/insertRenewableEnergy.do")
	public ModelAndView insertRenewableEnergy(
			@ModelAttribute("renewableEnergy") RenewableEnergy renewableEnergy,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		/* boolean result = false; */
		
		try {
			renewableEnergyService.insertRenewableEnergy(renewableEnergy);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 신재생에너지 > 태양광발전소 수정
	 * 
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/updateRenewableEnergy.do")
	public ModelAndView updateRenewableEnergy(
			@ModelAttribute("renewableEnergy") RenewableEnergy renewableEnergy,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			renewableEnergyService.updateRenewableEnergy(renewableEnergy);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 신재생에너지 > 태양광발전소 상세페이지 호출
	 * 
	 * @param model
	 * @return "egiskorea/com/job/rnen/renewableEnergy"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRenewableEnergy.do")
	public String selectRenewableEnergy(
			@ModelAttribute("renewableEnergyVO") RenewableEnergyVO renewableEnergyVO,
			ModelMap model) throws Exception{
		
		RenewableEnergy result = renewableEnergyService.selectRenewableEnergy(renewableEnergyVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/rnen/renewableEnergy";
	}
	
	/**
	 * 신재생에너지 > 태양광발전소 수정페이지 호출
	 * 
	 * @param model
	 * @return "egiskorea/com/job/rnen/updateRenewableEnergyView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateRenewableEnergyView.do")
	public String updateRenewableEnergyView(
			@ModelAttribute("renewableEnergyVO") RenewableEnergyVO renewableEnergyVO,
			ModelMap model) throws Exception{
		
		// 사업구분 리스트
		Map<String, Object> map3 = renewableEnergyService.selectRenewalbeEnergyBsnsSeList(renewableEnergyVO);
		
		RenewableEnergy result = renewableEnergyService.selectRenewableEnergy(renewableEnergyVO);
		model.addAttribute("result", result);
		model.addAttribute("bsnsSeList", map3.get("resultList"));
		
		return "egiskorea/com/job/rnen/updateRenewableEnergyView";
	}
	
	/**
	 * 신재생에너지 > 태양광발전소 상세 > 삭제
	 * 
	 * @param model
	 * @return result
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteRenewableEnergy.do")
	public ModelAndView deleteRenewableEnergy(
			@ModelAttribute("renewableEnergy") RenewableEnergy renewableEnergy,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		/* boolean result = false; */
		
		try {
			renewableEnergyService.deleteRenewableEnergy(renewableEnergy);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 신재생에너지 > 태양광발전소 엑셀다운로드
	 * 
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRenewableEnergyExcelListDownload.do")
	public void selectRenewableEnergyExcelListDownload(
			@ModelAttribute("renewableEnergyVO") RenewableEnergyVO renewableEnergyVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		 List<RenewableEnergyVO> excelVO = renewableEnergyService.selectRenewableEnergyExcelList(renewableEnergyVO);
		 
		 String[] titleArr = new String[5];
		 titleArr[0] = "발전소명";
		 titleArr[1] = "설비위치";
		 titleArr[2] = "발전기구분";
		 titleArr[3] = "허가용량";
		 titleArr[4] = "사업구분";
		 
		 String[] voTitleArr = new String[5];
		 voTitleArr[0] = "elcpwstnNm";
		 voTitleArr[1] = "eqpLc";
		 voTitleArr[2] = "eltgnrSe";
		 voTitleArr[3] = "prmisnVolm";
		 voTitleArr[4] = "bsnsSe";
		 
		 ExcelView.excelDownload(request, response,  "신재생에너지_태양광발전소_", titleArr, voTitleArr, excelVO);
	}
	
}
