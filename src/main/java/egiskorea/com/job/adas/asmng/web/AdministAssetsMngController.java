package egiskorea.com.job.adas.asmng.web;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import egiskorea.com.job.adas.asmng.service.AdministAssetsService;
import egiskorea.com.job.adas.asmng.service.AdministAssetsVO;
import egovframework.rte.fdl.property.EgovPropertyService;

/**
 * @Description 행정자산관리 Controller 클래스
 * @since 2023.05.24
 * @version 1.0
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.24   백승석            최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/job/adas/asmng")
public class AdministAssetsMngController {

	@Resource(name = "administAssetsService")
	private AdministAssetsService administAssetsService;
	
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;
	
	private static final Logger logger = LoggerFactory.getLogger(AdministAssetsMngController.class);
	
	/**
	 * 행정자산관리 목록 조회
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectAdministAssetsInfoList.do")
	public String selectAdministAssetsMngList(ModelMap model) throws Exception {
		logger.info("selectAdministAssetsMngList.do");
		
		return "egiskorea/com/job/adas/asmng/selectAdministAssetsInfoList";
	}
	
	/**
	 * 등록 화면 호출
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertAdministAssets.do")
	public String insertAdministAssets(
//			AdministAssetsVO administAssetsVO,
//			ModelMap model
			) throws Exception {
		
		return "egiskorea/com/job/adas/asmng/insertAdministAssets";
	}
}
