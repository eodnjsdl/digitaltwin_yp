package egiskorea.com.cmm.service.impl;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;

import net.sf.jxls.exception.ParsePropertyException;
import net.sf.jxls.transformer.XLSTransformer;

/**
 * @Description 엑셀 다운로드
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.01.11
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.11		이상화	최초 생성
 *  </pre>
 */

public class ExcelView {
	
	private static final Logger logger = LoggerFactory.getLogger(ExcelView.class);
	
	
	/**
	 * @Description 엑셀 다운로드 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.11
	 * @param request
	 * @param response
	 * @param value
	 * @param fileName
	 * @param filePath
	 * @throws Exception
	 */	
	@SuppressWarnings("unused")
	public void downloadExcelData(			
			HttpServletRequest request,
			HttpServletResponse response,
			Object value,
			String fileName,
			String filePath) throws Exception {
		
		try {
			Map<String , Object> beans = new HashMap<String , Object>();
			beans.put("list", value);
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			Date date = new Date();
			String now = sdf.format(date);
			
			ExcelView excelUtil = new ExcelView();
			excelUtil.download(request, response, beans, fileName + now,  filePath);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("엑셀 다운로드 실패");
		}	    
	}
	
	/**
	 * @Description map 파일을 지정된 template excel 파일로 변환 및 다운로드  
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.11
	 * @param request
	 * @param response
	 * @param beans
	 * @param filename
	 * @param templateFile
	 * @throws org.apache.poi.openxml4j.exceptions.InvalidFormatException
	 */
	private void download(
			HttpServletRequest request, 
			HttpServletResponse response, 
			Map<String , Object> beans, 
			String filename, 
			String templateFile) throws org.apache.poi.openxml4j.exceptions.InvalidFormatException {
		
	    String tempPath = request.getSession().getServletContext().getRealPath("/WEB-INF/excel") ;

	    try {
	        InputStream is = new BufferedInputStream(new FileInputStream(tempPath + "/" + templateFile));
	        XLSTransformer transformer = new XLSTransformer();
	        Workbook resultWorkbook = transformer.transformXLS(is, beans);
	        
	        // 컨테츠 타입 및 파일명 지정
	        response.setContentType("application/vnd.ms-excel");
	        response.setHeader("Content-Disposition", "attachment; filename=\"" + URLEncoder.encode(filename, "UTF-8") + ".xls\"");
	        
	        OutputStream os = response.getOutputStream();
	        
	        // 엑셀 출력
	        resultWorkbook.write(os);
	        resultWorkbook.close();
	    } catch (ParsePropertyException | IOException ex) {
	    	logger.debug("엑셀 출력 오류");
	    }
	}
	
	/**
	 * @Description 엑셀 셀 스타일 생성
	 * @Author 플랫폼개발부문 DT플랫폼 전영후
	 * @Date 2022.01.13
	 * @param workbook - 엑셀 work book
	 * @return CellStyle[] - 0:헤더 셀 스타일 / 1:데이터 셀 스타일
     * @throws IOException, InvocationTargetException, SQLException
	 */
    @SuppressWarnings("null")
    public static CellStyle[] createCellStyle(SXSSFWorkbook workbook) throws IOException, InvocationTargetException, SQLException{
        CellStyle[] cellStyle = new CellStyle[2];
        // 테이블 헤더용 스타일
        CellStyle headStyle = workbook.createCellStyle();

        // 가는 경계선을 가집니다.
        headStyle.setBorderTop(BorderStyle.THIN);
        headStyle.setBorderBottom(BorderStyle.THIN);
        headStyle.setBorderLeft(BorderStyle.THIN);
        headStyle.setBorderRight(BorderStyle.THIN);

        // 배경색은 노란색입니다.
        headStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
        headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // 데이터는 가운데 정렬합니다.
        headStyle.setAlignment(HorizontalAlignment.CENTER);

        // 데이터용 경계 스타일 테두리만 지정
        CellStyle bodyStyle = workbook.createCellStyle();
        bodyStyle.setBorderTop(BorderStyle.THIN);
        bodyStyle.setBorderBottom(BorderStyle.THIN);
        bodyStyle.setBorderLeft(BorderStyle.THIN);
        bodyStyle.setBorderRight(BorderStyle.THIN);

        cellStyle[0] = headStyle;
        cellStyle[1]= bodyStyle;

        return cellStyle;
    }
	
    /**
     * 엑셀 다운로드
     * @param request       HttpServletRequest request
     * @param response      HttpServletResponse response
     * @param fileName      다운로드됐을 때 파일명
     * @param title         엑셀 내용 row=0의 타이틀
     * @param voTitle       list에서 꺼낼 객체의 key 값
     * @param data          다운로드 될 값 LIST
     * @throws IOException, InvocationTargetException, SQLException
     */
    public static void excelDownload(HttpServletRequest request, HttpServletResponse response, String fileName,
            String[] title, String[] voTitle, List<?> data)
            throws IOException, InvocationTargetException, SQLException {
        try {

            // 행, 열, 열번호
            Row row = null;
            Cell cell = null;
            int rowNo = 0;

            SXSSFWorkbook workbook =  new SXSSFWorkbook();
            SXSSFSheet sheet = workbook.createSheet();

            CellStyle[] cellStyle = ExcelView.createCellStyle(workbook);

            row = sheet.createRow(rowNo++);

            for (int i = 0; i < title.length; i++) {
                cell = row.createCell(i);
                cell.setCellStyle(cellStyle[0]);
                cell.setCellValue(title[i]);
            }

            // 데이터 부분 생성
            int index = 0;
            if(!data.isEmpty()) {
                for (Object obj : data) {
                    Gson gson = new Gson();
                    String objJson = gson.toJson(obj);
                    Map json = gson.fromJson(objJson, Map.class);

                    row = sheet.createRow(rowNo++);
                    for (int j = 0; j < voTitle.length; j++) {
                        cell = row.createCell(index);
                        cell.setCellStyle(cellStyle[1]);

                        String value = "";
                        if (json.get(voTitle[index]) == null) {
                            value = "";
                        } else {
                            value = String.valueOf(json.get(voTitle[index]));
                            if(value.endsWith(".0")) {
                                value = value.replace(".0", "") ;
                            }
                        }
                        cell.setCellValue(value);
                        index++;
                        if (index == voTitle.length) {
                            index = 0;
                        }
                    }
                }
            }

            String newNm = getDisposition(fileName, getBrowser(request));

            // 컨텐츠 타입과 파일명 지정
            response.setContentType("ms-vnd/excel");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + newNm + ".xlsx\";");

            response.flushBuffer();

            // 엑셀 출력
            workbook.write(response.getOutputStream());
            workbook.close();
        } catch (IOException e) {
            logger.error("ERROR-01:파일 생성 에러");
        }
    }

    /**
     * 브라우저 체크
     * @param request       HttpServletRequest request
     * @param response      HttpServletResponse response
     * @param fileName      다운로드됐을 때 파일명
     * @param title         엑셀 내용 row=0의 타이틀
     * @param voTitle       list에서 꺼낼 객체의 key 값
     * @param data          다운로드 될 값 LIST
     * @throws IOException, InvocationTargetException, SQLException
     */
    private static String getBrowser(HttpServletRequest request) {
        String header = request.getHeader("User-Agent");
        if (header.contains("MSIE") || header.contains("Trident")) {
            return "MSIE";
        } else if (header.contains("Chrome")) {
            return "Chrome";
        } else if (header.contains("Opera")) {
            return "Opera";
        } else if (header.contains("Firefox")) {
            return "Firefox";
        }
        return "MSIE";
    }
    
    /**
     * 브라우저별 파일명 인코딩
     *
     * @param filename
     * @param browser
     * @return String
     * @throws IOException, InvocationTargetException, SQLException
     */
    private static String getDisposition(String filename, String browser)
            throws IOException, InvocationTargetException, SQLException {
        String encodedFilename = null;
        if (browser.equals("MSIE")) {
            encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
        } else if (browser.equals("Firefox")) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (browser.equals("Opera")) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (browser.equals("Chrome")) {
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < filename.length(); i++) {
                char c = filename.charAt(i);
                if (c > '~') {
                    sb.append(URLEncoder.encode("" + c, "UTF-8"));
                } else {
                    sb.append(c);
                }
            }
            encodedFilename = sb.toString();
        }
        return encodedFilename;
    }
}
