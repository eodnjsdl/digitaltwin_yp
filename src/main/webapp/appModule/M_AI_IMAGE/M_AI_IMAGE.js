/**
 * SUBJECT : ai영상분석 (3d)
 * AUTHOR : 이푸름
 * LAST UPDATE : 2022.1.24
 * COMMENT :
 */
$(document).ready(() => {
    cameraMove();
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
 * 객체 선택 이벤트
 * @param id
 * @returns
 */
function selectTarget(id) {
    dtmap.vector.clearSelect();
    dtmap.vector.select(id);
}

var M_AI_IMAGE = {
//    global: {
//        test: null,
//        isn: null,
//        itv: null,
//        isnt: 0,
//        checkedVal: "3",
//        ps: [
//            ["10", "20", "40", "70", "100"],
//            ["0", "15", "50", "68", "80", "95", "100"],
//            ["5", "25", "45", "95", "100"],
//            ["30", "60", "90", "100"],
//            ["5", "20", "30", "40", "50", "55", "70", "100"],
//            ["8", "15", "24", "38", "55", "78", "95", "100"],
//            ["9", "17", "25", "38", "47", "55", "62", "68", "72", "84", "96", "100"],
//            ["13", "19", "26", "35", "48", "59", "65", "79", "91", "100"],
//            ["5", "17", "29", "35", "46", "66", "82", "100"],
//            ["2", "9", "34", "44", "62", "78", "88", "100"]
//        ],
//    },
//    getAiSettingInfo: function () {
//        $("#aiSettingModal").modal({backdrop: 'static', keyboard: false});
//    },
//    setAiSettingVal: function () {
//        M_AI_IMAGE.global.checkedVal = $("input[name=AI_radio]:checked").val();
////		$("#aiSettingModal").modal('hide');	
//    },
//    closeAiAnalysis: function () {
//
//        M_AI_IMAGE.analysis.reset();
//
//        var moduleIdTxt = $("#moduleUITabContent div").attr('id');
//        var moduleId = moduleIdTxt.trim().split("-")[2];
//
//        IDE.MODULE.closeModule(moduleId);
//
////		$("#imageMclearnStart").hide();
//
//
//    },
//    setCheckbox: function () {//체크박스 리셋
//
//        //라벨텍스트초기화
//        var lbText = document.querySelectorAll('#AIVideoBox label')
//        lbText.forEach(function (item) {
//            item.innerText = ""
//        })
//
//        var checkSize = $("input[name='AI_check']").length
//        //카운트 올리기
//        for (var i = 0; i < checkSize; i++) {
//            var checkId = $("input[name='AI_check']")[i].id
//            var countClass = M_AI_IMAGE.detectLegend.legend[checkId].count
//            $("input[name='AI_check']")[i].nextElementSibling.innerHTML = M_AI_IMAGE.detectLegend.legend[checkId].name + "(" + countClass + ")"
//
//        }
//
//
//    },
    detectLegend: {
        legend: [
            {class_0: {
                name: "건물",
                key: "bldg",
                color: [255, 56, 56],
                classId: "0"
            }},
            {class_1: {
                name: "공원",
                key: "park",
                color: [250, 157, 151],
                classId: "1"
            }},
            {class_2: {
                name: "과수원",
                key: "orchrd",
                color: [255, 112, 31],
                classId: "2"
            }},
            {class_3: {
                name: "광천지",
                key: "mnlspt",
                color: [255, 178, 29],
                classId: "3"
            }},
            {class_4: {
                name: "구거",
                key: "ditch",
                color: [207, 210, 49],
                classId: "4"
            }},
            {class_5: {
                name: "답",
                key: "ricfld",
                color: [72, 249, 10],
                classId: "5"
            }},
            {class_6: {
                name: "대",
                key: "grnd",
                color: [146, 204, 23],
                classId: "6"
            }},
            {class_7: {
                name: "도로",
                key: "road",
                color: [61, 219, 134],
                classId: "7"
            }},
            {class_8: {
                name: "목장용지",
                key: "stkfrm",
                color: [26, 147, 52],
                classId: "8"
            }},
            {class_9: {
                name: "묘지",
                key: "grvy",
                color: [0, 212, 187],
                classId: "9"
            }},
            {class_10: {
                name: "비닐하우스",
                key: "phw",
                color: [44, 153, 168],
                classId: "10"
            }},
            {class_11: {
                name: "사적지",
                key: "histst",
                color: [0, 194, 255],
                classId: "11"
            }},
            {class_12: {
                name: "수도용지",
                key: "wtway",
                color: [52, 69, 147],
                classId: "12"
            }},
            {class_13: {
                name: "양어장",
                key: "fshfrm",
                color: [100, 115, 255],
                classId: "13"
            }},
            {class_14: {
                name: "염전",
                key: "sltpan",
                color: [0, 24, 236],
                classId: "14"
            }},
            {class_15: {
                name: "유원지",
                key: "amsprk",
                color: [132, 56, 255],
                classId: "15"
            }},
            {class_16: {
                name: "유지",
                key: "yugi",
                color: [82, 0, 133],
                classId: "16"
            }},
            {class_17: {
        	name: "임야",
        	key: "frtl",
        	color: [203, 56, 255],
        	classId: "17"
            }},
            {class_18: {
        	name: "잡종지",
        	key: "mslnd",
        	color: [255, 149, 200],
        	classId: "18"
            }},
            {class_19: {
        	name: "공장용지",
        	key: "fctry",
        	color: [255, 55, 199],
        	classId: "19"
            }},
            {class_20: {
        	name: "전",
        	key: "dfld",
        	color: [255, 56, 56],
        	classId: "20"
            }},
            {class_21: {
        	name: "제방",
        	key: "dike",
        	color: [255, 157, 151],
        	classId: "21"
            }},
            {class_22: {
        	name: "종교용지",
        	key: "relgn",
        	color: [255, 112, 31],
        	classId: "22"
            }},
            {class_23: {
        	name: "주유소",
        	key: "olt",
        	color: [255, 178, 29],
        	classId: "23"
            }},
            {class_24: {
        	name: "주차장",
        	key: "prkplce",
        	color: [207, 210, 49],
        	classId: "24"
            }},
            {class_25: {
        	name: "창고용지",
        	key: "wrhous",
        	color: [72, 249, 10],
        	classId: "25"
            }},
            {class_26: {
        	name: "하천",
        	key: "river",
        	color: [146, 204, 23],
        	classId: "26"
            }},
            {class_27: {
        	name: "철도용지",
        	key: "rlroad",
        	color: [61, 219, 134],
        	classId: "27"
            }},
            {class_28: {
        	name: "체육용지",
        	key: "phstrn",
        	color: [26, 147, 52],
        	classId: "28"
            }},
            {class_29: {
        	name: "학교용지",
        	key: "school",
        	color: [0, 212, 187],
        	classId: "29"
            }},
            {class_30: {
        	name: "빌딩",
        	key: "bld",
        	color: [44, 153, 168],
        	classId: "30"
            }},
            {class_31: {
        	name: "아파트",
        	key: "apt",
        	color: [0, 194, 255],
        	classId: "31"
            }},
            {class_32: {
        	name: "저장탱크",
        	key: "tank",
        	color: [52, 69, 147],
        	classId: "32"
            }}
        ],
//        legendCountUp: function (_classNumber) {
//
//            var legendInfo = this.legend["class_" + _classNumber];
//
//            if (typeof legendInfo == 'undefined') {
//                legendInfo = this.legend["class_others"];
//            }
//
//            legendInfo.count++;
//        },
//        getLegendColor: function (_classNumber) {
//
//            var legendInfo = this.legend["class_" + _classNumber];
//            if (typeof legendInfo == 'undefined') {
//                legendInfo = this.legend["class_others"];
//            }
//
//            return legendInfo.color;
//        },
//        getLegendName: function (_classNumber) {
//
//            var legendInfo = this.legend["class_" + _classNumber];
//            if (typeof legendInfo == 'undefined') {
//                legendInfo = this.legend["class_others"];
//            }
//
//            return legendInfo.name;
//        },
//        clearCount: function () {
//
//            var data = [];
//
//            for (var id in this.legend) {
//
//                if (this.legend.hasOwnProperty(id)) {
//                    this.legend[id].count = 0;
//                }
//            }
//
//            return data;
//        },
//        getLegendGraphData: function () {
//
//            var data = [];
//
//            for (var id in this.legend) {
//
//                if (this.legend.hasOwnProperty(id)) {
//
//                    if (this.legend[id].count > 0) {
//                        data.push({
//                            label: this.legend[id].name,
//                            value: this.legend[id].count,
//                            color: this.legend[id].hexColor
//                        });
//                    }
//                }
//            }
//
//            return data;
//        },
//        getLegendGraphHexColorList: function () {
//
//            var colors = [];
//
//            for (var id in this.legend) {
//
//                if (this.legend.hasOwnProperty(id)) {
//
//                    if (this.legend[id].count > 0) {
//                        colors.push(this.legend[id].hexColor);
//                    }
//                }
//            }
//
//            return colors;
//        }
    },

    init: function () {

	//분석 시작 이벤트
	$("#startAianalysBtn").on('click',function(e){
		chooseUrl = 0;
		M_AI_IMAGE.analysis.start();
	});
	
	$("#startAianalysAdvanc").on('click', function(e) {
		chooseUrl = 1;
		M_AI_IMAGE.analysis.start();
	});
	
	$("#resetMapDirection").on('click', function(e) {
	    cameraMove();
	});

        $("#resetAianalysBtn").on('click', function (e) {
            M_AI_IMAGE.analysis.reset();
        });
        //검색값 변경
//        $("input[name='AI_radio']").on('change', function (e) {
//            M_AI_IMAGE.setAiSettingVal();
//        });

        //			new PerfectScrollbar(document.getElementById('classifiedBody'),{
//				suppressScrollX:true
//			});
//	
        $("#aiImageReslt").mouseover(function () {
            Module.XDIsMouseOverDiv(true);
        })
            .mouseout(function () {
                Module.XDIsMouseOverDiv(false);
            });

        this.Cameara = Module.getViewCamera();

    },
    destroy: function () {

//		$("#imageMclearnStart").hide();

        M_AI_IMAGE.analysis.reset();
//		DRAW=null;

        M_AI_IMAGE.isn = null
        M_AI_IMAGE.itv = null
        M_AI_IMAGE.isnt = 0
        M_AI_IMAGE.checkedVal = "3"
    },
    analysis: {
        start: function () {
            //초기화
            M_AI_IMAGE.analysis.reset();
            //프로그레스
            ui.loadingBar("show");

            //초기화
//            M_AI_IMAGE.global.isn = null;
//            M_AI_IMAGE.global.itv = null;
//            M_AI_IMAGE.global.isnt = 0;

            //이미지스캐닝
//            M_AI_IMAGE.analysis.imageScanning();
            M_AI_IMAGE.analysis.detectAI();

        },
//        imageScanning: function () {
//
//            setTimeout(function () {
//
//                if (M_AI_IMAGE.global.checkedVal == null || M_AI_IMAGE.global.checkedVal == 'undefined') {
//                    M_AI_IMAGE.global.checkedVal = 3;
//                }
//                //분류 value
//                M_AI_IMAGE.analysis.detectAI(parseInt(M_AI_IMAGE.global.checkedVal));
//
//            }, 2000);
//        },
        /**
         * ai 분석 통신 및 데이터 처리연결
         */
        detectAI: function () {
//            detectAI: function (an) {

//            var detect_type = "";
//
//            switch (an) {
//                case 1:
//                    detect_type = "gun";
//                    break;
//
//                case 2:
//                    detect_type = "coco";
//                    break;
//
//                case 3:
//                    detect_type = "bld";
//                    break;
//
//                case 4:
//                    detect_type = "boat";
//                    break;
//            }

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
			    console.log("result");
			    console.log(result.response);
			    var detections;
			    var screenCoord = [];
			    var identifier = [];
			    var idCount = 0;
			    for (var j = 0; j < result.response.length; j++) {
				detections = result.response[j].detections.split(', ');
				identifier.push({class : result.response[j].class, classId : result.response[j].classid, confidence : result.response[j].confidence});
				screenCoord.push(detections);
			    }
			    for (var i = 0; i < screenCoord.length; i++) {
				var analCoord = [];
				for (var j = 0; j < screenCoord[i].length; j++){
				    var coord = screenCoord[i][j].split(' ');
				    analCoord.push(coord);
				}
				M_AI_IMAGE.analysis.getScreenMapCoord(analCoord, identifier[i], idCount++, alt);
			    }
			}
		ui.loadingBar("hide");
                }
            });

        },
        /**
         * 좌표 계산 후, vector 생성
         */
        getScreenMapCoord: function (coord, identifier, idCount, alt) {
            var coordinates = [[]];
//            console.log(identifier);
            var data = M_AI_IMAGE.detectLegend.legend;
            var dataOption = null;
//            console.log(data);
            for (var i = 0; i < data.length; i++) {
        	let index = 'class_' + i;
        	if (identifier.classId == data[i][index].classId) {
        	    dataOption = data[i][index];
        	    idCount++;
//        	    console.log(dataOption);
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
//            console.log(color);
//            console.log(coord);
            for (var i = 0; i < coord.length; i++) {
        	coord[i] = [parseFloat(coord[i][0]), parseFloat(coord[i][1]), parseFloat(alt)];
		    var pos = ol.proj.transform(coord[i], 'EPSG:3857', 'EPSG:4326');
		    coordinates[0].push(pos);
		}
//            console.log(coordinates);
            options = {
        	    fill : {
        		      color : color,
        		      opacity : 0.5
        		    },
    		    stroke:{
    			      color: color,
    			      opacity: 0.5,
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
		    offsetHeight : 30
            };
            	let vectorId = classNm + '_' + classId + '_' + idCount;
		dtmap.vector.addPolygon({
		    id: vectorId,
		    coordinates: coordinates,
		    crs: 'EPSG:4326',
		    style : options
		});
//		console.log(vectorId);
		let resultInfoData = {count : idCount, engNm : dataOption.key, korNm : dataOption.name, conf : identifier.confidence, vectorId : vectorId};  
		M_AI_IMAGE.analysis.resultView(resultInfoData);
        },
        /**
         * 결과창에 정보 표출
         */
        resultView : function (infoData) {
            // dataOption : classid, color, count, hexColor, key(분석 결과 영어이름 - 사용), name(분석 결과 한글이름 - 사용) 
            // identifier : class, classId, confidence(분석 결과 정확도 - 사용할 내용)
            // vectorId : feature로 만들어진 feature id -> dtmap.vector.select('id'); 로 선택가능 - 위치 이동에 넣을 내용
//            console.log(dataOption, identifier, vectorId);
            
            var html = "";
            html += "<tr>\n";
            html += "<td>" + infoData.count + "</td>\n";
            html += "<td>" + infoData.engNm + "</td>\n";
            html += "<td>" + infoData.korNm + "</td>\n";
            html += "<td>" + Math.ceil(infoData.conf * 100) + "%</td>\n";
            html += "<td>\n"
            html += "<button type=\"button\" onclick=\"selectTarget('" + infoData.vectorId + "\'); \"class=\"icon-btn location sm\" \">\n";
            html += "</button>\n";
            html += "</td>\n";
            html += "</tr>\n";

            $("#classifiedBody").append(html);
            
        },
        reset: function () {

            $("#copyCanvas").remove();
            $("#gridCanvas").remove();
            $("#classifiedBody").empty();

            //카운터 초기화
//            M_AI_IMAGE.detectLegend.clearCount()

//            var layerList = new Module.JSLayerList(true);
//            var layer = layerList.nameAtLayer("ML_RESULT_RECT");

//            if (layer != null) {
//                layer.removeAll();
//            }

        }
    },
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
    },
    
}



//        markupMachineDetectResult: async function (_imageWidth, _imageHeight, _result, _complateCallback) {
//
//            var result = _result.response;
//            var splitCellCount = 10;
//
//            // 결과 반환할 레이어
//            var layerList = new Module.JSLayerList(true);
//            var layer = layerList.nameAtLayer("ML_RESULT_RECT");
//
//            if (layer == null) {
//                layer = layerList.createLayer("ML_RESULT_RECT", Module.ELT_SKY_LINE);
//                layer.setMaxDistance(map3d.config.maxDistance);
//                layer.setSelectable(false);
//            } else {
//                layer.removeAll();
//            }
//
//            var donutGraph = null;
//            M_AI_IMAGE.detectLegend.clearCount();
//
//            CINIT.createCanvas("imgcanvas");
//            // 그리드 canvas 세팅
//            var result = DRAW.OVERVIEW.createCanvas("gridCanvas");
//            if (result == -1) {
//                console.log("create overview cnavas error");
//            }
//
//            // result 2이면 새로 생성되기 떄문에 setGrid 해준다
//            if (result > 1) {
//                DRAW.OVERVIEW.setGrid();
//            }
//
//            DRAW.CANVAS.ETC.initGrid();
//
//            var gridCanvas = document.getElementById('gridCanvas');
//            gridCanvas.style.position = "absolute";
//            gridCanvas.style.top = "0";
//            gridCanvas.style.left = "0";
//            gridCanvas.style.zIndex = "100";
//
//            DRAW.CANVAS.INIT.clearCanvas();
//            DRAW.CANVAS.INIT.setCanvasSize(Module.canvas.width, Module.canvas.height);
//            DRAW.CANVAS.ETC.setColor("rgba(255,255,255,0.7)", 1);
//            DRAW.CANVAS.LINE.setStyle(1, "butt", "round");
//
//            DRAW.CANVAS.ETC.setVisible("gridCanvas", true);
//
//            // 그리드 단위로 결과 데이터 정렬
//            var result = _result.response;
//            result = this.sortDetectResult(splitCellCount, splitCellCount, result);
//
//            var processIndex = 1;
////			$("#classifiedBody").empty();
//            $("#aiImageReslt").show("slide", {direction: "down"}, 200);
//
//
//            for (var i = 0; i < splitCellCount; i++) {
//
//                for (var j = 0; j < splitCellCount; j++) {
//
//                    var cellResult = result[i][j].result;
//
//                    DRAW.CANVAS.INIT.clearRect(0, 0, DRAW.CANVAS.CANVAS_MAIN.width, DRAW.CANVAS.CANVAS_MAIN.height);
//
//                    DRAW.CANVAS.ETC.drawGrid(splitCellCount, splitCellCount, 1);
//                    DRAW.CANVAS.ETC.setColor("rgba(255,255,255,0.7)", 0);
//                    DRAW.CANVAS.ETC.drawGridRect(j, splitCellCount - i);
//
//                    for (var k = 0; k < cellResult.length; k++) {
//
//                        var result_detections = cellResult[k].detections.split(" ");
//
//                        var line = this.createRectLine(
//                            "result_" + i + "_" + j + "_" + k,
//                            _imageWidth, _imageHeight,
//                            cellResult[k],
//                            M_AI_IMAGE.detectLegend.getLegendColor(result_detections[0])
//                        );
//
//
//                        //체크박스 해제된것 찾기
//                        var uncheckedDiv = document.querySelectorAll('input[name="AI_check"]:not(input[name="AI_check"]:checked)')
//                        var classId = M_AI_IMAGE.detectLegend.legend["class_" + result_detections[0]].id;
//                        //체크박스 선택되있고 아이디같을경우 tr늘려주기
//                        if (uncheckedDiv.length == 0) {
//                            this.insertDetectPositionMoveButton(
//                                processIndex,
//                                _imageWidth, _imageHeight,
//                                result_detections[1], result_detections[2],
//                                cellResult[k].class,
//                                result_detections[0],
//                                cellResult[k].confidence
//                            );
//                            //카운팅
//                            M_AI_IMAGE.detectLegend.legendCountUp(result_detections[0]);
//
//                            // 레이어에 객체 추가
//                            layer.addObject(line, 0);
//
//                            processIndex++;
//                        } else {
//
//                            for (var z = 0; z < uncheckedDiv.length; z++) {
//                                if (uncheckedDiv[z].id != classId && $("#" + classId).is(':checked')) {
//                                    this.insertDetectPositionMoveButton(
//                                        processIndex,
//                                        _imageWidth, _imageHeight,
//                                        result_detections[1], result_detections[2],
//                                        cellResult[k].class,
//                                        result_detections[0],
//                                        cellResult[k].confidence
//                                    );
//                                    //카운팅
//                                    M_AI_IMAGE.detectLegend.legendCountUp(result_detections[0]);
//
//                                    // 레이어에 객체 추가
//                                    layer.addObject(line, 0);
//
//                                    processIndex++;
//                                }
//                            }
//                        }
//                        await sleep(70.0 * Math.random());
//                    }
//                }
//
//
//            }
//
//            if (_complateCallback) {
//                _complateCallback(_result);
//            }
//
//            setTimeout(function () {
//
//                DRAW.CANVAS.ETC.setVisible("gridCanvas", false);
//
//                ui.loadingBar("hide");
//                M_AI_IMAGE.setCheckbox();
//                Module.XDRenderData();
//                Module.XDIsMouseOverDiv(false);
//
//            }, 2000);
//
//
//        },
//        sortDetectResult: function (_cellWidthNum, _cellHeightNum, _result) {
//            var resultCell = {};
//            for (var i = 0; i < _cellHeightNum; i++) {
//
//                resultCell[i] = {};
//
//                for (var j = 0; j < _cellWidthNum; j++) {
//
//                    resultCell[i][j] = {
//                        result: []
//                    };
//                }
//            }
//
//            for (var i = 0; i < _result.length; i++) {
//
//                var detections = _result[i].detections.split(" ");
//
//                var cellIndex_x = parseInt(parseFloat(detections[1]) * 10.0);
//                var cellIndex_y = parseInt(parseFloat(detections[2]) * 10.0);
//
//                resultCell[cellIndex_y][cellIndex_x].result.push(_result[i]);
//            }
//
//            return resultCell;
//        },
//        createRectLine: function (_key, _imageWidth, _imageHeight, _data, _color) {
//            var line = Module.createLineString(_key);
//
//            // 좌표 리스트 생성
//            var result_detections = _data.detections.split(" ");
//
//            var coordinates = this.getDetectionRectCoordinates(
//                _imageWidth, _imageHeight,
//                result_detections[1], result_detections[2],
//                result_detections[3], result_detections[4]
//            );
//
//            var parts = new Module.Collection();
//            parts.add(5);
//            line.setPartCoordinates(coordinates, parts);
//
//            var color = new Module.JSColor(255, _color[0], _color[1], _color[2]);
//
//            var lineStyle = new Module.JSPolyLineStyle();
//            lineStyle.setWidth(1.1);
//            lineStyle.setColor(color);
//            line.setStyle(lineStyle);
//
//            return line;
//        },
//        getDetectionRectCoordinates: function (_imageWidth, _imageHeight, _centerX, _centerY, _width, _height) {
//            var coordinates = new Module.JSVec3Array();
//
//            var center_x = parseFloat(_centerX) * _imageWidth;
//            var center_y = parseFloat(_centerY) * _imageHeight;
//
//            var halfWidth = (parseFloat(_width) * _imageWidth) / 2;
//            var halfHeight = (parseFloat(_height) * _imageHeight) / 2;
//
//            var screenPos_min_x = center_x - halfWidth;
//            var screenPos_min_y = center_y - halfHeight;
//
//            var screenPos_max_x = center_x + halfWidth;
//            var screenPos_max_y = center_y + halfHeight;
//
//            coordinates.push(this.screenToLonLatAlt(screenPos_min_x, screenPos_min_y, 2.0));	// left-top
//            coordinates.push(this.screenToLonLatAlt(screenPos_max_x, screenPos_min_y, 2.0));	// right-top
//            coordinates.push(this.screenToLonLatAlt(screenPos_max_x, screenPos_max_y, 2.0));	// right-bottom
//            coordinates.push(this.screenToLonLatAlt(screenPos_min_x, screenPos_max_y, 2.0));	// left-bottom
//            coordinates.push(this.screenToLonLatAlt(screenPos_min_x, screenPos_min_y, 2.0));	// left-top
//
//            return coordinates;
//        },
//        insertDetectPositionMoveButton: function (_index, _imageWidth, _imageHeight, _centerScreen_x, _centerScreen_y, _classType, _classNumber, _confidenct) {
////			debugger
//            var center = this.screenToLonLatAlt(parseFloat(_centerScreen_x) * _imageWidth, parseFloat(_centerScreen_y) * _imageHeight, 0.0);
//
//            var className = M_AI_IMAGE.detectLegend.getLegendName(_classNumber);
//            var classId = M_AI_IMAGE.detectLegend.legend["class_" + _classNumber].id;
//            var perciseNum = (_confidenct * 100).toFixed(0);
//
//            var html = "";
//            html += "<tr data-id=" + classId + ">\n";
//            html += "	<td>" + _index + "</td>\n";
//            html += "	<td>" + _classType + "</td>\n";
//            html += "	<td>" + className + "</td>\n";
//            html += "	<td>" + perciseNum + "%</td>\n";
//            html += "	<td>\n"
//            html += "		<button type=\"button\" class=\"icon-btn location sm\" onclick=\"M_AI_IMAGE.analysis.moveDetectPosition(" + center.Longitude + "," + center.Latitude + "," + center.Altitude + ");\">\n";
//            html += "		</button>\n";
//            html += "	</td>\n";
//            html += "</tr>\n";
//
//            $("#classifiedBody").append(html);
//        },
//        screenToLonLatAlt: function (_screenX, _screenY, _altitudeGap) {
//
//            if (_altitudeGap < 0.001) {
//                return Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(_screenX, _screenY));
//            }
//
//            var pos = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(_screenX, _screenY));
//            pos.Altitude += _altitudeGap;
//
//            return pos;
//        },
//        moveDetectPosition: function (_lon, _lat, _alt, _color) {
//            var position = new Module.JSVector3D(_lon, _lat, _alt + 150.0);
//
//            // 카메라 위치 이동
//            var camera = new Module.getViewCamera();
//            //camera.setTilt(90.0);
//            //camera.setLocation(position);
//            camera.moveLookAt(position, Module.getViewCamera().getTilt(), M_AI_IMAGE.Camera.getDirect(), _alt * 25);
//
//            // 위치 표시
//            var layerList = new Module.JSLayerList(true);
//            var layer = layerList.nameAtLayer("ML_RESULT_SELECT_POSITION");
//            if (layer == null) {
//                layer = layerList.createLayer("ML_RESULT_SELECT_POSITION", Module.ELT_3DPOINT);
//                layer.setMaxDistance(map3d.config.maxDistance);
//                layer.setSelectable(false);
//            } else {
//                layer.removeAll();
//            }
//
//            var point = new Module.createPoint("point_" + layer.getObjectCount());
//            position.Altitude = _alt;
//            point.setPosition(position);
////			point.setText("O");
//
//            layer.addObject(point, 0);
//        },
//    }
    
//}
//function sleep(ms) {
//    return new Promise(resolve => setTimeout(resolve, ms));
//}

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