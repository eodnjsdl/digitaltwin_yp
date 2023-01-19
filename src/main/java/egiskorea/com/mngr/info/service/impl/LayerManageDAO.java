package egiskorea.com.mngr.info.service.impl;

import java.util.List;

/**
 * @Description 레이어 관리 dao 클래스
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
 *  2022.02.24   정수환           LayerAttribute 추가
 *  </pre>
 */

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.lyr.lyi.service.LayerAttribute;
import egiskorea.com.lyr.lyi.service.LayerSet;

@Repository("layerManageDAO")
public class LayerManageDAO extends ComAbstractDAO {
	
	/**
	 * 
	 * @Description : 레이어 전체 검색 
	 * @Author 최원석
	 * @Date 2022.02.23
	 * @return
	 * @throws Exception
	 */
	public List<LayerSet> selectAllLayerManageList() throws Exception {
		return selectList("layerManage.selectAllLayerManageList");
	}

	/**
	 * 레이어 관리 목록 조회
	 * @param LayerSet
	 * @return List(LayerSet)
	 * @throws Exception
	 */
	public List<LayerSet> selectLayerManageList(LayerSet layerSet) throws Exception {
		return selectList("layerManage.selectLayerManageList", layerSet);
	}
	
   /**
	 * 레이어 총 갯수를 조회한다.
     * @param LayerSet
     * @return int(레이어 총 갯수)
     */
	public int selectLayerManageListTot(LayerSet layerSet) throws Exception{
		return (Integer) selectOne("layerManage.selectLayerManageListTot", layerSet);
	}
	
	/**
	 * 레이어 레이어셋을 조회한다.
	 * @param LayerSet
	 * @return LayerSet
	 */
	public LayerSet selectLayerSet(LayerSet layerSet) throws Exception{
		return selectOne("layerManage.selectLayerSet", layerSet);
	}
	
	/**
	 * 레이어 속성을 조회한다.
	 * @param LayerAttribute
	 * @return LayerAttribute
	 */
	public List<LayerAttribute> selectLayerAttributeList(LayerAttribute layerAttribute) throws Exception{
		return selectList("layerManage.selectLayerAttributeList", layerAttribute);
	}
	
	/**
	 * 레이어 속성 총 갯수를 조회한다.
     * @param LayerAttribute
     * @return int(레이어 속성 총 갯수)
     */
	public int selectLayerAttributeListTot(LayerSet layerSet) throws Exception{
		return (Integer) selectOne("layerManage.selectLayerAttributeListTot", layerSet);
	}

}
