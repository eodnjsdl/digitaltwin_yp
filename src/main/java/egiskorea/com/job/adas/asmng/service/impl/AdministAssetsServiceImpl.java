package egiskorea.com.job.adas.asmng.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.job.adas.asmng.service.AdministAssetsService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 행정자산관리 serviceImpl 클래스
 * @since 2023.05.24
 * @version 1.0
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.24   백승석            최초 생성
 *  </pre>
 */

@Service("administAssetsService")
public class AdministAssetsServiceImpl extends EgovAbstractServiceImpl implements AdministAssetsService {

	@Resource(name = "administAssetsDAO")
	private AdministAssetsDAO administAssetsDAO;
	
}
