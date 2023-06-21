package egiskorea.com.cmt.pti.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.cmt.mmi.service.MemoInfoVO;
import egiskorea.com.cmt.pti.service.PotoInfoService;
import egiskorea.com.cmt.pti.service.PotoInfoVO;
import egovframework.com.cmm.service.FileVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 사진정보를 관리하는 serviceImpl 클래스
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

@Service("potoInfoService")
public class PotoInfoServiceImpl implements PotoInfoService {

	@Resource(name="potoInfoDAO")
	private PotoInfoDAO potoInfoDAO;

	/**
	 * 사진정보 목록
	 * @param PotoInfoVO
	 * @return Map<String, Object>
	 */
	@Override
	public Map<String, Object> selectPotoInfoList(PotoInfoVO potoInfoVO) {
		// TODO Auto-generated method stub
		List<?> list = potoInfoDAO.selectPotoInfoList(potoInfoVO);
		
		int cnt = potoInfoDAO.selectPotoInfoListCnt(potoInfoVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		return map;
	}

	/**
	 * 사진정보 상세조회
	 * @param potoInfoVO
	 * @return EgovMap
	 */
	@Override
	public EgovMap selectPotoInfoView(PotoInfoVO potoInfoVO) {
		// TODO Auto-generated method stub
		
		EgovMap result = potoInfoDAO.selectPotoInfoView(potoInfoVO);
		
		return result;
	}

	/**
	 * 사진정보 등록
	 * @param potoInfoVO
	 * @throws Exception
	 */
	@Override
	public void insertPotoInfo(PotoInfoVO potoInfoVO) throws Exception {
		// TODO Auto-generated method stub
		potoInfoDAO.insertPotoInfo(potoInfoVO);
	}

	/**
	 * 사진정보 수정
	 * @param PotoInfoVO
	 * @throws Exception
	 */
	@Override
	public void updatePotoInfo(PotoInfoVO potoInfoVO) throws Exception {
		// TODO Auto-generated method stub
		potoInfoDAO.updatePotoInfo(potoInfoVO);
	}
	
	/**
	 * 사진정보 삭제
	 * @param PotoInfoVO
	 * @throws Exception
	 */
	@Override
	public void deletePotoInfo(PotoInfoVO potoInfoVO) throws Exception {
		// TODO Auto-generated method stub
		potoInfoDAO.deletePotoInfo(potoInfoVO);
	}
	
	/**
	 * 사진정보 내용수정
	 * @param FileVO
	 * @throws Exception
	 */
	@Override
	public void updateFileDetail(FileVO fvo) throws Exception {
		// TODO Auto-generated method stub
		potoInfoDAO.updateFileDetail(fvo);
	}

	@Override
	public String selectLastModfDt(PotoInfoVO potoInfoVO) {
		// TODO Auto-generated method stub
		return potoInfoDAO.selectLastModfDt(potoInfoVO);
	}

	@Override
	public String selectSubject(PotoInfoVO potoInfoVO) {
		// TODO Auto-generated method stub
		return potoInfoDAO.selectSubject(potoInfoVO);
	}

	/**
	 * 사진정보 공유 일괄적용
	 * @param PotoInfoVO
	 * @throws Exception
	 */
	@Override
	public void updatePhotoPnrsAtBundle(PotoInfoVO potoInfoVO) {
		potoInfoDAO.updatePhotoPnrsAtBundle(potoInfoVO);
	}
	
}
