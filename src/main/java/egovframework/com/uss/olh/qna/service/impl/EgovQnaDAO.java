package egovframework.com.uss.olh.qna.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.com.uss.olh.qna.service.QnaVO;

@Repository("EgovQnaDAO")
public class EgovQnaDAO extends EgovComAbstractDAO {

	public List<?> selectQnaList(QnaVO searchVO) {
		return list("QnaManage.selectQnaList", searchVO);
	}

	public int selectQnaListCnt(QnaVO searchVO) {
		return (Integer) selectOne("QnaManage.selectQnaListCnt", searchVO);
	}

	public QnaVO selectQnaDetail(QnaVO qnaVO) {
		return (QnaVO) selectOne("QnaManage.selectQnaDetail", qnaVO);
	}

	public void updateQnaInqireCo(QnaVO qnaVO) {
		update("QnaManage.updateQnaInqireCo", qnaVO);
	}

	public void insertQna(QnaVO qnaVO) {
		insert("QnaManage.insertQna", qnaVO);
	}

	public void updateQna(QnaVO qnaVO) {
		update("QnaManage.updateQna", qnaVO);
	}

	public void deleteQna(QnaVO qnaVO) {
		delete("QnaManage.deleteQna", qnaVO);
	}

	public List<?> selectQnaAnswerList(QnaVO searchVO) {
		return list("QnaManage.selectQnaAnswerList", searchVO);
	}

	public int selectQnaAnswerListCnt(QnaVO searchVO) {
		return (Integer) selectOne("QnaManage.selectQnaAnswerListCnt", searchVO);
	}

	public void updateQnaAnswer(QnaVO qnaVO) {
		update("QnaManage.updateQnaAnswer", qnaVO);
	}

	/**
	 * @Description 관리자 > Q&A 관리 수정 쿼리
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.07
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 */
	public int updateQnaAnswerManage(QnaVO qnaVO) throws Exception {
		return update("QnaManage.updateQnaAnswerManage", qnaVO);
	}

	/**
	 * @Description 관리자 Q&A 관리 삭제 쿼리
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 * @throws Exception
	 */
    public int deleteQnaManage(QnaVO qnaVO) throws Exception {
		return update("QnaManage.deleteQnaManage", qnaVO);
    }

	/**
	 * @Description Q&A 삭제 쿼리(del_at='Y')로 업데이트 처리
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.07
	 * @param qnaVO
	 * @throws Exception
	 */
	public void updateQnaDeleteY(QnaVO qnaVO) throws Exception {
		update("QnaManage.updateQnaDeleteY", qnaVO);
	}

	/**
	 * @Description Q&A답변 관리 목록 조회 쿼리(삭제되지 않는 전체 목록)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @throws Exception
	 */
	public List<QnaVO> selectQnaManageList(QnaVO qnaVO) throws Exception {
		return selectList("QnaManage.selectQnaManageList", qnaVO);
	}

	/**
	 * @Description Q&A답변 관리 목록 갯수 조회 쿼리(삭제되지 않는 전체 목록)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @throws Exception
	 */
	public int selectQnaManageListCnt(QnaVO qnaVO) {
		return (Integer) selectOne("QnaManage.selectQnaManageListCnt", qnaVO);
	}

	/**
	 * @Description 관리자 Q&A 관리 질문복구 쿼리
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 * @throws Exception
	 */
	public int restoreQnaManage(QnaVO qnaVO) throws Exception {
		return update("QnaManage.restoreQnaManage", qnaVO);
	}
}
