package egiskorea.com.cmt.mltv.service.impl;

import egiskorea.com.cmt.mltv.service.MltvService;
import egiskorea.com.cmt.mltv.service.MltvVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @Description 화면분할을 관리하는 serviceImpl 클래스
 * @author
 * @since
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  </pre>
 */

@Service("mltvService")
public class MltvServiceImpl extends EgovAbstractServiceImpl implements MltvService {

	@Resource(name="mltvDAO")
	private MltvDAO mltvDAO;
	
}
