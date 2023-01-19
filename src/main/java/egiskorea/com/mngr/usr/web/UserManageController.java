package egiskorea.com.mngr.usr.web;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.uss.umt.service.DeptManageVO;
import egovframework.com.uss.umt.service.EgovDeptManageService;
import egovframework.com.uss.umt.service.EgovUserManageService;
import egovframework.com.uss.umt.service.UserDefaultVO;
import egovframework.com.uss.umt.service.UserManageVO;
import egovframework.com.utl.sim.service.EgovFileScrty;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egiskorea.com.cmm.service.CmmUtils;
import egiskorea.com.cmm.service.Globals;

/**
 * @Description 사용자 관리에 대한  controller 클래스
 * @author 플랫폼개발부문 DT솔루션 정상혁
 * @since 2022.01.04
 * @version 1.0
 * @see
 *
 *<pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.04   정상혁           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/mngr/usr")
public class UserManageController {

	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;
	
	/** userManageService */
	@Resource(name = "userManageService")
	private EgovUserManageService userManageService;

	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;

	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	@Resource(name = "egovDeptManageService")
	private EgovDeptManageService egovDeptManageService;
	
	/** DefaultBeanValidator beanValidator */
	@Autowired
	private DefaultBeanValidator beanValidator;

	/**
	 * 그룹별 조직을 조회한다.
	 * @param groupId 그룹 아이디
	 * @param model 화면모델
	 * @return egiskorea/com/adm/usr/selectUserManageList
	 * @throws Exception
	 */
	
	@RequestMapping("/selectGroupDeptAjaxList.do")
	public String selectGroupDeptAjaxList(@RequestParam("groupId") String groupId,
			@ModelAttribute("deptManageVO") DeptManageVO deptManageVO,
			ModelMap model) throws Exception{

		//그룹 ID를 조직VO의 groupId에 담고, selectOrgnztLinkGroup(groupId)
		
		deptManageVO.setGroupId(groupId);
		deptManageVO.setFirstIndex(0);
		deptManageVO.setRecordCountPerPage(100);
		
		List<?> deptList = egovDeptManageService.selectGroupDeptAjaxList(deptManageVO);
		
		model.addAttribute("returnType", "select");
		model.addAttribute("type", "dept");
		model.addAttribute("resultList", deptList);
		
		return "egiskorea/com/cmm/ajaxResult";
	}
	
	/**
	 * 사용자목록을 조회한다. (pageing)
	 * @param userSearchVO 검색조건정보
	 * @param model 화면모델
	 * @return egiskorea/com/adm/usr/selectUserManageList
	 * @throws Exception
	 */
	
	@RequestMapping(value = "/selectUserManageList.do")
	public String selectUserManageList(@ModelAttribute("userSearchVO") UserDefaultVO userSearchVO, ModelMap model) throws Exception {

		/*
		 * // 미인증 사용자에 대한 보안처리 Boolean isAuthenticated =
		 * EgovUserDetailsHelper.isAuthenticated(); if (!isAuthenticated) { return
		 * "index"; }
		 */

		/** EgovPropertyService */
		userSearchVO.setPageUnit(propertiesService.getInt("pageUnit"));
		userSearchVO.setPageSize(propertiesService.getInt("pageSize"));

		/** pageing */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(userSearchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(userSearchVO.getPageUnit());
		paginationInfo.setPageSize(userSearchVO.getPageSize());

		userSearchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		userSearchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		userSearchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		List<?> userList = userManageService.selectUserList(userSearchVO);
		model.addAttribute("resultList", userList);
		
		int totCnt = userManageService.selectUserListTotCnt(userSearchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);

		//사용자상태코드를 코드정보로부터 조회
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		vo.setCodeId("COM013");
		List<?> emplyrSttusCode_result = cmmUseService.selectCmmCodeDetail(vo);
		model.addAttribute("emplyrSttusCode_result", emplyrSttusCode_result);//사용자상태코드목록

		return "egiskorea/com/adm/usr/selectUserManageList";
	}

	/**
	 * 사용자정보를 상세조회한다.
	 * @param uniqId 상세조회대상 사용자아이디
	 * @param userSearchVO 검색조건
	 * @param model 화면모델
	 * @return "egiskorea/com/adm/usr/updateUserManageView"
	 * @throws Exception
	 */
	@RequestMapping("/selectUserManage.do")
	public String selectUserManage(@RequestParam("selectedId") String userId, @ModelAttribute("searchVO") UserDefaultVO userSearchVO, Model model) throws Exception {

		// 미인증 사용자에 대한 보안처리
		/*
		 * Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); if
		 * (!isAuthenticated) { return "index"; }
		 */

		ComDefaultCodeVO vo = new ComDefaultCodeVO();

		//사용자상태코드를 코드정보로부터 조회
		vo.setCodeId("COM013");
		List<?> emplyrSttusCode_result = cmmUseService.selectCmmCodeDetail(vo);
		//소속기관코드를 코드정보로부터 조회 - COM025
		vo.setCodeId("COM025");
		List<?> insttCode_result = cmmUseService.selectCmmCodeDetail(vo);
		//조직정보를 조회 - ORGNZT_ID정보
		vo.setTableNm("COMTNORGNZTINFO");
		List<?> orgnztId_result = cmmUseService.selectOgrnztIdDetail(vo);
		//그룹정보를 조회 - GROUP_ID정보
		vo.setTableNm("COMTNAUTHORGROUPINFO");
		List<?> groupId_result = cmmUseService.selectGroupIdDetail(vo);

		model.addAttribute("emplyrSttusCode_result", emplyrSttusCode_result);//사용자상태코드목록
		model.addAttribute("insttCode_result", insttCode_result); //소속기관코드목록
		model.addAttribute("orgnztId_result", orgnztId_result); //조직정보 목록
		model.addAttribute("groupId_result", groupId_result); //그룹정보 목록

		UserManageVO userManageVO = new UserManageVO();
		userManageVO = userManageService.selectUser(userId);
		model.addAttribute("userSearchVO", userSearchVO);
		model.addAttribute("userManageVO", userManageVO);

		return "egiskorea/com/adm/usr/selectUserManage";
	}
	
	/**
	 * 사용자등록화면으로 이동한다.
	 * @param userSearchVO 검색조건정보
	 * @param userManageVO 사용자초기화정보
	 * @param model 화면모델
	 * @return egiskorea/com/adm/usr/insertUserManageView
	 * @throws Exception
	 */
	@RequestMapping("/insertUserManageView.do")
	public String insertUserManageView(@ModelAttribute("userSearchVO") UserDefaultVO userSearchVO, @ModelAttribute("userManageVO") UserManageVO userManageVO, Model model)
			throws Exception {

		// 미인증 사용자에 대한 보안처리
		/*
		 * Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); if
		 * (!isAuthenticated) { return "index"; }
		 */

		ComDefaultCodeVO vo = new ComDefaultCodeVO();

		//사용자상태코드를 코드정보로부터 조회
		vo.setCodeId("COM013");
		List<?> emplyrSttusCode_result = cmmUseService.selectCmmCodeDetail(vo);
		//소속기관코드를 코드정보로부터 조회 - COM025
		vo.setCodeId("COM025");
		List<?> insttCode_result = cmmUseService.selectCmmCodeDetail(vo);
		//조직정보를 조회 - ORGNZT_ID정보
		vo.setTableNm("COMTNORGNZTINFO");
		List<?> orgnztId_result = cmmUseService.selectOgrnztIdDetail(vo);
		//그룹정보를 조회 - GROUP_ID정보
		vo.setTableNm("COMTNAUTHORGROUPINFO");
		List<?> groupId_result = cmmUseService.selectGroupIdDetail(vo);

		model.addAttribute("emplyrSttusCode_result", emplyrSttusCode_result);//사용자상태코드목록
		model.addAttribute("insttCode_result", insttCode_result); //소속기관코드목록
		model.addAttribute("orgnztId_result", orgnztId_result); //조직정보 목록
		model.addAttribute("groupId_result", groupId_result); //그룹정보 목록

		return "egiskorea/com/adm/usr/insertUserManageView";
	}

	/**
	 * 사용자등록처리후 목록화면으로 이동한다.
	 * @param userManageVO 사용자등록정보
	 * @param bindingResult 입력값검증용 bindingResult
	 * @param model 화면모델
	 * @return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectUserManageList.do", userManageVO)
	 * @throws Exception
	 */
	@RequestMapping("/insertUserManage.do")
	public String insertUserManage(@ModelAttribute("userManageVO") UserManageVO userManageVO, BindingResult bindingResult, Model model) throws Exception {

		// 미인증 사용자에 대한 보안처리
		/*
		 * Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); if
		 * (!isAuthenticated) { return "index"; }
		 */
		
		String message = "";
		
		beanValidator.validate(userManageVO, bindingResult);
		if (bindingResult.hasErrors()) {
			return "egiskorea/com/adm/usr/insertUserManageView";
		} else {
			if ("".equals(userManageVO.getOrgnztId())) {//KISA 보안약점 조치 (2018-10-29, 윤창원)
				userManageVO.setOrgnztId(null);
			}
			if ("".equals(userManageVO.getGroupId())) {//KISA 보안약점 조치 (2018-10-29, 윤창원)
				userManageVO.setGroupId(null);
			}
			userManageService.insertUser(userManageVO);
			
			// 해당 아이디에 대한 스키마 생성  (ex)dtw_user_geo_webmaster
			String schemaNm = Globals.CSV_DB_NAME + userManageVO.getEmplyrId().toLowerCase();
			userManageService.createUserSchema(schemaNm);
			
			//Exception 없이 진행시 등록성공메시지
			message = egovMessageSource.getMessage("success.common.insert");
		}
		return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectUserManageList.do", userManageVO, null);
	}

	/**
	 * 사용자정보 수정을 위해 이동한다.
	 * @param uniqId 상세조회대상 사용자아이디
	 * @param userSearchVO 검색조건
	 * @param model 화면모델
	 * @return "egiskorea/com/adm/usr/updateUserManageView"
	 * @throws Exception
	 */
	@RequestMapping("/updateUserManageView.do")
	public String updateUserManageView(@RequestParam("selectedId") String userId, @ModelAttribute("searchVO") UserDefaultVO userSearchVO, Model model) throws Exception {

		// 미인증 사용자에 대한 보안처리
		/*
		 * Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); if
		 * (!isAuthenticated) { return "index"; }
		 */

		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		DeptManageVO deptManageVO = new DeptManageVO();
		UserManageVO userManageVO = new UserManageVO();
		userManageVO = userManageService.selectUser(userId);
		
		deptManageVO.setGroupId(userManageVO.getGroupId());
		List<?> orgnztId_result = egovDeptManageService.selectGroupDeptAjaxList(deptManageVO);
		model.addAttribute("orgnztId_result", orgnztId_result);
		
		//사용자상태코드를 코드정보로부터 조회
		vo.setCodeId("COM013");
		List<?> emplyrSttusCode_result = cmmUseService.selectCmmCodeDetail(vo);
		//소속기관코드를 코드정보로부터 조회 - COM025
		vo.setCodeId("COM025");
		List<?> insttCode_result = cmmUseService.selectCmmCodeDetail(vo);

		model.addAttribute("emplyrSttusCode_result", emplyrSttusCode_result);//사용자상태코드목록
		model.addAttribute("insttCode_result", insttCode_result); //소속기관코드목록
		model.addAttribute("orgnztId_result", orgnztId_result); //조직정보 목록

		model.addAttribute("userSearchVO", userSearchVO);
		model.addAttribute("userManageVO", userManageVO);

		return "egiskorea/com/adm/usr/updateUserManageView";
	}
	
	/**
	 * 로그인인증제한 해제 
	 * @param userManageVO 사용자정보
	 * @param model 화면모델
	 * @return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/updateUserManageView.do", userManageVO);
	 * @throws Exception
	 */
	@RequestMapping("/updateUserLockIncorrect.do")
	public ModelAndView updateUserLockIncorrect(UserManageVO userManageVO, Model model)
			throws Exception {
		
		ModelAndView mav = new ModelAndView("jsonView");
		// 미인증 사용자에 대한 보안처리
		/*
		 * Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); if
		 * (!isAuthenticated) { return "index"; }
		 */
		userManageService.updateLockIncorrect(userManageVO);

		mav.addObject("resultMsg", "success");
		
		return mav;
	}

	/**
	 * 사용자정보 수정후 목록조회 화면으로 이동한다.
	 * @param userManageVO 사용자수정정보
	 * @param bindingResult 입력값검증용 bindingResult
	 * @param model 화면모델
	 * @return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectUserManage.do", userManageVO, map);
	 * @throws Exception
	 */
	@RequestMapping("/updateUserManage.do")
	public String updateUserManage(@ModelAttribute("userManageVO") UserManageVO userManageVO, BindingResult bindingResult, Model model) throws Exception {

		// 미인증 사용자에 대한 보안처리
		/*
		 * Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); if
		 * (!isAuthenticated) { return "index"; }
		 */
		String message = "";
		beanValidator.validate(userManageVO, bindingResult);
		if (bindingResult.hasErrors()) {
			message = bindingResult.getAllErrors().get(0).getDefaultMessage();
			return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectUserManageList.do", userManageVO, null);
		} else {
			//업무사용자 수정시 히스토리 정보를 등록한다.
			userManageService.insertUserHistory(userManageVO);
			if ("".equals(userManageVO.getOrgnztId())) {//KISA 보안약점 조치 (2018-10-29, 윤창원)
				userManageVO.setOrgnztId(null);
			}
			if ("".equals(userManageVO.getGroupId())) {//KISA 보안약점 조치 (2018-10-29, 윤창원)
				userManageVO.setGroupId(null);
			}
			userManageService.updateUser(userManageVO);
			
			//Exception 없이 진행시 수정성공메시지
			HashMap<String, String> map = new HashMap<>();
			map.put("selectedId", userManageVO.getEmplyrId());
			
			message = egovMessageSource.getMessage("success.common.update");
			model.addAttribute("selectedId", userManageVO.getEmplyrId());
			return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectUserManage.do", userManageVO, map);
		}
	}

	/**
	 * 사용자정보삭제후 목록조회 화면으로 이동한다.
	 * @param checkedIdForDel 삭제대상아이디 정보
	 * @param userSearchVO 검색조건
	 * @param model 화면모델
	 * @return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectUserManageList.do", userSearchVO, map);
	 * @throws Exception
	 */
	@RequestMapping("/deleteUserManage.do")
	public String deleteUserManage(@RequestParam("checkedIdForDel") String checkedIdForDel, @ModelAttribute("searchVO") UserDefaultVO userSearchVO, Model model) throws Exception {

		// 미인증 사용자에 대한 보안처리
		/*
		 * Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); if
		 * (!isAuthenticated) { return "index"; }
		 */

		String message = "";
		
		userManageService.deleteUser(checkedIdForDel);
		userManageService.deleteUserSchema(checkedIdForDel);
		
		
		//Exception 없이 진행시 등록성공메시지
		HashMap<String, String> map = new HashMap<>();
		
		message = egovMessageSource.getMessage("success.common.delete");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectUserManageList.do", userSearchVO, map);
	}
	
	/**
	 * 입력한 사용자아이디의 중복여부를 체크하여 사용가능여부를 확인
	 * @param commandMap 파라메터전달용 commandMap
	 * @param model 화면모델
	 * @return modelAndView
	 * @throws Exception
	 */
	@RequestMapping(value = "/idDplctCnfirmAjax.do")
	public ModelAndView idDplctCnfirmAjax(@RequestParam Map<String, Object> commandMap) throws Exception {

    	ModelAndView modelAndView = new ModelAndView();
    	modelAndView.setViewName("jsonView");

		String checkId = (String) commandMap.get("checkId");
		//checkId = new String(checkId.getBytes("ISO-8859-1"), "UTF-8");

		int usedCnt = userManageService.checkIdDplct(checkId);
		modelAndView.addObject("usedCnt", usedCnt);
		modelAndView.addObject("checkId", checkId);

		return modelAndView;
	}

	/**
	 * 업무사용자 암호 수정처리 후 화면 이동
	 * @param model 화면모델
	 * @param commandMap 파라메터전달용 commandMap
	 * @param userSearchVO 검색조 건
	 * @param userManageVO 사용자수정정보(비밀번호)
	 * @return egiskorea/com/adm/usr/updateUserPasswordView
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateUserPassword.do")
	public String updateUserPassword(ModelMap model, @RequestParam Map<String, Object> commandMap, @ModelAttribute("searchVO") UserDefaultVO userSearchVO,
			@ModelAttribute("userManageVO") UserManageVO userManageVO) throws Exception {

		// 미인증 사용자에 대한 보안처리
		/*
		 * Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); if
		 * (!isAuthenticated) { return "index"; }
		 */

		String oldPassword = (String) commandMap.get("oldPassword");
		String newPassword = (String) commandMap.get("newPassword");
		String newPassword2 = (String) commandMap.get("newPassword2");
		String uniqId = (String) commandMap.get("uniqId");

		boolean isCorrectPassword = false;
		UserManageVO resultVO = new UserManageVO();
		userManageVO.setPassword(newPassword);
		userManageVO.setOldPassword(oldPassword);
		userManageVO.setUniqId(uniqId);

		String resultMsg = "";
		resultVO = userManageService.selectPassword(userManageVO);
		//패스워드 암호화
		String encryptPass = EgovFileScrty.encryptPassword(oldPassword, userManageVO.getEmplyrId());
		if (encryptPass.equals(resultVO.getPassword())) {
			if (newPassword.equals(newPassword2)) {
				isCorrectPassword = true;
			} else {
				isCorrectPassword = false;
				resultMsg = "fail.user.passwordUpdate2";
			}
		} else {
			isCorrectPassword = false;
			resultMsg = "fail.user.passwordUpdate1";
		}

		if (isCorrectPassword) {
			userManageVO.setPassword(EgovFileScrty.encryptPassword(newPassword, userManageVO.getEmplyrId()));
			userManageService.updatePassword(userManageVO);
			model.addAttribute("userManageVO", userManageVO);
			resultMsg = "success.common.update";
		} else {
			model.addAttribute("userManageVO", userManageVO);
		}
		model.addAttribute("userSearchVO", userSearchVO);
		model.addAttribute("resultMsg", resultMsg);

		return "egiskorea/com/adm/usr/updateUserPasswordView";
	}

	/**
	 * 업무사용자 암호 수정  화면 이동
	 * @param model 화면모델
	 * @param commandMap 파라메터전달용 commandMap
	 * @param userSearchVO 검색조건
	 * @param userManageVO 사용자수정정보(비밀번호)
	 * @return egiskorea/com/adm/usr/updateUserPasswordView
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateUserPasswordView.do")
	public String updateUserPasswordView(ModelMap model, @RequestParam Map<String, Object> commandMap, @ModelAttribute("searchVO") UserDefaultVO userSearchVO,
			@ModelAttribute("userManageVO") UserManageVO userManageVO) throws Exception {

		// 미인증 사용자에 대한 보안처리
		/*
		 * Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); if
		 * (!isAuthenticated) { return "index"; }
		 */
		String userTyForPassword = (String) commandMap.get("userTyForPassword");
		userManageVO.setUserTy(userTyForPassword);

		model.addAttribute("userManageVO", userManageVO);
		model.addAttribute("userSearchVO", userSearchVO);
		return "egiskorea/com/adm/usr/updateUserPasswordView";
	}
	
	
	/**
	 * @Description 사용자 관리 > 사용자 정보 > 정보 수정 > 패스워드 초기화
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.03.03
	 * @param model
	 * @param commandMap
	 * @param userSearchVO
	 * @param userManageVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/userPasswordReset.do")
	public ModelAndView userPasswordReset(ModelMap model, @RequestParam Map<String, Object> commandMap, @ModelAttribute("searchVO") UserDefaultVO userSearchVO,
			@ModelAttribute("userManageVO") UserManageVO userManageVO) throws Exception {

		ModelAndView mav = new ModelAndView("jsonView");

		String password = "rhdxhd12"; // 쓰마트12!@
		String uniqId = (String) commandMap.get("uniqId");

		userManageVO.setUniqId(uniqId);

		userManageVO.setPassword(EgovFileScrty.encryptPassword(password, userManageVO.getEmplyrId()));
		userManageService.updatePassword(userManageVO);
		
		mav.addObject("resultMsg", "success");

		return mav;
	}

}
