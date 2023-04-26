package egiskorea.com.cmt.mltv.web;

import com.google.gson.Gson;
import egiskorea.com.cmt.mltv.service.MltvService;
import egiskorea.com.cmt.mltv.service.MltvVO;
import egiskorea.com.cmt.mmi.service.MemoInfoService;
import egiskorea.com.cmt.mmi.service.MemoInfoVO;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author
 * @version 1.0
 * @Description 화면분할을 관리하는 controller 클래스
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *
 *  </pre>
 * @since
 */

@Controller
@RequestMapping("/cmt/mltv")
public class MltvController {

    private static final Logger logger = LoggerFactory.getLogger(MltvController.class);

    @Resource(name = "mltvService")
    private MltvService mltvService;

    /**
     * cmmUseService
     */
    @Resource(name = "EgovCmmUseService")
    private EgovCmmUseService cmmUseService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;

    /**
     * 화면분할 목록
     *
     * @param
     * @param model
     * @return "egiskorea/com/cmt/mltv/selectMltvList"
     * @throws Exception
     */
    @RequestMapping(value = "/selectMltvList.do")
    public String selectMltvList(
            @ModelAttribute("searchVO") MltvVO mltvVO,
            ModelMap model, HttpServletRequest request) throws Exception {
        LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
        if (loginVO != null) {
            mltvVO.setEmplyrId(loginVO.getId());
        } else {
            logger.info("아이디가 존재하지 않습니다");
            mltvVO.setEmplyrId("webmaster");
        }
        return "egiskorea/com/cmt/mltv/mltvList";
    }
}
