package egiskorea.com.job.sffm.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.xssf.streaming.SXSSFWorkbook;

/**
 * @Description 안전시설물관리 service 클래스
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

public interface SafetyFacilitiesMngService {
	
	/** 
	 * 업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 목록 조회
	 * @param safetyFacilitiesMngVO
	 * @return map
	 * @throws Exception
	 */
	public Map<String, Object> selectSafetyFacilLampMngList(SafetyFacilLampMngVO safetyFacilLampMngVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 상세보기
	 * @param safetyFacilLampMngVO
	 * @return list
	 * @throws Exception
	 */
	public SafetyFacilLampMng selectSafetyFacilLampMng(SafetyFacilLampMngVO safetyFacilLampMngVO) throws Exception;
	
	// 안전시설물관리 > 가로등관리 삭제
	public int deleteSffm(SafetyFacilLampMng sffmVO);
	
	// 안전시설물관리 > 가로등관리 등록
	public int insertSffm(SafetyFacilLampMng sffmVO);
	
	// 안전시설물관리 > 가로등관리 수정
	public int updateSffm(SafetyFacilLampMng sffmVO);
	
	// 안전시설물관리 > 가로등관리 엑셀다운
	/*SXSSFWorkbook makeSffmExcelList(HashMap parameter);
	HashMap sffmExcelDown(SafetyFacilLampMngVO sffmVO);*/
	
	// 안전시설물관리 > 가로등관리 poi
	public List<SafetyFacilLampMng> selectSffmPOIList(SafetyFacilLampMngVO sffmVO);

	public List<SafetyFacilLampMng> selectSffmLampFacilExcelListDownload(SafetyFacilLampMngVO safetyFacilLampMngVO);


}
