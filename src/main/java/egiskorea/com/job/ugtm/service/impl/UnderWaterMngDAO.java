package egiskorea.com.job.ugtm.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.ugtm.service.UnderWaterAgri;
import egiskorea.com.job.ugtm.service.UnderWaterAgriVO;
import egiskorea.com.job.ugtm.service.UnderWaterDevelop;
import egiskorea.com.job.ugtm.service.UnderWaterDevelopVO;
import egiskorea.com.job.ugtm.service.UnderWaterUseFacil;
import egiskorea.com.job.ugtm.service.UnderWaterUseFacilVO;
import egovframework.rte.fdl.cmmn.exception.FdlException;

/**
 * @Description 지하수관리 dao 클래스
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

@Repository("underWaterMngDAO")
public class UnderWaterMngDAO extends ComAbstractDAO {
	
	/////////////////////////////////////////농업용공공관정//////////////////////////////////////////
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 목록 조회
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterAgriList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterAgriList", underWaterAgriVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 목록 갯수
	 * @param underWaterAgriVO
	 * @return int
	 * @throws Exception
	 */
	public int selectUnderWaterAgriListCnt(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		return (Integer)selectOne("underWaterMng.selectUnderWaterAgriListCnt", underWaterAgriVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 등록
	 * @param underWaterAgri
	 * @return 
	 * @throws Exception
	 */
	public int insertUnderWaterAgri(UnderWaterAgri underWaterAgri) throws Exception {
		return insert("underWaterMng.insertUnderWaterAgri", underWaterAgri);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 상세보기
	 * @param underWaterAgriVO
	 * @return 
	 * @throws Exception
	 */
	public UnderWaterAgri selectUnderWaterAgri(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		return (UnderWaterAgri) selectOne("underWaterMng.selectUnderWaterAgri", underWaterAgriVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 수정
	 * @param underWaterAgri
	 * @return 
	 * @throws Exception
	 */
	public int updateUnderWaterAgri(UnderWaterAgri underWaterAgri) throws Exception {
		return update("underWaterMng.updateUnderWaterAgri", underWaterAgri);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 단일 삭제
	 * @param underWaterAgri
	 * @return 
	 * @throws Exception
	 */
	public int deleteUnderWaterAgri(UnderWaterAgri underWaterAgri) throws Exception {
		return delete("underWaterMng.deleteUnderWaterAgri", underWaterAgri);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 엑셀용 목록 조회
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public List<UnderWaterAgriVO> selectUnderWaterAgriExcelList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterAgriExcelList", underWaterAgriVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 속성검색 - 관리구분 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterAgriManageSeList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterAgriManageSeList", underWaterAgriVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 속성검색 - 세부용도 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterAgriDetailPrposSeList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterAgriDetailPrposSeList", underWaterAgriVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 속성검색 - 시설상태 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterAgriFcltsSttusList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterAgriFcltsSttusList", underWaterAgriVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 crud용 - 용도 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterAgriPrposSeList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterAgriPrposSeList", underWaterAgriVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 crud용 - 펌프형태 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterAgriPumpStleSeList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterAgriPumpStleSeList", underWaterAgriVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 crud용 - 관리기관 목록
	 * @param underWaterAgriVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterAgriManageInsttNmList(UnderWaterAgriVO underWaterAgriVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterAgriManageInsttNmList", underWaterAgriVO);
	}
	
	/////////////////////////////////////////지하수개발//////////////////////////////////////////
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 목록 조회
	 * @param underWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterDevelopList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterDevelopList", underWaterDevelopVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 목록 갯수
	 * @param underWaterDevelopVO
	 * @return int
	 * @throws Exception
	 */
	public int selectUnderWaterDevelopListCnt(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		return (Integer)selectOne("underWaterMng.selectUnderWaterDevelopListCnt", underWaterDevelopVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 등록
	 * @param underWaterDevelop
	 * @return 
	 * @throws Exception
	 */
	public int insertUnderWaterDevelop(UnderWaterDevelop underWaterDevelop) throws Exception {
		return insert("underWaterMng.insertUnderWaterDevelop", underWaterDevelop);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 상세보기
	 * @param UnderWaterDevelopVO
	 * @return 
	 * @throws Exception
	 */
	public UnderWaterDevelop selectUnderWaterDevelop(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		return (UnderWaterDevelop) selectOne("underWaterMng.selectUnderWaterDevelop", underWaterDevelopVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 수정
	 * @param underWaterDevelop
	 * @return 
	 * @throws Exception
	 */
	public int updateUnderWaterDevelop(UnderWaterDevelop underWaterDevelop) throws Exception {
		return update("underWaterMng.updateUnderWaterDevelop", underWaterDevelop);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 단일 삭제
	 * @param underWaterDevelop
	 * @return 
	 * @throws Exception
	 */
	public int deleteUnderWaterDevelop(UnderWaterDevelop underWaterDevelop) throws Exception {
		return delete("underWaterMng.deleteUnderWaterDevelop", underWaterDevelop);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 엑셀용 목록 조회
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public List<UnderWaterDevelopVO> selectUnderWaterDevelopExcelList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterDevelopExcelList", underWaterDevelopVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 속성검색 - 암반구분 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterDevelopAllvlBsrckSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterDevelopAllvlBsrckSeList", underWaterDevelopVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 속성검색 - 용도구분 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterDevelopPrposSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterDevelopPrposSeList", underWaterDevelopVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 속성검색 - 세부용도 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterDevelopDetailPrposSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterDevelopDetailPrposSeList", underWaterDevelopVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 crud용 - 관리구분 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterDevelopManageSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterDevelopManageSeList", underWaterDevelopVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수개발 crud용 - 허가/신고 목록
	 * @param UnderWaterDevelopVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterDevelopPrmisnSttemntSeList(UnderWaterDevelopVO underWaterDevelopVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterDevelopPrmisnSttemntSeList", underWaterDevelopVO);
	}
	
	/////////////////////////////////////////지하수이용시설//////////////////////////////////////////
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterUseFacilList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterUseFacilList", underWaterUseFacilVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 목록 갯수
	 * @param underWaterUseFacilVO
	 * @return int
	 * @throws Exception
	 */
	public int selectUnderWaterUseFacilListCnt(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		return (Integer)selectOne("underWaterMng.selectUnderWaterUseFacilListCnt", underWaterUseFacilVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 등록
	 * @param underWaterUseFacil
	 * @return 
	 * @throws Exception
	 */
	public int insertUnderWaterUseFacil(UnderWaterUseFacil underWaterUseFacil) throws Exception {
		return insert("underWaterMng.insertUnderWaterUseFacil", underWaterUseFacil);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 상세보기
	 * @param underWaterUseFacilVO
	 * @return 
	 * @throws Exception
	 */
	public UnderWaterUseFacil selectUnderWaterUseFacil(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		return (UnderWaterUseFacil) selectOne("underWaterMng.selectUnderWaterUseFacil", underWaterUseFacilVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 수정
	 * @param underWaterUseFacil
	 * @return 
	 * @throws Exception
	 */
	public int updateUnderWaterUseFacil(UnderWaterUseFacil underWaterUseFacil) throws Exception {
		return update("underWaterMng.updateUnderWaterUseFacil", underWaterUseFacil);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 단일 삭제
	 * @param underWaterUseFacil
	 * @return 
	 * @throws Exception
	 */
	public int deleteUnderWaterUseFacil(UnderWaterUseFacil underWaterUseFacil) throws Exception {
		return delete("underWaterMng.deleteUnderWaterUseFacil", underWaterUseFacil);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 엑셀용 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public List<UnderWaterUseFacilVO> selectUnderWaterUseFacilExcelList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterUseFacilExcelList", underWaterUseFacilVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 속성검색 - 암반구분 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterUseFacilAllvlBsrckSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterUseFacilAllvlBsrckSeList", underWaterUseFacilVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 속성검색 - 용도구분 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterUseFacilPrposSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterUseFacilPrposSeList", underWaterUseFacilVO);
	}
		
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 속성검색 - 세부용도 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterUseFacilDetailPrposSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterUseFacilDetailPrposSeList", underWaterUseFacilVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 crud용 - 관리구분 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterUseFacilManageSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterUseFacilManageSeList", underWaterUseFacilVO);
	}
		
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 crud용 - 허가/신고 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterUseFacilPrmisnSttemntSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterUseFacilPrmisnSttemntSeList", underWaterUseFacilVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 지하수관리 > 지하수이용시설 crud용 - 공공/사설 목록 조회
	 * @param underWaterUseFacilVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectUnderWaterUseFacilPublicPvtesblSeList(UnderWaterUseFacilVO underWaterUseFacilVO) throws Exception {
		return selectList("underWaterMng.selectUnderWaterUseFacilPublicPvtesblSeList", underWaterUseFacilVO);
	}
	
}
