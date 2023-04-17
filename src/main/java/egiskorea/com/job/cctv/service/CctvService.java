package egiskorea.com.job.cctv.service;

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

public interface CctvService {
	
	// 안전시설물관리 > CCTV관리 목록 조회
	public Map<String, Object> selectCctvList(SafetyFacilCctvMngVO safetyFacilCctvMngVO) throws Exception;

	// 안전시설물관리 > CCTV관리 상세보기
	public SafetyFacilCctvMng selectSafetyFacilCctvMng(SafetyFacilCctvMngVO safetyFacilCctvMngVO) throws Exception;
	
	// 안전시설물관리 > CCTV 삭제
	public int deleteCctv(SafetyFacilCctvMng cctvVO);
	
	// 안전시설물관리 > CCTV 등록
	public int insertCctv(SafetyFacilCctvMng cctvVO);
	
	// 안전시설물관리 > CCTV 수정
	public int updateCctv(SafetyFacilCctvMng cctvVO);
	
	// 안전시설물관리 > CCTV 엑셀다운
	SXSSFWorkbook makeCctvExcelList(HashMap parameter);
	HashMap cctvExcelDown(SafetyFacilCctvMngVO safetyFacilCctvMngVO);
	
	// 안전시설물관리 > CCTV poi
	public List<SafetyFacilCctvMng> selectCctvPOIList(SafetyFacilCctvMng cctvVO);

	public List<SafetyFacilCctvMng> selectSffmCctvFacilExcelListDownload(SafetyFacilCctvMngVO safetyFacilCctvMngVO); 
}
