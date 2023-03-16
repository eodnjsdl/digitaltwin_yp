package egiskorea.com.job.sample.service.impl;

import egiskorea.com.job.sample.service.*;
import egiskorea.com.job.sample.service.impl.WorkSampleDAO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("workSampleService")
public class WorkSampleServiceImpl extends EgovAbstractServiceImpl implements WorkSampleService {
	
	@Resource(name = "workSampleDAO")
	private WorkSampleDAO workSampleDAO;

}
