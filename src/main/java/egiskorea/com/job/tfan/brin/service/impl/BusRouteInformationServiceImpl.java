package egiskorea.com.job.tfan.brin.service.impl;

import egiskorea.com.job.tfan.brin.service.BusRouteInformationService;
import egiskorea.com.job.tfan.brin.service.TbdThrghRouteInfoVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import java.util.List;
import javax.annotation.Resource;

/**
 * @Description 교통분석/버스노선정보 ServiceImpl
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