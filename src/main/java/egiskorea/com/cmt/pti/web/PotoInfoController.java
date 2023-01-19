package egiskorea.com.cmt.pti.web;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import egiskorea.com.cmt.pti.service.PotoInfoService;
import egiskorea.com.cmt.pti.service.PotoInfoVO;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.com.cmm.service.FileVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 사진정보를 관리하는 controller 클래스
 * @author 오윤성
 * @since 2021.01.02
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.01.02   오윤성           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/cmt/pti")
public class PotoInfoController {
	
	private static final Logger logger = LoggerFactory.getLogger(PotoInfoController.class);
	
	@Resource(name = "potoInfoService")
	private PotoInfoService potoInfoService;
	
	@Resource(name = "EgovFileMngService")
	private EgovFileMngService egovFileMngService;
	
	@Resource(name="EgovFileMngUtil")
	private EgovFileMngUtil fileUtil;
	
	@Resource(name = "EgovFileMngService")
    private EgovFileMngService fileService;
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	/**
	 * 사진정보 목록
	 * 
	 * @param potoInfoVO
	 * @param model
	 * @return "egiskorea/com/cmt/pti/potoInfoList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectPotoList.do")
	public String selectPotoList(
			@ModelAttribute("searchVO") PotoInfoVO potoInfoVO,
			ModelMap model, HttpServletRequest request) throws Exception{
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		if(loginVO != null) {
			potoInfoVO.setEmplyrId(loginVO.getId());
		} else {
			logger.info("아이디가 존재하지 않습니다");
			potoInfoVO.setEmplyrId("webmaster");
		}
		potoInfoVO.setPageUnit(10);
		potoInfoVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(potoInfoVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(potoInfoVO.getPageUnit());
		paginationInfo.setPageSize(potoInfoVO.getPageSize());

		potoInfoVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		potoInfoVO.setLastIndex(paginationInfo.getLastRecordIndex());
		potoInfoVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = potoInfoService.selectPotoInfoList(potoInfoVO);
		  
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		Gson gson = new Gson();
		String gsonResultList = gson.toJson(map.get("resultList"));
		model.addAttribute("gsonResultList",gsonResultList);
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		  return "egiskorea/com/cmt/pti/potoInfoList";
	}
	
	/**
	 * 사진정보 상세조회
	 * 
	 * @param potoInfoVO
	 * @param model
	 * @return "egiskorea/com/cmt/pti/selectPotoInfoView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectPotoInfoView.do")
	public String selectPotoInfoView(
			@ModelAttribute("potoInfoVO") PotoInfoVO potoInfoVO,
			ModelMap model, HttpServletRequest request) throws Exception{
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		if(loginVO != null) {
			potoInfoVO.setEmplyrId(loginVO.getId());
		} else {
			logger.info("아이디가 존재하지 않습니다");
			potoInfoVO.setEmplyrId("webmaster");
		}
		
		String lastModfDt = potoInfoService.selectLastModfDt(potoInfoVO);
		String selectSubject = potoInfoService.selectSubject(potoInfoVO);
		potoInfoVO.setLastModfDt(lastModfDt);
		potoInfoVO.setSj(selectSubject);
		
		EgovMap result = potoInfoService.selectPotoInfoView(potoInfoVO);
		FileVO fileVO = new FileVO();
		fileVO.setAtchFileId((String) result.get("atchmnflId"));
		List<FileVO> resultFile = fileService.selectFileInfs(fileVO);
		Gson gson = new Gson();
		String gsonResultList = gson.toJson(result);
		model.addAttribute("pageIndex",potoInfoVO.getPageIndex());
		model.addAttribute("searchWrd",potoInfoVO.getSearchWrd());
		model.addAttribute("sortKind",potoInfoVO.getSortKind());
		model.addAttribute("searchCnd",potoInfoVO.getSearchCnd());
		model.addAttribute("lastModfDt",potoInfoVO.getLastModfDt());
		model.addAttribute("gsonResultList",gsonResultList);
		model.addAttribute("resultFile", resultFile);
		model.addAttribute("result", result);
		
		  return "egiskorea/com/cmt/pti/selectPotoInfoView";
	}
	
	/**
	 * 사진정보 등록 화면 호출
	 * 
	 * @param potoInfoVO
	 * @param model
	 * @param request
	 * @return "egiskorea/com/cmt/pti/insertPotoInfoView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertPotoInfoView.do")
	public String insertPotoInfoView(
			@ModelAttribute("searchVO") PotoInfoVO potoInfoVO,
			ModelMap model) throws Exception{
		
			model.addAttribute("emplyrId", potoInfoVO.getEmplyrId());
			model.addAttribute("pageIndex",potoInfoVO.getPageIndex());
			model.addAttribute("searchWrd",potoInfoVO.getSearchWrd());
			model.addAttribute("sortKind",potoInfoVO.getSortKind());
			model.addAttribute("searchCnd",potoInfoVO.getSearchCnd());
			
		  return "egiskorea/com/cmt/pti/insertPotoInfoView";
	}
	
	/**
	 * 사진정보 수정 화면 호출
	 * 
	 * @param potoInfoVO 사진 vo
	 * @param model
	 * @return "egiskorea/com/cmt/pti/updatePotoInfoView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updatePotoInfoView.do")
	public String updatePotoInfoView(
			@ModelAttribute("searchVO") PotoInfoVO potoInfoVO,
			ModelMap model, HttpServletRequest request) throws Exception{
		EgovMap result = potoInfoService.selectPotoInfoView(potoInfoVO);
		FileVO fileVO = new FileVO();
		fileVO.setAtchFileId((String) result.get("atchmnflId"));
		List<FileVO> resultFile = fileService.selectFileInfs(fileVO);
		Gson gson = new Gson();
		String gsonResultList = gson.toJson(result);
		model.addAttribute("pageIndex",potoInfoVO.getPageIndex());
		model.addAttribute("searchWrd",potoInfoVO.getSearchWrd());
		model.addAttribute("sortKind",potoInfoVO.getSortKind());
		model.addAttribute("searchCnd",potoInfoVO.getSearchCnd());
		model.addAttribute("gsonResultList",gsonResultList);
		model.addAttribute("resultFile", resultFile);
		model.addAttribute("result", result);
		  return "egiskorea/com/cmt/pti/updatePotoInfoView";
	}
	
	/**
	 * 사진정보 등록
	 * @param potoInfoVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertPotoInfo.do")
	public ModelAndView insertPotoInfo(
			@ModelAttribute("potoInfoVO") PotoInfoVO potoInfoVO,
			HttpServletRequest request, MultipartHttpServletRequest multiRequest
			,@RequestParam("fileCn")String[] fileCn) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		try {
				if(loginVO != null) {
					potoInfoVO.setEmplyrId(loginVO.getId());
				} else {
					logger.info("아이디가 존재하지 않습니다");
					potoInfoVO.setEmplyrId("webmaster");
				}
				List<FileVO> resultF = null;
				String atchFileId = "";
				Map<String, MultipartFile> files = multiRequest.getFileMap();
				if(!files.isEmpty()){
					resultF = fileUtil.parseFileInf(files, "POTO_", 0, "", "");
					for(int i=0; i<resultF.size(); ++i) {
			            resultF.get(i).fileCn = fileCn[i];
			        }
					atchFileId = egovFileMngService.insertFileInfs(resultF);  //파일이 생성되고나면 생성된 첨부파일 ID를 리턴한다.
					potoInfoVO.setAtchmnflId(atchFileId);
				}
				potoInfoService.insertPotoInfo(potoInfoVO);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 사진정보 수정
	 * @param potoInfoVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updatePotoInfo.do")
	public ModelAndView updatePotoInfo(
			@ModelAttribute("potoInfoVO") PotoInfoVO potoInfoVO, HttpServletRequest request,
			MultipartHttpServletRequest multiRequest,
			String[] updateFileCn) throws Exception{

		ModelAndView mav = new ModelAndView("jsonView");
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");


		try {
				if(loginVO != null) {
					potoInfoVO.setEmplyrId(loginVO.getId());
				} else {
					logger.info("아이디가 존재하지 않습니다");
					potoInfoVO.setEmplyrId("webmaster");
				}
				
				String atchFileId = potoInfoVO.getAtchmnflId();
				Map<String, MultipartFile> files = multiRequest.getFileMap();
			
				if(!files.isEmpty()){
					if("".equals(atchFileId)){
						List<FileVO> result = fileUtil.parseFileInf(files, "POTO_", 0, atchFileId, "");
						for(int i=0; i<result.size(); ++i) {
				            result.get(i).fileCn = updateFileCn[i];
				        }
						atchFileId = egovFileMngService.insertFileInfs(result); 
						potoInfoVO.setAtchmnflId(atchFileId); 
					}else{
						FileVO fvo = new FileVO();
						fvo.setAtchFileId(atchFileId);
						int cnt = egovFileMngService.getMaxFileSN(fvo); 
						List<FileVO> result = fileUtil.parseFileInf(files, "POTO_", cnt, atchFileId, "");
						for(int i=0; i<result.size(); ++i) {
				            result.get(i).fileCn = updateFileCn[i];
				        }
						egovFileMngService.updateFileInfs(result);
					}
				}
			potoInfoService.updatePotoInfo(potoInfoVO);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 사진정보 내용 수정
	 * @param PotoInfoVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateFileDetail.do")
	public ModelAndView updateFileDetail(
			@ModelAttribute("potoInfoVO") PotoInfoVO potoInfoVO, HttpServletRequest request,
			@RequestParam("updateFileCn")String updateFileCn, @RequestParam("updateFileSn")String updateFileSn) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		
		try {
				if(loginVO != null) {
					potoInfoVO.setEmplyrId(loginVO.getId());
				} else {
					logger.info("아이디가 존재하지 않습니다");
					potoInfoVO.setEmplyrId("webmaster");
				}
				
				String atchFileId = potoInfoVO.getAtchmnflId();
				FileVO fvo = new FileVO();
				fvo.setAtchFileId(atchFileId);
				fvo.setFileSn(updateFileSn);
				fvo.setFileCn(updateFileCn);
				potoInfoService.updateFileDetail(fvo);
				
				
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 사진정보 삭제
	 * @param PotoInfoVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/deletePotoInfo.do")
	public ModelAndView deletePotoInfo(
			@ModelAttribute("potoInfoVO") PotoInfoVO potoInfoVO,
			HttpServletRequest request) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			FileVO fileVO = new FileVO();
			fileVO.setAtchFileId(potoInfoVO.getAtchmnflId());
			fileVO.setFileSn(potoInfoVO.getFileSn());
			egovFileMngService.deleteAllFileInf(fileVO);
			potoInfoService.deletePotoInfo(potoInfoVO);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 사진 삭제
	 * @param PotoInfoVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/deletePoto.do")
	public ModelAndView deletePoto(
			@ModelAttribute("potoInfoVO") PotoInfoVO potoInfoVO,
			HttpServletRequest request) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			FileVO fileVO = new FileVO();
			fileVO.setAtchFileId(potoInfoVO.getAtchmnflId());
			fileVO.setFileSn(potoInfoVO.getFileSn());
			egovFileMngService.deleteFileInf(fileVO);
			potoInfoService.deletePotoInfo(potoInfoVO);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 사진 다운로드
	 * @param PotoInfoVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/downPoto.do")
	public ModelAndView downPoto(
			@ModelAttribute("potoInfoVO") PotoInfoVO potoInfoVO,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			String stordFilePath = EgovProperties.getProperty("Globals.fileStorePath");
			 
			// 저장된 파일명
			String filename = request.getParameter("filename");
			// 첨부된 원 파일명
			String original = request.getParameter("original");
			 
			if ("".equals(original)) {
				original = filename;
			}
			 
			request.setAttribute("downFile", stordFilePath + filename);
			request.setAttribute("orginFile", original);
			 
			EgovFileMngUtil.downFile(request, response);
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
}
