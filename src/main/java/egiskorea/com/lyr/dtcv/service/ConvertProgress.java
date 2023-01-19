/**
 * 
 */
package egiskorea.com.lyr.dtcv.service;

import java.io.Serializable;

/**
 * @Description 가공 진행율 model 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.02.08
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.08		이상화	최초 생성
 *  </pre>
 */

public class ConvertProgress implements Serializable{

	private static final long serialVersionUID = 1952908136744103682L;
	
	/** 프로그레스 인덱스 */
	private int pid;
	
	/** 데이터 ID */
	private int dataid;
	
	/** 어플리케이션 ID */
	private int appid;
	
	/** 컨버터워커 ID */
	private int wcid;
	
	/** job Id */
	private String jobId;
	
	/** 진행율 */
	private String progress;
	
	/** 상태 */
	private String status;
	
	/** 에러 메세지 */
	private String errorMsg;
	
	/** 등록일 */
	private String regDate;
	
	/** 경도 */
	private String lon;
	
	/** 위도 */
	private String lat;

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public int getDataid() {
		return dataid;
	}

	public void setDataid(int dataid) {
		this.dataid = dataid;
	}

	public int getAppid() {
		return appid;
	}

	public void setAppid(int appid) {
		this.appid = appid;
	}

	public int getWcid() {
		return wcid;
	}

	public void setWcid(int wcid) {
		this.wcid = wcid;
	}

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getProgress() {
		return progress;
	}

	public void setProgress(String progress) {
		this.progress = progress;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public String getRegDate() {
		return regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public String getLon() {
		return lon;
	}

	public void setLon(String lon) {
		this.lon = lon;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}
	
	

}
