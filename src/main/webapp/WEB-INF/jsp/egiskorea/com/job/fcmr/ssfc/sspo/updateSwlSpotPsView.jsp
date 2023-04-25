<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<style type="text/css">
	.popup-panel.popup-sub .swlSpotPs-popup-close {
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
	//console.log("updateSwlSpotPsView.jsp");

	//3d 일때 지도 추가 버튼 삭제 
	if(dtmap.mod == "3D"){
		if($("#updateSwlSpotPsFrm .btn-select-map").css("display") != 'none'){
			$("#updateSwlSpotPsFrm .btn-select-map").hide();
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
	let hjd_cde = '${swlSpotPsVO.hjd_cde}';
	getCmmCodeData("YPE001", "#updateSwlSpotPsFrm select[name=hjd_cde]", hjd_cde);	// 읍면동 
	
	let mng_cde = '${swlSpotPsVO.mng_cde}';
	getCmmCodeData("MNG-001", "#updateSwlSpotPsFrm select[name=mng_cde]", mng_cde);	// 관리기관 
	
	let sbd_cde = '${swlSpotPsVO.sbd_cde}';
	getCmmCodeData("OGC-043", "#updateSwlSpotPsFrm select[name=sbd_cde]", sbd_cde);	// 물받이용도 
      	
	let for_cde = '${swlSpotPsVO.for_cde}';
	getCmmCodeData("OGC-001", "#updateSwlSpotPsFrm select[name=for_cde]", for_cde);	// 시설물형태 
    
	let cov_cde = '${swlSpotPsVO.cov_cde}';
	getCmmCodeData("OGC-133", "#updateSwlSpotPsFrm select[name=cov_cde]", cov_cde);	// 물받이뚜껑형태 
	
	let mop_cde = '${swlSpotPsVO.mop_cde}';
	getCmmCodeData("OGC-044", "#updateSwlSpotPsFrm select[name=mop_cde]", mop_cde);	// 관재질 
      	
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
function cancelUpdateSwlSpotPs() {
	$(".swlSpotPs-popup-close").closest('.popup-panel').removeClass('opened');
       // 초기화 (지도)
       dtmap.draw.dispose();
       dtmap.draw.clear();
       
	if($(".space-edit-tool").hasClass("opened")) {
		clearSpaceEditTool();	//공간정보 편집창 닫기
	}
	
	var id = $("input[name=id]").val();
	selectSwlSpotPs(id);	// 상세보기로 이동
}
	
</script>

<!-- 업무 > 시설관리 > 하수도시설 > 물받이 수정하기 -->
<div class="popup-header">물받이 수정하기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="scroll-y">
				<div class="data-default">
					<form id="updateSwlSpotPsFrm" method="post">
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
									<c:out value="${swlSpotPsVO.ftr_cde_nm}"/>
									<input type="hidden" name="ftr_cde" class="form-control" value="${swlSpotPsVO.ftr_cde}">
								</td>
								<th scope="row">관리번호</th>
								<td>
									<c:out value="${swlSpotPsVO.ftr_idn}"/>
									<input type="hidden" name="ftr_idn" class="form-control" value="${swlSpotPsVO.ftr_idn}">
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
									<input type="text" name="sht_num" class="form-control" value="${swlSpotPsVO.sht_num}" maxlength="11">
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
									<input type="text" name="ist_ymd" class="form-control datepicker" value="${swlSpotPsVO.ist_ymd}">
								</td>
							</tr>
							<tr>
								<th scope="row">최종준설일자</th>
								<td>
									<input type="text" name="ecn_ymd" class="form-control datepicker" value="${swlSpotPsVO.ecn_ymd}">
								</td>
								<th scope="row">물받이용도</th>
								<td>
									<select name="sbd_cde" class="form-select">
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
								<th scope="row">원형물받이내경</th>
								<td>
									<input type="number" name="spt_dip" class="form-control" value="${swlSpotPsVO.spt_dip}">
								</td>
							</tr>
							<tr>
								<th scope="row">각형물받이가로길이</th>
								<td>
									<input type="number" name="spt_hol" class="form-control" value="${swlSpotPsVO.spt_hol}">
								</td>
								<th scope="row">각형물받이세로길이</th>
								<td>
									<input type="number" name="spt_vel" class="form-control" value="${swlSpotPsVO.spt_vel}">
								</td>
							</tr>
							<tr>
								<th scope="row">평균수위</th>
								<td>
									<input type="number" name="spt_dep" class="form-control" min="0" value="${swlSpotPsVO.spt_dep}">
								</td>
								<th scope="row">물받이뚜껑형태</th>
								<td>
									<select name="cov_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row">관재질</th>
								<td>
									<select name="mop_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
								<th scope="row">공사번호</th>
								<td>
									<input type="text" name="cnt_num" class="form-control" value="${swlSpotPsVO.cnt_num}" maxlength="8">
								</td>
							</tr>
							<tr>
								<th scope="row">방향각</th>
								<td colspan="3">
									<input type="number" name="ang_dir" class="form-control" min="0" value="${swlSpotPsVO.ang_dir}">
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
			<div class="position-bottom btn-wrap justify-content-end">
				<div>
					<button type="button" class="btn basic bi-write2 btn_save" onclick="updateSwlSpotPs();">수정완료</button>
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="cancelUpdateSwlSpotPs()">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기" onclick="cancelMode();"></button> -->
<button type="button" class="swlSpotPs-popup-close" title="닫기" onclick="cancelUpdateSwlSpotPs()"></button>
<!-- //업무 > 시설관리 > 하수도시설 > 물받이 수정하기 end -->