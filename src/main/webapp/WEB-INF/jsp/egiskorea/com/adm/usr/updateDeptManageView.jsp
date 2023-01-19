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
<validator:javascript formName="deptManage" staticJavascript="false" xhtml="true" cdata="false"/>


<script type="text/javaScript">
function fncDeptUpdate(form) {
	if(confirm("<spring:message code="common.save.msg" />")){ //저장하시겠습니까?
        if(!validateDeptManage(form)){
            return false;
        }else{
        	form.submit();
        }
    }
}

</script>
				
				<!-- content -->
				<section id="content">
					<form:form commandName="deptManage" method="post" action="/com/mngr/usr/updateDeptManage.do">
					<input type="hidden" name="groupId" value="<c:out value='${deptManage.groupId}'/>"/>
					<input type="hidden" name="orgnztId" value="<c:out value='${deptManage.orgnztId}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${deptManageVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${deptManageVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${deptManageVO.pageIndex}'/>"/>
					
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">조직정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">조직정보를 수정하는 페이지입니다.</p>
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
										<!-- 그룹아이디 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.userManageRegist.groupNm"/></th>
 											<td><c:out value='${deptManage.groupNm}'/></td>
										</tr>
										<!-- 조직 아이디 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptManageRegist.deptId" /></th>
											<td><c:out value='${deptManage.orgnztId}'/></td>
										</tr>
										<!-- 조직 명 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptManageRegist.deptName" /> <span class="essential">*</span></th>
											<td><form:input path="orgnztNm" type="text" cssClass="form-control" /></td>
										</tr>
										<!-- 조직 설명 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptManageRegist.deptDc" /> <span class="essential">*</span></th>
											<td><form:textarea path="orgnztDc" cssClass="form-control" /></td>
										</tr>										
									</tbody>
								</table>
							</div>
							
							<!-- 하단 버튼  -->
							<div class="btn-wrap justify-content-between">
								<div></div>
								<div>
									<button type="button" class="btn type02" onclick="fncDeptUpdate(this.form);"><spring:message code="button.update" /></button>
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