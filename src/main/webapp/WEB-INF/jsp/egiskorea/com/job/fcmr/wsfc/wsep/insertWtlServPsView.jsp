<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<!-- 업무 > 시설관리 > 상수수도시설 > 배수지 등록하기-->

       	<div class="popup-header">배수지 등록하기</div>
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
									<tbody id="lSrchOptions">
										<tr>
	                                       	<th scope="row">지형지물부호</th>
	                                       	<td>
	                                          	<select name="ftr_cde" class="form-select">
	                                          		<option value="SA114" selected="selected">배수지</option>
	                                          	</select>
	                                       	</td>
	                                       	<th scope="row">관리번호</th>
	                                       	<td>
	                                       	  	<input type="number" name="ftr_idn" class="form-control" value="" readonly="readonly">
	                                       	</td>
	                                   	</tr>
										<tr>
											<th scope="row">읍면동</th>
											<td>
				                                <select name="hjd_cde" class="form-select">
				                                	<option value="">선택</option>
				                                </select>
											</td>
											<th scope="row">도엽번호</th>
											<td>
												<input type="text" name="sht_num" class="form-control" value="" maxlength="11">
											</td>
										</tr>
										<tr>
											<th scope="row">관리기관</th>
											<td>
												<select name="mng_cde" class="form-select">
				                                	<option value="">선택</option>
				                                </select>
											</td>
											<th scope="row">준공일자</th>
											<td>
											    <input type="text" name="fns_ymd" class="form-control datepicker" value="" id="dp1680677660036">
											</td>
										</tr>
										<tr>
											<th scope="row">배수지명</th>
											<td>
												<input type="text" name="srv_nam" class="form-control" value="">
											</td>
											<th scope="row">정수장명</th>
											<td>
												<input type="text" name="pur_nam" class="form-control" value="">
											</td>
										</tr>
										<tr>
											<th scope="row">부지면적</th>
											<td>
												<input type="number" name="gai_ara" class="form-control" value="">
											</td>
											<th scope="row">관리방법</th>
											<td>
												<select name="sag_cde" class="form-select">
				                                	<option value="">선택</option>
				                                </select>
											</td>
										</tr>
										<tr>
											<th scope="row">시설용량</th>
											<td>
												<input type="number" name="srv_vol" class="form-control" value="">
											</td>
											<th scope="row">최고수위</th>
											<td>
	                                       	  	<input type="number" name="hgh_wal" class="form-control" value="">
											</td>
										</tr>
										<tr>
											<th scope="row">최저수위</th>
											<td>
												<input type="number" name="low_wal" class="form-control" value="">
											</td>
											<th scope="row">배수지유입량</th>
											<td>
												<input type="number" name="isr_vol" class="form-control" value="">
											</td>
										</tr>
										<tr>
											<th scope="row">급수지역</th>
											<td>
												<input type="text" name="sup_are" class="form-control" value="">
											</td>
											<th scope="row">급수인구</th>
											<td>
												<input type="number" name="sup_pop" class="form-control" value="">
											</td>
										</tr>
										<tr>
											<th scope="row">배수지제어방법</th>
											<td>
												<select name="scw_cde" class="form-select">
				                                	<option value="">선택</option>
				                                </select>
											</td>
											<th scope="row">공사번호</th>
											<td>
												<input type="text" name="cnt_num" class="form-control" value="">
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
										                <button type="button" class="btn type01 bi-location btn-select-map" data-popup="space-edit-tool"></button>
										            </div>
										        </div>
										    </td>
										</tr>
									</tbody>
								</table>
							</div>
                       </div>
                       <div class="position-bottom btn-wrap">
                           <div>
                           	    <button type="button" class="btn basic bi-edit btn_add">등록</button>
                           		<button type="button" class="btn basic bi-cancel btn_cancel">취소</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <button type="button" class="popup-close" title="닫기" onclick="cancelMode();"></button>

<!-- 업무 > 시설관리 > 상수수도시설 > 배수지 등록하기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		console.log("insertWtlServPsView.jsp");
	    
		// 날짜 형식 처리 예정 
	    // 날짜 적용 - 지금 8자리로 되어 있어 이것 사용 (변경 예정) 
		// 현재 db column 길이는 8~9자리 로 되어 었음 
	  	$(".datepicker").datepicker({
	        showOn: "both",
	        buttonImage: "/images/icon/form-calendar.svg",
	        dateFormat: "yymmdd",
	    }); 
	    
		// 날짜 - 10자리(yyyy-mm-dd) 적용시 사용
	  	//ui.callDatePicker();
	    
	});

</script>