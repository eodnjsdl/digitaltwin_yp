package egiskorea.com.job.tfan.brin.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class TbdBusRouteStationVO implements Serializable{
	
	/** route 아이디 */
	private int routeid;
	
	/** station 아이디 */
	private int stationid;
	
	/** station 번호 */
	private int stationseq;
	
	/** station 이름 */
	private String stationname;
	
	/** mobile 번호 */
	private int mobileno;
	
	/** 지역이름 */
	private String regionname;
	
	/** district 번호 */
	private int districtcd;
	
	/** center 여부 */
	private boolean centeryn;
	
	/** turn 여부 */
	private boolean turnyn;
	
	/** x 좌표 */
	private double x;
	
	/** y 좌표 */
	private double y;

	public int getRouteid() {
		return routeid;
	}

	public void setRouteid(int routeid) {
		this.routeid = routeid;
	}

	public int getStationid() {
		return stationid;
	}

	public void setStationid(int stationid) {
		this.stationid = stationid;
	}

	public int getStationseq() {
		return stationseq;
	}

	public void setStationseq(int stationseq) {
		this.stationseq = stationseq;
	}

	public String getStationname() {
		return stationname;
	}

	public void setStationname(String stationname) {
		this.stationname = stationname;
	}

	public int getMobileno() {
		return mobileno;
	}

	public void setMobileno(int mobileno) {
		this.mobileno = mobileno;
	}

	public String getRegionname() {
		return regionname;
	}

	public void setRegionname(String regionname) {
		this.regionname = regionname;
	}

	public int getDistrictcd() {
		return districtcd;
	}

	public void setDistrictcd(int districtcd) {
		this.districtcd = districtcd;
	}

	public boolean isCenteryn() {
		return centeryn;
	}

	public void setCenteryn(boolean centeryn) {
		this.centeryn = centeryn;
	}

	public boolean isTurnyn() {
		return turnyn;
	}

	public void setTurnyn(boolean turnyn) {
		this.turnyn = turnyn;
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}

}
