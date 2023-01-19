package egiskorea.com.geo.map.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.geo.map.service.MapService;
import egiskorea.com.geo.map.service.MapVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;


@Service("MapService")
public class MapServiceImpl extends EgovAbstractServiceImpl implements MapService {

	@Resource(name = "MapDAO")
    private MapDAO mapDAO;
	
	/**
	 * 사용자 지도 설정을 조회한다.
	 */
	public MapVO selectUserSetup(MapVO mapVO) throws Exception {
		return mapDAO.selectUserSetup(mapVO);
	}
	
	/**
	 * 사용자 지도 설정을 수정한다.
	 */
	public void updateUserSetup(MapVO mapVO) throws Exception {
		mapDAO.updateUserSetup(mapVO);
	}
	
	/**
	 * 사용자 지도 설정을 추가한다.
	 */
	public void insertUserSetup(MapVO mapVO) throws Exception {
		mapDAO.insertUserSetup(mapVO);
	}
}
