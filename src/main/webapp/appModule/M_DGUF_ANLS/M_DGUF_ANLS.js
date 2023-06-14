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
			this.GLOBAL.Transparency.setRadius(30.0);
			this.setTransparencyTexture();
			Module.XDSetMouseState(Module.MML_SELECT_POINT);
		},
		
		/**
		 * 객체
		 */
		GLOBAL : {
			Transparency : null,
			Map : null,
			Layer : [],
			LayerInfo : null,
			LayerNm : null,
			LastInput : {edit : false, inputPoint : []},
			ObjCount : 0,
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
			
			// 터파기 좌표 변수
			var vInputPointList = null;
			var vInputPointListArray = null;
			
			// 터파기 개수 - 마지막 터 기준잡기
			let objCount = 0;
			if (this.GLOBAL.ObjCount > 0) {
				objCount = this.GLOBAL.ObjCount - 1; 
			}
			
			// 터파기 깊이 설정
			var depth = parseFloat(document.getElementById("dgufDepthShowVal").value);
			this.GLOBAL.Transparency.setDepth(depth);
			
			// 가장 최근 터파기 객체 깊이 수정
			if (this.GLOBAL.LastInput.edit && objCount > 0) {
				dtmap.layer.userLayers.delLayerAtName('depth_info_line');
				Module.XDEClearTransparecnyObject();
				vInputPointListArray = this.GLOBAL.LastInput.inputPoint;
			} else {
				// 터파기 영역 점 리스트 반환
				vInputPointList = this.GLOBAL.Map.getInputPoints();
				this.GLOBAL.LastInput.inputPoint.push(vInputPointList);
			}
			
			
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
			if (this.GLOBAL.LastInput.edit && objCount > 0) {
				for (let j = 0; j < vInputPointListArray.length; j++) {
					for (let i = 0; i < vInputPointListArray[j].count(); i++) {
						let geometry = [];
						let lon = vInputPointListArray[j].get(i).Longitude;
						let lat = vInputPointListArray[j].get(i).Latitude;
						let alt = vInputPointListArray[j].get(i).Altitude;
						geometry.push([lon, lat, alt], [lon, lat, parseFloat(alt - depth)]);
						// 라인 생성 (깊이 표시)
						this.createLineWithText(geometry, depth);
						geom.push(geometry[0]);
					}
					this.GLOBAL.Transparency.create(vInputPointListArray[j]);
				}
				this.GLOBAL.LastInput.edit = false;
			} else {
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
				this.GLOBAL.Transparency.create(vInputPointList);
			}
			
			// 터파기 생성
			this.GLOBAL.ObjCount++;
			
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
				dtmap.layer.userLayers.delLayerAtName('depth_info_line');
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
		
		/**
		 * 깊이 라벨 표시
		 */
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
			
			// 5미터 마다 표시
			for (let i = 1; i <= depth / 5; i++) {
				position = new Module.JSVector3D(geom[0][0], geom[0][1], (geom[0][2] - (5 * i)));
				point = Module.createPoint("depth_info_line");
				point.setPosition(position);
				point.setText((5 * i) + "m");
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
		canvas.addEventListener('Fire_EventSelectedObject', onPipeSelect);
		canvas.addEventListener('mouseup', onMouseUpFromPipe);
		if (mode != 'off') {
			M_DGUF_ANLS.destroy();
		}
	});
	
	$('#dgufDepthSetVal').on('change', function() {
		let val = parseFloat(this.value);
		M_DGUF_ANLS.setTransparencyDepth(val);
	});
	
	$('#dgufDepthSetVal').on('input', function(e) {
		$('#dgufDepthShowVal').val(e.target.value);
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
	
	$('#lastDgufEdit').on('click', function() {
		M_DGUF_ANLS.GLOBAL.LastInput.edit = true;
		if (M_DGUF_ANLS.GLOBAL.ObjCount > 0) {
			M_DGUF_ANLS.createTransparency();
		} else {
			toastr.warning("깊이를 수정할 객체가 존재하지않습니다.");
		}
	});
});

/**
 * 관로(파이프) 객체 선택 이벤트
 * @param e
 * @returns
 */
function onPipeSelect(e) {
	ui.loadingBar("show");
	M_DGUF_ANLS.GLOBAL.LayerInfo = e;
	M_DGUF_ANLS.GLOBAL.LayerNm = e.layerName.substring(0, e.layerName.length - 1).toLowerCase();
};

/**
 * 관로 클릭 이벤트 -> wfs 데이터
 * @param e
 * @returns
 */
function onMouseUpFromPipe(e) {
		var screenPosition = new Module.JSVector2D(e.x, e.y);
		var mapPosition = Module.getMap().ScreenToMapPointEX(screenPosition);
		let geometry = [mapPosition.Longitude, mapPosition.Latitude];
		let obj = Module.getMap().getSelectObject();
		let layerNm = M_DGUF_ANLS.GLOBAL.LayerNm;
		setTimeout(() => {
		if (obj && layerNm.includes('pip') && geometry) {
			let spaceSearch = dtmap.util.getBufferGeometry(new ol.geom.Point(geometry), 1);
			let options = {
					typeNames: layerNm,
					sortBy : 'gid',
					sortOrder : 'DESC',
					geometry : spaceSearch
			};
			
			const promise = dtmap.wfsGetFeature(options);
			promise.then(function(data) {
				if (data.features.length > 0) {
					let feature = data.features[0];
					let id = feature.id;
					let gid = feature.properties.gid;
					let properties = feature.properties;
					
					getPipeInfo(mapPosition, properties);
					
					M_DGUF_ANLS.GLOBAL.LayerInfo = null;
					M_DGUF_ANLS.GLOBAL.LayerNm = null;
				} else {
					toastr.error("다른위치에서 선택해주세요.");
				}
				ui.loadingBar("hide");
			});
		} else {
			obj = null;
			ui.loadingBar("hide");
			return;
		}
	}, 200);
}

/**
 * 파이프 객체 선택 -> 라벨표시
 * @param coord
 * @param properties
 * @returns
 */
function getPipeInfo(coord, properties) {
	let _element;
    let _isActive = false;
    const OVERLAY_ID = 'PIPE_OVERLAY';
    let mapPosition = coord;
    let data = properties;
    let layerNm = M_DGUF_ANLS.GLOBAL.LayerNm;
    
    switch (layerNm){
    case "wtl_pipe_lm" :
    	layerNm = "상수관로"
    	break;
    case "ufl_bpip_lm" : 
    	layerNm = "전력지중관로"
    	break;
    case "ufl_gpip_lm" :
    	layerNm = "천연가스관로"
    	break;
    case "ufl_kpip_ls" :
    	layerNm = "통신관로"
    	break;
    case "swl_pipe_lm" :
    	layerNm = "하수관로"
    	break;
    }
    
    const info = {
    		init : function() {
    			_element = document.createElement('div');
    			_element.classList.add('ol-popup3d');
    			$(_element).on('click', '.ol-popup-closer', this.onCloserClick);
    			map3d.setInteraction(this);
    			_isActive = true;
    			this.createOverlay(mapPosition);
    		},
    		
    		dispose : function() {
    			if (_isActive) {
//    	            map3d.canvas.removeEventListener('click', onMouseDown);
    				map3d.overlay.removeById(OVERLAY_ID);
    				_element.innerHTML = '';
    				_isActive = false;
	    			}
    		},
    		
    		createOverlay : function(position) {
    			const x = position.Longitude;
    			const y = position.Latitude;
    			const result = proj4("EPSG:4326", "EPSG:5179", [x, y]);
    			
    			let overlayObj = map3d.overlay.getById(OVERLAY_ID);
    			if (overlayObj) {
    				map3d.overlay.removeById(OVERLAY_ID);
    				_element.innerHTML = ''; //html 초기화
    			}
    			
    			map3d.overlay.add({
    				id: OVERLAY_ID,
    				element: _element,
    				position: position,
    				verticalAlign: 'bottom',
    				horizontalAlign: 'center'
    			});
    			
    			let html = `
    	            <a href="#" class="ol-popup-closer"></a>
    	            <div class="popup-content"></div>
    				<div>관로명 : ${layerNm}</div>
    	            <div>관리번호 : ${data.ftr_idn}</div>
    	            `;
    			let dataInfoCase;
    			if (data.pip_lbl) {
    				html += `<div>관라벨 : ${data.pip_lbl}</div>`;
    			} else {
    				html += `
    				<div>깊이 : ${data.std_dep}&emsp;관경 : ${data.std_dip}</div>
    				`;
    			}
    			_element.innerHTML = html;
    		},
    		
    		onCloserClick : function(e) {
    			map3d.overlay.removeById(OVERLAY_ID);
    		}
    }
    info.init();
}