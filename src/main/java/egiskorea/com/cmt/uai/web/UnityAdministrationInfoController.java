package egiskorea.com.cmt.uai.web;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.Map;

import javax.annotation.Resource;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import egiskorea.com.cmm.service.CmmUtils;
import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.service.EgovProperties;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import egiskorea.com.cmm.service.Globals;
import egiskorea.com.cmt.uai.service.BuildingRegister;
import egiskorea.com.cmt.uai.service.UnityAdministrationInfo;
import egiskorea.com.cmt.uai.service.UnityAdministrationInfoService;
import egiskorea.com.cmt.uai.service.UnityAdministrationInfoVO;

/**
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @version 1.0
 * @Description 통합행정정보를 관리하는 controller 클래스
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.03   이상화           최초 생성
 *  </pre>
 * @since 2022.01.03
 */

@Controller
@RequestMapping("/cmt/uai")
public class UnityAdministrationInfoController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UnityAdministrationInfoController.class);

    @Resource(name = "unityAdministrationInfoService")
    private UnityAdministrationInfoService unityAdministrationInfoService;

    @Resource(name = "EgovCmmUseService")
    private EgovCmmUseService cmmUseService;

    /**
     * @param unityAdministrationInfoVO
     * @param unityAdministrationInfo
     * @param model
     * @return egiskorea/com/cmt/uai/landRegister
     * @throws Exception
     * @Description 토지대장 조회
     * @Author 플랫폼개발부문 DT솔루션 이상화
     * @Date 2022.03.08
     */
    @RequestMapping(value = "/selectLandRegister.do")
    public String selectLandRegister(
            @ModelAttribute("unityAdministrationInfoVO") UnityAdministrationInfoVO unityAdministrationInfoVO,
            @ModelAttribute("unityAdministrationInfo") UnityAdministrationInfo unityAdministrationInfo,
            ModelMap model) throws Exception {

        String searchSet = unityAdministrationInfoVO.getSearchSet();

        System.out.println("#################### 토지대장 시작 ##################################");

        String pnu = unityAdministrationInfoVO.getPnu();
        String fileName = "kras000002.xml";
        String param = "&conn_svc_id=KRAS000002"
                + "&land_loc_cd=" + unityAdministrationInfoVO.getPnu().substring(5, 10)
                + "&ledg_gbn=" + unityAdministrationInfoVO.getPnu().substring(10, 11)
                + "&bobn=" + Integer.parseInt(unityAdministrationInfoVO.getPnu().substring(11, 15))
                + "&bubn=" + Integer.parseInt(unityAdministrationInfoVO.getPnu().substring(15, 19));

        Document doc = getKRASParsingXML(fileName, param);

        NodeList nList = doc.getElementsByTagName("BODY");

        for (int i = 0; i < nList.getLength(); i++) {
            Node nNode = nList.item(i);

            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;

                unityAdministrationInfo.setPnu(unityAdministrationInfoVO.getPnu());
                unityAdministrationInfo.setAdmSectCd(getTagValue("ADM_SECT_CD", eElement));
                unityAdministrationInfo.setLandLocCd(getTagValue("LAND_LOC_CD", eElement));
                unityAdministrationInfo.setLedgCntrstCnfGbn(getTagValue("LEDG_GBN", eElement));
                unityAdministrationInfo.setBobn(getTagValue("BOBN", eElement));
                unityAdministrationInfo.setBubn(getTagValue("BUBN", eElement));
                unityAdministrationInfo.setJimok(getTagValue("JIMOK", eElement));
                unityAdministrationInfo.setJimokNm(getTagValue("JIMOK_NM", eElement));
                unityAdministrationInfo.setParea(getTagValue("PAREA", eElement));
                unityAdministrationInfo.setGrd(getTagValue("GRD", eElement));
                unityAdministrationInfo.setGrdYmd(getTagValue("GRD_YMD", eElement));
                unityAdministrationInfo.setLandMovRsnCd(getTagValue("LAND_MOV_RSN_CD", eElement));
                unityAdministrationInfo.setLandMovRsnCdNm(getTagValue("LAND_MOV_RSN_CD_NM", eElement));
                unityAdministrationInfo.setLandMovYmd(getTagValue("LAND_MOV_YMD", eElement));
                unityAdministrationInfo.setLedgCntrstCnfGbn(getTagValue("LEDG_CNTRST_CNF_GBN", eElement));
                unityAdministrationInfo.setBizActNtcGbn(getTagValue("BIZ_ACT_NTC_GBN", eElement));
                unityAdministrationInfo.setMapGbn(getTagValue("MAP_GBN", eElement));
                unityAdministrationInfo.setLandLastHistOdrno(getTagValue("LAND_LAST_HIST_ODRNO", eElement));
                unityAdministrationInfo.setOwnRgtLastHistOdrno(getTagValue("OWN_RGT_LAST_HIST_ODRNO", eElement));
                unityAdministrationInfo.setOwnerNm(getTagValue("OWNER_NM", eElement));
                unityAdministrationInfo.setDregno(getTagValue("DREGNO", eElement));
                unityAdministrationInfo.setOwnGbn(getTagValue("OWN_GBN", eElement));
                unityAdministrationInfo.setOwnGbnNm(getTagValue("OWN_GBN_NM", eElement));
                unityAdministrationInfo.setShrCnt(getTagValue("SHR_CNT", eElement));
                unityAdministrationInfo.setOwnerAddr(getTagValue("OWNER_ADDR", eElement));
                unityAdministrationInfo.setOwnRgtChgRsnCd(getTagValue("OWN_RGT_CHG_RSN_CD", eElement));
                unityAdministrationInfo.setOwnRgtChgRsnCdNm(getTagValue("OWN_RGT_CHG_RSN_CD_NM", eElement));
                unityAdministrationInfo.setOwndymd(getTagValue("OWNDYMD", eElement));
                unityAdministrationInfo.setScale(getTagValue("SCALE", eElement));
                unityAdministrationInfo.setScaleNm(getTagValue("SCALE_NM", eElement));
                unityAdministrationInfo.setDoho(getTagValue("DOHO", eElement));
                unityAdministrationInfo.setJigaBaseMon(getTagValue("JIGA_BASE_MON", eElement));
                unityAdministrationInfo.setPannJiga(getTagValue("PANN_JIGA", eElement));
                unityAdministrationInfo.setLastJibn(getTagValue("LAST_JIBN", eElement));
                unityAdministrationInfo.setLastBu(getTagValue("LAST_BU", eElement));
                unityAdministrationInfo.setLastbobn(getTagValue("LASTBOBN", eElement));
                unityAdministrationInfo.setLastbubn(getTagValue("LASTBUBN", eElement));
                unityAdministrationInfo.setLandMovChrgManId(getTagValue("LAND_MOV_CHRG_MAN_ID", eElement));
                unityAdministrationInfo.setOwnRgtChgChrgManId(getTagValue("OWN_RGT_CHG_CHRG_MAN_ID", eElement));
                unityAdministrationInfo.setBldgGbnNo(getTagValue("BLDG_GBN_NO", eElement));
                unityAdministrationInfo.setLandMoveRellJibn(getTagValue("LAND_MOVE_RELL_JIBN", eElement));
            }
        }

        unityAdministrationInfoVO = unityAdministrationInfoService.getAddrByPnu(unityAdministrationInfoVO);

        unityAdministrationInfo.setLandLocNm(getAddrByPnu(unityAdministrationInfoVO.getAddr(), pnu));

        List<UnityAdministrationInfo> unityAdministrationInfoList1 = new ArrayList<UnityAdministrationInfo>();

        fileName = "kras000006.xml";
        param = "&conn_svc_id=KRAS000021"
                + "&land_loc_cd=" + unityAdministrationInfo.getPnu().substring(5, 10)
                + "&ledg_gbn=" + unityAdministrationInfo.getPnu().substring(10, 11)
                + "&bobn=" + Integer.parseInt(unityAdministrationInfo.getPnu().substring(11, 15))
                + "&bubn=" + Integer.parseInt(unityAdministrationInfo.getPnu().substring(15, 19));

        doc = getKRASParsingXML(fileName, param);

        nList = doc.getElementsByTagName("LAND_MOV_HIST");

        for (int i = 0; i < nList.getLength(); i++) {
            Node nNode = nList.item(i);

            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;

                UnityAdministrationInfo temp = new UnityAdministrationInfo();

                temp.setJimok(getTagValue("JIMOK", eElement));
                temp.setLandMovRsnCd(getTagValue("LAND_MOV_RSN_CD", eElement));
                temp.setScale(getTagValue("SCALE", eElement));
                temp.setOwnGbn(getTagValue("OWN_GBN", eElement));
                temp.setShrCnt(getTagValue("SHR_CNT", eElement));
                temp.setOwnerAddr(getTagValue("OWNER_ADDR", eElement));
                temp.setOwnerNm(getTagValue("OWNER_NM", eElement));
                temp.setScaleNm(getTagValue("SCALE_NM", eElement));
                temp.setDoho(getTagValue("DOHO", eElement));
                temp.setDelYmd(getTagValue("DEL_YMD", eElement));
                temp.setLandMovDelYmd(getTagValue("LAND_MOV_DEL_YMD", eElement));
                temp.setLandMovHistOdrno(getTagValue("LAND_MOV_HIST_ODRNO", eElement));
                temp.setLandHistOdrno(getTagValue("LAND_HIST_ODRNO", eElement));
                temp.setJimokNm(getTagValue("JIMOK_NM", eElement));
                temp.setParea(getTagValue("PAREA", eElement));
                temp.setDymd(getTagValue("DYMD", eElement));
                temp.setLandMovRsnCdNm(getTagValue("LAND_MOV_RSN_CD_NM", eElement));
                temp.setLandMovChrgManId(getTagValue("LAND_MOV_CHRG_MAN_ID", eElement));
                temp.setReljibun(getTagValue("RELJIBUN", eElement));

                unityAdministrationInfoList1.add(temp);
            }
        }

        List<UnityAdministrationInfo> unityAdministrationInfoList2 = new ArrayList<UnityAdministrationInfo>();

        fileName = "kras000007.xml";
        param = "&conn_svc_id=KRAS000007"
                + "&land_loc_cd=" + unityAdministrationInfo.getPnu().substring(5, 10)
                + "&ledg_gbn=" + unityAdministrationInfo.getPnu().substring(10, 11)
                + "&bobn=" + Integer.parseInt(unityAdministrationInfo.getPnu().substring(11, 15))
                + "&bubn=" + Integer.parseInt(unityAdministrationInfo.getPnu().substring(15, 19));

        doc = getKRASParsingXML(fileName, param);

        nList = doc.getElementsByTagName("OWN_CHG_HIST");

        for (int i = 0; i < nList.getLength(); i++) {
            Node nNode = nList.item(i);

            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;

                UnityAdministrationInfo temp = new UnityAdministrationInfo();

                temp.setAdmSectCd(getTagValue("ADM_SECT_CD", eElement));
                temp.setLandLocCd(getTagValue("LAND_LOC_CD", eElement));
                temp.setLedgGbn(getTagValue("LEDG_GBN", eElement));
                temp.setBobn(getTagValue("BOBN", eElement));
                temp.setBubn(getTagValue("BUBN", eElement));
                temp.setOwnRgtChgRsnCd(getTagValue("OWN_RGT_CHG_RSN_CD", eElement));
                temp.setDregno(getTagValue("DREGNO", eElement));
                temp.setDymd(getTagValue("DYMD", eElement));
                temp.setOwnerNm(getTagValue("OWNER_NM", eElement));
                temp.setShrCnt(getTagValue("SHR_CNT", eElement));
                temp.setOwnGbn(getTagValue("OWN_GBN", eElement));
                temp.setOwnRgtChgChrgManId(getTagValue("OWN_RGT_CHG_CHRG_MAN_ID", eElement));
                temp.setDodrno(getTagValue("DODRNO", eElement));
                temp.setOwnRgtChgHistOdrno(getTagValue("OWN_RGT_CHG_HIST_ODRNO", eElement));
                temp.setOwnGbnNm(getTagValue("OWN_GBN_NM", eElement));
                temp.setOwnRgtChgRsnCdNm(getTagValue("OWN_RGT_CHG_RSN_CD_NM", eElement));

                unityAdministrationInfoList2.add(temp);
            }
        }

        System.out.println("#################### 토지대장 끝 ##################################");

        // 행정구역
        ComDefaultCodeVO vo = new ComDefaultCodeVO();
        vo.setCodeId("YPEMD");    // 읍면동
        List<?> code1List = cmmUseService.selectCmmCodeDetail(vo);

        model.addAttribute("code1List", code1List);
        model.addAttribute("result", unityAdministrationInfo);
        model.addAttribute("resultList1", unityAdministrationInfoList1);
        model.addAttribute("resultList2", unityAdministrationInfoList2);

        if (searchSet == null || searchSet == "") {
            return "egiskorea/com/cmt/uai/landRegister";
        } else {
            return "egiskorea/com/cmt/uai/landRegisterSearch";
        }
    }

    /**
     * @param unityAdministrationInfoVO
     * @param buildingRegister
     * @param model
     * @return egiskorea/com/cmt/uai/buildingRegister
     * @throws Exception
     * @Description 건축물대장 조회
     * @Author 플랫폼개발부문 DT솔루션 이상화
     * @Date 2022.03.08
     */
    @RequestMapping(value = "/selectBuildingRegister.do")
    public String selectBuildingRegister(
            @ModelAttribute("unityAdministrationInfoVO") UnityAdministrationInfoVO unityAdministrationInfoVO,
            @ModelAttribute("buildingRegister") BuildingRegister buildingRegister,
            ModelMap model) {

        System.out.println("#################### 건축물대장 시작 ##################################");

        // 개발서버
        String apiUrl = "http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo?";
        // 실서버
//	    String apiUrl = "http://10.20.30.81/extApi/1613000/BldRgstService_v2/getBrTitleInfo?";

        String param = "&sigunguCd=" + unityAdministrationInfoVO.getPnu().substring(0, 5)
                + "&bjdongCd=" + unityAdministrationInfoVO.getPnu().substring(5, 10)
                + "&platGbCd=" + (unityAdministrationInfoVO.getPnu().substring(10, 11).equals("1") ? 0 : 1)
                + "&bun=" + unityAdministrationInfoVO.getPnu().substring(11, 15)
                + "&ji=" + unityAdministrationInfoVO.getPnu().substring(15, 19)
                + "&numOfRows=10&pageNo=1";

        Document doc = null;
        try {
            doc = getDataParsingXML(apiUrl, param);
        } catch (Exception e) {

            e.printStackTrace();

            model.addAttribute("result", buildingRegister);
            model.addAttribute("resultMsg", "failStep1");

            return "egiskorea/com/cmt/uai/buildingRegister";
        }

        //결과 xml 에러 일때 처리 - failStep1xml
        NodeList eList = doc.getElementsByTagName("cmmMsgHeader");

        if (eList.getLength() > 0) {
            Node eNode1 = eList.item(0);

            Element eElement1 = (Element) eNode1;

            model.addAttribute("result", buildingRegister);
            model.addAttribute("resultMsg", "failStep1xml");
            model.addAttribute("errMsg", getTagValue("errMsg", eElement1));
            model.addAttribute("returnAuthMsg", getTagValue("returnAuthMsg", eElement1));

            return "egiskorea/com/cmt/uai/buildingRegister";
        }
        //결과 xml 에러 일때 처리 end

        NodeList rList = doc.getElementsByTagName("header");

        Node rNode = rList.item(0);

        Element rElement = (Element) rNode;

        List<BuildingRegister> buildingRegisterListMain = new ArrayList<BuildingRegister>();    //건축물대장 목록

        if (getTagValue("resultCode", rElement).equals("00")) {
            NodeList nList = doc.getElementsByTagName("item");

            if (nList.getLength() > 0) {
                for (int i = 0; i < nList.getLength(); i++) {
                    //for(int i = 0; i < 1; i++) {
                    Node nNode = nList.item(i);

                    if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                        Element eElement = (Element) nNode;

                        //건축물 대장 목록에 저장
                        BuildingRegister brMainTemp = new BuildingRegister();

                        brMainTemp.setRegstrKindCdNm(getTagValue("regstrKindCdNm", eElement));
                        brMainTemp.setBldNm(getTagValue("bldNm", eElement));
                        brMainTemp.setDongNm(getTagValue("dongNm", eElement));
                        brMainTemp.setMainPurpsCdNm(getTagValue("mainPurpsCdNm", eElement));
                        brMainTemp.setTotArea(getTagValue("totArea", eElement));
                        brMainTemp.setUseAprDay(getTagValue("useAprDay", eElement));
                        brMainTemp.setPlatPlc(getTagValue("platPlc", eElement));
                        brMainTemp.setNewPlatPlc(getTagValue("newPlatPlc", eElement));
                        brMainTemp.setPlatArea(getTagValue("platArea", eElement));
                        brMainTemp.setMainAtchGbCdNm(getTagValue("mainAtchGbCdNm", eElement));
                        brMainTemp.setBcRat(getTagValue("bcRat", eElement));
                        brMainTemp.setVlRatEstmTotArea(getTagValue("vlRatEstmTotArea", eElement));
                        brMainTemp.setVlRat(getTagValue("vlRat", eElement));
                        brMainTemp.setStrctCdNm(getTagValue("strctCdNm", eElement));
                        brMainTemp.setEtcStrct(getTagValue("etcStrct", eElement));
                        brMainTemp.setEtcPurps(getTagValue("etcPurps", eElement));
                        brMainTemp.setRoofCdNm(getTagValue("roofCdNm", eElement));
                        brMainTemp.setEtcRoof(getTagValue("etcRoof", eElement));
                        brMainTemp.setHhldCnt(getTagValue("hhldCnt", eElement));
                        brMainTemp.setFmlyCnt(getTagValue("fmlyCnt", eElement));
                        brMainTemp.setHeit(getTagValue("heit", eElement));
                        brMainTemp.setGrndFlrCnt(getTagValue("grndFlrCnt", eElement));
                        brMainTemp.setUgrndFlrCnt(getTagValue("ugrndFlrCnt", eElement));
                        brMainTemp.setRideUseElvtCnt(getTagValue("rideUseElvtCnt", eElement));
                        brMainTemp.setEmgenUseElvtCnt(getTagValue("emgenUseElvtCnt", eElement));
                        brMainTemp.setTotDongTotArea(getTagValue("totDongTotArea", eElement));
                        brMainTemp.setIndrMechUtcnt(getTagValue("indrMechUtcnt", eElement));
                        brMainTemp.setIndrMechArea(getTagValue("indrMechArea", eElement));
                        brMainTemp.setIndrAutoUtcnt(getTagValue("indrAutoUtcnt", eElement));
                        brMainTemp.setIndrAutoArea(getTagValue("indrAutoArea", eElement));
                        brMainTemp.setOudrAutoUtcnt(getTagValue("oudrAutoUtcnt", eElement));
                        brMainTemp.setOudrAutoArea(getTagValue("oudrAutoArea", eElement));
                        brMainTemp.setPmsDay(getTagValue("pmsDay", eElement));
                        brMainTemp.setStcnsDay(getTagValue("stcnsDay", eElement));
                        brMainTemp.setPmsnoGbCdNm(getTagValue("pmsnoGbCdNm", eElement));
                        brMainTemp.setMgmBldrgstPk(getTagValue("mgmBldrgstPk", eElement));

                        buildingRegisterListMain.add(brMainTemp);

                    }
                }
            }

        }

        List<BuildingRegister> buildingRegisterList1 = new ArrayList<BuildingRegister>();

        // 개발서버
        apiUrl = "http://apis.data.go.kr/1613000/BldRgstService_v2/getBrFlrOulnInfo?";
        // 실서버
//	    apiUrl = "http://10.20.30.81/extApi/1613000/BldRgstService_v2/getBrFlrOulnInfo?";
        param = "&sigunguCd=" + unityAdministrationInfoVO.getPnu().substring(0, 5)
                + "&bjdongCd=" + unityAdministrationInfoVO.getPnu().substring(5, 10)
                + "&platGbCd=" + (unityAdministrationInfoVO.getPnu().substring(10, 11).equals("1") ? 0 : 1)
                + "&bun=" + unityAdministrationInfoVO.getPnu().substring(11, 15)
                + "&ji=" + unityAdministrationInfoVO.getPnu().substring(15, 19)
                + "&numOfRows=100&pageNo=1";        //10->100 로 수정

        try {
            doc = getDataParsingXML(apiUrl, param);
        } catch (Exception e) {

            e.printStackTrace();
            model.addAttribute("result", buildingRegister);
            model.addAttribute("resultMsg", "failStep2");

            return "egiskorea/com/cmt/uai/buildingRegister";
        }

        //결과 xml 에러 일때 처리 - failStep2xml
        eList = doc.getElementsByTagName("cmmMsgHeader");

        if (eList.getLength() > 0) {
            Node eNode2 = eList.item(0);

            Element eElement2 = (Element) eNode2;

            model.addAttribute("result", buildingRegister);
            model.addAttribute("resultMsg", "failStep2xml");
            model.addAttribute("errMsg", getTagValue("errMsg", eElement2));
            model.addAttribute("returnAuthMsg", getTagValue("returnAuthMsg", eElement2));

            return "egiskorea/com/cmt/uai/buildingRegister";
        }
        //결과 xml 에러 일때 처리 end

        rList = doc.getElementsByTagName("header");

        rNode = rList.item(0);

        rElement = (Element) rNode;

        if (getTagValue("resultCode", rElement).equals("00")) {
            NodeList nList = doc.getElementsByTagName("item");
            for (int i = 0; i < nList.getLength(); i++) {
                Node nNode = nList.item(i);

                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;

                    BuildingRegister temp = new BuildingRegister();

                    temp.setFlrGbCdNm(getTagValue("flrGbCdNm", eElement));
                    temp.setFlrNoNm(getTagValue("flrNoNm", eElement));
                    temp.setStrctCdNm(getTagValue("strctCdNm", eElement));
                    temp.setEtcStrct(getTagValue("etcStrct", eElement));
                    temp.setMainPurpsCdNm(getTagValue("mainPurpsCdNm", eElement));
                    temp.setEtcPurps(getTagValue("etcPurps", eElement));
                    temp.setArea(getTagValue("area", eElement));
                    temp.setMainAtchGbCdNm(getTagValue("mainAtchGbCdNm", eElement));
                    temp.setMgmBldrgstPk(getTagValue("mgmBldrgstPk", eElement));        //기본키 추가

                    buildingRegisterList1.add(temp);
                }
            }
        }

        List<BuildingRegister> buildingRegisterList2 = new ArrayList<BuildingRegister>();

        // 개발서버
        apiUrl = "http://apis.data.go.kr/1613000/BldRgstService_v2/getBrAtchJibunInfo?";
        // 실서버
//	    apiUrl = "http://10.20.30.81/extApi/1613000/BldRgstService_v2/getBrAtchJibunInfo?";
        param = "&sigunguCd=" + unityAdministrationInfoVO.getPnu().substring(0, 5)
                + "&bjdongCd=" + unityAdministrationInfoVO.getPnu().substring(5, 10)
                + "&platGbCd=" + (unityAdministrationInfoVO.getPnu().substring(10, 11).equals("1") ? 0 : 1)
                + "&bun=" + unityAdministrationInfoVO.getPnu().substring(11, 15)
                + "&ji=" + unityAdministrationInfoVO.getPnu().substring(15, 19)
                + "&numOfRows=20&pageNo=1";    //10->20 로 수정

        try {
            doc = getDataParsingXML(apiUrl, param);
        } catch (Exception e) {

            e.printStackTrace();

            model.addAttribute("result", buildingRegister);
            model.addAttribute("resultMsg", "failStep3");

            return "egiskorea/com/cmt/uai/buildingRegister";
        }

        //결과 xml 에러 일때 처리 - failStep3xml
        eList = doc.getElementsByTagName("cmmMsgHeader");

        if (eList.getLength() > 0) {
            Node eNode3 = eList.item(0);

            Element eElement3 = (Element) eNode3;

            model.addAttribute("result", buildingRegister);
            model.addAttribute("resultMsg", "failStep3xml");
            model.addAttribute("errMsg", getTagValue("errMsg", eElement3));
            model.addAttribute("returnAuthMsg", getTagValue("returnAuthMsg", eElement3));

            return "egiskorea/com/cmt/uai/buildingRegister";
        }
        //결과 xml 에러 일때 처리 end

        rList = doc.getElementsByTagName("header");

        rNode = rList.item(0);

        rElement = (Element) rNode;

        if (getTagValue("resultCode", rElement).equals("00")) {
            NodeList nList = doc.getElementsByTagName("item");
            for (int i = 0; i < nList.getLength(); i++) {
                Node nNode = nList.item(i);

                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;

                    BuildingRegister temp = new BuildingRegister();

                    temp.setPlatPlc(getTagValue("platPlc", eElement));
                    temp.setNewPlatPlc(getTagValue("newPlatPlc", eElement));
                    temp.setMgmBldrgstPk(getTagValue("mgmBldrgstPk", eElement));    //기본키 추가

                    buildingRegisterList2.add(temp);
                }
            }
        }

        System.out.println("#################### 건축물대장 끝 ##################################");

        model.addAttribute("result", buildingRegister);
        model.addAttribute("resultMsg", "success");
        model.addAttribute("resultListm", buildingRegisterListMain);        //제목목록
        model.addAttribute("resultListc", buildingRegisterListMain);        //내용목록
        model.addAttribute("resultList1", buildingRegisterList1);
        model.addAttribute("resultList2", buildingRegisterList2);

        return "egiskorea/com/cmt/uai/buildingRegister";
    }


    @RequestMapping(value = "/buildingRegisterExcel.do")
    ModelAndView buildingRegisterExcel(
            @ModelAttribute("unityAdministrationInfoVO") UnityAdministrationInfoVO unityAdministrationInfoVO,
            @ModelAttribute("buildingRegister") BuildingRegister buildingRegister,
            ModelAndView model) {

        System.out.println("#################### 건축물대장 시작 ##################################");

        ModelAndView mav = new ModelAndView("excelDownloadView");

        // 개발서버
        String apiUrl = "http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo?";
        // 실서버
//	    String apiUrl = "http://10.20.30.81/extApi/1613000/BldRgstService_v2/getBrTitleInfo?";
        String param = "&sigunguCd=" + unityAdministrationInfoVO.getPnu().substring(0, 5)
                + "&bjdongCd=" + unityAdministrationInfoVO.getPnu().substring(5, 10)
                + "&platGbCd=" + (unityAdministrationInfoVO.getPnu().substring(10, 11).equals("1") ? 0 : 1)
                + "&bun=" + unityAdministrationInfoVO.getPnu().substring(11, 15)
                + "&ji=" + unityAdministrationInfoVO.getPnu().substring(15, 19)
                + "&numOfRows=10&pageNo=1";
        Document doc = null;
        try {
            doc = getDataParsingXML(apiUrl, param);
        } catch (Exception e) {
            e.printStackTrace();
            mav.addObject("result", buildingRegister);
            mav.addObject("resultMsg", "failStep1");
            return mav;
        }
        //결과 xml 에러 일때 처리 - failStep1xml
        NodeList eList = doc.getElementsByTagName("cmmMsgHeader");
        if (eList.getLength() > 0) {
            Node eNode1 = eList.item(0);
            Element eElement1 = (Element) eNode1;
            mav.addObject("result", buildingRegister);
            mav.addObject("resultMsg", "failStep1xml");
            mav.addObject("errMsg", getTagValue("errMsg", eElement1));
            mav.addObject("returnAuthMsg", getTagValue("returnAuthMsg", eElement1));
            return mav;
        }
        //결과 xml 에러 일때 처리 end
        NodeList rList = doc.getElementsByTagName("header");
        Node rNode = rList.item(0);
        Element rElement = (Element) rNode;
        List<BuildingRegister> buildingRegisterListMain = new ArrayList<BuildingRegister>();    //건축물대장 목록
        if (getTagValue("resultCode", rElement).equals("00")) {
            NodeList nList = doc.getElementsByTagName("item");
            if (nList.getLength() > 0) {
                for (int i = 0; i < nList.getLength(); i++) {
                    //for(int i = 0; i < 1; i++) {
                    Node nNode = nList.item(i);
                    if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                        Element eElement = (Element) nNode;
                        //건축물 대장 목록에 저장
                        BuildingRegister brMainTemp = new BuildingRegister();
                        brMainTemp.setRegstrKindCdNm(getTagValue("regstrKindCdNm", eElement));
                        brMainTemp.setBldNm(getTagValue("bldNm", eElement));
                        brMainTemp.setDongNm(getTagValue("dongNm", eElement));
                        brMainTemp.setMainPurpsCdNm(getTagValue("mainPurpsCdNm", eElement));
                        brMainTemp.setTotArea(getTagValue("totArea", eElement));
                        brMainTemp.setUseAprDay(getTagValue("useAprDay", eElement));
                        brMainTemp.setPlatPlc(getTagValue("platPlc", eElement));
                        brMainTemp.setNewPlatPlc(getTagValue("newPlatPlc", eElement));
                        brMainTemp.setPlatArea(getTagValue("platArea", eElement));
                        brMainTemp.setMainAtchGbCdNm(getTagValue("mainAtchGbCdNm", eElement));
                        brMainTemp.setBcRat(getTagValue("bcRat", eElement));
                        brMainTemp.setVlRatEstmTotArea(getTagValue("vlRatEstmTotArea", eElement));
                        brMainTemp.setVlRat(getTagValue("vlRat", eElement));
                        brMainTemp.setStrctCdNm(getTagValue("strctCdNm", eElement));
                        brMainTemp.setEtcStrct(getTagValue("etcStrct", eElement));
                        brMainTemp.setEtcPurps(getTagValue("etcPurps", eElement));
                        brMainTemp.setRoofCdNm(getTagValue("roofCdNm", eElement));
                        brMainTemp.setEtcRoof(getTagValue("etcRoof", eElement));
                        brMainTemp.setHhldCnt(getTagValue("hhldCnt", eElement));
                        brMainTemp.setFmlyCnt(getTagValue("fmlyCnt", eElement));
                        brMainTemp.setHeit(getTagValue("heit", eElement));
                        brMainTemp.setGrndFlrCnt(getTagValue("grndFlrCnt", eElement));
                        brMainTemp.setUgrndFlrCnt(getTagValue("ugrndFlrCnt", eElement));
                        brMainTemp.setRideUseElvtCnt(getTagValue("rideUseElvtCnt", eElement));
                        brMainTemp.setEmgenUseElvtCnt(getTagValue("emgenUseElvtCnt", eElement));
                        brMainTemp.setTotDongTotArea(getTagValue("totDongTotArea", eElement));
                        brMainTemp.setIndrMechUtcnt(getTagValue("indrMechUtcnt", eElement));
                        brMainTemp.setIndrMechArea(getTagValue("indrMechArea", eElement));
                        brMainTemp.setIndrAutoUtcnt(getTagValue("indrAutoUtcnt", eElement));
                        brMainTemp.setIndrAutoArea(getTagValue("indrAutoArea", eElement));
                        brMainTemp.setOudrAutoUtcnt(getTagValue("oudrAutoUtcnt", eElement));
                        brMainTemp.setOudrAutoArea(getTagValue("oudrAutoArea", eElement));
                        brMainTemp.setPmsDay(getTagValue("pmsDay", eElement));
                        brMainTemp.setStcnsDay(getTagValue("stcnsDay", eElement));
                        brMainTemp.setPmsnoGbCdNm(getTagValue("pmsnoGbCdNm", eElement));
                        brMainTemp.setMgmBldrgstPk(getTagValue("mgmBldrgstPk", eElement));
                        buildingRegisterListMain.add(brMainTemp);
                    }
                }
            }
        }
        List<BuildingRegister> buildingRegisterList1 = new ArrayList<BuildingRegister>();
        // 개발서버
        apiUrl = "http://apis.data.go.kr/1613000/BldRgstService_v2/getBrFlrOulnInfo?";
        // 실서버
//	    apiUrl = "http://10.20.30.81/extApi/1613000/BldRgstService_v2/getBrFlrOulnInfo?";
        param = "&sigunguCd=" + unityAdministrationInfoVO.getPnu().substring(0, 5)
                + "&bjdongCd=" + unityAdministrationInfoVO.getPnu().substring(5, 10)
                + "&platGbCd=" + (unityAdministrationInfoVO.getPnu().substring(10, 11).equals("1") ? 0 : 1)
                + "&bun=" + unityAdministrationInfoVO.getPnu().substring(11, 15)
                + "&ji=" + unityAdministrationInfoVO.getPnu().substring(15, 19)
                + "&numOfRows=100&pageNo=1";        //10->100 로 수정
        try {
            doc = getDataParsingXML(apiUrl, param);
        } catch (Exception e) {

            e.printStackTrace();
            mav.addObject("result", buildingRegister);
            mav.addObject("resultMsg", "failStep2");

            return mav;
        }

        //결과 xml 에러 일때 처리 - failStep2xml
        eList = doc.getElementsByTagName("cmmMsgHeader");

        if (eList.getLength() > 0) {
            Node eNode2 = eList.item(0);

            Element eElement2 = (Element) eNode2;

            mav.addObject("result", buildingRegister);
            mav.addObject("resultMsg", "failStep2xml");
            mav.addObject("errMsg", getTagValue("errMsg", eElement2));
            mav.addObject("returnAuthMsg", getTagValue("returnAuthMsg", eElement2));

            return mav;
        }
        //결과 xml 에러 일때 처리 end

        rList = doc.getElementsByTagName("header");

        rNode = rList.item(0);

        rElement = (Element) rNode;

        if (getTagValue("resultCode", rElement).equals("00")) {
            NodeList nList = doc.getElementsByTagName("item");
            for (int i = 0; i < nList.getLength(); i++) {
                Node nNode = nList.item(i);

                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;

                    BuildingRegister temp = new BuildingRegister();

                    temp.setFlrGbCdNm(getTagValue("flrGbCdNm", eElement));
                    temp.setFlrNoNm(getTagValue("flrNoNm", eElement));
                    temp.setStrctCdNm(getTagValue("strctCdNm", eElement));
                    temp.setEtcStrct(getTagValue("etcStrct", eElement));
                    temp.setMainPurpsCdNm(getTagValue("mainPurpsCdNm", eElement));
                    temp.setEtcPurps(getTagValue("etcPurps", eElement));
                    temp.setArea(getTagValue("area", eElement));
                    temp.setMainAtchGbCdNm(getTagValue("mainAtchGbCdNm", eElement));
                    temp.setMgmBldrgstPk(getTagValue("mgmBldrgstPk", eElement));        //기본키 추가

                    buildingRegisterList1.add(temp);
                }
            }
        }

        List<BuildingRegister> buildingRegisterList2 = new ArrayList<BuildingRegister>();

        // 개발서버
        apiUrl = "http://apis.data.go.kr/1613000/BldRgstService_v2/getBrAtchJibunInfo?";
        // 실서버
//	    apiUrl = "http://10.20.30.81/extApi/1613000/BldRgstService_v2/getBrAtchJibunInfo?";
        param = "&sigunguCd=" + unityAdministrationInfoVO.getPnu().substring(0, 5)
                + "&bjdongCd=" + unityAdministrationInfoVO.getPnu().substring(5, 10)
                + "&platGbCd=" + (unityAdministrationInfoVO.getPnu().substring(10, 11).equals("1") ? 0 : 1)
                + "&bun=" + unityAdministrationInfoVO.getPnu().substring(11, 15)
                + "&ji=" + unityAdministrationInfoVO.getPnu().substring(15, 19)
                + "&numOfRows=20&pageNo=1";    //10->20 로 수정

        try {
            doc = getDataParsingXML(apiUrl, param);
        } catch (Exception e) {

            e.printStackTrace();

            mav.addObject("result", buildingRegister);
            mav.addObject("resultMsg", "failStep3");

            return mav;
        }

        //결과 xml 에러 일때 처리 - failStep3xml
        eList = doc.getElementsByTagName("cmmMsgHeader");

        if (eList.getLength() > 0) {
            Node eNode3 = eList.item(0);

            Element eElement3 = (Element) eNode3;

            mav.addObject("result", buildingRegister);
            mav.addObject("resultMsg", "failStep3xml");
            mav.addObject("errMsg", getTagValue("errMsg", eElement3));
            mav.addObject("returnAuthMsg", getTagValue("returnAuthMsg", eElement3));

            return mav;
        }
        //결과 xml 에러 일때 처리 end

        rList = doc.getElementsByTagName("header");

        rNode = rList.item(0);

        rElement = (Element) rNode;

        if (getTagValue("resultCode", rElement).equals("00")) {
            NodeList nList = doc.getElementsByTagName("item");
            for (int i = 0; i < nList.getLength(); i++) {
                Node nNode = nList.item(i);

                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;

                    BuildingRegister temp = new BuildingRegister();

                    temp.setPlatPlc(getTagValue("platPlc", eElement));
                    temp.setNewPlatPlc(getTagValue("newPlatPlc", eElement));
                    temp.setMgmBldrgstPk(getTagValue("mgmBldrgstPk", eElement));    //기본키 추가

                    buildingRegisterList2.add(temp);
                }
            }
        }

        System.out.println("#################### 건축물대장 끝 ##################################");

        HashMap excelDown = new HashMap();
        excelDown.put("result", buildingRegister);
        excelDown.put("resultMsg", "success");
        excelDown.put("resultListm", buildingRegisterListMain);        //제목목록
        excelDown.put("resultListc", buildingRegisterListMain);        //내용목록
        excelDown.put("resultList1", buildingRegisterList1);
        excelDown.put("resultList2", buildingRegisterList2);
		//엑셀 생성
        SXSSFWorkbook workbook = unityAdministrationInfoService.makeBuildingExcelList(excelDown);

        mav.addObject("locale", Locale.KOREA);
        mav.addObject("workbook", workbook);
        mav.addObject("workbookName", "건축물대장");
        mav.addObject("fileType", "excel");

        return mav;
    }


    /**
     * @param unityAdministrationInfoVO
     * @param unityAdministrationInfo
     * @param model
     * @return egiskorea/com/cmt/uai/landUseStatus
     * @throws Exception
     * @Description 토지이용현황 조회
     * @Author 플랫폼개발부문 DT솔루션 이상화
     * @Date 2022.03.08
     */
    @RequestMapping(value = "/selectLandUseStatus.do")
    public String selectLandUseStatus(
            @ModelAttribute("unityAdministrationInfoVO") UnityAdministrationInfoVO unityAdministrationInfoVO,
            @ModelAttribute("unityAdministrationInfo") UnityAdministrationInfo unityAdministrationInfo,
            ModelMap model) throws Exception {

        System.out.println("#################### 토지이용현황 시작 ##################################");

        List<UnityAdministrationInfo> unityAdministrationInfoList = new ArrayList<UnityAdministrationInfo>();

        String pnu = unityAdministrationInfoVO.getPnu();

        String fileName = "kras000025.xml";
        String param = "&conn_svc_id=KRAS000025"
                + "&land_loc_cd=" + unityAdministrationInfoVO.getPnu().substring(5, 10)
                + "&ledg_gbn=" + unityAdministrationInfoVO.getPnu().substring(10, 11)
                + "&bobn=" + Integer.parseInt(unityAdministrationInfoVO.getPnu().substring(11, 15))
                + "&bubn=" + Integer.parseInt(unityAdministrationInfoVO.getPnu().substring(15, 19));

        Document doc = getKRASParsingXML(fileName, param);

        NodeList nList = doc.getElementsByTagName("LAND_USE_PLAN_CNF_ATTR");

        for (int i = 0; i < nList.getLength(); i++) {
            Node nNode = nList.item(i);

            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;

                UnityAdministrationInfo temp = new UnityAdministrationInfo();

                temp.setPnu(unityAdministrationInfoVO.getPnu());
                temp.setUcode(getTagValue("UCODE", eElement));
                temp.setDivno(getTagValue("DIV", eElement));
                temp.setGubun(getTagValue("GUBUN", eElement));
                temp.setCtype(getTagValue("CTYPE", eElement));
                temp.setUnm(getTagValue("UNM", eElement));
                temp.setSeq(getTagValue("SEQ", eElement));
                temp.setLawnm(getTagValue("LAWNM", eElement));
                temp.setUname(getTagValue("UNAME", eElement));

                unityAdministrationInfoList.add(temp);
            }
        }
		
		//토지이용계획서 KRAS000026 정보 조회
		String fileName26 = "kras000026.xml";
		String param26 = "&conn_svc_id=KRAS000026"
				+ "&land_loc_cd=" + unityAdministrationInfoVO.getPnu().substring(5,10)
				+ "&ledg_gbn=" + unityAdministrationInfoVO.getPnu().substring(10,11)
				+ "&bobn=" + Integer.parseInt(unityAdministrationInfoVO.getPnu().substring(11,15))
				+ "&bubn=" + Integer.parseInt(unityAdministrationInfoVO.getPnu().substring(15,19))
				+ "&iss_scale=2000"
				+ "&map_width=310" 
				+ "&map_height=260";

		Document doc26		= getKRASParsingXML(fileName26, param26);
		NodeList nList26 	= doc26.getElementsByTagName("LAND_USE_PLAN_CNF_INFO_BASE");

		String landUseStatusMainImgCode = null;		//메인 이미지 code
		
		if(nList26.getLength() == 1) {
			
			Node nChildNode = nList26.item(0);
			
			Element ele = (Element)nChildNode;
			//System.out.println("----------------");
			//System.out.println(getTagValue("IMG",ele));
			
			//메인 이미지
			if(getTagValue("IMG",ele) != null) {
				landUseStatusMainImgCode = getTagValue("IMG",ele);
			}
		}
		
		//범례 제목,이미지 목록
		NodeList nLegendList26	=	doc26.getElementsByTagName("LEGEND");
		//System.out.println(">>>>>>>>>>>"+nLegendList26.getLength());
		
		List<Map<String, Object>> landUseStatusLegendImgCodeList = new ArrayList<Map<String, Object>>();	//범례 제목,이미지 목록
		
		for(int i=0; i<nLegendList26.getLength();i++) {
			Node nn =	nLegendList26.item(i);
			if(nn.getNodeType() == Node.ELEMENT_NODE) {
				if(nn.getNodeName() == "LEGEND") {
					//System.out.println(">>>>>"+nn.getNodeName());
					Element eleT= (Element)nn;
					
					Map<String, Object> tmp = new HashMap<>();
					
					//System.out.println(getTagValue("IMG",eleT));
					//System.out.println(getTagValue("TEXT",eleT));
					
					tmp.put("IMG", getTagValue("IMG",eleT));
					tmp.put("TEXT", getTagValue("TEXT",eleT));
					
					landUseStatusLegendImgCodeList.add(tmp);
				}
			}
		}

        unityAdministrationInfoVO = unityAdministrationInfoService.getAddrByPnu(unityAdministrationInfoVO);

        unityAdministrationInfo.setLandLocNm(getAddrByPnu(unityAdministrationInfoVO.getAddr(), pnu));

        System.out.println("#################### 토지이용현황 끝 ##################################");

        model.addAttribute("result", unityAdministrationInfo);
        model.addAttribute("resultList", unityAdministrationInfoList);
		model.addAttribute("landUseStatusMainImgCode", landUseStatusMainImgCode);					//메인 이미지 code
		model.addAttribute("landUseStatusLegendImgCodeList", landUseStatusLegendImgCodeList);		//범례 제목,이미지 목록 
		
        return "egiskorea/com/cmt/uai/landUseStatus";
    }

    /**
     * @param unityAdministrationInfoVO
     * @param unityAdministrationInfo
     * @param model
     * @return egiskorea/com/cmt/uai/officiallyAnnouncedLandPrice
     * @throws Exception
     * @Description 공시지가 조회
     * @Author 플랫폼개발부문 DT솔루션 이상화
     * @Date 2022.03.08
     */
    @RequestMapping(value = "/selectOfficiallyAnnouncedLandPrice.do")
    public String selectOfficiallyAnnouncedLandPrice(
            @ModelAttribute("unityAdministrationInfoVO") UnityAdministrationInfoVO unityAdministrationInfoVO,
            @ModelAttribute("unityAdministrationInfo") UnityAdministrationInfo unityAdministrationInfo,
            ModelMap model) throws Exception {

        System.out.println("#################### 공시지가 시작 ##################################");

        List<UnityAdministrationInfo> unityAdministrationInfoList = new ArrayList<UnityAdministrationInfo>();

        String pnu = unityAdministrationInfoVO.getPnu();

        String fileName = "kras000011.xml";
        String param = "&conn_svc_id=KRAS000011"
                + "&land_loc_cd=" + unityAdministrationInfoVO.getPnu().substring(5, 10)
                + "&ledg_gbn=" + unityAdministrationInfoVO.getPnu().substring(10, 11)
                + "&bobn=" + Integer.parseInt(unityAdministrationInfoVO.getPnu().substring(11, 15))
                + "&bubn=" + Integer.parseInt(unityAdministrationInfoVO.getPnu().substring(15, 19));

        Document doc = getKRASParsingXML(fileName, param);

        NodeList nList = doc.getElementsByTagName("JIGA");

        for (int i = 0; i < nList.getLength(); i++) {
            Node nNode = nList.item(i);

            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;

                UnityAdministrationInfo temp = new UnityAdministrationInfo();

                temp.setPnu(unityAdministrationInfoVO.getPnu());
                temp.setBaseYear(getTagValue("BASE_YEAR", eElement));
                temp.setBaseMon(getTagValue("BASE_MON", eElement));
                temp.setPannJiga(getTagValue("PANN_JIGA", eElement));
                temp.setPannYmd(getTagValue("PANN_YMD", eElement));
//					temp.setRemark(getTagValue("REMARK",eElement));

                unityAdministrationInfoList.add(temp);
            }
        }

        unityAdministrationInfoVO = unityAdministrationInfoService.getAddrByPnu(unityAdministrationInfoVO);

        unityAdministrationInfo.setLandLocNm(getAddrByPnu(unityAdministrationInfoVO.getAddr(), pnu));

        System.out.println("#################### 공시지가 끝 ##################################");

        model.addAttribute("result", unityAdministrationInfo);
        model.addAttribute("resultList", unityAdministrationInfoList);

        return "egiskorea/com/cmt/uai/officiallyAnnouncedLandPrice";
    }

    /**
     * @param unityAdministrationInfoVO
     * @param unityAdministrationInfo
     * @param model
     * @return egiskorea/com/cmt/uai/individualizationHousePrice
     * @throws Exception
     * @Description 개별주택가격 조회
     * @Author 플랫폼개발부문 DT솔루션 이상화
     * @Date 2022.03.09
     */
    @RequestMapping(value = "/selectIndividualizationHousePrice.do")
    public String selectIndividualizationHousePrice(
            @ModelAttribute("unityAdministrationInfoVO") UnityAdministrationInfoVO unityAdministrationInfoVO,
            @ModelAttribute("unityAdministrationInfo") UnityAdministrationInfo unityAdministrationInfo,
            ModelMap model) throws Exception {

        System.out.println("#################### 개별주택가격 시작 ##################################");

        List<UnityAdministrationInfo> unityAdministrationInfoList = new ArrayList<UnityAdministrationInfo>();

        String pnu = unityAdministrationInfoVO.getPnu();

        String fileName = "kras000033.xml";
        String param = "&conn_svc_id=KRAS000033"
                + "&land_loc_cd=" + unityAdministrationInfoVO.getPnu().substring(5, 10)
                + "&ledg_gbn=" + unityAdministrationInfoVO.getPnu().substring(10, 11)
                + "&bobn=" + Integer.parseInt(unityAdministrationInfoVO.getPnu().substring(11, 15))
                + "&bubn=" + Integer.parseInt(unityAdministrationInfoVO.getPnu().substring(15, 19));

        Document doc = getKRASParsingXML(fileName, param);

        NodeList nList = doc.getElementsByTagName("HOUSE_INFO_LIST");

        for (int i = 0; i < nList.getLength(); i++) {
            Node nNode = nList.item(i);

            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;

                UnityAdministrationInfo temp = new UnityAdministrationInfo();

                temp.setPnu(unityAdministrationInfoVO.getPnu());
                temp.setBaseYear(getTagValue("BASE_YEAR", eElement));
                temp.setIndiHousePrc(getTagValue("INDI_HOUSE_PRC", eElement));
                temp.setLandArea(getTagValue("LAND_AREA", eElement));
                temp.setLandCalcArea(getTagValue("LAND_CALC_AREA", eElement));
                temp.setBldgNo(getTagValue("BLDG_NO", eElement));
                temp.setBldgArea(getTagValue("BLDG_AREA", eElement));
                temp.setBldgCalcArea(getTagValue("BLDG_CALC_AREA", eElement));
//					temp.setStdmt(getTagValue("STDMT",eElement));

                unityAdministrationInfoList.add(temp);
            }
        }

        unityAdministrationInfoVO = unityAdministrationInfoService.getAddrByPnu(unityAdministrationInfoVO);

        unityAdministrationInfo.setLandLocNm(getAddrByPnu(unityAdministrationInfoVO.getAddr(), pnu));

        System.out.println("#################### 개별주택가격 끝 ##################################");

        model.addAttribute("result", unityAdministrationInfo);
        model.addAttribute("resultList", unityAdministrationInfoList);

        return "egiskorea/com/cmt/uai/individualizationHousePrice";
    }

    /**
     * @param unityAdministrationInfoVO
     * @param unityAdministrationInfo
     * @param model
     * @return egiskorea/com/cmt/uai/authorizationPermission
     * @throws Exception
     * @Description 인허가 조회
     * @Author 플랫폼개발부문 DT솔루션 이상화
     * @Date 2022.03.10
     */
    @RequestMapping(value = "/selectAuthorizationPermission.do")
    public String selectAuthorizationPermission(
            @ModelAttribute("unityAdministrationInfoVO") UnityAdministrationInfoVO unityAdministrationInfoVO,
            @ModelAttribute("unityAdministrationInfo") UnityAdministrationInfo unityAdministrationInfo,
            ModelMap model) throws Exception {

        System.out.println("#################### 인허가 시작 ##################################");

        String pnu = unityAdministrationInfoVO.getPnu();

        unityAdministrationInfoVO = unityAdministrationInfoService.getAddrByPnu(unityAdministrationInfoVO);

        unityAdministrationInfo.setLandLocNm(getAddrByPnu(unityAdministrationInfoVO.getAddr(), pnu));

        System.out.println("#################### 인허가 끝 ##################################");

        model.addAttribute("result", unityAdministrationInfo);

        return "egiskorea/com/cmt/uai/authorizationPermission";
    }

    private static String getTagValue(String tag, Element eElement) {

        NodeList nList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
        Node nValue = (Node) nList.item(0);

        if (nValue == null) {
            return null;
        }
        return nValue.getNodeValue();
    }

    /**
     * @param fileName
     * @param param
     * @return doc
     * @Description 부동산종합공부시스템 api xml parsing
     * @Author 플랫폼개발부문 DT솔루션 이상화
     * @Date 2022.03.10
     */
    private Document getKRASParsingXML(String fileName, String param) throws Exception {

        String apiUrl = Globals.KRAS_PROXY_URL;
        apiUrl = apiUrl + fileName;

        apiUrl += "?adm_sect_cd=" + Globals.KRAS_SECT_CD + "&conn_sys_id=" + Globals.KRAS_SYS_ID + param;

        HttpURLConnection conn = null;

        System.out.println("================================= apiUrl : " + apiUrl + " =================================");

        URL url = new URL(apiUrl);
        conn = (HttpURLConnection) url.openConnection();


        conn.setRequestMethod("POST");
        conn.setConnectTimeout(15000);  // 15000 -> 15초 설정
        conn.setDoOutput(true);
        conn.connect();

        Document doc = null;

        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();

            doc = dBuilder.parse(conn.getInputStream());

            doc.getDocumentElement().normalize();
        } finally {
            conn.disconnect();
        }

        return doc;
    }

    /**
     * @param apiUrl
     * @param param
     * @return doc
     * @Description 공공데이터포털(세움터) api xml parsing
     * @Author 플랫폼개발부문 DT솔루션 이상화
     * @Date 2022.03.10
     */
    private Document getDataParsingXML(String apiUrl, String param) throws Exception {

        apiUrl += "ServiceKey=" + Globals.SERVICE_KEY + param;

        HttpURLConnection conn = null;

        System.out.println(apiUrl);
        URL url = new URL(apiUrl);
        conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("GET");
        conn.setConnectTimeout(15000);  // 15000 -> 15초 설정
        conn.setDoOutput(true);
        conn.connect();

        Document doc = null;

        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();

            doc = dBuilder.parse(conn.getInputStream());

            doc.getDocumentElement().normalize();
        } finally {
            conn.disconnect();
        }

        return doc;
    }

    /**
     * @param addr
     * @param pnu
     * @return
     * @Description
     * @Author 플랫폼개발부문 DT솔루션 이상화
     * @Date 2022.03.08
     */
    private String getAddrByPnu(String addr, String pnu) {

        String landLocNm = "";
        String landLocCd = pnu.substring(10, 11).equals("2") ? "산" : "";

        if (Integer.parseInt(pnu.substring(11, 15)) != 0) {
            landLocNm = addr + " " + landLocCd.toString() + Integer.parseInt(pnu.substring(11, 15)) + "-" + Integer.parseInt(pnu.substring(15, 19));
        } else {
            landLocNm = addr + " " + landLocCd.toString() + Integer.parseInt(pnu.substring(11, 15));
        }

        return landLocNm;
    }

    /**
     * @throws Exception
     * @Description KRAS(부동산공부시스템) 테스트 요청 페이지
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.21
     */
    @RequestMapping(value = "krasTest.do", method = RequestMethod.GET)
    public String krasShpDownload() throws Exception {
        return "egiskorea/com/cmt/uai/krasTest";
    }

    /**
     * @throws Exception
     * @Description KRAS(부동산공부시스템) 요청하여 연속지적도 다운로드 후 DB(PostgreSql) 삽입 해주는 매소드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.21
     */
    @RequestMapping("/krasShpDownlaodScheduleJob.do")
    @Scheduled(cron = "0 0 2 * * *") //매일 새벽 02:00
    //@Scheduled(cron = "0 30 14 * * *") //테스트 스케줄러
    public void krasShpDownlaodScheduleJob() throws Exception {

        /**
         * 연속지적도 요청 주소
         * http://105.29.101.45:8085/conn/estateGateway
         * ?conn_svc_id=KRAS000038
         * &adm_sect_cd=41830
         * &conn_sys_id=4BHH-YN9K-SFC1-XTFV
         * &layer_cd=LSMD_CONT_LDREG
         * &file_type=2 //2:shp, 3:dbf, 4:shx
         */

        int successRow = 0; //성공 수
        String layerCd = "LSMD_CONT_LDREG";
        String path = EgovProperties.getProperty("Globals.fileStorePath") + "shp/" + layerCd + "/"; //다운로드 위치
        //lsmd_cont_ldreg_41830_2022_07_08.shp
        //lsmd_cont_ldreg_41830_2022_07_08.dbf
        //lsmd_cont_ldreg_41830_2022_07_08.shx
        String fileName = "lsmd_cont_ldreg_41830_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy_MM_dd")); //다운로드 파일 이름(확장자 제외)

        String defaultParam = "conn_sys_id=" + Globals.KRAS_SYS_ID + "&adm_sect_cd=" + Globals.KRAS_SECT_CD + "&conn_svc_id=KRAS000038&layer_cd=" + layerCd + "&file_type=";
        String fileExtension = "";

        try {
            if (CmmUtils.mkdir(path)) {
                for (int fileType = 2; fileType < 5; fileType++) {

                    if (fileType == 2) {
                        fileExtension = "shp";
                    } else if (fileType == 3) {
                        fileExtension = "dbf";
                    } else if (fileType == 4) {
                        fileExtension = "shx";
                    }

                    String param = defaultParam + fileType; //요청주소 2:shp , 3:dbf, 4:shx 파일
                    String fileFullName = fileName + "." + fileExtension;
                    File file = new File(path, fileFullName);

                    boolean result = unityAdministrationInfoService.krasURLConnectionShpDownload(param, file);
                    //boolean result = true; //테스트 시
                    if (result) {
                        successRow += 1;
                    }
                }
            } else {
                LOGGER.info("======================부동산 공부 시스템 다운로드 폴더 생성 실패======================");
                LOGGER.info("======================다운로드 폴더 경로 : " + path + "======================");
            }

            if (successRow == 3) {
                LOGGER.info("======================부동산 공부 시스템 다운로드 성공======================");
                LOGGER.info("======================다운로드 폴더 경로 : " + path + "/" + fileName + ".shp======================");
            }
        } catch (Exception e) {
            System.out.println("======================krasShpDownlaodScheduleJobㄴ 실패======================");
            e.printStackTrace();
        }
    }

    /**
     * @throws Exception
     * @Description KRAS(부동산공부시스템) 요청하여 연속지적도 다운로드 후 DB(PostgreSql) 삽입 해주는 매소드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.09.15
     */
    @Scheduled(cron = "0 30 2 * * *") //매일 새벽 02:30
    @RequestMapping("/krasShpToDatabaseScheduleJob.do")
    //@Scheduled(cron = "0 25 13 * * *") //테스트 스케줄러
    public void krasShpToDatabaseScheduleJob() throws Exception {

        LOGGER.info("======================연속지적도 SHP 파일 디비 업데이트======================");

        try {
            String layerCd = "LSMD_CONT_LDREG";
            String path = EgovProperties.getProperty("Globals.fileStorePath") + "shp/" + layerCd + "/"; //다운로드 위치
            //lsmd_cont_ldreg_41830_2022_07_08.shp
            //lsmd_cont_ldreg_41830_2022_07_08.dbf
            //lsmd_cont_ldreg_41830_2022_07_08.shx
            String fileName = "lsmd_cont_ldreg_41830_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy_MM_dd")); //다운로드 파일 이름(확장자 제외)
            String shpFileName = fileName + ".shp";
            String shpFullPath = path + shpFileName;

            File shpFile = new File(path, shpFileName);
            File dbfFile = new File(path, fileName + ".dbf");
            File shxFile = new File(path, fileName + ".shx");

            if ((shpFile.exists() && shpFile.length() > 0) && (dbfFile.exists() && dbfFile.length() > 0) && (shxFile.exists() && shxFile.length() > 0)) {
                String nlt = "MULTIPOLYGON"; //생성된 레이어의 지오메트리 유형을 정의(NONE, GEOMETRY, POINT, LINESTRING, POLYGON, GEOMETRYCOLLECTION, MULTIPOINT, MULTIPOLYGON, MULTILINESTRING, CIRCULARSTRING, COMPOUNDCURVE, CURVEPOLYGON, MULTICURVE)
                String tableName = "digitaltwin.lsmd_cont_ldreg_41830"; //shp파일이 변환되어 들어갈 테이블 이름.
                String originalEPSG = "EPSG:5174"; //shp파일의 좌표계
                String changeEPSG = "EPSG:5174"; //변화시킬 좌표계

                unityAdministrationInfoService.shpToPostgres(shpFullPath, nlt, tableName, originalEPSG, changeEPSG);

                LOGGER.info("======================연속지적도 SHP 파일 디비 업데이트 성공======================");
            } else {
                LOGGER.info("======================연속지적도 SHP 파일 디비 업데이트 실패======================");
                LOGGER.info("======================연속지적도 SHP,DBF,SHX 파일이 없거나 용량이 0일 경우======================");
            }
        } catch (Exception e) {
            System.out.println("======================krasShpToDatabaseScheduleJob 실패======================");
            e.printStackTrace();
        }
    }

}