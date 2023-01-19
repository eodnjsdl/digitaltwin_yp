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

/* $(document).ready(function(){
	document.getElementById("clCode").focus();
}); */

function fnUpdtCode(form){
	if (!validateCmmnCodeVO(form)) {		 			
		return false;		
	} else {
		if(confirm("<spring:message code="common.update.msg" />")){	
			form.submit();	
		}					
	}	
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
					<form:form commandName="cmmnCodeVO" method="post" action="${pageContext.request.contextPath}/com/mngr/info/updateCcmCmmnCodeManage.do">
						<form:hidden path="clCode"/>
						<form:hidden path="clCodeNm"/>
						<form:hidden path="clNmCode"/>
						<form:hidden path="codeId"/>
						<form:hidden path="searchCondition" value="${searchVO.searchCondition}"/>
						<form:hidden path="searchKeyword" value="${searchVO.searchKeyword}"/>	
						<form:hidden path="pageIndex" value="${searchVO.pageIndex}"/>	
						
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
												<th scope="row"><label for="clNmCode">분류코드명(분류코드)</label></th>
												<td>
													<c:out value="${cmmnCodeVO.clNmCode}"/>
													<%-- <form:input path="clNmCode" cssClass="form-control w-100p" readonly="true" /> --%>
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="clCodeNm">코드ID</label></th>
												<td>
													<c:out value="${cmmnCodeVO.codeId}"/>
												    <%-- <form:input path="codeId" cssClass="form-control w-100p" readonly="true"/> --%>
													
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="clCodeDc">코드ID명 <span class="essential">*</span></label></th>
												<td>
												    <form:input path="codeIdNm" maxlength="60" cssClass="form-control w-60p" />
									   				<div><form:errors path="codeIdNm" cssClass="essential" /></div>     
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="clCodeDc">코드ID설명 <span class="essential">*</span></label></th>
												<td>
												    <form:textarea path="codeIdDc" maxlength="200" cssClass="form-control w-90p" />
									   				<div><form:errors path="codeIdDc" cssClass="essential" /></div>     
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="useAt">사용여부 <span class="essential">*</span></label></th>
												<td>
													<span class="form-radio group">
														<span>
															<form:radiobutton path="useAt" value="Y" label="사용" />
														</span>
														<span>
															<form:radiobutton path="useAt" value="N" label="미사용" />
														</span> 
													</span> 
													<div><form:errors path="useAt" cssClass="essential" /></div>
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="frstRegistPnttm">생성일 </label></th>
												<td>
												   	<c:out value="${cmmnCodeVO.frstRegistPnttm}"/>
												    <%-- <form:input path="frstRegistPnttm" cssClass="form-control w-100p" readonly="true"/> --%>
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="frstRegisterId">생성자 </label></th>
												<td>
												    <c:out value="${cmmnCodeVO.frstRegisterNm}"/>
												    <%-- <form:input path="frstRegisterId" cssClass="form-control w-100p" readonly="true"/> --%>
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="lastUpdtPnttm">수정일 </label></th>
												<td>
												    <c:out value="${cmmnCodeVO.lastUpdtPnttm}"/>
												    <%-- <form:input path="lastUpdtPnttm" cssClass="form-control w-100p" readonly="true"/> --%>
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="lastUpdusrId">수정자 </label></th>
												<td>
												    <c:out value="${cmmnCodeVO.lastUpdusrNm}"/>
												    <%-- <form:input path="lastUpdusrId" cssClass="form-control w-100p" readonly="true"/> --%>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								
								<!-- 하단 버튼  -->
								<div class="btn-wrap justify-content-between">
								<div></div>
									<div>
										<button type="button" class="btn type02" onclick="fnUpdtCode(this.form);"><spring:message code="button.update" /></button>
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