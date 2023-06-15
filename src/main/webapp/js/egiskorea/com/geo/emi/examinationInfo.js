$(document).ready(function(){
	$(".lnb-territory .lnb-close").on("click", function (e) {
      $(".lnb-territory").stop().fadeOut(100);
		var chkGrp = e.target.parentElement.parentElement.classList[2];
		if(chkGrp === "grp1") {
			$("#lnb ul:eq(0) li[data-menu]").removeClass("on");
		} else {
			$("#lnb ul:eq(1) li[data-menu]").removeClass("on");
		}
      // $("#lnb li[data-menu]").removeClass("on");
      $('#leftPopup.opened').removeClass('opened');
      $('.popup-sub.opened').removeClass('opened');
    });
});

function fn_download_excelData(form, pnu){
	if(pnu == "all"){
		if(form.code2.value == ""){
			toastr.warning("데이터 건수가 많아 이용할 수 없습니다.\n리 단위로 조사정보를 저장해주십시요.");
			return false;
		}else{
			form.pnu.value = "";			
		}
	}else{
		form.pnu.value = pnu;
	}
	document.cookie = "fileDownload=TRUE";
	ui.loadingBar("show");
	form.action = "/geo/emi/selectExaminationInfoListDownload.do";
	form.submit();
	var downloadTimer = setInterval(function() {
        var token = cmmUtil.getCookie("fileDownload");
        if(token == "FALSE") {
        	clearInterval(downloadTimer);
			ui.loadingBar("hide");
        }
    }, 1000 );
}
