package egiskorea.com.tm.service;

import egiskorea.com.mngr.info.service.ThemaMapVO;

import java.util.List;

/**
 * @Description 주제도 service 인터페이스
 * @packageName egiskorea.com.tm.service
 * @Class ThematicMapService
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.03.10
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.10   이준호           최초 생성
 *  </pre>
 */

public interface ThematicMapService {

    /**
     * @Description 주제도 목록 조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.10
     * @param themaMapVO
     * @return List(ThemaMapVO)
     * @throws Exception
     */
    public List<ThemaMapVO> selectTMapList(ThemaMapVO themaMapVO) throws Exception;

    /**
     * @Description 주제도 자동완성을 위한 주제도 명 목록 조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.10
     * @return List(ThemaMapVO)
     * @throws Exception
     */
    public List<ThemaMapVO> selectTMapAllList() throws Exception;
}
