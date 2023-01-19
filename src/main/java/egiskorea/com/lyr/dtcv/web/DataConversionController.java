package egiskorea.com.lyr.dtcv.web;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.io.FilenameUtils;
import org.geotools.referencing.CRS;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.cmm.service.FileMngUtil;
import egiskorea.com.cmm.service.GeoToolsUtil;
import egiskorea.com.cmm.service.Globals;
import egiskorea.com.lyr.dtcv.service.ConvertProgress;
import egiskorea.com.lyr.dtcv.service.DataConversionService;
import egiskorea.com.lyr.dtcv.service.MapsData;
import egiskorea.com.lyr.dtcv.service.WorkerCsvItem;
import egiskorea.com.lyr.lym.service.LayerManagementService;
import egiskorea.com.lyr.lym.service.LayerRegisterInfo;
import egiskorea.com.mngr.info.service.LayerManageService;
import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.FileVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

/**
 * @Description 데이터 변환을 관리하는 controller 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.12.08
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.08   이상화           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/lyr/dtcv")
public class DataConversionController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(DataConversionController.class);
			
	@Resource(name = "dataConversionService")
	private DataConversionService dataConversionService;
	
	/** layerManagementService */
	@Resource(name = "layerManagementService")
	private LayerManagementService layerManagementService;
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	@Resource(name = "fileMngUtil")
    private FileMngUtil fileUtil;
	
	@Resource(name = "geoToolsUtil")
	private GeoToolsUtil geoToolsUtil;
	
	@Resource(name = "dataCnvrIdGnrService")
	private EgovIdGnrService idgenService;	
	
	@Resource(name = "EgovFileMngService")
    private EgovFileMngService fileMngService;
	
	
	/**
	 * @Description 데이터 변환 등록 화면 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertDataConversionView.do")
	public String insertDataConversionView(
			@ModelAttribute("mapsData") MapsData mapsData,
			ModelMap model) throws Exception{ 
		
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		vo.setCodeId("LRCL");	// 레이어 분류
		List<?> ctgrList = cmmUseService.selectCmmCodeDetail(vo);
		
		vo.setCodeId("EPSG");	// 좌표계
		List<?> epsgList = cmmUseService.selectCmmCodeDetail(vo);
		
		vo.setCodeId("DTEC");	// 인코딩
		List<?> dtecList = cmmUseService.selectCmmCodeDetail(vo);
		
		model.addAttribute("ctgrList", ctgrList);
		model.addAttribute("epsgList", epsgList);
		model.addAttribute("dtecList", dtecList);
				
		return "egiskorea/com/lyr/dtcv/insertDataConversionView";
	}
	
	/**
	 * @Description 레이어 첨부파일 임시 저장   
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.01.26
	 * @param multiRequest
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertDataConversionUpload.do")
	public ModelAndView insertDataConversionUpload(  
			final MultipartHttpServletRequest multiRequest,
			@ModelAttribute("mapsData") MapsData mapsData,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		if(isAuthenticated) {
			List<FileVO> result = null;
			
			try {
				
				final Map<String, MultipartFile> files = multiRequest.getFileMap();			
				
				if (!files.isEmpty()) {
					String storePath = Globals.SERVER_PATH + user.getId() + File.separator + "MAP_DATA";
					String urlPath = Globals.SERVER_URL + user.getId() + File.separator + "MAP_DATA";
					
					String atchFileIdString = idgenService.getNextStringId();
					result = fileUtil.parseFileInf(files, user.getId(), 0, atchFileIdString, storePath);
					String atchFileId = fileMngService.insertFileInfs(result);
					
					String ext = result.get(0).getFileExtsn().toLowerCase();
					
					if(ext.contentEquals("img") || ext.equals("tif")) {
						
						
					}
					
					
//					mapsData.setDataEnv("N");
//					mapsData.setIsConverted("N");
//					mapsData.setDatadirUrl(urlPath);
//					
//					mapsData.setProgressPath(storePath + result.get(0).getStreFileNm() + ".progress");
//					mapsData.setProgressUrl(urlPath + result.get(0).getStreFileNm() + ".progress");
//					mapsData.setMetaOutPath(storePath);
//					mapsData.setMetaOutUrl(urlPath);
//					
//					mapsData.setAtchFileId(atchFileId);
//					mapsData.setMid(user.getId());
//					mapsData.setFrstRegisterId(user.getUniqId());
//					mapsData.setCsvLayerName(result.get(0).getStreFileNm().split("\\.")[0]);
//					mapsData.setCsvDbName(Globals.CSV_DB_NAME + user.getId().toLowerCase());
//					mapsData.setAddressType("Y");
//					mapsData.setAreaType("0");
//					
//					dataConversionService.insertDataConversion(mapsData);
//					
//					ConvertProgress convertProgress = new ConvertProgress();
//					
//					convertProgress.setDataid(mapsData.getDataid());
//					convertProgress.setStatus("1");
//					convertProgress.setProgress("0");
//					
//					dataConversionService.insertConvertProgress(convertProgress);
//					
//					workerCsvItem.setAtchFileId(atchFileId);
//					workerCsvItem.setMid(user.getId());
//					workerCsvItem.setDataid(mapsData.getDataid());
//					workerCsvItem.setCsvPath(storePath + result.get(0).getStreFileNm());
//					workerCsvItem.setLonIndex(mapsData.getColX());
//					workerCsvItem.setLatIndex(mapsData.getColY());
//					workerCsvItem.setIsTwoColumn("Y");
//					workerCsvItem.setAreaType(mapsData.getAreaType());
//					workerCsvItem.setDbName(Globals.CSV_DB_NAME + user.getId().toLowerCase());
//					workerCsvItem.setTblName(result.get(0).getStreFileNm().split("\\.")[0]);
//					workerCsvItem.setProgressPath(mapsData.getProgressPath());
//					workerCsvItem.setProgressUrl(mapsData.getProgressUrl());
//					workerCsvItem.setOutputPath(storePath + mapsData.getDataid());
//					workerCsvItem.setPid(convertProgress.getPid());
//					workerCsvItem.setStatus("2");
//					workerCsvItem.setEncoding(mapsData.getDataEncoding());
//					  
//					dataConversionService.insertWorkerCsvItem(workerCsvItem);
					 
				}
				
				mav.addObject("result", result);
				mav.addObject("resultMsg", "success");
			}catch (Exception e) {
				LOGGER.info(e.getMessage());
				
				mav.addObject("result", result);
				mav.addObject("resultMsg", "fail");
			}		
		}
		
		return mav;
	}	
	
	@RequestMapping(value = "/getImageInfo.do")
	public ModelAndView getImageInfo(
			final MultipartHttpServletRequest multiRequest,
			@ModelAttribute("mapsData") MapsData mapsData,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		if(isAuthenticated) {
			final List<MultipartFile> fileLists = new ArrayList<>();
			
			Iterator<String> itr = multiRequest.getFileNames();
			
			while(itr.hasNext()) {
				fileLists.add(multiRequest.getFile((String)itr.next()));
			}
			
			String type = "";
			String mapDataType="";
			String uploadFileName = "";
			String ext = FilenameUtils.getExtension(fileLists.get(0).getOriginalFilename());
			
			if(ext.equals("prj")) {
				ext = fileLists.get(1).getOriginalFilename().split("\\.")[1].toLowerCase();
			}
			
			if(ext.equals("shp") || ext.equals("shx") || ext.equals("dbf") || ext.equals("sbx") || ext.equals("cpg") || ext.equals("qpj")) {
				type = "shp";
			}else if(ext.equals("tif") || ext.equals("twf") || ext.equals("img") || ext.equals("tfw")) {
				
				type = ext;
				
				File file = new File(fileLists.get(0).getOriginalFilename());
				
				file.createNewFile();
				
				FileOutputStream fos = new FileOutputStream(file);
				InputStream fis = fileLists.get(0).getInputStream();
				byte[] data = new byte[2048];
				int read=0;
				
				while((read = fis.read(data, 0, 2048)) != -1) {
					fos.write(data, 0, read);
				}
				
				fos.close();
				Path tmpPath = null;
				
				try {
					tmpPath = Paths.get(file.getAbsolutePath());
					System.out.println("########################################################");
					System.out.println(tmpPath);
					System.out.println("########################################################");
					HashMap<String, Object> imgInfo = getImgInfo(file.getAbsolutePath(), "", type);
					
					int band = (int) imgInfo.get("BAND");
					
					if(band == 1) {						
						type = "terrain";
						mapDataType = "T";
						uploadFileName = "user_dem_" + user.getId() + "_" + FileMngUtil.getTimeStamp2();						
					}else{						
						type = "image";
						mapDataType = "I";
						uploadFileName = "user_img_" + user.getId() + "_" + FileMngUtil.getTimeStamp2();						
					}
					System.out.println(band);
					mapsData.setDataType(mapDataType);
					mapsData.setBands(band);
					mapsData.setWidth((int) imgInfo.get("WIDTH"));
					mapsData.setHeight((int) imgInfo.get("HEIGHT"));
					mapsData.setMinx((int) imgInfo.get("MINX"));
					mapsData.setMiny((int) imgInfo.get("MINY"));
					mapsData.setMaxx((int) imgInfo.get("MAXX"));
					mapsData.setMaxy((int) imgInfo.get("MAXY"));
					
				} catch(Exception e) {
					mav.addObject("resultMsg", "fail");
				}finally {
					Files.delete(tmpPath);
				}
			}
			
			List<FileVO> result = null;
			
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
			
			String storePath = Globals.SERVER_PATH + user.getId() + File.separator + "MAP_DATA" + File.separator + type + File.separator;
			String urlPath = Globals.SERVER_URL + user.getId() + File.separator + "MAP_DATA" + File.separator + type + File.separator;
			
			String atchFileIdString = idgenService.getNextStringId();
			result = fileUtil.parseFileInf(files, user.getId(), 0, atchFileIdString, storePath);
			String atchFileId = fileMngService.insertFileInfs(result);
			
			mapsData.setMid(user.getId());
			mapsData.setAtchFileId(atchFileId);
			mapsData.setDataName(result.get(0).getOrignlFileNm().split("\\.")[1].toLowerCase());
			mapsData.setDataType(mapDataType);
			mapsData.setIsConverted("N");				
			mapsData.setDatadirUrl(urlPath);		
			mapsData.setFrstRegisterId(user.getUniqId());
			
			dataConversionService.insertDataConversion(mapsData);
			
			mav.addObject("result", mapsData);
			mav.addObject("resultMsg", "success");
		}
		return mav;
	}		
	/**
	 * @Description 변환 데이터 등록 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.02.04
	 * @param multiRequest
	 * @param mapsData
	 * @param model
	 * @return mav
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertDataConversion.do")
	public ModelAndView insertDataConversion(  
			final MultipartHttpServletRequest multiRequest,
			@ModelAttribute("mapsData") MapsData mapsData,
			@ModelAttribute("workerCsvItem") WorkerCsvItem workerCsvItem,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		if(isAuthenticated) {
			List<FileVO> result = null;
			
			try {
				
				final Map<String, MultipartFile> files = multiRequest.getFileMap();			
				
				if (!files.isEmpty()) {
					String storePath = Globals.SERVER_PATH + user.getId() + File.separator + "MAP_DATA" + File.separator + "csv" + File.separator;
					String urlPath = Globals.SERVER_URL + user.getId() + File.separator + "MAP_DATA" + File.separator + "csv" + File.separator;
					
					String atchFileIdString = idgenService.getNextStringId();
					result = fileUtil.parseFileInf(files, user.getId(), 0, atchFileIdString, storePath);
					String atchFileId = fileMngService.insertFileInfs(result);
					
					mapsData.setDataEnv("N");
					mapsData.setIsConverted("N");
					mapsData.setDatadirUrl(urlPath);
					
					mapsData.setProgressPath(storePath + result.get(0).getStreFileNm() + ".progress");
					mapsData.setProgressUrl(urlPath + result.get(0).getStreFileNm() + ".progress");
					mapsData.setMetaOutPath(storePath);
					mapsData.setMetaOutUrl(urlPath);
					
					mapsData.setAtchFileId(atchFileId);
					mapsData.setMid(user.getId());
					mapsData.setFrstRegisterId(user.getUniqId());
					mapsData.setCsvLayerName(result.get(0).getStreFileNm().split("\\.")[0]);
					mapsData.setCsvDbName(Globals.CSV_DB_NAME + user.getId().toLowerCase());
					mapsData.setAddressType("Y");
					mapsData.setAreaType("0");
					
					dataConversionService.insertDataConversion(mapsData);
					
					ConvertProgress convertProgress = new ConvertProgress();
					
					convertProgress.setDataid(mapsData.getDataid());
					convertProgress.setStatus("1");
					convertProgress.setProgress("0");
					
					dataConversionService.insertConvertProgress(convertProgress);
					
					workerCsvItem.setAtchFileId(atchFileId);
					workerCsvItem.setMid(user.getId());
					workerCsvItem.setDataid(mapsData.getDataid());
					workerCsvItem.setCsvPath(storePath + result.get(0).getStreFileNm());
					workerCsvItem.setLonIndex(mapsData.getColX());
					workerCsvItem.setLatIndex(mapsData.getColY());
					workerCsvItem.setIsTwoColumn("Y");
					workerCsvItem.setAreaType(mapsData.getAreaType());
					workerCsvItem.setDbName(Globals.CSV_DB_NAME + user.getId().toLowerCase());
					workerCsvItem.setTblName(result.get(0).getStreFileNm().split("\\.")[0]);
					workerCsvItem.setProgressPath(mapsData.getProgressPath());
					workerCsvItem.setProgressUrl(mapsData.getProgressUrl());
					workerCsvItem.setOutputPath(storePath + mapsData.getDataid());
					workerCsvItem.setPid(convertProgress.getPid());
					workerCsvItem.setStatus("2");
					workerCsvItem.setEncoding(mapsData.getDataEncoding());
					
					dataConversionService.insertWorkerCsvItem(workerCsvItem);
				}
				
				mav.addObject("dataid", mapsData.getDataid());
				mav.addObject("result", result);
				mav.addObject("resultMsg", "success");
			}catch (Exception e) {
				LOGGER.info(e.getMessage());
				
				mav.addObject("result", result);
				mav.addObject("resultMsg", "fail");
			}		
		}
		
		return mav;
	}	
	
	@RequestMapping(value = "/selectCsvProgress.do")
	public ModelAndView selectCsvProgress( 
			@ModelAttribute("mapsData") MapsData mapsData,
			@ModelAttribute("layerRegisterInfo") LayerRegisterInfo layerRegisterInfo,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		ConvertProgress convertProgress = dataConversionService.selectProgress(mapsData);
		
		if(convertProgress.getProgress().equals("100")) {
			mapsData.setState(10);
			dataConversionService.updateDataConversion(mapsData);
			layerRegisterInfo.setDataid(mapsData.getDataid());
//			layerRegisterInfo.setGroupId(layer);
//			layerRegisterInfo.setOrgnztId(orgnztId);
			layerManagementService.insertLayerRegisterInfo(layerRegisterInfo);
		}
		
		mav.addObject("percent", convertProgress);
		
		return mav;
		
	}
			
			

	private HashMap<String, Object> getImgInfo(String dir,String imgFile,String type){
		
		HashMap<String, Object> param = new HashMap<>();
		
		String[] executeCommand = null;
		
		executeCommand = new String[] {"gdalinfo", "-json", dir + imgFile};
				
		JSONObject extent = null;
		
		ProcessBuilder processBuilder = new ProcessBuilder(executeCommand);
		
		processBuilder.redirectErrorStream(true);
		
		Process process=null;
		InputStream stderr=null;
		InputStreamReader isr=null;
		BufferedReader br=null;
		int code = 0;
		
		try {
			process = processBuilder.start();
			stderr = process.getInputStream();
			isr = new InputStreamReader(stderr);
			br = new BufferedReader(isr);
			
			String outLine;
			
			StringBuilder returnValue = new StringBuilder();
			
			System.out.println("########################################################");
			while((outLine = br.readLine()) != null) {
				returnValue.append(outLine);
				System.out.println(outLine);
			}
			System.out.println("########################################################");
			
			process.waitFor();
			extent = new JSONObject(returnValue.toString());
			
			String wktStr="";
			
			int band=0;
			
			double minxLon=0.0;
			double minyLat=0.0;
			double maxxLon=0.0;
			double maxyLat=0.0;
			
			long width=0;
			long height=0;
			String compType="png";
			
			/*
			 * 1.좌표계 wkt
			 * 2.가로 세로
			 * 3.경위도 min,max
			 * 4.min,max
			 * 
			 * */
			if(type.equals("tif")){
				System.out.println("####################################################");
				JSONObject extentObj = extent.getJSONObject("coordinateSystem");
				wktStr = extentObj.getString("wkt");
				/*JSONObject coordinates = extent.getJSONObject("cornerCoordinates");
				
				JSONArray upperLeft = coordinates.getJSONArray("upperLeft");
				JSONArray lowerRight = coordinates.getJSONArray("lowerRight");
				
				minx = upperLeft.getDouble(0);
				miny = upperLeft.getDouble(1);
				
				maxx = lowerRight.getDouble(0);
				maxy = lowerRight.getDouble(1);
				*/
				
				JSONObject coordiLonLat = extent.getJSONObject("wgs84Extent");
				JSONArray coordArr = coordiLonLat.getJSONArray("coordinates");
				JSONObject metadata = extent.getJSONObject("metadata");
				
				if(!metadata.isNull("IMAGE_STRUCTURE")) {
					
					JSONObject imageStructure = metadata.getJSONObject("IMAGE_STRUCTURE");
					
					if(!imageStructure.isEmpty()) {
						
						if(!imageStructure.isNull("COMPRESSION")) {
							String compressionType = imageStructure.getString("COMPRESSION");
							
							if(!compressionType.isEmpty()) {
								compType=compressionType;
								//System.out.println(compressionType);
							}
						}
					}
				}
				
				
				minxLon = coordArr.getJSONArray(0).getJSONArray(0).getDouble(0);
				minyLat = coordArr.getJSONArray(0).getJSONArray(0).getDouble(1);
				
				maxxLon = coordArr.getJSONArray(0).getJSONArray(2).getDouble(0);
				maxyLat = coordArr.getJSONArray(0).getJSONArray(2).getDouble(1);
				
				System.out.println("minxLon : " + minxLon);
				System.out.println("minyLat : " + minyLat);
				System.out.println("maxxLon : " + maxxLon);
				System.out.println("maxyLat : " + maxyLat);
				
				JSONArray sizeObj = extent.getJSONArray("size");
				width = sizeObj.getLong(0);
				height = sizeObj.getLong(1);
				
				JSONArray bandObj = extent.getJSONArray("bands");
				band = bandObj.length();
				System.out.println("width : " + width);
				System.out.println("height : " + height);
				System.out.println("band : " + band);
				System.out.println("####################################################");
			}else if(type.equals("img")) {
				
				if(!extent.isNull("coordinateSystem")) {
					
					JSONObject wktObj = extent.getJSONObject("coordinateSystem");
					
					if(wktObj != null) {
						wktStr = wktObj.getString("wkt");
					}
				}

				JSONArray sizeArr = extent.getJSONArray("size");

				width = sizeArr.getLong(0);
				height = sizeArr.getLong(1);
				
				JSONObject minmaxArr = extent.getJSONObject("cornerCoordinates");
				JSONArray upperLeft = minmaxArr.getJSONArray("upperLeft");
				JSONArray lowerRight = minmaxArr.getJSONArray("lowerRight");
				
				minxLon = upperLeft.getDouble(0);
				minyLat = upperLeft.getDouble(1);
				
				maxxLon = lowerRight.getDouble(0);
				maxyLat = lowerRight.getDouble(1);
				
				JSONArray bandsArr = extent.getJSONArray("bands");
				band=bandsArr.length();
					
			}
			System.out.println(band);
			param.put("BAND",band);
			param.put("MINX",minxLon);
			param.put("MINY",minyLat);
			param.put("MAXX",maxxLon);
			param.put("MAXY",maxyLat);
			param.put("WIDTH", width);
			param.put("HEIGHT", height);
			param.put("COMPRESS", compType);
			
			if(!wktStr.equals("")) {
				if(CRS.lookupEpsgCode(CRS.parseWKT(wktStr), false) != null) {//tif만 있고 좌표계가 없을 경우
					code = CRS.lookupEpsgCode(CRS.parseWKT(wktStr), false);
				}else {
					code =0;
				}
			}
			param.put("CRS_CODE",code);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			code = 0;
			param.put("CRS_CODE",code);
			
			return param;
			
		}finally {
			
			if(process != null) {
				process.destroy();
			}
			
			if(isr != null) {
				try {
					isr.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
			if(stderr != null) {
				try {
					stderr.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
			if(br != null) {
				try {
					br.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
		}
		
		return param;
		
	}
}
