package egovframework.com.uss.olh.opqna.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.com.uss.olh.opqna.service.EgovOpQnaService;
import egovframework.com.uss.olh.opqna.service.OpQnaVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.cmmn.exception.FdlException;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

@Service("EgovOpQnaService")
public class EgovOpQnaServiceImpl extends EgovAbstractServiceImpl implements EgovOpQnaService {

	private static final Logger LOGGER = LoggerFactory.getLogger(EgovOpQnaServiceImpl.class);

	@Resource(name = "EgovOpQnaDAO")
	private EgovOpQnaDAO egovOpQnaDao;

	/** ID Generation */
	@Resource(name = "egovQnaManageIdGnrService")
	private EgovIdGnrService idgenService;

	@Override
	public List<?> selectOpQnaList(OpQnaVO searchVO) {
		return egovOpQnaDao.selectOpQnaList(searchVO);
	}

	@Override
	public int selectOpQnaListCnt(OpQnaVO searchVO) {
		return egovOpQnaDao.selectOpQnaListCnt(searchVO);
	}

	@Override
	public OpQnaVO selectOpQnaDetail(OpQnaVO qnaVO) throws Exception {
		OpQnaVO resultVO = egovOpQnaDao.selectOpQnaDetail(qnaVO);
		if (resultVO == null)
			throw processException("info.nodata.msg");
		return resultVO;
	}

	@Override
	public void updateOpQnaInqireCo(OpQnaVO qnaVO) {
		egovOpQnaDao.updateOpQnaInqireCo(qnaVO);
	}

	@Override
	public void insertOpQna(OpQnaVO qnaVO) throws FdlException {
		String qaId = idgenService.getNextStringId();
		qnaVO.setQaId(qaId);
		
		egovOpQnaDao.insertOpQna(qnaVO);
	}

	@Override
	public void updateOpQna(OpQnaVO qnaVO) {
		egovOpQnaDao.updateOpQna(qnaVO);
	}

	@Override
	public void deleteOpQna(OpQnaVO qnaVO) {
		egovOpQnaDao.deleteOpQna(qnaVO);
	}

	@Override
	public List<?> selectOpQnaAnswerList(OpQnaVO searchVO) {
		return egovOpQnaDao.selectOpQnaAnswerList(searchVO);
	}

	@Override
	public int selectOpQnaAnswerListCnt(OpQnaVO searchVO) {
		return egovOpQnaDao.selectOpQnaAnswerListCnt(searchVO);
	}

	@Override
	public void updateOpQnaAnswer(OpQnaVO qnaVO) {
		egovOpQnaDao.updateOpQnaAnswer(qnaVO);
	}

	/**
	 * @Description 관리자 > Q&A 관리 수정 메소드
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.07
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 */
	public int updateOpQnaAnswerManage(OpQnaVO qnaVO) {
		int affectedRow = 0;

		try {
			affectedRow = egovOpQnaDao.updateOpQnaAnswerManage(qnaVO);
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
	public int deleteOpQnaManage(OpQnaVO qnaVO) {
		int affectedRow = 0;

		try {
			affectedRow = egovOpQnaDao.deleteOpQnaManage(qnaVO);
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
	public void updateOpQnaDeleteY(OpQnaVO qnaVO) throws Exception {
		egovOpQnaDao.updateOpQnaDeleteY(qnaVO);
	}

	/**
	 * @Description Q&A답변 관리 목록 조회 메소드(삭제되지 않는 전체 목록)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @throws Exception
	 */
	public List<OpQnaVO> selectOpQnaManageList(OpQnaVO qnaVO) throws Exception {
		return egovOpQnaDao.selectOpQnaManageList(qnaVO);
	}

	/**
	 * @Description Q&A답변 관리 목록 갯수 조회 메소드(삭제되지 않는 전체 목록)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @throws Exception
	 */
	public int selectOpQnaManageListCnt(OpQnaVO qnaVO) throws Exception {
		return egovOpQnaDao.selectOpQnaManageListCnt(qnaVO);
	}

	/**
	 * @Description 관리자 Q&A 관리 질문복구 메소드
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param qnaVO
	 * @return affected Rows(쿼리 성공 수 반환)
	 * @throws Exception
	 */
	public int restoreOpQnaManage(OpQnaVO qnaVO) throws Exception {
		int affectedRow = 0;

		try {
			affectedRow = egovOpQnaDao.restoreOpQnaManage(qnaVO);
		} catch (Exception e) {
			LOGGER.info("-----------Q&A관리 복구 실패-----------");
			LOGGER.debug(e.getMessage(), e);
		}

		return affectedRow;
	}
}