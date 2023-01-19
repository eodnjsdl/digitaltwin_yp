package egiskorea.com.cmm.service;


import egovframework.com.cmm.service.EgovProperties;
import egovframework.rte.fdl.cryptography.EgovEnvCryptoService;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.ModelAndViewDefiningException;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @Description 공통 Utils 클래스(static 라이브러리 모음)
 * @packageName egiskorea.com.cmm.service
 * @Class CmmUtils
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.02.24
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.24   이준호           최초 생성
 *
 */

@Component(value = "cmmUtils")
public class CmmUtils {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(CmmUtils.class);
    
    /**
     * @Description 경고창 띄우고 이전페이지로 돌아가게 하는 메소드(javascript실행)
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.24
     * @param message
     * @throws IOException
     */
    public static String alertBack(Model model, String message) throws IOException {
        model.addAttribute("resultMsg", message);
        return "egiskorea/com/cmm/actionResult";
    }

    /**
     * @Description ModelAndViewDefiningException을 발생시켜 경고창 띄우고 현재페이지 닫는 메소드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.02
     * @param message
     * @throws ModelAndViewDefiningException
     */
    public static void mvAlertClose(String message) throws ModelAndViewDefiningException {
        ModelAndView mv = new ModelAndView("egiskorea/com/cmm/actionResult");
        mv.addObject("resultMsg", message);
        mv.addObject("resultClose", "true");
        throw new ModelAndViewDefiningException(mv);
    }

    /**
     * @Description 경고창 띄우고 post방식으로 페이지 이동시켜주는 메소드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.17
     * @param model
     * @param message
     * @param action
     * @param obj
     * @return
     * @throws Exception
     */
    public static String postAlertHref(Model model, String message, String action, Object obj, HashMap <String, String> etcMap) throws Exception {
        model.addAttribute("message", message);
        model.addAttribute("action", action);

        Field[] fields = FieldUtils.getAllFields(obj.getClass()); //현재(부모 포함) 필드값 모두 조회
        List<HashMap<String, String>> list = new ArrayList<>();

        for (Field field : fields) {
            String name = field.getName();
            if (!"serialVersionUID".equals(name)) {
                Object value = FieldUtils.readField(obj, name, true);
                if (!ObjectUtils.isEmpty(value)) {
                    HashMap<String, String> map = new HashMap<>();
                    String type = field.getType().toString();
                    if (type.contains("LocalDateTime")) {
                        LocalDateTime dt = (LocalDateTime) value;
                        value = dt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                    }

                    map.put("name", name);
                    map.put("value", value.toString());
                    list.add(map);
                }
            }
        }

        /* selectedId와 같은 VO이외의 parameter 값이 넘어올 경우 */
        if (etcMap != null) {
            for (String key : etcMap.keySet()) {
                HashMap<String, String> map2 = new HashMap<>();
                map2.put("name", key);
                map2.put("value", etcMap.get(key));
                list.add(map2);
            }
        }

        model.addAttribute("formData", list);

        return "egiskorea/com/cmm/postAction";
    }

    /**
     * @Description 암호화
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.24
     * @param encrypt
     */
    public static String encrypt(String encrypt) {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest(); //request 객체

        WebApplicationContext webApplicationContext = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
        EgovEnvCryptoService cryptoService = (EgovEnvCryptoService) webApplicationContext.getBean("egovEnvCryptoService");

        try {
            return cryptoService.encrypt(encrypt); // Handles URLEncoding.
        } catch(IllegalArgumentException e) {
            LOGGER.error("[IllegalArgumentException] Try/Catch...usingParameters Runing : "+ e.getMessage());
        } catch (Exception e) {
            LOGGER.error("[" + e.getClass() +"] :" + e.getMessage());
        }

        return encrypt;
    }

    /**
     * @Description 복호화
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.24
     * @param decrypt 
     */
    public static String decrypt(String decrypt) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest(); //request 객체

        WebApplicationContext webApplicationContext = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
        EgovEnvCryptoService cryptoService = (EgovEnvCryptoService) webApplicationContext.getBean("egovEnvCryptoService");

        try {
            return cryptoService.decryptNone(decrypt); // Does not handle URLDecoding.
        } catch(IllegalArgumentException e) {
            LOGGER.error("[IllegalArgumentException] Try/Catch...usingParameters Runing : "+ e.getMessage());
        } catch (Exception e) {
            LOGGER.error("[" + e.getClass() +"] :" + e.getMessage());
        }

        return decrypt;
    }

    /**
     * @Description 문자열에 개행문자를 <br/>태그로 변환해주는 메소드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.24
     * @param str
     * @return 문자열 개행문자를 <br/>태그로 치환후 반환
     */
    public static String nl2br(String str) {
        String separator = System.getProperty("line.separator");
        return str.replaceAll(separator, "<br/>"); //개행문자 htmlEscap 해주기
    }

    /**
     * @Description 업로드경로(Globals.fileStorePath)에 파일이 존재여부를 확인해주는 메소드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.24
     * @param filename
     * @return 파일이 존재할 경우 true, 없을 경우 false
     */
    public static boolean isFile(String filename) {
        String path = EgovProperties.getProperty("Globals.fileStorePath"); //업로드 경로
        File file = new File(path + filename);
        return file.isFile();
    }
    
    /**
     * @Description 문자열을 XML로 변환해주는 메소드 
     * @Author 플랫폼개발부문 DT솔루션 김선옥
     * @Date 2022.03.11
     * @param xmlString
     * @return
     */
    public static Document convertStringToXMLDocument(String xmlString) {
    	DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	    DocumentBuilder builder = null;
	    
	    try {
	      builder = factory.newDocumentBuilder();
	       
	      Document doc = builder.parse(new InputSource(new StringReader(xmlString)));
	      return doc;
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	    
	    return null;
    }

    /**
     * @Description 폴더가 있는지 확인하고 없으면 폴더 생성 하는 메소드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.24
     * @param path
     * @return 폴더 생성 성공 또는 폴더 있을시 true, 없을시 false
     */
    public static boolean mkdir(String path) {
        boolean isFolder = false;
        File folder = new File(path);
        if (!folder.exists()) {
            isFolder = folder.mkdirs();
        } else {
            isFolder = true;
        }
        return isFolder;
    }

    /**
     * @Description 글러벌 프로퍼티에 저장되어 있는 디비 정보를 가져오는 매소드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.22
     * @return HashMap(String, String) 데이터베이스 해쉬맵 (host, port, dbName, dbUser, dbPwd)
     */
    public static HashMap<String, String> databases() {
        String[] databases = StringUtils.split(StringUtils.split(EgovProperties.getProperty("Globals.postgres.Url"), "//")[1], "/");
        String dbUrl = databases[0];
        String[] tmp = StringUtils.split(dbUrl, ":");
        String host = tmp[0];
        String port = tmp[1];
        String dbName = databases[1];
        String dbUser = EgovProperties.getProperty("Globals.postgres.UserName"); //디비 유저
        String dbPwd = EgovProperties.getProperty("Globals.postgres.Password"); //디비 비번

        HashMap<String, String> map = new HashMap<>();
        map.put("host", host.trim());
        map.put("port", port.trim());
        map.put("dbName", dbName.trim());
        map.put("dbUser", dbUser.trim());
        map.put("dbPwd", dbPwd.trim());
        return map;
    }
    
    /**
     * @Description : xss방지 
     * @Author 플랫폼개발부문 DT솔루션 김선옥
     * @Date 2022.03.22
     * @param data
     * @return
     */
    public static String unscript(String data) {
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
}
