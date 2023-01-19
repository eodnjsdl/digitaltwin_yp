package egiskorea.com.lyr.lyi.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.lyr.dtcv.service.MapsData;
import egiskorea.com.lyr.lyi.service.LayerAttribute;
import egiskorea.com.lyr.lyi.service.LayerInfoService;
import egiskorea.com.lyr.lyi.service.LayerInfoVO;
import egiskorea.com.lyr.lyi.service.LayerSet;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 레이어 정보 serviceImpl 클래스
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

@Service("layerInfoService")
public class LayerInfoServiceImpl extends EgovAbstractServiceImpl implements LayerInfoService{
	
	@Resource(name = "layerInfoDAO")
	private LayerInfoDAO layerInfoDAO;
	
	/**
	 * @Description 레이어셋 정보 조회 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.02.25
	 * @param layerInfoVO
	 * @return
	 * @throws Exception
	 */
	public LayerSet selectLayerSetInfo(LayerInfoVO layerInfoVO) throws Exception{
		return layerInfoDAO.selectLayerSetInfo(layerInfoVO);
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
		return layerInfoDAO.selectLayerInfo(layerInfoVO);
	}
	
	/**
	 * @Description 레이어셋 정보 삽입 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.02
	 * @param layerSet
	 * @throws Exception
	 */
	public void insertLayerSetInfo(LayerSet layerSet) throws Exception {
		layerInfoDAO.insertLayerSetInfo(layerSet);
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
		return layerInfoDAO.selectLayerAttributeList(layerInfoVO);
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
		return layerInfoDAO.selectLayerExpressionAttribute(layerInfoVO);
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
		return layerInfoDAO.selectLayerInfoList(layerInfoVO);
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
		return layerInfoDAO.selectLayerAttributeInfo(layerInfoVO);
	}
	
	/**
	 * @Description 레이어 속정 정보 삽입
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.15
	 * @param layerAttribtue
	 * @throws Exception
	 */
	public void insertLayerAttributeInfo(LayerAttribute layerAttribtue) throws Exception{
		layerInfoDAO.insertLayerAttributeInfo(layerAttribtue);
	}
	
	/**
	 * @Description 레이어셋 정보 수정 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.16
	 * @param layerSet
	 * @throws Exception
	 */
	public void updateLayerSetInfo(LayerSet layerSet) throws Exception {
		layerInfoDAO.updateLayerSetInfo(layerSet);
	}
	
	/**
	 * @Description 레이어속성 정보 수정 
	 * @Author 플랫폼개발부문 DT솔루션 김선옥
	 * @Date 2022.03.17
	 * @param layerAttribute
	 * @throws Exception
	 */
	public void updateLayerAttributeInfo(LayerAttribute layerAttribute) throws Exception {
		layerInfoDAO.updateLayerAttributeInfo(layerAttribute);
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
		return layerInfoDAO.selectCsvLayerInfo(mapsData);
	}
}
