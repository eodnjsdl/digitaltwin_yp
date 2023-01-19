package egiskorea.com.anls.span.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


import egiskorea.com.cmm.service.impl.ComAbstractDAO;

@Repository("spatialAnlsDAO")
public class SpatialAnlsDAO extends ComAbstractDAO {

	public List<Map<String,Object>> selectSpAnlsList(Map<String, String> setData) throws Exception {
		
		return selectList("selectSpAnlsList",setData);
	}

	public List<Map<String, Object>> selectSpAnlsList2(Map<String, String> setData) {
		
		return selectList("selectSpAnlsList2",setData);
	}

	public Map<String, Object> selectCenterPoint(Map<String, String> setData) {
		
		return selectOne("selectCenterPoint",setData);
	}

	public Map<String, Object> create3DBuffer(Map<String, String> setData) {
		
		return selectOne("create3DBuffer",setData);
	}
}
