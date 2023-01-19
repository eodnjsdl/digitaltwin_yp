package egiskorea.com.anls.spce.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.xml.bind.DatatypeConverter;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Picture;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.data.simple.SimpleFeatureIterator;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.factory.CommonFactoryFinder;
import org.geotools.jdbc.JDBCDataStore;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.MultiLineString;
import org.locationtech.jts.geom.MultiPolygon;
import org.locationtech.jts.geom.Polygon;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.filter.Filter;
import org.opengis.filter.FilterFactory2;
import org.opengis.geometry.BoundingBox;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import egiskorea.com.anls.spce.service.SpaceAnalysisResultVO;
import egiskorea.com.anls.spce.service.SpaceAnalysisService;
import egiskorea.com.geo.com.service.GeoToolsService;

/**
 * @Description 공간분석 서비스 구현 클래스
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
@Service("spaceAnalysisService")
public class SpaceAnalysisServiceImpl implements SpaceAnalysisService {

  /** 로거 */
  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

  /** GeoTools 서비스 */
  @Resource GeoToolsService geoToolsService;

  /** 분석 */
  @Override
  public List<SpaceAnalysisResultVO> analysis(String emdCode, String dataId, String type)
      throws IOException {
    List<SpaceAnalysisResultVO> result = new ArrayList<SpaceAnalysisResultVO>();
    FilterFactory2 filterFactory = CommonFactoryFinder.getFilterFactory2();
    JDBCDataStore dataStore = (JDBCDataStore) geoToolsService.getDataStore();
    dataStore.setExposePrimaryKeyColumns(true);

    String typeName = StringUtils.isNotBlank(emdCode) ? "tgd_scco_li" : "tgd_scco_emd";

    SimpleFeatureSource simpleFeatureSource = dataStore.getFeatureSource(typeName);
    SimpleFeatureCollection simpleFeatureCollection = null;
    if (StringUtils.equals(typeName, "tgd_scco_emd")) {
      simpleFeatureCollection = simpleFeatureSource.getFeatures();
    } else if (StringUtils.equals(typeName, "tgd_scco_li")) {
      Filter filter = filterFactory.like(filterFactory.property("li_cd"), emdCode + "*");
      simpleFeatureCollection = simpleFeatureSource.getFeatures(filter);
    } else {
      LOGGER.warn("정의되지 않은 타입명입니다.");
    }

    try (SimpleFeatureIterator simpleFeatureIterator = simpleFeatureCollection.features()) {
      SimpleFeatureSource featureSource = dataStore.getFeatureSource(dataId);
      while (simpleFeatureIterator.hasNext()) {
        SpaceAnalysisResultVO resultVO = new SpaceAnalysisResultVO();
        SimpleFeature simpleFeature = simpleFeatureIterator.next();

        String id = simpleFeature.getID();
        resultVO.setCode(id.substring(id.indexOf(".") + 1));

        String columnName =
            StringUtils.equals(typeName, "tgd_scco_emd") ? "emd_kor_nm" : "li_kor_nm";
        resultVO.setName((String) simpleFeature.getAttribute(columnName));
        int count = 0;
        double value = 0;

        BoundingBox bounds = simpleFeature.getBounds();
        Filter bFilter = filterFactory.bbox(filterFactory.property("geom"), bounds);

        Object geometry = simpleFeature.getDefaultGeometry();
        Filter iFilter =
            filterFactory.intersects(
                filterFactory.property("geom"), filterFactory.literal(geometry));

        Filter aFilter = filterFactory.and(bFilter, iFilter);

        SimpleFeatureCollection source = featureSource.getFeatures(aFilter);
        count += source.size();
        try (SimpleFeatureIterator featureIterator = source.features()) {
          while (featureIterator.hasNext()) {
            SimpleFeature feature = featureIterator.next();
            if (StringUtils.equals(type, "P") || StringUtils.equals(type, "MP")) {
              value += 1;
            } else if (StringUtils.equals(type, "L") || StringUtils.equals(type, "ML")) {
              Object geom = feature.getDefaultGeometry();
              if (geom instanceof LineString) {
                value += ((LineString) geom).getLength();
              } else if (geom instanceof MultiLineString) {
                value += ((MultiLineString) geom).getLength();
              } else {
                LOGGER.warn("정의되지 않은 공간 타입입니다.");
              }
            } else if (StringUtils.equals(type, "A") || StringUtils.equals(type, "MA")) {
              Object geom = feature.getDefaultGeometry();
              if (geom instanceof Polygon) {
                value += ((Polygon) geom).getArea();
              } else if (geom instanceof MultiPolygon) {
                value += ((MultiPolygon) geom).getArea();
              } else {
                LOGGER.warn("정의되지 않은 공간 타입입니다.");
              }
            } else {
              LOGGER.warn("정의되지 않은 공간 타입입니다.");
            }
          }
        }
        resultVO.setCount(count);
        resultVO.setValue(value);
        result.add(resultVO);
      }
    }

    dataStore.dispose();

    return result;
  }

  /** 다운로드 파일 생성 */
  @Override
  public File createDownloadFile(String titles, String data, String chart) throws Exception {
    File file = File.createTempFile("ANALYSIS_", ".xlsx");

    ObjectMapper objectMapper = new ObjectMapper();
    try (Workbook workbook = new XSSFWorkbook()) {
      Sheet sheet = workbook.createSheet("분석");
      int rownum = 0;
      Row headerRow = sheet.createRow(rownum++);
      int headerColumn = 0;
      for (String title : titles.split(",")) {
        Cell cell = headerRow.createCell(headerColumn++);
        cell.setCellValue(title);
      }

      ArrayNode arrayNode = (ArrayNode) objectMapper.readTree(data);
      for (JsonNode jsonNode : arrayNode) {
        Row row = sheet.createRow(rownum++);
        row.createCell(0).setCellValue(jsonNode.get("name").asText());
        row.createCell(1).setCellValue(jsonNode.get("count").asInt());
        row.createCell(2).setCellValue(jsonNode.get("value").asDouble());
      }

      for (int i = 0; i < headerColumn; i++) {
        sheet.autoSizeColumn(i, true);
        sheet.setColumnWidth(i, sheet.getColumnWidth(i) + 600);
      }

      String base64Image = chart.split(",")[1];
      byte[] imageBytes = DatatypeConverter.parseBase64Binary(base64Image);

      int chartImage = workbook.addPicture(imageBytes, Workbook.PICTURE_TYPE_PNG);
      Drawing<?> drawing = sheet.createDrawingPatriarch();
      CreationHelper helper = workbook.getCreationHelper();
      ClientAnchor anchor = helper.createClientAnchor();

      anchor.setCol1(0);
      anchor.setRow1(++rownum);
      Picture picture = drawing.createPicture(anchor, chartImage);
      picture.resize();

      try (FileOutputStream stream = new FileOutputStream(file)) {
        workbook.write(stream);
      }
    }

    return file;
  }

}
