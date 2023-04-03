package egiskorea.com.job.fcmr.wsfc.wflp.service.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("wtlFlowPsService")
public class WtlFlowPsServiceImpl {

	@Resource(name = "wtlFlowPsDAO")
	private WtlFlowPsDAO wtlFlowPsDAO;
	
}
