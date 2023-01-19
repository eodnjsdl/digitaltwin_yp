package egiskorea.com.cmt.dron.service;

import egiskorea.com.cmt.pti.service.PotoInfoVO;
import egovframework.com.cmm.service.FileVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

import java.util.HashMap;
import java.util.Map;


/**
 * @Description 드론정보를 관리하는 service 클래스
 * @author 배윤성
 * @since 2022.01.20
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.20   배윤성           최초 생성
 *  </pre>
 */
public interface DronInfoService {
    /**
     * 드론 정보 목록
     * @param
     * @return
     */
    public Map<String, Object> selectDronInfoList(DronInfoVO dronInfoVO);


    /**
     * 드론정보 상세조회
     * @param dronInfoVO
     * @return
     */
    public EgovMap selectDronInfoView(DronInfoVO dronInfoVO);

    /**
     * 드론 영상 등록
     * @param dronInfoVO
     */
    public void insertDronInfo(DronInfoVO dronInfoVO) throws Exception;




    /**
     * 드론영상 삭제
     */
    public void deleteDronInfo(DronInfoVO dronInfoVOVO) throws Exception;


    /**
     * 드론영상 내용수정.
     * @param fvo
     * @throws Exception
     */
    public void updateFileDetail(FileVO fvo) throws Exception;

    /**
     * 드론 영상 수정
     * @param dronInfoVOVO
     */
    void updateDronInfo(DronInfoVO dronInfoVOVO) throws Exception;


	/**
	 * @Description  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.05.02
	 * @param dronInfoVO
	 * @return
	 */
	public String selectLastModfDt(DronInfoVO dronInfoVO);
	
	/**
	 * @Description  
	 * @Author 플랫폼개발부문 DT솔루션 정상혁
	 * @Date 2022.05.02
	 * @param dronInfoVO
	 * @return
	 */
	public String selectSubject(DronInfoVO dronInfoVO);




}
