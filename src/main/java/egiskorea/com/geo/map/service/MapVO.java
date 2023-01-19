package egiskorea.com.geo.map.service;

import java.io.Serializable;

/**
 * @Description 사용자 지도 설정을 관리하는 vo 클래스
 * @author SI사업부문 개발그룹 정수환
 * @since 2022.03.23
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.23   정수환           최초 생성
 *  </pre>
 */

public class MapVO implements Serializable{

	private static final long serialVersionUID = -8135706392237840006L;
	
	/** 사용자 아이디 */
	private String userId = "";
	
	/** 수직폴리곤 두께 */
	private int vertclPynThick = 0;
	
	/** 수직폴리곤 높이 */
	private int vertclPynHeight = 0;
	
	/** 수직폴리곤 red color */
	private int vertclPynColorR = 0;
	
	/** 수직폴리곤 green color */
	private int vertclPynColorG = 0;
	
	/** 수직폴리곤 blue color */
	private int vertclPynColorB = 0;
	
	/** 지형투명도 */
	private int tpgrphTrnsprc = 0;
	
	/** 영상품질레벨 */
	private double vidoQlityLevel = 0;
	
	/** 최초등록일시 */
	private String frstRegistDt = "";
	
	/** 최초등록자ID */
	private String frstRegisterId = "";
	
	/** 최종수정일시 */
	private String lastModfDt = "";
	
	/** 최종수정자ID */
	private String lastUpdusrId = "";

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getVertclPynThick() {
		return vertclPynThick;
	}

	public void setVertclPynThick(int vertclPynThick) {
		this.vertclPynThick = vertclPynThick;
	}

	public int getVertclPynHeight() {
		return vertclPynHeight;
	}

	public void setVertclPynHeight(int vertclPynHeight) {
		this.vertclPynHeight = vertclPynHeight;
	}

	public int getVertclPynColorR() {
		return vertclPynColorR;
	}

	public void setVertclPynColorR(int vertclPynColorR) {
		this.vertclPynColorR = vertclPynColorR;
	}

	public int getVertclPynColorG() {
		return vertclPynColorG;
	}

	public void setVertclPynColorG(int vertclPynColorG) {
		this.vertclPynColorG = vertclPynColorG;
	}

	public int getVertclPynColorB() {
		return vertclPynColorB;
	}

	public void setVertclPynColorB(int vertclPynColorB) {
		this.vertclPynColorB = vertclPynColorB;
	}

	public int getTpgrphTrnsprc() {
		return tpgrphTrnsprc;
	}

	public void setTpgrphTrnsprc(int tpgrphTrnsprc) {
		this.tpgrphTrnsprc = tpgrphTrnsprc;
	}

	public double getVidoQlityLevel() {
		return vidoQlityLevel;
	}

	public void setVidoQlityLevel(double vidoQlityLevel) {
		this.vidoQlityLevel = vidoQlityLevel;
	}

	public String getFrstRegistDt() {
		return frstRegistDt;
	}

	public void setFrstRegistDt(String frstRegistDt) {
		this.frstRegistDt = frstRegistDt;
	}

	public String getFrstRegisterId() {
		return frstRegisterId;
	}

	public void setFrstRegisterId(String frstRegisterId) {
		this.frstRegisterId = frstRegisterId;
	}

	public String getLastModfDt() {
		return lastModfDt;
	}

	public void setLastModfDt(String lastModfDt) {
		this.lastModfDt = lastModfDt;
	}

	public String getLastUpdusrId() {
		return lastUpdusrId;
	}

	public void setLastUpdusrId(String lastUpdusrId) {
		this.lastUpdusrId = lastUpdusrId;
	}

}
