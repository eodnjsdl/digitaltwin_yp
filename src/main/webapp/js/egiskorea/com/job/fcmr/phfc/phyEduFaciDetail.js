/**
 * - 업무 / 시설관리 / 체육시설 / 상세보기
 * 
 * @returns
 */
$(document).ready(function(){
	console.log("phyEduFaciDetail.js");
	console.log("체육시설 상세보기");
});

// 체육시설 수정 화면 표출
function updatePhyEduFaciView(gid) {
	//console.log("updatePhyEduFaciView(gid)");
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/phfc/updatePhyEduFaciView.do", { gid: gid }, function() {
		toastr.success("/job/fcmr/phfc/updatePhyEduFaciView.do", "페이지🙂호🙂출🙂");
		
		YYMM_datePicker();
		
		// 팝업 헤더 변경
		$("#rightSubPopup .popup-header").html('체육시설 수정하기');
		
		// 저장 버튼 변경
		$("#updateSports").attr("onclick", "updatePhyEduFaci(" + gid + ");");
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
}

// 체육시설 수정 저장
function updatePhyEduFaci(gid) {
	alert('체육시설 수정 저장 GID: ' + gid);
}

// 체육시설 삭제
function deletePhyEduFaci(gid) {
	alert('체육시설 삭제 GID: ' + gid);
}

// 운영정보 관리 화면 표출
function phyMngView(gid) {
	ui.openPopup("rightSubPopup");
	
	var formData = new FormData();
	formData.append('gid', gid);

	$.ajax({
		type : "POST",
		url : "/job/fcmr/phfc/phyMngView.do",
		dataType : "html",
		data : formData,
		processData : false,
		contentType : false,
		async : false,
		success : function(returnData, status) {
			if (status == "success") {
				$("#rightSubPopup").append(returnData);
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

// 운영정보 관리 페이징
function phyMngViewPaging(pageIndex, gid){
	loadingShowHide("show"); 
	
	var formData = new FormData();

	pageIndex = parseInt(pageIndex);
	formData.append('pageIndex', pageIndex);
		
	gid = parseInt(gid);
	formData.append('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/fcmr/phfc/phyMngView.do",
		dataType : "html",
		data : formData,
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#rightSubPopup").append(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		},
		complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

// 시설정보 관리 화면 표출
function phyFaciMngView(gid) {
	ui.openPopup("rightSubPopup");
	
	var formData = new FormData();
	formData.append('gid', gid);

	$.ajax({
		type : "POST",
		url : "/job/fcmr/phfc/phyFaciMngView.do",
		dataType : "html",
		data : formData,
		processData : false,
		contentType : false,
		async : false,
		success : function(returnData, status) {
			if (status == "success") {
				$("#rightSubPopup").append(returnData);
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

// 시설정보 관리 페이징
function phyFaciMngViewPaging(pageIndex, gid){
	loadingShowHide("show"); 
	
	var formData = new FormData();

	pageIndex = parseInt(pageIndex);
	formData.append('pageIndex', pageIndex);
		
	gid = parseInt(gid);
	formData.append('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/fcmr/phfc/phyFaciMngView.do",
		dataType : "html",
		data : formData,
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#rightSubPopup").append(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		},
		complete : function(){
			loadingShowHide("hide"); 
		}
	});
}