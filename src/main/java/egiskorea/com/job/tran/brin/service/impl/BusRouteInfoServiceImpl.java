package egiskorea.com.job.tran.brin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.job.tran.brin.service.BusRouteInfoService;
import egiskorea.com.job.tran.brin.service.ThrghSttnVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 교통분석/버스노선정보 Impl
 * @author 김영주
 * @since 2023.05.11
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                     수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.11   김영주                최초 생성
 */

@Service("busRouteInfoService")
public class BusRouteInfoServiceImpl extends EgovAbstractServiceImpl implements BusRouteInfoService {

	@Resource(name = "busRouteInfoDAO")
	private BusRouteInfoDAO busRouteInfoDAO;
	
	/**
	 * 경유 정류소 조회
	 * @param thrghSttnVO
	 * @throws Exception
	 */
	public List<ThrghSttnVO> selectThrghSttnList(ThrghSttnVO thrghSttnVO) {
		// TODO Auto-generated method stub
		return (List<ThrghSttnVO>) busRouteInfoDAO.selectThrghSttnList(thrghSttnVO);
	}
}
