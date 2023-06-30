package egiskorea.com.job.adas.asmng.service;

import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import egiskorea.com.job.adas.publnd.service.PbprtAccdtVO;

/**
 * @Description 행정자산관리 service 클래스
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

public interface AdministAssetsService {
	
	/**
	 * 행정자산관리 조회
	 * @param administAssetsVO
	 * @return
	 */
	public List<AdministAssetsVO> selectAdministAssetsInfoList(AdministAssetsVO administAssetsVO);
	
	/**
	 * 행정자산관리 전체 개수 조회
	 * @return
	 */
	public int selectAdministAssetsTotCnt(AdministAssetsVO administAssetsVO);
	
	/**
	 * 행정자산관리 연도 목록 조회
	 * @return
	 */
	public List<String> selectAdministAssetsYearList();
	
	/**
	 * 행정자산관리 CSV 업로드
	 * @param administAssetsList
	 * @return
	 */
	public int insertAdministAssetsInfoByCSV(List<AdministAssetsVO> administAssetsList);
	
	/**
	 * CSV 업로드 가공
	 * @param file
	 * @param year
	 * @return
	 * @throws FileNotFoundException
	 * @throws SQLException
	 * @throws Exception
	 */
	public List<AdministAssetsVO> csvUploadHelper(MultipartFile file, String year) throws FileNotFoundException, SQLException, Exception;
	
	/**
	 * 행정자산관리 덮어쓰기용 삭제
	 * @return
	 */
	public int deleteAdministAssetsInfo(AdministAssetsVO administAssetsVO) throws SQLException, Exception;
	
	/**
	 * 행정행정자산관리 -> 공유재산 실태조사 내보내기
	 * @param pbprtAccdtVO
	 * @return
	 * @throws Exception
	 */
	public int insertPublndToPbprtAccdt(List<PbprtAccdtVO> pbprtAccdtVO) throws Exception;
	
}
