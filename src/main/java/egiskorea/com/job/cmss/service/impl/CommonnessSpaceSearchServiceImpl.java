package egiskorea.com.job.cmss.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import egovframework.rte.fdl.cmmn.exception.FdlException;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

import egiskorea.com.job.cmss.service.CommonnessSpaceSearchService;
import egiskorea.com.job.cmss.service.TgdSccoEmdVO;
import egiskorea.com.job.cmss.service.ComtccmmnclCode;
import egiskorea.com.job.cmss.service.Comtccmmndetailcode;

/**
 * @Description 업무 > 공간/주소를 조회 serviceImpl 클래스
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
 *  2022.01.12	 정재환     		최초 생성
 *  </pre>
 */
@Service("commonnessSpaceSearchService")
public class CommonnessSpaceSearchServiceImpl extends EgovAbstractServiceImpl implements CommonnessSpaceSearchService{
	
	@Resource(name = "commonnessSpaceSearchDAO")
	private CommonnessSpaceSearchDAO commonnessSpaceSearchDAO;
	
	
	/** 
	 * 사업공유 관리 > 공사계획 상세 정보 목록 조회
	 * @param TgdSccoEmdVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */	
	@Override public  Map<String, Object> selectTgdSccoEmdList(TgdSccoEmdVO tgdSccoEmdVO) throws FdlException{
  
		// 공사계획 상세 정보 목록 리스트 조회
		List<?> list = commonnessSpaceSearchDAO.selectTgdSccoEmdList(tgdSccoEmdVO);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		  
		map.put("resultList", list);
		return map; 
	}
	 
	/** 
	 * 공통 분류 코드 리스트를 조회한다
	 * @param ComtccmmnclCode
	 * @return Map<String, Object>
	 * @throws Exception
	 */	
	@Override public  Map<String, Object> selectComtccmmnclCodeList(ComtccmmnclCode comtccmmnclCode) throws FdlException{
  
		// 공사계획 상세 정보 목록 리스트 조회
		List<?> list = commonnessSpaceSearchDAO.selectComtccmmnclCodeList(comtccmmnclCode);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		  
		map.put("resultList", list);
		return map; 
	}
	
	/** 
	 * 공통 분류 상세 코드 리스트를 조회한다
	 * @param Comtccmmndetailcode
	 * @return Map<String, Object>
	 * @throws Exception
	 */	
	@Override public  Map<String, Object> selectComtccmmndetailcodeList(Comtccmmndetailcode comtccmmndetailcode) throws FdlException{
  
		// 공사계획 상세 정보 목록 리스트 조회
		List<?> list = commonnessSpaceSearchDAO.selectComtccmmndetailcodeList(comtccmmndetailcode);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		  
		map.put("resultList", list);
		return map; 
	}
	
}	
