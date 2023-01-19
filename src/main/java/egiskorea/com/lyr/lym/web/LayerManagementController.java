package egiskorea.com.lyr.lym.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.swing.plaf.basic.BasicInternalFrameTitlePane.SystemMenuBar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.geo.lgsr.service.LandRegisterVO;
import egiskorea.com.lyr.lym.service.LayerManagementService;
import egiskorea.com.lyr.lym.service.LayerManagementVO;
import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.CmmnDetailCode;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.util.EgovUserDetailsHelper;

/**
 * @Description 레이어를 관리하는 controller 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.12.08
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.08   이상화           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/lyr/lym")
public class LayerManagementController {
	
	private static final Logger logger = LoggerFactory.getLogger(LayerManagementController.class);
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	/** layerManagementService */
	@Resource(name = "layerManagementService")
	private LayerManagementService layerManagementService;
	
	/**
	 * 개인별 레이어 목록
	 * @param layerManagementVO
	 * @param model
	 * @param request
	 * @return "egiskorea/com/lyr/lym/leftLayerList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectLayerList.do")
	public String selectLayerList(
			@ModelAttribute("layerManagementVO") LayerManagementVO layerManagementVO,
			ModelMap model,
			HttpServletRequest request) throws Exception{ 
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		try {
			if(isAuthenticated) {
				layerManagementVO.setMid(user.getId());
				List<LayerManagementVO> layerList = layerManagementService.selectLayerList(layerManagementVO);
				
				if(layerList.size() < 1) {
					layerManagementVO.setMid("SYSTEM");
					layerList = layerManagementService.selectLayerList(layerManagementVO);
				}
				
				model.addAttribute("resultList", layerList);
			}
		} catch(Exception e) {
			logger.info(e.getMessage());
		}
		
		System.out.println("egiskorea/com/lyr/lym/" + layerManagementVO.getMode() + "LayerList");
		
		return "egiskorea/com/lyr/lym/" + layerManagementVO.getMode() + "LayerList";
	}
	
	/**
	 * 레이어 목록 관리 리스트
	 * @param layerManagementVO
	 * @param model
	 * @param request
	 * @return "egiskorea/com/lyr/lym/layerManagementList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectLayerManagementList.do")
	public String selectLayerManagementList(
			@ModelAttribute("layerManagementVO") LayerManagementVO layerManagementVO,
			ModelMap model,
			HttpServletRequest request) throws Exception{
		
		ComDefaultCodeVO comDefaultCodeVO = new ComDefaultCodeVO();
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		List<?> layerClassification = null;
		List<LayerManagementVO> layerManagementList = null;
		
		try {
			if(isAuthenticated) {
				// 레이어 분류 항목
				comDefaultCodeVO.setCodeId("LRCL");
				layerClassification = cmmUseService.selectCmmCodeDetail(comDefaultCodeVO);
				
				model.addAttribute("layerClassification", layerClassification);
			
				// 레이어 관리 목록
				layerManagementVO.setMid(user.getId());
				layerManagementList = layerManagementService.selectLayerManagementList(layerManagementVO);
				
				model.addAttribute("layerManagementList", layerManagementList);
			}
		} catch(Exception e) {
			logger.info(e.getMessage());
		}
		
		return "egiskorea/com/lyr/lym/layerManagementList";
	}
	
	/**
	 * 레이어 관리 정보 삭제
	 * @param layerManagementVO
	 * @param request
	 * @return
	 * @throws Exception
	 */	
	@RequestMapping(value = "/deleteLayerManagementInfo.do")
	public ModelAndView deleteLayerManagementInfo(
			@ModelAttribute("layerManagementVO") LayerManagementVO layerManagementVO) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		String[] layerInfoList = layerManagementVO.getLayerIds().split("/");
		
		try {
			for(int i = 0; i < layerInfoList.length; i++) {
				layerManagementVO.setDataid(Integer.parseInt(layerInfoList[i]));
				
				layerManagementService.deleteLayerManagementInfo(layerManagementVO);	
			}
			
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	/**
	 * 레이어 관리 항목 추가(개인별 레이어 리스트 항목 추가)
	 * @param layerManagementVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertLayerListInfo.do")
	public ModelAndView insertLayerListInfo(
			@ModelAttribute("layerManagementVO") LayerManagementVO layerManagementVO,
			HttpServletRequest request) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		String[] layerInfoList = layerManagementVO.getLayerIds().split("/");
		
		try {
			if(isAuthenticated) {				
				for(int i = 0; i < layerInfoList.length; i++) {
					layerManagementVO.setDataid(Integer.parseInt(layerInfoList[i]));
					layerManagementVO.setMid(user.getId());
					
					List<LayerManagementVO> layerList = layerManagementService.selectLayerList(layerManagementVO);
					
					if(layerList.size() < 1) {						
						layerManagementService.insertLayerListInfo(layerManagementVO);
					}
				}
				
				mav.addObject("result", "success");
			}
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 개인별 레이어 목록 항목 제거
	 * @param layerManagement
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteLayerListInfo.do")
	public ModelAndView deleteLayerListInfo(
			@ModelAttribute("layerManagementVO") LayerManagementVO layerManagementVO,
			HttpServletRequest request) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		try {
			if(isAuthenticated) {
				layerManagementVO.setMid(user.getId());
				
				layerManagementService.deleteLayerListInfo(layerManagementVO);
				
				mav.addObject("result", "success");
			} 
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
}
