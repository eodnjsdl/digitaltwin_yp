package egiskorea.com.cmt.grph.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.cmt.grph.service.GraphicInfoSearchVO;
import egiskorea.com.cmt.grph.service.GraphicInfoService;
import egiskorea.com.cmt.grph.service.GraphicInfoVO;
import egiskorea.com.cmt.grph.service.ImageMarkerVO;
import egovframework.rte.fdl.cmmn.exception.FdlException;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

/**
 * @Description 그리기정보를 관리하는 service 구현 클래스
 *
 * @author 최원석
 * @since 2022.01.27
 * @version 1.0
 * @see
 *     <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.27	 최원석	최초 생성
 *  </pre>
 */
@Service("graphicInfoService")
public class GraphicInfoServiceImpl implements GraphicInfoService {

  /** 그리기 정보 dao */
  @Resource GraphicInfoDAO graphicInfoDAO;
  
  /** 그래픽 정보 아이디 생성 서비스 */
  @Resource(name="tbdGrphcInfoIdGnrService") 
  EgovIdGnrService tbdGrphcInfoIdGnrService;
  
  /** 이미지 마커 아이디 생성 서비스 */
  @Resource(name="tbdImageMkrIdGnrService") 
  EgovIdGnrService tbdImageMkrIdGnrService;

  /**
   *  그래픽 분류 목록
   */
  @Override
  public List<?> selectGraphicClassificationList() {
    return graphicInfoDAO.selectGraphicClassificationList();
  }

  /**
   * 그래픽 정보 목록
   */
  @Override
  public Map<String, Object> selectGraphicInfoList(GraphicInfoSearchVO graphicInfoSearchVO) {
    Map<String, Object> map = new HashMap<String, Object>();
    List<?> list = graphicInfoDAO.selectGraphicInfoList(graphicInfoSearchVO);
    int cnt = graphicInfoDAO.selectGraphicInfoListCnt(graphicInfoSearchVO);
    map.put("resultList", list);
    map.put("resultCnt", cnt);
    return map;
  }

  /**
   * 그래픽 정보 상세 정보
   */
  @Override
  public GraphicInfoVO selectGraphicInfo(String grphcId) {
    return graphicInfoDAO.selectGraphicInfo(grphcId);
  }

  /**
   * 그래픽 등록 
   */
  @Override
  public void insertGraphicInfo(GraphicInfoVO graphicInfoVO) throws FdlException {
	  String nextId = tbdGrphcInfoIdGnrService.getNextStringId();
	  graphicInfoVO.setGrphcId(nextId);
	  graphicInfoDAO.insertGraphicInfo(graphicInfoVO);
  }

  /**
   * 그래픽 수정
   */
  @Override
  public void updateGraphicInfo(GraphicInfoVO graphicInfoVO) {
	  graphicInfoDAO.updateGraphicInfo(graphicInfoVO);
  }

  /**
   * 그래픽 삭제
   */
  @Override
  public void deleteGraphicInfo(String grphcId) {
	  graphicInfoDAO.deleteGraphicInfo(grphcId);
  }

  /**
   * 이미지 마커 목록
   */
  @Override
  public List<?> selectImageMarkerList(ImageMarkerVO imageMarkerVO) {
	  return graphicInfoDAO.selectImageMarkerList(imageMarkerVO);
  }

  /**
   * 이미지 마커 등록
   */
  @Override
  public void insertImageMarker(ImageMarkerVO imageMarkerVO) throws FdlException {
	  String nextID = tbdImageMkrIdGnrService.getNextStringId();
	  imageMarkerVO.setMkrId(nextID);
	  graphicInfoDAO.insertImageMarker(imageMarkerVO);
  }

  /**
   * 이미지 마커 삭제
   */
  @Override
  public void deleteImageMarker(String mkrId) {
	  graphicInfoDAO.deleteImageMarker(mkrId);
  }

	@Override
	public void updateGrphicPnrsAtBundle(GraphicInfoVO graphicInfoVO) {
		graphicInfoDAO.updateGrphicPnrsAtBundle(graphicInfoVO);
	}
}
