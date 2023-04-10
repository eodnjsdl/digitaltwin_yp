/**
 * - 업무 / 시설관리 / 체육시설
 * 
 * @returns
 */
$(document).ready(function(){
	console.log("facilityPhysicalEducation.js");
	console.log("체육시설");
});

// 체육시설 옵션 설정
function getPhyEduFaciListView() {
	//console.log("getPhyEduFaciListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/phfc/selectPhyEduFaciListView.do', function() {
		toastr.success("/job/fcmr/phfc/selectPhyEduFaciListView.do", "페이지🙂호🙂출🙂");
		
		// grid 기본 세팅
		var $container = $("#container");
		var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]');
		$target.css('height', 'inherit');
		
		ax5.ui.grid.formatter["date"] = function() {
			var date = this.value;
			
			return date.substr(0, 10);
		}
		
		baseGrid = null;	//axgrid 전역 변수 
		baseGrid = new ax5.ui.grid();
		baseGrid.setConfig({
			target: $target,
			sortable: true,
			multipleSelect: false,
			header: {
				align: "center"
			},
			columns: [
				{key: "gid",			label: "관리번호",		width: 80,		align: "center"},
				{key: "fclty_ty", 		label: "시설구분",		width: 100,		align: "center"},
				{key: "fclty_nm",		label: "체육시설명",	width: 200},
				{key: "adres",			label: "주소",		width: 300},
				{key: "fond_de",		label: "설립일자",		width: 130,		align: "center"},
				{key: "oper_mthd",		label: "운영방식",		width: 100,		align: "center"},
				{key: "cttpc_telno",	label: "문의번호",		width: 130,		align: "center"},
				{key: "charger_nm",		label: "담당자",		width: 100,		align: "center"},
				{key: "last_modf_dt",	label: "최종수정일자",	width: 130,		align: "center",	formatter: "date"},
			],
			page: {
				navigationItemCount: 10,	// 보여지는 클릭 가능 페이지 번호
		 		height: 30,
				display: true,
				firstIcon: '&lt;&lt;',
				prevIcon: '&lt;',
				nextIcon: '&gt;',
				lastIcon: '&gt;&gt;',
	            onChange: function() {
	            	selectPhyEduFaciList(this.page.selectPage + 1);
	            }
			},
			body: {
				onClick: function() {
					//this.self.select(this.dindex);
					//console.log(this.item);
					selectPhyEduFaciDetail(this.item.gid);
				}
			}
		});
	});
	
	ui.loadingBar("hide");
	selectPhyEduFaciList(1);
};

// 체육시설 목록 조회
function selectPhyEduFaciList(page) {
	//console.log("selectPhyEduFaciList(page)");
	//console.log("page >>> " + page);
	
	//검색 조건
	const filters = [];
	
	var sporSearchAdres = $('input[name=sporSearchAdres]').val();				//읍면동
	var sporSearchAlsfc_nm = $('input[name=sporSearchAlsfc_nm]').val();			//시설명
	var sports_fcty_tp_cd = $("#sports_fcty_tp_cd option:selected").val();		// 시설구분
	var sports_oper_mthd_cd = $("#sports_oper_mthd_cd option:selected").val();	// 운영방식
	
	if (sporSearchAdres) {
		filters.push("adres" + " like " + sporSearchAdres)
	}
	if (sporSearchAlsfc_nm) {
		filters.push("fclty_nm" + " like " + sporSearchAlsfc_nm)
	}
	if (sports_fcty_tp_cd) {
		filters.push("fclty_ty" + " = " + sports_fcty_tp_cd)
	}
	if (sports_oper_mthd_cd) {
		filters.push("oper_mthd" + " = " + sports_oper_mthd_cd)
	}

	var options;
	options = {
		typeNames: 'tgd_phstrn_fclty' + "",
		perPage: 10,
		page: page,
		filter: filters
	};
	
	const promise = dtmap.wfsGetFeature(options);
	
	promise.then(function(data) {
		//그리드 데이터 전처리
		const list = [];
		for (let i = 0; i < data.features.length; i++) {
			const {id, properties} = data.features[i];
			
			//좌표 처리
			var geomType = data.features[i].geometry.type;
			var geomCoord = data.features[i].geometry.coordinates[0]+" "+data.features[i].geometry.coordinates[1];
        	
        	data.features[i].properties.geom = geomType + "(" + geomCoord + ")";
        	
			list.push({...properties, ...{id: id}});
		}
		
		var total = data.totalFeatures;
		var totPge = Math.ceil(total / 10);
		
		if (total > 0) {
        	$("#bottomPopup .bbs-list-num").html("조회결과: " + total + "건");
        }

		baseGrid.setData({
			list: list,
			page: {
				currentPage: page - 1,	// 현재 페이지
				pageSize: 10,			// 한 페이지의 데이터 갯수
				totalElements: total,	// 전체 데이터 갯수
				totalPages: totPge		// 전체 페이지 갯수
			}
		})
	});
};

// 체육시설 상세보기
function selectPhyEduFaciDetail(gid) {
	//console.log("selectPhyEduFaciDetail(item)");
	//console.log("gid >>> " + gid);
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/phfc/selectPhyEduFaciDetail.do", { gid: gid }, function() {
		toastr.success("/job/fcmr/phfc/selectPhyEduFaciDetail.do", "페이지🙂호🙂출🙂");
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
};

// 체육시설 등록하기
function insertPhyEduFaciView() {
	//console.log("insertPhyEduFaci()");
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/phfc/insertPhyEduFaciView.do", function() {
		toastr.success("/job/fcmr/phfc/insertPhyEduFaciView.do", "페이지🙂호🙂출🙂");
		
		ui.callDatePicker();	// DatePicker UI
		
		// 취소 버튼 변경
		$(".bi-cancel").attr("onclick", "cancleSportsPopup();");
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
}

// 체육시설 등록 저장
function insertPhyEduFaci() {
	var fclty_nm = $('input[name=fclty_nm]').val();
	var adres = $('input[name=adres]').val();
	var fclty_ty = $('#fclty_ty option:selected').val();
	var oper_mthd = $('#oper_mthd option:selected').val();
	var erc_ct = $('input[name=erc_ct]').val();
	var fond_de = $('input[name=fond_de]').val();
	var buld_size = $('input[name=buld_size]').val();
	var lad_size = $('input[name=lad_size]').val();
	var manage_nmpr = $('input[name=manage_nmpr]').val();
	var fyer_utlztn_nmpr = $('input[name=fyer_utlztn_nmpr]').val();
	var chrg_dept_nm =  $('#chrg_dept_nm option:selected').val();
	var charger_nm = $('input[name=charger_nm]').val();
	var cttpc_telno = $('input[name=cttpc_telno]').val();
	var fclty_sumry = $('input[name=fclty_sumry]').val();
	var geom = $('#geom').val();
	
	if (fclty_nm == '' || adres == '' || fclty_ty == '' || oper_mthd == '' ||erc_ct == ''
			|| fond_de == '' || buld_size == '' || lad_size == '' || manage_nmpr == '' || fyer_utlztn_nmpr == ''
			|| chrg_dept_nm == '' || charger_nm == '' || cttpc_telno == '' || fclty_sumry == '' || geom == '') {
		alert("상세정보를 입력해주세요");
		
		return false;
	} else {
		if (confirm("등록하시겠습니까?") == true) {
			ui.loadingBar("show");
			
			$.ajax({
				type : "POST",
				url : "/job/fcmr/phfc/insertPhyFaciMng.do",
				dataType : "json",
				data : {
					"fcltyNm" : fclty_nm,
					"adres" : adres,
					"fcltyTy" : fclty_ty,
					"operMthd" : oper_mthd,
					"ercCt" : erc_ct,
					"fondDe" : fond_de,
					"buldSize" : buld_size,
					"ladSize" : lad_size,
					"manageNmpr" : manage_nmpr,
					"fyerUtlztnNmpr" : fyer_utlztn_nmpr,
					"chrgDeptNm" : chrg_dept_nm,
					"chargerNm" : charger_nm,
					"cttpcTelno" : cttpc_telno,
					"fcltySumry" : fclty_sumry,
					"geom" : geom
				},
				success : function(data){
					$('.sporInput').val('');
					
					alert("정상적으로 등록되었습니다.");
					//bottomPopupOpen('physicalEducationFacility');
					selectPhyEduFaciList(1);
					//removePoint(GLOBAL.NomalIcon);
				},
				error: function(request,status,error) {
					console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
				},
				complete : function() {
					ui.loadingBar("hide");
				}
			});
		} else {
			return;
		}
	}
}

//체육시설 수정 화면 표출
function updatePhyEduFaciView(gid) {
	//console.log("updatePhyEduFaciView(gid)");
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/phfc/updatePhyEduFaciView.do", { gid: gid }, function() {
		toastr.success("/job/fcmr/phfc/updatePhyEduFaciView.do", "페이지🙂호🙂출🙂");
		
		ui.callDatePicker();	// DatePicker UI
		
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
	ui.loadingBar("show");
	if (confirm("체육시설 정보를 삭제 하시겠습니까?") == true){    //확인
		$.ajax({
			type : "POST",
			url : "/job/fcmr/phfc/deletePhyFaciMng.do",
			dataType : "json",
			data : {
				"gid" : gid
			},
			success : function(data) {
				ui.closeSubPopup();
				selectPhyEduFaciList(1);
			},
			complete : function() {
				ui.loadingBar("hide");
			}
		});
	} else {
		return false;
	}
}

// 운영정보 관리 화면 표출
function getPhyMngView(gid) {
	ui.openPopup("rightSubPopup");
	
	var formData = new FormData();
	formData.append('gid', gid);

	$.ajax({
		type : "POST",
		url : "/job/fcmr/phfc/selectPhyMngList.do",
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
function getPhyMngViewPaging(pageIndex, gid) {
	loadingShowHide("show"); 
	
	var formData = new FormData();

	pageIndex = parseInt(pageIndex);
	formData.append('pageIndex', pageIndex);
		
	gid = parseInt(gid);
	formData.append('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/fcmr/phfc/selectPhyMngList.do",
		dataType : "html",
		data : formData,
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status) {
			if(status == "success") {
				$("#rightSubPopup").append(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		},
		complete : function() {
			loadingShowHide("hide"); 
		}
	});
}

//운영정보 - 금액 최대 길이 check
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
						return false;	// 취소(아니오) 버튼 클릭 시 이벤트
					} else {
					    // 운영정보 수정
						ui.loadingBar("show");
						
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
								getPhyMngView(gid);	// 운영정보 관리 화면
							},
							error : function(request, status, error) {
								console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
							},
							complete : function() {
								ui.loadingBar("hide");
							}
						});
					}
				} else {
					// 운영정보 신규 등록
					if (!confirm("등록하시겠습니까?")) {
						return false;	// 취소(아니오) 버튼 클릭 시 이벤트
					} else {
						ui.loadingBar("show");
						
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
								
								getPhyMngView(gid);	// 운영정보 관리 화면
							},
							error : function(request,status,error) {
								console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
							},
							complete : function() {
								ui.loadingBar("hide");
							}
						});
					}
				}
			},
			error : function(request, status, error) {
			},
			complete : function (){
				ui.loadingBar("hide");
			}
		});
	}
}

// 운영정보 삭제
function deletePhyMng() {
	//alert('운영정보 삭제');
	
	if (!confirm("삭제하시겠습니까?")) {
		return false;	// 취소(아니오) 버튼 클릭 시 이벤트
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
				
				getPhyMngView(gid);	// 운영정보 관리 화면
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

// 시설정보 관리 화면 표출
function getPhyFaciMngView(gid) {
	ui.openPopup("rightSubPopup");
	
	var formData = new FormData();
	formData.append('gid', gid);

	$.ajax({
		type : "POST",
		url : "/job/fcmr/phfc/selectPhyFaciMngList.do",
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
function getPhyFaciMngViewPaging(pageIndex, gid) {
	ui.loadingBar("show");
	
	var formData = new FormData();

	pageIndex = parseInt(pageIndex);
	formData.append('pageIndex', pageIndex);
		
	gid = parseInt(gid);
	formData.append('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/fcmr/phfc/selectPhyFaciMngList.do",
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
			ui.loadingBar("hide");
		}
	});
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
			return false;	// 취소(아니오) 버튼 클릭 시 이벤트
		} else {
			ui.loadingBar("show");
			
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
					
					getPhyFaciMngView(gid);	// 시설정보 관리 화면
				},
				error : function(request, status, error) {
					console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
				},
				complete : function() {
					ui.loadingBar("hide");
				}
			});
		}
	}
}

// 시설정보 삭제
function deletePhyFaciMng() {
	//alert('시설정보 삭제 GID');
	
	if (!confirm("삭제하시겠습니까?")) {
		return false;	// 취소(아니오) 버튼 클릭 시 이벤트
	} else {
		ui.loadingBar("show");
		
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
				
				getPhyFaciMngView(gid);	// 시설정보 관리 화면
			},
			error : function(request, status, error) {
				console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
			},
			complete : function() {
				ui.loadingBar("hide");
			}
		});
	}
}

// 체육시설 엑셀 저장
function fn_downloadExcel() {
	alert('체육시설 엑셀 저장');
}

// geom 값 넣기
function positionCallback(pointGeom, address) {
	$('input[name=adres]').attr('value', "경기도 " + address);
	$("#geom").val(pointGeom);
}

// 체육시설 팝업 취소 버튼
function cancleSportsPopup(){
	//$('#selectSafetyFacilLampMng').removeClass('opened');
	//removePoint(GLOBAL.NomalIcon);
	ui.closeSubPopup();
}

// 체육시설 상세보기로 back
function backPhyEduFaciDetail(gid, lon, lat){
	//$("#selectSafetyFacilLampMng").addClass("opened");
	//destroy();
	selectPhyEduFaciDetail(gid, lon, lat);
}
