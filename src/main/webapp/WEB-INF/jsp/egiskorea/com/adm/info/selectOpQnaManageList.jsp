<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
/**
 * @file Name : selectOpQnaManageList.jsp
 * @Description : 운영지원 관리 목록 페이지
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

<!-- javascript warning tag  -->
<noscript class="noScriptTitle"><spring:message code="common.noScriptTitle.msg" /></noscript>

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
			<div class="bbs-top">
				<div class="bbs-list-num">조회 : <strong><c:out value="${paginationInfo.totalRecordCount}" /></strong>건</div>
				<div class="d-flex">
					<div class="term">
						<%--@elvariable id="searchVO" type="egovframework.com.uss.olh.qna.service.QnaVO"--%>
						<form:form commandName="searchVO" name="searchForm" id="searchForm" method="post" onsubmit="fnSearch(); return false;">
							<form:hidden path="pageIndex" />

							<div class="desc">
								<form:select cssClass="form-select" path="searchCnd">
									<option value="0"  <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if> >등록자</option>
									<option value="1"  <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if> >질문제목</option>
								</form:select>
								<form:input cssClass="form-control" path="searchWrd" />
								<button type="submit" class="btn type05 bi-srch" title="<spring:message code="button.inquire" /> 버튼"><spring:message code="button.inquire" /></button>
								<%--<a href="#" onclick="fnInsertArticle();" class="btn type01">등록</a>--%>
							</div>
						</form:form>
					</div>
				</div>
			</div>

			<form:form commandName="searchVO" id="listForm" name="listForm" method="post">
				<form:hidden path="qaId"/>
				<form:hidden path="pageIndex"/>
				<input type="hidden" name="qaIds"/>

				<div class="bbs-default">
					<table class="bbs-list">
						<colgroup>
							<col style="width: 5%;">
							<col style="width: 5%;">
							<col style="width: auto%;">
							<col style="width: 10%;">
							<col style="width: 10%;">
							<col style="width: 5%;">
							<col style="width: 10%;">
							<col style="width: 10%;">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">
									<span class="form-checkbox">
										<input type="checkbox" name="checkAll" id="rChk-all" onclick="fncCheckAll();">
										<label for="rChk-all"></label>
									</span>
								</th>
								<th scope="col"><spring:message code="table.num" /></th><%--번호--%>
								<th scope="col"><spring:message code="comUssOlhQna.qnaVO.qestnSj" /></th><%--질문제목--%>
								<th scope="col"><spring:message code="table.reger" /></th><%--등록자--%>
								<th scope="col"><spring:message code="comUssOlhQna.qnaVO.qnaProcessSttusCode" /></th><%--진행상태--%>
								<th scope="col"><spring:message code="comUssOlhQna.qnaVO.delAt" /></th><%--삭제유무--%>
								<th scope="col"><spring:message code="comUssOlhQna.qnaVO.inqireCo" /></th><%--조회수--%>
								<th scope="col"><spring:message code="table.regdate" /></th><%--등록일--%>
							</tr>
						</thead>
						<tbody>
						<c:forEach var="resultInfo" items="${resultList}" varStatus="status">
							<tr${resultInfo.delAt eq 'Y' ? ' class=\"del\"' : ''}>
								<td>
									<span class="form-checkbox">
										<input type="checkbox" name="delYn" id="rChk1_<c:out value="${resultInfo.qaId}" />" value="<c:out value="${resultInfo.qaId}" />">
										<label for="rChk1_<c:out value="${resultInfo.qaId}" />"></label>
									</span>
									<input type="hidden" name="checkId" value="<c:out value="${resultInfo.qaId}"/>" />
								</td>
								<td><c:out value="${(searchVO.pageIndex-1) * (11) + status.count}"/></td>
								<td><a href="#;" onclick="fnInquireQnaDetail('<c:out value='${resultInfo.qaId}'/>'); return false;"><c:out value='${fn:substring(resultInfo.qestnSj, 0, 50)}' escapeXml="false"/></a></td>
								<td><c:out value="${resultInfo.wrterNm}"/></td>
								<td><c:out value="${resultInfo.qnaProcessSttusCodeNm}"/></td>
								<td><c:out value="${resultInfo.delAt eq 'Y' ? ' 유' : '무'}"/></td>
								<td><c:out value="${resultInfo.inqireCo}"/></td>
								<td><c:out value="${resultInfo.frstRegisterPnttm}"/></td>
							</tr>
						</c:forEach>

						<c:if test="${fn:length(resultList) == 0}">
							<tr>
								<td colspan="8">자료가 없습니다. 다른 검색조건을 선택해주세요</td>
							</tr>
						</c:if>

						</tbody>
					</table>
				</div>

				<!-- pagination -->
				<div class="pagination">
					<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="fnLinkPage"/>
				</div>
				<!-- //pagination -->
			</form:form>

			<div class="btn-wrap">
				<div><button type="button" class="btn basic" onclick="fncSelDeleteList();" title="<spring:message code="button.delete"/> 버튼"><spring:message code="button.delete"/></button></div>
			</div>
		</div>
	</div>
</section>

<script>

	function fnSearch(){
		document.searchForm.pageIndex.value = 1;
		document.searchForm.action = "<c:url value='/com/mngr/info/selectOpQnaManageList.do'/>";
		document.searchForm.submit();
	}

	function fnLinkPage(pageIndex) {
		submit({
			method: 'post',
			formData : {
				'pageIndex': pageIndex,
				'searchCnd': '${searchVO.searchCnd}',
				'searchWrd': '${searchVO.searchWrd}'
			}
		});
	}

	function fnInquireQnaDetail(qaId) {

		submit({
			action: '<c:url value="/com/mngr/info/selectOpQnaManage.do"/>',
			method: 'post',
			formData : {
				'qaId': qaId,
				'pageIndex': '${searchVO.pageIndex}',
				'searchCnd': '${searchVO.searchCnd}',
				'searchWrd': '${searchVO.searchWrd}'
			}
		});
	}
	<%--
    function fnInsertArticle() {
        document.searchForm.action = "<c:url value='/com/mngr/info/insertQnaManageView.do'/>";
          document.searchForm.submit();
    }
    --%>
	function fncCheckAll() {
		var checkField = document.listForm.delYn;
		if(document.listForm.checkAll.checked) {
			if(checkField) {
				if(checkField.length > 1) {
					for(var i=0; i < checkField.length; i++) {
						checkField[i].checked = true;
					}
				} else {
					checkField.checked = true;
				}
			}
		} else {
			if(checkField) {
				if(checkField.length > 1) {
					for(var j=0; j < checkField.length; j++) {
						checkField[j].checked = false;
					}
				} else {
					checkField.checked = false;
				}
			}
		}
	}

	function fncManageChecked() {

		var checkField = document.listForm.delYn;
		var checkId = document.listForm.checkId;
		var returnValue = "";
		var returnBoolean = false;
		var checkCount = 0;

		if(checkField) {
			if(checkField.length > 1) {
				for(var i=0; i<checkField.length; i++) {
					if(checkField[i].checked) {
						checkCount++;
						checkField[i].value = checkId[i].value;

						if(returnValue == "")
							returnValue = checkField[i].value;
						else
							returnValue = returnValue + ";" + checkField[i].value;
					}
				}
				if(checkCount > 0)
					returnBoolean = true;
				else {
					alert("선택된 Q&A가 없습니다.");//선택된 부서가 없습니다.
					returnBoolean = false;
				}
			} else {
				if(document.listForm.delYn.checked == false) {
					alert("선택된 Q&A가 없습니다.");//선택된 부서가 없습니다.
					returnBoolean = false;
				}
				else {
					returnValue = checkId.value;
					returnBoolean = true;
				}
			}
		} else {
			alert("<spring:message code="comUssUmt.validate.deptSelectResult" />");//조회된 결과가 없습니다.
		}

		document.listForm.qaIds.value = returnValue;

		return returnBoolean;
	}

	function fncSelDeleteList() {
		if(fncManageChecked()) {
			if(confirm("<spring:message code="common.delete.msg" />")){	//삭제하시겠습니까?
				document.listForm.action = "/com/mngr/info/deleteOpQnaManageList.do";
				document.listForm.submit();
			}
		}
	}

	$(function() {
		document.searchForm.searchWrd.focus();
		<c:if test="${not empty resultMsg}">
			alert("<spring:message code="${resultMsg}" />");
		</c:if>
	});
</script>

<!-- //content -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
