<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/fms/EgovMultiFiles.js'/>" ></script>


<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title><spring:message code="site.title" /></title>

	<script src="/js/com/jquery/jquery-3.4.1.min.js"></script>


	<!-- mCustomScrollbar -->
	<script src="/js/plugin/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
	<link rel="stylesheet" href="/js/plugin/mCustomScrollbar/jquery.mCustomScrollbar.css">

	<!-- rangeslider -->
	<script src="/js/plugin/rangeslider/rangeslider.js"></script>
	<link rel="stylesheet" href="/js/plugin/rangeslider/rangeslider.css">
	
	<!-- colorPicker -->
	<script src="/js/plugin/colorPicker/jquery.minicolors.min.js"></script>
	<link rel="stylesheet" href="/js/plugin/colorPicker/jquery.minicolors.css">
	
	<link rel="stylesheet" href="/css/com/common.css">
	<link rel="stylesheet" href="/css/map.css">
	<link rel="stylesheet" href="/css/map2d.css">
</head>


<script type="text/javascript">

$( function() {	
	
	var maxFileNum = 3;
	var multi_selector = new MultiSelector( document.getElementById( 'egovComFileList' ), maxFileNum );
	multi_selector.addElement( document.getElementById( 'egovComFileUploader' ) );
	
	$(".popup-bbs .popup-close").click(function(){
		$(".popup-overlay").hide();
	});
	$(".scroll-y", this.selector).mCustomScrollbar({
	    scrollbarPosition: "outside",
	});
});

function aj_updateQna(){
	var form = $("form[name=qnaVO]")[0];
	var imageForm = $('#egovComFileUploader')[0];
	var formData = new FormData(form);
	formData.append('multiRequest', imageForm.files[0]);

	$.ajax({
		type : "POST",
		url : "/com/qna/updateQna.do",
		data : formData,
		dataType : "html",
		async: false,
		processData: false,
		contentType: false,
		cache: false,
		enctype: 'multipart/form-data',
		success : function(returnData, status){
			if(status == "success") {
				$("#bbsPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
		}
	});
}

function fnUpdateForm(form) {
	if($("#qestnSj").val() == ""){
		alert("제목을 입력하세요.");
		return false;
	} else if($("#qestnCn").val() == "") {
		alert("내용을 입력하세요.");
		return false;
	} else {
		if (confirm("수정하시겠습니까?")) {
			aj_updateQna();
		}
	}
}

function aj_selectQna(qaId, pageIndex, searchCnd, searchWrd){
	$.ajax({
		type : "POST",
		url : "/com/qna/selectQna.do",
		data : {
			qaId : qaId,
			pageIndex : pageIndex,
			searchCnd : searchCnd,
			searchWrd : searchWrd
		},
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#bbsPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
		}
	});
}



</script>

					<form:form commandName="qnaVO" name="qnaVO" method="post" enctype="multipart/form-data">
					<input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}'/>" />
					<input type="hidden" name="searchCnd" value="<c:out value='${searchVO.searchCnd}'/>" />
					<input type="hidden" name="searchWrd" value="<c:out value='${searchVO.searchWrd}'/>" />
					
					<input type="hidden" name="areaNo" value="<c:out value='${qnaVO.areaNo}'/>" />
					<input type="hidden" name="middleTelno" value="<c:out value='${qnaVO.middleTelno}'/>" />
					<input type="hidden" name="endTelno" value="<c:out value='${qnaVO.endTelno}'/>" />
					<input type="hidden" name="emailAdres" value="<c:out value='${qnaVO.emailAdres}'/>" />
					<input type="hidden" name="frstRegisterId" value="<c:out value='${qnaVO.frstRegisterId}'/>" />
					<input type="hidden" name="emailAnswerAt" value="<c:out value='${qnaVO.emailAnswerAt}'/>" />
					<input type="hidden" name="qaId" value="<c:out value='${qnaVO.qaId}'/>">
					<input type="hidden" name="wrterNm" value="<c:out value='${qnaVO.wrterNm}'/>" />
					
					
					<div class="popup-header" style="background-image: url(/images/etc/popup-title-board.svg)">Q&A</div>
					<div class="popup-body">
						<div class="bbs-popup-body">
							<div class="scroll-y" style="height: 520px;">
								<h3 class="cont-tit marT0">Q&A 수정하기</h3>
								<div class="bbs-write-default">
									<table class="bbs-write">
										<colgroup>
											<col style="width: 8%;">
											<col style="width: auto;">
										</colgroup>
										<tbody>
											<tr>
												<th scope="row">제목</th>
												<td>
													<div class="form-row">
														<div class="col-6"><form:input path="qestnSj" id="qestnSj" cssClass="form-control" size="70" maxlength="70" /></div>
													</div>
												</td>
											</tr>
											<tr>
												<th scope="row">내용</th>
												<td>
													<div class="cont">
														<form:textarea path="qestnCn" id="qestnCn" cssClass="form-control" cols="300" rows="20"/>
													</div>
												</td>
											</tr>
											<!-- 첨부파일 시작 -->
											<c:set var="title"><spring:message code="comCopBbs.articleVO.updt.atchFile"/></c:set>
											<tr>
												<th>${title}</th>
												<td>
													<c:import url="/cmm/fms/selectFileInfsForUpdate.do" charEncoding="utf-8">
														<c:param name="param_atchFileId" value="${qnaVO.atchFileId}" />
													</c:import>
												</td>
											</tr>
											<!-- 첨부파일 끝 -->
											<!-- 첨부파일 추가 -->
											<tr>
												<th scope="row">첨부파일</th>
												<td>
												<!-- attached file Start -->
													<div class="form-file w-50p">
														<label>파일찾기<input type="file" name="file_1" class="file-input" id="egovComFileUploader" multiple></label>
														<div class="file-box">
															<span class="upload-name"></span>
														</div>
														
														<div id="egovComFileList"></div>
													</div>
												<!-- attached file End -->
												</td>
											</tr>
											<!-- 첨부파일 추가 끝 -->
										</tbody>
									</table>
								</div>
							</div>
							<div class="position-bottom btn-wrap">
							
								<div>
									<button type="button" class="btn basic bi-write2" onclick="fnUpdateForm(this.form)">수정</button>
									<button type="button" class="btn basic bi-cancel" onclick="aj_selectQna('<c:out value="${qnaVO.qaId}"/>','<c:out value="${searchVO.pageIndex}"/>', '<c:out value="${searchVO.searchCnd}"/>', '<c:out value="${searchVO.searchWrd}"/>')">취소</button>
								</div>
							</div>
						
						</div>
					</div>
					</form:form>
					<button type="button" class="popup-close" title="닫기"></button>
