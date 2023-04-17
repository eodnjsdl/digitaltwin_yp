package egiskorea.com.cmt.mst.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cmt/mst")
public class MapsettingController {
	 @RequestMapping(value = "/selectMapsetting.do")
	  public String selectMapsetting() throws Exception{
		  return "egiskorea/com/cmt/mst/mapsetting";
	  }
}
