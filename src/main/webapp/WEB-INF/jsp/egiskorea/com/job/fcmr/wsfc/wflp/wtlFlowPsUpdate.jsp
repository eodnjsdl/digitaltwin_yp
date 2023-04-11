<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<script>

</script>
<!-- 업무 > 시설관리 > 상수도시설 > 유량계 수정하기 -->
<div class="popup-header">유량계 수정하기</div>
<button type="button" class="popup-close" onClick="toastr.warning('removeLayer(); cmmUtil.drawClear();', 'onclick 이벤트');" title="닫기"></button>
<!-- //업무 > 시설관리 > 상수도시설 > 유량계 수정하기 -->
<div class="popup-body">
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
							<td id="ftr_cde"></td>
							<th scope="row">관리번호</th>
							<td id="ftr_idn"></td>
						</tr>
						<tr>
							<th scope="row">행정읍면동</th>
							<td>
                                <select name="hjd_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
							<th scope="row">관리기관</th>
							<td>
								<select name="mng_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
						</tr>
						<tr>
							<th scope="row">도엽번호</th>
							<td>
								<input type="text" name="sht_num" class="form-control" value="" maxlength="11">
							</td>
							<th scope="row">설치일자</th>
							<td>
								<div class="datapicker-group">
								    <input type="text" name="ist_ymd" class="datepicker hasDatepicker" value="" id="" autocomplete="off">
								    <button type="button" class="ui-datepicker-trigger">
								        <img src="../images/icon/form-calendar.svg" alt="..." title="...">
								    </button>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">유량계종류</th>
							<td>
								<select name="gag_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
							<th scope="row">유량계형식</th>
							<td>
								<select name="mof_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
						</tr>
						<tr>
							<th scope="row">관경(mm)</th>
							<td>
								<input type="number" name="std_dip" class="form-control" value="">
							</td>
							<th scope="row">제작회사명</th>
							<td>
								<input type="text" name="prc_nam" class="form-control" value="" maxlength="100">
							</td>
						</tr>
						<tr>
							<th scope="row">관로지형지물부호</th>
							<td id="pip_cde"></td>
							<th scope="row">관로관리번호</th>
							<td id="pip_idn"></td>
						</tr>
						<tr>
							<th scope="row">공사번호</th>
							<td>
								<input type="text" name="cnt_num" class="form-control" value="" maxlength="8">
							</td>
							<th scope="row">방향각</th>
							<td>
								<input type="number" name="ang_dir" class="form-control" value="">
							</td>
						</tr>
						<tr>
						    <th scope="row">위치</th>
						    <td colspan="3">
						        <div class="form-row">
						            <div class="col">
						                <input type="text" name="geom" class="form-control txt-geometry-address" value="" readonly="readonly">
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
		<div class="position-bottom btn-wrap justify-content-end">
			<div><button type="button" class="btn basic bi-write2">수정완료</button> <button type="button" class="btn basic bi-cancel" onclick="">취소</button></div>
		</div>
	</div>
</div>