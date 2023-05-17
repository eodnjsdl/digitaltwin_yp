package egiskorea.com.job.tfan.brin.service.impl;

import egiskorea.com.job.tfan.brin.service.BusRouteInformationService;
import egiskorea.com.job.tfan.brin.service.TbdThrghRouteInfoVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import java.util.List;
import javax.annotation.Resource;

@Service("busRouteInformationService")
public class BusRouteInformationServiceImpl extends EgovAbstractServiceImpl implements BusRouteInformationService {

    @Resource(name = "busRouteInformationDAO")
    private BusRouteInformationDAO busRouteInformationDAO;

    // 특정 정류소경유노선정보
    @Override
    public List<TbdThrghRouteInfoVO> getTbdThrghRouteInfoById(String sttn_id) throws Exception {
        return busRouteInformationDAO.getTbdThrghRouteInfoById(sttn_id);
    }

}