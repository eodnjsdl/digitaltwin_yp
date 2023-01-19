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
import org.springframework.web.bind.annotation.RequestParam;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egiskorea.com.cmm.service.CmmUtils;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.sym.ccm.cca.service.CmmnCode;
import egovframework.com.sym.ccm.cca.service.CmmnCodeVO;
import egovframework.com.sym.ccm.cca.service.EgovCcmCmmnCodeManageService;
import egovframework.com.sym.ccm.ccc.service.CmmnClCodeVO;
import egovframework.com.sym.ccm.ccc.service.EgovCcmCmmnClCodeManageService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 공통코드 관리 controller 클래스
 * @author 플랫폼개발부문 DT솔루션 정수환
 * @since 2022.01.11
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.11		정수환	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/mngr/info")
public class CcmCmmnCodeManageController {
	
	@Resource(name = "CmmnCodeManageService")
    private EgovCcmCmmnCodeManageService cmmnCodeManageService;

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
	 * @param searchVO
	 * @param model
	 * @return "egiskorea/com/adm/info/selectCcmCmmnCodeManageList"
	 * @throws Exception
	 */
	@RequestMapping("/selectCcmCmmnCodeManageList.do")
	public String selectCcmCmmnCodeManageList(@ModelAttribute("searchVO") CmmnCodeVO searchVO, ModelMap model)
			throws Exception {
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

		List<?> CmmnCodeList = cmmnCodeManageService.selectCmmnCodeList(searchVO);
		model.addAttribute("resultList", CmmnCodeList);

		int totCnt = cmmnCodeManageService.selectCmmnCodeListTotCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		
		return "egiskorea/com/adm/info/selectCcmCmmnCodeManageList";
	}
	
	/**
	 * 공통코드 상세항목을 조회한다.
	 * 
	 * @param loginVO
	 * @param cmmnCodeVO
	 * @param model
	 * @return "egiskorea/com/adm/info/selectCcmCmmnCodeManage"
	 * @throws Exception
	 */
	@RequestMapping("/selectCcmCmmnCodeManage.do")
	public String selectCcmCmmnCodeManage(@ModelAttribute("loginVO") LoginVO loginVO, CmmnCodeVO cmmnCodeVO, ModelMap model) throws Exception {
		
		CmmnCodeVO vo = cmmnCodeManageService.selectCmmnCodeDetail(cmmnCodeVO);
		
		model.addAttribute("result", vo);

		return "egiskorea/com/adm/info/selectCcmCmmnCodeManage";
	}
	
	/**
	 * 공통코드 등록을 위한 등록페이지로 이동한다.
	 * 
	 * @param cmmnCodeVO
	 * @param model
	 * @return "egiskorea/com/adm/info/insertCcmCmmnCodeManageView"
	 * @throws Exception
	 */
	@RequestMapping("/insertCcmCmmnCodeManageView.do")
	public String insertCcmCmmnCodeManageView(@ModelAttribute("cmmnCodeVO")CmmnCodeVO cmmnCodeVO, ModelMap model) throws Exception {
		
		CmmnClCodeVO searchVO = new CmmnClCodeVO();
		searchVO.setFirstIndex(0);
        List<?> CmmnCodeList = cmmnClCodeManageService.selectCmmnClCodeList(searchVO);
        
        model.addAttribute("clCodeList", CmmnCodeList);

		return "egiskorea/com/adm/info/insertCcmCmmnCodeManageView";
	}
	
	/**
     * 공통코드를 등록한다.
     * 
     * @param CmmnCodeVO
     * @param CmmnCodeVO
     * @param status
     * @param model
     * @return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnCodeManageList.do", cmmnCodeVO, null);
     * @throws Exception
     */
    @RequestMapping("/insertCcmCmmnCodeManage.do")
    public String insertCcmCmmnCodeManage(@ModelAttribute("searchVO") CmmnCodeVO cmmnCode, @ModelAttribute("cmmnCodeVO") CmmnCodeVO cmmnCodeVO,
	    BindingResult bindingResult, Model model) throws Exception {

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		
		String message = "";
		CmmnClCodeVO searchVO = new CmmnClCodeVO();
	
		beanValidator.validate(cmmnCodeVO, bindingResult);
	
		if (bindingResult.hasErrors()) {
			
	        List<?> CmmnCodeList = cmmnClCodeManageService.selectCmmnClCodeList(searchVO);
	        model.addAttribute("clCodeList", CmmnCodeList);
	        model.addAttribute("resultMsg", "fail.common.insert");
	        
		    return "egiskorea/com/adm/info/insertCcmCmmnCodeManageView";
		}
		
		if(cmmnCode.getCodeId() != null){
			CmmnCode vo = cmmnCodeManageService.selectCmmnCodeDetail(cmmnCode);
			if(vo != null){
				model.addAttribute("message", egovMessageSource.getMessage("comSymCcmCca.validate.codeCheck"));
				
				searchVO.setFirstIndex(0);
		        List<?> CmmnCodeList = cmmnClCodeManageService.selectCmmnClCodeList(searchVO);
		        model.addAttribute("clCodeList", CmmnCodeList);
		        model.addAttribute("resultMsg", "fail.common.insert");
		        
				return "egiskorea/com/adm/info/insertCcmCmmnCodeManageView";
			}
		}
	
		cmmnCodeVO.setFrstRegisterId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		cmmnCodeManageService.insertCmmnCode(cmmnCodeVO);
		
		message = egovMessageSource.getMessage("success.common.insert");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnCodeManageList.do", cmmnCodeVO, null);
    }
        
    /**
     * 공통코드를 삭제한다.
     * 
     * @param cmmnCodeVO
     * @param status
     * @param model
     * @return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnCodeManageList.do", cmmnCodeVO, null);
     * @throws Exception
     */
    @RequestMapping("/deleteCcmCmmnCodeManage.do")
    public String deleteCcmCmmnCodeManage(@ModelAttribute("cmmnCodeVO") CmmnCodeVO cmmnCodeVO,
	    BindingResult bindingResult, Model model) throws Exception {
    	
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
    	 
			String message = "";
			cmmnCodeVO.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
			cmmnCodeManageService.deleteCmmnCode(cmmnCodeVO);
    		
			message = egovMessageSource.getMessage("success.common.delete");
			return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnCodeManageList.do", cmmnCodeVO, null);
        }
    
    /**
     * 공통코드 수정을 위한 수정페이지로 이동한다.
     * 
     * @param cmmnCodeVO
     * @param model
     * @return "egiskorea/com/adm/info/updateCcmCmmnCodeManageView"
     * @throws Exception
     */
    @RequestMapping("/updateCcmCmmnCodeManageView.do")
    public String updateCcmCmmnCodeManageView(@ModelAttribute("cmmnCodeVO") CmmnCodeVO searchVO, ModelMap model)
	    throws Exception {
		
    	CmmnCode result = cmmnCodeManageService.selectCmmnCodeDetail(searchVO);
		
    	model.addAttribute("searchVO", searchVO);
		model.addAttribute("cmmnCodeVO", result);
	
		return "egiskorea/com/adm/info/updateCcmCmmnCodeManageView";  
    }
    
    /**
     * 공통코드를 수정한다.
     * 
     * @param cmmnCodeVO
     * @param status
     * @param model
     * @return return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnCodeManage.do", cmmnCodeVO, null);
     * @throws Exception
     */
    @RequestMapping("/updateCcmCmmnCodeManage.do")
    public String updateCcmCmmnCodeManage(@ModelAttribute("searchVO") CmmnCodeVO cmmnCode, @ModelAttribute("cmmnCodeVO") CmmnCodeVO cmmnCodeVO,
	    BindingResult bindingResult, Model model) throws Exception {

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		String message = "";
		beanValidator.validate(cmmnCodeVO, bindingResult);
		if (bindingResult.hasErrors()) {

			CmmnCode result = cmmnCodeManageService.selectCmmnCodeDetail(cmmnCode);
		    model.addAttribute("cmmnCodeVO", result);
		    model.addAttribute("resultMsg", "fail.common.update");
		    
		    return "egiskorea/com/adm/info/updateCcmCmmnCodeManageView";
		}

		cmmnCodeVO.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		cmmnCodeManageService.updateCmmnCode(cmmnCodeVO);
		
		message = egovMessageSource.getMessage("success.common.update");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnCodeManage.do", cmmnCodeVO, null);
    }
}
