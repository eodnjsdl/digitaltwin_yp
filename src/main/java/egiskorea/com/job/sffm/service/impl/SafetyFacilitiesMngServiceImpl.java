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
	
	// 안전시설물관리 > 가로등관리 삭제
	@Override
	public int deleteSffm(SafetyFacilLampMng sffmVO) {
		return safetyFacilitiesMngDAO.deleteSffm(sffmVO);
	}
	
	// 안전시설물관리 > 가로등관리 등록
	@Override
	public int insertSffm(SafetyFacilLampMng sffmVO) {
		return safetyFacilitiesMngDAO.insertSffm(sffmVO);
	}
	
	// 안전시설물관리 > 가로등관리 수정
	@Override
	public int updateSffm(SafetyFacilLampMng sffmVO) {
		return safetyFacilitiesMngDAO.updateSffm(sffmVO);
	}
	
	// 안전시설물관리 > 가로등관리 엑셀다운
	@Override
	public HashMap sffmExcelDown(SafetyFacilLampMngVO sffmVO) {
		HashMap sffmExcelDown = new HashMap();
		sffmExcelDown.put("b_list", safetyFacilitiesMngDAO.sffmExcelDown(sffmVO));
		return sffmExcelDown;
	}
	@Override
	public SXSSFWorkbook makeSffmExcelList(HashMap param) {
		SXSSFWorkbook workbook = new SXSSFWorkbook();

		// 시트 생성
		SXSSFSheet sheet = workbook.createSheet("가로등관리목록");

		CellStyle headStyle = workbook.createCellStyle();
		CellStyle conStyle = workbook.createCellStyle();
		CellStyle rstStyle = workbook.createCellStyle();

		headStyle.setBorderTop(BorderStyle.THIN);
		headStyle.setBorderBottom(BorderStyle.THIN);
		headStyle.setBorderLeft(BorderStyle.THIN);
		headStyle.setBorderRight(BorderStyle.THIN);

		conStyle.setBorderTop(BorderStyle.THIN);
		conStyle.setBorderBottom(BorderStyle.THIN);
		conStyle.setBorderLeft(BorderStyle.THIN);
		conStyle.setBorderRight(BorderStyle.THIN);
		conStyle.setVerticalAlignment(VerticalAlignment.CENTER); // 높이 가운데 정렬
		conStyle.setAlignment(HorizontalAlignment.CENTER);

		rstStyle.setBorderTop(BorderStyle.THIN);
		rstStyle.setBorderBottom(BorderStyle.THIN);
		rstStyle.setBorderLeft(BorderStyle.THIN);
		rstStyle.setBorderRight(BorderStyle.THIN);

		// 배경색
		headStyle.setFillForegroundColor(HSSFColorPredefined.LAVENDER.getIndex());
		headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

		// 데이터는 가운데 정렬합니다.
		headStyle.setAlignment(HorizontalAlignment.CENTER);

		// 시트 열 너비 설정
		sheet.setColumnWidth(0, 5000);
		sheet.setColumnWidth(1, 5000);
		sheet.setColumnWidth(2, 5000);
		sheet.setColumnWidth(3, 5000);
		sheet.setColumnWidth(4, 5000);
		sheet.setColumnWidth(5, 5000);
		sheet.setColumnWidth(6, 5000);
		sheet.setColumnWidth(7, 5000);
		sheet.setColumnWidth(8, 5000);
		sheet.setColumnWidth(9, 5000);

		// 헤더 행 생
		Row headerRow = sheet.createRow(0);
		// 해당 행의 첫번째 열 셀 생성
		Cell headerCell = headerRow.createCell(0);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("GID");

		// 해당 행의 두번째 열 셀 생성
		headerCell = headerRow.createCell(1);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("관리번호");

		// 해당 행의 세번째 열 셀 생성
		headerCell = headerRow.createCell(2);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("주소");

		// 해당 행의 네번째 열 셀 생성
		headerCell = headerRow.createCell(3);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("설치일자");

		headerCell = headerRow.createCell(4);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("가로등수");

		headerCell = headerRow.createCell(5);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("위도");

		headerCell = headerRow.createCell(6);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("경도");

		headerCell = headerRow.createCell(7);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("기준일");

		headerCell = headerRow.createCell(8);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("GEOMETRY");
		
		headerCell = headerRow.createCell(9);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("고도");

		// 행 및 셀 생성
		int rowNum = 0;
		int pstRowNum = 1;
		Row bodyRow = null;
		Cell bodyCell = null;
		ArrayList BridgeList = (ArrayList) param.get("b_list");

		for (int i = 0; i < BridgeList.size(); i++) {
			bodyRow = sheet.createRow(rowNum + 1);
			HashMap BridgeInfo = (HashMap) BridgeList.get(i);

			bodyCell = bodyRow.createCell(0);
			bodyCell.setCellValue(BridgeInfo.get("gid").toString());
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(1);
			if (BridgeInfo.get("manage_no") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("manage_no").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(2);
			if (BridgeInfo.get("adres") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("adres").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(3);
			if (BridgeInfo.get("instl_de") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("instl_de").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(4);
			if (BridgeInfo.get("strtlgt_cnt") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("strtlgt_cnt").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(5);
			if (BridgeInfo.get("lat") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("lat").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(6);
			if (BridgeInfo.get("lon") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("lon").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(7);
			if (BridgeInfo.get("stdde") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("stdde").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(8);
			if (BridgeInfo.get("geom") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("geom").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(9);
			if (BridgeInfo.get("alttd") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("alttd").toString());
			}
			bodyCell.setCellStyle(conStyle);

			rowNum++;
		}

		return workbook;
	}
	
	// 안전시설물관리 > 가로등관리 poi
	@Override
	public List<SafetyFacilLampMng> selectSffmPOIList(SafetyFacilLampMngVO sffmVO) {
		return safetyFacilitiesMngDAO.selectSffmPOIList(sffmVO);
	}
}	
