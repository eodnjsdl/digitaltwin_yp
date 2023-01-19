package egiskorea.com.geo.com.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;

import org.geotools.data.DataStore;
import org.geotools.data.DataStoreFinder;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import egiskorea.com.geo.com.service.GeoToolsService;

/**
 * 
 * @Description GeoTools 서비스 구현 클래스 
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
@Service("geoToolsService")
public class GeoToolsServiceImpl implements GeoToolsService {
	  
  /** 메세지 소스 */
  @Resource(name="messageSource")
  MessageSource messageSource;

  /** 데이터 저장소 가져오기 */
  @Override
  public DataStore getDataStore() throws IOException {
    Map<String, Object> params = new HashMap<String, Object>();
    params.put(
        "dbtype", messageSource.getMessage("Gis.geoTools.dbtype", null, Locale.getDefault()));
    params.put("host", messageSource.getMessage("Gis.geoTools.host", null, Locale.getDefault()));
    params.put(
        "port",
        Integer.parseInt(messageSource.getMessage("Gis.geoTools.port", null, Locale.getDefault())));
    params.put(
        "schema", messageSource.getMessage("Gis.geoTools.schema", null, Locale.getDefault()));
    params.put(
        "database", messageSource.getMessage("Gis.geoTools.database", null, Locale.getDefault()));
    params.put("user", messageSource.getMessage("Gis.geoTools.user", null, Locale.getDefault()));
    params.put(
        "passwd", messageSource.getMessage("Gis.geoTools.passwd", null, Locale.getDefault()));
    return DataStoreFinder.getDataStore(params);
  }
}
