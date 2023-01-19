package egiskorea.com.lyr.lyi.service.impl;

/**
 * @Description 레이어 정보 dao 클래스
 * @author 플랫폼개발부문 DT솔루션 김선옥
 * @since 2022.02.25
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.25   김선옥           최초 생성
 *  </pre>
 */

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.lyr.dtcv.service.MapsData;
import egiskorea.com.lyr.lyi.service.LayerAttribute;
import egiskorea.com.lyr.lyi.service.LayerInfoVO;
import egiskorea.com.lyr.lyi.service.LayerSet;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("layerInfoDAO")
public class LayerInfoDAO extends ComAbstractDAO {
	
	/**
	 * @Description 레이어셋 정보 조회 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.02.25
	 * @param layerInfoVO
	 * @return
	 * @throws Exception
	 */
	public LayerSet selectLayerSetInfo(LayerInfoVO layerInfoVO) throws Exception {
		return selectOne("layerInfo.selectLayerSetInfo", layerInfoVO);
	}
	
	/**
	 * @Description 레이어 정보 조회 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.02
	 * @param layerInfoVO
	 * @return
	 * @throws Exception
	 */
	public LayerSet selectLayerInfo(LayerInfoVO layerInfoVO) throws Exception {
		return selectOne("layerInfo.selectLayerInfo", layerInfoVO);
	}
	
	/**
	 * @Description 레이어셋 정보 삽입 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.02
	 * @param layerSet
	 * @throws Exception
	 */
	public void insertLayerSetInfo(LayerSet layerSet) throws Exception {
		insert("layerInfo.insertLayerSetInfo", layerSet);
	}
	
	/**
	 * @Description 레이어 속성 리스트 조회 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.03
	 * @param layerInfoVO
	 * @return
	 * @throws Exception
	 */
	public List<LayerAttribute> selectLayerAttributeList(LayerInfoVO layerInfoVO) throws Exception {
		return selectList("layerInfo.selectLayerAttributeList", layerInfoVO);
	}
	
	/**
	 * @Description 레이어 표현 속성 조회 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.08
	 * @param layerInfoVO
	 * @return
	 * @throws Exception
	 */
	public LayerAttribute selectLayerExpressionAttribute(LayerInfoVO layerInfoVO) throws Exception {
		return selectOne("layerInfo.selectLayerExpressionAttribute", layerInfoVO);
	}
	
	/**
	 * @Description 레이어 정보 리스트 조회 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.08
	 * @param layerInfoVO
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectLayerInfoList(LayerInfoVO layerInfoVO) throws Exception {
		return selectList("layerInfo.selectLayerInfoList", layerInfoVO);
	}
	
	/**
	 * @Description 레이어 속성 정보 조회
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.14
	 * @param layerInfoVO
	 * @return
	 * @throws Exception
	 */
	public List<LayerAttribute> selectLayerAttributeInfo(LayerInfoVO layerInfoVO) throws Exception {
		return selectList("layerInfo.selectLayerAttributeInfo", layerInfoVO);
	}
	
	/**
	 * @Description 레이어 속정 정보 삽입
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.15
	 * @param layerAttribtue
	 * @throws Exception
	 */
	public void insertLayerAttributeInfo(LayerAttribute layerAttribtue) throws Exception{
		insert("layerInfo.insertLayerAttributeInfo", layerAttribtue);
	}
	
	/**
	 * @Description 레이어셋 정보 수정 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.16
	 * @param layerSet
	 * @throws Exception
	 */
	public void updateLayerSetInfo(LayerSet layerSet) throws Exception {
		update("layerInfo.updateLayerSetInfo", layerSet);
	}
	
	/**
	 * @Description 레이어속성 정보 수정 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.17
	 * @param layerAttribute
	 * @throws Exception
	 */
	public void updateLayerAttributeInfo(LayerAttribute layerAttribute) throws Exception {
		update("layerInfo.updateLayerAttributeInfo", layerAttribute);
	}
	
	/**
	 * @Description CSV 레이어 정보 조회 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.25
	 * @param mapsData
	 * @return
	 * @throws Exception
	 */
	public MapsData selectCsvLayerInfo(MapsData mapsData) throws Exception {
		return selectOne("layerInfo.selectCsvLayerInfo", mapsData);
	}
}
