package egiskorea.com.job.fcmr.ssfc.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import egiskorea.com.job.fcmr.ssfc.service.SwlConnLsVO;
import egiskorea.com.job.fcmr.ssfc.service.SwlPipeAsVO;
import egiskorea.com.job.fcmr.ssfc.service.SwlVentPsVO;

/**
 * @Description 시설관리/하수도 시설
 * @author 황의현
 * @since 2023.04.14
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.04.14   황의현           최초 생성
 *  2023.04.19   김영주           환기구
 */

@Controller
@RequestMapping("/job/fcmr/ssfc")
public class SewerSupplyController {

    //private static final Logger logger = LoggerFactory.getLogger(WtlFirePsController.class);
	
	/////////
	//하수연결관
	
	//하수연결관 목록 화면 호출
	@RequestMapping(value = "/selectSwlConnLsListView.do")
    public String selectSwlConnLsListView(
            @ModelAttribute("swlConnLsVO") SwlConnLsVO swlConnLsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/ssfc/scol/swlConnLsListView";
    }
	
	//하수연결관 상세 화면 조회
	@RequestMapping(value = "/selectSwlConnLs.do", method = RequestMethod.POST)
    public String selectSwlConnLs(
    		@ModelAttribute("swlConnLsVO") SwlConnLsVO swlConnLsVO, String id,
    		ModelMap model) throws Exception {
			model.addAttribute("id", id);
        return "egiskorea/com/job/fcmr/ssfc/scol/selectSwlConnLs";
    }
	
	//하수연결관 등록 화면 조회
	@RequestMapping(value = "/insertSwlConnLsView.do")
    public String insertSwlConnLsView(
            @ModelAttribute("swlConnLsVO") SwlConnLsVO swlConnLsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/ssfc/scol/insertSwlConnLsView";
    }
	
	//하수연결관 수정 화면 조회
	@RequestMapping(value = "/updateSwlConnLsView.do", method = RequestMethod.POST)
    public String updateSwlConnLsView(
    		@ModelAttribute("swlConnLsVO") SwlConnLsVO swlConnLsVO, String id,
    		ModelMap model) throws Exception {
			model.addAttribute("id", id);
        return "egiskorea/com/job/fcmr/ssfc/scol/updateSwlConnLsView";
    }
	
	///////////
	//면형하수관거
	
	//면형하수관거 목록 화면 호출
	@RequestMapping(value = "/selectSwlPipeAsListView.do")
    public String selectSwlPipeAsListView(
            @ModelAttribute("swlPipeAsVO") SwlPipeAsVO swlPipeAsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/ssfc/spia/swlPipeAsListView";
    }
	
	/*
	//면형하수관거 등록 화면 조회
	@RequestMapping(value = "/insertSwlPipeAsView.do")
    public String insertSwlPipeAsView(
    		@ModelAttribute("swlPipeAsVO") SwlPipeAsVO swlPipeAsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/ssfc/ssfc/insertSwlPipeAsView";
    }
	
	//면형하수관거 상세 화면 조회
	@RequestMapping(value = "/selectSwlPipeAs.do", method = RequestMethod.POST)
    public String selectSwlPipeAs(
    		@ModelAttribute("swlPipeAsVO") SwlPipeAsVO swlPipeAsVO, String id,
    		ModelMap model) throws Exception {
			model.addAttribute("id", id);
        return "egiskorea/com/job/fcmr/ssfc/ssfc/selectSwlPipeAs";
    }
	
	//면형하수관거 수정 화면 조회
	@RequestMapping(value = "/updateSwlPipeAsView.do", method = RequestMethod.POST)
    public String updateSwlPipeAsView(
    		@ModelAttribute("swlPipeAsVO") SwlPipeAsVO swlPipeAsVO, String id,
    		ModelMap model) throws Exception {
			model.addAttribute("id", id);
        return "egiskorea/com/job/fcmr/ssfc/ssfc/updateSwlPipeAsView";
    }
	*/
	
	///////
	// 환기구

	// 환기구 목록 조회
	@RequestMapping(value = "/selectSwlVentPsListView.do")
	public String selectSwlVentPsListView(
			@ModelAttribute("swlVentPsVO") SwlVentPsVO swlVentPsVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/ssfc/svep/swlVentPsListView";
	}
	
	// 환기구 상세화면 조회
	@RequestMapping(value = "/selectSwlVentPsDetail.do", method = RequestMethod.POST)
	public String selectSwlVentPsDetail(
			@ModelAttribute("swlVentPsVO") SwlVentPsVO swlVentPsVO, String id,
			ModelMap model) throws Exception {
		model.addAttribute("id", id);
		return "egiskorea/com/job/fcmr/ssfc/svep/swlVentPsDetail";
	}
	
	// 환기구 등록화면 조회
	@RequestMapping(value = "/insertSwlVentPsView.do")
	public String insertSwlVentPsView(
			@ModelAttribute("swlVentPsVO") SwlVentPsVO swlVentPsVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/ssfc/svep/insertSwlVentPsView";
	}
	
	// 환기구 수정화면 조회
	@RequestMapping(value = "/updateSwlVentPsView.do", method = RequestMethod.POST)
	public String updateSwlVentPsView(
			@ModelAttribute("swlVentPsVO") SwlVentPsVO swlVentPsVO, String id,
			ModelMap model) throws Exception {
		model.addAttribute("id", id);
		return "egiskorea/com/job/fcmr/ssfc/svep/updateSwlVentPsView";
	}
}
