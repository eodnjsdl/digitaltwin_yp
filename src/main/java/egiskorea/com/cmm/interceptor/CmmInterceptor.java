package egiskorea.com.cmm.interceptor;

import egovframework.com.cmm.EgovMessageSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.*;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Description 공통 인터셉터 클래스
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.03.02
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.02		이준호	최초 생성
 *
 */

public class CmmInterceptor implements HandlerInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(CmmInterceptor.class);
    @Resource(name = "egovMessageSource")
    EgovMessageSource egovMessageSource;

    /**
     * -인터셉터 메소드별 설명-
     * 인터셉터는 HandlerInterceptor나 HandlerInterceptorAdapter를 상속받아 구현할 수 있다.
     * preHandle 메소드 : Controller 실행 직전에 동작하는 메소드
     * postHandle 메소드 : Controller 진입 후 view가 렌더링 되기전에 동작하는 메소드
     * afterComplete 메소드 : Controller 진입 후 view가 렌더링 된 후 에 동작하는 메소드
     * ※HandlerInterceptorAdapter를 이용하여 상속받으면 위에 메소드 이외에도 afterConcurrentHandlingStarted 메소드를 상속 받을 수 있다.
     * afterConcurrentHandlingStarted 메소드 : 비동기(ajax) 요청 시 postHandle와 afterCompletion는 실행되지 않고 이 메소드를 수행한다.
     */

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        LOGGER.info("================================== Request URI \t:  " + request.getRequestURI() + " ==================================");

        /*boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();  //로그인 여부
        if (!isAuthenticated) { //로그인 인증 실패시
            response.sendRedirect("/uat/uia/loginUsr.do");
            return false;
        }*/
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception { }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception e) throws Exception { }


}
