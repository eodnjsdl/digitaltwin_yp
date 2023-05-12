<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<script type="text/javascript">
	//jquery
	$(document).ready(function(){
		console.log("selectPopulationInfoList.jsp");
		console.log("교통분석 - 인구정보");
	});
	
	//functions
	/**
     * 분석결과 차트 표시
     */
    function populationRenderChart(){
		
    	const canvas = $(
                `<canvas class="analysis-chart" width="370" height="220"></canvas>`
        );
        $(".graph-box2", this.selector).html(canvas);
        const ctx = canvas[0].getContext("2d");

        const labels = this.list.map((item) => {
            return item["name"];
        });
        const data = this.list.map((item) => {
            return item["value"];
        });
        const datasets = [
            {
                data: data,
                borderColor: "rgba(0, 0, 255, 1)",
                backgroundColor: "rgba(0, 0, 255, 0.5)",
            },
        ];
        new Chart(ctx, {
            type: "bar",
            data: {labels, datasets},
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                let label = "";
                                if (this.type === "P" || this.type === "MP") {
                                    label += `\r\n${context["raw"]}개`;
                                } else if (this.type === "L" || this.type === "ML") {
                                    label += `\r\n${this.formatLength(context["raw"])}`;
                                } else if (this.type === "A" || this.type === "MA") {
                                    label += `\r\n${this.formatArea(context["raw"])}`;
                                } else {
                                    label += `\r\n${context["formattedValue"]}`;
                                }
                                return label;
                            },
                        },
                    },
                },
            },
            plugins: [
                {
                    id: "custom_canvas_background_color",
                    beforeDraw: (chart) => {
                        const ctx = chart.canvas.getContext("2d");
                        ctx.save();
                        ctx.globalCompositeOperation = "destination-over";
                        ctx.fillStyle = "white";
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                    },
                },
            ],
        });
	}

</script>
<!-- 교통분석-인구정보 -->
<form name="searchForm" id="searchForm" method="post" onsubmit="fn_select_list(); return false;">
	<div class="popup-header">인구정보</div>
	<div class="popup-body">
		<div class="left-popup-body facility-rsve-mng-body">	
			<div class="srch-box">
				<div class="srch-default">
					<table class="srch-tbl">
						<colgroup>
							<col style="width: 25%;">
							<col style="width: auto;">
						</colgroup>
						<tbody>
							<tr>
                               <th scope="row">항목 선택</th>
                               <td>
                                   <select name="showType" id="showType" class="form-select w-auto" style="width: 100%;">
                                       <option value="1" selected="selected">법정동 경계</option>
                                       <option value="2">격자</option>
                                   </select>
                               </td>
                           </tr>
                           <tr>
                              <th scope="row">대상 지역</th>
                               <td>
                                   <select name="targetArea" id="targetArea" class="form-select w-auto" style="width: 100%;">
                                       <option value="all" selected="selected">전체</option>
                                       <option value="1">양평읍</option>
                                   </select>
                               </td> 
                           </tr>
                           <tr>
                              <th scope="row">자료 유형</th>
                               <td>
                                   <select name="gender" id="gender" class="form-select w-auto" style="width: 100%;">
                                       <option value="all" selected="selected">총인구</option>
                                       <option value="m">남자</option>
                                       <option value="w">여자</option>
                                   </select>
                               </td> 
                           </tr>										
                           <tr>
                              <th scope="row">기준 연월</th>
                               <td>
                                   <select name="baseYYMM" id="baseYYMM" class="form-select w-auto" style="width: 100%;">
                                       <option value="2305" selected="selected">23-05</option>
                                       <option value="2304">23-04</option>
                                       <option value="2303">23-03</option>
                                       <option value="2302">23-02</option>
                                       <option value="2301">23-01</option>
                                   </select>
                               </td> 
                           </tr>										
						</tbody>
					</table>
				</div>
				<div class="btn-wrap">
                    <div>
                        <button type="button" class="btn type01 search" name="cplSearch">조회</button>
                    </div>
                </div>
				
				
			</div>
			<div class="btn-wrap justify-content-between">
				<div class="bbs-list-num">조회결과 : <strong><c:out value="" /></strong>건</div>
				<!-- <div class="align-right"><button type="button" class="btn bi-write" id="faciRegistViewBtn">등록</button></div> -->
			</div>
	
			<div class="bbs-default">
				<div class="bbs-list-head">
                    <table class="bbs-list">
                        <colgroup>
                            <col style="width: 30%;">
                            <col style="width: 30%;">
                            <col style="width: auto;">
                        </colgroup>
                        <thead>
	                        <tr>
	                            <th scope="col">지역</th>
	                            <th scope="col">통계치</th>
	                            <th scope="col">개수</th>
	                        </tr>
                        </thead>
                    </table>
                </div>
				<div class="scroll-y">
					<table class="bbs-list">
	                     <colgroup>
	                         <col style="width: 30%;">
	                         <col style="width: 30%;">
	                         <col style="width: auto;">
	                     </colgroup>
                     <tbody>
	                     <tr>
	                     	<td>양평읍</td>
	                     	<td>681</td>
	                     	<td>681개</td>
	                     </tr>
	                     <tr>
	                     	<td>양평읍</td>
	                     	<td>681</td>
	                     	<td>681개</td>
	                     </tr>
	                     <tr>
	                     	<td>양평읍</td>
	                     	<td>681</td>
	                     	<td>681개</td>
	                     </tr>
	                     <tr>
	                     	<td>양평읍</td>
	                     	<td>681</td>
	                     	<td>681개</td>
	                     </tr>
	                     <tr>
	                     	<td>양평읍</td>
	                     	<td>681</td>
	                     	<td>681개</td>
	                     </tr>
                     <%-- <c:forEach items="${resultList}" var="cpList" varStatus="status">
                         <tr name="tdCwpDtl" id="tdCwpDtl" data-cpi='<c:out value="${cpList.cntrkPlnId}" />'
                             data-lon='<c:out value="${cpList.lon}" />'
                             data-lat='<c:out value="${cpList.lat}" />'>
                              
                             <c:forEach items="${codeList}" var="codeList" varStatus="status">
                                 <c:if test="${cpList.cntrkTy eq codeList.codeId}">
                                     <td><c:out value="${codeList.codeIdNm}"></c:out></td>
                                 </c:if>
                             </c:forEach>
                             <td><c:out value="${cpList.chpsnPsitn}"></c:out></td>
                             <td><c:out value="${cpList.plnYear}"></c:out>년 <c:out
                                     value="${cpList.plnQu}"></c:out></td>
                             <td><c:out value="${cpList.cntrkNm}"></c:out></td>
                         </tr>
                     </c:forEach>
                     <c:if test="${fn:length(resultList) == 0}">
                         <tr>
                             <td colspan="4">데이터가 없습니다.</td>
                         </tr>
                     </c:if> --%>
                     </tbody>
                 </table>
				</div>
			</div>
			
			<div class="graph-box2"></div>
			
		</div>
	</div>
</form>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('인구정보')"></button>
<button type="button" class="popup-close" id="fcrmCloseBtn" title="닫기"></button>
<button type="button" class="popup-reset" class="초기화" id="fcrmResetBtn"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>				
<!-- 교통분석-인구정보 -->

