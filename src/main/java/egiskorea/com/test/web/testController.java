package egiskorea.com.test.web;

import java.io.File;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.uat.uia.service.EgovLoginService;

/**
 * 
* <pre>
* 간략 : 모듈 태스트용.
* 상세 : .
* egiskorea.com.test.web
*   |_ testController.java
* </pre>
* 
* @Company : DGIST
* @Author  : j
* @Date    : 2021. 12. 28 오후 12:27:13
* @Version : 1.0
 */

@Controller
public class testController {
	
	/** EgovLoginService */
	@Resource(name = "loginService")
	private EgovLoginService loginService;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(testController.class);
	
	/**
	 * 메인페이지를 로딩한다.
	 * 
	 * @throws Exception
	 */
	@RequestMapping("/testMain.do")
	public String main(ModelMap model) throws Exception{
		
		// 설정된 비밀번호 유효기간을 가져온다. ex) 180이면 비밀번호 변경후 만료일이 앞으로 180일 
		String propertyExpirePwdDay = EgovProperties.getProperty("Globals.ExpirePwdDay");
		int expirePwdDay = 0 ;
		try {
			expirePwdDay =  Integer.parseInt(propertyExpirePwdDay);
		} catch (Exception e) {
			LOGGER.debug("convert expirePwdDay Err : "+e.getMessage());
		}
		
		model.addAttribute("expirePwdDay", expirePwdDay);
		
		// 비밀번호 설정일로부터 몇일이 지났는지 확인한다. ex) 3이면 비빌번호 설정후 3일 경과
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		model.addAttribute("loginVO", loginVO);
		int passedDayChangePWD = 0;
		if ( loginVO != null ) {
			LOGGER.debug("===>>> loginVO.getId() = "+loginVO.getId());
			LOGGER.debug("===>>> loginVO.getUniqId() = "+loginVO.getUniqId());
			LOGGER.debug("===>>> loginVO.getUserSe() = "+loginVO.getUserSe());
			// 비밀번호 변경후 경과한 일수
//			passedDayChangePWD = loginService.selectPassedDayChangePWD(loginVO);
			LOGGER.debug("===>>> passedDayChangePWD = "+passedDayChangePWD);
			model.addAttribute("passedDay", passedDayChangePWD);
		}
		
		// 만료일자로부터 경과한 일수 => ex)1이면 만료일에서 1일 경과
		model.addAttribute("elapsedTimeExpiration", passedDayChangePWD - expirePwdDay);
		
		return "egiskorea/com/test/main";
	}
	
	@RequestMapping("/moduleList.do")
	public void moduleList(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		String modPath = request.getSession().getServletContext().getRealPath("/");
		modPath += "\\moduleData";
		File dir = new File(modPath);
		File[] fList = dir.listFiles();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		
		for (File file : fList) {
			if(file.isDirectory()) {
				ary.add(file.getName());
			}
		}
		
		PrintWriter pw = response.getWriter();
		obj.put("result", ary);
		pw.print(obj);
		
    	pw.flush();
    	pw.close();
	}
}
