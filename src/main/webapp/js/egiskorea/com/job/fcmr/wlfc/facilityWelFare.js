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
					console.log(this.item.id);
					selectWelFareFaciDetail(this.item.id);
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
	
	// 팝업 닫기
	ui.closeSubPopup();
	
	// 검색 조건
	var options;
	
	if ($(".waterProperty").hasClass("on")) {
		//console.log("속성 검색 조건");\
		
		//속성 검색
		const filters = [];
		
		var fcltySe = $("#welFcltySe option:selected").val();	// 시설구분
		var rnAdres = $('input[name=rnAdres]').val();			// 도로명주소
		var fcltyNm = $('input[name=fcltyNm]').val();			// 시설명
		
		if (fcltySe) {
			filters.push("fclty_se" + " = " + fcltySe);
		}
		if (rnAdres) {
			filters.push("rn_adres" + " like " + rnAdres);
		}
		if (fcltyNm) {
			filters.push("fclty_nm" + " like " + fcltyNm);
		}
		
		var options;
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
		
		if (total > 0) {
        	$("#bottomPopup .bbs-list-num").html("조회결과: " + total + "건");
        } else if (total == 0) {
        	$("#bottomPopup .bbs-list-num").html("조회결과: 0건");
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
		console.log(id)
		gid = id;
		id = "tgd_sclwlfr_fclty_status." + id;
	} else if (id.includes('.')) {
		console.log(id)
		var idArray = id.split(".");
		gid = idArray[1];
	}

	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/wlfc/selectWelFareFaciDetail.do", { gid: gid }, function() {
		toastr.success("/job/fcmr/wlfc/selectWelFareFaciDetail.do", "페이지🙂호🙂출🙂");
		
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
		toastr.success("/job/fcmr/wlfc/insertWelFareFaciView.do", "페이지🙂호🙂출🙂");
		
		// 시설구분 selectbox
		getCmmCodeData('FCLTCD', '#inWelFareFaciTbl #wel_fclty_se');
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
}

// 복지시설 등록 저장
function insertWelFareFaci() {
	var fclty_nm = $('#inWelFareFaciTbl #wel_fclty_nm').val();
	if (fclty_nm == '') {
		alert('시설명을 입력해주세요.');
		$('#inWelFareFaciTbl #wel_fclty_nm').focus();
		return false;
	}
	
	// NULL값도 가능하지만 값이 입력되면 유효성 검사
	var tel = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
	var cttpc_telno = $('#inWelFareFaciTbl #wel_cttpc_telno').val();
	if (!cttpc_telno == '') {
		if (!tel.test(cttpc_telno)) {
			alert('전화번호 형식에 맞게 입력해주세요. ex) 000-0000-0000');
			$('#inWelFareFaciTbl #wel_cttpc_telno').focus();
			return false;
		}
	}

	var lnm_adres = $('#inWelFareFaciTbl #wel_lnm_adres').val();
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
					
					$('li[data-tab=waterProperty] .inner-tab').click();	// 속성변경 클릭
					$('#welRnAdres').val('');							// 도로명 clear
					$('#welFcltyNm').val('');							// 시설명 clear
					$("#welFcltySe").val('').prop('selected', true);	// 시설구분 clear
					
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
		toastr.success("/job/fcmr/wlfc/updateWelFareFaciView.do", "페이지🙂호🙂출🙂");
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
}

// 복지시설 수정 저장
function updateWelFareFaci(gid) {
	var page = $('.hiddenPage').val();
	
	var fclty_nm = $('#upWelFareFaciTbl #wel_fclty_nm').val();
	if (fclty_nm == '') {
		alert('시설명을 입력해주세요.');
		$('#upWelFareFaciTbl #wel_fclty_nm').focus();
		return false;
	}
	
	// NULL값도 가능하지만 값이 입력되면 유효성 검사
	var tel = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
	var cttpc_telno = $('#upWelFareFaciTbl #wel_cttpc_telno').val();
	if (!cttpc_telno == '') {
		if (!tel.test(cttpc_telno)) {
			alert('전화번호 형식에 맞게 입력해주세요. ex) 000-0000-0000');
			$('#upWelFareFaciTbl #wel_cttpc_telno').focus();
			return false;
		}
	}

	var lnm_adres = $('#upWelFareFaciTbl #wel_lnm_adres').val();
	var geom = $('#upWelFareFaciTbl #geom').val();
	if (lnm_adres == '' || geom == '') {
		alert('지도에서 위치를 선택해주세요.');
		return false;
	} else {
		// 수정 진행
		if (confirm("복지시설 정보를 수정하시겠습니까?") == true) {
			ui.loadingBar("show");
			
			const params = $("#upWelFareFaciFrm").serializeArray();
			console.log(params);
			
			$.ajax({
				type : "POST",
				url : "/job/fcmr/wlfc/updateWelFareFaci.do",
				dataType : "json",
				data : params,
				success : function(data) {
					alert("정상적으로 수정되었습니다.");
					
					selectWelFareFaciList(page);
					selectWelFareFaciDetail(gid);
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

// 복지시설 popup창 닫기
function closeWelFarePopup(){
	var page = $('.hiddenPage').val();
	selectWelFareFaciList(page);		// 목록 재로딩
	
	dtmap.draw.dispose();			// 마우스에 파란점 제거
	dtmap.draw.clear();				// 지도에 파란점 제거
	
	ui.closeSubPopup();				// 팝업 닫기
}

// 복지시설 엑셀 저장
function welFareFaciExcel() {
	alert('복지시설 엑셀 저장');
}