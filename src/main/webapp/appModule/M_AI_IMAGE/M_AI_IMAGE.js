/**
 * SUBJECT : ai영상분석 (3d)
 * AUTHOR : 백승석
 * LAST UPDATE : 2023.05.26
 */
$(document).ready(() => {
    dtmap.off('select');
    cameraMove();
    setCheckList();
    setCheckboxDetail();    
})
/**
 * 카메라 위치 조정 (북방향, 90도각)
 * @returns
 */
function cameraMove() {
    let getLocation = map3d.camera.getLocation();
    let location = {
	    lon : getLocation.Longitude,
	    lat : getLocation.Latitude,
	    alt : getLocation.Altitude,
    }
    let centerVec = new Module.JSVector3D(location.lon, location.lat, location.alt);
    map3d.camera.move(centerVec, 90, 0, 800);
}

/**
 * 체크박스 생성 - 분석 결과 표시할 값
 * @returns
 */
function setCheckList() {
    let count = M_AI_IMAGE.detectLegend.legend.length;
    for (let i = 0; i < count; i++) {
	let textData = M_AI_IMAGE.detectLegend.legend[i];
	let id = 'class_' + i;
	let html = "";
	html += "<span>\n";
	html += "<input type=\"checkbox\" name=\"AI_check\" id="+ id + " checked=\"checked\" data-base-id=" + textData[id].key + ">\n";
	html += "<label for=" + id + ">" + textData[id].name + "(0)" + "</label>\n";
	html += "</span>\n";
	$('#AIVideoBox .form-checkbox.group').append(html);
    }
}

/**
 * 체크박스 전체 컨트롤
 * @returns
 */
function setCheckboxDetail() {
    $('#AIVideoBox input[name=AiCheckValue]').on('change', function(e) {
	let value = $(e.target).prop('checked');
	if (value === true) {
	    $('#AIVideoBox .form-checkbox.group input[name=AI_check]').prop('checked', true);
	} else {
	    $('#AIVideoBox .form-checkbox.group input[name=AI_check]').prop('checked', false);
	}
    });
}

/**
 * 객체 선택 이벤트
 * @param id
 * @returns
 */
function selectAiResult(e) {
    let $thisBtn = null;
    let $otherBtn = null;
    if (e.id) {
	dtmap.vector.clearSelect();
	dtmap.vector.select(e.id);
	$thisBtn = $(e).parents('tr');
	$otherBtn = $(e).parents('tbody').find('tr');
    } else {
        $thisBtn = $('#' + e).parents('tr');
        $otherBtn = $('#' + e).parents('tbody').find('tr');
    }
    if ($thisBtn.hasClass('selectedLine')) {
	$otherBtn.removeClass('selectedLine');
    } else {
	$otherBtn.removeClass('selectedLine');
	$thisBtn.addClass('selectedLine');
    }
}

/**
 * 객체 선택 이벤트 (dtmap.on())
 * @param e
 * @returns
 */
function onAiImageSelectEventListener(e) {
    let id = e.id;
    if (id) {
	dtmap.vector.clearSelect();
	dtmap.vector.select(id);
	selectAiResult(id);
    } else { 
	toastr.error("객체 선택 오류입니다.");
	return false;
    }
}

var M_AI_IMAGE = {
	global: {count: 0},
    detectLegend: {
        legend: [
            {class_0: {
                name: "건물",
                key: "bldg",
                color: [255, 56, 56],
                classId: "0",
                count: 0
            }},
            {class_1: {
                name: "공원",
                key: "park",
                color: [250, 157, 151],
                classId: "1",
                count: 0
            }},
            {class_2: {
                name: "과수원",
                key: "orchrd",
                color: [255, 112, 31],
                classId: "2",
                count: 0
            }},
            {class_3: {
                name: "광천지",
                key: "mnlspt",
                color: [255, 178, 29],
                classId: "3",
                count: 0
            }},
            {class_4: {
                name: "구거",
                key: "ditch",
                color: [207, 210, 49],
                classId: "4",
                count: 0
            }},
            {class_5: {
                name: "답",
                key: "ricfld",
                color: [72, 249, 10],
                classId: "5",
                count: 0
            }},
            {class_6: {
                name: "대",
                key: "grnd",
                color: [146, 204, 23],
                classId: "6",
                count: 0
            }},
            {class_7: {
                name: "도로",
                key: "road",
                color: [61, 219, 134],
                classId: "7",
                count: 0
            }},
            {class_8: {
                name: "목장용지",
                key: "stkfrm",
                color: [26, 147, 52],
                classId: "8",
                count: 0
            }},
            {class_9: {
                name: "묘지",
                key: "grvy",
                color: [0, 212, 187],
                classId: "9",
                count: 0
            }},
            {class_10: {
                name: "비닐하우스",
                key: "phw",
                color: [44, 153, 168],
                classId: "10",
                count: 0
            }},
            {class_11: {
                name: "사적지",
                key: "histst",
                color: [0, 194, 255],
                classId: "11",
                count: 0
            }},
            {class_12: {
                name: "수도용지",
                key: "wtway",
                color: [52, 69, 147],
                classId: "12",
                count: 0
            }},
            {class_13: {
                name: "양어장",
                key: "fshfrm",
                color: [100, 115, 255],
                classId: "13",
                count: 0
            }},
            {class_14: {
                name: "염전",
                key: "sltpan",
                color: [0, 24, 236],
                classId: "14",
                count: 0
            }},
            {class_15: {
                name: "유원지",
                key: "amsprk",
                color: [132, 56, 255],
                classId: "15",
                count: 0
            }},
            {class_16: {
                name: "유지",
                key: "yugi",
                color: [82, 0, 133],
                classId: "16",
                count: 0
            }},
            {class_17: {
        	name: "임야",
        	key: "frtl",
        	color: [203, 56, 255],
        	classId: "17",
                count: 0
            }},
            {class_18: {
        	name: "잡종지",
        	key: "mslnd",
        	color: [255, 149, 200],
        	classId: "18",
                count: 0
            }},
            {class_19: {
        	name: "공장용지",
        	key: "fctry",
        	color: [255, 55, 199],
        	classId: "19",
                count: 0
            }},
            {class_20: {
        	name: "전",
        	key: "dfld",
        	color: [255, 56, 56],
        	classId: "20",
                count: 0
            }},
            {class_21: {
        	name: "제방",
        	key: "dike",
        	color: [255, 157, 151],
        	classId: "21",
                count: 0
            }},
            {class_22: {
        	name: "종교용지",
        	key: "relgn",
        	color: [255, 112, 31],
        	classId: "22",
                count: 0
            }},
            {class_23: {
        	name: "주유소",
        	key: "olt",
        	color: [255, 178, 29],
        	classId: "23",
                count: 0
            }},
            {class_24: {
        	name: "주차장",
        	key: "prkplce",
        	color: [207, 210, 49],
        	classId: "24",
                count: 0
            }},
            {class_25: {
        	name: "창고용지",
        	key: "wrhous",
        	color: [72, 249, 10],
        	classId: "25",
                count: 0
            }},
            {class_26: {
        	name: "하천",
        	key: "river",
        	color: [146, 204, 23],
        	classId: "26",
                count: 0
            }},
            {class_27: {
        	name: "철도용지",
        	key: "rlroad",
        	color: [61, 219, 134],
        	classId: "27",
                count: 0
            }},
            {class_28: {
        	name: "체육용지",
        	key: "phstrn",
        	color: [26, 147, 52],
        	classId: "28",
                count: 0
            }},
            {class_29: {
        	name: "학교용지",
        	key: "school",
        	color: [0, 212, 187],
        	classId: "29",
                count: 0
            }},
            {class_30: {
        	name: "빌딩",
        	key: "bld",
        	color: [44, 153, 168],
        	classId: "30",
                count: 0
            }},
            {class_31: {
        	name: "아파트",
        	key: "apt",
        	color: [0, 194, 255],
        	classId: "31",
                count: 0
            }},
            {class_32: {
        	name: "저장탱크",
        	key: "tank",
        	color: [52, 69, 147],
        	classId: "32",
                count: 0
            }}
        ],
        resetCount: function () {
            let length = M_AI_IMAGE.detectLegend.legend.length;
            for (let i = 0; i < length; i++) {
        	let obj = M_AI_IMAGE.detectLegend.legend[i]['class_'+i];
        	obj.count = 0;
            }
        }
    },
    init: function () {
	//분석 시작 이벤트
	$("#startAianalysBtn").on('click',function(e){
		chooseUrl = 0;
		M_AI_IMAGE.analysis.start();
	});
	
	$("#startAianalysAdvanc").on('click', function(e) {
		chooseUrl = 1;
		dtmap.vector.clear();
		let checkValue = $('#AIVideoBox input[name="AI_check"]:checked').length;
		if (checkValue === 0) {
		    toastr.error('하나 이상의 옵션을 선택해주세요.');
		} else {
		    M_AI_IMAGE.analysis.start();
		}
		dtmap.off('select');
		dtmap.on('select', onAiImageSelectEventListener);
	});
	
	$("#resetMapDirection").on('click', function(e) {
	    cameraMove();
	});
    },
    analysis: {
        start: function () {
            //초기화
            M_AI_IMAGE.analysis.reset();
            //프로그레스
            ui.loadingBar("show");

            M_AI_IMAGE.analysis.detectAI();
        },
        /**
         * ai 분석 통신 및 데이터 처리연결
         */
        detectAI: function () {
            var captureCanvas = null;		// 캡쳐 이미지 저장 캔버스

            var canvasRect = Module.canvas.getBoundingClientRect();
            var canvasStyle = "";
            canvasStyle += "display:none;position:absolute;left:90px;top:0;zIndex:90;";

            var eParent = document.getElementById('container')
            var copyCanvas = document.createElement("canvas");
            copyCanvas.style = canvasStyle;
            copyCanvas.id = "copyCanvas";
            eParent.appendChild(copyCanvas);

            var ctx = copyCanvas.getContext('2d');
            copyCanvas.width = Module.canvas.width;
            copyCanvas.height = Module.canvas.height;

            ctx.drawImage(Module.canvas, 0, 0);
            //img 바이너리
            var dataUrl = Module.canvas.toDataURL("image/png");
            
            var imgFile = M_AI_IMAGE.UTIL.dataURLtoFile(dataUrl, 'hello.png');
            var formData = new FormData();
            formData.append("file", imgFile);
            formData.append("return_type", "json");
//            formData.append("detect_type", detect_type);

            // ai분석 url - 일반, 고도화
            var aiUrl = ["http://203.228.54.47/detectai", "http://49.247.20.149:5002/detectai"];
            let selectedUrl = aiUrl[chooseUrl];
            let coordinate = [];
            let size;
            coordinate.push(ol.proj.transform([dtmap.getExtent()[0], dtmap.getExtent()[1]], 'EPSG:4326', 'EPSG:3857'));
            coordinate.push(ol.proj.transform([dtmap.getExtent()[2], dtmap.getExtent()[3]], 'EPSG:4326', 'EPSG:3857'));
            size = {width : Module.canvas.width, height : Module.canvas.height};
            formData.append("coordinate", coordinate);
            formData.append("size", size);
            
            $.ajax({
//		url:"http://203.228.54.47/detectai",
		url: selectedUrl,
//		url:"http://10.20.30.81/detectai", // LX 실서버
//		url:"http://10.165.2.30/detectai", // 양평 실서버
                type: "POST",
                dataType: "json",
                data: formData,
                processData: false,
                contentType: false,
                success: function (result) {
                    var alt = dtmap.getCenter()[2];
            		dtmap.vector.clear();
			
			if(result.response.length == 0 || result.response.length == undefined){
				toastr.error("분석결과값이 없습니다. 화면조정후 다시 시도하세요.");
				ui.loadingBar("hide");
				return false;
			}
			if(result.response.length > 0) {
//			    console.log("result");
//			    console.log(result.response);
			    console.log('find\ntotal : ' + result.response.length);
			    var detections;
			    var screenCoord = [];
			    var identifier = [];
			    var totalCount = 0;
			    for (var j = 0; j < result.response.length; j++) {
				detections = result.response[j].detections.split(', ');
				if (detections.length == 3) {
				    console.log(detections);
				    detections.push(detections[0]);
				}
				if (detections.length <= 2) {
				    console.log(detections);
				    break;
				}
				identifier.push({class : result.response[j].class, classId : result.response[j].classid, confidence : result.response[j].confidence});
				screenCoord.push(detections);
			    }
			    for (var i = 0; i < screenCoord.length; i++) {
				var analCoord = [];
				for (var j = 0; j < screenCoord[i].length; j++){
				    var coord = screenCoord[i][j].split(' ');
				    analCoord.push(coord);
				}
				M_AI_IMAGE.analysis.getScreenMapCoord(analCoord, identifier[i], totalCount++, alt);
			    }
			}
		// 체크박스 전체 글자 사라짐 방지;
			console.log('result\ntotal : ' + M_AI_IMAGE.global.count);
		$('input[name="AiCheckValue"] label').innerHTML = '전체';
		ui.loadingBar("hide");
                }
            });

        },
        /**
         * 좌표 계산 후, vector 생성
         */
        getScreenMapCoord: function (coord, identifier, totalCount, alt) {
            var coordinates = [[]];
            // 체크박스 필터.
            var isExist = M_AI_IMAGE.analysis.checkBoxValue(identifier);
            if (!isExist){
        	return;
            }
            var data = M_AI_IMAGE.detectLegend.legend;
            var dataOption = null;
            for (var i = 0; i < data.length; i++) {
        	let index = 'class_' + i;
        	if (identifier.classId == data[i][index].classId) {
        	    dataOption = data[i][index];
        	    totalCount++;
        	    break;
        	}
            }
            let classNm = dataOption.key;
            let classId = identifier.classId;
            let name = dataOption.name;
            let confidence = identifier.confidence;
            let color = dataOption.color;
            if (color != null || color != undefined) {
        	color = "rgb(" + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
            }
            for (var i = 0; i < coord.length; i++) {
        	coord[i] = [parseFloat(coord[i][0]), parseFloat(coord[i][1]), parseFloat(alt)];
		    var pos = ol.proj.transform(coord[i], 'EPSG:3857', 'EPSG:4326');
		    coordinates[0].push(pos);
		}
            options = {
        	    fill : {
        		      color : color,
        		      opacity : 0.5
        		    },
    		    stroke:{
    			      color: color,
    			      opacity: 0.3,
    			      width: 0,
    			      lineDash: 'solid',
    			    },
        	    label : {
        		fill : {
        		    color: '#ffffff',
        		    opacity: 1
        		},
			text : name + ' ' + (Math.ceil(confidence * 100)) + '%'
		    },
		    offsetHeight : 15
            };
            	let vectorId = classNm + '_' + classId + '_' + totalCount;
            	let crs = 'EPSG:4326';
            	let resultInfoData = {count : totalCount, engNm : dataOption.key, korNm : dataOption.name, conf : identifier.confidence, vectorId : vectorId};
            	M_AI_IMAGE.global.count += M_AI_IMAGE.analysis.addPolygon(vectorId, coordinates, crs, options, resultInfoData);
            	M_AI_IMAGE.analysis.resultView(resultInfoData, M_AI_IMAGE.global.count);
        },
        /**
         * 체크박스 값에 따른 분류 - 결과 사용/미사용
         * 미사용일 때 -> null 반환으로 폴리곤 생성통과
         */
        checkBoxValue : function(value) {
    	let length = $("input[name='AI_check']:checked").length;
    	let checkedValues = null;
    	for (let i = 0; i < length; i++) {
    	    let data = $("input[name='AI_check']:checked")[i].dataset.baseId;
    	    if (value.class == data) {
    		checkedValues = value;
    		break;
    	    }
    	    
    	}
    	return checkedValues;
        },
        /**
         * 폴리곤 생성
         */
        addPolygon : function (id, coordinates, crs, style, resultInfoData) {
            M_AI_IMAGE.analysis.setEachCount(resultInfoData);
            dtmap.vector.addPolygon({
		    id: id,
		    coordinates: coordinates,
		    crs: 'EPSG:4326',
		    style : style
		});
            return 1;
        },
        /**
         * 표시할 데이터 개수 
         */
        setEachCount : function (infoData) {
            let length = M_AI_IMAGE.detectLegend.legend.length;  
            for (let i = 0; i < length; i++) {
        	let obj = M_AI_IMAGE.detectLegend.legend[i]['class_'+i];
        	if (obj.key == infoData.engNm) {
        	    obj.count++;
        	}
            }
        },
        /**
         * 체크박스 결과 개수 설정
         */
        setCheckboxResult: function () {
            let checkSize = $("input[name='AI_check']").length
            
            for (let i = 0; i < checkSize; i++) {
                let checkId = $("input[name='AI_check']")[i].id;
                var countClass = M_AI_IMAGE.detectLegend.legend[i][checkId].count;
                $("input[name='AI_check']")[i].nextElementSibling.innerHTML = M_AI_IMAGE.detectLegend.legend[i][checkId].name + "(" + countClass + ")"
            }
            
        },
        /**
         * 결과창에 정보 표출
         */
        resultView : function (infoData, viewCount) {
            var html = "";
            html += "<tr>\n";
//            html += "<td>" + infoData.count + "</td>\n";
            html += "<td>" + viewCount + "</td>\n";
            html += "<td>" + infoData.engNm + "</td>\n";
            html += "<td>" + infoData.korNm + "</td>\n";
            html += "<td>" + Math.ceil(infoData.conf * 100) + "%</td>\n";
            html += "<td>\n"
            html += "<button type=\"button\" id=" + infoData.vectorId + " onclick=\"selectAiResult(this); \"class=\"icon-btn location sm\">\n";
            html += "</button>\n";
            html += "</td>\n";
            html += "</tr>\n";

            $("#classifiedBody").append(html);
            M_AI_IMAGE.analysis.setCheckboxResult();
        },
        reset: function () {
            // 결과 카운터 초기화
            M_AI_IMAGE.global.count = 0;
            
            // 체크박스 카운트 초기화
            M_AI_IMAGE.detectLegend.resetCount();
            
            // 이미지 초기화
            $("#copyCanvas").remove();
            
            // 결과창 초기화
            $("#classifiedBody").empty();
        }
    },
    /**
     * 이미지파일 변환
     */
    UTIL: {
        dataURLtoFile: function (dataurl, fileName) {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], fileName, {type: mime});
        }
    }
    
}
$(function () {
    $(".scroll-y").mCustomScrollbar({
        scrollbarPosition: "outside"
    });
    //분석 popup 접기/펼치기
    $(".small-popup .popup-toggle").each(function () {
        $(this).click(function () {
            $(this).parent().toggleClass("fold");

            if ($(this).parent().hasClass("fold")) {
                $(this).attr("title", "펼치기");
            } else {
                $(this).attr("title", "접기");
            }
        });
    });
});