package egiskorea.com.mngr.info.service;

import java.util.List;

import egiskorea.com.lyr.lyi.service.LayerAttribute;
import egiskorea.com.lyr.lyi.service.LayerSet;
import egiskorea.com.lyr.lym.service.LayerRegisterInfo;

/**
 * @Description 레이어 관리 service 클래스
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
 *  2022.02.15   정수환
 *  2022.02.23	 최원석	    레이어 전체 검색 추가
 *  </pre>
 */

public interface LayerManageService {
	
	/**
	 * 
	 * @Description : 레이어 전체 검색 
	 * @Author 최원석
	 * @Date 2022.02.23
	 * @return
	 * @throws Exception
	 */
	public List<LayerSet> selectAllLayerManageList() throws Exception;
	
	/**
	 * 레이어 총 갯수를 조회한다.
	 * 
	 * @param LayerSet
	 * @return int(레이어 총 갯수)
	 * @throws Exception 
	 */
	int selectLayerManageListTot(LayerSet layerSet) throws Exception;
	
	/**
	 * 레이어 관리 목록 조회
	 * @param LayerSet
	 * @return List(LayerSet)
	 * @throws Exception
	 */
	public List<LayerSet> selectLayerManageList(LayerSet layerSet) throws Exception;
	
	/**
	 * 레이어 레이어셋을 조회한다.
	 * @param LayerSet
	 * @return LayerSet
	 * @throws Exception
	 */
	LayerSet selectLayerSet(LayerSet layerSet) throws Exception;
	

	/**
	 * 레이어 속성 목록 조회
	 * @param LayerAttribute
	 * @return List(LayerAttribute)
	 * @throws Exception
	 */
	public List<LayerAttribute> selectLayerAttributeList(LayerAttribute layerAttribute) throws Exception;
	
	/**
	 * 레이어 속성 총 갯수를 조회한다.
	 * 
	 * @param LayerAttribute
	 * @return int(레이어 속성 총 갯수)
	 * @throws Exception 
	 */
	int selectLayerAttributeListTot(LayerSet layerSet) throws Exception;
}
