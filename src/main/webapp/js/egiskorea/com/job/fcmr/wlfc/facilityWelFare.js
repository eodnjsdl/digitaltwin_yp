/**
 * - 업무 / 시설관리 / 복지시설
 * 
 * @returns
 */
$(document).ready(function(){
	//console.log("facilityWelFare.js");
	//console.log("복지시설");
});

// 복지시설 옵션 설정
function getWelFareFaciListView() {
	//console.log("getWelFareFaciListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/wlfc/selectWelFareFaciListView.do', function() {
		//toastr.success("/job/fcmr/wlfc/selectWelFareFaciListView.do", "페이지🙂호🙂출🙂");
    	
    	getWelFareFaci();
    });
	ui.loadingBar("hide");
};

function getWelFareFaci() {
	FACILITY.spaceSearchOption = {}		// 공간검색 옵션 초기화
	
	// grid 기본 세팅
	var $container = $("#container");
	var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]');
	$target.css('height', 'inherit');
	
	// 시설구분 selectbox
	getCmmCodeData('FCLTCD', '#lSrchOptions #welFcltySe');
	
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
			{key: "fclty_se_nm",	label: "시설구분",		width: 220},
			{key: "fclty_nm",		label: "시설명",		width: 300},
			{key: "rn_adres",		label: "주소",		width: 500},
			{key: "cttpc_telno",	label: "전화번호",		width: 250}
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
            	selectWelFareFaciList(this.page.selectPage + 1);
            	$('.hiddenPage').val(this.page.selectPage + 1);
            }
		},
		body: {
			align: "center",
			onClick: function() {
				//this.self.select(this.dindex);
				//console.log(this.item);
				selectWelFareFaciDetail(this.item.id);
			}
		}
	});
	selectWelFareFaciList(1);
}

// 복지시설 목록 조회
function selectWelFareFaciList(page) {
	//console.log("selectWelFareFaciList(page)");
	//console.log("page >>> " + page);
	
	// 팝업 닫기
	ui.closeSubPopup();
	
	// 검색 조건
	var options;
	
	if ($(".waterProperty").hasClass("on")) {
		//console.log("속성 검색 조건");
		
		// 속성 검색
		const filters = [];
		
		var fcltySe = $("#lSrchOptions #welFcltySe option:selected").val();	// 시설구분
		var rnAdres = $('#lSrchOptions input[name=rnAdres]').val();			// 도로명주소
		var fcltyNm = $('#lSrchOptions input[name=fcltyNm]').val();			// 시설명
		
		if (fcltySe) {
			filters.push("fclty_se" + " = " + fcltySe);
		}
		if (rnAdres) {
			filters.push("rn_adres" + " like " + rnAdres);
		}
		if (fcltyNm) {
			filters.push("fclty_nm" + " like " + fcltyNm);
		}
		
		options = {
			typeNames	: "tgd_sclwlfr_fclty_status" + "",
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
			typeNames	: 'tgd_sclwlfr_fclty_status' + "",
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
			// 시설구분 형식 코드 변경
        	var fclty_se = data.features[i].properties.fclty_se;
        	data.features[i].properties.fclty_se_nm = getCmmCodeDataArray("FCLTCD", fclty_se);
        	
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
                    src: '/images/poi/welfare_poi.png'
                },
                label: {
                    text: ''
                }
            }
        });
        dtmap.vector.fit();
	});
};

// 복지시설 상세보기
function selectWelFareFaciDetail(id) {
	//console.log("selectWelFareFaciDetail(gid)");
	//console.log("gid >>> " + gid);
	
	var gid;
	
	if (typeof id === 'number') {
		gid = id;
		id = "tgd_sclwlfr_fclty_status." + id;
	} else if (id.includes('.')) {
		var idArray = id.split(".");
		gid = idArray[1];
	}

	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/wlfc/selectWelFareFaciDetail.do", { gid: gid }, function() {
		//toastr.success("/job/fcmr/wlfc/selectWelFareFaciDetail.do", "페이지🙂호🙂출🙂");
		
		dtmap.vector.select(id);		// 지도에 표시
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
};

// 복지시설 등록하기
function insertWelFareFaciView() {
	//console.log("insertWelFareFaci()");
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/wlfc/insertWelFareFaciView.do", function() {
		//toastr.success("/job/fcmr/wlfc/insertWelFareFaciView.do", "페이지🙂호🙂출🙂");
		
		// 시설구분 selectbox
		getCmmCodeData('FCLTCD', '#inWelFareFaciTbl #wel_fclty_se');
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
}

// 복지시설 등록 저장
function insertWelFareFaci() {
	var fclty_nm = $('#inWelFareFaciTbl input[name=fcltyNm]').val();
	if (fclty_nm == '') {
		alert('시설명을 입력해주세요.');
		$('#inWelFareFaciTbl input[name=fcltyNm]').focus();
		return false;
	}
	
	// NULL값도 가능하지만 값이 입력되면 유효성 검사
	var tel = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
	var cttpc_telno = $('#inWelFareFaciTbl input[name=cttpcTelno]').val();
	if (cttpc_telno == '') {
		alert('전화번호를 입력해주세요.');
		$('#inWelFareFaciTbl input[name=cttpcTelno]').focus();
		return false;
	} else if (!tel.test(cttpc_telno)) {
		alert('전화번호 형식에 맞게 입력해주세요. ex) 000-0000-0000');
		$('#inWelFareFaciTbl input[name=cttpcTelno]').focus();
		return false;
	}
	
	var rn_adres = $('#inWelFareFaciTbl input[name=rnAdres]').val();
	if (rn_adres == '') {
		alert('도로명주소를 입력해주세요.');
		$('#inWelFareFaciTbl input[name=rnAdres]').focus();
		return false;
	}
	
	var zipNum = /^[0-9]+$/;
	var zip = $('#inWelFareFaciTbl input[name=zip]').val();
	if (zip == '') {
		alert('우편번호를 입력해주세요.');
		$('#inWelFareFaciTbl input[name=zip]').focus();
		return false;
	} else if (!zipNum.test(zip)) {
		alert('우편번호를 정확하게 입력해주세요.');
		$('#inWelFareFaciTbl input[name=zip]').focus();
		return false;
	}

	var lnm_adres = $('#inWelFareFaciTbl input[name=lnmAdres]').val();
	var geom = $('#inWelFareFaciTbl #geom').val();
	if (lnm_adres == '' || geom == '') {
		alert('지도에서 위치를 선택해주세요.');
		return false;
	} else {
		// 등록 진행
		if (confirm("등록하시겠습니까?") == true) {
			ui.loadingBar("show");
			
			const params = $("#inWelFareFaciFrm").serializeArray();
		    //console.log(params);
			
			$.ajax({
				type : "POST",
				url : "/job/fcmr/wlfc/insertWelFareFaci.do",
				dataType : "json",
				data : params,
				success : function(data) {
					alert("정상적으로 등록되었습니다.");
					closeWelFarePopup();
					
					$('li[data-tab=waterProperty] .inner-tab').click();				// 속성검색
					$('#lSrchOptions input[name=fcltyNm]').val('');					// 시설명 clear
					$('#lSrchOptions input[name=rnAdres]').val('');					// 도로명주소 clear
					$("#lSrchOptions #welFcltySe").val('').prop('selected', true);	// 시설구분 clear
					
					selectWelFareFaciList(1);
				},
				error : function(request,status,error) {
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

// 복지시설 수정 화면 표출
function updateWelFareFaciView(gid) {
	//console.log("updateWelFareFaciView(gid)");
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/wlfc/updateWelFareFaciView.do", { gid: gid }, function() {
		//toastr.success("/job/fcmr/wlfc/updateWelFareFaciView.do", "페이지🙂호🙂출🙂");
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
}

// 복지시설 수정 저장
function updateWelFareFaci(gid) {
	var page = $('.hiddenPage').val();
	
	var fclty_nm = $('#upWelFareFaciTbl input[name=fcltyNm]').val();
	if (fclty_nm == '') {
		alert('시설명을 입력해주세요.');
		$('#upWelFareFaciTbl input[name=fcltyNm]').focus();
		return false;
	}
	
	// NULL값도 가능하지만 값이 입력되면 유효성 검사
	var tel = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
	var cttpc_telno = $('#upWelFareFaciTbl input[name=cttpcTelno]').val();
	if (cttpc_telno == '') {
		alert('전화번호를 입력해주세요.');
		$('#upWelFareFaciTbl input[name=cttpcTelno]').focus();
		return false;
	} else if (!tel.test(cttpc_telno)) {
		alert('전화번호 형식에 맞게 입력해주세요. ex) 000-0000-0000');
		$('#upWelFareFaciTbl input[name=cttpcTelno]').focus();
		return false;
	}
	
	var rn_adres = $('#upWelFareFaciTbl input[name=rnAdres]').val();
	if (rn_adres == '') {
		alert('도로명주소를 입력해주세요.');
		$('#upWelFareFaciTbl input[name=rnAdres]').focus();
		return false;
	}
	
	var zipNum = /^[0-9]+$/;
	var zip = $('#upWelFareFaciTbl input[name=zip]').val();
	if (zip == '') {
		alert('우편번호를 입력해주세요.');
		$('#upWelFareFaciTbl input[name=zip]').focus();
		return false;
	} else if (!zipNum.test(zip)) {
		alert('우편번호를 정확하게 입력해주세요.');
		$('#upWelFareFaciTbl input[name=zip]').focus();
		return false;
	}

	var lnm_adres = $('#upWelFareFaciTbl input[name=lnmAdres]').val();
	var geom = $('#upWelFareFaciTbl #geom').val();
	if (lnm_adres == '' || geom == '') {
		alert('지도에서 위치를 선택해주세요.');
		return false;
	} else {
		// 수정 진행
		if (confirm("복지시설 정보를 수정하시겠습니까?") == true) {
			ui.loadingBar("show");
			
			const params = $("#upWelFareFaciFrm").serializeArray();
			//console.log(params);
			
			$.ajax({
				type : "POST",
				url : "/job/fcmr/wlfc/updateWelFareFaci.do",
				dataType : "json",
				data : params,
				success : function(data) {
					selectWelFareFaciList(page);
					selectWelFareFaciDetail(gid);
					
					alert("정상적으로 수정되었습니다.");
				},
				error : function(request, status, error) {
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

// 복지시설 삭제
function deleteWelFareFaci(gid) {
	if (confirm("복지시설 정보를 삭제하시겠습니까?") == true) {    // 확인
		ui.loadingBar("show");
		
		$.ajax({
			type : "POST",
			url : "/job/fcmr/wlfc/deleteWelFareFaci.do",
			dataType : "json",
			data : {
				"gid" : gid
			},
			success : function(data) {
				selectWelFareFaciList(1);
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

// 복지시설 popup창 닫기
function closeWelFarePopup(){
	dtmap.vector.clearSelect();		//선택 해제
	
	dtmap.draw.dispose();			// 마우스에 파란점 제거
	dtmap.draw.clear();				// 지도에 파란점 제거
	
	ui.closeSubPopup();				// 팝업 닫기
}

// 복지시설 엑셀 저장
function welFareFaciExcel() {
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
			{key: "gid",			label: "GID",			width: '*'},
			{key: "fclty_nm",		label: "복지시설명",		width: '*'},
			{key: "rn_adres", 		label: "도로명주소",		width: '*'},
			{key: "lnm_adres",		label: "지번주소",			width: '*'},
			{key: "zip",			label: "우편번호",			width: '*'},
			{key: "lat",			label: "위도",			width: '*'},
			{key: "lon",			label: "경도",			width: '*'},
			{key: "fclty_se_nm",	label: "시설구분",			width: '*'},
			{key: "cttpc_telno",	label: "전화번호",			width: '*'},
			{key: "data_stdde",		label: "데이터기준일",		width: '*'},
			{key: "geomText",		label: "GEOMETRY",		width: '*'}
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
		
		var fcltySe = $("#lSrchOptions #welFcltySe option:selected").val();	// 시설구분
		var rnAdres = $('#lSrchOptions input[name=rnAdres]').val();			// 도로명주소
		var fcltyNm = $('#lSrchOptions input[name=fcltyNm]').val();			// 시설명
		
		if (fcltySe) {
			filters.push("fclty_se" + " = " + fcltySe);
		}
		if (rnAdres) {
			filters.push("rn_adres" + " like " + rnAdres);
		}
		if (fcltyNm) {
			filters.push("fclty_nm" + " like " + fcltyNm);
		}
		
		options = {
			typeNames	: "tgd_sclwlfr_fclty_status" + "",
			filter		: filters,
			sortBy		: 'gid',
	        sortOrder	: 'ASC'
		};
	} else if ($(".waterSpace").hasClass("on")) {
		//console.log("공간 검색 조건");
		
		const $parent 	= $(".facility-spatial-search").closest('.search-area');
		const type 		= $parent.find('input[name="rad-facility-area"]:checked').val();

		options = {
			typeNames	: 'tgd_sclwlfr_fclty_status' + "",
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
			// 시설구분 형식 코드 변경
        	var fclty_se = data.features[i].properties.fclty_se;
        	data.features[i].properties.fclty_se_nm = getCmmCodeDataArray("FCLTCD", fclty_se);
        	
        	// 좌표 처리
			data.features[i].properties.geomObj = data.features[i].geometry;
			
			// GEOMETRY 처리
			data.features[i].properties.geomText = data.features[i].geometry.type + ' (' + data.features[i].geometry.coordinates[0] + ' ' + data.features[i].geometry.coordinates[1] + ')';
			
        	const {id, properties} = data.features[i];
			list.push({...properties, ...{id: id}});
		}
		
		// gird 적용
        FACILITY.Ax5UiGridAll.setData(list);
        
        //엑셀 export
		FACILITY.Ax5UiGridAll.exportExcel("복지시설목록_" + todayDate + ".xls");
	});
}

function dateNum(number, length) {
	var num = '' + number;
	while (num.length < length) {
		num = '0' + num;
	}
	return num;
}
