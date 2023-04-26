
function initMultiViewList() {
    $.ajax({
        type : "POST",
        url : "/cmt/mltv/selectMltvList.do",
        dataType : "html",
        async: false,
        beforeSend : function(jqXHR, settings) {
            ui.loadingBar("show");
        },
        success : function(returnData, status) {
            if (status == "success") {
                $("#rightPopup").html(returnData);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        },
        complete : function() {
            ui.loadingBar("hide");
        }
    });
}
