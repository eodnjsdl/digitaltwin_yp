/**
 * 
 */
package egiskorea.com.mngr.auth.web;

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
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.sec.ram.service.AuthorManage;
import egovframework.com.sec.ram.service.AuthorManageVO;
import egovframework.com.sec.ram.service.AuthorRoleManage;
import egovframework.com.sec.ram.service.AuthorRoleManageVO;
import egovframework.com.sec.ram.service.EgovAuthorManageService;
import egovframework.com.sec.ram.service.EgovAuthorRoleManageService;
import egovframework.rte.fdl.access.bean.AuthorityResourceMetadata;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 
 * @author 플랫폼개발부문 DT솔루션 정상혁
 * @since 2022.01.17
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.17		정상혁	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/mngr/auth")
public class AuthorManageController {

    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;
    
    @Resource(name = "egovAuthorManageService")
    private EgovAuthorManageService egovAuthorManageService;
    
    @Resource(name = "egovAuthorRoleManageService")
    private EgovAuthorRoleManageService egovAuthorRoleManageService;

    /** AuthorityResourceMetadata */
    @Resource(name="authorityResource")
    private AuthorityResourceMetadata sessionResourceMetadata;
    
    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;
    
    @Autowired
	private DefaultBeanValidator beanValidator;
    
    /**
     * @Description 권한 목록을 조회한다.
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.17
     * @param authorManageVO
     * @param model
     * @return "egiskorea/com/adm/auth/selectAuthorManageList";
     * @throws Exception
     */
    @RequestMapping(value="/selectAuthorManageList.do")
    public String selectAuthorList(@ModelAttribute("authorManageVO") AuthorManageVO authorManageVO, ModelMap model) throws Exception {
    	
    	/** EgovPropertyService.sample */
    	authorManageVO.setPageUnit(propertiesService.getInt("pageUnit"));
    	authorManageVO.setPageSize(propertiesService.getInt("pageSize"));
    	
    	/** paging */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(authorManageVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(authorManageVO.getPageUnit());
		paginationInfo.setPageSize(authorManageVO.getPageSize());
		
		authorManageVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		authorManageVO.setLastIndex(paginationInfo.getLastRecordIndex());
		authorManageVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		authorManageVO.setAuthorManageList(egovAuthorManageService.selectAuthorList(authorManageVO));
        model.addAttribute("resultList", authorManageVO.getAuthorManageList());
        
        int totCnt = egovAuthorManageService.selectAuthorListTotCnt(authorManageVO);
		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);
//        model.addAttribute("message", egovMessageSource.getMessage("success.common.select"));
//        model.addAttribute("resultMsg", "success.common.select");

        return "egiskorea/com/adm/auth/selectAuthorManageList";
    } 
    
    /**
     * @Description 권한 세부정보를 조회한다.
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.17
     * @param authorCode
     * @param authorManageVO
     * @param model
     * @return egiskorea/com/adm/auth/selectAuthorManage
     * @throws Exception
     */
    @RequestMapping(value="/selectAuthorManage.do")
    public String selectAuthorManage(@RequestParam("authorCode") String authorCode,
    	                       @ModelAttribute("authorManageVO") AuthorManageVO authorManageVO, 
    		                    ModelMap model) throws Exception {
    	
    	authorManageVO.setAuthorCode(authorCode);

    	model.addAttribute("authorManage", egovAuthorManageService.selectAuthor(authorManageVO));
//    	model.addAttribute("message", egovMessageSource.getMessage("success.common.select"));
    	return "egiskorea/com/adm/auth/selectAuthorManage";
    }  

    /**
     * @Description 권한 수정화면으로 이동한다.
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.17
     * @param authorCode
     * @param authorManageVO
     * @param model
     * @return egiskorea/com/adm/auth/updateAuthorManageView
     * @throws Exception
     */
    @RequestMapping(value="/updateAuthorManageView.do")
    public String updateAuthorManageView(@RequestParam("authorCode") String authorCode,
    	                       @ModelAttribute("authorManageVO") AuthorManageVO authorManageVO, 
    		                    ModelMap model) throws Exception {
    	
    	authorManageVO.setAuthorCode(authorCode);

    	model.addAttribute("authorManage", egovAuthorManageService.selectAuthor(authorManageVO));
//    	model.addAttribute("message", egovMessageSource.getMessage("success.common.select"));
    	model.addAttribute("resultMsg", "success.common.select");
    	return "egiskorea/com/adm/auth/updateAuthorManageView";
    }  
    
    /**
     * @Description 권한 세부정보를 수정한다.
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.17
     * @param authorManage
     * @param bindingResult
     * @param model
     * @return forward:/com/mngr/auth/selectAuthorManageList.do
     * @throws Exception
     */
    @RequestMapping(value="/updateAuthorManage.do")
    public String updateAuthor(@ModelAttribute("authorManage") AuthorManage authorManage, 
    		                    BindingResult bindingResult,
    		                    Model model) throws Exception {
    	String message = "";
    	beanValidator.validate(authorManage, bindingResult); //validation 수행
    	
		if (bindingResult.hasErrors()) {
			return "egiskorea/com/adm/auth/updateAuthorManageView";
		} else {
	    	egovAuthorManageService.updateAuthor(authorManage);
	    	
	    	//Session 접근제어에서 사용자의 롤권한변경 후 서버 재기동 없이 적용
	    	sessionResourceMetadata.reload();
	    	
			message = egovMessageSource.getMessage("success.common.update");
			return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectAuthorManage.do", authorManage, null);
		}
    } 
    
    /**
     * @Description 권한 등록화면 이동
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.17
     * @param authorManage
     * @return egiskorea/com/adm/auth/insertAuthorManageView
     * @throws Exception
     */
    @RequestMapping("/insertAuthorManageView.do")
    public String insertAuthorManageView(@ModelAttribute("authorManage") AuthorManage authorManage)
            throws Exception {
        return "egiskorea/com/adm/auth/insertAuthorManageView";
    }
    	
	
    /**
     * @Description 권한 세부정보를 등록한다.  
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.17
     * @param authorManage
     * @param bindingResult
     * @param model
     * @return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectAuthorManageList.do", authorManage, null);
     * @throws Exception
     */
    @RequestMapping(value="/insertAuthorManage.do")
    public String insertAuthor(@ModelAttribute("authorManage") AuthorManage authorManage, 
    		                    BindingResult bindingResult,
    		                    Model model) throws Exception {
    	String message = "";
    	beanValidator.validate(authorManage, bindingResult); //validation 수행
    	
		if (bindingResult.hasErrors()) { 
			return "egiskorea/com/adm/auth/insertAuthorManageView";
		} else {
	    	egovAuthorManageService.insertAuthor(authorManage);
	    	
	    	//Session 접근제어에서 사용자의 롤권한변경 후 서버 재기동 없이 적용
	    	sessionResourceMetadata.reload();
	    	
			message = egovMessageSource.getMessage("success.common.insert");
			return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectAuthorManageList.do", authorManage, null);
		}
    }
    
    /**
     * @Description 권한 세부목록을 삭제한다.
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.17
     * @param authorCodes
     * @param authorManage
     * @param model
     * @return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectAuthorManageList.do", authorManage, null);
     * @throws Exception
     */
    @RequestMapping(value="/deleteAuthorManageList.do")
    public String deleteAuthorList(@RequestParam("authorCodes") String authorCodes,
    		                       @ModelAttribute("authorManage") AuthorManage authorManage, 
    		                        Model model) throws Exception {
    	String message = "";
    	
    	String [] strAuthorCodes = authorCodes.split(";");
    	for(int i=0; i<strAuthorCodes.length;i++) {
    		authorManage.setAuthorCode(strAuthorCodes[i]);
    		egovAuthorManageService.deleteAuthor(authorManage);
    	}
    	
    	//Session 접근제어에서 사용자의 롤권한변경 후 서버 재기동 없이 적용
    	sessionResourceMetadata.reload();
    	
		message = egovMessageSource.getMessage("success.common.delete");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectAuthorManageList.do", authorManage, null);
    }    
    
    /**
     * @Description 권한 세부정보를 삭제한다. 
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.17
     * @param authorManage
     * @param model
     * @return forward:/com/mngr/auth/selectAuthorManageList.do
     * @throws Exception
     */
    @RequestMapping(value="/deleteAuthorManage.do")
    public String deleteAuthorManage(@ModelAttribute("authorManage") AuthorManage authorManage, 
    		                    Model model) throws Exception {
    	
    	egovAuthorManageService.deleteAuthor(authorManage);
    	
    	//Session 접근제어에서 사용자의 롤권한변경 후 서버 재기동 없이 적용
    	sessionResourceMetadata.reload();
    	
    	model.addAttribute("message", egovMessageSource.getMessage("success.common.delete"));
        return "forward:/com/mngr/auth/selectAuthorManageList.do";
    }  
    
    
    
    /***************** 아래부터는 권한별 롤 정보(AuthorRoleManage) ****************/
    
    
    /**
     * @Description 권한별 할당된 롤 목록 조회 
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.02.03
     * @param authorRoleManageVO
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/selectAuthorRoleManageList.do")
	public String selectAuthorRoleList(@ModelAttribute("authorRoleManageVO") AuthorRoleManageVO authorRoleManageVO,
			                            ModelMap model) throws Exception {

		/** EgovPropertyService */
    	authorRoleManageVO.setPageUnit(propertiesService.getInt("pageUnit"));
    	authorRoleManageVO.setPageSize(propertiesService.getInt("pageSize"));
		
    	/** paging */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(authorRoleManageVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(authorRoleManageVO.getPageUnit());
		paginationInfo.setPageSize(authorRoleManageVO.getPageSize());
		
		authorRoleManageVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		authorRoleManageVO.setLastIndex(paginationInfo.getLastRecordIndex());
		authorRoleManageVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		authorRoleManageVO.setAuthorRoleList(egovAuthorRoleManageService.selectAuthorRoleList(authorRoleManageVO));
        model.addAttribute("resultList", authorRoleManageVO.getAuthorRoleList());
        model.addAttribute("searchVO", authorRoleManageVO);
        
        int totCnt = egovAuthorRoleManageService.selectAuthorRoleListTotCnt(authorRoleManageVO);
		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);

//        model.addAttribute("resultMsg", "success.common.select");
        
        return "egiskorea/com/adm/auth/selectAuthorRoleManageList";
	}
    
	/**
	 * @Description 권한정보에 롤을 할당하여 데이터베이스에 등록  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.02.03
	 * @param authorCode
	 * @param roleCodes
	 * @param regYns
	 * @param commandMap
	 * @param authorRoleManage
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/insertAuthorRoleManage.do")
	public String insertAuthorRole(@RequestParam("authorCode") String authorCode,
			                       @RequestParam("roleCodes") String roleCodes,
			                       @RequestParam("regYns") String regYns,
			                       @RequestParam Map<?, ?> commandMap,
			                       @ModelAttribute("authorRoleManage") AuthorRoleManage authorRoleManage,
			                         ModelMap model) throws Exception {
		
    	String [] strRoleCodes = roleCodes.split(";");
    	String [] strRegYns = regYns.split(";");
    	    	
    	authorRoleManage.setRoleCode(authorCode);
    	
    	for(int i=0; i<strRoleCodes.length;i++) {
    		
    		authorRoleManage.setRoleCode(strRoleCodes[i]);
    		authorRoleManage.setRegYn(strRegYns[i]);
    		if(strRegYns[i].equals("Y")){
    			egovAuthorRoleManageService.deleteAuthorRole(authorRoleManage);//2011.09.07
    			egovAuthorRoleManageService.insertAuthorRole(authorRoleManage);
    		}else {
    			egovAuthorRoleManageService.deleteAuthorRole(authorRoleManage);
    		}
    	}
    	
    	//Session 접근제어에서 사용자의 롤권한변경 후 서버 재기동 없이 적용
    	sessionResourceMetadata.reload();
    	
    	model.addAttribute("resultMsg", "success.common.insert");
		return "redirect:/com/mngr/auth/selectAuthorRoleManageList.do?searchKeyword="+authorCode;
	}  
    
    
    
}
