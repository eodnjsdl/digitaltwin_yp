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

<script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/fms/EgovMultiFiles.js'/>" ></script>
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<validator:javascript formName="articleVO" staticJavascript="false" xhtml="true" cdata="false"/>

<script type="text/javaScript">

$(document).ready(function(){
	/* document.getElementById("nttSj").focus(); */
	
	var maxFileNum = document.getElementById('atchPosblFileNumber').value;
	var multi_selector = new MultiSelector( document.getElementById( 'egovComFileList' ), maxFileNum );
	
	if(maxFileNum==null || maxFileNum==""){
		maxFileNum = 3;
	}
	
	multi_selector.addElement( document.getElementById( 'egovComFileUploader' ) );
	
	$("#ntceBgnde").datepicker( "option", "maxDate", "" );
	$("#ntceEndde").datepicker( "option", "maxDate", "" );
}); 

function fnUpdtArticle(form){
	if (!validateArticleVO(form)) {
		return false;
	} else {
		
		var validateForm = document.getElementById("articleVO");
		
		//비밀글은 제목 진하게 할 수 없음.
		//비밀글은 공지게시 불가.
		if(validateForm.secretAt.value == 'Y') {
			if(validateForm.noticeAt.value == 'Y') {
				alert("<spring:message code="comCopBbs.articleVO.secretNotice" />");
				return;
			}
		}
		
		//게시기간 
		var ntceBgnde = validateForm.ntceBgnde.value;
		var ntceEndde = validateForm.ntceEndde.value;
		var nowDate = validateForm.date.value;

		if(ntceBgnde == '' && ntceEndde != '') {
			validateForm.ntceBgnde.value = validateForm.ntceEndde.value;
		}
		if(ntceBgnde != '' && ntceEndde == '') {
			validateForm.ntceEndde.value = validateForm.ntceBgnde.value;
		}
		if(ntceBgnde == '' && ntceEndde == '') {
			validateForm.ntceBgnde.value = nowDate;
			validateForm.ntceEndde.value = nowDate;
		}

		if (ntceBgnde > ntceEndde && ntceEndde != '') {
			alert("<spring:message code="comCopBbs.articleVO.ntceDeError" />");
			return;
		}
		
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
							<h3 class="page-tit">공지사항 관리</h3>
							<p class="page-txt">공지사항 관리 페이지입니다.</p>
						</div>
					</div>
					
					<form:form commandName="articleVO" method="post" action="/com/mngr/info/updateArticleManage.do" enctype="multipart/form-data">
						<form:hidden path="nttId" />
						<form:hidden path="searchCnd" value="${searchVO.searchCnd}"/>
						<form:hidden path="searchWrd" value="${searchVO.searchWrd}"/>	
						<form:hidden path="pageIndex" value="${searchVO.pageIndex}"/>
						
						<input type="hidden" name="bbsTyCode" value="<c:out value='${boardMasterVO.bbsTyCode}'/>" />
						<input type="hidden" name="replyPosblAt" value="<c:out value='${boardMasterVO.replyPosblAt}'/>" />
						<input type="hidden" name="fileAtchPosblAt" value="<c:out value='${boardMasterVO.fileAtchPosblAt}'/>" />
						<input type="hidden" id="atchPosblFileNumber" name="atchPosblFileNumber" value="<c:out value='${boardMasterVO.atchPosblFileNumber}'/>" />
						<input type="hidden" name="atchPosblFileSize" value="<c:out value='${boardMasterVO.atchPosblFileSize}'/>" />
						<input type="hidden" name="tmplatId" value="<c:out value='${boardMasterVO.tmplatId}'/>" />
						<input type="hidden" name="bbsId" value="${boardMasterVO.bbsId}">
						<input type="hidden" name="date" value="<c:out value='${date}'/>" />
						
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
												<th scope="row"><label for="nttSj">제목 <span class="essential">*</span></label></th>
												<td colspan="3">
												    <form:input path="nttSj" maxlength="200" cssClass="form-control w-60p"/>
									   				<div><form:errors path="nttSj" cssClass="essential" /></div>     
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="secretAt">공개 여부</label></th>
												<td>
													<span class="form-radio group">
														<span>
															<form:radiobutton path="secretAt" value="N" label="공개"/>
														</span>
														<span>
															<form:radiobutton path="secretAt" value="Y" label="미공개"/>
														</span>
													</span> 
												</td>
												<th scope="row"><label for="frstRegisterPnttm">작성일 </label></th>
												<td>
													<c:out value="${articleVO.frstRegisterPnttm}"/>
												</td> 
											</tr>
											<tr>
												<th scope="row"><label for="noticeAt">팝업공개여부</label></th>
												<td>
												    <span class="form-radio group">
														<span>
															<form:radiobutton path="noticeAt" value="Y" label="공개"/>
														</span>
														<span>
															<form:radiobutton path="noticeAt" value="N" label="미공개"/>
														</span>
													</span> 
												</td>
												<th scope="row"><label for="ntceBgnde">게시일</label></th>
												<td class="align-left">
													<div class="datapicker-group">
														<form:input path="ntceBgnde" autocomplete="off" cssClass="datepickerFrom"/>
														<span class="form-dash">~</span>
														<form:input path="ntceEndde" autocomplete="off" cssClass="datepickerTo"/>
													</div>
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="frstRegisterId">작성자 </label></th>
												<td>
													<c:out value="${articleVO.ntcrNm}"/>	
												</td>
												<th scope="row"><label for="inqireCo">조회수 </label></th>
												<td>
													<c:out value="${articleVO.inqireCo}"/>	
												</td>
											</tr>
											<tr>
												<th scope="row"><label for="nttCn">공지 내용 <span class="essential">*</span></label></th>
												<td colspan="3">
													<form:textarea path="nttCn" cssClass="form-control w-90p" />
													<div><form:errors path="nttCn" cssClass="error" /></div>
												</td>
											</tr>
											<c:if test="${boardMasterVO.fileAtchPosblAt == 'Y'}">
												<tr>
													<th scope="row"><label for="file_1">첨부파일 추가</label> </th>
													<td colspan="3">
														<input name="file_1" id="egovComFileUploader" type="file" multiple/>
													</td>
												</tr>
												<tr>
													<th scope="row">첨부파일</th>
													<td colspan="3">
														<c:import url="/cmm/fms/selectFileInfsForUpdate.do" charEncoding="utf-8">
															<c:param name="param_atchFileId" value="${articleVO.atchFileId}" />
														</c:import>
													</td>
												</tr>
											</c:if>
										</tbody>
									</table>
								</div>
								
								<!-- 하단 버튼  -->
								<div class="btn-wrap justify-content-between">
									<div></div>
									<div>
										<button type="button" class="btn type02" onclick="fnUpdtArticle(this.form);"><spring:message code="button.update" /></button>
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