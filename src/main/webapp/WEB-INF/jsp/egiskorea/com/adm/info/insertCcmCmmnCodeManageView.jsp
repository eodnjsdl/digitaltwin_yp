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
<validator:javascript formName="cmmnCodeVO" staticJavascript="false" xhtml="true" cdata="false"/>

<script type="text/javaScript">

$(document).ready(function(){
	document.getElementById("codeId").focus();
});

function fnRegistCode(form){
	if (!validateCmmnCodeVO(form)) {
		return false;
	} else {
		if(confirm("<spring:message code="common.regist.msg" />")){
			form.submit();	
		}
	} 
}

function fnGoList(pageIndex){
	document.goListForm.pageIndex.value = pageIndex;
	document.goListForm.action = "<c:url value='/com/mngr/info/selectCcmCmmnCodeManageList.do' />";
	document.goListForm.submit();
}
</script>
				
				<!-- content -->
				<section id="content">
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">공통코드 관리</h3>
							<p class="page-txt">공통코드 관리 페이지입니다.</p>
						</div>
					</div>
					
					<form:form commandName="cmmnCodeVO" method="post" action="/com/mngr/info/insertCcmCmmnCodeManage.do">
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
												<th scope="row"><label for="clCode">분류코드명(분류코드) <span class="essential">*</span></label></th>
												<td>
												    <form:select path="clCode" cssClass="form-select w-60p">
										    			<form:option value="" label="선택하세요"/>
							 							<form:options items="${clCodeList}" itemValue="clCode" itemLabel="clNmCode"/>
													</form:select>
									   				<div><form:errors path="clCode" cssClass="error" /></div>    
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="codeId">코드ID <span class="essential">*</span></label></th>
												<td>
												    <form:input path="codeId" maxlength="6" cssClass="form-control w-60p"/>
									   				<div><form:errors path="codeId" cssClass="essential" /></div>     
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="codeIdNm">코드ID명 <span class="essential">*</span></label></th>
												<td>
												    <form:input path="codeIdNm" maxlength="60" cssClass="form-control w-60p" />
									   				<div><form:errors path="codeIdNm" cssClass="essential" /></div>     
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="codeIdDc">코드ID설명 <span class="essential">*</span></label></th>
												<td>
												    <form:textarea path="codeIdDc" maxlength="200" cssClass="form-control w-100p" />
									   				<div><form:errors path="codeIdDc" cssClass="essential" /></div>     
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
									<button type="button" class="btn basic" onclick="fnGoList(<c:out value='${cmmnCodeVO.pageIndex}'/>);"><spring:message code="button.list" /></button>
									<button type="button" class="btn type01" onclick="fnRegistCode(this.form);"><spring:message code="button.create" /></button>
								</div>
	
							</div>
						</div>
					</form:form>
						
					<form:form name="goListForm" method="post">
					<input type="hidden" name="searchCondition" value="<c:out value='${cmmnCodeVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${cmmnCodeVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${cmmnCodeVO.pageIndex}'/>"/>
					</form:form>
				</section>
				<!-- //content --> 
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->