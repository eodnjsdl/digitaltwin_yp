package egiskorea.com.job.ugtm.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.fdl.cmmn.exception.FdlException;

/**
 * @Description 지하수관리 service 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2021.12.29
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.29   전영후            최초 생성
 *  </pre>
 */

public interface UnderWaterMngService {
	
	/////////////////////////////////////////농업용공공관정//////////////////////////////////////////
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 목록 조회
	 * @param underWaterAgriVO
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterAgriList(UnderWaterAgriVO underWaterAgriVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 등록
	 * @param underWaterAgri
	 * @return 
	 * @throws Exception
	 */
	public int insertUnderWaterAgri(UnderWaterAgri underWaterAgri) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 상세보기
	 * @param underWaterAgriVO
	 * @return 
	 * @throws Exception
	 */
	public UnderWaterAgri selectUnderWaterAgri(UnderWaterAgriVO underWaterAgriVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 수정
	 * @param underWaterAgri
	 * @return 
	 * @throws Exception
	 */
	public int updateUnderWaterAgri(UnderWaterAgri underWaterAgri) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 단일 삭제
	 * @param underWaterAgri
	 * @return 
	 * @throws Exception
	 */
	public int deleteUnderWaterAgri(UnderWaterAgri underWaterAgri) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 엑셀용 목록 조회
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public List<UnderWaterAgriVO> selectUnderWaterAgriExcelList(UnderWaterAgriVO underWaterAgriVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 속성검색 - 관리구분 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterAgriManageSeList(UnderWaterAgriVO underWaterAgriVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 속성검색 - 세부용도 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterAgriDetailPrposSeList(UnderWaterAgriVO underWaterAgriVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 속성검색 - 시설상태 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterAgriFcltsSttusList(UnderWaterAgriVO underWaterAgriVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 crud용 - 용도 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterAgriPrposSeList(UnderWaterAgriVO underWaterAgriVO) throws Exception ;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 crud용 - 펌프형태 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterAgriPumpStleSeList(UnderWaterAgriVO underWaterAgriVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 crud용 - 관리기관 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterAgriManageInsttNmList(UnderWaterAgriVO underWaterAgriVO) throws Exception;
	
	/////////////////////////////////////////지하수개발//////////////////////////////////////////
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 목록 조회
	 * @param underWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterDevelopList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 등록
	 * @param underWaterDevelop
	 * @return 
	 * @throws Exception
	 */
	public int insertUnderWaterDevelop(UnderWaterDevelop underWaterDevelop) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 상세보기
	 * @param UnderWaterDevelopVO
	 * @return 
	 * @throws Exception
	 */
	public UnderWaterDevelop selectUnderWaterDevelop(UnderWaterDevelopVO underWaterDevelopVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 수정
	 * @param underWaterDevelop
	 * @return 
	 * @throws Exception
	 */
	public int updateUnderWaterDevelop(UnderWaterDevelop underWaterDevelop) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 단일 삭제
	 * @param underWaterDevelop
	 * @return 
	 * @throws Exception
	 */
	public int deleteUnderWaterDevelop(UnderWaterDevelop underWaterDevelop) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 엑셀용 목록 조회
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public List<UnderWaterDevelopVO> selectUnderWaterDevelopExcelList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 속성검색 - 암반구분 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterDevelopAllvlBsrckSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 속성검색 - 용도구분 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterDevelopPrposSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 속성검색 - 세부용도 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterDevelopDetailPrposSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 crud용 - 관리구분 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterDevelopManageSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 crud용 - 허가/신고 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterDevelopPrmisnSttemntSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception;
	
	/////////////////////////////////////////지하수이용시설//////////////////////////////////////////
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterUseFacilList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 등록
	 * @param underWaterUseFacil
	 * @return 
	 * @throws Exception
	 */
	public int insertUnderWaterUseFacil(UnderWaterUseFacil underWaterUseFacil) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 상세보기
	 * @param underWaterUseFacilVO
	 * @return 
	 * @throws Exception
	 */
	public UnderWaterUseFacil selectUnderWaterUseFacil(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 수정
	 * @param underWaterUseFacil
	 * @return 
	 * @throws Exception
	 */
	public int updateUnderWaterUseFacil(UnderWaterUseFacil underWaterUseFacil) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 단일 삭제
	 * @param underWaterUseFacil
	 * @return 
	 * @throws Exception
	 */
	public int deleteUnderWaterUseFacil(UnderWaterUseFacil underWaterUseFacil) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 엑셀용 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public List<UnderWaterUseFacilVO> selectUnderWaterUseFacilExcelList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 속성검색 - 암반구분 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterUseFacilAllvlBsrckSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception ;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 속성검색 - 용도구분 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterUseFacilPrposSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception ;
		
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 속성검색 - 세부용도 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterUseFacilDetailPrposSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 crud용 - 관리구분 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterUseFacilManageSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception;
		
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 crud용 - 허가/신고 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterUseFacilPrmisnSttemntSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 crud용 - 공공/사설 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectUnderWaterUseFacilPublicPvtesblSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception;
}
