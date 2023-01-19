package egiskorea.com.mngr.sver.web;


import egiskorea.com.mngr.sver.service.MapServiceManageService;
import egiskorea.com.mngr.sver.service.MapServiceVO;
import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.EgovBrowserUtil;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.com.cmm.util.EgovBasicLogger;
import egovframework.com.cmm.util.EgovResourceCloseHelper;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.apache.commons.lang.StringUtils;
import org.apache.tika.Tika;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springmodules.validation.commons.DefaultBeanValidator;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.beans.PropertyEditorSupport;
import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import egiskorea.com.cmm.service.CmmUtils;

/**
 * @Description 지도 서비스 Controller
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.02.16
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.16		이준호	최초 생성
 *
 */

@Controller
@RequestMapping(value = "/com/mngr/sver/*")
public class MapServiceManageController {

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;

	@Resource(name = "mapServiceManageService")
	private MapServiceManageService mapServiceManageService;

	@Resource(name = "beanValidator")
	private DefaultBeanValidator beanValidator;

	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;

	/* 날짜 포메터 */
	private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"); //ex) 2022-02-10 패턴

	/**
	 * @Description 지도서비스관리 목록
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.02.16
	 * @param mapServiceVO
	 * @param model
	 * @return "egiskorea/com/adm/sver/selectMapServiceManageList"
	 * @throws Exception
	 */
	@RequestMapping(value="/selectMapServiceManageList.do", method = {RequestMethod.GET, RequestMethod.POST})
	public String selectMapServiceManageList(@ModelAttribute("searchVO") MapServiceVO mapServiceVO, Model model) throws Exception {

		/** EgovPropertyService.sample(외부 프로퍼티 값 적용) */
		mapServiceVO.setPageUnit(propertiesService.getInt("pageUnit"));
		mapServiceVO.setPageSize(propertiesService.getInt("pageSize"));

		/** pageing */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(mapServiceVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(mapServiceVO.getPageUnit());
		paginationInfo.setPageSize(mapServiceVO.getPageSize());

		mapServiceVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		mapServiceVO.setLastIndex(paginationInfo.getLastRecordIndex());
		mapServiceVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		List<MapServiceVO> mapServiceList = mapServiceManageService.selectMapServiceManageList(mapServiceVO); //지도서비스 목록 조회
		model.addAttribute("mapServiceList", mapServiceList);

		int mapServiceCount = mapServiceManageService.selectMapServiceManageListCnt(mapServiceVO); //주제도 전체 목록 갯수
		paginationInfo.setTotalRecordCount(mapServiceCount);
		model.addAttribute("paginationInfo", paginationInfo);

		return "egiskorea/com/adm/sver/selectMapServiceManageList";
	}

	/**
	 * @Description 지도서비스 상세보기 화면
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.02.16
	 * @param mapServiceVO
	 * @param model
	 * @return "egiskorea/com/adm/sver/selectMapServiceManage"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectMapServiceManage.do", method = RequestMethod.POST)
	public String selectMapServiceManage(@ModelAttribute("searchVO") MapServiceVO mapServiceVO, Model model) throws Exception {

		//고유값ID가 없을 경우.
		if (StringUtils.isBlank(mapServiceVO.getMapserviceId())) {
			return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrSver.MapSvcManage.empty.mapserviceIds"));
		}

		MapServiceVO newMapServiceVO = mapServiceManageService.selectMapServiceManage(mapServiceVO);

		model.addAttribute("mapServiceVO", newMapServiceVO); //지도서비스 조회
		return "egiskorea/com/adm/sver/selectMapServiceManage";
	}

	/**
	 * @Description form에서 Controller로 값 넘어올때 객체 바인딩 시 LocalDateTime 타입 변수를 String -> LocalDateTime 자동으로 변환해준다.
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.02.16
	 * @param binder
	 */
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(LocalDateTime.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String text) throws IllegalArgumentException {
				LocalDateTime localDateTime = LocalDateTime.parse(text, FORMATTER);
				setValue(localDateTime);
			}
		});
	}

	/**
	 * @Description 배경지도 종류를 불러오는 메소드(private)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.08
	 * @param model
	 */
	private void mapCodesInit(Model model) throws Exception {
		ComDefaultCodeVO comDefaultCodeVO = new ComDefaultCodeVO(); //공통코드를 가져오기 위한 Vo
		comDefaultCodeVO.setCodeId("MSC01"); //지도서비스 배경지도 분류 코드

		model.addAttribute("mapCodes", cmmUseService.selectCmmCodeDetail(comDefaultCodeVO));
	}

	/**
	 * @Description 지도서비스 등록 화면
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.02.16
	 * @param mapServiceVO
	 * @return "egiskorea/com/adm/sver/insertMapServiceManageView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertMapServiceManageView.do", method = RequestMethod.POST)
	public String insertMapServiceManageView(@ModelAttribute("mapServiceVO") MapServiceVO mapServiceVO, Model model) throws Exception {

		LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser(); //로그인 조회
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); //로그인 여부

		LocalDateTime localDateTime = LocalDateTime.now(); //오늘 날짜
		mapServiceVO.setFrstRegistDt(localDateTime); //생성일 넣기
		mapServiceVO.setLastModfDt(localDateTime); //수정일 넣기

		mapCodesInit(model); //지도종류 select tag생성을 위한 초기화

		if (isAuthenticated) { //로그인 인증 성공시
			mapServiceVO.setFrstRegisterId(user == null ? "" : EgovStringUtil.isNullToString(user.getName())); //생성자 넣기
			mapServiceVO.setLastUpdusrId(user == null ? "" : EgovStringUtil.isNullToString(user.getName())); //수정자 넣기
		}

		return "egiskorea/com/adm/sver/insertMapServiceManageView";
	}

	/**
	 * @Description 지도서비스관리 등록 process(프로세스)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.02.16
	 * @param mapServiceVO
	 * @param bindingResult
	 * @param multipartFile
	 * @param model
	 * @return "redirect:/com/mngr/sver/selectMapServiceManageList.do"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertMapServiceManage.do", method = RequestMethod.POST)
	public String insertMapServiceManage(@ModelAttribute("mapServiceVO") MapServiceVO mapServiceVO, BindingResult bindingResult,
										 @RequestParam(value = "attach", required = false) MultipartFile multipartFile, Model model) throws Exception {

		String message = "";

		beanValidator.validate(mapServiceVO, bindingResult); //유효성 검사
		if (bindingResult.hasErrors()) {
			mapCodesInit(model); //지도종류 select tag생성을 위한 초기화
			return "egiskorea/com/adm/sver/insertMapServiceManageView";
		}

		if (!multipartFile.isEmpty()) { //업로드 파일이 있을 경우.
			String mimeType = new Tika().detect(multipartFile.getInputStream()); //파일타입 구하기.
			if (!mimeType.contains("image")) { //이미지가 아닐경우 등록 페이지로 리턴
				return CmmUtils.alertBack(model, egovMessageSource.getMessage("warning.file.notimage.extension"));
			}

			boolean isUpload = mapServiceManageService.fileUpload(multipartFile, mapServiceVO); //업로드 후 성공 시 mapServiceVO에 정보 넣기
			if (!isUpload) { //업로드 실패시
				return CmmUtils.alertBack(model, egovMessageSource.getMessage("errors.file.transfer"));
			}
		}

		int affectedRow = mapServiceManageService.insertMapServiceManage(mapServiceVO); //지도서비스 등록
		if (affectedRow > 0) {
			message = egovMessageSource.getMessage("success.common.insert");
		} else {
			message = egovMessageSource.getMessage("fail.common.insert");
		}

		return CmmUtils.postAlertHref(model, message, "/com/mngr/sver/selectMapServiceManageList.do", mapServiceVO, null);
	}

	/**
	 * @Description 지도서비스관리 수정 화면
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.02.16
	 * @param mapServiceVO
	 * @param model
	 * @return "egiskorea/com/adm/sver/updateTMapManageView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateMapServiceManageView.do", method = RequestMethod.POST)
	public String updateMapServiceManageView(@ModelAttribute("mapServiceVO") MapServiceVO mapServiceVO, Model model) throws Exception {

		//고유값ID가 없을 경우.
		if (StringUtils.isBlank(mapServiceVO.getMapserviceId())) {
			return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrSver.MapSvcManage.empty.mapserviceIds"));
		}

		LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser(); //로그인 조회
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated(); //로그인 여부

		MapServiceVO newMapServiceVO = mapServiceManageService.selectMapServiceManage(mapServiceVO); //지도서비스 조회

		LocalDateTime localDateTime = LocalDateTime.now(); //오늘 날짜
		newMapServiceVO.setLastModfDt(localDateTime); //수정일 넣기

		//검색 hidden값 새로운 vo에 넣어주기
		newMapServiceVO.setPageIndex(mapServiceVO.getPageIndex());
		newMapServiceVO.setSearchCondition(mapServiceVO.getSearchCondition());
		newMapServiceVO.setSearchKeyword(mapServiceVO.getSearchKeyword());

		mapCodesInit(model); //지도종류 select tag생성을 위한 초기화

		if (isAuthenticated) { //로그인 인증 성공시
			newMapServiceVO.setLastUpdusrId(user == null ? "" : EgovStringUtil.isNullToString(user.getName())); //수정자 넣기
		}

		model.addAttribute("mapServiceVO", newMapServiceVO);
		return "egiskorea/com/adm/sver/updateMapServiceManageView";
	}

	/**
	 * @Description 지도서비스관리 수정 process(프로세스)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.02.16
	 * @param mapServiceVO
	 * @param bindingResult
	 * @param multipartFile
	 * @param model
	 * @return "redirect:/com/mngr/sver/selectMapServiceManage.do"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateMapServiceManage.do", method = RequestMethod.POST)
	public String updateMapServiceManage(@ModelAttribute("mapServiceVO") MapServiceVO mapServiceVO, BindingResult bindingResult,
										 @RequestParam(value = "attach", required = false) MultipartFile multipartFile, Model model) throws Exception {
		String message = "";
		//고유값ID가 없을 경우.
		if (StringUtils.isBlank(mapServiceVO.getMapserviceId())) {
			return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrSver.MapSvcManage.empty.mapserviceIds"));
		}

		beanValidator.validate(mapServiceVO, bindingResult); //유효성 검사
		if (bindingResult.hasErrors()) {
			mapCodesInit(model); //지도종류 select tag생성을 위한 초기화
			return "egiskorea/com/adm/sver/updateMapServiceManageView";
		}

		/**
		 * 기존에 첨부파일 정보를 위해 이전 지도서비스 정보 조회 한다.
		 * 새로운 첨부파일이 없어도 이전 첨부파일 정보를 넣어줘야 기존 첨부파일 정보가 유지된다.
		 * 또한 새로운 첨부파일이 있을 경우에도 기존 첨부파일을 삭제 하기위해 정보가 필요하다.
		 */
		MapServiceVO oldMapServiceVO = mapServiceManageService.selectMapServiceManage(mapServiceVO);
		if (StringUtils.isNotBlank(oldMapServiceVO.getOriginalFileNm()) && StringUtils.isNotBlank(oldMapServiceVO.getStreFileNm())) {
			mapServiceVO.setOriginalFileNm(oldMapServiceVO.getOriginalFileNm());
			mapServiceVO.setStreFileNm(oldMapServiceVO.getStreFileNm());
		}

		if (!multipartFile.isEmpty()) { //업로드 파일이 있을 경우.
			String mimeType = new Tika().detect(multipartFile.getInputStream()); //파일타입 구하기.
			if (!mimeType.contains("image")) { //이미지가 아닐경우 등록 페이지로 리턴
				return CmmUtils.alertBack(model, egovMessageSource.getMessage("warning.file.notimage.extension"));
			}

			boolean isUpload = mapServiceManageService.fileUpload(multipartFile, mapServiceVO); //업로드 후 성공 시 mapServiceVO에 정보 넣기
			if (!isUpload) { //업로드 실패시
				return CmmUtils.alertBack(model, egovMessageSource.getMessage("errors.file.transfer"));
			} else { //업로드 성공시 이전 첨부파일이 있을 경우 삭제 해준다.
				mapServiceManageService.fileDelete(oldMapServiceVO);
			}
		}

		int affectedRow = mapServiceManageService.updateMapServiceManage(mapServiceVO); //지도서비스 수정
		if (affectedRow > 0) {
			message = egovMessageSource.getMessage("success.common.update");
		} else {
			message = egovMessageSource.getMessage("fail.common.update");
		}

		return CmmUtils.postAlertHref(model, message, "/com/mngr/sver/selectMapServiceManage.do", mapServiceVO, null);
	}

	/**
	 * @Description 지도서비스관리 삭제 process(프로세스)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.02.16
	 * @param mapServiceVO
	 * @param model
	 * @return "redirect:/com/mngr/info/selectTMapManageList.do"
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteMapServiceManage.do", method = RequestMethod.POST)
	public String deleteMapServiceManage(@ModelAttribute("mapServiceVO") MapServiceVO mapServiceVO, Model model) throws Exception {

		String message = "";

		//고유값ID가 없을 경우.
		if (StringUtils.isBlank(mapServiceVO.getMapserviceId())) {
			return CmmUtils.alertBack(model, egovMessageSource.getMessage("comMngrSver.MapSvcManage.empty.mapserviceIds"));
		}

		int affectedRow = mapServiceManageService.deleteMapServiceManage(mapServiceVO); //지도서비스 삭제
		if (affectedRow > 0) {
			message = egovMessageSource.getMessage("success.common.delete");
		} else {
			message = egovMessageSource.getMessage("fail.common.delete");
		}

		return CmmUtils.postAlertHref(model, message, "/com/mngr/sver/selectMapServiceManageList.do", mapServiceVO, null);
	}

	/**
	 * @Description 지도서비스 선택(체크) 삭제 process(프로세스)
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.02.16
	 * @param mapserviceIds
	 * @param model
	 * @return mav(jsonView)
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteMapServiceManageList.do", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView deleteMapServiceManageList(@RequestParam(value = "mapserviceIds[]", required = false, defaultValue = "") List<String> mapserviceIds, Model model) throws Exception {

		ModelAndView mav = new ModelAndView("jsonView");

		if (mapserviceIds.size() < 1) {
			model.addAttribute("callback", "warning");
			model.addAttribute("message", egovMessageSource.getMessage("comMngrSver.MapSvcManage.empty.mapserviceIds"));
			return mav;
		}

		int affectedRow = 0;
		for (String mapserviceId : mapserviceIds) {
			MapServiceVO mapServiceVO = new MapServiceVO();
			mapServiceVO.setMapserviceId(mapserviceId);
			affectedRow += mapServiceManageService.deleteMapServiceManage(mapServiceVO); //주제도 삭제
		}

		if (mapserviceIds.size() == affectedRow) {
			model.addAttribute("callback", "success");
			model.addAttribute("message", mapserviceIds.size() + "개의 목록이 " + egovMessageSource.getMessage("success.common.delete"));
		} else {
			model.addAttribute("callback", "fail");
			model.addAttribute("message", mapserviceIds.size() + "개의 목록이 " + egovMessageSource.getMessage("fail.common.delete"));
		}

		return mav;
	}


	/**
	 * @Description 지도서비스 첨부파일 삭제
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.02.25
	 * @param mapserviceId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteMapServiceManageFile.do", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView deleteMapServiceManageFile(@RequestParam(value = "mapserviceId", required = false, defaultValue = "") String mapserviceId, Model model) throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");

		if (StringUtils.isBlank(mapserviceId)) {
			model.addAttribute("callback", "warning");
			model.addAttribute("message", egovMessageSource.getMessage("comMngrSver.MapSvcManage.empty.mapserviceIds"));
			return mav;
		}

		//지도서비스 객체 생성후 지도서비스 고유값ID값 넣어주기.
		MapServiceVO mapServiceVO = new MapServiceVO();
		mapServiceVO.setMapserviceId(mapserviceId);

		MapServiceVO oldMapServiceVO = mapServiceManageService.selectMapServiceManage(mapServiceVO);

		//지도 서비스가 존재 하지 않을 경우
		if (oldMapServiceVO == null) {
			model.addAttribute("callback", "warning");
			model.addAttribute("message", egovMessageSource.getMessage("comMngrSver.MapSvcManage.null"));
		}

		int affectedRow = mapServiceManageService.fileDelete(oldMapServiceVO);
		if (affectedRow > 0) {
			model.addAttribute("callback", "success");
			model.addAttribute("message", egovMessageSource.getMessage("success.file.delete"));
		} else {
			model.addAttribute("callback", "fail");
			model.addAttribute("message", egovMessageSource.getMessage("fail.file.delete"));
		}

		return mav;
	}

	/**
	 * @Description 지도서비스 첨부파일 다운로드
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.03.02
	 * @param mapServiceVO
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/fileDown.do", method = RequestMethod.GET)
	@ResponseBody
	public void fileDownload(MapServiceVO mapServiceVO, HttpServletRequest request, HttpServletResponse response) throws Exception {

		if (StringUtils.isBlank(mapServiceVO.getMapserviceId())) { //고유값ID가 없을 경우
			CmmUtils.mvAlertClose(egovMessageSource.getMessage("warning.file.param.not.filename"));
		}

		MapServiceVO oldMapServiceVO = mapServiceManageService.selectMapServiceManage(mapServiceVO);

		if (oldMapServiceVO == null) { //지도서비스 정보가 없을 경우
			CmmUtils.mvAlertClose(egovMessageSource.getMessage("comMngrSver.MapSvcManage.null"));
		}

		if (StringUtils.isBlank(oldMapServiceVO.getStreFileNm())) { //파일 이름이 없을 경우(업로드된 파일이 없을 경우)
			CmmUtils.mvAlertClose(egovMessageSource.getMessage("warning.file.not.upload"));
		}

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {

			String path = EgovProperties.getProperty("Globals.fileStorePath");
			String fullpath = path + oldMapServiceVO.getStreFileNm();

			File uFile = new File(fullpath);
			long fSize = uFile.length();

			if (!uFile.exists() || !uFile.isFile()) { //파일이 존재 하지 않을경우
				CmmUtils.mvAlertClose(egovMessageSource.getMessage("warning.file.not.exists"));
			}

			if (fSize > 0) {
				String mimetype = "application/x-msdownload";

				String userAgent = request.getHeader("User-Agent");
				HashMap<String,String> result = EgovBrowserUtil.getBrowser(userAgent);
				if ( !EgovBrowserUtil.MSIE.equals(result.get(EgovBrowserUtil.TYPEKEY)) ) {
					mimetype = "application/x-stuff";
				}

				String contentDisposition = EgovBrowserUtil.getDisposition(oldMapServiceVO.getOriginalFileNm(), userAgent, "UTF-8");
				//response.setBufferSize(fSize);	// OutOfMemeory 발생
				response.setContentType(mimetype);
				//response.setHeader("Content-Disposition", "attachment; filename=\"" + contentDisposition + "\"");
				response.setHeader("Content-Disposition", contentDisposition);
				response.setContentLengthLong(fSize);

				/*
				 * FileCopyUtils.copy(in, response.getOutputStream());
				 * in.close();
				 * response.getOutputStream().flush();
				 * response.getOutputStream().close();
				 */
				BufferedInputStream in = null;
				BufferedOutputStream out = null;

				try {
					in = new BufferedInputStream(new FileInputStream(uFile));
					out = new BufferedOutputStream(response.getOutputStream());

					FileCopyUtils.copy(in, out);
					out.flush();
				} catch (IOException ex) {
					// 다음 Exception 무시 처리
					// Connection reset by peer: socket write error
					EgovBasicLogger.ignore("IO Exception", ex);
				} finally {
					EgovResourceCloseHelper.close(in, out);
				}

			} else { //용량 0바이트 파일일 경우
				CmmUtils.mvAlertClose(egovMessageSource.getMessage("warning.file.zero.size.download"));
			}
		}
	}

}
