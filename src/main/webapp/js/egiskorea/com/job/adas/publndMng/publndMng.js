/**
 * 공유지관리
 * @returns
 */
$(document).ready(function () {
	let publndMngGrid = null;
	initPublndMng();
	
	$('.bbs-top-side #year').on('change', function() {
		setPublndMngGridData(0);
	});
	
	$('#bottomPopup .popup-reset').on('click', function() {
		setPublndMngGridData(0);
	});
	
	$('#bottomPopup .btn-wrap .search').on('click', function() {
		setPublndMngGridData(0);
	});
	
	$('#publndSrchOptions td').on('keyup', function () {
		if (event.keyCode == 13) {
			setPublndMngGridData(0);
		}
	});
});

/**
 * 화면 호출 시 초기화
 * @returns
 */
function initPublndMng() {
	setPublndMngGrid();
	setPublndMngGridData(0);
}

/**
 * 그리드 테이블 생성
 * @returns
 */
function setPublndMngGrid() {
	let dataLabels = [/*"순번",*/ "재산번호", "소재지", "실지목코드", "법정동코드", "산코드", "번지", "호", "연도"];
	let dataKeys = [/*"sn",*/ "prprtyNo", "locplc", "rlLndcgrCd", "stdgCd", 
		"mtnCd", "lnbr", "ho", "year"];
	let columns = [];
	for (let i = 0; i < dataKeys.length; i++) {
//		if (i == 2) {
		if (i == 1) {
			columns.push({key: dataKeys[i], label: dataLabels[i], width: 220});
		} else {
			columns.push({key: dataKeys[i], label: dataLabels[i], width: 120});
		}
	}
	
	publndMngGrid = new ax5.ui.grid();
	publndMngGrid.setConfig({
		target : $('[data-ax5grid="publndMngGrid"]'),
		showLineNumber : true,
		sortable : true,
		multiSort : true,
		header : {
			align : "center"
		},
		body : {
			align : "center",
			onClick: function() {
				publndMngGrid.focus(this.doindex);
				selectPublndMngDetailInfoView(this.item);
			}
		},
		page : {
			navigationItemCount: 9,
			display: true,
			firstIcon: '««',
			prevIcon: '«',
			nextIcon: '»',
			lastIcon: '»»',
			onChange: function () {
				setPublndMngGridData(this.page.selectPage);
			}
		},
		columns : columns
	});
}

/**
 * 그리드 테이블 데이터 등록
 * @param _pageNo
 * @returns
 */
function setPublndMngGridData(_pageNo) {
	let year = $('.bbs-top-side #year').val();
	let formData = $('#publndMngSerach').serializeArray();
	formData.push({name : "year", value : year});
	formData.push({name : "pageNo", value : _pageNo});
	
	$.ajax({
		data : formData,
		url : "/job/adas/publndMng/selectPublndPnuInfoList.do",
		type : "POST",
		dataType : "json",
		success : function (data) {
			let list = [];
			let resultList = data.resultList;
			let resultCnt = data.resultCnt;
			for (let i = 0; i < resultList.length; i++) {
				list.push(resultList[i]);
			}
			publndMngGrid.setData({
				list : list,
				page : {
					currentPage : _pageNo || 0,
					pageSize : 1000,
					totalElements: resultCnt,
					totalPages : Math.ceil(resultCnt / 10)
				}
			});
			let numFormat = new Intl.NumberFormat().format(resultCnt);
			$('.bbs-list-num strong').text(numFormat);
		}, complete : function(result) {
			ui.loadingBar("hide");
		}
	});
}

/**
 * 상세보기 화면 호출
 * @param data
 * @returns
 */
function selectPublndMngDetailInfoView(data) {
	ui.loadingBar('show');
	// popup open
	ui.openPopup("rightSubPopup");
	$("#rightSubPopup").load("/job/adas/publndMng/selectPublndMngDetailInfoView.do", function() {
		ui.loadingBar('hide');
		selectPublndMngDetailInfo(data);
	});
}

/**
 * 상세보기 api
 * @param data
 * @returns
 */
function selectPublndMngDetailInfo(data) {
	$('#rightSubPopup').css('width', '750px');
	let pnu = data.pnu;
	ui.loadingBar("show");
	$.ajax({
		data : {"pnu" : pnu},
		url : "/job/adas/publndMng/selectPublndMngDetailInfoList.do",
		type : "POST",
		dataType : "html",
		success : function (result, status) {
			if (status == 'success') {
				$('#rightSubPopup').html(result);
			}
		}, complete : function (result) {
			ui.loadingBar("hide");
		}
	});
}