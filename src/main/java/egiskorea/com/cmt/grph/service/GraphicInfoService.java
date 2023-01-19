package egiskorea.com.cmt.grph.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.fdl.cmmn.exception.FdlException;

/**
 * @Description 그리기정보를 관리하는 service 인터페이스
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
public interface GraphicInfoService {
	
	/**
	 * @Description : 그래픽 분류 목록
	 * @Author 최원석
	 * @Date 2022.01.29
	 * @return 그래픽 분류 목록
	 */
	public List<?> selectGraphicClassificationList();
	
	/**
	 * @Description : 그래픽 정보 목록
	 * @Author 최원석
	 * @Date 2022.01.29
	 * @param graphicInfoSearchVO
	 * @return
	 */
	public Map<String, Object> selectGraphicInfoList(GraphicInfoSearchVO graphicInfoSearchVO);
	
	/**
	 * @Description : 그래픽 정보 상세 정보
	 * @Author 최원석
	 * @Date 2022.01.29
	 * @param grphcId 그래픽 아이디
	 * @return 그래픽 정보 vo
	 */
	public GraphicInfoVO selectGraphicInfo(String grphcId);
	
	/**
	 * @Description : 그래픽 등록 
	 * @Author 최원석
	 * @Date 2022.01.29
	 * @param graphicInfoVO 그래픽 정보 vo
	 * @throws FdlException
	 */
	public void insertGraphicInfo(GraphicInfoVO graphicInfoVO) throws FdlException;
	
	/**
	 * @Description : 그래픽 수정
	 * @Author 최원석
	 * @Date 2022.01.29
	 * @param graphicInfoVO 그래픽 정보 vo
	 */
	public void updateGraphicInfo(GraphicInfoVO graphicInfoVO);
	
	/**
	 * @Description : 그래픽 삭제
	 * @Author 최원석
	 * @Date 2022.01.29
	 * @param grphcId 그래픽 정보 아이디
	 */
	public void deleteGraphicInfo(String grphcId);
	
	/**
	 * @Description : 이미지 마커 목록
	 * @Author 최원석
	 * @Date 2022.01.29
	 * @param imageMarkerVO 이미지 마커 vo
	 * @return 이미지 마커 목록
	 */
	public List<?> selectImageMarkerList(ImageMarkerVO imageMarkerVO);
	
	/**
	 * @Description : 이미지 마커 등록
	 * @Author 최원석
	 * @Date 2022.01.29
	 * @param imageMarkerVO 이미지 마커 vo
	 * @throws FdlException
	 */
	public void insertImageMarker(ImageMarkerVO imageMarkerVO) throws FdlException;
	
	/**
	 * @Description : 이미지 마커 삭제
	 * @Author 최원석
	 * @Date 2022.01.29
	 * @param mkrId 마커 아이디
	 */
	public void deleteImageMarker(String mkrId);
	
}
