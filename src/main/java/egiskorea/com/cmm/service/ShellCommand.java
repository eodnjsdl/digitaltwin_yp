package egiskorea.com.cmm.service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * @Class Name : ShellCommand.java
 * @Description Linux 에 Shell comnad 를 실행하기 위한 클래스
 * @Modification Information
 * @
 * @  수정일     	      수정자              		수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021.03.08    최초생성
 *
 * @author 스마트융합사업본부 이상화
 * @since 2021. 03.08
 * @version 1.0
 * @see
 */

public class ShellCommand {
	
	/**
	 * 서버시스템에 convertCommand 실행 후 리턴
	 * @param String[] convertCommand
	 * @return exitValue 0 : 성공, 1 : 실패
	 * @throws Exception
	 */
	public static int shellCmdReturnCode(String[] convertCommand) throws Exception {
		
		int result = 0;
		
		ProcessBuilder processBuilder = new ProcessBuilder(convertCommand);
		
		processBuilder.redirectErrorStream(true);
		
		Process process = processBuilder.start();
		
		InputStream stderr = process.getInputStream();
		InputStreamReader isr = new InputStreamReader(stderr);
		BufferedReader br = new BufferedReader(isr);
		
		String outLine = null;
		while((outLine = br.readLine()) != null) {
			System.out.println("CONVERT COMMAND LINE::::"+outLine);
		}
		
		process.waitFor();
		
		result = process.exitValue();
		
		stderr.close();
		isr.close();
		br.close();
		
		return result;
	}
	
	/**
	 * 서버시스템에 convertCommand 실행 후 리턴
	 * @param String[] convertCommand
	 * @return exitValue 0 : 성공, 1 : 실패
	 * @throws Exception
	 */
	public static String shellCmdReturnToJson(String[] convertCommand) throws Exception {
		
		ProcessBuilder processBuilder = new ProcessBuilder(convertCommand);
        Process process = processBuilder.start();
        
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        StringBuilder builder = new StringBuilder();
        String line;
        
        while ( (line = reader.readLine()) != null) {
//        	System.out.println("CONVERT COMMAND LINE::::"+line);
			builder.append(line);
        }
        
        process.waitFor();
        
        System.out.println("###################################################");
        System.out.println(builder.toString().replaceAll(" ", "").replaceAll("\t",""));
        System.out.println("###################################################");
        String result = builder.toString().replaceAll(" ", "").replaceAll("\t","");
        
        reader.close();
        
        return result;
	}
	
}
