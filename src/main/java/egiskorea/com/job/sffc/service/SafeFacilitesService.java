package egiskorea.com.job.sffc.service;

import java.util.List;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface SafeFacilitesService {

	public List<EgovMap> selectWtlList(SafeFacilitesVO vo);
	
	public int selectWtlCnt(SafeFacilitesVO vo);
}
