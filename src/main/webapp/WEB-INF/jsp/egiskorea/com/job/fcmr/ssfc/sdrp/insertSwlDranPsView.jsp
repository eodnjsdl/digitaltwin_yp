<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<style type="text/css">
	.popup-panel.popup-sub .swlDranPs-popup-close {
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
	//console.log("insertSwlDranPsView.jsp");

	//3d 일때 지도 추가 버튼 삭제 
	if(dtmap.mod == "3D"){
		if($("#insertSwlDranPsFrm .btn-select-map").css("display") != 'none'){
			$("#insertSwlDranPsFrm .btn-select-map").hide();
		}
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
function cancelInsertSwlDranPs() {
	$(".swlDranPs-popup-close").closest('.popup-panel').removeClass('opened');
       // 초기화 (지도)
       dtmap.draw.dispose();
       dtmap.draw.clear();
       
	if($(".space-edit-tool").hasClass("opened")) {
		clearSpaceEditTool();	//공간정보 편집창 닫기
	}
}
	
</script>

<!-- 업무 > 시설관리 > 하수도시설 > 하수처리장 등록하기 -->
<div class="popup-header">하수처리장 등록하기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="scroll-y">
				<div class="data-default">
					<form id="insertSwlDranPsFrm" method="post">
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
										<option value="SB200" selected="selected">하수처리장</option>
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
								<th scope="row">하수처리장명</th>
								<td colspan="3">
									<input type="text" name="drn_nam" class="form-control" value="">
								</td>
							</tr>
							<tr>
								<th scope="row">부지면적</th>
								<td>
									<input type="number" name="gai_ara" class="form-control" value="">
								</td>
								<th scope="row">개통상태</th>
								<td>
									<select name="soo_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row">처리구역면적</th>
								<td>
									<input type="number" name="adp_ara" class="form-control" value="">
								</td>
								<th scope="row">하수처리방식</th>
								<td>
									<select name="sbb_cde" class="form-select">
										<option value="">선택</option>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row">청천시처리용량</th>
								<td>
									<input type="number" name="pcc_vol" class="form-control" value="">
								</td>
								<th scope="row">우천시처리용량</th>
								<td>
									<input type="number" name="puc_vol" class="form-control" value="">
								</td>
							</tr>
							<tr>
								<th scope="row">설계유입수_수질</th>
								<td>
									<input type="text" name="qw1_exp" class="form-control" value="">
								</td>
								<th scope="row">설계유출수_수질</th>
								<td>
									<input type="text" name="qw2_exp" class="form-control" value="">
								</td>
							</tr>
							<tr>
								<th scope="row">차집관연장</th>
								<td>
									<input type="number" name="pip_len" class="form-control" value="">
								</td>
								<th scope="row">방류수역명</th>
								<td>
									<input type="text" name="dra_nam" class="form-control" value="">
								</td>
							</tr>
							<tr>
								<th scope="row">공사번호</th>
								<td>
									<input type="text" name="cnt_num" class="form-control" value="">
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
					<button type="button" class="btn basic bi-edit btn_add" onclick="insertSwlDranPs();">등록</button>
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="cancelInsertSwlDranPs()">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기" onclick="cancelMode();"></button> -->
<button type="button" class="swlDranPs-popup-close" title="닫기" onclick="cancelInsertSwlDranPs()"></button>
<!-- //업무 > 시설관리 > 하수도시설 > 하수처리장 등록하기 end -->