<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%
/**
 * @file Name : insertQnaManageView.jsp
 * @Description : Q&A 관리 등록 페이지
 * @Modification Information
 * @
 * @  수정일                         수정자                  수정내용
 * @ -------        --------    ---------------------------
 * @ 2022.02.18      정수환                  최초생성
 *
 * @author 플랫폼개발부문 DT솔루션 정수환
 * @since 2022.02.18
 * @version 1.0
 *
 */
%>
<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->

<script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/fms/EgovMultiFiles.js'/>" ></script>
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<validator:javascript formName="qnaVO" staticJavascript="false" xhtml="true" cdata="false"/>

<script type="text/javaScript">

$(document).ready(function(){
	document.getElementById("wrterNm").focus();
});

function fnRegistQna(form){
	
	if (!validateQnaVO(form)) {	
		return false;
	} else {
		if(confirm("<spring:message code="common.regist.msg" />")){	
			form.submit();	
		}
	} 
}

</script>
				
<!-- content -->
<section id="content">
	<div class="row">
		<div class="col-12 page-tit-wrap">
			<h3 class="page-tit">Q&A 관리</h3>
			<p class="page-txt">Q&A 관리 페이지입니다.</p>
		</div>
	</div>

	<%--@elvariable id="qnaVO" type="egovframework.com.uss.olh.qna.service.QnaVO"--%>
	<form:form commandName="qnaVO" method="post" action="${pageContext.request.contextPath}/com/mngr/info/insertQnaManage.do">
		<input name="answerCn" type="hidden" value="<c:out value='answer'/>">
		<form:hidden path="wrterNm"/>
		<div class="row">
			<div class="col-12">
				<div class="bbs-write-default">
					<table class="bbs-write">
						<colgroup>
							<col style="width: 20%;">
							<col style="width: 30%;">
							<col style="width: 20%;">
							<col style="width: 30%;">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row"><label for="qestnSj"><spring:message code="comUssOlhQna.qnaVO.qestnSj" /> <span class="essential">*</span></label></th><%--질문제목--%>
								<td>
									<form:input path="qestnSj" maxlength="70" cssClass="form-control w-90p"/>
									<div><form:errors path="qestnSj" cssClass="essential" /></div>
								</td>
								<th scope="row"><spring:message code="table.reger" /> <span class="essential">*</span></th><%--등록자--%>
								<td><c:out value="${qnaVO.wrterNm}"/></td>
							</tr>
							<tr>
								<th scope="row"><label for="qestnCn"><spring:message code="comUssOlhQna.qnaVO.qestnCn" /> <span class="essential">*</span></label></th><%--질문내용--%>
								<td colspan="3">
									<form:textarea path="qestnCn" maxlength="300" cssClass="form-control w-100p"/>
									<div><form:errors path="qestnCn" cssClass="essential" /></div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- 하단 버튼  -->
				<div class="btn-wrap justify-content-between">
					<a href="<c:url value='/com/mngr/info/selectQnaManageList.do' />" class="btn basic"><spring:message code="button.list"/></a>
					<button type="button" class="btn type01" onclick="fnRegistQna(this.form);"><spring:message code="button.save"/></button>
				</div>
			</div>
		</div>
	</form:form>
</section>
<!-- //content -->
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->