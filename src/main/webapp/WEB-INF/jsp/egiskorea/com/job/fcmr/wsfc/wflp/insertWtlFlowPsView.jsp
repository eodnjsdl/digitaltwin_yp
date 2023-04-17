<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<style type="text/css">
	.popup-panel.popup-sub .insert-wtlFlowPs-popup-close {
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

<!-- 업무 > 시설관리 > 상수수도시설 > 유량계 등록하기-->

       	<div class="popup-header">유량계 등록하기</div>
           <div class="popup-body">
               <div class="sub-popup-body">
                   <div class="data-write-wrap" style="height: 100%;">
                       <div class="scroll-y">
                           <form id="insertWtlFlowPsForm" method="post">
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
	                                          	<select name="ftr_cde" class="form-select">
	                                          		<option value="SA117" selected="selected">유량계</option>
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
											    <input type="text" name="ist_ymd" class="form-control datepicker" value="" id="dp1680677660036">
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
											<td>
												<select name="pip_cde" class="form-select">
				                                	<option value="SA001" selected="selected">상수관로</option>
				                                </select>
											</td>
											<th scope="row">관로관리번호</th>
											<td>
	                                       	  	<input type="text" name="pip_idn" class="form-control" value="" readonly="readonly">
											</td>
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
							</div>
							</form>
                       </div>
                       <div class="position-bottom btn-wrap">
                           <div>
                           	    <button type="button" class="btn basic bi-edit btn_add" onclick="insertWtlFlowPs();">등록</button>
                           		<button type="button" class="btn basic bi-cancel btn_cancel" onclick="cancelInsertWtlFlowPs()">취소</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <button type="button" class="insert-wtlFlowPs-popup-close" title="닫기" onclick="cancelMode();"></button>

<!-- 업무 > 시설관리 > 상수수도시설 > 유량계 등록하기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		console.log("insertWtlFlowPsView.jsp");
        
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
		
		
     	// 지도에서 선택 화면 호출
        $(".btn-select-map", this).on("click", function () {
        	console.log('지도 선택 화면');
        	console.log(this);
        	
        	ui.loadingBar("show");
            $('.space-edit-tool').load("/job/fcts/editView.do", () => {
            	
                //this.initUi();
                
                //선, 면 데이터면 좌표 입력 창 암보이게 수정
                //if (!(this.geometryType == "point" || this.geometryType == "multipoint")) {
		            //$(".tr_coordinate", this.selector).hide();
		        //}
                
                //this.bindEvents();
                //this.loadSnap();
            	if(!$(".space-edit-tool").hasClass("opened")){
                	$(".space-edit-tool").addClass("opened");
                	$(".space-edit-tool").draggable();
                }
                
               	$.getJSON(
			        "/com/mngr/info/selectAllLayerManageList.do"
			   	).done((response) => {
			    	//console.log(response);  
			    	//console.log(response["list"]);
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
              
               	geoEditBindEvents(obj);
                
                ui.loadingBar("hide");
            });
        });
     	
     	//////////////////
     	
     	//등록창 닫기
     	$(".popup-panel .insert-wtlFlowPs-popup-close").on("click", function () {
             cancelInsertWtlFlowPs();
     	});
     	
	});
	
	//취소 버튼 동작
	function cancelInsertWtlFlowPs() {
		//console.log("cancelInsertWtlFlowPs()");
		
		$(".insert-wtlFlowPs-popup-close").closest('.popup-panel').removeClass('opened');
        // 초기화 (지도)
        dtmap.draw.dispose();
        dtmap.draw.clear();
	}
	

</script>