package egiskorea.com.job.fcrm.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.fcrm.service.FaciReseMng;
import egiskorea.com.job.fcrm.service.FaciReseMngChkVO;
import egiskorea.com.job.fcrm.service.FaciReseMngVO;
/**
 * @Description 시설예약관리 DAO
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
@Repository("faciReseMngDAO")
public class FaciReseMngDAO extends ComAbstractDAO{
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리  목록 조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectFaciReseMngList(FaciReseMngVO faciReseMngVO) throws Exception {
		return selectList("faciReseMng.selectFaciReseMngList", faciReseMngVO);
	}
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리  목록 갯수
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public int selectFaciReseMngListCnt(FaciReseMngVO faciReseMngVO) throws Exception {
		return (Integer)selectOne("faciReseMng.selectFaciReseMngListCnt", faciReseMngVO);
	}
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리  상세조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public FaciReseMng selectFaciReseMng(FaciReseMngVO faciReseMngVO) throws Exception {
		return (FaciReseMng) selectOne("faciReseMng.selectFaciReseMng", faciReseMngVO);
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 시설조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectFacilPhstrnList(FaciReseMngVO faciReseMngVO) throws Exception {
		return selectList("faciReseMng.selectFacilPhstrnList", faciReseMngVO);
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 시설보조명조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectFacilAsstnList(FaciReseMngVO faciReseMngVO) throws Exception {
		return selectList("faciReseMng.selectFacilAsstnList", faciReseMngVO);
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 시설상세정보조회
	 * @param faciReseMngVO
	 * @return list
	 * @throws Exception
	 */
	public List<?> selectFacilAsstnDtlList(FaciReseMngVO faciReseMngVO) throws Exception {
		return selectList("faciReseMng.selectFacilAsstnDtlList", faciReseMngVO);
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 등록
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	public int insertFaciReseMng(FaciReseMng faciReseMng) throws Exception {
		return insert("faciReseMng.insertFaciReseMng", faciReseMng);
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 수정
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	public int updateFaciReseMng(FaciReseMng faciReseMng) throws Exception {
		return update("faciReseMng.updateFaciReseMng", faciReseMng);
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 단일삭제
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	public int deleteFaciReseMng(FaciReseMng faciReseMng) throws Exception {
		return delete("faciReseMng.deleteFaciReseMng", faciReseMng);
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 등록용 중복체크
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	public int dubCheckFaciReseMngRegist(FaciReseMngVO faciReseMngVO) throws Exception {
		return (Integer)selectOne("faciReseMng.dubCheckFaciReseMngRegist", faciReseMngVO);
	};
	
	/** 
	 * 업무 > 시설관리 > 시설예약관리 수정용 중복체크
	 * @param faciReseMng
	 * @return list
	 * @throws Exception
	 */
	public int dubCheckFaciReseMngUpdate(FaciReseMngVO faciReseMngVO) throws Exception {
		return (Integer)selectOne("faciReseMng.dubCheckFaciReseMngUpdate", faciReseMngVO);
	}

	public int dubCheckFaciReseMngUpdate2(FaciReseMngChkVO faciReseMngChkVO) {
		return (Integer)selectOne("faciReseMng.dubCheckFaciReseMngUpdate2", faciReseMngChkVO);
	}
	
}