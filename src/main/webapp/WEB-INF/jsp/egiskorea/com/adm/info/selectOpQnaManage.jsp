<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
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

<!-- content -->
<section id="content">
	<div class="row">
		<div class="col-12 page-tit-wrap">
			<h3 class="page-tit">운영지원 관리</h3>
			<p class="page-txt">운영지원 관리 페이지입니다.</p>
		</div>
	</div>

	<div class="row">
		<div class="col-12">
		<%--@elvariable id="searchVO" type="egovframework.com.uss.olh.qna.service.QnaVO"--%>
		<form:form commandName="searchVO" id="listform" name="listform" method="post" action="/com/mngr/info/updateOpQnaManageView.do">
			<form:hidden path="qaId" />

			<%--검색 hidden--%>
			<form:hidden path="pageIndex"/><%--페이지 번호--%>
			<form:hidden path="searchCnd"/><%--검색 조건--%>
			<form:hidden path="searchWrd"/><%--검색 키워드--%>

			<div class="bbs-detail-default${result.delAt eq 'Y' ? ' del' : ''}">
				<table class="bbs-detail">
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 30%;">
						<col style="width: 20%;">
						<col style="width: 30%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><spring:message code="comUssOlhQna.qnaVO.qestnSj" /></th><%--질문제목--%>
							<td><c:out value="${result.qestnSj}"/></td>
							<th scope="row"><spring:message code="table.regdate" /></th><%--등록일--%>
							<td><c:out value="${result.frstRegisterPnttm}"/></td>
						</tr>
						<tr>
							<th scope="row"><spring:message code="table.reger" /></th><%--등록자--%>
							<td><c:out value="${result.wrterNm}"/></td>
							<th scope="row"><spring:message code="comUssOlhQna.qnaVO.inqireCo" /></th><%--조회수--%>
							<td><c:out value="${result.inqireCo}"/></td>
						</tr>
						
						<tr>
							<th scope="row"><spring:message code="comUssOlhQna.qnaVO.qestnCn" /></th><%--질문내용--%>
								<td colspan="3">
										<c:out value="${egis:nl2br(result.qestnCn)}" escapeXml="false" />
								</td>				
						</tr>
						<tr>
							<th scope="row"><spring:message code="cop.atchFileList" /></th><%--첨부파일--%>
							<td colspan="3">
								<c:import url="/cmm/fms/selectFileInfs.do" charEncoding="utf-8">
									<c:param name="param_atchFileId" value="${result.atchFileId}" />
								</c:import>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<c:if test="${result.qnaProcessSttusCode ==  '3'}">
				<div class="bbs-detail-default marT25${result.delAt eq 'Y' ? ' del' : ''}">
					<table class="bbs-detail">
						<colgroup>
							<col style="width: 20%;">
							<col style="width: 30%;">
							<col style="width: 20%;">
							<col style="width: 30%;">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row"><spring:message code="comUssOlhQna.qnaVO.emplyrNm" /></th><%--답변자--%>
								<td><c:out value="${result.emplyrNm}"/></td>
								<th scope="row"><spring:message code="comUssOlhQna.qnaVO.answerDe" /></th><%--답변날짜--%>
								<td><c:out value="${result.answerDe}"/></td>
							</tr>
							<tr>
								<th scope="row"><spring:message code="comUssOlhQna.qnaVO.qnaProcessSttusCode" /></th><%--진행상태--%>
								<td colspan="3"><c:out value="${result.qnaProcessSttusCodeNm}"/></td>
							</tr>
							<tr>
								<th scope="row"><spring:message code="comUssOlhQna.qnaVO.answerCn" /></th><%--답변내용--%>
								<td colspan="3"><c:out value="${egis:nl2br(result.answerCn)}" escapeXml="false" /></td>
							</tr>
						</tbody>
					</table>
				</div>
			</c:if>
			<div class="btn-wrap justify-content-between">
				<div>
					<a href="<c:url value='/com/mngr/info/selectOpQnaManageList.do'/>" class="btn basic btn-list"><spring:message code="button.list"/></a>
				</div>
				<div>
					<c:if test="${result.delAt eq 'Y'}">
						<button type="button" class="btn type03 btn-restore" data-qa_id="<c:out value='${result.qaId}'/>" title="질문<spring:message code="button.restore"/> 버튼">질문<spring:message code="button.restore"/></button>
					</c:if>
					<button type="submit" class="btn type02"><spring:message code="button.update"/></button>
					<button type="button" class="btn basic" onclick="fnDeleteQna('<c:out value="${result.qaId}"/>'); return false;" title="<spring:message code="button.delete"/> 버튼"><spring:message code="button.delete"/></button>
				</div>
			</div>
			</form:form>
		</div>
	</div>
</section>
<!-- //content -->

<script>

	/**
	 * @description 삭제
	 * @param {string} qaId
	 */
	function fnDeleteQna(qaId){
		if(confirm("<spring:message code="common.delete.msg" />")){
			document.listform.qaId.value = qaId;
			document.listform.action = "<c:url value='/com/mngr/info/deleteOpQnaManage.do'/>";
			document.listform.submit();
		}
	}

	$(function() {

		/**
		 * @description 목록 클릭 이벤트
		 * @Author 플랫폼개발부문 DT솔루션 이준호
		 * @Date 2022.03.16
		 */
		$('.btn-list').click(function(e) {
			e.preventDefault();

			var $form = $('#listform');
			var action = $(this).attr('href');

			submit({
				action: action,
				method: 'post',
				targetForm: $form
			});
		});

		/** 복구 이벤트 */
		$('.btn-restore').click(function() {
			var qaId = $(this).data('qa_id');
			if (confirm("<spring:message code="common.restore.msg" />")) {
				document.listform.qaId.value = qaId;
				document.listform.action = "<c:url value='/com/mngr/info/restoreOpQnaManage.do'/>";
				document.listform.submit();
			}
		});

		<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
	});
</script>

<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->