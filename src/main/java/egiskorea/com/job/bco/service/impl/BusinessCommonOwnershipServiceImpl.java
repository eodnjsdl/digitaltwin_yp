package egiskorea.com.job.bco.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import egovframework.rte.fdl.cmmn.exception.FdlException;
import egiskorea.com.job.bco.service.BusinessCommonOwnershipService;
import egiskorea.com.job.bco.service.ConstructionPlan;
import egiskorea.com.job.bco.service.ConstructionPlanVO;
import egiskorea.com.job.bco.service.ConstructionSchedule;
import egiskorea.com.job.bco.service.ConstructionScheduleVO;
import egiskorea.com.job.bco.service.ConstructionScheduleOrder;

import egiskorea.com.job.bco.service.ConstructionScheduleOrder;
import egiskorea.com.job.bco.service.ConstructionDtlsInfo;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 사업공유 관리 serviceImpl 클래스
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
@Service("businessCommonOwnershipService")
public class BusinessCommonOwnershipServiceImpl extends EgovAbstractServiceImpl implements BusinessCommonOwnershipService{
	
	@Resource(name = "businessCommonOwnershipDAO")
	private BusinessCommonOwnershipDAO businessCommonOwnershipDAO;
	
	/** 
	 * 사업공유 관리 > 공사계획 정보 목록 조회
	 * @param ConstructionPlanVO
	 * @return Map<String, Object>
	 * @throws FdlException
	 */
	@Override public Map<String, Object> selectConstructionPlanList(ConstructionPlanVO constructionPlanVO) throws FdlException{
  
		// 공사계획 정보 목록 리스트 조회
		List<?> list = businessCommonOwnershipDAO.selectConstructionPlanList(constructionPlanVO);
  
		// 공사계획 정보 목록 리스트 조회 갯수 
		int cnt = businessCommonOwnershipDAO.selectConstructionPlanListCnt(constructionPlanVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
  
		return map; 
	}
	
	/** 
	 * 사업공유 관리 > 공사계획 상세 정보 목록 조회
	 * @param ConstructionPlanVO
	 * @return Map<String, Object>
	 * @throws FdlException
	 */	
	@Override public ConstructionPlan selectConstructionPlan(ConstructionPlanVO constructionPlanVO) throws FdlException{
  
		// 공사계획 상세 정보 목록 리스트 조회
		ConstructionPlan result = businessCommonOwnershipDAO.selectConstructionPlan(constructionPlanVO);
  
		return result; 
	}
	
	/** 
	 * 사업공유 관리 > 공사계획 수정 처리
	 * @param ConstructionPlan
	 * @return void
	 * @throws FdlException
	 */	
	@Override
	public void updateConstructionPlan(ConstructionPlan constructionPlan)throws FdlException{
		
		businessCommonOwnershipDAO.updateConstructionPlan(constructionPlan);
		  
	}
	
	/** 
	 * 사업공유 관리 > 공사계획 삭제 처리
	 * @param ConstructionPlan
	 * @return void
	 * @throws FdlException
	 */	
	@Override
	public void deleteConstructionPlan(ConstructionPlan constructionPlan)throws FdlException{
		
		businessCommonOwnershipDAO.deleteConstructionPlan(constructionPlan);
		  
	}
	
	/** 
	 * 사업공유 관리 > 공사계획 등록 처리
	 * @param ConstructionPlan
	 * @return int
	 * @throws FdlException
	 */	
	@Override
	public int insertConstructionPlan(ConstructionPlan constructionPlan)throws FdlException{
		return businessCommonOwnershipDAO.insertConstructionPlan(constructionPlan);
	}
	
	/************************************************ 공간정보활용 > 공사예정 정보  ***********************************************/
	
	/** 
	 * 사업공유 관리 > 공사예정 정보 목록 조회
	 * @param ConstructionScheduleVO
	 * @return Map<String, Object>
	 * @throws FdlException
	 */
	@Override public Map<String, Object> selectConstructionScheduleList(ConstructionScheduleVO constructionScheduleVO) throws FdlException{
  
		// 공사계획 정보 목록 리스트 조회
		List<?> list = businessCommonOwnershipDAO.selectConstructionScheduleList(constructionScheduleVO);
  
		// 공사계획 정보 목록 리스트 조회 갯수 
		int cnt = businessCommonOwnershipDAO.selectConstructionScheduleListCnt(constructionScheduleVO);
  
		Map<String, Object> map = new HashMap<String, Object>();
  
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
  
		return map; 
	}
	
	/** 
	 * 사업공유 관리 > 공사예정 상세 정보 목록 조회(기본정보 조회)
	 * @param ConstructionScheduleVO
	 * @return Map<String, Object>
	 * @throws FdlException
	 */	
	@Override public ConstructionSchedule selectConstructionScheduleNomal(ConstructionScheduleVO constructionScheduleVO) throws FdlException{
  
		// 공사예정 상세 정보 목록 리스트 조회
		ConstructionSchedule result = businessCommonOwnershipDAO.selectConstructionScheduleNomal(constructionScheduleVO);
  
		return result; 
	}
	
	/** 
	 * 사업공유 관리 > 공사예정 차수 상세 정보 목록 조회
	 * @param ConstructionScheduleOrder
	 * @return Map<String, Object>
	 * @throws FdlException
	 */	
	@Override public Map<String, Object> selectConstructionScheduleOrder(ConstructionScheduleOrder constructionScheduleOrder) throws FdlException{
		
		// 공사예정 상세 정보 목록 리스트 조회
		List<?> list = businessCommonOwnershipDAO.selectConstructionScheduleOrder(constructionScheduleOrder);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultList", list);
		map.put("oderInfo", ((ConstructionScheduleOrder) list.get(0)));
		map.put("codeId", ((ConstructionScheduleOrder) list.get(0)).getCntrkDtls());
		
		return map; 
	}
	
	/** 
	 * 사업공유 관리 > 공사예정 차수 상세 정보 목록 조회2
	 * @param ConstructionScheduleVO, ConstructionScheduleOrder
	 * @return Map<String, Object>
	 * @throws FdlException
	 */	
	@Override public Map<String, Object> selectConstructionScheduleOrder2(ConstructionScheduleVO constructionScheduleVO, ConstructionScheduleOrder constructionScheduleOrder) throws FdlException{
		
		// 공사예정 상세 정보 목록 리스트 조회
		ConstructionSchedule nomalList = businessCommonOwnershipDAO.selectConstructionScheduleNomal(constructionScheduleVO);
				
		// 공사예정 상세 정보 목록 차수 리스트 조회
		List<?> orderList = businessCommonOwnershipDAO.selectConstructionScheduleOrder(constructionScheduleOrder);
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("nomalList", nomalList);
		if(!orderList.isEmpty()) {
			map.put("orderInfo", orderList.get(0));
			map.put("orderCntrkDtls", ((ConstructionScheduleOrder) orderList.get(0)).getCntrkDtls());
			
		}else {
			map.put("orderInfo", "");
			map.put("orderCntrkDtls", "");
		}		
		map.put("orderList", orderList);
		
		return map; 
	}
	
	
	/** 
	 * 사업공유 관리 > 공사예정 정보 기본정보 등록 처리
	 * @param ConstructionSchedule
	 * @return Map<String, Object>(등록된 pk ID 반환)
	 * @throws FdlException
	 */	
	@Override public Map<String, Object> insertConstructionScheduleNomal(ConstructionSchedule constructionSchedule) throws FdlException{
		
		businessCommonOwnershipDAO.insertConstructionScheduleNomal(constructionSchedule);
		
		// 공사예정 기본정보 MaxID 조회
		int maxId = businessCommonOwnershipDAO.selectConstructionScheduleLastId(constructionSchedule);
  
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultMaxId", Integer.toString(maxId));
		return map; 
	}
	
	/** 
	 * 사업공유 관리 > 공사예정 정보 > 등록하기 > 차수정보 등록 처리
	 * @param ConstructionScheduleOrder
	 * @return int
	 * @throws FdlException
	 */	
	@Override
	public int insertConstructionScheduleOdr(ConstructionScheduleOrder constructionScheduleOrder)throws FdlException{
		return businessCommonOwnershipDAO.insertConstructionScheduleOdr(constructionScheduleOrder);
	}
	/** 
	 * 공사예정 정보 > 공사예정 상세페이지 > 차수정보 삭제
	 * @param ConstructionScheduleVO
	 * @return void
	 * @throws FdlException
	 */	
	@Override
	public int deleteConstructionSchedule(ConstructionScheduleVO constructionScheduleVO)throws FdlException{
		return businessCommonOwnershipDAO.deleteConstructionSchedule(constructionScheduleVO);
	}
	
	/** 
	 * 공사예정 정보 > 공사예정 상세페이지 > 차수정보 삭제
	 * @param ConstructionScheduleOrder
	 * @return void
	 * @throws FdlException
	 */	
	@Override
	public int deleteConstructionScheduleOdr(ConstructionScheduleOrder constructionScheduleOrder)throws FdlException{
		return businessCommonOwnershipDAO.deleteConstructionScheduleOdr(constructionScheduleOrder);
	}
	
	/** 
	 * 사업공유 관리 > 공사계획 수정 처리
	 * @param ConstructionScheduleVO
	 * @return void
	 * @throws FdlException
	 */	
	@Override
	public void updateConstructionScheduleNomal(ConstructionScheduleVO constructionScheduleVO)throws FdlException{
		
		businessCommonOwnershipDAO.updateConstructionScheduleNomal(constructionScheduleVO);
		  
	}
	
	/** 
	 * 사업공유 관리 > 공사계획 수정 처리
	 * @param ConstructionScheduleOrder
	 * @return void
	 * @throws FdlException
	 */	
	@Override
	public void updateConstructionScheduleOdr(ConstructionScheduleOrder constructionScheduleOrder)throws FdlException{
		
		businessCommonOwnershipDAO.updateConstructionScheduleOdr(constructionScheduleOrder);
		  
	}
	
	/** 
	 * 사업공유 관리 > 공사정보조회 목록
	 * @param constructionScheduleVO
	 * @return Map<String, Object>
	 * @throws FdlException
	 */
	@Override public Map<String, Object> selectConstructionInquirySpaceList(ConstructionScheduleVO constructionScheduleVO) throws FdlException{
  
		// 공사계획 정보 목록 리스트 조회
   		List<?> list = businessCommonOwnershipDAO.selectConstructionInquirySpaceList(constructionScheduleVO);
  
		// 공사계획 정보 목록 리스트 조회 갯수 
		int cnt = businessCommonOwnershipDAO.selectConstructionInquirySpaceListCnt(constructionScheduleVO);
  
		Map<String, Object> map = new HashMap<String, Object>();
  
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
  
		return map; 
	}
	
	/** 
	 * 사업공유 관리 > 공사예정 정보 > 등록하기 > 공사내역 상세 등록 처리
	 * @param ConstructionDtlsInfo
	 * @return int
	 * @throws FdlException
	 */	
	@Override
	public int insertConstructionDtlsInfo(ConstructionDtlsInfo constructionDtlsInfo)throws FdlException{
		return businessCommonOwnershipDAO.insertConstructionDtlsInfo(constructionDtlsInfo);
	}
	
	/** 
	 * 공사예정 정보 > 공사예정 정보 > 등록하기 > 공사내역 상세 삭제 처리
	 * @param ConstructionScheduleVO
	 * @return void
	 * @throws FdlException
	 */	
	@Override
	public int deleteConstructionDtlsInfo(ConstructionDtlsInfo constructionDtlsInfo)throws FdlException{
		return businessCommonOwnershipDAO.deleteConstructionDtlsInfo(constructionDtlsInfo);
	}
	
	/** 
	 * 사업공유 관리 > 공사예정 정보 > 상세조회 공사내역 상세 리스트 조회
	 * @param constructionDtlsInfo
	 * @return Map<String, Object>(등록된 pk ID 반환)
	 * @throws FdlException
	 */	
	@Override public Map<String, Object> selectConstructionDtlsInfo(ConstructionDtlsInfo constructionDtlsInfo) throws FdlException{
		
		// 공사계획 정보 목록 리스트 조회
   		List<?> list = businessCommonOwnershipDAO.selectConstructionDtlsInfo(constructionDtlsInfo);
   		Map<String, Object> map = new HashMap<String, Object>();
  
		map.put("resultList", list);
		return map; 
	}
	
}	
