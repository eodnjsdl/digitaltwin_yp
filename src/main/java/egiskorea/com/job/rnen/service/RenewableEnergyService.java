package egiskorea.com.job.rnen.service;

import java.util.List;
import java.util.Map;

/**
 * @Description 신재생에너지 service 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2021.12.30
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.30   전영후            최초 생성
 *  </pre>
 */

public interface RenewableEnergyService {
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 목록조회
	 * @param renewableEnergyVO
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectRenewableEnergyList(RenewableEnergyVO renewableEnergyVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 등록
	 * @param renewableEnergy
	 * @return
	 * @throws Exception
	 */
	public int insertRenewableEnergy(RenewableEnergy renewableEnergy) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 상세조회
	 * @param renewableEnergyVO
	 * @return
	 * @throws Exception
	 */
	public RenewableEnergy selectRenewableEnergy(RenewableEnergyVO renewableEnergyVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 수정
	 * @param renewableEnergy
	 * @return 
	 * @throws Exception
	 */
	public int updateRenewableEnergy(RenewableEnergy renewableEnergy) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 단일삭제
	 * @param renewableEnergy
	 * @return 
	 * @throws Exception
	 */
	public int deleteRenewableEnergy(RenewableEnergy renewableEnergy) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 엑셀용 목록조회
	 * @param renewableEnergyVO
	 * @return list
	 * @throws Exception
	 */
	public List<RenewableEnergyVO> selectRenewableEnergyExcelList(RenewableEnergyVO renewableEnergyVO) throws Exception;
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 속성검색용 사업구분 조회
	 * @param renewableEnergyVO
	 * @return list
	 * @throws Exception
	 */
	public Map<String, Object> selectRenewalbeEnergyBsnsSeList(RenewableEnergyVO renewableEnergyVO) throws Exception;
	
}
