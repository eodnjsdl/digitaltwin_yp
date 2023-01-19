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
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.com.cmm.service.CmmnDetailCode;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.sym.ccm.cca.service.CmmnCode;
import egovframework.com.sym.ccm.cca.service.CmmnCodeVO;
import egovframework.com.sym.ccm.cca.service.EgovCcmCmmnCodeManageService;
import egovframework.com.sym.ccm.ccc.service.CmmnClCodeVO;
import egovframework.com.sym.ccm.ccc.service.EgovCcmCmmnClCodeManageService;
import egovframework.com.sym.ccm.cde.service.CmmnDetailCodeVO;
import egovframework.com.sym.ccm.cde.service.EgovCcmCmmnDetailCodeManageService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 공통코드 관리 controller 클래스
 * @author 플랫폼개발부문 DT솔루션 정수환
 * @since 2022.02.04
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.04		정수환	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/mngr/info")
public class CcmCmmnDetailCodeManageController {

	@Resource(name = "CmmnDetailCodeManageService")
   private EgovCcmCmmnDetailCodeManageService cmmnDetailCodeManageService;

	@Resource(name = "CmmnClCodeManageService")
   private EgovCcmCmmnClCodeManageService cmmnClCodeManageService;

	@Resource(name = "CmmnCodeManageService")
   private EgovCcmCmmnCodeManageService cmmnCodeManageService;

    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;
    
	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;

	@Autowired
	private DefaultBeanValidator beanValidator;
	
	   /**
		 * 공통상세코드 목록을 조회한다.
	     * @param loginVO
	     * @param searchVO
	     * @param model
	     * @return "egiskorea/com/adm/info/ccmCmmnDetailCodeManageList"
	     * @throws Exception
	     */
	    @RequestMapping("/selectCcmCmmnDetailCodeManageList.do")
		public String selectCcmCmmnDetailCodeManageList (@ModelAttribute("loginVO") LoginVO loginVO, @ModelAttribute("searchVO") CmmnDetailCodeVO searchVO
				, ModelMap model
				) throws Exception {
			
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

	        List<?> CmmnCodeList = cmmnDetailCodeManageService.selectCmmnDetailCodeList(searchVO);
	        model.addAttribute("resultList", CmmnCodeList);

	        int totCnt = cmmnDetailCodeManageService.selectCmmnDetailCodeListTotCnt(searchVO);
			paginationInfo.setTotalRecordCount(totCnt);
	        model.addAttribute("paginationInfo", paginationInfo);

	        return "egiskorea/com/adm/info/selectCcmCmmnDetailCodeManageList";
		}
		
		/**
		 * 공통상세코드 상세항목을 조회한다.
		 * @param loginVO
		 * @param cmmnDetailCodeVO
		 * @param model
		 * @return "egiskorea/com/adm/info/selectCcmCmmnDetailCodeManage"
		 * @throws Exception
		 */
		@RequestMapping("/selectCcmCmmnDetailCodeManage.do")
	 	public String selectCcmCmmnDetailCodeManage (@ModelAttribute("loginVO") LoginVO loginVO
	 			, CmmnDetailCodeVO cmmnDetailCodeVO, ModelMap model) throws Exception {
	 			
	    	CmmnDetailCode vo = cmmnDetailCodeManageService.selectCmmnDetailCodeDetail(cmmnDetailCodeVO);
			model.addAttribute("result", vo);

			return "egiskorea/com/adm/info/selectCcmCmmnDetailCodeManage";
		}
		
		/**
		 * 공통상세코드를 삭제한다.
		 * @param loginVO
		 * @param cmmnDetailCodeVO
		 * @param model
		 * @return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnDetailCodeManageList.do", cmmnDetailCodeVO, null);
		 * @throws Exception
		 */
	    @RequestMapping("/deleteCcmCmmnDetailCodeManage.do")
		public String deleteCcmCmmnDetailCodeManage (@ModelAttribute("loginVO") LoginVO loginVO
				, CmmnDetailCodeVO cmmnDetailCodeVO, Model model) throws Exception {
				
	    	String message = "";
	    	cmmnDetailCodeManageService.deleteCmmnDetailCode(cmmnDetailCodeVO);
	    	model.addAttribute("resultMsg", "success.common.delete");
	    	
			message = egovMessageSource.getMessage("success.common.update");
			return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnDetailCodeManageList.do", cmmnDetailCodeVO, null);
		}
	    
		/**
		 * 공통상세코드 등록을 위한 등록페이지로 이동한다.
		 * 
		 * @param cmmnDetailCodeVO
		 * @param model
		 * @return
		 * @throws Exception
		 */
		@RequestMapping("/insertCcmCmmnDetailCodeManageView.do")
		public String insertCcmCmmnDetailCodeManageView(@ModelAttribute("loginVO") LoginVO loginVO, @ModelAttribute("cmmnCodeVO") CmmnCodeVO cmmnCodeVO,
				@ModelAttribute("cmmnDetailCodeVO") CmmnDetailCodeVO cmmnDetailCodeVO
				,ModelMap model) throws Exception {
			
			CmmnClCodeVO searchClCodeVO = new CmmnClCodeVO();
            searchClCodeVO.setFirstIndex(0);
	        List<?> CmmnClCodeList = cmmnClCodeManageService.selectCmmnClCodeList(searchClCodeVO);
	        model.addAttribute("clCodeList", CmmnClCodeList);
	    
	        CmmnCodeVO clCode = new CmmnCodeVO(); 
	        clCode.setClCode(cmmnCodeVO.getClCode());
	        
	        if (cmmnCodeVO.getClCode().equals("")) {

	        }else{
            
            	CmmnCodeVO searchCodeVO = new CmmnCodeVO();
            	searchCodeVO.setRecordCountPerPage(999999);
                searchCodeVO.setFirstIndex(0);
            	searchCodeVO.setSearchCondition("clCode");
                searchCodeVO.setSearchKeyword(cmmnCodeVO.getClCode());
                
    	        List<?> CmmnCodeList = cmmnCodeManageService.selectCmmnCodeList(searchCodeVO);
    	        model.addAttribute("codeList", CmmnCodeList);
	        } 	
	        
			return "egiskorea/com/adm/info/insertCcmCmmnDetailCodeManageView";
		}
		
		/**
	     * 공통상세코드를 등록한다.
	     * 
	     * @param CmmnDetailCodeVO
	     * @param CmmnDetailCodeVO
	     * @param status
	     * @param model
	     * @return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnDetailCodeManageList.do", cmmnDetailCodeVO, null);
	     * @throws Exception
	     */
	    @RequestMapping("/insertCcmCmmnDetailCodeManage.do")
	    public String insertCcmCmmnDetailCodeManage(@ModelAttribute("cmmnDetailCodeVO") CmmnDetailCodeVO cmmnDetailCodeVO,
	    		BindingResult bindingResult, Model model) throws Exception {

	    	LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			
	    	String message = "";
	    	CmmnClCodeVO searchClCodeVO = new CmmnClCodeVO();
		
			beanValidator.validate(cmmnDetailCodeVO, bindingResult);
		
			if (bindingResult.hasErrors()) {
				
				List<?> CmmnClCodeList = cmmnClCodeManageService.selectCmmnClCodeList(searchClCodeVO);
				model.addAttribute("clCodeList", CmmnClCodeList);
				model.addAttribute("resultMsg", "fail.common.insert");
				
			    return "egiskorea/com/adm/info/insertCcmCmmnDetailCodeManageView";
			}
			
			if(cmmnDetailCodeVO.getCodeId() != null){
				
				CmmnDetailCode vo = cmmnDetailCodeManageService.selectCmmnDetailCodeDetail(cmmnDetailCodeVO);
				if(vo != null){
					model.addAttribute("message", egovMessageSource.getMessage("comSymCcmCde.validate.codeCheck"));
					
					List<?> CmmnClCodeList = cmmnClCodeManageService.selectCmmnClCodeList(searchClCodeVO);
					model.addAttribute("clCodeList", CmmnClCodeList);
					model.addAttribute("resultMsg", "fail.common.insert");
					
				    return "egiskorea/com/adm/info/insertCcmCmmnDetailCodeManageView";
				}
			}
		
	    	cmmnDetailCodeVO.setFrstRegisterId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
	    	cmmnDetailCodeManageService.insertCmmnDetailCode(cmmnDetailCodeVO);
		
			message = egovMessageSource.getMessage("success.common.insert");
			return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnDetailCodeManageList.do", cmmnDetailCodeVO, null);
	    }
	    
	    /**
	     * 공통상세코드 수정을 위한 수정페이지로 이동한다.
	     * 
	     * @param cmmnDetailCodeVO
	     * @param model
	     * @return "egiskorea/com/adm/info/updateCcmCmmnDetailCodeView"
	     * @throws Exception
	     */
	    @RequestMapping("/updateCcmCmmnDetailCodeManageView.do")
	    public String updateCcmCmmnDetailCodeView(@ModelAttribute("loginVO") LoginVO loginVO, 
	    		@ModelAttribute("cmmnDetailCodeVO") CmmnDetailCodeVO searchVO, ModelMap model)
	    				throws Exception {
			
	    	CmmnDetailCode result = cmmnDetailCodeManageService.selectCmmnDetailCodeDetail(searchVO);
	    	model.addAttribute("searchVO", searchVO);
			model.addAttribute("cmmnDetailCodeVO", result);
		
			return "egiskorea/com/adm/info/updateCcmCmmnDetailCodeManageView";  
	    }
	    
	    /**
	     * 공통상세코드를 수정한다.
	     * 
	     * @param cmmnDetailCodeVO
	     * @param model
	     * @return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnDetailCodeManage.do", cmmnDetailCodeVO, null);
	     * @throws Exception
	     */
	    @RequestMapping("/updateCcmCmmnDetailCodeManage.do")
	    public String updateCcmCmmnDetailCodeManage(@ModelAttribute("cmmnDetailCodeVO") CmmnDetailCodeVO cmmnDetailCodeVO, Model model, BindingResult bindingResult )
	    				throws Exception {
	    	
	    	LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
	    	
	    	String message = "";
	    	beanValidator.validate(cmmnDetailCodeVO, bindingResult);
	    	
	    	if (bindingResult.hasErrors()){
	    	CmmnDetailCode result = cmmnDetailCodeManageService.selectCmmnDetailCodeDetail(cmmnDetailCodeVO);
	    	model.addAttribute("cmmnDetailCodeVO", result);
	    	model.addAttribute("resultMsg", "fail .common.update");
	    	
	    	return "egiskorea/com/adm/info/updateCcmCmmnDetailCodeManageView";
	    	}
	    	
	    	cmmnDetailCodeVO.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
	    	cmmnDetailCodeManageService.updateCmmnDetailCode(cmmnDetailCodeVO);
	    	
			message = egovMessageSource.getMessage("success.common.update");
			return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectCcmCmmnDetailCodeManage.do", cmmnDetailCodeVO, null);
	    }
	    
	    
		
}