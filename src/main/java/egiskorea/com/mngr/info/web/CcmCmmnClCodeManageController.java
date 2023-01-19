package egiskorea.com.mngr.info.web;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egiskorea.com.cmm.service.CmmUtils;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.sym.ccm.cca.service.CmmnCode;
import egovframework.com.sym.ccm.cca.service.CmmnCodeVO;
import egovframework.com.sym.ccm.cca.service.EgovCcmCmmnCodeManageService;
import egovframework.com.sym.ccm.ccc.service.CmmnClCode;
import egovframework.com.sym.ccm.ccc.service.CmmnClCodeVO;
import egovframework.com.sym.ccm.ccc.service.EgovCcmCmmnClCodeManageService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 
 * @author 플랫폼개발부문 DT솔루션 정수환
 * @since 2022.01.13
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.13		정수환	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/mngr/info")
public class CcmCmmnClCodeManageController {
	@Resource(name = "CmmnClCodeManageService")
    private EgovCcmCmmnClCodeManageService cmmnClCodeManageService;
	
	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;
	
	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;
	
	@Autowired
	private DefaultBeanValidator beanValidator;

	/**
	 * 공통분류코드 목록을 조회한다.
	 * 
	 * @param loginVO
	 * @param searchVO
	 * @param model
	 * @return "egiskorea/com/adm/info/selectCcmCmmnClCodeManageList"
	 * @throws Exception
	 */
	@RequestMapping("/selectCcmCmmnClCodeManageList.do")
	public String selectCcmCmmnClCodeManageList(@ModelAttribute("searchVO") CmmnClCodeVO searchVO, ModelMap model) throws Exception {
		
		/** EgovPropertyService.sample */
		searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
		searchVO.setPageSize(propertiesService.getInt("pageSize"));

		/** pageing */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());

		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		List<?> CmmnCodeList = cmmnClCodeManageService.selectCmmnClCodeList(searchVO);
		model.addAttribute("resultList", CmmnCodeList);

		int totCnt = cmmnClCodeManageService.selectCmmnClCodeListTotCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);

		return "egiskorea/com/adm/info/selectCcmCmmnClCodeManageList";
	}
	
	/**
	 * 공통분류코드 상세항목을 조회한다.
	 * 
	 * @param loginVO
	 * @param cmmnClCode
	 * @param model
	 * @return "egiskorea/com/adm/info/selectCcmCmmnClCodeManage"
	 * @throws Exception
	 */
	@RequestMapping("/selectCcmCmmnClCodeManage.do")
	public String selectCcmCmmnClCodeManage(@ModelAttribute("loginVO") LoginVO loginVO, CmmnClCodeVO cmmnClCodeVO,
			ModelMap model) throws Exception {

		CmmnClCode vo = cmmnClCodeManageService.selectCmmnClCodeDetail(cmmnClCodeVO);

		model.addAttribute("result", vo);

		return "egiskorea/com/adm/info/selectCcmCmmnClCodeManage";
	}
	
	/**
	 * 공통분류코드 등록을 위한 등록페이지로 이동한다.
	 * 
	 * @param cmmnClCodeVO
	 * @param model
	 * @return "egiskorea/com/adm/info/insertCcmCmmnClCodeManageView"
	 * @throws Exception
	 */
	@RequestMapping("/insertCcmCmmnClCodeManageView.do")
	public String insertCcmCmmnClCodeManageView(@ModelAttribute("searchVO")CmmnClCodeVO cmmnClCodeVO, ModelMap model) throws Exception {
		
		// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			return "egiskorea/com/uat/uia/loginUsr";
		}
		
		model.addAttribute("cmmnClCodeVO", new CmmnClCodeVO());

		return "egiskorea/com/adm/info/insertCcmCmmnClCodeManageView";
	}
	
	/**
     * 공통분류코드를 등록한다.
     * 
     * @param CmmnClCodeVO
     * @param status
     * @param model
     * @return "/com/mngr/info/insertCcmCmmnClCodeManage.do"
     * @throws Exception
     */
    @RequestMapping("/insertCcmCmmnClCodeManage.do")
    public String insertCmmnClCode(@ModelAttribute("cmmnClCodeVO") CmmnClCodeVO cmmnClCodeVO,
	    BindingResult bindingResult, Model model) throws Exception {

    	// 로그인VO에서  사용자 정보 가져오기
     	LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

     	String message = "";
     	
		beanValidator.validate(cmmnClCodeVO, bindingResult);
	
		if (bindingResult.hasErrors()) {
			
			model.addAttribute("resultMsg", "fail.common.insert");
			
		    return "egiskorea/com/adm/info/insertCcmCmmnClCodeManageView";
		}
		
		if(cmmnClCodeVO.getClCode() != null){
			CmmnClCode vo = cmmnClCodeManageService.selectCmmnClCodeDetail(cmmnClCodeVO);
			if(vo != null){
				model.addAttribute("message", egovMessageSource.getMessage("comSymCcmCcc.validate.codeCheck"));
				return "egiskorea/com/adm/info/insertCcmCmmnClCodeManageView";
			}
		}
	
		cmmnClCodeVO.setFrstRegisterId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		cmmnClCodeManageService.insertCmmnClCode(cmmnClCodeVO);
		
		message = egovMessageSource.getMessage("success.common.insert");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnClCodeManageList.do", cmmnClCodeVO, null);
	
    }
	
	   /**
     * 공통분류코드를 삭제한다.
     * 
     * @param cmmnClCodeVO
     * @param status
     * @param model
     * @return return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnClCodeManageList.do", cmmnClCodeVO, null);
     * @throws Exception
     */
    @RequestMapping("/deleteCcmCmmnClCodeManage.do")
    public String deleteCmmnClCode(@ModelAttribute("searchVO") CmmnClCodeVO cmmnClCode, @ModelAttribute("cmmnClCodeVO") CmmnClCodeVO cmmnClCodeVO,
	    BindingResult bindingResult, Model model) throws Exception {
    	
    	String message = "";
    	
    	// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			return "egiskorea/com/uat/uia/loginUsr";
		}
    	
    	LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
    		
    		cmmnClCodeVO.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
    		cmmnClCodeManageService.deleteCmmnClCode(cmmnClCodeVO);

    		message = egovMessageSource.getMessage("success.common.delete");
    		return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnClCodeManageList.do", cmmnClCodeVO, null);
        } 
    
    /**
     * 공통분류코드 수정을 위한 수정페이지로 이동한다.
     * 
     * @param cmmnClCodeVO
     * @param model
     * @return "egiskorea/com/adm/info/updateCcmCmmnClCodeManageView";  
     * @throws Exception
     */
    @RequestMapping("/updateCcmCmmnClCodeManageView.do")
    public String updateCmmnClCodeView(@ModelAttribute("searchVO") CmmnClCodeVO cmmnClCodeVO, ModelMap model)
	    throws Exception {
		
    	// 인증여부 체크
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (!isAuthenticated) {
			return "egiskorea/com/uat/uia/loginUsr";
		}
    	
    	CmmnClCode result = cmmnClCodeManageService.selectCmmnClCodeDetail(cmmnClCodeVO);
		
 		model.addAttribute("cmmnClCodeVO", result);
	
		return "egiskorea/com/adm/info/updateCcmCmmnClCodeManageView";  
    }
    
    /**
     * 공통분류코드를 수정한다.
     * 
     * @param cmmnClCodeVO
     * @param status
     * @param model
     * @return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnClCodeManage.do", cmmnClCodeVO, null);
     * @throws Exception
     */
    @RequestMapping("/updateCcmCmmnClCodeManage.do")
    public String updateCmmnClCode(@ModelAttribute("searchVO") CmmnClCodeVO cmmnClCode, @ModelAttribute("cmmnClCodeVO") CmmnClCodeVO cmmnClCodeVO,
	    BindingResult bindingResult, Model model) throws Exception {

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
	
		String message = "";
		beanValidator.validate(cmmnClCodeVO, bindingResult);
		if (bindingResult.hasErrors()) {
	
			CmmnClCode result = cmmnClCodeManageService.selectCmmnClCodeDetail(cmmnClCode);
		    model.addAttribute("cmmnClCodeVO", result);
		    model.addAttribute("resultMsg", "fail.common.update");
		    
		    return "egiskorea/com/adm/info/updateCcmCmmnClCodeManageView";
		}
	
		cmmnClCodeVO.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		cmmnClCodeManageService.updateCmmnClCode(cmmnClCodeVO);
		
		message = egovMessageSource.getMessage("success.common.update");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnClCodeManage.do", cmmnClCodeVO, null);
		
    }
}
