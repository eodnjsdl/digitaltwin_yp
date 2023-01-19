package egiskorea.com.tmpr.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.tmpr.service.TemporaryService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("temporaryService")
public class TemporaryServiceImpl extends EgovAbstractServiceImpl implements TemporaryService{
	
	@Resource(name="temporaryDAO")
	private TemporaryDAO temporaryDAO;
}
