package egiskorea.com.job.tran.popltn.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.job.tran.popltn.service.PoplulationInfoService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 교통분석 serviceImpl 클래스
 * @author 플랫폼개발부문 DT플랫폼 
 * @since 2023.05.12
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.05.12   황의현           최초 생성
 *  </pre>
 */

@Service("poplulationInfoService")
public class PoplulationInfoServiceImpl extends EgovAbstractServiceImpl implements PoplulationInfoService{
	
	@Resource(name = "poplulationInfoDAO")
	private PoplulationInfoDAO poplulationInfoDAO;
	
// ################################################# 도로구간 #################################################
	
	/**
	 * 교통시설 도로구간 목록
	 * @param roadSectionVO
	 * @return Map<String, Object>
	 */
	/*@Override
	public Map<String, Object> selectTransportationFacilityList(RoadSectionVO roadSectionVO) {
		
		List<?> list = transportationFacilityDAO.selectRoadSectionList(roadSectionVO);
		
		int cnt = transportationFacilityDAO.selectRoadSectionListCnt(roadSectionVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
		
	}
	
	*//** 
	 * 교통시설 도로구간 상세조회
	 * @param roadSectionVO
	 * @return RoadSection
	 *//*
	public RoadSection selectRoadSection(RoadSectionVO roadSectionVO) {
		
		RoadSection result = transportationFacilityDAO.selectRoadSection(roadSectionVO);
		
		return result;
		
	}
	
	*//** 
	 * 교통시설 도로구간 엑셀 다운로드
	 * @param roadSectionVO
	 * @return List<?>
	 *//*
	public List<?> selectRoadSectionExcelList(RoadSectionVO roadSectionVO) {
		
		List<?> result = transportationFacilityDAO.selectRoadSectionExcelList(roadSectionVO);
		
		return result;
		
	}*/
	
// ################################################# 도로구간 #################################################

}
