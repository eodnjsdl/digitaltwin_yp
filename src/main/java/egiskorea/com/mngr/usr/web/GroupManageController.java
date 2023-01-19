package egiskorea.com.mngr.usr.web;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.SessionVO;
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.com.sec.gmt.service.EgovGroupManageService;
import egovframework.com.sec.gmt.service.GroupManage;
import egovframework.com.sec.gmt.service.GroupManageVO;

import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egiskorea.com.cmm.service.CmmUtils;

/**
 * @Description 그룹관리에 관한 controller 클래스를 정의한다.
 * @author 플랫폼개발부문 DT솔루션 정상혁
 * @since 2021.12.21
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.21		정상혁	최초 생성
 *  </pre>
 */

@Controller
@SessionAttributes(types=SessionVO.class)
@RequestMapping("/com/mngr/usr")
public class GroupManageController {
	
    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;

    @Resource(name = "egovGroupManageService")
    private EgovGroupManageService egovGroupManageService;

    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;
	
    /** Message ID Generation */
    @Resource(name="egovGroupIdGnrService")    
    private EgovIdGnrService egovGroupIdGnrService;
    
    @Autowired
	private DefaultBeanValidator beanValidator;
    

	/**
	 * 시스템사용 목적별 그룹 목록 조회
	 * @param groupManageVO GroupManageVO
	 * @return "egiskorea/com/adm/usr/selectGroupManageList"
	 * @exception Exception
	 */
    @RequestMapping("/selectGroupManageList.do")
	public String selectGroupManageList(@ModelAttribute("groupManageVO") GroupManageVO groupManageVO, 
                                   ModelMap model) throws Exception {
    	
    	groupManageVO.setPageUnit(propertiesService.getInt("pageUnit"));
    	groupManageVO.setPageSize(propertiesService.getInt("pageSize"));
    	
    	/** paging */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(groupManageVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(groupManageVO.getPageUnit());
		paginationInfo.setPageSize(groupManageVO.getPageSize());
		
		groupManageVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		groupManageVO.setLastIndex(paginationInfo.getLastRecordIndex());
		groupManageVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		groupManageVO.setGroupManageList(egovGroupManageService.selectGroupList(groupManageVO));
        model.addAttribute("resultList", groupManageVO.getGroupManageList());
        
        int totCnt = egovGroupManageService.selectGroupListTotCnt(groupManageVO);
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultCnt", totCnt);
        model.addAttribute("paginationInfo", paginationInfo);
        model.addAttribute("message", egovMessageSource.getMessage("success.common.select"));

        return "egiskorea/com/adm/usr/selectGroupManageList";
	}
    
	/**
	 * 그룹정보 상세 화면 이동
	 * @param groupManageVO GroupManageVO, groupManage GroupManage
	 * @return "egiskorea/com/adm/usr/selectGroupManage"
	 * @exception Exception
	 */
    @RequestMapping(value="/selectGroupManage.do")
	public String selectGroupManage(@ModelAttribute("groupManageVO") GroupManageVO groupManageVO, 
								@ModelAttribute("groupManage") GroupManage groupManage,
	    		               ModelMap model) throws Exception {

	    model.addAttribute("groupManage", egovGroupManageService.selectGroup(groupManageVO));
//	    model.addAttribute("message", egovMessageSource.getMessage("success.common.update"));
	    return "egiskorea/com/adm/usr/selectGroupManage";
	}
    

	/**
	 * 그룹정보 수정 화면 이동
	 * @param groupManageVO GroupManageVO, groupManage GroupManage
	 * @return "egiskorea/com/adm/usr/updateGroupManageView"
	 * @exception Exception
	 */
    @RequestMapping(value="/updateGroupManageView.do")
	public String updateGroupManageView(@ModelAttribute("groupManageVO") GroupManageVO groupManageVO, 
								@ModelAttribute("groupManage") GroupManage groupManage,
	    		               ModelMap model) throws Exception {

	    model.addAttribute("groupManage", egovGroupManageService.selectGroup(groupManageVO));
	    return "egiskorea/com/adm/usr/updateGroupManageView";
	}

    
    /**
	 * 그룹 등록화면 이동
	 * @param groupManageVO GroupManageVO
	 * @return egiskorea/com/adm/usr/insertGroupManageView
	 * @exception Exception
	 */     
    @RequestMapping(value="/insertGroupManageView.do")
    public String insertGroupManageView(@ModelAttribute("groupManage") GroupManage groupManage
    		)
            throws Exception {
        return "egiskorea/com/adm/usr/insertGroupManageView";
    }

	/**
	 * 그룹 기본정보를 화면에서 입력하여 항목의 정합성을 체크하고 데이터베이스에 저장
	 * @param groupManage GroupManage
	 * @param groupManageVO GroupManageVO
	 * @return forward:/com/mngr/usr/selectGroupManageList.do
	 * @exception Exception
	 */ 
    @RequestMapping(value="/insertGroupManage.do")
	public String insertGroupManage(@ModelAttribute("groupManage") GroupManage groupManage, 
			                  @ModelAttribute("groupManageVO") GroupManageVO groupManageVO, 
			                   BindingResult bindingResult,
			                   Model model) throws Exception {
    	String message = "";
    	beanValidator.validate(groupManage, bindingResult); //validation 수행
    	
    	if (bindingResult.hasErrors()) { 
			return "egiskorea/com/adm/usr/insertGroupManageView";
		} else {
	    	groupManage.setGroupId(egovGroupIdGnrService.getNextStringId());
	        groupManageVO.setGroupId(groupManage.getGroupId());
	        
	        model.addAttribute("groupManage", egovGroupManageService.insertGroup(groupManage, groupManageVO));
	        message = egovMessageSource.getMessage("success.common.insert");
	        return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectGroupManageList.do", groupManageVO, null);
		}
	}
    
	/**
	 * 화면에 조회된 그룹의 기본정보를 수정하여 항목의 정합성을 체크하고 수정된 데이터를 데이터베이스에 반영
	 * @param groupManage GroupManage
	 * @return forward:/com/mngr/usr/selectGroupManageList.do
	 * @exception Exception
	 */     
    @RequestMapping(value="/updateGroupManage.do")
	public String updateGroupManage(@ModelAttribute("groupManage") GroupManage groupManage, 
			                   BindingResult bindingResult,
                               Model model,
                               RedirectAttributes redirectAttributes) throws Exception {
    	
    	String message = "";
    	
    	beanValidator.validate(groupManage, bindingResult); //validation 수행
    	
    	if (bindingResult.hasErrors()) { 
			return "egiskorea/com/adm/usr/updateGroupManageView";
		} else {
    	    egovGroupManageService.updateGroup(groupManage);
    	    message = egovMessageSource.getMessage("success.common.update");
    	    return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectGroupManage.do", groupManage, null);
		}
	}	

	/**
	 * 불필요한 그룹정보를 화면에 조회하여 데이터베이스에서 삭제
	 * @param groupManage GroupManage
	 * @return forward:/com/mngr/usr/selectGroupManageList.do
	 * @exception Exception
	 */
	@RequestMapping(value="deleteGroupManage.do")
	public String deleteGroupManage(@ModelAttribute("groupManage") GroupManage groupManage, 
                             Model model) throws Exception {
		String message = "";
		egovGroupManageService.deleteGroup(groupManage);
		message = egovMessageSource.getMessage("success.common.delete");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectGroupManageList.do", groupManage, null);
	}
	
	
	/**
	 * 불필요한 그룹정보 목록을 화면에 조회하여 데이터베이스에서 삭제
	 * @param groupIds String
	 * @param groupManage GroupManage
	 * @return forward:/com/mngr/usr/selectGroupManageList.do
	 * @exception Exception
	 */   
	@RequestMapping(value="/deleteGroupManageList.do")
	public String deleteGroupManageList(@RequestParam("groupIds") String groupIds,
			                      @ModelAttribute("groupManage") GroupManage groupManage, 
	                               Model model) throws Exception {
		String message = "";
    	String [] strGroupIds = groupIds.split(";");
    	for(int i=0; i<strGroupIds.length;i++) {
    		groupManage.setGroupId(strGroupIds[i]);
    		egovGroupManageService.deleteGroup(groupManage);
    	}

    	message = egovMessageSource.getMessage("success.common.delete");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectGroupManageList.do", groupManage, null);
	}
}