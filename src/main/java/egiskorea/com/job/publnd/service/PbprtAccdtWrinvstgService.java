/***********************************
* 공유재산 실태조사서 Service
* @author  : 이혜인
* @since   : 2023.03.05
* @version : 1.0
************************************/
package egiskorea.com.job.publnd.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface PbprtAccdtWrinvstgService {
	/** 공유재산 실태조사서 한글 다운로드 */
	public void downloadWrinvstgToHwpFile(PbprtAccdtWrinvstgVO pbprtAccdtWrinvstgVO, HttpServletRequest request, HttpServletResponse response) throws Exception;
}
