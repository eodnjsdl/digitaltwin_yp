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
 *  2023.05.18   백승석           데이터 조회 처리 생성
 *  </pre>
 */

@Repository("populationInfoDAO")
public class PopulationInfoDAO extends ComAbstractDAO {
	
	public List<PopulationVO> selectMyeonPopulationInfoList(PopulationVO populationVO) {
		return selectList("population.selectMyeonPopulationInfoList", populationVO);
	}
	
	public List<String> selectStandardYmList(PopulationVO populationVO) {
		return selectList("population.selectStandardYmList", populationVO);
	}
	
	public List<PopulationVO> selectAllPopulationInfoList(PopulationVO populationVO) {
		return selectList("population.selectAllPopulationInfoList", populationVO);
	}
	
	public List<String> selectGridStandardYmList(PopulationVO populationVO) {
		return selectList("population.selectGridStandardYmList", populationVO);
	}
	
	public String selectPopulationCenter(PopulationVO populationVO) {
		return selectOne("population.selectPopulationCenter", populationVO);
	}
	
	/************** GRID *************/
	
	public List<PopulationVO> selectGridMyeonPopulationInfoList(PopulationVO populationVO) {
		return selectList("population.selectGridMyeonPopulationInfoList", populationVO);
	}
	
	public String selectGridPopulationCenter(PopulationVO populationVO) {
		return selectOne("population.selectGridPopulationCenter", populationVO);
	}
}
