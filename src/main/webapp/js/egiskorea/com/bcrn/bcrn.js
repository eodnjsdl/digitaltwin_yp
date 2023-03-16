
$(document).ready(function() {

});


/**
 * @description 배경지도 팝업 함수
 * @Author 플랫폼개발부문 DT솔루션 이준호
 * @Date 2022.03.07
 */
function aj_selectBackgroundMapInfoList() {
    $.ajax({
        type : "POST",
        url : "/cmt/bm/selectBackgroundMapInfoList.do",
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
