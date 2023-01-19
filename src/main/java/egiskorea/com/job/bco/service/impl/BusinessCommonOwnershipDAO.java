package egiskorea.com.job.bco.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;
import egovframework.rte.fdl.cmmn.exception.FdlException;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.bco.service.ConstructionPlan;
import egiskorea.com.job.bco.service.ConstructionPlanVO;
import egiskorea.com.job.bco.service.ConstructionSchedule;
import egiskorea.com.job.bco.service.ConstructionScheduleVO;
import egiskorea.com.job.bco.service.ConstructionScheduleOrder;
import egiskorea.com.job.bco.service.ConstructionDtlsInfo;


/**
 * @Description 사업공유 관리 dao 클래스
 * @author 플랫폼개발부문 DT플랫폼 정재환
 * @since 2021.12.30
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.30   정재환            최초 생성
 *  </pre>
 */

@Repository("businessCommonOwnershipDAO")
public class BusinessCommonOwnershipDAO extends ComAbstractDAO {
	
	/** 
	 * 공간정보활용 > 공사계획 정보 목록 조회
	 * @param constructionPlanVO
	 * @return list
	 * @throws FdlException
	 */
	public List<?> selectConstructionPlanList(ConstructionPlanVO constructionPlanVO) throws FdlException{ 
		  return selectList("constructionPlan.selectConstructionPlanList", constructionPlanVO); 
	}
	 
	
	/** 
	 * 공간정보활용 > 공사계획 정보 목록 조회 cnt
	 * @param constructionPlanVO
	 * @return int
	 * @throws FdlException
	 */
	public int selectConstructionPlanListCnt(ConstructionPlanVO constructionPlanVO) throws FdlException{ 
		return (Integer)selectOne("constructionPlan.selectConstructionPlanListCnt", constructionPlanVO); 
	}
	
	/** 
	 * 공간정보활용 > 공사계획 상세 정보 목록 조회
	 * @param constructionPlanVO
	 * @return list
	 * @throws FdlException
	 */
	public ConstructionPlan selectConstructionPlan(ConstructionPlanVO constructionPlanVO) throws FdlException{ 
		  return (ConstructionPlan) selectOne("constructionPlan.selectConstructionPlan", constructionPlanVO); 
	}
	
	/** 
	 * 공간정보활용 > 공사계획 수정 처리
	 * @param ConstructionPlan
	 * @return void
	 * @throws FdlException
	 */
	public void updateConstructionPlan(ConstructionPlan constructionPlan) throws FdlException{
		 selectOne("constructionPlan.updateConstructionPlan",constructionPlan);
		
	}
	
	/** 
	 * 공간정보활용 > 공사계획 삭제 처리
	 * @param ConstructionPlan
	 * @return void
	 * @throws FdlException
	 */
	public void deleteConstructionPlan(ConstructionPlan constructionPlan) throws FdlException{
		 selectOne("constructionPlan.deleteConstructionPlan",constructionPlan);
		
	}
	
	/** 
	 * 공간정보활용 > 공사계획 등록 처리
	 * @param ConstructionPlan
	 * @return int
	 * @throws FdlException
	 */
	public int insertConstructionPlan(ConstructionPlan constructionPlan) throws FdlException{
		return insert("constructionPlan.insertConstructionPlan",constructionPlan);
	}
	
	
	/************************************************ 공간정보활용 > 공사예정 정보  ***********************************************/
	
	/** 
	 * 공간정보활용 > 공사예정 정보 목록 조회
	 * @param ConstructionScheduleVO
	 * @return list
	 * @throws FdlException
	 */
	public List<?> selectConstructionScheduleList(ConstructionScheduleVO constructionScheduleVO) throws FdlException{ 
		  return selectList("constructionSchedule.selectConstructionScheduleList", constructionScheduleVO); 
	}
	 
	
	/** 
	 * 공간정보활용 > 공사예정 정보 목록 조회 cnt
	 * @param ConstructionScheduleVO
	 * @return int
	 * @throws FdlException
	 */
	public int selectConstructionScheduleListCnt(ConstructionScheduleVO constructionScheduleVO) throws FdlException{ 
		return (Integer)selectOne("constructionSchedule.selectConstructionScheduleListCnt", constructionScheduleVO); 
	}
	
	/** 
	 * 공간정보활용 > 공사예정 상세 정보 목록 조회
	 * @param ConstructionScheduleVO
	 * @return list
	 * @throws FdlException
	 */
	public ConstructionSchedule selectConstructionScheduleNomal(ConstructionScheduleVO constructionScheduleVO) throws FdlException{ 
		  return (ConstructionSchedule) selectOne("constructionSchedule.selectConstructionScheduleNomal", constructionScheduleVO); 
	}
	
	/** 
	 * 공간정보활용 > 공사예정 차수 상세 정보 목록 조회
	 * @param ConstructionScheduleOrder
	 * @return list
	 * @throws FdlException
	 */
	public List<?> selectConstructionScheduleOrder(ConstructionScheduleOrder constructionScheduleOrder) throws FdlException{ 
		return  selectList("constructionSchedule.selectConstructionScheduleOrder", constructionScheduleOrder); 
	}
	
	/** 
	 * 공간정보활용 > 공사예정 기본정보 등록 처리
	 * @param ConstructionSchedule
	 * @return int
	 * @throws FdlException
	 */
	public int insertConstructionScheduleNomal(ConstructionSchedule constructionSchedule) throws FdlException{
		return insert("constructionSchedule.insertConstructionScheduleNomal",constructionSchedule);
	}
	/** 
	 * 공간정보활용 > 공사예정 기본정보 등록후 maxId 조회 처리
	 * @param ConstructionSchedule
	 * @return int
	 * @throws FdlException
	 */
	public int selectConstructionScheduleLastId(ConstructionSchedule constructionSchedule) throws FdlException{ 
		return (Integer)selectOne("constructionSchedule.selectConstructionScheduleLastId", constructionSchedule); 
	}
	
	
	/** 
	 * 공간정보활용 > 공사예정 정보 등록 > 공사예정 차수 정보 등록 처리
	 * @param ConstructionScheduleOrder
	 * @return int
	 * @throws FdlException
	 */
	public int insertConstructionScheduleOdr(ConstructionScheduleOrder constructionScheduleOrder) throws FdlException{
		return insert("constructionSchedule.insertConstructionScheduleOdr",constructionScheduleOrder);
	}
	
	/** 
	 * 공간정보활용 > 공사예정 삭제 처리
	 * @param ConstructionScheduleVO
	 * @return void
	 * @throws FdlException
	 */
	public int deleteConstructionSchedule(ConstructionScheduleVO constructionScheduleVO) throws FdlException{
		return delete("constructionSchedule.deleteConstructionSchedule",constructionScheduleVO);
	}
	
	/** 
	 * 공간정보활용 > 공사계획 삭제 처리
	 * @param ConstructionScheduleOrder
	 * @return void
	 * @throws FdlException
	 */
	public int deleteConstructionScheduleOdr(ConstructionScheduleOrder constructionScheduleOrder) throws FdlException{
		return delete("constructionSchedule.deleteConstructionScheduleOdr",constructionScheduleOrder);
	}
	
	
	/** 
	 * 공간정보활용 > 공사예정 수정 처리 (기본정보)
	 * @param ConstructionScheduleVO
	 * @return void
	 * @throws FdlException
	 */
	public void updateConstructionScheduleNomal(ConstructionScheduleVO constructionScheduleVO) throws FdlException{
		update("constructionSchedule.updateConstructionScheduleNomal",constructionScheduleVO);
		
	}
	
	/** 
	 * 공간정보활용 > 공사예정 수정 처리 (차수정보)
	 * @param ConstructionPlan
	 * @return void
	 * @throws FdlException
	 */
	public void updateConstructionScheduleOdr(ConstructionScheduleOrder constructionScheduleOrder) throws FdlException{
		update("constructionSchedule.updateConstructionScheduleOdr",constructionScheduleOrder);
		
	}
	
	/** 
	 * 공간정보활용 > 공사정보 조회 목록
	 * @param ConstructionScheduleVO
	 * @return list
	 * @throws FdlException
	 */
	public List<?> selectConstructionInquirySpaceList(ConstructionScheduleVO constructionScheduleVO) throws FdlException{ 
		  return selectList("constructionSchedule.selectConstructionInquirySpaceList", constructionScheduleVO); 
	}
	
	/** 
	 * 공간정보활용 > 공사예정 정보 목록 조회 cnt
	 * @param ConstructionScheduleVO
	 * @return int
	 * @throws FdlException
	 */
	public int selectConstructionInquirySpaceListCnt(ConstructionScheduleVO constructionScheduleVO) throws FdlException{ 
		return (Integer)selectOne("constructionSchedule.selectConstructionInquirySpaceListCnt", constructionScheduleVO); 
	}
	
	/** 
	 * 공간정보활용 > 공사예정 정보 등록 > 공사내역 상세정보 등록 처리
	 * @param ConstructionDtlsInfo
	 * @return int
	 * @throws FdlException
	 */
	public int insertConstructionDtlsInfo(ConstructionDtlsInfo constructionDtlsInfo) throws FdlException{
		return insert("constructionSchedule.insertConstructionDtlsInfo",constructionDtlsInfo);
	}
	
	/** 
	 * 공간정보활용 > 공사예정 정보 > 공사내역 상세정보 삭제 처리
	 * @param ConstructionDtlsInfo
	 * @return void
	 * @throws FdlException
	 */
	public int deleteConstructionDtlsInfo(ConstructionDtlsInfo constructionDtlsInfo) throws FdlException{
		return delete("constructionSchedule.deleteConstructionDtlsInfo",constructionDtlsInfo);
	}
	
	/** 
	 * 공간정보활용 > 공사예정정보 > 상세 공사내역 상세 리스트 조회
	 * @param constructionDtlsInfo
	 * @return list
	 * @throws FdlException
	 */
	public List<?> selectConstructionDtlsInfo(ConstructionDtlsInfo constructionDtlsInfo) throws FdlException{ 
		  return selectList("constructionSchedule.selectConstructionDtlsInfo", constructionDtlsInfo); 
	}
	
}
