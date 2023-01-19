package egiskorea.com.job.wlre.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.wlre.service.WelfareVO;

/**
 * 
* <pre>
* 간략 : 복지시설 관리 DAO.
* 상세 : .
* egiskorea.com.fcty.wlre.service.impl
*   |_ WelfareDAO.java
* </pre>
* 
* @Company : DGIST
* @Author  : j
* @Date    : 2022. 1. 5 오전 9:42:04
* @Version : 1.0
 */

@Repository("welfareDAO")
public class WelfareDAO extends ComAbstractDAO {
	
	// 복지시설 조회	
	public List<?> selectWelfareList(WelfareVO welfareVO) {
		return selectList("welfareDAO.selectWelfareList", welfareVO);
	}
	
	// 복지시설 조회 cnt
	public int selectWelfareListCnt(WelfareVO welfareVO) {
		return (Integer)selectOne("welfareDAO.selectWelfareListCnt", welfareVO);
	}
	
	// 복지시설 삭제
	public int deleteWelfare(WelfareVO welfareVO) {
		return delete("welfareDAO.deleteWelfare", welfareVO);
	}
	
	// 복지시설 등록
	public int insertWelfare(WelfareVO welfareVO) {
		return insert("welfareDAO.insertWelfare", welfareVO);
	}
	
	// 복지시설 상세조회
	public WelfareVO selectWelfare(WelfareVO welfareVO) {
		return (WelfareVO) selectOne("welfareDAO.selectWelfare", welfareVO);
	}
	
	// 복지시설 수정
	public int updateWelfare(WelfareVO welfareVO) {
		return update("welfareDAO.updateWelfare", welfareVO);
	}
	
	// 복지시설 엑셀다운
	public List wlreExcelDown(WelfareVO welfareVO) {
		return selectList("welfareDAO.wlreExcelDown", welfareVO);
	} 
	
	// 복지시설 poi
	public List<WelfareVO> selectWlrePOIList(WelfareVO welfareVO) {
		return selectList("welfareDAO.selectWlrePOIList", welfareVO);
	}
	
	//시설구분 코드정보 조회
	public List<WelfareVO> welfareCode(WelfareVO welfareVO) {
		return selectList("welfareDAO.welfareCode", welfareVO);
	}
}
