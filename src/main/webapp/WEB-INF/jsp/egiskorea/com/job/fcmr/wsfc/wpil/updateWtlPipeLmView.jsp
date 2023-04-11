<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<!-- 업무 > 시설관리 > 상수도시설 > 상수관로 수정하기 -->
<div class="popup-header">상수관로 수정하기</div>
<button type="button" class="popup-close" onClick="toastr.warning('removeLayer(); cmmUtil.drawClear();', 'onclick 이벤트');" title="닫기"></button>
<!-- //업무 > 시설관리 > 상수도시설 > 상수관로 수정하기 -->
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
                            <td>
                               	<c:out value="${wtlPipeLmVO.ftr_cde_nm }"/>
                            </td>
                            <th scope="row">관리번호</th>
                            <td>
                           	  	<c:out value="${wtlPipeLmVO.ftr_idn }"/>
                            </td>
						</tr>
						<tr>
							<th scope="row">행정읍면동</th>
							<td>
                                <select name="hjd_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
							<th scope="row">도엽번호</th>
							<td>
								<input type="text" name="sht_num" class="form-control" value="${wtlPipeLmVO.sht_num }" maxlength="11">
							</td>
						</tr>
						<tr>
							<th scope="row">관리기관</th>
							<td>
								<select name="mng_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
							<th scope="row">설치일자</th>
							<td>
							    <input type="text" name="ist_ymd" class="form-control datepicker " value="${wtlPipeLmVO.ist_ymd }" id="dp1680677660036">
							</td>
						</tr>
						<tr>
							<th scope="row">관용도</th>
							<td>
								<select name="saa_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
							<th scope="row">관재질</th>
							<td>
								<select name="mop_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
						</tr>
						<tr>
							<th scope="row">관경(mm)</th>
							<td>
								<input type="number" name="std_dip" class="form-control" value="${wtlPipeLmVO.std_dip }">
							</td>
							<th scope="row">연장</th>
							<td>
								<input type="number" name="byc_len" class="form-control" value="${wtlPipeLmVO.byc_len }">
							</td>
						</tr>
						<tr>
							<th scope="row">접합종류</th>
							<td>
								<select name="jht_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
							<th scope="row">최저깊이</th>
							<td>
								<input type="number" name="low_dep" class="form-control" value="${wtlPipeLmVO.low_dep }">
							</td>
						</tr>
						<tr>
							<th scope="row">최고깊이</th>
							<td>
								<input type="number" name="hgh_dep" class="form-control" value="${wtlPipeLmVO.hgh_dep }">
							</td>
							<th scope="row">공사번호</th>
							<td>
								<input type="text" name="cnt_num" class="form-control" value="${wtlPipeLmVO.cnt_num }">
							</td>
						</tr>
						<tr>
							<th scope="row">탐사구분</th>
							<td>
								<input type="text" name="iqt_cde" class="form-control" value="${wtlPipeLmVO.iqt_cde }">
							</td>
							<th scope="row">관라벨</th>
							<td>
								<input type="text" name="org_idn" class="form-control" value="${wtlPipeLmVO.pip_lbl }">
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

<!-- 업무 > 시설관리 > 상수도시설 > 상수관로 수정하기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		console.log("updateWtlPipeLmView.jsp");
        
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

		//////////////////
		//selectbox 값 세팅
		
      	//읍면동 
		let hjd_cde = '${wtlPipeLmVO.hjd_cde }';
      	getCmmCodeData("YPE001", "#rightSubPopup select[name=hjd_cde]", hjd_cde);
      	
      	//관리기관
      	let mng_cde = '${wtlPipeLmVO.mng_cde }';
      	getCmmCodeData("MNG-001", "#lSrchOptions select[name=mng_cde]", mng_cde);
      	
      	//관용도
      	let saa_cde = '${wtlPipeLmVO.saa_cde }';
      	getCmmCodeData("OGC-004", "#lSrchOptions select[name=saa_cde]", saa_cde);
      	
      	//관재질
      	let mop_cde = '${wtlPipeLmVO.mop_cde }';
		getCmmCodeData("OGC-003", "#lSrchOptions select[name=mop_cde]", mop_cde);
		
      	//접합종류
      	let jht_cde = '${wtlPipeLmVO.jht_cde }';
		getCmmCodeData("OGC-005", "#lSrchOptions select[name=jht_cde]", jht_cde);
      	
      	///////////////////////
      	//gird 데이터를 통한 주소 조회
		var gridRowId = "${gridRowId }";
		
		var geomData = getGeomDataForGridRowId(gridRowId);
		console.log("geomData>>");
		console.log(geomData);
		if(geomData){
			getAddressForPoint(geomData, "#rightSubPopup .txt-geometry-address");
		}else{
			console.log("상세보기 좌표 오류");
		}
        
	});

</script>