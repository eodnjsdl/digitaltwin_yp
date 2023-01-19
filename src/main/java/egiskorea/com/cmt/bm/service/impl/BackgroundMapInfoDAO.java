package egiskorea.com.cmt.bm.service.impl;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.mngr.sver.service.MapServiceVO;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @description : 배경지도 DAO 클래스
 * @packageName : egiskorea.com.cmt.bm.service.impl
 * @Class : BackgroundMapInfoDAO
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022-03-07
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 * 수정일               수정자            수정내용
 * ----------   --------   ---------------------------
 * 2022-03-07		이준호	최초 생성
 */

@Repository(value = "backgroundMapInfoDAO")
public class BackgroundMapInfoDAO extends ComAbstractDAO {

    /**
     * @Description 배경지도 사용하는 목록 전체 조회하는 쿼리
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.07
     * @param mapServiceVO
     * @return List(MapServiceVO)
     * @throws Exception
     */
    public List<MapServiceVO> selectBackgroundMapInfoList(MapServiceVO mapServiceVO) throws Exception {
        return selectList("backgroundMapInfo.selectBackgroundMapInfoList", mapServiceVO);
    }

    /**
     * @Description 기본배경지도로 등록된 배경지도 정보를 조회하는 쿼리
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.04.08
     * @return mapServiceVO
     * @throws Exception
     */
    public MapServiceVO selectBackgroundMapBasicAtInfo() {
        return (MapServiceVO) selectOne("backgroundMapInfo.selectBackgroundMapBasicAtInfo");
    }
}
