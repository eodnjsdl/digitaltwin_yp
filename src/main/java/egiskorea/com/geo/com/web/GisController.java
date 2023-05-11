package egiskorea.com.geo.com.web;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import egiskorea.com.geo.com.service.ReverseGeocodingResultVO;
import egiskorea.com.geo.com.service.ReverseGeocodingVO;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.context.MessageSource;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.geo.com.service.GisService;

/**
 * @author 배윤성
 * @version 1.0
 * @Description GIS controller 클래스 (TMS, GeoServer Proxy 역할)
 * @see << 개정이력(Modification Information) >>
 * <p>
 * 수정일               수정자            수정내용
 * ----------   --------   ---------------------------
 * 2021.12.29   배윤성           최초 생성
 * @since 2021.12.29
 */
@Controller
@CrossOrigin
@RequestMapping("/gis")
public class GisController {

    /**
     * 캐시 기간
     */
    private final int CACHE_PERIOD = 3600;

    /**
     * GIS 서비스
     */
    @Resource
    private GisService gisService;

    /**
     * 메세지 소스
     */
    @Resource(name = "messageSource")
    MessageSource messageSource;

    /**
     * @param request Http 서블릿 요청
     * @return Geoserver 요청 결과
     * @throws IOException
     * @Description : GeoServer Get Proxy
     * @Author 최원석
     * @Date 2022.02.03
     */
    @GetMapping("/**")
    public ResponseEntity<byte[]> getOws(HttpServletRequest request) throws IOException {
        String geoserver = messageSource.getMessage("Gis.geoserver.url", null, Locale.getDefault());
        String url = geoserver + request.getRequestURI().replace("/gis/", "/geoserver/");

        if (StringUtils.isNotBlank(request.getQueryString())) {
            url += "?" + request.getQueryString();
        }
        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse httpResponse = httpClient.execute(new HttpGet(url))) {
            HttpEntity entity = httpResponse.getEntity();
            return ResponseEntity.status(httpResponse.getStatusLine().getStatusCode())
                    .cacheControl(
                            httpResponse.getStatusLine().getStatusCode() < 400
                                    ? CacheControl.maxAge(CACHE_PERIOD, TimeUnit.SECONDS)
                                    : CacheControl.noCache())
                    .contentType(MediaType.parseMediaType(entity.getContentType().getValue()))
                    .contentLength(entity.getContentLength())
                    .body(StreamUtils.copyToByteArray(entity.getContent()));
        }
    }


    /**
     * @param request Http 서블릿 요청
     * @param source  요청 내용
     * @return Geoserver 요청 결과
     * @throws IOException
     * @Description : GeoServer Post Proxy
     * @Author 최원석
     * @Date 2022.02.03
     */
    @PostMapping("/**")
    public ResponseEntity<byte[]> postOws(HttpServletRequest request, @RequestBody String source)
            throws IOException {
        String geoserver = messageSource.getMessage("Gis.geoserver.url", null, Locale.getDefault());
        String url = geoserver + request.getRequestURI().replace("/gis/", "/geoserver/");
        if (StringUtils.isNotBlank(request.getQueryString())) {
            url += "?" + request.getQueryString();
        }

        HttpPost httpPost = new HttpPost(url);

        httpPost.setHeader("Charset", "UTF-8");
        if (source.trim().startsWith("<") || source.trim().startsWith("%3C")) {
            httpPost.setHeader("Content-Type", "application/xml");
            httpPost.setEntity(new StringEntity(source, Charset.defaultCharset()));
        } else {
            String c = request.getContentType();
            if (c.contains(";")) {
                c = c.trim().split(";")[0];
            }
            httpPost.setHeader("Content-Type", c);
            byte[] postData = source.getBytes();
            httpPost.setEntity(new ByteArrayEntity(postData));
        }

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse httpResponse = httpClient.execute(httpPost)) {
            HttpEntity entity = httpResponse.getEntity();
            return ResponseEntity.status(httpResponse.getStatusLine().getStatusCode())
                    .cacheControl(
                            httpResponse.getStatusLine().getStatusCode() < 400
                                    ? CacheControl.maxAge(CACHE_PERIOD, TimeUnit.SECONDS)
                                    : CacheControl.noCache())
                    .contentType(MediaType.parseMediaType(entity.getContentType().getValue()))
                    .contentLength(entity.getContentLength())
                    .body(StreamUtils.copyToByteArray(entity.getContent()));
        }
    }

    /**
     * @param wkt WKT
     * @return 주소/도로명 주소 결과
     * @Description : 리버스 지오코딩
     * @Author 최원석
     * @Date 2022.02.03
     */
    @RequestMapping("/reverseGeocoding.do")
    public ModelAndView reverseGeocoding(String wkt) {
        ModelAndView modelAndView = new ModelAndView("jsonView");
        modelAndView.addObject("result", gisService.reverseGeocoding(wkt));
        return modelAndView;
    }

    /**
     * @param reverseGeocodingVO
     * @return 주소/도로명 주소 결과
     * @Description 리버스 지오코딩(5174)
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.07.26
     */
    @RequestMapping(value = "/reverseGeocoding5174.do", method = RequestMethod.POST)
    public ModelAndView reverseGeocoding5174(ReverseGeocodingVO reverseGeocodingVO) {
        ModelAndView modelAndView = new ModelAndView("jsonView");
        modelAndView.addObject("result", gisService.reverseGeocoding5174(reverseGeocodingVO));
        return modelAndView;
    }
}
