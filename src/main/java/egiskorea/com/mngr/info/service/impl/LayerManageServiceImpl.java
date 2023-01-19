package egiskorea.com.mngr.info.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.lyr.lyi.service.LayerAttribute;
import egiskorea.com.lyr.lyi.service.LayerSet;
import egiskorea.com.lyr.lym.service.LayerRegisterInfo;
import egiskorea.com.mngr.info.service.LayerManageService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 레이어 관리 serviceImpl 클래스
 * @author 플랫폼개발부문 DT솔루션 김선옥
 * @since 2022.02.15
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.15   김선옥           최초 생성
 *  2022.02.15	  정수환
 *  2022.02.23	 최원석	    레이어 전체 검색 추가
 *  </pre>
 */

@Service("layerManageService")
public class LayerManageServiceImpl extends EgovAbstractServiceImpl implements LayerManageService{
	
	@Resource(name = "layerManageDAO")
	private LayerManageDAO layerManageDAO;
	
	/**
	 * 레이어 전체 검색
	 */
	@Override
	public List<LayerSet> selectAllLayerManageList() throws Exception {
	  return layerManageDAO.selectAllLayerManageList();
	}
	
	/**
	 * 레이어 총 갯수를 조회한다.
	 * 
	 * @param LayerSet
	 * @return int(레이어 총 갯수)
	 * @throws Exception 
	 */
	public int selectLayerManageListTot(LayerSet layerSet) throws Exception {
		return layerManageDAO.selectLayerManageListTot(layerSet);
	}
	
	/**
	 * 레이어 관리 목록 조회
	 * @param LayerSet
	 * @return List(LayerSet)
	 * @throws Exception
	 */
	public List<LayerSet> selectLayerManageList(LayerSet layerSet) throws Exception {
		return  layerManageDAO.selectLayerManageList(layerSet);
	}
	
	/**
	 * 레이어 레이어셋을 조회한다.
	 * @param LayerSet
	 * @return LayerSet
	 * @throws Exception
	 */
	public LayerSet selectLayerSet(LayerSet layerSet) throws Exception {
		LayerSet ret = layerManageDAO.selectLayerSet(layerSet);
    	return ret; 
	}
	
	/**
	 * 레이어 속성을 조회한다.
	 * @param LayerAttribute
	 * @return List(LayerAttribute)
	 * @throws Exception
	 */
	public List<LayerAttribute> selectLayerAttributeList(LayerAttribute layerAttribute) throws Exception {
		return  layerManageDAO.selectLayerAttributeList(layerAttribute);
	}

	/**
	 * 레이어 속성 총 갯수를 조회한다.
	 * 
	 * @param LayerAttribute
	 * @return int(레이어 속성 총 갯수)
	 * @throws Exception 
	 */
	public int selectLayerAttributeListTot(LayerSet layerSet) throws Exception {
		return layerManageDAO.selectLayerAttributeListTot(layerSet);
	}
}
