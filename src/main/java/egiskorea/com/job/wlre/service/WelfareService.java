package egiskorea.com.job.wlre.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.xssf.streaming.SXSSFWorkbook;

/**
 * 
* <pre>
* 간략 : 복지시설 관리 Service.
* 상세 : .
* egiskorea.com.fcty.wlre.service
*   |_ WelfareService.java
* </pre>
* 
* @Company : DGIST
* @Author  : j
* @Date    : 2022. 1. 5 오전 9:41:21
* @Version : 1.0
 */

public interface WelfareService {

	// 복지시설 조회
	public Map<String, Object> selectWelfareList(WelfareVO welfareVO);
	
	// 복지시설 삭제
	public int deleteWelfare(WelfareVO welfareVO);
	
	// 복지시설 등록
	public int insertWelfare(WelfareVO welfareVO);
	
	// 복지시설 상세조회
	public WelfareVO selectWelfare(WelfareVO welfareVO);
	
	// 복지시설 수정
	public int updateWelfare(WelfareVO welfareVO);
	
	// 복지시설 엑셀다운
	SXSSFWorkbook makeWlreExcelList(HashMap parameter);
	HashMap wlreExcelDown(WelfareVO welfareVO);
	
	// 복지시설 poi
	public List<WelfareVO> selectWlrePOIList(WelfareVO welfareVO);
	
	//시설구분 코드정보 조회
	public List<WelfareVO> welfareCode(WelfareVO welfareVO);
}
