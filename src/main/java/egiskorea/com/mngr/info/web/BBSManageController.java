package egiskorea.com.mngr.info.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egiskorea.com.cmm.service.CmmUtils;
import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.EgovComponentChecker;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.cop.bbs.service.BoardMaster;
import egovframework.com.cop.bbs.service.BoardMasterVO;
import egovframework.com.cop.bbs.service.EgovBBSMasterService;
import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 공통코드 관리 controller 클래스
 * @author 플랫폼개발부문 DT솔루션 정수환
 * @since 2022.01.24
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.24		정수환	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/mngr/info")
public class BBSManageController {
	
	@Resource(name = "EgovBBSMasterService")
    private EgovBBSMasterService egovBBSManageService;

    @Resource(name = "EgovCmmUseService")
    private EgovCmmUseService cmmUseService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
    
    @Resource(name = "egovBBSMstrIdGnrService")
    private EgovIdGnrService idgenServiceBbs;
    
    /** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;
    
    @Autowired
    private DefaultBeanValidator beanValidator;

    /**
     * 신규 게시판 마스터 등록을 위한 등록페이지로 이동한다.
     * 
     * @param boardMasterVO
     * @param model
     * @return egiskorea/com/adm/info/insertBBSManageView
     * @throws Exception
     */
    @RequestMapping("/insertBBSManageView.do")
    public String insertBBSManageView(@ModelAttribute("searchVO") BoardMasterVO boardMasterVO, ModelMap model) throws Exception {
		
    	BoardMasterVO boardMaster = new BoardMasterVO();
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		
		vo.setCodeId("COM101");
		
		List<?> codeResult = cmmUseService.selectCmmCodeDetail(vo);
		
		model.addAttribute("bbsTyCode", codeResult);
		model.addAttribute("boardMasterVO", boardMaster);
	
		if(EgovComponentChecker.hasComponent("EgovArticleCommentService")){
			model.addAttribute("useComment", "true");
		}
		if(EgovComponentChecker.hasComponent("EgovBBSSatisfactionService")){
			model.addAttribute("useSatisfaction", "true");
		}
		
		return "egiskorea/com/adm/info/insertBBSManageView";
    }

    /**
     * 신규 게시판 마스터 정보를 등록한다.
     * 
     * @param boardMasterVO
     * @param boardMaster
     * @param bindingResult
     * @param model
     * @return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectBBSManageList.do", boardMasterVO, null);
     * @throws Exception
     */
    @RequestMapping("/insertBBSManage.do")
    public String insertBBSManage(@ModelAttribute("searchVO") BoardMasterVO boardMasterVO, @ModelAttribute("boardMaster") BoardMaster boardMaster,
	    BindingResult bindingResult, Model model) throws Exception {
    	
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		String message = "";
		
		beanValidator.validate(boardMaster, bindingResult);
		if (bindingResult.hasErrors()) {
		    ComDefaultCodeVO vo = new ComDefaultCodeVO();
		    
		    //게시판유형코드
		    vo.setCodeId("COM101");
		    List<?> codeResult = cmmUseService.selectCmmCodeDetail(vo);
		    
		    model.addAttribute("bbsTyCode", codeResult);
		    model.addAttribute("resultMsg", "fail.common.insert");
		    
		    return "egiskorea/com/adm/info/insertBBSManageView";
		}
		
		if (isAuthenticated) {
		    boardMaster.setFrstRegisterId(user == null ? "" : EgovStringUtil.isNullToString(user.getUniqId()));
		    
		    egovBBSManageService.insertBBSMasterInf(boardMaster);
		    
		    message = egovMessageSource.getMessage("success.common.insert");
		} else {
			message = egovMessageSource.getMessage("fail.common.insert");
		}
		
		return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectBBSManageList.do", boardMasterVO, null);
		
    }

    /**
     * 게시판 마스터 목록을 조회한다.
     * 
     * @param boardMasterVO
     * @param model
     * @return egiskorea/com/adm/info/selectBBSManageList
     * @throws Exception
     */
    @RequestMapping("/selectBBSManageList.do")
    public String selectBBSManageList(@ModelAttribute("searchVO") BoardMasterVO boardMasterVO, ModelMap model) throws Exception {
		
    	boardMasterVO.setPageUnit(propertyService.getInt("pageUnit"));
		boardMasterVO.setPageSize(propertyService.getInt("pageSize"));
	
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(boardMasterVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(boardMasterVO.getPageUnit());
		paginationInfo.setPageSize(boardMasterVO.getPageSize());
	
		boardMasterVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		boardMasterVO.setLastIndex(paginationInfo.getLastRecordIndex());
		boardMasterVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
	
		Map<String, Object> map = egovBBSManageService.selectBBSMasterInfs(boardMasterVO);
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		
		paginationInfo.setTotalRecordCount(totCnt);
	
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));	
		model.addAttribute("paginationInfo", paginationInfo);

		return "egiskorea/com/adm/info/selectBBSManageList";
    }

    /**
     * 게시판 마스터 상세내용을 조회한다.
     * 
     * @param boardMasterVO
     * @param model
     * @return egiskorea/com/adm/info/selectBBSManage
     * @throws Exception
     */
    @RequestMapping("/selectBBSManage.do")
    public String selectBBSManage(@ModelAttribute("searchVO") BoardMasterVO searchVO, ModelMap model) throws Exception {
		
    	BoardMasterVO vo = egovBBSManageService.selectBBSMasterInf(searchVO);
    	
		model.addAttribute("result", vo);
	
		if(EgovComponentChecker.hasComponent("EgovArticleCommentService")){
			model.addAttribute("useComment", "true");
		}
		if(EgovComponentChecker.hasComponent("EgovBBSSatisfactionService")){
			model.addAttribute("useSatisfaction", "true");
		}
		
		return "egiskorea/com/adm/info/selectBBSManage";
    }
    
    /**
     * 게시판 마스터정보를 수정하기 위한 전 처리
     * @param bbsId
     * @param searchVO
     * @param model
     * @return egiskorea/com/adm/info/updateBBSManageView
     * @throws Exception
     */
    @RequestMapping("/updateBBSManageView.do")
    public String updateBBSManageView(@RequestParam("bbsId") String bbsId ,
            @ModelAttribute("searchVO") BoardMasterVO searchVO, ModelMap model)
            throws Exception {

        BoardMasterVO boardMasterVO = new BoardMasterVO();

        //게시판유형코드
        ComDefaultCodeVO vo = new ComDefaultCodeVO();
        vo.setCodeId("COM101");
        List<?> codeResult = cmmUseService.selectCmmCodeDetail(vo);
        model.addAttribute("bbsTyCode", codeResult);
        
        // Primary Key 값 세팅
        boardMasterVO.setBbsId(bbsId);

        model.addAttribute("boardMasterVO", egovBBSManageService.selectBBSMasterInf(boardMasterVO));

		if(EgovComponentChecker.hasComponent("EgovArticleCommentService")){
			model.addAttribute("useComment", "true");
		}
		if(EgovComponentChecker.hasComponent("EgovBBSSatisfactionService")){
			model.addAttribute("useSatisfaction", "true");
		}
        
        return "egiskorea/com/adm/info/updateBBSManageView";
    }
    

    /**
     * 게시판 마스터 정보를 수정한다.
     * 
     * @param boardMasterVO
     * @param boardMaster
     * @param bindingResult
     * @param model
     * @return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectBBSManage.do", boardMasterVO, null);
     * @throws Exception
     */
    @RequestMapping("/updateBBSManage.do")
    public String updateBBSManage(@ModelAttribute("searchVO") BoardMasterVO boardMasterVO, @ModelAttribute("boardMaster") BoardMaster boardMaster,
	    BindingResult bindingResult, Model model) throws Exception {

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		String message = "";
		
		beanValidator.validate(boardMaster, bindingResult);
		if (bindingResult.hasErrors()) {
		    BoardMasterVO vo = egovBBSManageService.selectBBSMasterInf(boardMasterVO);
	
		    model.addAttribute("result", vo);
	
		    ComDefaultCodeVO comVo = new ComDefaultCodeVO();
	        comVo.setCodeId("COM101");
	        List<?> codeResult = cmmUseService.selectCmmCodeDetail(comVo);
	        
	        model.addAttribute("bbsTyCode", codeResult);
	        model.addAttribute("resultMsg", "fail.common.update");
	        
		    return "egiskorea/com/adm/info/updateBBSManageView";
		}
	
		if (isAuthenticated) {
		    boardMaster.setLastUpdusrId(user == null ? "" : EgovStringUtil.isNullToString(user.getUniqId()));
		    egovBBSManageService.updateBBSMasterInf(boardMaster);
		    
		    message = egovMessageSource.getMessage("success.common.update");
		} else {
			message = egovMessageSource.getMessage("fail.common.update");
		}
		
		return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectBBSManage.do", boardMasterVO, null);
    }

    /**
     * 게시판 마스터 정보를 삭제한다.
     * 
     * @param boardMasterVO
     * @param boardMaster
     * @param model
     * @return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectBBSManageList.do", boardMasterVO, null);
     * @throws Exception
     */
    @RequestMapping("/deleteBBSManage.do")
    public String deleteBBSManage(@ModelAttribute("searchVO") BoardMasterVO boardMasterVO, 
    		@ModelAttribute("boardMaster") BoardMaster boardMaster, Model model) throws Exception {

	LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	String message = "";
	if (isAuthenticated) {
	    boardMaster.setLastUpdusrId(user == null ? "" : EgovStringUtil.isNullToString(user.getUniqId()));
	    egovBBSManageService.deleteBBSMasterInf(boardMaster);
	    
	    message = egovMessageSource.getMessage("success.common.delete");
	} else {
		message = egovMessageSource.getMessage("fail.common.delete");
	}
	
	return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectBBSManageList.do", boardMasterVO, null);
    }  
}
