package egiskorea.com.job.tfan.brin.service.impl;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.tfan.brin.service.TbdThrghRouteInfoVO;
import java.util.List;
import org.springframework.stereotype.Repository;

/**
 * @Description 교통분석/버스노선정보 DAO
 * @author 글로벌컨설팅부문 장현승
 * @since 2023.05.17
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.17   장현승           최초 생성
 */

@Repository("busRouteInformationDAO")
public class BusRouteInformationDAO extends ComAbstractDAO {

    // 특정 정류소경유노선정보
    public List<TbdThrghRouteInfoVO> getTbdThrghRouteInfoById(String sttn_id) throws Exception {
        return selectList("busRouteInformationDAO.getTbdThrghRouteInfoById", sttn_id);
    }

}
