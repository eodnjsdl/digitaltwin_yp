/**
 * 체육시설 운영정보 관리 js
 */

$(document).ready(function() {
	$("#sporChkAll").click(function() {
		if($("#sporChkAll").is(":checked")) $("input[name=sporMngcheck]").prop("checked", true);
		else $("input[name=sporMngcheck]").prop("checked", false);
	});

	$("input[name=sporMngcheck]").click(function() {
		var total = $("input[name=sporMngcheck]").length;
		var checked = $("input[name=sporMngcheck]:checked").length;

		if(total != checked) $("#sporChkAll").prop("checked", false);
		else $("#sporChkAll").prop("checked", true); 
	});
	
	resetFacMagLayer();
});

/**
 * 체육시설 운영정보 관리 화면
 * @param gid
 * @returns
 */
function sportsMngView(gid){
	loadingShowHide("show"); 
//	console.log(gid);
	$(".popup-sub").removeClass("opened").html("");
	var formData = new FormData();
	formData.append('gid', gid);

	$.ajax({
		type : "POST",
		url : "/job/spor/sportsMngView.do",
		dataType : "html",
		data : formData,
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#container").append(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

/**
 * 체육시설 운영정보 관리 화면 페이징
 * @param pageIndex
 * @param gid
 * @returns
 */
function sportsMngViewPaging(pageIndex, gid){
	loadingShowHide("show"); 
	$(".popup-sub").removeClass("opened").html("");
	
	var formData = new FormData();

	pageIndex = parseInt(pageIndex);
	formData.append('pageIndex', pageIndex);
		
	gid = parseInt(gid);
	formData.append('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/spor/sportsMngView.do",
		dataType : "html",
		data : formData,
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#container").append(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

/**
 * 최대 길이
 * @param object
 * @returns
 */
function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}   
}

/**
 * 체육시설 운영정보 신규등록
 * @param gid
 * @returns
 */
function insertSportsMngInfo(gid){

//	console.log(gid);
	
	var oper_year = $('select[name=oper_year]').val();
	var acqs_amount= $('input[name=acqs_amount]').val();
	var dprc_am= $('input[name=dprc_am]').val();
	var dprc_acmtl_am= $('input[name=dprc_acmtl_am]').val();
	var bk_amount= $('input[name=bk_amount]').val();
	var contents_yycnt= $('input[name=contents_yycnt]').val();
	var oper_ct= $('input[name=oper_ct]').val();
	var oper_ern= $('input[name=oper_ern]').val();
	
	
	if(oper_year == '' || dprc_am == '' || dprc_acmtl_am == '' ||bk_amount == '' ||oper_ct == '' ||oper_ern == '') {
		alert("상세정보를 입력해주세요");
		return false;
		
	}else{
		
		$.ajax({
			type : "POST",
			url : "/job/spor/checkOperYear.do",
			dataType : "json",
			data : {
				"gid" : gid,
				"oper_year" : oper_year
				},
			success : function(data){
								
				if(data.result > 0){
					if (!confirm("해당 년도에 운영정보가 있습니다. 정보를 업데이트 하시겠습니까?")) {
						// 취소(아니오) 버튼 클릭 시 이벤트
						return false;
					} else {
					    // 운영정보 업데이트
						
						loadingShowHide("show");
						
						$.ajax({
							type : "POST",
							url : "/job/spor/updateSportsMngInfo.do",
							dataType : "json",
							data : {
								"gid" : gid,
								"oper_year" : oper_year,
								"acqs_amount" : acqs_amount,
								"dprc_am" : dprc_am,
								"dprc_acmtl_am" : dprc_acmtl_am,
								"bk_amount" : bk_amount,
								"contents_yycnt" : contents_yycnt,
								"oper_ct" : oper_ct,
								"oper_ern" : oper_ern
								},
							success : function(data){
								
								// 운영정보 관리 화면
								sportsMngView(gid);
							},
							error: function(request,status,error){
								console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
							},
							complete : function (){
								loadingShowHide("hide"); 
							}
						});
					}
				}else{
					// 운영정보 신규 등록

					if (!confirm("등록하시겠습니까?")) {
						// 취소(아니오) 버튼 클릭 시 이벤트
						return false;
					} else {
						loadingShowHide("show");
						
						$.ajax({
							type : "POST",
							url : "/job/spor/insertSportsMngInfo.do",
							dataType : "json",
							data : {
								"gid" : gid,
								"oper_year" : oper_year,
								"acqs_amount" : acqs_amount,
								"dprc_am" : dprc_am,
								"dprc_acmtl_am" : dprc_acmtl_am,
								"bk_amount" : bk_amount,
								"contents_yycnt" : contents_yycnt,
								"oper_ct" : oper_ct,
								"oper_ern" : oper_ern
								},
							success : function(data){
								$('.align-right').val('');
								 alert("정상적으로 등록되었습니다");
								// 운영정보 관리 화면
								sportsMngView(gid);
							},
							error: function(request,status,error){
								console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
							},
							complete : function (){
								loadingShowHide("hide"); 
							}
						});
					}
				}
				
			},
			error: function(request,status,error){
				
			},
			complete : function (){
				loadingShowHide("hide"); 
			}
		});
	}
}

/**
 * 채육시설 > 운영정보 선택 삭제
 * @returns
 */
function deleteSportsMng(){
	
	var oper_year = "";
	
	$("input[name=sporMngcheck]:checked").each(function() {
	
		if(oper_year == ""){
			oper_year = $(this).val();
		} else {
			oper_year = oper_year + "," + $(this).val();
		}
	});
	
//	console.log(oper_year);
	
	var gid = $('#gid').val();
		gid = parseInt(gid);
	
	$.ajax({
		type : "POST",
		url : "/job/spor/deleteSportsMng.do",
		dataType : "json",
		data : {
			"gid" : gid,
			"oper_year" : oper_year
			},
		success : function(data){
			$('.align-right').val('');
			
			// 운영정보 관리 화면
			sportsMngView(gid);
		},
		error: function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		complete : function (){
			loadingShowHide("hide"); 
		}
	});
}