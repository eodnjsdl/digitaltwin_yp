package egiskorea.com.cmt.dron.service.impl;

import egiskorea.com.cmt.dron.service.DronInfoService;

import egiskorea.com.cmt.dron.service.DronInfoVO;
import egiskorea.com.cmt.pti.service.impl.PotoInfoDAO;
import egovframework.com.cmm.service.FileVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @Description 드론정보를 관리하는 serviceimpl 클래스
 * @author 배윤성
 * @since 2022.01.20
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.20   배윤성           최초 생성
 *  </pre>
 */

@Service("dronInfoService")
public class DronInfoServiceImpl implements DronInfoService {

    @Resource(name="dronInfoDAO")
    private DronInfoDAO dronInfoDAO;

    /**
     * 드론 정보 목록
     * @param params
     * @return
     */
    @Override
    public Map<String, Object> selectDronInfoList(DronInfoVO dronInfoVO) {
        List<?> list = dronInfoDAO.selectDronInfoList(dronInfoVO);
        int cnt = dronInfoDAO.selectDronInfoListCnt(dronInfoVO);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("resultList",list);
        map.put("resultCnt", Integer.toString(cnt));
        return map;
    }
    /**
     * 드론정보 상세조회
     * @param params
     * @return
     */
    @Override
    public EgovMap selectDronInfoView(DronInfoVO dronInfoVO)
    {
        EgovMap result   = dronInfoDAO.selectDronInfoView(dronInfoVO);
        return result;
    }
    /**
     * 드론 영상 등록
     * @param dronInfoVO
     */
    @Override
    public void insertDronInfo(DronInfoVO dronInfoVO) throws Exception {
            dronInfoDAO.insertDronInfo(dronInfoVO);
    }

    /**
     * 드론영상 삭제
     */
    @Override
    public void deleteDronInfo(DronInfoVO dronInfoVO) throws Exception {
        dronInfoDAO.deleteDronInfo(dronInfoVO);
    }
    /**
     * 드론영상 내용수정.
     * @param fvo
     * @throws Exception
     */
    @Override
    public void updateFileDetail(FileVO fvo) throws Exception {

    }

    @Override
    public void updateDronInfo(DronInfoVO dronInfoVOVO) throws Exception {
        dronInfoDAO.updateDronInfo(dronInfoVOVO);
    }
    
	@Override
	public String selectLastModfDt(DronInfoVO dronInfoVO) {
		// TODO Auto-generated method stub
		return dronInfoDAO.selectLastModfDt(dronInfoVO);
	}
	@Override
	public String selectSubject(DronInfoVO dronInfoVO) {
		// TODO Auto-generated method stub
		return dronInfoDAO.selectSubject(dronInfoVO);
	}
}
