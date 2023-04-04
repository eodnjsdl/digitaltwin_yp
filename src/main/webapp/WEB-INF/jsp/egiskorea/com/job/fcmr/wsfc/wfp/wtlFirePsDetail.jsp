<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<script>

</script>
<!-- 업무 > 시설관리 > 상수수도시설 > 소방시설 상세보기-->

       	<div class="popup-header">소방시설 상세보기</div>
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
                                          	<c:out value="${wtlFirePsVO.ftr_cde }"/>
                                       </td>
                                       <th scope="row">관리번호</th>
                                       <td>
                                       	  	<c:out value="${wtlFirePsVO.ftr_idn }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">행정읍면동</th>
                                       <td>
                                       		<c:out value="${wtlFirePsVO.hjd_cde }"/>
                                       </td>
                                       <th scope="row">관리기관</th>
                                       <td>
                                           <c:out value="${wtlFirePsVO.mng_cde }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">도엽번호</th>
                                       <td>
                                       		<c:out value="${wtlFirePsVO.sht_num }"/>
                                       </td>
                                       <th scope="row">설치일자</th>
                                       <td>
                                           <div class="datapicker-group">
                                           		<c:out value="${wtlFirePsVO.ist_ymd }"/>
                                           </div>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">수용가번호</th>
                                       <td>
                                       		<c:out value="${wtlFirePsVO.hom_num }"/>
                                       </td>
                                       <th scope="row">소화전형식</th>
                                       <td>
                                           <c:out value="${wtlFirePsVO.mof_cde }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">소화전구경(mm)</th>
                                       <td>
                                       		<c:out value="${wtlFirePsVO.fir_dip }"/>
                                       </td>
                                       <th scope="row">관경(mm)</th>
                                       <td>
                                       		<c:out value="${wtlFirePsVO.std_dip }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">급수탑높이</th>
                                       <td>
                                       		<c:out value="${wtlFirePsVO.sup_hit }"/>
                                       </td>
                                       <th scope="row">공사번호</th>
                                       <td>
                                       		<c:out value="${wtlFirePsVO.cnt_num }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">방향각</th>
                                       <td>
                                       		<c:out value="${wtlFirePsVO.ang_dir }"/>
                                       	</td>
                                       <th scope="row">기관관리번호</th>
                                       <td>
                                       		<c:out value="${wtlFirePsVO.gid }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">생성일</th>
                                       <td>
                                           <div class="datapicker-group">
                                           		<c:out value="${wtlFirePsVO.gid }"/>
                                           	</div>
                                       </td>
                                       <th scope="row">생성자</th>
                                       <td>
                                       		<c:out value="${wtlFirePsVO.gid }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">수정일</th>
                                       <td>
                                           <div class="datapicker-group">
                                           		<!-- <input type="text" class="datepicker"> -->
                                           		<c:out value="${wtlFirePsVO.gid }"/>
                                           </div>
                                       </td>
                                       <th scope="row">수정자</th>
                                       <td>
                                       		<!-- <input type="text" class="form-control"> -->
                                       		<c:out value="${wtlFirePsVO.gid }"/>
                                       	</td>
                                   </tr>
                                   <tr>
                                       <th scope="row">위치</th>
                                       <td colspan="3">
                                           <div class="form-row">
                                           		<c:out value="${wtlFirePsVO.gid }"/>
                                              <!--  <div class="col"><input type="text" class="form-control"></div>
                                               <div class="col-auto">
                                                   <button type="button" class="btn type01 bi-location"
                                                           data-popup="space-edit-tool">지도에서 선택
                                                   </button>
                                               </div> -->
                                           </div>
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <div class="position-bottom btn-wrap">
                           <div>
                               <button type="button" class="btn basic bi-write2">등록</button>
                               <button type="button" class="btn basic bi-cancel">취소</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <button type="button" class="popup-close" title="닫기"></button>

<!-- 업무 > 시설관리 > 상수수도시설 > 소방시설 상세보기 end -->