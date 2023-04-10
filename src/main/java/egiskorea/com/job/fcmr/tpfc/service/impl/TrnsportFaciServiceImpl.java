package egiskorea.com.job.fcmr.tpfc.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.job.fcmr.tpfc.service.TrnsportFaciService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description : 시설관리/교통시설 Impl
 * @author      : 김영주
 * @since       : 2023.04.05
 * @version     : 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                    수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.04.05   김영주           최초 생성
 */

@Service("trnsportFaciService")
public class TrnsportFaciServiceImpl extends EgovAbstractServiceImpl implements TrnsportFaciService {

	@Resource(name = "trnsportFaciDAO")
	private TrnsportFaciDAO trnsportFaciDAO;
	
	/* 도로구간 */
}
