<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<style type="text/css">
	.popup-panel.popup-sub .update-wtlManhPs-popup-close {
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

<!-- 업무 > 시설관리 > 상수도시설 > 상수맨홀 수정하기 -->
<div class="popup-header">상수맨홀 수정하기</div>
<div class="popup-body">
	<div class="data-write-wrap" style="height: 100%;">
		<div class="scroll-y">
			<form id="updateWtlManhPsForm" method="post">
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
                               	<c:out value="${wtlManhPsVO.ftr_cde_nm }"/>
                               	<input type="hidden" name="ftr_cde" class="form-control" value="${wtlManhPsVO.ftr_cde }">
                            </td>
							<th scope="row">관리번호</th>
							<td>
                               	<c:out value="${wtlManhPsVO.ftr_idn }"/>
                               	<input type="hidden" name="ftr_idn" class="form-control" value="${wtlManhPsVO.ftr_idn }">
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
								<input type="text" name="sht_num" class="form-control" value="${wtlManhPsVO.sht_num }" maxlength="11">
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
							    <input type="text" name="ist_ymd" class="form-control datepicker " value="${wtlManhPsVO.ist_ymd }" id="dp1680677660036">
							</td>
						</tr>
						<tr>
							<th scope="row">규격</th>
							<td>
								<input type="text" name="dpg_std" class="form-control" value="${wtlManhPsVO.dpg_std }">
							</td>
							<th scope="row">맨홀종류</th>
							<td>
								<select name="som_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
						</tr>
						<tr>
							<th scope="row">맨홀형태</th>
							<td>
								<select name="mhs_cde" class="form-select">
                                	<option value="">선택</option>
                                </select>
							</td>
							<th scope="row">공사번호</th>
							<td>
								<input type="text" name="cnt_num" class="form-control" value="${wtlManhPsVO.cnt_num }" maxlength="8">
							</td>
						</tr>
						<tr>
							<th scope="row">방향각</th>
							<td colspan="3">
								<input type="number" name="ang_dir" class="form-control" value="${wtlManhPsVO.ang_dir }">
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
			<input type="hidden" name="geom" 	value="" class="form-control">
            <input type="hidden" name="id" 	value="${id}">
		</div>
		<div class="position-bottom btn-wrap justify-content-end">
			<div>
				<button type="button" class="btn basic bi-write2 btn_save"		onclick="updateWtlManhPs();">수정완료</button>
				<button type="button" class="btn basic bi-cancel btn_cancel" 	onclick="cancelUpdateWtlManhPs();">취소</button>
			</div>
		</div>
	</div>
</div>
<button type="button" class="update-wtlManhPs-popup-close" title="닫기" onclick="cancelMode();"></button>
<!-- 업무 > 시설관리 > 상수도시설 > 상수맨홀 수정하기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		//console.log("updateWtlManhPsView.jsp");
		
		//3d 일때 지도 추가 버튼 삭제 
		if(dtmap.mod == "3D"){
			if($("#updateWtlManhPsForm .btn-select-map").css("display") != 'none'){
				$("#updateWtlManhPsForm .btn-select-map").hide();
			}
		}
        
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
		let hjd_cde = '${wtlManhPsVO.hjd_cde }';
      	getCmmCodeData("YPE001", "#rightSubPopup select[name=hjd_cde]", hjd_cde);
      	
      	//관리기관
		let mng_cde = '${wtlManhPsVO.mng_cde }';
      	getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]", mng_cde);
      	
      	//맨홀종류
      	let som_cde = '${wtlManhPsVO.som_cde }';
      	getCmmCodeData("OGC-002", "#rightSubPopup select[name=som_cde]", som_cde);
      	
      	//맨홀형태
      	let mhs_cde = '${wtlManhPsVO.mhs_cde }';
      	getCmmCodeData("OGC-006", "#rightSubPopup select[name=mhs_cde]", mhs_cde);
      	
		///////////////////////
      	//gird 데이터를 통한 주소 조회
		var id =  $("input[name=id]").val();
		
		var geomData = getGeomDataForGridId(id);
		if(geomData){
			getAddressForPoint(geomData, "#rightSubPopup .txt-geometry-address");
			$("#rightSubPopup input[name=geom]").val(geomData);
		}else{
			console.log("상세보기 좌표 오류");
		}
		
		// 지도에서 선택
        $(".btn-select-map", this.element).on("click", function () {
        	//console.log( '수정화면');
        	//alert(this);
        	
        	ui.loadingBar("show");
            $('.space-edit-tool').load("/job/fcts/editView.do", () => {
                
            	if(!$(".space-edit-tool").hasClass("opened")){
                	$(".space-edit-tool").addClass("opened");
                	$(".space-edit-tool").draggable();
                }
                
               	$.getJSON(
			        "/com/mngr/info/selectAllLayerManageList.do"
			   	).done((response) => {
			    	var list = response["list"];
			    	let tag = `<option value="">시설물</option>`;
			    	for(var i=0; i<list.length; i++){
			    		const name 	= list[i].tblNm.toLowerCase();
			    		const title = list[i].lyrNm;
			    		tag += `<option value=`+name+`>`+title+`</option>`; 
			    	}
			    	$(".space-edit-tool select[name=edit-snap-target]").html(tag);
			    }); 
               	
               	var obj = {};
               	obj.geometryType = "point";
               	obj.id = id;
              
               	geoEditBindEvents(obj);
                
                ui.loadingBar("hide");
            });
            
        });
		
		/////////////////////
		
		//닫기 버튼
        $(".popup-panel .update-wtlManhPs-popup-close").on("click", function () {
        	cancelUpdateWtlManhPs();
    	});
		
	});
	
	
	//수정하기 취소버튼 동작
	function cancelUpdateWtlManhPs(){
		//console.log("cancelUpdateWtlManhPs()");
		
		$(".update-wtlManhPs-popup-close").closest('.popup-panel').removeClass('opened');
        // 초기화 (지도)
        dtmap.draw.dispose();
        dtmap.draw.clear();
        
        if($(".space-edit-tool").hasClass("opened")){
	        clearSpaceEditTool();	//공간정보 편집창 닫기
        }
        
        var id = $("input[name=id]").val();
    	selectWtlManhPs(id);
	}

</script>