/**
 * 
 */
package egiskorea.com.usi.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

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

import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.uss.umt.service.DeptManageVO;
import egovframework.com.uss.umt.service.EgovDeptManageService;
import egovframework.com.uss.umt.service.EgovUserManageService;
import egovframework.com.uss.umt.service.UserDefaultVO;
import egovframework.com.uss.umt.service.UserManageVO;
import egovframework.com.utl.sim.service.EgovFileScrty;

/**
 * @Description 사용자정보 수정 및 패스워드 변경
 * @author 플랫폼개발부문 DT솔루션 정상혁
 * @since 2022.02.04
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.04		정상혁	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/usi")
public class UserInfoController {
	
	/** userManageService */
	@Resource(name = "userManageService")
	private EgovUserManageService userManageService;
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;

	@Resource(name = "egovDeptManageService")
	private EgovDeptManageService egovDeptManageService;
	
	/** DefaultBeanValidator beanValidator */
	@Autowired
	private DefaultBeanValidator beanValidator;
	
	
	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;
	
	
	/**
	 * @Description 사용자정보 수정 팝업 호출  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.02.04
	 * @return "egiskorea/com/usi/userInfo";
	 * @throws Exception
	 */
	@RequestMapping(value = "/userInfoViewPopup.do")
	public String userInfoViewPopup(@RequestParam(value="userId",required=false) String userId, Model model) throws Exception{
		
		// 미인증 사용자에 대한 보안처리
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if (!isAuthenticated) {
			return "redirect:/uat/uia/loginUsr.do";
		}
		
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		DeptManageVO deptManageVO = new DeptManageVO();
		UserManageVO userManageVO = new UserManageVO();
		userManageVO = userManageService.selectUser(userId);
		
		deptManageVO.setGroupId(userManageVO.getGroupId());
		List<?> orgnztId_result = egovDeptManageService.selectGroupDeptAjaxList(deptManageVO);
		
		//사용자상태코드를 코드정보로부터 조회
		vo.setCodeId("COM013");
		List<?> emplyrSttusCode_result = cmmUseService.selectCmmCodeDetail(vo);
		
		model.addAttribute("emplyrSttusCode_result", emplyrSttusCode_result);//사용자상태코드목록
		model.addAttribute("orgnztId_result", orgnztId_result);
		model.addAttribute("userManageVO", userManageVO);
		
		
		return "egiskorea/com/usi/userInfo";
	}
	
	
	
	/**
	 * @Description 사용자정보 변경
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.02.07
	 * @param userManageVO
	 * @param bindingResult
	 * @param model
	 * @return "egiskorea/com/usi/userInfo";
	 * @throws Exception
	 */
	@RequestMapping("/updateUserInfo.do")
	public String updateUserInfo(@ModelAttribute("userManageVO") UserManageVO userManageVO, BindingResult bindingResult, Model model) throws Exception {
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		DeptManageVO deptManageVO = new DeptManageVO();
		String resultMsg = "";
		
		beanValidator.validate(userManageVO, bindingResult);
		if (bindingResult.hasErrors()) {
			resultMsg = bindingResult.getAllErrors().get(0).getDefaultMessage();
			model.addAttribute("resultMsg", resultMsg);
			return "redirect:/main.do";
		} else {
			//업무사용자 수정시 히스토리 정보를 등록한다.
			userManageService.insertUserHistory(userManageVO);
			if ("".equals(userManageVO.getOrgnztId())) {//KISA 보안약점 조치 (2018-10-29, 윤창원)
				userManageVO.setOrgnztId(null);
			}
			if ("".equals(userManageVO.getGroupId())) {//KISA 보안약점 조치 (2018-10-29, 윤창원)
				userManageVO.setGroupId(null);
			}
			
			//사용자 정보 수정 후, 정보 그대로 입력 시킬 사용자정보 저장
			userManageService.updateUser(userManageVO);
			userManageVO = userManageService.selectUser(userManageVO.getEmplyrId());
			model.addAttribute("userManageVO", userManageVO);
			
			//그룹에 따른 부서 정보 가져오기
			deptManageVO.setGroupId(userManageVO.getGroupId());
			List<?> orgnztId_result = egovDeptManageService.selectGroupDeptAjaxList(deptManageVO);
			model.addAttribute("orgnztId_result", orgnztId_result);
			
			//사용자상태코드를 코드정보로부터 조회
			vo.setCodeId("COM013");
			List<?> emplyrSttusCode_result = cmmUseService.selectCmmCodeDetail(vo);
			model.addAttribute("emplyrSttusCode_result", emplyrSttusCode_result);//사용자상태코드목록
			
			//Exception 없이 진행시 수정성공메시지
			resultMsg = "success.common.update";
			model.addAttribute("resultMsg", resultMsg);
			return "egiskorea/com/usi/userInfo";
		}
	}
	
	
	/**
	 * @Description 사용자 패스워드 수정
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.02.07
	 * @param model
	 * @param commandMap
	 * @param request
	 * @param userManageVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateUserInfoPassword.do")
	public ModelAndView updateUserInfoPassword(ModelMap model, @RequestParam Map<String, Object> commandMap, HttpServletRequest request,
			@ModelAttribute("userManageVO") UserManageVO userManageVO) throws Exception{
	
		ModelAndView mav = new ModelAndView("jsonView");
		
		// Map에서 변경할 패스워드 가져오기
		String oldPassword = (String) commandMap.get("oldPassword");
		String newPassword = (String) commandMap.get("newPassword");
		String newPassword2 = (String) commandMap.get("newPassword2");
		
		String uniqId = (String) commandMap.get("uniqIdPassChg");
		String emplyrId = (String) commandMap.get("emplyrIdPassChg");
		boolean isCorrectPassword = false;
		
		UserManageVO resultVO = new UserManageVO();
		userManageVO.setPassword(newPassword);
		userManageVO.setOldPassword(oldPassword);
		userManageVO.setUniqId(uniqId);
		userManageVO.setEmplyrId(emplyrId);
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
			resultMsg = "success.common.update";
		} else {
		}

		mav.addObject("resultMsg", egovMessageSource.getMessage(resultMsg));
		return mav;
	}
}
