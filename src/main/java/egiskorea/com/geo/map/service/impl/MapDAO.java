package egiskorea.com.geo.map.service.impl;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.geo.map.service.MapVO;
import egovframework.com.sym.ccm.cca.service.CmmnCode;

@Repository("MapDAO")
public class MapDAO extends ComAbstractDAO {
	
	/**
	 * 사용자 지도 설정을 조회한다.
	 * @param mapVO
	 * @throws Exception
	 */
	public MapVO selectUserSetup(MapVO mapVO) throws Exception {
		return (MapVO) selectOne("Map.selectUserSetup", mapVO);
	}
	
	/**
	 * 사용자 지도 설정을 수정한다.
	 * @param mapVO
	 * @throws Exception
	 */
	public void updateUserSetup(MapVO mapVO) throws Exception {
		update("Map.updateUserSetup", mapVO);
	}
	
	/**
	 * 사용자 지도 설정을 추가한다.
	 * @param mapVO
	 * @throws Exception
	 */
	public void insertUserSetup(MapVO mapVO) throws Exception{
		insert("Map.insertUserSetup", mapVO);
	}

}
