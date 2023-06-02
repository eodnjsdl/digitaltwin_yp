/***********************************
* 공유재산 실태 ServiceImpl
* @author  : 이혜인
* @since   : 2023.02.21
* @version : 1.0
************************************/
package egiskorea.com.job.adas.publnd.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egiskorea.com.cmm.service.CmmnCdVO;
import egiskorea.com.cmm.service.impl.CmmnDAO;
import egiskorea.com.cmm.service.impl.ExcelView;
import egiskorea.com.job.adas.publnd.service.PbprtAccdtService;
import egiskorea.com.job.adas.publnd.service.PbprtAccdtVO;
import egiskorea.com.job.adas.publnd.service.PbprtAccdtWrinvstgVO;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.FileVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service
public class PbprtAccdtServiceImpl extends EgovAbstractServiceImpl implements PbprtAccdtService {

	/** 공유재산 실태조사 파일 업로드 경로 */
	public static final String FILE_PATH = "Globals.publnd.fileStorePath";
	
	/* 공통 DAO */
	@Resource(name = "cmmnDao")
	CmmnDAO cmmnDao;
	
	/** 전자정부 파일 관리 Service */
	@Resource(name = "EgovFileMngService")
    private EgovFileMngService egovFileMngService;

	/** 파일 업로드 Util */
    @Resource(name="EgovFileMngUtil")
    private EgovFileMngUtil fileUtil;
    
	
	@Override
	public List<PbprtAccdtVO> selectPbprtAccdtList(PbprtAccdtVO pbprtAccdtVO) {
		List<PbprtAccdtVO> pbprtAccdtList = null;
		
		pbprtAccdtList = cmmnDao.selectList("publndMng.selectPbprtAccdtList", pbprtAccdtVO);
		
		return pbprtAccdtList;
	}

	@Override
	public int selectPbprtAccdtListCnt(PbprtAccdtVO pbprtAccdtVO) {
		int cnt = 0;
		
		cnt = cmmnDao.selectOne("publndMng.selectPbprtAccdtListCnt", pbprtAccdtVO);
		
		return cnt;
	}
	
	@Override
	public int insertPbprtAccdtInfo(PbprtAccdtVO pbprtAccdtVO) throws Exception {
		int put = 0;
		int publndNo = 0;
		String year = "";
		
		// publnd_no 총 개수에서 하나씩 더해서 세팅
		publndNo = cmmnDao.selectOne("publndMng.selectPbprtAccdtTotCo");
		publndNo = publndNo + 1;
		pbprtAccdtVO.setPublndNo(publndNo);
		year = String.valueOf(LocalDateTime.now().getYear());
		pbprtAccdtVO.setYear(year);
		
		put = cmmnDao.insert("publndMng.insertPbprtAccdtInfo", pbprtAccdtVO);
		
		return put;
	}
	
	@Override
	public int updatePbprtAccdtInfoDel(int publndNo) throws Exception {
		int remove = 0;
		
		remove = cmmnDao.delete("publndMng.updatePbprtAccdtInfoDel", publndNo);
		remove += cmmnDao.delete("publndMng.deletePbprtAccdtWrinvstg", publndNo);
		
		return remove;
	}

	@Override
	public List<CmmnCdVO> selectLdcgCdList() {
		List<CmmnCdVO> ldcgCdList = null;
		
		ldcgCdList = cmmnDao.selectList("publndMng.selectLdcgCdList");
		
		return ldcgCdList;
	}

	@Override
	public PbprtAccdtVO selectPbprtAccdtDtlInfo(int publndNo) {
		PbprtAccdtVO pbprtAccdtDtlInfo = null;
		
		pbprtAccdtDtlInfo = cmmnDao.selectOne("publndMng.selectPbprtAccdtDtlInfo", publndNo);
		
		return pbprtAccdtDtlInfo;
	}

	@Override
	public int updatePbprtAccdtInfo(PbprtAccdtVO pbprtAccdtVO) throws Exception {
		int modify = 0;
		pbprtAccdtVO.setEditYn("Y");
		
		modify = cmmnDao.update("publndMng.updatePbprtAccdtInfo", pbprtAccdtVO);
		
		return modify;
	}

//	@Override
//	public List<?> selectPbprtAccdtExcelList(HttpServletRequest request, HttpServletResponse response, String year) throws Exception {
//		
//		List<?> excelVO = null;
//		
//		Map<String, Object> yearValue = new HashMap<String, Object>();
//		yearValue.put("year", year);
//		
//		excelVO = cmmnDao.selectList("publndMng.selectPbprtAccdtExcelList", yearValue);
//		
//		String[] titleArr = new String[18];
//		titleArr[0] = "계약일자";
//		titleArr[1] = "계약기간";
//		titleArr[2] = "소재지";
//		titleArr[3] = "지목코드";
//		titleArr[4] = "면적";
//		titleArr[5] = "대부면적";
//		titleArr[6] = "대부용도";
//		titleArr[7] = "주민등록번호";
//		titleArr[8] = "대부료발송여부";
//		titleArr[9] = "성명";
//		titleArr[10] = "주소";
//		titleArr[11] = "우편번호";
//		titleArr[12] = "연락처";
//		titleArr[13] = "비고";
//		titleArr[14] = "고지서발송";
//		titleArr[15] = "첨부서류";
//		titleArr[16] = "확인사항";
//		titleArr[17] = "등록연도";
//		
//		String[] voTitleArr = new String[18];
//		voTitleArr[0] = "ctrtYmd";
//		voTitleArr[1] = "cntrctpd";
//		voTitleArr[2] = "locplc";
//		voTitleArr[3] = "ldcgCd";
//		voTitleArr[4] = "ar";
//		voTitleArr[5] = "loanAr";
//		voTitleArr[6] = "loanPrpos";
//		voTitleArr[7] = "rrno";
//		voTitleArr[8] = "loanmnSndngYn";
//		voTitleArr[9] = "nm";
//		voTitleArr[10] = "addr";
//		voTitleArr[11] = "zip";
//		voTitleArr[12] = "cttpc";
//		voTitleArr[13] = "rm";
//		voTitleArr[14] = "nhtSndng";
//		voTitleArr[15] = "atchPapers";
//		voTitleArr[16] = "cnfirmMatter";
//		voTitleArr[17] = "year";
//		
//		ExcelView.excelDownload(request, response,  "공유지관리_공유재산 실태조사_", titleArr, voTitleArr, excelVO);
//		
//		return excelVO;
//	}

	@Override
	public List<String> selectPbprtAccdtYearList() {
		List<String> yearList = null;
		
		yearList = cmmnDao.selectList("publndMng.selectPbprtAccdtYearList");
		
		return yearList;
	}

	@Override
	public Map<String, Object> callPbprtAccdtExcel(MultipartFile file) throws SQLException, Exception {
		List<PbprtAccdtVO> list = new ArrayList<PbprtAccdtVO>();
        Map<String, Object> resultMap = new HashMap<String, Object>();
        
        int rowindex = 0;
        int columnindex = 0;
        
		try {
			// 확장자 확인
			String tail = file.getOriginalFilename();
			
			if (tail.endsWith("xlsx")) {
				OPCPackage opcPackage = OPCPackage.open(file.getInputStream());
	            XSSFWorkbook workbook = new XSSFWorkbook (opcPackage);
	            
	            // 시트 수 (첫번째에만 존재하므로 0을 준다)
	            // 각 시트를 읽기 위해서는 for문을 한번 더 돌려준다
	            XSSFSheet sheet = workbook.getSheetAt(0);
	            
	            // 행의 수
	            int rows = sheet.getLastRowNum();
	            
	            for (rowindex = 1; rowindex <= rows; rowindex++) {
	                XSSFRow row = sheet.getRow(rowindex);
	                if (row !=null) {
	                	// VO 초기화
	                	PbprtAccdtVO pbprtAccdtVO = new PbprtAccdtVO();
	                	
	                	// 공유지 번호 생성
	            		pbprtAccdtVO.setPublndNo(rowindex);
                    	
                        // 셀 값을 읽는다
                        XSSFCell cell = row.getCell(columnindex);
                        
                        // 계약 일자
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setCtrtYmd(cell.getStringCellValue());
                        }
                        // 계약기간
                        cell = row.getCell(1); 
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setCntrctpd(cell.getStringCellValue());
                        }
                        // 소재지
                        cell = row.getCell(2);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setLocplc(cell.getStringCellValue());
                        }
                        // 지목 코드
                        cell = row.getCell(3);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setLdcgCd(lgcdCnvrtr(cell.getStringCellValue()));
//                        	pbprtAccdtVO.setLdcgCd(cell.getStringCellValue());
                        }
                        // 면적
                        cell = row.getCell(4);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setAr(Double.valueOf(cell.getStringCellValue()));
                        }
                        // 대부 면적
                        cell = row.getCell(5);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setLoanAr(Double.valueOf(cell.getStringCellValue()));
                        }
                        // 대부 용도
                        cell = row.getCell(6);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setLoanPrpos(cell.getStringCellValue());
                        }
                        // 주민등록번호
                        cell = row.getCell(7);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setRrno(cell.getStringCellValue());
                        }
                        // 대부료 발송 여부
                        cell = row.getCell(8);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	if (cell.getStringCellValue() == null || cell.getStringCellValue().replaceAll("\\s", "") == "") {
                        		pbprtAccdtVO.setLoanmnSndngYn("N");
                        	} else {
                        		pbprtAccdtVO.setLoanmnSndngYn(cell.getStringCellValue().toUpperCase());
                        	}
                        } else {
                        	pbprtAccdtVO.setLoanmnSndngYn("N");
                        }
                        // 성명
                        cell = row.getCell(9);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setNm(cell.getStringCellValue());
                        }
                        // 주소
                        cell = row.getCell(10);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setAddr(cell.getStringCellValue());
                        }
                        // 우편번호
                        cell = row.getCell(11);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setZip(cell.getStringCellValue());
                        }
                        // 연락처
                        cell = row.getCell(12);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setCttpc(cell.getStringCellValue());
                        }
                        // 비고
                        cell = row.getCell(13);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setRm(cell.getStringCellValue());
                        }
                        // 고지서 발송
                        cell = row.getCell(14);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	if (cell.getStringCellValue() == null || cell.getStringCellValue().replaceAll("\\s", "") == "") {
                        		pbprtAccdtVO.setNhtSndng("N");
                        	} else {
                        		pbprtAccdtVO.setNhtSndng(cell.getStringCellValue().toUpperCase());
                        	}
                        } else {
                        	pbprtAccdtVO.setNhtSndng("N");
                        }
                        // 첨부 서류
                        cell = row.getCell(15);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setAtchPapers(cell.getStringCellValue());
                        }
                        // 확인 사항
                        cell = row.getCell(16);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setCnfirmMatter(cell.getStringCellValue());
                        }
                        // 등록 연도
                        cell = row.getCell(17);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setYear(cell.getStringCellValue());
                        }
                        pbprtAccdtVO.setDelYn("N");
                        
                        list.add(pbprtAccdtVO);
	                }
	                //1000개씩 끊어서 인서트
	                if (rowindex % 1000 == 0 || rowindex == rows) {
	                	insertPbprtAccdtExcel(list);
	                	list = new ArrayList<PbprtAccdtVO>();
	                }
	            }
				
			} else if (tail.endsWith("xls")) {
				
                HSSFWorkbook workbook = new HSSFWorkbook(file.getInputStream());
                
	            //시트 수 (첫번째에만 존재하므로 0을 준다)
	            //각 시트를 읽기 위해서는 for문을 한번 더 돌려준다
	            HSSFSheet sheet = workbook.getSheetAt(0);
	            
	            //행의 수
	            int rows = sheet.getLastRowNum();
        		for(rowindex = 0;rowindex < rows; rowindex++) {
	            	HSSFRow row = sheet.getRow(rowindex);
	                if(row !=null) {
	                	
	                	//VO 초기화
	                	PbprtAccdtVO pbprtAccdtVO = new PbprtAccdtVO();
	                	
	                	// 공유지 번호 생성
	            		pbprtAccdtVO.setPublndNo(rowindex + 1);
                    	
                        //셀 값을 읽는다
                    	HSSFCell cell = row.getCell(columnindex);
                    	
                    	// 계약 일자
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setCtrtYmd(cell.getStringCellValue());
                        }
                        // 계약기간
                        cell = row.getCell(1); 
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setCntrctpd(cell.getStringCellValue());
                        }
                        // 소재지
                        cell = row.getCell(2);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setLocplc(cell.getStringCellValue());
                        }
                        // 지목 코드
                        cell = row.getCell(3);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setLdcgCd(lgcdCnvrtr(cell.getStringCellValue()));
//                        	pbprtAccdtVO.setLdcgCd(cell.getStringCellValue());
                        }
                        // 면적
                        cell = row.getCell(4);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setAr(Double.valueOf(cell.getStringCellValue()));
                        }
                        // 대부 면적
                        cell = row.getCell(5);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setLoanAr(Double.valueOf(cell.getStringCellValue()));
                        }
                        // 대부 용도
                        cell = row.getCell(6);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setLoanPrpos(cell.getStringCellValue());
                        }
                        // 주민등록번호
                        cell = row.getCell(7);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setRrno(cell.getStringCellValue());
                        }
                        // 대부료 발송 여부
                        cell = row.getCell(8);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	if (cell.getStringCellValue() == null || cell.getStringCellValue().replaceAll("\\s", "") == "") {
                        		pbprtAccdtVO.setLoanmnSndngYn("N");
                        	} else {
                        		pbprtAccdtVO.setLoanmnSndngYn(cell.getStringCellValue().toUpperCase());
                        	}
                        } else {
                        	pbprtAccdtVO.setLoanmnSndngYn("N");
                        }
                        // 성명
                        cell = row.getCell(9);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setNm(cell.getStringCellValue());
                        }
                        // 주소
                        cell = row.getCell(10);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setAddr(cell.getStringCellValue());
                        }
                        // 우편번호
                        cell = row.getCell(11);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setZip(cell.getStringCellValue());
                        }
                        // 연락처
                        cell = row.getCell(12);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setCttpc(cell.getStringCellValue());
                        }
                        // 비고
                        cell = row.getCell(13);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setRm(cell.getStringCellValue());
                        }
                        // 고지서 발송
                        cell = row.getCell(14);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	if (cell.getStringCellValue() == null || cell.getStringCellValue().replaceAll("\\s", "") == "") {
                        		pbprtAccdtVO.setNhtSndng(cell.getStringCellValue().toUpperCase());
                        	} else {
                        		pbprtAccdtVO.setNhtSndng("N");
                        	}
                        } else {
                        	pbprtAccdtVO.setNhtSndng("N");
                        }
                        // 첨부 서류
                        cell = row.getCell(15);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setAtchPapers(cell.getStringCellValue());
                        }
                        // 확인 사항
                        cell = row.getCell(16);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setCnfirmMatter(cell.getStringCellValue());
                        }
                        // 등록 연도
                        cell = row.getCell(17);
                        if(cell != null) {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	pbprtAccdtVO.setYear(cell.getStringCellValue());
                        }
                        pbprtAccdtVO.setDelYn("N");
                        
                        list.add(pbprtAccdtVO);
	                }
	                //1000개씩 끊어서 인서트
	                if(rowindex % 1000 == 0 || rowindex == rows - 1) {
	                	insertPbprtAccdtExcel(list);
	                	list = new ArrayList<PbprtAccdtVO>();
	                }
	            }
			}
			resultMap.put("result", "success");
        } catch (NullPointerException e) {
			resultMap.put("result", "error");
		} catch (Exception e) {
			resultMap.put("result", "error");
		} finally {
			try {
				file.getInputStream().close();
			} catch (IOException e) {
				resultMap.put("result","connect 종료 실패");
			}
		}
        return resultMap;
	}

	@Override
	public int insertPbprtAccdtExcel(List<PbprtAccdtVO> pbprtAccdtList) {
		int result = 0;
		
		result = cmmnDao.insert("publndMng.insertPbprtAccdtExcel", pbprtAccdtList);
		
		return result;
	}

	@Override
	public int deletePbprtAccdtTotInfo(MultipartFile file) throws SQLException, Exception {
		int result = 0;
		try {
			cmmnDao.delete("publndMng.deletePbprtAccdtTotInfo");
			cmmnDao.delete("publndMng.deletePbprtAccdtWrinvstgTotInfo");
			callPbprtAccdtExcel(file);
			result = 1;
		} catch(Exception e) {
			result = 0;
		}
		
		return result;
	}
	
	@Override
	public PbprtAccdtWrinvstgVO selectPbprtAccdtWrinvstg(int publndNo) {
		PbprtAccdtWrinvstgVO pbprtInfo = null;
		int cnt = 0;
		String mdfcnText = "";
		pbprtInfo = cmmnDao.selectOne("publndMng.selectPbprtAccdtWrinvstg", publndNo);

		// HTML Entities로 저장된 태그를 화면에 표출하기 위해 텍스트 수정
		if (pbprtInfo.getBsrpCn() != null && pbprtInfo.getExmnr() != null) {
			mdfcnText = mdfcnText(pbprtInfo.getBsrpCn());
			pbprtInfo.setBsrpCn(mdfcnText);
			
			mdfcnText = mdfcnText(pbprtInfo.getExmnr());
			pbprtInfo.setExmnr(mdfcnText);
		}
		
		cnt = cmmnDao.selectOne("publndMng.selectPublndNoCnt", publndNo);
		if (cnt == 0) {
			pbprtInfo.setWrtYn("N");
		}
		
		return pbprtInfo;
	}

	@Override
	@Transactional
	public int insertPbprtAccdtWrinvstg(PbprtAccdtWrinvstgVO pbprtAccdtWrinvstgVO, MultipartHttpServletRequest multiRequest) throws Exception {
		int result = 0;
		
		List<FileVO> resultF = null;
        int atchFileSptSn = 9;
        int atchFileSatlitSn = 9;
        String atchFileId = null;
        String atchFileSptSnYn = null;
        String atchFileSatlitSnYn = null;
        
        Map<String, MultipartFile> files = multiRequest.getFileMap();
        
        int fileIdCnt = 0;
        fileIdCnt = cmmnDao.selectOne("publndMng.selectAtchFileIdcnt", pbprtAccdtWrinvstgVO);
        
        atchFileSptSnYn = cmmnDao.selectOne("publndMng.selectSptPhotoInfo", pbprtAccdtWrinvstgVO);
        if (atchFileSptSnYn != null || atchFileSptSnYn == "9") {
        	atchFileSptSn = Integer.valueOf(atchFileSptSnYn);
        }
        
        atchFileSatlitSnYn = cmmnDao.selectOne("publndMng.selectSatlitPhotoInfo", pbprtAccdtWrinvstgVO);
        if (atchFileSatlitSnYn != null || atchFileSatlitSnYn == "9") {
        	atchFileSatlitSn = Integer.valueOf(atchFileSatlitSnYn);
        }
        
        String currentFileNm = "";

        atchFileId = cmmnDao.selectOne("publndMng.selectAtchFileId", pbprtAccdtWrinvstgVO); 
        
        if (!files.isEmpty()){
        	
        	// 파일 신규 등록
        	if (fileIdCnt == 0) {
        		resultF = fileUtil.parseFileInf(files, "PUBLND_", 0, "", FILE_PATH);
        		atchFileId = egovFileMngService.insertFileInfs(resultF);
        		
        		// 첨부파일의 첨부 순서 fileSn 설정
        		// 첨부파일 중 첫번 째 사진 조회
        		currentFileNm = multiRequest.getFileNames().next();
        		if (currentFileNm.equals("sptPhotoFile")) {
        			pbprtAccdtWrinvstgVO.setSptPhotoSn(0);
        		} else if (currentFileNm.equals("satlitPhotoFile")) {
        			pbprtAccdtWrinvstgVO.setSatlitPhotoSn(0);
        		}
        		pbprtAccdtWrinvstgVO.setAtchFileId(atchFileId);
        		
        		// 첨부파일 (사진)이 2개일 때
        		if (resultF.size() == 2) {
        			if (currentFileNm.equals("sptPhotoFile")) {
            			pbprtAccdtWrinvstgVO.setSatlitPhotoSn(1);
            		} else if (currentFileNm.equals("satlitPhotoFile")) {
            			pbprtAccdtWrinvstgVO.setSptPhotoSn(1);
            		}
        		}
	        		
        	} else {
        		// 기존 파일 수정
        		if (pbprtAccdtWrinvstgVO.getFileDelYn().equals("chgSpt")) {
        			if (pbprtAccdtWrinvstgVO.getSatlitPhotoSn() == 0 && pbprtAccdtWrinvstgVO.getSptPhotoSn() == 9) {
        				atchFileSptSn = 1;
        				pbprtAccdtWrinvstgVO.setSptPhotoSn(atchFileSptSn);
        			} else if (pbprtAccdtWrinvstgVO.getSatlitPhotoSn() == 1 && pbprtAccdtWrinvstgVO.getSptPhotoSn() == 9){
        				atchFileSptSn = 0;
        				pbprtAccdtWrinvstgVO.setSptPhotoSn(atchFileSptSn);
        			} else {
        				atchFileSptSn = pbprtAccdtWrinvstgVO.getSptPhotoSn();
        			}
        			resultF = fileUtil.parseFileInf(files, "PUBLND_", atchFileSptSn, atchFileId, FILE_PATH);
        		} else if (pbprtAccdtWrinvstgVO.getFileDelYn().equals("chgSatlit")) {
        			if (pbprtAccdtWrinvstgVO.getSatlitPhotoSn() == 9 && pbprtAccdtWrinvstgVO.getSptPhotoSn() == 0) {
        				atchFileSatlitSn = 1;
        				pbprtAccdtWrinvstgVO.setSatlitPhotoSn(atchFileSatlitSn);
        			} else if (pbprtAccdtWrinvstgVO.getSatlitPhotoSn() == 9 && pbprtAccdtWrinvstgVO.getSptPhotoSn() == 1) {
        				atchFileSatlitSn = 0;
        				pbprtAccdtWrinvstgVO.setSatlitPhotoSn(atchFileSatlitSn);
        			} else {
        				atchFileSatlitSn = pbprtAccdtWrinvstgVO.getSatlitPhotoSn();
        			}
        			resultF = fileUtil.parseFileInf(files, "PUBLND_", atchFileSatlitSn, atchFileId, FILE_PATH);
        		}
        		if (resultF.size() == 2) {
        			resultF = fileUtil.parseFileInf(files, "PUBLND_", 0, atchFileId, FILE_PATH);
        			egovFileMngService.deleteFileInf(resultF.get(0));
        			egovFileMngService.deleteFileInf(resultF.get(1));
        		} else {
        			egovFileMngService.deleteFileInf(resultF.get(0));
        		}
        		egovFileMngService.updateFileInfs(resultF);
        		
        	}
        }
        
        // 조사자 입력 길이
        if(pbprtAccdtWrinvstgVO.getExmnr().length()>1000) {
        	pbprtAccdtWrinvstgVO.setExmnr(pbprtAccdtWrinvstgVO.getExmnr().substring(0, 1000));
		}
        
        // 공유재산 실태조사서 신규 등록
		if (pbprtAccdtWrinvstgVO.getWrtYn().equals("N")) {
			result = cmmnDao.insert("publndMng.insertPbprtAccdtWrinvstg", pbprtAccdtWrinvstgVO);
		} else {
			FileVO fileVO = new FileVO();
			fileVO.setAtchFileId(atchFileId);
			pbprtAccdtWrinvstgVO.setAtchFileId(atchFileId);
			
			// 공유재산 실태조사서 수정 시, 첨부파일 전체 삭제했을 때
			if (pbprtAccdtWrinvstgVO.getFileDelYn().equals("Y")) {
				fileVO.setFileSn("0");
    			egovFileMngService.deleteFileInf(fileVO);
    			fileVO.setFileSn("1");
    			egovFileMngService.deleteFileInf(fileVO);
				egovFileMngService.deleteAllFileInf(fileVO);
				pbprtAccdtWrinvstgVO.setAtchFileId(null);
			} else if (pbprtAccdtWrinvstgVO.getFileDelYn().contains("spt")) {
				// 현장 사진을 삭제했을 때
				fileVO.setFileSn(String.valueOf(atchFileSptSn));
				egovFileMngService.deleteFileInf(fileVO);
				pbprtAccdtWrinvstgVO.setSptPhotoSn(9);
			} else if (pbprtAccdtWrinvstgVO.getFileDelYn().contains("satlit")) {
				// 위성 사진을 삭제했을 때
				fileVO.setFileSn(String.valueOf(atchFileSatlitSn));
				egovFileMngService.deleteFileInf(fileVO);
				pbprtAccdtWrinvstgVO.setSatlitPhotoSn(9);
			}
			
			result = cmmnDao.update("publndMng.updatePbprtAccdtWrinvstg", pbprtAccdtWrinvstgVO);
		}
		
		return result; 
	}

	@Override
	public int deletePbprtAccdtWrinvstg(int publndNo) {
		int result = 0;
		result = cmmnDao.delete("publndMng.deletePbprtAccdtWrinvstg", publndNo);
		
		return result;
	}

	@Override
	public void downloadPbprtAccdtExcelBassForm(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String[] titleArr = new String[18];
		titleArr[0] = "계약일자";
		titleArr[1] = "계약기간";
		titleArr[2] = "소재지";
		titleArr[3] = "지목코드";
		titleArr[4] = "면적";
		titleArr[5] = "대부면적";
		titleArr[6] = "대부용도";
		titleArr[7] = "주민등록번호";
		titleArr[8] = "대부료발송여부";
		titleArr[9] = "성명";
		titleArr[10] = "주소";
		titleArr[11] = "우편번호";
		titleArr[12] = "연락처";
		titleArr[13] = "비고";
		titleArr[14] = "고지서발송";
		titleArr[15] = "첨부서류";
		titleArr[16] = "확인사항";
		titleArr[17] = "등록연도";
		
		ExcelView.excelDataDownload(request, response, "공유지관리_공유재산_실태조사_기본양식", titleArr);
	}
	
	// HTML Entities를 화면에 태그로 표현하기 위해 텍스트 수정
	// XSS 공격 방지
	private String mdfcnText(String str) {
    	str = str
    	.replaceAll("&lt;", "<")
    	.replaceAll("&gt;", ">")
    	.replaceAll("<script", "")
    	.replaceAll("script>", "")
    	.replaceAll("&lt;script", "")
    	.replaceAll("script&gt;", "")
    	.replaceAll("alert", "")
    	.replaceAll("prompt", "")
    	.replaceAll("&lt;iframe", "")
    	.replaceAll("&lt;object", "")
    	.replaceAll("&lt;embed", "") 
    	.replaceAll("onload", "no_onload") 
    	.replaceAll("expression", "no_expression")
    	.replaceAll("onmouseover", "no_onmouseover")
    	.replaceAll("onmouseout", "no_onmouseout")
    	.replaceAll("onerror", "no_onerror")
    	.replaceAll("onclick", "no_onclick");
        return str;
    }
	
	private String lgcdCnvrtr(String cell) {
		switch(cell) {
		case "전":
			cell = "01";
			break;
		case "답":
			cell = "02";
			break;
		case "과수원":
			cell = "03";
			break;
		case "목장용지":
			cell = "04";
			break;
		case "임야":
			cell = "05";
			break;
		case "광천지":
			cell = "06";
			break;
		case "염전":
			cell = "07";
			break;
		case "대":
			cell = "08";
			break;
		case "공장용지":
			cell = "09";
			break;
		case "학교용지":
			cell = "10";
			break;
		case "주차장":
			cell = "11";
			break;
		case "주유소":
			cell = "12";
			break;
		case "창고용지":
			cell = "13";
			break;
		case "도로":
			cell = "14";
			break;
		case "철도용지":
			cell = "15";
			break;
		case "제방":
			cell = "16";
			break;
		case "하천":
			cell = "17";
			break;
		case "구거":
			cell = "18";
			break;
		case "유지":
			cell = "19";
			break;
		case "양어장":
			cell = "20";
			break;
		case "수도용지":
			cell = "21";
			break;
		case "공원":
			cell = "22";
			break;
		case "체육용지":
			cell = "23";
			break;
		case "유원지":
			cell = "24";
			break;
		case "종교용지":
			cell = "25";
			break;
		case "사적지":
			cell = "26";
			break;
		case "묘지":
			cell = "27";
			break;
		case "잡종지":
			cell = "28";
			break;
		}
		return cell;
	}

}
