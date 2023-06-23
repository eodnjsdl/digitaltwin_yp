/**
 * 행정자산관리
 * @returns
 */
// 드래그, 클릭 파일 혼동방지
var fileData = null;

$(document).ready(function () {
	$('.popup-body #regBtn').on('click', function() {
		insertAdministAssetsView();
	});
	let administAssetsGrid = null;
	initAdministAssets();
	
	$('.bbs-top-side #year').on('change', function() {
		selectAdministAssetsInfoList(0);
	});
	
	$('#bottomPopup .popup-reset').on('click', function() {
		selectAdministAssetsInfoList(0);
	});
});

/**
 * 초기화
 * @returns
 */
function initAdministAssets() {
	administAssetsGrid();
	// 등록화면 초기화
	$("#uploadFiles").hide();
	$("#uploadFiles").empty();
	$("#dragArea .text").show();
	$("#dragArea .text").empty();
	selectAdministAssetsInfoList(0);
}

/**
 * 등록 화면 조회
 * @returns
 */
function insertAdministAssetsView() {
	ui.loadingBar('show');
	// popup open
	ui.openPopup("rightSubPopup");
	$("#rightSubPopup").load("/job/adas/asmng/insertAdministAssets.do", function() {
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside"
		});
		dragAndDropEvent();
		ui.loadingBar('hide');
	});
}

/**
 * 테이블 데이터 세팅
 * @param _pageNo
 * @returns
 */
function selectAdministAssetsInfoList(_pageNo) {
	// 선택 연도 값
	let year = $('.bbs-top-side #year').val();
	$.ajax({
		data : {
					"year" : year,
					"pageNo" : _pageNo
				},
		type : "POST",
		url : "/job/adas/asmng/selectAdministAssetsInfoList.do",
		dataType : "json",
		success : function(data) {
			let list = [];
			let result = data.resultList;
			let resultCnt = data.resultCount;
			for(i = 0; i < resultCnt; i++) {
				list.push(result[i]);
			}
			administAssetsGrid.setData({
				list: list,
				page: {
					currentPage: _pageNo || 0,
					pageSize: 1000,
					totalElements: resultCnt,
					totalPages: Math.ceil(resultCnt/10)
				}
			});
			let numFormat = new Intl.NumberFormat().format(resultCnt);
			$('.bbs-list-num strong').text(numFormat);
		}
	});
}

/**
 * 테이블 생성
 * @returns
 */
function administAssetsGrid() {
	// 타이블 컬럼 라벨
	let dataLabels = ["순번", "재산번호", "새올인증여부", "입력시스템", "재산명", "소유구분코드",
		"재산용도코드", "행정재산코드", "회계구분코드", "재산관리관코드", "담당부서명", "분임관리관코드",
		"위임관리관코드", "재산관리관지정일자", "우편번호",  "행정동코드", "법정동코드", "소재지",
		"산코드", "번지", "호", "통", "반", "특수주소", "특수지동", "특수지호", "도로명주소",
		"재산가격", "회계기준가액", "취득부서코드", "취득액", "취득일자", "취득방법구분코드",
		"취득사유", "등기여부", "등기부등본번호", "대부가능여부", "매각제한여부", "매각제한일자",
		"비고", "토지지목코드", "실지목코드", "면적", "실면적", "공시지가", "취득면적", "공유지분1",
		"공유지분2", "용도지역", "도시계획지구", "계획시설", "개발사업", "계획사업", "연도"
		];
	// 데이터 컬럼
	let dataKeys = ["sn", "prprtyNo", "saeolCertYn", "inputSys", "prprtyNm", "posesnSeCd",
	    "prprtyPrposCd", "administPrprtyCd", "accountSeCd", "prprtyMngInscd", "chrgDeptNm", "dvTaskMngInscd",
	    "mndtMngInscd", "prprtyMngDsgnYmd", "zip", "dongCd", "stdgCd", "locplc", "mtnCd", "lnbr",
	    "ho", "tong", "ban", "spcadrs", "spcDong", "spcHo", "rnAddr", "prprtyPc", "accnutStdrAmt", "acqsDeptCd",
	    "acqsAmt", "acqsYmd", "acqsMthSeCd", "acqsResn", "rgistYn", "recpNo", "loanPosblYn", "saleLmttYn",
	    "saleLmttYmd", "rm", "ladLndcgrCd", "rlLndcgrCd", "ar", "rlAr", "oalp", "acqsAr", "pblonsipQota1",
	    "pblonsipQota2", "spfc", "ctyplnDstrc", "planFclty", "dwk", "planBiz", "year"
	    ];
	// 테이블 표시 컬럼 변수
	let columns = [];
	for (let i = 0; i < dataKeys.length; i++) {
	columns.push({key: dataKeys[i], label: dataLabels[i], width: 120});
	}
	
	administAssetsGrid = new ax5.ui.grid();
	administAssetsGrid.setConfig({
		target: $('[data-ax5grid="administAssetsGrid"]'),
		showLineNumber: true,
		sortable: true,
		multiSort: true,
		header: {
			align: "center"
		},
		body: {
			align: "center",
			onClick: function() {
				administAssetsGrid.focus(this.doindex);
			}
		},
		page: {
			navigationItemCount: 9,
			display: true,
			firstIcon: '««',
			prevIcon: '«',
			nextIcon: '»',
			lastIcon: '»»',
			onChange: function () {
				selectAdministAssetsInfoList(this.page.selectPage);
			}
		},
		columns: columns,
	});
}

/**
 * drag & drop 이벤트
 * @returns
 */
function dragAndDropEvent() {
	let $drop = $("#dragArea");
	$drop.on("dragenter", function(e) { //드래그 요소가 들어왔을떄
		$(this).addClass("active");
	}).on("dragleave", function(e) { //드래그 요소가 나갔을때
		$(this).removeClass("active");
	}).on("dragover", function(e) {
		e.stopPropagation();
		e.preventDefault();
	}).on("drop", function(e) {
		e.preventDefault();
		$(this).removeClass("active");
		let files = e.originalEvent.dataTransfer.files;
		$('#fileUpload')[0].files = files;
		fileDragAndDrop(files);
	});
	$('#clickUpload').on('click', function() {
		$('#fileUpload').trigger('click');
	});
}

/**
 * drag & drop 파일 업로드
 * @returns
 */
function fileDragAndDrop(files) {
	// 파일 업로드 되면 등록버튼 리스너생성
	$('#uploadCSVBtn').on('click', function() {
		// 업로드 중 여부 확인
		checkUploading();
	});
	
	
	const fileType = "csv";
	// 파일 전역변수 초기화 및 파일 담기
	fileData = null;
	fileData = files[0];

	// 파일 관련 내용 표출
	$('#csvColumnHeader').empty();
	
	let file = fileData;
	let fileName = file.name;
	console.log(file)
	// csv 파일만 등록 - 그외 에러메시지
	if (file.type != 'text/csv') {
		toastr.error("'CSV'파일 외에는 업로드가 불가능합니다.");
		file = null;
		return;
	} else {
		$("#uploadFiles").show();
		$("#dragArea .text").hide();
		$(".csvOption").removeClass("hide");
		
		let columns = "";
		
		// 업로드 파일 기본 정보 표시
		wirteStandardInfo(file);
		
		// CSV 데이터 읽기
		const fileReader = new FileReader();
		fileReader.readAsText(file, "EUC-KR");
		
		fileReader.onload = function () {
			const data = fileReader.result;
			const result = data.split('\n').map(data => data.split(','));
			for (let i = 0; i < result[0].length; i++) {
				// 공백 컬럼 처리;
				if (result[0][i] != '\r') {
//					columns += `<input type="checkbox" name="column" id="column_0${i}" value="${result[0][i]}"/>`;
//					columns += `<label for="column_0${i}">${result[0][i]}</label>`;
					columns += `<li class="columnList">${result[0][i]}&emsp;</li>`;
				}
				result[i] = result[i].filter(j => !j.includes('\r'));
			}
			$('#csvName').val(file.name);
			$('#csvColumnHeader').append(columns);
			
		}
	}
}

/**
 * 파일 업로드 기본 정보 표출
 * @param file
 * @returns
 */
function wirteStandardInfo(file) {
	$('#fileInfo').empty();
	// file 사이즈가 클 때, MB, KB 구분, 소수점 2째자리 까지 표시
	let size = 0;
	if (file.size > Math.pow(1024, 2)) {
		size = new Intl.NumberFormat().format((file.size / Math.pow(1024, 2)).toFixed(2)) + 'MB';
	} else {
		size = new Intl.NumberFormat().format((file.size / 1024).toFixed(2)) + 'KB';
	}
	
	let info = "";
	info += `<tr>`;
	info += `<td>${file.name}</td>`;
	info += `<td>${size}</td>`;
	info += `<td>${file.type}</td>`;
	info += `</tr>`;
	$('#fileInfo').append(info);
}

function sendCSVFileData(isUploading) {
	$(function() {
		progressbar = $( ".progressbar" ),
		progressLabel = $( ".progress-label" );

		progressbar.progressbar({
		value: 0,
			change: function() {
				progressLabel.text( progressbar.progressbar( "value" ) + "%" );
			}
		});
	});
	
	let formData = new FormData($('#csvFileForm')[0]);
	
	let year = $('#year').val();
	if (year == '' || year == null) {
		let today = new Date();
		year = today.getFullYear(); 
	}
	
	// input 파일 초기화
	$('#fileUpload').val('');
	
	formData.append("year", year);
	
	// 업로드중이 아닐 때. 데이터 업로드 시작
	if (!isUploading) {
		let prgInterval; // progressbar interval
		$.ajax({
			data : formData,
			url : "/job/adas/asmng/insertAdministAssetsInfoCSV.do",
			type : "post",
			dataType : "json",
			contentType : false,
			processData : false,
			xhr : function() {
				let xhr = $.ajaxSettings.xhr();
				xhr.upload.onprogress = function(e) {
					let percent = e.loaded * 100 / e.total;
					$(".progressbar-value").css("width", parseInt(percent) + "%");
					$(".progress-label").html(parseInt(percent) + "%");
					if(percent == "100"){
						prgInterval = setInterval(() => {
							$.ajax({
								url : "/job/adas/asmng/csvUploadProgress.do",
								type : "post",
								dataType : "json",
								success : function(data) {
									console.log(data);
									$(".progressbar-value").css("width", parseInt(data.progress) + "%");
									$(".progress-label").html(parseInt(data.progress) + "%");
								}
							});
						}, 3000);
						toastr.info('데이터 등록을 시작합니다.', 'CSV 파일 서버 업로드 완료.');
					}
				};
				
				return xhr;
			},
			success : function(data) {
				console.log("CSV upload success");
				console.log("업로드된 데이터 : " + data.resultCnt + ", 등록 연도 설정 : " + data.year);
				if (data.isSuccess) {
					toastr.success('데이터 등록이 정상적으로 처리되었습니다');
					$(".progressbar-value").css("width", 100 + "%");
					$(".progress-label").html(100 + "%");
					$('#rightSubPopup .popup-close').trigger('click');
				} else {
					toastr.warning('데이터 등록에 실패하였습니다', '알 수 없는 오류');
				}
				clearInterval(prgInterval);
				selectAdministAssetsInfoList(0);
			}, error: function(error) {
				console.log(error.getAllResponseHeaders);
			}
		});
	} else {
		toastr.warning('작업 중', '다른 데이터가 업로드 중입니다.');
	}
	
}

function checkUploading() {
	let isUploading;
	$.ajax({
		url : "/job/adas/asmng/csvUploadIsUploading.do",
		type : "post",
		dataType : "json",
		success : function(data) {
			console.log("지금 업로드 중인가? " + data.uploading);
			isUploading = data.uploading;
			sendCSVFileData(isUploading);
		}
	});
}