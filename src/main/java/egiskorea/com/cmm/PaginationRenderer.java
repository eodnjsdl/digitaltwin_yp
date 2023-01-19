package egiskorea.com.cmm;

import egovframework.rte.ptl.mvc.tags.ui.pagination.AbstractPaginationRenderer;

import javax.servlet.ServletContext;

import org.springframework.web.context.ServletContextAware;
/**
 * ImagePaginationRenderer.java 클래스
 *
 * @author 서준식
 * @since 2011. 9. 16.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자           수정내용
 *  -------    -------------    ----------------------
 *   2011. 9. 16.   서준식       이미지 경로에 ContextPath추가
 *   2016. 6. 17.   장동한       표준프레임워크 v3.6 리뉴얼
 * </pre>
 */
public class PaginationRenderer extends AbstractPaginationRenderer implements ServletContextAware{

	private ServletContext servletContext;

	public PaginationRenderer() {

	}

	public void initVariables(){

		firstPageLabel    = "<a href=\"javascript:;\" class=\"first\" onclick=\"{0}({1});return false; \" title=\"처음\"></a>";
		previousPageLabel = "<a href=\"javascript:;\" class=\"prev\" onclick=\"{0}({1});return false; \" title=\"이전\"></a>";
		
        currentPageLabel  = "<strong class=\"current\">{0}</strong>";
        otherPageLabel    = "<a href=\"javascript:;\" onclick=\"{0}({1});return false; \">{2}</a>";
        
        nextPageLabel    = "<a href=\"javascript:;\" class=\"next\" onclick=\"{0}({1});return false; \" title=\"다음\"></a>";
        lastPageLabel    = "<a href=\"javascript:;\" class=\"last\" onclick=\"{0}({1});return false; \" title=\"마지막\"></a>";

	}



	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
		initVariables();
	}

}
