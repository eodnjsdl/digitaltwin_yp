package egiskorea.com.sach.adr.web;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.sach.adr.service.AddressSearchService;
import egiskorea.com.sach.adr.service.AddressSearchVO;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 주소 검색 controller 클래스
 * @author 최원석
 * @since 2022.02.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.01		최원석	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/sach/adr")
public class AddressSearchController {

  /**
   * 주소 검색 서비스
   */
  @Resource(name = "addressSearchService")
  private AddressSearchService addressSearchService;

  /**
   * 
   * @Description : 주소 목록
   * @Author 최원석
   * @Date 2022.02.01
   * @param addressSearchVO 주소 검색 vo
   * @return 모델&뷰
   */
  @RequestMapping("/searchAddress.do")
  public ModelAndView searchAddress(AddressSearchVO addressSearchVO) {
    ModelAndView modelAndView = new ModelAndView("jsonView");

    PaginationInfo paginationInfo = new PaginationInfo();
    paginationInfo.setCurrentPageNo(addressSearchVO.getPageIndex());
    paginationInfo.setRecordCountPerPage(addressSearchVO.getPageUnit());
    paginationInfo.setPageSize(addressSearchVO.getPageSize());

    Map<String, Object> map = addressSearchService.selectAddressList(addressSearchVO);
    paginationInfo.setTotalRecordCount((int) map.get("resultCnt"));

    modelAndView.addObject("resultList", map.get("resultList"));
    modelAndView.addObject("paginationInfo", paginationInfo);

    return modelAndView;
  }

  /**
   * 
   * @Description : 도로명 주소 목록
   * @Author 최원석
   * @Date 2022.02.01
   * @param addressSearchVO 주소 검색 vo
   * @return 모델&뷰
   */
  @RequestMapping("/searchRoadAddress.do")
  public ModelAndView searchRoadAddress(AddressSearchVO addressSearchVO) {
    ModelAndView modelAndView = new ModelAndView("jsonView");

    PaginationInfo paginationInfo = new PaginationInfo();
    paginationInfo.setCurrentPageNo(addressSearchVO.getPageIndex());
    paginationInfo.setRecordCountPerPage(addressSearchVO.getPageUnit());
    paginationInfo.setPageSize(addressSearchVO.getPageSize());

    Map<String, Object> map = addressSearchService.selectRoadAddressList(addressSearchVO);
    paginationInfo.setTotalRecordCount((int) map.get("resultCnt"));

    modelAndView.addObject("resultList", map.get("resultList"));
    modelAndView.addObject("paginationInfo", paginationInfo);

    return modelAndView;
  }
}
