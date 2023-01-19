package egiskorea.com.geo.bsi.web;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import egiskorea.com.geo.bsi.service.BusinessInfoService;
import egiskorea.com.geo.bsi.service.BusinessInfoVO;

/**
 * @Description 업소정보를 관리하는 사용자 controller 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.11.09
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.11.09   이상화           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/geo/bsi")
public class BusinessInfoController {
	
	@Resource(name = "businessInfoService")
	private BusinessInfoService businessInfoService;
	
	/**
	 * 업소정보 조회
	 * 
	 * @param surveyInfoVO
	 * @param model8
	 * @return "egiskorea/com/geo/bsi/selectBussinessInfo"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBussinessInfo.do")
	public String selectBussinessInfo(
			@ModelAttribute("businessInfoVO") BusinessInfoVO businessInfoVO,
			ModelMap model) throws Exception{ 
		
		List<?> resultList = businessInfoService.selectBusinessInfo(businessInfoVO);	
		
		model.addAttribute("resultList", resultList);		
		
		return "egiskorea/com/geo/bsi/businessInfo";
	}
}
