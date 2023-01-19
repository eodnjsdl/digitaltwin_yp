package egovframework.com.uss.olh.opqna.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.com.uss.olh.opqna.service.OpQnaVO;

@Repository("EgovOpQnaDAO")
public class EgovOpQnaDAO extends EgovComAbstractDAO {

	public List<?> selectOpQnaList(OpQnaVO searchVO) {
		return list("OpQnaManage.selectOpQnaList", searchVO);
	}

	public int selectOpQnaListCnt(OpQnaVO searchVO) {
		return (Integer) selectOne("OpQnaManage.selectOpQnaListCnt", searchVO);
	}

	public OpQnaVO selectOpQnaDetail(OpQnaVO qnaVO) {
		return (OpQnaVO) selectOne("OpQnaManage.selectOpQnaDetail", qnaVO);
	}

	public void updateOpQnaInqireCo(OpQnaVO qnaVO) {
		update("OpQnaManage.updateOpQnaInqireCo", qnaVO);
	}

	public void insertOpQna(OpQnaVO qnaVO) {
		insert("OpQnaManage.insertOpQna", qnaVO);
	}

	public void updateOpQna(OpQnaVO qnaVO) {
		update("OpQnaManage.updateOpQna", qnaVO);
	}

	public void deleteOpQna(OpQnaVO qnaVO) {
		delete("OpQnaManage.deleteOpQna", qnaVO);
	}

	public List<?> selectOpQnaAnswerList(OpQnaVO searchVO) {
		return list("OpQnaManage.selectOpQnaAnswerList", searchVO);
	}

	public int selectOpQnaAnswerListCnt(OpQnaVO searchVO) {
		return (Integer) selectOne("OpQnaManage.selectOpQnaAnswerListCnt", searchVO);
	}

	public void updateOpQnaAnswer(OpQnaVO qnaVO) {
		update("OpQnaManage.updateOpQnaAnswer", qnaVO);
	}

	/**
	 * @Description 관리자 > Q&A 관리 수정 쿼리
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.07
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 */
	public int updateOpQnaAnswerManage(OpQnaVO qnaVO) throws Exception {
		return update("OpQnaManage.updateOpQnaAnswerManage", qnaVO);
	}

	/**
	 * @Description 관리자 Q&A 관리 삭제 쿼리
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 * @throws Exception
	 */
    public int deleteOpQnaManage(OpQnaVO qnaVO) throws Exception {
		return update("OpQnaManage.deleteOpQnaManage", qnaVO);
    }

	/**
	 * @Description Q&A 삭제 쿼리(del_at='Y')로 업데이트 처리
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.07
	 * @param qnaVO
	 * @throws Exception
	 */
	public void updateOpQnaDeleteY(OpQnaVO qnaVO) throws Exception {
		update("OpQnaManage.updateOpQnaDeleteY", qnaVO);
	}

	/**
	 * @Description Q&A답변 관리 목록 조회 쿼리(삭제되지 않는 전체 목록)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @throws Exception
	 */
	public List<OpQnaVO> selectOpQnaManageList(OpQnaVO qnaVO) throws Exception {
		return selectList("OpQnaManage.selectOpQnaManageList", qnaVO);
	}

	/**
	 * @Description Q&A답변 관리 목록 갯수 조회 쿼리(삭제되지 않는 전체 목록)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @throws Exception
	 */
	public int selectOpQnaManageListCnt(OpQnaVO qnaVO) {
		return (Integer) selectOne("OpQnaManage.selectOpQnaManageListCnt", qnaVO);
	}

	/**
	 * @Description 관리자 Q&A 관리 질문복구 쿼리
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 * @throws Exception
	 */
	public int restoreOpQnaManage(OpQnaVO qnaVO) throws Exception {
		return update("OpQnaManage.restoreOpQnaManage", qnaVO);
	}
}
