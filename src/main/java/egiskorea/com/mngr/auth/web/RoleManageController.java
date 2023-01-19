/**
 * 
 */
package egiskorea.com.mngr.auth.web;

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
import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.sec.ram.service.AuthorManageVO;
import egovframework.com.sec.ram.service.EgovAuthorManageService;
import egovframework.com.sec.rmt.service.EgovRoleManageService;
import egovframework.com.sec.rmt.service.RoleManage;
import egovframework.com.sec.rmt.service.RoleManageVO;
import egovframework.rte.fdl.access.bean.AuthorityResourceMetadata;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 
 * @author 플랫폼개발부문 DT솔루션 정상혁
 * @since 2022.01.19
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.19		정상혁	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping(value="/com/mngr/auth")
public class RoleManageController {

    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;

    @Resource(name = "egovRoleManageService")
    private EgovRoleManageService egovRoleManageService;

    @Resource(name = "EgovCmmUseService")
    EgovCmmUseService egovCmmUseService;

    @Resource(name = "egovAuthorManageService")
    private EgovAuthorManageService egovAuthorManageService;

    /** AuthorityResourceMetadata */
    @Resource(name="authorityResource")
    private AuthorityResourceMetadata sessionResourceMetadata;
    
    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /** Message ID Generation */
    @Resource(name="egovRoleIdGnrService")
    private EgovIdGnrService egovRoleIdGnrService;

    @Autowired
	private DefaultBeanValidator beanValidator;
    
    
    
    /**
     * @Description 롤정보 목록 조회   
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.19
     * @param roleManageVO
     * @param model
     * @return "egiskorea/com/adm/auth/selectRoleManageList";
     * @throws Exception
     */
    @RequestMapping(value="/selectRoleManageList.do")
	public String selectRoleManageList(@ModelAttribute("roleManageVO") RoleManageVO roleManageVO,
			                      ModelMap model) throws Exception {

    	/** EgovPropertyService.sample */
    	roleManageVO.setPageUnit(propertiesService.getInt("pageUnit"));
    	roleManageVO.setPageSize(propertiesService.getInt("pageSize"));
    	
    	/** paging */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(roleManageVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(roleManageVO.getPageUnit());
		paginationInfo.setPageSize(roleManageVO.getPageSize());

		roleManageVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		roleManageVO.setLastIndex(paginationInfo.getLastRecordIndex());
		roleManageVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		roleManageVO.setRoleManageList(egovRoleManageService.selectRoleList(roleManageVO));
        model.addAttribute("resultList", roleManageVO.getRoleManageList());

        int totCnt = egovRoleManageService.selectRoleListTotCnt(roleManageVO);
		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);
        model.addAttribute("message", egovMessageSource.getMessage("success.common.select"));

        return "egiskorea/com/adm/auth/selectRoleManageList";
	}
    
    /**
     * @Description 등록된 롤 정보 조회 
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.20
     * @param roleCode
     * @param roleManageVO
     * @param authorManageVO
     * @param model
     * @return egiskorea/com/adm/auth/selectRoleManage;
     * @throws Exception
     */
    @RequestMapping(value="/selectRoleManage.do")
	public String selectRoleManage(@RequestParam("roleCode") String roleCode,
	                         @ModelAttribute("roleManageVO") RoleManageVO roleManageVO,
		                      ModelMap model) throws Exception {

    	roleManageVO.setRoleCode(roleCode);


    	model.addAttribute("roleManage", egovRoleManageService.selectRole(roleManageVO));

        return "egiskorea/com/adm/auth/selectRoleManage";
	}
    
    
    /**
     * @Description 롤 정보 수정 화면으로 이동  
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.25
     * @param roleCode
     * @param roleManageVO
     * @param authorManageVO
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/updateRoleManageView.do")
	public String updateRoleManageView(@RequestParam("roleCode") String roleCode,
	                         @ModelAttribute("roleManageVO") RoleManageVO roleManageVO,
	                         @ModelAttribute("authorManageVO") AuthorManageVO authorManageVO,
		                      ModelMap model) throws Exception {

    	roleManageVO.setRoleCode(roleCode);

    	authorManageVO.setAuthorManageList(egovAuthorManageService.selectAuthorAllList(authorManageVO));

    	model.addAttribute("roleManage", egovRoleManageService.selectRole(roleManageVO));
        model.addAttribute("authorManageList", authorManageVO.getAuthorManageList());
        model.addAttribute("cmmCodeDetailList", getCmmCodeDetailList(new ComDefaultCodeVO(),"COM029"));

        return "egiskorea/com/adm/auth/updateRoleManageView";
	}
    
    
    /**
     * @Description 롤정보 수정 
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.25
     * @param roleManage
     * @param bindingResult
     * @param model
     * @return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectRoleManage.do", roleManage, null);
     * @throws Exception
     */
    @RequestMapping(value="/updateRoleManage.do")
	public String updateRoleManage(@ModelAttribute("roleManage") RoleManage roleManage,
			BindingResult bindingResult,
            Model model) throws Exception {

    	String message = "";
    	
    	beanValidator.validate(roleManage, bindingResult); //validation 수행
    	if (bindingResult.hasErrors()) {
			return "egiskorea/com/adm/auth/updateRoleManageView";
		} else {
    	egovRoleManageService.updateRole(roleManage);
    	
    	//Session 접근제어에서 사용자의 롤권한변경 후 서버 재기동 없이 적용
    	sessionResourceMetadata.reload();
    	
		message = egovMessageSource.getMessage("success.common.update");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectRoleManage.do", roleManage, null);
		}
	}
    
    /**
     * @Description 공통코드 호출  
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.20
     * @param comDefaultCodeVO
     * @param codeId
     * @return
     * @throws Exception
     */
    public List<?> getCmmCodeDetailList(ComDefaultCodeVO comDefaultCodeVO, String codeId)  throws Exception {
    	comDefaultCodeVO.setCodeId(codeId);
    	return egovCmmUseService.selectCmmCodeDetail(comDefaultCodeVO);
    }
    
	/**
	 * @Description 롤 목록화면에서 리스트 삭제
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.01.25
	 * @param roleCodes
	 * @param roleManage
	 * @param model
	 * @return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectRoleManageList.do", roleManage, null);
	 * @throws Exception
	 */
	@RequestMapping(value="/deleteRoleManageList.do")
	public String deleteRoleManageList(@RequestParam("roleCodes") String roleCodes,
			                     @ModelAttribute("roleManage") RoleManage roleManage,
	                              Model model) throws Exception {
		String message = "";
    	String [] strRoleCodes = roleCodes.split(";");
    	for(int i=0; i<strRoleCodes.length;i++) {
    		roleManage.setRoleCode(strRoleCodes[i]);
    		egovRoleManageService.deleteRole(roleManage);
    	}

    	//Session 접근제어에서 사용자의 롤권한변경 후 서버 재기동 없이 적용
    	sessionResourceMetadata.reload();
    	
		message = egovMessageSource.getMessage("success.common.delete");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectRoleManageList.do", roleManage, null);
	}
	
	
    /**
     * @Description 롤 삭제
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.25
     * @param roleManage
     * @param model
     * @return forward:/com/mngr/auth/selectRoleManageList.do;
     * @throws Exception
     */
    @RequestMapping(value="/deleteRoleManage.do")
	public String deleteRoleManage(@ModelAttribute("roleManage") RoleManage roleManage,
            Model model) throws Exception {
    	
    	String message ="";
    	egovRoleManageService.deleteRole(roleManage);
    	
    	//Session 접근제어에서 사용자의 롤권한변경 후 서버 재기동 없이 적용
    	sessionResourceMetadata.reload();
    	
		message = egovMessageSource.getMessage("success.common.delete");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectRoleManageList.do", roleManage, null);

	}
    
    /**
     * @Description 롤 등록화면 이동 
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.20
     * @param authorManageVO
     * @param roleManage
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/insertRoleManageView.do")
    public String insertRoleManageView(@ModelAttribute("authorManageVO") AuthorManageVO authorManageVO,
    								@ModelAttribute("roleManage") RoleManage roleManage,
    									ModelMap model) throws Exception {

    	authorManageVO.setAuthorManageList(egovAuthorManageService.selectAuthorAllList(authorManageVO));
        model.addAttribute("authorManageList", authorManageVO.getAuthorManageList());
        model.addAttribute("cmmCodeDetailList", getCmmCodeDetailList(new ComDefaultCodeVO(),"COM029"));

        return "egiskorea/com/adm/auth/insertRoleManageView";
    }
    
    
    /**
     * @Description 시스템 메뉴에 따른 접근권한, 데이터 입력, 수정, 삭제의 권한 롤을 등록
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.20
     * @param roleManage
     * @param roleManageVO
     * @param bindingResult
     * @param model
     * @return forward:/com/mngr/auth/selectRoleManageList.do;
     * @throws Exception
     */
    @RequestMapping(value="/insertRoleManage.do")
	public String insertRoleManage(@ModelAttribute("roleManage") RoleManage roleManage,
			                 @ModelAttribute("roleManageVO") RoleManageVO roleManageVO,
			                  BindingResult bindingResult,
                              Model model) throws Exception {

    	String message = "";
    	beanValidator.validate(roleManage, bindingResult); //validation 수행

    	if (bindingResult.hasErrors()) {
			return "egiskorea/com/adm/auth/insertRoleManageView";
		} else {
    	    String roleTyp = roleManage.getRoleTyp();
	    	if("method".equals(roleTyp))//KISA 보안약점 조치 (2018-10-29, 윤창원)
	    		roleTyp = "mtd";
	    	else if("pointcut".equals(roleTyp))//KISA 보안약점 조치 (2018-10-29, 윤창원)
	    		roleTyp = "pct";
	    	else roleTyp = "web";

	    	roleManage.setRoleCode(roleTyp.concat("-").concat(egovRoleIdGnrService.getNextStringId()));
	    	roleManageVO.setRoleCode(roleManage.getRoleCode());

	    	
	        model.addAttribute("cmmCodeDetailList", getCmmCodeDetailList(new ComDefaultCodeVO(),"COM029"));
//	    	model.addAttribute("message", egovMessageSource.getMessage("success.common.insert"));
	        model.addAttribute("resultMsg", "success.common.insert");
	        model.addAttribute("roleManage", egovRoleManageService.insertRole(roleManage, roleManageVO));
	    	
	        //Session 접근제어에서 사용자의 롤권한변경 후 서버 재기동 없이 적용
	    	sessionResourceMetadata.reload();
	    	
			message = egovMessageSource.getMessage("success.common.insert");
			return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectRoleManageList.do", roleManageVO, null);
		}
	}
    
}
