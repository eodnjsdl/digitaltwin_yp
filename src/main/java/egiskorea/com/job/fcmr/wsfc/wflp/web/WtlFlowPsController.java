package egiskorea.com.job.fcmr.wsfc.wflp.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import egiskorea.com.job.fcmr.base.service.FacilityVO;
import egiskorea.com.job.fcmr.wsfc.wflp.service.WtlFlowPsVO;

/**
 * @Description 시설관리/상수도시설/유량계
 * @author 장현승
 * @since 2023.03.31
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.03.31   장현승           최초 생성
 */

@Controller
@RequestMapping("/job/fcmr/wsfc/wflp")
public class WtlFlowPsController {
	
		private static final Logger logger = LoggerFactory.getLogger(WtlFlowPsController.class);
		
		//옵션 화면 조회
		@RequestMapping(value = "/getWtlFlowPsListSrchOpView.do")
	    public String selectWtlFlowPsList(
	            @ModelAttribute("wtlFlowPsVO") WtlFlowPsVO workSampleVO,
	            ModelMap model) throws Exception {
	        return "egiskorea/com/job/fcmr/wsfc/wflp/wtlFlowPsSearchOption";
	    }
		
		/**
		 * 
		 * @Description : 유량계 상세 화면 조회 
		 * @Author 장현승
		 * @Date 2023.03.31
		 * @return 시설물 뷰 경로
		 * @throws Exception
		 */

		@RequestMapping(value = "/getFlowDetailView.do")
		public String getFlowDetailView(
		        @ModelAttribute("facilityVO") FacilityVO facilityVO,
		        ModelMap model) throws Exception {
		    return "egiskorea/com/job/fcmr/wsfc/wflp/flowDetailView";
		}
		
}