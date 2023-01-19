/**
 * 
 */
package egiskorea.com.noti.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.cop.bbs.service.BoardMasterVO;
import egovframework.com.cop.bbs.service.BoardVO;
import egovframework.com.cop.bbs.service.EgovArticleService;
import egovframework.com.cop.bbs.service.EgovBBSMasterService;
import egovframework.com.cop.bbs.service.EgovBBSSatisfactionService;
import egovframework.com.cop.cmt.service.EgovArticleCommentService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 웹에서의 공지사항
 * @author 플랫폼개발부문 DT솔루션 정상혁
 * @since 2022.02.16
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.16		이름기입	최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/noti")
public class NoticeController {
	
	
    @Resource(name = "EgovBBSMasterService")
    private EgovBBSMasterService egovBBSMasterService;
    
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
    
	@Resource(name = "EgovArticleService")
    private EgovArticleService egovArticleService;
	
    @Resource(name = "EgovArticleCommentService")
    protected EgovArticleCommentService egovArticleCommentService;
    
    @Resource(name = "EgovBBSSatisfactionService")
    private EgovBBSSatisfactionService bbsSatisfactionService;
    
    
    /**
     * @Description 공지사항 리스트  (웹)
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.02.16
     * @param boardVO
     * @param model
     * @return "egiskorea/com/noti/selectNoticeList";
     * @throws Exception
     */
    @RequestMapping("/selectNoticeList.do")
    public String selectNoticeList(@ModelAttribute("searchVO") BoardVO boardVO, ModelMap model) throws Exception {
    	
        boardVO.setBbsId("BBSMSTR_000000000052"); // 공지사항 게시판ID
        
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();	//KISA 보안취약점 조치 (2018-12-10, 이정은)

		// 미인증 사용자에 대한 보안처리
		if (!isAuthenticated) {
			return "egiskorea/com/uat/uia/loginUsr";
		}
	
		BoardMasterVO vo = new BoardMasterVO();
		
		vo.setBbsId(boardVO.getBbsId());
		vo.setUniqId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		BoardMasterVO master = egovBBSMasterService.selectBBSMasterInf(vo);
		
		boardVO.setPageUnit(propertyService.getInt("pageUnit"));
		boardVO.setPageSize(propertyService.getInt("pageSize"));
	
		PaginationInfo paginationInfo = new PaginationInfo();
		
		//공지사항 추
		List<BoardVO> noticeList = egovArticleService.selectNoticeArticleList(boardVO);
		int totntl = noticeList.size();
		
		paginationInfo.setCurrentPageNo(boardVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(boardVO.getPageUnit() + (2 - totntl));
		paginationInfo.setPageSize(boardVO.getPageSize());
	
		boardVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		boardVO.setLastIndex(paginationInfo.getLastRecordIndex());
		boardVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
	
		Map<String, Object> map = egovArticleService.selectArticleList(boardVO);
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		
		paginationInfo.setTotalRecordCount(totCnt);
	
		//-------------------------------
		// 기본 BBS template 지정 
		//-------------------------------
		/*
		 * if (master.getTmplatCours() == null || master.getTmplatCours().equals("")) {
		 * master.setTmplatCours("/css/egovframework/com/cop/tpl/egovBaseTemplate.css");
		 * }
		 */
		////-----------------------------
	
		if(user != null) {
	    	model.addAttribute("sessionUniqId", user.getUniqId());
	    }
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("articleVO", boardVO);
		model.addAttribute("boardMasterVO", master);
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("noticeList", noticeList);
    	
    	return "egiskorea/com/noti/selectNoticeList";
    }
    

    /**
     * @Description 공지사항 상세조회 (웹)
     * @Author 플랫폼개발부문 DT솔루션 정상혁
     * @Date 2022.03.16
     * @param boardVO
     * @param model
     * @return "egiskorea/com/noti/selectNotice"
     * @throws Exception
     */
    @RequestMapping("/selectNotice.do")
    public String selectNotice(@ModelAttribute("searchVO") BoardVO boardVO, ModelMap model) throws Exception {
    	
    	boardVO.setBbsId("BBSMSTR_000000000052"); // 공지사항 게시판ID
    	
    	LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();	//KISA 보안취약점 조치 (2018-12-10, 이정은)

        if(!isAuthenticated) {
            return "egiskorea/com/uat/uia/loginUsr";
        }

		boardVO.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		BoardVO vo = egovArticleService.selectArticleDetail(boardVO);
		
		vo.setPageIndex(boardVO.getPageIndex());
		vo.setSearchCnd(boardVO.getSearchCnd());
		vo.setSearchWrd(boardVO.getSearchWrd());
		
		model.addAttribute("result", vo);
		model.addAttribute("sessionUniqId", (user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		
		//비밀글은 작성자만 볼수 있음 
//		if(!EgovStringUtil.isEmpty(vo.getSecretAt()) && vo.getSecretAt().equals("Y") && !((user == null || user.getUniqId() == null) ? "" : user.getUniqId()).equals(vo.getFrstRegisterId()))
//			return"forward:/com/mngr/info/selectArticleManageList.do";
		
		BoardMasterVO master = new BoardMasterVO();
		
		master.setBbsId(boardVO.getBbsId());
		master.setUniqId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		
		BoardMasterVO masterVo = egovBBSMasterService.selectBBSMasterInf(master);
	
//		if (masterVo.getTmplatCours() == null || masterVo.getTmplatCours().equals("")) {
//		    masterVo.setTmplatCours("/css/egovframework/com/cop/tpl/egovBaseTemplate.css");
//		}
	
//		if (egovArticleCommentService != null){
//			if (egovArticleCommentService.canUseComment(boardVO.getBbsId())) {
//			    model.addAttribute("useComment", "true");
//			}
//		}
//		if (bbsSatisfactionService != null) {
//			if (bbsSatisfactionService.canUseSatisfaction(boardVO.getBbsId())) {
//			    model.addAttribute("useSatisfaction", "true");
//			}
//		}
		
		model.addAttribute("boardMasterVO", masterVo);
	
		return "egiskorea/com/noti/selectNotice";
    }
}