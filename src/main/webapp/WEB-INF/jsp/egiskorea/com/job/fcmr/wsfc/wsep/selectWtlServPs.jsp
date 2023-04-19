<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<!-- 업무 > 시설관리 > 상수수도시설 > 배수지 상세보기-->

       	<div class="popup-header">배수지 상세보기</div>
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
                                   <tr>
                                       <th scope="row">지형지물부호</th>
                                       <td>
                                          	<c:out value="${wtlServPsVO.ftr_cde_nm }"/>
                                       </td>
                                       <th scope="row">관리번호</th>
                                       <td>
                                       	  	<c:out value="${wtlServPsVO.ftr_idn }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">읍면동</th>
                                       <td>
                                       		<c:out value="${wtlServPsVO.hjd_cde_nm }"/>
                                       </td>
                                       <th scope="row">도엽번호</th>
                                       <td>
                                       		<c:out value="${wtlServPsVO.sht_num }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관리기관</th>
                                       <td>
                                       	   <c:if test="${wtlServPsVO.mng_cde_nm  != '' || wtlServPsVO.mng_cde_nm  ne null}">
                                           		<c:out value="${wtlServPsVO.mng_cde_nm }"/>
                                           </c:if>
                                           <c:if test="${wtlServPsVO.mng_cde_nm  == '' || wtlServPsVO.mng_cde_nm  eq null }">
                                           		<c:out value="${wtlServPsVO.mng_cde }"/>
                                           </c:if>
                                       </td>
                                       <th scope="row">준공일자</th>
                                       <td>
                                           <div class="datapicker-group">
                                           		<c:out value="${wtlServPsVO.fns_ymd }"/>
                                           </div>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">배수지명</th>
                                       <td>
                                           <c:out value="${wtlServPsVO.srv_nam }"/>
                                       </td>
                                       <th scope="row">정수장명</th>
                                       <td>
                                           <c:out value="${wtlServPsVO.pur_nam }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">부지면적</th>
                                       <td>
                                       		<c:out value="${wtlServPsVO.gai_ara }"/>
                                       </td>
                                       <th scope="row">관리방법</th>
                                       <td>
                                       		<c:out value="${wtlServPsVO.sag_cde }"/>
                                       		<%-- <c:out value="${wtlServPsVO.sag_cde_nm }"/> --%>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">시설용량</th>
                                       <td>
                                       		<c:out value="${wtlServPsVO.srv_vol }"/>
                                       </td>
                                       <th scope="row">최고수위</th>
                                       <td>
	                                       	<c:out value="${wtlServPsVO.hgh_wal }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">최저수위</th>
                                       <td>
                                       		<c:out value="${wtlServPsVO.low_wal }"/>
                                       </td>
                                       <th scope="row">배수지유입량</th>
                                       <td>
	                                       	<c:out value="${wtlServPsVO.isr_vol }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">급수지역</th>
                                       <td>
	                                       	<c:out value="${wtlServPsVO.sup_are }"/>
                                       </td>
                                       <th scope="row">급수인구</th>
                                       <td>
	                                       	<c:out value="${wtlServPsVO.sup_pop }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">배수지제어방법</th>
                                       <td>
	                                       	<c:out value="${wtlServPsVO.scw_cde_nm }"/>
                                       </td>
                                       <th scope="row">공사번호</th>
                                       <td>
	                                       	<c:out value="${wtlServPsVO.cnt_num }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">위치</th>
                                       <td colspan="3">
                                           <div class="form-row">
											  <c:out value="${wtlServPsVO.geom }"/>
                                           	  <input type="text" class="form-control txt-geometry-address" value="" readonly="readonly">
                                           	  <input type="hidden" name="geomText" value="<c:out value="${wtlServPsVO.geom }"/>" >
                                           </div>
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <div class="position-bottom btn-wrap justify-content-end">
                           <div>
                           	   <button type="button" class="btn basic bi-edit btn_edit" onclick="javascript:updateWtlServPsView('<c:out value="${gridRowId }"/>')">수정</button>
                               <button type="button" class="btn basic bi-delete2 btn_delete">삭제</button>  
                               <button type="button" class="btn basic bi-cancel btn_cancel">취소</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <button type="button" class="popup-close" title="닫기"></button>

<!-- 업무 > 시설관리 > 상수수도시설 > 배수지 상세보기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		console.log("selectWtlServPs.jsp");
		
		//gird 데이터를 통한 주소 조회
		var gridRowId = "${gridRowId }";
		
		var geomData = getGeomDataForGridRowId(gridRowId);
		if(geomData){
			getAddressForPoint(geomData, "#rightSubPopup .txt-geometry-address");
		}else{
			console.log("상세보기 좌표 오류");
		}
		 
	});
</script>