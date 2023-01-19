package egiskorea.com.geo.emi.service;

import java.io.InputStream;
import java.util.Map;

import egovframework.rte.fdl.cmmn.exception.FdlException;

/**
 * @Description 조사정보를 관리하는 service 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.11.09
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.11.09   	이상화	최초 생성
 *  </pre>
 */

public interface ExaminationInfoService {
	
	/**
	 * @Description 행정구역별 조사정보 목록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @return Map<String, Object>
	 */
	public Map<String, Object> selectAdministrationZoneList(ExaminationInfoVO examinationInfoVO);
	
	/**
	 * @Description 조사정보 등록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param file, extension
	 * @throws Exception
	 */
	public void excelExaminationInfoUpload(InputStream file, String extension) throws Exception;
	
	/**
	 * @Description 행정구역별 조사정보 등록/수정
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param administrationZone
	 * @throws FdlException
	 */
	public void insertAdministrationZone(AdministrationZone administrationZone) throws FdlException;
	
	/**
	 * @Description 행정구역별 조사정보 삭제
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param administrationZone
	 * @throws FdlException
	 */
	public void deleteAdministrationZone(AdministrationZone administrationZone) throws FdlException;	
	
	/**
	 * @Description 조사정보 목록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @return Map<String, Object>
	 */
	public Map<String, Object> selectExaminationInfoList(ExaminationInfoVO examinationInfoVO);
	
	/**
	 * @Description 조사정보 상세조회
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @return examinationInfo
	 */
	public ExaminationInfo selectExaminationInfo(ExaminationInfoVO examinationInfoVO);
	
	/**
	 * @Description 수정화면 조사정보 상세조회
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.13
	 * @param examinationInfoVO
	 * @return examinationInfo
	 */
	public ExaminationInfo updateExaminationInfoView(ExaminationInfoVO examinationInfoVO);
	
	/**
	 * @Description 조사정보 수정
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.13
	 * @param examinationInfoVO
	 * @throws FdlException
	 */
	public void updateExaminationInfo(ExaminationInfo examinationInfo) throws FdlException;
	
	/**
	 * @Description 조사정보 삭제
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.11
	 * @param examinationInfoVO
	 * @throws FdlException
	 */
	public void deleteExaminationInfo(ExaminationInfoVO examinationInfoVO) throws FdlException;
	
	/**
	 * @Description 엑셀 다운로드를 위한 조사정보 목록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.11
	 * @param examinationInfoVO
	 * @return Map<String, Object>
	 */
	public Map<String, Object> selectExaminationInfoExcelList(ExaminationInfoVO examinationInfoVO);
}
