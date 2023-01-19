package egiskorea.com.job.ugtm.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.job.ugtm.service.UnderWaterMngService;
import egiskorea.com.job.ugtm.service.UnderWaterUseFacil;
import egiskorea.com.job.ugtm.service.UnderWaterUseFacilVO;
import egiskorea.com.job.ugtm.service.UnderWaterAgri;
import egiskorea.com.job.ugtm.service.UnderWaterAgriVO;
import egiskorea.com.job.ugtm.service.UnderWaterDevelop;
import egiskorea.com.job.ugtm.service.UnderWaterDevelopVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.cmmn.exception.FdlException;

/**
 * @Description 지하수관리 serviceImpl 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2021.12.30
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.30   전영후            최초 생성
 *  </pre>
 */

@Service("underWaterMngService")
public class UnderWaterMngServiceImpl extends EgovAbstractServiceImpl implements UnderWaterMngService{
	
	@Resource(name = "underWaterMngDAO")
	private UnderWaterMngDAO underWaterMngDAO;
	
	/////////////////////////////////////////농업용공공관정//////////////////////////////////////////
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 목록 조회
	 * @param underWaterAgriVO
	 * @return
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterAgriList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterAgriList(underWaterAgriVO);
		
		// 갯수
		int cnt = underWaterMngDAO.selectUnderWaterAgriListCnt(underWaterAgriVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 등록
	 * @param underWaterAgri
	 * @return 
	 * @throws Exception
	 */
	public int insertUnderWaterAgri(UnderWaterAgri underWaterAgri) throws Exception{
		return underWaterMngDAO.insertUnderWaterAgri(underWaterAgri);
	};
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 상세보기
	 * @param underWaterAgriVO
	 * @return 
	 * @throws Exception
	 */
	public UnderWaterAgri selectUnderWaterAgri(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		
		UnderWaterAgri result = underWaterMngDAO.selectUnderWaterAgri(underWaterAgriVO);
		
		return result;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 수정
	 * @param underWaterAgri
	 * @return 
	 * @throws Exception
	 */
	public int updateUnderWaterAgri(UnderWaterAgri underWaterAgri) throws Exception {
		return underWaterMngDAO.updateUnderWaterAgri(underWaterAgri);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 단일 삭제
	 * @param underWaterAgri
	 * @return 
	 * @throws Exception
	 */
	public int deleteUnderWaterAgri(UnderWaterAgri underWaterAgri) throws Exception {
		return underWaterMngDAO.deleteUnderWaterAgri(underWaterAgri);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 엑셀 다운로드용 목록 조회
	 * @param underWaterAgriVO
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<UnderWaterAgriVO> selectUnderWaterAgriExcelList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		return underWaterMngDAO.selectUnderWaterAgriExcelList(underWaterAgriVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 속성검색 - 관리구분 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterAgriManageSeList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterAgriManageSeList(underWaterAgriVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 속성검색 - 세부용도 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterAgriDetailPrposSeList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterAgriDetailPrposSeList(underWaterAgriVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 속성검색 - 시설상태 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterAgriFcltsSttusList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterAgriFcltsSttusList(underWaterAgriVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 crud용 - 용도 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterAgriPrposSeList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterAgriPrposSeList(underWaterAgriVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 crud용 - 펌프형태 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterAgriPumpStleSeList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterAgriPumpStleSeList(underWaterAgriVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 crud용 - 관리기관 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterAgriManageInsttNmList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterAgriManageInsttNmList(underWaterAgriVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/////////////////////////////////////////지하수개발//////////////////////////////////////////
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 목록 조회
	 * @param underWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterDevelopList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterDevelopList(underWaterDevelopVO);
		
		// 갯수
		int cnt = underWaterMngDAO.selectUnderWaterDevelopListCnt(underWaterDevelopVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 등록
	 * @param underWaterDevelop
	 * @return 
	 * @throws Exception
	 */
	public int insertUnderWaterDevelop(UnderWaterDevelop underWaterDevelop) throws Exception {
		return underWaterMngDAO.insertUnderWaterDevelop(underWaterDevelop);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 상세보기
	 * @param UnderWaterDevelopVO
	 * @return 
	 * @throws Exception
	 */
	public UnderWaterDevelop selectUnderWaterDevelop(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		
		UnderWaterDevelop result = underWaterMngDAO.selectUnderWaterDevelop(underWaterDevelopVO);
		
		return result;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 수정
	 * @param underWaterDevelop
	 * @return 
	 * @throws Exception
	 */
	public int updateUnderWaterDevelop(UnderWaterDevelop underWaterDevelop) throws Exception {
		return underWaterMngDAO.updateUnderWaterDevelop(underWaterDevelop);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 단일 삭제
	 * @param underWaterDevelop
	 * @return 
	 * @throws Exception
	 */
	public int deleteUnderWaterDevelop(UnderWaterDevelop underWaterDevelop) throws Exception {
		return underWaterMngDAO.deleteUnderWaterDevelop(underWaterDevelop);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 엑셀용 목록 조회
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public List<UnderWaterDevelopVO> selectUnderWaterDevelopExcelList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		return underWaterMngDAO.selectUnderWaterDevelopExcelList(underWaterDevelopVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 속성검색 - 암반구분 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterDevelopAllvlBsrckSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterDevelopAllvlBsrckSeList(underWaterDevelopVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 속성검색 - 용도구분 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterDevelopPrposSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterDevelopPrposSeList(underWaterDevelopVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 속성검색 - 세부용도 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterDevelopDetailPrposSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterDevelopDetailPrposSeList(underWaterDevelopVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 crud용 - 관리구분 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterDevelopManageSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterDevelopManageSeList(underWaterDevelopVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 crud용 - 허가/신고 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterDevelopPrmisnSttemntSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterDevelopPrmisnSttemntSeList(underWaterDevelopVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/////////////////////////////////////////지하수이용시설//////////////////////////////////////////
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterUseFacilList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterUseFacilList(underWaterUseFacilVO);
		
		// 갯수
		int cnt = underWaterMngDAO.selectUnderWaterUseFacilListCnt(underWaterUseFacilVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 등록
	 * @param underWaterUseFacil
	 * @return 
	 * @throws Exception
	 */
	public int insertUnderWaterUseFacil(UnderWaterUseFacil underWaterUseFacil) throws Exception {
		return underWaterMngDAO.insertUnderWaterUseFacil(underWaterUseFacil);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 상세보기
	 * @param underWaterUseFacilVO
	 * @return 
	 * @throws Exception
	 */
	public UnderWaterUseFacil selectUnderWaterUseFacil(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		
		UnderWaterUseFacil result = underWaterMngDAO.selectUnderWaterUseFacil(underWaterUseFacilVO);
		
		return result;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 수정
	 * @param underWaterUseFacil
	 * @return 
	 * @throws Exception
	 */
	public int updateUnderWaterUseFacil(UnderWaterUseFacil underWaterUseFacil) throws Exception {
		return underWaterMngDAO.updateUnderWaterUseFacil(underWaterUseFacil);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 단일 삭제
	 * @param underWaterUseFacil
	 * @return 
	 * @throws Exception
	 */
	public int deleteUnderWaterUseFacil(UnderWaterUseFacil underWaterUseFacil) throws Exception {
		return underWaterMngDAO.deleteUnderWaterUseFacil(underWaterUseFacil);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 엑셀용 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public List<UnderWaterUseFacilVO> selectUnderWaterUseFacilExcelList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		return underWaterMngDAO.selectUnderWaterUseFacilExcelList(underWaterUseFacilVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 속성검색 - 암반구분 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterUseFacilAllvlBsrckSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterUseFacilAllvlBsrckSeList(underWaterUseFacilVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 속성검색 - 용도구분 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterUseFacilPrposSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterUseFacilPrposSeList(underWaterUseFacilVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 속성검색 - 세부용도 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterUseFacilDetailPrposSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterUseFacilDetailPrposSeList(underWaterUseFacilVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 crud용 - 관리구분 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterUseFacilManageSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterUseFacilManageSeList(underWaterUseFacilVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
		
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 crud용 - 허가/신고 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterUseFacilPrmisnSttemntSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		
		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterUseFacilPrmisnSttemntSeList(underWaterUseFacilVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 crud용 - 공공/사설 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectUnderWaterUseFacilPublicPvtesblSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {

		// 목록
		List<?> list = underWaterMngDAO.selectUnderWaterUseFacilPublicPvtesblSeList(underWaterUseFacilVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}
}
