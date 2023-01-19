/**
 * 
 */
package egiskorea.com.opqna.web;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springmodules.validation.commons.DefaultBeanValidator;
import org.unbescape.html.HtmlEscape;

import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.FileVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.cmm.util.EgovXssChecker;
import egovframework.com.uss.olh.opqna.service.EgovOpQnaService;
import egovframework.com.uss.olh.opqna.service.OpQnaDefaultVO;
import egovframework.com.uss.olh.opqna.service.OpQnaVO;
import egovframework.com.uss.olh.opqna.web.EgovOpQnaController;
import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description QnA관리
 * @author 플랫폼개발부문 DT솔루션 정상혁
 * @since 2022.02.16
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.16		정상혁	최초 생성
 *      </pre>
 */

@Controller
@RequestMapping("/com/opqna")
public class OpQnaController {

	private static final Logger LOGGER = LoggerFactory.getLogger(EgovOpQnaController.class);

	@Resource(name = "EgovOpQnaService")
	private EgovOpQnaService egovOpQnaService;

	/** EgovPropertyService */
	@Resource(name = "propertiesServiceNotice")
	protected EgovPropertyService propertiesServiceNotice;

	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;

	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;

	// 첨부파일 관련
	@Resource(name = "EgovFileMngService")
	private EgovFileMngService fileMngService;

	@Resource(name = "EgovFileMngUtil")
	private EgovFileMngUtil fileUtil;

	// Validation 관련
	@Autowired
	private DefaultBeanValidator beanValidator;

	/**
	 * @Description QnA 리스트 호출(웹)
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.02.16
	 * @param searchVO
	 * @param model
	 * @return "egiskorea/com/opqna/selectOpQnaList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectOpQnaList.do")
	public String selectOpQnaList(@ModelAttribute("searchVO") OpQnaVO searchVO, ModelMap model) throws Exception {

		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			return "redirect:/uat/uia/loginUsr.do";
		}
		
		
		/** EgovPropertyService.SiteList */
		searchVO.setPageUnit(propertiesServiceNotice.getInt("pageUnit"));
		searchVO.setPageSize(propertiesServiceNotice.getInt("pageSize"));

		/** pageing */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());

		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		List<?> QnaList = egovOpQnaService.selectOpQnaList(searchVO);

		model.addAttribute("resultList", QnaList);
		 

		if (!isAuthenticated) {
			model.addAttribute("certificationAt", "N");
		} else {
			model.addAttribute("certificationAt", "Y");
		}

		int totCnt = egovOpQnaService.selectOpQnaListCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);

		return "egiskorea/com/opqna/selectOpQnaList";
	}

	/**
	 * @Description Q&A정보 목록에 대한 상세정보를 조회한다.
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.02.16
	 * @param qaId
	 * @param qnaVO
	 * @param searchVO
	 * @param model
	 * @return "egiskorea/com/qna/selectOpQna"
	 * @throws Exception
	 */
	@RequestMapping("/selectOpQna.do")
	public String selectOpQna(@RequestParam("qaId") String qaId, OpQnaVO qnaVO,
			@ModelAttribute("searchVO") OpQnaDefaultVO searchVO, ModelMap model) throws Exception {

		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			return "redirect:/uat/uia/loginUsr.do";
		}

		qnaVO.setQaId(qaId);
		qnaVO.setSearchCnd(searchVO.getSearchCnd());
		qnaVO.setSearchWrd(searchVO.getSearchWrd());
		
		// 조회수 수정처리
		egovOpQnaService.updateOpQnaInqireCo(qnaVO);

		OpQnaVO vo = egovOpQnaService.selectOpQnaDetail(qnaVO);

		// 작성 비밀번호를 얻는다.
//		String writngPassword = vo.getWritngPassword();

		// EgovFileScrty Util에 있는 암호화 모듈을 적용해서 복호화한다.
//		vo.setWritngPassword(EgovFileScrty.decode(writngPassword));

		model.addAttribute("result", vo);
		model.addAttribute("searchVO", searchVO);

		return "egiskorea/com/opqna/selectOpQna";
	}

	/**
	 * @Description Q&A 등록화면으로 이동.
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.02.17
	 * @param searchVO
	 * @param qnaVO
	 * @param model
	 * @return "egiskorea/com/qna/insertOpQnaView"
	 * @throws Exception
	 */
	@RequestMapping("/insertOpQnaView.do")
	public String insertOpQnaView(@ModelAttribute("searchVO") OpQnaVO searchVO, OpQnaVO qnaVO, Model model) throws Exception {

		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			return "redirect:/uat/uia/loginUsr.do";
		}

		// 로그인VO에서 사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

		String wrterNm = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getName()); // 사용자명

		qnaVO.setWrterNm(wrterNm); // 작성자명

		model.addAttribute("qnaVO", qnaVO);

		return "egiskorea/com/opqna/insertOpQnaView";

	}

	/**
	 * @Description Q&A 등록한다.
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.02.18
	 * @param multiRequest
	 * @param searchVO
	 * @param qnaVO
	 * @param bindingResult
	 * @param model
	 * @return "forward:/com/qna/selectOpQnaList.do"
	 * @throws Exception
	 */
	@RequestMapping("/insertOpQna.do")
	public String insertOpQna(final MultipartHttpServletRequest multiRequest, // 첨부파일을 위한...
			@ModelAttribute("searchVO") OpQnaVO searchVO, @ModelAttribute("qnaVO") OpQnaVO qnaVO,
			BindingResult bindingResult, ModelMap model) throws Exception {

		System.out.println(multiRequest);
		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			return "redirect:/uat/uia/loginUsr.do";
		}

		beanValidator.validate(qnaVO, bindingResult);

		if (bindingResult.hasErrors()) {
			return "egiskorea/com/opqna/insertOpQnaView";
		}

		// 로그인VO에서 사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

		String frstRegisterId = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getUniqId());

		qnaVO.setFrstRegisterId(frstRegisterId); // 최초등록자ID
		qnaVO.setLastUpdusrId(frstRegisterId); // 최종수정자ID

		// 첨부파일 관련 첨부파일ID 생성
		List<FileVO> result = null;
		String atchFileId = "";

		final List<MultipartFile> files = multiRequest.getFiles("file_1");
		if (!files.isEmpty()) {
			result = fileUtil.parseFileInf(files, "QNA_", 0, "", "");
			atchFileId = fileMngService.insertFileInfs(result); // 파일이 생성되고나면 생성된 첨부파일 ID를 리턴한다.
		}

		// 리턴받은 첨부파일ID를 셋팅한다..
		qnaVO.setAtchFileId(atchFileId); // 첨부파일 ID

		egovOpQnaService.insertOpQna(qnaVO);

		return "forward:/com/opqna/selectOpQnaList.do";
	}

	/**
	 * @Description Q&A정보를 수정화면으로 이동.
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.02.17
	 * @param qnaVO
	 * @param searchVO
	 * @param model
	 * @return "egiskorea/com/qna/updateOpQnaView"
	 * @throws Exception
	 */
	@RequestMapping("/updateOpQnaView.do")
	public String updateOpQnaView(@RequestParam("qaId") String qaId, OpQnaVO qnaVO,
			@ModelAttribute("searchVO") OpQnaVO searchVO, ModelMap model) throws Exception {

		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			return "redirect:/uat/uia/loginUsr.do";
		}
		qnaVO.setQaId(qaId);
		OpQnaVO vo = egovOpQnaService.selectOpQnaDetail(qnaVO);

		String qestnSj = HtmlEscape.unescapeHtml(vo.getQestnSj());
		String qestnCn = HtmlEscape.unescapeHtml(vo.getQestnCn());
		
		vo.setQestnSj(qestnSj);
		vo.setQestnCn(qestnCn);
		
		// 작성 비밀번호를 얻는다.
//		String writngPassword = vo.getWritngPassword();

		// EgovFileScrty Util에 있는 암호화 모듈을 적용해서 복호화한다.
//		vo.setWritngPassword(EgovFileScrty.decode(writngPassword));

		model.addAttribute("qnaVO", vo);

		return "egiskorea/com/opqna/updateOpQnaView";
	}

	/**
	 * @Description Q&A를 수정 한다.
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.02.18
	 * @param multiRequest
	 * @param request
	 * @param searchVO
	 * @param qnaVO
	 * @param model
	 * @param bindingResult
	 * @return "forward:/com/qna/selectOpQnaList.do"
	 * @throws Exception
	 */
	@RequestMapping("/updateOpQna.do")
	public String updateOpQna(final MultipartHttpServletRequest multiRequest, HttpServletRequest request,
			@ModelAttribute("searchVO") OpQnaVO searchVO, @ModelAttribute("qnaVO") OpQnaVO qnaVO, ModelMap model,
			BindingResult bindingResult) throws Exception {

		// Validation
		beanValidator.validate(qnaVO, bindingResult);

		if (bindingResult.hasErrors()) {
			return "egiskorea/com/opqna/updateOpQnaView";
		}

		// 첨부파일 관련 ID 생성 start....
		String atchFileId = qnaVO.getAtchFileId();

		final List<MultipartFile> files = multiRequest.getFiles("file_1");
	    if (!files.isEmpty()) {
			if (atchFileId == null || "".equals(atchFileId)) {
			    List<FileVO> result = fileUtil.parseFileInf(files, "QNA_", 0, atchFileId, "");
			    atchFileId = fileMngService.insertFileInfs(result);
			    qnaVO.setAtchFileId(atchFileId);
			} else {
			    FileVO fvo = new FileVO();
			    fvo.setAtchFileId(atchFileId);
			    int cnt = fileMngService.getMaxFileSN(fvo);
			    List<FileVO> _result = fileUtil.parseFileInf(files, "QNA_", cnt, atchFileId, "");
			    fileMngService.updateFileInfs(_result);
			}
	    }

		// --------------------------------------------------------------------------------------------
		// @ XSS 사용자권한체크 START
		// param1 : 사용자고유ID(uniqId,esntlId)
		// --------------------------------------------------------

	    LOGGER.debug("@ XSS 권한체크 START ----------------------------------------------");
		// step1 DB에서 해당 게시물의 uniqId 조회
		OpQnaVO vo = egovOpQnaService.selectOpQnaDetail(qnaVO);
		;

		// step2 EgovXssChecker 공통모듈을 이용한 권한체크
		EgovXssChecker.checkerUserXss(request, vo.getFrstRegisterId());
		LOGGER.debug("@ XSS 권한체크 END ------------------------------------------------");
		// --------------------------------------------------------
		// @ XSS 사용자권한체크 END
		// --------------------------------------------------------------------------------------------

		// 로그인VO에서 사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		String lastUpdusrId = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getUniqId());

		qnaVO.setLastUpdusrId(lastUpdusrId); // 최종수정자ID

		// 작성비밀번호를 암호화 하기 위해서 Get
//		String writngPassword = qnaManageVO.getWritngPassword();

		// EgovFileScrty Util에 있는 암호화 모듈을 적용해서 암호화 한다.
//		qnaManageVO.setWritngPassword(EgovFileScrty.encode(writngPassword));

		egovOpQnaService.updateOpQna(qnaVO);

		model.addAttribute("resultMsg", "success.common.update");

		return "forward:/com/opqna/selectOpQna.do";

	}

	/**
	 * @Description Q&A를 삭제 한다.
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.02.18
	 * @param request
	 * @param qnaVO
	 * @param searchVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/deleteOpQna.do")
	public String deleteOpQna(HttpServletRequest request, OpQnaVO qnaVO, ModelMap model,
			@ModelAttribute("searchVO") OpQnaVO searchVO) throws Exception {

		// --------------------------------------------------------------------------------------------
		// @ XSS 사용자권한체크 START
		// param1 : 사용자고유ID(uniqId,esntlId)
		// --------------------------------------------------------
		LOGGER.debug("@ XSS 권한체크 START ----------------------------------------------");

		// step1 DB에서 해당 게시물의 uniqId 조회
		OpQnaVO vo = egovOpQnaService.selectOpQnaDetail(qnaVO);

		// step2 EgovXssChecker 공통모듈을 이용한 권한체크
		EgovXssChecker.checkerUserXss(request, vo.getFrstRegisterId());
		LOGGER.debug("@ XSS 권한체크 END ------------------------------------------------");
		// --------------------------------------------------------
		// @ XSS 사용자권한체크 END
		// --------------------------------------------------------------------------------------------

		egovOpQnaService.updateOpQnaDeleteY(qnaVO);

		model.addAttribute("resultMsg", "success.common.delete");

		return "forward:/com/opqna/selectOpQnaList.do";
	}

	
	/**
	 * @Description Q&A답변 등록
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.02.18
	 * @param qnaVO
	 * @param searchVO
	 * @return forward:/com/qna/selectOpQna.do
	 * @throws Exception
	 */
	@RequestMapping("/insertOpQnaAnswer.do")
	public String insertOpQnaAnswer(OpQnaVO qnaVO, @ModelAttribute("searchVO") OpQnaVO searchVO, ModelMap model) throws Exception {

		// 로그인VO에서  사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		String lastUpdusrId = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getUniqId());
		qnaVO.setLastUpdusrId(lastUpdusrId); // 최종수정자ID
		qnaVO.setQnaProcessSttusCode("3");
		
		model.addAttribute("resultMsg", "success.common.insert");
		
		egovOpQnaService.updateOpQnaAnswer(qnaVO);

		return "forward:/com/opqna/selectOpQna.do";

	}
	
	/**
	 * @Description Q&A답변 수정 view
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.02.23
	 * @param qnaVO
	 * @param searchVO
	 * @param model
	 * @return egiskorea/com/qna/UpdateOpQnaView.do
	 * @throws Exception
	 */
	@RequestMapping("/updateOpQnaAnswerView.do")
	public String updateOpQnaAnswerView(OpQnaVO qnaVO, @ModelAttribute("searchVO") OpQnaVO searchVO, ModelMap model) throws Exception {

		// 공통코드를 가져오기 위한 Vo
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		vo.setCodeId("COM028");

		List<?> _result = cmmUseService.selectCmmCodeDetail(vo);
		model.addAttribute("qnaProcessSttusCode", _result);

		qnaVO = egovOpQnaService.selectOpQnaDetail(qnaVO);
		model.addAttribute("result", qnaVO);

		return "egiskorea/com/opqna/updateOpQnaAnswerView";
	}
	
	/**
	 * @Description Q&A답변 수정
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.02.23
	 * @param qnaVO
	 * @param searchVO
	 * @param model
	 * @return forward:/com/qna/selectOpQna.do
	 * @throws Exception
	 */
	@RequestMapping("/updateOpQnaAnswer.do")
	public String updateOpQnaAnswer(OpQnaVO qnaVO, @ModelAttribute("searchVO") OpQnaVO searchVO, ModelMap model) throws Exception {

		// 로그인VO에서  사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		String lastUpdusrId = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getUniqId());
		qnaVO.setLastUpdusrId(lastUpdusrId); // 최종수정자ID
		qnaVO.setQnaProcessSttusCode("3");
		
		egovOpQnaService.updateOpQnaAnswer(qnaVO);
		model.addAttribute("resultMsg", "success.common.update");
		
		return "forward:/com/opqna/selectOpQna.do";

	}
	
	/**
	 * @Description Q&A답변 삭제
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.02.23
	 * @param qnaVO
	 * @param searchVO
	 * @param model
	 * @return egiskorea/com/qna/UpdateOpQnaView.do
	 * @throws Exception
	 */
	@RequestMapping("/deleteOpQnaAnswer.do")
	public String deleteOpQnaAnswer(OpQnaVO qnaVO, @ModelAttribute("searchVO") OpQnaVO searchVO, ModelMap model) throws Exception {

		// 로그인VO에서  사용자 정보 가져오기
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		String lastUpdusrId = loginVO == null ? "" : EgovStringUtil.isNullToString(loginVO.getUniqId());
		qnaVO.setLastUpdusrId(lastUpdusrId); // 최종수정자ID
		qnaVO.setQnaProcessSttusCode("1");
		
		egovOpQnaService.updateOpQnaAnswer(qnaVO);
		model.addAttribute("resultMsg", "success.common.delete");

		return "forward:/com/opqna/selectOpQna.do";
	}
}
