package egiskorea.com.cmm.web;

import java.io.*;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import egiskorea.com.cmm.service.CmmUtils;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.EgovWebUtil;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.com.cmm.util.EgovResourceCloseHelper;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.service.EgovCmmUseService;

/**
 * @Description 공통 controller 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.01.04
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.04   이상화           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/com/cmm")
public class CommonController {
	/** egovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;

	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	/**
	 * 공통코드 목록
	 * 
	 * @param dataManageVO
	 * @param model
	 * @return "egiskorea/com/cmm/commonnessCodeList"
	 * @throws Exception
	 */
	@RequestMapping("/commonnessCodeList.do")
	public String commonnessCodeList(
			@ModelAttribute("comDefaultCodeVO") ComDefaultCodeVO vo,
			@RequestParam("returnType") String returnType,
			@RequestParam(value="addClass", required=false) String addClass,			
			ModelMap model) throws Exception {
		
		List<?> resultList = cmmUseService.selectCmmCodeDetail(vo);
		
		model.addAttribute("resultList", resultList);
		model.addAttribute("returnType", returnType);
		model.addAttribute("addClass", addClass);
				
		return "egiskorea/com/cmm/commonnessCodeList";
	}

	/**
	 * 
	 * @Description : 코드 검색 (ajax)
	 * @Author 최원석
	 * @Date 2022.02.01
	 * @param comDefaultCodeVO 공통 기본 코드 vo
	 * @return 코드 목록
	 * @throws Exception
	 */
	@RequestMapping("/selectCmmCodeDetail.do")
	public ModelAndView selectCmmCodeDetailList(ComDefaultCodeVO comDefaultCodeVO)  throws Exception {
		ModelAndView modelAndView = new ModelAndView("jsonView");
		modelAndView.addObject("list", cmmUseService.selectCmmCodeDetail(comDefaultCodeVO));
    	return modelAndView;
    }

	/**
	 * 예시) /com/cmm/image.do?attach=encrypt(MAPSERVICE_202202240134450600.png)
	 * @Description 기본업로드경로(Globals.fileStorePath) 안에 있는 첨부파일 이미지 미리보기
	 * @Author 플랫폼개발부문 DT솔루션 이준호
	 * @Date 2022.02.24
	 * @param attach 파일이름
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/image.do", method = RequestMethod.GET)
	@ResponseBody
	public void imageView(@RequestParam(value = "attach", required = false, defaultValue = "") String attach, HttpServletResponse response) throws Exception {

		if (StringUtils.isBlank(attach)) {
			throw new FileNotFoundException(egovMessageSource.getMessage("warning.file.param.not.filename"));
		}

		String path = EgovProperties.getProperty("Globals.fileStorePath");
		String fullpath = path + CmmUtils.decrypt(attach);
		File file = new File(EgovWebUtil.filePathBlackList(fullpath));

		if (!file.exists()) {
			throw new FileNotFoundException(fullpath);
		}

		if (!file.isFile()) {
			throw new FileNotFoundException(fullpath);
		}

		response.setContentType(EgovWebUtil.removeCRLF("image/jpeg"));
		response.setHeader("Content-Disposition", "filename=image;");

		BufferedInputStream fin = null;
		BufferedOutputStream outs = null;

		try {
			fin = new BufferedInputStream(new FileInputStream(file));
			outs = new BufferedOutputStream(response.getOutputStream());

			byte[] b = new byte[8192];
			int read = 0;
			while ((read = fin.read(b)) != -1) {
				outs.write(b, 0, read);
			}
		} finally {
			EgovResourceCloseHelper.close(outs, fin);
		}
	}
}
