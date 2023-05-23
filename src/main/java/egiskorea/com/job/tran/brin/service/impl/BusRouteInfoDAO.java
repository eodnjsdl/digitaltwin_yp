package egiskorea.com.job.tran.brin.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.tran.brin.service.TbdThrghRouteInfoVO;
import egiskorea.com.job.tran.brin.service.ThrghSttnVO;

/**
 * @Description 교통분석/버스노선정보 DAO
 * @author 김영주
 * @since 2023.05.11
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                     수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.11   김영주                최초 생성
 *  2023.05.17   장현승                2차 수정
 */

@Repository("busRouteInfoDAO")
public class BusRouteInfoDAO extends ComAbstractDAO {
	
	/**
	 * 경유 정류소 조회
	 * @param thrghSttnVO
	 * @return Exception
	 */
	public List<ThrghSttnVO> selectThrghSttnList(ThrghSttnVO thrghSttnVO) {
		// TODO Auto-generated method stub
		return selectList("busRouteInfoDAO.selectThrghSttnList", thrghSttnVO);
	}
	
	/**
	 * 특정 정류소경유노선정보
	 * @param tbdThrghRouteInfoVO
	 * @return Exception
	 */
    public List<TbdThrghRouteInfoVO> getTbdThrghRouteInfoById(String sttn_id) throws Exception {
    	List<TbdThrghRouteInfoVO> t;
    	t = selectList("busRouteInfoDAO.getTbdThrghRouteInfoById", sttn_id);
    	System.out.println(t);
    	return t;
    	//return selectList("busRouteInfoDAO.getTbdThrghRouteInfoById", sttn_id);
    	
    }
}
