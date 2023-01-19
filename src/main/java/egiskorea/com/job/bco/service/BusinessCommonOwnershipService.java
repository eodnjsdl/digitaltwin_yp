package egiskorea.com.job.bco.service;

import egovframework.rte.fdl.cmmn.exception.FdlException;
import java.util.Map;

/**
 * @Description 사업공유 관리 하는 service 클래스
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
 *  2021.12.30   정재환           최초 생성
 *  </pre>
 */

public interface BusinessCommonOwnershipService {
	
	/**
	 * @Description : 사업공유관리 > 공사계획 정보 목록 조회
	 * @Author egis
	 * @Date 2022.01.11
	 * @param constructionPlanVO
	 * @return Map
	 * @throws FdlException
	 */
	public Map<String, Object> selectConstructionPlanList(ConstructionPlanVO constructionPlanVO) throws FdlException;
	
	/**
	 * @Description : 사업공유관리 > 공사계획 정보 상세 목록 조회
	 * @Author egis
	 * @Date 2022.01.11
	 * @param constructionPlanVO
	 * @return ConstructionPlan
	 * @throws FdlException
	 */
	public ConstructionPlan selectConstructionPlan(ConstructionPlanVO constructionPlanVO) throws FdlException;

	/**
	 * @Description : 사업공유관리 > 공사계획 정보 수정 처리
	 * @Author egis
	 * @Date 2022.01.18
	 * @param ConstructionPlan
	 * @return int
	 * @throws FdlException
	 */
	public void updateConstructionPlan(ConstructionPlan constructionPlan) throws FdlException;
	
	/**
	 * @Description : 사업공유관리 > 공사계획 정보 삭제 처리
	 * @Author egis
	 * @Date 2022.01.18
	 * @param ConstructionPlan
	 * @return void
	 * @throws FdlException
	 */
	public void deleteConstructionPlan(ConstructionPlan constructionPlan) throws FdlException;
	
	/**
	 * @Description : 사업공유관리 > 공사계획 정보 등록 처리
	 * @Author egis
	 * @Date 2022.01.19
	 * @param ConstructionPlan
	 * @return int
	 * @throws FdlException
	 */
	public int insertConstructionPlan(ConstructionPlan constructionPlan) throws FdlException;
	
	/*****************************************************************************************************************/
	/** 사업공유 > 공사 예정 정보 **/
	/**
	 * @Description : 사업공유관리 > 공사예정 정보  조회
	 * @Author egis
	 * @Date 2022.01.24
	 * @param constructionPlanVO
	 * @return Map
	 * @throws FdlException
	 */
	public Map<String, Object> selectConstructionScheduleList(ConstructionScheduleVO constructionScheduleVO) throws FdlException;
	
	/**
	 * @Description : 사업공유관리 > 공사예정 정보 상세 목록 조회(기본정보 조회)
	 * @Author egis
	 * @Date 2022.01.25
	 * @param constructionScheduleVO
	 * @return ConstructionSchedule
	 * @throws FdlException
	 */
	public ConstructionSchedule selectConstructionScheduleNomal(ConstructionScheduleVO constructionScheduleVO) throws FdlException;
	
	/**
	 * @Description : 사업공유관리 > 공사예정 정보 차수 상세 목록 조회
	 * @Author egis
	 * @Date 2022.01.25
	 * @param constructionScheduleOrder
	 * @return Map
	 * @throws FdlException
	 */
	public Map<String, Object> selectConstructionScheduleOrder(ConstructionScheduleOrder constructionScheduleOrder) throws FdlException;
	
	/**
	 * @Description : 사업공유관리 > 공사예정 정보 차수 상세 목록 조회2
	 * @Author egis
	 * @Date 2022.02.16
	 * @param constructionScheduleOrder
	 * @return Map
	 * @throws FdlException
	 */
	public Map<String, Object> selectConstructionScheduleOrder2(ConstructionScheduleVO constructionScheduleVO, ConstructionScheduleOrder constructionScheduleOrder) throws FdlException;
	
	
	/**
	 * @Description : 사업공유관리 > 공사예정정보 등록 > 기본정보 등록, 기본정보 key조회 처리
	 * @Author egis
	 * @Date 2022.02.16
	 * @param constructionSchedule
	 * @return Map
	 * @throws FdlException
	 */
	public Map<String, Object> insertConstructionScheduleNomal(ConstructionSchedule constructionSchedule) throws FdlException;
	
	
	/**
	 * @Description : 사업공유관리 > 공사예정정보 등록 > 차수정보 등록 처리
	 * @Author egis
	 * @Date 2022.02.17
	 * @param ConstructionScheduleOrder
	 * @return int
	 * @throws FdlException
	 */
	public int insertConstructionScheduleOdr(ConstructionScheduleOrder constructionScheduleOrder) throws FdlException;
	
	/**
	 * @Description : 공사예정 정보 > 공사예정 상세페이지 > 공사예정 정보 삭제
	 * @Author egis
	 * @Date 2022.02.24
	 * @param ConstructionScheduleVO
	 * @return int
	 * @throws FdlException
	 */
	public int deleteConstructionSchedule(ConstructionScheduleVO constructionScheduleVO) throws FdlException;
	
	/**
	 * @Description : 공사예정 정보 > 공사예정 상세페이지 > 차수정보 삭제
	 * @Author egis
	 * @Date 2022.02.22
	 * @param ConstructionScheduleOrder
	 * @return int
	 * @throws FdlException
	 */
	public int deleteConstructionScheduleOdr(ConstructionScheduleOrder constructionScheduleOrder) throws FdlException;
	
	/**
	 * @Description : 공사예정 정보 > 공사예정 수정 처리(기본정보)
	 * @Author egis
	 * @Date 2022.02.22
	 * @param ConstructionScheduleVO
	 * @return void
	 * @throws FdlException
	 */
	public void updateConstructionScheduleNomal(ConstructionScheduleVO constructionScheduleVO) throws FdlException;
	
	/**
	 * @Description : 공사예정 정보 > 공사예정 수정 처리(차수정보)
	 * @Author egis
	 * @Date 2022.02.25
	 * @param ConstructionScheduleVO
	 * @return void
	 * @throws FdlException
	 */
	public void updateConstructionScheduleOdr(ConstructionScheduleOrder constructionScheduleOrder) throws FdlException;
	
	/** 사업공유 > 공사 예정 정보 **/
	/**
	 * @Description : 사업공유관리 > 공사예정 정보  조회
	 * @Author egis
	 * @Date 2022.01.24
	 * @param constructionPlanVO
	 * @return Map
	 * @throws FdlException
	 */
	public Map<String, Object> selectConstructionInquirySpaceList(ConstructionScheduleVO constructionScheduleVO) throws FdlException;
	
	/**
	 * @Description : 사업공유관리 > 공사예정정보 등록 > 공사내역 상세 등록 처리
	 * @Author egis
	 * @Date 2022.03.23
	 * @param ConstructionDtlsInfo
	 * @return int
	 * @throws FdlException
	 */
	public int insertConstructionDtlsInfo(ConstructionDtlsInfo constructionDtlsInfo) throws FdlException;
	
	/**
	 * @Description : 공사예정 정보 > 공사예정정보 등록 > 공사내역 상세 삭제 처리
	 * @Author egis
	 * @Date 2022.03.23
	 * @param ConstructionDtlsInfo
	 * @return int
	 * @throws FdlException
	 */
	public int deleteConstructionDtlsInfo(ConstructionDtlsInfo constructionDtlsInfo) throws FdlException;
	
	/**
	 * @Description : 사업공유관리 > 공사예정정보  > 상세조회(공사내역 상세 리스트 조회)
	 * @Author egis
	 * @Date 2022.03.23
	 * @param constructionDtlsInfo
	 * @return Map
	 * @throws FdlException
	 */
	public Map<String, Object> selectConstructionDtlsInfo(ConstructionDtlsInfo constructionDtlsInfo) throws FdlException;
	
}
