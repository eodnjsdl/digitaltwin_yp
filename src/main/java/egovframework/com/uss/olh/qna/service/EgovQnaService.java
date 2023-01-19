package egovframework.com.uss.olh.qna.service;

import java.util.List;

import egovframework.rte.fdl.cmmn.exception.FdlException;

public interface EgovQnaService {

	List<?> selectQnaList(QnaVO searchVO);

	int selectQnaListCnt(QnaVO searchVO);

	QnaVO selectQnaDetail(QnaVO qnaVO) throws Exception;

	void updateQnaInqireCo(QnaVO qnaVO);

	void insertQna(QnaVO qnaVO) throws FdlException;

	void updateQna(QnaVO qnaVO);

	void deleteQna(QnaVO qnaVO);

	List<?> selectQnaAnswerList(QnaVO searchVO);

	int selectQnaAnswerListCnt(QnaVO searchVO);

	void updateQnaAnswer(QnaVO qnaVO);

	/**
	 * @Description 관리자 Q&A 관리 수정 메소드
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.07
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 * @throws Exception
	 */
	public int updateQnaAnswerManage(QnaVO qnaVO) throws Exception;

	/**
	 * @Description 관리자 Q&A 관리 삭제 메소드
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 * @throws Exception
	 */
	int deleteQnaManage(QnaVO qnaVO) throws Exception;

	/**
	 * @Description Q&A 삭제 업데이트 메소드(del_at='Y')로 업데이트 처리
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.07
	 * @param qnaVO
	 * @throws Exception
	 */
	void updateQnaDeleteY(QnaVO qnaVO) throws Exception;

	/**
	 * @Description Q&A답변 관리 목록 조회 메소드(삭제되지 않는 전체 목록)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @throws Exception
	 */
	List<QnaVO> selectQnaManageList(QnaVO qnaVO) throws Exception;

	/**
	 * @Description Q&A답변 관리 목록 갯수 조회 메소드(삭제되지 않는 전체 목록)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @throws Exception
	 */
	int selectQnaManageListCnt(QnaVO qnaVO) throws Exception;

	/**
	 * @Description 관리자 Q&A 관리 질문복구 메소드
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 * @throws Exception
	 */
	public int restoreQnaManage(QnaVO qnaVO) throws Exception;
}
