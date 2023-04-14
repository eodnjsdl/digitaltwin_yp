// 드론영상 목록 호출
function aj_selectDronInfo(param1){
    ui.loadingBar("show");

    var formData = new FormData(param1);
    $.ajax({
        type : "POST",
        url : "/cmt/dron/selectDronList.do",
        data : formData,
        dataType : "html",
        processData : false,
        contentType : false,
        async: false,
        success : function(returnData, status){
            if(status == "success") {
                $("#rightPopup").html(returnData);
                $("input[name='sortKind']:radio" ).on("change", function () {
                    fn_select_dron_list();
                });
                $("input:checkbox[id='rChk3-2']").prop("checked", true);
            } else{
            }
        }, complete : function(){
            ui.loadingBar("hide");
        }
    });

};

//등록화면 호출.
function aj_insertDronInfoView(frm){
    ui.loadingBar("show");
    var formData = new FormData(frm);
    $.ajax({
        type : "POST",
        url : "/cmt/dron/insertDronInfoView.do",
        data : formData,
        dataType : "html",
        processData : false,
        contentType : false,
        async: false,
        success : function(returnData, status){
            if(status == "success") {
                $("#rightPopup").html(returnData);
                ui.callDatePicker();
            }else{
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete : function(){
            ui.loadingBar("hide");
        }
    });
}

// 드론영상 등록
function aj_insertDronInfo(frm){
    var formData = new FormData(frm);
    for (let i = 0; i < inputFileList.length; i++) {
        formData.append("images"+i, inputFileList[i]);
    }
    ui.loadingBar("show");
    $.ajax({
        type : "POST",
        url : "/cmt/dron/insertDronInfo.do",
        enctype:"multipart/form-data",
        data : formData,
        dataType : "json",
        processData : false,
        contentType : false,
        async: false,
        success : function(returnData, status){
            if(returnData.result == "success") {
                toastr.success("드론정보를 성공적으로 등록하였습니다.");
                // rightPopupOpen('dronInfo');
                ui.openPopup("rightPopup");
                aj_selectDronInfo($("#tmpForm")[0]);
            } else if (returnData.result == "fail"){
                toastr.error("드론정보를 등록하는 데 실패하였습니다.");
                return;
            }
        }, complete : function(){
            ui.loadingBar("hide");
        }
    });
}


// 드론정보 상세조회 화면 호출
function aj_selectDronInfoView(id,frm ){
    ui.loadingBar("show");
    var formData = new FormData(frm);
    if(id!=null){
        formData.append('dronPicId', id);
    }
    $.ajax({
        type : "POST",
        url : "/cmt/dron/selectDronInfoView.do",
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



// 드론정보 수정화면 호출
function aj_updateDronInfoView(id,frm){
    ui.loadingBar("show");
    var formData = new FormData(frm);
    $.ajax({
        type : "POST",
        url : "/cmt/dron/updateDronInfoView.do",
        data : formData,
        dataType : "html",
        processData : false,
        contentType : false,
        async: false,
        success : function(returnData, status){
            if(status == "success") {
                $("#rightPopup").html(returnData);
                ui.callDatePicker();
            }else{
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete : function(){
            ui.loadingBar("hide");
        }
    });
}


// 사진정보 수정
function aj_updateDronInfo(frm){
    var formData = new FormData(frm);
    // var updateFileCn = new Array();
    // var updateFileSn = new Array();
    // var insertFileCn = new Array();
    // formData.delete("updateFileCn");

    // var fileSn = $("#fileSnByUpdateDron").value;
    // updateFileSn.push(fileSn);

    for (let i = 0; i < inputFileList.length; i++) {
        formData.append("images"+i, inputFileList[i]);
    }
    // for(var i=0; i<insertFileCn.length; ++i) {
    //     formData.append("insertFileCn", insertFileCn[i]);
    // }
    //formData.append("insertFileCn", insertFileCn);
    // formData.append("updateFileCn", updateFileCn);
    // formData.append("updateFileSn", updateFileSn);

    ui.loadingBar("show");
    $.ajax({
        type : "POST",
        enctype:"multipart/form-data",
        url : "/cmt/dron/updateDronInfo.do",
        data : formData,
        dataType : "json",
        processData : false,
        contentType : false,
        async: false,
        frm: frm,
        success : function(returnData, status){
            if(returnData.result == "success") {
                toastr.success("드론정보를 성공적으로 수정하였습니다.");
                //rightPopupOpen('dronInfo');
                 aj_selectDronInfoView(null,this.frm )
            } else if (returnData.result == "fail"){
                toastr.error("드론정보를 수정하는 데 실패하였습니다.");
                return;
            }
        }, complete : function(){
            ui.loadingBar("hide");
        }
    });
}


// 드론정보 삭제
function aj_deleteDronInfo(frm){
    var formData = new FormData(frm);
    ui.loadingBar("show");
    $.ajax({
        type : "POST",
        url : "/cmt/dron/deleteDronInfo.do",
        data : formData,
        dataType : "json",
        processData : false,
        contentType : false,
        async: false,
        success : function(returnData, status){
            if(returnData.result == "success") {
                toastr.success("드론정보를 성공적으로 삭제하였습니다.");
                // rightPopupOpen('dronInfo');
                ui.openPopup("rightPopup");
                aj_selectDronInfo($("#tmpForm")[0]);
            } else if (returnData.result == "fail"){
                toastr.error("드론정보를 삭제하는 데 실패하였습니다.");
                return;
            }
        }, complete : function(){
            ui.loadingBar("hide");
        }
    });
}

function _onDrawEnd_drone(e) {
    dtmap.draw.dispose();
    var geom = e.geometry;
    const position = geom.getFlatCoordinates();
    var xObj = parseFloat(position[0]);
    var yObj = parseFloat(position[1]);
    cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
        $("#loc_dron").val(result["address"]);
        const format = new ol.format.WKT();
        const point = new ol.geom.Point([xObj, yObj]);
        const x = point.flatCoordinates[0];
        const y = point.flatCoordinates[1];
        $("#xcord").val(x);
        $("#ycord").val(y);
    });
}

function aj_selectDronLocation() {
    dtmap.draw.active({type: 'Point', once: true});
    dtmap.on('drawend', _onDrawEnd_drone);
}