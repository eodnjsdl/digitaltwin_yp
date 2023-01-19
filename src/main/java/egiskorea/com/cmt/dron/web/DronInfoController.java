package egiskorea.com.cmt.dron.web;

import egiskorea.com.cmt.dron.service.DronInfoService;

import egiskorea.com.cmt.dron.service.DronInfoVO;
import egiskorea.com.cmt.fvrt.web.FavoritesController;
import egiskorea.com.cmt.pti.service.PotoInfoVO;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.FileVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.apache.commons.io.FileUtils;
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

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description 드론영상 관리하는 controller 클래스
 * @author 배윤성
 * @since 2022.01.20
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.01.20   배윤성           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/cmt/dron")
public class DronInfoController {

    private static final Logger logger = LoggerFactory.getLogger(FavoritesController.class);

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
    @Resource(name = "EgovFileMngService")
    private EgovFileMngService egovFileMngService;

    @Resource(name="dronInfoService")
    private DronInfoService dronInfoService;
    @Resource(name="EgovFileMngUtil")
    private EgovFileMngUtil fileUtil;

    @Resource(name = "EgovFileMngService")
    private EgovFileMngService fileService;

    /**
     * 즐겨찾기 목록
     *
     * @param
     * @param model
     * @return "egiskorea/com/cmt/dron/selectFavoritesList"
     * @throws Exception
     */
    @RequestMapping(value = "/selectDronList.do")
    public String selectDronsList(
            @ModelAttribute("searchVO") DronInfoVO dronInfoVO,
            ModelMap model, HttpServletRequest request) throws Exception {
        LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
        if(loginVO != null) {

            dronInfoVO.setEmplyrId(loginVO.getId());
        } else {
            logger.info("아이디가 존재하지 않습니다");

            dronInfoVO.setEmplyrId("webmaster");
        }
        dronInfoVO.setPageUnit(4);
        dronInfoVO.setPageSize(propertyService.getInt("pageSize"));
        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(dronInfoVO.getPageIndex());
        paginationInfo.setRecordCountPerPage(dronInfoVO.getPageUnit());
        paginationInfo.setPageSize(dronInfoVO.getPageSize());
        dronInfoVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        dronInfoVO.setLastIndex(paginationInfo.getLastRecordIndex());
        dronInfoVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

        Map<String, Object> map = dronInfoService.selectDronInfoList(dronInfoVO);

        int totCnt = Integer.parseInt((String)map.get("resultCnt"));

        paginationInfo.setTotalRecordCount(totCnt);

        model.addAttribute("resultList", map.get("resultList"));
        model.addAttribute("resultCnt", map.get("resultCnt"));
        model.addAttribute("paginationInfo", paginationInfo);
        return "egiskorea/com/cmt/dron/dronList";
    }


    @RequestMapping(value = "/insertDronInfoView.do")
    public String insertDronInfoView(
            @ModelAttribute("searchVO") DronInfoVO dronInfoVO,
            ModelMap model) throws Exception{

		model.addAttribute("pageIndex",dronInfoVO.getPageIndex());
		model.addAttribute("searchWrd",dronInfoVO.getSearchWrd());
		model.addAttribute("sortKind",dronInfoVO.getSortKind());
		model.addAttribute("searchCnd",dronInfoVO.getSearchCnd());
		
        return "egiskorea/com/cmt/dron/insertDronInfoView";
    }

    /**
     * 드론정보 등록
     * @param dronInfoVO
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/insertDronInfo.do")
    public ModelAndView insertDronInfo(
            @ModelAttribute("dronInfoVO") DronInfoVO dronInfoVO,
            HttpServletRequest request, MultipartHttpServletRequest multiRequest
            ) throws Exception{
        ModelAndView mav = new ModelAndView("jsonView");
        LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
        try {
            if(loginVO != null) {
                dronInfoVO.setEmplyrId(loginVO.getId());
            } else {
                logger.info("아이디가 존재하지 않습니다");
                dronInfoVO.setEmplyrId("webmaster");
            }
            List<FileVO> resultF = null;
            String atchFileId = "";
            Map<String, MultipartFile> files = multiRequest.getFileMap();
            if(!files.isEmpty()){
                resultF = fileUtil.parseFileInf(files, "DRON_", 0, "", "");
                if(resultF.get(0).fileExtsn.equals("mp4")||resultF.get(0).fileExtsn.equals("avi")){
                   String  mb=  FileUtils.byteCountToDisplaySize(Long.parseLong(resultF.get(0).fileMg));
                    resultF.get(0).setFileMg(mb.substring(0,mb.length()-3));
                }
                atchFileId = egovFileMngService.insertFileInfs(resultF);  //파일이 생성되고나면 생성된 첨부파일 ID를 리턴한다.


                dronInfoVO.setAtchmnflId(atchFileId);
            }
            dronInfoService.insertDronInfo(dronInfoVO);
            mav.addObject("result", "success");
        } catch(Exception e) {
            logger.info(e.getMessage());

            mav.addObject("result", "fail");
        }
        return mav;
    }
    /**
     * 드론정보 상세조회
     *
     * @param dronInfoVO
     * @param model
     * @return "egiskorea/com/cmt/dron/selectDronInfoView"
     * @throws Exception
     */
    @RequestMapping(value = "/selectDronInfoView.do")
    public String selectdronInfoView(
            @ModelAttribute("dronInfoVO") DronInfoVO dronInfoVO,
            ModelMap model, HttpServletRequest request) throws Exception{
        LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
        if(loginVO != null) {
            dronInfoVO.setEmplyrId(loginVO.getId());
        } else {
            logger.info("아이디가 존재하지 않습니다");
            dronInfoVO.setEmplyrId("webmaster");
        }
        
		String lastModfDt = dronInfoService.selectLastModfDt(dronInfoVO);
		String selectSubject = dronInfoService.selectSubject(dronInfoVO);
		dronInfoVO.setLastModfDt(lastModfDt);
		dronInfoVO.setSj(selectSubject);
		
        EgovMap result = dronInfoService.selectDronInfoView(dronInfoVO);
        FileVO fileVO = new FileVO();
        fileVO.setAtchFileId((String) result.get("atchmnflId"));
        List<FileVO> resultFile = fileService.selectFileInfs(fileVO);

        model.addAttribute("pageIndex",dronInfoVO.getPageIndex());
        model.addAttribute("searchWrd",dronInfoVO.getSearchWrd());
        model.addAttribute("sortKind",dronInfoVO.getSortKind());
        model.addAttribute("searchCnd",dronInfoVO.getSearchCnd());
        model.addAttribute("lastModfDt",dronInfoVO.getLastModfDt());
        model.addAttribute("resultFile", resultFile);
        model.addAttribute("result", result);

        return "egiskorea/com/cmt/dron/selectDronInfoView";
    }


    /**
     * 드론정보 수정 화면 호출
     *
     * @param dronInfoVO
     * @param model
     * @return "egiskorea/com/cmt/dron/updateDronInfoView"
     * @throws Exception
     */
    @RequestMapping(value = "/updateDronInfoView.do")
    public String updatePotoInfoView(
            @ModelAttribute("dronInfoVO") DronInfoVO dronInfoVO,
            ModelMap model, HttpServletRequest request) throws Exception{
        EgovMap result = dronInfoService.selectDronInfoView(dronInfoVO);
        FileVO fileVO = new FileVO();
        fileVO.setAtchFileId((String) result.get("atchmnflId"));
        List<FileVO> resultFile = fileService.selectFileInfs(fileVO);

        model.addAttribute("pageIndex",dronInfoVO.getPageIndex());
        model.addAttribute("searchWrd",dronInfoVO.getSearchWrd());
        model.addAttribute("sortKind",dronInfoVO.getSortKind());
        model.addAttribute("searchCnd",dronInfoVO.getSearchCnd());
        model.addAttribute("resultFile", resultFile);
        model.addAttribute("result", result);
        return "egiskorea/com/cmt/dron/updateDronInfoView";

    }
    @RequestMapping(value = "/updateDronInfo.do")
    public ModelAndView updatePotoInfo(
            @ModelAttribute("dronInfoVO") DronInfoVO dronInfoVO, HttpServletRequest request, MultipartHttpServletRequest multiRequest) throws Exception {
        ModelAndView mav = new ModelAndView("jsonView");
        LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
        try {
            if(loginVO != null) {
                dronInfoVO.setEmplyrId(loginVO.getId());
            } else {
                logger.info("아이디가 존재하지 않습니다");
                dronInfoVO.setEmplyrId("webmaster");
            }
            String atchFileId = dronInfoVO.getAtchmnflId();
            Map<String, MultipartFile> files = multiRequest.getFileMap();
            if(!files.isEmpty()){
                if("".equals(atchFileId)){
                    List<FileVO> result = fileUtil.parseFileInf(files, "DRON_", 0, atchFileId, "");
                    if(result.get(0).fileExtsn.equals("mp4")||result.get(0).fileExtsn.equals("avi")){
                        String  mb=  FileUtils.byteCountToDisplaySize(Long.parseLong(result.get(0).fileMg));
                        result.get(0).setFileMg(mb.substring(0,mb.length()-3));
                    }
                    atchFileId = egovFileMngService.insertFileInfs(result);
                    dronInfoVO.setAtchmnflId(atchFileId);
                }else{
                    FileVO fvo = new FileVO();
                    fvo.setAtchFileId(atchFileId);

                    int cnt = egovFileMngService.getMaxFileSN(fvo);
                    List<FileVO> result = fileUtil.parseFileInf(files, "DRON_", cnt, atchFileId, "");

                    egovFileMngService.updateFileInfs(result);
                }

            }
            dronInfoService.updateDronInfo(dronInfoVO);
            mav.addObject("result", "success");
        } catch(Exception e) {
            logger.info(e.getMessage());

            mav.addObject("result", "fail");
    }
        return mav;
    }
    /**
     * 드론정보 삭제
     * @param dronInfoVO
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/deleteDronInfo.do")
    public ModelAndView deleteDronInfo(
            @ModelAttribute("dronInfoVO") DronInfoVO dronInfoVO,
            HttpServletRequest request) throws Exception{
        ModelAndView mav = new ModelAndView("jsonView");
        try {
            FileVO fileVO = new FileVO();
            fileVO.setAtchFileId(dronInfoVO.getAtchmnflId());
            fileVO.setFileSn(dronInfoVO.getFileSn());
            egovFileMngService.deleteAllFileInf(fileVO);
            dronInfoService.deleteDronInfo(dronInfoVO);
            mav.addObject("result", "success");
        } catch(Exception e) {
            logger.info(e.getMessage());
            mav.addObject("result", "fail");
        }

        return mav;
    }




}
