package egiskorea.com.cmt.grph.web;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.cmt.grph.service.GraphicInfoSearchVO;
import egiskorea.com.cmt.grph.service.GraphicInfoService;
import egiskorea.com.cmt.grph.service.GraphicInfoVO;
import egiskorea.com.cmt.grph.service.ImageMarkerVO;
import egiskorea.com.cmt.mmi.service.MemoInfoVO;
import egovframework.com.cmm.LoginVO;
import egovframework.rte.fdl.cmmn.exception.FdlException;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 그리기정보를 관리하는 controller 클래스
 *
 * @author 최원석
 * @since 2022.01.27
 * @version 1.0
 * @see
 *     <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.27	 최원석	최초 생성
 *  </pre>
 */
@Controller
@RequestMapping("/cmt/grph")
public class GraphicInfoController {

  /** 그래픽 정보 서비스 */
  @Resource(name="graphicInfoService")
  private GraphicInfoService graphicInfoService;

  /**
   * 그래픽 정보 목록 
   * @Description : 그래픽 정보 목록 
   * @Author 최원석
   * @Date 2022.01.29
   * @param graphicInfoSearchVO 그래픽 정보 검색 vo
   * @param model 모델맵
   * @param request 서블릿 요청
   * @return 뷰 페이지 경로
   */
  @RequestMapping(value = "/selectGraphicInfoList.do")
  public String selectGraphicInfoList(
      @ModelAttribute("searchVO") GraphicInfoSearchVO graphicInfoSearchVO,
      ModelMap model,
      HttpServletRequest request) {
    LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
    if (loginVO != null) {
      graphicInfoSearchVO.setRegisterId(loginVO.getId());
    } else {
      graphicInfoSearchVO.setRegisterId("webmaster");
    }

    PaginationInfo paginationInfo = new PaginationInfo();
    paginationInfo.setCurrentPageNo(graphicInfoSearchVO.getPageIndex());
    paginationInfo.setRecordCountPerPage(graphicInfoSearchVO.getPageUnit());
    paginationInfo.setPageSize(graphicInfoSearchVO.getPageSize());

    Map<String, Object> map = graphicInfoService.selectGraphicInfoList(graphicInfoSearchVO);
    paginationInfo.setTotalRecordCount((int) map.get("resultCnt"));

    model.addAttribute("clList", graphicInfoService.selectGraphicClassificationList());
    model.addAttribute("resultList", map.get("resultList"));
    model.addAttribute("paginationInfo", paginationInfo);

    return "egiskorea/com/cmt/grph/selectGraphicInfoList";
  }
  
  /**
   * 그래픽 정보 상세 조회
   * @Description : 그래픽 정보 상세  조회
   * @Author 최원석
   * @Date 2022.01.29
   * @param grphcId 그래픽 아이디
   * @return 모델&뷰
   */
  @RequestMapping(value = "/selectGraphicInfo.do")
  public ModelAndView selectGraphicInfo(String grphcId) {
	  ModelAndView modelAndView = new ModelAndView("jsonView");
	  modelAndView.addObject("result", graphicInfoService.selectGraphicInfo(grphcId));
	  return modelAndView;
  }

  /**
   * 그래픽 정보 등록 화면
   * @Description : 그래픽 정보 등록 화면
   * @Author 최원석
   * @Date 2022.01.29
   * @param model 모델맵
   * @param request 서블릿요청
   * @return 뷰 페이지 경로
   */
  @RequestMapping("/insertGraphicInfoView.do")
  public String insertGraphicInfoView(ModelMap model, HttpServletRequest request, @ModelAttribute("searchVO") GraphicInfoSearchVO graphicInfoSearchVO) {
    ImageMarkerVO imageMarkerVO = new ImageMarkerVO();
    LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
    if (loginVO != null) {
      imageMarkerVO.setRegisterId(loginVO.getId());
    } else {
      imageMarkerVO.setRegisterId("webmaster");
    }
    model.addAttribute("clList", graphicInfoService.selectGraphicClassificationList());
    model.addAttribute("imageMarkerList", graphicInfoService.selectImageMarkerList(imageMarkerVO));
    
	model.addAttribute("pageIndex",graphicInfoSearchVO.getPageIndex());
	model.addAttribute("searchWrd",graphicInfoSearchVO.getSearchWrd());
	model.addAttribute("sortKind",graphicInfoSearchVO.getSortKind());
	model.addAttribute("searchCnd",graphicInfoSearchVO.getSearchCnd());
	model.addAttribute("searchCl",graphicInfoSearchVO.getSearchCl());
	
	
    return "egiskorea/com/cmt/grph/insertGraphicInfoView";
  }

  /**
   * 그래픽 정보 등록
   * @Description : 그래픽 정보 등록 
   * @Author 최원석
   * @Date 2022.01.29
   * @param graphicInfoVO 그래픽 정보 vo
   * @param request 서블릿 요청
   * @return 모델&뷰
   * @throws FdlException
   */
  @RequestMapping("/insertGraphicInfo.do")
  public ModelAndView insertGraphicInfo(GraphicInfoVO graphicInfoVO, HttpServletRequest request)
      throws FdlException {
    ModelAndView modelAndView = new ModelAndView("jsonView");
    LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
    if (loginVO != null) {
      graphicInfoVO.setRegisterId(loginVO.getId());
    } else {
      graphicInfoVO.setRegisterId("webmaster");
    }
    try {
      graphicInfoService.insertGraphicInfo(graphicInfoVO);
      modelAndView.addObject("result", true);
    } catch (Exception e) {
      modelAndView.addObject("result", false);
      modelAndView.addObject("errorMsg", e.getMessage());
    }
    return modelAndView;
  }

  /**
   * 그래픽 정보 수정 화면
   * @Description : 그래픽 정보 수정 화면 
   * @Author 최원석
   * @Date 2022.01.29
   * @param model 모델맵
   * @param request 서블릿 요청
   * @return 뷰 페이지 경로
   */
  @RequestMapping("/updateGraphicInfoView.do")
  public String updateGraphicInfoView(ModelMap model, HttpServletRequest request, @ModelAttribute("searchVO") GraphicInfoSearchVO graphicInfoSearchVO) {
    ImageMarkerVO imageMarkerVO = new ImageMarkerVO();
    LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
    if (loginVO != null) {
      imageMarkerVO.setRegisterId(loginVO.getId());
    } else {
      imageMarkerVO.setRegisterId("webmaster");
    }
    model.addAttribute("clList", graphicInfoService.selectGraphicClassificationList());
    model.addAttribute("imageMarkerList", graphicInfoService.selectImageMarkerList(imageMarkerVO));
    
	model.addAttribute("pageIndex",graphicInfoSearchVO.getPageIndex());
	model.addAttribute("searchWrd",graphicInfoSearchVO.getSearchWrd());
	model.addAttribute("sortKind",graphicInfoSearchVO.getSortKind());
	model.addAttribute("searchCnd",graphicInfoSearchVO.getSearchCnd());
	model.addAttribute("searchCl",graphicInfoSearchVO.getSearchCl());
	
    return "egiskorea/com/cmt/grph/updateGraphicInfoView";
  }

  /**
   * 그래픽 정보 수정
   * @Description : 그래픽 정보 수정 
   * @Author 최원석
   * @Date 2022.01.29
   * @param graphicInfoVO 그래픽 정보 vo
   * @return 모델&뷰
   * @throws FdlException
   */
  @RequestMapping("/updateGraphicInfo.do")
  public ModelAndView updateGraphicInfo(GraphicInfoVO graphicInfoVO) throws FdlException {
    ModelAndView modelAndView = new ModelAndView("jsonView");
    try {
      graphicInfoService.updateGraphicInfo(graphicInfoVO);
      modelAndView.addObject("result", true);
    } catch (Exception e) {
      modelAndView.addObject("result", false);
      modelAndView.addObject("errorMsg", e.getMessage());
    }
    return modelAndView;
  }
  
  /**
   * 그래픽 정보 삭제
   * @Description : 그래픽 정보 삭제 
   * @Author 최원석
   * @Date 2022.01.29
   * @param grphcId 그래픽 아이디
   * @return 모델&뷰
   * @throws FdlException
   */
  @RequestMapping("/deleteGraphicInfo.do")
  public ModelAndView deleteGraphicInfo(String grphcId) throws FdlException {
    ModelAndView modelAndView = new ModelAndView("jsonView");
    try {
      graphicInfoService.deleteGraphicInfo(grphcId);
      modelAndView.addObject("result", true);
    } catch (Exception e) {
      modelAndView.addObject("result", false);
      modelAndView.addObject("errorMsg", e.getMessage());
    }
    return modelAndView;
  }
  
  /**
   * 이미지 마커 등록
   * @Description : 이미지 마커 등록 
   * @Author 최원석
   * @Date 2022.01.29
   * @param imageMarkerVO 이미지 마커 vo
   * @param request 서블릿 요청
   * @return 모델&뷰
   * @throws FdlException
   */
  @RequestMapping("/insertImageMarker.do")
  public ModelAndView insertImageMarker(@ModelAttribute("image") ImageMarkerVO imageMarkerVO, HttpServletRequest request)
      throws FdlException {
    ModelAndView modelAndView = new ModelAndView("jsonView");
    LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
    if (loginVO != null) {
    	imageMarkerVO.setRegisterId(loginVO.getId());
    } else {
    	imageMarkerVO.setRegisterId("webmaster");
    }
    try {
      graphicInfoService.insertImageMarker(imageMarkerVO);
      modelAndView.addObject("result", true);
    } catch (Exception e) {
      modelAndView.addObject("result", false);
      modelAndView.addObject("errorMsg", e.getMessage());
    }
    return modelAndView;
  }
  
  /**
   * 이미지 마커 삭제
   * @Description : 이미지 마커 삭제 
   * @Author 최원석
   * @Date 2022.01.29
   * @param mkrId 마커 아이디
   * @return 모델&뷰
   * @throws FdlException
   */
  @RequestMapping("/deleteImageMarker.do")
  public ModelAndView deleteImageMarker(String mkrId) throws FdlException {
    ModelAndView modelAndView = new ModelAndView("jsonView");
    try {
      graphicInfoService.deleteImageMarker(mkrId);
      modelAndView.addObject("result", true);
    } catch (Exception e) {
      modelAndView.addObject("result", false);
      modelAndView.addObject("errorMsg", e.getMessage());
    }
    return modelAndView;
  }
  
	/** 
	 * 사용자 등록이미지 조회
	 * @Description : 사용자 등록이미지 조회 
	 * @Author 박규호
	   * @Date 2022.03.07
	   * @param mkrId 마커 아이디
	   * @return 모델&뷰
	   * @throws FdlException
	 * @return selectImageMarkerList
	 */
	@RequestMapping(value = "/getImageMarker.do")
	public ModelAndView getDfAnaGridResultDataTop20(ModelMap model, HttpServletRequest request) {
		ModelAndView modelAndView = new ModelAndView("jsonView");
		  ImageMarkerVO imageMarkerVO = new ImageMarkerVO();
		  LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		  if (loginVO != null) {
		      imageMarkerVO.setRegisterId(loginVO.getId());
		  } else {
		      imageMarkerVO.setRegisterId("webmaster");
		   }
		  modelAndView.addObject("data", graphicInfoService.selectImageMarkerList(imageMarkerVO)); 
		return modelAndView;
	}
	
  
}
