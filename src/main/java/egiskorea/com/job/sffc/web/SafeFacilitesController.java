package egiskorea.com.job.sffc.web;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.job.sffc.service.SafeFacilitesService;
import egiskorea.com.job.sffc.service.SafeFacilitesVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@Controller
@RequestMapping("/job/sffc")
public class SafeFacilitesController {
	
	/*
	 * @Resource(name = "safeFacilitesService") private SafeFacilitesService
	 * safeFacilitesService;
	 */
	
	/*
	 * @RequestMapping(value = "/selectSafeFacilitiesList.do") public String
	 * selectLandBuilderList( ModelMap model) throws Exception{
	 * 
	 * return "egiskorea/com/job/sffc/safeFacilitiesList"; }
	 * 
	 * @RequestMapping(value = "/selectWtlFacilitiesList.do") public String
	 * selectWtlFacilitiesList( ModelMap model) throws Exception{
	 * 
	 * return "egiskorea/com/job/sffc/wtlFacilitiesList"; }
	 * 
	 * @RequestMapping(value = "/selectWtlList.do")
	 * 
	 * @ResponseBody public ModelAndView selectWtlList(@ModelAttribute
	 * SafeFacilitesVO vo) throws Exception { ModelAndView mv = new
	 * ModelAndView("jsonView");
	 * 
	 * try { int cnt = safeFacilitesService.selectWtlCnt(vo);
	 * System.out.println("전체개수 : " + cnt); PaginationInfo paginationInfo = new
	 * PaginationInfo(); paginationInfo.setTotalRecordCount(cnt);
	 * paginationInfo.setPageSize(5); paginationInfo.setRecordCountPerPage(5);
	 * paginationInfo.setCurrentPageNo(vo.getCurrentPageNo());
	 * 
	 * 
	 * // LOGGER.info("현재페이지번호: " + paginationInfo.getCurrentPageNo()); //
	 * LOGGER.info("페이징 SQL의 조건절에 사용되는 시작: " +
	 * paginationInfo.getFirstRecordIndex()); // LOGGER.info("페이지 리스트의 첫 페이지 번호: " +
	 * paginationInfo.getFirstPageNoOnPageList()); //
	 * LOGGER.info("페이지 리스트의 마지막 페이지 번호: " +
	 * paginationInfo.getLastPageNoOnPageList()); // // LOGGER.info("첫번째페이지번호: " +
	 * paginationInfo.getFirstPageNo()); // LOGGER.info("마지막페이지번호: " +
	 * paginationInfo.getLastPageNo());
	 * 
	 * vo.setCurrentPageNo(paginationInfo.getCurrentPageNo());
	 * vo.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
	 * vo.setFirstRecordIndex(paginationInfo.getFirstRecordIndex());
	 * System.out.println(vo.getFirstRecordIndex());
	 * 
	 * 
	 * List<EgovMap> safeList = safeFacilitesService.selectWtlList(vo);
	 * mv.addObject("paginationInfo", paginationInfo); mv.addObject("safeList",
	 * safeList); mv.addObject("cnt", cnt); } catch (Exception e) { // TODO: handle
	 * exception }
	 * 
	 * return mv; }
	 */
}
