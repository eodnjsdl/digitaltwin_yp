/**
 * - 업무 / 시설관리 / 체육시설
 * 
 * @returns
 */
$(document).ready(function(){
	//console.log("facilityPhysicalEducation.js");
	//console.log("체육시설");
});

// 체육시설 옵션 설정
function getPhyEduFaciListView() {
	//console.log("getPhyEduFaciListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/phfc/selectPhyEduFaciListView.do', function() {
		//toastr.success("/job/fcmr/phfc/selectPhyEduFaciListView.do", "페이지🙂호🙂출🙂");
    	
    	getPhyEduFaci();
    });
	ui.loadingBar("hide");
};

function getPhyEduFaci() {
	//FACILITY.spaceSearchOption = {}		// 공간검색 옵션 초기화
	
	// grid 기본 세팅
	var $container = $("#container");
	var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]');
	$target.css('height', 'inherit');
	
	ax5.ui.grid.formatter["date"] = function() {
		var date = this.value;
		return date.substr(0, 10);
	}
	
	FACILITY.Ax5UiGrid = null;	// ax5uigrid 전역 변수 
    FACILITY.Ax5UiGrid = new ax5.ui.grid();
    FACILITY.Ax5UiGrid.setConfig({
		target: $target,
		sortable: true,
		multipleSelect: false,
		header: {
			align: "center"
		},
		columns: [
			{key: "gid",			label: "관리번호",		width: 80},
			{key: "fclty_ty", 		label: "시설유형",		width: 100},
			{key: "fclty_nm",		label: "체육시설명",	width: 200},
			{key: "adres",			label: "주소",		width: 300},
			{key: "fond_de",		label: "설립일자",		width: 130},
			{key: "oper_mthd",		label: "운영방식",		width: 100},
			{key: "cttpc_telno",	label: "문의번호",		width: 130},
			{key: "charger_nm",		label: "담당자",		width: 100},
			{key: "last_modf_dt",	label: "최종수정일자",	width: 130,		formatter: "date"},
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
            	selectPhyEduFaciList(this.page.selectPage + 1);	// 페이지 이동
            	$('.hiddenPage').val(this.page.selectPage + 1);
            }
		},
		body: {
			align: "center",
			onClick: function() {
				//this.self.select(this.dindex);
				selectPhyEduFaciDetail(this.item.id);	// 상세보기
			}
		}
	});
	selectPhyEduFaciList(1);
}

// 체육시설 목록 조회
function selectPhyEduFaciList(page) {
	//console.log("selectPhyEduFaciList(page)");
	//console.log("page >>> " + page);
	
	// 팝업 닫기
	ui.closeSubPopup();
	
	//grid 선택창 초기화
	FACILITY.Ax5UiGrid.clearSelect();
	
	//공간 검색 / 사용자 정의 일 경우 이외에는  그리기 영역 지우기
	if($(".waterSpace").hasClass("on")){
		const geomSrchType = $(".facility-spatial-search").closest('.search-area').find('input[name="rad-facility-area"]:checked').val();
		//console.log(geomSrchType);
		if(geomSrchType != "custom"){
			dtmap.draw.dispose();		//그리기 포인트 삭제
			dtmap.draw.clear();			//그리기 영역 초기화
		}
	}
	
	// 검색 조건
	var options;
	
	if ($(".waterProperty").hasClass("on")) {
		//console.log("속성 검색 조건");
		
		//속성 검색
		const filters = [];
		
		var adres = $('#lSrchOptions input[name=adres]').val();					// 읍면동
		var fcltyNm = $('#lSrchOptions input[name=fcltyNm]').val();				// 시설명
		var fcltyTy = $("#lSrchOptions #phyFcltyTy option:selected").val();		// 시설구분
		var operMthd = $("#lSrchOptions #phyOperMthd option:selected").val();	// 운영방식
		
		if (adres) {
			filters.push("adres" + " like " + adres);
		}
		if (fcltyNm) {
			filters.push("fclty_nm" + " like " + fcltyNm);
		}
		if (fcltyTy) {
			filters.push("fclty_ty" + " = " + fcltyTy);
		}
		if (operMthd) {
			filters.push("oper_mthd" + " = " + operMthd);
		}
		
		options = {
			typeNames	: 'tgd_phstrn_fclty' + "",
			perPage		: 10,
			page		: page,
			filter		: filters,
			sortBy		: 'gid',
			sortOrder	: 'DESC'
		};
	} else if ($(".waterSpace").hasClass("on")) {
		//console.log("공간 검색 조건");
		
		const $parent 	= $(".facility-spatial-search").closest('.search-area');
		const type 		= $parent.find('input[name="rad-facility-area"]:checked').val();

		options = {
			typeNames	: 'tgd_phstrn_fclty' + "",
			perPage		: 10,
			page		: page,
			sortBy		: 'gid',
			sortOrder	: 'DESC'
		}
		if (type === 'extent') {
			options.bbox 		= FACILITY.spaceSearchOption.bbox;
		} else {
			options.geometry 	= FACILITY.spaceSearchOption.geometry;
		}
	} else {
		alert("검색 오류");
	}
	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		// 그리드 데이터 전처리
		const list = [];
		for (let i = 0; i < data.features.length; i++) {
			// 좌표 처리
			data.features[i].properties.geomObj = data.features[i].geometry;
        	
			const {id, properties} = data.features[i];
			list.push({...properties, ...{id: id}});
		}
		
		var total = data.totalFeatures;
		var totPge = Math.ceil(total / 10);
		
		if (total >= 0) {
        	$("#bottomPopup .bbs-list-num").html("조회결과: " + total + "건");
        }

		// gird 적용
        FACILITY.Ax5UiGrid.setData({
			list: list,
			page: {
				currentPage: page - 1,	// 현재 페이지
				pageSize: 10,			// 한 페이지의 데이터 갯수
				totalElements: total,	// 전체 데이터 갯수
				totalPages: totPge		// 전체 페이지 갯수
			}
		})
		
		// 지도 아이콘 작업
        dtmap.vector.clear();
        
        // 지도에 GeoJSON 추가
        dtmap.vector.readGeoJson(data, function(feature) {
            // 스타일 콜백 
        	let properties = feature.getProperties();
            let fclty_nm = properties.fclty_nm;
            
            return {
                marker: {
                    src: '/images/poi/sports_poi.png'
                },
                label: {
                    text: ''
                }
            }
        });
        dtmap.vector.fit();
	});
};

// 체육시설 상세보기
function selectPhyEduFaciDetail(id) {
	//console.log("selectPhyEduFaciDetail(item)");
	//console.log("gid >>> " + gid);
	
	//공간정보 편집도구 닫기
	if($(".space-edit-tool").hasClass("opened")){
		clearSpaceEditTool();	//공간정보 편집창 닫기
    }
	
	var gid;
	
	if (typeof id === 'number') {
		gid = id;
		id = "tgd_phstrn_fclty." + id;
	} else if (id.includes('.')) {
		var idArray = id.split(".");
		gid = idArray[1];
	}
	
	//그리드에 행전체 선택되게 수정
	var gridList = FACILITY.Ax5UiGrid.list;
	for (var i = 0; i < gridList.length; i++) {
		//console.log(gridList[i]);
		var grid = gridList[i];
		if (gid == grid.gid) {
			var dindex = grid.__index;
			FACILITY.Ax5UiGrid.clearSelect();
			FACILITY.Ax5UiGrid.focus(dindex);		
		}
	}
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/phfc/selectPhyEduFaciDetail.do", { gid: gid }, function() {
		//toastr.success("/job/fcmr/phfc/selectPhyEduFaciDetail.do", "페이지🙂호🙂출🙂");
		
		dtmap.vector.select(id);		// 지도에 표시
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
};

// 체육시설 등록하기
function insertPhyEduFaciView() {
	//console.log("insertPhyEduFaci()");
	
	if(dtmap.mod == "3D"){
		alert('3d 에서 사용할 수 없습니다');
		arrangeAddBtnMode();
		return false;
	}
	
	// 초기화
	dtmap.draw.dispose();				// 마우스에 파란점 제거
	dtmap.draw.clear();					// 지도에 파란점 제거
	dtmap.vector.clearSelect();			// 선택 해제
	FACILITY.Ax5UiGrid.clearSelect();	// 그리드 선택 해제
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/phfc/insertPhyEduFaciView.do", function() {
		//toastr.success("/job/fcmr/phfc/insertPhyEduFaciView.do", "페이지🙂호🙂출🙂");
		
		ui.callDatePicker();	// DatePicker UI
		
		// 취소 버튼 변경
		$(".bi-cancel").attr("onclick", "closePhyEduFaciPopup();");
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
}

// 체육시설 등록 저장
function insertPhyEduFaci() {
	var fclty_nm = $('#phyEduFaciTbl input[name=fcltyNm]').val();
	if (fclty_nm == '') {
		alert('시설명을 입력해주세요.');
		return false;
	}
	
	var adres = $('#phyEduFaciTbl input[name=adres]').val();
	var geom = $('#phyEduFaciTbl #geom').val();
	if (adres == '' || geom == '') {
		alert('지도에서 위치를 선택해주세요.');
		return false;
	}
	
	var erc_ct = $('#phyEduFaciTbl input[name=ercCt]').val();
	if (erc_ct == '') {
		alert('건립비용을 입력해주세요.');
		return false;
	}
	
	var date = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
	var fond_de = $('#phyEduFaciTbl input[name=fondDe]').val();
	if (fond_de == '') {
		alert('설립일자를 입력해주세요.');
		$('#phyEduFaciTbl input[name=fondDe]').focus();
		return false;
	} else if (!date.test(fond_de)) {
		alert('날짜형식에 맞게 입력해주세요. ex) 0000-00-00');
		$('#phyEduFaciTbl input[name=fondDe]').focus();
		return false;
	}
	
	var buld_size = $('#phyEduFaciTbl input[name=buldSize]').val();
	if (buld_size == '') {
		alert('건물면적을 입력해주세요.');
		return false;
	}
	var lad_size = $('#phyEduFaciTbl input[name=ladSize]').val();
	if (lad_size == '') {
		alert('토지면적을 입력해주세요.');
		return false;
	}
	var manage_nmpr = $('#phyEduFaciTbl input[name=manageNmpr]').val();
	if (manage_nmpr == '') {
		alert('관리인원을 입력해주세요.');
		return false;
	}
	var fyer_utlztn_nmpr = $('#phyEduFaciTbl input[name=fyerUtlztnNmpr]').val();
	if (fyer_utlztn_nmpr == '') {
		alert('연간이용인원을 입력해주세요.');
		return false;
	}
	
	var nm = /^[가-힣a-zA-Z]+$/;
	var charger_nm = $('#phyEduFaciTbl input[name=chargerNm]').val();
	if (charger_nm == '') {
		alert('담당자 이름을 입력해주세요.');
		$('#phyEduFaciTbl input[name=chargerNm]').focus();
		return false;
	} else if (!nm.test(charger_nm)) {
		alert('한글 또는 영문을 이용해 입력해주세요.');
		$('#phyEduFaciTbl input[name=chargerNm]').focus();
		return false;
	}
	
	var tel = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
	var cttpc_telno = $('#phyEduFaciTbl input[name=cttpcTelno]').val();
	if (cttpc_telno == '') {
		alert('담당자의 전화번호를 입력해주세요.');
		$('#phyEduFaciTbl input[name=cttpcTelno]').focus();
		return false;
	} else if (!tel.test(cttpc_telno)) {
		alert('전화번호 형식에 맞게 입력해주세요. ex) 000-0000-0000');
		$('#phyEduFaciTbl input[name=cttpcTelno]').focus();
		return false;
	}
	
	var fclty_sumry = $('#phyEduFaciTbl input[name=fcltySumry]').val();
	if (fclty_sumry == '') {
		alert('시설물개요를 입력해주세요.');
		return false;
	} else {
		// 등록 진행
		if (confirm("등록하시겠습니까?") == true) {
			ui.loadingBar("show");
			
			const params = $("#phyEduFaciFrm").serializeArray();
			//console.log(params);
			
			$.ajax({
				type : "POST",
				url : "/job/fcmr/phfc/insertPhyEduFaci.do",
				dataType : "json",
				data : params,
				/*data : {
					"fcltyNm" 			: fclty_nm,
					"adres" 			: adres,
					"fcltyTy" 			: fclty_ty,
					"operMthd" 			: oper_mthd,
					"ercCt" 			: erc_ct,
					"fondDe" 			: fond_de,
					"buldSize" 			: buld_size,
					"ladSize" 			: lad_size,
					"manageNmpr" 		: manage_nmpr,
					"fyerUtlztnNmpr" 	: fyer_utlztn_nmpr,
					"chrgDeptNm" 		: chrg_dept_nm,
					"chargerNm" 		: charger_nm,
					"cttpcTelno" 		: cttpc_telno,
					"fcltySumry" 		: fclty_sumry,
					"geom" 				: geom
				},*/
				success : function(data){
					alert("정상적으로 등록되었습니다.");
					
					closePhyEduFaciPopup();
					
					$('li[data-tab=waterProperty] .inner-tab').click();				// 속성검색
					$('#lSrchOptions input[name=adres]').val('');					// 읍면동 clear
					$('#lSrchOptions input[name=fcltyNm]').val('');					// 시설명 clear
					$("#lSrchOptions #phyFcltyTy").val('').prop('selected', true);	// 시설구분 clear
					$("#lSrchOptions #phyOperMthd").val('').prop('selected', true);	// 운영방식 clear
					
					selectPhyEduFaciList(1);
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

// 체육시설 수정 화면 표출
function updatePhyEduFaciView(gid) {
	//console.log("updatePhyEduFaciView(gid)");
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/phfc/updatePhyEduFaciView.do", { gid: gid }, function() {
		//toastr.success("/job/fcmr/phfc/updatePhyEduFaciView.do", "페이지🙂호🙂출🙂");
		
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
	var page = $('.hiddenPage').val();
	
	var fclty_nm = $('#phyEduFaciTbl input[name=fcltyNm]').val();
	if (fclty_nm == '') {
		alert('시설명을 입력해주세요.');
		return false;
	}
	
	var adres = $('#phyEduFaciTbl input[name=adres]').val();
	var geom = $('#phyEduFaciTbl #geom').val();
	if (adres == '' || geom == '') {
		alert('지도에서 위치를 선택해주세요.');
		return false;
	}
	
	var erc_ct = $('#phyEduFaciTbl input[name=ercCt]').val();
	if (erc_ct == '') {
		alert('건립비용을 입력해주세요.');
		return false;
	}
	
	var date = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
	var fond_de = $('#phyEduFaciTbl input[name=fondDe]').val();
	if (fond_de == '') {
		alert('설립일자를 입력해주세요.');
		$('#phyEduFaciTbl input[name=fondDe]').focus();
		return false;
	} else if (!date.test(fond_de)) {
		alert('날짜형식에 맞게 입력해주세요. ex) 0000-00-00');
		$('#phyEduFaciTbl input[name=fondDe]').focus();
		return false;
	}
	
	var buld_size = $('#phyEduFaciTbl input[name=buldSize]').val();
	if (buld_size == '') {
		alert('건물면적을 입력해주세요.');
		return false;
	}
	var lad_size = $('#phyEduFaciTbl input[name=ladSize]').val();
	if (lad_size == '') {
		alert('토지면적을 입력해주세요.');
		return false;
	}
	var manage_nmpr = $('#phyEduFaciTbl input[name=manageNmpr]').val();
	if (manage_nmpr == '') {
		alert('관리인원을 입력해주세요.');
		return false;
	}
	var fyer_utlztn_nmpr = $('#phyEduFaciTbl input[name=fyerUtlztnNmpr]').val();
	if (fyer_utlztn_nmpr == '') {
		alert('연간이용인원을 입력해주세요.');
		return false;
	}
	
	var nm = /^[가-힣a-zA-Z]+$/;
	var charger_nm = $('#phyEduFaciTbl input[name=chargerNm]').val();
	if (charger_nm == '') {
		alert('담당자 이름을 입력해주세요.');
		$('#phyEduFaciTbl input[name=chargerNm]').focus();
		return false;
	} else if (!nm.test(charger_nm)) {
		alert('한글 또는 영문을 이용해 입력해주세요.');
		$('#phyEduFaciTbl input[name=chargerNm]').focus();
		return false;
	}
	
	var tel = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
	var cttpc_telno = $('#phyEduFaciTbl input[name=cttpcTelno]').val();
	if (cttpc_telno == '') {
		alert('담당자의 전화번호를 입력해주세요.');
		$('#phyEduFaciTbl input[name=cttpcTelno]').focus();
		return false;
	} else if (!tel.test(cttpc_telno)) {
		alert('전화번호 형식에 맞게 입력해주세요. ex) 000-0000-0000');
		$('#phyEduFaciTbl input[name=cttpcTelno]').focus();
		return false;
	}
	
	var fclty_sumry = $('#phyEduFaciTbl input[name=fcltySumry]').val();
	if (fclty_sumry == '') {
		alert('시설물개요를 입력해주세요.');
		return false;
	} else {
		if (confirm("체육시설 정보를 수정하시겠습니까?") == true) {
			ui.loadingBar("show");
			
			const params = $("#phyEduFaciFrm").serializeArray();
			//console.log(params);
			
			$.ajax({
				type : "POST",
				url : "/job/fcmr/phfc/updatePhyEduFaci.do",
				dataType : "json",
				data : params,
				/*data : {
					"gid" 				: gid,
					"fcltyNm" 			: fclty_nm,
					"adres" 			: adres,
					"fcltyTy" 			: fclty_ty,
					"operMthd" 			: oper_mthd,
					"ercCt" 			: erc_ct,
					"fondDe" 			: fond_de,
					"buldSize" 			: buld_size,
					"ladSize" 			: lad_size,
					"manageNmpr" 		: manage_nmpr,
					"fyerUtlztnNmpr" 	: fyer_utlztn_nmpr,
					"chrgDeptNm" 		: chrg_dept_nm,
					"chargerNm" 		: charger_nm,
					"cttpcTelno" 		: cttpc_telno,
					"fcltySumry" 		: fclty_sumry,
					"geom" 				: geom
				},*/
				success : function(data){
					selectPhyEduFaciList(page);
					selectPhyEduFaciDetail(gid);
					
					alert("정상적으로 수정되었습니다.");
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

// 체육시설 삭제
function deletePhyEduFaci(gid) {
	if (confirm("체육시설 정보를 삭제하시겠습니까?") == true) {    // 확인
		ui.loadingBar("show");
		
		$.ajax({
			type : "POST",
			url : "/job/fcmr/phfc/deletePhyEduFaci.do",
			dataType : "json",
			data : {
				"gid" : gid
			},
			success : function(data) {
				selectPhyEduFaciList(1);
				ui.closeSubPopup();
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

// 운영정보 - 금액 최대 길이 check
function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}   
}

// 운영정보 등록
function insertPhyMng(gid) {
	//alert('운영정보 등록 GID: ' + gid);
	
	var oper_year 		= $('#phyMng select[name=oper_year]').val();
	var acqs_amount 	= $('#phyMng input[name=acqs_amount]').val();
	var dprc_am 		= $('#phyMng input[name=dprc_am]').val();
	var dprc_acmtl_am 	= $('#phyMng input[name=dprc_acmtl_am]').val();
	var bk_amount 		= $('#phyMng input[name=bk_amount]').val();
	var contents_yycnt 	= $('#phyMng input[name=contents_yycnt]').val();
	var oper_ct 		= $('#phyMng input[name=oper_ct]').val();
	var oper_ern 		= $('#phyMng input[name=oper_ern]').val();
	
	if (acqs_amount == '' || dprc_am == '' || dprc_acmtl_am == '' || bk_amount == '' || oper_ct == '' || oper_ern == '') {
		alert("상세정보를 모두 입력해주세요");
		
		return false;
	} else {
		const params = $("#phyMngFrm").serializeArray();
		
		$.ajax({
			type : "POST",
			url : "/job/fcmr/phfc/checkPhyMngYear.do",
			dataType : "json",
			data : {
				"gid" 			: gid,
				"oper_year" 	: oper_year
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
							data : params,
							/*data : {
								"gid" 				: gid,
								"oper_year" 		: oper_year,
								"acqs_amount" 		: acqs_amount,
								"dprc_am" 			: dprc_am,
								"dprc_acmtl_am" 	: dprc_acmtl_am,
								"bk_amount" 		: bk_amount,
								"contents_yycnt" 	: contents_yycnt,
								"oper_ct" 			: oper_ct,
								"oper_ern" 			: oper_ern
							},*/
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
							data : params,
							/*data : {
								"gid" 				: gid,
								"oper_year" 		: oper_year,
								"acqs_amount" 		: acqs_amount,
								"dprc_am" 			: dprc_am,
								"dprc_acmtl_am" 	: dprc_acmtl_am,
								"bk_amount" 		: bk_amount,
								"contents_yycnt" 	: contents_yycnt,
								"oper_ct" 			: oper_ct,
								"oper_ern" 			: oper_ern
							},*/
							success : function(data) {
								$('.align-right').val('');
								
								getPhyMngView(gid);	// 운영정보 관리 화면
								
								alert("정상적으로 등록되었습니다");
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
		
		ui.loadingBar("show");

		$.ajax({
			type : "POST",
			url : "/job/fcmr/phfc/deletePhyMng.do",
			dataType : "json",
			data : {
				"gid" 			: gid,
				"oper_year" 	: oper_year
			},
			success : function(data){
				$('.align-right').val('');
				
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
//	var oper_strt_time 	= $('#phyFaciMng select[name=oper_strt_time]').val() + ':00';
//	var oper_end_time 	= $('#phyFaciMng select[name=oper_end_time]').val() + ':00';
//	var rsrv_at 		= $('#phyFaciMng input:radio[name=rsrv_at]:checked').val();
//	var ho_cnt 			= $('#phyFaciMng input[name=ho_cnt]').val();
	
	var asstn_fclty_nm = $('#phyFaciMng input[name=asstn_fclty_nm]').val();
	if (asstn_fclty_nm == '') {
		alert('시설명을 입력해주세요.');
		$('#phyFaciMng input[name=asstn_fclty_nm]').focus();
		return false;
	}
	var geom = $('#phyFaciMng #geom').val();
	if (geom == '') {
		alert('지도에서 선택 버튼을 눌러 위치를 입력해주세요.');
		return false;
	}
	var fclty_dc 		= $('#phyFaciMng input[name=fclty_dc]').val();
	if (fclty_dc == '') {
		alert('시설설명을 입력해주세요.');
		$('#phyFaciMng input[name=fclty_dc]').focus();
		return false;
	} else {
		// 운영정보 신규 등록
		if (!confirm("등록하시겠습니까?")) {
			return false;	// 취소(아니오) 버튼 클릭 시 이벤트
		} else {
			const params = $("#phyFaciMngFrm").serializeArray();
			ui.loadingBar("show");
			
			$.ajax({
				type : "POST",
				url : "/job/fcmr/phfc/insertPhyFaciMng.do",
				dataType : "json",
				data : params,
				/*data : {
					"gid" 				: gid,
					"asstn_fclty_nm" 	: asstn_fclty_nm,
					"oper_strt_time" 	: oper_strt_time,
					"oper_end_time" 	: oper_end_time,
					"rsrv_at" 			: rsrv_at,
					"ho_cnt" 			: ho_cnt,
					"fclty_dc" 			: fclty_dc,
					"geom" 				: geom
				},*/
				success : function(data) {
					$('.align-right').val('');
					
					getPhyFaciMngView(gid);	// 시설정보 관리 화면
					
					alert("정상적으로 등록되었습니다");
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
				"gid" 		: gid,
				"facList" 	: facList
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

// 체육시설 popup창 닫기
function closePhyEduFaciPopup() {
	dtmap.vector.clearSelect();			//선택 해제
	
	dtmap.draw.dispose();				// 마우스에 파란점 제거
	dtmap.draw.clear();					// 지도에 파란점 제거
	
	ui.closeSubPopup();					// 팝업 닫기
	
	FACILITY.Ax5UiGrid.clearSelect();	//그리드 선택 해제
}

//체육시설 엑셀 저장
function phyEduFaciExcel() {
	var $container = $("#container");
    var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid-excel"]');	//가상의 ax5uigrid 공간에 처리 
    $target.css('display', 'none');
    
	FACILITY.Ax5UiGridAll = null;	//Ax5UiGridAll 전역 변수 
    FACILITY.Ax5UiGridAll = new ax5.ui.grid();
    FACILITY.Ax5UiGridAll.setConfig({
		target:  $target,
        sortable: true,
        multipleSelect: false,
        header: {
			align: "center"
		},
        columns: [
			{key: "gid",				label: "관리번호",			width: '*'},
			{key: "fclty_nm",			label: "체육시설명",		width: '*'},
			{key: "fclty_ty", 			label: "시설유형",			width: '*'},
			{key: "oper_mthd",			label: "운영방식",			width: '*'},
			{key: "fond_de",			label: "설립일자",			width: '*'},
			{key: "buld_size",			label: "건물크기",			width: '*'},
			{key: "lad_size",			label: "토지크기",			width: '*'},
			{key: "stdm_stndrd",		label: "경기장규격",		width: '*'},
			{key: "adtm_aceptnc_nmpr",	label: "관람석수용인원",		width: '*'},
			{key: "manage_nmpr",		label: "관리인원",			width: '*'},
			{key: "fyer_utlztn_nmpr",	label: "연간이용인원",		width: '*'},
			{key: "erc_ct",				label: "건립비용",			width: '*'},
			{key: "adres",				label: "주소",			width: '*'},
			{key: "chrg_dept_nm",		label: "담당부서",			width: '*'},
			{key: "charger_nm",			label: "담당자",			width: '*'},
			{key: "cttpc_telno",		label: "문의번호",			width: '*'},
			{key: "fclty_sumry",		label: "시설개요",			width: '*'},
		],
		body: {
			align: "center"
		}
    });
    
	// 검색 조건
	var options;
	
	if ($(".waterProperty").hasClass("on")) {
		//속성 검색
		const filters = [];
		
		var adres = $('#lSrchOptions input[name=adres]').val();					// 읍면동
		var fcltyNm = $('#lSrchOptions input[name=fcltyNm]').val();				// 시설명
		var fcltyTy = $("#lSrchOptions #phyFcltyTy option:selected").val();		// 시설구분
		var operMthd = $("#lSrchOptions #phyOperMthd option:selected").val();	// 운영방식
		
		if (adres) {
			filters.push("adres" + " like " + adres);
		}
		if (fcltyNm) {
			filters.push("fclty_nm" + " like " + fcltyNm);
		}
		if (fcltyTy) {
			filters.push("fclty_ty" + " = " + fcltyTy);
		}
		if (operMthd) {
			filters.push("oper_mthd" + " = " + operMthd);
		}
		
		options = {
			typeNames	: 'tgd_phstrn_fclty' + "",
			filter		: filters,
			sortBy		: 'gid',
			sortOrder	: 'ASC'
		};
	} else if ($(".waterSpace").hasClass("on")) {
		const $parent 	= $(".facility-spatial-search").closest('.search-area');
		const type 		= $parent.find('input[name="rad-facility-area"]:checked').val();

		options = {
			typeNames	: 'tgd_phstrn_fclty' + "",
			sortBy		: 'gid',
			sortOrder	: 'ASC'
		}
		if (type === 'extent') {
			options.bbox 		= FACILITY.spaceSearchOption.bbox;
		} else {
			options.geometry 	= FACILITY.spaceSearchOption.geometry;
		}
	} else {
		alert("검색 오류");
	}
	
	// 엑셀파일 날짜_시간
	var today = new Date(); 
	let year = dateNum(today.getFullYear());		// 년도
	let month = dateNum(today.getMonth() + 1, 2);	// 월
	let date = dateNum(today.getDate(), 2);			// 날짜
	let hours = dateNum(today.getHours(), 2);		// 시
	let minutes = dateNum(today.getMinutes(), 2);	// 분
	let seconds = dateNum(today.getSeconds(), 2);	// 초

	var todayDate = year+month+date+'_'+hours+minutes+seconds;
	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		// 그리드 데이터 전처리
		const list = [];
		for (let i = 0; i < data.features.length; i++) {
			// 좌표 처리
			data.features[i].properties.geomObj = data.features[i].geometry;
        	
			const {id, properties} = data.features[i];
			list.push({...properties, ...{id: id}});
		}
		
		// gird 적용
        FACILITY.Ax5UiGridAll.setData(list);
        
        //엑셀 export
		FACILITY.Ax5UiGridAll.exportExcel("체육시설목록_" + todayDate + ".xls");
	});
}

function dateNum(number, length) {
	var num = '' + number;
	while (num.length < length) {
		num = '0' + num;
	}
	return num;
}
