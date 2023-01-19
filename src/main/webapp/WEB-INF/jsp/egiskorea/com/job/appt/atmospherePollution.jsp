<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script src="/js/egiskorea/com/job/appt/appt.js"></script>
<script type="text/javascript" src="/js/plugin/echart/echarts.min.js"></script>


				<!-- 업무 > 공간정보활용 > 대기오염 > 대기관측소 -->
				<div class="popup-panel popup-sub opened" style="top: 80px;left: 870px;width: 400px;height: 520px;">
				<div class="popup-header">대기관측소</div>
				<div class="popup-body">
					<div class="sub-popup-body">
						<div class="data-default">
							<table class="data-list">
								<colgroup>
									<col style="width: 30%;">
									<col style="width: auto;">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">관측소명</th>
										<td id="apptStationName"></td>
									</tr>
									<tr>									
										<th scope="row">주소</th>
										<td id="apptAddr"></td>
									</tr>
								</tbody>
							</table>
						</div>
						
						<div class="data-default">
							<table class="data-list tbl-all-center">
								<colgroup>
									<col style="width: 33.33%;">
									<col style="width: 33.33%;">
									<col style="width: auto;">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">미세먼지</th>
										<th scope="col">초미세먼지</th>
										<th scope="col">통합대기환경지수</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td id="apptPm10Value"></td><!-- <div class="marT5"><button type="button" class="btn basic bi-stats">차트</button></div> -->
										<td id="apptPm25Value"></td><!-- <div class="marT5"><button type="button" class="btn basic bi-stats">차트</button></div> -->
										<td id="apptKhaiGrade"></td><!-- <div class="marT5"><button type="button" class="btn basic bi-stats">차트</button></div> -->
									</tr>
								</tbody>
							</table>
						</div>

						<div class="chart-box">
							<div id="apptChart" class="chart-txt"><p>보고싶은 차트를 선택해 주세요</p></div>
						</div>
					</div>
				</div>
				<button type="button" class="popup-close apptSubPopupClose" title="닫기" onclick="apptPopupCloseEvent()"></button>
				
				<script>
					$( function() {		
						$(".icon-btn.stats").click(function(){
							$(this).addClass("active");
						});										
					});
				</script>
				</div>
				<!-- //업무 > 공간정보활용 > 대기오염 > 대기관측소 -->