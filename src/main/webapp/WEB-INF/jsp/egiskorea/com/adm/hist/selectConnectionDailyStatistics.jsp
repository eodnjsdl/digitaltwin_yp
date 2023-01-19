<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
    
<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->
<script type="text/javaScript" defer="defer">
$(document).ready(function(){
	// 그래프 영역이 활성화되어 있을 경우만 실행
	if($("#chartContainer").length > 0){		
		fn_draw_chart();
	}
	
	$("#ui-datepicker-div").addClass("monthpicker");
	
	//datepicker Language ko
	$.datepicker.setDefaults({
        dateFormat: 'yy-mm',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년',
		/* 접근성 */
		closeText: '선택',
		buttonImageOnly: false,
		showButtonPanel: true,
		maxDate: 0,
		changeYear: true,
		changeMonth: true
    });
	
	// selectbox 날짜 세팅
	$(".ui-datepicker-trigger").click(function(){
		var year = $("#fromDate").val().substr(0, 4);;
		var month = $("#fromDate").val().substr(5, 2);
		var date = new Date(Number(year), Number(month) - 1, 1, 0, 0, 0, 0);
		
		console.log(year, month);
		 $("#fromDate").datepicker("setDate", date); 
		
		
	});
	
	// 날짜 선택 시 이력 조회
	$(document).on("click", ".ui-datepicker-close", function(){
		var year =$("select[data-handler='selectYear']").val();
		var month = String(Number($("select[data-handler='selectMonth']").val()) + 1).padStart(2, "0");
		
		$("#fromDate").val(year + "-" + month);
		
		document.listForm.submit();
	});
});

/* ********************************************************
 * 차트 생성
 ******************************************************** */
function fn_draw_chart(){
	var ctx = document.getElementById("chartContainer").getContext("2d");
	var labelsArr = new Array();
	var chartStats = "<c:out value='${chartStats}'/>";
	var dataArr = chartStats.replaceAll("[", "").replaceAll("]", "").split(", ");
	var chart;
	
	// 라벨 설정(0~24시)
	for(var i = 0; i < dataArr.length; i++){
		labelsArr.push(String(i + 1) + "일");
	}
	
	chart = new Chart(ctx, { 
		type: "bar", 
		options: {
			legend: {
	        	display: false
	      	},
	      	scales: {
	      		xAxes: [{
	      			barPercentage: 0.5,
	      			gridLines: {
	      				display: false
	      			}
	      		}],
	      		yAxes: [{
	      			ticks: {
	      				beginAtZero: true
	      			}
	      		}]
	      	},
	      	responsive: true,
	      	maintainAspectRatio: false,
		},
		data: { 
			labels: labelsArr, 
			datasets: [{ 
				backgroundColor: "rgb(194, 53, 49)", 
				borderColor: "rgb(255, 99, 132)", 
				data: dataArr
			}] 
		}, 
	});
}
</script>
    
				<!-- content -->
				<section id="content" >
					<form name="listForm" action="<c:url value='/com/mngr/hist/selectConnectionDailyStatistics.do'/>" method="post">
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">접속이력 조회</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">접속이력을 관리하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">

                            <div class="tabBoxDepth1-wrap">
								<div class="tabBoxDepth1">
									<ul>
										<li data-tab="tab01"><button type="button" class="inner-tab" onclick="location.href='/com/mngr/hist/selectConnectionHistoryList.do'">이력조회</button></li>
										<li data-tab="tab02"><button type="button" class="inner-tab" onclick="location.href='/com/mngr/hist/selectConnectionHourlyStatistics.do'">시간대별 통계</button></li>
										<li data-tab="tab03" class="on"><button type="button" class="inner-tab" onclick="location.href='/com/mngr/hist/selectConnectionDailyStatistics.do'">일별 통계</button></li>
										<li data-tab="tab04"><button type="button" class="inner-tab" onclick="location.href='/com/mngr/hist/selectConnectionMonthlyStatistics.do'">월별 통계</button></li>
									</ul>
								</div>
								
                                <!-- 일별 통계 -->
								<div class="tab-cont tab03 on">
									<div class="bbs-top">
                                        <div class="tbl-basic-num">전체 : <strong><c:out value="${statsVO.totInqireCo}"/>건</strong></div>
                                        <div class="d-flex">
                                            <div class="desc">
                                                <div class="datapicker-group"><input id="fromDate" name="fromDate" type="text" class="datepicker monthpicker" autocomplete="off" value="<c:out value='${statsVO.fromDate}'/>" onchange="this.form.submit();"></div>
                                            </div>
                                            <div class="desc">
                                               <select name="searchCnd" id="searchCnd" name="searchCnd" title="검색조건" class="form-select" >
                                                    <option value="GROUP_NM" <c:if test="${statsVO.searchCnd == 'GROUP_NM'}">selected="selected"</c:if>>그룹</option>
                                                    <option value="ORGNZT_NM" <c:if test="${statsVO.searchCnd == 'ORGNZT_NM'}">selected="selected"</c:if>>조직</option>
                                                    <option value="USER_NM" <c:if test="${statsVO.searchCnd == 'USER_NM'}">selected="selected"</c:if>>사용자</option>
                                                </select>
                                                <input type="text" name="searchWrd" class="form-control" size="15" value='<c:out value="${statsVO.searchWrd}"/>' maxlength="15"><button type="submit" class="btn type05 bi-srch">검색</button>
                                            </div>
                                        </div>
                                    </div>

                                   <div class="scroll-yx" style="width: 100%; height:auto; max-height: 350px;">
                                        <div class="bbs-default bbs-yx">
                                            <table class="bbs-list">
                                                <colgroup>
                                                    <col style="width: 4%;">
                                                    <col style="width: 10%;">
                                                    <col style="width: 8%;">
                                                    <col style="width: 6%;">
                                                    <col style="width: 6%;">        
                                                    <c:forEach items="${chartStats}" var="result" varStatus="status">
                                                    	<col style="width: auto;">
                                                    </c:forEach>
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">순위</th>
                                                        <th scope="col">그룹</th>
                                                        <th scope="col">조직</th>
                                                        <th scope="col">사용자</th>
                                                        <th scope="col">계</th>
                                                        <c:forEach items="${chartStats}" var="result" varStatus="status">
	                                                     <th scope="col">${status.count}</th>
	                                                    </c:forEach>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <c:choose>
	                                                   <c:when test="${fn:length(resultList) == 0}">
														<tr>
															<td colspan="<c:out value='${fn:length(chartStats) + 5}'/>"><spring:message code="common.nodata.msg" /></td>
														</tr>
														</c:when>
														<c:otherwise>
															<c:forEach items="${resultList}" var="result" varStatus="status">
		                                              	   		<tr>
		                                                            <td>${status.count}</td>
		                                                            <td>${result.groupNm}</td>
		                                                            <td>${result.orgnztNm}</td>
		                                                            <td>${result.userNm}</td>
		                                                            <td><strong>${result.sum}</strong></td>
		                                                            <c:forEach items="${result.dailyList}" var="item" varStatus="status">
		                                                            <td>${item}</td>
		                                                            </c:forEach>
		                                                        </tr>
		                                               	   </c:forEach>			
														</c:otherwise>
                                                   </c:choose>	                        															
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <!-- 그래프 영역 -->
									<c:if test="${fn:length(resultList) != 0}">
	                                    <div class="chart-box">
	                                        <canvas id="chartContainer"></canvas>			
	                                    </div>
									</c:if>
								</div>
                                <!-- //일별 통계 -->

							</div>

						</div>
					</div>
					</form>
				</section>