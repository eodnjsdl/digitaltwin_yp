// 메모정보 목록 호출
function aj_selectMemoInfoList(frm){
	ui.loadingBar("show");
	var formData = new FormData(frm);
	$.ajax({
		type : "POST",
		url : "/cmt/mmi/selectMemoList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {				
				$("#rightPopup").html(returnData);
				$("input[name='sortKind']:radio" ).on("change", function () {
					fn_select_memo_list();
				});
				$("input:checkbox[id='memoOrder2']").prop("checked", true);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});

}

function _onDrawEnd_memo(e) {
	dtmap.draw.dispose();
	var geom = e.geometry;
	const position = geom.getFlatCoordinates();
	var xObj = parseFloat(position[0]);
	var yObj = parseFloat(position[1]);
	cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
		$("#loc_memo").val(result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([xObj, yObj]);
		const wkt = format.writeGeometry(point);
		$("#wkt").val(wkt);
	});
}

// 메모 지도에서 선택
function aj_selectMemoLocation() {
	// cmmUtil.getPosition(reverseMemoGeo);
	dtmap.draw.active({type: 'Point', once: true});
	dtmap.on('drawend', _onDrawEnd_memo);
}

// function reverseMemoGeo(poinx,pointy){
// 	cmmUtil.reverseGeocoding(poinx, pointy).done((result)=>{
//
// 		$("#loc_memo").val(result["address"]);
// 		const format = new ol.format.WKT();
// 		const point = new ol.geom.Point([poinx, pointy]);
// 		const wkt = format.writeGeometry(point);
// 		$("#wkt").val(wkt);
//
// 	});
// }


// 메모정보 등록화면 호출
function aj_insertMemoInfoView(frm){
	ui.loadingBar("show");
	var formData = new FormData(frm);
	$.ajax({
		type : "POST",
		url : "/cmt/mmi/insertMemoInfoView.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {				
				$("#rightPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

// 메모정보 수정화면 호출
function aj_updateMemoInfoView(id,frm){

	ui.loadingBar("show");
	var formData = new FormData(frm);
	if(id!=null){
//		formData.append('memoId', id);
	}
	
	$.ajax({
		type : "POST",
		url : "/cmt/mmi/updateMemoInfoView.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {				
				$("#rightPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

// 메모정보 상세조회 화면 호출
function aj_selectMemoInfoView(id,frm){
	ui.loadingBar("show");
	var formData = new FormData(frm);
	if(id!=null){
		formData.append('memoId', id);
	}

	$.ajax({
		type : "POST",
		url : "/cmt/mmi/selectMemoInfoView.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {				
				$("#rightPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

// 메모정보 등록
function aj_insertMemoInfo(frm){
	var formData = new FormData(frm);
	ui.loadingBar("show");
	$.ajax({
		type : "POST",
		url : "/cmt/mmi/insertMemoInfo.do",
		data : formData,
		dataType : "json",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(returnData.result == "success") {
				toastr.success("정상적으로 등록했습니다.");
				// rightPopupOpen('memoInfo');
				aj_selectMemoInfoList($("#insertFormMemo")[0]);
			} else if (returnData.result == "fail"){
				toastr.error("등록을 실패했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

// 메모정보 수정
function aj_updateMemoInfo(frm){
	var formData = new FormData(frm);
	ui.loadingBar("show");
	$.ajax({
		type : "POST",
		url : "/cmt/mmi/updateMemoInfo.do",
		data : formData,
		dataType : "json",
		processData : false,
		contentType : false,
		async: false,
		frm: frm,
		success : function(returnData, status){
			if(returnData.result == "success") {
				toastr.success("메모정보를 성공적으로 수정하였습니다.");
				aj_selectMemoInfoView(null,this.frm);
			} else if (returnData.result == "fail"){
				toastr.error("메모정보를 수정하는데 실패하였습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

// 메모정보 삭제
function aj_deleteMemoInfo(frm){
	var formData = new FormData(frm);
	ui.loadingBar("show");
	$.ajax({
		type : "POST",
		url : "/cmt/mmi/deleteMemoInfo.do",
		data : formData,
		dataType : "json",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(returnData.result == "success") {
				toastr.success("메모정보를 성공적으로 삭제하였습니다.");
				
				// rightPopupOpen('memoInfo');
				ui.openPopup("rightPopup");
				aj_selectMemoInfoList($("#tmpForm")[0]);
			} else if (returnData.result == "fail"){
				toastr.error("메모정보를 삭제하는 데 실패하였습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

