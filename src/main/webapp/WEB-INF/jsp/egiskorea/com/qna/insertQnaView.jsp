<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/fms/EgovMultiFiles.js'/>" ></script>
	
	
<script type="text/javascript">

$( function() {
	
	var maxFileNum = 3;
	var multi_selector = new MultiSelector( document.getElementById( 'egovComFileList' ), maxFileNum );
	multi_selector.addElement( document.getElementById( 'egovComFileUploader' ) );
	
	$(".map-board .bbs-btn").click(function(){
		$(this).addClass("active");
		$(".popup-overlay").show();
	});

	$(".popup-bbs .popup-close").click(function(){
		$(".map-board .bbs-btn").removeClass("active");
		$(".popup-overlay").hide();
	});
});

function aj_insertQna(){
	var form = $("form[name=qnaVO]")[0];
	var formData = new FormData(form);
	formData.append('multiRequest', $('#egovComFileUploader')[0].files[0])
	$.ajax({
		type : "POST",
		url : "/com/qna/insertQna.do",
		data : formData,
		dataType : "html",
		async: false,
		processData: false,
		contentType: false,
		enctype: 'multipart/form-data',
		success : function(returnData, status){
			if(status == "success") {
				$("#qna").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
		}
	});
}


function fnInsertForm(form) {
	if($("#qestnSj").val() == ""){
		alert("제목을 입력하세요.");
		return false;
	} else if($("#qestnCn").val() == "") {
		alert("내용을 입력하세요.");
		return false;
	} else {
		if (confirm("등록하시겠습니까?")) {
			aj_insertQna();
		}
	}
}

</script>

					<form:form commandName="qnaVO" name="qnaVO" method="post" enctype="multipart/form-data">
					<input type="hidden" name="areaNo" value="<c:out value='${qnaVO.areaNo}'/>" />
					<input type="hidden" name="middleTelno" value="<c:out value='${qnaVO.middleTelno}'/>" />
					<input type="hidden" name="endTelno" value="<c:out value='${qnaVO.endTelno}'/>" />
					<input type="hidden" name="emailAdres" value="<c:out value='${qnaVO.emailAdres}'/>" />
					<input type="hidden" name="frstRegisterId" value="<c:out value='${qnaVO.frstRegisterId}'/>" />
					<input type="hidden" name="emailAnswerAt" value="<c:out value='${qnaVO.emailAnswerAt}'/>" />
					<input type="hidden"  name="qaId" value="<c:out value='${qnaVO.qaId}'/>">
					<input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}'/>" />
					<input type="hidden" name="wrterNm" value="<c:out value='${qnaVO.wrterNm}'/>" />
					
					<div class="popup-header">Q&A</div>
					<div class="popup-body">
						<div class="bbs-popup-body">
							<h3 class="cont-tit marT0">Q&A 등록하기</h3>
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
													<form:textarea path="qestnCn" id="qestnCn" cssClass="form-control" cols="300" rows="20" style="height: 467px;" />
												</div>
											</td>
										</tr>
										<!-- 첨부파일  -->
										
										<tr>
											<th scope="row">첨부파일</th>
											<td>
											<!-- attached file Start -->
												<div class="form-file w-50p">
													<label>파일찾기<input type="file" name="file_1" class="file-input" id="egovComFileUploader"></label>
													<span class="upload-name"></span>
													
													<div id="egovComFileList"></div>
												</div>
											<!-- attached file End -->
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div class="position-bottom btn-wrap">
								<div>
									<button type="button" class="btn basic bi-write2" onclick="fnInsertForm(this.form)">등록</button>
									<button type="button" class="btn basic bi-cancel" onclick="aj_selectQnaList('<c:out value="${searchVO.pageIndex}"/>', '<c:out value="${searchVO.searchCnd}"/>', '<c:out value="${searchVO.searchWrd}"/>')">취소</button>
								</div>
							</div>
						</div>
					</div>
					</form:form>
					<button type="button" class="popup-close" title="닫기"></button>
					
					