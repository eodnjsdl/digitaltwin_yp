package egiskorea.com.cmt.fvrt.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.cmt.fvrt.service.FavoritesService;
import egiskorea.com.cmt.fvrt.service.FavoritesVO;
import egiskorea.com.cmt.pti.service.impl.PotoInfoDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 즐겨찾기를 관리하는 serviceImpl 클래스
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
 *  2021.02.16   배윤성           기본정보 추가.
 *  </pre>
 */

@Service("favoritesService")
public class FavoritesServiceImpl implements FavoritesService {

	@Resource(name="favoritesDAO")
	private	FavoritesDAO favoritesDAO; 
	
	/**
	 * 즐겨찾기 목록
	 * @param FavoritesVO
	 * @return Map<String, Object>
	 */
	@Override
	public Map<String, Object> selectFavoritesList(FavoritesVO favoritesVO) {
		// TODO Auto-generated method stub
		List<?> list = favoritesDAO.selectFavoritesList(favoritesVO);
		
		int cnt = favoritesDAO.selectFavoritesListCnt(favoritesVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		return map;
	}

	/**
	 * 즐겨찾기 상세조회
	 * @param FavoritesVO
	 * @return EgovMap
	 */
	@Override
	public EgovMap selectFavoritesView(FavoritesVO favoritesVO) {
		// TODO Auto-generated method stub
		EgovMap result = favoritesDAO.selectFavoritesView(favoritesVO);
		
		return result;
	}

	/**
	 * 즐겨찾기 등록
	 * @param FavoritesVO
	 * @throws Exception
	 */
	@Override
	public void insertFavorites(FavoritesVO favoritesVO) throws Exception {
		// TODO Auto-generated method stub
		favoritesDAO.insertFavorites(favoritesVO);
	}

	/**
	 * 즐겨찾기 수정
	 * @param FavoritesVO
	 * @throws Exception
	 */
	@Override
	public void updateFavorites(FavoritesVO favoritesVO) throws Exception {
		// TODO Auto-generated method stub
		favoritesDAO.updateFavorites(favoritesVO);
	}

	/**
	 * 즐겨찾기 삭제
	 * @param FavoritesVO
	 * @throws Exception
	 */
	@Override
	public void deleteFavorites(FavoritesVO favoritesVO) throws Exception {
		// TODO Auto-generated method stub
		favoritesDAO.deleteFavorites(favoritesVO);
	}

	/**
	 * 기본정보 호출.
	 * @param favoritesVO
	 * @return
	 * @throws Exception
	 */
	@Override
	public EgovMap selectBaseFavorites(FavoritesVO favoritesVO) throws Exception {
		EgovMap result = favoritesDAO.selectBaseFavorites(favoritesVO);
		return  result;
	}

	/**
	 * 기본정보 초기화
	 * @param favoritesVO
	 */
	@Override
	public void updateBass(FavoritesVO favoritesVO) {
		favoritesDAO.updateBass(favoritesVO);
	}


}
