package egiskorea.com.cmt.ldbd.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cmt/ldbd")
public class LandBuilderController {
	
	@RequestMapping(value = "/selectLandBuilderList.do")
	public String selectLandBuilderList(
			ModelMap model) throws Exception{ 
		
		return "egiskorea/com/cmt/ldbd/landBuilderList";
	}
}
