/**
 * 지하시설물터파기
 */
var canvas = document.querySelector('#map3D canvas');
canvas.id = "canvas";

var M_DGUF_ANLS = {
		/**
		 * 초기화
		 */
		init: function () {
			this.destroy();
			this.GLOBAL.Transparency = Module.getTransparency();
			this.GLOBAL.Map = Module.getMap();
			this.GLOBAL.Transparency.setRadius(100.0);
			this.setTransparencyTexture();
		},
		
		/**
		 * 객체
		 */
		GLOBAL : {
			Transparency : null,
			Map : null,
			Layer : null,
			Geom : null
		},
		
		/**
		 * 마우스 모드 설정
		 */
		setMouseState: function (mode) {
			if (mode == 'off') {
//				Module.XDSetMouseState(Module.MML_MOVE_GRAB);
				Module.XDSetMouseState(Module.MML_SELECT_POINT);
				// 입력점 클리어
				this.GLOBAL.Map.clearInputPoint();
			} else if (mode == 'drag'){
				Module.XDSetMouseState(Module.MML_VIEW_UNDERGROUND);
				// 입력점 클리어
				this.GLOBAL.Map.clearInputPoint();
			} else if (mode == 'area') {
				Module.XDSetMouseState(Module.MML_INPUT_LINE);
			}
			document.getElementById("areaSetBtn").disabled = (mode != 'area');
		},
		
		/**
		 * 터파기 생성
		 */
		createTransparency: function () {
			if (this.GLOBAL.Transparency == null || this.GLOBAL.Map == null) {
				return;
			}
			
			// 줌 in 제한 --
			Module.getViewCamera().setLimitAltitude(80);
			
			// 터파기 영역 점 리스트 반환
			var vInputPointList = this.GLOBAL.Map.getInputPoints();
			
			// 터파기 깊이 설정
			var depth = parseFloat(document.getElementById("dgufDepthShowVal").value);
			this.GLOBAL.Transparency.setDepth(depth);
			
			let style = {
					stroke:{
						opacity: 1,
						width: 3,
						zIndex: -30
					},
					label : {
						offsetY: -50,
						text: depth + "m"
					},
					offsetHeight : -30
			}
			
			let geom = [];
			for (let i = 0; i < vInputPointList.count(); i++) {
				let geometry = [];
				let lon = vInputPointList.get(i).Longitude;
				let lat = vInputPointList.get(i).Latitude;
				let alt = vInputPointList.get(i).Altitude;
				geometry.push([lon, lat, alt], [lon, lat, parseFloat(alt - depth)]);
				// 라인 생성 (깊이 표시)
				this.createLineWithText(geometry, depth);
				geom.push(geometry[0]);
			}
			console.log(geom);
			
			
			// 터파기 생성
			this.GLOBAL.Transparency.create(vInputPointList);
			
			// 입력점 클리어
			this.GLOBAL.Map.clearInputPoint();
			
		},
		
		/**
		 * 제거
		 */
		destroy: function () {
			dtmap.clear();
			Module.XDEClearTransparecnyObject();
			Module.XDClearInputPoint();
			if (this.GLOBAL.Layer) {
				this.GLOBAL.Layer.removeAll();
			}
			Module.getViewCamera().setLimitAltitude(150);
			canvas.removeEventListener('Fire_EventSelectedObject', onPipeSelect);
			canvas.removeEventListener('mouseup', onMouseUpFromPipe);
		},
		
		/**
		 * 터파기 텍스쳐 설정
		 */
		setTransparencyTexture: function () {
			if (this.GLOBAL.Transparency == null || this.GLOBAL.Map == null) {
				return;
			}
			
			var img = new Image();
			
			// 텍스쳐 이미지 로드
			img.onload = function(){
				
				var canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;
				
				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				
				var imageSize = new Module.JSSize2D(img.width, img.height);
				var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
				
				// 터파기 텍스쳐 설정
				M_DGUF_ANLS.GLOBAL.Transparency.setTexture(imageData, canvas.width, canvas.height, true);	// 터파기 바닥면 텍스쳐
				M_DGUF_ANLS.GLOBAL.Transparency.setTexture(imageData, canvas.width, canvas.height, false);	// 터파기 벽면 텍스쳐
			}
			img.src = "/images/map/dguf-texture.jpg";
		},
		
		/**
		 * 터파기 깊이 설정
		 */
		setTransparencyDepth: function (depth) {
			if (this.GLOBAL.Transparency == null || this.GLOBAL.Map == null) {
				return;
			}
			this.GLOBAL.Transparency.setDepth(depth);
			document.getElementById("dgufDepthShowVal").value = depth;
		},
		
		createLineWithText: function (geom, depth) {
			var line = Module.createLineString("depth_info_line");
			// 옵션, 데이터 설정
			let style = 'XYZ';
			let coordinates = {coordinate : geom, style : style};
			var options = {
					coordinates : coordinates,
					type: 0,
					union: false, // true => RTT
					depth: false,
					color: new Module.JSColor(255, 0, 139, 255),
					width: 5
					};
			line.createbyJson(options);
			
			let layerList = new Module.JSLayerList(true);
			let layer = layerList.createLayer("depth_info_line", Module.ELT_3DLINE);
			
			let position = null;
			let point = null;
			
			// 10미터 마다 표시
			for (let i = 1; i <= depth / 10; i++) {
				position = new Module.JSVector3D(geom[0][0], geom[0][1], (geom[0][2] - (10 * i)));
				point = Module.createPoint("depth_info_line");
				point.setPosition(position);
				point.setText((10 * i) + "m");
				layer.addObject(point, 0);
			};
			
			layer.addObject(line, 0);
			
			this.GLOBAL.Layer = layer;
		}
}


$(document).ready(function() {
	// 객체 선택 이벤트 리스너
	$('.type-group input[name="mouseType"]').on('change', function() {
		let mode = $(this).val(); 
		M_DGUF_ANLS.setMouseState(mode);
		canvas.addEventListener('mouseup', onMouseUpFromPipe);
		canvas.addEventListener('Fire_EventSelectedObject', onPipeSelect);
		if (mode != 'off') {
			M_DGUF_ANLS.destroy();
		}
	});
	
	$('#dgufDepthSetVal').on('change', function() {
		let val = parseFloat(this.value);
		M_DGUF_ANLS.setTransparencyDepth(val);
	});
	
	$('#areaSetBtn').on('click', function() {
		M_DGUF_ANLS.createTransparency();
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

/**
 * 관로(파이프) 객체 선택 이벤트
 * @param e
 * @returns
 */
function onPipeSelect(e){
	let geom = M_DGUF_ANLS.GLOBAL.Geom;
	console.log(e);
	console.log(M_DGUF_ANLS.GLOBAL.Geom);
	console.log(geom);
	let layerNm = e.layerName.substring(0, e.layerName.length-1).toLowerCase();
	let objId = e.objID;
	let cqlFilters = "";
	let options = {
			typeNames: layerNm,
			sortBy : 'gid',
			sortOrder : 'DESC',
			cql : cqlFilters		
	};
	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		console.log(data);
	});
};

function onMouseUpFromPipe(e) {
	var screenPosition = new Module.JSVector2D(e.x, e.y);
	var mapPosition = Module.getMap().ScreenToMapPointEX(screenPosition);
	let geometry = [mapPosition.Longitude, mapPosition.Latitude, mapPosition.Altitude];
	
	return geometry; 
}