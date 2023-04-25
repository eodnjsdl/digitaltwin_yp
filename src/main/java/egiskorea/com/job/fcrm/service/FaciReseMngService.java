package egiskorea.com.job.fcrm.service;

import java.util.List;
import java.util.Map;
import egovframework.rte.fdl.cmmn.exception.FdlException;

/**
 * @Description 시설예약관리 service 
 * @author  플랫폼개발부문 DT플랫폼 이푸름
 * @since 2022.01.27
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.27		이푸름	최초 생성
 *  2022.02.11		전영후	2차  작성
 *  </pre>
 */

public interface FaciReseMngService {
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리  목록 조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectFaciReseMngList(FaciReseMngVO faciReseMngVO) throws Exception;
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리  목록 갯수
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public int selectFaciReseMngListCnt(FaciReseMngVO faciReseMngVO) throws Exception;
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리  상세조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public FaciReseMng selectFaciReseMng(FaciReseMngVO faciReseMngVO) throws Exception;
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 시설조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectFacilPhstrnList(FaciReseMngVO faciReseMngVO) throws Exception;
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 시설보조명조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectFacilAsstnList(FaciReseMngVO faciReseMngVO) throws Exception;
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 시설상세정보조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectFacilAsstnDtlList(FaciReseMngVO faciReseMngVO) throws Exception;
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 등록
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	public int insertFaciReseMng(FaciReseMng faciReseMng) throws Exception;
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 수정
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	public int updateFaciReseMng(FaciReseMng faciReseMng) throws Exception;	
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 단일삭제
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	public int deleteFaciReseMng(FaciReseMng faciReseMng) throws Exception;
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 등록용 중복체크
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	public int dubCheckFaciReseMngRegist(FaciReseMngVO faciReseMngVO) throws Exception;
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 수정용 중복체크
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	public int dubCheckFaciReseMngUpdate(FaciReseMngVO faciReseMngVO) throws Exception;

	public int dubCheckFaciReseMngUpdate2(FaciReseMngChkVO faciReseMngChkVO) throws Exception;
	
}
