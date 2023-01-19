package egiskorea.com.job.cmss.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;
import egovframework.rte.fdl.cmmn.exception.FdlException;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.cmss.service.TgdSccoEmdVO;
import egiskorea.com.job.cmss.service.ComtccmmnclCode;
import egiskorea.com.job.cmss.service.Comtccmmndetailcode;

/**
 * @Description 업무 > 공간/주소를 조회 DAO 클래스
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
 *  2022.01.12		정재환	최초 생성
 *  </pre>
 */
@Repository("commonnessSpaceSearchDAO")
public class CommonnessSpaceSearchDAO extends ComAbstractDAO {

	/**
	 * 업무 > 읍명동 리스트 조회
	 * 
	 * @param tgdSccoEmdVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectTgdSccoEmdList(TgdSccoEmdVO tgdSccoEmdVO) throws FdlException {
		return selectList("commonnessSpaceSearch.selectTgdSccoEmdList", tgdSccoEmdVO);
	}
	
	/**
	 * 공통 분류 코드 조회
	 * 
	 * @param comtccmmnclCode
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectComtccmmnclCodeList(ComtccmmnclCode comtccmmnclCode) throws FdlException {
		return selectList("commonnessSpaceSearch.selectComtccmmnclCodeList", comtccmmnclCode);
	}
	
	/**
	 * 공통 분류 상세 코드 조회
	 * 
	 * @param Comtccmmndetailcode
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectComtccmmndetailcodeList(Comtccmmndetailcode comtccmmndetailcode) throws FdlException {
		return selectList("commonnessSpaceSearch.selectComtccmmndetailcodeList", comtccmmndetailcode);
	}
}
