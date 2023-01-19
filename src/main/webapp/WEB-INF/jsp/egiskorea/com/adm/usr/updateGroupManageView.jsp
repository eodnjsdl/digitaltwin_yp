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
<validator:javascript formName="groupManage" staticJavascript="false" xhtml="true" cdata="false"/>


<script type="text/javaScript">
function fncGroupUpdate(form) {
	if(confirm("<spring:message code="common.save.msg" />")){ //저장하시겠습니까?
        if(!validateGroupManage(form)){
            return false;
        }else{
        	form.submit();
        }
    }
}

function fnCancel(groupId) {
	document.goCancelForm.groupId.value = groupId;
  	document.goCancelForm.action = "<c:url value='/com/mngr/usr/selectGroupManage.do'/>";
  	document.goCancelForm.submit();
}
</script>
				
				<!-- content -->
				<section id="content">
					<form:form commandName="groupManage" method="post" action="/com/mngr/usr/updateGroupManage.do">
					<input type="hidden" name="groupId" value="<c:out value='${groupManage.groupId}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${groupManageVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${groupManageVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${groupManageVO.pageIndex}'/>"/>
					
					
					
					
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">그룹정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">그룹정보를 수정하는 페이지입니다.</p>
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
										<tr>
											<!-- 그룹 아이디 -->
											<th scope="row"><spring:message code="comCopSecGmt.list.groupId" /></th>
											<td><c:out value='${groupManage.groupId}'/></td>
										</tr>
										<tr>
											<!-- 그룹 명 -->
											<th scope="row"><spring:message code="comCopSecGmt.list.groupNm" /> <span class="essential">*</span></th>
											<td><form:input path="groupNm" type="text" cssClass="form-control" /></td>
										</tr>
										<tr>
											<!-- 그룹 설명 -->
											<th scope="row"><spring:message code="comCopSecGmt.list.groupDc" /></th>
											<td><form:textarea path="groupDc" cssClass="form-control" /></td>
										</tr>										
									</tbody>
								</table>
							</div>
							
							<!-- 하단 버튼  -->
							<div class="btn-wrap justify-content-between">
								<div></div>
								<div>
									<button type="button" class="btn type02" onclick="fncGroupUpdate(this.form);"><spring:message code="button.update" /></button>
									<button type="button" class="btn type07" onclick="fnCancel('<c:out value='${groupManage.groupId}'/>')"><spring:message code="button.reset" /></button>
								</div>
							</div>
						</div>
					</div>
					</form:form>
					
					<form:form name="goCancelForm" method="post">
					<input type="hidden" name="groupId" value="<c:out value='${groupManage.groupId}'/>"/>
					<input type="hidden" name="groupNm" value="<c:out value='${groupManage.groupNm}'/>"/>
					<input type="hidden" name="groupDc" value="<c:out value='${groupManage.groupDc}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${groupManageVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${groupManageVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${groupManageVO.pageIndex}'/>"/>
					</form:form>
				</section>
				<!-- //content -->
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->