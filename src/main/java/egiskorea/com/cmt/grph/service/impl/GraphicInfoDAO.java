package egiskorea.com.cmt.grph.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.cmt.grph.service.GraphicInfoSearchVO;
import egiskorea.com.cmt.grph.service.GraphicInfoVO;
import egiskorea.com.cmt.grph.service.ImageMarkerVO;

/**
 * @Description 그리기정보를 관리하는 dao 클래스
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
@Repository("graphicInfoDAO")
public class GraphicInfoDAO extends ComAbstractDAO {
	
  /**
   * 그래픽 분류 목록
   * @Description : 그래픽 분류 목록 
   * @Author 최원석
   * @Date 2022.01.29
   * @return 그래픽 분류 목록
   */
  public List<?> selectGraphicClassificationList() {
	  return selectList("graphicInfo.selectGraphicClassificationList");
  }
  
  /**
   * 그래픽 정보 목록
   * @Description : 그래픽 정보 목록 
   * @Author 최원석
   * @Date 2022.01.29
   * @param graphicInfoSearchVO 그래픽 검색 vo
   * @return 그래픽 정보 목록
   */
  public List<?> selectGraphicInfoList(GraphicInfoSearchVO graphicInfoSearchVO) {
	  return selectList("graphicInfo.selectGraphicInfoList", graphicInfoSearchVO);
  }
	
  /**
   * 그래픽 정보 검색 건 수
   * @Description : 그래픽 정보 검색 건 수 
   * @Author 최원석
   * @Date 2022.01.29
   * @param graphicInfoSearchVO 그래픽 검색 vo
   * @return 검색 건 수
   */
  public int selectGraphicInfoListCnt(GraphicInfoSearchVO graphicInfoSearchVO) {
    return (Integer) selectOne("graphicInfo.selectGraphicInfoListCnt", graphicInfoSearchVO);
  }
  
  /**
   * 그래픽 정보 상세 조회
   * @Description : 그래픽 정보 상세 조회 
   * @Author 최원석
   * @Date 2022.01.29
   * @param grphcId 그래픽 정보 아이디
   * @return 그래픽 정보 vo
   */
  public GraphicInfoVO selectGraphicInfo(String grphcId) {
	  return (GraphicInfoVO) selectOne("graphicInfo.selectGraphicInfo", grphcId);
  }

  /**
   * 그래픽 정보 등록
   * @Description : 그래픽 정보 등록 
   * @Author 최원석
   * @Date 2022.01.29
   * @param graphicInfoVO 그래픽 정보 vo
   */
  public void insertGraphicInfo(GraphicInfoVO graphicInfoVO) {
    insert("graphicInfo.insertGraphicInfo", graphicInfoVO);
  }
  
  /**
   * 그래픽 정보 수정
   * @Description : 그래픽 정보 수정 
   * @Author 최원석
   * @Date 2022.01.29
   * @param graphicInfoVO 그래픽 정보 vo
   */
  public void updateGraphicInfo(GraphicInfoVO graphicInfoVO) {
	update("graphicInfo.updateGraphicInfo", graphicInfoVO);
  }
  
  /**
   * 그래픽 정보 삭제
   * @Description : 그래픽 정보 삭제 
   * @Author 최원석
   * @Date 2022.01.29
   * @param grphcId 그래픽 정보 아이디
   */
  public void deleteGraphicInfo(String grphcId) {
	delete("graphicInfo.deleteGraphicInfo", grphcId);
  }
  
  /**
   * 이미지 마커 목록
   * @Description : 이미지 마커 목록
   * @Author 최원석
   * @Date 2022.01.29
   * @param imageMarkerVO 이미지 마커 vo
   * @return 이미지 마커 목록
   */
  public List<?> selectImageMarkerList(ImageMarkerVO imageMarkerVO) {
	  return selectList("graphicInfo.selectImageMarkerList", imageMarkerVO);
  }
  
  /**
   * 이미지 마커 등록
   * @Description : 이미지 마커 등록 
   * @Author 최원석
   * @Date 2022.01.29
   * @param imageMarkerVO 이미지 마커 vo
   */
  public void insertImageMarker(ImageMarkerVO imageMarkerVO) {
	insert("graphicInfo.insertImageMarker", imageMarkerVO);
  }

  /**
   * 이미지 마커 삭제
   * @Description : 이미지 마커 삭제 
   * @Author 최원석
   * @Date 2022.01.29
   * @param mkrId 마커 아이디
   */
  public void deleteImageMarker(String mkrId) {
    delete("graphicInfo.deleteImageMarker", mkrId);
  }
}
