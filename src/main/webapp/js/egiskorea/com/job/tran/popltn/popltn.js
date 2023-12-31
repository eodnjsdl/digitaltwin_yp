$(document).ready(function(){
	if (dtmap.mod == '3D') {
		console.log("3d 맵입니다.");
		$('#showType').hide();
	} else {
		$('#showType').show();
	}
	
	$('#leftPopup').css({"left": "320px", "width": "400px", "height": "807px"});
	//검색 조건 세팅
	getCmmCodeData("YPE001", "#pplSearchForm select#liCd");	//읍면동
	
	initPplLegal();
	
	$("#pplShowType").on('change', function() {
		var showType = this.value;
		if(showType == "legal"){
			if ($(".pplInfoLegalType").css("display") == "none") {
				popltnLayerClear();
				aj_selectPopulationInfoList();
			}
			$("#pplInfoGridType").hide();
		} else if (showType == "grid") {
			if($("#pplInfoGridType").css("display") == "none") {
				$("#pplInfoGridType").show();
				resetSelect();
				popltnLayerClear();
				$('#pplBaseYYMM').empty();
				getGridPplBaseYYMMList();
			}
			$(".pplInfoLegalType").hide();
		}
	});
	
	// 조회 버튼
	$('#pplInfoSearch').on('click', function () {
		if (dtmap.mod == '3D') {
			if ($('#pplShowType').val() == 'grid') {
				ui.loadingBar('hide');
				toastr.warning("3D 지도에서는 지원하지 않습니다.");
				return;
			}
		}
		
		let area = $('select[name="liCd"]').val();
		let viewType = $("#pplShowType").val();
		// case : 대상 지역 '전체'
		if (area == 'all') {
			// 읍면동
			if (viewType == 'legal') {
				getAllPopulationInfo();
			}
		}
		if ($('#pplBaseYYMM').val()) {
			selectPplInfoList();
		}
	});
	
	// 대상지역이 변경될 때마다 호출
	$('#liCd').on('change', function () {
		$('#pplBaseYYMM').empty();
		if($("#pplInfoGridType").css("display") == "none") {
			getPplBaseYYMMList();
		} else {
			getGridPplBaseYYMMList();
		}
	});
	
	// 초기화 버튼
	$('#populationReset').on('click', function () {
		aj_selectPopulationInfoList();
	});
	
	// 닫기 버튼
	$('#popltnCloseBtn').on('click', function () {
		popltnLayerClear();
	});
	
	function resetSelect() {
		let selectVal = $('#liCd option:selected').val();
		if (selectVal != 'all') {
			$('#liCd option:eq(0)').prop('selected', true);
		}
	}
});

//functions

/**
 * layer 초기화
 * @returns
 */
function popltnLayerClear() {
	dtmap.layer.removeLayer('li_popltn_info');
	dtmap.layer.removeLayer('li_popltn_info_grid');
	if (dtmap.layer.userLayers) {
		dtmap.layer.userLayers.delLayerAtName('li_popltn_info_graph');
	}
}

/**
 * 법정동경계 초기화 
 * @returns
 */
function initPplLegal() {
	popltnLayerClear();
	getPplBaseYYMMList();
	getAllPopulationInfo();
}

/**
 * 양평군 전체 인구 정보 조회
 * @returns
 */
function getAllPopulationInfo() {
	ui.loadingBar('show');
	let viewType = 'legal';
	let stdrYm = $('#pplBaseYYMM').val();
	let liCode = $('#liCd').val().slice(0, 8);
	let filter = "length(li_cd) = '8'";
	if (dtmap.mod === '3D') {
		filter = "li_cd like '41830%'";
	}
	let gender = $('#pplGender').val();
	let options = {
			cql : filter,
			gender : gender,
			all : true,
			viewType : viewType
	};
	$.ajax({
		data : {"stdrYm" : stdrYm},
		url : "/job/tran/popltn/selectAllPopulationInfoList.do",
		type : 'post',
		dataType: 'json',
		async : true,
		success: function(data) {
			let result = data.resultList;
			let geom = data.geomCenter;
			legalData(result);
			getJenks(result, options, viewType);
			if (dtmap.mod == '3D') {
				let layer = setBarGraphLayer();
				makeGraph(result, layer);
				popltnAddPolygon(options);
			}
			setViewPoint(geom, options);
		}, error: function() {
			toastr.error("정보를 불러오지 못하였습니다.");
		}
	});
}

/**
 * 기준 연월 기본 세팅 로드 및 세팅 함수 연결
 */
function getPplBaseYYMMList() {
	// data
	let data = $("#pplSearchForm").serialize();
	
	$.ajax({
		data: data,
		url : "/job/tran/popltn/selectStandardYmList.do",
		type : 'post',
		dataType: 'json',
		success: function(data) {
			result = data.resultList;
			setPplBaseYYMMList(result);
		}, error: function() {
			toastr.error("정보를 불러오지 못하였습니다.");
		}
	});
}
/**
 * grid(격자)화면 - 기준 연월 세팅
 * @returns
 */
function getGridPplBaseYYMMList() {
	// data
	let data = $("#pplSearchForm").serialize();
	
	$.ajax({
		data: data,
		url : "/job/tran/popltn/selectGridStandardYmList.do",
		type : 'post',
		dataType: 'json',
		success: function(data) {
			result = data.resultList;
			setPplBaseYYMMList(result);
		}, error: function() {
			toastr.error("정보를 불러오지 못하였습니다.");
		}
	});
}

/**
 * 기준 연월 기본 세팅
 * @param result
 * @returns
 */
function setPplBaseYYMMList(result) {
	for (let i = 0; i < result.length; i++) {
		let data = result[i];
		let dataFormat = data.substring(0, 4) + data.substring(6, 8);
		let addHtml = '<option value="' + dataFormat + '">' + data + '</option>';
		$('#pplBaseYYMM').append(addHtml);
	}
}

/**
 * 인구 정보 조회 및 차트 데이터 전달
 */
function selectPplInfoList() {
	popltnLayerClear();
	// ajax 전달 데이터
	let data = $("#pplSearchForm").serialize();
	let pplShowType = $("#pplShowType").val();
	// 법정동 경계 데이터 ajax. pplShowType = legal
	
	// 3D 맵 레이어 미지원
//	if (dtmap.mod == '3D') {
//		ui.loadingBar('hide');
//		toastr.error("3D 지도는 지원하지 않습니다.");
//		return;
//	}
	if (pplShowType == 'legal') {
		ui.loadingBar('show');
		// formdata에 리 옵션 값 'all' 일 때, 전체 조회
		if (data.includes('liCd=all')) {
		} else {
			let viewType = 'legal';
			// 레이어 호출 - cql 옵션 세팅
			let liCode = $('#liCd').val().slice(0, 8);
			let filter = "li_cd like " + "'" + liCode + "%'";
			let gender = $('#pplGender').val();
			let options = {
					cql : filter,
					gender : gender,
					all : false,
					viewType : viewType
			};
			$.ajax({
				data: data,
				url : "/job/tran/popltn/selectMyeonPopulationInfoList.do",
				type : 'post',
				dataType: 'json',
				success: function(data) {
					let result = data.resultList;
					let geom = data.geomCenter;
					// 데이터 세팅
					legalData(result);
					// 레이어 호출
					getJenks(result, options, viewType);
					if (dtmap.mod == '3D') {
						let layer = setBarGraphLayer();
						makeGraph(result, layer, geom);
						popltnAddPolygon(options);
					}
					setViewPoint(geom, options);
				}, error: function() {
					toastr.error("정보를 불러오지 못하였습니다.");
				}
			});
		}
		// 격자 데이터 ajax. pplShowType = grid
	} else {
		ui.loadingBar('show');
		if (data.includes('liCd=all')) {
			// 전체조회
			let viewType = 'grid';
			let gender = $('#pplGender').val();
			let options = {
					all : true,
					gender : gender,
					viewType : viewType
			};
			$.ajax({
				data: data,
				url : "/job/tran/popltn/selectGridMyeonPopulationInfoList.do",
				type : 'post',
				dataType: 'json',
				success: function(data) {
					let result = data.resultList;
					let geom = data.geomCenter;
					// 레이어 호출
					getLayer(options, viewType);
					gridData(result, options.all);
					// 레이어 호출 및 범위 표시 변경 ; - 속도 느림 주석처리
//					getJenks(result, options, viewType);
					// 카메라 이동
					setViewPoint(geom, options);
				}, error: function() {
					toastr.error("정보를 불러오지 못하였습니다.");
				}
			});
		} else {
			let viewType = 'grid';
			let liCode = $('#liCd').val().slice(0, 8);
			let filter = "li_cd like " + "'" + liCode + "%'";
			let gender = $('#pplGender').val();
			let options = {
					cql : filter,
					gender : gender,
					all : false,
					viewType : viewType
			};
			$.ajax({
				data: data,
				url : "/job/tran/popltn/selectGridMyeonPopulationInfoList.do",
				type : 'post',
				dataType: 'json',
				success: function(data) {
					let result = data.resultList;
					let geom = data.geomCenter;
					// 레이어 호출
					getJenks(result, options, viewType);
					setViewPoint(geom, options);
				}, error: function() {
					toastr.error("정보를 불러오지 못하였습니다.");
				}
			});
		}
	}
}

/**
 * 법정동 경계 데이터 설정 
 * @param result
 * @returns
 */
function legalData(result, viewType) {
	let totalCount = 0;
	let legalListHml = "";
	let dataType = $("#pplGender").val();
	
	for(let i = 0; i < result.length; i++) {
		if (dataType == 'all') {
			totalCount += result[i].allPopltnCnt;
		} else if (dataType == 'm') {
			totalCount += result[i].malePopltnCnt;
		} else if (dataType == 'w') {
			totalCount += result[i].femalePopltnCnt;
		} else if (dataType == 'old') {
			totalCount += result[i].odsnPopltnCnt;
		}
	}
	for(let i = 0; i < result.length; i++) {
		legalListHml += "<tr>";
		legalListHml += "<td>" + result[i].codeNm + "</td>";
		let rate = '';
		// 총인구, 남자, 여자 분류
		if (dataType == 'all') {
			legalListHml += "<td>" + numberFormatter(result[i].allPopltnCnt) + " 명</td>";
			rate = Math.round(result[i].allPopltnCnt / totalCount * 100);
		} else if (dataType == 'm') {
			legalListHml += "<td>" + numberFormatter(result[i].malePopltnCnt) + " 명</td>";
			rate = Math.round(result[i].malePopltnCnt / totalCount * 100);
		} else if (dataType == 'w') {
			legalListHml += "<td>" + numberFormatter(result[i].femalePopltnCnt) + " 명</td>";
			rate = Math.round(result[i].femalePopltnCnt / totalCount * 100);
		} else if (dataType == 'old') {
			legalListHml += "<td>" + numberFormatter(result[i].odsnPopltnCnt) + " 명</td>";
			rate = Math.round(result[i].odsnPopltnCnt / totalCount * 100);
		}
		legalListHml += "<td>" + rate + "%</td>";
		legalListHml += "</tr>";
		$("#pplInfoLegalList").html(legalListHml);
	}
	$('.pplInfoLegalType #resultCnt').html("조회결과 : <strong>" + numberFormatter(totalCount) + "</strong> 명")
	//차트 그리기
	populationRenderChart(result);
	
	function numberFormatter(cnt) {
		let count = new Intl.NumberFormat().format(cnt);
		return count;
	}
}

/**
 * grid (격자) 데이터
 * @returns
 */
function gridData(result, all) {
	if (all) {
		$('#lv01_2, #lv02_1').val('0.00');
		$('#lv02_2, #lv03_1').val('23.00');
		$('#lv03_2, #lv04_1').val('77.00');
		$('#lv04_2, #lv05_1').val('287.00');
		$('#lv05_2').val('1479.00');
	} else if (!all) {
		for (let i = 1; i < 6; i++) {
			for (let j = 1; j < 3; j++) {
				let rangeDc = 'lv0' + i + '_' + j;
				$('#pplInfoGridType #'+rangeDc).val(parseFloat(result[j - 1][i - 1]).toFixed(2));
			}
		}
	}
}

/**
 * wms 레이어 호출
 * @param options
 * @returns
 */
function getLayer(options, viewType) {
	// layer 초기화
	popltnLayerClear();
	let cql;
	let sld;
	if (options != undefined) {
		cql = options.cql;
		sld = options.sld;
	}
	let layerNm = 'digitaltwin:tgd_li_popltn_info';
	let id = 'li_popltn_info';
	if (viewType == 'legal' || viewType == '') {
		layerNm = 'digitaltwin:tgd_li_popltn_info';
	} else if (viewType == 'grid'){
		layerNm = 'digitaltwin:tgd_grid_popltn_info';
		id = 'li_popltn_info_grid';
	}
	let type = 'WMS'
	let title = '인구정보'
	let visible = true;
	if (viewType == 'legal') {
		dtmap.showLayer({
			id: id,
			type: type,
			layerNm: layerNm,
			title: title,
			visible: visible,
			cql : cql,
			sldBody : sld
		});
	} else if (viewType == 'grid') {
		dtmap.showLayer({
			id: id,
			type: type,
			layerNm: layerNm,
			title: title,
			visible: visible,
			cql : cql,
			sldBody : sld
		});
	}
	ui.loadingBar('hide');
}

/**
 * natural breaks 값 구하는 함수
 * @param data
 * @returns
 */
function getJenks(data, options, viewType) {
	let propertyNm = 'all_popltn_cnt';
	if (options.gender == 'w') {
		propertyNm = 'female_popltn_cnt';
	} else if (options.gender == 'm') {
		propertyNm = 'male_popltn_cnt';
	} else if (options.gender == 'old') {
		propertyNm = 'odsn_popltn_cnt';
	}
	let popltn = [];
	for (let i = 0; i < data.length; i++) {
		if (options.gender == 'w') {
			popltn.push(data[i].femalePopltnCnt);
		} else if (options.gender == 'm') {
			popltn.push(data[i].malePopltnCnt);
		} else if (options.gender == 'old') {
			popltn.push(data[i].odsnPopltnCnt);
		} else {
			popltn.push(data[i].allPopltnCnt);
		}
	}
	let geo = new geostats(popltn);
	// '리'가 4개 이하일 때 5단계 구분 불가능
	if (popltn.length < 5) {
		let jenks = geo.getClassJenks2(popltn.length - 1);
	} else {
		let jenks = geo.getClassJenks2(5);
	}
	
	let low = [];
	let high = [];
	for (let i = 0; i < geo.ranges.length; i++) {
		low.push(geo.ranges[i].split(' - ')[0]);
		high.push(geo.ranges[i].split(' - ')[1]);
	}
	let color;
	let layerNm;
	let name;
	
	// grid에서 인구 수 0명과 구분을 위해0~XX명 인 지역 최소값 변경 처리
	if (low[1] == '0') {
		low[1] = '1';
		geo.ranges[1] = geo.ranges[1].replace(/0/, '1');
	}
	
	if (viewType == 'legal') {
		layerNm = 'tgd_li_popltn_info';
		name = 'li_popltn_info';
		color = ['#f7fbff', '#c8dcf0', '#73b2d8', '#2979b9', '#08306b'];
	} else if (viewType == 'grid'){
		layerNm = 'tgd_grid_popltn_info';
		name = 'li_popltn_info_grid';
		color = ['#ffffff', '#ffbfbf', '#ff8080', '#ff4040', '#ff0000'];
		
		// 그리드 범위 데이터 표시 필요
		let gridRange = [low, high];
		gridData(gridRange, options.all);
	}
	
	let style = {
			layerNm : layerNm,
			length : geo.ranges.length,
			name : name,
			range : {
				jenks : geo.ranges,
				low : low,
				high : high
			},
			value : propertyNm,
			color : color
	};
	let xmlString = setLegalStyle(style, viewType);
	options.sld = xmlString;
	if (dtmap.mod == '2D'){
		getLayer(options, viewType);
	}
}




/**
 * 카메라 이동
 * @param geom
 * @returns
 */
function setViewPoint(geom, option) {
	let geometry = geom.replace(/[POINT()]/gi, '').split(' ');
	geometry = [parseFloat(geometry[0]), parseFloat(geometry[1])];
	if(dtmap.mod == '2D'){
		//중심점 이동 및 zoom 설정
		let options = {
				zoom : 9	
		}
		if (!option.all) {
			options.zoom = 13;
			
			if (option.viewType == 'grid') {
				options.zoom = 13;
				// grid, 면 단위조회 카메라
				dtmap.setCenter(
						[geometry[0]-3000, geometry[1]]
						, options
				);
			} else {
				// 면 단위조회 카메라 (법정동, 격자)
				dtmap.setCenter(
						[geometry[0]-7000, geometry[1]]
						, options
				);
			}
		} else {
			// 전체 조회 카메라
			dtmap.setCenter(
					[geometry[0]-9000, geometry[1]+2000]
					, options
			);
		}
	}
}

/**
 * natural breaks 분류값 스타일 재설정 xml
 * '면'단위 layer 호출 시
 * @param style
 * @returns
 */
function setLegalStyle(style, viewType) {
	let range = style.range;
	let color = style.color;
	let xml = ``;
	xml += `<?xml version="1.0" encoding="UTF-8"?>`;
	xml += `<StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" `;
	xml += `xmlns:se="http://www.opengis.net/se" `;
	xml += `xmlns:ogc="http://www.opengis.net/ogc" `;
	xml += `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" `;
	xml += `xmlns:xlink="http://www.w3.org/1999/xlink" `;
	xml += `xsi:schemaLocation="http://www.opengis.net/sld `;
	xml += `http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd" version="1.1.0">`;
	xml += `<sld:NamedLayer>`;
	xml += `<se:Name>${style.layerNm}</se:Name>`;
	xml += `<sld:UserStyle>`;
	xml += `<se:Name>${style.name}</se:Name>`;
	xml += `<se:FeatureTypeStyle>`;
	
	for (let i = 0; i < style.length; i ++) {
		xml += `<se:Rule>`;
		xml += `<se:Name>${range['jenks'][i]}</se:Name>`;
		xml += `<se:Description>`;
		xml += `<se:Title>${range['jenks'][i]}</se:Title>`;
		xml += `</se:Description>`;
		xml += `<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">`;
		xml += `<ogc:And>`;
		xml += `<ogc:PropertyIsGreaterThanOrEqualTo>`;
		xml += `<ogc:PropertyName>${style.value}</ogc:PropertyName>`;
		xml += `<ogc:Literal>${range['low'][i]}</ogc:Literal>`;
		xml += `</ogc:PropertyIsGreaterThanOrEqualTo>`;
		xml += `<ogc:PropertyIsLessThanOrEqualTo>`;
		xml += `<ogc:PropertyName>${style.value}</ogc:PropertyName>`;
		xml += `<ogc:Literal>${range['high'][i]}</ogc:Literal>`;
		xml += `</ogc:PropertyIsLessThanOrEqualTo>`;
		xml += `</ogc:And>`;
		xml += `</ogc:Filter>`;
		xml += `<se:PolygonSymbolizer>`;
		xml += `<se:Fill>`;
		xml += `<se:SvgParameter name="fill">${color[i]}</se:SvgParameter>`;
		xml += `<se:SvgParameter name="fill-opacity">0.7</se:SvgParameter>`;
		xml += `</se:Fill>`;
		if (viewType == 'legal') {
			xml += `<se:Stroke>`;
			xml += `<se:SvgParameter name="stroke">#232323</se:SvgParameter>`;
			xml += `<se:SvgParameter name="stroke-width">0.5</se:SvgParameter>`;
			xml += `<se:SvgParameter name="stroke-opacity">0.7</se:SvgParameter>`;
			xml += `<se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>`;
			xml += `</se:Stroke>`;
		}
		xml += `</se:PolygonSymbolizer>`;
		xml += `</se:Rule>`;
	};
	
	xml += `</se:FeatureTypeStyle>`;
	xml += `</sld:UserStyle>`;
	xml += `</sld:NamedLayer>`;
	xml += `</StyledLayerDescriptor>`;
	
	return xml;
}

/**
 * 분석결과 차트 표시
 */
function populationRenderChart(result){
	// 캔버스 처리
	const canvas = $(`<canvas class="analysis-chart2" width="370" height="220"></canvas>`);
	$(".graph-box2", this.selector).html(canvas);
	const ctx = canvas[0].getContext("2d");
	
	// 데이터 자료 유형
	let dataType = $("#pplGender").val();
	
	// 데이터 세팅
	var labels 	= [];
	var data 	= [];
	
	if(result){
		switch (dataType) {
		case 'all' : 
			for (let i = 0; i < result.length; i++){
				labels.push(result[i].codeNm);
				data.push(result[i].allPopltnCnt);
			}
			break;
		case 'm' :
			for(let i = 0; i < result.length; i++){
				labels.push(result[i].codeNm);
				data.push(result[i].malePopltnCnt);
			}
			break;
		case 'w' :
			for(let i = 0; i < result.length; i++){
				labels.push(result[i].codeNm);
				data.push(result[i].femalePopltnCnt);
			}
			break;
		case 'old' :
			for(let i = 0; i < result.length; i++){
				labels.push(result[i].codeNm);
				data.push(result[i].odsnPopltnCnt);
			}
			break;
		}
	} else {
		console.log("그래프 데이터 오류");
		return false;
	}
	
	//차트 그리기
	const datasets = [
		{
			data: data,
			borderColor: "rgba(0, 0, 255, 1)",
			backgroundColor: "rgba(0, 0, 255, 0.5)",
		},
		];
	new Chart(ctx, {
		type: "bar",
		data: {labels, datasets},
		options: {
			responsive: true,
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					callbacks: {
						label: (context) => {
							let label = "";
							label += `\r\n`+context.raw+`명`;
							return label;
						},
					},
				},
			},
		},
		plugins: [
			{
				id: "custom_canvas_background_color",
				beforeDraw: (chart) => {
					const ctx = chart.canvas.getContext("2d");
					ctx.save();
					ctx.globalCompositeOperation = "destination-over";
					ctx.fillStyle = "white";
					ctx.fillRect(0, 0, chart.width, chart.height);
					ctx.restore();
				},
			},
			],
	});
}

function makeGraph(result, layer, geom) {
	// 좌표설정
	let geometry, transformGeom;
	let options = {
			tilt : 40
	}
	if (geom) {
		geometry = geom.replace(/[POINT()]/gi, '').split(' ');
		geometry = [parseFloat(geometry[0]), parseFloat(geometry[1])];
		let cameraGeom = [parseFloat(geometry[0]-1200), parseFloat(geometry[1]+1000)];
		transformGeom = ol.proj.transform(geometry, 'EPSG:5179', 'EPSG:4326');
		let camera = ol.proj.transform(cameraGeom, 'EPSG:5179', 'EPSG:4326');
		let alt = 34200.19689058978;
		transformGeom.push(alt);
//		camera.push(3483.0755403572693);
		camera.push(9000);
		// 카메라 위치 조정
		dtmap.setCenter(camera, options);
	} else {
		geometry = [127.41882160, 37.57032196807325, 34200.19689058978];
		dtmap.setCenter(geometry, options);
	}
	
	// 그래프 생성
	var graph = createGraphPopltn(result, transformGeom);
	layer.setMaxDistance(200000.0);
	
	layer.addObject(graph, 0);
	
	function createGraphPopltn(infoData, transformGeom) {
		
		// 그래프 오브젝트 생성
		var graph = Module.createBarGraph("Graph");
		
		
		// 범례 추가
		graph.insertLegend("Legend1", "총인구", new Module.JSColor(200, 144, 237, 125));
		graph.insertLegend("Legend2", "남성", new Module.JSColor(200, 124, 181, 236));
		graph.insertLegend("Legend3", "여성", new Module.JSColor(200, 254, 121, 104));
		graph.insertLegend("Legend4", "노인", new Module.JSColor(200, 255, 204, 0));
		 
		// 데이터 셋 이름 리스트
		var dataSetName = [],
		labelTextOutlineColor = new Module.JSColor(255, 0, 0, 0),
		labelTextFillColor = new Module.JSColor(255, 255, 255, 255)
		;
		for (let i = 0; i < infoData.length; i++) {
			dataSetName.push(infoData[i].codeNm);
		}
		
		// 데이터 추가 (데이터는 범례가 추가된 순서대로 적용됨)
		var dataValue = [];
		
		// 최대/최소 인구
		let maxPopltnCnt = infoData[0].allPopltnCnt;
		for (let i = 0; i < infoData.length; i++) {
			dataValue.push([infoData[i].allPopltnCnt, infoData[i].malePopltnCnt, infoData[i].femalePopltnCnt, infoData[i].odsnPopltnCnt]);
			if (maxPopltnCnt < infoData[i].allPopltnCnt) {
				maxPopltnCnt = infoData[i].allPopltnCnt;
			}
		}
		
		for (var i = 0, len = dataValue.length; i<len; i++) {
			
			var data = new Module.Collection();
			
			// 데이터 정보 입력
			for (var j = 0, subLen = dataValue[i].length; j < subLen; j++) {
				data.add(dataValue[i][j]);
			}
			
			// 이름, 데이터 정보로 데이터 셋 입력
			graph.insertDataSet(dataSetName[i], data);
			
			// 그래프 데이터 셋 이름 출력 옵션 설정
			graph.setDataSetNameFont(dataSetName[i], "sans-serif");	// 폰트 이름
			graph.setDataSetNameTextSize(dataSetName[i], 12);	// 텍스트 크기
			graph.setDataSetNameTextColor(dataSetName[i], labelTextOutlineColor, labelTextFillColor);	// 텍스트 색상
		}
		
		// 최대, 최소 값 범위 설정
		let intervalValue = (maxPopltnCnt + 1000 - (maxPopltnCnt % 1000)) / 10;
		let maxViewPopltnCnt = Math.floor(maxPopltnCnt * 1.1 - (maxPopltnCnt % 10));
		graph.setValueRange(0, maxViewPopltnCnt, intervalValue);

		// 단위 표시 텍스트 설정
		graph.setUnitText("(명)");
		
		// 바 상승 애니메이션 속도 설정
		graph.setAnimationSpeed(0.1);
		
		// 데이터 셋 이름과 그래프 바 간 간격 설정
		graph.setDataSetNameInterval(300);
		
		// 그래프 바닥 평면 두께 설정
		graph.setFloorDepth(150);
		graph.setFloorColor(new Module.JSColor(150, 250, 250, 250));
			
		// 그래프 생성
		if (transformGeom != null) {
			// 범례 박스 크기 설정
			graph.setLegendBoxSize(new Module.JSSize3D(200, 150, 150));
			graph.create(new Module.JSVector3D(transformGeom[0], transformGeom[1], 700),
					new Module.JSSize2D(5000, 3125),
					0);	// 0(막대가 가로로 배열된 형태), 1(막대가 쌓인 형태) 
		} else {
			// 범례 박스 크기 설정
			graph.setLegendBoxSize(new Module.JSSize3D(800, 750, 750));
			graph.create(new Module.JSVector3D(127.48846105973797, 37.49399950773854, 1500),
					new Module.JSSize2D(20000, 12500),
					0);	// 0(막대가 가로로 배열된 형태), 1(막대가 쌓인 형태) 
		}
		
		return graph;
	}
}

/**
 * layer 생성
 * name : "li_popltn_info_graph"
 * @returns
 */
function setBarGraphLayer() {
//	var layerList = new Module.JSLayerList(true);
//	var layer = layerList.createLayer("li_popltn_info_graph", Module.ELT_GRAPH);
	
	var layer = Module.getObjectLayerList().createObjectLayer({
	    name: "li_popltn_info_graph", // 필수
	    type: Module.ELT_GRAPH, // 필수
	    visible: true, // 옵션 (default : true)
	    selectable: false, // 옵션 (default : true)
	    minDistance: 100.0, // 옵션 (default : 0.0)
	    maxDistance: 200000.0, // 옵션 (default : 3000.0)
	});
	
	return layer;
}

/**
 * 법정동 조회 - 폴리곤 생성
 * @param filter
 * @returns
 */
function popltnAddPolygon(filter) {
	if (dtmap.mod === '3D') {
		let options = {
				typeNames: 'tgd_scco_li',
				sortBy : 'gid',
				sortOrder : 'DESC',
				cql : filter.cql
		}
		if (filter.all) {
			options.typeNames = 'tgd_scco_emd'
			options.cql = null
		}
		dtmap.vector.clear();
		const promise = dtmap.wfsGetFeature(options);
		promise.then(function(data) {
			dtmap.vector.readGeoJson(data, function (feature) {
				let properties = feature.getProperties();
				return {
					fill : {
					      opacity : 0.7
					    }
				}
			});
			ui.loadingBar('hide');
		});
	}
}