package egiskorea.com.cmt.uai.service.impl;

import javax.annotation.Resource;
import egiskorea.com.cmm.service.CmmUtils;

import egiskorea.com.cmm.service.Globals;
import egiskorea.com.cmt.uai.service.BuildingRegister;
import egovframework.com.cmm.service.EgovProperties;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import egiskorea.com.cmt.uai.service.UnityAdministrationInfoService;
import egiskorea.com.cmt.uai.service.UnityAdministrationInfoVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.ui.Model;
import org.springframework.web.servlet.ModelAndView;

import java.io.*;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @Description 통합행정정보를 관리하는 serviceImpl 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.03.07
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.07		이상화	최초 생성
 *  </pre>
 */

@Service("unityAdministrationInfoService")
public class UnityAdministrationInfoServiceImpl extends EgovAbstractServiceImpl implements UnityAdministrationInfoService{

	private static final Logger LOGGER = LoggerFactory.getLogger(UnityAdministrationInfoServiceImpl.class);

	@Resource(name="unityAdministrationInfoDAO")
	private UnityAdministrationInfoDAO unityAdministrationInfoDAO;
	
	/**
	 * @Description pnu를 통해 주소정보 조회 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.03.07
	 * @param unityAdministrationInfoVO
	 * @return
	 */
	public UnityAdministrationInfoVO getAddrByPnu(UnityAdministrationInfoVO unityAdministrationInfoVO) {
		return unityAdministrationInfoDAO.getAddrByPnu(unityAdministrationInfoVO);
	}

	/**
	 * @Description kras에 주소를 통해 요청
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.21
	 * @param param 쿼리스트링 형태로 값을 던진다. 예) conn_svc_id=KRAS000038&adm_sect_cd=41830&conn_sys_id=4BHH-YN9K-SFC1-XTFV&layer_cd=LSMD_CONT_LDREG
	 * @param file File()객체
	 * @return 성공:true, 실패:false
	 */
	public boolean krasURLConnectionShpDownload(String param, File file) {
		boolean result = false;
		try {
			URL url = new URL(Globals.KRAS_PROXY_URL + "?" + param);

			System.out.println("kras 요청 url : " + Globals.KRAS_PROXY_URL + "?" + param);
			try {
				ReadableByteChannel rbc = Channels.newChannel(url.openStream());
				FileOutputStream fos = new FileOutputStream(file);
				fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE); // 처음부터 끝까지 다운로드
				fos.close();

				if (file.isFile() && file.exists()) {
					LOGGER.info("=====================KRAS(부동산공부시스템) " + file.getName() + " 파일 다운로드 성공=====================");
					result = true; //파일이 존재 할 경우에만 성공 코드를 넣어줌.
				} else {
					LOGGER.info("=====================KRAS(부동산공부시스템) " + file.getName() + " 파일 다운로드 실패(2)=====================");
				}
			} catch (Exception e) {
				LOGGER.info("=====================KRAS(부동산공부시스템) " + file.getName() + " 파일 다운로드 실패(1)=====================");
				LOGGER.debug(e.getMessage(), e);
			}
		} catch (IOException e) {
			LOGGER.info("=====================KRAS(부동산공부시스템) 연결 실패(1)=====================");
			LOGGER.debug(e.getMessage(), e);
		}

		return result;
	}

	/**
	 * @Description shp파일을 postgreSql ogr2ogr를 이용하여 디비로 삽입 해주는 매소드
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.21
	 * @param shpFullPath shp파일 전체경로
	 * @param nlt 지오메트리 유형
	 * @param tableName shp파일이 들어갈 테이블 이름
	 * @param originalEPSG shp파일 좌표계 값
	 * @param changeEPSG db에 들어갈때 변환되어야 할 좌표계 값
	 */
	public void shpToPostgres(String shpFullPath, String nlt, String tableName, String originalEPSG, String changeEPSG) {
		//hashMap 결과로 (host, port, dbName, dbUser, dbPwd)를 받아올 수 있다.
		HashMap<String, String> databases = CmmUtils.databases();
		Process process = null;
		BufferedReader successBufferReader = null; // 성공 버퍼
		BufferedReader errorBufferReader = null; // 오류 버퍼
		String ogr2ogr = "ogr2ogr";

				//명령어 세팅
		List<String> command = new ArrayList<String>();
		if (System.getProperty("os.name").indexOf("Windows") > -1) { //윈도우 일경우
			command.add("cmd.exe");
			command.add("/c");
			ogr2ogr = EgovProperties.getProperty("Globals.install.path") + "ogr2ogr";
		} else { //리눅스 일경우
			command.add("/bin/sh");
			command.add("-c");
		}

		String cmd = ogr2ogr + " -f PostgresSQL PG:\"dbname=" + databases.get("dbName") + " host='" + databases.get("host") + "' port=" + databases.get("port") + " user='" + databases.get("dbUser") + "' password='" + databases.get("dbPwd") + "'\" " +
				shpFullPath + " " +
				"-nlt " + nlt + " " +
				"-nln " + tableName + " " +
				"-s_srs " + originalEPSG + " " +
				"-t_srs " + changeEPSG + " " +
				"-lco GEOMETRY_NAME=geom " +
				"-lco FID=gid " +
				"-update -overwrite --config SHAPE_ENCODING \"CP949\""; //외부에서 실행시킬
		// 명령어 셋팅
		command.add(cmd);

		LOGGER.info("커맨드 실행 명령어 : " + command.toString());

		try {
			//명령어 실행
			ProcessBuilder processBuilder = new ProcessBuilder().command(command);
			process = processBuilder.start();

			//정상 동작했을 경우
			successBufferReader = new BufferedReader(new InputStreamReader(process.getInputStream(), "EUC-KR"));
			String success = IOUtils.toString(successBufferReader);

			//에러가 발생했을 경우
			errorBufferReader = new BufferedReader(new InputStreamReader(process.getErrorStream(), "EUC-KR"));
			String error = IOUtils.toString(errorBufferReader);

			int exitCode = process.waitFor();
			if (process.exitValue() == 0) { //정상적으로 종료됬을 경우
				LOGGER.info("=====================command 실행 성공=====================");
				LOGGER.info("실행결과 : " + success);
			} else {
				LOGGER.info("=====================command 비정상 종료=====================");
				LOGGER.info("실행결과 : " + success);
			}

			if (StringUtils.isNotEmpty(error)) {
				LOGGER.info("=====================command 실행 에러=====================");
				LOGGER.info("실행결과 : " + error);
			}
		} catch (IOException e) {
			LOGGER.info("=====================실행 실패(1)=====================");
			LOGGER.debug(e.getMessage(), e);
		} catch (InterruptedException e) {
			LOGGER.info("=====================실행 실패(2)=====================");
			LOGGER.debug(e.getMessage(), e);
		} catch (Exception e) {
			LOGGER.info("=====================실행 실패(3)=====================");
			LOGGER.debug(e.getMessage(), e);
			try {
				process.destroy();
				if (successBufferReader != null) successBufferReader.close();
				if (errorBufferReader != null) errorBufferReader.close();
			} catch (IOException e1) {
				LOGGER.info("=====================실행 실패(4)=====================");
				LOGGER.debug(e.getMessage(), e1);
			}
		}
	}

	/**
	 * 지적/건물 > 건축물대장 엑셀 생성
	 */

	@Override
	public SXSSFWorkbook makeBuildingExcelList(HashMap param) {
		SXSSFWorkbook workbook = new SXSSFWorkbook();

		// 시트 생성
		SXSSFSheet sheet = workbook.createSheet("건축물대장");

		CellStyle headStyle = workbook.createCellStyle();
		CellStyle labelStyle = workbook.createCellStyle();
		CellStyle conStyle = workbook.createCellStyle();
		CellStyle rstStyle = workbook.createCellStyle();

		headStyle.setBorderTop(BorderStyle.THIN);
		headStyle.setBorderBottom(BorderStyle.THIN);
		headStyle.setBorderLeft(BorderStyle.THIN);
		headStyle.setBorderRight(BorderStyle.THIN);

		labelStyle.setBorderTop(BorderStyle.THIN);
		labelStyle.setBorderBottom(BorderStyle.THIN);
		labelStyle.setBorderLeft(BorderStyle.THIN);
		labelStyle.setBorderRight(BorderStyle.THIN);

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
		headStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.GREY_25_PERCENT.getIndex());
		headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

		// 데이터는 가운데 정렬합니다.
		headStyle.setAlignment(HorizontalAlignment.CENTER);

		// 라벨 배경색
		Font font = workbook.createFont();
		font.setColor(HSSFColor.HSSFColorPredefined.WHITE.getIndex());
		font.setBold(true);
		labelStyle.setFont(font);
		labelStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.ROYAL_BLUE.getIndex());
		labelStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

		// 라벨 데이터는 가운데 정렬합니다.
		labelStyle.setAlignment(HorizontalAlignment.CENTER);

		// 시트 열 너비 설정
		sheet.setColumnWidth(0, 10000);
		sheet.setColumnWidth(1, 10000);
		sheet.setColumnWidth(2, 5000);
		sheet.setColumnWidth(3, 6000);
		sheet.setColumnWidth(4, 6000);
		sheet.setColumnWidth(5, 7000);
		sheet.setColumnWidth(6, 10000);
		sheet.setColumnWidth(7, 4000);
		sheet.setColumnWidth(8, 6000);
		sheet.setColumnWidth(9, 4000);
		sheet.setColumnWidth(10, 4000);
		sheet.setColumnWidth(11, 4000);
		sheet.setColumnWidth(12, 6000);
		sheet.setColumnWidth(13, 6000);
		sheet.setColumnWidth(14, 4000);
		sheet.setColumnWidth(15, 4000);
		sheet.setColumnWidth(16, 4000);
		sheet.setColumnWidth(17, 4000);
		sheet.setColumnWidth(18, 4000);
		sheet.setColumnWidth(19, 4000);
		sheet.setColumnWidth(20, 4000);
		sheet.setColumnWidth(21, 4000);
		sheet.setColumnWidth(22, 4000);
		sheet.setColumnWidth(23, 4000);
		sheet.setColumnWidth(24, 4000);
		sheet.setColumnWidth(25, 6000);
		sheet.setColumnWidth(26, 6000);
		sheet.setColumnWidth(27, 6000);
		sheet.setColumnWidth(28, 6000);
		sheet.setColumnWidth(29, 6000);
		sheet.setColumnWidth(30, 4000);
		sheet.setColumnWidth(31, 4000);
		sheet.setColumnWidth(32, 4000);
		sheet.setColumnWidth(33, 5000);

		// 1번째 행 생성 - 라벨
		Row headerRow1 = sheet.createRow(0);
		// 1번째 행의 첫번째 열 셀 생성
		Cell headerCell1 = headerRow1.createCell(0);
		headerCell1.setCellStyle(labelStyle);
		headerCell1.setCellValue("기본정보");

		// 2번째 행 생성 - 헤더
		Row headerRow2 = sheet.createRow(1);
		// 2번째 행의 첫번째 열 셀 생성
		Cell headerCell2 = headerRow2.createCell(0);
		headerCell2.setCellStyle(headStyle);
		headerCell2.setCellValue("대장종류");

		// 해당 행의 두번째 열 셀 생성
		headerCell2 = headerRow2.createCell(1);
		headerCell2.setCellStyle(headStyle);
		headerCell2.setCellValue("건물명");

		// 해당 행의 두번째 열 셀 생성
		headerCell2 = headerRow2.createCell(2);
		headerCell2.setCellStyle(headStyle);
		headerCell2.setCellValue("동명");

		// 해당 행의 두번째 열 셀 생성
		headerCell2 = headerRow2.createCell(3);
		headerCell2.setCellStyle(headStyle);
		headerCell2.setCellValue("주용도");

		// 해당 행의 두번째 열 셀 생성
		headerCell2 = headerRow2.createCell(4);
		headerCell2.setCellStyle(headStyle);
		headerCell2.setCellValue("연면적(㎡)");

		// 해당 행의 두번째 열 셀 생성
		headerCell2 = headerRow2.createCell(5);
		headerCell2.setCellStyle(headStyle);
		headerCell2.setCellValue("승인일자");

		// 해당 행의 두번째 열 셀 생성
		headerCell2 = headerRow2.createCell(6);
		headerCell2.setCellStyle(headStyle);
		headerCell2.setCellValue("지번주소");

		//기본정보 행 및 셀 생성
		int rowNum = 2;
		Row bodyRow = null;
		Cell bodyCell = null;
		//기본정보 표출
		ArrayList resultListm = (ArrayList) param.get("resultListm");
		if(resultListm.size() == 0) {
			bodyRow = sheet.createRow(rowNum + 0);
			bodyCell = bodyRow.createCell(0);
			bodyCell.setCellValue("정보가 존재하지 않습니다.");
//			sheet.addMergedRegion(new CellRangeAddress(rowNum, rowNum, 0, 1));
		} else {
			for (int i = 0; i < resultListm.size(); i++) {
				bodyRow = sheet.createRow(rowNum + i);

				//대장종류
				bodyCell = bodyRow.createCell(0);
				if (((BuildingRegister) resultListm.get(i)).getRegstrKindCdNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListm.get(i)).getRegstrKindCdNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//건물명
				bodyCell = bodyRow.createCell(1);
				if (((BuildingRegister) resultListm.get(i)).getBldNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListm.get(i)).getBldNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//동명
				bodyCell = bodyRow.createCell(2);
				if (((BuildingRegister) resultListm.get(i)).getDongNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListm.get(i)).getDongNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//주용도
				bodyCell = bodyRow.createCell(3);
				if (((BuildingRegister) resultListm.get(i)).getMainPurpsCdNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListm.get(i)).getMainPurpsCdNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//연면적(㎡)
				bodyCell = bodyRow.createCell(4);
				if (((BuildingRegister) resultListm.get(i)).getTotArea().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListm.get(i)).getTotArea().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//승인일자
				bodyCell = bodyRow.createCell(5);
				if (((BuildingRegister) resultListm.get(i)).getUseAprDay().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListm.get(i)).getUseAprDay().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//지번주소
				bodyCell = bodyRow.createCell(6);
				if (((BuildingRegister) resultListm.get(i)).getPlatPlc().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListm.get(i)).getPlatPlc().toString());
				}
				bodyCell.setCellStyle(conStyle);
			}
		}

		//상세정보
		int cr1 = rowNum + (resultListm.size() == 0 ? 1: resultListm.size()) + 1;
		// n번째 행 생성 - 라벨
		Row headerRow5 = sheet.createRow(cr1);
		// n번째 행의 첫번째 열 셀 생성
		Cell headerCell5 = headerRow5.createCell(0);
		headerCell5.setCellStyle(labelStyle);
		headerCell5.setCellValue("상세정보");

		int cr1N = cr1 + 1;
		// 6번째 행 생성 - 헤더
		Row headerRow6 = sheet.createRow(cr1N);
		// 6번째 행의 첫번째 열 셀 생성
		Cell headerCell6 = headerRow6.createCell(0);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("지번주소");

		headerCell6 = headerRow6.createCell(1);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("도로명주소");

		headerCell6 = headerRow6.createCell(2);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("동명칭");

		headerCell6 = headerRow6.createCell(3);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("양성화여부");

		headerCell6 = headerRow6.createCell(4);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("대지면적(㎡)");

		headerCell6 = headerRow6.createCell(5);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("주/부속구분");

		headerCell6 = headerRow6.createCell(6);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("건폐율(%)");

		headerCell6 = headerRow6.createCell(7);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("연면적(㎡)");

		headerCell6 = headerRow6.createCell(8);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("용적율 산정연면적(㎡)");

		headerCell6 = headerRow6.createCell(9);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("용적율(%)");

		headerCell6 = headerRow6.createCell(10);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("구조");

		headerCell6 = headerRow6.createCell(11);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("구조(기타)");

		headerCell6 = headerRow6.createCell(12);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("주용도");

		headerCell6 = headerRow6.createCell(13);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("용도(기타)");

		headerCell6 = headerRow6.createCell(14);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("지붕");

		headerCell6 = headerRow6.createCell(15);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("지붕(기타)");

		headerCell6 = headerRow6.createCell(16);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("세대수");

		headerCell6 = headerRow6.createCell(17);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("가구수");

		headerCell6 = headerRow6.createCell(18);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("높이");

		headerCell6 = headerRow6.createCell(19);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("지상층수");

		headerCell6 = headerRow6.createCell(20);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("지하층수");

		headerCell6 = headerRow6.createCell(21);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("승용승강기대수");

		headerCell6 = headerRow6.createCell(22);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("비상용승강기대수");

		headerCell6 = headerRow6.createCell(23);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("총동연면적(㎡)");

		headerCell6 = headerRow6.createCell(24);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("옥외기계식주차대수");

		headerCell6 = headerRow6.createCell(25);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("옥외기계식주차면적(㎡)");

		headerCell6 = headerRow6.createCell(26);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("옥내자주식주차대수");

		headerCell6 = headerRow6.createCell(27);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("옥내자주식주차면적(㎡)");

		headerCell6 = headerRow6.createCell(28);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("옥외자주식주차대수");

		headerCell6 = headerRow6.createCell(29);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("옥외자주식주차면적(㎡)");

		headerCell6 = headerRow6.createCell(30);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("허가일");

		headerCell6 = headerRow6.createCell(31);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("착공일");

		headerCell6 = headerRow6.createCell(32);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("사용승인일");

		headerCell6 = headerRow6.createCell(33);
		headerCell6.setCellStyle(headStyle);
		headerCell6.setCellValue("허가번호");

		//상세정보 행 및 셀 생성
		int rowNum2 = cr1N + 1;
		//상세정보 표출
		ArrayList resultListmDetail = (ArrayList) param.get("resultListm");
		if(resultListmDetail.size() == 0) {
			bodyRow = sheet.createRow(rowNum2 + 0);
			bodyCell = bodyRow.createCell(0);
			bodyCell.setCellValue("정보가 존재하지 않습니다.");
//			sheet.addMergedRegion(new CellRangeAddress(rowNumN, rowNumN, 0, 1));
		} else {
			for (int i = 0; i < resultListmDetail.size(); i++) {
				bodyRow = sheet.createRow(rowNum2 + i);

				//지번주소
				bodyCell = bodyRow.createCell(0);
				if (((BuildingRegister) resultListmDetail.get(i)).getPlatPlc().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getPlatPlc().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//도로명주소
				bodyCell = bodyRow.createCell(1);
				if (((BuildingRegister) resultListmDetail.get(i)).getNewPlatPlc().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getNewPlatPlc().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//동명칭
				bodyCell = bodyRow.createCell(2);
				if (((BuildingRegister) resultListmDetail.get(i)).getDongNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getDongNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//양성화여부
				//*통합행정정보 > 건축물대장 표현 방식에 의존하여 개발 진행
				bodyCell = bodyRow.createCell(3);
				bodyCell.setCellValue("-");
				bodyCell.setCellStyle(conStyle);

				//대지면적(㎡)
				bodyCell = bodyRow.createCell(4);
				if (((BuildingRegister) resultListmDetail.get(i)).getPlatArea().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getPlatArea().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//주/부속구분
				bodyCell = bodyRow.createCell(5);
				if (((BuildingRegister) resultListmDetail.get(i)).getMainAtchGbCdNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getMainAtchGbCdNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//건폐율(%)
				bodyCell = bodyRow.createCell(6);
				if (((BuildingRegister) resultListmDetail.get(i)).getBcRat().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getBcRat().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//연면적(㎡)
				bodyCell = bodyRow.createCell(7);
				if (((BuildingRegister) resultListmDetail.get(i)).getTotArea().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getTotArea().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//용적율 산정연면적(㎡)
				bodyCell = bodyRow.createCell(8);
				if (((BuildingRegister) resultListmDetail.get(i)).getVlRatEstmTotArea().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getVlRatEstmTotArea().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//용적율(%)
				bodyCell = bodyRow.createCell(9);
				if (((BuildingRegister) resultListmDetail.get(i)).getVlRat().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getVlRat().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//구조
				bodyCell = bodyRow.createCell(10);
				if (((BuildingRegister) resultListmDetail.get(i)).getStrctCdNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getStrctCdNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//구조(기타)
				bodyCell = bodyRow.createCell(11);
				if (((BuildingRegister) resultListmDetail.get(i)).getEtcStrct().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getEtcStrct().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//주용도
				bodyCell = bodyRow.createCell(12);
				if (((BuildingRegister) resultListmDetail.get(i)).getMainPurpsCdNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getMainPurpsCdNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//용도(기타)
				bodyCell = bodyRow.createCell(13);
				if (((BuildingRegister) resultListmDetail.get(i)).getEtcPurps().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getEtcPurps().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//지붕
				bodyCell = bodyRow.createCell(14);
				if (((BuildingRegister) resultListmDetail.get(i)).getRoofCdNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getRoofCdNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//지붕(기타)
				bodyCell = bodyRow.createCell(15);
				if (((BuildingRegister) resultListmDetail.get(i)).getEtcRoof().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getEtcRoof().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//세대수
				bodyCell = bodyRow.createCell(16);
				if (((BuildingRegister) resultListmDetail.get(i)).getHhldCnt().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getHhldCnt().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//가구수
				bodyCell = bodyRow.createCell(17);
				if (((BuildingRegister) resultListmDetail.get(i)).getFmlyCnt().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getFmlyCnt().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//높이
				bodyCell = bodyRow.createCell(18);
				if (((BuildingRegister) resultListmDetail.get(i)).getHeit().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getHeit().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//지상층수
				bodyCell = bodyRow.createCell(19);
				if (((BuildingRegister) resultListmDetail.get(i)).getGrndFlrCnt().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getGrndFlrCnt().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//지하층수
				bodyCell = bodyRow.createCell(20);
				if (((BuildingRegister) resultListmDetail.get(i)).getUgrndFlrCnt().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getUgrndFlrCnt().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//승용승강기대수
				bodyCell = bodyRow.createCell(21);
				if (((BuildingRegister) resultListmDetail.get(i)).getRideUseElvtCnt().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getRideUseElvtCnt().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//비상용승강기대수
				bodyCell = bodyRow.createCell(22);
				if (((BuildingRegister) resultListmDetail.get(i)).getEmgenUseElvtCnt().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getEmgenUseElvtCnt().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//총동연면적
				bodyCell = bodyRow.createCell(23);
				if (((BuildingRegister) resultListmDetail.get(i)).getTotDongTotArea().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getTotDongTotArea().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//옥외기계식주차대수
				bodyCell = bodyRow.createCell(24);
				if (((BuildingRegister) resultListmDetail.get(i)).getOudrMechUtcnt().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getOudrMechUtcnt().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//옥외기계식주차면적
				bodyCell = bodyRow.createCell(25);
				if (((BuildingRegister) resultListmDetail.get(i)).getOudrMechArea().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getOudrMechArea().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//옥내자주식주차대수
				bodyCell = bodyRow.createCell(26);
				if (((BuildingRegister) resultListmDetail.get(i)).getIndrAutoUtcnt().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getIndrAutoUtcnt().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//옥내자주식주차면적
				bodyCell = bodyRow.createCell(27);
				if (((BuildingRegister) resultListmDetail.get(i)).getIndrAutoArea().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getIndrAutoArea().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//옥외자주식주차대수
				bodyCell = bodyRow.createCell(28);
				if (((BuildingRegister) resultListmDetail.get(i)).getOudrAutoUtcnt().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getOudrAutoUtcnt().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//옥외자주식주차면적
				bodyCell = bodyRow.createCell(29);
				if (((BuildingRegister) resultListmDetail.get(i)).getOudrAutoArea().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getOudrAutoArea().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//허가일
				bodyCell = bodyRow.createCell(30);
				if (((BuildingRegister) resultListmDetail.get(i)).getPmsDay().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getPmsDay().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//착공일
				bodyCell = bodyRow.createCell(31);
				if (((BuildingRegister) resultListmDetail.get(i)).getStcnsDay().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getStcnsDay().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//사용승인일
				bodyCell = bodyRow.createCell(32);
				if (((BuildingRegister) resultListmDetail.get(i)).getUseAprDay().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getUseAprDay().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//허가번호
				bodyCell = bodyRow.createCell(33);
				if (((BuildingRegister) resultListmDetail.get(i)).getPmsnoYear().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultListmDetail.get(i)).getPmsnoYear().toString());
				}
				bodyCell.setCellStyle(conStyle);

			}
		}

		int cr2 = rowNum2 + (resultListmDetail.size() == 0 ? 1: resultListmDetail.size()) + 1;
		// n번째 행 생성 - 라벨
		Row headerRow9 = sheet.createRow(cr2);
		// n번째 행의 첫번째 열 셀 생성
		Cell headerCell9 = headerRow9.createCell(0);
		headerCell9.setCellStyle(labelStyle);
		headerCell9.setCellValue("층별현황");

		int cr2N = cr2 + 1;
		// n번째 행 생성 - 헤더
		Row headerRow10 = sheet.createRow(cr2N);
		// n번째 행의 첫번째 열 셀 생성
		Cell headerCell10 = headerRow10.createCell(0);
		headerCell10.setCellStyle(headStyle);
		headerCell10.setCellValue("구분");

		headerCell10 = headerRow10.createCell(1);
		headerCell10.setCellStyle(headStyle);
		headerCell10.setCellValue("층명");

		headerCell10 = headerRow10.createCell(2);
		headerCell10.setCellStyle(headStyle);
		headerCell10.setCellValue("구조");

		headerCell10 = headerRow10.createCell(3);
		headerCell10.setCellStyle(headStyle);
		headerCell10.setCellValue("기타구조");

		headerCell10 = headerRow10.createCell(4);
		headerCell10.setCellStyle(headStyle);
		headerCell10.setCellValue("주용도");

		headerCell10 = headerRow10.createCell(5);
		headerCell10.setCellStyle(headStyle);
		headerCell10.setCellValue("기타용도");

		headerCell10 = headerRow10.createCell(6);
		headerCell10.setCellStyle(headStyle);
		headerCell10.setCellValue("면적(㎡)");

		headerCell10 = headerRow10.createCell(7);
		headerCell10.setCellStyle(headStyle);
		headerCell10.setCellValue("주부속구분");

		//층별현황 행 및 셀 생성
		int rowNum3 = cr2N + 1;
		//층별현황 표출
		ArrayList resultList1 = (ArrayList) param.get("resultList1");
		if(resultList1.size() == 0) {
			bodyRow = sheet.createRow(rowNum3 + 0);
			bodyCell = bodyRow.createCell(0);
			bodyCell.setCellValue("정보가 존재하지 않습니다.");
//			sheet.addMergedRegion(new CellRangeAddress(rowNumN, rowNumN, 0, 1));
		} else {
			for (int i = 0; i < resultList1.size(); i++) {
				bodyRow = sheet.createRow(rowNum3 + i);

				//구분
				bodyCell = bodyRow.createCell(0);
				if (((BuildingRegister) resultList1.get(i)).getFlrGbCdNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultList1.get(i)).getFlrGbCdNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//층명
				bodyCell = bodyRow.createCell(1);
				if (((BuildingRegister) resultList1.get(i)).getFlrNoNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultList1.get(i)).getFlrNoNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//구조
				bodyCell = bodyRow.createCell(2);
				if (((BuildingRegister) resultList1.get(i)).getStrctCdNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultList1.get(i)).getStrctCdNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//기타구조
				bodyCell = bodyRow.createCell(3);
				if (((BuildingRegister) resultList1.get(i)).getEtcStrct().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultList1.get(i)).getEtcStrct().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//주용도
				bodyCell = bodyRow.createCell(4);
				if (((BuildingRegister) resultList1.get(i)).getMainPurpsCdNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultList1.get(i)).getMainPurpsCdNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//기타용도
				bodyCell = bodyRow.createCell(5);
				if (((BuildingRegister) resultList1.get(i)).getEtcPurps().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultList1.get(i)).getEtcPurps().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//면적(㎡)
				bodyCell = bodyRow.createCell(6);
				if (((BuildingRegister) resultList1.get(i)).getArea().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultList1.get(i)).getArea().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//주부속구분
				bodyCell = bodyRow.createCell(7);
				if (((BuildingRegister) resultList1.get(i)).getMainAtchGbCdNm().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultList1.get(i)).getMainAtchGbCdNm().toString());
				}
				bodyCell.setCellStyle(conStyle);

			}
		}

		//관련지번현황
		int cr3 = rowNum3 + (resultList1.size() == 0 ? 1: resultList1.size()) + 1;
		// n번째 행 생성 - 라벨
		Row headerRowN = sheet.createRow(cr3);
		// 9번째 행의 첫번째 열 셀 생성
		Cell headerCellN = headerRowN.createCell(0);
		headerCellN.setCellStyle(labelStyle);
		headerCellN.setCellValue("관련지번현황");

		// n+1번째 행 생성 - 헤더
		int cr3N = cr3 + 1;
		Row headerRowN1 = sheet.createRow(cr3N);
		// 6번째 행의 첫번째 열 셀 생성
		Cell headerCellN1 = headerRowN1.createCell(0);
		headerCellN1.setCellStyle(headStyle);
		headerCellN1.setCellValue("지번주소");

		headerCellN1 = headerRowN1.createCell(1);
		headerCellN1.setCellStyle(headStyle);
		headerCellN1.setCellValue("도로명주소");

		//관련지번현황 행 및 셀 생성
		int rowNumN = cr3N + 1;
		//관련지번현황 표출
		ArrayList resultList2 = (ArrayList) param.get("resultList2");
		if(resultList2.size() == 0) {
			bodyRow = sheet.createRow(rowNumN + 0);
			bodyCell = bodyRow.createCell(0);
			bodyCell.setCellValue("정보가 존재하지 않습니다.");
//			sheet.addMergedRegion(new CellRangeAddress(rowNumN, rowNumN, 0, 1));
		} else {
			for (int i = 0; i < resultList2.size(); i++) {
				bodyRow = sheet.createRow(rowNumN + i);

				//지번주소
				bodyCell = bodyRow.createCell(0);
				if (((BuildingRegister) resultList2.get(i)).getPlatPlc().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultList2.get(i)).getPlatPlc().toString());
				}
				bodyCell.setCellStyle(conStyle);

				//도로명주소
				bodyCell = bodyRow.createCell(1);
				if (((BuildingRegister) resultList2.get(i)).getNewPlatPlc().replaceAll("\\s", "").equals("")) {
					bodyCell.setCellValue("-");
				} else {
					bodyCell.setCellValue(((BuildingRegister) resultList2.get(i)).getNewPlatPlc().toString());
				}
				bodyCell.setCellStyle(conStyle);

			}
		}
		return workbook;
	}
}
