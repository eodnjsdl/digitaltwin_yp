package egiskorea.com.cmt.bm.web;

import egiskorea.com.cmt.bm.service.BackgroundMapInfoService;
import egiskorea.com.mngr.sver.service.MapServiceVO;
import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;

/**
 * @Description 배경지도 controller 클래스
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.03.03
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.02		이준호	최초 생성
 *
 */

@Controller
@RequestMapping("/cmt/bm/*")
public class BackgroundMapInfoController {

    @Resource(name = "EgovCmmUseService")
    private EgovCmmUseService cmmUseService;

    @Resource(name = "backgroundMapInfoService")
    private BackgroundMapInfoService backgroundMapInfoService;

    @RequestMapping(value = "selectBackgroundMapInfoList.do", method = RequestMethod.POST)
    public String selectBackgroundMapInfoList(@ModelAttribute("mapServiceVO") MapServiceVO mapServiceVO, Model model) throws Exception {

        ComDefaultCodeVO comDefaultCodeVO = new ComDefaultCodeVO(); //공통코드를 가져오기 위한 Vo
        comDefaultCodeVO.setCodeId("MSC01"); //지도서비스 배경지도 분류 코드
        model.addAttribute("bmCodeList", cmmUseService.selectCmmCodeDetail(comDefaultCodeVO));
        model.addAttribute("bgMapInfoSvc", backgroundMapInfoService); //배경지도 서비스 화면에 전달.

        return "egiskorea/com/cmt/bm/backgroundMapInfo";
    }

    @RequestMapping(value = "selectBackgroundMapBasicAtInfo.do", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView selectBackgroundMapBasicAtInfo(Model model) throws Exception {
        ModelAndView mav = new ModelAndView("jsonView");

        MapServiceVO mapServiceVO = backgroundMapInfoService.selectBackgroundMapBasicAtInfo();
        if (mapServiceVO != null) {
            model.addAttribute("callback", "success");
            model.addAttribute("mapServiceVO", mapServiceVO);
        } else {
            model.addAttribute("callback", "fail");
        }

        return mav;
    }

}
