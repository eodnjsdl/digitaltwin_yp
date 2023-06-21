package egiskorea.com.cmt.mmi.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.cmt.mmi.service.MemoInfoVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 메모정보를 관리하는 dao 클래스
 * @author 오윤성
 * @since 2021.12.31
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.31   오윤성           최초 생성
 *  </pre>
 */

@Repository("memoInfoDAO")
public class MemoInfoDAO extends ComAbstractDAO {

	/**
	 * 메모정보 목록
	 * @param memoInfoVO
	 * @return list
	 */
	public List<?> selectMemoInfoList(MemoInfoVO memoInfoVO) {
		return selectList("memoInfo.selectMemoInfoList", memoInfoVO);
	}
	
	/**
	 * 메모정보 목록 cnt
	 * @param memoInfoVO
	 * @return int
	 */
	public int selectMemoInfoListCnt(MemoInfoVO memoInfoVO) {
		return (Integer)selectOne("memoInfo.selectMemoInfoListCnt", memoInfoVO);
	}
	
	/**
	 * 메모정보 상세조회
	 * @param memoInfoVO
	 * @return EgovMap
	 */
	public EgovMap selectMemoInfoView(MemoInfoVO memoInfoVO) {
		return (EgovMap) selectOne("memoInfo.selectMemoInfoView", memoInfoVO);
	}
	/**
	 * 메모정보 등록
	 * @param MemoInfoVO
	 * @throws Exception
	 */
	public void insertMemoInfo(MemoInfoVO memoInfoVO) throws Exception {
		insert("memoInfo.insertMemoInfo", memoInfoVO);
	}
	
	/**
	 * 메모정보 수정
	 * @param MemoInfoVO
	 * @throws Exception
	 */
	public void updateMemoInfo(MemoInfoVO memoInfoVO) throws Exception {
		update("memoInfo.updateMemoInfo", memoInfoVO);
	}
	
	/**
	 * 메모정보 삭제
	 * @param MemoInfoVO
	 * @throws Exception
	 */
	public void deleteMemoInfo(MemoInfoVO memoInfoVO) throws Exception {
		delete("memoInfo.deleteMemoInfo", memoInfoVO);
	}

	/**
	 * @Description  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.04.18
	 * @param memoInfoVO
	 * @return
	 */
	public String selectLastModfDt(MemoInfoVO memoInfoVO) {
		// TODO Auto-generated method stub
		return  selectOne("memoInfo.selectLastModfDt", memoInfoVO);
	}

	/**
	 * @Description  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.04.18
	 * @param memoInfoVO
	 * @return
	 */
	public String selectSubject(MemoInfoVO memoInfoVO) {
		// TODO Auto-generated method stub
		return  selectOne("memoInfo.selectSubject", memoInfoVO);
	}

	/**
	 * @Description 
	 * 메모정보 공유 일괄적용 
	 * @Author 황의현
	 * @Date 2022.06.21
	 * @param memoInfoVO
	 * @return
	 */
	public void updateMemoPnrsAtBundle(MemoInfoVO memoInfoVO) {
		update("memoInfo.updateMemoPnrsAtBundle", memoInfoVO);
	}
	
	
}
