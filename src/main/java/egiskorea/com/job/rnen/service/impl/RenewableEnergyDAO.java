package egiskorea.com.job.rnen.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.rnen.service.RenewableEnergy;
import egiskorea.com.job.rnen.service.RenewableEnergyVO;

/**
 * @Description 신재생에너지 dao 클래스
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
@Repository("renewableEnergyDAO")
public class RenewableEnergyDAO extends ComAbstractDAO {
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 목록 조회
	 * @param renewableEnergyVO
	 * @return
	 * @throws Exception
	 */
	public List<?> selectRenewableEnergyList(RenewableEnergyVO renewableEnergyVO) throws Exception {
		return selectList("renewableEnergy.selectRenewableEnergyList", renewableEnergyVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 목록 갯수
	 * @param renewableEnergyVO
	 * @return
	 * @throws Exception
	 */
	public int selectRenewableEnergyListCnt(RenewableEnergyVO renewableEnergyVO) throws Exception {
		return (Integer)selectOne("renewableEnergy.selectRenewableEnergyListCnt", renewableEnergyVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 등록
	 * @param renewableEnergy
	 * @return
	 * @throws Exception
	 */
	public int insertRenewableEnergy(RenewableEnergy renewableEnergy) throws Exception {
		return insert("renewableEnergy.insertRenewableEnergy", renewableEnergy);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 상세조회
	 * @param renewableEnergyVO
	 * @return
	 * @throws Exception
	 */
	public RenewableEnergy selectRenewableEnergy(RenewableEnergyVO renewableEnergyVO) throws Exception {
		return (RenewableEnergy) selectOne("renewableEnergy.selectRenewableEnergy", renewableEnergyVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 수정
	 * @param renewableEnergy
	 * @return 
	 * @throws Exception
	 */
	public int updateRenewableEnergy(RenewableEnergy renewableEnergy) throws Exception {
		return update("renewableEnergy.updateRenewableEnergy", renewableEnergy);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 단일삭제
	 * @param renewableEnergy
	 * @return 
	 * @throws Exception
	 */
	public int deleteRenewableEnergy(RenewableEnergy renewableEnergy) throws Exception {
		return delete("renewableEnergy.deleteRenewableEnergy", renewableEnergy);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 엑셀용 목록조회
	 * @param renewableEnergyVO
	 * @return list
	 * @throws Exception
	 */
	public List<RenewableEnergyVO> selectRenewableEnergyExcelList(RenewableEnergyVO renewableEnergyVO) throws Exception {
		return selectList("renewableEnergy.selectRenewableEnergyExcelList", renewableEnergyVO);
	}
	
	/** 
	 * 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 속성검색용 사업구분 조회
	 * @param renewableEnergyVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectRenewalbeEnergyBsnsSeList(RenewableEnergyVO renewableEnergyVO) throws Exception {
		return selectList("renewableEnergy.selectRenewalbeEnergyBsnsSeList", renewableEnergyVO);
	}
}
