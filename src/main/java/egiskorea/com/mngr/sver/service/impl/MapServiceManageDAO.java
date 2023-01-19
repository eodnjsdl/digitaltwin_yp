package egiskorea.com.mngr.sver.service.impl;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.mngr.info.service.ThemaMapVO;
import egiskorea.com.mngr.sver.service.MapServiceVO;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @description : 지도서비스 관리 DAO 클래스
 * @packageName : egiskorea.com.mngr.sver.service.impl
 * @Class : MapServiceManageDAO
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
 */

@Repository(value = "mapServiceManageDAO")
public class MapServiceManageDAO extends ComAbstractDAO {

    /**
     * @Description 지도서비스관리 목록 조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return List(ThemaMapVO) 지도서비스관리 목록
     * @throws Exception
     */
    public List<MapServiceVO> selectMapServiceManageList(MapServiceVO mapServiceVO) throws Exception {
        return selectList("mapServiceManage.selectMapServiceManageList", mapServiceVO);
    };

    /**
     * @Description 지도서비스관리 목록 갯수
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return int 지도서비스관리 전체목록 갯수
     * @throws Exception
     */
    public int selectMapServiceManageListCnt(MapServiceVO mapServiceVO) throws Exception {
        return (Integer) selectOne("mapServiceManage.selectMapServiceManageListCnt", mapServiceVO);
    };

    /**
     * @Description 지도서비스관리 등록
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int insertMapServiceManage(MapServiceVO mapServiceVO) throws Exception {
        return insert("mapServiceManage.insertMapServiceManage", mapServiceVO);
    };

    /**
     * @Description 지도서비스관리 상세조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return ThemaMapVO(지도서비스관리)
     * @throws Exception
     */
    public MapServiceVO selectMapServiceManage(MapServiceVO mapServiceVO) throws Exception {
        return (MapServiceVO) selectOne("mapServiceManage.selectMapServiceManage", mapServiceVO);
    };

    /**
     * @Description 지도서비스관리 수정
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int updateMapServiceManage(MapServiceVO mapServiceVO) throws Exception {
        return update("mapServiceManage.updateMapServiceManage", mapServiceVO);
    };

    /**
     * @Description 지도서비스관리 삭제
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int deleteMapServiceManage(MapServiceVO mapServiceVO) throws Exception {
        return delete("mapServiceManage.deleteMapServiceManage", mapServiceVO);
    };

    /**
     * @Description 지도서비스 첨부파일 이름 비워주는 쿼리
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.24
     * @param mapServiceVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int updateMapServiceManageFileDelete(MapServiceVO mapServiceVO) throws Exception {
        return update("mapServiceManage.updateMapServiceManageFileDelete", mapServiceVO);
    }

    /**
     * @Description mapserviceId값을 포함하지 않는 배경지도사용여부 값 변경 해주는 메소드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.04.08
     * @param mapServiceVO
     * @throws Exception
     */
    public void updateMapServiceBasicAt(MapServiceVO mapServiceVO) throws Exception {
        update("mapServiceManage.updateMapServiceBasicAt", mapServiceVO);
    }
}
