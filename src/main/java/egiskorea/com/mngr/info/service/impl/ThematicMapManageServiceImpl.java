package egiskorea.com.mngr.info.service.impl;

import egiskorea.com.mngr.info.service.ThemaMapVO;
import egiskorea.com.mngr.info.service.ThematicMapManageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Description 주제도 관리 service 구현부 클래스
 * @packageName egiskorea.com.mngr.info.service.impl
 * @Class ThematicMapManageServiceImpl
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
@Service(value = "thematicMapManageService")
public class ThematicMapManageServiceImpl implements ThematicMapManageService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ThematicMapManageServiceImpl.class);

    @Resource(name = "thematicMapManageMapper")
    private ThematicMapManageDAO tMapDAO;

    /**
     * @Description 주제도관리 목록 조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.08
     * @param themaMapVO
     * @return List(ThemaMapVO) 주제도 관리 목록
     * @throws Exception
     */
    public List<ThemaMapVO> selectTMapManageList(ThemaMapVO themaMapVO) throws Exception {
        return tMapDAO.selectTMapManageList(themaMapVO);
    }

    /**
     * @Description 주제도관리 목록 갯수
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.08
     * @param themaMapVO
     * @return int 주제도관리 전체목록 갯수
     * @throws Exception
     */
    public int selectTMapManageListCnt(ThemaMapVO themaMapVO) throws Exception {
        return tMapDAO.selectTMapManageListCnt(themaMapVO);
    }

    /**
     * @Description 주제도관리 등록
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.10
     * @param themaMapVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int insertTMapManage(ThemaMapVO themaMapVO) {
        int affectedRow = 0;

        try {
            affectedRow = tMapDAO.insertTMapManage(themaMapVO);
        } catch (Exception e) {
            LOGGER.info("-----------주제도관리 등록 실패-----------");
            LOGGER.debug(e.getMessage());
        }

        return affectedRow;
    }

    /**
     * @Description 주제도관리 상세조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @return ThemaMapVO(주제도관리)
     * @throws Exception
     */
    public ThemaMapVO selectTMapManage(ThemaMapVO themaMapVO) throws Exception {
        return tMapDAO.selectTMapManage(themaMapVO);
    }

    /**
     * @Description 주제도관리 수정
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int updateTMapManage(ThemaMapVO themaMapVO){
        int affectedRow = 0;

        try {
            affectedRow = tMapDAO.updateTMapManage(themaMapVO);
        } catch (Exception e) {
            LOGGER.info("-----------주제도관리 수정 실패-----------");
            LOGGER.debug(e.getMessage());
        }

        return affectedRow;
    }

    /**
     * @Description 주제도관리 삭제
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.11
     * @param themaMapVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int deleteTMapManage(ThemaMapVO themaMapVO){
        int affectedRow = 0;

        try {
            affectedRow = tMapDAO.deleteTMapManage(themaMapVO);
        } catch (Exception e) {
            LOGGER.info("-----------주제도관리 삭제 실패-----------");
            LOGGER.debug(e.getMessage());
        }

        return affectedRow;
    }
}
