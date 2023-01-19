package egiskorea.com.cmt.uai.service.impl;

import javax.annotation.Resource;
import egiskorea.com.cmm.service.CmmUtils;

import egiskorea.com.cmm.service.Globals;
import egovframework.com.cmm.service.EgovProperties;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import egiskorea.com.cmt.uai.service.UnityAdministrationInfoService;
import egiskorea.com.cmt.uai.service.UnityAdministrationInfoVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import java.io.*;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @Description 통합행정정보를 관리하는 serviceImpl 클래스
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

@Service("unityAdministrationInfoService")
public class UnityAdministrationInfoServiceImpl extends EgovAbstractServiceImpl implements UnityAdministrationInfoService{

	private static final Logger LOGGER = LoggerFactory.getLogger(UnityAdministrationInfoServiceImpl.class);

	@Resource(name="unityAdministrationInfoDAO")
	private UnityAdministrationInfoDAO unityAdministrationInfoDAO;
	
	/**
	 * @Description pnu를 통해 주소정보 조회 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.03.07
	 * @param unityAdministrationInfoVO
	 * @return
	 */
	public UnityAdministrationInfoVO getAddrByPnu(UnityAdministrationInfoVO unityAdministrationInfoVO) {
		return unityAdministrationInfoDAO.getAddrByPnu(unityAdministrationInfoVO);
	}

	/**
	 * @Description kras에 주소를 통해 요청
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.21
	 * @param param 쿼리스트링 형태로 값을 던진다. 예) conn_svc_id=KRAS000038&adm_sect_cd=41830&conn_sys_id=4BHH-YN9K-SFC1-XTFV&layer_cd=LSMD_CONT_LDREG
	 * @param file File()객체
	 * @return 성공:true, 실패:false
	 */
	public boolean krasURLConnectionShpDownload(String param, File file) {
		boolean result = false;
		try {
			URL url = new URL(Globals.KRAS_PROXY_URL + "?" + param);

			System.out.println("kras 요청 url : " + Globals.KRAS_PROXY_URL + "?" + param);
			try {
				ReadableByteChannel rbc = Channels.newChannel(url.openStream());
				FileOutputStream fos = new FileOutputStream(file);
				fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE); // 처음부터 끝까지 다운로드
				fos.close();

				if (file.isFile() && file.exists()) {
					LOGGER.info("=====================KRAS(부동산공부시스템) " + file.getName() + " 파일 다운로드 성공=====================");
					result = true; //파일이 존재 할 경우에만 성공 코드를 넣어줌.
				} else {
					LOGGER.info("=====================KRAS(부동산공부시스템) " + file.getName() + " 파일 다운로드 실패(2)=====================");
				}
			} catch (Exception e) {
				LOGGER.info("=====================KRAS(부동산공부시스템) " + file.getName() + " 파일 다운로드 실패(1)=====================");
				LOGGER.debug(e.getMessage(), e);
			}
		} catch (IOException e) {
			LOGGER.info("=====================KRAS(부동산공부시스템) 연결 실패(1)=====================");
			LOGGER.debug(e.getMessage(), e);
		}

		return result;
	}

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
	public void shpToPostgres(String shpFullPath, String nlt, String tableName, String originalEPSG, String changeEPSG) {
		//hashMap 결과로 (host, port, dbName, dbUser, dbPwd)를 받아올 수 있다.
		HashMap<String, String> databases = CmmUtils.databases();
		Process process = null;
		BufferedReader successBufferReader = null; // 성공 버퍼
		BufferedReader errorBufferReader = null; // 오류 버퍼
		String ogr2ogr = "ogr2ogr";

				//명령어 세팅
		List<String> command = new ArrayList<String>();
		if (System.getProperty("os.name").indexOf("Windows") > -1) { //윈도우 일경우
			command.add("cmd.exe");
			command.add("/c");
			ogr2ogr = EgovProperties.getProperty("Globals.install.path") + "ogr2ogr";
		} else { //리눅스 일경우
			command.add("/bin/sh");
			command.add("-c");
		}

		String cmd = ogr2ogr + " -f PostgresSQL PG:\"dbname=" + databases.get("dbName") + " host='" + databases.get("host") + "' port=" + databases.get("port") + " user='" + databases.get("dbUser") + "' password='" + databases.get("dbPwd") + "'\" " +
				shpFullPath + " " +
				"-nlt " + nlt + " " +
				"-nln " + tableName + " " +
				"-s_srs " + originalEPSG + " " +
				"-t_srs " + changeEPSG + " " +
				"-lco GEOMETRY_NAME=geom " +
				"-lco FID=gid " +
				"-update -overwrite --config SHAPE_ENCODING \"CP949\""; //외부에서 실행시킬
		// 명령어 셋팅
		command.add(cmd);

		LOGGER.info("커맨드 실행 명령어 : " + command.toString());

		try {
			//명령어 실행
			ProcessBuilder processBuilder = new ProcessBuilder().command(command);
			process = processBuilder.start();

			//정상 동작했을 경우
			successBufferReader = new BufferedReader(new InputStreamReader(process.getInputStream(), "EUC-KR"));
			String success = IOUtils.toString(successBufferReader);

			//에러가 발생했을 경우
			errorBufferReader = new BufferedReader(new InputStreamReader(process.getErrorStream(), "EUC-KR"));
			String error = IOUtils.toString(errorBufferReader);

			int exitCode = process.waitFor();
			if (process.exitValue() == 0) { //정상적으로 종료됬을 경우
				LOGGER.info("=====================command 실행 성공=====================");
				LOGGER.info("실행결과 : " + success);
			} else {
				LOGGER.info("=====================command 비정상 종료=====================");
				LOGGER.info("실행결과 : " + success);
			}

			if (StringUtils.isNotEmpty(error)) {
				LOGGER.info("=====================command 실행 에러=====================");
				LOGGER.info("실행결과 : " + error);
			}
		} catch (IOException e) {
			LOGGER.info("=====================실행 실패(1)=====================");
			LOGGER.debug(e.getMessage(), e);
		} catch (InterruptedException e) {
			LOGGER.info("=====================실행 실패(2)=====================");
			LOGGER.debug(e.getMessage(), e);
		} catch (Exception e) {
			LOGGER.info("=====================실행 실패(3)=====================");
			LOGGER.debug(e.getMessage(), e);
			try {
				process.destroy();
				if (successBufferReader != null) successBufferReader.close();
				if (errorBufferReader != null) errorBufferReader.close();
			} catch (IOException e1) {
				LOGGER.info("=====================실행 실패(4)=====================");
				LOGGER.debug(e.getMessage(), e1);
			}
		}
	}
}
