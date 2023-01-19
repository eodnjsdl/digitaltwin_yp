package egiskorea.com.job.fcts.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.codec.binary.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.geotools.data.DataStore;
import org.geotools.data.DefaultTransaction;
import org.geotools.data.FeatureWriter;
import org.geotools.data.Transaction;
import org.geotools.factory.CommonFactoryFinder;
import org.geotools.feature.FeatureIterator;
import org.geotools.geojson.feature.FeatureJSON;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.feature.type.AttributeDescriptor;
import org.opengis.feature.type.Name;
import org.opengis.filter.Filter;
import org.opengis.filter.FilterFactory2;
import org.opengis.filter.identity.Identifier;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import egiskorea.com.geo.com.service.GeoToolsService;
import egiskorea.com.job.fcts.service.FacilitiesService;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.psl.dataaccess.util.CamelUtil;

/**
 * @Description 시설물 서비스 구현 클래스
 *
 * @author 최원석
 * @since 2022.02.04
 * @version 1.0
 * @see
 *     <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.04		최원석	최초 생성
 *  </pre>
 */
@SuppressWarnings("deprecation")
@Service("facilitiesService")
public class FacilitiesServiceImpl implements FacilitiesService, ApplicationContextAware {

  /** 어플리케이션 컨텍스트 */
  ApplicationContext applicationContext;

  @Override
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    this.applicationContext = applicationContext;
  }

  /** 메세지 소스 */
  @Resource(name = "messageSource")
  MessageSource messageSource;

  /** GeoTools 서비스 */
  @Resource GeoToolsService geoToolsService;

  /** 시설물 등록 */
  @Override
  public void insertFacility(String dataId, String geojson) throws Exception {
    StringBuffer beanName = new StringBuffer();
    beanName.append(CamelUtil.convert2CamelCase(dataId));
    beanName.append("FtrIdnGnrService");

    EgovIdGnrService idGnrService =
        applicationContext.getBean(beanName.toString(), EgovIdGnrService.class);
    String idn =
        String.valueOf(Calendar.getInstance().get(Calendar.YEAR)) + idGnrService.getNextStringId();
    Double ftrIdn = Double.parseDouble(idn);

    DataStore dataStore = geoToolsService.getDataStore();
    Transaction transaction = new DefaultTransaction("write");

    FeatureJSON featureJSON = new FeatureJSON();
    SimpleFeature feature = featureJSON.readFeature(geojson);

    try {
      try (FeatureWriter<SimpleFeatureType, SimpleFeature> featureWriter =
          dataStore.getFeatureWriterAppend(dataId, transaction)) {
        SimpleFeature simpleFeature = featureWriter.next();
        for (AttributeDescriptor attributeDescriptor :
            simpleFeature.getType().getAttributeDescriptors()) {
          Name name = attributeDescriptor.getName();
          Object value = feature.getAttribute(name);
          simpleFeature.setAttribute(name, value);
        }
        simpleFeature.setAttribute("ftr_idn", ftrIdn);
        simpleFeature.setDefaultGeometry(feature.getDefaultGeometry());
        featureWriter.write();
        transaction.commit();
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    } catch (Exception e) {
      transaction.rollback();
      throw e;
    } finally {
      transaction.close();
      dataStore.dispose();
    }
  }

  /** 시설물 수정 */
  @Override
  public void updateFacility(String dataId, String geojson) throws Exception {
    FilterFactory2 filterFactory = CommonFactoryFinder.getFilterFactory2();

    DataStore dataStore = geoToolsService.getDataStore();
    Transaction transaction = new DefaultTransaction("write");

    FeatureJSON featureJSON = new FeatureJSON();
    SimpleFeature feature = featureJSON.readFeature(geojson);

    Set<Identifier> fids = new HashSet<Identifier>();
    fids.add(filterFactory.featureId(feature.getID()));
    Filter filter = filterFactory.id(fids);

    try {
      try (FeatureWriter<SimpleFeatureType, SimpleFeature> featureWriter =
          dataStore.getFeatureWriter(dataId, filter, transaction)) {
        if (featureWriter.hasNext()) {
          SimpleFeature simpleFeature = featureWriter.next();
          for (AttributeDescriptor attributeDescriptor :
              simpleFeature.getType().getAttributeDescriptors()) {
            Name name = attributeDescriptor.getName();
            Object value = feature.getAttribute(name);
            simpleFeature.setAttribute(name, value);
          }
          simpleFeature.setDefaultGeometry(feature.getDefaultGeometry());
        }

        featureWriter.write();
        transaction.commit();

      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    } catch (Exception e) {
      transaction.rollback();
      throw e;
    } finally {
      transaction.close();
      dataStore.dispose();
    }
  }

  /** 시설물 삭제 */
  @Override
  public void deleteFacility(String dataId, List<String> ids) throws Exception {
    FilterFactory2 filterFactory = CommonFactoryFinder.getFilterFactory2();

    DataStore dataStore = geoToolsService.getDataStore();
    Transaction transaction = new DefaultTransaction("write");

    Set<Identifier> fids = new HashSet<Identifier>();
    for (String id : ids) {
      fids.add(filterFactory.featureId(id));
    }
    Filter filter = filterFactory.id(fids);

    try {
      try (FeatureWriter<SimpleFeatureType, SimpleFeature> featureWriter =
          dataStore.getFeatureWriter(dataId, filter, transaction)) {
        while (featureWriter.hasNext()) {
          featureWriter.next();
          featureWriter.remove();
          transaction.commit();
        }
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    } catch (Exception e) {
      transaction.rollback();
      throw e;
    } finally {
      transaction.close();
      dataStore.dispose();
    }
  }

  /** 엑셀 */
  @Override
  public File excel(String title, String columns, String data) throws IOException {
    File file = File.createTempFile("EXPORT_", ".xlsx");

    ObjectMapper objectMapper = new ObjectMapper();
    ArrayNode arrayNode = (ArrayNode) objectMapper.readTree(columns);

    String geoserver = messageSource.getMessage("Gis.geoserver.url", null, Locale.getDefault());
    String url = geoserver + "/geoserver/wfs";

    try (Workbook workbook = new XSSFWorkbook()) {
      int rownum = 0;
      Sheet sheet = workbook.createSheet(title);

      Row headerRow = sheet.createRow(rownum++);
      int headerColumn = 0;
      for (JsonNode columnNode : arrayNode) {
        Cell cell = headerRow.createCell(headerColumn++);
        cell.setCellValue(columnNode.path("title").asText());
      }

      HttpPost httpPost = new HttpPost(url);
      httpPost.setEntity(new StringEntity(data));
      try (CloseableHttpClient httpClient = HttpClients.createDefault();
          CloseableHttpResponse httpResponse = httpClient.execute(httpPost)) {
        HttpEntity entity = httpResponse.getEntity();
        FeatureJSON featureJSON = new FeatureJSON();
        try (FeatureIterator<SimpleFeature> featureIterator =
            featureJSON.streamFeatureCollection(entity.getContent())) {
          while (featureIterator.hasNext()) {
            SimpleFeature simpleFeature = featureIterator.next();
            Row row = sheet.createRow(rownum++);
            int column = 0;
            for (JsonNode columnNode : arrayNode) {
              String name = columnNode.path("column").asText();
              String type = columnNode.path("type").asText();
              Cell cell = row.createCell(column++);
              if (StringUtils.equals(type, "code")) {
                // 코드 등록 후 코드 목록에서 값을 찾아서 입력하는 것으로 수정 필요
                cell.setCellValue((String) simpleFeature.getAttribute(name));
              } else if (StringUtils.equals(type, "emd")) {
                // 코드 등록 후 코드 목록에서 값을 찾아서 입력하는 것으로 수정 필요
                cell.setCellValue((String) simpleFeature.getAttribute(name));
              } else if (StringUtils.equals(type, "number")) {
                Object value = simpleFeature.getAttribute(name);
                if (value != null) {
                  if (value instanceof Long) {
                    cell.setCellValue((Long) simpleFeature.getAttribute(name));
                  } else {
                    cell.setCellValue((Double) simpleFeature.getAttribute(name));
                  }
                }
              } else if (StringUtils.equals(type, "text")) {
                cell.setCellValue((String) simpleFeature.getAttribute(name));
              } else if (StringUtils.equals(type, "date")) {
                cell.setCellValue((String) simpleFeature.getAttribute(name));
              }
            }
          }
        }
      }

      for (int i = 0; i < headerColumn; i++) {
        sheet.autoSizeColumn(i, true);
        sheet.setColumnWidth(i, sheet.getColumnWidth(i) + 600);
      }

      try (FileOutputStream stream = new FileOutputStream(file)) {
        workbook.write(stream);
      }
      workbook.close();
    }

    return file;
  }
}
