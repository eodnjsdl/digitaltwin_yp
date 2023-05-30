/**
 * 행정자산관리
 * @returns
 */
$(document).ready(function () {
	console.log("inertAdministAsset.jsp");
	$('.popup-body #regBtn').on('click', function() {
		insertAdministAssetsView();
	});
	let administAssetsGrid = null;
	initAdministAssets();
	
	// 드래그, 클릭 파일 혼동방지
	var fileData = null;
	
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
 * @param result
 * @returns
 */
function setAsmngData(result) {
	let list = [];
	let cnt = 1;
	for (let i = 0; i < result.length - 1; i++) {
		result[0][i] = [result[0][i], result[cnt][cnt - 1]];
		cnt++;
	}
	for (let i = 0; i < result[0].length; i++) {
		if (i != 0){
			list.push(result[i]);
		}
	}
	$('.bbs-list-num strong').text(new Intl.NumberFormat().format(list.length));
	administAssetsGrid.setData(list);
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
		fileDragAndDrop(files);
	});
	$('#clickUpload').on('click', function() {
		$('#fileUploadClick').trigger('click');
	});
}

/**
 * drag & drop 파일 업로드
 * @returns
 */
function fileDragAndDrop(files) {
	const fileType = "csv";
	// 파일 전역변수 초기화 및 파일 담기
	fileData = null;
	fileData = files[0];
	// input 파일 초기화
	$('#fileUploadClick').val('');
	// 파일 관련 내용 표출
	$('#csvColumnHeader').empty();
	
	let file = fileData;
	let fileName = file.name;
	
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
//		if (result[0][i] != '\r') {
				columns += `<input type="checkbox" name="column" id="column_0${i}" value="${result[0][i]}"/>`;
				columns += `<label for="column_0${i}">${result[0][i]}</label>`;
//		} else {
//		    break;
//		}
			}
			$('#csvName').val(file.name);
			$('#csvColumnHeader').append(columns);
			
			setAsmngData(result);
		}
	}
}

/**
 * 파일 업로드 기본 정보 표출
 * @param file
 * @returns
 */
function wirteStandardInfo(file) {
	let size = new Intl.NumberFormat().format(file.size) + 'KB';
	let info = "";
	info += `<tr>`;
	info += `<td>${file.name}</td>`;
	info += `<td>${size}</td>`;
	info += `<td>${file.type}</td>`;
	info += `</tr>`;
	$('#fileInfo').append(info);
}

/**
 * 테이블 생성
 * @returns
 */
function administAssetsGrid() {
	// 임시 컬럼
	let dataset = ["순번", "재산번호", "새올인증여부", "입력시스템", "재산명", "소유구분코드",
		"재산용도코드", "행정재산코드", "회계구분코드", "재산관리관코드", "담당부서명", "분임관리관코드",
		"위임관리관코드", "재산관리관지정일자", "우편번호",  "행정동코드", "법정동코드", "소재지",
		"산코드", "번지", "호", "통", "반", "특수주소", "특수지동", "특수지호", "도로명주소",
		"재산가격", "회계기준가액", "취득부서코드", "취득액", "취득일자", "취득방법구분코드",
		"취득사유", "등기여부", "등기부등본번호", "대부가능여부", "매각제한여부", "매각제한일자",
		"비고", "토지지목코드", "실지목코드", "면적", "실면적", "공시지가", "취득면적", "공유지분1",
		"공유지분2", "용도지역", "도시계획지구", "계획시설", "개발사업", "계획사업", "\r"
		];
	let columns = [];
	
	for (let i = 0; i < dataset.length; i++) {
//	columns.push({key: dataset[i], label: dataset[i], width: 120});
		columns.push({key: i, label: dataset[i], width: 120});
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
				toastr.error('상세보기 호출');
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
			}
		},
		columns: columns,
	});
}