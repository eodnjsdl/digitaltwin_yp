/**
 * 
 */
package egiskorea.com.cmm.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;

import org.geotools.referencing.CRS;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

/**
 * @Description geo 관련 유틸
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.02.18
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.18		이상화	최초 생성
 *  </pre>
 */

@Component("geoToolsUtil")
public class GeoToolsUtil {
	
public HashMap<String, Object> getImgInfo(String dir,String imgFile,String type){
		
		HashMap<String, Object> param = new HashMap<>();
		
		String OS = System.getProperty("os.name").toLowerCase();
		
		String[] executeCommand = null;
		
		executeCommand = new String[] {"gdalinfo", "-json","-wkt_format","wkt1", dir+imgFile};
		//executeCommand = new String[] {"gdalinfo", "-json",dir+imgFile}; //beta 서버
		
		if(OS.indexOf("win") >= 0) {//윈도우-로컬 개발
			executeCommand = new String[] {"cmd.exe","/C","gdalinfo", "-json",dir+imgFile};
		}
		
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
			
			while((outLine = br.readLine()) != null) {
				
				returnValue.append(outLine);
			}
			
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
			
				JSONObject extentObj = extent.getJSONObject("coordinateSystem");
				wktStr = extentObj.getString("wkt");
				System.out.println(wktStr);
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
				
				JSONArray sizeObj = extent.getJSONArray("size");
				width = sizeObj.getLong(0);
				height = sizeObj.getLong(1);
				
				JSONArray bandObj = extent.getJSONArray("bands");
				band = bandObj.length();
				
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
