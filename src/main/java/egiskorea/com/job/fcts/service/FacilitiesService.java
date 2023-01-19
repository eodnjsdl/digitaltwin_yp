package egiskorea.com.job.fcts.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * 
 * @Description 시설물 서비스 인터페이스 
 * @author 최원석
 * @since 2022.02.04
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.04		최원석	최초 생성
 *  </pre>
 */
public interface FacilitiesService {

  /**
   * 
   * @Description : 시설물 등록 
   * @Author 최원석
   * @Date 2022.02.04
   * @param dataId 데이터 아이디
   * @param geojson GeoJSON
   * @throws Exception
   */
  public void insertFacility(String dataId, String geojson) throws Exception;

  /**
   * 
   * @Description : 시설물 수정 
   * @Author 최원석
   * @Date 2022.02.04
   * @param dataId 데이터 아이디
   * @param geojson GeoJSON
   * @throws Exception
   */
  public void updateFacility(String dataId, String geojson) throws Exception;

  /**
   * 
   * @Description : 시설물 삭제 
   * @Author 최원석
   * @Date 2022.02.04
   * @param dataId 데이터 아이디
   * @param ids 아이디 목록
   * @throws Exception
   */
  public void deleteFacility(String dataId, List<String> ids) throws Exception;
  
  /**
   * 
   * @Description : 엑셀
   * @Author 최원석
   * @Date 2022.02.05
   * @param title 명칭
   * @param columns 컬럼 목록
   * @param data 데이터
   * @return
   * @throws IOException
   */
  public File excel(String title, String columns, String data) throws IOException;
}
