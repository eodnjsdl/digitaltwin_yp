package egiskorea.com.job.ibbi.service;

import java.util.List;
import java.util.Map;

/**
 * @Description 관내업소정보 service 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2022.02.17
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.10     이푸름		최초 생성	
 *  2022.02.17   전영후            2차 수정
 *  </pre>
 */

public interface InBusinessEstaInfoService {
	
	/** 
	 * 업무 > 공간정보활용 > 관내업소정보 목록 조회
	 * @param inBusinessEstaInfoVO
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectInBusinessEstaInfoList(InBusinessEstaInfoVO inBusinessEstaInfoVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 관내업소정보 목록 갯수
	 * @param inBusinessEstaInfoVO
	 * @return
	 * @throws Exception
	 */
	public int selectInBusinessEstaInfoListCnt(InBusinessEstaInfoVO inBusinessEstaInfoVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 관내업소정보 상세조회
	 * @param inBusinessEstaInfoVO
	 * @return
	 * @throws Exception
	 */
	public InBusinessEstaInfo selectInBusinessEstaInfo(InBusinessEstaInfoVO inBusinessEstaInfoVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 관내업소정보 엑셀다운로드용
	 * @param inBusinessEstaInfoVO
	 * @return
	 * @throws Exception
	 */
	public List<InBusinessEstaInfoVO> selectInBusinessEstaInfoExcelList(InBusinessEstaInfoVO inBusinessEstaInfoVO) throws Exception ;
	
	/** 
	 * 업무 > 공간정보활용 > 관내업소정보 속성검색용 개방서비스명 조회
	 * @param inBusinessEstaInfoVO
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectInBusinessEstaInfoOpnnSvcNmList(InBusinessEstaInfoVO inBusinessEstaInfoVO) throws Exception ;
}
