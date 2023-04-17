package egiskorea.com.job.fcmr.phfc.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.job.fcmr.phfc.service.PhyEduFaciService;
import egiskorea.com.job.spor.service.SportsVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description : 시설관리/체육시설 Impl
 * @author      : 김영주
 * @since       : 2023.03.31
 * @version     : 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                    수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.03.31   김영주           최초 생성
 */

@Service("phyEduFaciService")
public class PhyEduFaciServiceImpl extends EgovAbstractServiceImpl implements PhyEduFaciService {

	@Resource(name = "phyEduFaciDAO")
	private PhyEduFaciDAO phyEduFaciDAO;
	
	/**
	 * 체육시설 상세보기
	 * @param SportsVO
	 * @throws Exception
	 */
	@Override
	public SportsVO selectPhyEduFaciDetail(SportsVO sportsVO) throws Exception {
		// TODO Auto-generated method stub
		SportsVO result = phyEduFaciDAO.selectPhyEduFaciDetail(sportsVO);
		
		return result;
	}
	
	/**
	 * 체육시설 등록
	 * @param sportsVO
	 * @return Exception
	 */
	@Override
	public int insertPhyEduFaci(SportsVO sportsVO) throws Exception {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.insertPhyEduFaci(sportsVO);
	}
	
	/**
	 * 체육시설 수정
	 * @param sportsVO
	 * @return Exception
	 */
	@Override
	public int updatePhyEduFaci(SportsVO sportsVO) throws Exception {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.updatePhyEduFaci(sportsVO);
	}
	
	/**
	 * 체육시설 삭제
	 * @param sportsVO
	 * @return Exception
	 */
	@Override
	public int deletePhyEduFaci(SportsVO sportsVO) throws Exception {
		// TODO Auto-generated method stub
		int result = phyEduFaciDAO.deletePhyEduFaci(sportsVO);
		
		if (result > 0) {			
			phyEduFaciDAO.deletePhyMng(sportsVO);
			phyEduFaciDAO.deletePhyFaciMng(sportsVO);
		}
		return result;
	}
	
	/**
	 * 체육시설 > 운영정보 리스트 조회
	 * @param sportsVO
	 * @return Exception
	 */
	@Override
	public Map<String, Object> selectPhyMngList(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		List<?> list = phyEduFaciDAO.selectPhyMngList(sportsVO);

		int cnt = phyEduFaciDAO.selectPhyMngListCnt(sportsVO);

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}
	
	/**
	 * 체육시설 > 운영정보 년도 중복체크
	 * @param sportsVO
	 * @return Exception
	 */
	@Override
	public int checkPhyMngYear(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.checkPhyMngYear(sportsVO);
	}
	
	/**
	 * 체육시설 > 운영정보 등록
	 * @param sportsVO
	 * @return Exception
	 */
	@Override
	public int insertPhyMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.insertPhyMng(sportsVO);
	}
	
	/**
	 * 체육시설 > 운영정보 수정
	 * @param sportsVO
	 * @return Exception
	 */
	@Override
	public int updatePhyMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.updatePhyMng(sportsVO);
	}
	
	/**
	 * 체육시설 > 운영정보 삭제
	 * @param sportsVO
	 * @return Exception
	 */
	@Override
	public int deletePhyMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.deletePhyMng(sportsVO);
	}
	
	/**
	 * 체육시설 > 시설정보 리스트 조회
	 * @param sportsVO
	 * @return Exception
	 */
	@Override
	public Map<String, Object> selectPhyFaciMngList(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		List<?> list = phyEduFaciDAO.selectPhyFaciMngList(sportsVO);

		int cnt = phyEduFaciDAO.selectPhyFaciMngListCnt(sportsVO);

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}
	
	/**
	 * 체육시설 > 시설정보 등록
	 * @param sportsVO
	 * @return Exception
	 */
	@Override
	public int insertPhyFaciMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.insertPhyFaciMng(sportsVO);
	}
	
	/**
	 * 체육시설 > 시설정보 삭제
	 * @param sportsVO
	 * @return Exception
	 */
	@Override
	public int deletePhyFaciMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.deletePhyFaciMng(sportsVO);
	}
}
