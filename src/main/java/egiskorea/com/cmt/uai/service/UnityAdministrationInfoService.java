/**
 * 
 */
package egiskorea.com.cmt.uai.service;

import java.io.File;
import java.util.HashMap;

/**
 * @Description 통합행정정보를 관리하는 service 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.03.07
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.07		이상화	최초 생성
 *  </pre>
 */

public interface UnityAdministrationInfoService {

	/**
	 * @Description pnu를 통해 주소정보 조회 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.03.07
	 * @param unityAdministrationInfoVO
	 * @return
	 */
	public UnityAdministrationInfoVO getAddrByPnu(UnityAdministrationInfoVO unityAdministrationInfoVO);

	/**
	 * @Description kras에 주소를 통해 요청
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.21
	 * @param param 쿼리스트링 형태로 값을 던진다. 예) conn_svc_id=KRAS000038&adm_sect_cd=41830&conn_sys_id=4BHH-YN9K-SFC1-XTFV&layer_cd=LSMD_CONT_LDREG
	 * @param file File()객체
	 * @return 성공:true, 실패:false
	 */
	public boolean krasURLConnectionShpDownload(String param, File file);

	/**
	 * @Description shp파일을 postgreSql ogr2ogr를 이용하여 디비로 삽입 해주는 매소드
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.21
	 * @param shpFullPath shp파일 전체경로
	 * @param nlt 지오메트리 유형
	 * @param tableName shp파일이 들어갈 테이블 이름
	 * @param originalEPSG shp파일 좌표계 값
	 * @param changeEPSG db에 들어갈때 변환되어야 할 좌표계 값
	 */
	public void shpToPostgres(String shpFullPath, String nlt, String tableName, String originalEPSG, String changeEPSG);
}
