/**
 * - 업무 / 시설관리 / 체육시설
 * 
 * @returns
 */
$(document).ready(function(){
	console.log("phyEduFaciList.js");
	console.log("체육시설");
});

// 체육시설 옵션 설정
function getPhyEduFaciList() {
	//console.log("getPhyEduFaciList()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/phfc/selectPhyEduFaciList.do', function() {
		toastr.success("/job/fcmr/phfc/selectPhyEduFaciList.do", "페이지🙂호🙂출🙂");
		
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
				{key: "fclty_ty", 		label: "시설구분",		width: 80,		align: "center"},
				{key: "fclty_nm",		label: "체육시설명",	width: 200},
				{key: "adres",			label: "주소",		width: 300},
				{key: "fond_de",		label: "설립일자",		width: 120,		align: "center"},
				{key: "oper_mthd",		label: "운영방식",		width: 80,		align: "center"},
				{key: "cttpc_telno",	label: "문의번호",		width: 120,		align: "center"},
				{key: "charger_nm",		label: "담당자",		width: 100,		align: "center"},
				{key: "last_modf_dt",	label: "최종수정일자",	width: 120,		align: "center",	formatter: "date"},
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
	            	searchPhyEduFaciList(this.page.selectPage + 1);
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
	searchPhyEduFaciList(1);
};

// 체육시설 목록 조회
function searchPhyEduFaciList(page) {
	//console.log("searchPhyEduFaciList(page)");
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
		
		YYMM_datePicker();
		
		// 취소 버튼 변경
		$(".bi-cancel").attr("onclick", "cancleSportsPopup();");
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
	});
}

// 체육시설 등록 저장
function insertPhyEduFaci() {
	alert('체육시설 등록 저장');
}

//체육시설 엑셀 저장
function fn_downloadExcel() {
	alert('체육시설 엑셀 저장');
}

// 체육시설 팝업 취소 버튼
function cancleSportsPopup(){
	//$('#selectSafetyFacilLampMng').removeClass('opened');
	//removePoint(GLOBAL.NomalIcon);
	ui.closeSubPopup();
}

// datepicker 년/월 선택
function YYMM_datePicker() {
	//input을 datepicker로 선언
	$("#spor_datepicker").datepicker({
	    dateFormat: 'yy-mm-dd'	//달력 날짜 형태
	    , showOtherMonths: true	//빈 공간에 현재월의 앞뒤월의 날짜를 표시
	    , showMonthAfterYear:true	// 월- 년 순서가아닌 년도 - 월 순서
	    , changeYear: true	//option값 년 선택 가능
	    , changeMonth: true	//option값  월 선택 가능                
	    , showOn: "both"	//button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시 
	   	, monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']	//달력의 월 부분 텍스트
	    , monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']	//달력의 월 부분 Tooltip
	    , dayNamesMin: ['일','월','화','수','목','금','토']	//달력의 요일 텍스트
	    , dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']	//달력의 요일 Tooltip
	    , buttonImage: '/images/icon/form-calendar.svg'	//버튼 이미지 경로
	    , buttonText: "선택"	//버튼 호버 텍스트              
	    , yearSuffix: "년"	//달력의 년도 부분 뒤 텍스트
	});  
}