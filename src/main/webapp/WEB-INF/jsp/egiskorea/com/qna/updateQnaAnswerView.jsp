<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<%pageContext.setAttribute("crlf", "\r\n"); %>
<%pageContext.setAttribute("crlf2", "'"); %>

<% pageContext.setAttribute("LF", "\n"); %>
<% pageContext.setAttribute("BR", "<br/>"); %>



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
	
	<script src="/js/map-ui.js"></script>
	
	<link rel="stylesheet" href="/css/com/common.css">
	<link rel="stylesheet" href="/css/map.css">
	<link rel="stylesheet" href="/css/map2d.css">
</head>
	
<script type="text/javaScript">
$( function() {	
	$(".map-board .bbs-btn").click(function(){
		$(this).addClass("active");
		$(".popup-overlay").show();
	});

	$(".popup-bbs .popup-close").click(function(){
		$(".map-board .bbs-btn").removeClass("active");
		$(".popup-overlay").hide();
	});
});

//답변 수정
function aj_updateQnaAnswer(){
	
	var qaId = $('#qaId').val();
	var pageIndex = $('#pageNo').val();
	var answerCn = $('#answerCn').val();
	
	if (confirm("수정하시겠습니까?")) {
		$.ajax({
			type : "POST",
			url : "/com/qna/updateQnaAnswer.do",
			data : {
				qaId : qaId,
				pageIndex : pageIndex,
				answerCn : answerCn
			},
			dataType : "html",
			async: false,
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
}

//취소
function aj_selectQna(){
	
	var qaId = $('#qaId').val();
	var pageIndex = $('#pageNo').val();
	
	$.ajax({
		type : "POST",
		url : "/com/qna/selectQna.do",
		data : {
			qaId : qaId,
			pageIndex : pageIndex
		},
		dataType : "html",
		async: false,
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

</script>
<!doctype html>				
				
					<div class="popup-header">Q&A</div>
					<div class="popup-body">
						<div class="bbs-popup-body">
							<div class="scroll-y" style="height: 654px;">
								<div class="bbs-detail-default">
									<table class="bbs-detail">
										<colgroup>
											<col style="width: 8%;">
											<col style="width: auto;">
											<col style="width: 8%;">
											<col style="width: 11%;">
										</colgroup>
										<tbody>
											<tr>
												<th scope="row">제목</th>
												<td><c:out value="${result.qestnSj}" escapeXml="false"/></td>
												<th scope="row">등록일</th>
												<td><c:out value="${result.frstRegisterPnttm}" /></td>
											</tr>
											<tr>
												<th scope="row">작성자</th>
												<td><c:out value="${result.wrterNm}"/></td>
												<th scope="row">조회수</th>
												<td><c:out value='${result.inqireCo}'/></td>
											</tr>
											<tr>
												<th scope="row">내용</th>
												<td colspan="3">
													<div class="cont" style="height: 349px;">
														<div class="scroll-y">
															<c:out value="${fn:replace(result.qestnCn , crlf , '<br/>')}" escapeXml="false" />
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<th scope="row">첨부파일</th>
												<td colspan="3">
													<c:import url="/cmm/fms/selectFileInfs.do" charEncoding="utf-8">
														<c:param name="param_atchFileId" value="${result.atchFileId}" />
													</c:import>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								
								<input type="hidden" id="qaId" value="${result.qaId}" />
								<input type="hidden" id="pageNo" value="${searchVO.pageIndex}" />
								
								<div class="comments-panel "><!-- 댓글 없으면 noComments 추가 / 댓글 있으면 noComments 삭제 -->
									<div class="comments-header">
									</div>
									
									<div class="comments-body">
										<ul class="comments-list">
											<li>
												<div class="user-box">
													<div>
														<span class="user"><c:out value="${result.emplyrNm}"/></span>
														<span class="date"><c:out value="${result.answerDe}"/> 작성</span>
													</div>
												</div>
												<div class="comments">
													<div><textarea name="answerCn" id="answerCn" class="form-control"><c:out value="${fn:replace(result.answerCn, BR, LF)}" escapeXml="false" /></textarea></div>
												</div>
											</li>
										</ul>
									</div>
									
								</div>
							</div>
	
							<div class="position-bottom btn-wrap">
								<div>
									<button type="button" class="btn basic bi-write2" onclick="aj_updateQnaAnswer()">수정</button>
									<button type="button" class="btn basic bi-cancel" onclick="aj_selectQna()">취소</button>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
