package egiskorea.com.job.fcmr.wlfc.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.job.fcmr.wlfc.service.WelFareFaciService;
import egiskorea.com.job.fcmr.wlfc.service.WelFareFaciVO;

/**
 * @Description : 시설관리/복지시설
 * @author      : 김영주
 * @since       : 2023.04.11
 * @version     : 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                    수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.04.11   김영주           최초 생성
 */

@Controller
@RequestMapping("/job/fcmr/wlfc")
public class WelFareFaciController {

	//private static final Logger logger = LoggerFactory.getLogger(WelfareController.class);
	
	@Resource(name = "welFareFaciService")
	private WelFareFaciService welFareFaciService;
	
	/**
     * 복지시설 목록 조회
     * 
     * @param WelFareFaciVO
     * @param model
     * @return "egiskorea/com/job/fcmr/wlfc/welFareFaciListView"
     * @throws Exception
     */
	@RequestMapping(value = "/selectWelFareFaciListView.do")
	public String selectWelFareFaciList(
			@ModelAttribute("WelFareFaciVO") WelFareFaciVO welFareFaciVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/wlfc/welFareFaciListView";
	}
	
	/**
     * 복지시설 상세보기
     * 
     * @param WelFareFaciVO
     * @param model
     * @return "egiskorea/com/job/fcmr/wlfc/welFareFaciListView"
     * @throws Exception
     */
	@RequestMapping(value = "/selectWelFareFaciDetail.do", method = RequestMethod.POST)
	public String selectWelFareFaciDetail(
			@ModelAttribute("WelFareFaciVO") WelFareFaciVO welFareFaciVO, 
			int gid, ModelMap model) throws Exception {
		
		WelFareFaciVO result = welFareFaciService.selectWelFareFaciDetail(welFareFaciVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/wlfc/welFareFaciDetail";
	}
	
	/**
     * 복지시설 등록 화면
     * 
     * @param WelFareFaciVO
     * @param model
     * @return "egiskorea/com/job/fcmr/wlfc/welFareFaciListView"
     * @throws Exception
     */
	@RequestMapping(value = "/insertWelFareFaciView.do")
	public String insertWelFareFaciView(
			@ModelAttribute("WelFareFaciVO") WelFareFaciVO welFareFaciVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/wlfc/insertWelFareFaciView";
	}
	
	/**
     * 복지시설 등록
     * 
     * @param WelFareFaciVO
     * @param model
     * @return "jsonView"
     * @throws Exception
     */
	@RequestMapping(value = "/insertWelFareFaci.do", method = RequestMethod.POST)
	public String insertPhyEduFaci(
			@ModelAttribute("WelFareFaciVO") WelFareFaciVO welFareFaciVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		welFareFaciVO.setFcltyNm(request.getParameter("fcltyNm"));
		welFareFaciVO.setFcltySe(request.getParameter("fcltySe"));
		welFareFaciVO.setCttpcTelno(request.getParameter("cttpcTelno"));
		welFareFaciVO.setRnAdres(request.getParameter("rnAdres"));
		welFareFaciVO.setZip(request.getParameter("zip"));
		welFareFaciVO.setLnmAdres(request.getParameter("lnmAdres"));
		welFareFaciVO.setLat(Double.parseDouble(request.getParameter("lat")));
		welFareFaciVO.setLon(Double.parseDouble(request.getParameter("lon")));
		
		welFareFaciService.insertWelFareFaci(welFareFaciVO);

		return "jsonView";
	}
	
	/**
     * 복지시설 수정 화면 
     * 
     * @param WelFareFaciVO
     * @param model
     * @return "egiskorea/com/job/fcmr/wlfc/updateWelFareFaciView";
     * @throws Exception
     */
	@RequestMapping(value = "/updateWelFareFaciView.do")
	public String updateWelFareFaciView(
			@ModelAttribute("WelFareFaciVO") WelFareFaciVO welFareFaciVO,
			int gid, HttpServletRequest request, ModelMap model) throws Exception {
		
		WelFareFaciVO result = welFareFaciService.selectWelFareFaciDetail(welFareFaciVO);
		
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/wlfc/updateWelFareFaciView";
	}
	
	/**
     * 복지시설 수정
     * 
     * @param WelFareFaciVO
     * @param model
     * @return "jsonView"
     * @throws Exception
     */
	@RequestMapping(value = "/updateWelFareFaci.do", method = RequestMethod.POST)
	public String updatePhyEduFaci(
			@ModelAttribute("WelFareFaciVO") WelFareFaciVO welFareFaciVO,
			int gid, HttpServletRequest request, ModelMap model) throws Exception {
		welFareFaciVO.setFcltyNm(request.getParameter("fcltyNm"));
		welFareFaciVO.setFcltySe(request.getParameter("fcltySe"));
		welFareFaciVO.setCttpcTelno(request.getParameter("cttpcTelno"));
		welFareFaciVO.setRnAdres(request.getParameter("rnAdres"));
		welFareFaciVO.setZip(request.getParameter("zip"));
		welFareFaciVO.setLnmAdres(request.getParameter("lnmAdres"));
		welFareFaciVO.setLat(Double.parseDouble(request.getParameter("lat")));
		welFareFaciVO.setLon(Double.parseDouble(request.getParameter("lon")));
		
		welFareFaciService.updateWelFareFaci(welFareFaciVO);
		
		WelFareFaciVO result = welFareFaciService.selectWelFareFaciDetail(welFareFaciVO);
		model.addAttribute("result", result);
		
		return "jsonView";
	}
	
	/**
     * 복지시설 삭제
     * 
     * @param WelFareFaciVO
     * @param model
     * @return "mv"
     * @throws Exception
     */
	@RequestMapping(value = "/deleteWelFareFaci.do")
	public ModelAndView deleteWelFareFaci(
			@ModelAttribute("WelFareFaciVO") WelFareFaciVO welFareFaciVO,
			int gid, ModelMap model) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		try {
			welFareFaciService.deleteWelFareFaci(welFareFaciVO);
			
			mv.addObject("result", "success");
		} catch(Exception e) {
			mv.addObject("result", "fail");
		}
		return mv;
	}
}
