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
<validator:javascript formName="roleManage" staticJavascript="false" xhtml="true" cdata="false"/>
<script type="text/javaScript" language="javascript">

function fncRoleInsert(form) {

    if(confirm("<spring:message code="common.regist.msg" />")){ //등록하시겠습니까?
        if(!validateRoleManage(form)){
            return false;
        }else{
        	form.submit();
        }
    }
}

function fnGoList(pageIndex){
	document.goListForm.pageIndex.value = pageIndex;
	document.goListForm.action = "<c:url value='/com/mngr/auth/selectRoleManageList.do' />";
	document.goListForm.submit();
}

</script>

				<!-- content -->
				<section id="content">
					<form:form commandName="roleManage" method="post" action="/com/mngr/auth/insertRoleManage.do">
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">기능정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">기능정보를 등록하는 페이지입니다.</p>
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
										<!-- 롤 명 -->
										<tr>
											<th scope="row"><spring:message code="comCopSecRam.regist.rollNm" /> <span class="essential">*</span></th>
											<td>
												<form:input path="roleNm" size="40" maxlength="50" cssClass="form-control" />
												<div><form:errors path="roleNm" cssClass="error" /></div>
											</td>
										</tr>
										<!-- 롤 패턴 -->
										<tr>
											<th><spring:message code="comCopSecRam.regist.rollPtn" /> <span class="essential">*</span></th>
											<td class="left">
												<form:input path="rolePtn" size="40" maxlength="200" cssClass="form-control" />
												<div><form:errors path="rolePtn" cssClass="error" /></div> 
											</td>
										</tr>
										<!-- 롤 설명 -->
										<tr>
											<th scope="row"><spring:message code="comCopSecRam.regist.rollDc" /> <span class="essential">*</span></th>
											<td>
											    <form:textarea path="roleDc" cols="300" rows="10" cssClass="form-control"/>   
												<div><form:errors path="roleDc" cssClass="error" /></div> 
											</td>
										</tr>
										<!-- 롤 패턴 -->
										<tr>
											<th scope="row"><spring:message code="comCopSecRam.regist.rollType" /> <span class="essential">*</span></th>
											<td>
												<form:select path="roleTyp">
													<form:options items="${cmmCodeDetailList}" itemValue="code" itemLabel="codeNm"/>
												</form:select>
												<div><form:errors path="roleTyp" cssClass="error" /></div> 
											</td>
										</tr>
										<!-- 롤 Sort -->
										<c:set var="title"><spring:message code="comCopSecRam.regist.rollSort" /></c:set>
										<tr>
											<th><spring:message code="comCopSecRam.regist.rollSort" /> <span class="essential">*</span></th>
											<td>
												<form:input path="roleSort" size="40" maxlength="10" cssClass="form-control" />
												<div><form:errors path="roleSort" cssClass="error" /></div> 
											</td>
										</tr>
									</tbody>
								</table>
							</div>


							<div class="btn-wrap justify-content-between">
								<button type="button" class="btn basic" onclick="fnGoList(<c:out value='${roleManage.pageIndex}'/>);"><spring:message code="button.list" /></button>
								<button type="button" class="btn type01" onclick="fncRoleInsert(this.form);"><spring:message code="button.create" /></button>
							</div>

						</div>
					</div>
					</form:form>
					
					<form:form name="goListForm" method="post">
					<input type="hidden" name="searchCondition" value="<c:out value='${roleManage.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${roleManage.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${roleManage.pageIndex}'/>"/>
					</form:form>
					
				</section>
				<!-- //content -->
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->
