package egiskorea.com.job.spor.web;

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

import egiskorea.com.job.spor.service.SportsService;
import egiskorea.com.job.spor.service.SportsVO;
import egovframework.com.cmm.LoginVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 
 * @author 플랫폼개발부문 DT플랫폼 이혜인
 * @since 2022.01.12
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.12	이혜인 	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/job/spor")
public class SportsController {

	private static final Logger logger = LoggerFactory.getLogger(SportsController.class);

	@Resource(name = "sportsService")
	private SportsService sportsService;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;
	
	/**
	 * 
	 * @Description 체육시설 조회  
	 * @Author EGIS
	 * @Date 2022.03.16
	 * @param model
	 * @param sportsVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSportsList.do")
	public String selectSportsList(ModelMap model, @ModelAttribute("SportsVO") SportsVO sportsVO,HttpServletRequest request) throws Exception {
		sportsVO.setPageUnit(10);
		sportsVO.setPageSize(propertyService.getInt("pageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(sportsVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(sportsVO.getPageUnit());
		paginationInfo.setPageSize(sportsVO.getPageSize());
		
		sportsVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		sportsVO.setLastIndex(paginationInfo.getLastRecordIndex());
		sportsVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		sportsVO.setSports_oper_mthd_cd(request.getParameter("sports_oper_mthd_cd"));
		sportsVO.setSporSearchAdres(request.getParameter("sporSearchAdres"));
		sportsVO.setSporSearchAlsfc_nm(request.getParameter("sporSearchAlsfc_nm"));
		sportsVO.setSporSpitalSearch(request.getParameter("sporSpitalSearch"));
		sportsVO.setSportsBuffer(Double.parseDouble(request.getParameter("sportsBuffer")) * 0.00001);

		Map<String, Object> map = sportsService.selectSportsList(sportsVO);
		
		//검색 결과 엑셀 다운로드 
		exceldown = sportsService.getAllSportsExcel(sportsVO);
		
		int totCnt = Integer.parseInt((String) map.get("resultCnt"));
		
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		return "egiskorea/com/job/spor/sportsList";
	}

	
	/**
	 * 
	 * @Description 체육시설 등록  
	 * @Author EGIS
	 * @Date 2022.03.16
	 * @param sportsVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/insertSports.do")
	public ModelAndView insertMemoInfo( @ModelAttribute("SportsVO") SportsVO sportsVO, HttpServletRequest request) throws Exception{
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		sportsVO.setFrstRegisterId(loginVO.getId());
		sportsVO.setLastUpdusrId(loginVO.getId());
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			sportsService.insertSports(sportsVO);
			mav.addObject("result", "success");
			
		} catch(Exception e) {
			logger.info(e.getMessage());
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 
	 * @Description 체육시설 목록 삭제  
	 * @Author EGIS
	 * @Date 2022.03.16
	 * @param model
	 * @param sportsVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteSports.do")
	public ModelAndView deleteSporInfo(ModelMap model, @ModelAttribute("SportsVO") SportsVO sportsVO) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		try {
			sportsService.deleteSports(sportsVO);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 
	 * @Description 체육시설 등록페이지 리턴  
	 * @Author EGIS
	 * @Date 2022.03.16
	 * @return
	 */
	@RequestMapping(value = "/insertSportsView.do")
	public String insertSporView(){
		return "egiskorea/com/job/spor/SportsRegister";
	}
	
	/**
	 * 
	 * @Description 체육시설 상세페이지  
	 * @Author EGIS
	 * @Date 2022.03.16
	 * @param model
	 * @param sportsVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSportsDetail.do")
	public String sportsDetail(ModelMap model, @ModelAttribute("SportsVO") SportsVO sportsVO) throws Exception{
		
		SportsVO result = sportsService.selectSportsDetail(sportsVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/spor/sportsDetail";
	}
	
	/**
	 * 
	 * @Description 체육시설 등록페이지 리턴   
	 * @Author EGIS
	 * @Date 2022.03.16
	 * @param model
	 * @param sportsVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateSportsView.do")
	public String updateSportsView(ModelMap model, @ModelAttribute("SportsVO") SportsVO sportsVO) throws Exception{
		SportsVO result = sportsService.selectSportsDetail(sportsVO);
			model.addAttribute("result", result);
		return "egiskorea/com/job/spor/sportsUpdate";
	}
	
	/**
	 * 
	 * @Description 체육시설 수정  
	 * @Author EGIS
	 * @Date 2022.03.16
	 * @param model
	 * @param sportsVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateSports.do")
	public String updateSports(ModelMap model, @ModelAttribute("SportsVO") SportsVO sportsVO, HttpServletRequest request) throws Exception{
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		sportsVO.setLastUpdusrId(loginVO.getId());
		
		int cnt = sportsService.updateSports(sportsVO);
		
		SportsVO result = sportsService.selectSportsDetail(sportsVO);
		model.addAttribute("result", result);
		
		return "jsonView";
	}
	
	/**
	 * 
	 * @Description 체육시설 다운로드  
	 * @Author EGIS
	 * @Date 2022.03.16
	 * @param paramMap
	 * @param model
	 * @return
	 * @throws Exception
	 */
	HashMap exceldown;
	@RequestMapping(value = "/getAllSportsExcel.do")
	public ModelAndView getAllSportsExcel(@RequestParam Map paramMap, @ModelAttribute("SportsVO") SportsVO sportsVO, ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("excelDownloadView");
		
//		HashMap resultMap = sportsService.getAllSportsExcel(sportsVO);
		SXSSFWorkbook workbook = sportsService.makeSportsExcelList(exceldown);
		
		mav.addObject("locale", Locale.KOREA);
		mav.addObject("workbook", workbook);
		mav.addObject("workbookName", "체육시설목록");
		mav.addObject("fileType", "excel");
			
		return mav;
	}
	
	/**
	 * 
	 * @Description 체육시설 > poi poi_selectSportsList  
	 * @Author EGIS
	 * @Date 2022.03.16
	 * @param sportsVO
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "/poi_selectSportsList.do")
	public String poi_selectSportsList(@ModelAttribute("SportsVO") SportsVO sportsVO, ModelMap model, HttpServletRequest request) throws Exception{
	
		sportsVO.setPageUnit(10);
		sportsVO.setPageSize(propertyService.getInt("pageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(sportsVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(sportsVO.getPageUnit());
		paginationInfo.setPageSize(sportsVO.getPageSize());
		
		sportsVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		sportsVO.setLastIndex(paginationInfo.getLastRecordIndex());
		sportsVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		sportsVO.setSports_oper_mthd_cd(request.getParameter("sports_oper_mthd_cd"));
		sportsVO.setSporSearchAdres(request.getParameter("sporSearchAdres"));
		sportsVO.setSporSearchAlsfc_nm(request.getParameter("sporSearchAlsfc_nm"));
		sportsVO.setSporSpitalSearch(request.getParameter("sporSpitalSearch"));
		sportsVO.setSportsBuffer(Double.parseDouble(request.getParameter("sportsBuffer")) * 0.00001);
		
		Map<String, Object> map = sportsService.selectSportsList(sportsVO);

		int totCnt = Integer.parseInt((String) map.get("resultCnt"));
		
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("poi_list", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		return "jsonView";
	}

		
		/**
		 * 
		 * @Description 체육시설 > 운영정보 관리 > 운영정보 관리 페이지  
		 * @Author EGIS
		 * @Date 2022.03.16
		 * @param model
		 * @param sportsVO
		 * @return
		 * @throws Exception
		 */
		@RequestMapping(value = "/sportsMngView.do")
		public String sportsMngView(ModelMap model, @ModelAttribute("SportsVO") SportsVO sportsVO) throws Exception{
			
//			System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> gid : "+sportsVO.getGid());
//			System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> pageIndex : "+sportsVO.getPageIndex());

			sportsVO.setPageUnit(10);
			sportsVO.setPageSize(propertyService.getInt("pageSize"));

			PaginationInfo paginationInfo = new PaginationInfo();

			paginationInfo.setCurrentPageNo(sportsVO.getPageIndex());
			paginationInfo.setRecordCountPerPage(sportsVO.getPageUnit());
			paginationInfo.setPageSize(sportsVO.getPageSize());

			sportsVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
			sportsVO.setLastIndex(paginationInfo.getLastRecordIndex());
			sportsVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
			
			Map<String, Object> map = sportsService.selectSportsMngList(sportsVO);
			
			int totCnt = Integer.parseInt((String) map.get("resultCnt"));

			paginationInfo.setTotalRecordCount(totCnt);
			
//			System.out.println(map.get("resultList").equals(););
			
			model.addAttribute("sportsList", map.get("resultList"));
			model.addAttribute("resultCnt", map.get("resultCnt"));
			model.addAttribute("paginationInfo", paginationInfo);
			model.addAttribute("gid", sportsVO.getGid());
			
			sportsVO = sportsService.selectSportsDetail(sportsVO);
			model.addAttribute("sportsVO", sportsVO);
			
			model.addAttribute("result", "success");
			
			return "egiskorea/com/job/spor/SportsMngView";
		}

		/**
		 * 
		 * @Description 체육시설 > 운영정보 관리 > 운영정보 년도 중복 체크  
		 * @Author EGIS
		 * @Date 2022.03.16
		 * @param model
		 * @param sportsVO
		 * @return
		 * @throws Exception
		 */
		@RequestMapping(value = "/checkOperYear.do")
		public String checkOperYear(ModelMap model, @ModelAttribute("SportsVO") SportsVO sportsVO) throws Exception{
			
			int result = sportsService.checkSportsOperYear(sportsVO);
			
			model.addAttribute("result", result);

			return "jsonView";
		}
		
		/**
		 * 
		 * @Description 체육시설 > 운영정보 관리 > 운영정보 등록  
		 * @Author EGIS
		 * @Date 2022.03.16
		 * @param sportsVO
		 * @param request
		 * @return
		 * @throws Exception
		 */
		@RequestMapping("/insertSportsMngInfo.do")
		public ModelAndView insertSportsMngInfo( @ModelAttribute("SportsVO") SportsVO sportsVO, HttpServletRequest request) throws Exception{

		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		  
		sportsVO.setFrst_register_id(loginVO.getId());		// 최초 등록자
		sportsVO.setLast_updusr_id(loginVO.getId());		// 최종 수정자
  
			ModelAndView mav = new ModelAndView("jsonView");
			
			try {
				int rst = sportsService.insertSportsMngInfo(sportsVO);
//				System.out.println("insert result : "+rst);
				mav.addObject("result", "success");
				
			} catch(Exception e) {
				logger.info(e.getMessage());
				mav.addObject("result", "fail");
			}
			
			return mav;
		}
		
		/**
		 * 
		 * @Description  체육시설 > 운영정보 관리 > 운영정보 수정
		 * @Author EGIS
		 * @Date 2022.03.16
		 * @param sportsVO
		 * @param request
		 * @return
		 * @throws Exception
		 */
		@RequestMapping("/updateSportsMngInfo.do")
		public ModelAndView updateSportsMngInfo( @ModelAttribute("SportsVO") SportsVO sportsVO, HttpServletRequest request) throws Exception{

			LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
			 
			sportsVO.setLast_updusr_id(loginVO.getId());		// 최종 수정자
			
			ModelAndView mav = new ModelAndView("jsonView");
			
			try {
				int rst = sportsService.updateSportsMngInfo(sportsVO);
//				System.out.println("update result : "+rst);
				mav.addObject("result", "success");
				
			} catch(Exception e) {
				logger.info(e.getMessage());
				mav.addObject("result", "fail");
			}
			
			return mav;
		}
		
		/**
		 * 
		 * @Description  체육시설 > 운영정보 관리 > 운영정보 선택삭제  
		 * @Author EGIS
		 * @Date 2022.03.16
		 * @param sportsVO
		 * @param request
		 * @return
		 * @throws Exception
		 */
		@RequestMapping("/deleteSportsMng")
		public ModelAndView deleteSportsMng( @ModelAttribute("SportsVO") SportsVO sportsVO, HttpServletRequest request) throws Exception{
			
			ModelAndView mav = new ModelAndView("jsonView");
			
			
			String operYear = sportsVO.getOper_year().replace(",", "', '");
				
			operYear = "'"+operYear+"'";
			
			sportsVO.setOper_year(operYear);
			
			try {
				
				int rst = sportsService.deleteSportsMng(sportsVO);
//				System.out.println("delete result : "+rst);
				mav.addObject("result", "success");
				
			} catch(Exception e) {
				logger.info(e.getMessage());
				mav.addObject("result", "fail");
			}
			
			return mav;
		}
		
		/**
		 * 
		 * @Description 체육시설 > 시설정보 관리 페이지  
		 * @Author EGIS
		 * @Date 2022.03.16
		 * @param model
		 * @param sportsVO
		 * @return
		 * @throws Exception
		 */
		@RequestMapping(value = "/sportsFacMngView.do")
		public String sportsFacMngView(ModelMap model, @ModelAttribute("SportsVO") SportsVO sportsVO) throws Exception{
			
//			System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> gid : "+sportsVO.getGid());
//			System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> pageIndex : "+sportsVO.getPageIndex());

			sportsVO.setPageUnit(10);
			sportsVO.setPageSize(propertyService.getInt("pageSize"));

			PaginationInfo paginationInfo = new PaginationInfo();

			paginationInfo.setCurrentPageNo(sportsVO.getPageIndex());
			paginationInfo.setRecordCountPerPage(sportsVO.getPageUnit());
			paginationInfo.setPageSize(sportsVO.getPageSize());

			sportsVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
			sportsVO.setLastIndex(paginationInfo.getLastRecordIndex());
			sportsVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
			
			Map<String, Object> map = sportsService.selectSportsFacMngList(sportsVO);
			
			int totCnt = Integer.parseInt((String) map.get("resultCnt"));

			paginationInfo.setTotalRecordCount(totCnt);
			
//			System.out.println(map.get("resultList").equals(););
			
			model.addAttribute("sportsList", map.get("resultList"));
			model.addAttribute("resultCnt", map.get("resultCnt"));
			model.addAttribute("paginationInfo", paginationInfo);
			model.addAttribute("gid", sportsVO.getGid());
			
			sportsVO = sportsService.selectSportsDetail(sportsVO);
			model.addAttribute("sportsVO", sportsVO);
			
			model.addAttribute("result", "success");
			
			return "egiskorea/com/job/spor/SportsFacMngView";
		}
		
		/**
		 * 
		 * @Description 체육시설 > 시설정보 관리 > 보조시설 정보 신규 등록  
		 * @Author EGIS
		 * @Date 2022.03.15
		 * @param sportsVO
		 * @param request
		 * @return
		 * @throws Exception
		 */
		@RequestMapping("/insertSportsFacMngInfo.do")
		public ModelAndView insertSportsFacMngInfo( @ModelAttribute("SportsVO") SportsVO sportsVO, HttpServletRequest request) throws Exception{

			LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
			  
			sportsVO.setFrst_register_id(loginVO.getId());		// 최초 등록자
			sportsVO.setLast_updusr_id(loginVO.getId());		// 최종 수정자

			ModelAndView mav = new ModelAndView("jsonView");
			
			try {
				int rst = sportsService.insertSportsFacMngInfo(sportsVO);

				sportsVO = sportsService.selectSportsDetail(sportsVO);
				mav.addObject("resultVO", sportsVO);
				
//				System.out.println(rst);
				
				mav.addObject("result", "success");
				
			} catch(Exception e) {
				logger.info(e.getMessage());
				mav.addObject("result", "fail");
			}
			
			return mav;
		}
		
		/**
		 * 
		 * @Description  체육시설 > 시설정보관리 > 보조시설물 선택삭제
		 * @Author EGIS
		 * @Date 2022.03.16
		 * @param sportsVO
		 * @param request
		 * @return
		 * @throws Exception
		 */
		@RequestMapping("/deleteFacSportsMng")
		public ModelAndView deleteFacSportsMng( @ModelAttribute("SportsVO") SportsVO sportsVO, HttpServletRequest request) throws Exception{
			
			ModelAndView mav = new ModelAndView("jsonView");
			
			try {
				
				int rst = sportsService.deleteFacSportsMng(sportsVO);
//				System.out.println("delete result : "+rst);
				mav.addObject("result", "success");
				
			} catch(Exception e) {
				logger.info(e.getMessage());
				mav.addObject("result", "fail");
			}
			
			return mav;
		}
		
		/**
		 * 
		 * @Description  체육시설 > 보조시설 리스트 (poi)
		 * @Author EGIS
		 * @Date 2022.03.16
		 * @param model
		 * @param sportsVO
		 * @return
		 * @throws Exception
		 */
		@RequestMapping(value = "/sportsFacMngPoint.do")
		public String sportsFacMngPoint(ModelMap model, @ModelAttribute("SportsVO") SportsVO sportsVO) throws Exception{
			
			sportsVO.setPageUnit(10);
			sportsVO.setPageSize(propertyService.getInt("pageSize"));

			PaginationInfo paginationInfo = new PaginationInfo();

			paginationInfo.setCurrentPageNo(sportsVO.getPageIndex());
			paginationInfo.setRecordCountPerPage(sportsVO.getPageUnit());
			paginationInfo.setPageSize(sportsVO.getPageSize());

			sportsVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
			sportsVO.setLastIndex(paginationInfo.getLastRecordIndex());
			sportsVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
			
			Map<String, Object> map = sportsService.selectSportsFacMngList(sportsVO);
			
			int totCnt = Integer.parseInt((String) map.get("resultCnt"));

			paginationInfo.setTotalRecordCount(totCnt);
			
			model.addAttribute("sportsList", map.get("resultList"));
			
			model.addAttribute("result", "success");

			return "jsonView";
		}
}