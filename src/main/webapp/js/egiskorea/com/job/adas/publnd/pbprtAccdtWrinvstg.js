/********************************
* 공유재산 실태조사서
* author : 이혜인
* since : 2023.02.21
********************************/

let sptPhotoFile;
let satlitPhotoFile;
let sptSrc;
let satlitSrc;
$(document).ready(function() {
	sptSrc = $('#sptPhotoThumb').attr('src');
	satlitSrc = $('#satlitPhotoThumb').attr('src');
})
/**
 * 첨부파일 변경 시 이벤트
 * @param event
 * @returns
 */
$("#sptPhoto").on("change", function(event){
	sptPhotoFile = event.target.files[0];
	if ($('#delSptPhoto').hasClass('dsplyNone')) {
		$('#delSptPhoto').removeClass('dsplyNone');
	}
});

$('#satlitPhoto').on("change", function(event){
	satlitPhotoFile = event.target.files[0];
	if ($('#delSatlitPhoto').hasClass('dsplyNone')) {
		$('#delSatlitPhoto').removeClass('dsplyNone');
	}
});

/**
 * 공유재산 실태조사서 등록, 수정
 * @param 
 * @returns
 */
function putInfo() {
	let text = event.target.innerText;
	let regConfirm = confirm(text+'하시겠습니까?');
	let setSptSrc = $('#sptPhotoThumb').attr('src');
	let setSatlitSrc = $('#satlitPhotoThumb').attr('src');
	if(!regConfirm) {
		return;
	} else {
		if ($('#sptPhotoThumb').attr('src') === '' && $('#satlitPhotoThumb').attr('src') === '') {
			$('#fileDelYn').val('Y');
		} else if (sptSrc != setSptSrc) {
			$('#fileDelYn').val('chgSpt');
			if ($('#sptPhotoThumb').attr('src') === '') {
				$('#fileDelYn').val('Yspt');
			}
		} else if (satlitSrc != setSatlitSrc) {
			$('#fileDelYn').val('chgSatlit');
			if ($('#satlitPhotoThumb').attr('src') === '') {
				$('#fileDelYn').val('Ysatlit');
			}
		} else if (sptSrc == setSptSrc && satlitSrc == setSatlitSrc) {
			$('#fileDelYn').val('N');
		}
		
		let info = $('#exmnCnForm')[0];
		let formInfo = new FormData(info);
		
		let bsrpCnValue = $('#bsrpCnValue')[0];
		bsrpCnValue = bsrpCnValue.innerHTML;
		let exmnrValue = $('#exmnrValue')[0];
		exmnrValue = exmnrValue.innerHTML;
		
		formInfo.append('sptPhotoFile',sptPhotoFile);
		formInfo.append('satlitPhotoFile',satlitPhotoFile);
		formInfo.append('bsrpCn',bsrpCnValue);
		formInfo.append('exmnr',exmnrValue);
		
		$.ajax({
			data : formInfo,
			type : 'post',
			url : '/job/adas/publnd/insertPbprtAccdtWrinvstg.do',
	        enctype:"multipart/form-data",
			dataType: 'json',
	        processData : false,
	        contentType : false,
			success : function(data) {
				if (data.status == 'success') {
					if (!alert("정상적으로 등록되었습니다.")) {
						location.reload();
					}
				} else {
					alert("등록 실패하였습니다.");
					return;
				}
			}, error : function(request, status, error) {
				console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	}
	
}


/**
 * 공유재산 실태조사서 삭제
 * @param publndNo
 * @returns
 */
function removeInfo(publndNo) {
	let text = event.target.innerText;
	if (text === "취소") {
		window.close();
	} else {

		let regConfirm = confirm('삭제하시겠습니까?');
		
		if(!regConfirm) {
			return;
		} else {

			$.ajax({
				data : {publndNo: publndNo},
				type : 'post',
				url : '/job/adas/publnd/deletePbprtAccdtWrinvstg.do',
				dataType: 'json',
				success : function(data) {
					if (data.status == 'success') {
						if (!alert("정상적으로 삭제되었습니다.")) {
							location.reload();
						}
					} else {
						alert("삭제 실패하였습니다.");
						return;
					}
				}, error : function(request, status, error) {
					console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
			});
		}
	}
}


/**
 * 이미지 파일 썸네일
 * @param input
 * @returns
 */
function readImage(input, id) {
	if (id == "sptPhoto") {
		
	    if (input.files && input.files[0]) {
	        const reader = new FileReader();
	        reader.onload = e => {
	            const previewImage = document.getElementById("sptPhotoThumb");
	            previewImage.src = e.target.result;
	        }
	        reader.readAsDataURL(input.files[0]);
	
	    	if ($('#sptPhotoThumb').hasClass('dsplyNone')) {
	    		$('#sptPhotoThumb').removeClass('dsplyNone');
	    	}
	    }
    } else if (id == "satlitPhoto") {
		if (input.files && input.files[0]) {
			const reader = new FileReader();
			reader.onload = e => {
				const previewImage = document.getElementById("satlitPhotoThumb");
				previewImage.src = e.target.result;
			}
			reader.readAsDataURL(input.files[0]);
			
			if ($('#satlitPhotoThumb').hasClass('dsplyNone')) {
				$('#satlitPhotoThumb').removeClass('dsplyNone');
			}
		}
    }
}
const inputImage = document.getElementById("sptPhoto");
inputImage.addEventListener("change", e => {
    readImage(e.target, inputImage.id);
});

const inputSatlitImage = document.getElementById("satlitPhoto");
inputSatlitImage.addEventListener("change", e => {
	readImage(e.target, inputSatlitImage.id);
})

/**
 * 이미지 파일 삭제
 * @returns
 */
function delImgFile(e) {
	if (e.previousElementSibling.id == "sptPhoto") {
		$('#sptPhotoThumb').attr('src','');
		$('#sptPhoto').val('');
		sptPhotoFile = null;
		$('#delSptPhoto').addClass('dsplyNone');
		$('#sptPhotoThumb').addClass('dsplyNone');
	} else {
		$('#satlitPhotoThumb').attr('src','');
		$('#satlitPhoto').val('');
		satlitPhotoFile = null;
		$('#delSatlitPhoto').addClass('dsplyNone');
		$('#satlitPhotoThumb').addClass('dsplyNone');
	}
}


/**
 * 현재 화면을 png로 만들어 pdf로 변환
 * @returns
 */
function downloadPdf() {
	// 저장할 때 버튼과 input border 등 모양 지우기
	$('.buttonBordr, #sptPhoto, #delSptPhoto, .delFileButton').addClass('dsplyNone');
	$('input, select, textarea').addClass('pdfConvert');
	
	html2canvas(document.querySelector('#wrtContent')).then(canvas => {
            // 캔버스를 이미지로 변환
            let imgData = canvas.toDataURL("image/jpeg", 1.0);
            $('#wrtContent').addClass('dsplyNone');
            let img = $('#wrtContent').after('<img id="pdfImg"/>');
            $('#pdfImg').attr('src', imgData);
            
            let imgWidth = 190; // 이미지 가로 길이(mm) A4 기준
            let pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
            let imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;

            let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
            let pdfImageSrc = $('#pdfImg').attr('src');
            // 첫 페이지 출력
//            pdf.addImage(imgData, 'jpeg', 10, 10, 190, imgHeight);
            pdf.addImage(pdfImageSrc, 'jpeg', 10, 10, 190, imgHeight);
            heightLeft -= pageHeight;

            // 한 페이지 이상일 경우 루프 돌면서 출력
//            while (heightLeft >= 20) {
//                position = heightLeft - imgHeight;
//                pdf.addPage();
//                pdf.addImage(imgData, 'jpeg', 10, 10, 190, imgHeight);
//                heightLeft -= pageHeight;
//            }

            // 파일 저장
            pdf.save('공유재산_실태_조사서.pdf');
            $('#pdfImg').remove();
            setTimeout(() => {
            	$('#wrtContent').removeClass('dsplyNone');
			}, 500);
        }
    );
	
	$('.buttonBordr, #sptPhoto, #delSptPhoto, .delFileButton').removeClass('dsplyNone');
	$('input, select, textarea').removeClass('pdfConvert');
}


/**
 * 한글 파일 다운로드
 * @returns
 */
function downloadHwp() {
	let url = '/job/adas/publnd/downloadWrinvstgToHwpFile.do';
	$("form[name='exmnCnForm']").attr('onsubmit', '');
	$("form[name='exmnCnForm']").attr('action', url);
	$("form[name='exmnCnForm']").submit();
	$("form[name='exmnCnForm']").attr('action', '');
}
