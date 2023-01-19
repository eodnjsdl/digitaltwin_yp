package egiskorea.com.anls.spce.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.ui.ModelMap;

/**
 * 
 * @Description 공간분석 서비스 인터페이스 
 * @author 최원석
 * @since 2022.02.05
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.05		최원석	최초 생성
 *  </pre>
 */
public interface SpaceAnalysisService {

  /**
   * 
   * @Description : 분석 
   * @Author 최원석
   * @Date 2022.02.05
   * @param emdCode 읍면동 코드
   * @param dataId 데이터 아이디
   * @param type 공간 타입
   * @return 공간 분석 결과
   * @throws IOException
   */
  public List<SpaceAnalysisResultVO> analysis(String emdCode, String dataId, String type)
      throws IOException;
  
  /**
   * 
   * @Description : 다운로드 파일 생성 
   * @Author 최원석
   * @Date 2022.02.05
   * @param titles 제목 목록
   * @param data 데이터
   * @param chart 차트
   * @return 다운로드 파일
   * @throws Exception
   */
  public File createDownloadFile(String titles, String data, String chart) throws Exception;
  
}
