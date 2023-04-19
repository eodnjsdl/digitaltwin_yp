package egiskorea.com.job.fcmr.phfc.service.impl;

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

import egiskorea.com.job.fcmr.phfc.service.PhyEduFaciService;
import egiskorea.com.job.spor.service.SportsVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description : 시설관리/체육시설 Impl
 * @author      : 김영주
 * @since       : 2023.03.31
 * @version     : 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                    수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.03.31   김영주           최초 생성
 */

@Service("phyEduFaciService")
public class PhyEduFaciServiceImpl extends EgovAbstractServiceImpl implements PhyEduFaciService {

	@Resource(name = "phyEduFaciDAO")
	private PhyEduFaciDAO phyEduFaciDAO;
	
	/**
	 * 체육시설 상세보기
	 * @param SportsVO
	 * @throws Exception
	 */
	@Override
	public SportsVO selectPhyEduFaciDetail(SportsVO sportsVO) throws Exception {
		// TODO Auto-generated method stub
		SportsVO result = phyEduFaciDAO.selectPhyEduFaciDetail(sportsVO);
		
		return result;
	}
	
	/**
	 * 체육시설 등록
	 * @param sportsVO
	 * @return
	 */
	@Override
	public int insertPhyEduFaci(SportsVO sportsVO) throws Exception {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.insertPhyEduFaci(sportsVO);
	}
	
	/**
	 * 체육시설 수정
	 * @param sportsVO
	 * @return
	 */
	@Override
	public int updatePhyEduFaci(SportsVO sportsVO) throws Exception {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.updatePhyEduFaci(sportsVO);
	}
	
	/**
	 * 체육시설 삭제
	 * @param sportsVO
	 * @return
	 */
	@Override
	public int deletePhyEduFaci(SportsVO sportsVO) throws Exception {
		// TODO Auto-generated method stub
		int result = phyEduFaciDAO.deletePhyEduFaci(sportsVO);
		
		if (result > 0) {			
			phyEduFaciDAO.deletePhyMng(sportsVO);
			phyEduFaciDAO.deletePhyFaciMng(sportsVO);
		}
		return result;
	}
	
	/**
	 * 체육시설 엑셀 다운로드
	 * @param sportsVO
	 * @return
	 */
	@Override
	public HashMap getPhyEduFaciExcel(SportsVO sportsVO) {
		HashMap getPhyEduFaciExcel = new HashMap();
		getPhyEduFaciExcel.put("b_list", phyEduFaciDAO.getPhyEduFaciExcel(sportsVO));
		
		return getPhyEduFaciExcel;
	}

	/**
	 * 체육시설 엑셀
	 */

	@Override
	public SXSSFWorkbook makePhyEduFaciExcelList(HashMap param) {
		SXSSFWorkbook workbook = new SXSSFWorkbook();
		SXSSFSheet sheet = workbook.createSheet("체육시설목록");	// 시트 생성

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
		conStyle.setVerticalAlignment(VerticalAlignment.CENTER);	// 높이 가운데 정렬
		conStyle.setAlignment(HorizontalAlignment.CENTER);

		rstStyle.setBorderTop(BorderStyle.THIN);
		rstStyle.setBorderBottom(BorderStyle.THIN);
		rstStyle.setBorderLeft(BorderStyle.THIN);
		rstStyle.setBorderRight(BorderStyle.THIN);

		// 배경색
		headStyle.setFillForegroundColor(HSSFColorPredefined.LAVENDER.getIndex());
		headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

		// 데이터 가운데 정렬
		headStyle.setAlignment(HorizontalAlignment.CENTER);

		// 시트 열 너비 설정
		sheet.setColumnWidth(0, 1500);
		sheet.setColumnWidth(1, 10000);
		sheet.setColumnWidth(2, 5000);
		sheet.setColumnWidth(3, 4000);
		sheet.setColumnWidth(4, 5000);
		sheet.setColumnWidth(5, 3000);
		sheet.setColumnWidth(6, 3000);
		sheet.setColumnWidth(7, 4000);
		sheet.setColumnWidth(8, 4000);
		sheet.setColumnWidth(9, 4000);
		sheet.setColumnWidth(10, 4000);
		sheet.setColumnWidth(11, 4000);
		sheet.setColumnWidth(12, 20000);
		sheet.setColumnWidth(13, 4000);
		sheet.setColumnWidth(14, 4000);
		sheet.setColumnWidth(15, 4000);
		sheet.setColumnWidth(16, 4000);

		// 헤더 행 생
		Row headerRow = sheet.createRow(0);
		// 해당 행의 첫번째 열 셀 생성
		Cell headerCell = headerRow.createCell(0);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("번호");

		// 해당 행의 두번째 열 셀 생성
		headerCell = headerRow.createCell(1);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("시설명");

		// 해당 행의 세번째 열 셀 생성
		headerCell = headerRow.createCell(2);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("시설유형");

		// 해당 행의 네번째 열 셀 생성
		headerCell = headerRow.createCell(3);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("운영방식");

		headerCell = headerRow.createCell(4);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("설립일자");

		headerCell = headerRow.createCell(5);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("건물크기");

		headerCell = headerRow.createCell(6);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("토지크기");

		headerCell = headerRow.createCell(7);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("경기장규격");

		headerCell = headerRow.createCell(8);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("관람석수용인원");

		headerCell = headerRow.createCell(9);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("관리인원");

		headerCell = headerRow.createCell(10);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("연간이용인원");

		headerCell = headerRow.createCell(11);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("건립비용");

		headerCell = headerRow.createCell(12);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("주소");

		headerCell = headerRow.createCell(13);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("담당부서명");
		
		headerCell = headerRow.createCell(14);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("담당자명");
		
		headerCell = headerRow.createCell(15);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("연락처전화번호");
		
		headerCell = headerRow.createCell(16);
		headerCell.setCellStyle(headStyle);
		headerCell.setCellValue("시설개요");
		
		// 행 및 셀 생성
		int rowNum = 0;
		Row bodyRow = null;
		Cell bodyCell = null;
		ArrayList BridgeList = (ArrayList)param.get("b_list");
		
		for (int i = 0; i < BridgeList.size(); i++) {
			bodyRow = sheet.createRow(rowNum + 1);
			HashMap BridgeInfo = (HashMap)BridgeList.get(i);

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
			if (BridgeInfo.get("fclty_ty") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("fclty_ty").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(3);
			if (BridgeInfo.get("oper_mthd") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("oper_mthd").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(4);
			if (BridgeInfo.get("fond_de") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("fond_de").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(5);
			if (BridgeInfo.get("buld_size") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("buld_size").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(6);
			if (BridgeInfo.get("lad_size") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("lad_size").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(7);
			if (BridgeInfo.get("stdm_stndrd") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("stdm_stndrd").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(8);
			if (BridgeInfo.get("adtm_aceptnc_nmpr") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("adtm_aceptnc_nmpr").toString());
			}
			bodyCell.setCellStyle(conStyle);

			bodyCell = bodyRow.createCell(9);
			if (BridgeInfo.get("manage_nmpr") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("manage_nmpr").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(10);
			if (BridgeInfo.get("fyer_utlztn_nmpr") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("fyer_utlztn_nmpr").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(11);
			if (BridgeInfo.get("erc_ct") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("erc_ct").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(12);
			if (BridgeInfo.get("adres") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("adres").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(13);
			if (BridgeInfo.get("chrg_dept_nm") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("chrg_dept_nm").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(14);
			if (BridgeInfo.get("charger_nm") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("charger_nm").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(15);
			if (BridgeInfo.get("cttpc_telno") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("cttpc_telno").toString());
			}
			bodyCell.setCellStyle(conStyle);
			
			bodyCell = bodyRow.createCell(16);
			if (BridgeInfo.get("fclty_sumry") == null) {
				bodyCell.setCellValue("-");
			} else {
				bodyCell.setCellValue(BridgeInfo.get("fclty_sumry").toString());
			}
			bodyCell.setCellStyle(conStyle);

			rowNum++;
		}
		return workbook;
	}
	
	/**
	 * 체육시설 > 운영정보 리스트 조회
	 * @param sportsVO
	 * @return
	 */
	@Override
	public Map<String, Object> selectPhyMngList(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		List<?> list = phyEduFaciDAO.selectPhyMngList(sportsVO);

		int cnt = phyEduFaciDAO.selectPhyMngListCnt(sportsVO);

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}
	
	/**
	 * 체육시설 > 운영정보 년도 중복체크
	 * @param sportsVO
	 * @return
	 */
	@Override
	public int checkPhyMngYear(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.checkPhyMngYear(sportsVO);
	}
	
	/**
	 * 체육시설 > 운영정보 등록
	 * @param sportsVO
	 * @return
	 */
	@Override
	public int insertPhyMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.insertPhyMng(sportsVO);
	}
	
	/**
	 * 체육시설 > 운영정보 수정
	 * @param sportsVO
	 * @return
	 */
	@Override
	public int updatePhyMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.updatePhyMng(sportsVO);
	}
	
	/**
	 * 체육시설 > 운영정보 삭제
	 * @param sportsVO
	 * @return
	 */
	@Override
	public int deletePhyMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.deletePhyMng(sportsVO);
	}
	
	/**
	 * 체육시설 > 시설정보 리스트 조회
	 * @param sportsVO
	 * @return
	 */
	@Override
	public Map<String, Object> selectPhyFaciMngList(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		List<?> list = phyEduFaciDAO.selectPhyFaciMngList(sportsVO);

		int cnt = phyEduFaciDAO.selectPhyFaciMngListCnt(sportsVO);

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}
	
	/**
	 * 체육시설 > 시설정보 등록
	 * @param sportsVO
	 * @return
	 */
	@Override
	public int insertPhyFaciMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.insertPhyFaciMng(sportsVO);
	}
	
	/**
	 * 체육시설 > 시설정보 삭제
	 * @param sportsVO
	 * @return
	 */
	@Override
	public int deletePhyFaciMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return phyEduFaciDAO.deletePhyFaciMng(sportsVO);
	}
}
