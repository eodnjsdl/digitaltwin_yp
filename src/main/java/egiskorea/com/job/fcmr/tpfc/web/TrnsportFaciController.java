package egiskorea.com.job.fcmr.tpfc.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import egiskorea.com.job.fcmr.tpfc.service.RoadSectVO;
import egiskorea.com.job.fcmr.tpfc.service.TrnsportFaciService;

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
 */

@Controller
@RequestMapping("/job/fcmr/tpfc")
public class TrnsportFaciController {
	
	//private static final Logger logger = LoggerFactory.getLogger(PhyEduFaciController.class);

	@Resource(name = "trnsportFaciService")
	private TrnsportFaciService trnsportFaciService;
	
	/* 도로구간 */
	
	/**
     * 교통시설 > 도로구간 목록 조회
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
     * 교통시설 > 도로구간 상세보기
     * 
     * @param RoadSectVO
     * @param model
     * @return "egiskorea/com/job/fcmr/tpfc/rdst/roadSectDetail"
     * @throws Exception
     */
	@RequestMapping(value = "/selectRoadSectDetail.do")
	public String selectRoadSectDetail(
			@ModelAttribute("roadSectVO") RoadSectVO roadSectVO,
			HttpServletRequest request, ModelMap model) throws Exception {
		
		return "egiskorea/com/job/fcmr/tpfc/rdst/roadSectDetail";
	}
}
