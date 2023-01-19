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
<validator:javascript formName="boardMasterVO" staticJavascript="false" xhtml="true" cdata="false"/>

<script type="text/javaScript">

/* $(document).ready(function(){
	document.getElementById("bbsNm").focus();
}); */

$()

function fnUpdtBbs(form){
	if (!validateBoardMasterVO(form)) {
		return false;
	} else {
		
		var validateForm = document.getElementById("boardMasterVO");
		
		if(validateForm.bbsTyCode.value == 'BBST03') {
			if(validateForm.replyPosblAt.value == 'Y') {
				alert("<spring:message code="comCopBbs.boardMasterVO.guestReply" />");
				return;
			}
			if(validateForm.fileAtchPosblAt.value == 'Y') {
				alert("<spring:message code="comCopBbs.boardMasterVO.guestFile" />");
				return;
			}
		} else {
			if(validateForm.fileAtchPosblAt.value == 'Y' && validateForm.atchPosblFileNumber.value == '0') {
				alert('첨부가능파일숫자를 선택하세요.');
				return;
			}
			if(validateForm.fileAtchPosblAt.value == 'N' && validateForm.atchPosblFileNumber.value != '0') {
				alert('파일첨부를 사용하지 않으셨습니다. 첨부파일 최대수를 0으로 선택하세요.');
				return;
			} 
		}
		
		if(confirm("<spring:message code="common.update.msg" />")){
			form.submit();	
		}
	} 
}

</script>
				${searchVO.searchCnd}1
				${searchVO.searchWrd}2
				${searchVO.pageIndex}3
				
				<!-- content -->
				<section id="content">
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">게시판 관리</h3>
							<p class="page-txt">게시판 관리 페이지입니다.</p>
						</div>
					</div>
					
					<form:form commandName="boardMasterVO" method="post" action="/com/mngr/info/updateBBSManage.do">
						<form:hidden path="cmmntyId"/>
						<form:hidden path="bbsId"/>
						<form:hidden path="replyPosblAt"/>
						<form:hidden path="searchCnd" value="${searchVO.searchCnd}"/>
						<form:hidden path="searchWrd" value="${searchVO.searchWrd}"/>	
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
												<th scope="row"><label for="bbsNm">게시판명 <span class="essential">*</span></label></th>
												<td>
												    <form:input path="bbsNm" maxlength="200" cssClass="form-control w-60p"/>
									   				<div><form:errors path="bbsNm" cssClass="essential" /></div>     
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="bbsIntrcn">게시판 내용 <span class="essential">*</span></label></th>
												<td>
												    <form:textarea path="bbsIntrcn" maxlength="2400" cssClass="form-control w-90p" />
									   				<div><form:errors path="bbsIntrcn" cssClass="essential" /></div>     
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="bbsTyCode">게시판 유형 <span class="essential">*</span></label></th>
												<td>
												    <form:select path="bbsTyCode" cssClass="form-select w-15p">
										    			<form:option value="" label="선택하세요"/>
							 							<form:options items="${bbsTyCode}" itemValue="code" itemLabel="codeNm"/>
													</form:select>
									   				<div><form:errors path="bbsTyCode" cssClass="essential" /></div>     
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="replyPosblAt">답장 여부 <span class="essential">*</span></label></th>
												<td>
													<span class="form-radio group">
														<span>
															<form:radiobutton path="replyPosblAt" value="Y" label="사용"/>
														</span>
														<span>
															<form:radiobutton path="replyPosblAt" value="N" label="미사용"/>
														</span> 
													</span> 
													<div><form:errors path="replyPosblAt" cssClass="essential" /></div>
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="fileAtchPosblAt">파일첨부 여부 <span class="essential">*</span></label></th>
												<td>
													<span class="form-radio group">
														<span>
															<form:radiobutton path="fileAtchPosblAt" value="Y" label="사용"/>
														</span>
														<span>
															<form:radiobutton path="fileAtchPosblAt" value="N" label="미사용"/>
														</span> 
													</span> 
													<div><form:errors path="fileAtchPosblAt" cssClass="essential" /></div>
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="atchPosblFileNumber">첨부파일 최대수 <span class="essential">*</span></label></th>
												<td>
												    <form:select path="atchPosblFileNumber" cssClass="form-select w-15p">
										    			<form:option value="0" label="없음" selected="selected"/>
										    			<form:option value="1" label="1"/>
										    			<form:option value="2" label="2"/>
										    			<form:option value="3" label="3"/>
													</form:select>
									   				<div><form:errors path="atchPosblFileNumber" cssClass="essential" /></div>     
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="option">추가선택사항 </label></th>
												<td>
													<c:choose>
														<c:when test="${boardMasterVO.option eq 'na'}">
														    <form:select path="option" cssClass="form-select w-15p" >
												    			<form:option value="" label="미선택"/>
													    			<c:if test="${useComment eq 'true'}">
														  		   		<form:option value='comment'>댓글</form:option>
														  		    </c:if>
														  		    <c:if test="${useSatisfaction eq 'true'}">
														  		   		<form:option value='stsfdg'>만족도조사</form:option>
														  		    </c:if>
															</form:select>
														</c:when>
														<c:otherwise>
															<%-- <form:select path="option" cssClass="form-select w-15p" disabled="true" >
																<form:option value='comment'>댓글</form:option>
																<form:option value='stsfdg'>만족도조사</form:option>
															</form:select> --%>
															<c:if test="${boardMasterVO.option eq 'comment'}">댓글</c:if>
															<c:if test="${boardMasterVO.option eq 'stsfdg'}">만족도조사</c:if>
														</c:otherwise>
													</c:choose>
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="useAt">사용여부 <span class="essential">*</span></label></th>
												<td>
													<span class="form-radio group">
														<span>
															<form:radiobutton path="useAt" value="Y" label="사용"/>
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
									<div></div>
									<div>
										<button type="button" class="btn type02" onclick="fnUpdtBbs(this.form);"><spring:message code="button.update" /></button>
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