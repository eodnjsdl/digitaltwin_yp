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
@RequestMapping("/job/fcmr/phfc")
public class PhyEduFaciController {

	private static final Logger logger = LoggerFactory.getLogger(PhyEduFaciController.class);

	@Resource(name = "phyEduFaciService")
	private PhyEduFaciService phyEduFaciService;
	
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;
	
	/**
     * 체육시설 목록 조회
     * 
     * @param PhyEduFaciVO
     * @param model
     * @return "egiskorea/com/job/fcmr/phfc/phyEduFaciListView"
     * @throws Exception
     */
	@RequestMapping(value = "/selectPhyEduFaciListView.do")
	public String selectPhyEduFaciList(
			@ModelAttribute("PhyEduFaciVO") PhyEduFaciVO phyEduFaciVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/phfc/phyEduFaciListView";
	}
	
	/**
     * 체육시설 상세보기
     * 
     * @param SportsVO
     * @param model
     * @return "egiskorea/com/job/fcmr/phfc/phyEduFaciDetail"
     * @throws Exception
     */
	@RequestMapping(value = "/selectPhyEduFaciDetail.do")
	public String selectPhyEduFaciDetail(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		int gid = Integer.parseInt(request.getParameter("gid"));
		//System.out.println("gid: " + gid);
		
		sportsVO.setGid(gid);
		
		SportsVO result = phyEduFaciService.selectPhyEduFaciDetail(sportsVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/phfc/phyEduFaciDetail";
	}
	
	/**
     * 체육시설 등록 화면
     * 
     * @param SportsVO
     * @param model
     * @return "egiskorea/com/job/fcmr/phfc/phyEduFaciInsertView"
     * @throws Exception
     */
	@RequestMapping(value = "/insertPhyEduFaciView.do")
	public String insertPhyEduFaciView(
			@ModelAttribute("PhyEduFaciVO") PhyEduFaciVO phyEduFaciVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/phfc/insertPhyEduFaciView";
	}
	
	/**
     * 체육시설 등록 -> SportController 이용
     * 
     * @param SportsVO, LoginVO
     * @param model
     * @return "egiskorea/com/job/fcmr/phfc/phyEduFaciInsertView"
     * @throws Exception
     */
	@RequestMapping("/insertPhyEduFaci.do")
	public ModelAndView insertPhyEduFaci(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		sportsVO.setFrstRegisterId(loginVO.getId());
		sportsVO.setLastUpdusrId(loginVO.getId());
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		try {
			phyEduFaciService.insertPhyEduFaci(sportsVO);
			mv.addObject("result", "success");
			
		} catch(Exception e) {
			logger.info(e.getMessage());
			mv.addObject("result", "fail");
		}
		
		return mv;
	}
	
	/**
     * 체육시설 수정 화면
     * 
     * @param SportsVO
     * @param model
     * @return "egiskorea/com/job/fcmr/phfc/phyEduFaciInsertView"
     * @throws Exception
     */
	@RequestMapping(value = "/updatePhyEduFaciView.do")
	public String updatePhyEduFaciView(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		int gid = Integer.parseInt(request.getParameter("gid"));
		
		sportsVO.setGid(gid);
		
		SportsVO result = phyEduFaciService.selectPhyEduFaciDetail(sportsVO);
		
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/phfc/insertPhyEduFaciView";
	}
	
	/**
     * 체육시설 수정 -> SportController 이용
     * 
     * @param SportsVO, LoginVO
     * @param model
     * @return "egiskorea/com/job/fcmr/phfc/phyEduFaciInsertView"
     * @throws Exception
     */
	@RequestMapping("/updatePhyEduFaci.do")
	public String updatePhyEduFaci(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		sportsVO.setLastUpdusrId(loginVO.getId());
		
		phyEduFaciService.updatePhyEduFaci(sportsVO);
		
		SportsVO result = phyEduFaciService.selectPhyEduFaciDetail(sportsVO);
		model.addAttribute("result", result);
		
		return "jsonView";
	}
	
	/**
     * 체육시설 삭제 -> SportController 이용
     * 
     * @param SportsVO
     * @param model
     * @return "mv"
     * @throws Exception
     */
	@RequestMapping(value = "/deletePhyEduFaci.do")
	public ModelAndView deletePhyEduFaci(
			@ModelAttribute("SportsVO") SportsVO sportsVO,
			ModelMap model) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		try {
			phyEduFaciService.deletePhyEduFaci(sportsVO);
			
			mv.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mv.addObject("result", "fail");
		}
		return mv;
	}
	
	/**
     * 체육시설 엑셀 다운로드 -> SportController 이용
     * 
     * @param SportsVO
     * @param model
     * @return ""
     * @throws Exception
     */
	HashMap exceldown;
	@RequestMapping(value = "/getAllSportsExcel.do")
	public ModelAndView getAllSportsExcel(
			@ModelAttribute("SportsVO") SportsVO sportsVO, 
			@RequestParam Map paramMap, ModelMap model) throws Exception{
		
		ModelAndView mv = new ModelAndView("excelDownloadView");
		
		SXSSFWorkbook workbook = phyEduFaciService.makePhyEduFaciExcelList(exceldown);
		
		mv.addObject("locale", Locale.KOREA);
		mv.addObject("workbook", workbook);
		mv.addObject("workbookName", "체육시설목록");
		mv.addObject("fileType", "excel");
			
		return mv;
	}
	
	/**
     * 체육시설 운영정보 관리 조회 -> SportController 이용
     * 
     * @param SportsVO
     * @param model
     * @return "egiskorea/com/job/fcmr/phfc/phyMngView"
     * @throws Exception
     */
	@RequestMapping(value = "/selectPhyMngList.do")
	public String selectPhyMngList(@ModelAttribute("SportsVO") SportsVO sportsVO,
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
		
		Map<String, Object> map = phyEduFaciService.selectPhyMngList(sportsVO);
		
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
	
	/**
     * 체육시설 운영정보 년도 중복체크 -> SportController 이용
     * 
     * @param SportsVO
     * @param model
     * @return "jsonView"
     * @throws Exception
     */
	@RequestMapping(value = "/checkPhyMngYear.do")
	public String checkPhyMngYear(ModelMap model, @ModelAttribute("SportsVO") SportsVO sportsVO) throws Exception{
		int result = phyEduFaciService.checkPhyMngYear(sportsVO);
		
		model.addAttribute("result", result);

		return "jsonView";
	}
	
	/**
     * 체육시설 운영정보 등록 -> SportController 이용
     * 
     * @param SportsVO, LoginVO
     * @param model
     * @return "mv"
     * @throws Exception
     */
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
	
	/**
     * 체육시설 운영정보 수정 -> SportController 이용
     * 
     * @param SportsVO, LoginVO
     * @param model
     * @return "mv"
     * @throws Exception
     */
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
	
	/**
     * 체육시설 운영정보 삭제 -> SportController 이용
     * 
     * @param SportsVO
     * @param model
     * @return "egiskorea/com/job/fcmr/phfc/phyFaciMngView"
     * @throws Exception
     */
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
	
	/**
     * 체육시설 시설정보 관리 조회 -> SportController 이용
     * 
     * @param SportsVO, LoginVO
     * @param model
     * @return "mv"
     * @throws Exception
     */
	@RequestMapping(value = "/selectPhyFaciMngList.do")
	public String selectPhyFaciMngList(@ModelAttribute("SportsVO") SportsVO sportsVO,
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
		
		Map<String, Object> map = phyEduFaciService.selectPhyFaciMngList(sportsVO);
		
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
	
	/**
     * 체육시설 시설정보 등록 -> SportController 이용
     * 
     * @param SportsVO, LoginVO
     * @param model
     * @return "mv"
     * @throws Exception
     */
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
	
	/**
     * 체육시설 시설정보 삭제 -> SportController 이용
     * 
     * @param SportsVO, LoginVO
     * @param model
     * @return "mv"
     * @throws Exception
     */
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
