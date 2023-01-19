package egovframework.com.uss.olh.qna.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.com.uss.olh.qna.service.EgovQnaService;
import egovframework.com.uss.olh.qna.service.QnaVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.cmmn.exception.FdlException;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

@Service("EgovQnaService")
public class EgovQnaServiceImpl extends EgovAbstractServiceImpl implements EgovQnaService {

	private static final Logger LOGGER = LoggerFactory.getLogger(EgovQnaServiceImpl.class);

	@Resource(name = "EgovQnaDAO")
	private EgovQnaDAO egovQnaDao;

	/** ID Generation */
	@Resource(name = "egovQnaManageIdGnrService")
	private EgovIdGnrService idgenService;

	@Override
	public List<?> selectQnaList(QnaVO searchVO) {
		return egovQnaDao.selectQnaList(searchVO);
	}

	@Override
	public int selectQnaListCnt(QnaVO searchVO) {
		return egovQnaDao.selectQnaListCnt(searchVO);
	}

	@Override
	public QnaVO selectQnaDetail(QnaVO qnaVO) throws Exception {
		QnaVO resultVO = egovQnaDao.selectQnaDetail(qnaVO);
		if (resultVO == null)
			throw processException("info.nodata.msg");
		return resultVO;
	}

	@Override
	public void updateQnaInqireCo(QnaVO qnaVO) {
		egovQnaDao.updateQnaInqireCo(qnaVO);
	}

	@Override
	public void insertQna(QnaVO qnaVO) throws FdlException {
		String qaId = idgenService.getNextStringId();
		qnaVO.setQaId(qaId);
		
		egovQnaDao.insertQna(qnaVO);
	}

	@Override
	public void updateQna(QnaVO qnaVO) {
		egovQnaDao.updateQna(qnaVO);
	}

	@Override
	public void deleteQna(QnaVO qnaVO) {
		egovQnaDao.deleteQna(qnaVO);
	}

	@Override
	public List<?> selectQnaAnswerList(QnaVO searchVO) {
		return egovQnaDao.selectQnaAnswerList(searchVO);
	}

	@Override
	public int selectQnaAnswerListCnt(QnaVO searchVO) {
		return egovQnaDao.selectQnaAnswerListCnt(searchVO);
	}

	@Override
	public void updateQnaAnswer(QnaVO qnaVO) {
		egovQnaDao.updateQnaAnswer(qnaVO);
	}

	/**
	 * @Description 관리자 > Q&A 관리 수정 메소드
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.07
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 */
	public int updateQnaAnswerManage(QnaVO qnaVO) {
		int affectedRow = 0;

		try {
			affectedRow = egovQnaDao.updateQnaAnswerManage(qnaVO);
		} catch (Exception e) {
			LOGGER.info("-----------Q&A관리 수정 실패-----------");
			LOGGER.debug(e.getMessage(), e);
		}

		return affectedRow;
	}

	/**
	 * @Description 관리자 Q&A 관리 삭제 메소드
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 * @throws Exception
	 */
	public int deleteQnaManage(QnaVO qnaVO) {
		int affectedRow = 0;

		try {
			affectedRow = egovQnaDao.deleteQnaManage(qnaVO);
		} catch (Exception e) {
			LOGGER.info("-----------Q&A관리 삭제 실패-----------");
			LOGGER.debug(e.getMessage(), e);
		}

		return affectedRow;
	}

	/**
	 * @Description Q&A 삭제 업데이트 메소드(del_at='Y')로 업데이트 처리
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.07
	 * @param qnaVO
	 * @throws Exception
	 */
	public void updateQnaDeleteY(QnaVO qnaVO) throws Exception {
		egovQnaDao.updateQnaDeleteY(qnaVO);
	}

	/**
	 * @Description Q&A답변 관리 목록 조회 메소드(삭제되지 않는 전체 목록)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @throws Exception
	 */
	public List<QnaVO> selectQnaManageList(QnaVO qnaVO) throws Exception {
		return egovQnaDao.selectQnaManageList(qnaVO);
	}

	/**
	 * @Description Q&A답변 관리 목록 갯수 조회 메소드(삭제되지 않는 전체 목록)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @throws Exception
	 */
	public int selectQnaManageListCnt(QnaVO qnaVO) throws Exception {
		return egovQnaDao.selectQnaManageListCnt(qnaVO);
	}

	/**
	 * @Description 관리자 Q&A 관리 질문복구 메소드
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 * @throws Exception
	 */
	public int restoreQnaManage(QnaVO qnaVO) throws Exception {
		int affectedRow = 0;

		try {
			affectedRow = egovQnaDao.restoreQnaManage(qnaVO);
		} catch (Exception e) {
			LOGGER.info("-----------Q&A관리 복구 실패-----------");
			LOGGER.debug(e.getMessage(), e);
		}

		return affectedRow;
	}
}
