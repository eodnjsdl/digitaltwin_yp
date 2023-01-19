package egiskorea.com.tm.service.impl;

import egiskorea.com.mngr.info.service.ThemaMapVO;
import egiskorea.com.mngr.info.service.impl.ThematicMapManageDAO;
import egiskorea.com.tm.service.ThematicMapService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Description 주제도 service 구현부 클래스
 * @packageName egiskorea.com.tm.service
 * @Class ThematicMapServiceImpl
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

@Service(value = "thematicMapService")
public class ThematicMapServiceImpl implements ThematicMapService {

    @Resource(name = "thematicMapDAO")
    private ThematicMapDAO thematicMapDAO;

    private static final Logger LOGGER = LoggerFactory.getLogger(ThematicMapServiceImpl.class);

    /**
     * @Description 주제도 목록 조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.10
     * @param themaMapVO
     * @return List(ThemaMapVO)
     * @throws Exception
     */
    public List<ThemaMapVO> selectTMapList(ThemaMapVO themaMapVO) throws Exception {
        return thematicMapDAO.selectTMapList(themaMapVO);
    }

    /**
     * @Description 주제도 자동완성을 위한 주제도 명 목록 조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.10
     * @return List(ThemaMapVO)
     * @throws Exception
     */
    public List<ThemaMapVO> selectTMapAllList() throws Exception {
        return thematicMapDAO.selectTMapAllList();
    }
}
