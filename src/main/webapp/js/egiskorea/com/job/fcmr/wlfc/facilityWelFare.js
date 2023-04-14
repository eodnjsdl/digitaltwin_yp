/**
 * - 업무 / 시설관리 / 복지시설
 * 
 * @returns
 */
$(document).ready(function(){
	console.log("facilityWelFare.js");
	console.log("복지시설");
});

// 복지시설 옵션 설정
function getWelFareFaciListView() {
	//console.log("getWelFareFaciListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/wlfc/selectWelFareFaciListView.do', function() {
		toastr.success("/job/fcmr/wlfc/selectWelFareFaciListView.do", "페이지🙂호🙂출🙂");
		
		// grid 기본 세팅
		var $container = $("#container");
		var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]');
		$target.css('height', 'inherit');
		
		// 시설구분 selectbox
		getCmmCodeData('FCLTCD', '#lSrchOptions #wlre_search_fclty_se');
		
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
	            	$('#hiddenPage').val(this.page.selectPage + 1);
	            }
			},
			body: {
				align: "center",
				onClick: function() {
					//this.self.select(this.dindex);
					//console.log(this.item);
					selectWelFareFaciDetail(this.item.gid);
				}
			}
		});
	});
	
	selectWelFareFaciList(1);
	ui.loadingBar("hide");
};

// 복지시설 목록 조회
function selectWelFareFaciList(page) {
	//console.log("selectWelFareFaciList(page)");
	//console.log("page >>> " + page);
	
	// 검색 조건
	const filters = [];
	
	var searchFcltySe = $("#wlre_search_fclty_se option:selected").val();
	
	var searchRnAdres = $('#wlre_search_rn_adres').val();
	var searchFcltyNm = $('#wlre_search_fclty_nm').val();
	
	if (searchFcltySe) {
		console.log(searchFcltySe);
		filters.push("fclty_se" + " = " + searchFcltySe);
	}
	if (searchRnAdres) {
		filters.push("rn_adres" + " like " + searchRnAdres);
	}
	if (searchFcltyNm) {
		filters.push("fclty_nm" + " like " + searchFcltyNm);
	}
	
	var options;
	options = {
		typeNames: "tgd_sclwlfr_fclty_status" + "",
		perPage: 10,
		page: page,
		filter: filters
	};
	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		// 그리드 데이터 전처리
		const list = [];
		for (let i = 0; i < data.features.length; i++) {
			// 시설구분 형식 코드 변경
        	var fclty_se = data.features[i].properties.fclty_se;
        	data.features[i].properties.fclty_se_nm = getCmmCodeDataArray("FCLTCD", fclty_se);
        	
        	const {id, properties} = data.features[i];
			list.push({...properties, ...{id: id}});
		}
		
		var total = data.totalFeatures;
		var totPge = Math.ceil(total / 10);
		
		if (total > 0) {
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
function selectWelFareFaciDetail(gid) {
	//console.log("selectWelFareFaciDetail(gid)");
	//console.log("gid >>> " + gid);
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/wlfc/selectWelFareFaciDetail.do", { gid: gid }, function() {
		toastr.success("/job/fcmr/wlfc/selectWelFareFaciDetail.do", "페이지🙂호🙂출🙂");
		
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
		toastr.success("/job/fcmr/wlfc/insertWelFareFaciView.do", "페이지🙂호🙂출🙂");
		
		// 시설구분 selectbox
		getCmmCodeData('FCLTCD', '#inWelFareFaciTbl #wlre_fclty_se');
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
}

// 복지시설 등록 저장
function insertWelFareFaci() {
	// NULL값도 가능한 input
	var fclty_se 	= $('#inWelFareFaciTbl #wlre_fclty_se option:selected').val();	// 시설구분
	var rn_adres 	= $('#inWelFareFaciTbl #wlre_rn_adres').val();					// 도로명주소
	var zip 		= $('#inWelFareFaciTbl #wlre_zip').val();						// 우편번호
	
	var fclty_nm = $('#inWelFareFaciTbl #wlre_fclty_nm').val();
	if (fclty_nm == '') {
		alert('시설명을 입력해주세요.');
		$('#inWelFareFaciTbl #wlre_fclty_nm').focus();
		return false;
	}
	
	// NULL값도 가능하지만 값이 입력되면 유효성 검사
	var tel = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
	var cttpc_telno = $('#inWelFareFaciTbl #wlre_cttpc_telno').val();	// 전화번호
	if (!cttpc_telno == '') {
		if (!tel.test(cttpc_telno)) {
			alert('전화번호 형식에 맞게 입력해주세요. ex) 000-0000-0000');
			$('#inWelFareFaciTbl #wlre_cttpc_telno').focus();
			return false;
		}
	}

	var lnm_adres = '경기도 양평군';//$('#inWelFareFaciTbl #wlre_lnm_adres').val();
	// 지도에서 선택한 geom값
	var geom = 'POINT(1022725.6322952138 1949131.3901101280)';//$('#inWelFareFaciTbl #geom').val();
	if (geom != '') {
		var position = geom.replace(/[^0-9\s.]/g, '').split(' ');
		/* TransformCoordinate 코드 생성 필요 */
		//position = TransformCoordinate(parseFloat(position[0]), parseFloat(position[1]), 26, 13);
		
		var lat = '37.48351183';//position.y.toFixed(7);	//위도
		var lon = '127.5912403';//position.x.toFixed(8);	//경도
		
		$('#wlre_lon').val(lon);
		$('#wlre_lat').val(lat);
	}
	if (lnm_adres == '' || geom == '') {
		alert('지도에서 위치를 선택해주세요.');
		return false;
	} else {
		// 등록 진행
		if (confirm("등록하시겠습니까?") == true) {
			ui.loadingBar("show");
			
			const params = $("#inWelFareFaciFrm").serializeArray();
		    params.forEach((param) => {
		        if (param.value) {
		            feature.set(param.name, param.value);
		        }
		    });
		    console.log(params)
			
			$.ajax({
				type : "POST",
				url : "/job/fcmr/wlfc/insertWelFareFaci.do",
				dataType : "json",
				data : {
					"fcltyNm" 		: fclty_nm,
					"rnAdres" 		: rn_adres,
					"lnmAdres" 		: lnm_adres,
					"zip" 			: zip,
					"lat" 			: lat,
					"lon" 			: lon,
					"fcltySe" 		: fclty_se,
					"cttpcTelno" 	: cttpc_telno,
					"geom" 			: geom
				},
				success : function(data) {
					console.log(data)
					alert("정상적으로 등록되었습니다.");
					ui.closeSubPopup();
					selectWelFareFaciList(1);
					//removePoint(GLOBAL.NomalIcon);
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
		toastr.success("/job/fcmr/wlfc/updateWelFareFaciView.do", "페이지🙂호🙂출🙂");
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
}

// 복지시설 수정 저장
function updateWelFareFaci(gid) {
	var page = $('#hiddenPage').val();
	
	// NULL값도 가능한 input
	var fclty_se 	= $('#upWelFareFaciTbl #wlre_fclty_se option:selected').val();	// 시설구분
	var rn_adres 	= $('#upWelFareFaciTbl #wlre_rn_adres').val();					// 도로명주소
	var zip 		= $('#upWelFareFaciTbl #wlre_zip').val();						// 우편번호
	
	var fclty_nm = $('#upWelFareFaciTbl #wlre_fclty_nm').val();
	if (fclty_nm == '') {
		alert('시설명을 입력해주세요.');
		$('#upWelFareFaciTbl #wlre_fclty_nm').focus();
		return false;
	}
	
	// NULL값도 가능하지만 값이 입력되면 유효성 검사
	var tel = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
	var cttpc_telno = $('#upWelFareFaciTbl #wlre_cttpc_telno').val();	// 전화번호
	if (!cttpc_telno == '') {
		if (!tel.test(cttpc_telno)) {
			alert('전화번호 형식에 맞게 입력해주세요. ex) 000-0000-0000');
			$('#upWelFareFaciTbl #wlre_cttpc_telno').focus();
			return false;
		}
	}

	var lnm_adres = '경기도 양평군 양평읍';//$('#upWelFareFaciTbl #wlre_lnm_adres').val();
	// 지도에서 선택한 geom값
	var geom = 'POINT(1022725.6322952138 1949131.3901101280)';//$('#upWelFareFaciTbl #geom').val();
	if (geom != '') {
		var position = geom.replace(/[^0-9\s.]/g, '').split(' ');
		/* TransformCoordinate 코드 생성 필요 */
		//position = TransformCoordinate(parseFloat(position[0]), parseFloat(position[1]), 26, 13);
		
		var lat = '37.48551183';//position.y.toFixed(7);	//위도
		var lon = '127.5952403';//position.x.toFixed(8);	//경도
		
		//$('#wlre_location').val(position.x.toFixed(8) + "," + position.y.toFixed(7));
	}
	if (lnm_adres == '' || geom == '') {
		alert('지도에서 위치를 선택해주세요.');
		return false;
	} else {
		if (confirm("복지시설 정보를 수정하시겠습니까?") == true) {
			ui.loadingBar("show");
			
			$.ajax({
				type : "POST",
				url : "/job/fcmr/wlfc/updateWelFareFaci.do",
				dataType : "json",
				data : {
					"gid" 			: gid,
					"fcltyNm" 		: fclty_nm,
					"rnAdres" 		: rn_adres,
					"lnmAdres" 		: lnm_adres,
					"zip" 			: zip,
					"lat" 			: lat,
					"lon" 			: lon,
					"fcltySe" 		: fclty_se,
					"cttpcTelno" 	: cttpc_telno,
					"geom" 			: geom
				},
				success : function(data) {
					alert("정상적으로 수정되었습니다.");
					
					selectWelFareFaciList(page);
					selectWelFareFaciDetail(gid);
					//removePoint(GLOBAL.NomalIcon);
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

// 체육시설 삭제
function deleteWelFareFaci(gid) {
	ui.loadingBar("show");
	if (confirm("복지시설 정보를 삭제하시겠습니까?") == true) {    // 확인
		$.ajax({
			type : "POST",
			url : "/job/fcmr/wlfc/deleteWelFareFaci.do",
			dataType : "json",
			data : {
				"gid" : gid
			},
			success : function(data) {
				ui.closeSubPopup();
				selectWelFareFaciList(1);
			},
			complete : function() {
				ui.loadingBar("hide");
			}
		});
	} else {
		return false;
	}
}

// 복지시설 엑셀 저장
function fn_downloadExcel() {
	alert('체육시설 엑셀 저장');
}

// geom 값 넣기
function positionCallback(pointGeom, address) {
	$('input[name=adres]').attr('value', "경기도 " + address);
	$("#geom").val(pointGeom);
}

// 복지시설 팝업 취소 버튼
function cancleWelFarePopup(){
	//$('#selectSafetyFacilLampMng').removeClass('opened');
	//removePoint(GLOBAL.NomalIcon);
	ui.closeSubPopup();
}

// 복지시설 상세보기로 back
function backWelFareFaciDetail(gid, lon, lat) {
	//$("#selectSafetyFacilLampMng").addClass("opened");
	//destroy();
	selectWelFareFaciDetail(gid, lon, lat);
}
