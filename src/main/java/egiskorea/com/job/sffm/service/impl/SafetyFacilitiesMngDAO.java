package egiskorea.com.job.sffm.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.sffm.service.SafetyFacilLampMng;
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

@Repository("safetyFacilitiesMngDAO")
public class SafetyFacilitiesMngDAO extends ComAbstractDAO {
	
	/** 
	 * 업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 목록 조회
	 * @param safetyFacilLampMngVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectSafetyFacilLampMngList(SafetyFacilLampMngVO safetyFacilLampMngVO) throws Exception {
		return selectList("safetyFacilitiesMng.selectSafetyFacilLampMngList", safetyFacilLampMngVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 목록 조회 cnt
	 * @param safetyFacilLampMngVO
	 * @return int
	 * @throws Exception
	 */
	public int selectSafetyFacilLampMngListCnt(SafetyFacilLampMngVO safetyFacilLampMngVO) throws Exception {
		return (Integer)selectOne("safetyFacilitiesMng.selectSafetyFacilLampMngListCnt", safetyFacilLampMngVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 상세보기
	 * @param safetyFacilLampMngVO
	 * @return list
	 * @throws Exception
	 */
	public SafetyFacilLampMng selectSafetyFacilLampMng(SafetyFacilLampMngVO safetyFacilLampMngVO) throws Exception {
		return (SafetyFacilLampMng) selectOne("safetyFacilitiesMng.selectSafetyFacilLampMng", safetyFacilLampMngVO);
	}
	
	// 안전시설물관리 > 가로등관리 삭제
	public int deleteSffm(SafetyFacilLampMng sffmVO) {
		return delete("safetyFacilitiesMng.deleteSffm", sffmVO);
	}
	
	// 안전시설물관리 > 가로등관리 등록
	public int insertSffm(SafetyFacilLampMng sffmVO) {
		return insert("safetyFacilitiesMng.insertSffm", sffmVO);
	}
	
	// 안전시설물관리 > 가로등관리 수정
	public int updateSffm(SafetyFacilLampMng sffmVO) {
		return update("safetyFacilitiesMng.updateSffm", sffmVO);
	}
	
	
	/*public List sffmExcelDown(SafetyFacilLampMngVO sffmVO) {
		return selectList("safetyFacilitiesMng.sffmExcelDown", sffmVO);
	}*/
	
	// 안전시설물관리 > 가로등관리 poi
	public List<SafetyFacilLampMng> selectSffmPOIList(SafetyFacilLampMngVO sffmVO) {
		return selectList("safetyFacilitiesMng.selectSffmPOIList", sffmVO);
	}
	
	// 안전시설물관리 > 가로등관리 엑셀다운
	public List<SafetyFacilLampMng> selectUnderWaterDevelopExcelList(SafetyFacilLampMngVO safetyFacilLampMngVO) {
		// TODO Auto-generated method stub
		return selectList("safetyFacilitiesMng.selectUnderWaterDevelopExcelList", safetyFacilLampMngVO);
	}
}
