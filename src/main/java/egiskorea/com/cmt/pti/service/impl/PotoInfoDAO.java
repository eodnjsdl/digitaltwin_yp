package egiskorea.com.cmt.pti.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.cmt.mmi.service.MemoInfoVO;
import egiskorea.com.cmt.pti.service.PotoInfoVO;
import egovframework.com.cmm.service.FileVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 사진정보를 관리하는 dao 클래스
 * @author 오윤성
 * @since 2021.01.02
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.01.02   오윤성           최초 생성
 *  </pre>
 */

@Repository("potoInfoDAO")
public class PotoInfoDAO extends ComAbstractDAO{

	/**
	 * 사진정보 목록
	 * @param potoInfoVO
	 * @return list
	 */
	public List<?> selectPotoInfoList(PotoInfoVO potoInfoVO) {
		return selectList("potoInfo.selectPotoInfoList", potoInfoVO);
	}
	
	/**
	 * 사진정보 목록 cnt
	 * @param potoInfoVO
	 * @return int
	 */
	public int selectPotoInfoListCnt(PotoInfoVO potoInfoVO) {
		return (Integer)selectOne("potoInfo.selectPotoInfoListCnt", potoInfoVO);
	}
	
	/**
	 * 사진정보 상세조회
	 * @param potoInfoVO
	 * @return EgovMap
	 */
	public EgovMap selectPotoInfoView(PotoInfoVO potoInfoVO) {
		return (EgovMap) selectOne("potoInfo.selectPotoInfoView", potoInfoVO);
	}
	/**
	 * 사진정보 등록
	 * @param potoInfoVO
	 * @throws Exception
	 */
	public void insertPotoInfo(PotoInfoVO potoInfoVO) throws Exception {
		insert("potoInfo.insertPotoInfo", potoInfoVO);
	}
	
	/**
	 * 사진정보 수정
	 * @param potoInfoVO
	 * @throws Exception
	 */
	public void updatePotoInfo(PotoInfoVO potoInfoVO) throws Exception {
		update("potoInfo.updatePotoInfo", potoInfoVO);
	}
	
	/**
	 * 사진정보 삭제
	 * @param potoInfoVO
	 * @throws Exception
	 */
	public void deletePotoInfo(PotoInfoVO potoInfoVO) throws Exception {
		delete("potoInfo.deletePotoInfo", potoInfoVO);
	}
	
	/**
	 * 사진정보 내용수정
	 * @param FileVO
	 * @throws Exception
	 */
	public void updateFileDetail(FileVO fvo) throws Exception {
		update("potoInfo.updateFileDetail", fvo);
	}

	/**
	 * @Description  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.04.19
	 * @param potoInfoVO
	 * @return
	 */
	public String selectLastModfDt(PotoInfoVO potoInfoVO) {
		// TODO Auto-generated method stub
		return selectOne("potoInfo.selectLastModfDt", potoInfoVO);
	}

	/**
	 * @Description  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.04.19
	 * @param potoInfoVO
	 * @return
	 */
	public String selectSubject(PotoInfoVO potoInfoVO) {
		// TODO Auto-generated method stub
		return selectOne("potoInfo.selectSubject", potoInfoVO);
	}
	
}
