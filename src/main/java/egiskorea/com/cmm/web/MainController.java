package egiskorea.com.cmm.web;

import java.io.File;
import java.io.PrintWriter;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

import egiskorea.com.cmt.fvrt.service.FavoritesService;
import egiskorea.com.cmt.fvrt.service.FavoritesVO;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.uat.uia.service.EgovLoginService;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 웹페이지 controller 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.10.29
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.10.29		이상화	최초 생성
 *  </pre>
 */

@Controller
public class MainController {
	
	/** EgovLoginService */
	@Resource(name = "loginService")
	private EgovLoginService loginService;

	@Resource(name = "favoritesService")
	private FavoritesService favoritesService;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);
	
	/**
	 * 메인페이지를 로딩한다.
	 * 
	 * @throws Exception
	 */
	@RequestMapping("/main.do")
	public String main(ModelMap model, FavoritesVO favoritesVO, RedirectAttributes rttr,
			HttpServletRequest request) throws Exception{
		
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
			
//			favoritesVO.setEmplyrId(loginVO.getId());
//			EgovMap result = favoritesService.selectBaseFavorites(favoritesVO);
//			model.addAttribute("fvrtList", result);
		}
		
		// 만료일자로부터 경과한 일수 => ex)1이면 만료일에서 1일 경과
		model.addAttribute("elapsedTimeExpiration", passedDayChangePWD - expirePwdDay);
		
		if(RequestContextUtils.getInputFlashMap(request) != null) {
			model.addAttribute("area", (String) RequestContextUtils.getInputFlashMap(request).get("area"));
		}
		
 		return "egiskorea/com/cmm/main";
	}
	
	
	
	
	/**
	 * 2D 테스트 페이지
	 * @param model
	 * @param favoritesVO
	 * @param rttr
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/test2D.do")
	public String test2D(ModelMap model, FavoritesVO favoritesVO, RedirectAttributes rttr,
			HttpServletRequest request) throws Exception{
		
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
			
//			favoritesVO.setEmplyrId(loginVO.getId());
//			EgovMap result = favoritesService.selectBaseFavorites(favoritesVO);
//			model.addAttribute("fvrtList", result);
		}
		
		// 만료일자로부터 경과한 일수 => ex)1이면 만료일에서 1일 경과
		model.addAttribute("elapsedTimeExpiration", passedDayChangePWD - expirePwdDay);
		
		if(RequestContextUtils.getInputFlashMap(request) != null) {
			model.addAttribute("area", (String) RequestContextUtils.getInputFlashMap(request).get("area"));
		}
		
		return "egiskorea/com/cmm/test2D";
	}
	
	/**
	 * 3D 테스트 페이지
	 * @param model
	 * @param favoritesVO
	 * @param rttr
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/test3D.do")
	public String test3D(ModelMap model, FavoritesVO favoritesVO, RedirectAttributes rttr,
			HttpServletRequest request) throws Exception{
		
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
			
//			favoritesVO.setEmplyrId(loginVO.getId());
//			EgovMap result = favoritesService.selectBaseFavorites(favoritesVO);
//			model.addAttribute("fvrtList", result);
		}
		
		// 만료일자로부터 경과한 일수 => ex)1이면 만료일에서 1일 경과
		model.addAttribute("elapsedTimeExpiration", passedDayChangePWD - expirePwdDay);
		
		if(RequestContextUtils.getInputFlashMap(request) != null) {
			model.addAttribute("area", (String) RequestContextUtils.getInputFlashMap(request).get("area"));
		}
		
		return "egiskorea/com/cmm/test3D";
	}
	
	@RequestMapping("/testInternet.do")
	public String testInternet() {
		return "egiskorea/com/cmm/testInternet";
	}
	@RequestMapping("/testLx.do")
	public String testLx() {
		return "egiskorea/com/cmm/testLx";
	}
	
	
	
	
	@RequestMapping("/content.do")
	public String content(@RequestParam("url") String url) throws Exception{
		
		return url;
	}
	
	/**
	 * 지오서버 연동시 proxy 처리
	 */
//	@NoLogging
	@RequestMapping(value = "/proxy.do", method = RequestMethod.GET)
	public String proxyGeoserver(@RequestParam("url") String url, Model model) {
		/*if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("============= Proxy Geoserver =============");
		}*/
		model.addAttribute("url", url);
		
		return "egiskorea/com/cmm/proxy";
	}
	/**
	 * @Description : 분석모듈init
	 * @Author osan0
	 * @Date 2022.01.11
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/module.do")
	public void module(HttpServletRequest request, HttpServletResponse response) throws Exception{
		//파일 패스 
		String modPath = request.getSession().getServletContext().getRealPath("/");
		modPath += "/appModule";
		
		File dir = new File(modPath);
		File[] fList = dir.listFiles();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		
		for (File file : fList) {
			if(file.isDirectory()) {
				//모듈 파일이름
				ary.add(file.getName());
			}
		}
		
		PrintWriter pw = response.getWriter();
		obj.put("result", ary);
		pw.print(obj);
		
    	pw.flush();
    	pw.close();
	}
	
	@RequestMapping("/userManual.do")
	public String getTestManual(String txt, Model model) {
		model.addAttribute("txt", txt);
		return "egiskorea/com/cmm/userManual";
	}
}
