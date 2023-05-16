package egiskorea.com.job.tran.brin.service;

import java.util.Map;

/**
 * @Description 교통분석/버스노선정보 Service
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

public interface BusRouteInfoService {

	/**
	 * 경유 정류소 조회
	 * @param thrghSttnVO
	 * @throws Exception
	 */
	public Map<String, Object> selectThrghSttnList(ThrghSttnVO thrghSttnVO) throws Exception;
}
