package egiskorea.com.geo.emi.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.geo.emi.service.AdministrationZone;
import egiskorea.com.geo.emi.service.ExaminationInfo;
import egiskorea.com.geo.emi.service.ExaminationInfoVO;
import egiskorea.com.geo.emi.service.LandCategoryInfo;
import egovframework.rte.fdl.cmmn.exception.FdlException;

/**
 * @Description 조사정보를 관리하는 dao 클래스
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
 *  2021.11.09   이상화           최초 생성
 *  </pre>
 */

@Repository("examinationInfoDAO")
public class ExaminationInfoDAO extends ComAbstractDAO {
	
	/**
	 * @Description 행정구역별 조사정보 목록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @return list
	 */
	public List<?> selectAdministrationZoneList(ExaminationInfoVO examinationInfoVO) {
		return selectList("examinationInfo.selectAdministrationZoneList", examinationInfoVO);
	}
	
	/**
	 * @Description 행정구역별 조사정보 목록 cnt
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @return int
	 */
	public int selectAdministrationZoneListCnt(ExaminationInfoVO examinationInfoVO) {
		return (Integer)selectOne("examinationInfo.selectAdministrationZoneListCnt", examinationInfoVO);
	}
	
	/**
	 * @Description 행정구역별 조사정보 상세조회
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param administrationZone
	 * @return list
	 */
	public AdministrationZone selectAdministrationZone(AdministrationZone administrationZone) throws FdlException{
		return selectOne("examinationInfo.selectAdministrationZone", administrationZone);
	}
	
	/**
	 * @Description 행정구역별 조사정보 등록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param administrationZone
	 * @return list
	 */
	public void insertAdministrationZone(AdministrationZone administrationZone) throws FdlException{
		insert("examinationInfo.insertAdministrationZone",administrationZone);
	}
	
	/**
	 * @Description 행정구역별 조사정보 수정
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param administrationZone
	 * @return list
	 */
	public void updateAdministrationZone(AdministrationZone administrationZone) throws FdlException{
		update("examinationInfo.updateAdministrationZone",administrationZone);
	}
	
	/**
	 * @Description 행정구역별 조사정보 삭제
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param administrationZone
	 * @return list
	 */
	public void deleteAdministrationZone(AdministrationZone administrationZone) throws FdlException{
		delete("examinationInfo.deleteAdministrationZone",administrationZone);
	}
	
	/**
	 * @Description 조사정보 목록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @return list
	 */
	public List<LandCategoryInfo> selectExaminationInfoList(ExaminationInfoVO examinationInfoVO) {
		return selectList("examinationInfo.selectExaminationInfoList", examinationInfoVO);
	}
	
	/**
	 * @Description 조사정보 목록 cnt
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @return int
	 */
	public int selectExaminationInfoListCnt(ExaminationInfoVO examinationInfoVO) {
		return (Integer)selectOne("examinationInfo.selectExaminationInfoListCnt", examinationInfoVO);
	}
	
	/**
	 * @Description 조사정보 상세조회
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @return examinationInfo
	 * @throws Exception
	 */
	public ExaminationInfo selectExaminationInfo(ExaminationInfoVO examinationInfoVO) {
		return selectOne("examinationInfo.selectExaminationInfo", examinationInfoVO);
	}
	
	/**
	 * @Description 수정화면 조사정보 상세조회
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.13
	 * @param examinationInfoVO
	 * @return examinationInfo
	 * @throws Exception
	 */
	public ExaminationInfo updateExaminationInfoView(ExaminationInfoVO examinationInfoVO) {
		return selectOne("examinationInfo.updateExaminationInfoView", examinationInfoVO);
	}
	
	/**
	 * @Description 조사정보 수정
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.13
	 * @param examinationInfoVO
	 * @throws FdlException
	 */
	public void updateExaminationInfo(ExaminationInfo examinationInfo) throws FdlException{
		update("examinationInfo.updateLandCategoryInfo",examinationInfo);
		update("examinationInfo.updateCommonInfo",examinationInfo);
		update("examinationInfo.updateLandCharacter",examinationInfo);
		update("examinationInfo.updateHouseCharacter",examinationInfo);
		update("examinationInfo.updateLandCover",examinationInfo);
	}
	
	/**
	 * @Description 조사정보 삭제
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.11
	 * @param examinationInfoVO
	 * @throws FdlException
	 */
	public void deleteExaminationInfo(ExaminationInfoVO examinationInfoVO) throws FdlException{
		delete("examinationInfo.deleteExaminationInfo",examinationInfoVO);
	}
	
	/**
	 * @Description 엑셀 다운로드를 위한 조사정보 목록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.11
	 * @param examinationInfoVO
	 * @return list
	 */
	public List<?> selectExaminationInfoExcelList(ExaminationInfoVO examinationInfoVO) {
		return selectList("examinationInfo.selectExaminationInfoExcelList", examinationInfoVO);
	}
}
