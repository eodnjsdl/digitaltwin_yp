<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<%-- <%pageContext.setAttribute("crlf", "\r\n"); %>
<%pageContext.setAttribute("crlf2", "'"); %> --%>

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
	
	<link rel="stylesheet" href="/css/com/common.css">
	<link rel="stylesheet" href="/css/map.css">
	<link rel="stylesheet" href="/css/map2d.css">
</head>
	
<script type="text/javaScript">
$( function() {	
	$(".popup-bbs .popup-close").click(function(){
		$(".popup-overlay").hide();
	});
	
});

$(".scroll-y", this.selector).mCustomScrollbar({
    scrollbarPosition: "outside",
});

function aj_updateQnaView(){
	
	var qaId = $('#qaId').val();
	var pageIndex = $('#pageNo').val();
	var searchCnd = $('#searchCnd').val();
	var searchWrd = $('#searchWrd').val();
	
	$.ajax({
		type : "POST",
		url : "/com/qna/updateQnaView.do",
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

function aj_deleteQna(){
	
	var qaId = $('#qaId').val();
	
	if(confirm("<spring:message code="common.delete.msg" />")){	
		$.ajax({
			type : "POST",
			url : "/com/qna/deleteQna.do",
			data : {
				qaId : qaId
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
}

//답변 등록
function aj_insertQnaAnswer(){
	
	var answerCn = $('#answerCn').val();
	var pageIndex = $('#pageNo').val();
	var qaId = $('#qaId').val();
	
	$.ajax({
		type : "POST",
		url : "/com/qna/insertQnaAnswer.do",
		data : {
			qaId : qaId,
			answerCn : answerCn,
			pageIndex : pageIndex
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

//답변 수정
function aj_updateQnaAnswerView(){
	
	var qaId = $('#qaId').val();
	var pageIndex = $('#pageNo').val();
	
	$.ajax({
		type : "POST",
		url : "/com/qna/updateQnaAnswerView.do",
		data : {
			qaId : qaId,
			pageIndex : pageIndex
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

//답변 삭제
function aj_deleteQnaAnswer(){
	
	var qaId = $('#qaId').val();
	var pageIndex = $('#pageNo').val();
	
	if(confirm("<spring:message code="common.delete.msg" />")){	
		$.ajax({
			type : "POST",
			url : "/com/qna/deleteQnaAnswer.do",
			data : {
				qaId : qaId,
				pageIndex : pageIndex
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
}

</script>
<!doctype html>				
				
					<input type="hidden" id="qaId" value="${result.qaId}" />
					<input type="hidden" id="pageNo" value="${searchVO.pageIndex}" />
					<input type="hidden" id="searchCnd" value="${searchVO.searchCnd}" />
					<input type="hidden" id="searchWrd" value="${searchVO.searchWrd}" />
					
					<div class="popup-header">Q&A</div>
					<div class="popup-body">
						<div class="bbs-popup-body">
							<div class="scroll-y" style="height: 520px;">
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
													<div class="cont">
														<div class="scroll-y">
															<c:out value="${fn:replace(result.qestnCn , LF , BR)}" escapeXml="false" />
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
								
								<div class="comments-panel "><!-- 댓글 없으면 noComments 추가 / 댓글 있으면 noComments 삭제 -->
									<c:if test="${result.qnaProcessSttusCode eq '3'}">
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
														<c:if test="${sessionScope.loginVO.uniqId eq result.lastUpdusrId}"> 
														<div>
															<button type="button" class="comments-btn edit" title="수정" onclick="aj_updateQnaAnswerView('<c:out value="${result.qaId}"/>');"></button>
															<button type="button" class="comments-btn delete" title="삭제" onclick="aj_deleteQnaAnswer('<c:out value="${result.qaId}"/>');" ></button>
														</div>
														</c:if>
													</div>
													<div class="comments">
														<c:out value="${fn:replace(result.answerCn, LF, BR)}" escapeXml="false" />
													</div>
												</li>
											</ul>
										</div>
									</c:if>
									
									
									<c:if test="${(result.qnaProcessSttusCode ne '3') and (sessionScope.userAuthorities eq '[ROLE_ADMIN]' or sessionScope.userAuthorities eq '[ROLE_LX_YP]')}">	
									<div class="comments-footer">
											<div class="comments-group">
												<div>답글작성</div>
												<div><textarea name="answerCn" id="answerCn" class="form-control"></textarea></div>
											</div>
											<div class="btn-wrap justify-content-end marT5">
												<div><button type="button" class="btn basic bi-comments" onclick="aj_insertQnaAnswer();">답글등록</button></div>								
											</div>
									</div>
									</c:if>
								</div>
							</div>
	
							<div class="position-bottom btn-wrap">
								<div>
									<button type="button" class="btn basic bi-write2" onclick="aj_selectQnaList('<c:out value="${searchVO.pageIndex}"/>', '<c:out value="${searchVO.searchCnd}"/>', '<c:out value="${searchVO.searchWrd}"/>');">목록</button>
								</div>
								<c:if test="${(result.qnaProcessSttusCode ne '3') and ((sessionScope.loginVO.uniqId eq result.frstRegisterId) or (sessionScope.userAuthorities eq '[ROLE_ADMIN]' or sessionScope.userAuthorities eq '[ROLE_LX_YP]'))}">
								<div class="position-absolute right">
									<button type="button" class="btn basic bi-edit" onclick="aj_updateQnaView();">수정</button>
									<button type="button" class="btn basic bi-delete" onclick="aj_deleteQna();">삭제</button>
								</div>
								</c:if>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
