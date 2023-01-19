package egiskorea.com.cmt.pti.service;

import java.util.Map;

import egiskorea.com.cmt.mmi.service.MemoInfoVO;
import egovframework.com.cmm.service.FileVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 사진정보를 관리하는 service 클래스
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

public interface PotoInfoService {

	/**
	 * 사진정보 목록
	 * @param PotoInfoVO
	 * @return Map<String, Object>
	 */
	public Map<String, Object> selectPotoInfoList(PotoInfoVO potoInfoVO);
	
	/**
	 * 사진정보 상세조회
	 * @param PotoInfoVO
	 * @return EgovMap
	 */
	public EgovMap selectPotoInfoView(PotoInfoVO potoInfoVO);
	
	/**
	 * 사진정보 등록
	 * @param PotoInfoVO
	 * @throws Exception
	 */
	public void insertPotoInfo(PotoInfoVO potoInfoVO) throws Exception;
	
	/**
	 * 사진정보 수정
	 * @param PotoInfoVO
	 * @throws Exception
	 */
	public void updatePotoInfo(PotoInfoVO potoInfoVO) throws Exception;
	
	/**
	 * 사진정보 삭제
	 * @param PotoInfoVO
	 * @throws Exception
	 */
	public void deletePotoInfo(PotoInfoVO potoInfoVO) throws Exception;
	
	/**
	 * 사진정보 내용수정
	 * @param FileVO
	 * @throws Exception
	 */
	public void updateFileDetail(FileVO fvo) throws Exception;

	/**
	 * @Description  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.04.19
	 * @param potoInfoVO
	 * @return
	 */
	public String selectLastModfDt(PotoInfoVO potoInfoVO);
	
	/**
	 * @Description  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.04.19
	 * @param potoInfoVO
	 * @return
	 */
	public String selectSubject(PotoInfoVO potoInfoVO);
}


