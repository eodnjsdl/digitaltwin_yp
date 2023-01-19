package egovframework.com.uss.olh.opqna.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.cmm.util.EgovXssChecker;
import egovframework.com.uss.olh.opqna.service.EgovOpQnaService;
import egovframework.com.uss.olh.opqna.service.OpQnaDefaultVO;
import egovframework.com.uss.olh.opqna.service.OpQnaVO;
import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
/**
*
* Q&A를 처리하는 Controller 클래스
* @author 공통서비스 개발팀 박정규
* @since 2009.04.01
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*   수정일     	수정자           			수정내용
*  ------------   --------    ---------------------------------------------
*   2009.04.01  	박정규          최초 생성
*   2011.08.26		정진오			IncludedInfo annotation 추가
*   2011.10.21		이기하			삭제시 비밀번호 확인 추가(최종감리 반영)
*   2016.08.05		김연호			표준프레임워크 3.6 개선
*
* </pre>
*/
@Controller
public class EgovOpQnaController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(EgovOpQnaController.class);
	
	@Resource(name = "EgovOpQnaService")
	private EgovOpQnaService EgovOpQnaService;

	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;

	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;

	// Validation 관련
	@Autowired
	private DefaultBeanValidator beanValidator;
	
	/**
	 * Q&A정보 목록을 조회한다. (pageing)
	 * @param searchVO
	 * @param model
	 * @return	"/uss/olh/opqna/EgovOpQnaListInqire"
	 * @throws Exception
	 */
	@IncludedInfo(name = "운영 Q&A관리", order = 550, gid = 50)
	@RequestMapping(value = "/uss/olh/Opqna/selectOpQnaList.do")
	public String selectOpQnaList(@ModelAttribute("searchVO") OpQnaVO searchVO, ModelMap model) throws Exception {

		/** EgovPropertyService.SiteList */
		searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
		searchVO.setPageSize(propertiesService.getInt("pageSize"));

		/** pageing */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());

		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		List<?> QnaList = EgovOpQnaService.selectOpQnaList(searchVO);
		model.addAttribute("resultList", QnaList);

		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			model.addAttribute("certificationAt", "N");
		} else {
			model.addAttribute("certificationAt", "Y");
		}

		int totCnt = EgovOpQnaService.selectOpQnaListCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);

		return "egovframework/com/uss/olh/Opqna/EgovOpQnaList";
	}
	
	/**
	 * Q&A정보 목록에 대한 상세정보를 조회한다.
	 * @param passwordConfirmAt
	 * @param qnaVO
	 * @param searchVO
	 * @param model
	 * @return	"/uss/olh/opqna/EgovOpQnaDetail"
	 * @throws Exception
	 */
	@SuppressWarnings("deprecation")
	@RequestMapping("/uss/olh/opqna/selectOpQnaDetail.do")
	public String selectOpQnaDetail(@RequestParam("qaId") String qaId, OpQnaVO qnaVO, @ModelAttribute("searchVO") OpQnaDefaultVO searchVO, ModelMap model) throws Exception {

		qnaVO.setQaId(qaId);
		
		//조회수 수정처리
		EgovOpQnaService.updateOpQnaInqireCo(qnaVO);
		
		OpQnaVO vo = EgovOpQnaService.selectOpQnaDetail(qnaVO);

		// 작성 비밀번호를 얻는다.
//		String writngPassword = vo.getWritngPassword();

		// EgovFileScrty Util에 있는 암호화 모듈을 적용해서 복호화한다.
//		vo.setWritngPassword(EgovFileScrty.decode(writngPassword));
		
		model.addAttribute("result", vo);

		return "egovframework/com/uss/olh/opqna/EgovOpQnaDetail";
	}
	
	/**
	 * Q&A정보를 등록하기 위한 전 처리(인증체크)
	 * @param searchVO
	 * @param qnaManageVO
	 * @param model
	 * @return	"/uss/olh/opqna/EgovOpQnaRegist"
	 * @throws Exception
	 */
	@RequestMapping("/uss/olh/opqna/insertOpQnaView.do")
	public String insertQnaView(@ModelAttribute("searchVO") OpQnaVO searchVO, OpQnaVO qnaVO, Model model) throws Exception {

		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			model.addAttribute("qnaVO", qnaVO);
			return "egovframework/com/uss/olh/opqna/EgovQnaRegist";
		}

		// 로그인VO에서  사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

		String wrterNm = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getName()); // 사용자명
		String emailAdres = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getEmail()); // email 주소

		qnaVO.setWrterNm(wrterNm); // 작성자명
		qnaVO.setEmailAdres(emailAdres); // email 주소

		model.addAttribute("qnaVO", qnaVO);

		return "egovframework/com/uss/olh/opqna/EgovOpQnaRegist";

	}
	
	/**
	 * Q&A정보를 등록한다.
	 * @param searchVO
	 * @param qnaVO
	 * @param bindingResult
	 * @return	"forward:/uss/olh/opqna/selectQnaList.do"
	 * @throws Exception
	 */
	@SuppressWarnings("deprecation")
	@RequestMapping("/uss/olh/opqna/insertOpQna.do")
	public String insertOpQna(@ModelAttribute("searchVO") OpQnaVO searchVO, @ModelAttribute("qnaVO") OpQnaVO qnaVO, BindingResult bindingResult,
			ModelMap model) throws Exception {

		beanValidator.validate(qnaVO, bindingResult);

		if (bindingResult.hasErrors()) {
			return "egovframework/com/uss/olh/opqna/EgovOpQnaRegist";
		}

		// 로그인VO에서  사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

		String frstRegisterId = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getUniqId());

		qnaVO.setFrstRegisterId(frstRegisterId); // 최초등록자ID
		qnaVO.setLastUpdusrId(frstRegisterId); // 최종수정자ID

		// 작성비밀번호를 암호화 하기 위해서 Get
//		String writngPassword = qnaVO.getWritngPassword();

		// EgovFileScrty Util에 있는 암호화 모듈을 적용해서 암호화 한다.
//		qnaVO.setWritngPassword(EgovFileScrty.encode(writngPassword));

		EgovOpQnaService.insertOpQna(qnaVO);

		return "forward:/uss/olh/opqna/selectOpQnaList.do";
	}
	
	/**
	 * Q&A정보를 수정하기 위한 전 처리
	 * @param qnaVO
	 * @param searchVO
	 * @param model
	 * @return	"/uss/olh/opqna/EgovOpOpQnaUpdt
	 * @throws Exception
	 */
	@SuppressWarnings("deprecation")
	@RequestMapping("/uss/olh/opqna/updateOpQnaView.do")
	public String updateOpQnaView(OpQnaVO qnaVO, @ModelAttribute("searchVO") OpQnaVO searchVO, ModelMap model) throws Exception {

		OpQnaVO vo = EgovOpQnaService.selectOpQnaDetail(qnaVO);

		// 작성 비밀번호를 얻는다.
//		String writngPassword = vo.getWritngPassword();

		// EgovFileScrty Util에 있는 암호화 모듈을 적용해서 복호화한다.
//		vo.setWritngPassword(EgovFileScrty.decode(writngPassword));

		model.addAttribute("qnaVO", vo);

		return "egovframework/com/uss/olh/opqna/EgovOpQnaUpdt";
	}
	
	/**
	 * Q&A정보를 수정처리한다.
	 * @param searchVO
	 * @param qnaVO
	 * @param bindingResult
	 * @return	"forward:/uss/olh/opqna/selectOpQnaList.do"
	 * @throws Exception
	 */
	@SuppressWarnings("deprecation")
	@RequestMapping("/uss/olh/opqna/updateOpQna.do")
	public String updateOpQna(
    		HttpServletRequest request,
			@ModelAttribute("searchVO") OpQnaVO searchVO,
			@ModelAttribute("qnaVO") OpQnaVO qnaVO, 
			BindingResult bindingResult) throws Exception {

		// Validation
		beanValidator.validate(qnaVO, bindingResult);

		if (bindingResult.hasErrors()) {
			return "egovframework/com/uss/olh/opqna/EgovOpQnaUpdt";
		}
		
    	//--------------------------------------------------------------------------------------------
    	// @ XSS 사용자권한체크 START
    	// param1 : 사용자고유ID(uniqId,esntlId)
    	//--------------------------------------------------------
    	LOGGER.debug("@ XSS 권한체크 START ----------------------------------------------");
    	//step1 DB에서 해당 게시물의 uniqId 조회
    	OpQnaVO vo = EgovOpQnaService.selectOpQnaDetail(qnaVO);;
    	
    	//step2 EgovXssChecker 공통모듈을 이용한 권한체크
    	EgovXssChecker.checkerUserXss(request, vo.getFrstRegisterId()); 
      	LOGGER.debug("@ XSS 권한체크 END ------------------------------------------------");
    	//--------------------------------------------------------
    	// @ XSS 사용자권한체크 END
    	//--------------------------------------------------------------------------------------------

		// 로그인VO에서  사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		String lastUpdusrId = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getUniqId());

		qnaVO.setLastUpdusrId(lastUpdusrId); // 최종수정자ID

		// 작성비밀번호를 암호화 하기 위해서 Get
//		String writngPassword = qnaManageVO.getWritngPassword();

		// EgovFileScrty Util에 있는 암호화 모듈을 적용해서 암호화 한다.
//		qnaManageVO.setWritngPassword(EgovFileScrty.encode(writngPassword));

		EgovOpQnaService.updateOpQna(qnaVO);

		return "forward:/uss/olh/opqna/selectOpQnaList.do";

	}
	
	/**
	 * Q&A정보를 삭제처리한다.
	 * @param qnaVO
	 * @param searchVO
	 * @return	"forward:/uss/olh/opqna/selectOpQnaList.do"
	 * @throws Exception
	 */
	@RequestMapping("/uss/olh/opqna/deleteOpQna.do")
	public String deleteOpQna(
    		HttpServletRequest request,
			OpQnaVO qnaVO, 
			@ModelAttribute("searchVO") OpQnaVO searchVO) throws Exception {

    	//--------------------------------------------------------------------------------------------
    	// @ XSS 사용자권한체크 START
    	// param1 : 사용자고유ID(uniqId,esntlId)
    	//--------------------------------------------------------
    	LOGGER.debug("@ XSS 권한체크 START ----------------------------------------------");
    	
    	//step1 DB에서 해당 게시물의 uniqId 조회
    	OpQnaVO vo = EgovOpQnaService.selectOpQnaDetail(qnaVO);;
    	
    	//step2 EgovXssChecker 공통모듈을 이용한 권한체크
    	EgovXssChecker.checkerUserXss(request, vo.getFrstRegisterId()); 
      	LOGGER.debug("@ XSS 권한체크 END ------------------------------------------------");
    	//--------------------------------------------------------
    	// @ XSS 사용자권한체크 END
    	//--------------------------------------------------------------------------------------------
    
		EgovOpQnaService.deleteOpQna(qnaVO);

		return "forward:/uss/olh/opqna/selectOpQnaList.do";
	}
	
	/**
	 * Q&A답변정보 목록을 조회한다. (pageing)
	 * @param searchVO
	 * @param model
	 * @return	"/uss/olh/opqna/EgovOpQnaAnswerList"
	 * @throws Exception
	 */
	@IncludedInfo(name = "Q&A답변관리", order = 551, gid = 50)
	@RequestMapping(value = "/uss/olh/opqna/selectOpQnaAnswerList.do")
	public String selectOpQnaAnswerList(@ModelAttribute("searchVO") OpQnaVO searchVO, ModelMap model) throws Exception {

		/** EgovPropertyService.SiteList */
		searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
		searchVO.setPageSize(propertiesService.getInt("pageSize"));

		/** pageing */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());

		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		List<?> OpQnaAnswerList = EgovOpQnaService.selectOpQnaAnswerList(searchVO);
		model.addAttribute("resultList", OpQnaAnswerList);

		int totCnt = EgovOpQnaService.selectOpQnaAnswerListCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);

		return "egovframework/com/uss/olh/opqna/EgovOpQnaAnswerList";
	}
	
	/**
	 * Q&A답변정보 목록에 대한 상세정보를 조회한다.
	 * @param qnaVO
	 * @param searchVO
	 * @param model
	 * @return	"/uss/olh/opqna/EgovOpQnaAnswerDetail"
	 * @throws Exception
	 */
	@RequestMapping("/uss/olh/opqna/selectOpQnaAnswerDetail.do")
	public String selectOpQnaAnswerDetail(OpQnaVO qnaVO, @ModelAttribute("searchVO") OpQnaVO searchVO, ModelMap model) throws Exception {

		OpQnaVO vo = EgovOpQnaService.selectOpQnaDetail(qnaVO);

		model.addAttribute("result", vo);

		return "egovframework/com/uss/olh/opqna/EgovOpQnaAnswerDetail";
	}
	
	/**
	 * Q&A답변정보를 수정하기 위한 전 처리(공통코드 처리)
	 * @param qnaVO
	 * @param searchVO
	 * @param model
	 * @return	"/uss/olh/opqna/EgovOpQnaAnswerUpdt"
	 * @throws Exception
	 */
	@RequestMapping("/uss/olh/opqna/updateOpQnaAnswerView.do")
	public String updateOpQnaAnswerView(OpQnaVO qnaVO, @ModelAttribute("searchVO") OpQnaVO searchVO, ModelMap model) throws Exception {

		// 공통코드를 가져오기 위한 Vo
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		vo.setCodeId("COM028");

		List<?> _result = cmmUseService.selectCmmCodeDetail(vo);
		model.addAttribute("qnaProcessSttusCode", _result);

		qnaVO = EgovOpQnaService.selectOpQnaDetail(qnaVO);
		model.addAttribute("qnaVO", qnaVO);

		return "egovframework/com/uss/olh/opqna/EgovOpQnaAnswerUpdt";
	}
	
	/**
	 * Q&A답변정보를 수정처리한다.
	 * @param qnaVO
	 * @param searchVO
	 * @return	"forward:/uss/olh/qnm/selectOpQnaAnswerList.do"
	 * @throws Exception
	 */
	@RequestMapping("/uss/olh/opqna/updateOpQnaAnswer.do")
	public String updateOpQnaAnswer(OpQnaVO qnaVO, @ModelAttribute("searchVO") OpQnaVO searchVO) throws Exception {

		// 로그인VO에서  사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		String lastUpdusrId = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getUniqId());
		qnaVO.setLastUpdusrId(lastUpdusrId); // 최종수정자ID

		EgovOpQnaService.updateOpQnaAnswer(qnaVO);

		return "forward:/uss/olh/opqna/selectOpQnaAnswerList.do";

	}
	
}
