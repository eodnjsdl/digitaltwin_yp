package egiskorea.com.geo.emi.web;

import java.io.InputStream;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egiskorea.com.cmm.service.impl.ExcelView;
import egiskorea.com.geo.emi.service.AdministrationZone;
import egiskorea.com.geo.emi.service.ExaminationInfo;
import egiskorea.com.geo.emi.service.ExaminationInfoService;
import egiskorea.com.geo.emi.service.ExaminationInfoVO;
import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.util.EgovResourceCloseHelper;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 조사정보를 관리하는 사용자 controller 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.11.09
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.11.09		이상화	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/geo/emi")
public class ExaminationInfoController {
	
	private static final Logger logger = LoggerFactory.getLogger(ExaminationInfoController.class);
			
	@Resource(name = "examinationInfoService")
	private ExaminationInfoService examinationInfoService;
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	/**
	 * @Description 행정구역별 조사정보 목록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @param model
	 * @return "egiskorea/com/geo/emi/administrationZoneList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectAdministrationZoneList.do")
	public String selectAdministrationZoneList(
			@ModelAttribute("searchVO") ExaminationInfoVO examinationInfoVO,
			ModelMap model) throws Exception{
		
		examinationInfoVO.setPageUnit(11);
		examinationInfoVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(examinationInfoVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(examinationInfoVO.getPageUnit());
		paginationInfo.setPageSize(examinationInfoVO.getPageSize());

		examinationInfoVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		examinationInfoVO.setLastIndex(paginationInfo.getLastRecordIndex());
		examinationInfoVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		
		Map<String, Object> map = examinationInfoService.selectAdministrationZoneList(examinationInfoVO);
		  
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		// 행정구역
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		vo.setCodeId("YPEMD");	// 읍면동
		List<?> code1List = cmmUseService.selectCmmCodeDetail(vo);
				
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("code1List", code1List);

	    return "egiskorea/com/geo/emi/administrationZoneList";
	}
	
	/**
	 * @Description 행정구역별 조사정보 등록 화면
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @param model
	 * @return "egiskorea/com/geo/emi/administrationZoneView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertAdministrationZoneView.do")
	public String insertAdministrationZoneView(
			@ModelAttribute("administrationZone") AdministrationZone administrationZone,
			ModelMap model) throws Exception{ 
		
		// 행정구역
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		vo.setCodeId("YPEMD");	// 읍면동
		List<?> code1List = cmmUseService.selectCmmCodeDetail(vo);
		
		model.addAttribute("code1List", code1List);
		
		return "egiskorea/com/geo/emi/administrationZoneView";
	}
	
	/**
	 * @Description 행정구역별 조사정보 등록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @param model
	 * @return "egiskorea/com/cmm/actionResult2"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertAdministrationZone.do")
	public String insertAdministrationZone(
			final MultipartHttpServletRequest multiRequest,
			@ModelAttribute("administrationZone") AdministrationZone administrationZone,
			ModelMap model) throws Exception{ 
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		if(!isAuthenticated) {	
            return "redirect:/";
        }
		
		if (isAuthenticated) {	
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
			InputStream fis = null;
			
			Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
			MultipartFile file;
	
			while (itr.hasNext()) {
				Entry<String, MultipartFile> entry = itr.next();
				file = entry.getValue();
				
				if (!"".equals(file.getOriginalFilename())) {
					// 업로드 파일에 대한 확장자를 체크
					if (file.getOriginalFilename().endsWith(".xls") || file.getOriginalFilename().endsWith(".xlsx") || file.getOriginalFilename().endsWith(".XLS") || file.getOriginalFilename().endsWith(".XLSX")) {
						try {
							fis = file.getInputStream();
							
							if(file.getOriginalFilename().endsWith(".xls") || file.getOriginalFilename().endsWith(".XLS")) {
								examinationInfoService.excelExaminationInfoUpload(fis, "xls");									
							}else if(file.getOriginalFilename().endsWith(".xlsx") || file.getOriginalFilename().endsWith(".XLSX")) {
								examinationInfoService.excelExaminationInfoUpload(fis, "xlsx");									
							}
						} finally {
							EgovResourceCloseHelper.close(fis);
						}
					} else {
						model.addAttribute("resultMsg", "common.validate.excelNotMatch");
						return "egiskorea/com/cmm/actionResult2";
					}
				}				
			}
			
			administrationZone.setFrstRegisterId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
			administrationZone.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
			examinationInfoService.insertAdministrationZone(administrationZone);
			
			model.addAttribute("resultMsg", "ok");
		}else {
			model.addAttribute("resultMsg", "fail");
		}
		return "egiskorea/com/cmm/actionResult2";
	}
	
	/**
	 * @Description 행정구역별 조사정보 삭제
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @param model
	 * @return "egiskorea/com/cmm/actionResult"
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteAdministrationZone.do")
	public String deleteAdministrationZone(
			@ModelAttribute("administrationZone") AdministrationZone administrationZone,
			ModelMap model) throws Exception{ 
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		if(!isAuthenticated) {	
            return "redirect:/";
        }
		
		if (isAuthenticated) {	
			examinationInfoService.deleteAdministrationZone(administrationZone);
			model.addAttribute("resultMsg", "common.success.code");
		}else {
			model.addAttribute("resultMsg", "common.fail.code");
		}
		
		return "egiskorea/com/cmm/actionResult2";
	}
	
	/**
	 * @Description 조사정보 목록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @param model
	 * @return "egiskorea/com/geo/emi/examinationInfoList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectExaminationInfoList.do")
	public String selectExaminationInfoList(
			@ModelAttribute("searchVO") ExaminationInfoVO examinationInfoVO,
			ModelMap model) throws Exception{
		
		examinationInfoVO.setPageUnit(12);
		examinationInfoVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(examinationInfoVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(examinationInfoVO.getPageUnit());
		paginationInfo.setPageSize(examinationInfoVO.getPageSize());

		examinationInfoVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		examinationInfoVO.setLastIndex(paginationInfo.getLastRecordIndex());
		examinationInfoVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		
		Map<String, Object> map = examinationInfoService.selectExaminationInfoList(examinationInfoVO);
		  
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("li", examinationInfoVO.getCode2());
		
		return "egiskorea/com/geo/emi/examinationInfoList";
	}
	
	/**
	 * @Description 조사정보 상세조회
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @param model
	 * @return "egiskorea/com/geo/emi/examinationInfo"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectExaminationInfo.do")
	public String selectExaminationInfo(
			@ModelAttribute("examinationInfoVO") ExaminationInfoVO examinationInfoVO,
			ModelMap model) throws Exception{ 
		
		ExaminationInfo result = examinationInfoService.selectExaminationInfo(examinationInfoVO);		
		
		model.addAttribute("result", result);
		
		return "egiskorea/com/geo/emi/examinationInfo";
	}
	
	/**
	 * @Description  조사정보 수정 화면
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.12
	 * @param examinationInfoVO
	 * @param model
	 * @return "egiskorea/com/geo/emi/examinationInfoView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateExaminationInfoView.do")
	public String updateExaminationInfoView(
			@ModelAttribute("examinationInfoVO") ExaminationInfoVO examinationInfoVO,
			ModelMap model) throws Exception{ 
		
		ExaminationInfo examinationInfo = examinationInfoService.updateExaminationInfoView(examinationInfoVO);		
		
		//코드정보 조회
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		
		vo.setCodeId("J0200");	// 원지목
		List<?> oriList = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("J0100");	// 지목일치여부
		List<?> j0100List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("J0200");	// 재설정지목
		List<?> j0200List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("J0301");	// 대분류(현실지목)
		List<?> j0301List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("J0302");	// 소분류(현실지목)
		List<?> j0302List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("J0401");	// 토지용도
		List<?> j0401List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("J0401P");	// 토지용도(%)
		List<?> j0401pList = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("J0501");	// 건물용도
		List<?> j0501List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("J0501P");	// 건물용도(%)
		List<?> j0501pList = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("G0100");	// 국공유지
		List<?> g0100List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("CHANGE");	// 변경
		List<?> changeList = cmmUseService.selectCmmCodeDetail(vo);
		
		vo.setCodeId("C0100");	// 용도지역
		List<?> c0100List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("C0200");	// 용도지구
		List<?> c0200List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("C0301");	// 기타제한 제주도
		List<?> c0301List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("C0302");	// 기타제한 도시계획신설
		List<?> c0302List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("C0401");	// 고저
		List<?> c0401List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("C0402");	// 형상
		List<?> c0402List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("C0403");	// 방위
		List<?> c0403List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("C0500");	// 도로접면
		List<?> c0500List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("C0601");	// 철도,고속도로등
		List<?> c0601List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("C0602");	// 폐기물,수질오염
		List<?> c0602List = cmmUseService.selectCmmCodeDetail(vo);
		
		vo.setCodeId("L0100");	// 기타제한(공적규제)
		List<?> l0100List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("L0201");	// 대분류(토지이용상황) 
		List<?> l0201List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("L0202");	// 소분류(토지이용상황) 
		List<?> l0202List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("L0301");	// 구분 (농지) 
		List<?> l0301List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("L0302");	// 비옥도(농지) 
		List<?> l0302List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("L0303");	// 경지정리(농지) 
		List<?> l0303List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("L0400");	// 임야 
		List<?> l0400List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("L0500");	// 도로거리(도로조건) 
		List<?> l0500List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("L0601");	// 사업방식(대규모개발사업) 
		List<?> l0601List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("L0602");	// 사업단계(대규모개발사업) 		
		List<?> l0602List = cmmUseService.selectCmmCodeDetail(vo);
		
		vo.setCodeId("B0101");	// 기타제한(공적규제) 
		List<?> b0101List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B0102");	// 개발사업지역구분(공적규제) 
		List<?> b0102List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B0201");	// 대분류(토지이용상황) 
		List<?> b0201List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B0202");	// 소분류(토지이용상황) 
		List<?> b0202List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B0300");	// 토지용도구분(지형지세) 
		List<?> b0300List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B0400");	// 건물구조 
		List<?> b0400List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B0500");	// 건물지붕 
		List<?> b0500List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B0601");	// 대분류(건물용도) 
		List<?> b0601List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B0602");	// 소분류(건물용도) 
		List<?> b0602List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B0700");	// 증개축 
		List<?> b0700List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B0800");	// 리모델링 
		List<?> b0800List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B0900");	// 특수부대시설 
		List<?> b0900List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B1000");	// 주택유형구분 
		List<?> b1000List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("B1100");	// 공가주택구분 		
		List<?> b1100List = cmmUseService.selectCmmCodeDetail(vo);
		
		vo.setCodeId("T0100");	// 전(시설재배치)		
		List<?> t0100List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("T0200");	// 기타재배지(원예) 
		List<?> t0200List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("T0300");	// 산림지역(활엽) 
		List<?> t0300List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("T0400");	// 초지(자연,인공) 
		List<?> t0400List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("T0500");	// 습지(내륙,연안) 
		List<?> t0500List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("T0600");	// 나지(자연,기타) 
		List<?> t0600List = cmmUseService.selectCmmCodeDetail(vo);
		vo.setCodeId("T0700");	// 수역(해양수) 
		List<?> t0700List = cmmUseService.selectCmmCodeDetail(vo);
		
		model.addAttribute("examinationInfo", examinationInfo);
		model.addAttribute("oriList", oriList);
		model.addAttribute("j0100List", j0100List);
		model.addAttribute("j0200List", j0200List);
		model.addAttribute("j0301List", j0301List);
		model.addAttribute("j0302List", j0302List);
		model.addAttribute("j0401List", j0401List);
		model.addAttribute("j0401pList", j0401pList);
		model.addAttribute("j0501List", j0501List);
		model.addAttribute("j0501pList", j0501pList);
		model.addAttribute("g0100List", g0100List);
		model.addAttribute("changeList", changeList);
		
		model.addAttribute("c0100List", c0100List);
		model.addAttribute("c0200List", c0200List);
		model.addAttribute("c0301List", c0301List);
		model.addAttribute("c0302List", c0302List);
		model.addAttribute("c0401List", c0401List);
		model.addAttribute("c0402List", c0402List);
		model.addAttribute("c0403List", c0403List);
		model.addAttribute("c0500List", c0500List);
		model.addAttribute("c0601List", c0601List);
		model.addAttribute("c0602List", c0602List);
		
		model.addAttribute("l0100List", l0100List);
		model.addAttribute("l0201List", l0201List);
		model.addAttribute("l0202List", l0202List);
		model.addAttribute("l0301List", l0301List);
		model.addAttribute("l0302List", l0302List);
		model.addAttribute("l0303List", l0303List);
		model.addAttribute("l0400List", l0400List);
		model.addAttribute("l0500List", l0500List);
		model.addAttribute("l0601List", l0601List);
		model.addAttribute("l0602List", l0602List);
		
		model.addAttribute("b0101List", b0101List);
		model.addAttribute("b0102List", b0102List);
		model.addAttribute("b0201List", b0201List);
		model.addAttribute("b0202List", b0202List);
		model.addAttribute("b0300List", b0300List);
		model.addAttribute("b0400List", b0400List);
		model.addAttribute("b0500List", b0500List);
		model.addAttribute("b0601List", b0601List);
		model.addAttribute("b0602List", b0602List);
		model.addAttribute("b0700List", b0700List);
		model.addAttribute("b0800List", b0800List);
		model.addAttribute("b0900List", b0900List);
		model.addAttribute("b1000List", b1000List);
		model.addAttribute("b1100List", b1100List);
		
		model.addAttribute("t0100List", t0100List);
		model.addAttribute("t0200List", t0200List);
		model.addAttribute("t0300List", t0300List);
		model.addAttribute("t0400List", t0400List);
		model.addAttribute("t0500List", t0500List);
		model.addAttribute("t0600List", t0600List);
		model.addAttribute("t0700List", t0700List);
		
		return "egiskorea/com/geo/emi/examinationInfoView";
	}
	
	/**
	 * @Description  조사정보 수정 화면
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.12
	 * @param examinationInfoVO
	 * @param model
	 * @return "egiskorea/com/geo/emi/examinationInfoView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateExaminationInfo.do")
	public String updateExaminationInfo(
			@ModelAttribute("examinationInfo") ExaminationInfo examinationInfo,
			ModelMap model) throws Exception{ 
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		if (isAuthenticated) {	
			
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			
			examinationInfo.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
			
			examinationInfoService.updateExaminationInfo(examinationInfo);
			
			model.addAttribute("resultMsg", "common.success.code");
		}else {
			model.addAttribute("resultMsg", "common.fail.code");
		}
		
		return "egiskorea/com/cmm/actionResult2";
	}
	
	/**
	 * @Description 조사정보 다중 삭제
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.11
	 * @param examinationInfoVO
	 * @param model
	 * @return "egiskorea/com/cmm/actionResult2"
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteExaminationInfoList.do")
	public String deleteExaminationInfoList(
			@RequestParam("selCodes") String selCdes,
			@ModelAttribute("examinationInfoVO") ExaminationInfoVO examinationInfoVO,
			ModelMap model) throws Exception{ 
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		if (isAuthenticated) {	
			String [] strSelCdes = selCdes.split(";");
			for(int i=0; i<strSelCdes.length; i++) {
				examinationInfoVO.setOrgFid(strSelCdes[i]);
				examinationInfoService.deleteExaminationInfo(examinationInfoVO);
			}
			model.addAttribute("resultMsg", "common.success.code");
		}else {
			model.addAttribute("resultMsg", "common.fail.code");
		}
		
		return "egiskorea/com/cmm/actionResult2";
	}
	
	/**
	 * @Description 조사정보 엑셀 다운로드 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.11
	 * @param examinationInfoVO
	 * @param request
	 * @param response
	 * @param model
	 * @return egiskorea/com/cmm/actionResult2
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectExaminationInfoListDownload.do")
	public void selectExaminationInfoListDownload(
			@ModelAttribute("examinationInfoVO") ExaminationInfoVO examinationInfoVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{ 
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		Cookie cookie = new Cookie("fileDownload", URLEncoder.encode("FALSE", "UTF-8"));
		
		cookie.setPath("/");
		cookie.setMaxAge(1000 * 60 * 30); 
		response.addCookie(cookie);
		
		if (isAuthenticated) {	
			Map<String, Object> map = examinationInfoService.selectExaminationInfoExcelList(examinationInfoVO);
			
			ExcelView excelUtil = new ExcelView();
			excelUtil.downloadExcelData(request, response, map.get("resultList"), "양평군_", "examinationinfo_excel_template.xls");
		}
	}
}
