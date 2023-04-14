package egiskorea.com.job.fcmr.tpfc.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import egiskorea.com.job.fcmr.tpfc.service.BrdgeVO;
import egiskorea.com.job.fcmr.tpfc.service.OvrpassVO;
import egiskorea.com.job.fcmr.tpfc.service.RlroadStVO;
import egiskorea.com.job.fcmr.tpfc.service.RlroadTcVO;
import egiskorea.com.job.fcmr.tpfc.service.RoadSectVO;
import egiskorea.com.job.fcmr.tpfc.service.SbwayStVO;
import egiskorea.com.job.fcmr.tpfc.service.SbwayTcVO;
import egiskorea.com.job.fcmr.tpfc.service.TrnsportFaciService;
import egiskorea.com.job.fcmr.tpfc.service.TunnlVO;

/**
 * @Description : 시설관리/교통시설
 * @author      : 김영주
 * @since       : 2023.04.05
 * @version     : 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                    수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.04.05   김영주           최초 생성
 *  2023.04.14   백승석           전체조회 및 상세조회 생성
 */

@Controller
@RequestMapping("/job/fcmr/tpfc")
public class TrnsportFaciController {
	
	//private static final Logger logger = LoggerFactory.getLogger(PhyEduFaciController.class);

	@Resource(name = "trnsportFaciService")
	private TrnsportFaciService trnsportFaciService;
	
	// -------- 도로구간 --------
	
	/**
     * 교통시설 > 도로구간 - 목록 조회
     * 
     * @param RoadSectVO
     * @param model
     * @return "egiskorea/com/job/fcmr/tpfc/rdst/roadSectListView"
     * @throws Exception
     */
	@RequestMapping(value = "/selectRoadSectListView.do")
	public String selectRoadSectList(
			@ModelAttribute("roadSectVO") RoadSectVO roadSectVO,
			ModelMap model) throws Exception {
		return "egiskorea/com/job/fcmr/tpfc/rdst/roadSectListView";
	}
	
	/**
     * 교통시설 > 도로구간 - 상세보기
     * 
     * @param RoadSectVO
     * @param model
     * @return "egiskorea/com/job/fcmr/tpfc/rdst/selectRoadSectInfo"
     * @throws Exception
     */
	@RequestMapping(value = "/selectRoadSectDtlInfo.do")
	public String selectRoadSectInfo(
			@ModelAttribute("roadSectVO") RoadSectVO roadSectVO,
			HttpServletRequest request, ModelMap model) throws Exception {
			
		RoadSectVO result = trnsportFaciService.selectRoadSect(roadSectVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/tpfc/rdst/selectRoadSectInfo";
	}
	
	// -------- 철도선로 --------  
	
	/**
	 * 교통 시설 > 철도선로 - 목록 조회
	 * @param rlRoadTcVO
	 * @param request
	 * @param model
	 * @return "egiskorea/com/job/fcmr/tpfc/rrtc/railroadTrackListView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRailroadTrackListView.do")
	public String selectRailroadTrackList(
			@ModelAttribute("rlroadTcVO") RlroadTcVO rlRoadTcVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		return "egiskorea/com/job/fcmr/tpfc/rrtc/railroadTrackListView";
	}
	
	/**
     * 교통시설 > 철도선로 - 상세보기
     * 
     * @param RlroadTcVO
     * @param model
     * @return "egiskorea/com/job/fcmr/tpfc/rrtc/selectRailroadTrackInfo"
     * @throws Exception
     */
	@RequestMapping(value = "/selectRailroadTrackInfo.do")
	public String selectRailroadTrackInfo(
			@ModelAttribute("rlroadTcVO") RlroadTcVO rlroadTcVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		RlroadTcVO result = trnsportFaciService.selectRlroadTc(rlroadTcVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/tpfc/rrtc/selectRailroadTrackInfo";
	}
	
	// -------- 철도역사 --------
	
	/**
	 * 교통 시설 > 철도역사 - 목록 조회
	 * @param rlRoadStVO
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRailroadStationListView.do")
	public String selectRailroadStationList(
			@ModelAttribute("rlroadStVO") RlroadStVO rlRoadStVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		return "egiskorea/com/job/fcmr/tpfc/rrst/railroadStationListView";
	}
	
	/**
     * 교통시설 > 철도역사 - 상세보기
     * 
     * @param RoadSectVO
     * @param model
     * @return "egiskorea/com/job/fcmr/tpfc/rrtc/selectRailroadStationInfo"
     * @throws Exception
     */
	@RequestMapping(value = "/selectRailroadStationInfo.do")
	public String selectRoadSectInfo(
			@ModelAttribute("rlroadStVO") RlroadStVO rlroadStVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		RlroadStVO result = trnsportFaciService.selectRlroadSt(rlroadStVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/tpfc/rrst/selectRailroadStationInfo";
	}
	
	// -------- 지하철선로 --------
	
	/**
	 * 교통 시설 > 지하철 선로 - 목록 조회
	 * @param SbwayTcVO
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSubwayTrackListView.do")
	public String selectSbwayTrackList(
			@ModelAttribute("sbwayTcVO") SbwayTcVO SbwayTckVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		return "egiskorea/com/job/fcmr/tpfc/sbtc/subwayTrackListView";
	}
	
	/**
     * 교통시설 > 지하철선로 - 상세보기
     * 
     * @param RoadSectVO
     * @param model
     * @return "egiskorea/com/job/fcmr/tpfc/sbtc/selectSubwayTrackInfo.do"
     * @throws Exception
     */
	@RequestMapping(value = "/selectSubwayTrackInfo.do")
	public String selectSubwayTrackInfo(
			@ModelAttribute("sbwayTcVO") SbwayTcVO sbwayTcVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		SbwayTcVO result = trnsportFaciService.selectSbwayTc(sbwayTcVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/tpfc/sbtc/selectSubwayTrackInfo";
	}
	
	
	// -------- 지하철역사 --------
	
	/**
	 * 교통 시설 > 지하철역사 - 목록 조회
	 * @param SbwayStVO
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSubwayStationListView.do")
	public String selectSbwayStationList(
			@ModelAttribute("sbwayStVO") SbwayStVO sbwayStVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		return "egiskorea/com/job/fcmr/tpfc/sbst/subwayStationListView";
	}
	
	/**
     * 교통시설 > 지하철역사 - 상세보기
     * 
     * @param SbwayStVO
     * @param model
     * @return "egiskorea/com/job/fcmr/tpfc/sbst/selectSubwayStationInfo"
     * @throws Exception
     */
	@RequestMapping(value = "/selectSubwayStationInfo.do")
	public String selectSubwayStationInfo(
			@ModelAttribute("sbwayStVO") SbwayStVO sbwayStVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		SbwayStVO result = trnsportFaciService.selectSbwaySt(sbwayStVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/tpfc/sbst/selectSubwayStationInfo";
	}
	
	// -------- 교량 --------
	
	/**
	 * 교통 시설 > 교량 - 목록 조회
	 * @param BrdgeVO
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBridgeListView.do")
	public String selectBridgeList(
			@ModelAttribute("BrdgeVO") BrdgeVO brdgeVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		return "egiskorea/com/job/fcmr/tpfc/brdg/bridgeListView";
	}
	
	/**
     * 교통시설 > 교량 - 상세보기
     * 
     * @param BrdgeVO
     * @param model
     * @return "egiskorea/com/job/fcmr/tpfc/brdg/selectBridgeInfo"
     * @throws Exception
     */
	@RequestMapping(value = "/selectBridgeInfo.do")
	public String selectBrdgeInfo(
			@ModelAttribute("brdgeVO") BrdgeVO brdgeVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		BrdgeVO result = trnsportFaciService.selectBrdge(brdgeVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/tpfc/brdg/selectBridgeInfo";
	}
	
	// -------- 고가도로 --------
	
	/**
	 * 교통 시설 > 고가도로 - 목록 조회
	 * @param OvrpassVO
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectOverpassListView.do")
	public String selectBridgeList(
			@ModelAttribute("ovrpassVO") OvrpassVO ovrpassVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		return "egiskorea/com/job/fcmr/tpfc/ovps/overpassListView";
	}
	
	/**
     * 교통시설 > 고가도로 - 상세보기
     * 
     * @param OvrpassVO
     * @param model
     * @return "egiskorea/com/job/fcmr/tpfc/ovps/selectOverpassInfo"
     * @throws Exception
     */
	@RequestMapping(value = "/selectOverpassInfo.do")
	public String selectOvrpassInfo(
			@ModelAttribute("ovrpassVO") OvrpassVO ovrpassVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		OvrpassVO result = trnsportFaciService.selectOvrpass(ovrpassVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/tpfc/ovps/selectOverpassInfo";
	}
	
	// -------- 터널 --------
	
	/**
	 * 교통 시설 > 터널 - 목록 조회
	 * @param TunnlVO
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectTunnelListView.do")
	public String selectBridgeList(
			@ModelAttribute("tunnlVO") TunnlVO tunnlVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		return "egiskorea/com/job/fcmr/tpfc/tunl/tunnelListView";
	}
	
	/**
     * 교통시설 > 터널 - 상세보기
     * 
     * @param TunnlVO
     * @param model
     * @return "egiskorea/com/job/fcmr/tpfc/tunl/selectTunnelInfo"
     * @throws Exception
     */
	@RequestMapping(value = "/selectTunnelInfo.do")
	public String selectTunnelInfo(
			@ModelAttribute("tunnlVO") TunnlVO tunnlVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		TunnlVO result = trnsportFaciService.selectTunnl(tunnlVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcmr/tpfc/tunl/selectTunnelInfo";
	}
}
