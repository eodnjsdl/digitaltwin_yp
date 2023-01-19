package egiskorea.com.mngr.info.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egiskorea.com.cmm.service.CmmUtils;
import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.cmm.util.EgovXssChecker;
import egovframework.com.uss.olh.opqna.service.EgovOpQnaService;
import egovframework.com.uss.olh.opqna.service.OpQnaVO;
import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.rte.fdl.cmmn.exception.FdlException;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 운영 Q&A 관리 Controller 클래스
 * @packageName egiskorea.com.mngr.info.web
 * @Class OpQnaManageController
 * @author 플랫폼개발부문 DT솔루션 정수환
 * @since 2022.02.18
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.18		정수환	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/mngr/info")
public class OpQnaManageController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(OpQnaManageController.class);
	
	@Resource(name = "EgovOpQnaService")
	private EgovOpQnaService egovOpQnaService;

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
	 * @Description Q&A정보 목록을 조회한다. (pageing)
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.02.18
	 * @param searchVO
	 * @param model
	 * @return	"egiskorea/com/adm/info/selectOpQnaList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectOpQnaManageList.do", method = {RequestMethod.POST, RequestMethod.GET})
	public String selectOpQnaManageList(@ModelAttribute("searchVO") OpQnaVO searchVO, ModelMap model) throws Exception {

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

		List<?> QnaList = egovOpQnaService.selectOpQnaManageList(searchVO);
		model.addAttribute("resultList", QnaList);

		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			model.addAttribute("certificationAt", "N");
		} else {
			model.addAttribute("certificationAt", "Y");
		}

		int totCnt = egovOpQnaService.selectOpQnaManageListCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("paginationInfo", paginationInfo);
		System.out.println("test123k");
		return "egiskorea/com/adm/info/selectOpQnaManageList";
	}
	
	/**
	 * @Description Q&A정보 목록에 대한 상세정보를 조회한다.
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.02.18
	 * @param searchVO
	 * @param request
	 * @param model
	 * @return	"egiskorea/com/adm/info/selectOpQnaManage"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectOpQnaManage.do", method = RequestMethod.POST)
	public String selectOpQnaManage(@ModelAttribute("searchVO") OpQnaVO searchVO, HttpServletRequest request, Model model) throws Exception {

		//고유값ID가 없을 경우.
		if (StringUtils.isBlank(searchVO.getQaId())) {
			return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrInfo.QnaManage.empty.qaId"));
		}

		//조회수 수정처리
		egovOpQnaService.updateOpQnaInqireCo(searchVO);
		
		OpQnaVO vo = egovOpQnaService.selectOpQnaDetail(searchVO);

		// 작성 비밀번호를 얻는다.
//		String writngPassword = vo.getWritngPassword();

		// EgovFileScrty Util에 있는 암호화 모듈을 적용해서 복호화한다.
//		vo.setWritngPassword(EgovFileScrty.decode(writngPassword));
		
		model.addAttribute("result", vo);

		return "egiskorea/com/adm/info/selectOpQnaManage";
	}
	
	/**
	 * @Description Q&A정보를 등록하기 위한 전 처리(인증체크)
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.02.18
	 * @param searchVO
	 * @param qnaVO
	 * @param model
	 * @return	"egiskorea/com/adm/info/insertOpQnaManageView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertOpQnaManageView.do", method = RequestMethod.POST)
	public String insertOpQnaManageView(@ModelAttribute("searchVO") OpQnaVO searchVO, OpQnaVO qnaVO, Model model) throws Exception {

		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			return "egiskorea/com/uat/uia/loginUsr";
		}

		// 로그인VO에서  사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

		String wrterNm = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getName()); // 사용자명
		String emailAdres = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getEmail()); // email 주소

		qnaVO.setWrterNm(wrterNm); // 작성자명
		//qnaVO.setEmailAdres(emailAdres); // email 주소

		model.addAttribute("qnaVO", qnaVO);

		return "egiskorea/com/adm/info/insertOpQnaManageView";

	}
	
	/**
	 * @Description Q&A정보를 등록한다.
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.02.18
	 * @param searchVO
	 * @param qnaVO
	 * @param bindingResult
	 * @param model
	 * @return	"redirect:/com/mngr/info/selectOpQnaManageList.do"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertOpQnaManage.do", method = RequestMethod.POST)
	public String insertOpQnaManage(@ModelAttribute("searchVO") OpQnaVO searchVO, @ModelAttribute("qnaVO") OpQnaVO qnaVO, BindingResult bindingResult, Model model) throws Exception {

		String message = "";
		beanValidator.validate(qnaVO, bindingResult);
		if (bindingResult.hasErrors()) {
			model.addAttribute("resultMsg", "fail.common.insert");
			return "egiskorea/com/adm/info/insertOpQnaManageView";
		}

		// 로그인VO에서  사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

		String frstRegisterId = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getUniqId());

		qnaVO.setFrstRegisterId(frstRegisterId); // 최초등록자ID
		qnaVO.setLastUpdusrId(frstRegisterId); // 최종수정자ID

		try {
			egovOpQnaService.insertOpQna(qnaVO);
			message = egovMessageSource.getMessage("success.common.insert");
		} catch (FdlException e) {
			LOGGER.info("-----------Q&A답변관리 등록 실패-----------");
			LOGGER.debug(e.getMessage(), e);
			message = egovMessageSource.getMessage("fail.common.insert");
		}

		return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectOpQnaManageList.do", qnaVO, null);
	}
	
	/**
	 * @Description Q&A정보를 수정하기 위한 전 처리
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.02.18
	 * @param qnaVO
	 * @param searchVO
	 * @param model
	 * @return	"egiskorea/com/adm/info/updateOpQnaManageView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateOpQnaManageView.do", method = RequestMethod.POST)
	public String updateOpQnaManageView(OpQnaVO qnaVO, @ModelAttribute("searchVO") OpQnaVO searchVO, Model model) throws Exception {

		//고유값ID가 없을 경우.
		if (StringUtils.isBlank(qnaVO.getQaId())) {
			return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrInfo.QnaManage.empty.qaId"));
		}

		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			return "egiskorea/com/uat/uia/loginUsr";
		}

		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

		// 공통코드를 가져오기 위한 Vo
		ComDefaultCodeVO comDefaultCodeVO = new ComDefaultCodeVO();
		comDefaultCodeVO.setCodeId("COM028");

		List<?> _result = cmmUseService.selectCmmCodeDetail(comDefaultCodeVO);
		model.addAttribute("qnaProcessSttusCode", _result);

		OpQnaVO vo = egovOpQnaService.selectOpQnaDetail(qnaVO);
		if (StringUtils.isBlank(vo.getEmplyrNm())) { //기존 답변자 없으면
			String emplyrNm = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getName()); // 사용자명
			vo.setEmplyrNm(emplyrNm); //현재 로그인 사용자 넣어주기.
		}

		//검색 값 넣어주기
		vo.setPageIndex(searchVO.getPageIndex());
		vo.setSearchCnd(searchVO.getSearchCnd());
		vo.setSearchWrd(searchVO.getSearchWrd());

		model.addAttribute("qnaVO", vo);

		return "egiskorea/com/adm/info/updateOpQnaManageView";
	}
	
	/**
	 * @Description Q&A정보를 수정처리한다.
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.02.18
	 * @param qnaVO
	 * @param model
	 * @param redirectAttributes
	 * @return	"redirect:/com/mngr/info/selectOpQnaManage.do"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateOpQnaManage.do", method = RequestMethod.POST)
	public String updateOpQnaManage(@ModelAttribute("qnaVO") OpQnaVO qnaVO, Model model, RedirectAttributes redirectAttributes) throws Exception {

		String message = "";

		//고유값ID가 없을 경우.
		if (StringUtils.isBlank(qnaVO.getQaId())) {
			return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrInfo.QnaManage.empty.qaId"));
		}

		// 로그인VO에서  사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		String lastUpdusrId = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getUniqId());
		qnaVO.setLastUpdusrId(lastUpdusrId); // 최종수정자ID

		int affectedRow = egovOpQnaService.updateOpQnaAnswerManage(qnaVO);
		if (affectedRow > 0) {
			message = egovMessageSource.getMessage("success.common.update");
		} else {
			message = egovMessageSource.getMessage("fail.common.update");
		}

		return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectOpQnaManage.do", qnaVO, null);

	}
	
	/**
	 * @Description Q&A정보를 삭제처리한다.
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.02.18
	 * @param request
	 * @param qnaVO
	 * @param searchVO
	 * @param model
	 * @return	"redirect:/com/mngr/info/selectOpQnaManage.do"
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteOpQnaManage.do", method = RequestMethod.POST)
	public String deleteOpQnaManage(HttpServletRequest request, OpQnaVO qnaVO, 
			@ModelAttribute("searchVO") OpQnaVO searchVO, Model model) throws Exception {

		String message = "";
		//고유값ID가 없을 경우.
		if (StringUtils.isBlank(qnaVO.getQaId())) {
			return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrInfo.QnaManage.empty.qaId"));
		}

		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			return "egiskorea/com/uat/uia/loginUsr";
		}
		
    	//--------------------------------------------------------------------------------------------
    	// @ XSS 사용자권한체크 START
    	// param1 : 사용자고유ID(uniqId,esntlId)
    	//--------------------------------------------------------
    	LOGGER.debug("@ XSS 권한체크 START ----------------------------------------------");
    	
    	//step1 DB에서 해당 게시물의 uniqId 조회
    	OpQnaVO vo = egovOpQnaService.selectOpQnaDetail(qnaVO);
    	
    	//step2 EgovXssChecker 공통모듈을 이용한 권한체크
    	EgovXssChecker.checkerUserXss(request, vo.getFrstRegisterId()); 
      	LOGGER.debug("@ XSS 권한체크 END ------------------------------------------------");
    	//--------------------------------------------------------
    	// @ XSS 사용자권한체크 END
    	//--------------------------------------------------------------------------------------------
    
		int affectedRow = egovOpQnaService.deleteOpQnaManage(qnaVO);
		if (affectedRow > 0) {
			message =  egovMessageSource.getMessage("success.common.delete");
		} else {
			message = egovMessageSource.getMessage("fail.common.delete");
		}

		return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectOpQnaManage.do", qnaVO, null);
	}

	/**
	 * @Description Q&A정보를 일괄 삭제처리한다.
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.02.18
	 * @param qnaVO
	 * @param searchVO
	 * @return	"redirect:/com/mngr/info/selectOpQnaManageList.do"
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteOpQnaManageList.do", method = RequestMethod.POST)
	public String deleteOpQnaManageList(@RequestParam(value = "qaIds", required = false, defaultValue = "") String qaIds, HttpServletRequest request,
			OpQnaVO qnaVO, @ModelAttribute("searchVO") OpQnaVO searchVO, Model model, RedirectAttributes redirectAttributes) throws Exception {

		//고유값들이 없을 경우
		if (StringUtils.isBlank(qaIds)) {
			return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrInfo.QnaManage.empty.qaId"));
		}

		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			return "egiskorea/com/uat/uia/loginUsr";
		}
		
		String[] strQaIds = qaIds.split(";");
		
		for (int i = 0; i < strQaIds.length; i++) {
			qnaVO.setQaId(strQaIds[i]);
			
			OpQnaVO vo = egovOpQnaService.selectOpQnaDetail(qnaVO);
			EgovXssChecker.checkerUserXss(request, vo.getFrstRegisterId()); 
			
			egovOpQnaService.deleteOpQnaManage(qnaVO);
		}

		redirectAttributes.addFlashAttribute("resultMsg", "success.common.delete");
		
		return "redirect:/com/mngr/info/selectOpQnaManageList.do";
	}

	/**
	 * @Description Q&A정보 질문을 복구처리한다.
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @param model
	 * @return redirect:/com/mngr/info/selectOpQnaManage.do
	 * @throws Exception
	 */
	@RequestMapping(value = "/restoreOpQnaManage.do", method = RequestMethod.POST)
	public String restoreOpQnaManage(OpQnaVO qnaVO, Model model) throws Exception {

		String message = "";
		if (StringUtils.isBlank(qnaVO.getQaId())) {
			return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrInfo.QnaManage.empty.qaId"));
		}

		int affectedRow = egovOpQnaService.restoreOpQnaManage(qnaVO);
		if (affectedRow > 0) {
			message = egovMessageSource.getMessage("success.common.restore");
		} else {
			message = egovMessageSource.getMessage("fail.common.restore");
		}

		return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectOpQnaManage.do", qnaVO, null);
	}
}
