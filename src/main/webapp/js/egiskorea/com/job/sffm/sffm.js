$(document.body).ready(function(){
    $.datepicker.setDefaults({
        changeYear: true,
        changeMonth: true,
        yearRange: 'c-30:c'
    });

})

// 시설물 변경
$("#safeFacilityType").change(function() {
    ui.closeSubPopup();

    if(this.value == "lamp") {
        
        SFFMspitalYN = '';
        aj_selectSafetyFacilitiesMngList();
    } else {
       
        CCTVspitalYN = '';
        aj_selectCctvList($("#searchForm")[0]);
    }
});

