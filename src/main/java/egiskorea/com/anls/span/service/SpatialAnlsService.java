package egiskorea.com.anls.span.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;


@Service("spatialAnlsService")
public interface SpatialAnlsService {

	 /**
	 * @Description : 분석 3d 읍면동 
	 * @Author 이푸름
	 * @Date 2022.03.15
	 * @param setData
	 * @return 
	 * @throws Exception
	 */
	public List<Map<String,Object>> selectSpAnlsList(Map<String, String> setData) throws Exception;
		
	 /**
	 * @Description : 분석 3d 읍면동 
	 * @Author 이푸름
	 * @Date 2022.03.15
	 * @param setData
	 * @return 
	 * @throws Exception
	 */
	public List<Map<String,Object>> selectSpAnlsList2(Map<String, String> setData) throws Exception;
	/**
	 * @Description : umd centroid 
	 * @Author 이푸름
	 * @Date 2022.03.15
	 * @param setData
	 * @return 
	 * @throws Exception
	 */
	public Map<String,Object> selectCenterPoint(Map<String, String> setData) throws Exception;
	
	
	public Map<String,Object> create3DBuffer(Map<String, String> setData) throws Exception;
	
	
	
}
