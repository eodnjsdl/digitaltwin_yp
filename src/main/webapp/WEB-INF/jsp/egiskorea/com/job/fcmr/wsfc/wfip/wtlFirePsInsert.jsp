<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<!-- 업무 > 시설관리 > 상수수도시설 > 소방시설 등록하기-->

       	<div class="popup-header">소방시설 등록하기</div>
           <div class="popup-body">
               <div class="sub-popup-body">
                   <div class="data-write-wrap" style="height: 100%;">
                       <div class="scroll-y">
                       	   <form id="insertWtlFirePsForm" method="post">
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
                                          	<%-- <c:out value="${wtlFirePsVO.ftr_cde_nm }"/> --%>
                                          	<select name="ftr_cde" class="form-select" readonly="readonly">
                                          		<option value="SA118">급수탑</option>
                                          		<option value="SA119" selected="selected">소화전</option>
                                          	</select>
                                       </td>
                                       <th scope="row">관리번호</th>
                                       <td>
                                       	  	<%-- <c:out value="${wtlFirePsVO.ftr_idn }"/> --%>
                                       	  	<input type="number" name="ftr_idn" class="form-control" value="" readonly="readonly">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">읍면동</th>
                                       <td>
                                       		<%-- <c:out value="${wtlFirePsVO.hjd_cde_nm }"/> --%>
                                       		<select name="hjd_cde" class="form-select">
                                       			<option value="">선택</option>
                                       		</select>	
                                       </td>
                                       <th scope="row">관리기관</th>
                                       <td>
                                       	   <%-- <c:if test="${wtlFirePsVO.mng_cde_nm  != '' || wtlFirePsVO.mng_cde_nm  ne null}">
                                           		<c:out value="${wtlFirePsVO.mng_cde_nm }"/>
                                           </c:if>
                                           <c:if test="${wtlFirePsVO.mng_cde_nm  == '' || wtlFirePsVO.mng_cde_nm  eq null }">
                                           		<c:out value="${wtlFirePsVO.mng_cde }"/>
                                           </c:if> --%>
                                           <select name="mng_cde" class="form-select">
                                       			<option value="">선택</option>
                                       		</select>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">도엽번호</th>
                                       <td>
                                       		<%-- <c:out value="${wtlFirePsVO.sht_num }"/> --%>
                                       		<input type="text" name="sht_num" class="form-control" value="" maxlength="11">
                                       </td>
                                       <th scope="row">설치일자</th>
                                       <td>
                                       	 	<!-- <input type="text" name="ist_ymd" class="form-control datepicker hasDatepicker" value="" id="dp1680677660036"> -->
                                       	 	<input type="text" name="ist_ymd" class="form-control datepicker " value="" id="dp1680677660036"
                                       	 	 style="border-radius: 5px 0 0 5px; border: 1px solid #44516A;">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">수용가번호</th>
                                       <td>
                                       		<%-- <c:if test="${wtlFirePsVO.hom_num  != '' || wtlFirePsVO.hom_num  ne null}">
	                                       		<c:out value="${wtlFirePsVO.hom_num }"/>
                                       		</c:if> --%>
                                       		<input type="text" name="hom_num" class="form-control" value="" maxlength="50">
                                       </td>
                                       <th scope="row">소화전형식</th>
                                       <td>
                                           <%-- <c:out value="${wtlFirePsVO.mof_cde_nm }"/> --%>
                                           <select name="mof_cde" class="form-select">
                                       			<option value="">선택</option>
                                       	   </select>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">소화전구경(mm)</th>
                                       <td>
                                       		<input type="number" name="fir_dip" class="form-control" value="">
                                       </td>
                                       <th scope="row">관경(mm)</th>
                                       <td>
                                       		<input type="number" name="std_dip" class="form-control" value="">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">급수탑높이</th>
                                       <td>
                                       		<%-- <c:out value="${wtlFirePsVO.sup_hit }"/> --%>
                                       		<input type="number" name="sup_hit" class="form-control" value="" id="testt">
                                       </td>
                                       <th scope="row">공사번호</th>
                                       <td>
	                                       	<%-- <c:out value="${wtlFirePsVO.cnt_num }"/> --%>
	                                       	<input type="text" name="cnt_num" class="form-control" value="" maxlength="8">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">방향각</th>
                                       <td colspan="3" >
                                       		<%-- <c:out value="${wtlFirePsVO.ang_dir }"/> --%>
                                       		<input type="number" name="ang_dir" class="form-control" value="">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">위치</th>
                                       <td colspan="3">
                                           <div class="form-row">
                                           		<div class="col">
                                           			<input type="text" class="form-control txt-geometry-address" value="" readonly="readonly">
                                           		</div>                    
                                           		<div class="col-auto">
                                           			<button type="button" class="btn type01 bi-location btn-select-map" data-popup="space-edit-tool">지도에서 선택</button>
                                           		</div>                  
                                           </div>
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                           </form>
                           
                       </div>
                       <div class="position-bottom btn-wrap">
                           <div>
                           	    <button type="button" class="btn basic bi-edit btn_add" onclick="insertWtlFirePs();">등록</button>
                           		<button type="button" class="btn basic bi-cancel btn_cancel">취소</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <button type="button" class="popup-close" title="닫기" onclick="cancelMode();"></button>

<!-- 업무 > 시설관리 > 상수수도시설 > 소방시설 등록하기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		console.log("wtlFirePsInsert.jsp");
        
        // 날짜 적용
      	$(".datepicker").datepicker({
            showOn: "both",
            buttonImage: "/images/icon/form-calendar.svg",
            dateFormat: "yymmdd",
        }); 
        
	});

</script>

	