package egiskorea.com.sach.unty.web;

import egiskorea.com.cmm.service.impl.ExcelView;
import egiskorea.com.job.ugtm.service.UnderWaterAgriVO;
import egiskorea.com.sach.adr.service.AddressSearchService;
import egiskorea.com.sach.adr.service.AddressSearchVO;
import egiskorea.com.sach.unty.servcie.UntySearchService;
import egiskorea.com.sach.unty.servcie.UntySearchVO;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * @Description 통합 검색 controller 클래스
 * @author 배윤성
 * @since 2022.02.09
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.09		배윤성	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/sach/Unty")
public class UntySearchController {

  /**
   * 통합 검색 서비스
   */
  @Resource(name="untySearchService")
  private UntySearchService untySearchService;

  /**
   *
   * @Description : 통합검색 목록
   * @Author 배윤성
   * @Date 2022.02.09
   * @param untySearchVO 통합 검색 vo
   * @return 모델&뷰
   */
  @RequestMapping("/searchTotal.do")
  public ModelAndView searchTotal(UntySearchVO untySearchVO) {
    ModelAndView modelAndView = new ModelAndView("jsonView");

    PaginationInfo paginationInfo = new PaginationInfo();
    paginationInfo.setCurrentPageNo(untySearchVO.getPageIndex());
    paginationInfo.setRecordCountPerPage(untySearchVO.getPageUnit());
    paginationInfo.setPageSize(untySearchVO.getPageSize());

    Map<String, Object> map = untySearchService.selectUntylList(untySearchVO);
    paginationInfo.setTotalRecordCount((int) map.get("resultCnt"));
    modelAndView.addObject("resultList", map.get("resultList"));
    modelAndView.addObject("paginationInfo", paginationInfo);
    return modelAndView;
  }


  @RequestMapping(value = "/selectUntyExcelListDownload.do")
  public void selectUntyExcelListDownload(
          @ModelAttribute("untySearchVO") UntySearchVO untySearchVO,
          HttpServletRequest request,
          HttpServletResponse response,
          ModelMap model) throws Exception{
    List<?> excelVO = untySearchService.selectUntyExcelList(untySearchVO);
    String[] titleArr = new String[1];
    titleArr[0] = "명칭";


    String[] voTitleArr = new String[1];
    voTitleArr[0] = "nm";

    ExcelView.excelDownload(request, response,  "통합검색_", titleArr, voTitleArr, excelVO);
  }



}
