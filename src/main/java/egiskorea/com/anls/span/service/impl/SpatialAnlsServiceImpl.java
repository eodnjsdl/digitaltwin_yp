package egiskorea.com.anls.span.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.anls.span.service.SpatialAnlsService;


@Service("spatialAnlsService")
public class SpatialAnlsServiceImpl implements  SpatialAnlsService{

	@Resource(name = "spatialAnlsDAO")
	private  SpatialAnlsDAO spatialAnlsDAO;
	
	@Override
	public List<Map<String, Object>> selectSpAnlsList(Map<String, String> setData) throws Exception {
		
		return spatialAnlsDAO.selectSpAnlsList(setData);
	}

	@Override
	public List<Map<String, Object>> selectSpAnlsList2(Map<String, String> setData) throws Exception {
		
		return spatialAnlsDAO.selectSpAnlsList2(setData);
	}

	@Override
	public Map<String, Object> selectCenterPoint(Map<String, String> setData) throws Exception {
		
		return spatialAnlsDAO.selectCenterPoint(setData);
	}

	@Override
	public Map<String, Object> create3DBuffer(Map<String, String> setData) throws Exception {
		
		return spatialAnlsDAO.create3DBuffer(setData);
	}

}
