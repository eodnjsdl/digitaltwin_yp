/**
 * @Description 주제도 관련 스크립트 파일
 * @file ThematicMap.js
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.03.10
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.10		이준호	최초 생성
 */

function aj_selectThematicMapList() {
    var searchKeyword = $(".lnb-theme input[name='searchKeyword']").val();

    $.ajax({
        type : "POST",
        url : "/com/tm/selectTMapList.do",
        data : {
            "searchKeyword" : searchKeyword
        },
        dataType : "html",
        async: false,
        beforeSend : function(jqXHR, settings) {
            loadingShowHide("show");
        },
        success : function(returnData, status){
            if (status == "success") {
                $(".lnb-theme").html(returnData);
                $(".lnb-theme input[name='searchKeyword']").val(searchKeyword);

                if (!$(".lnb-theme .scroll-y").hasClass("mCustomScrollbar")) {
                    $(".scroll-y").mCustomScrollbar({
                        scrollbarPosition:"outside"
                    });
                }
            } else {
                alert("ERROR!");
                return false;
            }
        },
        complete : function() {
            loadingShowHide("hide");
        }
    });
}