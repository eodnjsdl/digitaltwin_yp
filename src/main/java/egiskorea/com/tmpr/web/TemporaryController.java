package egiskorea.com.tmpr.web;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import egiskorea.com.tmpr.service.TemporaryService;

/**
 * @Description 임시 controller 클래스
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
@RequestMapping("/tmpr")
public class TemporaryController {
	
	@Resource(name = "temporaryService")
	private TemporaryService temporaryService;

}
