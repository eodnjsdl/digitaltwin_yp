<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<style type="text/css">
	.popup-panel.popup-sub .select-tgdBusSttnInfo-popup-close {
	    top: 0;
	    right: 0;
	    width: 39px;
	    height: 39px;
	    border-left: 1px solid #44516A;
	    background: url(/images/icon/popup-close2.svg) no-repeat 50% 50%;
	    border-top-right-radius: 10px;
	    position: absolute;
	}
	
</style>

<!-- 업무 > 교통분석 > 버스정류소 > 정류소경유노선 조회-->

       	<%-- <div class="popup-header">
       		<c:out value="${tgdBusSttnInfoVO.sttn_nm }"/>&#40;<c:out value="${tgdBusSttnInfoVO.sttn_no }"/>&#41;
       	</div> --%>
       	<div class="popup-header" id="tgdBusSttnInfo"></div>
           <div class="popup-body">
               <div class="sub-popup-body">
                   <div class="data-write-wrap" style="height: 100%;">
                       <div class="scroll-y">
                           <div class="data-default">
                               <ul class="data-write">
								  <c:forEach items="${tbdThrghRouteInfoVO}" var="item">
								    <li>
								      <strong>노선유형:</strong> <c:out value="${item.routeTyNm }"/>&nbsp;&nbsp;&nbsp;&nbsp;
								      <strong>노선번호:</strong> <c:out value="${item.routeNm }"/><br>
								      <strong>기점:</strong> <c:out value="${item.cdpntSttnNm }"/>&nbsp;&nbsp;&nbsp;&nbsp;
								      <strong>종점:</strong> <c:out value="${item.tmnlSttnNm }"/><br>
								      <strong></strong><br>
								    </li>
								  </c:forEach>
								</ul>
                           </div>
                       </div>
                       <div class="position-bottom btn-wrap justify-content-end">
                           <div>
                               <button type="button" class="btn basic bi-cancel btn_cancel" 	onclick="cancelSelectTgdBusSttnInfo();">닫기</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <!-- <button type="button" class="popup-close" title="닫기"></button> -->
           <button type="button" class="select-tgdBusSttnInfo-popup-close" title="닫기"></button>

<!-- 업무 > 교통분석 > 버스정류소 > 정류소경유노선 조회 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		
		//닫기
		$(".popup-panel .select-tgdBusSttnInfo-popup-close").on("click", function () {
			cancelSelectTgdBusSttnInfo();
    	});
		
	});
	
	//functions
	
	//정류소경유노선 조회 취소
	function cancelSelectTgdBusSttnInfo() {
		//console.log("cancelSelectTgdBusSttnInfo()");
		
		$(".select-tgdBusSttnInfo-popup-close").closest('.popup-panel').removeClass('opened');
        // 초기화 (지도)
        dtmap.draw.dispose();
        dtmap.draw.clear();
        
        dtmap.vector.clearSelect();	//선택 해제
       
        TRFICANALS.Ax5UiGrid.clearSelect();	//그리드 선택 해제
        
	}

</script>

	
