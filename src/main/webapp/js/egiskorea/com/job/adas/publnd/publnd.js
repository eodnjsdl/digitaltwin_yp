/********************************
* 공유재산실태조사
* author : 백승석
* since : 2023.02.21
********************************/

/**
 * 테이블 생성 및 테이블 데이터 불러오기
 * @returns
 */
$(document.body).ready(function() {
	dtmap.init();
	initGrid();
	setData(0);
	
	$('#getPbprtAccdtExcelList').on('click', function() {
	    downloadPbprtAccdtExcelList();
	});
})

/**
 * 테이블 데이터 변경 시 재생성
 * @returns
 */
function resetGrid() {
	initGrid();
	setData(0);
}

/**
 * 연도별 선택시 테이블 리셋
 */
$('select#year').change(() => {
	resetGrid();
});

/**
 * 테이블 생성
 * @returns
 */
function initGrid() {
	this.target = new ax5.ui.grid();
	this.target.setConfig({
		target: $('[data-ax5grid="pbprtAccdtGrid"]'),
		showLineNumber: true,
		sortable: true,
		multiSort: true,
		header: {
			align: "center"
		},
		body: {
			align: "center",
			onClick: function() {
				fn_pageDetail(this.item.publndNo);
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
				setData(this.page.selectPage);
			}
		},
		columns: [
			{key: "prprtyNo", 		label: "재산번호",			width: 100},
			{key: "ctrtYmd", 		label: "계약(갱신)일",		width: 100},
			{key: "cntrctpd", 		label: "계약기간",			width: 150},
			{key: "locplc", 		label: "소재지",			width: 150},
			{key: "ldcgCd", 		label: "지목",			width: 100},
			{key: "ar", 			label: "면적",			width: 100},
			{key: "loanAr", 		label: "대부 면적",		width: 100},
			{key: "loanPrpos", 		label: "대부 용도",		width: 130},
			{key: "rrno", 			label: "주민등록번호",		width: 100},
			{key: "loanmnSndngYn", 	label: "대부료 발송 여부",	width: 100},
			{key: "nm", 			label: "성명",			width: 100},
			{key: "addr", 			label: "주소",			width: 130},
			{key: "zip", 			label: "우편번호",			width: 100},
			{key: "cttpc", 			label: "연락처",			width: 100},
			{key: "rm", 			label: "비고",			width: 100},
			{key: "nhtSndng", 		label: "고지서 발송",		width: 100},
			{key: "atchPapers", 	label: "첨부 서류",		width: 150},
			{key: "cnfirmMatter", 	label: "확인 사항",		width: 100}
		],
	});
}

/**
 * 테이블 데이터 세팅
 * @param _pageNo
 * @returns
 */
function setData(_pageNo) {
	var list = [];
	var gridList = this;
	let yearOption = $('select#year').val();
	$.ajax({
		data : { "yearOption" : yearOption,
				 "pageNo" : _pageNo
				},
		url : "/job/adas/publnd/selectPbprtAccdtPgeList.do",
		type : 'post',
		dataType: "json",
		success : function(data) {
			for(i = 0; i < data.pbprtAccdtList.length; i++) {
				list.push(data.pbprtAccdtList[i]);
			}
			gridList.target.setData({
				list: list,
				page: {
					currentPage: _pageNo || 0,
					pageSize: 100,
					totalElements: data.cnt,
					totalPages: Math.ceil(data.cnt/10)
				}
			});
			$('.bbs-list-num strong').text(data.cnt);
		}
	});
}

/**
 * 공유재산 상세 정보 조회
 * @param publndNo
 * @returns
 */
function fn_pageDetail(publndNo) {
	ui.openPopup("rightSubPopup");
	
	var formData = new FormData();
	
	if (publndNo != '') {
		formData.append('publndNo', publndNo);
	}
	
	$.ajax({
		data : formData,
		type : "POST",
		url : '/job/adas/publnd/selectPbprtAccdtDtlInfoView.do',
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(data, status) {
			if (status == "success") {		
				$("#rightSubPopup").append(data);
				
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			
			} else { 
				toastr.error("ERROR!");
				return;
			} 
		}
	});
}

/**
 * 공유재산 실태조사 등록 화면 호출
 * @param 
 * @returns
 */
function fn_insertView() {
	ui.openPopup("rightSubPopup");
	$.ajax({
		type : 'post',
		url : "/job/adas/publnd/insertPbprtAccdtView.do",
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").append(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			}else{ 
				toastr.error("ERROR!");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

/**
 * 공유재산 정보 수정
 * @param publndNo
 * @returns
 */
function fn_update(publndNo) {
	if (confirm('수정 하시겠습니까?')) {
		let formData = $('#dataRegistForm').serialize();
		
		ui.loadingBar("show");
		$.ajax({
			data : formData,
			type : 'post',
			url : '/job/adas/publnd/updatePbprtAccdtInfo.do',
			dataType: 'json',	// ModelAndView return 값을 json으로 받기 위해서 추가.
			success : function(data) {
				if (data.status == 'success') {
					toastr.success("정상적으로 수정되었습니다.");
					$('.pbprtAccdtInput').val('');
					$("#rightSubPopup").empty();
					ui.closeSubPopup("rightSubPopup");
					fn_pageDetail(publndNo);
					resetGrid();
					ui.loadingBar("hide");
				} else {
					toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
					ui.loadingBar("hide");
					return;
				}
			}, complete : function(){
				ui.loadingBar("hide");
			}
		});
	}
}

/**
 * 공유재산 실태조사서 정보 등록
 * @returns
 */
function insertPbprtAccdtInfo() {
	if (confirm('등록 하시겠습니까?')) {
		let formData = $('#dataRegistForm').serialize();
		let newPublndNo = '';
		ui.loadingBar("show");
		$.ajax({
			data : formData,
			type : 'post',
			url : '/job/adas/publnd/insertPbprtAccdtInfo.do',
			dataType: 'json',	// ModelAndView return 값을 json으로 받기 위해서 추가.
			success : function(data) {
				if (data.status == 'success') {
					toastr.success("정상적으로 등록되었습니다.");
					newPublndNo = data.newPublndNo;
					$('.pbprtAccdtInput').val('');
					resetGrid();
					fn_pageDetail(newPublndNo);
					ui.loadingBar("hide");
				} else {
					toastr.error('ERROR!');
					ui.loadingBar("hide");
					return;
				}
			}, complete : function(){
				ui.loadingBar("hide");
			}
		});
	}
}

/**
 * input number값 최대값 설정
 * @param number
 * @returns
 */
function numberMaxLengthCheck(number) {
	if (number.value.length > number.maxLength) {
		number.value = number.value.slice(0, number.maxLength);
	}
}

/**
 * 공유재산 실태조사 정보 삭제(del_yn값변경)
 * @param publndNo
 * @returns
 */
function updatePbprtAccdtInfoDel(publndNo) {
	if (confirm('삭제 하시겠습니까?')) {
		ui.loadingBar("show");
		
		$.ajax({
			data : { "publndNo" : publndNo },
			type : 'post',
			url : '/job/adas/publnd/updatePbprtAccdtInfoDel.do',
			dataType: 'json',	// ModelAndView return 값을 json으로 받기 위해서 추가.
			success : function(data) {
				if (data.status == 'success') {
					toastr.success("정상적으로 삭제되었습니다.");
					
					$('.pbprtAccdtInput').val('');
					resetGrid();
					ui.closeSubPopup("rightSubPopup");
					ui.loadingBar("hide");
				} else {
					toastr.error('ERROR!');
					ui.loadingBar("hide");
					return;
				}
			}, complete : function(){
				ui.loadingBar("hide");
			}
		});
	}
}



/**
 * 공유재산 실태조사 상세 정보 수정
 * @param publndNo
 * @returns
 */
function updatePbprtAccdtInfo(publndNo) {
    if (confirm('수정 하시겠습니까?')) {
	let formData = $('#dataRegistForm').serialize();
	ui.loadingBar("show");
	$.ajax({
		data : formData,
		type : 'post',
		url : '/job/adas/publnd/updatePbprtAccdtInfo.do',
		dataType: 'json',	// ModelAndView return 값을 json으로 받기 위해서 추가.
		success : function(data) {
		    if (data.status == 'success') {
			toastr.success("정상적으로 수정되었습니다.");
			$('.pbprtAccdtInput').val('');
			resetGrid();
			ui.loadingBar("hide");
		    } else {
			toastr.error('ERROR!');
			ui.loadingBar("hide");
			return;
		    }
		}, complete : function() {
		    ui.loadingBar("hide");
		}
		});
	}
}

/**
 * 엑셀 연도별 / 전체 다운로드
 * @returns
 */
function downloadPbprtAccdtExcelList() {
    ui.loadingBar("show");
    // 엑셀 다운로드를 위한 grid 생성
    var excelGrid = new ax5.ui.grid();
	excelGrid.setConfig({
	target: $('[data-ax5grid="attr-grid-excel"]'),
	columns: [
		{key: "prprtyNo", 		label: "재산번호"			},
    	{key: "ctrtYmd", 		label: "계약(갱신)일"		},
		{key: "cntrctpd", 		label: "계약기간"			},
		{key: "locplc", 		label: "소재지"			},
		{key: "ldcgCd", 		label: "지목"				},
		{key: "ar", 			label: "면적"				},
		{key: "loanAr", 		label: "대부 면적"			},
		{key: "loanPrpos", 		label: "대부 용도"			},
		{key: "rrno", 			label: "주민등록번호"		},
		{key: "loanmnSndngYn", 	label: "대부료 발송 여부"	},
		{key: "nm", 			label: "성명"				},
		{key: "addr", 			label: "주소"				},
		{key: "zip", 			label: "우편번호"			},
		{key: "cttpc", 			label: "연락처"			},
		{key: "rm", 			label: "비고"				},
		{key: "nhtSndng", 		label: "고지서 발송"		},
		{key: "atchPapers", 	label: "첨부 서류"			},
		{key: "cnfirmMatter", 	label: "확인 사항"			}
	]
    });

	var list = [];
	let yearOption = $('select#year').val();
	$.ajax({
		data : { "yearOption" : yearOption },
		url : "/job/adas/publnd/selectPbprtAccdtPgeList.do",
		type : 'post',
		dataType: "json",
		success : function(data) {
			for(i = 0; i < data.pbprtAccdtList.length; i++) {
				list.push(data.pbprtAccdtList[i]);
			}
			excelGrid.setData(list);
			if (yearOption != 'allYear') {
			    excelGrid.exportExcel("공유지관리_공유재산 실태조사_" + yearOption + ".xls");
			} else {
			    excelGrid.exportExcel("공유지관리_공유재산 실태조사" + ".xls");
			}
			$('[data-ax5grid="attr-grid-excel"]').empty();
			ui.loadingBar("hide");
		}
	});
}


/**
 * 공유재산 실태조사 엑셀 업로드 화면 호출 ajax
 * @param 
 * @returns
 */
function selectPbprtAccdtExcelUploadView(){
	ui.loadingBar("show");
	ui.openPopup("rightSubPopup");
	$.ajax({
		type : "POST",
		url : "/job/adas/publnd/selectPbprtAccdtExcelUploadView.do",
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").append(returnData);
			}else{ 
				toastr.error("ERROR!");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

/**
 * 업로드파일 디렉토리 정보표출
 * @returns
 */
function pbprtAccdtExcelDir(){
	var fileName = $("input[name='pbprtAccdtFile']").val();
	$("#fileDir").text("파일 경로 : " + fileName);
}

/**
 * 엑셀 업로드
 * @returns
 */
function pbprtAccdtExcelUpload(){	
	var url ="/job/adas/publnd/callPbprtAccdtExcel.do";	
	var formData = new FormData($("#pbprtAccdtExcelUploadForm")[0]);
	var excelUploadType = $("input[type=radio][name=excelUploadType]:checked").val();
	
	ui.loadingBar("show");
	
	$.ajax({
		url:url,
		type:"post",
		dataType:"json",
		contentType : false,
		processData : false,
		data:formData,
		success:callpbprtAccdtExcelCallback,
		error:function(xhr,status, error){
			toastr.error("err: " + error);
			ui.loadingBar("hide");
		}, complete : function() {
			ui.loadingBar("hide"); 
		}		
	});
	
	function callpbprtAccdtExcelCallback(data) {
		if(data.result=="error"){
			toastr.error("파일업로드 실패");
		} else if (data.result == "success") {
			toastr.success('등록되었습니다');
			resetGrid();
			ui.loadingBar("hide");
		}
	}
}

/**
 * 공유재산 실태조사 엑셀 업로드 양식 다운로드
 * @returns
 */
function selectPbprtAccdtExcelForm() {
	let url = "/job/adas/publnd/downloadPbprtAccdtExcelBassForm.do";
	
	$("form[name='excelUploadForm']").attr('onsubmit', '');
	$("form[name='excelUploadForm']").attr('action', url);
	$("form[name='excelUploadForm']").submit();
	$("form[name='excelUploadForm']").attr('action', '');
}

/**
 * png 이미지 생성 전, 지적 선택하기
 * @returns
 */
function createImage() {
    var msgTxt = "화면에서 지적을 선택해주세요.";
    toastr.success(msgTxt);
    
    dtmap.vector.clear();
    dtmap.draw.active({type: 'Point', once: true});
    dtmap.once('drawend', _onDrawEnd_publndMap);
}

/**
 * 지적 그리기 이벤트 연결
 * @param e
 * @returns
 */
function _onDrawEnd_publndMap(e) {
    var geom = e.geometry;
    var publndLayer = "digitaltwin:lsmd_cont_ldreg_41830";
    setPublndLayer(geom, publndLayer).then(function() {
	toImageResize().then(function(data) {
	    $(".saveMap-satlit-thumb #thumbImg").attr("src", data);
	    setTimeout(() => {
		saveCurrentImage();
	    }, 800);
	});
        dtmap.draw.dispose();
    });
}

/**
 * 지적 그리기 및 화면 이동
 * @param geom
 * @param layerNm
 * @returns
 */
function setPublndLayer(geom, layerNm) {
    var deferred = $.Deferred();
    var promise = dtmap.wfsGetFeature({
        typeNames: layerNm, //WFS 레이어명
        geometry: geom
    });
    promise.then(function (data) {
	let id = data.features[0].id;
        dtmap.vector.readGeoJson(data);
        dtmap.vector.select(id);
        setLdbdList(geom, data, layerNm);
        deferred.resolve(data);
    });
    return deferred;
}

/**
 * png 다운로드
 * @returns
 */
function saveCurrentImage() {
    let src = $(".saveMap-satlit-thumb #thumbImg").attr("src");
    if (confirm('현재 화면으로 저장하시겠습니까?')) {
	let link = document.createElement("a");
	link.download = "map.png";
	link.href = src;
	link.click();
	link.remove();
    }
}

/**
 * png 사이즈 조정
 * @returns
 */
function toImageResize() {
    let element;
    if (dtmap.mod == '2D') {
	element = document.querySelector("#map2D canvas");
    } else if (dtmap.mod == '3D') {
	element = document.querySelector("#map3D canvas");
    }
    // 사용자가 클릭 한 곳 중심으로 '600x600' 사이즈 이미지 옵션
    let options = {
	    x : 650,
	    y : 200,
	    width : 600,
	    height : 600
    };
    
    let imageSrc = dtmap.toImage(options);
    
    return imageSrc;
    
    // dtmap.toImage()에 parameter 'options' 추가됨
//    const promise = $.Deferred();
//    html2canvas(element, options).then(canvas => {
//	promise.resolve(canvas.toDataURL());
//    });
//    return promise;
}