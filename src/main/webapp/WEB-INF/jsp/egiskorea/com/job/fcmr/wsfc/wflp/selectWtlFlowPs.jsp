<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<!-- 업무 > 시설관리 > 상수수도시설 > 유량계 상세보기-->

       	<div class="popup-header">유량계 상세보기</div>
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
                                          	<c:out value="${wtlFlowPsVO.ftr_cde_nm }"/>
                                       </td>
                                       <th scope="row">관리번호</th>
                                       <td>
                                       	  	<c:out value="${wtlFlowPsVO.ftr_idn }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">읍면동</th>
                                       <td>
                                       		<c:out value="${wtlFlowPsVO.hjd_cde_nm }"/>
                                       </td>
                                       <th scope="row">관리기관</th>
                                       <td>
                                       	   <c:if test="${wtlFlowPsVO.mng_cde_nm  != '' || wtlFlowPsVO.mng_cde_nm  ne null}">
                                           		<c:out value="${wtlFlowPsVO.mng_cde_nm }"/>
                                           </c:if>
                                           <c:if test="${wtlFlowPsVO.mng_cde_nm  == '' || wtlFlowPsVO.mng_cde_nm  eq null }">
                                           		<c:out value="${wtlFlowPsVO.mng_cde }"/>
                                           </c:if>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">도엽번호</th>
                                       <td>
                                       		<c:out value="${wtlFlowPsVO.sht_num }"/>
                                       </td>
                                       <th scope="row">설치일자</th>
                                       <td>
                                           <div class="datapicker-group">
                                           		<c:out value="${wtlFlowPsVO.ist_ymd }"/>
                                           </div>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">유량계종류</th>
                                       <td>
                                           <c:out value="${wtlFlowPsVO.gag_cde_nm }"/>
                                       </td>
                                       <th scope="row">유량계형식</th>
                                       <td>
                                           <c:out value="${wtlFlowPsVO.mof_cde_nm }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관경(mm)</th>
                                       <td>
                                       		<c:out value="${wtlFlowPsVO.std_dip }"/>
                                       </td>
                                       <th scope="row">제작회사명</th>
                                       <td>
                                       		<c:out value="${wtlFlowPsVO.prc_nam }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관로지형지물부호</th>
                                       <td>
                                       		<c:out value="${wtlFlowPsVO.pip_cde }"/>
                                       </td>
                                       <th scope="row">관로관리번호</th>
                                       <td>
	                                       	<c:out value="${wtlFlowPsVO.pip_idn }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">공사번호</th>
                                       <td>
	                                       	<c:out value="${wtlFlowPsVO.cnt_num }"/>
                                       </td>
                                       <th scope="row">방향각</th>
                                       <td>
	                                       	<c:out value="${wtlFlowPsVO.ang_dir }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">위치</th>
                                       <td colspan="3">
                                           <div class="form-row">
											  <c:out value="${wtlFlowPsVO.geom }"/>
                                           	  <input type="text" class="form-control txt-geometry-address" value="" readonly="readonly">
                                           	  <input type="hidden" name="geomText" value="<c:out value="${wtlFlowPsVO.geom }"/>" >
                                           </div>
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <div class="position-bottom btn-wrap justify-content-end">
                           <div>
                           	   <button type="button" class="btn basic bi-edit btn_edit" onclick="javascript:updateWtlFlowPsView('<c:out value="${gridRowId }"/>')">수정</button>
                               <button type="button" class="btn basic bi-delete2 btn_delete">삭제</button>  
                               <button type="button" class="btn basic bi-cancel btn_cancel">취소</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <button type="button" class="popup-close" title="닫기"></button>

<!-- 업무 > 시설관리 > 상수수도시설 > 유량계 상세보기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		console.log("selectWtlFlowPs.jsp");
		
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