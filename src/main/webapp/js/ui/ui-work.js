$(document).ready(function () {
    leftEvent();
    tabEvent();
});

//업무영역 >> 좌측 메뉴 선택
function leftEvent(){
    $(".lnb-work button").on("click", function() {
        var leftName = $(this).data("popup");
        var classList = $(this).attr('class').split(/\s+/);
        var area = classList[1];
        openPopup(area);
        switch(leftName){

            // 업무 > 공간정보활용 > 사업공유관리
            case "constructionPlan" :
                //공사계획정보 (first tab)
                aj_selectConstructionPlanList($("#tmpForm")[0]);
                break;

            // 업무 > 공간정보활용 > 지하수관리
            case "undergroundWaterManagement" :
                aj_selectUnderWaterMngList($("#tmpForm")[0]);
                break;

            // 업무 > 공간정보활용 > 신재생에너지
            case "renewableEnergy" :
                aj_selectRenewableEnergyList($("#tmpForm")[0]);
                break;

            // 업무 > 공간정보활용 > 안전시설물관리
            case "safetyFacilitiesManagement" :
                aj_selectSafetyFacilitiesMngList($("#tmpForm")[0]);
                break;

            // 업무 > 공간정보활용 > 관내업소정보조회
            case "inBusinessEstaInfo" :
                aj_selectInBusinessEstaInfoList($("#tmpForm")[0]);
                break;

            // 업무 > 공간정보활용 > 대기오염
            case "atmospherePollution" :
                aj_selectAtmospherePollutionList($("#tmpForm")[0]);
                break;

            // 업무 > 시설관리 > 상수도시설
            case "waterSupplyFacility" :
                aj_facility("WaterSupplyFacility");
                break;

            // 업무 > 시설관리 > 하수도시설
            case "sewerSupplyFacility" :
                aj_facility("SewerSupplyFacility");
                break;

            // 업무 > 시설관리 > 교통시설
            case "transportationFacility" :
                aj_selectTransportationFacilityList($("#tmpForm")[0]);
                break;

            // 업무 > 시설관리 > 체육시설
            case "physicalEducationFacility" :
                aj_selectPhysicalEducationFacilityList($("#tmpForm")[0]);
                break;

            // 업무 > 시설관리 > 복지시설
            case "welfareFacility" :
                //TODO ↓↓↓↓↓↓↓↓↓↓↓
                WLREspitalYN = '';
                aj_selectWelfareFacilityList($("#tmpForm")[0]);
                break;

            // 업무 > 시설관리 > 시설예약관리
            case "faciReseMng" :
                aj_selectFaciReseMngList($("#tmpForm")[0]);
                break;
        }

    });
}

//업무영역 >> 탭 선택
function tabEvent(){
    // $(document).on("click", ".left-popup-body .inner-tab", function(){
    $(document).on("click", ".inner-tab", function(){
        var parent = $(this).parent();
        var tabName = $(this).data("tab");
        //set css
        parent.addClass("on").siblings().removeClass("on");
        $("."+parent.data("tab")).addClass("on").siblings().removeClass("on");
        //set event
        switch(tabName){

            // 업무 > 사업공유관리 > 공사계획정보
            case "constructionPlan" :
                aj_selectConstructionPlanList($("#tmpForm")[0]);
                break;

            // 업무 > 사업공유관리 > 공사예정정보
            case "constructionSchedule"        :
                aj_selectConstructionScheduleList($("#tmpForm")[0]);
                break;

            // 업무 > 사업공유관리 > 공사정보조회
            case "constructionInquiry"            :
                aj_selectConstructionInquiryList();
                break;

            //업무 > 사업공유관리 > 공사정보 조회 > 속성조회
            case "constructionInfo01"            :
                break;

            //업무 > 사업공유관리 > 공사정보 조회 > 공간조회
            case "constructionInfo02"            :
                break;
        }
    });
}

//업무영역 >> 팝업 생성
function openPopup(area, name, direction, param2) {
    var _area = {};
    switch(area){

        //좌측
        case "leftPopup" :
            _area.top = "unset";
            _area.right = "unset";
            _area.left = "320";
            _area.width = "515";
            _area.heigth = "807";
            break;
        //하단
        case "bottomPopup" :
            _area.top = "unset";
            _area.right = "unset";
            _area.left = "320";
            _area.width = "1600";
            _area.heigth = "378";
            break;
        //우측
        case "rightPopup" :
            _area.top = "unset";
            _area.right = "unset";
            _area.left = "unset";
            _area.width = "480";
            _area.heigth = "807";
            break;
        //우측 sub
        case "rightSubPopup" :
            _area.top = "80";
            _area.right = "80";
            _area.left = "unset";
            _area.width = "550";
            _area.heigth = "480";
            break;
    }

    initPopup(area);

    // if (!$('.popup-header:contains(레이어)').parent().hasClass("opened")) {
    //     $(".popup-panel").removeClass("opened");
    // }

    $("#" + area).css({
        "top":  _area.top + "px",
        "right":  _area.right + "px",
        "left": _area.left + "px",
        "width": _area.width + "px",
        "height": _area.heigth + "px"
    });

    $("#" + area).addClass("opened");

    $(".scroll-y").mCustomScrollbar({
        scrollbarPosition: "outside"
    });
}

//팝업 초기화
function initPopup(area) {
    var arrAllPopupTy = ["leftPopup","leftSubPopup","rightSubPopup","rightPopup","bottomPopup"];
    var arrPopupTy = [];
    if(area.includes("left")) {
        arrPopupTy = ["rightSubPopup","rightPopup","bottomPopup"];
    } else if(area.includes("right")) {
        arrPopupTy = ["leftPopup","leftSubPopup","rightSubPopup"];
    } else if(area.includes("bottom")) {
        arrPopupTy = ["leftPopup","leftSubPopup","rightSubPopup"];
    }
    $.each(arrPopupTy, function( key, value ) {
        $("#"+value).removeClass("opened").html("");
    } );
}