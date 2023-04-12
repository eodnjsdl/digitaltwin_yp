<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<!-- 업무 > 시설관리 > 상수도시설 > 배수지 수정하기 -->
<div class="popup-header">배수지 수정하기</div>
<button type="button" class="popup-close" onClick="toastr.warning('removeLayer(); cmmUtil.drawClear();', 'onclick 이벤트');" title="닫기"></button>
<!-- //업무 > 시설관리 > 상수도시설 > 배수지 수정하기 -->
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
                                <select name="hjd_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
							<th scope="row">도엽번호</th>
							<td>
								<input type="text" name="sht_num" class="form-control" value="${wtlPrgaPsVO.sht_num }" maxlength="11">
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
							    <input type="text" name="ist_ymd" class="form-control datepicker " value="${wtlPrgaPsVO.ist_ymd }" id="dp1680677660036">
							</td>
						</tr>
						<tr>
							<th scope="row">배수지종류</th>
							<td>
								<select name="pga_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
							<th scope="row">배수지형식</th>
							<td>
								<select name="mof_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
						</tr>
						<tr>
							<th scope="row">관경(mm)</th>
							<td>
								<input type="number" name="std_dip" class="form-control" value="${wtlPrgaPsVO.std_dip }">
							</td>
							<th scope="row">기준압력</th>
							<td>
								<input type="number" name="std_saf" class="form-control" value="${wtlPrgaPsVO.std_saf }">
							</td>
						</tr>
						<tr>
							<th scope="row">평균압력</th>
							<td>
								<input type="number" name="avg_saf" class="form-control" value="${wtlPrgaPsVO.avg_saf }">
							</td>
							<th scope="row">측정압력</th>
							<td>
								<input type="number" name="msr_saf" class="form-control" value="${wtlPrgaPsVO.msr_saf }">
							</td>
						</tr>
						<tr>
							<th scope="row">배수관_관경</th>
							<td>
								<input type="number" name="srv_dip" class="form-control" value="${wtlPrgaPsVO.srv_dip }">
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
								<input type="text" name="cnt_num" class="form-control" value="${wtlPrgaPsVO.cnt_num }" maxlength="8">
							</td>
						</tr>
						<tr>
							<th scope="row">방향각</th>
							<td colspan="3">
								<input type="number" name="ang_dir" class="form-control" value="${wtlPrgaPsVO.ang_dir }">
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
<!-- 업무 > 시설관리 > 상수도시설 > 배수지 수정하기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		console.log("updateWtlPrgaPsView.jsp");
        
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
		let hjd_cde = '${wtlPrgaPsVO.hjd_cde }';
      	getCmmCodeData("YPE001", "#rightSubPopup select[name=hjd_cde]", hjd_cde);
      	
      	//관리기관
		let mng_cde = '${wtlPrgaPsVO.mng_cde }';
      	getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]", mng_cde);
      	
      	//배수지종류
      	let pga_cde = '${wtlPrgaPsVO.pga_cde }';
      	getCmmCodeData("OGC-137", "#rightSubPopup select[name=pga_cde]", pga_cde);
      	
      	//배수지형식
      	let mof_cde = '${wtlPrgaPsVO.mof_cde }';
      	getCmmCodeData("OGC-041", "#rightSubPopup select[name=mof_cde]", mof_cde);
      	
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