package egiskorea.com.job.fcmr.wsfc.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import egiskorea.com.job.fcmr.wsfc.service.WtlFirePsVO;
import egiskorea.com.job.fcmr.wsfc.service.WtlFlowPsVO;
import egiskorea.com.job.fcmr.wsfc.service.WtlPipeLmVO;

/**
 * @Description 시설관리/상수도시설
 * @author 황의현
 * @since 2023.04.04
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.04.04   황의현           최초 생성
 *  2023.04.06   장현승           상수관로, 유량계
 */

@Controller
@RequestMapping("/job/fcmr/wsfc")
public class WaterSupplyController {

    //private static final Logger logger = LoggerFactory.getLogger(WtlFirePsController.class);
	
	////////
	//소방시설
	
	//목록 화면 호출
	@RequestMapping(value = "/selectWtlFirePsListView.do")
    public String selectWtlFirePsListView(
            @ModelAttribute("wtlFirePsVO") WtlFirePsVO wtlFirePsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wfip/wtlFirePsListView";
    }
	
	//상세 화면 조회
	@RequestMapping(value = "/selectWtlFirePs.do", method = RequestMethod.POST)
    public String selectWtlFirePs(
    		@ModelAttribute("wtlFirePsVO") WtlFirePsVO wtlFirePsVO, String id,
    		ModelMap model) throws Exception {
			model.addAttribute("gridRowId", id);
        return "egiskorea/com/job/fcmr/wsfc/wfip/selectWtlFirePs";
    }
	
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
			model.addAttribute("gridRowId", id);
        return "egiskorea/com/job/fcmr/wsfc/wfip/updateWtlFirePsView";
    }
	
		
	////////
	//상수관로
	
	//목록 화면 호출
	@RequestMapping(value = "/selectWtlPipeListView.do")
    public String selectWtlPipeLmList(
            @ModelAttribute("wtlPipeLmVO") WtlPipeLmVO wtlPipeLmVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wpil/wtlPipeLmListView";
    }
	
	//상세 화면 조회
	@RequestMapping(value = "/selectWtlPipeLmDetail.do", method = RequestMethod.POST)
	public String getWtlPipeLmDetail(
			@ModelAttribute("wtlPipeLmVO") WtlPipeLmVO wtlPipeLmVO, String id,
			ModelMap model) throws Exception {
			model.addAttribute("gridRowId", id);
		return "egiskorea/com/job/fcmr/wsfc/wpil/selectWtlPipeLm";
	}
	
	//등록 화면 조회
	@RequestMapping(value = "/insertWtlPipeLmView.do")
	public String insertWtlPipeLmView(
			@ModelAttribute("wtlPipeLmVO") WtlPipeLmVO wtlPipeLmVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/wsfc/wpil/insertWtlPipeLmView";
	}
	
	//수정 화면 조회
	@RequestMapping(value = "/updateWtlPipeLmView.do", method = RequestMethod.POST)
	public String updateWtlPipeLmView(
			@ModelAttribute("wtlPipeLmVO") WtlPipeLmVO wtlPipeLmVO, String id,
			ModelMap model) throws Exception {
			model.addAttribute("gridRowId", id);
		return "egiskorea/com/job/fcmr/wsfc/wpil/updateWtlPipeLmView";
	}
	
	////////
	//유량계
	
	//목록 화면 호출
	@RequestMapping(value = "/selectWtlFlowListView.do")
    public String selectWtlFlowPsList(
            @ModelAttribute("wtlFlowPsVO") WtlFlowPsVO wtlFlowPsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wflp/wtlFlowPsListView";
    }
	
	//상세 화면 조회
	@RequestMapping(value = "/selectWtlFlowPsDetail.do", method = RequestMethod.POST)
	public String getWtlFlowPsDetail(
			@ModelAttribute("wtlFlowPsVO") WtlFlowPsVO wtlFlowPsVO, String id,
			ModelMap model) throws Exception {
			model.addAttribute("gridRowId", id);
		return "egiskorea/com/job/fcmr/wsfc/wflp/selectWtlFlowPs";
	}
	
	//등록 화면 조회
	@RequestMapping(value = "/insertWtlFlowPsView.do")
	public String insertWtlFlowPsView(
			@ModelAttribute("wtlFlowPsVO") WtlFlowPsVO wtlFlowPsVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/wsfc/wflp/insertWtlFlowPsView";
	}
	
	//수정 화면 조회
	@RequestMapping(value = "/updateWtlFlowPsView.do", method = RequestMethod.POST)
	public String updateWtlFlowPsView(
			@ModelAttribute("wtlFlowPsVO") WtlFlowPsVO wtlFlowPsVO, String id,
			ModelMap model) throws Exception {
			model.addAttribute("gridRowId", id);
		return "egiskorea/com/job/fcmr/wsfc/wflp/updateWtlFlowPsView";
	}
	
	////////
	//상수맨홀
	
	//////////
	//상수관로심도
	
	////////
	//수압계
	
	////////
	//배수지
	
	////////
	//급수관로
	
	////////
	//변류시설
    
}
