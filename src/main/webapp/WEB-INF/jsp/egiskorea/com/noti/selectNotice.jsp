<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>

<% pageContext.setAttribute("LF", "\n"); %>
<% pageContext.setAttribute("BR", "<br/>"); %>

<!doctype html>

				<div class="popup-header">공지사항</div>
					<div class="popup-body">
						<div class="bbs-popup-body">
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
											<td><c:out value="${result.nttSj}" escapeXml="false"/></td>
											<th scope="row">등록일</th>
											<td><c:out value="${result.frstRegisterPnttm}"/></td>
										</tr>
										<tr>
											<th scope="row">작성자</th>
											<td><c:out value="${result.ntcrNm}"/></td>
											<th scope="row">조회수</th>
											<td><c:out value="${result.inqireCo}"/></td>
										</tr>
										<tr>
											<th scope="row">내용</th>
											<td colspan="3">
												<div class="cont" style="height: 496px;">
													<div class="scroll-y">
														<c:out value="${fn:replace(result.nttCn , LF , BR)}" escapeXml="false" />
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">첨부파일</th>
											<td colspan="3">
												<a href="javascript:void(0);" class="attach-file">
													<c:import url="/cmm/fms/selectFileInfs.do" charEncoding="utf-8">
														<c:param name="param_atchFileId" value="${result.atchFileId}" />
													</c:import>
												</a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="position-bottom btn-wrap">
								<div>
									<button type="button" class="btn basic bi-list" onclick="aj_selectNoticeList('<c:out value='${result.pageIndex}'/>', '<c:out value='${result.searchCnd}'/>', '<c:out value='${result.searchWrd}'/>');">목록</button>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<script>
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
					</script>