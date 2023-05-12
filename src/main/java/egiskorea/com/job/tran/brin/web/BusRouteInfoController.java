package egiskorea.com.job.tran.brin.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import egiskorea.com.job.tran.brin.service.BusRouteVO;
import egiskorea.com.job.tran.brin.service.BusSttnVO;

/**
 * @Description 교통분석/버스노선정보
 * @author 김영주
 * @since 2023.05.11
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                     수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.11   김영주                최초 생성
 */

@Controller
@RequestMapping("/job/tran/brin")
public class BusRouteInfoController {

	//////////
	// 버스노선
	
	// 버스노선 목록 조회
	@RequestMapping(value = "/selectBusRouteListView.do")
	public String selectBusRouteListView(
			@ModelAttribute("busRouteVO") BusRouteVO busRouteVO,
			ModelMap model) throws Exception {
		
		return "egiskorea/com/job/tran/brin/buro/busRouteListView";
	}

	// 버스노선 상세화면 조회
	@RequestMapping(value = "/selectBusRoute.do", method = RequestMethod.POST)
	public String selectBusRoute(
			@ModelAttribute("busRouteVO") BusRouteVO busRouteVO, String route_id,
			ModelMap model) throws Exception {
		// 경유 정류소 목록: tbd_bus_route_station_list
		return "egiskorea/com/job/tran/brin/buro/busRouteDetail";
	}
		
	//////////
	// 버스정류소
	
	// 버스정류소 목록 조회
	@RequestMapping(value = "/selectBusSttnListView.do")
	public String selectBusSttnListView(
			@ModelAttribute("busSttnVO") BusSttnVO busSttnVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/tran/brin/bust/busSttnListView";
	}

	// 버스정류소 상세화면 조회
//	@RequestMapping(value = "/selectBusSttn.do", method = RequestMethod.POST)
//	public String selectBusSttn(
//			@ModelAttribute("busSttnVO") BusSttnVO busSttnVO, String id,
//			ModelMap model) throws Exception {
//		model.addAttribute("id", id);
//		return "egiskorea/com/job/tran/brin/bust/busSttnDetail";
//	}
}
