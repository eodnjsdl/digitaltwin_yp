package egiskorea.com.webApp.web;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Description webApp 메인화면
 * @author 글로벌컨설팅부문 장현승
 * @since 2023.06.12
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.06.12		장현승	최초 생성
 */

@Controller
@RequestMapping("/webApp")
public class WebAppMainController {
	
	// 메인화면 호출
	@RequestMapping("/main.do")
	public String main(HttpServletRequest request,Model model) throws Exception {
		
 		return "egiskorea/com/app/webAppMain";
	}

}