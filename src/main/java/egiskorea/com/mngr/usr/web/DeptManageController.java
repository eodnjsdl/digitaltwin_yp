package egiskorea.com.mngr.usr.web;

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
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.uss.umt.service.DeptManageVO;
import egovframework.com.uss.umt.service.EgovDeptManageService;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 부서관련 처리를  비지니스 클래스로 전달하고 처리된결과를  해당   웹 화면으로 전달하는  Controller를 정의한다
 * @author 플랫폼개발부문 DT솔루션 정상혁
 * @since 2022.01.11
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.11		정상혁	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/mngr/usr")
public class DeptManageController {
	
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;

	@Resource(name = "egovDeptManageService")
	private EgovDeptManageService egovDeptManageService;

	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;
	
	/** Message ID Generation */
	@Resource(name = "egovDeptManageIdGnrService")
	private EgovIdGnrService egovDeptManageIdGnrService;

	@Autowired
	private DefaultBeanValidator beanValidator;

	/**
	 * 부서를 관리하기 위해 등록된 부서목록을 조회한다.
	 * @param deptManageVO DeptManageVO
	 * @return egiskorea/com/adm/usr/selectDeptManageList
	 * @exception Exception
	 */

	@RequestMapping(value = "/selectDeptManageList.do")
	public String selectDeptManageList(@ModelAttribute("deptManageVO") DeptManageVO deptManageVO, ModelMap model) throws Exception {

		/** EgovPropertyService */
		deptManageVO.setPageUnit(propertiesService.getInt("pageUnit"));
		deptManageVO.setPageSize(propertiesService.getInt("pageSize"));
		
		/** paging */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(deptManageVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(deptManageVO.getPageUnit());
		paginationInfo.setPageSize(deptManageVO.getPageSize());

		deptManageVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		deptManageVO.setLastIndex(paginationInfo.getLastRecordIndex());
		deptManageVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		model.addAttribute("resultList", egovDeptManageService.selectDeptManageList(deptManageVO));

		int totCnt = egovDeptManageService.selectDeptManageListTotCnt(deptManageVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
//		model.addAttribute("message", egovMessageSource.getMessage("success.common.select"));
		return "egiskorea/com/adm/usr/selectDeptManageList";
	}

	/**
	 * 등록된 부서의 상세정보를 조회한다.
	 * @param deptManageVO DeptManageVO
	 * @return egiskorea/com/adm/usr/selectDeptManage
	 * @exception Exception
	 */

	@RequestMapping(value = "/selectDeptManage.do")
	public String selectDeptManage(@RequestParam("orgnztId") String orgnztId, 
			@ModelAttribute("deptManageVO") DeptManageVO deptManageVO, ModelMap model) throws Exception {

		deptManageVO.setOrgnztId(orgnztId);

		model.addAttribute("deptManage", egovDeptManageService.selectDeptManage(deptManageVO));
//		model.addAttribute("message", egovMessageSource.getMessage("success.common.select"));
		return "egiskorea/com/adm/usr/selectDeptManage";
	}
	
	
	/**
	 * 부서등록 화면으로 이동한다.
	 * @param deptManageVO DeptManageVO
	 * @return egiskorea/com/adm/usr/insertDeptManageView
	 * @exception Exception
	 */
	@RequestMapping(value = "/insertDeptManageView.do")
	public String insertDeptManageView(@ModelAttribute("deptManageVO") DeptManageVO deptManageVO, ModelMap model) throws Exception {

		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		
		//그룹정보를 조회 - GROUP_ID정보
		vo.setTableNm("COMTNAUTHORGROUPINFO");
		List<?> groupId_result = cmmUseService.selectGroupIdDetail(vo);
		
		model.addAttribute("groupId_result", groupId_result);
		model.addAttribute("deptManage", deptManageVO);
		return "egiskorea/com/adm/usr/insertDeptManageView";
	}

	/**
	 * 부서정보를 신규로 등록한다.
	 * @param deptManageVO DeptManageVO
	 * @return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectGroupManageList.do", deptManageVO);
	 * @exception Exception
	 */
	@RequestMapping(value = "/insertDeptManage.do")
	public String insertDeptManage(@ModelAttribute("deptManageVO") DeptManageVO deptManageVO, BindingResult bindingResult,  Model model) throws Exception {

		String message = "";
		beanValidator.validate(deptManageVO, bindingResult); //validation 수행

		deptManageVO.setOrgnztId(egovDeptManageIdGnrService.getNextStringId());

		if (bindingResult.hasErrors()) {
			return "egiskorea/com/adm/usr/insertDeptManageView";
		} else {
			egovDeptManageService.insertDeptManage(deptManageVO);
			message = egovMessageSource.getMessage("success.common.insert");
			return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectDeptManageList.do", deptManageVO, null);
		}
	}

	/**
	 * 등록된 부서의 수정 화면으로 이동한다.
	 * @param deptManageVO DeptManageVO
	 * @return egiskorea/com/adm/usr/updateDeptManageView
	 * @exception Exception
	 */

	@RequestMapping(value = "/updateDeptManageView.do")
	public String updateDeptManageView(@RequestParam("orgnztId") String orgnztId, @ModelAttribute("deptManageVO") DeptManageVO deptManageVO, ModelMap model) throws Exception {
		
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		
		//그룹정보를 조회 - GROUP_ID정보
		vo.setTableNm("COMTNAUTHORGROUPINFO");
		List<?> groupId_result = cmmUseService.selectGroupIdDetail(vo);
		
		deptManageVO.setOrgnztId(orgnztId);

		model.addAttribute("deptManage", egovDeptManageService.selectDeptManage(deptManageVO));
		model.addAttribute("groupId_result", groupId_result);
//		model.addAttribute("message", egovMessageSource.getMessage("success.common.select"));
		return "egiskorea/com/adm/usr/updateDeptManageView";
	}

	/**
	 * 기 등록된 부서정보를 수정한다.
	 * @param deptManageVO DeptManageVO
	 * @return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectDeptManage.do", deptManageVO);
	 * @exception Exception
	 */
	@RequestMapping(value = "/updateDeptManage.do")
	public String updateDeptManage(@ModelAttribute("deptManageVO") DeptManageVO deptManageVO, BindingResult bindingResult, Model model) throws Exception {
		String message = "";
		beanValidator.validate(deptManageVO, bindingResult); //validation 수행
		if (bindingResult.hasErrors()) {
			return "egiskorea/com/adm/usr/updateDeptManageView";
		} else {
			egovDeptManageService.updateDeptManage(deptManageVO);
			message = egovMessageSource.getMessage("success.common.update");
			return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectDeptManage.do", deptManageVO, null);
		}
	}
	
	/**
	 * 기 등록된 부서정보를 삭제한다.
	 * @param deptManageVO DeptManageVO
	 * @return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectDeptManageList.do", deptManageVO);
	 * @exception Exception
	 */
	@RequestMapping(value = "/deleteDeptManage.do")
	public String deleteDeptManage(@ModelAttribute("deptManageVO") DeptManageVO deptManageVO, Model model) throws Exception {
		String message = "";
		egovDeptManageService.deleteDeptManage(deptManageVO);
		message = egovMessageSource.getMessage("success.common.delete");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectDeptManageList.do", deptManageVO, null);
	}

	/**
	 * 기 등록된 부서정보목록을 일괄 삭제한다.
	 * @param orgnztIds String
	 * @param deptManageVO DeptManageVO
	 * @return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectDeptManageList.do", deptManageVO);
	 * @exception Exception
	 */
	@RequestMapping(value = "/deleteDeptManageList.do")
	public String deleteDeptManageList(@RequestParam("orgnztIds") String orgnztIds,
										@ModelAttribute("deptManageVO") DeptManageVO deptManageVO, Model model) throws Exception {
		String message = "";
		String[] strOrgnztIds = orgnztIds.split(";");
		for (int i = 0; i < strOrgnztIds.length; i++) {
			deptManageVO.setOrgnztId(strOrgnztIds[i]);
			egovDeptManageService.deleteDeptManage(deptManageVO);
		}
		
		message = egovMessageSource.getMessage("success.common.delete");
		return CmmUtils.postAlertHref(model, message, "/com/mngr/usr/selectDeptManageList.do", deptManageVO, null);
	}
	
}
