package egiskorea.com.job.tfan.brin.service;

import java.util.List;

/**
 * @Description 교통분석/버스노선정보 Service
 * @author 글로벌컨설팅부문 장현승
 * @since 2023.05.17
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.17   장현승           최초 생성
 */

public interface BusRouteInformationService {
	
	// 특정 정류소경유노선정보
	public List<TbdThrghRouteInfoVO> getTbdThrghRouteInfoById(String sttn_id) throws Exception;
	
}
