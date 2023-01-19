package egiskorea.com.lyr.lym.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.lyr.lym.service.LayerManagementService;
import egiskorea.com.lyr.lym.service.LayerManagementVO;
import egiskorea.com.lyr.lym.service.LayerRegisterInfo;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 레이어 관리 serviceImpl 클래스
 * @author 플랫폼개발부문 DT솔루션 김선옥
 * @since 2021.12.22
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.22   김선옥           최초 생성
 *  </pre>
 */

@Service("layerManagementService")
public class LayerManagementServiceImpl extends EgovAbstractServiceImpl implements LayerManagementService{
	
	@Resource(name = "layerManagementDAO")
	private LayerManagementDAO layerManagementDAO;
	
	/**
	 * 레이어 관리 목록 조회
	 * @param layerManagementVO
	 * @return
	 * @throws Exception
	 */
	public List<LayerManagementVO> selectLayerManagementList(LayerManagementVO layerManagementVO) throws Exception{
		return layerManagementDAO.selectLayerManagementList(layerManagementVO);
	}
	
	/**
	 * 레이어 관리 정보 삭제
	 * @param layerManagementVO
	 * @throws Exception
	 */
	public void deleteLayerManagementInfo(LayerManagementVO layerManagementVO) throws Exception{
		layerManagementDAO.deleteLayerManagementInfo(layerManagementVO);
	}
	
	/**
	 * 개인별 레이어 리스트 항목 추가
	 * @param layerManagementVO
	 * @throws Exception
	 */
	public void insertLayerListInfo(LayerManagementVO layerManagementVO) throws Exception {
		layerManagementDAO.insertLayerListInfo(layerManagementVO);
	}
	
	/**
	 * 개인별 레이어 목록 조회
	 * @param layerManagementVO
	 * @return
	 * @throws Exception
	 */
	public List<LayerManagementVO> selectLayerList(LayerManagementVO layerManagementVO) throws Exception{
		return layerManagementDAO.selectLayerList(layerManagementVO);
	}
	
	/**
	 * 개인별 레이어 목록 항목 제거
	 * @param layerManagementVO
	 * @throws Exception
	 */
	public void deleteLayerListInfo(LayerManagementVO layerManagementVO) throws Exception {
		layerManagementDAO.deleteLayerListInfo(layerManagementVO);
	}
	
	
	/**
	 * @Description 레이어 등록정보 등록 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.03.21
	 */
	public void insertLayerRegisterInfo(LayerRegisterInfo layerRegisterInfo) throws Exception{
		layerManagementDAO.insertLayerRegisterInfo(layerRegisterInfo);		
	}
}
