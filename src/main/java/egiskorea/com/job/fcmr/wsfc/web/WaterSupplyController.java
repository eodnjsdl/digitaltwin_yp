package egiskorea.com.job.fcmr.wsfc.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import egiskorea.com.job.fcmr.wsfc.service.WtlFirePsVO;
import egiskorea.com.job.fcmr.wsfc.service.WtlFlowPsVO;
import egiskorea.com.job.fcmr.wsfc.service.WtlManhPsVO;
import egiskorea.com.job.fcmr.wsfc.service.WtlPipeLmVO;
import egiskorea.com.job.fcmr.wsfc.service.WtlPrgaPsVO;
import egiskorea.com.job.fcmr.wsfc.service.WtlServPsVO;
import egiskorea.com.job.fcmr.wsfc.service.WtlValvPsVO;

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
 *  2023.04.06   장현승           유량계, 상수맨홀, 수압계, 배수지
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
			model.addAttribute("id", id);
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
			model.addAttribute("id", id);
        return "egiskorea/com/job/fcmr/wsfc/wfip/updateWtlFirePsView";
    }
	
		
	////////
	//상수관로
	
	//목록 화면 호출
	@RequestMapping(value = "/selectWtlPipeLmListView.do")
    public String selectWtlPipeLmList(
            @ModelAttribute("wtlPipeLmVO") WtlPipeLmVO wtlPipeLmVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wpil/wtlPipeLmListView";
    }
	
	//상세 화면 조회
	@RequestMapping(value = "/selectWtlPipeLm.do", method = RequestMethod.POST)
	public String selectWtlPipeLm(
			@ModelAttribute("wtlPipeLmVO") WtlPipeLmVO wtlPipeLmVO, String id,
			ModelMap model) throws Exception {
			model.addAttribute("id", id);
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
			model.addAttribute("id", id);
		return "egiskorea/com/job/fcmr/wsfc/wpil/updateWtlPipeLmView";
	}
	
	////////
	//유량계
	
	//목록 화면 호출
	@RequestMapping(value = "/selectWtlFlowPsListView.do")
    public String selectWtlFlowPsListView(
            @ModelAttribute("wtlFlowPsVO") WtlFlowPsVO wtlFlowPsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wflp/wtlFlowPsListView";
    }
	
	//상세 화면 조회
	@RequestMapping(value = "/selectWtlFlowPs.do", method = RequestMethod.POST)
	public String selectWtlFlowPs(
			@ModelAttribute("wtlFlowPsVO") WtlFlowPsVO wtlFlowPsVO, String id,
			ModelMap model) throws Exception {
			model.addAttribute("id", id);
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
			model.addAttribute("id", id);
		return "egiskorea/com/job/fcmr/wsfc/wflp/updateWtlFlowPsView";
	}
	
	////////
	//상수맨홀
	
	//목록 화면 호출
	@RequestMapping(value = "/selectWtlManhPsListView.do")
    public String selectWtlManhPsListView(
            @ModelAttribute("wtlManhPsVO") WtlManhPsVO wtlManhPsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wmap/wtlManhPsListView";
    }
	
	//상세 화면 조회
	@RequestMapping(value = "/selectWtlManhPs.do", method = RequestMethod.POST)
	public String selectWtlManhPs(
			@ModelAttribute("wtlManhPsVO") WtlManhPsVO wtlManhPsVO, String id,
			ModelMap model) throws Exception {
			model.addAttribute("id", id);
		return "egiskorea/com/job/fcmr/wsfc/wmap/selectWtlManhPs";
	}
	
	//등록 화면 조회
	@RequestMapping(value = "/insertWtlManhPsView.do")
	public String insertWtlManhPsView(
			@ModelAttribute("wtlManhPsVO") WtlManhPsVO wtlManhPsVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/wsfc/wmap/insertWtlManhPsView";
	}
	
	//수정 화면 조회
	@RequestMapping(value = "/updateWtlManhPsView.do", method = RequestMethod.POST)
	public String updateWtlManhPsView(
			@ModelAttribute("wtlManhPsVO") WtlManhPsVO wtlManhPsVO, String id,
			ModelMap model) throws Exception {
			model.addAttribute("id", id);
		return "egiskorea/com/job/fcmr/wsfc/wmap/updateWtlManhPsView";
	}
	
	//////////
	//상수관로심도
	
	////////
	//수압계
	
	//목록 화면 호출
	@RequestMapping(value = "/selectWtlPrgaPsListView.do")
    public String selectWtlPrgaPsListView(
            @ModelAttribute("wtlPrgaPsVO") WtlPrgaPsVO wtlPrgaPsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wprp/wtlPrgaPsListView";
    }
	
	//상세 화면 조회
	@RequestMapping(value = "/selectWtlPrgaPs.do", method = RequestMethod.POST)
	public String selectWtlPrgaPs(
			@ModelAttribute("wtlPrgaPsVO") WtlPrgaPsVO wtlPrgaPsVO, String id,
			ModelMap model) throws Exception {
			model.addAttribute("id", id);
		return "egiskorea/com/job/fcmr/wsfc/wprp/selectWtlPrgaPs";
	}
	
	//등록 화면 조회
	@RequestMapping(value = "/insertWtlPrgaPsView.do")
	public String insertWtlPrgaPsView(
			@ModelAttribute("wtlPrgaPsVO") WtlPrgaPsVO wtlPrgaPsVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/wsfc/wprp/insertWtlPrgaPsView";
	}
	
	//수정 화면 조회
	@RequestMapping(value = "/updateWtlPrgaPsView.do", method = RequestMethod.POST)
	public String updateWtlPrgaPsView(
			@ModelAttribute("wtlPrgaPsVO") WtlPrgaPsVO wtlPrgaPsVO, String id,
			ModelMap model) throws Exception {
			model.addAttribute("id", id);
		return "egiskorea/com/job/fcmr/wsfc/wprp/updateWtlPrgaPsView";
	}
	
	////////
	//배수지
	
	//목록 화면 호출
	@RequestMapping(value = "/selectWtlServPsListView.do")
    public String selectWtlServPsListView(
            @ModelAttribute("wtlServPsVO") WtlServPsVO wtlServPsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wsep/wtlServPsListView";
    }
	
	//상세 화면 조회
	@RequestMapping(value = "/selectWtlServPs.do", method = RequestMethod.POST)
	public String selectWtlServPs(
			@ModelAttribute("wtlServPsVO") WtlServPsVO wtlServPsVO, String id,
			ModelMap model) throws Exception {
			model.addAttribute("id", id);
		return "egiskorea/com/job/fcmr/wsfc/wsep/selectWtlServPs";
	}
	
	//등록 화면 조회
	@RequestMapping(value = "/insertWtlServPsView.do")
	public String insertWtlServPsView(
			@ModelAttribute("wtlServPsVO") WtlServPsVO wtlServPsVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/wsfc/wsep/insertWtlServPsView";
	}
	
	//수정 화면 조회
	@RequestMapping(value = "/updateWtlServPsView.do", method = RequestMethod.POST)
	public String updateWtlServPsView(
			@ModelAttribute("wtlServPsVO") WtlServPsVO wtlServPsVO, String id,
			ModelMap model) throws Exception {
			model.addAttribute("id", id);
		return "egiskorea/com/job/fcmr/wsfc/wsep/updateWtlServPsView";
	}
	
	////////
	//급수관로
	
	////////
	//변류시설
	
	//목록 화면 호출
	@RequestMapping(value = "/selectWtlValvPsListView.do")
    public String selectWtlValvPsListView(
            @ModelAttribute("wtlValvPsVO") WtlValvPsVO wtlValvPsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wvap/wtlValvPsListView";
    }
	
	//상세 화면 조회
	@RequestMapping(value = "/selectWtlValvPs.do", method = RequestMethod.POST)
    public String selectWtlValvPs(
    		@ModelAttribute("wtlValvPsVO") WtlValvPsVO wtlValvPsVO, String id,
    		ModelMap model) throws Exception {
			model.addAttribute("id", id);
        return "egiskorea/com/job/fcmr/wsfc/wvap/selectWtlValvPs";
    }
	
	//등록 화면 조회
	@RequestMapping(value = "/insertWtlValvPsView.do")
    public String insertWtlValvPsView(
            @ModelAttribute("wtlValvPsVO") WtlValvPsVO wtlValvPsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wvap/insertWtlValvPsView";
    }
	
	//수정 화면 조회
	@RequestMapping(value = "/updateWtlValvPsView.do", method = RequestMethod.POST)
    public String updateWtlValvPsView(
    		@ModelAttribute("wtlValvPsVO") WtlValvPsVO wtlValvPsVO, String id,
    		ModelMap model) throws Exception {
			model.addAttribute("id", id);
        return "egiskorea/com/job/fcmr/wsfc/wvap/updateWtlValvPsView";
    }
    
}
