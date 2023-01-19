package egiskorea.com.mngr.info.service;

import java.util.List;

/**
 * @Description 주제도 관리 service 인터페이스
 * @packageName egiskorea.com.mngr.info.service
 * @Class ThematicMapManageService
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.02.07
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.07   이준호           최초 생성
 *  </pre>
 */

public interface ThematicMapManageService {

    /**
     * @Description 주제도관리 목록 조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.08
     * @param themaMapVO
     * @return List(ThemaMapVO) 주제도 관리 목록
     * @throws Exception
     */
    public List<ThemaMapVO> selectTMapManageList(ThemaMapVO themaMapVO) throws Exception;

    /**
     * @Description 주제도관리 목록 갯수
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.08
     * @param themaMapVO
     * @return int 주제도관리 전체목록 갯수
     * @throws Exception
     */
    public int selectTMapManageListCnt(ThemaMapVO themaMapVO) throws Exception;

    /**
     * @Description 주제도관리 등록
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.10
     * @param themaMapVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int insertTMapManage(ThemaMapVO themaMapVO) throws Exception;

    /**
     * @Description 주제도관리 상세조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @return ThemaMapVO(주제도관리)
     * @throws Exception
     */
    public ThemaMapVO selectTMapManage(ThemaMapVO themaMapVO) throws Exception;

    /**
     * @Description 주제도관리 수정
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int updateTMapManage(ThemaMapVO themaMapVO) throws Exception;

    /**
     * @Description 주제도관리 삭제
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int deleteTMapManage(ThemaMapVO themaMapVO) throws Exception;
}
