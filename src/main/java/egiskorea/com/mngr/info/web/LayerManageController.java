package egiskorea.com.mngr.info.web;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.lyr.lyi.service.LayerAttribute;
import egiskorea.com.lyr.lyi.service.LayerSet;
import egiskorea.com.mngr.info.service.LayerManageService;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 레이어 관리 Controller 
 * @author 플랫폼개발부문 DT솔루션 김선옥
 * @since 2022.02.14
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.14		김선옥	최초 생성
 *  2022.02.15		정수환
 *  2022.02.23		 최원석	레이어 전체 검색 추가
 *  </pre>
 */

@Controller
@RequestMapping("/com/mngr/info")
public class LayerManageController {
	
    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;
    
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;
	
	@Resource(name = "layerManageService")
	private LayerManageService layerManageService;
	
	/**
	 * 
	 * @Description : 레이어셋 전체 검색 
	 * @Author 최원석
	 * @Date 2022.02.23
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/selectAllLayerManageList.do")
	public ModelAndView selectAllLayerManageList() throws Exception {
		ModelAndView modelAndView = new ModelAndView("jsonView");
		modelAndView.addObject("list", layerManageService.selectAllLayerManageList());		
		return modelAndView;
	}
	
	/**
	 * @param LayerSet
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/selectLayerManageList.do")
	public String selectLayerManageList(@ModelAttribute("layerSet") LayerSet layerSet, ModelMap model) 
			throws Exception{
			
		layerSet.setPageUnit(propertiesService.getInt("pageUnit"));
		layerSet.setPageSize(propertiesService.getInt("pageSize"));
    	
    	/** paging */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(layerSet.getPageIndex());
		paginationInfo.setRecordCountPerPage(layerSet.getPageUnit());
		paginationInfo.setPageSize(layerSet.getPageSize());
		
		layerSet.setFirstIndex(paginationInfo.getFirstRecordIndex());
		layerSet.setLastIndex(paginationInfo.getLastRecordIndex());
		layerSet.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		List<LayerSet> resultList = layerManageService.selectLayerManageList(layerSet);
        model.addAttribute("resultList", resultList);
        
        int totCnt = layerManageService.selectLayerManageListTot(layerSet);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
        
		return "egiskorea/com/adm/info/selectLayerManageList";
	}
	
	/**
	 * 레이어 상세항목을 조회한다.
	 * 
	 * @param LayerSet
	 * @param model
	 * @return "egiskorea/com/adm/info/selectLayerManage"
	 * @throws Exception
	 */
	@RequestMapping("/selectLayerManage.do")
	public String selectLayerManage(@ModelAttribute("loginVO") LoginVO loginVO, LayerSet layerSet, 
			LayerAttribute layerAttribute, ModelMap model) throws Exception {
		
		LayerSet vo = layerManageService.selectLayerSet(layerSet);

		layerAttribute.setLyrId(layerSet.getLyrId());
		
		List<LayerAttribute> result = layerManageService.selectLayerAttributeList(layerAttribute);
		
		int totCnt = layerManageService.selectLayerAttributeListTot(vo);
		
		model.addAttribute("layerAttribute", result);
		model.addAttribute("layerSet", vo);
		model.addAttribute("dataCount", totCnt);

		return "egiskorea/com/adm/info/selectLayerManage";
	}
}
