package egiskorea.com.job.fcrm.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.job.fcrm.service.FaciReseMng;
import egiskorea.com.job.fcrm.service.FaciReseMngService;
import egiskorea.com.job.fcrm.service.FaciReseMngVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 시설예약관리 serviceImpl 
 * @author 플랫폼개발부문 DT플랫폼 이푸름
 * @since 2022.01.27
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.27		이푸름	최초 생성
 *  2022.02.11		전영후	2차  작성
 *  </pre>
 */

@Service("faciReseMngService")
public class FaciReseMngServiceImpl extends EgovAbstractServiceImpl implements FaciReseMngService{
	
	@Resource(name = "faciReseMngDAO")
	private  FaciReseMngDAO faciReseMngDAO;
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리  목록 조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectFaciReseMngList(FaciReseMngVO faciReseMngVO) throws Exception {
		
		// 목록
		List<?> list = faciReseMngDAO.selectFaciReseMngList(faciReseMngVO);
		
		// 갯수
		int cnt = faciReseMngDAO.selectFaciReseMngListCnt(faciReseMngVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
				
		
		return map;
	}

	/** 
	 * 업무 > 시설관리 > 시설예약관리  상세조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public FaciReseMng selectFaciReseMng(FaciReseMngVO faciReseMngVO) throws Exception {
		
		FaciReseMng result = faciReseMngDAO.selectFaciReseMng(faciReseMngVO);
		
		return result;
	}

	@Override
	public int selectFaciReseMngListCnt(FaciReseMngVO faciReseMngVO) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 시설조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectFacilPhstrnList(FaciReseMngVO faciReseMngVO) throws Exception {
		
		List<?> list = faciReseMngDAO.selectFacilPhstrnList(faciReseMngVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 시설보조명조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectFacilAsstnList(FaciReseMngVO faciReseMngVO) throws Exception {
		
		List<?> list = faciReseMngDAO.selectFacilAsstnList(faciReseMngVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 시설상세정보조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectFacilAsstnDtlList(FaciReseMngVO faciReseMngVO) throws Exception {
		List<?> list =  faciReseMngDAO.selectFacilAsstnDtlList(faciReseMngVO);
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 등록
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	@Override
	public int insertFaciReseMng(FaciReseMng faciReseMng) throws Exception {
		return faciReseMngDAO.insertFaciReseMng(faciReseMng);
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 수정
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	@Override
	public int updateFaciReseMng(FaciReseMng faciReseMng) throws Exception {
		return faciReseMngDAO.updateFaciReseMng(faciReseMng);
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 단일삭제
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	@Override
	public int deleteFaciReseMng(FaciReseMng faciReseMng) throws Exception {
		return faciReseMngDAO.deleteFaciReseMng(faciReseMng);
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 등록용 중복체크
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	@Override
	public int dubCheckFaciReseMngRegist(FaciReseMngVO faciReseMngVO) throws Exception {
		return faciReseMngDAO.dubCheckFaciReseMngRegist(faciReseMngVO);
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 수정용 중복체크
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	@Override
	public int dubCheckFaciReseMngUpdate(FaciReseMngVO faciReseMngVO) throws Exception {
		return faciReseMngDAO.dubCheckFaciReseMngUpdate(faciReseMngVO);
	};
}