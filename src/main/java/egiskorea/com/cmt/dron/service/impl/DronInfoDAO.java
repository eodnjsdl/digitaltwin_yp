package egiskorea.com.cmt.dron.service.impl;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;

import egiskorea.com.cmt.dron.service.DronInfoVO;
import egiskorea.com.cmt.pti.service.PotoInfoVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

/**
 * @Description 드론정보를 관리하는 dao 클래스
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
@Repository("dronInfoDAO")
public class DronInfoDAO extends ComAbstractDAO {

    /**
     * 드론정보 목록
     * @param
     * @return list
     */
    public List<?> selectDronInfoList(DronInfoVO dronInfoVO) {
        return selectList("dronInfo.selectDronInfoList", dronInfoVO);
    }

    /**
     * 드론정보 목록 갯수
     * @param dronInfoVO
     * @return
     */
    public int selectDronInfoListCnt(DronInfoVO dronInfoVO) {
        return (Integer)selectOne("dronInfo.selectDronInfoCnt", dronInfoVO);
    }

        /**
	 * 드론정보 등록
	 * @param dronInfoVO
	 * @throws Exception
	 */
    public void insertDronInfo(DronInfoVO dronInfoVO) throws Exception {
        insert("dronInfo.insertDronInfo", dronInfoVO);
    }
    /**
     * 드론정보 상세조회
     * @param dronInfoVO
     * @return EgovMap
     */
    public EgovMap selectDronInfoView(DronInfoVO dronInfoVO) {
        return (EgovMap) selectOne("dronInfo.selectDronInfoView", dronInfoVO);
    }

    /**
     * 드론정보 수정
     * @param dronInfoVO
     * @throws Exception
     */
    public void updateDronInfo(DronInfoVO dronInfoVO) throws Exception {
        insert("dronInfo.updateDronInfo", dronInfoVO);
    }

    /**
     * 드론정보 삭제
     * @param dronInfoVO
     * @throws Exception
     */
    public void deleteDronInfo(DronInfoVO dronInfoVO) throws Exception {
        delete("dronInfo.deleteDronInfo", dronInfoVO);
    }

	/**
	 * @Description  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.05.02
	 * @param dronInfoVO
	 * @return
	 */
	public String selectLastModfDt(DronInfoVO dronInfoVO) {
		// TODO Auto-generated method stub
		return selectOne("dronInfo.selectLastModfDt", dronInfoVO);
	}

	/**
	 * @Description  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.05.02
	 * @param dronInfoVO
	 * @return
	 */
	public String selectSubject(DronInfoVO dronInfoVO) {
		// TODO Auto-generated method stub
		return selectOne("dronInfo.selectSubject", dronInfoVO);
	}

}
