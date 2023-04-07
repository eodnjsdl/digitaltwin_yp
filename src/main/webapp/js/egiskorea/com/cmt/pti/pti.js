// 사진정보 목록 호출
function aj_selectPotoInfoList(frm){
	ui.loadingBar("show");
	
	var formData = new FormData(frm);
	
	$.ajax({
		type : "POST",
		url : "/cmt/pti/selectPotoList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {				
				$("#rightPopup").html(returnData);
				$("input[name='sortKind']:radio" ).on("change", function () {
					fn_select_poto_list();
				});
				$("input:checkbox[id='rChk3-2']").prop("checked", true);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}


function _onDrawEnd_photo(e) {
	dtmap.draw.dispose();
	var geom = e.geometry;
	const position = geom.getFlatCoordinates();
	var xObj = parseFloat(position[0]);
	var yObj = parseFloat(position[1]);
	cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
		$("#loc_poto").val(result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([xObj, yObj]);
		const wkt = format.writeGeometry(point);
		$("#wkt").val(wkt);
	});
}

//  지도에서 선택
function aj_selectphotoLocation() {
	 // cmmUtil.getPosition(reverseGeo);
	dtmap.draw.active({type: 'Point', once: true});
	dtmap.on('drawend', _onDrawEnd_photo);
}

// function reverseGeo(poinx,pointy){
// 	cmmUtil.reverseGeocoding(poinx, pointy).done((result)=>{
// 		$("#loc").val(result["address"]);
// 		const format = new ol.format.WKT();
// 		const point = new ol.geom.Point([poinx, pointy]);
// 		const wkt = format.writeGeometry(point);
// 		$("#wkt").val(wkt);
// 	});
// }

// 사진정보 등록화면 호출
function aj_insertPotoInfoView(frm){
	ui.loadingBar("show");
	var formData = new FormData(frm);
	
	$.ajax({
		type : "POST",
		url : "/cmt/pti/insertPotoInfoView.do",
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

// 사진정보 수정화면 호출
function aj_updatePotoInfoView(id,frm){

	ui.loadingBar("show");
	var formData = new FormData(frm);
	
	$.ajax({
		type : "POST",
		url : "/cmt/pti/updatePotoInfoView.do",
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

// 사진정보 상세조회 화면 호출
function aj_selectPotoInfoView(id,frm){
	ui.loadingBar("show");
	var formData = new FormData(frm);
	if(id!=null){
		formData.append('phtoId', id);
	}

	$.ajax({
		type : "POST",
		url : "/cmt/pti/selectPotoInfoView.do",
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

// 사진정보 등록
function aj_insertPotoInfo(frm){
    var fileCn = new Array();
    $('input:text[name=fileCn]').each(function() {
        idx = $('input:text[name=fileCn]').index(this); 
        fileCn.push($('input:text[name=fileCn]').eq(idx).val());
    });
    
	var formData = new FormData(frm);
    for (let i = 0; i < inputFileList.length; i++) {
        formData.append("images"+i, inputFileList[i]);
    }
    formData.append("fileCn", fileCn);
	ui.loadingBar("show");
	$.ajax({
		type : "POST",
		url : "/cmt/pti/insertPotoInfo.do",
        enctype:"multipart/form-data", 
		data : formData,
		dataType : "json",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(returnData.result == "success") {
				toastr.success("사진정보를 성공적으로 등록하였습니다.");
				// rightPopupOpen('potoInfo');
				aj_selectPotoInfoList($("#tmpForm")[0]);
			} else if (returnData.result == "fail"){
				toastr.error("사진정보를 등록하는 데 실패하였습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

// 사진정보 수정
function aj_updatePotoInfo(frm){ console.log(frm)
	var formData = new FormData(frm);
	var updateFileCn =new Array();
    var updateFileSn = new Array();
    var insertFileCn = new Array();
	formData.delete("updateFileCn");
	$('input:checkbox[name=potoCheck]').each(function() {
        var idx = $('input:checkbox[name=potoCheck]').index(this); 
        var sn = $('input:checkbox[name=potoCheck]').eq(idx).parent().parent().parent().parent().children()[3].value;
        if(sn == '') {
            var fileSn = $('input:checkbox[name=potoCheck]').eq(idx).parent().parent().parent().parent().children()[3].value;
            insertFileCn.push($('input:text[name=fileCn]').eq(idx).val());
        } else {
            var fileSn = $('input:checkbox[name=potoCheck]').eq(idx).parent().parent().parent().parent().children()[3].value;
            updateFileSn.push(fileSn);
            // console.log(fileSn)
            // console.log($('#atchmnflId').val());
            updateFileCn.push($('input:text[name=fileCn]').eq(idx).val());
			formData.append("updateFileCn",$('input:text[name=fileCn_new]').eq(idx).val());
        }
    });

    for(var i=0; i<updateFileCn.length; ++i) {
		Data = {
			'atchmnflId': $('#atchmnflId').val(),
			'updateFileCn': updateFileCn[i],
			'updateFileSn': updateFileSn[i]
		}
        $.ajax({
            type : "POST",
            url : "/cmt/pti/updateFileDetail.do",
            data : Data,
            success : function(returnData, status){
                if(status == "success") {
                } else if (returnData.result == "fail"){
					toastr.error("사진정보를 수정하는데 실패하였습니다.");
                    return;
                } 
            }, complete : function(){
			}
        });
    }

    for (let i = 0; i < inputFileList.length; i++) {
        formData.append("images"+i, inputFileList[i]);
    }
    for(var i=0; i<insertFileCn.length; ++i) {
        formData.append("insertFileCn", insertFileCn[i]);
    }
    formData.append("updateFileSn", updateFileSn);

	ui.loadingBar("show");
	$.ajax({
		type : "POST",
        enctype:"multipart/form-data", 
		url : "/cmt/pti/updatePotoInfo.do",
		data : formData,
		contentType: false,
		cache: false,
		processData: false,
		async: false,
		frm:frm,
		success : function(returnData, status){
			if(status == "success") {
				toastr.success("사진정보를 성공적으로 수정하였습니다.");
				
				//rightPopupOpen('potoInfo');

				aj_selectPotoInfoView(null,$(this.frm)[0]);
			} else if (returnData.result == "fail"){
				toastr.error("사진정보를 수정하는 데 실패하였습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

// 사진정보 삭제
function aj_deletePotoInfo(frm){
	var formData = new FormData(frm);
	ui.loadingBar("show");
	$.ajax({
		type : "POST",
		url : "/cmt/pti/deletePotoInfo.do",
		data : formData,
		dataType : "json",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(returnData.result == "success") {
				toastr.success("사진정보를 성공적으로 삭제하였습니다.");

				// rightPopupOpen('potoInfo');
				ui.openPopup("rightPopup");
				aj_selectPotoInfoList($("#tmpForm")[0]);
			} else if (returnData.result == "fail"){
				toastr.error("사진정보를 삭제하는 데 실패하였습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}
        
// 사진삭제
function aj_deletePoto(atchmnflId, fileSn){
	var formData = new FormData();
    formData.append("atchmnflId", atchmnflId);
    formData.append("fileSn", fileSn);
	ui.loadingBar("show");
	$.ajax({
		type : "POST",
		url : "/cmt/pti/deletePoto.do",
		data : formData,
		dataType : "json",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(returnData.result == "success") {

			} else if (returnData.result == "fail"){
				toastr.error("사진정보를 삭제하는 데 실패하였습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}