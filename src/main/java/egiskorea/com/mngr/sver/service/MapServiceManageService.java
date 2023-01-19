package egiskorea.com.mngr.sver.service;

import egiskorea.com.mngr.info.service.ThemaMapVO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @description : 지도서비스 관리 service 인터페이스
 * @packageName : egiskorea.com.mngr.sver.service
 * @Class : MapServiceManageService
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022-02-16
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 * 수정일               수정자            수정내용
 * ----------   --------   ---------------------------
 * 2022-02-16		이준호	최초 생성
 *
 */

public interface MapServiceManageService {

    /**
     * @Description 지도서비스 관리 목록 조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return List(MapServiceVO) 지도서비스 관리 목록
     * @throws Exception
     */
    public List<MapServiceVO> selectMapServiceManageList(MapServiceVO mapServiceVO) throws Exception;

    /**
     * @Description 지도서비스 관리 목록 갯수
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return int(지도서비스 전체목록 갯수)
     * @throws Exception
     */
    public int selectMapServiceManageListCnt(MapServiceVO mapServiceVO) throws Exception;

    /**
     * @Description 지도서비스 관리 등록
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int insertMapServiceManage(MapServiceVO mapServiceVO) throws Exception;

    /**
     * @Description 지도서비스 관리 상세조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return MapServiceVO(지도서비스)
     * @throws Exception
     */
    public MapServiceVO selectMapServiceManage(MapServiceVO mapServiceVO) throws Exception;

    /**
     * @Description 지도서비스 관리 수정
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int updateMapServiceManage(MapServiceVO mapServiceVO) throws Exception;

    /**
     * @Description 지도서비스 관리 삭제
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int deleteMapServiceManage(MapServiceVO mapServiceVO) throws Exception;

    /**
     * @Description 업로드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.24
     * @param multipartFile
     * @param mapServiceVO
     * @return {true|false} 성공시 true, 실패시 false
     */
    public boolean fileUpload(MultipartFile multipartFile, MapServiceVO mapServiceVO);

    /**
     * @Description 첨부파일 삭제후 디비도 업데이트 해주는 메소드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.24
     * @param oldMapServiceVO
     * @throws Exception
     */
    public int fileDelete(MapServiceVO oldMapServiceVO) throws Exception;
}
