/**
 * 지하시설단면도
 */
var M_DGUF_ANLS = {
		/**
		 * 초기화
		 */
		init: function () {
			dtmap.clear();
			this.clear();
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
			Map : null
		},
		
		/**
		 * 마우스 모드 설정
		 */
		setMouseState: function (mode) {
			if (mode == 'off') {
				Module.XDSetMouseState(Module.MML_MOVE_GRAB);
			} else if (mode == 'drag'){
				Module.XDSetMouseState(Module.MML_VIEW_UNDERGROUND);
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
			
			// 터파기 영역 점 리스트 반환
			var vInputPointList = this.GLOBAL.Map.getInputPoints();
			
			// 터파기 깊이 설정
			var depth = parseFloat(document.getElementById("dgufDepthShowVal").value);
			this.GLOBAL.Transparency.setDepth(depth);
			
//			let style = {
//					storke:{
//						color: 'rgb(0,139,255)',
//						opacity: 1,
//						width: 15,
//						lineDash: 'solid',
//						/* LineString일 경우만 적용 */
//						startArrow: false, //시작점 화살표
//						endArrow: false //끝점 화살표
//					},
//					label : {
//						text: depth + "m"
//					}
//			}
//			
//			for (let i = 0; i < vInputPointList.count(); i++) {
//				let geometry = [];
//				let lon = vInputPointList.get(i).Longitude;
//				let lat = vInputPointList.get(i).Latitude;
//				let alt = vInputPointList.get(i).Altitude;
//				geometry.push([lon, lat, alt], [lon, lat, parseFloat(-60)]);
//				dtmap.vector.addLine({
//					id: 'dguf_depth_line',
//					coordinates: geometry,
//					crs: 'EPSG:4326',
//					style: style
//				})
//			}
			
			// 터파기 생성
			this.GLOBAL.Transparency.create(vInputPointList);
			
			// 입력점 클리어
			this.GLOBAL.Map.clearInputPoint();
		},
		
		/**
		 * 제거
		 */
		clear: function () {
			Module.XDEClearTransparecnyObject();
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
		}
}

$(document).ready(function() {
	$('.type-group input[name="mouseType"]').on('change', function() {
		let mode = $(this).val(); 
		M_DGUF_ANLS.setMouseState(mode);
		if (mode != 'off') {
			M_DGUF_ANLS.clear();
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