package egiskorea.com.cmt.stre.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cmt/stre")
public class SavemapController {
	  @RequestMapping(value = "/selectSavemap.do")
	  public String selectSaveMap() throws Exception{
		  return "egiskorea/com/cmt/stre/savemap";
	  }
}
