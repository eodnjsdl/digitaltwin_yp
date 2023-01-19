function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getExtensionOfFilename(filename) {
	 
    var _fileLen = filename.length;
 
    /** 
     * lastIndexOf('.') 
     * 뒤에서부터 '.'의 위치를 찾기위한 함수
     * 검색 문자의 위치를 반환한다.
     * 파일 이름에 '.'이 포함되는 경우가 있기 때문에 lastIndexOf() 사용
     */
    var _lastDot = filename.lastIndexOf('.');
 
    // 확장자 명만 추출한 후 소문자로 변경
    var _fileExt = filename.substring(_lastDot+1, _fileLen).toLowerCase();
 
    return _fileExt;
}

function removeLine(returnData){
	return returnData.replace(/\n/g, "").replace(/\r/g, "");
}

// 쿠키 조회
function getCookie(cookie_name) { 
	var x, y; 
	var val = document.cookie.split(';'); 
	
	for (var i = 0; i < val.length; i++) {
		x = val[i].substr(0, val[i].indexOf('=')); 
		y = val[i].substr(val[i].indexOf('=') + 1); 
		x = x.replace(/^\s+|\s+$/g, '');
		
		if(x == cookie_name){
			return y;
		}
	}
}


/**
 * @description form submit을 해주는 함수.
 * @Author 플랫폼개발부문 DT솔루션 이준호
 * @Date 2022.02.11
 * @param {object} options 옵션 객체 값.
 * @param {string} options.method method값 (인자 값이 없을 경우 target이 되는 form method값을 따르거나 기본 get으로 동작한다.)
 * @param {string} options.action action 값 (인자 값이 없을 경우 target이 되는 form action값을 따르거나 아님 기본 현재 페이지로 동작한다.)
 * @param {object} options.formData form에 hidden타입으로 추가할 값 예) {'name1': 'value1', 'name2': 'value2'}
 * @param {JqueryObject} options.targetForm 타겟일 될 form값 없으면 가상의 form을 생성한다. 예) $('form')
 */
function submit(options) {

	var formData = (typeof options.formData !== 'undefined') ? options.formData : {};
	var $form = (typeof options.targetForm !== 'undefined') ? options.targetForm : $('<form></form>');

	if (typeof options.action !== 'undefined') { //action값이 선언되어 있을 경우
		$form.attr('action', options.action);
	}

	if (typeof options.method !== 'undefined') { //method값이 선언되어 있을 경우
		$form.attr('method', options.method);
	}

	$.each(formData, function(name, value) {
		$form.append($('<input/>', { type: 'hidden', name: name, value: value }));
	});

	if (typeof options.targetForm !== 'undefined') {
		$form.submit();
	} else {
		$form.appendTo('body').submit();
	}
}

/**
 * @description 바닐라 자바스크립트로 form에 input hidden을 추가해주는 함수.
 * @Author 플랫폼개발부문 DT솔루션 이준호
 * @Date 2022.03.16
 * @param {form} form javascript form
 * @param {string} name input hidden name값
 * @param {string} value input hidden value값
 */
function addFormHidden(form, name, value) {
	var input = document.createElement('input');
	input.type = 'hidden';
	input.name = name;
	input.value  = value;
	form.appendChild(input);
}

/**
 * @description 첨부파일 이미지 선택시 미리보기를 만들어주는 함수.
 * @Author 플랫폼개발부문 DT솔루션 이준호
 * @Date 2022.02.25
 * @param {object} input - input객체
 * @param {JqueryObject} $target 이미지 태그가 들어갈 타겟 태그
 */
function imagePreview(input, $target) {
	if (input.files && input.files[0]) {
		var type = input.files[0].type;
		if (type.toLowerCase().indexOf('image') != -1) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$target.html($('<img/>', { src: e.target.result }));
			}
			reader.readAsDataURL(input.files[0]);
		}
	} else {
		$target.html('');
	}
}

/**
 * 팝업 메시지
 * @param msgTxt
 * @returns
 */
function showMsg(msgTxt) {
  var x = document.getElementById("toastMsg");
  x.className = "show";
  x.innerText = msgTxt;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
