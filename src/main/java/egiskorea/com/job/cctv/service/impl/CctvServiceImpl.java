package egiskorea.com.job.cctv.service.impl;

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

import egiskorea.com.job.cctv.service.CctvService;
import egiskorea.com.job.cctv.service.SafetyFacilCctvMng;
import egiskorea.com.job.cctv.service.SafetyFacilCctvMngVO;
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
@Service("cctvService")
public class CctvServiceImpl extends EgovAbstractServiceImpl implements CctvService{
	
	@Resource(name = "cctvDAO")
	private CctvDAO cctvDAO;
	
	// 안전시설물관리 > CCTV관리 목록 조회
	@Override
	public Map<String, Object> selectCctvList(SafetyFacilCctvMngVO safetyFacilCctvMngVO) throws Exception {
		
		List<?> list = cctvDAO.selectCctvList(safetyFacilCctvMngVO);
		int cnt = cctvDAO.selectCctvListCnt(safetyFacilCctvMngVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}
	
	// 안전시설물관리 > CCTV관리 상세보기
	public SafetyFacilCctvMng selectSafetyFacilCctvMng(SafetyFacilCctvMngVO safetyFacilCctvMngVO) throws Exception {		
		SafetyFacilCctvMng result = cctvDAO.selectSafetyFacilCctvMng(safetyFacilCctvMngVO);	
		return result;
	}
	
	// 안전시설물관리 > CCTV관리 삭제
	@Override
	public int deleteCctv(SafetyFacilCctvMng cctvVO) {
		return cctvDAO.deleteCctv(cctvVO);
	}
	
	// 안전시설물관리 > CCTV관리 등록
	@Override
	public int insertCctv(SafetyFacilCctvMng cctvVO) {
		return cctvDAO.insertCctv(cctvVO);
	}
	
	// 안전시설물관리 > CCTV관리 수정
	@Override
	public int updateCctv(SafetyFacilCctvMng cctvVO) {
		return cctvDAO.updateCctv(cctvVO);
	}
	
	// 안전시설물관리 > CCTV관리 엑셀다운
	@Override
	public HashMap cctvExcelDown(SafetyFacilCctvMngVO safetyFacilCctvMngVO) {
		HashMap cctvExcelDown = new HashMap();
		cctvExcelDown.put("b_list", cctvDAO.cctvExcelDown(safetyFacilCctvMngVO));
		return cctvExcelDown;
	}
	@Override
	public SXSSFWorkbook makeCctvExcelList(HashMap param) {
		SXSSFWorkbook workbook = new SXSSFWorkbook();

		// 시트 생성
		SXSSFSheet sheet = workbook.createSheet("CCTV관리목록");

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
		sheet.setColumnWidth(11, 5000);
		sheet.setColumnWidth(12, 5000);
		sheet.setColumnWidth(13, 5000);
		sheet.setColumnWidth(14, 5000);
		sheet.setColumnWidth(15, 5000);
		sheet.setColumnWidth(16, 5000);
		sheet.setColumnWidth(17, 5000);
		sheet.setColumnWidth(18, 5000);
		sheet.setColumnWidth(19, 5000);
		sheet.setColumnWidth(20, 5000);
		sheet.setColumnWidth(21, 5000);
		sheet.setColumnWidth(22, 5000);
		sheet.setColumnWidth(23, 5000);
		sheet.setColumnWidth(24, 5000);
		sheet.setColumnWidth(25, 5000);
		sheet.setColumnWidth(26, 5000);
		sheet.setColumnWidth(27, 5000);
		sheet.setColumnWidth(28, 5000);
		sheet.setColumnWidth(29, 5000);
		sheet.setColumnWidth(30, 5000);
		sheet.setColumnWidth(31, 5000);
		sheet.setColumnWidth(32, 5000);
		sheet.setColumnWidth(33, 5000);
		sheet.setColumnWidth(34, 5000);
		sheet.setColumnWidth(35, 5000);
		sheet.setColumnWidth(36, 5000);
		sheet.setColumnWidth(37, 5000);		

		// 헤더 행 생
		Row headerRow = sheet.createRow(0);
		// 해당 행의 첫번째 열 셀 생성
		Cell headerCell = headerRow.createCell(0);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("GID");

		// 해당 행의 두번째 열 셀 생성
		headerCell = headerRow.createCell(1);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("UID");

		// 해당 행의 세번째 열 셀 생성
		headerCell = headerRow.createCell(2);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("___ANNOX");

		// 해당 행의 네번째 열 셀 생성
		headerCell = headerRow.createCell(3);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("___ANNOY");

		headerCell = headerRow.createCell(4);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("명칭");

		headerCell = headerRow.createCell(5);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("기기ID");

		headerCell = headerRow.createCell(6);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("CHANNEL");

		headerCell = headerRow.createCell(7);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("구분");

		headerCell = headerRow.createCell(8);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PTZ_YN");
		
		headerCell = headerRow.createCell(9);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("TALK_YN");
		
		headerCell = headerRow.createCell(10);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("NET_YN");
		
		headerCell = headerRow.createCell(11);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET1");
		
		headerCell = headerRow.createCell(12);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET2");
		
		headerCell = headerRow.createCell(13);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET3");
		
		headerCell = headerRow.createCell(14);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET4");
		
		headerCell = headerRow.createCell(15);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET5");
		
		headerCell = headerRow.createCell(16);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET6");
		
		headerCell = headerRow.createCell(17);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET7");
		
		headerCell = headerRow.createCell(18);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET8");
		
		headerCell = headerRow.createCell(19);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET9");
		
		headerCell = headerRow.createCell(20);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET10");
		
		headerCell = headerRow.createCell(21);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET11");
		
		headerCell = headerRow.createCell(22);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET12");
		
		headerCell = headerRow.createCell(23);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET13");
		
		headerCell = headerRow.createCell(24);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET14");
		
		headerCell = headerRow.createCell(25);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET15");
		
		headerCell = headerRow.createCell(26);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET16");
		
		headerCell = headerRow.createCell(27);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET17");
		
		headerCell = headerRow.createCell(28);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET18");
		
		headerCell = headerRow.createCell(29);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET19");
		
		headerCell = headerRow.createCell(30);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("PRESET20");
		
		headerCell = headerRow.createCell(31);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("ANGLE");
		
		headerCell = headerRow.createCell(32);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("ADDR_OLD");
		
		headerCell = headerRow.createCell(33);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("ADDR_NEW");
		
		headerCell = headerRow.createCell(34);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("ADDR_IP");
		
		headerCell = headerRow.createCell(35);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("INS_YEAR");
		
		headerCell = headerRow.createCell(36);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("BIZ_YEAR");
		
		headerCell = headerRow.createCell(37);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("GEOM");

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
			if (BridgeInfo.get("uid") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("uid").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(2);
			if (BridgeInfo.get("___annox") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("___annox").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(3);
			if (BridgeInfo.get("___annoy") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("___annoy").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(4);
			if (BridgeInfo.get("label") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("label").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(5);
			if (BridgeInfo.get("deviceid") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("deviceid").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(6);
			if (BridgeInfo.get("channel") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("channel").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(7);
			if (BridgeInfo.get("gbn") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("gbn").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(8);
			if (BridgeInfo.get("ptz_yn") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("ptz_yn").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(9);
			if (BridgeInfo.get("talk_yn") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("talk_yn").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(10);
			if (BridgeInfo.get("net_yn") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("net_yn").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(11);
			if (BridgeInfo.get("preset1") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset1").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(12);
			if (BridgeInfo.get("preset2") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset2").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(13);
			if (BridgeInfo.get("preset3") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset3").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(14);
			if (BridgeInfo.get("preset4") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset4").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(15);
			if (BridgeInfo.get("preset5") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset5").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(16);
			if (BridgeInfo.get("preset6") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset6").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(17);
			if (BridgeInfo.get("preset7") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset7").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(18);
			if (BridgeInfo.get("preset8") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset8").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(19);
			if (BridgeInfo.get("preset9") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset9").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(20);
			if (BridgeInfo.get("preset10") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset10").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(21);
			if (BridgeInfo.get("preset11") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset11").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(22);
			if (BridgeInfo.get("preset12") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset12").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(23);
			if (BridgeInfo.get("preset13") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset13").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(24);
			if (BridgeInfo.get("preset14") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset14").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(25);
			if (BridgeInfo.get("preset15") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset15").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(26);
			if (BridgeInfo.get("preset16") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset16").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(27);
			if (BridgeInfo.get("preset17") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset17").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(28);
			if (BridgeInfo.get("preset18") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset18").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(29);
			if (BridgeInfo.get("preset19") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset19").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(30);
			if (BridgeInfo.get("preset20") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("preset20").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(31);
			if (BridgeInfo.get("angle") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("angle").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(32);
			if (BridgeInfo.get("addr_old") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("addr_old").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(33);
			if (BridgeInfo.get("addr_new") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("addr_new").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(34);
			if (BridgeInfo.get("addr_ip") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("addr_ip").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(35);
			if (BridgeInfo.get("ins_year") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("ins_year").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(36);
			if (BridgeInfo.get("biz_year") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("biz_year").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(37);
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
	
	// 안전시설물관리 > CCTV관리 poi
	@Override
	public List<SafetyFacilCctvMng> selectCctvPOIList(SafetyFacilCctvMng cctvVO) {
		return cctvDAO.selectCctvPOIList(cctvVO);
	} 
}	
