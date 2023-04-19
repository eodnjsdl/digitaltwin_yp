$(document).ready(function(){
	$(".lnb-territory .lnb-close").on("click", function () {
      $(".lnb-territory").stop().fadeOut(100);
      $("#lnb li[data-menu]").removeClass("on");
      $('#leftPopup.opened').removeClass('opened');
      $('.popup-sub.opened').removeClass('opened');
    });
});

function fn_download_excelData(form, pnu){
	if(pnu == "all"){
		if(form.code2.value == ""){
			alert("전체 조사정보 저장은 데이터 건수가 많아 이용할 수 없습니다.\n리 단위로 조사정보를 저장해주십시요.");
			return false;
		}else{
			form.pnu.value = "";			
		}
	}else{
		form.pnu.value = pnu;
	}
	
	document.cookie = "fileDownload=TRUE";
	loadingShowHide("show");
	 	
	form.action = "/geo/emi/selectExaminationInfoListDownload.do";
	form.submit();
	
	var downloadTimer = setInterval(function() {
        var token = getCookie("fileDownload");
        
        if(token == "FALSE") {
        	clearInterval(downloadTimer);
        	loadingShowHide("hide");
        }
    }, 1000 );
}


