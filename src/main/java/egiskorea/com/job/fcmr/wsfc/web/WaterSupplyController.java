package egiskorea.com.job.fcmr.wsfc.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import egiskorea.com.job.fcmr.wsfc.service.WtlFirePsVO;

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
 */

@Controller
@RequestMapping("/job/fcmr/wsfc")
public class WaterSupplyController {

    //private static final Logger logger = LoggerFactory.getLogger(WtlFirePsController.class);
	
	////////
	//소방시설
	
	//목록 화면 호출
	@RequestMapping(value = "/selectWtlFireListView.do")
    public String selectWtlFireListView(
            @ModelAttribute("wtlFirePsVO") WtlFirePsVO wtlFirePsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wfp/wtlFirePsListView";
    }
	
	//등록 화면 조회
	
	//상세 화면 조회
	@RequestMapping(value = "/getWtlFirePsDetail.do", method = RequestMethod.POST)
    public String getWtlFirePsDetail(
    		@ModelAttribute("wtlFirePsVO") WtlFirePsVO wtlFirePsVO
    		, ModelMap model) throws Exception {

		//System.out.println("wtlFirePsVO>>>>>>>>>>>>>");
		//System.out.println(wtlFirePsVO.toString());
		
        return "egiskorea/com/job/fcmr/wsfc/wfp/wtlFirePsDetail";
    }
		
	////////
	//상수관로
	
	////////
	//유량계
	
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