package egiskorea.com.cmt.mmi.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.cmt.mmi.service.MemoInfoService;
import egiskorea.com.cmt.mmi.service.MemoInfoVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;


/**
 * @Description 메모정보를 관리하는 serviceImpl 클래스
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

@Service("memoInfoService")
public class MemoInfoServiceImpl extends EgovAbstractServiceImpl implements MemoInfoService {

	@Resource(name="memoInfoDAO")
	private MemoInfoDAO memoInfoDAO;
	
	/**
	 * 메모정보 목록
	 * @param MemoInfoVO
	 * @return Map<String, Object>
	 */
	
	@Override
	public Map<String, Object> selectMemoInfoList(MemoInfoVO memoInfoVO) {
		// TODO Auto-generated method stub
		List<?> list = memoInfoDAO.selectMemoInfoList(memoInfoVO);
		
		int cnt = memoInfoDAO.selectMemoInfoListCnt(memoInfoVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}
	
	/**
	 * 메모정보 상세조회
	 * @param MemoInfoVO
	 * @return EgovMap
	 */
	
	@Override
	public EgovMap selectMemoInfoView(MemoInfoVO memoInfoVO) {
		// TODO Auto-generated method stub
		
		EgovMap result = memoInfoDAO.selectMemoInfoView(memoInfoVO);
		
		return result;
	}

	/**
	 * 메모정보 등록
	 * @param MemoInfoVO
	 * @throws Exception
	 */
	@Override
	public void insertMemoInfo(MemoInfoVO memoInfoVO) throws Exception {

		memoInfoDAO.insertMemoInfo(memoInfoVO);
	}
	
	/**
	 * 메모정보 수정
	 * @param MemoInfoVO
	 * @throws Exception
	 */
	
	@Override
	public void updateMemoInfo(MemoInfoVO memoInfoVO) throws Exception {

		memoInfoDAO.updateMemoInfo(memoInfoVO);
	}
	
	/**
	 * 메모정보 삭제
	 * @param MemoInfoVO
	 * @throws Exception
	 */
	
	@Override
	public void deleteMemoInfo(MemoInfoVO memoInfoVO) throws Exception {
		// TODO Auto-generated method stub
		memoInfoDAO.deleteMemoInfo(memoInfoVO);
	}

	/**
	 * 수정날짜 조회
	 * @param MemoInfoVO
	 * @throws Exception
	 */
	
	@Override
	public String selectLastModfDt(MemoInfoVO memoInfoVO) {
		
		return memoInfoDAO.selectLastModfDt(memoInfoVO);
	}

	/**
	 * 제목 조회
	 * @param MemoInfoVO
	 * @throws Exception
	 */
	
	@Override
	public String selectSubject(MemoInfoVO memoInfoVO) {
		return memoInfoDAO.selectSubject(memoInfoVO);
	}

	/**
	 * 메모 공유 일괄 적용
	 * @param MemoInfoVO
	 * @throws Exception
	 */
	
	@Override
	public void updateMemoPnrsAtBundle(MemoInfoVO memoInfoVO) {
		memoInfoDAO.updateMemoPnrsAtBundle(memoInfoVO);
	}
	
}
