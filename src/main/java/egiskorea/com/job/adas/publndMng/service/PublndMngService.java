package egiskorea.com.job.adas.publndMng.service;

import java.util.List;

import egiskorea.com.job.adas.asmng.service.AdministAssetsVO;

public interface PublndMngService {
	
	/**
	 * 공유지 전체 조회 - 행정자산관리 테이블 이용
	 * @param administAssetsVO
	 * @return
	 */
	public List<AdministAssetsVO> selectPublndInfoList(PublndMngVO publndMngVO);
	
	/**
	 * 공유지 전체 개수 조회 - 행정자산관리 테이블 이용
	 * @param administAssetsVO
	 * @return
	 */
	public int selectPublndInfoListTotalCnt(PublndMngVO publndMngVO);
	
	/**
	 * 공유지관리 목록 조회
	 * @param publndMngVO
	 * @return
	 */
	public List<PublndMngVO> selectPublndPnuInfoList(PublndMngVO publndMngVO);
	
	/**
	 * 공유지관리 연도 목록 조회
	 * @return
	 */
	public List<String> selectPublndMngYearList();
	
}
