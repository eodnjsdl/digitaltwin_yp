package egiskorea.com.job.cmss.service;

import egovframework.rte.fdl.cmmn.exception.FdlException;
import java.util.Map;


/**
 * @Description 업무 > 공간/주소, 공통코드를 조회 하는 service 클래스
 * @author 플랫폼개발부문 DT플랫폼 정재환
 * @since 2022.01.12
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.12	   정재환     	최초 생성
 *  </pre>
 */
public interface CommonnessSpaceSearchService {
	
	/**
	 * @Description : 읍명동 리스트 조회
	 * @Author egis
	 * @Date 2022.01.11
	 * @param TgdSccoEmdVO
	 * @return Map
	 * @throws Exception
	 */
	public Map<String, Object> selectTgdSccoEmdList(TgdSccoEmdVO tgdSccoEmdVO) throws FdlException;
	
	/**
	 * @Description : 공통 분류 코드를 조회
	 * @Author egis
	 * @Date 2022.02.08
	 * @param ComtccmmnclCode
	 * @return Map
	 * @throws Exception
	 */
	public Map<String, Object> selectComtccmmnclCodeList(ComtccmmnclCode comtccmmnclCode) throws FdlException;
	
	/**
	 * @Description : 공통 분류 상세 코드를 조회
	 * @Author egis
	 * @Date 2022.02.08
	 * @param Comtccmmndetailcode
	 * @return Map
	 * @throws Exception
	 */
	public Map<String, Object> selectComtccmmndetailcodeList(Comtccmmndetailcode comtccmmndetailcode) throws FdlException;
	
	 	
	
	
}
