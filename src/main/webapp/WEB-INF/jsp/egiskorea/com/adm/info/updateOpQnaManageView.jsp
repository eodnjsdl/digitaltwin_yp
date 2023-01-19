<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="egis" uri="http://www.egiskorea.com/jsp/egis" %>
<%
/**
 * @file Name : updateOpQnaManageView.jsp
 * @Description : 운영지원 관리 수정 페이지
 * @Modification Information
 * @
 * @  수정일                         수정자                  수정내용
 * @ -------        --------    ---------------------------
 * @ 2022.02.18      정수환                  최초생성
 * @ 2022.03.07      이준호                  답변내용 추가.
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
				
<!-- content -->
<section id="content">
	<div class="row">
		<div class="col-12 page-tit-wrap">
			<h3 class="page-tit">운영지원 관리</h3>
			<p class="page-txt">운영지원 관리 페이지입니다.</p>
		</div>
	</div>

	<%--@elvariable id="qnaVO" type="egovframework.com.uss.olh.qna.service.QnaVO"--%>
	<form:form commandName="qnaVO" id="qnaForm" method="post" action="/com/mngr/info/updateOpQnaManage.do">
		<form:hidden path="qaId" />

		<%--검색 hidden--%>
		<form:hidden path="pageIndex"/><%--페이지 번호--%>
		<form:hidden path="searchCnd"/><%--검색 조건--%>
		<form:hidden path="searchWrd"/><%--검색 키워드--%>

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
								<th scope="row"><spring:message code="comUssOlhQna.qnaVO.qestnSj" /></th><%--질문제목--%>
								<td><c:out value="${qnaVO.qestnSj}"/></td>
								<th scope="row"><spring:message code="comUssOlhQna.qnaVO.wrterNm" /></th><%--질문자--%>
								<td><c:out value="${qnaVO.wrterNm}"/></td>
							</tr>
							<tr>
								<th scope="row"><spring:message code="comUssOlhQna.qnaVO.qestnCn" /></th><%--질문내용--%>
								<td colspan="3">
								<c:out value="${egis:nl2br(qnaVO.qestnCn)}" escapeXml="false" />
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<%--답변--%>
				<div class="bbs-write-default marT25">
					<table class="bbs-write">
						<colgroup>
							<col style="width: 20%;">
							<col style="width: 30%;">
							<col style="width: 20%;">
							<col style="width: 30%;">
						</colgroup>
						<tbody>
						<tr>
							<th scope="row"><label for="qnaProcessSttusCode"><spring:message code="comUssOlhQna.qnaVO.qnaProcessSttusCode" /> <span class="essential">*</span></label></th><%--진행상태--%>
							<td>
								<form:select path="qnaProcessSttusCode" cssClass="form-select w-50p">
									<form:options items="${qnaProcessSttusCode}" itemValue="code" itemLabel="codeNm" />
								</form:select>
								<div><form:errors path="qnaProcessSttusCode" cssClass="error" /></div>
							</td>
							<th scope="row"><spring:message code="comUssOlhQna.qnaVO.emplyrNm" /></th><%--답변자--%>
							<td><c:out value="${qnaVO.emplyrNm}"/></td>
						</tr>
						<tr>
							<th scope="row"><label for="answerCn"><spring:message code="comUssOlhQna.qnaVO.answerCn" /> <span class="essential">*</span></label></th><%--답변내용--%>
							<td colspan="3">
									<form:textarea path="answerCn" maxlength="2500" cssClass="form-control w-100p"/>
									<div><form:errors path="answerCn" cssClass="error" /></div>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
				<!-- 하단 버튼  -->
				<div class="btn-wrap justify-content-end">
					<div>
						<button type="button" class="btn type02" onclick="fnUpdtQna(this.form);" title="<spring:message code="button.update"/>"><spring:message code="button.update"/></button>
						<a href="<c:url value='/com/mngr/info/selectOpQnaManage.do' />" id="btn-cancel" class="btn type07" title="<spring:message code="button.reset"/> 버튼"><spring:message code="button.reset"/></a>
					</div>
				</div>
			</div>
		</div>
	</form:form>
</section>
<!-- //content -->

<script type="text/javaScript">

	function fnUpdtQna(form){
		if (confirm("<spring:message code="common.update.msg" />")){
			form.submit();
		}
	}

	$(function() {
		/**
		 * 취소 버튼 클릭 이벤트
		 */
		$('#btn-cancel').click(function(e) {
			e.preventDefault();
			var action = $(this).attr('href');
			var $form = $('#qnaForm');

			submit({
				action: action,
				method: 'post',
				targetForm: $form
			});
		});
	});
</script>
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->