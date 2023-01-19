/**
 * 
 */
package egiskorea.com.mngr.auth.web;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import egiskorea.com.cmm.service.CmmUtils;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.sec.ram.service.AuthorManageVO;
import egovframework.com.sec.ram.service.EgovAuthorManageService;
import egovframework.com.sec.rgm.service.AuthorGroup;
import egovframework.com.sec.rgm.service.AuthorGroupVO;
import egovframework.com.sec.rgm.service.EgovAuthorGroupService;
import egovframework.rte.fdl.access.bean.AuthorityResourceMetadata;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 권한그룹에 관한 controller 클래스를 정의한다.
 * @author 플랫폼개발부문 DT솔루션 정상혁
 * @since 2022.01.18
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.18		정상혁	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/mngr/auth")
public class UserAuthorManageController {

    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;
    
    @Resource(name = "egovAuthorGroupService")
    private EgovAuthorGroupService egovAuthorGroupService;
    
    @Resource(name = "egovAuthorManageService")
    private EgovAuthorManageService egovAuthorManageService;
    
    /** AuthorityResourceMetadata */
    @Resource(name="authorityResource")
    private AuthorityResourceMetadata sessionResourceMetadata;
    
    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;
    
    
    /**
     * @Description 사용자 권한 목록 조회
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.01.18
     * @param authorGroupVO
     * @param authorManageVO
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/selectUserAuthorManageList.do")
	public String selectAuthorGroupList(@ModelAttribute("authorGroupVO") AuthorGroupVO authorGroupVO,
			                            @ModelAttribute("authorManageVO") AuthorManageVO authorManageVO,
			                             ModelMap model) throws Exception {

		// 미인증 사용자에 대한 보안처리
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if (!isAuthenticated) {
			return "redirect:/uat/uia/loginUsr.do";
		}
		
    	/** EgovPropertyService.sample */
		authorGroupVO.setPageUnit(propertiesService.getInt("pageUnit"));
		authorGroupVO.setPageSize(propertiesService.getInt("pageSize"));
		
    	/** paging */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(authorGroupVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(authorGroupVO.getPageUnit());
		paginationInfo.setPageSize(authorGroupVO.getPageSize());
		
		authorGroupVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		authorGroupVO.setLastIndex(paginationInfo.getLastRecordIndex());
		authorGroupVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		authorGroupVO.setAuthorGroupList(egovAuthorGroupService.selectAuthorGroupList(authorGroupVO));
        model.addAttribute("resultList", authorGroupVO.getAuthorGroupList());
        
        int totCnt = egovAuthorGroupService.selectAuthorGroupListTotCnt(authorGroupVO);
		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);

    	authorManageVO.setAuthorManageList(egovAuthorManageService.selectAuthorAllList(authorManageVO));
        model.addAttribute("authorManageList", authorManageVO.getAuthorManageList());

//        model.addAttribute("message", egovMessageSource.getMessage("success.common.select"));
//        model.addAttribute("resultMsg", "success.common.select");
        
        return "egiskorea/com/adm/auth/selectUserAuthorManageList";
	}
    
    
	/**
	 * @Description 사용자에 권한정보를 할당하여 데이터베이스에 등록
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.01.19
	 * @param userIds
	 * @param authorCodes
	 * @param regYns
	 * @param mberTyCodes
	 * @param authorGroup
	 * @param model
	 * @return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectUserAuthorManageList.do", authorGroup, null);
	 * @throws Exception
	 */
	@RequestMapping(value="/insertUserAuthorManage.do")
	public String insertAuthorGroup(@RequestParam("userIds") String userIds,
			                        @RequestParam("authorCodes") String authorCodes,
			                        @RequestParam("regYns") String regYns,
			                        @RequestParam("mberTyCodes") String mberTyCodes,// 2011.08.04 수정 부분
			                        @ModelAttribute("authorGroup") AuthorGroup authorGroup,
			                         Model model) throws Exception {
		String message = "";
    	String [] strUserIds = userIds.split(";");
    	String [] strAuthorCodes = authorCodes.split(";");
    	String [] strRegYns = regYns.split(";");
    	String [] strMberTyCodes = mberTyCodes.split(";");// 2011.08.04 수정 부분
    	
    	for(int i=0; i<strUserIds.length;i++) {
    		authorGroup.setUniqId(strUserIds[i]);
    		authorGroup.setAuthorCode(strAuthorCodes[i]);
    		authorGroup.setMberTyCode(strMberTyCodes[i]);// 2011.08.04 수정 부분
    		if(strRegYns[i].equals("N"))
    		    egovAuthorGroupService.insertAuthorGroup(authorGroup);
    		else 
    		    egovAuthorGroupService.updateAuthorGroup(authorGroup);
    	}

    	//Session 접근제어에서 사용자의 롤권한변경 후 서버 재기동 없이 적용
		sessionResourceMetadata.reload();
		
		message = egovMessageSource.getMessage("success.common.insert");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectUserAuthorManageList.do", authorGroup, null);
	}
    	
	
	/**
	 * @Description 사용자별 할당된 시스템 메뉴 접근권한을 삭제 
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.01.19
	 * @param userIds
	 * @param authorGroup
	 * @param model
	 * @return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectUserAuthorManageList.do", authorGroup, null);
	 * @throws Exception
	 */
	@RequestMapping(value="/deleteUserAuthorManage.do")
	public String deleteAuthorGroup(@RequestParam("userIds") String userIds,
                                    @ModelAttribute("authorGroup") AuthorGroup authorGroup,
                                     Model model) throws Exception {
		String message = "";
    	String [] strUserIds = userIds.split(";");
    	for(int i=0; i<strUserIds.length;i++) {
    		authorGroup.setUniqId(strUserIds[i]);
    		egovAuthorGroupService.deleteAuthorGroup(authorGroup);
    	}
    	
    	//Session 접근제어에서 사용자의 롤권한변경 후 서버 재기동 없이 적용
		sessionResourceMetadata.reload();
		
		message = egovMessageSource.getMessage("success.common.insert");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/auth/selectUserAuthorManageList.do", authorGroup, null);
	}
	
}
