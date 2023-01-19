package egiskorea.com.mngr.hist.web;

import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import egiskorea.com.cmm.service.impl.ExcelView;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.sts.com.StatsVO;
import egovframework.com.sts.cst.service.EgovConectStatsService;
import egovframework.com.sym.log.clg.service.EgovLoginLogService;
import egovframework.com.sym.log.clg.service.LoginLog;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 접속이력 관리 Controller
 * @author 플랫폼개발부문 DT솔루션 김선옥
 * @since 2022.01.26
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.26		김선옥	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/mngr/hist")
public class ConnectionManageController {

	@Resource(name="EgovLoginLogService")
	private EgovLoginLogService loginLogService;

	@Resource(name="propertiesService")
	protected EgovPropertyService propertyService;
	
	@Resource(name = "conectStatsService")
    private EgovConectStatsService conectStatsService;
	
	/**
	 * 접속이력 목록 조회
	 *
	 * @param loginLog
	 * @return sym/log/clg/EgovLoginLogList
	 * @throws Exception
	 */
	@RequestMapping(value="/selectConnectionHistoryList.do")
	public String selectConnectionHistoryList(@ModelAttribute("searchVO") LoginLog loginLog,
			ModelMap model) throws Exception{
		
		// 페이징 관련
		loginLog.setPageUnit(propertyService.getInt("pageUnit"));
		loginLog.setPageSize(propertyService.getInt("pageSize"));

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(loginLog.getPageIndex());
		paginationInfo.setRecordCountPerPage(loginLog.getPageUnit());
		paginationInfo.setPageSize(loginLog.getPageSize());

		loginLog.setFirstIndex(paginationInfo.getFirstRecordIndex());
		loginLog.setLastIndex(paginationInfo.getLastRecordIndex());
		loginLog.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		// 접속 목록 조회
		HashMap<?, ?> _map = (HashMap<?, ?>)loginLogService.selectLoginLogInf(loginLog);
		int totCnt = Integer.parseInt((String)_map.get("resultCnt"));

		model.addAttribute("resultList", _map.get("resultList"));
		model.addAttribute("resultCnt", _map.get("resultCnt"));

		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);

		return "egiskorea/com/adm/hist/selectConnectionHistoryList";
	}
	
	/**
	 * @Description 접속이력 목록 엑셀 다운로드 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.01.27
	 * @param loginLog
	 * @param request
	 * @param response
	 * @param model
	 * @throws Exception
	 */
	@RequestMapping(value="/downlaodConnectionHistoryListExcel.do")
	public void downlaodConnectionHistoryListExcel(
			@ModelAttribute("searchVO") LoginLog loginLog,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{ 
		
		Cookie cookie = new Cookie("fileDownload", URLEncoder.encode("FALSE", "UTF-8"));
		
		cookie.setPath("/");
		cookie.setMaxAge(1000 * 60 * 30); 
		response.addCookie(cookie);
		
		loginLog.setRecordCountPerPage(0);
		loginLog.setFirstIndex(0);
		
		HashMap<?, ?> _map = (HashMap<?, ?>)loginLogService.selectLoginLogInf(loginLog);
		
		ExcelView excelUtil = new ExcelView();
		excelUtil.downloadExcelData(request, response, _map.get("resultList"), "접속이력_", "connectionHistory_excel_template.xls");
	}
	
	/**
	 * @Description 시간별 접속이력 통계 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.02.03
	 * @param statsVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/selectConnectionHourlyStatistics.do")
	public String selectConnectionHourlyStatistics(
			@ModelAttribute("statsVO") StatsVO statsVO,
			ModelMap model) throws Exception{
		
		SimpleDateFormat format = new SimpleDateFormat ("yyyy-MM-dd");
		String dateStr = "";
		Date now = new Date();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Integer> hourlySum = new ArrayList<Integer>(Collections.nCopies(24, 0)); // 시간별 합계
		List<Integer> hourlyCnt = new ArrayList<Integer>(Collections.nCopies(24, 0)); // 시간별 횟수
		String esntlId, groupNm, orgnztNm, userNm; // 사용자ID, 그룹명, 조직명, 사용자명 
		int sum = 0; // 사용자별 합계
		int totalSum = 0; // 총 합계
		
		if(statsVO.getFromDate().equals("")) {
			dateStr = format.format(now);
		} else {
			dateStr = statsVO.getFromDate();
		}
		
		statsVO.setFromDate(dateStr.replaceAll("-", ""));
		statsVO.setPdKind("T");
		statsVO.setStatsKind("PRSONAL"); 
		
		List<?> conectStats = conectStatsService.selectConectStats(statsVO);
		
		esntlId = groupNm = orgnztNm = userNm = "";
		
		for(int i = 0; i < conectStats.size(); i++) {
			StatsVO vo = (StatsVO)conectStats.get(i);
			
			// 시간별 합계
			hourlySum.set(Integer.parseInt(vo.getStatsDate()),
					hourlySum.get(Integer.parseInt(vo.getStatsDate())) + vo.getStatsCo());
			
			// 사용자별 시간별 횟수 및 합계
			if(!vo.getEsntlId().equals(esntlId)) {
				if(i != 0) {
					resultMap.put("userNm", userNm);
					resultMap.put("groupNm", groupNm);
					resultMap.put("orgnztNm", orgnztNm);
					resultMap.put("hourlyList", hourlyCnt);
					resultMap.put("sum", sum);
					
					resultList.add(resultMap);
					
					resultMap = new HashMap<String, Object>();
					sum = 0;
				}
				
				hourlyCnt = new ArrayList<Integer>(Collections.nCopies(24, 0));
				esntlId = vo.getEsntlId();
				groupNm = vo.getGroupNm();
				orgnztNm = vo.getOrgnztNm();
				userNm = vo.getUserNm();
			}
			
			hourlyCnt.set(Integer.parseInt(vo.getStatsDate()), vo.getStatsCo());
			sum += vo.getStatsCo();
			totalSum += vo.getStatsCo();
		}
		
		if(conectStats.size() > 0) {
			resultMap.put("userNm", userNm);
			resultMap.put("groupNm", groupNm);
			resultMap.put("orgnztNm", orgnztNm);
			resultMap.put("hourlyList", hourlyCnt);
			resultMap.put("sum", sum);
			
			resultList.add(resultMap);
		}
		
		statsVO.setTotInqireCo(totalSum);
		statsVO.setFromDate(dateStr);
		
		model.addAttribute("chartStats", Arrays.asList(hourlySum).get(0));
		model.addAttribute("resultList", resultList);
	
		return "egiskorea/com/adm/hist/selectConnectionHourlyStatistics";
	}
	
	/**
	 * @Description 일별 접속이력 통계 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.02.03
	 * @param statsVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/selectConnectionDailyStatistics.do")
	public String selectConnectionDailyStatistics(
			@ModelAttribute("statsVO") StatsVO statsVO,
			ModelMap model) throws Exception{
		
		SimpleDateFormat format = new SimpleDateFormat ("yyyy-MM");
		String dateStr = "";
		Date now = new Date();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Integer> dailySum, dailyCnt;
		String esntlId, groupNm, orgnztNm, userNm; // 사용자ID, 그룹명, 조직명, 사용자명 
		int sum = 0; // 사용자별 합계
		int totalSum = 0; // 총 합계
		
		if(statsVO.getFromDate().equals("")) {
			dateStr = format.format(now);
		} else {
			dateStr = statsVO.getFromDate();
		}
		
		// 해당 달의 일수 계산
		int year = Integer.parseInt(dateStr.substring(0, 4));
		int month = Integer.parseInt(dateStr.substring(5, 7));
		LocalDate date = LocalDate.of(year, month, 1);
		int dayCnt = date.lengthOfMonth();
		
		dailySum = dailyCnt = new ArrayList<Integer>(Collections.nCopies(dayCnt, 0));
		
		statsVO.setFromDate(dateStr.replaceAll("-", ""));
		statsVO.setPdKind("D");
		statsVO.setStatsKind("PRSONAL"); 
		
		List<?> conectStats = conectStatsService.selectConectStats(statsVO);
		
		esntlId = groupNm = orgnztNm = userNm = "";
		
		for(int i = 0; i < conectStats.size(); i++) {
			StatsVO vo = (StatsVO)conectStats.get(i);
			
			// 일별 합계
			dailySum.set(Integer.parseInt(vo.getStatsDate()) - 1,
					dailySum.get(Integer.parseInt(vo.getStatsDate()) - 1) + vo.getStatsCo());
			
			// 사용자별 일별 횟수 및 합계
			if(!vo.getEsntlId().equals(esntlId)) {
				if(i != 0) {
					resultMap.put("userNm", userNm);
					resultMap.put("groupNm", groupNm);
					resultMap.put("orgnztNm", orgnztNm);
					resultMap.put("dailyList", dailyCnt);
					resultMap.put("sum", sum);
					
					resultList.add(resultMap);
					
					resultMap = new HashMap<String, Object>();
					sum = 0;
				}
				
				dailyCnt = new ArrayList<Integer>(Collections.nCopies(dayCnt, 0));
				esntlId = vo.getEsntlId();
				groupNm = vo.getGroupNm();
				orgnztNm = vo.getOrgnztNm();
				userNm = vo.getUserNm();
			}
			
			dailyCnt.set(Integer.parseInt(vo.getStatsDate()) - 1, vo.getStatsCo());
			sum += vo.getStatsCo();
			totalSum += vo.getStatsCo();
		}
		
		if(conectStats.size() > 0) {
			resultMap.put("userNm", userNm);
			resultMap.put("groupNm", groupNm);
			resultMap.put("orgnztNm", orgnztNm);
			resultMap.put("dailyList", dailyCnt);
			resultMap.put("sum", sum);
			
			resultList.add(resultMap);
		}
		
		statsVO.setTotInqireCo(totalSum);
		statsVO.setFromDate(dateStr);
		
		model.addAttribute("chartStats", Arrays.asList(dailySum).get(0));
		model.addAttribute("resultList", resultList);
			
		return "egiskorea/com/adm/hist/selectConnectionDailyStatistics";
	}
	
	/**
	 * @Description 월별 접속이력 통계 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.02.03
	 * @param statsVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/selectConnectionMonthlyStatistics.do")
	public String selectConnectionMonthlyStatistics(
			@ModelAttribute("statsVO") StatsVO statsVO,
			ModelMap model) throws Exception{
		
		SimpleDateFormat format = new SimpleDateFormat ("yyyy");
		String dateStr = "";
		Date now = new Date();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Integer> monthlySum, monthlyCnt;
		String esntlId, groupNm, orgnztNm, userNm; // 사용자ID, 그룹명, 조직명, 사용자명 
		int sum = 0; // 사용자별 합계
		int totalSum = 0; // 총 합계
		
		if(statsVO.getFromDate().equals("")) {
			dateStr = format.format(now);
		} else {
			dateStr = statsVO.getFromDate();
		}
		
		monthlySum = monthlyCnt = new ArrayList<Integer>(Collections.nCopies(12, 0));
		
		statsVO.setFromDate(dateStr.replaceAll("-", ""));
		statsVO.setPdKind("M");
		statsVO.setStatsKind("PRSONAL"); 
		
		List<?> conectStats = conectStatsService.selectConectStats(statsVO);
		
		esntlId = groupNm = orgnztNm = userNm = "";
		
		for(int i = 0; i < conectStats.size(); i++) {
			StatsVO vo = (StatsVO)conectStats.get(i);
			
			// 일별 합계
			monthlySum.set(Integer.parseInt(vo.getStatsDate()) - 1,
					monthlySum.get(Integer.parseInt(vo.getStatsDate()) -1) + vo.getStatsCo());
			
			// 사용자별 월별별 횟수 및 합계
			if(!vo.getEsntlId().equals(esntlId)) {
				if(i != 0) {
					resultMap.put("userNm", userNm);
					resultMap.put("groupNm", groupNm);
					resultMap.put("orgnztNm", orgnztNm);
					resultMap.put("monthlyList", monthlyCnt);
					resultMap.put("sum", sum);
					
					resultList.add(resultMap);
					
					resultMap = new HashMap<String, Object>();
					sum = 0;
				}
				
				monthlyCnt = new ArrayList<Integer>(Collections.nCopies(12, 0));
				esntlId = vo.getEsntlId();
				groupNm = vo.getGroupNm();
				orgnztNm = vo.getOrgnztNm();
				userNm = vo.getUserNm();
			}
			
			monthlyCnt.set(Integer.parseInt(vo.getStatsDate()) - 1, vo.getStatsCo());
			sum += vo.getStatsCo();
			totalSum += vo.getStatsCo();
		}
		
		if(conectStats.size() > 0) {
			resultMap.put("userNm", userNm);
			resultMap.put("groupNm", groupNm);
			resultMap.put("orgnztNm", orgnztNm);
			resultMap.put("monthlyList", monthlyCnt);
			resultMap.put("sum", sum);
			
			resultList.add(resultMap);
		}
		
		statsVO.setTotInqireCo(totalSum);
		statsVO.setFromDate(dateStr);
		
		model.addAttribute("chartStats", Arrays.asList(monthlySum).get(0));
		model.addAttribute("resultList", resultList);
		
		return "egiskorea/com/adm/hist/selectConnectionMonthlyStatistics";
	}
}
