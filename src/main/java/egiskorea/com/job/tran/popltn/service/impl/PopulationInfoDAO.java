package egiskorea.com.job.tran.popltn.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.tran.popltn.service.PopulationVO;

/**
 * @Description 교통시설 dao 클래스
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
 *  2023.05.12   황의현           최초 생성
 *  </pre>
 */

@Repository("populationInfoDAO")
public class PopulationInfoDAO extends ComAbstractDAO {
	
	public List<PopulationVO> selectPopulationInfoList(PopulationVO populationVO) {
		return selectList("population.selectPopulationInfoList", populationVO);
	}
	
	public int selectAllPopulationCnt() {
		int cnt = selectOne("population.selectAllPopulationCnt");
		return cnt;
	}
	
	public List<PopulationVO> selectMyeonPopulationInfoList(PopulationVO populationVO) {
		return selectList("population.selectMyeonPopulationInfoList", populationVO);
	}
	
// ################################################# 도로구간 #################################################
	
	
	/**
	 * 교통시설 도로구간 목록
	 * @param roadSectionVO
	 * @return list
	 *//*
	public List<?> selectRoadSectionList(RoadSectionVO roadSectionVO) {
		return selectList("transportationFacility.selectRoadSectionList", roadSectionVO);
	}
	
	*//**
	 * 교통시설 도로구간 목록 cnt
	 * @param roadSectionVO
	 * @return int
	 *//*
	public int selectRoadSectionListCnt(RoadSectionVO roadSectionVO) {
		return (Integer)selectOne("transportationFacility.selectRoadSectionListCnt", roadSectionVO);
	}
	
	*//** 
	 * 교통시설 도로구간 상세조회
	 * @param roadSectionVO
	 * @return RoadSection
	 *//*
	public RoadSection selectRoadSection(RoadSectionVO roadSectionVO) {
		return (RoadSection) selectOne("transportationFacility.selectRoadSection", roadSectionVO);
	}
	
	*//**
	 * 교통시설 도로구간 엑셀다운로드
	 * @param roadSectionVO
	 * @return list
	 *//*
	public List<?> selectRoadSectionExcelList(RoadSectionVO roadSectionVO) {
		return selectList("transportationFacility.selectRoadSectionExcelList", roadSectionVO);
	}*/
	
	
// ################################################# 도로구간 #################################################
	
	

}
