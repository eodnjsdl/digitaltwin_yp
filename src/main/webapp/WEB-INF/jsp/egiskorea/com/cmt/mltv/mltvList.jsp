<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script>

    $(document).ready(function () {
        eventBindByMltv();
    });

    function eventBindByMltv() {

        //분할버튼
        $(".multiView-list").off("click").on("click", "button", function (e) {
            let ty = $(e.target).data("ty");
            ty === 1 ? map2d.multiView.dispose() : map2d.multiView.active(ty);
        });

        //동기화버튼
        $("#container").off("click").on("click", ".btn_sync_01 button", function (e) {
            let val = $(e.target).val();
            val === "async" ? (
                toastr.success('분할 지도의 위치가 동기화 됩니다.'),
                    $(e.target).val("sync"),
                    $(e.target).css({
                        "background-image": "url(/images/poi/nomal_poi_on_ex1.png)"
                    }),
                    map2d.multiView.syncView()
            ) : (
                toastr.success('분할 지도의 위치가 비동기화 됩니다.'),
                    $(e.target).val("async"),
                    $(e.target).css({
                        "background-image": "url(/images/poi/nomal_poi_ex1.png)"
                    }),
                    map2d.multiView.asyncView()
            );
        });
    }

</script>
<!-- top > 화면분할 -->
<div class="popup-header">화면분할</div>
<div class="popup-body multiView-list">
    <div class="tool-popup-body top-multiView-body">

        <div class="col-auto">
            <button type="button" id="mltvTy01" data-ty="1" class="btn type01 search">1분할</button>
            <button type="button" id="mltvTy02" data-ty="2" class="btn type01 search">2분할</button>
            <button type="button" id="mltvTy03" data-ty="3" class="btn type01 search">3분할</button>
            <button type="button" id="mltvTy04" data-ty="4" class="btn type01 search">4분할</button>
        </div>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('화면분할')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 화면분할 -->