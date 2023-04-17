package egiskorea.com.job.fcmr.ssfc.service.impl;

import egiskorea.com.job.sample.service.*;
import egiskorea.com.job.sample.service.impl.WorkSampleDAO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("sewerSupplyService")
public class SewerSupplyServiceImpl extends EgovAbstractServiceImpl implements WorkSampleService {
	
	@Resource(name = "sewerSupplyDAO")
	private SewerSupplyDAO sewerSupplyDAO;

}
