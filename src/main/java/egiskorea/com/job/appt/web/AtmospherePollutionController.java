package egiskorea.com.job.appt.web;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.rte.fdl.property.EgovPropertyService;

/**
 * @Description 대기오염을 관리하는 사용자 controller 클래스
 * @author 플랫폼개발부문 DT플랫폼 이병준
 * @since 2022.01.07
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.07   이병준           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/job/appt")
public class AtmospherePollutionController {
	
//	@Resource(name = "transportationFacilityService")
//	private TransportationFacilityService transportationFacilityService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	/**
	 * 대기오염 기본조회
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/appt/atmospherePollutionList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectAtmospherePollutionList.do")
	public String selectAtmospherePollutionList() throws Exception{
		
		return "egiskorea/com/job/appt/atmospherePollutionList";
	}
	
	/**
	 * 대기오염 상세조회
	 * 
	 * @param 
	 * @param 
	 * @return "egiskorea/com/job/appt/atmospherePollution"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectAtmospherePollution.do")
	public String selectAtmospherePollution() throws Exception{
		
		return "egiskorea/com/job/appt/atmospherePollution";
	}
	
	
}
