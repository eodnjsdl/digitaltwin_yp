package egiskorea.com.job.adas.publndMng.web;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import egiskorea.com.cmm.service.Globals;
import egiskorea.com.cmt.uai.service.BuildingRegister;
import egiskorea.com.job.adas.publndMng.service.PublndMngService;
import egiskorea.com.job.adas.publndMng.service.PublndMngVO;
import egiskorea.com.job.cmss.service.CommonnessSpaceSearchService;
import egiskorea.com.job.cmss.service.TgdSccoEmdVO;

/**
 * @Description 행정자산관리 Controller 클래스
 * @since 2023.05.24
 * @version 1.0
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.24   백승석            최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/job/adas/publndMng")
public class PublndMngController {
	
	private static final Logger logger = LoggerFactory.getLogger(PublndMngController.class);
	
	@Resource(name = "publndMngService")
	private PublndMngService publndMngService;
	
	/** 공통공간검색 서비스단 */
	@Resource(name = "commonnessSpaceSearchService") 
	private CommonnessSpaceSearchService commonnessSpaceSearchService;
	
	/**
	 * 공유지관리 화면 호출
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectPublndMngInfoListView.do")
	public String selectPublndMngInfoListView(TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception {
		logger.info("selectPublndMngInfoList.do");
		
		// 읍면동 목록
		Map<String, Object> map = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		List<String> yearList = null;
		
		yearList = publndMngService.selectPublndMngYearList();
		
		model.addAttribute("sccoEndList", map.get("resultList"));
		model.addAttribute("yearList", yearList);
		
		return "egiskorea/com/job/adas/publndMng/selectPublndMngInfoList";
	}
	
	/**
	 * 공유지관리 목록 조회
	 * @param publndMngVO
	 * @return
	 */
	@RequestMapping(value = "/selectPublndPnuInfoList.do")
	@ResponseBody
	public ModelAndView selectPublndPnuInfoList(PublndMngVO publndMngVO) {
		ModelAndView mav = new ModelAndView("jsonView");
		
		List<PublndMngVO> publndMngVOList = null;
		int count = 0;
		
		count = publndMngService.selectPublndInfoListTotalCnt(publndMngVO);
		publndMngVOList = publndMngService.selectPublndPnuInfoList(publndMngVO);
		
		mav.addObject("resultList", publndMngVOList);
		mav.addObject("resultCnt", count);
		
		return mav;
	}
	
	/**
	 * 공유지관리 상세 정보 페이지
	 * @return
	 */
	@RequestMapping(value = "/selectPublndMngDetailInfoView.do")
	public String selectPublndMngDetailInfoView() {
		
		return "egiskorea/com/job/adas/publndMng/selectPublndMngDetailInfoView";
	}

	
	/**
	 * 공유지관리 상세 정보 조회
	 * @param publndMngVO
	 * @param buildingRegister
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/selectPublndMngDetailInfoList.do")
	public String selectPublndMngDetailInfoList(
			@ModelAttribute("publndMngVO") PublndMngVO publndMngVO,
			@ModelAttribute("buildingRegister") BuildingRegister buildingRegister,
			ModelMap model){
		System.out.println("#################### 건축물대장 시작 ##################################");
		
		// 개발서버
		String apiUrl = "http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo?";
		// 실서버
//	    String apiUrl = "http://10.20.30.81/extApi/1613000/BldRgstService_v2/getBrTitleInfo?";

		String param = "&sigunguCd=" + publndMngVO.getPnu().substring(0,5)
				+ "&bjdongCd=" + publndMngVO.getPnu().substring(5,10)
				+ "&platGbCd=" + (publndMngVO.getPnu().substring(10,11).equals("1") ? 0 : 1)
				+ "&bun=" + publndMngVO.getPnu().substring(11,15)
				+ "&ji=" + publndMngVO.getPnu().substring(15,19)
				+ "&numOfRows=10&pageNo=1";		
		System.out.println(param);
		Document doc = null;
		try {
			doc = getDataParsingXML(apiUrl, param);
		} catch (Exception e) {
			e.getMessage();
			
			model.addAttribute("result", buildingRegister);
			model.addAttribute("resultMsg", "failStep1");
		}

		//결과 xml 에러 일때 처리 - failStep1xml
		NodeList eList = doc.getElementsByTagName("cmmMsgHeader");
		
		if(eList.getLength() > 0) {
			Node eNode1 = eList.item(0);
			
			Element eElement1 = (Element) eNode1;
			
			model.addAttribute("result", buildingRegister);
			model.addAttribute("resultMsg", 	"failStep1xml");
			model.addAttribute("errMsg", 		getTagValue("errMsg", eElement1));
			model.addAttribute("returnAuthMsg", getTagValue("returnAuthMsg", eElement1));
			
		}
		//결과 xml 에러 일때 처리 end

		NodeList rList = doc.getElementsByTagName("header");

		Node rNode = rList.item(0);

		Element rElement = (Element) rNode;
		
		List<BuildingRegister> buildingRegisterListMain = new ArrayList<BuildingRegister>();	//건축물대장 목록 
		
		if(getTagValue("resultCode",rElement).equals("00")){
			NodeList nList = doc.getElementsByTagName("item");

			if(nList.getLength() > 0) {
				for(int i = 0; i < nList.getLength(); i++) {
					Node nNode = nList.item(i);

					if(nNode.getNodeType() == Node.ELEMENT_NODE) {
						Element eElement = (Element) nNode;

						//건축물 대장 목록에 저장
						BuildingRegister brMainTemp = new BuildingRegister();
						
						brMainTemp.setRegstrKindCdNm(getTagValue("regstrKindCdNm",eElement));
						brMainTemp.setBldNm(getTagValue("bldNm",eElement));
						brMainTemp.setDongNm(getTagValue("dongNm",eElement));
						brMainTemp.setMainPurpsCdNm(getTagValue("mainPurpsCdNm",eElement));
						brMainTemp.setTotArea(getTagValue("totArea",eElement));
						brMainTemp.setUseAprDay(getTagValue("useAprDay",eElement));
						brMainTemp.setPlatPlc(getTagValue("platPlc",eElement));
						brMainTemp.setNewPlatPlc(getTagValue("newPlatPlc",eElement));
						brMainTemp.setPlatArea(getTagValue("platArea",eElement));
						brMainTemp.setMainAtchGbCdNm(getTagValue("mainAtchGbCdNm",eElement));
						brMainTemp.setBcRat(getTagValue("bcRat",eElement));
						brMainTemp.setVlRatEstmTotArea(getTagValue("vlRatEstmTotArea",eElement));
						brMainTemp.setVlRat(getTagValue("vlRat",eElement));
						brMainTemp.setStrctCdNm(getTagValue("strctCdNm",eElement));
						brMainTemp.setEtcStrct(getTagValue("etcStrct",eElement));
						brMainTemp.setEtcPurps(getTagValue("etcPurps",eElement));
						brMainTemp.setRoofCdNm(getTagValue("roofCdNm",eElement));
						brMainTemp.setEtcRoof(getTagValue("etcRoof",eElement));
						brMainTemp.setHhldCnt(getTagValue("hhldCnt",eElement));
						brMainTemp.setFmlyCnt(getTagValue("fmlyCnt",eElement));
						brMainTemp.setHeit(getTagValue("heit",eElement));
						brMainTemp.setGrndFlrCnt(getTagValue("grndFlrCnt",eElement));
						brMainTemp.setUgrndFlrCnt(getTagValue("ugrndFlrCnt",eElement));
						brMainTemp.setRideUseElvtCnt(getTagValue("rideUseElvtCnt",eElement));
						brMainTemp.setEmgenUseElvtCnt(getTagValue("emgenUseElvtCnt",eElement));
						brMainTemp.setTotDongTotArea(getTagValue("totDongTotArea",eElement));
						brMainTemp.setIndrMechUtcnt(getTagValue("indrMechUtcnt",eElement));
						brMainTemp.setIndrMechArea(getTagValue("indrMechArea",eElement));
						brMainTemp.setIndrAutoUtcnt(getTagValue("indrAutoUtcnt",eElement));
						brMainTemp.setIndrAutoArea(getTagValue("indrAutoArea",eElement));
						brMainTemp.setOudrAutoUtcnt(getTagValue("oudrAutoUtcnt",eElement));
						brMainTemp.setOudrAutoArea(getTagValue("oudrAutoArea",eElement));
						brMainTemp.setPmsDay(getTagValue("pmsDay",eElement));
						brMainTemp.setStcnsDay(getTagValue("stcnsDay",eElement));
						brMainTemp.setPmsnoGbCdNm(getTagValue("pmsnoGbCdNm",eElement));
						brMainTemp.setMgmBldrgstPk(getTagValue("mgmBldrgstPk",eElement));
						
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
		param = "&sigunguCd=" + publndMngVO.getPnu().substring(0,5)
				+ "&bjdongCd=" + publndMngVO.getPnu().substring(5,10)
				+ "&platGbCd=" + (publndMngVO.getPnu().substring(10,11).equals("1") ? 0 : 1)
				+ "&bun=" + publndMngVO.getPnu().substring(11,15)
				+ "&ji=" + publndMngVO.getPnu().substring(15,19)
				+ "&numOfRows=100&pageNo=1";		//10->100 로 수정

		try {
			doc = getDataParsingXML(apiUrl, param);
		} catch (Exception e) {
			
			e.getMessage();
			model.addAttribute("result", buildingRegister);
			model.addAttribute("resultMsg", "failStep2");
			
		}
		
		//결과 xml 에러 일때 처리 - failStep2xml
		eList = doc.getElementsByTagName("cmmMsgHeader");
		
		if(eList.getLength() > 0) {
			Node eNode2 = eList.item(0);
			
			Element eElement2 = (Element) eNode2;
			
			model.addAttribute("result", 		buildingRegister);
			model.addAttribute("resultMsg", 	"failStep2xml");
			model.addAttribute("errMsg", 		getTagValue("errMsg", eElement2));
			model.addAttribute("returnAuthMsg", getTagValue("returnAuthMsg", eElement2));
			
		}
		//결과 xml 에러 일때 처리 end

		rList = doc.getElementsByTagName("header");

		rNode = rList.item(0);

		rElement = (Element) rNode;

		if(getTagValue("resultCode",rElement).equals("00")){
			NodeList nList = doc.getElementsByTagName("item");
			for(int i = 0; i < nList.getLength(); i++) {
				Node nNode = nList.item(i);

				if(nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element) nNode;

					BuildingRegister temp = new BuildingRegister();

					temp.setFlrGbCdNm(getTagValue("flrGbCdNm",eElement));
					temp.setFlrNoNm(getTagValue("flrNoNm",eElement));
					temp.setStrctCdNm(getTagValue("strctCdNm",eElement));
					temp.setEtcStrct(getTagValue("etcStrct",eElement));
					temp.setMainPurpsCdNm(getTagValue("mainPurpsCdNm",eElement));
					temp.setEtcPurps(getTagValue("etcPurps",eElement));
					temp.setArea(getTagValue("area",eElement));
					temp.setMainAtchGbCdNm(getTagValue("mainAtchGbCdNm",eElement));
					temp.setMgmBldrgstPk(getTagValue("mgmBldrgstPk",eElement));		//기본키 추가

					buildingRegisterList1.add(temp);
				}
			}
		}

		List<BuildingRegister> buildingRegisterList2 = new ArrayList<BuildingRegister>();

		// 개발서버
		apiUrl = "http://apis.data.go.kr/1613000/BldRgstService_v2/getBrAtchJibunInfo?";
		// 실서버
//	    apiUrl = "http://10.20.30.81/extApi/1613000/BldRgstService_v2/getBrAtchJibunInfo?";
		param = "&sigunguCd=" + publndMngVO.getPnu().substring(0,5)
				+ "&bjdongCd=" + publndMngVO.getPnu().substring(5,10)
				+ "&platGbCd=" + (publndMngVO.getPnu().substring(10,11).equals("1") ? 0 : 1)
				+ "&bun=" + publndMngVO.getPnu().substring(11,15)
				+ "&ji=" + publndMngVO.getPnu().substring(15,19)
				+ "&numOfRows=20&pageNo=1";	//10->20 로 수정

		try {
			doc = getDataParsingXML(apiUrl, param);
		} catch (Exception e) {
			e.getMessage();
			
			model.addAttribute("result", buildingRegister);
			model.addAttribute("resultMsg", "failStep3");
		}
		
		//결과 xml 에러 일때 처리 - failStep3xml
		eList = doc.getElementsByTagName("cmmMsgHeader");
		
		if(eList.getLength() > 0) {
			Node eNode3 = eList.item(0);
			
			Element eElement3 = (Element) eNode3;
			
			model.addAttribute("result", 		buildingRegister);
			model.addAttribute("resultMsg", 	"failStep3xml");
			model.addAttribute("errMsg", 		getTagValue("errMsg", eElement3));
			model.addAttribute("returnAuthMsg", getTagValue("returnAuthMsg", eElement3));
		}
		//결과 xml 에러 일때 처리 end

		rList = doc.getElementsByTagName("header");

		rNode = rList.item(0);

		rElement = (Element) rNode;

		if(getTagValue("resultCode",rElement).equals("00")){
			NodeList nList = doc.getElementsByTagName("item");
			for(int i = 0; i < nList.getLength(); i++) {
				Node nNode = nList.item(i);

				if(nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element) nNode;

					BuildingRegister temp = new BuildingRegister();

					temp.setPlatPlc(getTagValue("platPlc",eElement));
					temp.setNewPlatPlc(getTagValue("newPlatPlc",eElement));
					temp.setMgmBldrgstPk(getTagValue("mgmBldrgstPk",eElement));	//기본키 추가

					buildingRegisterList2.add(temp);
				}
			}
		}

		System.out.println("#################### 건축물대장 끝 ##################################");
		
		model.addAttribute("result", 	  buildingRegister);
		model.addAttribute("resultMsg",   "success");
		model.addAttribute("resultListm", buildingRegisterListMain);		//제목목록
		model.addAttribute("resultList1", buildingRegisterList1);
		model.addAttribute("resultListc", buildingRegisterListMain);		//내용목록
		model.addAttribute("resultList2", buildingRegisterList2);
		
		return "egiskorea/com/job/adas/publndMng/selectPublndMngDetailInfo";
	}
	
	private Document getDataParsingXML(String apiUrl, String param) throws Exception{

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
		}finally {
			conn.disconnect();
		}

		return doc;
	}
	
	private static String getTagValue(String tag, Element eElement) {

		NodeList nList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
		Node nValue = (Node)nList.item(0);

		if(nValue == null) {
			return null;
		}
		return nValue.getNodeValue();
	}
}
