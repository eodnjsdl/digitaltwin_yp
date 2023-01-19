package egiskorea.com.lyr.lyi.service;

import java.io.Serializable;
import java.time.LocalDateTime;

import egovframework.com.cmm.ComDefaultVO;

/**
 * @Description 레이어 속성 model 클래스
 * @author 플랫폼개발부문 DT솔루션 김선옥
 * @since 2022.02.22
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.22		김선옥	최초 생성
 *      </pre>
 */

public class LayerAttribute extends ComDefaultVO implements Serializable {

	private static final long serialVersionUID = 7040942718277055227L;
	
	/** 레이어ID **/
	private int lyrId = 0;
	/** 속성ID **/
	private String atrbId = "";
	/** 속성명 **/
	private String atrbNm = "";
	/** 속성타입 **/
	private String atrbType = "";
	/** 속성길이 **/
	private int atrbLt = 0;
	/** 표출여부 **/
	private String eprssAt = "";
	/** 사용여부 **/
	private String useAt = "";
	/** 정렬순서 */
	private int sortOrdr = 0; 
	/** 최초등록일시 **/
	private String frstRegistDt = "";
	/** 최초등록자ID **/
	private String frstRegisterId = "";
	/** 최종수정일시 **/
	private String lastModfDt = "";
	/** 최종수정자ID **/
	private String lastUpdusrId = "";
	/** 속성명 배열 */
	private String[] atrbNmArr;
	/** 속성iD 배열 */
	private String[] atrbIdArr;
	/** 표출여부 */
	private String[] eprssAtArr;
	
	
	public int getLyrId() {
		return lyrId;
	}
	public void setLyrId(int lyrId) {
		this.lyrId = lyrId;
	}
	public String getAtrbId() {
		return atrbId;
	}
	public void setAtrbId(String atrbId) {
		this.atrbId = atrbId;
	}
	public String getAtrbNm() {
		return atrbNm;
	}
	public void setAtrbNm(String atrbNm) {
		this.atrbNm = atrbNm;
	}
	public String getAtrbType() {
		return atrbType;
	}
	public void setAtrbType(String atrbType) {
		this.atrbType = atrbType;
	}
	public int getAtrbLt() {
		return atrbLt;
	}
	public void setAtrbLt(int atrbLt) {
		this.atrbLt = atrbLt;
	}
	public String getEprssAt() {
		return eprssAt;
	}
	public void setEprssAt(String eprssAt) {
		this.eprssAt = eprssAt;
	}
	public String getUseAt() {
		return useAt;
	}
	public void setUseAt(String useAt) {
		this.useAt = useAt;
	}
	public int getSortOrdr() {
		return sortOrdr;
	}
	public void setSortOrdr(int sortOrdr) {
		this.sortOrdr = sortOrdr;
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
	public String[] getAtrbNmArr() {
		if(atrbNmArr!=null){
			String[] tempAtrbNmArr = new String[atrbNmArr.length];
			System.arraycopy(atrbNmArr, 0, tempAtrbNmArr, 0, atrbNmArr.length);
			return tempAtrbNmArr;
		}else{
			return null;
		}
	}
	public void setAtrbNmArr(String[] atrbNmArr) {
		if(atrbNmArr!=null){
			this.atrbNmArr = new String[atrbNmArr.length];
			System.arraycopy(atrbNmArr, 0, this.atrbNmArr, 0, atrbNmArr.length);
		}else{
			this.atrbNmArr = null;
		}
	}
	public String[] getAtrbIdArr() {
		if(atrbIdArr!=null){
			String[] tempAtrbIdArr = new String[atrbIdArr.length];
			System.arraycopy(atrbIdArr, 0, tempAtrbIdArr, 0, atrbIdArr.length);
			return tempAtrbIdArr;
		}else{
			return null;
		}
	}
	public void setAtrbIdArr(String[] atrbIdArr) {
		if(atrbIdArr!=null){
			this.atrbIdArr = new String[atrbIdArr.length];
			System.arraycopy(atrbIdArr, 0, this.atrbIdArr, 0, atrbIdArr.length);
		}else{
			this.atrbIdArr = null;
		}
	}
	public String[] getEprssAtArr() {
		if(eprssAtArr!=null){
			String[] tempEprssAtArr = new String[eprssAtArr.length];
			System.arraycopy(eprssAtArr, 0, tempEprssAtArr, 0, eprssAtArr.length);
			return tempEprssAtArr;
		}else{
			return null;
		}
	}
	public void setEprssAtArr(String[] eprssAtArr) {
		if(eprssAtArr!=null){
			this.eprssAtArr = new String[eprssAtArr.length];
			System.arraycopy(eprssAtArr, 0, this.eprssAtArr, 0, eprssAtArr.length);
		}else{
			this.eprssAtArr = null;
		}
	}
	
}
	
