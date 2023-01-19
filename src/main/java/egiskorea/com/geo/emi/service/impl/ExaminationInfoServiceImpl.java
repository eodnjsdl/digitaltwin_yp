package egiskorea.com.geo.emi.service.impl;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import egiskorea.com.geo.emi.service.AdministrationZone;
import egiskorea.com.geo.emi.service.ExaminationInfo;
import egiskorea.com.geo.emi.service.ExaminationInfoService;
import egiskorea.com.geo.emi.service.ExaminationInfoVO;
import egiskorea.com.geo.emi.service.LandCategoryInfo;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.cmmn.exception.FdlException;
import egovframework.rte.fdl.excel.EgovExcelService;

/**
 * @Description 조사정보를 관리하는 serviceImpl 클래스
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
 *  2021.11.09		이상화	최초 생성
 *  </pre>
 */

@Service("examinationInfoService")
public class ExaminationInfoServiceImpl extends EgovAbstractServiceImpl implements ExaminationInfoService{
	
	@Resource(name="examinationInfoDAO")
	private ExaminationInfoDAO examinationInfoDAO;
	
	@Resource(name = "excelExaminationInfoService")
    private EgovExcelService excelExaminationInfoService;
	
	/**
	 * @Description 행정구역별 조사정보 목록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @return Map<String, Object>
	 */
	public Map<String, Object> selectAdministrationZoneList(ExaminationInfoVO examinationInfoVO){
		List<?> list = examinationInfoDAO.selectAdministrationZoneList(examinationInfoVO);
		
		int cnt = examinationInfoDAO.selectAdministrationZoneListCnt(examinationInfoVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}
	
	/**
	 * @Description 조사정보 등록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param file, extension
	 * @throws Exception
	 */
	public void excelExaminationInfoUpload(InputStream file, String extension) throws Exception{
		if(extension.equals("xls")) {
			excelExaminationInfoService.uploadExcel("examinationInfo.excelExaminationInfoUpload", file, 5, 5000);			
		}else if(extension.equals("xlsx")) {
			XSSFWorkbook wb = new XSSFWorkbook(file);
			excelExaminationInfoService.uploadExcel("examinationInfo.excelExaminationInfoUpload", file, 5, 5000, wb);
		}else if(extension.equals("csv")) {
			
		}
	}
	
	/**
	 * @Description 행정구역별 조사정보 등록/수정
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param administrationZone
	 * @throws FdlException
	 */
	public void insertAdministrationZone(AdministrationZone administrationZone) throws FdlException{
		AdministrationZone vo = examinationInfoDAO.selectAdministrationZone(administrationZone);
		if(vo == null) {
			examinationInfoDAO.insertAdministrationZone(administrationZone);
		}else {
			examinationInfoDAO.updateAdministrationZone(vo);			
		}
	}
	
	/**
	 * @Description 행정구역별 조사정보 삭제
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param administrationZone
	 * @throws FdlException
	 */
	public void deleteAdministrationZone(AdministrationZone administrationZone) throws FdlException{
		AdministrationZone vo = examinationInfoDAO.selectAdministrationZone(administrationZone);
		examinationInfoDAO.deleteAdministrationZone(vo);
	}
	
	/**
	 * @Description 조사정보 목록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @return Map<String, Object>
	 */
	public Map<String, Object> selectExaminationInfoList(ExaminationInfoVO examinationInfoVO){
		List<LandCategoryInfo> list = examinationInfoDAO.selectExaminationInfoList(examinationInfoVO);		
		
		if(list != null) {
			for(int i = 0; i < list.size(); i++) {			
				list.get(i).setAddr(getAddrAssociationByPnu(list.get(i).getPnu(), list.get(i).getAddr()));
			}
		}
		
		int cnt = examinationInfoDAO.selectExaminationInfoListCnt(examinationInfoVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}
	
	/**
	 * @Description 조사정보 상세조회
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param examinationInfoVO
	 * @return examinationInfo
	 * @throws Exception
	 */
	public ExaminationInfo selectExaminationInfo(ExaminationInfoVO examinationInfoVO) {
		
		ExaminationInfo result = examinationInfoDAO.selectExaminationInfo(examinationInfoVO); 
		
		if(result != null) { 			
			result.setAddr(getAddrAssociationByPnu(result.getPnu(), result.getAddr()));
		}
		
		return result;
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
		
		ExaminationInfo result = examinationInfoDAO.updateExaminationInfoView(examinationInfoVO); 
		
		if(result != null) { 			
			result.setAddr(getAddrAssociationByPnu(result.getPnu(), result.getAddr()));
		}
		
		return result;
	}	
	
	/**
	 * @Description 조사정보 수정
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.13
	 * @param examinationInfoVO
	 * @throws FdlException
	 */
	public void updateExaminationInfo(ExaminationInfo examinationInfo) throws FdlException{
		examinationInfoDAO.updateExaminationInfo(examinationInfo); 
	}
	
	/**
	 * @Description 조사정보 삭제
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.11
	 * @param examinationInfoVO
	 * @throws FdlException
	 */
	public void deleteExaminationInfo(ExaminationInfoVO examinationInfoVO) throws FdlException{
		examinationInfoDAO.deleteExaminationInfo(examinationInfoVO); 
	}
	
	/**
	 * @Description 엑셀 다운로드를 위한 조사정보 목록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.11
	 * @param examinationInfoVO
	 * @return Map<String, Object>
	 */
	public Map<String, Object> selectExaminationInfoExcelList(ExaminationInfoVO examinationInfoVO){
		List<?> list = examinationInfoDAO.selectExaminationInfoExcelList(examinationInfoVO);		
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		
		return map;
	}
	
	/**
	 * @Description 주소와 pnu 정보 조합으로 주소 가공
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param addr
	 * @param pnu
	 * @return addr
	 */
	private String getAddrAssociationByPnu(String pnu, String addr) {
		
		addr = addr + " " + StringUtils.stripStart(pnu.substring(11,15), "0");
		
		if(!pnu.substring(15,19).equals("0000")) {
			addr += "-" + StringUtils.stripStart(pnu.substring(15,19), "0");
		}
		
		return addr;
	}
}
