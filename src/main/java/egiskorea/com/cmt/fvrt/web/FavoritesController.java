package egiskorea.com.cmt.fvrt.web;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

import org.apache.commons.net.util.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.cmt.fvrt.service.FavoritesService;
import egiskorea.com.cmt.fvrt.service.FavoritesVO;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 즐겨찾기 관리하는 controller 클래스
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
@Controller
@RequestMapping("/cmt/fvrt")
public class FavoritesController {



	private static final Logger logger = LoggerFactory.getLogger(FavoritesController.class);
	
	@Resource(name = "favoritesService")
	private FavoritesService favoritesService;

	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	/**
	 * 즐겨찾기 목록
	 * 
	 * @param favoritesVO
	 * @param model
	 * @return "egiskorea/com/cmt/fvrt/selectFavoritesList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectFavoritesList.do")
	public String selectFavoritesList(
			@ModelAttribute("searchVO") FavoritesVO favoritesVO,
			ModelMap model, HttpServletRequest request) throws Exception{
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		if(loginVO != null) {
			favoritesVO.setEmplyrId(loginVO.getId());
		} else {
			logger.info("아이디가 존재하지 않습니다");
			favoritesVO.setEmplyrId("webmaster");
		}
		favoritesVO.setPageUnit(10);
		favoritesVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(favoritesVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(favoritesVO.getPageUnit());
		paginationInfo.setPageSize(favoritesVO.getPageSize());

		favoritesVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		favoritesVO.setLastIndex(paginationInfo.getLastRecordIndex());
		favoritesVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = favoritesService.selectFavoritesList(favoritesVO);
		  
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
				
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		  return "egiskorea/com/cmt/fvrt/favoritesList";
	}
	
	/**
	 * 즐겨찾기 상세조회
	 * 
	 * @param favoritesVO
	 * @param model
	 * @return "egiskorea/com/cmt/fvrt/selectFavoritesView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectFavoritesView.do")
	public String selectFavoritesView(
			@ModelAttribute("memoInfoVO") FavoritesVO favoritesVO,
			ModelMap model, HttpServletRequest request) throws Exception{
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		if(loginVO != null) {
			favoritesVO.setEmplyrId(loginVO.getId());
		} else {
			logger.info("아이디가 존재하지 않습니다");
			favoritesVO.setEmplyrId("webmaster");
		}
		EgovMap result = favoritesService.selectFavoritesView(favoritesVO);
		String filePath = result.get("imageFlpthNm").toString() + result.get("imageFileNm").toString();
		String sbase64 = "";
		File f = new File(filePath);
		if ( f.isFile() ) {
			byte[] bt = new byte[(int) f.length()];
			FileInputStream fis = new FileInputStream( f );
			try {
				fis.read( bt );
				sbase64 = new String ( Base64.encodeBase64( bt ) );
			} catch(Exception e ) {
			} finally {
				fis.close();
			}
		}
		model.addAttribute("pageIndex",favoritesVO.getPageIndex());
		model.addAttribute("searchWrd",favoritesVO.getSearchWrd());
		model.addAttribute("sortKind",favoritesVO.getSortKind());
		model.addAttribute("searchCnd",favoritesVO.getSearchCnd());
		model.addAttribute("imgSrc", sbase64);
		model.addAttribute("result", result);
		  return "egiskorea/com/cmt/fvrt/selectFavoritesView";
	}
	
	/**
	 * 즐겨찾기 등록 화면 호출
	 * 
	 * @param favoritesVO
	 * @param model
	 * @param request
	 * @return "egiskorea/com/cmt/fvrt/insertFavoritesView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertFavoritesView.do")
	public String insertFavoritesView(
			@ModelAttribute("searchVO") FavoritesVO favoritesVO,
			ModelMap model, HttpServletRequest request) throws Exception{
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		if(loginVO != null) {
			favoritesVO.setEmplyrId(loginVO.getId());
		} else {
			logger.info("아이디가 존재하지 않습니다");
			favoritesVO.setEmplyrId("webmaster");
			
		}
			model.addAttribute("emplyrId", favoritesVO.getEmplyrId());
			model.addAttribute("pageIndex",favoritesVO.getPageIndex());
			model.addAttribute("searchWrd",favoritesVO.getSearchWrd());
			model.addAttribute("sortKind",favoritesVO.getSortKind());
			
		  return "egiskorea/com/cmt/fvrt/insertFavoritesView";
	}
	
	/**
	 * 즐겨찾기 수정 화면 호출
	 * 
	 * @param favoritesVO
	 * @param model
	 * @return "egiskorea/com/cmt/fvrt/updateFavoritesView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateFavoritesView.do")
	public String updateFavorInfoView(
			@ModelAttribute("searchVO") FavoritesVO favoritesVO,
			ModelMap model, HttpServletRequest request) throws Exception{
		EgovMap result = favoritesService.selectFavoritesView(favoritesVO);
		String filePath = result.get("imageFlpthNm").toString() + result.get("imageFileNm").toString();  
		String sbase64 = "";
		File f = new File(filePath);
		if ( f.isFile() ) {
		    byte[] bt = new byte[(int) f.length()];
		    FileInputStream fis = new FileInputStream( f );
		    
		    try {
		          fis.read( bt );
		          sbase64 = new String ( Base64.encodeBase64( bt ) );
		    } catch(Exception e ) {
		    } finally {
		          fis.close();
		    }
		}
		model.addAttribute("pageIndex",favoritesVO.getPageIndex());
		model.addAttribute("searchWrd",favoritesVO.getSearchWrd());
		model.addAttribute("sortKind",favoritesVO.getSortKind());
		model.addAttribute("searchCnd",favoritesVO.getSearchCnd());
		model.addAttribute("imgSrc", sbase64);
		model.addAttribute("result", result);
		  return "egiskorea/com/cmt/fvrt/updateFavoritesView";
	}
	
	/**
	 * 즐겨찾기 등록
	 * @param favoritesVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertFavorites.do")
	public ModelAndView insertFavorites(
			@ModelAttribute("favoritesVO") FavoritesVO favoritesVO,
			HttpServletRequest request) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		String data = favoritesVO.getImgDataString().split(",")[1];
		String target = EgovProperties.getProperty("Globals.fileStorePath") + favoritesVO.getBkmkNm()+".png";
		System.out.println("fileStorePath!!! " + target);
		byte[] imageBytes = DatatypeConverter.parseBase64Binary(data);
		
		try {
				if(loginVO != null) {
					favoritesVO.setEmplyrId(loginVO.getId());
				} else {
					logger.info("아이디가 존재하지 않습니다");
					favoritesVO.setEmplyrId("webmaster");
				}
				BufferedImage bufImg = ImageIO.read(new ByteArrayInputStream(imageBytes));

				ImageIO.write(bufImg, "png", new File(target));
				
				favoritesVO.setImageFlpthNm(EgovProperties.getProperty("Globals.fileStorePath"));
				favoritesVO.setImageFileNm(favoritesVO.getBkmkNm()+".png");
			if("y".equals(favoritesVO.getBass())){
				favoritesService.updateBass(favoritesVO);
			}
				favoritesService.insertFavorites(favoritesVO);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 즐겨찾기 수정
	 * @param favoritesVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateFavorites.do")
	public ModelAndView updateFavorites(
			@ModelAttribute("favoritesVO") FavoritesVO favoritesVO,
			HttpServletRequest request) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		String data = favoritesVO.getImgDataString().split(",")[1];
		String target = EgovProperties.getProperty("Globals.fileStorePath") + favoritesVO.getBkmkNm()+".png";
		System.out.println("fileStorePath!!! " + target);
		byte[] imageBytes = DatatypeConverter.parseBase64Binary(data);
		
		try {
				if(loginVO != null) {
					favoritesVO.setEmplyrId(loginVO.getId());
				} else {
					logger.info("아이디가 존재하지 않습니다");
					favoritesVO.setEmplyrId("webmaster");
				}
				BufferedImage bufImg = ImageIO.read(new ByteArrayInputStream(imageBytes));
				
				ImageIO.write(bufImg, "png", new File(target));
				
				favoritesVO.setImageFlpthNm(EgovProperties.getProperty("Globals.fileStorePath"));
				favoritesVO.setImageFileNm(favoritesVO.getBkmkNm()+".png");
				if("y".equals(favoritesVO.getBass())){
					favoritesService.updateBass(favoritesVO);
				}
				favoritesService.updateFavorites(favoritesVO);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 즐겨찾기 삭제
	 * @param favoritesVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteFavorites.do")
	public ModelAndView deleteFavorites(
			@ModelAttribute("favoritesVO") FavoritesVO favoritesVO,
			HttpServletRequest request) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			favoritesService.deleteFavorites(favoritesVO);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		return mav;
	}


	/**
	 * 즐겨찾기 기본정보.
	 * @param favoritesVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBaseLocation.do")
	public ModelAndView selectBaseLocation(
			@ModelAttribute("favoritesVO") FavoritesVO favoritesVO,
			HttpServletRequest request) throws Exception{

		ModelAndView mav = new ModelAndView("jsonView");
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		try {
			if(loginVO != null) {
				favoritesVO.setEmplyrId(loginVO.getId());
			} else {
				logger.info("아이디가 존재하지 않습니다");
				favoritesVO.setEmplyrId("webmaster");
			}

			EgovMap result = favoritesService.selectBaseFavorites(favoritesVO);

			mav.addObject("result", result);
		} catch(Exception e) {
			logger.info(e.getMessage());

			mav.addObject("result", "fail");
		}
		return mav;
	}


}
