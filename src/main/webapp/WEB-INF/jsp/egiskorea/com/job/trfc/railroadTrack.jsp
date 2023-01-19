<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!-- <script src="/js/egiskorea/com/job/trfc/trfc.js"></script> -->
<script>
</script>
				<!-- 업무 > 시설관리 > 교통시설 > 철도선로 상세보기 -->
<!-- 				<div id="selectRailroadTrack" class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 459px;"> -->
					<div class="popup-header">상세보기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="data-write-wrap" style="height: 142px;">
								<div class="scroll-y">
									<div class="data-default">
										<table class="data-detail">
											<colgroup>
												<col style="width: 23%;">
												<col style="width: auto;">
												<col style="width: 23%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">시군구</th>
													<td>${result.sigCd}</td>
													<th scope="row">일련번호</th>
													<td>${result.rlrRlwSn}</td>
												</tr>
												<tr>
													<th scope="row">철도선로명</th>
													<td>${result.korRlrNm}</td>
													<th scope="row">작업일시</th>
													<fmt:parseDate value="${result.opertDe}" var="dateValue" pattern="yyyyMMddHHmmss"/>
													<td><fmt:formatDate value="${dateValue}" pattern="yyyy.MM.dd HH:mm:ss"/></td>
												</tr>												
											</tbody>
										</table>
									</div>
								</div><!-- // scroll-y -->
								<div class="position-bottom btn-wrap">
									<div>
<!-- 										<button type="button" class="btn basic bi-edit" id="railroadTrackUpdate">수정</button>  -->
										<button type="button" class="btn basic bi-cancel">취소</button>
									</div>
								</div><!-- // class="position-bottom btn-wrap" -->
							</div><!--  -->
						</div><!-- // sub-popup-body -->
					</div><!-- // class="popup-body" -->
					<button type="button" class="popup-close" title="닫기" onClick="cancelMode();"></button>				
<!-- 				</div> -->
				<!-- //업무 > 시설관리 > 교통시설 > 철도선로 상세보기 -->