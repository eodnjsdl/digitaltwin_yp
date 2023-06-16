package egiskorea.com.webApp.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import egiskorea.com.webApp.service.AddrResultVO;
import egiskorea.com.webApp.service.AddrSearchService;
import egiskorea.com.webApp.service.AddrSearchVO;
import egiskorea.com.cmm.PaginationInfo;
import egiskorea.com.sach.adr.service.AddressResultVO;

/**
 * @Description webApp 메인화면
 * @author 글로벌컨설팅부문 장현승
 * @since 2023.06.12
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.06.12		장현승	최초 생성
 */

@Controller
@RequestMapping("/webApp")
public class WebAppMainController {
	
	@Resource(name = "addrSearchService")
    private AddrSearchService addrSearchService;
	
	// 메인화면 호출
	@RequestMapping("/main.do")
	public String main(HttpServletRequest request, Model model) throws Exception {
	        
 		return "egiskorea/com/webApp/webAppMain";
	}

	// 검색 결과 페이지 호출
	@RequestMapping("/webAppSearch.do")
	public String webAppSearch(HttpServletRequest request, Model model, AddrSearchVO addrSearchVO) throws Exception {
		List<AddrResultVO> resultList = addrSearchService.selectAddressList(addrSearchVO);

		int totalCount = addrSearchService.selectAddressListCount(addrSearchVO);
        PaginationInfo paginationInfo = new PaginationInfo(addrSearchVO.getPageIndex(), addrSearchVO.getPageSize(), addrSearchVO.getPageUnit(), totalCount);

        model.addAttribute("resultList", resultList);
        model.addAttribute("paginationInfo", paginationInfo);
	       
 		return "egiskorea/com/webApp/webAppSearch";
	}
	
    @RequestMapping("/selectAdr.do")
    public AddrResultVO smartMapPingPage(AddrSearchVO addressVO, Model model) throws Exception {
        AddrResultVO resultVo = addrSearchService.selectAddress(addressVO);

        model.addAttribute("resultVo", resultVo);

        return resultVo;
    }
}