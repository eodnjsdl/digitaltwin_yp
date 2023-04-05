/**
 * - 업무 / 시설관리 / 체육시설 / 상세보기 / 운영정보 관리
 * 
 * @returns
 */
$(document).ready(function(){
	console.log("phyEduFaciMng.js");
	console.log("체육시설 운영정보 관리 및 시설정보 관리");
});

// 체육시설 상세보기로 back
function backPhyEduFaciDetail(gid, lon, lat){
	//$("#selectSafetyFacilLampMng").addClass("opened");
	//destroy();
	
	selectPhyEduFaciDetail(gid, lon, lat);
}

// 운영정보 - 금액 최대 길이 check
function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}   
}

// 운영정보 등록
function insertPhyMng(gid) {
	//alert('운영정보 등록 GID: ' + gid);
	
	var oper_year = $('select[name=oper_year]').val();
	var acqs_amount= $('input[name=acqs_amount]').val();
	var dprc_am= $('input[name=dprc_am]').val();
	var dprc_acmtl_am= $('input[name=dprc_acmtl_am]').val();
	var bk_amount= $('input[name=bk_amount]').val();
	var contents_yycnt= $('input[name=contents_yycnt]').val();
	var oper_ct= $('input[name=oper_ct]').val();
	var oper_ern= $('input[name=oper_ern]').val();
	
	if (oper_year == '' || dprc_am == '' || dprc_acmtl_am == '' || bk_amount == '' || oper_ct == '' || oper_ern == '') {
		alert("상세정보를 모두 입력해주세요");
		
		return false;
	} else {
		$.ajax({
			type : "POST",
			url : "/job/fcmr/phfc/checkPhyMngYear.do",
			dataType : "json",
			data : {
				"gid" : gid,
				"oper_year" : oper_year
			},
			success : function(data) {
				if (data.result > 0) {
					if (!confirm("해당 년도에 운영정보가 있습니다. 정보를 업데이트 하시겠습니까?")) {
						// 취소(아니오) 버튼 클릭 시 이벤트
						return false;
					} else {
					    // 운영정보 수정
						//loadingShowHide("show");
						
						$.ajax({
							type : "POST",
							url : "/job/fcmr/phfc/updatePhyMng.do",
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
							success : function(data) {
								// 운영정보 관리 화면
								phyMngView(gid);
							},
							error : function(request, status, error) {
								console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
							},
							complete : function() {
								//loadingShowHide("hide"); 
							}
						});
					}
				} else {
					// 운영정보 신규 등록
					if (!confirm("등록하시겠습니까?")) {
						// 취소(아니오) 버튼 클릭 시 이벤트
						return false;
					} else {
						//loadingShowHide("show");
						
						$.ajax({
							type : "POST",
							url : "/job/fcmr/phfc/insertPhyMng.do",
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
							success : function(data) {
								$('.align-right').val('');
								alert("정상적으로 등록되었습니다");
								// 운영정보 관리 화면
								phyMngView(gid);
							},
							error : function(request,status,error) {
								console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
							},
							complete : function() {
								//loadingShowHide("hide"); 
							}
						});
					}
				}
			},
			error : function(request, status, error) {
			},
			complete : function (){
				//loadingShowHide("hide"); 
			}
		});
	}
}

// 운영정보 삭제
function deletePhyMng() {
	//alert('운영정보 삭제');
	
	if (!confirm("삭제하시겠습니까?")) {
		// 취소(아니오) 버튼 클릭 시 이벤트
		return false;
	} else {
		var oper_year = "";
		
		$("input[name=sporMngcheck]:checked").each(function() {
			if(oper_year == "") {
				oper_year = $(this).val();
			} else {
				oper_year = oper_year + "," + $(this).val();
			}
		});
		
		var gid = parseInt($('#gid').val());
		
		$.ajax({
			type : "POST",
			url : "/job/fcmr/phfc/deletePhyMng.do",
			dataType : "json",
			data : {
				"gid" : gid,
				"oper_year" : oper_year
			},
			success : function(data){
				$('.align-right').val('');
				
				// 운영정보 관리 화면
				phyMngView(gid);
			},
			error : function(request, status, error) {
				console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
			},
			complete : function() {
				//loadingShowHide("hide"); 
			}
		});
	}
}

/**
 * - 업무 / 시설관리 / 체육시설 / 상세보기 / 시설정보 관리
 * 
 * @returns
 */

$(document).ready(function() {
	$("#sporFacChkAll").click(function() {
		if ($("#sporFacChkAll").is(":checked")) $("input[name=sporFacMngcheck]").prop("checked", true);
		else $("input[name=sporFacMngcheck]").prop("checked", false);
	});

	$("input[name=sporFacMngcheck]").click(function() {
		var total = $("input[name=sporFacMngcheck]").length;
		var checked = $("input[name=sporFacMngcheck]:checked").length;

		if (total != checked) $("sporFacChkAll").prop("checked", false);
		else $("#sporFacChkAll").prop("sporFacChkAll", true); 
	});
	
	//GLOBAL.LayerId.LowPoiLayerId = "SPORTS_FAC_POI";
	//resetFacMagLayer();
});

// 시설정보 - 지도에서 선택 Btn
function PhyFaciLocationSelect() {
	cmmUtil.getPositionGeom(sporFacPositionCallback);
	
	var lat = 0;
	var lon = 0;
	
	canvas.onmouseup = function (e) {
		var vPosition = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(e.x, e.y));
		lat = vPosition.Latitude;
		lon = vPosition.Longitude;

		$('#adres').val(lat.toFixed(5) + "," + lon.toFixed(5));
		
		canvas.onmouseup = '';
	}
}

// 시설정보 등록
function insertPhyFaciMng(gid) {
	//alert('시설정보 등록 GID: ' + gid);
	
	var asstn_fclty_nm= $('input[name=asstn_fclty_nm]').val();
	var oper_strt_time = $('select[name=oper_strt_time]').val() + ':00';
	var oper_end_time= $('select[name=oper_end_time]').val() + ':00';
	var rsrv_at= $('input:radio[name=rsrv_at]:checked').val();
	var ho_cnt= $('input[name=ho_cnt]').val();
	var fclty_dc= $('input[name=fclty_dc]').val();
	var geom= $('input[name=geom]').val();
	
	if (asstn_fclty_nm == '' || oper_strt_time == '' || oper_end_time == '' || rsrv_at == '' || ho_cnt == '' || fclty_dc == '') {
		alert("상세정보를 모두 입력해주세요");
		
		return false;
	} else if (geom == '') {
		alert("체육시설 위치를 선택해주세요.");
		
		return false;
	} else {
		// 운영정보 신규 등록
		if (!confirm("등록하시겠습니까?")) {
			// 취소(아니오) 버튼 클릭 시 이벤트
			return false;
		} else {
			//loadingShowHide("show");
			
			$.ajax({
				type : "POST",
				url : "/job/fcmr/phfc/insertPhyFaciMng.do",
				dataType : "json",
				data : {
					"gid" : gid,
					"asstn_fclty_nm" : asstn_fclty_nm,
					"oper_strt_time" : oper_strt_time,
					"oper_end_time" : oper_end_time,
					"rsrv_at" : rsrv_at,
					"ho_cnt" : ho_cnt,
					"fclty_dc" : fclty_dc,
					"geom" : geom
				},
				success : function(data) {
					$('.align-right').val('');
					alert("정상적으로 등록되었습니다");
					
					//destroy();
					
					var lon = data.resultVO.lon;
					var lat = data.resultVO.lat;
					
					// 시설정보 관리 화면
					phyFaciMngView(gid);
				},
				error : function(request, status, error) {
					console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
				},
				complete : function() {
					//loadingShowHide("hide"); 
				}
			});
		}
	}
}

// 시설정보 삭제
function deletePhyFaciMng() {
	//alert('시설정보 삭제 GID');
	
	if (!confirm("삭제하시겠습니까?")) {
		// 취소(아니오) 버튼 클릭 시 이벤트
		return false;
	} else {
		var facList = "";
		
		$("input[name=sporFacMngcheck]:checked").each(function() {
			if (facList == "") {
				facList = $(this).val();
			} else {
				facList = facList + "," + $(this).val();
			}
		});
		
		var gid = parseInt($('#gid').val());

		$.ajax({
			type : "POST",
			url : "/job/fcmr/phfc/deletePhyFaciMng.do",
			dataType : "json",
			data : {
				"gid" : gid,
				"facList" : facList
			},
			success : function(data) {
				$('.align-right').val('');
				
				// 시설정보 관리 화면
				phyFaciMngView(gid);
			},
			error : function(request, status, error) {
				console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
			},
			complete : function() {
				//loadingShowHide("hide"); 
			}
		});
	}
}