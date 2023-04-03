package egiskorea.com.job.fcmr.wsfc.wfp.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egiskorea.com.job.fcmr.wsfc.wfp.service.WtlFirePsVO;

/**
 * @Description 시설관리/상수도시설/소방시설
 * @author 황의현
 * @since 2023.03.28
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.03.28   황의현           최초 생성
 */

@Controller
@RequestMapping("/job/fcmr/wsfc/wfp")
public class WtlFirePsController {

    //private static final Logger logger = LoggerFactory.getLogger(WtlFirePsController.class);

	
	//옵션 화면 조회
	@RequestMapping(value = "/getWtlFirePsListSrchOpView.do")
    public String selectWtlFirePsList(
            @ModelAttribute("wtlFirePsVO") WtlFirePsVO wtlFirePsVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wsfc/wfp/wtlFirePsSearchOption";
    }

	//등록 화면 조회
	
	//상세 화면 조회
	@RequestMapping(value = "/getWtlFirePsDetail.do", method = RequestMethod.POST)
    public String getWtlFirePsDetail(
    		WtlFirePsVO wtlFirePsVO
    		//@RequestBody List<Map<String, Object>> param
    		, ModelMap model) throws Exception {
		
		System.out.println("wtlFirePsVO>>>>>>>>>>>>>");
		System.out.println(wtlFirePsVO.toString());
		//model.addAttribute("wtlFirePsVO", wtlFirePsVO);
		
        return "egiskorea/com/job/fcmr/wsfc/wfp/wtlFirePsDetail";
    }
	
	
	
	
    /*//목록 조회
    @RequestMapping(value = "/selectWtlFirePsList.do")
    public String selectWtlFirePsList(
            @ModelAttribute("wtlFirePsVO") WtlFirePsVO workSampleVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wrfc/frfc/wtlFirePsList";
    }

    //상세 조회
    @RequestMapping(value = "/selectWtlFirePs.do")
    public String selectWtlFirePs(
    		 @ModelAttribute("wtlFirePsVO") WtlFirePsVO workSampleVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wrfc/frfc/wtlFirePsDetail";
    }

    //등록화면 호출
    @RequestMapping(value = "/insertWtlFirePsView.do")
    public String insertWtlFirePsView(
    		 @ModelAttribute("wtlFirePsVO") WtlFirePsVO workSampleVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/fcmr/wrfc/frfc/wtlFirePsInsert";
    }*/
    
}
