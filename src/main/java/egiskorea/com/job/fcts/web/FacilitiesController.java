package egiskorea.com.job.fcts.web;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.job.fcts.service.FacilitiesService;

/**
 * @Description 시설물 공통 클래스
 * @author 배윤성
 * @since 2021.01.10
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.01.10   배윤성           최초 생성
 */
@Controller
@RequestMapping("/job/fcts")
public class FacilitiesController {
 
  /** 시설물 서비스 */
  @Resource
  FacilitiesService facilitiesService;

  /**
   * 
   * @Description : 시설물 
   * @Author 최원석
   * @Date 2022.01.10
   * @return 시설물 뷰 경로
   * @throws Exception
   */
  @GetMapping("/facilities.do")
  public String job() throws Exception {
    return "egiskorea/com/job/fcts/facilities";
  }
  
  /**
   * 
   * @Description : 공간편집 뷰 
   * @Author 최원석
   * @Date 2022.02.03
   * @return 공간편집 뷰 경로
   * @throws Exception
   */
  @GetMapping("/editView.do")
  public String editView() throws Exception {
	return "egiskorea/com/job/fcts/editView";
  }

  /**
   * 
   * @Description : 시설물 등록 
   * @Author 최원석
   * @Date 2022.02.05
   * @param dataId 데이터 아이디
   * @param geojson GeoJSON
   * @return 모델&뷰
   * @throws Exception
   */
  @PostMapping("/insertFacility.do")
  public ModelAndView insertFacility(String dataId, String geojson) throws Exception {
    ModelAndView modelAndView = new ModelAndView("jsonView");
    try {
      geojson = geojson.replaceAll("&quot;", "\"");
      facilitiesService.insertFacility(dataId, geojson);
      modelAndView.addObject("result", true);
    } catch (Exception e) {
      modelAndView.addObject("result", false);
      modelAndView.addObject("errorMsg", e.getMessage());
    }
    return modelAndView;
  }

  /**
   * 
   * @Description : 시설물 수정 
   * @Author 최원석
   * @Date 2022.02.05
   * @param dataId 데이터 아이디
   * @param geojson GeoJSON
   * @return 모델&뷰
   * @throws Exception
   */
  @PostMapping("/updateFacility.do")
  public ModelAndView updateFacility(String dataId, String geojson) throws Exception {
    ModelAndView modelAndView = new ModelAndView("jsonView");
    try {
      geojson = geojson.replaceAll("&quot;", "\"");
      facilitiesService.updateFacility(dataId, geojson);
      modelAndView.addObject("result", true);
    } catch (Exception e) {
      modelAndView.addObject("result", false);
      modelAndView.addObject("errorMsg", e.getMessage());
    }
    return modelAndView;
  }

  /**
   * 
   * @Description : 시설물 삭제
   * @Author 최원석
   * @Date 2022.02.05
   * @param dataId 데이터 아이디
   * @param ids 삭제할 아이디 목록
   * @return 모델&뷰
   * @throws Exception
   */
  @PostMapping("/deleteFacility.do")
  public ModelAndView deleteFacility(String dataId, String ids) throws Exception {
    ModelAndView modelAndView = new ModelAndView("jsonView");
    try {
      List<String> fids = Arrays.asList(ids.split(","));
      facilitiesService.deleteFacility(dataId, fids);
      modelAndView.addObject("result", true);
    } catch (Exception e) {
      modelAndView.addObject("result", false);
      modelAndView.addObject("errorMsg", e.getMessage());
    }
    return modelAndView;
  }

  /**
   * 
   * @Description : 엑셀 다운로드 
   * @Author 최원석
   * @Date 2022.02.05
   * @param title 명칭
   * @param columns 컬럼 목록
   * @param data 데이터
   * @param response 서블릿 응답
   * @param userAgent 사용자 환경
   * @throws IOException
   */
  @GetMapping("/excel.do")
  public void excel(
      String title,
      String columns,
      String data,
      HttpServletResponse response,
      @RequestHeader(value = "User-Agent") String userAgent)
      throws IOException {
    File file = facilitiesService.excel(title, decode(columns), decode(data));

    String fileName = "EXPORT_" + title + "." + FilenameUtils.getExtension(file.getName());
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

  /**
   * 
   * @Description : 복호화
   * @Author 최원석
   * @Date 2022.02.05
   * @param str 문자열
   * @return 문자열
   */
  private String decode(String str) {
	  return str.replaceAll("&quot;", "\"").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
  }
}
