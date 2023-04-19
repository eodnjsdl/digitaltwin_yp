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
        success : function(returnData, status){
            if (status == "success") {
                $(".lnb-theme").html(returnData);
                $(".lnb-theme input[name='searchKeyword']").val(searchKeyword);

                if (!$(".lnb-theme .scroll-y").hasClass("mCustomScrollbar")) {
                    $(".scroll-y").mCustomScrollbar({
                        scrollbarPosition:"outside"
                    });
                }
        		//LEFT 메뉴 닫기 버튼
        		$(".lnb-util .lnb-close").click(function(){
        			($(this).parent().parent()).stop().fadeOut(100);
        			$("#lnb li[data-menu]").removeClass("on");									
        		});
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return false;
            }
        }
    });
}