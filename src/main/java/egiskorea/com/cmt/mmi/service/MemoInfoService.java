package egiskorea.com.cmt.mmi.service;

import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 메모정보를 관리하는 service 클래스
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

public interface MemoInfoService {

	/**
	 * 메모정보 목록
	 * @param MemoInfoVO
	 * @return Map<String, Object>
	 */
	public Map<String, Object> selectMemoInfoList(MemoInfoVO memoInfoVO);
	
	/**
	 * 메모정보 상세조회
	 * @param MemoInfoVO
	 * @return EgovMap
	 */
	public EgovMap selectMemoInfoView(MemoInfoVO memoInfoVO);
	
	/**
	 * 메모정보 등록
	 * @param MemoInfoVO
	 * @throws Exception
	 */
	public void insertMemoInfo(MemoInfoVO memoInfoVO) throws Exception;
	
	/**
	 * 메모정보 수정
	 * @param MemoInfoVO
	 * @throws Exception
	 */
	public void updateMemoInfo(MemoInfoVO memoInfoVO) throws Exception;
	
	/**
	 * 메모정보 삭제
	 * @param MemoInfoVO
	 * @throws Exception
	 */
	public void deleteMemoInfo(MemoInfoVO memoInfoVO) throws Exception;

	/**
	 * @Description  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.04.18
	 * @param memoInfoVO
	 * @return
	 */
	public String selectLastModfDt(MemoInfoVO memoInfoVO);

	/**
	 * @Description  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.04.18
	 * @param memoInfoVO
	 * @return
	 */
	public String selectSubject(MemoInfoVO memoInfoVO);
	
}
