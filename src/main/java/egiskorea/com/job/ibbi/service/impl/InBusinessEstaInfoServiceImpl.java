package egiskorea.com.job.ibbi.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.job.ibbi.service.InBusinessEstaInfo;
import egiskorea.com.job.ibbi.service.InBusinessEstaInfoService;
import egiskorea.com.job.ibbi.service.InBusinessEstaInfoVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/**
 * @Description 관내업소정보 seviceImpl 클래스
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
@Service("inBusinessEstaInfoService")
public class InBusinessEstaInfoServiceImpl extends EgovAbstractServiceImpl implements InBusinessEstaInfoService {
	
	@Resource(name = "inBusinessEstaInfoDAO")
	private InBusinessEstaInfoDAO inBusinessEstaInfoDAO;
	
	/** 
	 * 업무 > 공간정보활용 > 관내업소정보 목록 조회
	 * @param inBusinessEstaInfoVO
	 * @return
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectInBusinessEstaInfoList(InBusinessEstaInfoVO inBusinessEstaInfoVO) throws Exception {
		// 목록
		List<?> list = inBusinessEstaInfoDAO.selectInBusinessEstaInfoList(inBusinessEstaInfoVO);
		
		// 갯수
		int cnt = inBusinessEstaInfoDAO.selectInBusinessEstaInfoListCnt(inBusinessEstaInfoVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	};
	
	/** 
	 * 업무 > 공간정보활용 > 관내업소정보 상세조회
	 * @param inBusinessEstaInfoVO
	 * @return
	 * @throws Exception
	 */
	public InBusinessEstaInfo selectInBusinessEstaInfo(InBusinessEstaInfoVO inBusinessEstaInfoVO) throws Exception {
		
		InBusinessEstaInfo result = inBusinessEstaInfoDAO.selectInBusinessEstaInfo(inBusinessEstaInfoVO);
		
		return result;
	}
	
	/** 
	 * 업무 > 공간정보활용 > 관내업소정보 엑셀다운로드용
	 * @param inBusinessEstaInfoVO
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<InBusinessEstaInfoVO> selectInBusinessEstaInfoExcelList(InBusinessEstaInfoVO inBusinessEstaInfoVO) throws Exception {
		return inBusinessEstaInfoDAO.selectInBusinessEstaInfoExcelList(inBusinessEstaInfoVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 관내업소정보 속성검색용 개방서비스명 조회
	 * @param inBusinessEstaInfoVO
	 * @return
	 * @throws Exception
	 */
	@Override
	public Map<String, Object> selectInBusinessEstaInfoOpnnSvcNmList(InBusinessEstaInfoVO inBusinessEstaInfoVO) throws Exception {
		// 목록
		List<?> list = inBusinessEstaInfoDAO.selectInBusinessEstaInfoOpnnSvcNmList(inBusinessEstaInfoVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		return map;
	}

	@Override
	public int selectInBusinessEstaInfoListCnt(InBusinessEstaInfoVO inBusinessEstaInfoVO) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

}
