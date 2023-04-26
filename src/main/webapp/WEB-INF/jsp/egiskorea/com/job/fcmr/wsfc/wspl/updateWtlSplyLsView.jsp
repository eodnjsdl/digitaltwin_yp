<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<style type="text/css">
	.popup-panel.popup-sub .update-wtlSplyLs-popup-close {
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

<!-- 업무 > 시설관리 > 상수도시설 > 급수관로 수정하기 -->
<div class="popup-header">급수관로 수정하기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="scroll-y">
				<form id="updateWtlSplyLsForm" method="post">
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
	                               	<c:out value="${wtlSplyLsVO.ftr_cde_nm }"/>
	                            </td>
	                            <th scope="row">관리번호</th>
	                            <td>
	                           	  	<c:out value="${wtlSplyLsVO.ftr_idn }"/>
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
									<input type="text" name="sht_num" class="form-control" value="${wtlSplyLsVO.sht_num }" maxlength="11">
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
								    <input type="text" name="ist_ymd" class="form-control datepicker " value="${wtlSplyLsVO.ist_ymd }" id="dp1680677660036">
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
									<input type="number" name="std_dip" class="form-control" value="${wtlSplyLsVO.std_dip }">
								</td>
								<th scope="row">연장</th>
								<td>
									<input type="number" name="byc_len" class="form-control" value="${wtlSplyLsVO.byc_len }">
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
									<input type="number" name="low_dep" class="form-control" value="${wtlSplyLsVO.low_dep }">
								</td>
							</tr>
							<tr>
								<th scope="row">최고깊이</th>
								<td>
									<input type="number" name="hgh_dep" class="form-control" value="${wtlSplyLsVO.hgh_dep }">
								</td>
								<th scope="row">공사번호</th>
								<td>
									<input type="text" name="cnt_num" class="form-control" value="${wtlSplyLsVO.cnt_num }">
								</td>
							</tr>
							<tr>
								<th scope="row">관라벨</th>
								<td colspan="3">
									<input type="text" name="org_idn" class="form-control" value="${wtlSplyLsVO.pip_lbl }">
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
				<input type="hidden" name="geom" value="" class="form-control">
	            <input type="hidden" name="id" 	value="${id}">
			</div>
			<div class="position-bottom btn-wrap justify-content-end">
				<div>
	           	    <button type="button" class="btn basic bi-write2 btn_save" 		onclick="updateWtlSplyLs();">수정완료</button>
	           		<button type="button" class="btn basic bi-cancel btn_cancel"	onclick="cancelUpdateWtlSplyLs();">취소</button>
	           </div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="update-wtlSplyLs-popup-close" title="닫기" onclick="cancelMode();"></button>

<!-- 업무 > 시설관리 > 상수도시설 > 급수관로 수정하기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		//console.log("updateWtlSplyLsView.jsp");
        
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
		let hjd_cde = '${wtlSplyLsVO.hjd_cde }';
      	getCmmCodeData("YPE001", "#rightSubPopup select[name=hjd_cde]", hjd_cde);
      	
      	//관리기관
      	let mng_cde = '${wtlSplyLsVO.mng_cde }';
      	getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]", mng_cde);
      	
      	//관용도
      	let saa_cde = '${wtlSplyLsVO.saa_cde }';
      	getCmmCodeData("OGC-004", "#rightSubPopup select[name=saa_cde]", saa_cde);
      	
      	//관재질
      	let mop_cde = '${wtlSplyLsVO.mop_cde }';
		getCmmCodeData("OGC-003", "#rightSubPopup select[name=mop_cde]", mop_cde);
		
      	//접합종류
      	let jht_cde = '${wtlSplyLsVO.jht_cde }';
		getCmmCodeData("OGC-005", "#rightSubPopup select[name=jht_cde]", jht_cde);
      	
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
        	console.log( '수정화면');
        	
        	ui.loadingBar("show");
            $('.space-edit-tool').load("/job/fcts/editView.do", () => {
            	
            	//선, 면 데이터면 좌표 입력 창 암보이게 수정
                if (!(this.geometryType == "point" || this.geometryType == "multipoint")) {
		           	$(".tr_coordinate", this.selector).hide();
		        }
                
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
               	obj.geometryType = "multilinestring";
               	obj.id = id;
              
               	geoEditBindEvents(obj);
                
                ui.loadingBar("hide");
            });
            
        });
		
		/////////////////////
		
		//닫기 버튼
        $(".popup-panel .update-wtlSplyLs-popup-close").on("click", function () {
        	cancelUpdateWtlPipeLm();
    	});
		
	});
	
	
	//수정하기 취소버튼 동작
	function cancelUpdateWtlSplyLs(){
		//console.log("cancelUpdateWtlSplyLs()");
		
		$(".update-wtlSplyLs-popup-close").closest('.popup-panel').removeClass('opened');
        // 초기화 (지도)
        dtmap.draw.dispose();
        dtmap.draw.clear();
        
        if($(".space-edit-tool").hasClass("opened")){
	        clearSpaceEditTool();	//공간정보 편집창 닫기
        }
        
        var id = $("input[name=id]").val();
    	selectWtlSplyLs(id);
	}

</script>