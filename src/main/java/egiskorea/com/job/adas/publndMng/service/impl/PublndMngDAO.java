package egiskorea.com.job.adas.publndMng.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.adas.asmng.service.AdministAssetsVO;
import egiskorea.com.job.adas.publnd.service.PbprtAccdtVO;
import egiskorea.com.job.adas.publndMng.service.PublndMngVO;

@Repository("publndMngDAO")
public class PublndMngDAO extends ComAbstractDAO {
	
	/**
	 * 공유지 전체 조회 - 행정자산관리 테이블 이용
	 * @param administAssetsVO
	 * @return
	 */
	public List<AdministAssetsVO> selectPublndInfoList(PublndMngVO publndMngVO) {
		return selectList("publndMng.selectPublndInfoList", publndMngVO);
	}
	
	/**
	 * 공유지 전체 개수 조회 - 행정자산관리 테이블 이용
	 * @param administAssetsVO
	 * @return
	 */
	public int selectPublndInfoListTotalCnt(PublndMngVO publndMngVO) {
		return selectOne("publndMng.selectPublndInfoListTotalCnt", publndMngVO);
	}
	
	/**
	 * 공유지관리 목록 조회
	 * @param publndMngVO
	 * @return
	 */
	public List<PublndMngVO> selectPublndPnuInfoList(PublndMngVO publndMngVO) {
		return selectList("publndMng.selectPublndPnuInfoList", publndMngVO);
	}
	
	/**
	 * 공유지관리 연도 목록 조회
	 * @return
	 */
	public List<String> selectPublndMngYearList() {
		return selectList("publndMng.selectPublndMngYearList");
	}
	
}
