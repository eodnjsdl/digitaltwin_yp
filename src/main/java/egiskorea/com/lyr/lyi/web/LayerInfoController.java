package egiskorea.com.lyr.lyi.web;


import egiskorea.com.cmm.service.CmmUtils;
import egiskorea.com.cmm.service.Globals;
import egiskorea.com.lyr.dtcv.service.MapsData;
import egiskorea.com.lyr.lyi.service.LayerAttribute;
import egiskorea.com.lyr.lyi.service.LayerInfoService;
import egiskorea.com.lyr.lyi.service.LayerInfoVO;
import egiskorea.com.lyr.lyi.service.LayerSet;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileWriter;
import java.util.List;
import java.util.Locale;

/**
 * @author 플랫폼개발부문 DT솔루션 김선옥
 * @version 1.0
 * @Description 레이어 정보 관련 controller 클래스
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.30   김선옥           최초 생성
 *  </pre>
 * @since 2021.12.30
 */

@Controller
@RequestMapping("/lyr/lyi")
public class LayerInfoController {

    private static final Logger LOGGER = LoggerFactory.getLogger(LayerInfoController.class);

    @Resource(name = "layerInfoService")
    private LayerInfoService layerInfoService;

    /**
     * 메세지 소스
     */
    @Resource(name = "messageSource")
    MessageSource messageSource;

    /**
     * @param layerInfoVO
     * @param model
     * @return
     * @throws Exception
     * @Description 레이어 정보 수정 화면
     * @Author 플랫폼개발부문 DT솔루션 김선옥
     * @Date 2022.02.25
     */
    @RequestMapping(value = "/updateLayerInfoView.do")
    public String updateLayerInfoView(
            @ModelAttribute("layerInfoVO") LayerInfoVO layerInfoVO,
            HttpServletRequest request,
            ModelMap model) throws Exception {

        try {
            // 레이어셋 정보 조회
            LayerSet layerSet = layerInfoService.selectLayerSetInfo(layerInfoVO);

            // 없을 경우 삽입
            if (layerSet == null) {
                layerSet = layerInfoService.selectLayerInfo(layerInfoVO);

                if (layerSet != null) {
                    // 스타일 정보 조회
                    String sldPath = request.getSession().getServletContext().getRealPath("/WEB-INF/sld/");

                    switch (layerSet.getLyrDtlKnd()) {
                        // 점
                        case "3":
                        case "4":
                            layerSet.setLyrDtlKnd("P");
                            sldPath += "point_default_sld.xml";

                            break;
                        // 선
                        case "1":
                        case "5":
                            layerSet.setLyrDtlKnd("L");
                            sldPath += "line_default_sld.xml";

                            break;
                        // 면
                        case "2":
                        case "6":
                        case "7":
                            layerSet.setLyrDtlKnd("A");
                            sldPath += "area_default_sld.xml";

                            break;
                    }

                    File file = new File(sldPath);
                    String styleInfo = FileUtils.readFileToString(file, "UTF-8");

                    layerSet.setStyleInfo(styleInfo);

                    // 레이어셋 정보 삽입
                    layerInfoService.insertLayerSetInfo(layerSet);
                }
            }

            model.addAttribute("layerSet", layerSet);

            // 레이어 데이터량 조회
            layerInfoVO.setTblNm(layerSet.getTblNm());
            int layerDataSize = layerInfoService.selectLayerInfoList(layerInfoVO).size();

            model.addAttribute("layerDataSize", layerDataSize);

            // 레이어 속성정보 조회
            List<LayerAttribute> layerAttributeList = layerInfoService.selectLayerAttributeList(layerInfoVO);

            if (layerAttributeList.size() < 1) {
                layerInfoVO.setTblNm(layerSet.getTblNm());

                layerAttributeList = layerInfoService.selectLayerAttributeInfo(layerInfoVO);

                for (int i = 0; i < layerAttributeList.size(); i++) {
                    LayerAttribute layerAttribute = layerAttributeList.get(i);

                    layerAttribute.setLyrId(layerInfoVO.getLyrId());
                    layerAttribute.setFrstRegisterId(layerSet.getFrstRegisterId());


//					layerInfoService.insertLayerAttributeInfo(layerAttribute);

                    layerAttributeList.add(layerAttribute);
                }
            }

            model.addAttribute("layerAttributeList", layerAttributeList);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "egiskorea/com/lyr/lyi/updateLayerInfoView";
    }

    /**
     * @param layerInfoVO
     * @param model
     * @return
     * @throws Exception
     * @Description 레이어 정보 목록 호죄
     * @Author 플랫폼개발부문 DT솔루션 김선옥
     * @Date 2022.03.08
     */
    @RequestMapping(value = "/selectLayerInfoList.do")
    public ModelAndView selectLayerInfoList(
            @ModelAttribute("layerInfoVO") LayerInfoVO layerInfoVO,
            ModelMap model) throws Exception {

        ModelAndView mav = new ModelAndView("jsonView");

        try {
            // 속성 리스트 조회
            LayerAttribute layerAttribute = layerInfoService.selectLayerExpressionAttribute(layerInfoVO);

            if (layerAttribute != null) {
                layerInfoVO.setAtrbId(layerAttribute.getAtrbId());
            }

            layerInfoVO.setLyrDtlKnd("P");

            List<EgovMap> layerInfoList = layerInfoService.selectLayerInfoList(layerInfoVO);
            mav.addObject("layerInfoList", layerInfoList);

            // POI 정보 조회
            LayerSet layerSet = layerInfoService.selectLayerSetInfo(layerInfoVO);

            if (layerSet.getStyleInfo() != null) {
                Document doc = CmmUtils.convertStringToXMLDocument(layerSet.getStyleInfo());
                Element root = doc.getDocumentElement();
                NodeList circle = root.getElementsByTagName("se:SvgParameter"),
                        img = root.getElementsByTagName("se:OnlineResource");

                // 색상 정보
                if (circle.getLength() > 0) {
                    for (int i = 0; i < circle.getLength(); i++) {
                        Node node = circle.item(i);
                        Element ele = (Element) node;

                        if (ele.getAttribute("name").equals("fill")) {
                            mav.addObject("poiType", "C");
                            mav.addObject("poiColor", ele.getTextContent());
                        }
                    }
                }

                // 이미지 정보
                if (img.getLength() > 0) {
                    for (int i = 0; i < img.getLength(); i++) {
                        Node node = img.item(i);
                        Element ele = (Element) node;

                        mav.addObject("poiType", "I");
                        mav.addObject("poiImg", ele.getAttribute("xlink:href"));
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e);
            e.printStackTrace();
        }

        return mav;
    }


    /**
     * @param layerSet
     * @param layerAttribute
     * @param request
     * @param model
     * @return
     * @throws Exception
     * @Description 레이어 정보 수정
     * @Author 플랫폼개발부문 DT솔루션 김선옥
     * @Date 2022.03.16
     */
    @RequestMapping(value = "/updateLayerInfo.do")
    public ModelAndView updateLayerInfo(
            @ModelAttribute("layerSet") LayerSet layerSet,
            @ModelAttribute("layerAttribute") LayerAttribute layerAttribute,
            HttpServletRequest req,
            ModelMap model) throws Exception {

        ModelAndView mav = new ModelAndView("jsonView");
        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
        layerSet.setLastUpdusrId(user.getId());

        // 레이어 셋 수정
        layerSet.setStyleInfo(StringEscapeUtils.unescapeHtml4(layerSet.getStyleInfo())); //xss방지
        layerInfoService.updateLayerSetInfo(layerSet);

        // 레이어 속성 수정
        for (int i = 0; i < layerAttribute.getAtrbNmArr().length; i++) {
            layerAttribute.setAtrbNm(layerAttribute.getAtrbNmArr()[i]);
            layerAttribute.setAtrbId(layerAttribute.getAtrbIdArr()[i]);
            layerAttribute.setEprssAt(layerAttribute.getEprssAtArr()[i]);

            layerInfoService.updateLayerAttributeInfo(layerAttribute);
        }

        // 레이어 스타일 수정
        String workspace = "digitaltwin"; // 작업공간
        String shpTable = layerSet.getTblNm() + "_st"; // 레이어명
        String sldXML = layerSet.getStyleInfo(); // 스타일 XML
        String path = EgovProperties.getProperty("Globals.fileStorePath"); //업로드 경로
        String sldPath = path + "/layerStyle/sld";
        int rs = 0;
        boolean rss = false;

        if (CmmUtils.mkdir(sldPath)) {
            File file = new File(sldPath + "/" + shpTable + ".sld");

            if (file.exists()) {
                file.delete();
            }

            if (!file.exists()) {
                rss = true;
            }

            File sld = new File(sldPath + "/" + shpTable + ".sld");
            FileWriter fw = new FileWriter(sld, true);

            fw.write(sldXML);
            fw.flush();
            fw.close();

            String result = "";
            String geoserver = messageSource.getMessage("Gis.geoserver.url2", null, Locale.getDefault());
            String url = "http://" + Globals.GEO_ID + ":" + Globals.GEO_PW + "@" + geoserver + "/geoserver/rest/workspaces/" + workspace + "/styles/" + shpTable;

            try {
                Request request1 = Request.Put(url);
                File f = new File(sldPath + "/" + shpTable + ".sld");
                request1.bodyFile(f, ContentType.MULTIPART_FORM_DATA);
                request1.setHeader("Content-Type", "application/vnd.ogc.se+xml; charset=EUC-KR");
                HttpResponse httpResponse = request1.execute().returnResponse();
                if (httpResponse.getEntity() != null) {
                    String html = EntityUtils.toString(httpResponse.getEntity());
                }
                mav.addObject("callback", "success");
                mav.addObject("message", "레이어 스타일이 정상적으로 수정되었습니다.");
            } catch (Exception e) {
                LOGGER.info("------레이어 스타일 정보 수정 실패------");
                LOGGER.debug(e.getMessage(), e);
                mav.addObject("callback", "fail");
                mav.addObject("message", "레이어 스타일 수정에 실패했습니다.(2)");
            }
        } else {
            LOGGER.info("------레이어 스타일 저장 경로 생성 실패------");
            mav.addObject("callback", "fail");
            mav.addObject("message", "레이어 스타일 수정에 실패했습니다.(1)");
        }

        return mav;
    }

    /**
     * @param layerInfoVO
     * @param model
     * @return
     * @throws Exception
     * @Description CSV 레이어 정보 조회
     * @Author 플랫폼개발부문 DT솔루션 김선옥
     * @Date 2022.03.25
     */
    @RequestMapping(value = "/selectCsvLayerInfo.do")
    public ModelAndView selectCsvLayerInfo(
            @ModelAttribute("mapsData") MapsData mapsData,
            ModelMap model) throws Exception {

        ModelAndView mav = new ModelAndView("jsonView");

        mapsData = layerInfoService.selectCsvLayerInfo(mapsData);

        mav.addObject("mapsData", mapsData);

        return mav;
    }

    @RequestMapping(value = "/sld")
    public void selectSLD(
            @ModelAttribute("layerInfoVO") LayerInfoVO layerInfoVO,
            HttpServletResponse response) throws Exception {
        try {
            LayerSet layerSet = layerInfoService.selectLayerSetInfo(layerInfoVO);
            if (layerSet.getStyleInfo() != null) {
                response.setContentType("application/xml");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(layerSet.getStyleInfo());
            }
        } catch (Exception e) {
            System.out.println(e);
            e.printStackTrace();
        }
    }
}
