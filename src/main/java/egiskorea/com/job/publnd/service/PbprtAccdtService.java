/***********************************
* 공유재산 실태 Service
* @author  : 이혜인
* @since   : 2023.02.21
* @version : 1.0
************************************/
package egiskorea.com.job.publnd.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egiskorea.com.cmm.service.CmmnCdVO;

public interface PbprtAccdtService {
	
	/** 공유재산 실태조사 목록 조회 */
	public List<PbprtAccdtVO> selectPbprtAccdtList(PbprtAccdtVO pbprtAccdtVO);
	
	/** 공유재산 실태조사 목록 조회 개수 */
	public int selectPbprtAccdtListCnt(PbprtAccdtVO pbprtAccdtVO);
	
	/** 공유재산 실태조사 정보 등록 */
	public int insertPbprtAccdtInfo(PbprtAccdtVO pbprtAccdtVO) throws Exception;
	
	/** 공유재산 실태조사 정보 삭제 */
	public int updatePbprtAccdtInfoDel(int publndNo) throws Exception;
	
	/** 공유재산 실태조사 지목코드 목록 조회 */
	public List<CmmnCdVO> selectLdcgCdList();
	
	/** 공유재산 실태조사 상세정보 조회 */
	public PbprtAccdtVO selectPbprtAccdtDtlInfo(int publndNo);
	
	/** 공유재산 실태조사 상세정보 수정 */
	public int updatePbprtAccdtInfo(PbprtAccdtVO pbprtAccdtVO) throws Exception;
	
	/** 공유재산 실태조사 엑셀 다운로드 */
	public List<?> selectPbprtAccdtExcelList(HttpServletRequest request, HttpServletResponse response, String year) throws Exception;
	
	/** 공유재산 실태조사 엑셀 다운로드 연도별 목록 조회*/
	public List<String> selectPbprtAccdtYearList();
	
	/** 공유재산 실태조사 엑셀 업로드 */
	public Map<String,Object> callPbprtAccdtExcel(MultipartFile file) throws SQLException, Exception;

	/** 공유재산 실태조사 엑셀 정보 등록 */
	public int insertPbprtAccdtExcel(List<PbprtAccdtVO> pbprtAccdtList);
	
	/** 공유재산 실태조사 전체삭제 */
	public int deletePbprtAccdtTotInfo(MultipartFile file) throws SQLException, Exception;

	/** 공유재산 실태조사서 조회  */
	public PbprtAccdtWrinvstgVO selectPbprtAccdtWrinvstg(int publndNo);
	
	/** 공유재산 실태조사서 등록 */
	public int insertPbprtAccdtWrinvstg(PbprtAccdtWrinvstgVO pbprtAccdtWrinvstgVO, MultipartHttpServletRequest multiRequest) throws Exception;
	
	/** 공유재산 실태조사서 삭제 */
	public int deletePbprtAccdtWrinvstg(int publndNo);
	
	/** 공유재산 실태조사 엑셀 양식 다운로드 */
	public void downloadPbprtAccdtExcelBassForm(HttpServletRequest request, HttpServletResponse response) throws Exception;
	
}
