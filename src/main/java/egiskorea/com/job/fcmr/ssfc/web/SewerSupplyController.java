package egiskorea.com.job.fcmr.ssfc.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import egiskorea.com.job.fcmr.ssfc.service.SwlConnLsVO;
import egiskorea.com.job.fcmr.wsfc.service.WtlFirePsVO;
import egiskorea.com.job.fcmr.wsfc.service.WtlFlowPsVO;
import egiskorea.com.job.fcmr.wsfc.service.WtlPipeLmVO;

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
 */

@Controller
@RequestMapping("/job/fcmr/ssfc")
public class SewerSupplyController {

    //private static final Logger logger = LoggerFactory.getLogger(WtlFirePsController.class);
	
	////////
	//하수연결관
	
	//목록 화면 호출
	@RequestMapping(value = "/selectSwlConnLsListView.do")
    public String selectSwlConnLsListView(
            @ModelAttribute("swlConnLsVO") SwlConnLsVO swlConnLsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/ssfc/scol/swlConnLsListView";
    }
	
	//상세 화면 조회
	@RequestMapping(value = "/selectSwlConnLs.do", method = RequestMethod.POST)
    public String selectSwlConnLs(
    		@ModelAttribute("swlConnLsVO") SwlConnLsVO swlConnLsVO, String id,
    		ModelMap model) throws Exception {
			model.addAttribute("id", id);
        return "egiskorea/com/job/fcmr/ssfc/scol/selectSwlConnLs";
    }
	
	/*
	//등록 화면 조회
	@RequestMapping(value = "/insertWtlFirePsView.do")
    public String insertWtlFirePsView(
            @ModelAttribute("wtlFirePsVO") WtlFirePsVO wtlFirePsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wfip/insertWtlFirePsView";
    }
	
	//수정 화면 조회
	@RequestMapping(value = "/updateWtlFirePsView.do", method = RequestMethod.POST)
    public String updateWtlFirePsView(
    		@ModelAttribute("wtlFirePsVO") WtlFirePsVO wtlFirePsVO, String id,
    		ModelMap model) throws Exception {
			model.addAttribute("id", id);
        return "egiskorea/com/job/fcmr/wsfc/wfip/updateWtlFirePsView";
    }
	*/
		
	
    
}
