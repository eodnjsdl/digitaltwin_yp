package egiskorea.com.job.tfan.brin.service;

import java.util.List;

public interface BusRouteInformationService {
	
	// 특정 정류소경유노선정보
	public List<TbdThrghRouteInfoVO> getTbdThrghRouteInfoById(String sttn_id) throws Exception;
	
}
