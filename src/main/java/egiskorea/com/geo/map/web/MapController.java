package egiskorea.com.geo.map.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.geo.map.service.MapService;
import egiskorea.com.geo.map.service.MapVO;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;

/**
 * @author 플랫폼개발부문 DT솔루션 김선옥
 * @version 1.0
 * @Description 지도 Controller
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.08		김선옥	최초 생성
 *  </pre>
 * @since 2022.03.08
 */

@Controller
@RequestMapping("/geo/map")
public class MapController {

    @Resource(name = "MapService")
    private MapService mapService;

    /**
     * @param model
     * @param request
     * @return
     * @throws Exception
     * @Description 지도 설정 정보 조회
     * @Author 플랫폼개발부문 DT솔루션 김선옥
     * @Date 2022.03.10
     */
    @RequestMapping(value = "/selectMapSettingInfo.do")
    public String selectMapSettingInfo(ModelMap model, @ModelAttribute("mapVO") MapVO mapVO,
                                       HttpServletRequest request) throws Exception {

        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

        mapVO.setUserId(user.getUniqId());

        MapVO vo = mapService.selectUserSetup(mapVO);

        if (vo == null) {
            mapVO.setUserId("SYSTEM");
            vo = mapService.selectUserSetup(mapVO);
            model.addAttribute("result", vo);
        } else {
            model.addAttribute("result", vo);
        }

        return "egiskorea/com/geo/map/mapSettingInfo";
    }

    /**
     * @param model
     * @param request
     * @return
     * @throws Exception
     * @Description 지도 설정 정보 수정/추가
     * @Author SI사업부문 개발그룹 정수환
     * @Date 2022.03.24
     */
    @RequestMapping(value = "/updateMapSettingInfo.do", method = RequestMethod.POST)
    public String updateMapSetting(ModelMap model, @ModelAttribute("mapVO") MapVO mapVO,
                                   HttpServletRequest request) throws Exception {


        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

        mapVO.setUserId(user.getUniqId());

        MapVO vo = mapService.selectUserSetup(mapVO);

        if (vo == null) {
            mapService.insertUserSetup(mapVO);
        } else {
            mapService.updateUserSetup(mapVO);
        }

        model.addAttribute("result", mapVO);
        return "jsonView";
    }

    /**
     * @param model
     * @param request
     * @return
     * @throws Exception
     * @Description 초기 지도 설정
     * @Author SI사업부문 개발그룹 정수환
     * @Date 2022.03.24
     */
    @RequestMapping(value = "/MapSetting.do")
    public String MapSetting(ModelMap model, @ModelAttribute("mapVO") MapVO mapVO,
                             HttpServletRequest request) throws Exception {


        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

        mapVO.setUserId(user.getUniqId());

        MapVO vo = mapService.selectUserSetup(mapVO);

        if (vo == null) {
            mapVO.setUserId("SYSTEM");
            vo = mapService.selectUserSetup(mapVO);
        } else {
            vo = mapService.selectUserSetup(mapVO);
        }

        model.addAttribute("result", vo);

        return "jsonView";
    }
}
