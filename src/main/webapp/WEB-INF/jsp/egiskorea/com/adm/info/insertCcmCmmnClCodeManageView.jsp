<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
<validator:javascript formName="cmmnClCodeVO" staticJavascript="false" xhtml="true" cdata="false"/>

<script type="text/javaScript">

$(document).ready(function(){
	document.getElementById("clCode").focus();
});

function fnRegistClCode(form){
	if (!validateCmmnClCodeVO(form)) {
		return false;
	} else {
		if(confirm("<spring:message code="common.regist.msg" />")){
			form.submit();	
		}
	} 
}

function fnGoList(pageIndex){
	document.goListForm.pageIndex.value = pageIndex;
	document.goListForm.action = "<c:url value='/com/mngr/info/selectCcmCmmnClCodeManageList.do'/>";
	document.goListForm.submit();
}

</script>
				
				<!-- content -->
				<section id="content">
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">공통분류코드 관리</h3>
							<p class="page-txt">공통분류코드 관리 페이지입니다.</p>
						</div>
					</div>
					
					<form:form commandName="cmmnClCodeVO" method="post" action="/com/mngr/info/insertCcmCmmnClCodeManage.do">
						<div class="row">
							<div class="col-12">
								<div class="bbs-write-default">
									<table class="bbs-write">
										<colgroup>
											<col style="width: 20%;">
											<col style="width: auto;">
										</colgroup>
										<tbody>
											<tr>
												<th scope="row"><label for="clCode">분류코드 <span class="essential">*</span></label></th>
												<td>
													<form:input path="clCode" maxlength="3" cssClass="form-control w-15p" />
									   				<div><form:errors path="clCode" cssClass="essential"/></div>     
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="clCodeNm">분류코드명 <span class="essential">*</span></label></th>
												<td>
												    <form:input path="clCodeNm" maxlength="60" cssClass="form-control w-15p"/>
									   				<div><form:errors path="clCodeNm" cssClass="essential" /></div>     
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="clCodeDc">분류코드 설명 <span class="essential">*</span></label></th>
												<td>
												    <form:textarea path="clCodeDc" maxlength="200" cssClass="form-control w-90p" />
									   				<div><form:errors path="clCodeDc" cssClass="essential" /></div>     
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="useAt">사용여부 <span class="essential">*</span></label></th>
												<td>
													<span class="form-radio group">
														<span>
															<form:radiobutton path="useAt" value="Y" label="사용" checked="checked"/>
														</span>
														<span>
															<form:radiobutton path="useAt" value="N" label="미사용"/>
														</span> 
													</span> 
													<div><form:errors path="useAt" cssClass="essential" /></div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								
								<!-- 하단 버튼  -->
								<div class="btn-wrap justify-content-between">
									<button type="button" class="btn basic" onclick="fnGoList(<c:out value='${searchVO.pageIndex}'/>);"><spring:message code="button.list" /></button>
									<button type="button" class="btn type01" onclick="fnRegistClCode(this.form);"><spring:message code="button.create" /></button>
								</div>
	
							</div>
						</div>
						</form:form>
						
						<form:form name="goListForm" method="post">
						<input type="hidden" name="searchCondition" value="<c:out value='${searchVO.searchCondition}'/>"/>
						<input type="hidden" name="searchKeyword" value="<c:out value='${searchVO.searchKeyword}'/>"/>
						<input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}'/>"/>
						</form:form>
				</section>
				<!-- //content --> 
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->