package egiskorea.com.job.tfan.brin.service.impl;

import egiskorea.com.job.sample.service.*;
import egiskorea.com.job.sample.service.impl.WorkSampleDAO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("busRouteInfoService")
public class BusRouteInfomationServiceImpl extends EgovAbstractServiceImpl implements WorkSampleService {
	
	@Resource(name = "busRouteInfoDAO")
	private BusRouteInformationDAO busRouteInfoDAO;

}
