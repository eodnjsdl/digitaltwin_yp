package egiskorea.com.anls.span.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import egiskorea.com.anls.span.service.SpatialAnlsService;


import egiskorea.com.job.sffm.web.SafetyFacilitiesMngController;
import egovframework.rte.fdl.property.EgovPropertyService;


/**
 * @Description 분석 - 공간분석 3d
 * @author 플랫폼개발부문 DT플랫폼 이푸름
 * @since 2022.03.15
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.15		이푸름	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/anls/span")
public class SpatialAnlsController {
	
	private static final Logger logger = LoggerFactory.getLogger(SafetyFacilitiesMngController.class);

	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	@Resource(name = "spatialAnlsService")
	protected SpatialAnlsService spatialAnlsService ; 
	
	/**
	 * @Description : 공간분석- 조건검색(대상지역, 시설물) 
	 * @Author 이푸름
	 * @Date 2022.03.16
	 * @param Map<String,String> emdCD,dataId
	 * @return	String 
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "selectSpAnlsList.do")
	public String selectSpAnlsList(@RequestParam Map<String, String> setData) throws Exception{
		Gson gson = new Gson();
		String gsList;
		
		String emdCd = setData.get("emdCd");
		
		// 양평군 전체
		if(emdCd == "" || emdCd == null || emdCd.length() == 0) {
			List<Map<String,Object>> result = spatialAnlsService.selectSpAnlsList2(setData);
			 gsList = gson.toJson(result);
			 
		// 분기점
		}else {		
			List<Map<String,Object>> result = spatialAnlsService.selectSpAnlsList(setData);
			 Map<String,Object> center = spatialAnlsService.selectCenterPoint(setData);
			 result.add(center);
			 gsList = gson.toJson(result);
			
		}
	  
		return gsList;
	}
	/**
	 * @Description : 공간분석- 조건검색(대상지역, 시설물) 
	 * @Author 이푸름
	 * @Date 2022.03.16
	 * @param Map<String,String> emdCD,dataId
	 * @return	String 
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "create3DBuffers.do")
	public String create3DBuffers(@RequestParam Map<String, String> setData) throws Exception{
		Gson gson = new Gson();
		String gsList;	
		
		Map<String,Object> result = spatialAnlsService.create3DBuffer(setData);
		gsList = gson.toJson(result);
		
		return gsList;
	}
	
}
