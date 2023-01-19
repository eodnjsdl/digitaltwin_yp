package egiskorea.com.job.wlre.service.impl;

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

import egiskorea.com.job.wlre.service.WelfareService;
import egiskorea.com.job.wlre.service.WelfareVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;


/**
 * 
* <pre>
* 간략 : 복지시설 관리 Impl.
* 상세 : .
* egiskorea.com.fcty.wlre.service.impl
*   |_ WelfareServiceImpl.java
* </pre>
* 
* @Company : DGIST
* @Author  : j
* @Date    : 2022. 1. 5 오전 9:41:41
* @Version : 1.0
 */

@Service("welfareService")
public class WelfareServiceImpl extends EgovAbstractServiceImpl implements WelfareService {

	@Resource(name="welfareDAO")
	private WelfareDAO welfareDAO;
	
	// 복지시설 조회
	@Override
	public Map<String, Object> selectWelfareList(WelfareVO welfareVO) {
		
		List<?> list = welfareDAO.selectWelfareList(welfareVO);
		int cnt = welfareDAO.selectWelfareListCnt(welfareVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}
	
	// 복지시설 삭제
	@Override
	public int deleteWelfare(WelfareVO welfareVO) {
		return welfareDAO.deleteWelfare(welfareVO);
	}
	
	// 복지시설 등록
	@Override
	public int insertWelfare(WelfareVO welfareVO) {
		return welfareDAO.insertWelfare(welfareVO);
	}
	
	// 복지시설 상세조회
	@Override
	public WelfareVO selectWelfare(WelfareVO welfareVO) {
		return welfareDAO.selectWelfare(welfareVO);
	}
	
	// 복지시설 수정
	@Override
	public int updateWelfare(WelfareVO welfareVO) {
		return welfareDAO.updateWelfare(welfareVO);
	}
	
	// 복지시설 엑셀다운
	@Override
	public HashMap wlreExcelDown(WelfareVO welfareVO) {
		HashMap wlreExcelDown = new HashMap();
		wlreExcelDown.put("b_list", welfareDAO.wlreExcelDown(welfareVO));
		return wlreExcelDown;
	}
	@Override
	public SXSSFWorkbook makeWlreExcelList(HashMap param) {
		SXSSFWorkbook workbook = new SXSSFWorkbook();

		// 시트 생성
		SXSSFSheet sheet = workbook.createSheet("복지시설목록");

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
		sheet.setColumnWidth(10, 5000);

		// 헤더 행 생
		Row headerRow = sheet.createRow(0);
		// 해당 행의 첫번째 열 셀 생성
		Cell headerCell = headerRow.createCell(0);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("GID");

		// 해당 행의 두번째 열 셀 생성
		headerCell = headerRow.createCell(1);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("시설명");

		// 해당 행의 세번째 열 셀 생성
		headerCell = headerRow.createCell(2);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("도로명주소");

		// 해당 행의 네번째 열 셀 생성
		headerCell = headerRow.createCell(3);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("지번주소");

		headerCell = headerRow.createCell(4);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("우편번호");

		headerCell = headerRow.createCell(5);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("위도");

		headerCell = headerRow.createCell(6);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("경도");

		headerCell = headerRow.createCell(7);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("시설구분");

		headerCell = headerRow.createCell(8);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("연락처전화번호");
		
		headerCell = headerRow.createCell(9);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("데이터기준일");
		
		headerCell = headerRow.createCell(10);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("GEOMETRY");

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
			if (BridgeInfo.get("fclty_nm") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("fclty_nm").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(2);
			if (BridgeInfo.get("rn_adres") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("rn_adres").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(3);
			if (BridgeInfo.get("lnm_adres") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("lnm_adres").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(4);
			if (BridgeInfo.get("zip") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("zip").toString());
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
			if (BridgeInfo.get("fclty_se") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("fclty_se").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(8);
			if (BridgeInfo.get("cttpc_telno") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("cttpc_telno").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(9);
			if (BridgeInfo.get("data_stdde") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("data_stdde").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(10);
			if (BridgeInfo.get("geom") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("geom").toString());
			}
			bodyCell.setCellStyle(conStyle);

			rowNum++;
		}

		return workbook;
	}
	
	// 복지시설 poi
	@Override
	public List<WelfareVO> selectWlrePOIList(WelfareVO welfareVO) {
		return welfareDAO.selectWlrePOIList(welfareVO);
	}
	
	//시설구분 코드정보 조회
	@Override
	public List<WelfareVO> welfareCode(WelfareVO welfareVO) {
		return welfareDAO.welfareCode(welfareVO);
	}
}
