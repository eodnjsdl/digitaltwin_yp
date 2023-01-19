package egiskorea.com.cmm.service;

/**
 * 
 * @Description 압축 서비스 인터페이스
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
public interface CompressService {

  /**
   * 
   * @Description : 폴더 압축 
   * @Author 최원석
   * @Date 2022.01.30
   * @param folderPath 압축할 폴더
   * @param zipPath 압축 파일
   * @throws Exception
   */
  public void compressFolder(String folderPath, String zipPath) throws Exception;
}
