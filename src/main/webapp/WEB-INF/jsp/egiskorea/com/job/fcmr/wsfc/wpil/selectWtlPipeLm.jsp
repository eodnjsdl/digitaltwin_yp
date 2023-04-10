<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<!-- 업무 > 시설관리 > 상수수도시설 > 상수관로 상세보기-->

       	<div class="popup-header">상수관로 상세보기</div>
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
                                          	<c:out value="${wtlPipeLmVO.ftr_cde_nm }"/>
                                       </td>
                                       <th scope="row">관리번호</th>
                                       <td>
                                       	  	<c:out value="${wtlPipeLmVO.ftr_idn }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">읍면동</th>
                                       <td>
                                       		<c:out value="${wtlPipeLmVO.hjd_cde_nm }"/>
                                       </td>
                                       <th scope="row">도엽번호</th>
                                       <td>
											<c:out value="${wtlPipeLmVO.sht_num }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관리기관</th>
                                       <td>
                                       		<c:out value="${wtlPipeLmVO.mng_cde }"/>
                                       </td>
                                       <th scope="row">설치일자</th>
                                       <td>
                                           <div class="datapicker-group">
                                           		<c:out value="${wtlPipeLmVO.ist_ymd }"/>
                                           </div>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관용도</th>
                                       <td>
                                           <c:out value="${wtlPipeLmVO.saa_cde_nm }"/>
                                       </td>
                                       <th scope="row">관재질</th>
                                       <td>
                                           <c:out value="${wtlPipeLmVO.mop_cde_nm }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관경(mm)</th>
                                       <td>
                                       		<c:out value="${wtlPipeLmVO.std_dip }"/>
                                       </td>
                                       <th scope="row">연장</th>
                                       <td>
                                       		<c:out value="${wtlPipeLmVO.byc_len }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">접합종류</th>
                                       <td>
                                       		<c:out value="${wtlPipeLmVO.jht_cde }"/>
                                       </td>
                                       <th scope="row">최저깊이</th>
                                       <td>
	                                       	<c:out value="${wtlPipeLmVO.low_dep }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">최고깊이</th>
                                       <td>
                                       		<c:out value="${wtlPipeLmVO.hgh_dep }"/>
                                       </td>
                                       <th scope="row">공사번호</th>
                                       <td>
	                                       	<c:out value="${wtlPipeLmVO.cnt_num }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">탐사구분</th>
                                       <td>
	                                       	<c:out value="${wtlPipeLmVO.iqt_cde }"/>
                                       </td>
                                       <th scope="row">관라벨</th>
                                       <td>
	                                       	<c:out value="${wtlPipeLmVO.pip_lbl }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">위치</th>
                                       <td colspan="3">
                                           <div class="form-row">
                                           	  <c:out value="${wtlPipeLmVO.geom }"/>
                                           	  <input type="text" class="form-control txt-geometry-address" value="" readonly="readonly">
                                           	  <input type="hidden" name="geomText" value="<c:out value="${wtlPipeLmVO.geom }"/>" >
                                           </div>
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <div class="position-bottom btn-wrap justify-content-end">
                           <div>
                           	   <button type="button" class="btn basic bi-edit btn_edit" onclick="updateWtlPipeLmView('<c:out value="${gridRowId }"/>');">수정</button>
                               <button type="button" class="btn basic bi-delete2 btn_delete">삭제</button>  
                               <button type="button" class="btn basic bi-cancel btn_cancel">취소</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <button type="button" class="popup-close" title="닫기"></button>

<!-- 업무 > 시설관리 > 상수수도시설 > 상수관로 상세보기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		console.log("selectWtlPipeLm.jsp");
		
		//var geom = "${wtlFirePsVO.geom}";
		
		//console.log(geom);
		
		//위치 : 주소 조회
		//getAddressForPoint(geom, "#rightSubPopup .txt-geometry-address");
		
		//////////////////////
		
		//gird 데이터를 통한 주소 조회
		var gridRowId = "${gridRowId }";
		console.log("gridRowId는 " + gridRowId);
		var geomData = getGeomDataForGridRowId(gridRowId);
		if(geomData){
			getAddressForPoint(geomData, "#rightSubPopup .txt-geometry-address");
		}else{
			console.log("상세보기 좌표 오류");
		}
		 
	});
</script>