package egiskorea.com.job.tfan.brin.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import egiskorea.com.job.tfan.brin.service.BusRouteInformationService;
import egiskorea.com.job.tfan.brin.service.TbdThrghRouteInfoVO;
import egiskorea.com.job.tfan.brin.service.TgdBusSttnInfoVO;

/**
 * @Description 교통분석/버스노선정보
 * @author 글로벌컨설팅부문 장현승
 * @since 2023.05.17
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.17   장현승           최초 생성
 */

@Controller
@RequestMapping("/job/tfan/brin")
public class BusRouteInformationController {

	@Autowired
    private BusRouteInformationService busRouteInformationService;
	
	////////
	//버스정류소
	
	//목록 화면 호출
	@RequestMapping(value = "/selectTgdBusSttnInfoListView.do")
    public String selectTgdBusSttnInfoListView(
            @ModelAttribute("tgdBusSttnInfoVO") TgdBusSttnInfoVO tgdBusSttnInfoVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/tfan/brin/brst/tgdBusSttnInfoListView";
    }
	
	//정류소경유노선(버스정류소정보)
	@RequestMapping(value = "/selectTgdBusSttnInfo.do", method = RequestMethod.POST)
    public String selectTgdBusSttnInfo(
    		@ModelAttribute("tgdBusSttnInfoVO") TgdBusSttnInfoVO tgdBusSttnInfoVO,
    		ModelMap model) throws Exception {
        return "egiskorea/com/job/tfan/brin/brst/selectTgdBusSttnInfo";
    }
	
	//정류소경유노선(특정 경유노선정보)
	@RequestMapping(value = "/selectTbdThrghRouteInfo.do", method = RequestMethod.POST)
	public String selectTbdThrghRouteInfo(
		@ModelAttribute("tbdThrghRouteInfoVO") TbdThrghRouteInfoVO tbdThrghRouteInfoVO, ModelMap model) throws Exception {
		
		List<TbdThrghRouteInfoVO> result = busRouteInformationService.getTbdThrghRouteInfoById(tbdThrghRouteInfoVO.getSttnId());
	    model.addAttribute("tbdThrghRouteInfoVO", result);
	    
	    return "egiskorea/com/job/tfan/brin/brst/selectTgdBusSttnInfo";
	}
    
}
