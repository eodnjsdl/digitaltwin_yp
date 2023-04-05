package egiskorea.com.job.fcmr.phfc.web;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.job.fcmr.phfc.service.PhyEduFaciService;
import egiskorea.com.job.fcmr.phfc.service.PhyEduFaciVO;
import egiskorea.com.job.spor.service.SportsVO;
import egovframework.com.cmm.LoginVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description : 시설관리/체육시설
 * @author      : 김영주
 * @since       : 2023.03.31
 * @version     : 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                    수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.03.31   김영주           최초 생성
 */

@Controller
@RequestMapping("/job/fcmr/phfc/")
public class PhyEduFaciController {

	private static final Logger logger = LoggerFactory.getLogger(PhyEduFaciController.class);

	@Resource(name = "phyEduFaciService")
	private PhyEduFaciService phyEduFaciService;
	
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;
	
	// 목록(옵션) 조회
	@RequestMapping(value = "/selectPhyEduFaciList.do")
	public String selectPhyEduFaciList(
			@ModelAttribute("PhyEduFaciVO") PhyEduFaciVO phyEduFaciVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/phfc/phyEduFaciListView";
	}
	
	// 상세보기 화면
	@RequestMapping(value = "/selectPhyEduFaciDetail.do")
	public String selectPhyEduFaciDetail(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		int gid = Integer.parseInt(request.getParameter("gid"));
		//System.out.println("gid: " + gid);
		
		sportsVO.setGid(gid);
		
		SportsVO result = phyEduFaciService.selectPhyEduFaciDetail(sportsVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/phfc/phyEduFaciDetailView";
	}
	
	// 등록 화면
	@RequestMapping(value = "/insertPhyEduFaciView.do")
	public String insertPhyEduFaciView(
			@ModelAttribute("PhyEduFaciVO") PhyEduFaciVO phyEduFaciVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/phfc/phyEduFaciInsertView";
	}
	
	// 등록
	
	// 수정 화면
	@RequestMapping(value = "/updatePhyEduFaciView.do")
	public String updatePhyEduFaciView(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		int gid = Integer.parseInt(request.getParameter("gid"));
		
		sportsVO.setGid(gid);
		
		SportsVO result = phyEduFaciService.selectPhyEduFaciDetail(sportsVO);
		
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/phfc/phyEduFaciInsertView";
	}
	
	// 수정
	
	// 삭제
	@RequestMapping(value = "/deletePhyEduFaci.do")
	public String deletePhyEduFaci(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		return "egiskorea/com/job/fcmr/phfc/phyEduFaciListView";
	}
	
	// 운영정보 관리 조회
	@RequestMapping(value = "/phyMngView.do")
	public String phyMngView(@ModelAttribute("SportsVO") SportsVO sportsVO,
			ModelMap model) throws Exception {
		
		sportsVO.setPageUnit(10);
		sportsVO.setPageSize(propertyService.getInt("pageSize"));

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(sportsVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(sportsVO.getPageUnit());
		paginationInfo.setPageSize(sportsVO.getPageSize());

		sportsVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		sportsVO.setLastIndex(paginationInfo.getLastRecordIndex());
		sportsVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = phyEduFaciService.phyMngListView(sportsVO);
		
		int totCnt = Integer.parseInt((String) map.get("resultCnt"));
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("sportsList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("gid", sportsVO.getGid());
		
		sportsVO = phyEduFaciService.selectPhyEduFaciDetail(sportsVO);
		model.addAttribute("sportsVO", sportsVO);
		model.addAttribute("result", "success");
		
		return "egiskorea/com/job/fcmr/phfc/phyMngView";
	}
	
	// 운영정보 년도 중복체크
	@RequestMapping(value = "/checkPhyMngYear.do")
	public String checkPhyMngYear(ModelMap model, @ModelAttribute("SportsVO") SportsVO sportsVO) throws Exception{
		int result = phyEduFaciService.checkPhyMngYear(sportsVO);
		
		model.addAttribute("result", result);

		return "jsonView";
	}
	
	// 운영정보 등록 -> SportController 이용
	@RequestMapping(value = "/insertPhyMng.do")
	public ModelAndView insertPhyMng(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		  
		sportsVO.setFrst_register_id(loginVO.getId());	// 최초 등록자
		sportsVO.setLast_updusr_id(loginVO.getId());	// 최종 수정자

		ModelAndView mv = new ModelAndView("jsonView");
		
		try {
			phyEduFaciService.insertPhyMng(sportsVO);

			mv.addObject("result", "success");
		} catch (Exception e) {
			logger.info(e.getMessage());
			mv.addObject("result", "fail");
		}
		return mv;
	}
	
	// 운영정보 수정 -> SportController 이용
	@RequestMapping(value = "/updatePhyMng.do")
	public ModelAndView updatePhyMng(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		  
		sportsVO.setLast_updusr_id(loginVO.getId());	// 최종 수정자

		ModelAndView mv = new ModelAndView("jsonView");
		
		try {
			phyEduFaciService.updatePhyMng(sportsVO);

			mv.addObject("result", "success");
		} catch (Exception e) {
			logger.info(e.getMessage());
			mv.addObject("result", "fail");
		}
		return mv;
	}
	
	// 운영정보 삭제 -> SportController 이용
	@RequestMapping(value = "/deletePhyMng.do")
	public ModelAndView deletePhyMng(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		String operYear = sportsVO.getOper_year().replace(",", "', '");
		operYear = "'" + operYear + "'";
		sportsVO.setOper_year(operYear);
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		try {
			phyEduFaciService.deletePhyMng(sportsVO);

			mv.addObject("result", "success");
		} catch (Exception e) {
			logger.info(e.getMessage());
			mv.addObject("result", "fail");
		}
		return mv;
	}
	
	// 시설정보 관리
	@RequestMapping(value = "/phyFaciMngView.do")
	public String phyFaciMngView(@ModelAttribute("SportsVO") SportsVO sportsVO,
			ModelMap model) throws Exception {
		
		sportsVO.setPageUnit(10);
		sportsVO.setPageSize(propertyService.getInt("pageSize"));

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(sportsVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(sportsVO.getPageUnit());
		paginationInfo.setPageSize(sportsVO.getPageSize());

		sportsVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		sportsVO.setLastIndex(paginationInfo.getLastRecordIndex());
		sportsVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = phyEduFaciService.phyFaciMngListView(sportsVO);
		
		int totCnt = Integer.parseInt((String) map.get("resultCnt"));
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("sportsList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("gid", sportsVO.getGid());
		
		sportsVO = phyEduFaciService.selectPhyEduFaciDetail(sportsVO);
		model.addAttribute("sportsVO", sportsVO);
		model.addAttribute("result", "success");
		
		return "egiskorea/com/job/fcmr/phfc/phyFaciMngView";
	}
	
	// 시설정보 등록 -> SportController 이용
	@RequestMapping(value = "/insertPhyFaciMng.do")
	public ModelAndView insertPhyFaciMng(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		  
		sportsVO.setFrst_register_id(loginVO.getId());	// 최초 등록자
		sportsVO.setLast_updusr_id(loginVO.getId());	// 최종 수정자

		ModelAndView mv = new ModelAndView("jsonView");
		
		try {
			phyEduFaciService.insertPhyFaciMng(sportsVO);

			sportsVO = phyEduFaciService.selectPhyEduFaciDetail(sportsVO);
			mv.addObject("resultVO", sportsVO);
			mv.addObject("result", "success");
		} catch (Exception e) {
			logger.info(e.getMessage());
			mv.addObject("result", "fail");
		}
		return mv;
	}
	
	// 시설정보 삭제 -> SportController 이용
	@RequestMapping(value = "/deletePhyFaciMng.do")
	public ModelAndView deletePhyFaciMng(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		try {
			phyEduFaciService.deletePhyFaciMng(sportsVO);

			mv.addObject("result", "success");
		} catch (Exception e) {
			logger.info(e.getMessage());
			mv.addObject("result", "fail");
		}
		return mv;
	}
}
