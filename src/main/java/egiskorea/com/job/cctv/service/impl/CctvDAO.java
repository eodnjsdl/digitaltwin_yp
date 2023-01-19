package egiskorea.com.job.cctv.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.cctv.service.SafetyFacilCctvMng;
import egiskorea.com.job.cctv.service.SafetyFacilCctvMngVO;
import egiskorea.com.job.sffm.service.SafetyFacilLampMngVO;

/**
 * @Description 안전시설물관리 dao 클래스
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

@Repository("cctvDAO")
public class CctvDAO extends ComAbstractDAO {
	
	// 안전시설물관리 > CCTV관리 조회
	public List<?> selectCctvList(SafetyFacilCctvMngVO safetyFacilCctvMngVO) throws Exception {
		return selectList("cctvDAO.selectCctvList", safetyFacilCctvMngVO);
	}
	
	// 안전시설물관리 > CCTV관리 조회 cnt
	public int selectCctvListCnt(SafetyFacilCctvMngVO safetyFacilCctvMngVO) throws Exception {
		return (Integer)selectOne("cctvDAO.selectCctvListCnt", safetyFacilCctvMngVO);
	}
	
	// 안전시설물관리 > CCTV관리 상세보기
	public SafetyFacilCctvMng selectSafetyFacilCctvMng(SafetyFacilCctvMngVO safetyFacilCctvMngVO) throws Exception {
		return (SafetyFacilCctvMng) selectOne("cctvDAO.selectSafetyFacilCctvMng", safetyFacilCctvMngVO);
	}
	
	// 안전시설물관리 > CCTV관리 삭제
	public int deleteCctv(SafetyFacilCctvMng cctvVO) {
		return delete("cctvDAO.deleteCctv", cctvVO);
	}
	
	// 안전시설물관리 > CCTV관리 등록
	public int insertCctv(SafetyFacilCctvMng cctvVO) {
		return insert("cctvDAO.insertCctv", cctvVO);
	}
	
	// 안전시설물관리 > CCTV관리 수정
	public int updateCctv(SafetyFacilCctvMng cctvVO) {
		return update("cctvDAO.updateCctv", cctvVO);
	}
	
	// 안전시설물관리 > CCTV관리 엑셀다운
	public List cctvExcelDown(SafetyFacilCctvMngVO safetyFacilCctvMngVO) {
		return selectList("cctvDAO.cctvExcelDown", safetyFacilCctvMngVO);
	}
	
	// 안전시설물관리 > CCTV관리 poi
	public List<SafetyFacilCctvMng> selectCctvPOIList(SafetyFacilCctvMng cctvVO) {
		return selectList("cctvDAO.selectCctvPOIList", cctvVO);
	} 
}
