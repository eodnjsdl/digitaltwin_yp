package egiskorea.com.mngr.info.service.impl;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.mngr.info.service.ThemaMapVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description 주제도 관리 DAO 클래스
 * @packageName egiskorea.com.mngr.info.service.impl
 * @Class ThematicMapManageDAO
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.02.08
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.08   이준호           최초 생성
 *  </pre>
 */

@Repository(value = "thematicMapManageMapper")
public class ThematicMapManageDAO extends ComAbstractDAO {

    /**
     * @Description 주제도관리 목록 조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.08
     * @param themaMapVO
     * @return List(ThemaMapVO) 주제도 관리 목록
     * @throws Exception
     */
    public List<ThemaMapVO> selectTMapManageList(ThemaMapVO themaMapVO) throws Exception {
        return selectList("thematicMapManage.selectTMapManageList", themaMapVO);
    };

    /**
     * @Description 주제도관리 목록 갯수
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.08
     * @param themaMapVO
     * @return int 주제도관리 전체목록 갯수
     * @throws Exception
     */
    public int selectTMapManageListCnt(ThemaMapVO themaMapVO) throws Exception {
        return (Integer) selectOne("thematicMapManage.selectTMapManageListCnt", themaMapVO);
    };

    /**
     * @Description 주제도관리 등록
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.10
     * @param themaMapVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int insertTMapManage(ThemaMapVO themaMapVO) throws Exception {
        return insert("thematicMapManage.insertTMapManage", themaMapVO);
    };

    /**
     * @Description 주제도관리 상세조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @return ThemaMapVO(주제도관리)
     * @throws Exception
     */
    public ThemaMapVO selectTMapManage(ThemaMapVO themaMapVO) throws Exception {
        return (ThemaMapVO) selectOne("thematicMapManage.selectTMapManage", themaMapVO);
    };

    /**
     * @Description 주제도관리 수정
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int updateTMapManage(ThemaMapVO themaMapVO) throws Exception {
        return update("thematicMapManage.updateTMapManage", themaMapVO);
    };

    /**
     * @Description 주제도관리 삭제
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int deleteTMapManage(ThemaMapVO themaMapVO) throws Exception {
       return delete("thematicMapManage.deleteTMapManage", themaMapVO);
    };
}
