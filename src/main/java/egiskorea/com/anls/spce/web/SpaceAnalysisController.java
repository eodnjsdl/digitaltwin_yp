package egiskorea.com.anls.spce.web;

import java.io.File;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.anls.spce.service.SpaceAnalysisService;

/**
 * @Description 공간 분석 controller 클래스
 *
 * @author 최원석
 * @since 2022.02.05
 * @version 1.0
 * @see
 *     <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.05		최원석	최초 생성
 *  </pre>
 */
@Controller
@RequestMapping("/anls/spce")
public class SpaceAnalysisController {

  /** 공간분석 서비스 */
  @Resource SpaceAnalysisService spaceAnalysisService;
  
  /**
   * 
   * @Description : 분석
   * @Author 최원석
   * @Date 2022.02.05
   * @param emdCode 읍면동 코드
   * @param dataId 데이터 아이디
   * @param type 타입
   * @return 모델&뷰
   * @throws Exception
   */
  @GetMapping("/analysis.do")
  public ModelAndView analysis(String emdCode, String dataId, String type) throws Exception {
    ModelAndView modelAndView = new ModelAndView("jsonView");
    modelAndView.addObject("result", spaceAnalysisService.analysis(emdCode, dataId, type));
    return modelAndView;
  }

  /**
   * 
   * @Description : 다운로드 파일 생성 
   * @Author 최원석
   * @Date 2022.02.05
   * @param titles 제목 목록
   * @param data 데이터
   * @param chart 차트
   * @return 모델&뷰
   * @throws Exception
   */
  @PostMapping("/createDownloadFile.do")
  public ModelAndView download(String titles, String data, String chart) throws Exception {
    ModelAndView modelAndView = new ModelAndView("jsonView");
    File file = spaceAnalysisService.createDownloadFile(titles, URLDecoder.decode(data, "UTF-8"), chart);
    modelAndView.addObject("result", file.getName());
    return modelAndView;
  }
  
  /**
   * 
   * @Description : 다운로드 
   * @Author 최원석
   * @Date 2022.02.05
   * @param name 명칭
   * @param response 서블릿 응답
   * @param userAgent 사용자 환경
   * @throws Exception
   */
  @GetMapping("/download.do")
  public void download(
      String name,
      HttpServletResponse response,
      @RequestHeader(value = "User-Agent") String userAgent)
      throws Exception {

    String tempDir = System.getProperty("java.io.tmpdir");
    File file = new File(tempDir + File.separator + name);

    String fileName = "공간분석결과.xlsx";
    String docName = null;
    if (StringUtils.contains(userAgent, "MSIE")
        || StringUtils.contains(userAgent, "rv:11.0")
        || StringUtils.contains(userAgent, "Chrome")) {
      docName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20") + ";";
    } else {
      docName = "\"" + new String(fileName.getBytes("UTF-8"), "ISO-8859-1") + "\"";
    }
    response.setHeader("Content-Disposition", "attachment; filename=" + docName);

    try (OutputStream output = response.getOutputStream()) {
      FileUtils.copyFile(file, output);
    }
  }
  
  
}
