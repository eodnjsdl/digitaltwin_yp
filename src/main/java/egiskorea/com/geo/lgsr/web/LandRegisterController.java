package egiskorea.com.geo.lgsr.web;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.geo.lgsr.service.LandRegisterService;
import egiskorea.com.geo.lgsr.service.LandRegisterVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 지적을 관리하는 controller 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.11.10
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.11.10   이상화           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/geo/lgsr")
public class LandRegisterController {
	
	@Resource(name = "landRegisterService")
	private LandRegisterService landRegisterService;
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	/**
	 * 좌표정보를 받아 주소정보 및 pnu 반환
	 * 
	 * @param surveyInfoVO
	 * @param surveyInfoVO
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value = "/getPnuByLonLat.do")
	public ModelAndView getPnuByLonLat(
			@ModelAttribute("landRegisterVO") LandRegisterVO landRegisterVO,
			ModelMap model) throws Exception{
		
		EgovMap pnu = landRegisterService.getPnuByLonLat(landRegisterVO);
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("pnu", pnu);	
		mav.addObject("result", "success");	
		
		return mav;
	}
	
	/**
	 * pnu를 통해 지적정보 조회
	 * @param landRegisterVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getLandRegisterByPnu.do")
	public ModelAndView getLandRegisterByPnu(
			@ModelAttribute("landRegisterVO") LandRegisterVO landRegisterVO,
			ModelMap model) throws Exception{
		
		int pnuLeng = landRegisterVO.getPnu().length();
		
		if(pnuLeng == 19) { // 필지
			landRegisterVO.setMode("lp");
		} else if(pnuLeng == 10) { // 리
			landRegisterVO.setMode("li");
		}
		
		LandRegisterVO landRegister = landRegisterService.getLandRegisterByPnu(landRegisterVO);
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("landRegister", landRegister);
		
		return mav;
	}
}
