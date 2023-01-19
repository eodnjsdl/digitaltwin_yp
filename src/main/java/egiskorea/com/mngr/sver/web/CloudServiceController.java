package egiskorea.com.mngr.sver.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/com/mngr/sver")
public class CloudServiceController {

	/**
	 * @Description 클라우드 서비스 목록
	 * @Author 플랫폼개발부문 DT솔루션 정수환
	 * @Date 2022.03.03
	 * @param 
	 * @return "egiskorea/com/adm/sver/selectCloudServiceList"
	 * @throws Exception
	 */
	@RequestMapping("/selectCloudServiceList.do")
	public String selectCloudServiceList() throws Exception {

		return "egiskorea/com/adm/sver/selectCloudServiceList";
	}
}
