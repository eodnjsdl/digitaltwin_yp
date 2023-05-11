<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<style type="text/css">
	.popup-panel.popup-sub .swlSpewPs-popup-close {
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
	//console.log("insertSwlSpewPsView.jsp");

	//3d 일때 지도 추가 버튼 삭제 
	if(dtmap.mod == "3D"){
		if($("#insertSwlSpewPsFrm .btn-select-map").css("display") != 'none'){
			$("#insertSwlSpewPsFrm .btn-select-map").hide();
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
function cancelInsertSwlSpewPs() {
	$(".swlSpewPs-popup-close").closest('.popup-panel').removeClass('opened');
       // 초기화 (지도)
       dtmap.draw.dispose();
       dtmap.draw.clear();
       
	if($(".space-edit-tool").hasClass("opened")) {
		clearSpaceEditTool();	//공간정보 편집창 닫기
	}
}
	
</script>

<!-- 업무 > 시설관리 > 하수도시설 > 토구 등록하기 -->
<div class="popup-header">토구 등록하기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="scroll-y">
				<div class="data-default">
					<form id="insertSwlSpewPsFrm" method="post">
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
									<select name="ftr_cde" class="form-select">
										<option value="SB104" selected="selected">토구</option>
									</select>
								</td>
								<th scope="row">관리번호</th>
								<td>
									<input type="text" name="ftr_idn" class="form-control" value="" readonly="readonly">
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
								<th scope="row">설치일자</th>
								<td>
									<input type="text" name="ist_ymd" class="form-control datepicker" value="">
								</td>
							</tr>
							<tr>
								<th scope="row">토구용도</th>
								<td>
									<select name="vmt_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
								<th scope="row">시설물형태</th>
								<td>
									<select name="for_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row">원형토구내경</th>
								<td>
									<input type="number" name="spw_dip" class="form-control" value="">
								</td>
								<th scope="row">각형토구가로길이</th>
								<td>
									<input type="number" name="spw_hol" class="form-control" value="">
								</td>
							</tr>
							<tr>
								<th scope="row">각형토구세로길이</th>
								<td>
									<input type="number" name="spw_vel" class="form-control" value="">
								</td>
								<th scope="row">토구표고</th>
								<td>
									<input type="number" name="spw_hsl" class="form-control" min="0" value="">
								</td>
							</tr>
							<tr>
								<th scope="row">평균수위</th>
								<td>
									<input type="number" name="spw_wal" class="form-control" min="0" value="">
								</td>
								<th scope="row">하천명</th>
								<td>
									<input type="text" name="riv_nam" class="form-control" value="">
								</td>
							</tr>
							<tr>
								<th scope="row">계획방류량</th>
								<td>
									<input type="number" name="spw_saf" class="form-control" min="0" value="">
								</td>
								<th scope="row">배수구역지형지물부호</th>
								<td>
									<select name="dra_cde" class="form-select">
										<option value="SB310">배수구역</option>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row">배수구역관리번호</th>
								<td>
									<input type="number" name="dra_idn" class="form-control" value="">
								</td>
								<th scope="row">처리구역지형지물부호</th>
								<td>
									<select name="dsp_cde" class="form-select">
										<option value="SB300">처리구역</option>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row">처리구역관리번호</th>
								<td>
									<input type="number" name="dsp_idn" class="form-control" value="">
								</td>
								<th scope="row">공사번호</th>
								<td>
									<input type="text" name="cnt_num" class="form-control" value="" maxlength="8">
								</td>
							</tr>
							<tr>
								<th scope="row">방향각</th>
								<td colspan="3">
									<input type="number" name="ang_dir" class="form-control" min="0" value="">
								</td>
							</tr>
							<tr>
								<th scope="row">위치</th>
								<td colspan="3">
									<div class="form-row">
										<div class="col">
											<input type="text" class="form-control txt-geometry-address" value="" readonly="readonly">
											<input type="hidden" name="geom" class="form-control" value="">
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
					<button type="button" class="btn basic bi-edit btn_add" onclick="insertSwlSpewPs();">등록</button>
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="cancelInsertSwlSpewPs()">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기" onclick="cancelMode();"></button> -->
<button type="button" class="swlSpewPs-popup-close" title="닫기" onclick="cancelInsertSwlSpewPs()"></button>
<!-- //업무 > 시설관리 > 하수도시설 > 토구 등록하기 end -->