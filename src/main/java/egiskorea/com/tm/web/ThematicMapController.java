package egiskorea.com.tm.web;

import egiskorea.com.mngr.info.service.ThemaMapVO;
import egiskorea.com.mngr.info.service.ThematicMapManageService;
import egiskorea.com.tm.service.ThematicMapService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @Description 주제도 Controller 클래스
 * @packageName : egiskorea.com.tm.web
 * @Class : ThematicMapController
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.03.10
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.10		이준호	최초 생성
 */

@Controller
@RequestMapping(value = "/com/tm/*")
public class ThematicMapController {

    @Resource(name = "thematicMapService")
    private ThematicMapService thematicMapService;

    @RequestMapping(value = "/selectTMapList.do", method = RequestMethod.POST)
    public String selectTMapList(@ModelAttribute("themaMapVO") ThemaMapVO themaMapVO, Model model) throws Exception {

        //주제도 자동완성을 위한 데이터 조회
        List<ThemaMapVO> dataList = thematicMapService.selectTMapAllList();
        model.addAttribute("dataList", dataList);

        //주제도 리스트
        List<ThemaMapVO> themaMapList = thematicMapService.selectTMapList(themaMapVO);
        model.addAttribute("themaMapList", themaMapList);

        return "egiskorea/com/tm/thematicMap";
    }

}
