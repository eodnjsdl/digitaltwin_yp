package egiskorea.com.mngr.info.web;

import egiskorea.com.cmm.service.CmmUtils;
import egiskorea.com.mngr.info.service.ThemaMapVO;
import egiskorea.com.mngr.info.service.ThematicMapManageService;
import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springmodules.validation.commons.DefaultBeanValidator;
import javax.annotation.Resource;
import java.beans.PropertyEditorSupport;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * @Description 주제도 관리 Controller 클래스
 * @packageName egiskorea.com.mngr.info
 * @Class ThematicMapManageController
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.02.07
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.07		이준호	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping(value = "/com/mngr/info/*")
public class ThematicMapManageController {

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    @Resource(name = "egovMessageSource")
    EgovMessageSource egovMessageSource;

    @Resource(name = "thematicMapManageService")
    private ThematicMapManageService thematicMapManageService;

    @Resource(name = "beanValidator")
    private DefaultBeanValidator beanValidator;

    @Resource(name = "EgovCmmUseService")
    private EgovCmmUseService cmmUseService;

    /* 날짜 포메터 */
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"); //ex) 2022-02-10 패턴

    /**
     * @Description 주제도관리 목록
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.08
     * @param themaMapVO
     * @param model
     * @return "egiskorea/com/adm/info/selectTMapManageList"
     * @throws Exception
     */
    @RequestMapping(value = "/selectTMapManageList.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String selectTMapManageList(@ModelAttribute("searchVO") ThemaMapVO themaMapVO, Model model) throws Exception {

        /** EgovPropertyService.sample(외부 프로퍼티 값 적용) */
        themaMapVO.setPageUnit(propertiesService.getInt("pageUnit"));
        themaMapVO.setPageSize(propertiesService.getInt("pageSize"));

        /** pageing */
        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(themaMapVO.getPageIndex());
        paginationInfo.setRecordCountPerPage(themaMapVO.getPageUnit());
        paginationInfo.setPageSize(themaMapVO.getPageSize());

        themaMapVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        themaMapVO.setLastIndex(paginationInfo.getLastRecordIndex());
        themaMapVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

        List<ThemaMapVO> themaMapList = thematicMapManageService.selectTMapManageList(themaMapVO); //주제도 목록 조회
        model.addAttribute("themaMapList", themaMapList);

        int themaMapCount = thematicMapManageService.selectTMapManageListCnt(themaMapVO); //주제도 전체 목록 갯수
        paginationInfo.setTotalRecordCount(themaMapCount);
        model.addAttribute("paginationInfo", paginationInfo);

        return "egiskorea/com/adm/info/selectTMapManageList";
    }

    /**
     * @Description 주제도관리 등록 화면
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.08
     * @param themaMapVO
     * @param model
     * @return "egiskorea/com/adm/info/insertTMapManageView"
     * @throws Exception
     */
    @RequestMapping(value = "/insertTMapManageView.do", method = RequestMethod.POST)
    public String insertTMapManageView(@ModelAttribute("themaMapVO") ThemaMapVO themaMapVO, Model model) throws Exception {

        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser(); //로그인 조회
        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); //로그인 여부

        LocalDateTime localDateTime = LocalDateTime.now(); //오늘 날짜
        themaMapVO.setFrstRegistDt(localDateTime); //생성일 넣기
        themaMapVO.setLastModfDt(localDateTime); //수정일 넣기

        thematicMapClCodesInit(model); //주제도 분류 select tag생성을 위한 초기화

       if (isAuthenticated) { //로그인 인증 성공시
            themaMapVO.setRegisterId(user == null ? "" : EgovStringUtil.isNullToString(user.getName())); //생성자 넣기
            themaMapVO.setLastUpdusrId(user == null ? "" : EgovStringUtil.isNullToString(user.getName())); //수정자 넣기
       }

       return "egiskorea/com/adm/info/insertTMapManageView";
    }

    /**
     * @Description form에서 Controller로 값 넘어올때 객체 바인딩 시 LocalDateTime 타입 변수를 String -> LocalDateTime 자동으로 변환해준다.
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.08
     * @param binder
     */
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(LocalDateTime.class, new PropertyEditorSupport() {
            @Override
            public void setAsText(String text) throws IllegalArgumentException {
                LocalDateTime localDateTime = LocalDateTime.parse(text, FORMATTER);
                setValue(localDateTime);
            }
        });
    }

    /**
     * @Description 주제도 분류 불러오기(private)
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.10
     * @param model
     */
    private void thematicMapClCodesInit(Model model) throws Exception {
        ComDefaultCodeVO comDefaultCodeVO = new ComDefaultCodeVO(); //공통코드를 가져오기 위한 Vo
        comDefaultCodeVO.setCodeId("TMC"); //주제도 분류 코드

        model.addAttribute("thematicMapClCodes", cmmUseService.selectCmmCodeDetail(comDefaultCodeVO));
    }

    /**
     * @Description 주제도관리 등록 process(프로세스)
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.08
     * @param themaMapVO
     * @param bindingResult
     * @return "redirect:/com/mngr/info/selectTMapManageList.do"
     * @throws Exception
     */
    @RequestMapping(value = "/insertTMapManage.do", method = RequestMethod.POST)
    public String insertTMapManage(@ModelAttribute("themaMapVO") ThemaMapVO themaMapVO, BindingResult bindingResult, Model model) throws Exception {

        String message = "";

        beanValidator.validate(themaMapVO, bindingResult); //유효성 검사
        if (bindingResult.hasErrors()) {
            thematicMapClCodesInit(model); //주제도 분류 select tag생성을 위한 초기화
            return "egiskorea/com/adm/info/insertTMapManageView";
        }

        int affectedRow = thematicMapManageService.insertTMapManage(themaMapVO); //주제도 등록
        if (affectedRow > 0) {
            message = egovMessageSource.getMessage("success.common.insert");
        } else {
            message = egovMessageSource.getMessage("fail.common.insert");
        }

        return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectTMapManageList.do", themaMapVO, null);
    }

    /**
     * @Description 주제도관리 상세보기 화면
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @param model
     * @return "egiskorea/com/adm/info/selectTMapManage"
     * @throws Exception
     */
    @RequestMapping(value = "/selectTMapManage.do", method = RequestMethod.POST)
    public String selectTMapManage(@ModelAttribute("searchVO") ThemaMapVO themaMapVO, Model model) throws Exception {

        //고유값ID가 없을 경우
        if (StringUtils.isBlank(themaMapVO.getThemamapId())) {
            return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrInfo.TMapManage.empty.themamapIds"));
        }

        model.addAttribute("themaMapVO", thematicMapManageService.selectTMapManage(themaMapVO)); //주제도 조회
        return "egiskorea/com/adm/info/selectTMapManage";
    }

    /**
     * @Description 주제도관리 수정 화면
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @param model
     * @return "egiskorea/com/adm/info/updateTMapManageView"
     * @throws Exception
     */
    @RequestMapping(value = "/updateTMapManageView.do", method = RequestMethod.POST)
    public String updateTMapManageView(@ModelAttribute("themaMapVO") ThemaMapVO themaMapVO, Model model) throws Exception {

        //고유값ID가 없을 경우
        if (StringUtils.isBlank(themaMapVO.getThemamapId())) {
            return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrInfo.TMapManage.empty.themamapIds"));
        }

        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser(); //로그인 조회
        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); //로그인 여부

        ThemaMapVO newThemaMapVO = thematicMapManageService.selectTMapManage(themaMapVO); //주제도 조회

        LocalDateTime localDateTime = LocalDateTime.now(); //오늘 날짜
        newThemaMapVO.setLastModfDt(localDateTime); //수정일 넣기

        //검색 hidden값 새로운 vo에 넣어주기
        newThemaMapVO.setPageIndex(themaMapVO.getPageIndex());
        newThemaMapVO.setSearchCondition(themaMapVO.getSearchCondition());
        newThemaMapVO.setSearchKeyword(themaMapVO.getSearchKeyword());

        thematicMapClCodesInit(model); //주제도 분류 select tag생성을 위한 초기화

        if (isAuthenticated) { //로그인 인증 성공시
            newThemaMapVO.setLastUpdusrId(user == null ? "" : EgovStringUtil.isNullToString(user.getName())); //수정자 넣기
        }

        model.addAttribute("themaMapVO", newThemaMapVO);
        return "egiskorea/com/adm/info/updateTMapManageView";
    }

    /**
     * @Description 주제도관리 수정 process(프로세스)
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @param bindingResult
     * @param model
     * @return "redirect:/com/mngr/info/selectTMapManage.do"
     * @throws Exception
     */
    @RequestMapping(value = "/updateTMapManage.do", method = RequestMethod.POST)
    public String updateTMapManage(@ModelAttribute("themaMapVO") ThemaMapVO themaMapVO, BindingResult bindingResult, Model model) throws Exception {

        //고유값ID가 없을 경우
        if (StringUtils.isBlank(themaMapVO.getThemamapId())) {
            return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrInfo.TMapManage.empty.themamapIds"));
        }

        String message = "";

        beanValidator.validate(themaMapVO, bindingResult); //유효성 검사
        if (bindingResult.hasErrors()) {
            thematicMapClCodesInit(model); //주제도 분류 select tag생성을 위한 초기화
            return "egiskorea/com/adm/info/updateTMapManageView";
        }

        int affectedRow = thematicMapManageService.updateTMapManage(themaMapVO); //주제도 수정
        if (affectedRow > 0) {
            message = egovMessageSource.getMessage("success.common.update");
        } else {
            message = egovMessageSource.getMessage("fail.common.update");
        }

        return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectTMapManage.do", themaMapVO, null);
    }

    /**
     * @Description 주제도관리 삭제 process(프로세스)
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @param model
     * @return "redirect:/com/mngr/info/selectTMapManageList.do"
     * @throws Exception
     */
    @RequestMapping(value = "/deleteTMapManage.do", method = RequestMethod.POST)
    public String deleteTMapManage(@ModelAttribute("themaMapVO") ThemaMapVO themaMapVO, Model model) throws Exception {

        //고유값ID가 없을 경우
        if (StringUtils.isBlank(themaMapVO.getThemamapId())) {
            return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrInfo.TMapManage.empty.themamapIds"));
        }

        String message = "";

        int affectedRow = thematicMapManageService.deleteTMapManage(themaMapVO); //주제도 삭제
        if (affectedRow > 0) {
            message = egovMessageSource.getMessage("success.common.delete");
        } else {
            message = egovMessageSource.getMessage("fail.common.delete");
        }

        return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectTMapManageList.do", themaMapVO, null);
    }

    /**
     * @Description 주제도관리 선택(체크) 삭제 process(프로세스)
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.14
     * @param themamapIds
     * @param model
     * @return mav(jsonView)
     * @throws Exception
     */
    @RequestMapping(value = "/deleteTMapManageList.do", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView deleteTMapManageList(@RequestParam(value = "themamapIds[]", required = false, defaultValue = "") List<String> themamapIds, Model model) throws Exception {

        ModelAndView mav = new ModelAndView("jsonView");

        if (themamapIds.size() < 1) {
            model.addAttribute("callback", "warning");
            model.addAttribute("message", egovMessageSource.getMessage("comMngrInfo.TMapManage.empty.themamapIds"));
            return mav;
        }

        int affectedRow = 0;
        for (String themamapId : themamapIds) {
            ThemaMapVO themaMapVO = new ThemaMapVO();
            themaMapVO.setThemamapId(themamapId);
            affectedRow += thematicMapManageService.deleteTMapManage(themaMapVO); //주제도 삭제
        }

        if (themamapIds.size() == affectedRow) {
            model.addAttribute("callback", "success");
            model.addAttribute("message", themamapIds.size() + "개의 목록이 " + egovMessageSource.getMessage("success.common.delete"));
        } else {
            model.addAttribute("callback", "fail");
            model.addAttribute("message", themamapIds.size() + "개의 목록이 " + egovMessageSource.getMessage("fail.common.delete"));
        }

        return mav;
    }
}
