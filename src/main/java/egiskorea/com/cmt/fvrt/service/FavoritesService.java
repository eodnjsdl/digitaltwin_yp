package egiskorea.com.cmt.fvrt.service;

import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 즐겨찾기를 관리하는 service 클래스
 * @author 오윤성
 * @since 2021.01.04
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.01.04   오윤성           최초 생성
 *  </pre>
 */

public interface FavoritesService {

	/**
	 * 즐겨찾기 목록
	 * @param FavoritesVO
	 * @return Map<String, Object>
	 */
	public Map<String, Object> selectFavoritesList(FavoritesVO favoritesVO);
	
	/**
	 * 즐겨찾기 상세조회
	 * @param FavoritesVO
	 * @return EgovMap
	 */
	public EgovMap selectFavoritesView(FavoritesVO favoritesVO);
	
	/**
	 * 즐겨찾기 등록
	 * @param FavoritesVO
	 * @throws Exception
	 */
	public void insertFavorites(FavoritesVO favoritesVO) throws Exception;
	
	/**
	 * 즐겨찾기 수정
	 * @param FavoritesVO
	 * @throws Exception
	 */
	public void updateFavorites(FavoritesVO favoritesVO) throws Exception;
	
	/**
	 * 즐겨찾기 삭제
	 * @param FavoritesVO
	 * @throws Exception
	 */
	public void deleteFavorites(FavoritesVO favoritesVO) throws Exception;


	/**
	 * 기본정보 호출.
	 * @param FavoritesVO
	 * @throws Exception
	 */
	public EgovMap selectBaseFavorites(FavoritesVO favoritesVO) throws Exception;


	/**
	 * 기본정보 업데이트.
	 * @param favoritesVO
	 */
	public void updateBass(FavoritesVO favoritesVO);


}
