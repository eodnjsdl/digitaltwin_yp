package egiskorea.com.job.fcmr.wsfc.wfp.service.impl;

import egiskorea.com.job.sample.service.*;
import egiskorea.com.job.sample.service.impl.WorkSampleDAO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("wtlFirePsService")
public class WtlFirePsServiceImpl extends EgovAbstractServiceImpl implements WorkSampleService {
	
	@Resource(name = "wtlFirePsDAO")
	private WtlFirePsDAO wtlFirePsDAO;

}
