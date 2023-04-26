package egiskorea.com.job.fcrm.service;

import java.io.Serializable;

/**
 * @Description 시설예약관리 VO 
 * @author 플랫폼개발부문 DT플랫폼 이푸름
 * @since 2022.01.27
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.27		이푸름	최초 생성
 *  2022.02.11		전영후	2차  작성
 *  </pre>
 */

@SuppressWarnings("serial")
public class FaciReseMngChkVO extends FaciReseMngVO	implements Serializable{
	
	/** 예약자명 */
	private String rsvctmNm;
	
	/** 예약자연락처 */
	private String rsvctmCttpc;
	
	/** 사용비용 */
	private int useCt;
	
	/** 비고 */
	private String rm;

	public String getRsvctmNm() {
		return rsvctmNm;
	}

	public void setRsvctmNm(String rsvctmNm) {
		this.rsvctmNm = rsvctmNm;
	}

	public String getRsvctmCttpc() {
		return rsvctmCttpc;
	}

	public void setRsvctmCttpc(String rsvctmCttpc) {
		this.rsvctmCttpc = rsvctmCttpc;
	}

	public int getUseCt() {
		return useCt;
	}

	public void setUseCt(int useCt) {
		this.useCt = useCt;
	}

	public String getRm() {
		return rm;
	}

	public void setRm(String rm) {
		this.rm = rm;
	}
	
}