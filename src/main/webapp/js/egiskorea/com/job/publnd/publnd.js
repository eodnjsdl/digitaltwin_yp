/********************************
* 공유재산실태조사
* author : 백승석
* since : 2023.02.21
********************************/
$(document.body).ready(function() {
	dtmap.init();
	initGrid();
	setData();
})

/**
 * 테이블 데이터 변경 시 재생성
 * @returns
 */
function resetGrid() {
	initGrid();
	setData();
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
			onChange: function () {
				setData(this.page.selectPage);
			}
		},
		columns: [
			{key: "ctrtYmd", label: "계약(갱신)일"},
			{key: "cntrctpd", label: "계약기간"},
			{key: "locplc", label: "소재지"},
			{key: "ldcgCd", label: "지목"},
			{key: "ar", label: "면적"},
			{key: "loanAr", label: "대부 면적"},
			{key: "loanPrpos", label: "대부 용도"},
			{key: "rrno", label: "주민등록번호"},
			{key: "loanmnSndngYn", label: "대부료 발송 여부"},
			{key: "nm", label: "성명"},
			{key: "addr", label: "주소"},
			{key: "zip", label: "우편번호"},
			{key: "cttpc", label: "연락처"},
			{key: "rm", label: "비고"},
			{key: "nhtSndng", label: "고지서 발송"},
			{key: "atchPapers", label: "첨부 서류"},
			{key: "cnfirmMatter", label: "확인 사항"},
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
		data : { "yearOption" : yearOption },
		url : "/job/publnd/selectPbprtAccdtPgeList.do",
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
					 totalPages: Math.ceil(data.cnt/100)
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
		url : '/job/publnd/selectPbprtAccdtDtlInfoView.do',
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
		url : "/job/publnd/insertPbprtAccdtView.do",
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
			url : '/job/publnd/updatePbprtAccdtInfo.do',
			dataType: 'json',	// ModelAndView return 값을 json으로 받기 위해서 추가.
			success : function(data) {
				if (data.status == 'success') {
					toastr.success("정상적으로 수정되었습니다.");
					
					$('#pbprtAccdtDtlView .pbprtAccdtInput').val('');
					$("#rightSubPopup").empty();
					ui.closeSubPopup("rightSubPopup");
					fn_pageDetail(publndNo);
//					$('#pbprtAccdtDtlView').remove();
//					OLOAD.m_center_Polygon.removeAllObject();
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
		let formData = $('#pbprtAccdtRegisterView #dataRegistForm').serialize();
		
		ui.loadingBar("show");
		$.ajax({
			data : formData,
			type : 'post',
			url : '/job/publnd/insertPbprtAccdtInfo.do',
			dataType: 'json',	// ModelAndView return 값을 json으로 받기 위해서 추가.
			success : function(data) {
				if (data.status == 'success') {
					toastr.success("정상적으로 등록되었습니다.");
					
					$('#pbprtAccdtRegisterView .pbprtAccdtInput').val('');
//					cancelPutPbprtAccdtPopup();
					bottomPopupOpen('pbprtAccdt');
					
					ui.loadingBar("hide");
				} else {
					toastr.error('ERROR!');
					ui.loadingBar("hide");
					return;
				}
			}, complete : function(){
				bottomPopupOpen('pbprtAccdt');
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
 * 공유재산 실태조사서 새창
 * @param publndNo
 * @returns
 */
function selectPbprtAccdtWrinvstg(publndNo) {
	window.open('/job/publnd/selectPbprtAccdtWrinvstg.do?publndNo=' + publndNo, 'wrinvstg','width=1000, height=800');
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
			url : '/job/publnd/updatePbprtAccdtInfoDel.do',
			dataType: 'json',	// ModelAndView return 값을 json으로 받기 위해서 추가.
			success : function(data) {
				if (data.status == 'success') {
					toastr.success("정상적으로 삭제되었습니다.");
					
					$('.pbprtAccdtInput').val('');
					cancelPutPbprtAccdtPopup();
					bottomPopupOpen('pbprtAccdt');
					ui.loadingBar("hide");
				} else {
					toastr.error('ERROR!');
					ui.loadingBar("hide");
					return;
				}
			}, complete : function(){
				bottomPopupOpen('pbprtAccdt');
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
		let formData = $('#pbprtAccdtDtlView #dataRegistForm').serialize();
		
		
		ui.loadingBar("show");
		$.ajax({
			data : formData,
			type : 'post',
			url : '/job/publnd/updatePbprtAccdtInfo.do',
			dataType: 'json',	// ModelAndView return 값을 json으로 받기 위해서 추가.
			success : function(data) {
				if (data.status == 'success') {
					toastr.success("정상적으로 수정되었습니다.");
					
					$('#pbprtAccdtDtlView .pbprtAccdtInput').val('');
					bottomPopupOpen('pbprtAccdt');
					$('#pbprtAccdtDtlView').remove();
					OLOAD.m_center_Polygon.removeAllObject();
					ui.loadingBar("hide");
				} else {
					toastr.error('ERROR!');
					ui.loadingBar("hide");
					return;
				}
			}, complete : function(){
				bottomPopupOpen('pbprtAccdt');
				ui.loadingBar("hide");
			}
		});
	}
	
}

/**
 * 엑셀 연도별 / 전체 다운로드
 * @returns
 */
function downloadPbprtAccdtExcel() {
	let url = "/job/publnd/downloadPbprtAccdtExcelList.do";
	let year = $('#year').val();
	
	$("form[name='searchFormExcel']").append('<input type="hidden" name="year" value=' + year + '>');
	$("form[name='searchFormExcel']").attr('onsubmit', '');
	$("form[name='searchFormExcel']").attr('action', url);
	$("form[name='searchFormExcel']").submit();
	$("form[name='searchFormExcel']").attr('action', '');
	$("form[name='searchFormExcel'] input[name='year']").remove();

	return false;
}

/**
 * 공유재산 실태조사 엑셀 업로드 화면 호출 ajax
 * @param 
 * @returns
 */
function selectPbprtAccdtExcelUploadView(){
	ui.loadingBar("show");
	$('#pbprtAccdtExcelUploadView').remove();
	
	$.ajax({
		type : "POST",
		url : "/job/publnd/selectPbprtAccdtExcelUploadView.do",
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#container").append(returnData);
				
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
	var url ="/job/publnd/callPbprtAccdtExcel.do";	
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
		}, complete : function() {
			ui.loadingBar("hide"); 
		}		
	});
	
	function callpbprtAccdtExcelCallback(data) {
		if(data.result=="error"){
			toastr.error("파일업로드 실패");
		} else if (data.result == "success") {
			toastr.success('등록되었습니다');
			$('#pbprtAccdtExcelUploadView').remove();
			bottomPopupOpen('pbprtAccdt');
			
		}
	}
}

/**
 * 공유재산 실태조사 엑셀 업로드 양식 다운로드
 * @returns
 */
function selectPbprtAccdtExcelForm() {
	let url = "/job/publnd/downloadPbprtAccdtExcelBassForm.do";
	
	$("form[name='excelUploadForm']").attr('onsubmit', '');
	$("form[name='excelUploadForm']").attr('action', url);
	$("form[name='excelUploadForm']").submit();
	$("form[name='excelUploadForm']").attr('action', '');
}

/**
 * PNG 이미지 생성
 */
function createSatlitImage() {
	
  // 2D
//  if (app2D) {
  if (_cur_mode == '2D') {
	$('#satlitPhotoSave').addClass('satlit');
    const yMap = app2D.getYMap();
    yMap.exportImage().done((data, width, height) => {
      $(".saveMap-satlit-thumb img").attr("src", data);
      this.width = width;
      this.height = height;
    });
  } else {
      // create canvas Image

	var captureCanvas = null;		// 캡쳐 이미지 저장 캔버스
	
	var canvasRect = Module.canvas.getBoundingClientRect();
	var canvasStyle = "display:none;";
	canvasStyle += "position:fixed;left:"+canvasRect.left+";top:"+canvasRect.top+";zIndex:90;";
	
	var eParent = document.body;
	var copyCanvas = document.createElement("canvas");
	copyCanvas.style = canvasStyle;
	copyCanvas.id = "copyCanvas";
	eParent.appendChild(copyCanvas);
	
	var ctx = copyCanvas.getContext('2d');
	copyCanvas.width = 600;
	copyCanvas.height = 600;
	
	// 3D 지도 캔버스 이미지를 추출해 2D 변환용 캔버스로 옮긴다
	ctx.drawImage(Module.canvas, 650, 250, 600, 600, 0, 0, 600, 600);
	
	var dataUrl = copyCanvas.toDataURL();
	$(".saveMap-satlit-thumb img").attr("src", dataUrl);
  }

	setTimeout(() => {
		if (confirm('현재 화면으로 저장하시겠습니까?')) {
			const src = $(".saveMap-satlit-thumb img").attr("src");
			let link = document.createElement("a");
			link.download = "map.png";
			link.href = src;
			link.click();
			link.remove();
		}
		$('#satlitPhotoSave').removeClass('satlit');
	}, 1000); 
	
}
/**
 * png 이미지 생성 전, 지적 그리기
 * @returns
 */
function createSatlitImageLine() {
	let pnu;
	var msgTxt = "화면에서 지적을 선택해주세요.";
	toastr.success(msgTxt);
	
//	if(!is3dInit){
//	if (_cur_mode != '2D') {
//		ui.loadingbar('show')
//		call3D(false);				
//		
//		is3dInit = true;
//	};
//	if (app2D) {
	if (dtmap.mod == '2D') {
		dtmap.init();
        dtmap.draw.active({type: 'Point', once: true});
        dtmap.on('drawend', _onDrawEnd_publndMap);
        
//	    const yMap = app2D.getYMap();
//	    const select = yMap.getModule("select");
//	    select.on("Point", "drawend", (event) => {
//	        const feature = event.feature;
//	        const geometry = cmmUtil.toMapProjection(feature.getGeometry());
//	        const position = geometry.getCoordinates();
//	        reverseUaiGeo(parseFloat(position[0]), parseFloat(position[1]));
//	    }, true);
        function _onDrawEnd_publndMap(e) {
            var geom = e.geometry;
            var coord = geom.getFlatCoordinates();
            reverseUaiGeoForPublnd(parseFloat(coord[0]), parseFloat(coord[1]));
        }
	} else {
		$('#satlitPhotoSave').addClass('active');
	}
	
	function reverseUaiGeoForPublnd(pointx, pointy) {
	    // var vPosition = new Module.JSVector2D(pointx, pointy);
	    // 좌표변환 실행
	    // var vResult = Module.getProjection().convertProjection(26, vPosition, 13); // 5179 -> 4326
	    var transCoord = proj4(dtmap.crs, "EPSG:4326", [pointx,pointy]);
	    var pnu = aj_getPnuByLonLat(transCoord[0], transCoord[1]);
        var landRegister = getLandRegisterByPnu(pnu);
//	        landRegister.landRegister ?
//	            dtmap.vector.readWKT(landRegister.landRegister.geometry,  landRegister.landRegister)
//	            : toastr.error("geometry 값이 존재하지 않습니다.");
	        // rightPopupOpen("landRegister", pnu, null, true);
//	        ui.openPopup("rightPopup", "krasInfo");
//	        aj_selectLandRegister(pnu);
         dtmap.vector.readWKT(landRegister.landRegister.geometry,  landRegister.landRegister);
         cmmUtil.highlightGeometry(landRegister.landRegister.geometry);
         createSatlitImage();
	}
	
//	function reverseUaiGeo(pointx, pointy) {
//		var vPosition = new Module.JSVector2D(pointx, pointy);
//		
//		// 좌표변환 실행
//		var vResult = Module.getProjection().convertProjection(26, vPosition, 13); // 5179 -> 4326
//		
//		pnu = aj_getPnuByLonLat(vResult.x, vResult.y);
//		
//		if(pnu != ""){
//			var landRegister = getLandRegisterByPnu(pnu);
//			cmmUtil.highlightGeometry(landRegister.landRegister.geometry);
//			setTimeout(() => {
//				createSatlitImage();
//				app2D.getYMap().defaultInteractions();
//			}, 500);
//		}
//	}
};
//================================================================================

/**
 * 공유재산 실태조사 정보 상세보기
 * @param publndNo
 * @returns
 *//*
function getPbprtAccdtInfoDtl(publndNo) {
	ui.loadingBar("show");
	$('#pbprtAccdtDtlView').remove();
	
	$.ajax({
		data : { "publndNo" : publndNo },
		type : "POST",
		url : '/job/publnd/getPbprtAccdtDtlInfoView.do',
		success : function(data, status) {
			if (status == "success") {		
				$("#container").append(data);
				
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			
			} else { 
				toastr.error("ERROR!");
				ui.loadingBar("hide");
				return;
			} 
		}, complete : function() {
			ui.loadingBar("hide");
			}
	});
}*/


/**
 * 공유재산 실태조사 목록 조회
 * @returns
 *//*
function pageCalc(currentPageNo){
	let addContent = '';
	let yearOption = $('select#year').val();
	ui.loadingBar("show");
	$.ajax({
		type : "POST",
		url : "/job/publnd/getPbprtAccdtPgeList.do",
		data : {
			"currentPageNo" : currentPageNo
		  , "yearOption" : yearOption
		},
		dataType : "json",
		success : function(data, status) {
			if (status == "success") {
//				$('#pbprtAccdtTbody tr').remove();
//				let pbprtAccdtList = data.pbprtAccdtList;
//				$.each(pbprtAccdtList, function(key, value) {
//					addContent += '<tr id="' + value.publndNo + '" class="publndNo" style="cursor:pointer;">'
//					+ '<td class="ctrtYmd" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.ctrtYmd) + '</td>'
//					+ '<td class="cntrctpd" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.cntrctpd) + '</td>'
//					+ '<td class="locplc" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.locplc) + '</td>'
//					+ '<td class="ldcgCd" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.ldcgCd) + '</td>'
//					+ '<td class="ar" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.ar) + '</td>'
//					+ '<td class="loanAr" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.loanAr) + '</td>'
//					+ '<td class="loanPrpos" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.loanPrpos) + '</td>'
//					+ '<td class="rrno" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.rrno) + '</td>'
//					+ '<td class="loanmnSndngYn" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.loanmnSndngYn) + '</td>'
//					+ '<td class="nm" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.nm) + '</td>'
//					+ '<td class="addr" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.addr) + '</td>'
//					+ '<td class="zip" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.zip) + '</td>'
//					+ '<td class="cttpc" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.cttpc) + '</td>'
//					+ '<td class="rm" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.rm) + '</td>'
//					+ '<td class="nhtSndng" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.nhtSndng) + '</td>'
//					+ '<td class="atchPapers" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.atchPapers) + '</td>'
//					+ '<td class="cnfirmMatter" onclick="getPbprtAccdtInfoDtl(' + value.publndNo + ')">' + isEmptyValue(value.cnfirmMatter) + '</td>'
//					+ '<td class="delYnCol"><button type="button" class="btn basic bi-delete2" onclick="modifyPbprtAccdtInfoDel(' + value.publndNo + ')">삭제</button></td>'
//					+ '</tr>';
//				});
//				$('#pbprtAccdtTbody').append(addContent);
				
				
				
				
				//페이지 생성
				paging(data.currentPageNo, data.cnt);
			} else { 
				toastr.error("ERROR!");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

*//**
 * 목록 null값 표출 방지, 공백2칸이상 -> 1칸으로 변경
 * @param value
 * @returns
 *//*
function isEmptyValue(value){

    if(value == null || value.length === 0) {
           return "";
     } else {
            return value;
     }
}


var pageUnit	 	= 10;	//화면에 표시할 자료 개수(페이지당 레코드 수)
var pageCount 	 	= 10;	//화면에 표시할 페이지 번호 개수(블럭당 페이지 수)
var totalPage 		= 0;	//전체 페이지 수
var totalBlock 		= 0;	//전체 블럭 수
var nowBlock 		= 0;	//현재 페이지 블럭
var startPage 		= 0;	//가져올 페이지 시작 번호
var endPage 		= 0;	//출력할 마지막 페이지 번호

*//**
 * 검색 페이징 함수
 * @param currentPageNo		현재 페이지 번호
 * @param totalRecordCount	전체 조회 건수
 * @returns
 *//*
function paging(currentPageNo, totalRecordCount) {
	$('#pagination').empty();
	totalPage = Math.ceil(totalRecordCount / pageUnit);										//전체 페이지 수
	totalBlock = Math.ceil(totalPage / pageCount);											//전체 블럭 수
	nowBlock = Math.ceil(currentPageNo / pageCount);										//현재 페이지 블럭
	startPage = ((nowBlock - 1) * pageCount) + 1;											//가져올 페이지 시작 번호
	endPage = ((totalPage-startPage) >= pageCount)?(startPage + pageCount - 1):totalPage;	//출력할 마지막 페이지 번호
	let content = "";
	//이전
	if(nowBlock > 1) {
		content +='<li class="page first" onclick="pageCalc(' + (1) + ')"></li>';
		content +='<li class="page prev" onclick="pageCalc(' + (nowBlock-1)*pageCount + ')"></li>';
	}
	for(var i=startPage;i<=endPage;i++) {
		if(i == currentPageNo) {
			content +='<li class="page fontb">' + i + '</li>';
		}else {
			content +='<li class="page" onclick="pageCalc(' + i + ')">' + i + '</li>';
		}
	}
	//다음
	if((totalBlock - nowBlock) > 0) {
		content +='<li class="page next" onclick="pageCalc(' + (nowBlock*pageCount+1) + ')"></li>';
		content +='<li class="page last" onclick="pageCalc(' + totalPage + ')"></li>';
	}
	$('#pagination').append(content);
}

*//**
 * 페이지 번호 클릭 시, 현재 페이지 번호 표시
 * @returns
 *//*
$('li.page').click(function() {
	$(this).addClass('fontb');
	$('.page').not(this).removeClass('fontb');
});*/


/**
 * 신규(공유재산 실태조사) 등록창 취소
 * @returns
 *//*
function cancelPutPbprtAccdtPopup() {
	$('#pbprtAccdtRegisterView').removeClass('opened');
	$(".popup-sub").removeClass("opened");
	$('#pbprtAccdtRegisterView').remove();
}*/
//================================================================================