package egiskorea.com.job.ibbi.web;

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

import com.google.gson.Gson;

import egiskorea.com.cmm.service.impl.ExcelView;
import egiskorea.com.job.cmss.service.CommonnessSpaceSearchService;
import egiskorea.com.job.cmss.service.TgdSccoEmdVO;
import egiskorea.com.job.ibbi.service.InBusinessEstaInfo;
import egiskorea.com.job.ibbi.service.InBusinessEstaInfoService;
import egiskorea.com.job.ibbi.service.InBusinessEstaInfoVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;


/**
 * @Description 관내업소정보 controller 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2022.02.17
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.10     이푸름		최초 생성	
 *  2022.02.17   전영후            2차 수정
 *  </pre>
 */
@Controller
@RequestMapping("/job/ibbi")
public class InBusinessEstaInfoController {
	
	private static final Logger logger = LoggerFactory.getLogger(InBusinessEstaInfoController.class);
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	/** 공통공간검색 서비스단 */
	@Resource(name = "commonnessSpaceSearchService") 
	private CommonnessSpaceSearchService commonnessSpaceSearchService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	@Resource(name = "inBusinessEstaInfoService")
	private InBusinessEstaInfoService inBusinessEstaInfoService;
	
	/**
	 * @Description : 관내업소정보 목록
	 * @Date 2022.02.17
	 * @param model
	 * @return "egiskorea/com/job/ibbi/inBusinessEstaInfoList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectInBusinessEstaInfoList.do")
	public String selectInBusinessEstaInfoList(
			@ModelAttribute("searchVO") InBusinessEstaInfoVO inBusinessEstaInfoVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{ 
		// 읍면동 리스트
		Map<String, Object> map = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		// 개방서비스명 리스트
		Map<String, Object> map2 = inBusinessEstaInfoService.selectInBusinessEstaInfoOpnnSvcNmList(inBusinessEstaInfoVO);
		
		model.addAttribute("sccoEndList", map.get("resultList"));
		model.addAttribute("opnnSvcNmList", map2.get("resultList"));
	
		return "egiskorea/com/job/ibbi/inBusinessEstaInfoList";
	}
	
	/**
	 * @Description : 관내업소정보 상세페이지 호출 
	 * @Date 2022.02.17
	 * @param model
	 * @return "egiskorea/com/job/ibbi/selectInBusinessEstaInfo"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectInBusinessEstaInfo.do")
	public String selectInBusinessEstaInfo( 
			@ModelAttribute("inBusinessEstaInfoVO") InBusinessEstaInfoVO inBusinessEstaInfoVO,
			ModelMap model) throws Exception{ 
		
		InBusinessEstaInfo result = inBusinessEstaInfoService.selectInBusinessEstaInfo(inBusinessEstaInfoVO);
		model.addAttribute("result", result);
				
		return "egiskorea/com/job/ibbi/inBusinessEstaInfo";
	}
	
	/**
	 * @Description : 관내업소정보 엑셀다운로드
	 * @Date 2022.02.17
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectInBusinessEstaInfoExcelListDownload.do")
	public void selectInBusinessEstaInfoExcelListDownload(
			@ModelAttribute("inBusinessEstaInfoVO") InBusinessEstaInfoVO inBusinessEstaInfoVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception {
		
		 List<InBusinessEstaInfoVO> excelVO = inBusinessEstaInfoService.selectInBusinessEstaInfoExcelList(inBusinessEstaInfoVO);
		
		 String[] titleArr = new String[27];
		 titleArr[0] = "번호";
		 titleArr[1] = "행정구역코드";
		 titleArr[2] = "개방서비스명";
		 titleArr[3] = "개방서비스ID";
		 titleArr[4] = "개방자치단체코드";
		 titleArr[5] = "관리번호";
		 titleArr[6] = "인허가일자";
		 titleArr[7] = "인허가취소일자";
		 titleArr[8] = "영업상태구분코드";
		 titleArr[9] = "영업상태명";
		 titleArr[10] = "상세영업상태코드";
		 titleArr[11] = "상세영업상태명";
		 titleArr[12] = "폐업일자";
		 titleArr[13] = "휴업일자";
		 titleArr[14] = "휴업종료일자";
		 titleArr[15] = "재개업일자";
		 titleArr[16] = "소재지전화";
		 titleArr[17] = "소재지면적";
		 titleArr[18] = "소재지우편번호";
		 titleArr[19] = "소재지전체주소";
		 titleArr[20] = "도로명전체주소";
		 titleArr[21] = "도로명우편번호";
		 titleArr[22] = "사업장명";
		 titleArr[23] = "최종수정시점";
		 titleArr[24] = "데이터갱신구분";
		 titleArr[25] = "데이터갱신일자";
		 titleArr[26] = "업태구분명";
		 
		 String[] voTitleArr = new String[27];
		 voTitleArr[0] = "no";
		 voTitleArr[1] = "pnu";
		 voTitleArr[2] = "opnnSvcNm";
		 voTitleArr[3] = "opnnSvcId";
		 voTitleArr[4] = "opnnGmGrpCd";
		 voTitleArr[5] = "mngNo";
		 voTitleArr[6] = "aupmDe";
		 voTitleArr[7] = "aupmCanlDe";
		 voTitleArr[8] = "bsnStaeSeCd";
		 voTitleArr[9] = "bsnStaeNm";
		 voTitleArr[10] = "dealBsnStaeCd";
		 voTitleArr[11] = "dealBsnStaeNm";
		 voTitleArr[12] = "cbizDe";
		 voTitleArr[13] = "sobsDe";
		 voTitleArr[14] = "sobsEndDe";
		 voTitleArr[15] = "relcDe";
		 voTitleArr[16] = "lcTlp";
		 voTitleArr[17] = "lcAr";
		 voTitleArr[18] = "lcZip";
		 voTitleArr[19] = "lcAllAdr";
		 voTitleArr[20] = "rdnAllAdr";
		 voTitleArr[21] = "rdnZip";
		 voTitleArr[22] = "bplcNm";
		 voTitleArr[23] = "lastUpdtPnttm";
		 voTitleArr[24] = "dataUpdtSe";
		 voTitleArr[25] = "dataUpdtDe";
		 voTitleArr[26] = "bizcSeNm";
		 
		 ExcelView.excelDownload(request, response,  "관내업소정보조회_", titleArr, voTitleArr, excelVO);
	}
	
}