package egiskorea.com.job.sffm.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.poi.hssf.util.HSSFColor.HSSFColorPredefined;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.stereotype.Service;

import egiskorea.com.job.sffm.service.SafetyFacilitiesMngService;
import egiskorea.com.job.wlre.service.WelfareVO;
import egiskorea.com.job.sffm.service.SafetyFacilLampMng;
import egiskorea.com.job.sffm.service.SafetyFacilLampMngVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 안전시설물관리 serviceImpl 클래스
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
@Service("safetyFacilitiesMngService")
public class SafetyFacilitiesMngServiceImpl extends EgovAbstractServiceImpl implements SafetyFacilitiesMngService{
	
	@Resource(name = "safetyFacilitiesMngDAO")
	private SafetyFacilitiesMngDAO safetyFacilitiesMngDAO;
	
	/** 
	 * 업무 > 공간정보활용 > 안전시설물관리 목록 조회
	 * @param safetyFacilitiesMngVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectSafetyFacilLampMngList(SafetyFacilLampMngVO safetyFacilLampMngVO) throws Exception {
		
		List<?> list = safetyFacilitiesMngDAO.selectSafetyFacilLampMngList(safetyFacilLampMngVO);
		int cnt = safetyFacilitiesMngDAO.selectSafetyFacilLampMngListCnt(safetyFacilLampMngVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 상세보기
	 * @param safetyFacilLampMngVO
	 * @return list
	 * @throws Exception
	 */
	public SafetyFacilLampMng selectSafetyFacilLampMng(SafetyFacilLampMngVO safetyFacilLampMngVO) throws Exception {
		
		SafetyFacilLampMng result = safetyFacilitiesMngDAO.selectSafetyFacilLampMng(safetyFacilLampMngVO);
		
		return result;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 삭제
	 * @param safetyFacilLampMngVO
	 * @return int
	 */
	@Override
	public int deleteSffm(SafetyFacilLampMng sffmVO) {
		return safetyFacilitiesMngDAO.deleteSffm(sffmVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 등록
	 * @param safetyFacilLampMngVO
	 * @return int
	 */
	@Override
	public int insertSffm(SafetyFacilLampMng sffmVO) {
		return safetyFacilitiesMngDAO.insertSffm(sffmVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 수정
	 * @param safetyFacilLampMngVO
	 * @return int
	 */
	@Override
	public int updateSffm(SafetyFacilLampMng sffmVO) {
		return safetyFacilitiesMngDAO.updateSffm(sffmVO);
	}
	
	
	// 안전시설물관리 > 가로등관리 poi
	@Override
	public List<SafetyFacilLampMng> selectSffmPOIList(SafetyFacilLampMngVO sffmVO) {
		return safetyFacilitiesMngDAO.selectSffmPOIList(sffmVO);
	}

	/** 
	 * 업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 엑셀 다운
	 * @param safetyFacilLampMngVO
	 * @return list
	 */
	@Override
	public List<SafetyFacilLampMng> selectSffmLampFacilExcelListDownload(SafetyFacilLampMngVO sffmVO) {
		
		return safetyFacilitiesMngDAO.selectUnderWaterDevelopExcelList(sffmVO);
	}


}	
