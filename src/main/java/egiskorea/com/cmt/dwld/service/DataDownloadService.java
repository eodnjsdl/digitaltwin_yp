package egiskorea.com.cmt.dwld.service;

import java.io.File;

/**
 * 
 * @Description 데이터 다운로드 서비스 인터페이스 
 * @author 최원석
 * @since 2022.01.30
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.30		최원석	최초 생성
 *  </pre>
 */
public interface DataDownloadService {
	
	/**
	 * 
	 * @Description : 다운로드 파일 가져오기 (excel) 
	 * @Author 최원석
	 * @Date 2022.01.30
	 * @param dataDownloadVO 데이터 다운로드 vo
	 * @return 엑셀 파일
	 * @throws Exception
	 */
	public File getExcelFile(DataDownloadVO dataDownloadVO) throws Exception;
	
	/**
	 * 
	 * @Description : 다운로드 파일 가져오기 (zip - shape)
	 * @Author 최원석
	 * @Date 2022.01.30
	 * @param dataDownloadVO 데이터 다운로드 vo
	 * @return 압축파일
	 * @throws Exception
	 */
	public File getShapeFile(DataDownloadVO dataDownloadVO) throws Exception;
	
}
