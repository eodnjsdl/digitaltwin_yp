<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>

<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->
				
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<validator:javascript formName="authorManage" staticJavascript="false" xhtml="true" cdata="false"/>


<script type="text/javaScript" language="javascript">

function fncAuthorUpdate(form) {
	if(confirm("<spring:message code="common.save.msg" />")){ //저장하시겠습니까?
        if(!validateAuthorManage(form)){
            return false;
        }else{
        	form.submit();
        }
    }
}

</script>
				
				<!-- content -->
				<section id="content">
					<form:form commandName="authorManage" method="post" action="/com/mngr/auth/updateAuthorManage.do">
					<input type="hidden" name="searchCondition" value="<c:out value='${authorManageVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${authorManageVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${authorManageVO.pageIndex}'/>"/>
					<input type="hidden" name="authorCode" value="<c:out value='${authorManageVO.authorCode}'/>"/>
					
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">권한정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">권한정보를 수정하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<div class="bbs-write-default">
								<table class="bbs-write">
									<colgroup>
										<col style="width: 15%;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										<!-- 권한코드 -->
										<tr>
											<th scope="row"><spring:message code="comCopSecRam.regist.authorCode" /> <span class="essential">*</span></th>
											<td><c:out value="${authorManageVO.authorCode}"/></td>
										</tr>
										<!-- 권한명 -->
										<tr>
											<th scope="row"><spring:message code="comCopSecRam.regist.authorNm" /> <span class="essential">*</span></th>
											<td>
												<form:input path="authorNm" size="40" maxlength="60" cssClass="form-control" />
   												<div><form:errors path="authorNm" cssClass="error" /></div>
   											</td> 
										</tr>
										<!-- 조직 설명 -->
										<tr>
											<th scope="row"><spring:message code="comCopSecRam.regist.authorDc" /></th>
											<td>
												<form:textarea path="authorDc" cols="300" rows="10" cssClass="form-control" />   
												<div><form:errors path="authorDc" cssClass="error" /></div>
											</td> 
										</tr>										
									</tbody>
								</table>
							</div>
							
							<!-- 하단 버튼  -->
							<div class="btn-wrap justify-content-between">
								<div></div>
								<div>
									<button type="button" class="btn type02" onclick="fncAuthorUpdate(this.form);"><spring:message code="button.update" /></button>
									<button type="button" class="btn type07" onclick="history.back();"><spring:message code="button.reset" /></button>
								</div>
							</div>

						</div>
					</div>
					</form:form>
					
				</section>
				<!-- //content -->
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->