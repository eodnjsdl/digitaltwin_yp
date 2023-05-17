package egiskorea.com.job.tran.popltn.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.job.tran.popltn.service.PopulationInfoService;
import egiskorea.com.job.tran.popltn.service.PopulationVO;
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

@Service("populationInfoService")
public class PopulationInfoServiceImpl extends EgovAbstractServiceImpl implements PopulationInfoService{
	
	@Resource(name = "populationInfoDAO")
	private PopulationInfoDAO populationInfoDAO;

	@Override
	public List<PopulationVO> selectPopulationInfoList(PopulationVO populationVO) {
		List<PopulationVO> list = null;
		
		list = populationInfoDAO.selectPopulationInfoList(populationVO);
		
		return list;
	}

	@Override
	public int selectAllPopulationCnt() {
		int cnt = 0;
		cnt = populationInfoDAO.selectAllPopulationCnt();
		return cnt;
	}

	@Override
	public List<PopulationVO> selectMyeonPopulationInfoList(PopulationVO populationVO) {
		List<PopulationVO> list = null;
		
		// 리 단위를 조회하기위해 면 코드 like 설정
		// 10 자리 중 6~8자리 - 면, 9~10 자리 - 리
		// 0~8 자리 까지 필요 41830***%;
		String liCd = populationVO.getLiCd();
		String setLiCd = "";
		setLiCd = liCd.substring(0, 7);
		populationVO.setLiCd(setLiCd);
		
		list = populationInfoDAO.selectMyeonPopulationInfoList(populationVO);
		
		return list;
	}
	
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
