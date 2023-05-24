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
 *  2023.05.12   황의현           최초 생성
 *  2023.05.17   백승석           데이터 조회 처리 생성
 *  </pre>
 */

@Service("populationInfoService")
public class PopulationInfoServiceImpl extends EgovAbstractServiceImpl implements PopulationInfoService{
	
	@Resource(name = "populationInfoDAO")
	private PopulationInfoDAO populationInfoDAO;

	@Override
	public List<PopulationVO> selectMyeonPopulationInfoList(PopulationVO populationVO) {
		List<PopulationVO> list = null;
		
		// 리 단위를 조회하기위해 면 코드 like 설정
		// 10 자리 중 6~8자리 - 면, 9~10 자리 - 리
		// 0~8 자리 까지 필요 41830***%;
		String liCd = populationVO.getLiCd();
		if (!liCd.equals("all")) {
			String setLiCd = "";
			setLiCd = liCd.substring(0, 8);
			populationVO.setLiCd(setLiCd);
		}
		
		list = populationInfoDAO.selectMyeonPopulationInfoList(populationVO);
		
		return list;
	}

	@Override
	public List<String> selectStandardYmList(PopulationVO populationVO) {
		List<String> list = null;
		
		String liCd = populationVO.getLiCd();
		if (!liCd.equals("all")) {
			String setLiCd = "";
			setLiCd = liCd.substring(0, 8);
			populationVO.setLiCd(setLiCd);
		}
		
		list = populationInfoDAO.selectStandardYmList(populationVO);
		
		return list;
	}

	@Override
	public List<PopulationVO> selectAllPopulationInfoList(PopulationVO populationVO) {
		List<PopulationVO> list = null;
		
		list = populationInfoDAO.selectAllPopulationInfoList(populationVO);
		
		return list;
	}

	@Override
	public String selectPopulationCenter(PopulationVO populationVO) {
		String geom = "";
		String liCd = populationVO.getLiCd();
		if (liCd == null) {
			populationVO.setLiCd("all");
		}
		geom = populationInfoDAO.selectPopulationCenter(populationVO);
		
		return geom;
	}
	
	
	/***************** GRID *****************/
	@Override
	public List<String> selectGridStandardYmList(PopulationVO populationVO) {
		List<String> list = null;
		
		String liCd = populationVO.getLiCd();
		if (!liCd.equals("all")) {
			String setLiCd = "";
			setLiCd = liCd.substring(0, 8);
			populationVO.setLiCd(setLiCd);
		}
		
		list = populationInfoDAO.selectGridStandardYmList(populationVO);
		
		return list;
	}
	
	@Override
	public List<PopulationVO> selectGridMyeonPopulationInfoList(PopulationVO populationVO) {
		List<PopulationVO> list = null;
		
		String liCd = populationVO.getLiCd();
		if (!liCd.equals("all")) {
			String setLiCd = "";
			setLiCd = liCd.substring(0, 8);
			populationVO.setLiCd(setLiCd);
		}
		
		list = populationInfoDAO.selectGridMyeonPopulationInfoList(populationVO);
		
		return list;
	}

	@Override
	public String selectGridPopulationCenter(PopulationVO populationVO) {
		String geom = "";
		String liCd = populationVO.getLiCd();
		if (liCd == null) {
			populationVO.setLiCd("all");
		}
		geom = populationInfoDAO.selectPopulationCenter(populationVO);
		
		return geom;
	}
	
}
