package egiskorea.com.geo.com.service;

import java.io.IOException;

import org.geotools.data.DataStore;

 /**
 * @Description GeoTools 서비스 인터페이스 
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

public interface GeoToolsService {
	
	/**
	 * 
	 * @Description : 데이터 저장소 가져오기 
	 * @Author 최원석
	 * @Date 2022.01.30
	 * @return
	 * @throws IOException
	 */
	public DataStore getDataStore() throws IOException;
	
}
