$(document).ready(function(){
	ui.callDatePicker();
	if(poiList != ""){
		// setPointLayer();
	}
});

// 지하수관리 셀렉트박스 체인지 함수
$("#changeBox").change(function(){
	// 열려있던 우측서브팝업창 닫기
	$("#rightSubPopup").removeClass("opened").html("");
	var thisValue = $(this).val();
	// cmmUtil.drawClear();
	// 농업용공공관정
	if(thisValue == 'underWaterAgri') {
		aj_selectUnderWaterMngList($("#tmpForm")[0]);
	// 지하수개발
	} else if(thisValue == 'underDevelop') {
		aj_selectUnderWaterDevelopList($("#tmpForm")[0]);
	// 지하수이용시설
	} else if(thisValue == 'underUseFacil') {
		aj_selectUnderWaterUseFacilList($("#tmpForm")[0]);
	} 
	
	// var LayerList = new Module.JSLayerList(true);
	//
	// if(LayerList.nameAtLayer("Line_Arr_Option")) {
	// 	LayerList.nameAtLayer("Line_Arr_Option").removeAll();
	// }

})

// 지하수관리 > 지하수이용시설 목록 호출
function aj_selectUnderWaterUseFacilList(form, searchType){
	
	ui.loadingBar("show");
	
	if(form == $("#tmpForm")[0]){
		ugagFlag = '';
		ugdvFlag = '';
		ugufFlag = '';
		ugagUi = '';
		ugdvUi = '';
		ugufUi = '';
	}
	
	var spitalSearch = '';
	var	formData = new FormData(form);
	
	// 공간검색
	if(searchType == 'spital' && ugufFlag == 'true') {
		spitalSearch = cmmUtil.spitalSearch('underWaterUseFacil');
	} else if (searchType == 'spital' && ugufFlag == 'false') {
		spitalSearch = lastSpitalSearch;
	}
	formData.set("spitalSearch", spitalSearch);
	
	$.ajax({
		type : "POST",
		url : "/job/ugtm/selectUnderWaterUseFacilList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#bottomPopup").html(returnData);
				
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				if(ugufUi == 'true'){
					$(".groundwaterProperty").removeClass("on");
					$(".groundwaterSpace").addClass("on");
					$("input[name=underWaterUseFacilSelect]:eq("+(lastSelect-1)+")").attr("checked", true); 
					if(lastSelect == 2){
						$(".spaceArea").show();
						$("input[name=underWaterUseFacilAreaDrawing]:eq("+(lastDraw-1)+")").attr("checked", true);
					}
					$("#bufferCnt").val(lastBufferCnt);
				}
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//지하수관리 > 지하수개발 목록 호출
function aj_selectUnderWaterDevelopList(form, searchType){
	
	ui.loadingBar("show");
	
	if(form == $("#tmpForm")[0]){
		ugagFlag = '';
		ugdvFlag = '';
		ugufFlag = '';
		ugagUi = '';
		ugdvUi = '';
		ugufUi = '';
	}
	
	var spitalSearch = '';
	var	formData = new FormData(form);
	
	// 공간검색
	if(searchType == 'spital' && ugdvFlag == 'true') {
		spitalSearch = cmmUtil.spitalSearch('underWaterDevelop');
	} else if (searchType == 'spital' && ugdvFlag == 'false') {
		spitalSearch = lastSpitalSearch;
	}
	formData.set("spitalSearch", spitalSearch);
	
	$.ajax({
		type : "POST",
		url : "/job/ugtm/selectUnderWaterDevelopList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#bottomPopup").html(returnData);
				
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				if(ugdvUi == 'true'){
					$(".groundwaterProperty").removeClass("on");
					$(".groundwaterSpace").addClass("on");
					$("input[name=underWaterDevelopSelect]:eq("+(lastSelect-1)+")").attr("checked", true); 
					if(lastSelect == 2){
						$(".spaceArea").show();
						$("input[name=underWaterDevelopAreaDrawing]:eq("+(lastDraw-1)+")").attr("checked", true);
					}
					$("#bufferCnt").val(lastBufferCnt);
				}
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
	
}

// 연도설정
var setYear = function(){
	
	var yearHtml = '';
	var date = new Date();
	var year = date.getFullYear();
	
	for(var i=0;i<30;i++){
		yearHtml += "<option value=" + (year-i) + ">" + (year-i) + "</option>";
	}
	
	$("#devlopYear").append(yearHtml);
	if(years != ""){
		$("#devlopYear").val(years);
	} else {
		$("#devlopYear").val(year);
	}
}

// '지도에서 선택' 버튼
$("#mapSelectBtn").unbind('click').bind('click',function(){
	// cmmUtil.getPositionGeom(positionCallback);
	toastr.warning("cmmUtil.getPositionGeom(positionCallback);", "지도 그리기 모드 + 맵 지도 클릭지점 좌표값 리턴");
});

// geom 값 넣기
function positionCallback(pointGeom, address){
	$("#adres").val("경기도 " + address);
	$("#geom").val(pointGeom);
}

//속성검색 공간검색 탭박스 change 이벤트시 도형 지워주기
/*$(document).on("click", ".tabBoxDepth2-wrap .tabBoxDepth2 > ul > li > .inner-tab", function(){ 
	$(".ugtmSrch").val('');
	cmmUtil.drawClear();
});*/


