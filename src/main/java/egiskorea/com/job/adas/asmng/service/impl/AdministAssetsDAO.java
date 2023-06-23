package egiskorea.com.job.adas.asmng.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.adas.asmng.service.AdministAssetsVO;

/**
 * @Description 행정자산관리 dao 클래스
 * @since 2023.05.24
 * @version 1.0
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.24   백승석            최초 생성
 *  </pre>
 */

@Repository("administAssetsDAO")
public class AdministAssetsDAO extends ComAbstractDAO {
	
	@Autowired
	@Qualifier("sqlSessionTemplateBATCH")
	private SqlSessionTemplate sqlSessionTemplateBatch;
	
	
	/**
	 * 행정자산관리 전체 조회
	 * @param administAssetsVO
	 * @return
	 */
	public List<AdministAssetsVO> selectAdministAssetsInfoList(AdministAssetsVO administAssetsVO) {
		return selectList("administAssetsMng.selectAdministAssetsInfoList", administAssetsVO);
	}
	
	/**
	 * 행정자산관리 전체 개수 조회
	 * @return
	 */
	public int selectAdministAssetsTotCnt() {
		return selectOne("administAssetsMng.selectAdministAssetsTotCnt");
	}
	
	/**
	 * 행정자산관리 연도 목록 조회
	 * @return
	 */
	public List<String> selectAdministAssetsYearList() {
		return selectList("administAssetsMng.selectAdministAssetsYearList");
	}
	
	/**
	 * CSV 업로드
	 * @param administAssetsList
	 * @return
	 */
	public int insertAdministAssetsInfoByCSV(List<AdministAssetsVO> administAssetsList) {
		int result = 0;
		SqlSession sqlSession = sqlSessionTemplateBatch.getSqlSessionFactory().openSession(ExecutorType.BATCH);
		try {
			sqlSession.insert("administAssetsMng.insertAdministAssetsInfoByCSV", administAssetsList);
			result++;
		} catch (Exception e) {
			e.getMessage();
		} finally {
			sqlSession.flushStatements();
//			sqlSession.clearCache();
			sqlSession.close();
		}
		
		return result;
	}
	
	/**
	 * CSV 업로드 - 동일 연도일 때 삭제
	 * @param administAssetsVO
	 * @return
	 * @throws SQLException
	 * @throws Exception
	 */
	public int deleteAdministAssetsInfo(AdministAssetsVO administAssetsVO) throws SQLException, Exception {
		return delete("administAssetsMng.deleteAdministAssetsInfo", administAssetsVO);
	}
}
