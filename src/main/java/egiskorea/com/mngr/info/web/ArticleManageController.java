package egiskorea.com.mngr.info.web;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egiskorea.com.cmm.service.CmmUtils;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.FileVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.cmm.util.EgovXssChecker;
import egovframework.com.cop.bbs.service.Board;
import egovframework.com.cop.bbs.service.BoardMaster;
import egovframework.com.cop.bbs.service.BoardMasterVO;
import egovframework.com.cop.bbs.service.BoardVO;
import egovframework.com.cop.bbs.service.EgovArticleService;
import egovframework.com.cop.bbs.service.EgovBBSMasterService;
import egovframework.com.cop.bbs.service.EgovBBSSatisfactionService;
import egovframework.com.cop.bbs.web.EgovArticleController;
import egovframework.com.cop.cmt.service.EgovArticleCommentService;
import egovframework.com.cop.tpl.service.EgovTemplateManageService;
import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@Controller
@RequestMapping("/com/mngr/info")
public class ArticleManageController {
private static final Logger LOGGER = LoggerFactory.getLogger(EgovArticleController.class);
	
	@Resource(name = "EgovArticleService")
    private EgovArticleService egovArticleService;

    @Resource(name = "EgovBBSMasterService")
    private EgovBBSMasterService egovBBSMasterService;

    @Resource(name = "EgovFileMngService")
    private EgovFileMngService fileMngService;

    @Resource(name = "EgovFileMngUtil")
    private EgovFileMngUtil fileUtil;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
    
    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;
    
    @Resource(name = "EgovArticleCommentService")
    protected EgovArticleCommentService egovArticleCommentService;

    @Resource(name = "EgovBBSSatisfactionService")
    private EgovBBSSatisfactionService bbsSatisfactionService;

	@Resource(name = "EgovTemplateManageService")
	private EgovTemplateManageService egovTemplateManageService;
    
    @Autowired
    private DefaultBeanValidator beanValidator;
    
    /**
     * XSS 방지 처리.
     * 
     * @param data
     * @return
     */
    protected String unscript(String data) {
        if (data == null || data.trim().equals("")) {
            return "";
        }
        
        String ret = data;
        
        ret = ret.replaceAll("<(S|s)(C|c)(R|r)(I|i)(P|p)(T|t)", "&lt;script");
        ret = ret.replaceAll("</(S|s)(C|c)(R|r)(I|i)(P|p)(T|t)", "&lt;/script");
        
        ret = ret.replaceAll("<(O|o)(B|b)(J|j)(E|e)(C|c)(T|t)", "&lt;object");
        ret = ret.replaceAll("</(O|o)(B|b)(J|j)(E|e)(C|c)(T|t)", "&lt;/object");
        
        ret = ret.replaceAll("<(A|a)(P|p)(P|p)(L|l)(E|e)(T|t)", "&lt;applet");
        ret = ret.replaceAll("</(A|a)(P|p)(P|p)(L|l)(E|e)(T|t)", "&lt;/applet");
        
        ret = ret.replaceAll("<(E|e)(M|m)(B|b)(E|e)(D|d)", "&lt;embed");
        ret = ret.replaceAll("</(E|e)(M|m)(B|b)(E|e)(D|d)", "&lt;embed");
        
        ret = ret.replaceAll("<(F|f)(O|o)(R|r)(M|m)", "&lt;form");
        ret = ret.replaceAll("</(F|f)(O|o)(R|r)(M|m)", "&lt;form");

        return ret;
    }

    /**
	 * 게시물에 대한 목록을 조회한다.
	 * 
	 * @param boardVO
	 * @param model
	 * @return egiskorea/com/adm/info/selectArticleManageList
	 * @throws Exception
	 */
	@RequestMapping("/selectArticleManageList.do")
	public String selectArticleManageList(@ModelAttribute("searchVO") BoardVO boardVO, ModelMap model) throws Exception {
		LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); // KISA 보안취약점 조치 (2018-12-10, 이정은)

		if (!isAuthenticated) {
			return "egiskorea/com/uat/uia/loginUsr";
		}
		
		BoardMasterVO vo = new BoardMasterVO();
		
		boardVO.setBbsId("BBSMSTR_000000000052");
		
		vo.setBbsId(boardVO.getBbsId());
		vo.setUniqId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		BoardMasterVO master = egovBBSMasterService.selectBBSMasterInf(vo);

		boardVO.setPageUnit(propertyService.getInt("pageUnit"));
		boardVO.setPageSize(propertyService.getInt("pageSize"));

		PaginationInfo paginationInfo = new PaginationInfo();
		
		// 공지사항 추출
		List<BoardVO> noticeList = egovArticleService.selectNoticeArticleList(boardVO);
		int totntl = noticeList.size();
		
		paginationInfo.setCurrentPageNo(boardVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(boardVO.getPageUnit() - totntl);
		paginationInfo.setPageSize(boardVO.getPageSize());

		boardVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		boardVO.setLastIndex(paginationInfo.getLastRecordIndex());
		boardVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		Map<String, Object> map = egovArticleService.selectArticleList(boardVO);
		int totCnt = Integer.parseInt((String) map.get("resultCnt"));

		paginationInfo.setTotalRecordCount(totCnt);

		if (user != null) {
			model.addAttribute("sessionUniqId", user.getUniqId());
		}
		
		String nowDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		
		model.addAttribute("nowDate", nowDate);
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("articleVO", boardVO);
		model.addAttribute("boardMasterVO", master);
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("noticeList", noticeList);

		return "egiskorea/com/adm/info/selectArticleManageList";
	}
    
    /**
     * 게시물에 대한 상세 정보를 조회한다.
     * 
     * @param boardVO
     * @param sessionVO
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/selectArticleManage.do")
    public String selectArticleManage(@ModelAttribute("searchVO") BoardVO boardVO, ModelMap model) throws Exception {
    	LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();	//KISA 보안취약점 조치 (2018-12-10, 이정은)

        if(!isAuthenticated) {
            return "egiskorea/com/uat/uia/loginUsr";
        }

		boardVO.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		BoardVO vo = egovArticleService.selectArticleDetail(boardVO);
	
		model.addAttribute("result", vo);
		model.addAttribute("sessionUniqId", (user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		
		//비밀글은 작성자만 볼수 있음 
		if(!EgovStringUtil.isEmpty(vo.getSecretAt()) && vo.getSecretAt().equals("Y") && !((user == null || user.getUniqId() == null) ? "" : user.getUniqId()).equals(vo.getFrstRegisterId()))
			return"forward:/com/mngr/info/selectArticleManageList.do";
		
		BoardMasterVO master = new BoardMasterVO();
		
		master.setBbsId(boardVO.getBbsId());
		master.setUniqId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		
		BoardMasterVO masterVo = egovBBSMasterService.selectBBSMasterInf(master);
	
		if (egovArticleCommentService != null){
			if (egovArticleCommentService.canUseComment(boardVO.getBbsId())) {
			    model.addAttribute("useComment", "true");
			}
		}
		if (bbsSatisfactionService != null) {
			if (bbsSatisfactionService.canUseSatisfaction(boardVO.getBbsId())) {
			    model.addAttribute("useSatisfaction", "true");
			}
		}
		
		model.addAttribute("boardMasterVO", masterVo);
	
		return "egiskorea/com/adm/info/selectArticleManage";
    }

    /**
     * 게시물 등록을 위한 등록페이지로 이동한다.
     * 
     * @param boardVO
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/insertArticleManageView.do")
    public String insertArticleManageView(@ModelAttribute("searchVO") BoardVO boardVO, ModelMap model) throws Exception {
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	
		BoardMasterVO bdMstr = new BoardMasterVO();
		
		if (isAuthenticated) {
	
		    BoardMasterVO vo = new BoardMasterVO();
		    vo.setBbsId(boardVO.getBbsId());
		    vo.setUniqId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
	
		    bdMstr = egovBBSMasterService.selectBBSMasterInf(vo);
		}
	
		String nowDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		
		boardVO.setFrstRegisterPnttm(nowDate);
		boardVO.setNtceBgnde(nowDate);
		boardVO.setFrstRegisterId(user.getUniqId());
		boardVO.setFrstRegisterNm(user.getName());
		
		model.addAttribute("date", nowDate);
		model.addAttribute("articleVO", boardVO);
		model.addAttribute("boardMasterVO", bdMstr); 
		
		return "egiskorea/com/adm/info/insertArticleManageView";
    }

    /**
     * 게시물을 등록한다.
     * 
     * @param boardVO
     * @param board
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/insertArticleManage.do")
    public String insertArticleManage(final MultipartHttpServletRequest multiRequest, @ModelAttribute("searchVO") BoardVO boardVO,
	    @ModelAttribute("bdMstr") BoardMaster bdMstr, @ModelAttribute("board") BoardVO board, BindingResult bindingResult, 
	    Model model) throws Exception {
    	
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		String message = "";
		
		if(!isAuthenticated) {	//KISA 보안취약점 조치 (2018-12-10, 이정은)
            return "egiskorea/com/uat/uia/loginUsr";
        }
	
		beanValidator.validate(board, bindingResult);
		
		if (bindingResult.hasErrors()) {
	
		    BoardMasterVO master = new BoardMasterVO();
		    
		    master.setBbsId(boardVO.getBbsId());
		    master.setUniqId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
	
		    master = egovBBSMasterService.selectBBSMasterInf(master);
	
		    model.addAttribute("boardMasterVO", master);
		    model.addAttribute("resultMsg", "fail.common.insert");
	
		    return "egiskorea/com/adm/info/insertArticleManageView";
		}
	
		if (isAuthenticated) {
		    List<FileVO> result = null;
		    String atchFileId = "";
		    
		    //final Map<String, MultipartFile> files = multiRequest.getFileMap();
		    final List<MultipartFile> files = multiRequest.getFiles("file_1");
		    if (!files.isEmpty()) {
		    	result = fileUtil.parseFileInf(files, "BBS_", 0, "", "");
		    	atchFileId = fileMngService.insertFileInfs(result);
		    }
		    board.setAtchFileId(atchFileId);
		    board.setFrstRegisterId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		    board.setBbsId(boardVO.getBbsId());
		    board.setBlogId(boardVO.getBlogId());
		    
		    
		    //익명등록 처리 
		    if(board.getAnonymousAt() != null && board.getAnonymousAt().equals("Y")){
		    	board.setNtcrId("anonymous"); //게시물 통계 집계를 위해 등록자 ID 저장
		    	board.setNtcrNm("익명"); //게시물 통계 집계를 위해 등록자 Name 저장
		    	board.setFrstRegisterId("anonymous");
		    } else {
		    	board.setNtcrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId()); //게시물 통계 집계를 위해 등록자 ID 저장
		    	board.setNtcrNm((user == null || user.getName() == null) ? "" : user.getName()); //게시물 통계 집계를 위해 등록자 Name 저장
		    }
		    
		    board.setNttCn(unscript(board.getNttCn()));	// XSS 방지
		    egovArticleService.insertArticle(board);
		    
		    message = egovMessageSource.getMessage("success.common.insert");
		} else {
			message = egovMessageSource.getMessage("fail.common.insert");
		}
		
		return CmmUtils.postAlertHref(model, message, "/com/mngr/info/selectArticleManageList.do", boardVO, null);
    }


    /**
     * 게시물 수정을 위한 수정페이지로 이동한다.
     * 
     * @param boardVO
     * @param vo
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/updateArticleManageView.do")
    public String updateArticleManageView(@ModelAttribute("searchVO") BoardVO boardVO, @ModelAttribute("board") BoardVO vo, ModelMap model)
	    throws Exception {

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	
		boardVO.setFrstRegisterId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		
		BoardMasterVO bmvo = new BoardMasterVO();
		BoardVO bdvo = new BoardVO();
		
		vo.setBbsId(boardVO.getBbsId());
		
		bmvo.setBbsId(boardVO.getBbsId());
		bmvo.setUniqId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
	
		if (isAuthenticated) {
		    bmvo = egovBBSMasterService.selectBBSMasterInf(bmvo);
		    bdvo = egovArticleService.selectArticleDetail(boardVO);
		}
	
		String nowDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		
		model.addAttribute("date", nowDate);
		model.addAttribute("articleVO", bdvo);
		model.addAttribute("boardMasterVO", bmvo);
		
		return "egiskorea/com/adm/info/updateArticleManageView";
		
    }

    /**
     * 게시물에 대한 내용을 수정한다.
     * 
     * @param boardVO
     * @param board
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/updateArticleManage.do")
    public String updateArticleManage(final MultipartHttpServletRequest multiRequest, @ModelAttribute("searchVO") BoardVO boardVO,
	    @ModelAttribute("bdMstr") BoardMaster bdMstr, @ModelAttribute("board") Board board, BindingResult bindingResult, ModelMap model) throws Exception {

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		if(!isAuthenticated) {	//KISA 보안취약점 조치 (2018-12-10, 이정은)
            return "egiskorea/com/uat/uia/loginUsr";
        }
		
		//--------------------------------------------------------------------------------------------
    	// @ XSS 대응 권한체크 체크  START
    	// param1 : 사용자고유ID(uniqId,esntlId)
    	//--------------------------------------------------------
    	LOGGER.debug("@ XSS 권한체크 START ----------------------------------------------");
    	//step1 DB에서 해당 게시물의 uniqId 조회
    	BoardVO vo = egovArticleService.selectArticleDetail(boardVO);
    	
    	//step2 EgovXssChecker 공통모듈을 이용한 권한체크
    	EgovXssChecker.checkerUserXss(multiRequest, vo.getFrstRegisterId()); 
      	LOGGER.debug("@ XSS 권한체크 END ------------------------------------------------");
    	//--------------------------------------------------------
    	// @ XSS 대응 권한체크 체크 END
    	//--------------------------------------------------------------------------------------------
	
		String atchFileId = boardVO.getAtchFileId();
	
		beanValidator.validate(board, bindingResult);
		if (bindingResult.hasErrors()) {
	
		    boardVO.setFrstRegisterId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		    
		    BoardMasterVO bmvo = new BoardMasterVO();
		    BoardVO bdvo = new BoardVO();
		    
		    bmvo.setBbsId(boardVO.getBbsId());
		    bmvo.setUniqId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
	
		    bmvo = egovBBSMasterService.selectBBSMasterInf(bmvo);
		    bdvo = egovArticleService.selectArticleDetail(boardVO);
	
		    model.addAttribute("articleVO", bdvo);
		    model.addAttribute("boardMasterVO", bmvo);
		    model.addAttribute("resultMsg", "fail.common.update");
		    
		    return "egiskorea/com/adm/info/updateArticleManageView";
		}
		
		if (isAuthenticated) {
		    
			final List<MultipartFile> files = multiRequest.getFiles("file_1");
		    if (!files.isEmpty()) {
				if (atchFileId == null || "".equals(atchFileId)) {
				    List<FileVO> result = fileUtil.parseFileInf(files, "BBS_", 0, atchFileId, "");
				    atchFileId = fileMngService.insertFileInfs(result);
				    board.setAtchFileId(atchFileId);
				} else {
				    FileVO fvo = new FileVO();
				    fvo.setAtchFileId(atchFileId);
				    int cnt = fileMngService.getMaxFileSN(fvo);
				    List<FileVO> _result = fileUtil.parseFileInf(files, "BBS_", cnt, atchFileId, "");
				    fileMngService.updateFileInfs(_result);
				}
		    }
	
		    board.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		    
		    board.setNtcrNm("");	// dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
		    board.setPassword("");	// dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
		    
		    board.setNttCn(unscript(board.getNttCn()));	// XSS 방지
		    
		    egovArticleService.updateArticle(board);
		    
		    model.addAttribute("resultMsg", "success.common.update");
		} else {
			model.addAttribute("resultMsg", "fail.common.update");
		}
		
		return "forward:/com/mngr/info/selectArticleManage.do";
    }

    /**
     * 게시물에 대한 내용을 삭제한다.
     * 
     * @param boardVO
     * @param board
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/deleteArticleManage.do")
    public String deleteArticleManage(HttpServletRequest request, @ModelAttribute("searchVO") BoardVO boardVO, @ModelAttribute("board") Board board,
	    @ModelAttribute("bdMstr") BoardMaster bdMstr, ModelMap model) throws Exception {
	
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	
		//--------------------------------------------------------------------------------------------
    	// @ XSS 대응 권한체크 체크  START
    	// param1 : 사용자고유ID(uniqId,esntlId)
    	//--------------------------------------------------------
    	LOGGER.debug("@ XSS 권한체크 START ----------------------------------------------");
    	//step1 DB에서 해당 게시물의 uniqId 조회
    	BoardVO vo = egovArticleService.selectArticleDetail(boardVO);
    	
    	//step2 EgovXssChecker 공통모듈을 이용한 권한체크
    	EgovXssChecker.checkerUserXss(request, vo.getFrstRegisterId()); 
      	LOGGER.debug("@ XSS 권한체크 END ------------------------------------------------");
    	//--------------------------------------------------------
    	// @ XSS 대응 권한체크 체크 END
    	//--------------------------------------------------------------------------------------------
		
		if (isAuthenticated) {
		    board.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		    
		    egovArticleService.deleteArticle(board);
		    
		    model.addAttribute("resultMsg", "success.common.delete");
		} else {
			model.addAttribute("resultMsg", "fail.common.delete");
		}
		
		return "forward:/com/mngr/info/selectArticleManageList.do";
    }
    
    /**
     * 게시물에 대한 내용을 일괄 삭제한다.
     * 
     * @param boardVO
     * @param board
     * @param model
     * @return
     * @throws Exception
     */
	@RequestMapping("/deleteArticleManageList.do")
	public String deleteArticleManageList(@RequestParam("nttIds") String nttIds, 
		HttpServletRequest request, @ModelAttribute("searchVO") BoardVO boardVO, @ModelAttribute("board") Board board,
	    @ModelAttribute("bdMstr") BoardMaster bdMstr, ModelMap model) throws Exception {
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		
		if (isAuthenticated) {
		
			String[] strNttIds = nttIds.split(";");
			
			board.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
			
			for (int i = 0; i < strNttIds.length; i++) {
				board.setNttId(Long.parseLong(strNttIds[i]));
				
			    egovArticleService.deleteArticle(board);
			    
			    model.addAttribute("resultMsg", "success.common.delete");
			}
		} else {
			model.addAttribute("resultMsg", "fail.common.delete");
		}
		
		return "forward:/com/mngr/info/selectArticleManageList.do";
	}
}
