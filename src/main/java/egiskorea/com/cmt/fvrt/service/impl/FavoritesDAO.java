package egiskorea.com.cmt.fvrt.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.cmt.fvrt.service.FavoritesVO;
import egiskorea.com.cmt.pti.service.PotoInfoVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 즐겨찾기를 관리하는 dao 클래스
 * @author 배윤성
 * @since 2022.02.16
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.16   배윤성           기본정보 추가.
 *  </pre>
 */

@Repository("favoritesDAO")
public class FavoritesDAO extends ComAbstractDAO{

	/**
	 * 즐겨찾기 목록
	 * @param favoritesVO
	 * @return list
	 */
	public List<?> selectFavoritesList(FavoritesVO favoritesVO) {
		return selectList("favorites.selectFavoritesList", favoritesVO);
	}
	
	/**
	 * 즐겨찾기 목록 cnt
	 * @param favoritesVO
	 * @return int
	 */
	public int selectFavoritesListCnt(FavoritesVO favoritesVO) {
		return (Integer)selectOne("favorites.selectFavoritesListCnt", favoritesVO);
	}
	
	/**
	 * 즐겨찾기 상세조회
	 * @param favoritesVO
	 * @return EgovMap
	 */
	public EgovMap selectFavoritesView(FavoritesVO favoritesVO) {
		return (EgovMap) selectOne("favorites.selectFavoritesView", favoritesVO);
	}
	
	/**
	 * 즐겨찾기 등록
	 * @param favoritesVO
	 * @throws Exception
	 */
	public void insertFavorites(FavoritesVO favoritesVO) throws Exception {
		insert("favorites.insertFavorites", favoritesVO);
	}
	
	/**
	 * 즐겨찾기 수정
	 * @param favoritesVO
	 * @throws Exception
	 */
	public void updateFavorites(FavoritesVO favoritesVO) throws Exception {
		update("favorites.updateFavorites", favoritesVO);
	}
	
	/**
	 * 즐겨찾기 삭제
	 * @param favoritesVO
	 * @throws Exception
	 */
	public void deleteFavorites(FavoritesVO favoritesVO) throws Exception {
		update("favorites.deleteFavorites", favoritesVO);
	}


	/**
	 * 즐겨찾기 상세조회
	 * @param favoritesVO
	 * @return EgovMap
	 */
	public EgovMap selectBaseFavorites(FavoritesVO favoritesVO) {
		return (EgovMap) selectOne("favorites.selectBaseFavorites", favoritesVO);
	}

	/**
	 * 기본 제거.
	 */
	public void updateBass(FavoritesVO favoritesVO) {
		update("favorites.updateBass", favoritesVO);
	}
}
