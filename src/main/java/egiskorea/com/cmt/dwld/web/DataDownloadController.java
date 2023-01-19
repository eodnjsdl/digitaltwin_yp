package egiskorea.com.cmt.dwld.web;

import java.io.File;
import java.io.OutputStream;
import java.net.URLEncoder;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import egiskorea.com.cmt.dwld.service.DataDownloadService;
import egiskorea.com.cmt.dwld.service.DataDownloadVO;

/**
 * @Description 데이터 다운로드 controller 클래스
 *
 * @author 최원석
 * @since 2022.01.29
 * @version 1.0
 * @see
 *     <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.29	최원석		최초 생성
 *  </pre>
 */
@Controller
@RequestMapping("/cmt/dwld")
public class DataDownloadController {

  /** 데이터 다운로드 서비스 */
  @Resource(name = "dataDownloadService")
  DataDownloadService dataDownloadService;

  /**
   * 
   * @Description : 데이터 다운로드 View
   * @Author 최원석
   * @Date 2022.01.29
   * @return
   */
  @RequestMapping(value = "/dataDownloadView.do")
  public String dataDownloadView() {
    return "egiskorea/com/cmt/dwld/dataDownloadView";
  }

  /**
   * 
   * @Description : 데이터 다운로드 
   * @Author 최원석
   * @Date 2022.01.30
   * @param dataDownloadVO 데이터 다운로드 vo
   * @param response 서블릿 응답
   * @param userAgent 사용자 환경
   * @throws Exception
   */
  @RequestMapping(value = "/dataDownload.do")
  public void dataDownload(
      DataDownloadVO dataDownloadVO,
      HttpServletResponse response,
      @RequestHeader(value = "User-Agent") String userAgent)
      throws Exception {
    File file = null;
    if (StringUtils.equals(dataDownloadVO.getType(), "shape")) {
      file = dataDownloadService.getShapeFile(dataDownloadVO);

    } else if (StringUtils.equals(dataDownloadVO.getType(), "excel")) {
      file = dataDownloadService.getExcelFile(dataDownloadVO);
    } else {
      throw new Exception("정의되지 않은 다운로드 타입입니다.");
    }

    String fileName = "export." + FilenameUtils.getExtension(file.getName());
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
