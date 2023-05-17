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

<%--        	<div class="popup-header">
       		<c:out value="${tgdBusSttnInfoVO.sttn_nm }"/>&#40;<c:out value="${tgdBusSttnInfoVO.sttn_no }"/>&#41;
       	</div> --%>
           <div class="popup-body">
               <div class="sub-popup-body">
                   <div class="data-write-wrap" style="height: 100%;">
                       <div class="scroll-y">
                           <div class="data-default">
                               <table class="data-write">
                                   <colgroup>
                                       <col style="width: 23%;">
                                       <col style="width: auto;">
                                       <col style="width: 23%;">
                                       <col style="width: auto;">
                                   </colgroup>
                                   <tbody>
                                   <%-- <tr>
                                       <th scope="row">기점정류소명</th>
                                       <td>
                                          	<c:out value="${tbdThrghRouteInfoVO.routeTy }"/>
                                       </td>
                                       <th scope="row">종점정류소명</th>
                                       <td>
                                       	  	<c:out value="${tbdThrghRouteInfoVO.routeTy }"/>
                                       </td>
                                   </tr> --%>
<%--                                    <tr>
                                       <th scope="row">정류소아이디</th>
                                       <td>
                                          	<c:out value="${tgdBusSttnInfoVO.sttn_id }"/>
                                       </td>
                                       <th scope="row">정류소명</th>
                                       <td>
                                       	  	<c:out value="${tgdBusSttnInfoVO.sttn_nm }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">정류소번호</th>
                                       <td>
                                       	  	<c:out value="${tgdBusSttnInfoVO.sttn_no }"/>
                                       </td>
                                       <th scope="row">지역명</th>
                                       <td>
                                       	  	<c:out value="${tgdBusSttnInfoVO.area_nm }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관할코드</th>
                                       <td>
                                       	  	<c:out value="${tgdBusSttnInfoVO.cmptnc_cd }"/>
                                       </td>
                                       <th scope="row">중앙차로여부</th>
                                       <td>
                                       	  	<c:out value="${tgdBusSttnInfoVO.centr_cartrk_at }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">x좌표</th>
                                       <td>
                                       	  	<c:out value="${tgdBusSttnInfoVO.x_crdnt }"/>
                                       </td>
                                       <th scope="row">y좌표</th>
                                       <td>
                                       	  	<c:out value="${tgdBusSttnInfoVO.y_crdnt }"/>
                                       </td>
                                   </tr> --%>
                                   </tbody>
                               </table>
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

	
