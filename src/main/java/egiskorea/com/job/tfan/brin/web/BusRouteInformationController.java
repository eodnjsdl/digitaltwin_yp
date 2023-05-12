package egiskorea.com.job.tfan.brin.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import egiskorea.com.job.fcmr.wsfc.service.WtlFirePsVO;
import egiskorea.com.job.tfan.brin.service.TbdBusRouteStationVO;

/**
 * @Description 교통분석/버스노선정보
 * @author 장현승
 * @since 2023.05.11
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.11   장현승           최초 생성
 */

@Controller
@RequestMapping("/job/tfan/brin")
public class BusRouteInformationController {

    //private static final Logger logger = LoggerFactory.getLogger(WtlFirePsController.class);
	
	////////
	//소방시설
	
	//목록 화면 호출
	@RequestMapping(value = "/selectTbdBusRouteStationListView.do")
    public String selectTbdBusRouteStationListView(
            @ModelAttribute("tbdBusRouteStation") TbdBusRouteStationVO tbdBusRouteStationVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/tfan/brin/brst/tbdBusRouteStationListView";
    }
    
}
