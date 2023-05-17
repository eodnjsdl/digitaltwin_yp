package egiskorea.com.job.tfan.brin.service.impl;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.tfan.brin.service.TbdThrghRouteInfoVO;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository("busRouteInformationDAO")
public class BusRouteInformationDAO extends ComAbstractDAO {

    // 특정 정류소경유노선정보
    public List<TbdThrghRouteInfoVO> getTbdThrghRouteInfoById(String sttn_id) throws Exception {
        return selectList("busRouteInformationDAO.getTbdThrghRouteInfoById", sttn_id);
    }

}
