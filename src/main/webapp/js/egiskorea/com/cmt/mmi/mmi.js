// 메모정보 목록 호출
function aj_selectMemoInfoList(frm){
	loadingShowHide("show");
	
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
				alert("ERROR!");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});


}

// 메모 지도에서 선택
function aj_selectMemoLocation() {
	cmmUtil.getPosition(reverseMemoGeo);
}
function reverseMemoGeo(poinx,pointy){
	cmmUtil.reverseGeocoding(poinx, pointy).done((result)=>{

		$("#loc_memo").val(result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([poinx, pointy]);
		const wkt = format.writeGeometry(point);
		$("#wkt").val(wkt);

	});
}


// 메모정보 등록화면 호출
function aj_insertMemoInfoView(frm){
	loadingShowHide("show");
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
				alert("ERROR!");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

// 메모정보 수정화면 호출
function aj_updateMemoInfoView(id,frm){

	loadingShowHide("show");
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
				alert("ERROR!");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

// 메모정보 상세조회 화면 호출
function aj_selectMemoInfoView(id,frm){
	loadingShowHide("show");
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
				alert("ERROR!");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

// 메모정보 등록
function aj_insertMemoInfo(frm){
	var formData = new FormData(frm);
	loadingShowHide("show");
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
				alert("메모정보를 성공적으로 등록하였습니다.");
				
				rightPopupOpen('memoInfo');
			} else if (returnData.result == "fail"){ 
				alert("메모정보를 등록하는 데 실패하였습니다.");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

// 메모정보 수정
function aj_updateMemoInfo(frm){

	var formData = new FormData(frm);
	loadingShowHide("show");
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
				alert("메모정보를 성공적으로 수정하였습니다.");
				aj_selectMemoInfoView(null,this.frm);
			} else if (returnData.result == "fail"){ 
				alert("메모정보를 수정하는 데 실패하였습니다.");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

// 메모정보 삭제
function aj_deleteMemoInfo(frm){
	var formData = new FormData(frm);
	loadingShowHide("show");
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
				alert("메모정보를 성공적으로 삭제하였습니다.");
				
				rightPopupOpen('memoInfo');
			} else if (returnData.result == "fail"){ 
				alert("메모정보를 삭제하는 데 실패하였습니다.");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

