/***********************************
* 공유지 관리 Controller
* @author  : 이혜인
* @since   : 2023.02.21
* @version : 1.0
************************************/
package egiskorea.com.job.publnd.web;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.cmm.service.CmmnCdVO;
import egiskorea.com.job.publnd.service.PbprtAccdtService;
import egiskorea.com.job.publnd.service.PbprtAccdtVO;
import egiskorea.com.job.publnd.service.PbprtAccdtWrinvstgService;
import egiskorea.com.job.publnd.service.PbprtAccdtWrinvstgVO;

@Controller
@RequestMapping(value = "/job/publnd")
public class PublndMngController {

	/* 공유재산 실태 Service */
	@Resource
	PbprtAccdtService pbprtAccdtService;

	@Resource
	PbprtAccdtWrinvstgService pbprtAccdtWrinvstgService;
	
	/**
	 * 공유재산 실태 목록 조회
	 * @param pbprtAccdtVO
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/selectPbprtAccdtList.do")
	public String selectPbprtAccdtList(PbprtAccdtVO pbprtAccdtVO, ModelMap model) {
		List<PbprtAccdtVO> pbprtAccdtList = null; 
		int cnt = 0;
		List<String> yearList = null;
		
		// 목록 조회
		pbprtAccdtList = pbprtAccdtService.selectPbprtAccdtList(pbprtAccdtVO);
		
		// 개수 조회
		cnt = pbprtAccdtService.selectPbprtAccdtListCnt(pbprtAccdtVO);
		
		// 연도 목록 조회
		yearList = pbprtAccdtService.selectPbprtAccdtYearList();
		
		model.addAttribute("pbprtAccdtList", pbprtAccdtList);
		model.addAttribute("cnt", cnt);
		model.addAttribute("yearList", yearList);
		
		return "egiskorea/com/job/publnd/pbprtAccdtListView";
	}
	
	/**
	 * 공유재산 실태조사 목록 조회 페이징처리
	 * @param pbprtAccdtVO
	 * @return
	 */
	@RequestMapping(value = "/selectPbprtAccdtPgeList.do")
	@ResponseBody
	public ModelAndView selectPbprtAccdtPgeList(PbprtAccdtVO pbprtAccdtVO) {
		ModelAndView mav = new ModelAndView("jsonView");
		List<PbprtAccdtVO> pbprtAccdtList = null;
		
		int cnt = 0;
		int pageNo = 0;
		pageNo = pbprtAccdtVO.getPageNo();
		if (pageNo != 0) {
			pageNo *= 10;
		}
		pbprtAccdtVO.setPageNo(pageNo);
		pbprtAccdtList = pbprtAccdtService.selectPbprtAccdtList(pbprtAccdtVO);
		cnt = pbprtAccdtService.selectPbprtAccdtListCnt(pbprtAccdtVO);
		
		mav.addObject("pbprtAccdtList", pbprtAccdtList);
		mav.addObject("cnt", cnt);
		
		return mav;
	}
	
	/**
	 * 공유재산 실태조사 정보 등록페이지 리턴
	 * @return
	 */
	@RequestMapping(value = "/insertPbprtAccdtView.do")
	public String insertPbprtAccdtView(ModelMap model){
		List<CmmnCdVO> ldcgCdList = null;
		// 지목 코드 목록 조회
		ldcgCdList = pbprtAccdtService.selectLdcgCdList();
		
		model.addAttribute("ldcgCdList", ldcgCdList);
		
		return "egiskorea/com/job/publnd/pbprtAccdtRegister";
	}
	
	/**
	 * 공유재산 실태조사 정보 등록
	 * @param pbprtAccdtVO
	 * @return
	 */
	@RequestMapping(value = "/insertPbprtAccdtInfo.do")
	@ResponseBody
	public ModelAndView insertPbprtAccdtInfo(PbprtAccdtVO pbprtAccdtVO, ModelMap model) {
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			pbprtAccdtService.insertPbprtAccdtInfo(pbprtAccdtVO);
			int no = pbprtAccdtVO.getPublndNo();
			mav.addObject("status", "success");
			mav.addObject("newPublndNo", no);
		} catch (Exception e) {
			mav.addObject("status", "fail");
		}
		
		return mav;
	}

	/**
	 * 공유재산 실태조사서 조회
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/selectPbprtAccdtWrinvstg.do")
	public String selectPbprtAccdtWrinvstg(int publndNo, Model model) throws Exception {
		
		PbprtAccdtWrinvstgVO pbprtInfo = null;
		pbprtInfo = pbprtAccdtService.selectPbprtAccdtWrinvstg(publndNo);
		
		List<CmmnCdVO> ldcgCdList = pbprtAccdtService.selectLdcgCdList();
		
		model.addAttribute("pbprtInfo", pbprtInfo);
		model.addAttribute("ldcgCdList", ldcgCdList);
		
		return "egiskorea/com/job/publnd/pbprtAccdtWrinvstg";
	}
	
	/**
	 * 공유재산 실태조사 정보 삭제 (사용여부를 통해 조회하기 떄문에 del_yn 수정)
	 * @param publndNo
	 * @return
	 */
	@RequestMapping(value = "/updatePbprtAccdtInfoDel.do")
	@ResponseBody
	public ModelAndView updatePbprtAccdtInfoDel(int publndNo) {
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			pbprtAccdtService.updatePbprtAccdtInfoDel(publndNo);
			mav.addObject("status", "success");
		} catch (Exception e) {
			mav.addObject("status", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 공유재산 실태조사 상세정보 조회
	 * @param publndNo
	 * @return
	 */
	@RequestMapping(value = "/selectPbprtAccdtDtlInfoView.do")
	public String selectPbprtAccdtInfoDtl(int publndNo, ModelMap model) {
		PbprtAccdtVO pbprtAccdtDtlInfoList = null;
		List<CmmnCdVO> ldcgCdList = null;
		
		// 지목 코드 목록 조회
		ldcgCdList = pbprtAccdtService.selectLdcgCdList();
		pbprtAccdtDtlInfoList = pbprtAccdtService.selectPbprtAccdtDtlInfo(publndNo);
		
		model.addAttribute("ldcgCd", ldcgCdList);
		model.addAttribute("pbprtAccdtDtlInfoList", pbprtAccdtDtlInfoList);
		
		return "egiskorea/com/job/publnd/pbprtAccdtDtlInfoView";		
	}
	
	/**
	 * 공유재산 실태조사 상세정보 수정
	 * @param publndNo
	 * @return
	 */
	@RequestMapping(value = "/updatePbprtAccdtInfo.do")
	@ResponseBody
	public ModelAndView updatePbprtAccdtInfo(PbprtAccdtVO pbprtAccdtVO) {
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			pbprtAccdtService.updatePbprtAccdtInfo(pbprtAccdtVO);
			mav.addObject("status", "success");
		} catch (Exception e) {
			mav.addObject("status", "fail");
		}
		
		return mav;
	}
	
//	/**
//	 * 공유재산 실태조사 엑셀 다운로드
//	 * @param pbprtAccdtVO
//	 * @param request
//	 * @param response
//	 * @param model
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/downloadPbprtAccdtExcelList.do")
//	public void downloadRoadSectionExcelList(
//			HttpServletRequest request,
//			HttpServletResponse response,
//			ModelMap mode, String year) throws Exception{
//		
//		pbprtAccdtService.selectPbprtAccdtExcelList(request, response, year);
//	}
	
	/**
	 * 공유재산 실태조사 엑셀 업로드 양식 다운로드
	 * @param request
	 * @param response
	 * @param model
	 * @throws Exception
	 */
	@RequestMapping(value = "/downloadPbprtAccdtExcelBassForm.do")
	public void downloadPbprtAccdtExcelBassForm(
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{ 
		
		pbprtAccdtService.downloadPbprtAccdtExcelBassForm(request, response);
	}
	
	/**
	 * 공유재산 실태조사 엑셀 업로드 페이지 리턴
	 * @return
	 */
	@RequestMapping(value = "/selectPbprtAccdtExcelUploadView.do")
	public String selectPbprtAccdtExcelUploadView(ModelMap model){
		List<String> yearList = null;
		
		// 연도 목록 조회
		yearList = pbprtAccdtService.selectPbprtAccdtYearList();
		
		model.addAttribute("yearList", yearList);
		
		return "egiskorea/com/job/publnd/pbprtAccdtExcelUploadView";
	}
	
	/**
	 * 공유재산 실태조사 엑셀 정보 등록
	 * @param snwdSrchVO
	 * @return
	 */
	@RequestMapping(value="/callPbprtAccdtExcel.do")
	@ResponseBody
	public ModelAndView callPbprtAccdtExcel(@ModelAttribute("pbprtAccdtVO") PbprtAccdtVO pbprtAccdtVO,
												MultipartHttpServletRequest request, HttpServletResponse response) throws SQLException, Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		
		//엑셀 파일
		MultipartFile file = request.getFile("pbprtAccdtFile");
		try {
    		//엑셀 업로드: 덮어쓰기
    		pbprtAccdtService.deletePbprtAccdtTotInfo(file);
    		mav.addObject("result", "success");
		} catch (NullPointerException e) {
			mav.addObject("result", "error");
		} catch (Exception e) {
			mav.addObject("result", "error");
		}
		return mav;
	}
	
	/**
	 * 공유재산 실태조사서 등록
	 * @param pbprtAccdtWrinvstgVO
	 * @return
	 */
	@RequestMapping(value="/insertPbprtAccdtWrinvstg.do")
	@ResponseBody
	public ModelAndView insertPbprtAccdtWrinvstg(@ModelAttribute("pbprtAccdtWrinvstgVO") PbprtAccdtWrinvstgVO pbprtAccdtWrinvstgVO,
												MultipartHttpServletRequest multiRequest) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			pbprtAccdtService.insertPbprtAccdtWrinvstg(pbprtAccdtWrinvstgVO, multiRequest);
			mav.addObject("status", "success");
		} catch (Exception e) {
			mav.addObject("status", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 공유재산 실태조사서 삭제
	 * @param publndNo
	 * @return
	 */
	@RequestMapping(value="/deletePbprtAccdtWrinvstg.do")
	@ResponseBody
	public ModelAndView deletePbprtAccdtWrinvstg(int publndNo) {
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			pbprtAccdtService.deletePbprtAccdtWrinvstg(publndNo);
			mav.addObject("status", "success");
		} catch (Exception e) {
			mav.addObject("status", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 공유재산 실태조사서 한글 파일 다운로드
	 * @param pbprtAccdtWrinvstgVO
	 * @return
	 */
	@RequestMapping(value="/downloadWrinvstgToHwpFile.do")
	public void downloadWrinvstgToHwpFile(PbprtAccdtWrinvstgVO pbprtAccdtWrinvstgVO, HttpServletRequest request, 
											HttpServletResponse response) throws Exception {
		pbprtAccdtWrinvstgService.downloadWrinvstgToHwpFile(pbprtAccdtWrinvstgVO, request, response);
	}
	
}
