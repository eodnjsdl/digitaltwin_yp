/**
 * 
 */
package egiskorea.com.cmm.service;

import egovframework.com.cmm.service.EgovProperties;

/**
 * @Description 시스템 구동 시 프로퍼티를 통해 사용될 전역변수를 정의.
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.02.07
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.07		이상화	최초 생성
 *  </pre>
 */

public class Globals {
	
    // progress 파일 경로 
    public static final String SERVER_PATH = EgovProperties.getProperty("Globals.file.server.path");
    
    // progress 파일 url
    public static final String SERVER_URL = EgovProperties.getProperty("Globals.file.url");
    
    // CSV DB NAME 
    public static final String CSV_DB_NAME = EgovProperties.getProperty("Globals.csv.dbName");
    
    // CSV TABLE NAME 
    public static final String CSV_TB_NAME = EgovProperties.getProperty("Globals.csv.tbName");
    
    // kras proxy url
    public static final String KRAS_PROXY_URL = EgovProperties.getProperty("kras.proxy.url");
    
    // kras adm sect cd
    public static final String KRAS_SECT_CD = EgovProperties.getProperty("kras.adm.sect.cd");
    
    // kras conn sys id
    public static final String KRAS_SYS_ID = EgovProperties.getProperty("kras.conn.sys.id");
    
    // 공공데이터포털 service key
    public static final String SERVICE_KEY = EgovProperties.getProperty("Globals.serviceKey");
    
    // geoserver id
    public static final String GEO_ID = EgovProperties.getProperty("geoserver.id");
    
    // geoserver pw
    public static final String GEO_PW = EgovProperties.getProperty("geoserver.pw");
}
