package egiskorea.com.cmt.dwld.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.nio.charset.Charset;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import javax.annotation.Resource;

import org.apache.commons.io.FileUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.RichTextString;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.geotools.data.DataStore;
import org.geotools.data.shapefile.ShapefileDumper;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.data.simple.SimpleFeatureIterator;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.factory.CommonFactoryFinder;
import org.geotools.feature.type.GeometryDescriptorImpl;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.io.WKTReader;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.feature.type.AttributeDescriptor;
import org.opengis.filter.Filter;
import org.opengis.filter.FilterFactory2;
import org.springframework.stereotype.Service;

import egiskorea.com.cmm.service.CompressService;
import egiskorea.com.cmt.dwld.service.DataDownloadService;
import egiskorea.com.cmt.dwld.service.DataDownloadVO;
import egiskorea.com.geo.com.service.GeoToolsService;


/**
 * @Description 데이터 다운로드 서비스 구현 클래스
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

@Service("dataDownloadService")
public class DataDownloadServiceImpl implements DataDownloadService {

  /** GeoTools 서비스 */
  @Resource GeoToolsService geoToolsService;

  /** 압축 서비스 */
  @Resource CompressService compressService;

  /**
   * 다운로드 파일 가져오기 (excel) 
   */
  @Override
  public File getExcelFile(DataDownloadVO dataDownloadVO) throws Exception {
    FilterFactory2 filterFactory = CommonFactoryFinder.getFilterFactory2();
    WKTReader wktReader = new WKTReader();
    File file = File.createTempFile("EXPORT_", ".xlsx");
    try (Workbook workbook = new XSSFWorkbook()) {
      DataStore dataStore = geoToolsService.getDataStore();

      for (String dataId : dataDownloadVO.getDataIds().split(",")) {
        int rownum = 0;
        Sheet sheet = workbook.createSheet(dataId);
        SimpleFeatureSource featureSource = dataStore.getFeatureSource(dataId);

        SimpleFeatureType simpleFeatureType = dataStore.getSchema(dataId);
        Row headerRow = sheet.createRow(rownum++);
        int headerColumn = 0;
        for (AttributeDescriptor attributeDescriptor :
            simpleFeatureType.getAttributeDescriptors()) {
          if (!(attributeDescriptor instanceof GeometryDescriptorImpl)) {
            Cell cell = headerRow.createCell(headerColumn++);
            cell.setCellValue(attributeDescriptor.getName().toString());
          }
        }

        Geometry geometry = wktReader.read(dataDownloadVO.getWkt());
        Filter filter =
            filterFactory.dwithin(
                filterFactory.property("geom"),
                filterFactory.literal(geometry),
                dataDownloadVO.getBuffer(),
                "m");
        SimpleFeatureCollection featureCollection = featureSource.getFeatures(filter);
        try (SimpleFeatureIterator featureIterator = featureCollection.features()) {
          while (featureIterator.hasNext()) {
            SimpleFeature simpleFeature = featureIterator.next();
            Row row = sheet.createRow(rownum++);
            int column = 0;
            for (AttributeDescriptor attributeDescriptor :
                simpleFeatureType.getAttributeDescriptors()) {
              if (!(attributeDescriptor instanceof GeometryDescriptorImpl)) {
                Cell cell = row.createCell(column++);
                Object value = simpleFeature.getAttribute(attributeDescriptor.getName());
                if (value instanceof Integer) {
                  cell.setCellValue((Integer) value);
                } else if (value instanceof Long) {
                  cell.setCellValue((Long) value);
                } else if (value instanceof BigDecimal) {
                  cell.setCellValue(((BigDecimal) value).doubleValue());
                } else if (value instanceof Double) {
                  cell.setCellValue((Double) value);
                } else if (value instanceof Date) {
                  cell.setCellValue((Date) value);
                } else if (value instanceof Calendar) {
                  cell.setCellValue((Calendar) value);
                } else if (value instanceof RichTextString) {
                  cell.setCellValue((RichTextString) value);
                } else if (value instanceof String) {
                  cell.setCellValue((String) value);
                }
              }
            }
          }
        }

        for (int i = 0; i < headerColumn; i++) {
          sheet.autoSizeColumn(i, true);
          sheet.setColumnWidth(i, sheet.getColumnWidth(i) + 600);
        }
      }

      try (FileOutputStream stream = new FileOutputStream(file)) {
        workbook.write(stream);
      }
      dataStore.dispose();
    }

    return file;
  }

  /**
   * 다운로드 파일 가져오기 (zip - shape)
   */
  @Override
  public File getShapeFile(DataDownloadVO dataDownloadVO) throws Exception {
    FilterFactory2 filterFactory = CommonFactoryFinder.getFilterFactory2();
    WKTReader wktReader = new WKTReader();

    DataStore dataStore = geoToolsService.getDataStore();
    String tempDir = System.getProperty("java.io.tmpdir");
    File directory = new File(tempDir + UUID.randomUUID());
    directory.mkdirs();

    File zipFile = File.createTempFile("EXPORT_", ".zip");
    for (String dataId : dataDownloadVO.getDataIds().split(",")) {
      SimpleFeatureSource featureSource = dataStore.getFeatureSource(dataId);

      Geometry geometry = wktReader.read(dataDownloadVO.getWkt());
      Filter filter =
          filterFactory.dwithin(
              filterFactory.property("geom"),
              filterFactory.literal(geometry),
              dataDownloadVO.getBuffer(),
              "m");
      SimpleFeatureCollection featureCollection = featureSource.getFeatures(filter);

      ShapefileDumper dumper = new ShapefileDumper(directory);
      dumper.setCharset(Charset.forName("CP949"));
      int maxSize = 100 * 1024 * 1024;
      dumper.setMaxDbfSize(maxSize);
      dumper.setMaxDbfSize(maxSize);
      dumper.dump(dataId, featureCollection);
    }

    dataStore.dispose();

    compressService.compressFolder(directory.getAbsolutePath(), zipFile.getAbsolutePath());
    FileUtils.forceDelete(directory);
    return zipFile;
  }
}
