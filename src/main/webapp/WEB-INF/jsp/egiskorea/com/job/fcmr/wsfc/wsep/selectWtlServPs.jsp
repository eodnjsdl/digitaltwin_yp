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
                                          	<c:out value="${wtlPrgaPsVO.ftr_cde_nm }"/>
                                       </td>
                                       <th scope="row">관리번호</th>
                                       <td>
                                       	  	<c:out value="${wtlPrgaPsVO.ftr_idn }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">읍면동</th>
                                       <td>
                                       		<c:out value="${wtlPrgaPsVO.hjd_cde_nm }"/>
                                       </td>
                                       <th scope="row">도엽번호</th>
                                       <td>
                                       		<c:out value="${wtlPrgaPsVO.sht_num }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관리기관</th>
                                       <td>
                                       	   <c:if test="${wtlPrgaPsVO.mng_cde_nm  != '' || wtlPrgaPsVO.mng_cde_nm  ne null}">
                                           		<c:out value="${wtlPrgaPsVO.mng_cde_nm }"/>
                                           </c:if>
                                           <c:if test="${wtlPrgaPsVO.mng_cde_nm  == '' || wtlPrgaPsVO.mng_cde_nm  eq null }">
                                           		<c:out value="${wtlPrgaPsVO.mng_cde }"/>
                                           </c:if>
                                       </td>
                                       <th scope="row">설치일자</th>
                                       <td>
                                           <div class="datapicker-group">
                                           		<c:out value="${wtlPrgaPsVO.ist_ymd }"/>
                                           </div>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">배수지종류</th>
                                       <td>
                                           <c:out value="${wtlPrgaPsVO.pga_cde_nm }"/>
                                       </td>
                                       <th scope="row">배수지형식</th>
                                       <td>
                                           <c:out value="${wtlPrgaPsVO.mof_cde_nm }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관경(mm)</th>
                                       <td>
                                       		<c:out value="${wtlPrgaPsVO.std_dip }"/>
                                       </td>
                                       <th scope="row">기준압력</th>
                                       <td>
                                       		<c:out value="${wtlPrgaPsVO.std_saf }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">평균압력</th>
                                       <td>
                                       		<c:out value="${wtlPrgaPsVO.avg_saf }"/>
                                       </td>
                                       <th scope="row">측정압력</th>
                                       <td>
	                                       	<c:out value="${wtlPrgaPsVO.msr_saf }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">배수관_관경</th>
                                       <td>
                                       		<c:out value="${wtlPrgaPsVO.srv_dip }"/>
                                       </td>
                                       <th scope="row">관로지형지물부호</th>
                                       <td>
	                                       	<c:out value="${wtlPrgaPsVO.pip_cde }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관로관리번호</th>
                                       <td>
	                                       	<c:out value="${wtlPrgaPsVO.pip_idn }"/>
                                       </td>
                                       <th scope="row">공사번호</th>
                                       <td>
	                                       	<c:out value="${wtlPrgaPsVO.cnt_num }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">방향각</th>
                                       <td colspan="3">
	                                       	<c:out value="${wtlPrgaPsVO.ang_dir }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">위치</th>
                                       <td colspan="3">
                                           <div class="form-row">
											  <c:out value="${wtlPrgaPsVO.geom }"/>
                                           	  <input type="text" class="form-control txt-geometry-address" value="" readonly="readonly">
                                           	  <input type="hidden" name="geomText" value="<c:out value="${wtlPrgaPsVO.geom }"/>" >
                                           </div>
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <div class="position-bottom btn-wrap justify-content-end">
                           <div>
                           	   <button type="button" class="btn basic bi-edit btn_edit" onclick="javascript:updateWtlPrgaPsView('<c:out value="${gridRowId }"/>')">수정</button>
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
		console.log("selectWtlPrgaPs.jsp");
		
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