<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<!-- <script type="text/javascript">
	//jquery
	$(document).ready(function(){
		console.log("selectPopulationInfoList.jsp");
		console.log("교통분석 - 인구정보");
		
		//검색 조건 세팅
		getCmmCodeData("YPE001", "#pplSearchForm select[name=pplTrArea]");	//읍면동
		getPplBaseYYMMList();
		
		initPplLegal();
		
		$("#pplShowType").on('change', function() {
			console.log("pplShowType>>"+this.value);
			var showType = this.value;
			if(showType == "legal"){
				//console.log("법정동 경계");
				if($(".pplInfoLegalType").css("display") == "none"){
					$(".pplInfoLegalType").show();
				}
				$(".pplInfoGridType").hide();
				
				initPplLegal();
				
			}else if(showType == "grid"){
				//console.log("격자");
				if($(".pplInfoGridType").css("display") == "none"){
					$(".pplInfoGridType").show();
				}
				
				$(".pplInfoLegalType").hide();
			}else{
				console.log("인구정보 선택 오류");
			}
			
		});
		
		
		
		
	});
	
	//functions
	
	/**
     * 법정도 경계 초기화
     */
	function initPplLegal(){

		selectPplInfoList()
	}
	
	/**
     * 격자 경계 초기화
     */
	function initPplGrid(){
		
	}
	
	/**
     * 격자 경계 초기화
     */
	function getPplBaseYYMMList(){
		console.log("getPplBaseYYMMList()");
		var today = new Date();
		
		for(var i=0; i<12; i++){
			
			var dYear = today.getFullYear();
			var dMonth = ('0' + (today.getMonth() + 1)).slice(-2);
			
			var dVal = dYear+""+dMonth;
			var dYM  = dYear+"년 "+dMonth+"월";

			var dhml = "<option value='"+dVal+"'>"+ dYM +"</option>";
			$("#pplBaseYYMM").append(dhml);
			//console.log('dYM>>'+dYM);
			
			var dMonth = today.setMonth(today.getMonth()-1);
			var dDate = new Date(dMonth);
			today = dDate;
		}
	
	}
	
	/**
     * 분석결과 차트 표시
     */
    function populationRenderChart(result){
    	console.log("populationRenderChart()");
    	
    	//캔버스 처리
    	const canvas = $(
                `<canvas class="analysis-chart2" width="370" height="220"></canvas>`
        );
        $(".graph-box2", this.selector).html(canvas);
        const ctx = canvas[0].getContext("2d");
        
        // 데이터 세팅
        var labels 	= [];
        var data 	= [];
        
        if(result){
        	
        	for(var i=0; i<result.length; i++){
        		labels.push(result[i].area);
        		data.push(result[i].data);
        	}
        	
        	//console.log(labels);
        	//console.log(data);
        	
        }else{
        	console.log("그래프 데이터 오류");
        	return false;
        }
        
        /* const labels = this.list.map((item) => {
            return item["name"];
        });
        const data = this.list.map((item) => {
            return item["value"];
        }); */
        
        //차트 그리기
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
                                
                                label += `\r\n`+context.raw+`명`;
                                
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
	
	/**
	* 인구 정보 조회
	*/
	function selectPplInfoList(){
		console.log("selectPplInfoList()");
		
		var data = $("#pplSearchForm").serialize();
		
		//console.log("data>>");
		//console.log(data);
				
		var result =
			[
				{area : '양평읍', data : 681 },
				{area : '강상면', data : 175 },
				{area : '강하면', data : 115 },
				{area : '양서면', data : 338 },
				{area : '옥천면', data : 131 },
				{area : '서종면', data : 166 },
				{area : '단월면', data : 117 },
				{area : '청운면', data : 94 },
				{area : '양동면', data : 113 },
				{area : '지평면', data : 154 },
				{area : '용문면', data : 362 },
				{area : '개군면', data : 166 }
		];
		
		
		var totalCount = 0;
		for(var i=0; i<result.length; i++){
			totalCount += result[i].data;
    	}
		
		$('.pplInfoLegalType .bbs-list-num').html("조회결과 : <strong>"+totalCount+"</strong>명")
	 	//console.log(totalCount);		
		
		//리스트 갱신
		var legalListHml = "";
		for(var i=0; i<result.length; i++){
						
			legalListHml +=	"<tr>"
			legalListHml +=	"<td>"+result[i].area+"</td>"
			legalListHml +=	"<td>"+result[i].data+"</td>"
			
			var rate = Math.floor(result[i].data/totalCount*100);
			//console.log(rate);
			legalListHml +=	"<td>"+rate+"%</td>"
			legalListHml +=	"</tr>"
    	}
		
		$("#pplInfoLegalList").html(legalListHml);
		
		//차트 그리기
		populationRenderChart(result);
		
	}

</script> -->
<script src="/js/egiskorea/com/job/tran/popltn/popltn.js"></script>
<!-- 교통분석-인구정보 -->
	<form name="pplSearchForm" id="pplSearchForm">
	<div class="popup-header">인구정보</div>
	<div class="popup-body">
		<div class="left-popup-body">	
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
                                   <select name="pplShowType" id="pplShowType" class="form-select w-auto" style="width: 100%;">
                                       <option value="legal" selected="selected">법정동 경계</option>
                                       <option value="grid">격자</option>
                                   </select>
                               </td>
                           </tr>
                           <tr>
                              <th scope="row">대상 지역</th>
                               <td>
                                   <select name="liCd" id="liCd" class="form-select w-auto" style="width: 100%;">
                                       <option value="all" selected="selected">전체</option>
                                   </select>
                               </td> 
                           </tr>
                           <tr>
                              <th scope="row">자료 유형</th>
                               <td>
                                   <select name="pplGender" id="pplGender" class="form-select w-auto" style="width: 100%;">
                                       <option value="all" selected="selected">총인구</option>
                                       <option value="m">남자</option>
                                       <option value="w">여자</option>
                                   </select>
                               </td> 
                           </tr>										
                           <tr>
                              <th scope="row">기준 연월</th>
                               <td>
                                   <select name="stdrYm" id="pplBaseYYMM" class="form-select w-auto" style="width: 100%;">
                                   </select>
                               </td> 
                           </tr>										
						</tbody>
					</table>
				</div>
				<div class="btn-wrap">
                    <div>
                        <button type="button" id="pplInfoSearch" class="btn type01 search">조회</button>
                    </div>
                </div>
				
			</div>
			
			<div class="pplInfoLegalType">
				<div class="btn-wrap justify-content-between">
					<div class="bbs-list-num">조회결과 : <strong></strong>건</div>
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
		                            <th scope="col">비율</th>
		                        </tr>
	                        </thead>
	                    </table>
	                </div>
					<div class="scroll-y" style="max-height: 180px;">
						<table class="bbs-list">
		                     <colgroup>
		                         <col style="width: 30%;">
		                         <col style="width: 30%;">
		                         <col style="width: auto;">
		                     </colgroup>
	                     <tbody id="pplInfoLegalList">
		                     <tr>
		                     	<td>양평읍</td>
		                     	<td>681</td>
		                     	<td>681명</td>
		                     </tr>
		                     <tr>
		                     	<td>양평읍</td>
		                     	<td>681</td>
		                     	<td>681명</td>
		                     </tr>
		                     <tr>
		                     	<td>양평읍</td>
		                     	<td>681</td>
		                     	<td>681명</td>
		                     </tr>
		                     <tr>
		                     	<td>양평읍</td>
		                     	<td>681</td>
		                     	<td>681명</td>
		                     </tr>
		                     <tr>
		                     	<td>양평읍</td>
		                     	<td>681</td>
		                     	<td>681명</td>
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
			
			<div class="pplInfoGridType" style="display: none;">
				<div>
				격자
				<ul>
					<li>aaa</li>
					<li>bbb</li>
					<li>ccc</li>
					<li>ddd</li>
					<li>eee</li>
					<li>fff</li>
				</ul>
				</div>
			</div>
			
		</div>
	</div>
	
	</form>
	
	<button type="button" class="manualBtn" title="도움말" onclick="manualTab('인구정보')"></button>
	<button type="button" class="popup-close" id="fcrmCloseBtn" title="닫기"></button>
	<button type="button" class="popup-reset" class="초기화" id="fcrmResetBtn"></button>
	<button type="button" class="popup-bottom-toggle" title="접기"></button>				
<!-- 교통분석-인구정보 -->

