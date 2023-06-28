<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script src="/js/egiskorea/com/job/appt/appt.js"></script>
<script src="/js/plugin/datepicker/jquery.datetimepicker.full.min.js"></script>
<link rel="stylesheet" href="/js/plugin/datepicker/jquery.datetimepicker.css">
<style>
#apptDatepicker{
	background : url(../images/icon/form-calendar.svg) no-repeat 95% 50%;
}
</style>
				<!-- 업무 > 공간정보활용 > 대기오염 -->
				<div class="popup-header">대기오염</div>
				<div class="popup-body">
					<div class="left-popup-body">						
						<div class="srch-box">
							<form action="">
								<div class="srch-default">
									<table class="srch-tbl">
										<colgroup>
											<col style="width: 15%;">
											<col style="width: auto;">
										</colgroup>
										<tbody>
											<tr>
												<th scope="row">기준일시</th>
												<td style="text-align:center"><span id="standardDateTime"></span>
													<!-- <div class="form-row">
														<div class="col">
															<div class="datapicker-group">
																<input type="text" id="apptDatepicker" name="apptDatepicker" class="form-calendar datepicker hasDatepicker" autocomplete="off" style="border-radius: 5px;">
															</div>
														</div>
														<div class="col">
															<select name="apptHour" id="apptHour" class="form-select"></select>
														</div>
														<div class="col-auto"><button type="button" class="btn type01 apptbtn search">조회</button></div>
													</div> -->
												</td>
											</tr>												
										</tbody>
									</table>
								</div>
							</form>
						</div>
						<div class="bbs-top">
							<div class="bbs-list-num">조회결과 : <strong>2</strong>건</div>
						</div>
						<div class="bbs-list-wrap" style="height: 624px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
							<div class="bbs-default">
								<div class="bbs-list-head">
									<table class="bbs-list">
										<colgroup>
											<col style="width: 20%;">
											<col style="width: 20%;">
											<col style="width: 20%;">
											<col style="width: auto;">
											<col style="width: 50px;">
										</colgroup>
										<thead>
											<tr>
												<th scope="col">관측소명</th>
												<th scope="col">미세먼지</th>
												<th scope="col">초미세먼지</th>
												<th scope="col">통합대기환경지수</th>
												<th scope="col"></th>
											</tr>
										</thead>
									</table>
								</div>
								<div class="scroll-y">
									<table class="bbs-list appt-table">
										<colgroup>
											<col style="width: 20%;">
											<col style="width: 20%;">
											<col style="width: 20%;">
											<col style="width: auto;">
											<col style="width: 50px;">
										</colgroup>
										<tbody>
<%--											<tr>--%>
<%--												<td>양평읍</td>--%>
<%--												<td>11㎍/㎥</td>--%>
<%--												<td>7㎍/㎥</td>--%>
<%--												<td>50</td>--%>
<%--												<td><button type="button" class="icon-btn stats dataPopup leftSubPopup" id="atmospherePollution" data-popup="atmospherePollution" title="대기관측소"></button></td>--%>
<%--											</tr>--%>
										</tbody>
									</table>
								</div>
							</div>
							<div>
								<p><strong>※양평군에는 총 2곳의 대기오염 측정소가 있습니다.</strong></p>
								<span>참고사이트: 한국환경공단</span> <a href="https://www.airkorea.or.kr/web/" style="text-decoration:underline; vertical-align:initial;" target="_blank" rel="noopener noreferrer">에어코리아</a>
							</div>
						</div>							
					</div>
				</div>
				<button type="button" class="manualBtn" title="도움말" onclick="manualTab('대기오염')"></button>
				<button type="button" class="popup-close" title="닫기" onclick="removeLayer()"></button>
				<button type="button" class="popup-reset" class="초기화"></button>				
				<!-- //업무 > 공간정보활용 > 대기오염 -->