package egiskorea.com.uat.uia;

import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.EgovComponentChecker;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.com.cmm.config.EgovLoginConfig;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.service.Globals;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.cop.bbs.service.BoardVO;
import egovframework.com.cop.bbs.service.EgovArticleService;
import egovframework.com.sec.gmt.service.GroupManageVO;
import egovframework.com.uat.uia.service.EgovLoginService;
import egovframework.com.uss.umt.service.EgovUserManageService;
import egovframework.com.uss.umt.service.UserDefaultVO;
import egovframework.com.uss.umt.service.UserManageVO;
import egovframework.com.utl.fcc.service.EgovNumberUtil;
import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.com.utl.sim.service.EgovFileScrty;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 일반 로그인, 인증서 로그인을 처리하는 컨트롤러 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.11.04
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.11.04   이상화           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/uat/uia")
public class LoginController {
	
	/** EgovLoginService */
	@Resource(name = "loginService")
	private EgovLoginService loginService;
	
	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;
	
	/** userManageService */
	@Resource(name = "userManageService")
	private EgovUserManageService userManageService;
	
	@Resource(name = "egovLoginConfig")
	EgovLoginConfig egovLoginConfig;
	
	@Resource(name = "EgovArticleService")
    private EgovArticleService egovArticleService;
	
	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);
	
	/**
	 * 로그인 화면으로 들어간다
	 * @param vo - 로그인후 이동할 URL이 담긴 LoginVO
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/loginUsr.do")
	public String loginUsr(@ModelAttribute("loginVO") LoginVO loginVO, @ModelAttribute("searchVO") BoardVO boardVO,
			HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		
		//권한체크시 에러 페이지 이동
		String auth_error =  request.getParameter("auth_error") == null ? "" : (String)request.getParameter("auth_error");
		if(auth_error != null && auth_error.equals("1")){
			
			String refer = request.getHeader("Referer");
			if(refer.contains("main.do")) {
				model.addAttribute("resultRedirect", "redirect:/"+refer);
				model.addAttribute("resultMsg", "해당 기능에 대한 권한이 없습니다.");
				model.addAttribute("resultClose", "close");
				return "egiskorea/com/cmm/actionResult";
			} else if(refer.contains("mngr")) {
			}
			return "egovframework/com/cmm/error/accessDenied";
		}
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		if(user != null) {
			return "redirect:/uat/uia/mainAction.do";
		}
		
		String message = (String)request.getParameter("loginMessage");
		if (message!=null) model.addAttribute("loginMessage", message);
		
		boardVO.setBbsId("BBSMSTR_000000000052"); // 공지사항 게시판ID
		List<BoardVO> noticeList = egovArticleService.selectNoticeArticleList(boardVO);
		
		model.addAttribute("result", noticeList);
		model.addAttribute("resultTot", noticeList.size());
		
		return "egiskorea/com/uat/uia/loginUsr";
	}
	
	/**
	 * 일반(세션) 로그인을 처리한다
	 * @param vo - 아이디, 비밀번호가 담긴 LoginVO
	 * @param request - 세션처리를 위한 HttpServletRequest
	 * @return result - 로그인결과(세션정보)
	 * @exception Exception
	 */
	@RequestMapping(value = "/loginAction.do")
	public String loginAction(@ModelAttribute("loginVO") LoginVO loginVO, HttpServletRequest request, ModelMap model, RedirectAttributes rttr) throws Exception {
		String refer = (String)request.getHeader("REFERER");
		String returnPage = "redirect:/uat/uia/loginUsr.do";
		
		if(refer.contains("HN")) {
			rttr.addFlashAttribute("area", "hanam");
			
			returnPage = "redirect:/uat/uia/loginHN.do";			
		} else if(refer.contains("GP")) {
			rttr.addFlashAttribute("area", "gimpo");
			
			returnPage = "redirect:/uat/uia/loginGP.do";
		} else if(refer.contains("UJB")) {
			rttr.addFlashAttribute("area", "uijeongbu");
			
			returnPage = "redirect:/uat/uia/loginUJB.do";
		} else if(refer.contains("WebApp")) {
			rttr.addFlashAttribute("area", "webApp");
			
			returnPage = "redirect:/uat/uia/loginWebApp.do";
		} else {
			rttr.addFlashAttribute("area", "yangpyeong");
		}
		
		// 1. 로그인인증제한 활성화시 
		if( egovLoginConfig.isLock()){
		    Map<?,?> mapLockUserInfo = (EgovMap)loginService.selectLoginIncorrect(loginVO);
		    if(mapLockUserInfo != null){			
				//2.1 로그인인증제한 처리
				String sLoginIncorrectCode = loginService.processLoginIncorrect(loginVO, mapLockUserInfo);
				if(!sLoginIncorrectCode.equals("E")){
					if(sLoginIncorrectCode.equals("L")){
						model.addAttribute("loginMessage", egovMessageSource.getMessageArgs("fail.common.loginIncorrect", new Object[] {egovLoginConfig.getLockCount(),request.getLocale()}));
					}else if(sLoginIncorrectCode.equals("C")){
						model.addAttribute("loginMessage", egovMessageSource.getMessage("fail.common.login",request.getLocale()));
					}
					
					return returnPage;
				}
		    }else{
		    	model.addAttribute("loginMessage", egovMessageSource.getMessage("fail.common.login",request.getLocale()));
		    	return returnPage;
		    }
		}
		
		// 2. 로그인 처리
		LoginVO resultVO = loginService.actionLogin(loginVO);
		
		// 3. 일반 로그인 처리
		if (resultVO != null && resultVO.getId() != null && !resultVO.getId().equals("")) {

			// 3-1. 로그인 정보를 세션에 저장
			request.getSession().setAttribute("loginVO", resultVO);
			// 2019.10.01 로그인 인증세션 추가
			request.getSession().setAttribute("accessUser", resultVO.getUserSe().concat(resultVO.getId()));
			// 권한 담기
			request.getSession().setAttribute("userAuthorities", EgovUserDetailsHelper.getAuthorities());
			
			return "redirect:/uat/uia/mainAction.do";

		} else {
			model.addAttribute("loginMessage", egovMessageSource.getMessage("fail.common.login",request.getLocale()));
			return returnPage;
		}
	}
	
	/**
	 * 로그인 후 메인화면으로 들어간다
	 * @param
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/mainAction.do")
	public String actionMain(ModelMap model,
			RedirectAttributes rttr,
			HttpServletRequest request) throws Exception {
		
		String area = "";
		
		if(RequestContextUtils.getInputFlashMap(request) != null) {
			area = (String) RequestContextUtils.getInputFlashMap(request).get("area");
			rttr.addFlashAttribute("area", area);	
		}
		
		// 1. Spring Security 사용자권한 처리
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if (!isAuthenticated) {
			model.addAttribute("loginMessage", egovMessageSource.getMessage("fail.common.login"));
			return "egiskorea/com/uat/uia/loginUsr";
		}
		LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		
		LOGGER.debug("User Id : {}", user == null ? "" : EgovStringUtil.isNullToString(user.getId()));

		/*
		// 2. 메뉴조회
		MenuManageVO menuManageVO = new MenuManageVO();
		menuManageVO.setTmp_Id(user.getId());
		menuManageVO.setTmp_UserSe(user.getUserSe());
		menuManageVO.setTmp_Name(user.getName());
		menuManageVO.setTmp_Email(user.getEmail());
		menuManageVO.setTmp_OrgnztId(user.getOrgnztId());
		menuManageVO.setTmp_UniqId(user.getUniqId());
		List list_headmenu = menuManageService.selectMainMenuHead(menuManageVO);
		model.addAttribute("list_headmenu", list_headmenu);
		*/
		
		if (area == "webApp") {
			return "redirect:/webApp/main.do";
		} else {
			// 3. 메인 페이지 이동
			return "redirect:/main.do";
		}
		
		/*
		if (main_page != null && !main_page.equals("")) {

			// 3-1. 설정된 메인화면이 있는 경우
			return main_page;

		} else {

			// 3-2. 설정된 메인화면이 없는 경우
			if (user.getUserSe().equals("USR")) {
				return "egovframework/com/EgovMainView";
			} else {
				return "egovframework/com/EgovMainViewG";
			}
		}
		*/
	}
	
	/**
	 * 로그아웃한다.
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/logoutAction.do")
	public String actionLogout(HttpServletRequest request, ModelMap model) throws Exception {
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		request.getSession().setAttribute("loginVO", null);
		request.getSession().setAttribute("accessUser", null);

		String refer = request.getHeader("Referer");
		if(refer.contains("webApp")) {
			return "redirect:/uat/uia/loginWebApp.do";
		}
		
		if(loginVO.getId().equals("hanam")) {
			return "redirect:/uat/uia/loginHN.do";
		} else if(loginVO.getId().equals("gimpo")) {
			return "redirect:/uat/uia/loginGP.do";
		} else if(loginVO.getId().equals("uijeongbu")) {
			return "redirect:/uat/uia/loginUJB.do";
		}
		
		return "redirect:/uat/uia/loginUsr.do";
	}
	
	/**
	 * 아이디찾기를 한다.
	 * @return egiskorea/com/uat/uia/idFind
	 * @throws Exception
	 */
	@RequestMapping(value = "/idFindViewPopup.do")
	public String idFindViewPopup( ) throws Exception{
				
		return "egiskorea/com/uat/uia/idFind";
	}
	
	/**
	 * 아이디찾기를 한다.
	 * @param loginVO
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectIdFind.do")
	public ModelAndView selectIdFind(@ModelAttribute("loginVO") LoginVO loginVO) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		loginVO.setName(loginVO.getName().replaceAll(" ", ""));
		loginVO.setEmail(loginVO.getEmail().replaceAll(" ", ""));
		LoginVO resultVO = loginService.searchId(loginVO);
		
		if (resultVO != null && resultVO.getId() != null && !resultVO.getId().equals("")) {
			mav.addObject("resultInfo", resultVO.getId());
			mav.addObject("result", "success");
		} else {
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 패스워드 찾기 팝업 호출
	 * @return egiskorea/com/uat/uia/passwordFind
	 * @throws Exception
	 */
	@RequestMapping(value = "/passwordFindViewPopup.do")
	public String passwordFindViewPopup( ) throws Exception{
				
		return "egiskorea/com/uat/uia/passwordFind";
	}
	
	
	
	
	/**
	 * 패스워드 찾기
	 * @param vo - 아이디, 이름, 이메일주소, LoginVO
	 * @return result -해당비밀번호 조회
	 * @exception Exception
	 */
	@RequestMapping(value = "/selectPassword.do")
	public ModelAndView selectPassword(@RequestParam Map<String, Object> commandMap, ModelMap model) throws Exception {
		
    	ModelAndView modelAndView = new ModelAndView();
    	modelAndView.setViewName("jsonView");
    	
		String id = (String) commandMap.get("id");
		String name = (String) commandMap.get("name");
		String email = (String) commandMap.get("email");
		
		LoginVO loginVO = new LoginVO();
		
		loginVO.setId(id);
		loginVO.setName(name);
		loginVO.setEmail(email);
		
		// 1. 비밀번호 찾기
		LoginVO result = loginService.selectPassword(loginVO);
		
		if(result == null || result.getPassword() == null || "".equals(result.getPassword())) {
			modelAndView.addObject("resultMsg", "fail");
		} else {
			modelAndView.addObject("resultMsg", "success");
		}
		
		return modelAndView;
	}
	
	
	/**
	 * 패스워드 랜덤 생성
	 * @param vo - 아이디, 이름, 이메일주소, LoginVO
	 * @return result -해당비밀번호 조회
	 * @exception Exception
	 */
	@RequestMapping(value = "/createPassword.do")
	public ModelAndView createPassword() throws Exception {
    	
    	ModelAndView modelAndView = new ModelAndView();
    	modelAndView.setViewName("jsonView");
    	
    	
		// 2. 임시 비밀번호를 생성한다.(영+영+숫+영+영+숫+영+영=8자리)
    	String newPassword = "";
    	for (int i = 0; i < 7; i++) {
    		// 영자
    		if (i % 3 != 0) {
    			newPassword += EgovStringUtil.getRandomStr('a', 'z');
    		// 숫자
    		} else if(i%2 !=0){
    			newPassword += "G!";
    		} else {
    			newPassword += EgovNumberUtil.getRandomNum(0, 9);
    		}
    	}
    	
    	modelAndView.addObject("newPassword", newPassword);
		return modelAndView;
	}
	
	
	
	/**
	 * 패스워드  초기화
	 * @param vo - 아이디, 이름, 이메일주소, LoginVO
	 * @return result -해당비밀번호 조회
	 * @exception Exception
	 */
	@RequestMapping(value = "/clearPassword.do")
	public String clearPassword(ModelMap model, 
			@RequestParam(required=false) String id,
			@RequestParam(required=false) String newPassword,
			UserManageVO userManageVO) throws Exception {

		String resultMsg = "";
		
		userManageVO = userManageService.selectUser(id);
		
		//패스워드 암호화
		userManageVO.setPassword(EgovFileScrty.encryptPassword(newPassword, userManageVO.getEmplyrId()));
		userManageService.updatePassword(userManageVO);
		
		return "forward:/uat/uia/loginUsr.do";
	}
	 
	 
	/**
	 * 하남 로그인 화면으로 들어간다
	 * @param vo - 로그인후 이동할 URL이 담긴 LoginVO
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/loginHN.do")
	public String loginHN(@ModelAttribute("loginVO") LoginVO loginVO, @ModelAttribute("searchVO") BoardVO boardVO,
			HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		
		//권한체크시 에러 페이지 이동
		String auth_error =  request.getParameter("auth_error") == null ? "" : (String)request.getParameter("auth_error");
		if(auth_error != null && auth_error.equals("1")){
			
			String refer = request.getHeader("Referer");
			if(refer.contains("main.do")) {
				model.addAttribute("resultRedirect", "redirect:/"+refer);
				model.addAttribute("resultMsg", "해당 기능에 대한 권한이 없습니다.");
				model.addAttribute("resultClose", "close");
				return "egiskorea/com/cmm/actionResult";
			} else if(refer.contains("mngr")) {
			}
			return "egovframework/com/cmm/error/accessDenied";
		}
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		if(user != null) {
			return "redirect:/uat/uia/mainAction.do";
		}
		
		String message = (String)request.getParameter("loginMessage");
		if (message!=null) model.addAttribute("loginMessage", message);
		
		boardVO.setBbsId("BBSMSTR_000000000052"); // 공지사항 게시판ID
		List<BoardVO> noticeList = egovArticleService.selectNoticeArticleList(boardVO);
		
		model.addAttribute("result", noticeList);
		model.addAttribute("resultTot", noticeList.size());
		
		return "egiskorea/com/uat/uia/loginUsr_hanam";
	}
	
	/**
	 * 김포 로그인 화면으로 들어간다
	 * @param vo - 로그인후 이동할 URL이 담긴 LoginVO
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/loginGP.do")
	public String loginGP(@ModelAttribute("loginVO") LoginVO loginVO, @ModelAttribute("searchVO") BoardVO boardVO,
			HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		
		//권한체크시 에러 페이지 이동
		String auth_error =  request.getParameter("auth_error") == null ? "" : (String)request.getParameter("auth_error");
		if(auth_error != null && auth_error.equals("1")){
			
			String refer = request.getHeader("Referer");
			if(refer.contains("main.do")) {
				model.addAttribute("resultRedirect", "redirect:/"+refer);
				model.addAttribute("resultMsg", "해당 기능에 대한 권한이 없습니다.");
				model.addAttribute("resultClose", "close");
				return "egiskorea/com/cmm/actionResult";
			} else if(refer.contains("mngr")) {
			}
			return "egovframework/com/cmm/error/accessDenied";
		}
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		if(user != null) {
			return "redirect:/uat/uia/mainAction.do";
		}
		
		String message = (String)request.getParameter("loginMessage");
		if (message!=null) model.addAttribute("loginMessage", message);
		
		boardVO.setBbsId("BBSMSTR_000000000052"); // 공지사항 게시판ID
		List<BoardVO> noticeList = egovArticleService.selectNoticeArticleList(boardVO);
		
		model.addAttribute("result", noticeList);
		model.addAttribute("resultTot", noticeList.size());
		
		return "egiskorea/com/uat/uia/loginUsr_gimpo";
	}
	
	/**
	 * 의정부 로그인 화면으로 들어간다
	 * @param vo - 로그인후 이동할 URL이 담긴 LoginVO
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/loginUJB.do")
	public String loginUJB(@ModelAttribute("loginVO") LoginVO loginVO, @ModelAttribute("searchVO") BoardVO boardVO,
			HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		
		//권한체크시 에러 페이지 이동
		String auth_error =  request.getParameter("auth_error") == null ? "" : (String)request.getParameter("auth_error");
		if(auth_error != null && auth_error.equals("1")){
			
			String refer = request.getHeader("Referer");
			if(refer.contains("main.do")) {
				model.addAttribute("resultRedirect", "redirect:/"+refer);
				model.addAttribute("resultMsg", "해당 기능에 대한 권한이 없습니다.");
				model.addAttribute("resultClose", "close");
				return "egiskorea/com/cmm/actionResult";
			} else if(refer.contains("mngr")) {
			}
			return "egovframework/com/cmm/error/accessDenied";
		}
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		if(user != null) {
			return "redirect:/uat/uia/mainAction.do";
		}
		
		String message = (String)request.getParameter("loginMessage");
		if (message!=null) model.addAttribute("loginMessage", message);
		
		boardVO.setBbsId("BBSMSTR_000000000052"); // 공지사항 게시판ID
		List<BoardVO> noticeList = egovArticleService.selectNoticeArticleList(boardVO);
		
		model.addAttribute("result", noticeList);
		model.addAttribute("resultTot", noticeList.size());
		
		return "egiskorea/com/uat/uia/loginUsr_uijeongbu";
	}
	
	/**
	 * 웹앱 로그인 화면으로 들어간다
	 * @param vo - 로그인후 이동할 URL이 담긴 LoginVO
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/loginWebApp.do")
	public String loginWebApp(@ModelAttribute("loginVO") LoginVO loginVO, @ModelAttribute("searchVO") BoardVO boardVO,
			HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		
		//권한체크시 에러 페이지 이동
		String auth_error =  request.getParameter("auth_error") == null ? "" : (String)request.getParameter("auth_error");
		if(auth_error != null && auth_error.equals("1")){
			
			String refer = request.getHeader("Referer");
			if(refer.contains("main.do")) {
				model.addAttribute("resultRedirect", "redirect:/"+refer);
				model.addAttribute("resultMsg", "해당 기능에 대한 권한이 없습니다.");
				model.addAttribute("resultClose", "close");
				return "egiskorea/com/cmm/actionResult";
			} else if(refer.contains("mngr")) {
			}
			return "egovframework/com/cmm/error/accessDenied";
		}
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		if(user != null) {
			return "redirect:/uat/uia/mainAction.do";
		}
		
		String message = (String)request.getParameter("loginMessage");
		if (message!=null) model.addAttribute("loginMessage", message);
		
		boardVO.setBbsId("BBSMSTR_000000000052"); // 공지사항 게시판ID
		List<BoardVO> noticeList = egovArticleService.selectNoticeArticleList(boardVO);
		
		model.addAttribute("result", noticeList);
		model.addAttribute("resultTot", noticeList.size());
		
		return "egiskorea/com/uat/uia/loginUsr_webApp";
	}
}
