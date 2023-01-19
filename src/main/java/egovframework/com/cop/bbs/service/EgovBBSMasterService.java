package egovframework.com.cop.bbs.service;

import java.util.Map;

public interface EgovBBSMasterService {

	Map<String, Object> selectNotUsedBdMstrList(BoardMasterVO boardMasterVO);

	void deleteBBSMasterInf(BoardMaster boardMaster);

	void updateBBSMasterInf(BoardMaster boardMaster) throws Exception;

	BoardMasterVO selectBBSMasterInf(BoardMasterVO boardMasterVO) throws Exception;

	Map<String, Object> selectBBSMasterInfs(BoardMasterVO boardMasterVO);
	
	void insertBBSMasterInf(BoardMaster boardMaster) throws Exception;

}
