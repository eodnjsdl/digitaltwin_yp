<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<style type="text/css">
	.popup-panel.popup-sub .swlManhPs-popup-close {
	    top: 0;
	    right: 0;
	    width: 39px;
	    height: 39px;
	    border-left: 1px solid #44516A;
	    background: url(/images/icon/popup-close2.svg) no-repeat 50% 50%;
	    border-top-right-radius: 10px;
	    position: absolute;
	}
</style>

<script type="text/javascript">

$(document).ready(function(){
	//console.log("updateSwlManhPsView.jsp");

	//3d 일때 지도 추가 버튼 삭제 
	if(dtmap.mod == "3D"){
		if($("#updateSwlManhPsFrm .btn-select-map").css("display") != 'none'){
			$("#updateSwlManhPsFrm .btn-select-map").hide();
		}
	}
	
	// 날짜 형식 처리 예정 
	// 현재 db column 길이는 8~9자리 로 되어 었음 
	$(".datepicker").datepicker({
		showOn: "both",
		buttonImage: "/images/icon/form-calendar.svg",
		dateFormat: "yymmdd",
	});
	
	// 날짜 - 10자리(yyyy-mm-dd) 적용시 사용
	//ui.callDatePicker();
	
	// selectbox 값 세팅
	let hjd_cde = '${swlManhPsVO.hjd_cde}';
	getCmmCodeData("YPE001", "#updateSwlManhPsFrm select[name=hjd_cde]", hjd_cde);	// 읍면동 
	
	let mng_cde = '${swlManhPsVO.mng_cde}';
	getCmmCodeData("MNG-001", "#updateSwlManhPsFrm select[name=mng_cde]", mng_cde);	// 관리기관 
	
	let smu_cde = '${swlManhPsVO.smu_cde}';
	getCmmCodeData("OGC-013", "#updateSwlManhPsFrm select[name=smu_cde]", smu_cde);	// 하수맨홀용도 
      	
	let for_cde = '${swlManhPsVO.for_cde}';
	getCmmCodeData("OGC-001", "#updateSwlManhPsFrm select[name=for_cde]", for_cde);	// 시설물형태 
    
	let som_cde = '${swlManhPsVO.som_cde}';
	getCmmCodeData("OGC-002", "#updateSwlManhPsFrm select[name=som_cde]", som_cde);	// 맨홀종류 
	
	let sbc_cde = '${swlManhPsVO.sbc_cde}';
	getCmmCodeData("OGC-014", "#updateSwlManhPsFrm select[name=sbc_cde]", sbc_cde);	// 뚜껑재질 
      	
	let ivt_cde = '${swlManhPsVO.ivt_cde}';
	getCmmCodeData("OGC-015", "#updateSwlManhPsFrm select[name=ivt_cde]", ivt_cde);	// 인버트유무 
	
	let lad_cde = '${swlManhPsVO.lad_cde}';
	getCmmCodeData("OGC-016", "#updateSwlManhPsFrm select[name=lad_cde]", lad_cde);	// 사다리설치유무 
      	
	let cst_cde = '${swlManhPsVO.cst_cde}';
	getCmmCodeData("OGC-010", "#updateSwlManhPsFrm select[name=cst_cde]", cst_cde);	// 이상상태 
    
	//gird 데이터를 통한 주소 조회
	var id =  $("input[name=id]").val();
	
	var geomData = getGeomDataForGridId(id);
	if (geomData) {
		getAddressForPoint(geomData, "#rightSubPopup .txt-geometry-address");
		$("#rightSubPopup input[name=geom]").val(geomData);
	} else {
		console.log("상세보기 좌표 오류");
	}
	
	// 지도에서 선택 화면 호출
	$(".btn-select-map", this).on("click", function () {
		ui.loadingBar("show");
		
		$('.space-edit-tool').load("/job/fcts/editView.do", () => {
			if(!$(".space-edit-tool").hasClass("opened")) {
				$(".space-edit-tool").addClass("opened");
				$(".space-edit-tool").draggable();
			}

			$.getJSON(
				"/com/mngr/info/selectAllLayerManageList.do"
			).done((response) => {
				var list = response["list"];
				
				let tag = `<option value="">시설물</option>`;
				for(var i = 0; i < list.length; i++){
					const name 	= list[i].tblNm.toLowerCase();
					const title = list[i].lyrNm;
					tag += `<option value=`+name+`>`+title+`</option>`; 
				}
				$(".space-edit-tool select[name=edit-snap-target]").html(tag);
			}); 

			var obj = {};
			obj.geometryType = "point";
			geoEditBindEvents(obj);

			ui.loadingBar("hide");
		});
	});
});

//취소 버튼 동작
function cancelUpdateSwlManhPs() {
	$(".swlManhPs-popup-close").closest('.popup-panel').removeClass('opened');
       // 초기화 (지도)
       dtmap.draw.dispose();
       dtmap.draw.clear();
       
	if($(".space-edit-tool").hasClass("opened")) {
		clearSpaceEditTool();	//공간정보 편집창 닫기
	}
	
	var id = $("input[name=id]").val();
	selectSwlManhPs(id);	// 상세보기로 이동
}
	
</script>

<!-- 업무 > 시설관리 > 하수도시설 > 하수맨홀 수정하기 -->
<div class="popup-header">하수맨홀 수정하기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="scroll-y">
				<div class="data-default">
					<form id="updateSwlManhPsFrm" method="post">
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
									<c:out value="${swlManhPsVO.ftr_cde_nm}"/>
									<input type="hidden" name="ftr_cde" class="form-control" value="${swlManhPsVO.ftr_cde}">
								</td>
								<th scope="row">관리번호</th>
								<td>
									<c:out value="${swlManhPsVO.ftr_idn}"/>
									<input type="hidden" name="ftr_idn" class="form-control" value="${swlManhPsVO.ftr_idn}">
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
									<input type="text" name="sht_num" class="form-control" value="${swlManhPsVO.sht_num}" maxlength="11">
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
									<input type="text" name="ist_ymd" class="form-control datepicker" value="${swlManhPsVO.ist_ymd}">
								</td>
							</tr>
							<tr>
								<th scope="row">최종준설일자</th>
								<td>
									<input type="text" name="ecn_ymd" class="form-control datepicker" value="">
								</td>
								<th scope="row">하수맨홀용도</th>
								<td>
									<select name="smu_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row">시설물형태</th>
								<td>
									<select name="for_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
								<th scope="row">맨홀종류</th>
								<td>
									<select name="som_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row">하수맨홀구경</th>
								<td>
									<input type="number" name="man_dip" class="form-control" value="${swlManhPsVO.man_dip}">
								</td>
								<th scope="row">하수맨홀가로</th>
								<td>
									<input type="number" name="man_hol" class="form-control" value="${swlManhPsVO.man_hol}">
								</td>
							</tr>
							<tr>
								<th scope="row">하수맨홀세로</th>
								<td>
									<input type="number" name="man_vel" class="form-control" value="${swlManhPsVO.man_vel}">
								</td>
								<th scope="row">뚜껑재질</th>
								<td>
									<select name="sbc_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row">인버트유무</th>
								<td>
									<select name="ivt_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
								<th scope="row">사다리설치유무</th>
								<td>
									<select name="lad_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row">하수맨홀고도</th>
								<td>
									<input type="number" name="mos_hsl" class="form-control" value="${swlManhPsVO.mos_hsl}">
								</td>
								<th scope="row">하수맨홀저고</th>
								<td>
									<input type="number" name="lms_hsl" class="form-control" value="${swlManhPsVO.lms_hsl}">
								</td>
							</tr>
							<tr>
								<th scope="row">이상상태</th>
								<td>
									<select name="cst_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
								<th scope="row">공사번호</th>
								<td>
									<input type="text" name="cnt_num" class="form-control" value="${swlManhPsVO.cnt_num}" maxlength="50">
								</td>
							</tr>
							<tr>
								<th scope="row">방향각</th>
								<td colspan="3">
									<input type="number" name="ang_dir" class="form-control" min="0" value="${swlManhPsVO.ang_dir}">
								</td>
							</tr>
							<tr>
								<th scope="row">위치</th>
								<td colspan="3">
									<div class="form-row">
										<div class="col">
											<input type="text" class="form-control txt-geometry-address" value="" readonly="readonly">
											<input type="hidden" name="geom" class="form-control" value="">
											<input type="hidden" name="id" value="${id}">
										</div>                    
										<div class="col-auto">
											<button type="button" class="btn type01 bi-location btn-select-map" data-popup="space-edit-tool">지도에서 선택</button>
										</div>                  
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					</form>
				</div>
			</div>
			<div class="position-bottom btn-wrap">
				<div>
					<button type="button" class="btn basic bi-edit btn_add" onclick="updateSwlManhPs();">등록</button>
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="cancelUpdateSwlManhPs()">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기" onclick="cancelMode();"></button> -->
<button type="button" class="swlManhPs-popup-close" title="닫기" onclick="cancelUpdateSwlManhPs()"></button>
<!-- //업무 > 시설관리 > 하수도시설 > 하수맨홀 수정하기 end -->