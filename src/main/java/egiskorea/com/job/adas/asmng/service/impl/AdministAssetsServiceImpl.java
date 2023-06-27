package egiskorea.com.job.adas.asmng.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import egiskorea.com.job.adas.asmng.service.AdministAssetsService;
import egiskorea.com.job.adas.asmng.service.AdministAssetsVO;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 행정자산관리 serviceImpl 클래스
 * @since 2023.05.24
 * @version 1.0
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.24   백승석            최초 생성
 *  </pre>
 */

@Service("administAssetsService")
public class AdministAssetsServiceImpl extends EgovAbstractServiceImpl implements AdministAssetsService {

	@Resource(name = "administAssetsDAO")
	private AdministAssetsDAO administAssetsDAO;
	
	/** 전자정부 파일 관리 Service */
	@Resource(name = "EgovFileMngService")
    private EgovFileMngService egovFileMngService;

	/** 파일 업로드 Util */
    @Resource(name="EgovFileMngUtil")
    private EgovFileMngUtil fileUtil;

	@Override
	public List<AdministAssetsVO> selectAdministAssetsInfoList(AdministAssetsVO administAssetsVO) {
		List<AdministAssetsVO> result = null;
		
		int pageNo = 0;
		pageNo = administAssetsVO.getPageNo();
		if (pageNo != 0) {
			pageNo *= 10;
		}
		administAssetsVO.setPageNo(pageNo);
		
		result = administAssetsDAO.selectAdministAssetsInfoList(administAssetsVO);
		
		return result;
	}

	@Override
	public int selectAdministAssetsTotCnt() {
		int count = 0;
		
		count = administAssetsDAO.selectAdministAssetsTotCnt();

		return count;
	}

	@Override
	public List<String> selectAdministAssetsYearList() {
		List<String> list = null;
		
		list = administAssetsDAO.selectAdministAssetsYearList();
		
		return list;
	}

	@Override
	@Transactional
	public int insertAdministAssetsInfoByCSV(List<AdministAssetsVO> administAssetsList) {
		int result = 0;
		
		result = administAssetsDAO.insertAdministAssetsInfoByCSV(administAssetsList);
		
		return result;
	}
//	@Override
//	@Transactional
//	public int insertAdministAssetsInfoByCSV(AdministAssetsVO administAssetsVO) {
//		int result = 0;
//		
//		result = administAssetsDAO.insertAdministAssetsInfoByCSV(administAssetsVO);
//		
//		return result;
//	}

	@Override
	@Transactional
	public int deleteAdministAssetsInfo(AdministAssetsVO administAssetsVO) throws SQLException, Exception {
		int result = 0;
		
		result = administAssetsDAO.deleteAdministAssetsInfo(administAssetsVO);
		
		return result;
	}

	@Override
	public List<AdministAssetsVO> csvUploadHelper(MultipartFile mpFile, String year) throws FileNotFoundException, SQLException, Exception {
//	public int csvUploadHelper(MultipartFile mpFile, String year) throws FileNotFoundException, SQLException, Exception {
		List<AdministAssetsVO> resultList = new ArrayList<>();
		
//		int result = 0;
		
		File file = multipartFileToFile(mpFile);
		
		FileInputStream csvFile = new FileInputStream(file);
		InputStreamReader formattedFile = new InputStreamReader(csvFile, "EUC-KR");
		BufferedReader reader = new BufferedReader(formattedFile);
		
		String str = "";
//		int count = 0;
		
		reader.readLine(); // 컬럼 줄 읽기
		while((str = reader.readLine()) != null) {
			resultList.add(parser(str, year));
			// 1000개씩 insert
//			count++;
//			if (count % 1000 == 0) {
//				insertAdministAssetsInfoByCSV(resultList);
//				resultList = new ArrayList<AdministAssetsVO>();
//			}
//			result += insertAdministAssetsInfoByCSV(parser(str, year));
		}
		reader.close();
		
		return resultList;
//		return result;
	}
	
	public File multipartFileToFile(MultipartFile mpFile) throws IOException {
		File file = new File(mpFile.getOriginalFilename());
		mpFile.transferTo(file);
		return file;
	}
	
	public AdministAssetsVO parser(String str, String year) {
		AdministAssetsVO administAssetsVO = new AdministAssetsVO();
		
		String[] splitted = str.split(",");
		
		administAssetsVO.setArray(splitted);
		administAssetsVO.setYear(year);
		
		return administAssetsVO;
	}

}
