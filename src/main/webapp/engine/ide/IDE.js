var IDE = {
	GLOBAL:{
		MAPID:null,
		MEM_ID:null,
		init:function() {
			console.log("init");
			//Module.getMap().SetServerData("www.egiscloud.com/builder/hadoopFS/", "terraexpo/data/convert/terrain", "528", "bil", 0);
			//Module.getMap().SetDemBox(127.0700133469999997,37.3098847509999985,127.0752820860000014,37.3156074990000022);
			//Module.XDEMapCreateLayer("YONGIN_SUNGBOK","http://www.egiscloud.com/builder/hadoopFS/terraexpo/data/convert/image/529",0,false,true,true,10,5,21, 0);
			//Module.getViewCamera().setViewAt(127.0700133469999997,37.3098847509999985, 3000, 45, 0);
			//Module.SetPlanetImageryType(-1);

			IDE.GLOBAL.MAPID = parseInt(IDE.UTIL.getQueryVariable("MAPID"));

			//Module.XDGetVWorldData(true);
			//Module.SetPlanetImageryType(13);

			$("#MAP_UTILITY_WRAP").mouseenter(function() {
				Module.XDIsMouseOverDiv(true);
			}).mouseleave(function() {
				Module.XDIsMouseOverDiv(false);
			});

			$("#sideExtention").mouseenter(function() {
				Module.XDIsMouseOverDiv(true);
			}).mouseleave(function() {
				Module.XDIsMouseOverDiv(false);
			});

			$("#sideLibrary").mouseenter(function() {
				Module.XDIsMouseOverDiv(true);
			}).mouseleave(function() {
				Module.XDIsMouseOverDiv(false);
			});

			$("#sidebar").mouseenter(function() {
				Module.XDIsMouseOverDiv(true);
			}).mouseleave(function() {
				Module.XDIsMouseOverDiv(false);
			});

			$(".modal").mouseenter(function() {
				Module.XDIsMouseOverDiv(true);
			}).mouseleave(function() {
				Module.XDIsMouseOverDiv(false);
			});

			$(".slider-wrapper").mouseenter(function() {
				Module.XDIsMouseOverDiv(true);
			}).mouseleave(function() {
				Module.XDIsMouseOverDiv(false);
			});

			$(".rangeSliderWrap").mouseenter(function() {
				Module.XDIsMouseOverDiv(true);
			}).mouseleave(function() {
				Module.XDIsMouseOverDiv(false);
			});

			$("#imageCompareListWrap").mouseenter(function() {
				Module.XDIsMouseOverDiv(true);
			}).mouseleave(function() {
				Module.XDIsMouseOverDiv(false);
			});

			$("#toolFillUpDownWrap").mouseenter(function() {
				Module.XDIsMouseOverDiv(true);
			}).mouseleave(function() {
				Module.XDIsMouseOverDiv(false);
			});

			$(".noInteraction").mouseenter(function() {
				Module.XDIsMouseOverDiv(true);
			}).mouseleave(function() {
				Module.XDIsMouseOverDiv(false);
			});
			//IDE.MAP.loadMapInfo();

			IDE.GLOBAL.addModuleEvents();


			// transformCoord
			//127.40970715495112 37.49598484662603
			//127.41301823888585 37.49731424641272
			// var ts = IDE.CADASTRAL.transformCoord(_lon, _lat, "13");
			var ts = IDE.CADASTRAL.transformCoord(127.40970715495112,37.49598484662603, "13");
			console.log(ts);
			var ts2 = IDE.CADASTRAL.transformCoord(127.41301823888585, 37.49731424641272, "13");
			console.log(ts2);
			/*
			$.get("http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData", {
    				//"ServiceKey" : "%2FtbpQNeSxDQRMPWdmG2JuRtSMEM6YoNWGdgXJ%2BvGO3vpWSNeVoFlkHVQ8l46YSSzNqgtBNDK0nTguJFD10EdVg%3D%3D",
    				"base_date" : 20190509,
    				"base_time" : 0800,
    				"nx" : 60,
    				"ny" : 127,
    				"_type" : "json",
    				"serviceKey" : "%2FtbpQNeSxDQRMPWdmG2JuRtSMEM6YoNWGdgXJ%2BvGO3vpWSNeVoFlkHVQ8l46YSSzNqgtBNDK0nTguJFD10EdVg%3D%3D"
    			}, function(data) {
    				console.log(data);
    			}, "json");
			*/


			//Module.getViewCamera().setViewAt(127.487417, 37.491857, 1500, 90, 0);
		},
		LASControl:function(v) {
			if(v) {
				Module.XDEMapRemoveLayer("POINT_CLOUD");
				Module.XDEMapCreateLayer("POINT_CLOUD","http://www.egiscloud.com/builder/hadoopFS/khaia/data/layer/3154",0, false, true, true, 19, 0, 19, parseFloat(0));
			} else {
				Module.XDEMapRemoveLayer("POINT_CLOUD");
			}
		},
		goHome:function() {
			Module.getViewCamera().setViewAt(127, 38, 6378137*3, 90, 0);
		},
		goTarget:function() {
			Module.getViewCamera().setViewAt(127.0700133469999997,37.3098847509999985, 3000, 45, 0);
		},
		addModuleEvents:function() {
			canvas.addEventListener("Fire_EventGetHeights", function(e){

				if(IDE.TOOL.COMPARE_HEIGHT.isCompare == true) {
					IDE.TOOL.COMPARE_HEIGHT.executeCompare();
					Module.XDUpdateMeshData(false);
				} else {
					if(IDE.TOOL.COMPARE_HEIGHT.isCheckLine == false) {
						IDE.TOOL.executeTerrainHeight(e);
						Module.XDUpdateMeshData(false);
					}
				}
			});

			canvas.addEventListener("Fire_EventAddAltitudePoint", function(e) {
				console.log(e);
				IDE.TOOL.FILL.slopeHeight = e.dAlt; // 글로벌변수에 저장
				$("#fillUpSettedHeightValue").val(IDE.TOOL.FILL.slopeHeight);
			});

			setTimeout(function() {

			}, 1500);

		}
	},
	CADASTRAL:{
		XHR:null,
		display : false,
		cadastralLayer : null,
		areaPolyLayer : null,
		cadastralPolygons : {},
		isDisplay : function(_display) {
			return this.display;
		},
		setDisplay : function(_display) {
			this.display = _display;
			Module.getAnalysis().setShadowCadastralRenderMode(true);
			if (_display) {
				this.update();
			}
		},
		getCenterData: function(center, _callback) {
			if(IDE.CADASTRAL.XHR != null) {
				IDE.CADASTRAL.XHR.abort();
			}
//			var formData = new FormData();
//			formData.append("x", center.center.lon);
//			formData.append("y", center.center.lat);
//			formData.append("control", "getShapeInfo");
//			
//			IDE.CADASTRAL.XHR = $.ajax({
//				type: "POST",
//				url: "/com/cmm/map/getCadastralInfo.do",
//				processData: false,
//				contentType: false,
//				data:formData,
//				success : function(data) {
//					var result = JSON.parse(data);
//
//					switch(result.resultCode) {
//						case "complete" :
//							this.callback(result);
//						break;
//					}
//				},
//				callback : _callback
//			});
			
			$.ajax({
				type : "POST",
				url : "/com/cop/cadastralInfo/getCadastralInfo.do",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data : {
					control : "getShapeInfo",
					x : center.center.lon,
					y : center.center.lat
				},
				dataType : "json",
				success : function(data) {
					
					switch(data.resultCode) {
						case "complete" :
							data.cadastral = data.cadastral[0];
							this.callback(data);
						break;
					}
				},
				callback : _callback
			});	
		},
		getCenter5174Position : function(_x, _y) {
			var width = Module.canvas.width;
			var height = Module.canvas.height;

			var map = Module.getMap();

			var center = map.ScreenToMapPointEX(new Module.JSVector2D(_x, _y));
			
			var rectPosition = tCommon.transformCoordinates(
				tCommon.setGeometry(4326),
				tCommon.setGeometry(5174),
				[
					[center.Longitude, center.Latitude, 0]
				]
			);
			
			return {
				center : { lon : rectPosition.coordinates[0][0], lat : rectPosition.coordinates[0][1]},
			};
		},
		getScreen5174Rect : function() {

			var width = Module.canvas.width;
			var height = Module.canvas.height;
			var scaleheight = 0;

			var map = Module.getMap();
			var tilt = Module.getViewCamera().getTilt();

			if( tilt < 85)	scaleheight = ( ( 90 - tilt) / 100 ) * ( height );

			var leftTop = map.ScreenToMapPointEX(new Module.JSVector2D(0, scaleheight));
			var rightTop = map.ScreenToMapPointEX(new Module.JSVector2D(width, scaleheight));
			var rightBottom = map.ScreenToMapPointEX(new Module.JSVector2D(width, height));
			var leftBottom = map.ScreenToMapPointEX(new Module.JSVector2D(0, height));

			var rectPosition = tCommon.transformCoordinates(
				tCommon.setGeometry(4326),
				tCommon.setGeometry(5174),
				[
					[leftTop.Longitude, leftTop.Latitude, 0],
					[rightTop.Longitude, rightTop.Latitude, 0],
					[rightBottom.Longitude, rightBottom.Latitude, 0],
					[leftBottom.Longitude, leftBottom.Latitude, 0]
				]
			);

			return {
				leftTop : { lon : rectPosition.coordinates[0][0], lat : rectPosition.coordinates[0][1]},
				rightTop : { lon : rectPosition.coordinates[1][0], lat : rectPosition.coordinates[1][1]},
				rightBottom : { lon : rectPosition.coordinates[2][0], lat : rectPosition.coordinates[2][1]},
				leftBottom : { lon : rectPosition.coordinates[3][0], lat : rectPosition.coordinates[3][1]}
			};
		},
		getMBRData:function(rect, _callback) {

			if(IDE.CADASTRAL.XHR != null) {
				IDE.CADASTRAL.XHR.abort();
			}

			var formData = new FormData();

			formData.append("left_top_lon", rect.leftTop.lon);
			formData.append("left_top_lat", rect.leftTop.lat);
			formData.append("right_top_lon", rect.rightTop.lon);
			formData.append("right_top_lat", rect.rightTop.lat);
			formData.append("right_bottom_lon", rect.rightBottom.lon);
			formData.append("right_bottom_lat", rect.rightBottom.lat);
			formData.append("left_bottom_lon", rect.leftBottom.lon);
			formData.append("left_bottom_lat", rect.leftBottom.lat);

			formData.append("control", "getCadastralBuffer");

			IDE.CADASTRAL.XHR = $.ajax({
//				type: "POST",
//				url: "/php/builder/controller/cadastral/ctrlCadastral.php",
//				processData: false,
//				contentType: false,
//				data:formData,
//				success : function(data) {
//
//					var result = JSON.parse(data);
//
//					switch(result.resultCode) {
//						case "complete" :
//							this.callback(result);
//						break;
//					}
//				},
//				callback : _callback
				type : "POST",
				url : "/com/cop/cadastralInfo/getCadastralInfo.do",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data : {
					leftTopLon : rect.leftTop.lon,
					leftTopLat : rect.leftTop.lat,
					rightTopLon : rect.rightTop.lon,
					rightTopLat : rect.rightTop.lat,
					rightBottomLon : rect.rightBottom.lon,
					rightBottomLat : rect.rightBottom.lat,
					leftBottomLon : rect.leftBottom.lon,
					leftBottomLat : rect.leftBottom.lat,
					control : "getCadastralBuffer" 
				},
				dataType : "json",
				success : function(data) {
					console.log("getMBRData");
					console.log(data);
					switch(data.resultCode) {
						case "complete" :
							this.callback(data);
						break;
					}
				},
				error:function(request,status,error){
			        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			     },
				callback : _callback
			});
		},
		getBoardData:function( _lon, _lat, _alt ) {
			var ts = IDE.CADASTRAL.transformCoord(_lon, _lat, "13");

			var formData = new FormData();
			formData.append("control", "getCadastralInfo");
			formData.append("x", ts.x);
			formData.append("y", ts.y);

//			$.ajax({
//				type: "POST",
//				url: "/php/builder/controller/cadastral/ctrlCadastral.php",
//				processData: false,
//				contentType: false,
//				data:formData,
//				success : function(data) {
//
//					var result = JSON.parse(data);
//
//					switch(result.resultCode) {
//						case "complete" :
//                            OCREATEYY.loadData( result, _lon, _lat, _alt );
//                            if( Toolbar.checkMouseMove != 0)	clearTimeout(Toolbar.checkMouseMove);
//                            if( Toolbar.checkScreenCenter != 0)	clearTimeout(Toolbar.checkScreenCenter);
//                            document.body.classList.remove('down');
//						break;
//					}
//				}
//			});
			
			$.ajax({
				type : "POST",
				url : "/com/cop/cadastralInfo/getCadastralInfo.do",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data : {
					control : "getCadastralInfo",
					x : center.center.lon,
					y : center.center.lat
				},
				dataType : "json",
				success : function(data) {
					console.log("getBoardData");
					console.log(data);
					switch(data.resultCode) {
						case "complete" :
//                          OCREATEYY.loadData( result, _lon, _lat, _alt );
//                          if( Toolbar.checkMouseMove != 0)	clearTimeout(Toolbar.checkMouseMove);
//                          if( Toolbar.checkScreenCenter != 0)	clearTimeout(Toolbar.checkScreenCenter);
//                          document.body.classList.remove('down');
//						break;
					}
				},
				error:function(request,status,error){
			        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			     },
				callback : _callback
			});	
		},
		getPnuData: function (pnu){
			if(IDE.CADASTRAL.XHR != null) {
				IDE.CADASTRAL.XHR.abort();
			}
			
			$.ajax({
				type : "POST",
				url : "/com/cop/cadastralInfo/getCadastralInfo.do",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data : {
					control : "getPnuInfo",
					pnu : pnu
				},
				dataType : "json",
				success : function(data) {
					data.cadastral = data.cadastral[0];
					
					OLOAD.m_checkViewInfo = false;
					
					if(data.cadastral != "undefined"
						&& data.cadastral != null){
						
						OLOAD.loadCenterData(data);
						
						var layerList = new Module.JSLayerList(true);
						var layer = layerList.nameAtLayer("Center_Polygon");
						
						layer.setSelectable(false);
					}
				},
				error:function(request,status,error){
			        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			    }
			});	
		},
		transformCoord:function(x, y, t) {

			Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
			Proj4js.defs["EPSG:5186"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
			Proj4js.defs["EPSG:5174"] = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs";

			var source = null;

			switch(t) {
				case "13" :
					source = new Proj4js.Proj("EPSG:4326");
				break;

				case "14" : //보정된 오래된 지리원 표준 - 서부원점 epsg:5173
					Proj4js.defs["EPSG:5173"] = "+proj=tmerc +lat_0=38 +lon_0=125.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("EPSG:5173");
				break;

				case "15" : //보정된 오래된 지리원 표준 - 중부원점 epsg:5174
					//Proj4js.defs["EPSG:5174"] = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					//Proj4js.defs("EPSG:5174","+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs");
					Proj4js.defs["EPSG:5174"] = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5174");
				break;

				case "16" : //보정된 오래된 지리원 표준 - 동부원점 epsg:5176
					Proj4js.defs["EPSG:5176"] = "+proj=tmerc +lat_0=38 +lon_0=129.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("EPSG:5176");
				break;

				case "17" : //타원제 바꾼 지리원 표준 - 중부원점 epsg:5181
					Proj4js.defs["EPSG:5186"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5186");
				break;

				case "18" : //타원제 바꾼 지리원 표준 - 동부원점 epsg:5183
					Proj4js.defs["EPSG:5187"] = "+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5187");
				break;

				case "19" : //보정된 오래된 지리원 표준 - 제주원점 epsg:5175
					Proj4js.defs["EPSG:5182"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=550000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5182");

				break;

				case "20" : // 2017년 국토지리정보원 표준 - 중부원점 epsg:5186
					Proj4js.defs["EPSG:5186"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5186");
				break;

				case "21" : // 2017년 국토지리정보원 표준 - 서부원점 epsg:5185
					Proj4js.defs["EPSG:5185"] = "+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5185");
				break;

				case "24" : // UTM-K (Bessel): 새주소지도에서 사용 중 epsg:5178
					Proj4js.defs["EPSG:5178"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("EPSG:5178");
				break;

				case "25" : // 네비게이션용 KATEC 좌표계(KOTI-KATEC)
					Proj4js.defs["KOTI-KATEC"] = "+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("KOTI-KATEC");
				break;

				case "26" : // UTM-K (GRS80): 네이버지도에서 사용중인 좌표계  epsg:5179
					Proj4js.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5179");
				break;

				case "34" : // UTM Zone 51 Northern(Bessel) epsg:32651
					Proj4js.defs["EPSG:32651"] = "+proj=utm +zone=51 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:32651");
				break;

				case "35" : // UTM Zone 52 Northern(Bessel)  epsg:32652

					Proj4js.defs["EPSG:32652"] = "+proj=utm +zone=52 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:32652");
				break;

				case "130" :
					// UTM 48N
					Proj4js.defs["EPSG:32648"] = "+proj=utm +zone=48 +datum=WGS84 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:32648");
				break;

				case "131" :
					// UTM 48S
					Proj4js.defs["EPSG:32748"] = "+proj=utm +zone=48 +south +datum=WGS84 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:32748");
				break;

				case "135" :
					Proj4js.defs["EPSG:32750"] = "+proj=utm +zone=50 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ";
					source = new Proj4js.Proj("EPSG:32750");

				break;

			}

			var dest = new Proj4js.Proj("EPSG:5186");
			//var dest = new Proj4js.Proj("EPSG:5174");

			//console.log(source, dest);
			//console.log(x, y, t);

			var pt = new Proj4js.Point(x, y);
			//console.log(pt);

			var rs = Proj4js.transform(source, dest, pt);
			//console.log(rs);

			return rs;

			/*
			Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
			Proj4js.defs["EPSG:32648"] = "+proj=utm +zone=48 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ";

			var source = new Proj4js.Proj("EPSG:32648");



			var lbx = 823529;
			var lby = 1776562;

			var rtx = 842597;
			var rty = 1795576;


			var lb = new Proj4js.Point(lbx, lby);
			var rt = new Proj4js.Point(rtx, rty);

			var nlb = Proj4js.transform(source, dest, lb);
			var nrt = Proj4js.transform(source, dest, rt);
			*/
		},
		/*transformCoord5174:function(x, y, s) {

			Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
			Proj4js.defs["EPSG:5186"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
			Proj4js.defs["EPSG:5174"] = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs";

			var source = null;

			switch(s) {
				case "13" :
					source = new Proj4js.Proj("EPSG:4326");
				break;

				case "14" : //보정된 오래된 지리원 표준 - 서부원점 epsg:5173
					Proj4js.defs["EPSG:5173"] = "+proj=tmerc +lat_0=38 +lon_0=125.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("EPSG:5173");
				break;

				case "15" : //보정된 오래된 지리원 표준 - 중부원점 epsg:5174
					//Proj4js.defs["EPSG:5174"] = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					//Proj4js.defs("EPSG:5174","+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs");
					Proj4js.defs["EPSG:5174"] = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5174");
				break;

				case "16" : //보정된 오래된 지리원 표준 - 동부원점 epsg:5176
					Proj4js.defs["EPSG:5176"] = "+proj=tmerc +lat_0=38 +lon_0=129.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("EPSG:5176");
				break;

				case "17" : //타원제 바꾼 지리원 표준 - 중부원점 epsg:5181
					Proj4js.defs["EPSG:5186"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5186");
				break;

				case "18" : //타원제 바꾼 지리원 표준 - 동부원점 epsg:5183
					Proj4js.defs["EPSG:5187"] = "+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5187");
				break;

				case "19" : //보정된 오래된 지리원 표준 - 제주원점 epsg:5175
					Proj4js.defs["EPSG:5182"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=550000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5182");

				break;

				case "20" : // 2017년 국토지리정보원 표준 - 중부원점 epsg:5186
					Proj4js.defs["EPSG:5186"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5186");
				break;

				case "21" : // 2017년 국토지리정보원 표준 - 서부원점 epsg:5185
					Proj4js.defs["EPSG:5185"] = "+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5185");
				break;

				case "24" : // UTM-K (Bessel): 새주소지도에서 사용 중 epsg:5178
					Proj4js.defs["EPSG:5178"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("EPSG:5178");
				break;

				case "25" : // 네비게이션용 KATEC 좌표계(KOTI-KATEC)
					Proj4js.defs["KOTI-KATEC"] = "+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("KOTI-KATEC");
				break;

				case "26" : // UTM-K (GRS80): 네이버지도에서 사용중인 좌표계  epsg:5179
					Proj4js.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5179");
				break;

				case "34" : // UTM Zone 51 Northern(Bessel) epsg:32651
					Proj4js.defs["EPSG:32651"] = "+proj=utm +zone=51 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:32651");
				break;

				case "35" : // UTM Zone 52 Northern(Bessel)  epsg:32652

					Proj4js.defs["EPSG:32652"] = "+proj=utm +zone=52 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:32652");
				break;

				case "130" :
					// UTM 48N
					Proj4js.defs["EPSG:32648"] = "+proj=utm +zone=48 +datum=WGS84 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:32648");
				break;

				case "131" :
					// UTM 48S
					Proj4js.defs["EPSG:32748"] = "+proj=utm +zone=48 +south +datum=WGS84 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:32748");
				break;

				case "135" :
					Proj4js.defs["EPSG:32750"] = "+proj=utm +zone=50 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ";
					source = new Proj4js.Proj("EPSG:32750");

				break;

			}

			//var dest = new Proj4js.Proj("EPSG:5186");
			var dest = new Proj4js.Proj("EPSG:5174");

			//console.log(source, dest);
			//console.log(x, y, t);

			var pt = new Proj4js.Point(x, y);
			//console.log(pt);

			var rs = Proj4js.transform(source, dest, pt);
			//console.log(rs);

			return rs;

		},
		*/
		areaPolygon : function( _type ) {
			
			var layerList = new Module.JSLayerList(true);
			layerList.delLayerAtName( "Area_POLYGON_LAYER" );
			var layer = layerList.createLayer("Area_POLYGON_LAYER", Module.ELT_POLYHEDRON);
			layer.setMaxDistance(1600.0);
			this.areaPolyLayer = layer;
			
			if (Module.getViewCamera().getDistance() > this.areaPolyLayer.getMaxDistance()) {
				return;
			}
			
			IDE.CADASTRAL.getMBRData(this.getScreen5174Rect(), function(data) {
				
				var layer = IDE.CADASTRAL.areaPolyLayer;		
				var objkey, polygon, color, a, info, value, per, infosize;
				info = {};
							
				a = 220;
				infosize = value = 0;
				console.log("size : " + data.cadastral.length);
				for(var i = 0; i<data.cadastral.length; i++){
					var key = data.cadastral[i];
					objkey = key.OGR_FID;
					
					polygon = null;
					if( _type == 1 )		color = IDE.CADASTRAL.areaMatchColor( key.a11 );
					else if( _type == 2 )	color = IDE.CADASTRAL.areaLandUseColor( key.a11 );
					polygon = IDE.CADASTRAL.createPolyHedron( objkey, key.geometry, 80, 30, a, color.r, color.g, color.b, a, 255, 255, 255, "POLYGON");

					if (polygon == null)	continue;
					layer.addObject(polygon, 0);
					
					// 통계 데이터
					if( info[key.a11] == undefined )	value = 1;
					else								value = info[key.a11] + 1;
					info[key.a11] = value;				
				}				
				// 보드 생성
				for( var key in info ) {
					infosize++;
					per = info[key]/data.cadastral.length * 100;
					per = Math.round(per);
					info[key] = per;
				}
				
				var width, height, scaleheight;
				width = Module.canvas.width;
				height = Module.canvas.height;
				scaleheight = 0;
				var tilt = Module.getViewCamera().getTilt();
				if( tilt < 85)	scaleheight = ( ( 90 - tilt) / 100 ) * ( height );
			
				var center = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(Module.canvas.width>>1, (Module.canvas.height>>1) + (scaleheight >> 1)));
				IYYBILL.setinfostatistics( 128, 40 + infosize * 20, info);
				var imagedata = CIMAGE.getData();
				var size = CETC.getSize();
				var board = IDE.CADASTRAL.createBoard( "board_Info", center.Longitude, center.Latitude, 200 , imagedata, size, 0.5);
				layer.addObject(board, 0);
			});
		},
		areaMatchColor : function( _type )
		{
			if( _type == "일치" ) {
				r = 35;		g = 114;	b = 191;
			} else if( _type == "불일치" ) {
				r = 190;	g = 140;	b = 42;
			} else {
				r = 255;	g = 255;	b = 255;
			}
			var result_color =	{
									"r": r,
									"g": g,
									"b": b
								};
			return result_color;	
		},
//		areaLandUseColor : function( _type )
//		{
//			/*
//1 : 전		189	254	124
//2 : 답		255	128	158
//3 : 과수원		129	254	0
//4 : 목장용지	129	254	0
//5 : 임야		222	127	255
//6 : 광천지		0	165	219
//7 : 염전		252	2	3
//8 : 대		222	127	255
//9 : 공장용지	222	127	255
//10 : 학교용지	2	255	253
//11 : 주차장	200	200	200
//12 : 주유소	220	163	108
//13 : 창고용지	255	128	158
//14 : 도로		255	255	255
//15 : 철도용지	255	128	158
//16 : 제방		193	221	111
//17 : 하천		0	192	254
//18 : 구거		0	128	255
//19 : 유지		126	159	255
//20 : 양어장	193	221	111
//21 : 수도용지	112	164	222
//22 : 공원		0	222	1
//23 : 체육용지	0	222	1
//24 : 유원지	0	222	1
//25 : 종교용지	254	128	254
//26 : 사적지	255	249	5
//27 : 묘지		255	128	158
//28 : 잡종지	255	128	158
//*/
//			var r, g, b, a;
//			if( _type == "전" ) {
//				r = 189;	g = 254;	b = 124;
//			} else if( _type == "답" ) {
//				r = 255;	g = 128;	b = 158;
//			} else if( _type == "과수원" ) {
//				r = 129;	g = 254;	b = 0;
//			} else if( _type == "목장용지" ) {
//				r = 129;	g = 254;	b = 0;
//			} else if( _type == "임야" ) {
//				r = 222;	g = 127;	b = 255;
//			} else if( _type == "광천지" ) {
//				r = 0;		g = 165;	b = 219;
//			} else if( _type == "염전" ) {
//				r = 252;	g = 2;		b = 3;
//			} else if( _type == "대" ) {
//				r = 222;	g = 127;	b = 255;
//			} else if( _type == "공장용지" ) {
//				r = 222;	g = 127;	b = 255;
//			} else if( _type == "학교용지" ) {
//				r = 2;		g = 255;	b = 253;
//			} else if( _type == "주차장" ) {
//				r = 200;	g = 200;	b = 200;
//			} else if( _type == "주유소" ) {
//				r = 220;	g = 163;	b = 108;
//			} else if( _type == "창고용지" ) {
//				r = 255;	g = 128;	b = 158;
//			} else if( _type == "도로" ) {
//				r = 255;	g = 255;	b = 255;
//			} else if( _type == "철도용지" ) {
//				r = 255;	g = 128;	b = 158;
//			} else if( _type == "제방" ) {
//				r = 193;	g = 221;	b = 111;
//			} else if( _type == "하천" ) {
//				r = 0;		g = 192;	b = 254;
//			} else if( _type == "구거" ) {
//				r = 0;		g = 128;	b = 255;
//			} else if( _type == "유지" ) {
//				r = 126;	g = 159;	b = 255;
//			} else if( _type == "양어장" ) {
//				r = 193;	g = 221;	b = 111;
//			} else if( _type == "수도용지" ) {
//				r = 112;	g = 164;	b = 222;
//			} else if( _type == "공원" ) {
//				r = 0;		g = 222;	b = 1;
//			} else if( _type == "체육용지" ) {
//				r = 0;		g = 222;	b = 1;
//			} else if( _type == "유원지" ) {
//				r = 0;		g = 222;	b = 1;
//			} else if( _type == "종교용지" ) {
//				r = 254;	g = 128;	b = 254;
//			} else if( _type == "사적지" ) {
//				r = 255;	g = 249;	b = 5;
//			} else if( _type == "묘지" ) {
//				r = 255;	g = 128;	b = 158;
//			} else if( _type == "잡종지" ) {
//				r = 255;	g = 128;	b = 158;
//			} else {
//				r = 0;	g = 0;	b = 0;
//			}
//			
//			var result_color =	{
//									"r": r,
//									"g": g,
//									"b": b
//								};
//			return result_color;			
//		},
		/* 쿼리한 지적도 폴리곤 정보를 가시화 sumin 201210 */
		update : function() {

			if (this.cadastralLayer == null) {
				var layerList = new Module.JSLayerList(true);
				var layer = layerList.createLayer("CADASTRAL_POLYGON_LAYER", Module.ELT_POLYHEDRON);
				layer.setSelectable(false);
				layer.setMaxDistance(1800.0);
				this.cadastralLayer = layer;
			}

			// 가시 범위 바깥에 카메라가 위치하는 경우
			if (Module.getViewCamera().getDistance() > this.cadastralLayer.getMaxDistance()) {
				return;
			}

			// 현재 화면 rect 가져오기
			var result = IDE.CADASTRAL.getMBRData(this.getScreen5174Rect(), function(data) {

				// 레이어 초기화
				var layer = IDE.CADASTRAL.cadastralLayer;

				// 폴리곤 리스트 로드 상태 초기화
				var polygonList = IDE.CADASTRAL.cadastralPolygons;
				for (FID in polygonList)  {
					polygonList[FID].isLoaded = false;
				}

				for (var i=0; i<data.cadastral.length; i++) {

					var FID = data.cadastral[i].OGR_FID;
					if (typeof polygonList[FID] != 'undefined') {
						polygonList[FID].isLoaded = true;
						continue;
					}

					var polygon = IDE.CADASTRAL.createPolygon(FID, data.cadastral[i].geometry);
					if (polygon == null) {
						continue;
					}

					// 레이어에 추가하고 리스트 업데이트
					layer.addObject(polygon, 0);
					polygonList[FID] = {
						polygon : polygon,
						isLoaded : true
					};
				}

				// 업데이트 안 된 오브젝트 모두 삭제
				for (FID in polygonList)  {
					if (!polygonList[FID].isLoaded) {
						layer.removeAtKey(FID);
						delete polygonList[FID];
					}
				}
			});
		},
		createBoard : function( _objkey, _lon, _lat, _alt, _image, _size, scale )
		{
			var board = Module.createBillboard( _objkey );
			var position = new Module.JSVector3D(_lon, _lat, _alt);
			board.setImage(
							position,
							_image,
							_size["width"],
							_size["height"]
						);
			board.setSizeScale( scale, scale, scale );
			return board;
		},
		createPolyHedron : function( _key, _position, _alt, _height, _fa, _fr, _fg, _fb, _oa, _or, _og, _ob, _positionType )
		{
			if(_positionType == "XY" )	_position = OETC.newsetPosition( _position, 0.0, "XY" );
			else 						_position = OETC.newsetPosition( _position, 0.0, "POLYGON" );
			
			var coordinates = new Module.JSVec3Array(), 
				parts = new Module.Collection();
				
			for(var i = 0; i<_position.length; i++) {
				
				var polygon = _postion[i];

				var position = OETC.transformPosition(
					OETC.setGeometry(5174),
					OETC.setGeometry(4326),
					polygon, _alt
				);
				
				if (position.length < 9) return null;
				
				for( var i=0, len = position.length; i<len; i+=3 ) {
					coordinates.push( new Module.JSVector3D( position[ i ], position[ i+1 ], position[ i+2 ]) );
				}
				parts.add( position.length/3 );
			}
			var polygon = Module.createPolygon( _key );
			var polygonStyle = new Module.JSPolygonStyle(),
				fColor = new Module.JSColor( _fa, _fr, _fg, _fb ),
				oColor = new Module.JSColor( _oa, _or, _og, _ob );
				
			// 채움 색상 설정
			polygonStyle.setFill(true);
			polygonStyle.setFillColor(fColor);
			// 외곽 라인 설정
			polygonStyle.setOutLine(true);
			polygonStyle.setOutLineColor(oColor);
			// 폴리곤 스타일 설정
			polygon.setStyle(polygonStyle);
			
			polygon.setPartCoordinates( coordinates, parts );
			polygon.setHeight( _height );
			return polygon;
			
		},		
		createPolygon : function(key, geometry) {
			
			geometry = OETC.setPosition(geometry, 0.0, "POLYGON");
			geometry = OETC.transformPosition(
				OETC.setGeometry(5174),
				OETC.setGeometry(4326),
				geometry, 50.0
			);
			
			if (geometry.length < 9) {
				return null;
			}
			
			// 오브젝트 생성
			var polygon = Module.createPolygon(key);
			var vertices = new Module.JSVec3Array();
			
			for (var i=0; i<geometry.length; i+=3) {
				vertices.push(new Module.JSVector3D(geometry[i], geometry[i+1], 0.0));
			}

			polygon.create({
				style : "edge",
				coordinate : vertices
			});
			polygon.setSelectable(false);

			return polygon;
		},
		getScreen5174Rect : function() {

			var width = Module.canvas.width;
			var height = Module.canvas.height;
			var scaleheight = 0;

			var map = Module.getMap();
			var tilt = Module.getViewCamera().getTilt();

			if( tilt < 85)	scaleheight = ( ( 90 - tilt) / 100 ) * ( height );

			var leftTop = map.ScreenToMapPointEX(new Module.JSVector2D(0, scaleheight));
			var rightTop = map.ScreenToMapPointEX(new Module.JSVector2D(width, scaleheight));
			var rightBottom = map.ScreenToMapPointEX(new Module.JSVector2D(width, height));
			var leftBottom = map.ScreenToMapPointEX(new Module.JSVector2D(0, height));

			var rectPosition = tCommon.transformCoordinates(
				tCommon.setGeometry(4326),
				tCommon.setGeometry(5174),
				[
					[leftTop.Longitude, leftTop.Latitude, 0],
					[rightTop.Longitude, rightTop.Latitude, 0],
					[rightBottom.Longitude, rightBottom.Latitude, 0],
					[leftBottom.Longitude, leftBottom.Latitude, 0]
				]
			);

			return {
				leftTop : { lon : rectPosition.coordinates[0][0], lat : rectPosition.coordinates[0][1]},
				rightTop : { lon : rectPosition.coordinates[1][0], lat : rectPosition.coordinates[1][1]},
				rightBottom : { lon : rectPosition.coordinates[2][0], lat : rectPosition.coordinates[2][1]},
				leftBottom : { lon : rectPosition.coordinates[3][0], lat : rectPosition.coordinates[3][1]}
			};
		},
		getRectLegendData: function(rect, type, num, _callback) {
			
			if(IDE.CADASTRAL.XHR != null) {
				IDE.CADASTRAL.XHR.abort();
			}
//			var formData = new FormData();

//			formData.append("left_top_lon", rect.leftTop.lon);
//			formData.append("left_top_lat", rect.leftTop.lat);
//			formData.append("right_top_lon", rect.rightTop.lon);
//			formData.append("right_top_lat", rect.rightTop.lat);
//			formData.append("right_bottom_lon", rect.rightBottom.lon);
//			formData.append("right_bottom_lat", rect.rightBottom.lat);
//			formData.append("left_bottom_lon", rect.leftBottom.lon);
//			formData.append("left_bottom_lat", rect.leftBottom.lat);
//			console.log("#################################");
//			if(type == "j") {
//				formData.append("Condition", "J0100");
//				formData.append("Condition_Value", num);
//			}
//			formData.append("control", "getCadastralBuffer");

			var condition;
			var conditionValue;
			
			if(type == "j") {
				condition = "J0100";
				conditionValue = num;
			}
			
			$.ajax({
				type : "POST",
				url : "/com/cop/cadastralInfo/getCadastralInfo.do",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data : {
					leftTopLon : rect.leftTop.lon,
					leftTopLat : rect.leftTop.lat,
					rightTopLon : rect.rightTop.lon,
					rightTopLat : rect.rightTop.lat,
					rightBottomLon : rect.rightBottom.lon,
					rightBottomLat : rect.rightBottom.lat,
					leftBottomLon : rect.leftBottom.lon,
					leftBottomLat : rect.leftBottom.lat,
					column : condition,
					num : conditionValue,
					control : "getCadastralBuffer" 
				},
				dataType : "json",
				success : function(data) {
					console.log("getRectLegendData");
					console.log(data);
					switch(data.resultCode) {
						case "complete" :
							this.callback(data);
						break;
					}
				},
				error:function(request,status,error){
			        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			     },
				callback : _callback
			});	
		},

	},
	LAYER:{
		LID:0,
		divRate:0.5,
		sourceCVID:0,
		targetCVID:0,
		compareSlider:null,
		sliderElement:null,
		isOnSlider:false,
		sourceTitle:null,
		targetTitle:null,
		offsetLeft:null,
		changeCompareDivRate:function() {
			//console.log(sliderElement);
			//console.log(initSliderElement);
			if(IDE.LAYER.isOnSlider == true) {
				IDE.LAYER.divRate = parseFloat(sliderElement.value / 100);
				Module.XDSetSlideScreen(true, IDE.LAYER.divRate);
			}
		},
		loadChangeTargetImageBoard:function() {
			var formData = new FormData();
			formData.append("control", "loadChangeTargetImage");
			formData.append("sourceCVID", IDE.LAYER.sourceCVID);

			$.ajax({
				type: "POST",
				url: "/builder/controller/ide/ctrlIDE.php",
				processData: false,
				contentType: false,
				data:formData,
				success : function(data) {

					var result = JSON.parse(data);

					switch(result.resultCode) {
						case "complete" :

							var rs = result.rs;

							var html = "";
							$.each(rs, function(k, v) {
								var active = "";
								if(v.CVID == IDE.LAYER.targetCVID) {
									active = " imageCompareItemActive";
								}
								html += "<div class=\"col-md-4 t-c imageCompareItem p-t-10 p-b-10"+active+"\" onClick=\"JavaScript:IDE.LAYER.changeCompareImage("+v.CVID+", '"+v.DATA_NAME+"');\">\n";
								html += "	<img src=\""+v.DATA_THUMBNAIL+"\" width=\"100\"><br/>\n";
								html += "	"+v.DATA_NAME+"("+v.REC_DATE+")\n";
								html += "</div>\n";
							});
							$("#imageCompareListRow").html(html);
						break;
					}
				}
			});
		},
		callChangeCompareImageList:function() {
			$("#btnImageCompareChangeImage").css("display", "none");
			$("#imageCompareListWrap").css("display", "block");

			IDE.LAYER.loadChangeTargetImageBoard();
		},
		closeChangeCompareImageList:function() {
			$("#imageCompareListWrap").css("display", "none");
			$("#btnImageCompareChangeImage").css("display", "inline-block");
			$("#imageCompareListRow").html("");
		},
		changeCompareImage:function(cvid, targetTitle) {

			IDE.LAYER.targetTitle = targetTitle;

			IDE.LAYER.closeChangeCompareImageList();

			$("#compareTargetTitle").html("<span class=\"label label label-green\" style=\"opacity:0.6; font-size:10pt;\">"+IDE.LAYER.targetTitle+"</span>");

			Module.XDSetSlideScreenLayerList("", "");
			Module.XDEMapRemoveLayer("IMAGE_DATA_TARGET");
			Module.XDSetSplitScreen(1);
			Module.XDRenderData();
			Module.XDRTTRefresh();

			IDE.LAYER.targetCVID = cvid;

			Module.XDEMapCreateLayer("IMAGE_DATA_TARGET", "http://con.terrasense.co.kr/builder/hadoopFS/"+IDE.GLOBAL.MEM_ID+ "/data/convert/image/" + IDE.LAYER.targetCVID, 0, false, true, true, 10, 0, 19);

			Module.XDRenderData();
			Module.XDRTTRefresh();

			Module.XDSetSlideScreenLayerList("IMAGE_DATA_"+IDE.LAYER.sourceCVID+"", "IMAGE_DATA_TARGET");
			Module.XDSetSlideScreen(true, 0.5);

			$("#SLD_range-handle").css("left", IDE.LAYER.offsetLeft);
		},
		executeImageCompare:function() {
			IDE.LAYER.closeModifyLayerWindow();



			$("#compareSourceTitle").html("<span class=\"label label-primary\" style=\"opacity:0.6; font-size:10pt;\">"+IDE.LAYER.sourceTitle+"</span>");
			$("#compareTargetTitle").html("<span class=\"label label label-green\" style=\"opacity:0.6; font-size:10pt;\">"+IDE.LAYER.targetTitle+"</span>");

			sliderElement.value = 50;

			$("#rangeSliderWrap").css("display", "block");
			$("#rangeSliderWrap").css("top", "calc(50% - 15px)");

			$("#imageCompareTitleWrap").css("display", "block");
			$("#imageCompareCloseWrap").css("display", "block");

			IDE.LAYER.targetCVID = $("#modifyLayerCompareImageList").val();

			Module.XDEMapRemoveLayer("IMAGE_DATA_TARGET");
			Module.XDEMapCreateLayer("IMAGE_DATA_TARGET", "http://con.terrasense.co.kr/builder/hadoopFS/"+IDE.GLOBAL.MEM_ID+ "/data/convert/image/" + IDE.LAYER.targetCVID, 0, false, true, true, 10, 0, 19);

			Module.XDRenderData();
			Module.XDRTTRefresh();

			Module.XDSetSlideScreenLayerList("IMAGE_DATA_"+IDE.LAYER.sourceCVID+"", "IMAGE_DATA_TARGET");
			Module.XDSetSlideScreen(true, 0.5);
			IDE.LAYER.isOnSlider = true;
		},
		closeCompareImage:function() {
			$("#rangeSliderWrap").css("display", "none");
			IDE.LAYER.isOnSlider = false;
			IDE.LAYER.divRate = 0.5;
			sliderElement.value = 50;

			IDE.LAYER.closeChangeCompareImageList();

			$("#imageCompareTitleWrap").css("display", "none");
			$("#imageCompareCloseWrap").css("display", "none");

			$("#compareSourceTitle").html("");
			$("#compareTargetTitle").html("");

			$("#SLD_range-handle").css("left", IDE.LAYER.offsetLeft);

			$("#rangeSliderWrap").css("top", "-500px");

			Module.XDSetSlideScreenLayerList("", "");
			Module.XDEMapRemoveLayer("IMAGE_DATA_TARGET");
			Module.XDSetSplitScreen(1);
			Module.XDRenderData();
			Module.XDRTTRefresh();
		},
		loadImageData:function(cvid) {
			// modifyLayerCompareTargetWrap
			console.log(cvid);

			var formData = new FormData();
			formData.append("control", "loadCompareImageData");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("CVID", cvid);

			$.ajax({
				type: "POST",
				url: "/builder/controller/ide/ctrlIDE.php",
				processData: false,
				contentType: false,
				data:formData,
				success : function(data) {

					var result = JSON.parse(data);

					switch(result.resultCode) {
						case "complete" :
							var rs = result.rsData;
							//console.log(rs);

							IDE.LAYER.targetTitle = rs.DATA_NAME;

							$("#modifyLayerCompareDataThumb").html("<img src=\""+rs.DATA_THUMBNAIL+"\" width=\"160\">");
							var html = "";
							html += "- 데이터명 : "+rs.DATA_NAME+"<br/>\n";
							html += "- 촬영일 : "+rs.REC_DATE+" , 등록일 : "+rs.REG_DATE+"<br/>\n";
							html += "- WIDTH : "+rs.WIDTH+" , HEIGHT : "+rs.HEIGHT+"<br/>\n";
							html += "- RESOLUTION " +rs.RESOLUTION+" , - 좌표계 : "+IDE.UTIL.getCoordTypeByName(rs.COORD_TYPE)+"<br/>\n";
							html += "- MINX : "+rs.MINX+", MINY : "+rs.MINY+"<br/>\n";
							html += "- MAXX : "+rs.MAXX+", MAXY : "+rs.MAXY+"<br/>\n";
							html += "- BANDS : "+rs.BANDS+", BITS : "+rs.BITS+"\n";
							$("#modifyLayerCompareDataInfo").html(html);
						break;
					}
				}
			});
		},
		changeLayerGroup:function() {
			var formData = new FormData();
			formData.append("control", "changeLayerGroup");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("LID", IDE.LAYER.LID);
			formData.append("MLGID", $("#mapLayerGroup").val());
			$.ajax({
				type: "POST",
				url: "/builder/controller/ide/ctrlIDE.php",
				processData: false,
				contentType: false,
				data:formData,
				success : function(data) {

					var result = JSON.parse(data);

					switch(result.resultCode) {
						case "complete" :

							if(result.MLGID == 0) {
								$("#defaultGroupTree").append($("#mapLayerItem_"+result.LID+""));
							} else {
								$("#layerGroupTree_"+result.MLGID+"").append($("#mapLayerItem_"+result.LID+""));
							}

						break;

						default :
							alert('레이어 그룹을 변경할 수 없습니다. 관리자에게 문의하세요.');
							return false;
						break;
					}
				}
			});
		},
		modifyLayer:function(LID) {

			IDE.LAYER.LID = LID;

			var formData = new FormData();
			formData.append("control", "loadLayerInfo");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("LID", LID);

			$.ajax({
				type: "POST",
				url: "/builder/controller/ide/ctrlIDE.php",
				processData: false,
				contentType: false,
				data:formData,
				success : function(data) {

					var result = JSON.parse(data);
					console.log(result);

					switch(result.resultCode) {
						case "complete" :
							var rs = result.rs;
							var rsData = result.rsData;
							var rsLayerGroup = result.rsLayerGroup;

							IDE.LAYER.sourceCVID = result.sourceCVID;

							console.log(rs);
							console.log(rsData);

							$("#mapLayerGroup").empty();

							$("#mapLayerGroup").append("<option value=\"0\">기본 그룹</option>");

							IDE.LAYER.callModifyLayerWindow();
							$("#modifyLayerHead").html(rs.LAYER_NAME+" <a href=\"javascript:IDE.LAYER.callChangeLayerName("+rs.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a>");

							$.each(rsLayerGroup, function(k, v) {
								$("#mapLayerGroup").append(new Option(""+v.GROUP_NAME+"", ""+v.MLGID+""));
							});

							// 현재 그룹 자동 선택
							$("#mapLayerGroup").val(""+rs.MLGID+"").prop("selected", true);

							IDE.LAYER.sourceTitle = rs.LAYER_NAME;


							$("#modifyLayerInfoWrap").html("");

							$("#modifyImageConpareWrap").css("display", "none");

							var layerType = "";


							switch(parseInt(rs.LAYER_TYPE)) {
								case 1:
									// CSV
								break;

								case 2:
									// GPX
								break;

								case 3:
									// KML
								break;

								case 4:
									// SHP
								break;

								case 5:
									// PNG
								break;

								case 6:
									// LAS
									layerType = "[포인트클라우드]";

									//$("#modifyLayerInfoWrap").html(html);
									var html = "";
									html += "<table class=\"table\">\n";
									html += "<tr>\n";
									html += "	<td style=\"width:20%\"><span class=\"label label-inverse p-t-5 p-b-5\">높이변경</span></td>\n";
									html += "	<td><div class=\"form-inline\"><input type=\"number\" class=\"form-control form-control-sm\" style=\"width:80px\" placeHolder=\"높이값\" id=\"modifyPointCloudDemAlt\"> <a href=\"JavaScript:IDE.DATA.POINTCLOUD.changePointCloudHeight("+IDE.LAYER.LID+");\"><button class=\"btn btn-green m-l-5 btn-sm\">변경</button></a></div></td>\n";
									html += "</tr>\n";
									html += "</table>\n";

									/*
									html += "<div class=\"row m-t-10\">\n";
									html += "	<div class=\"col-md-2 m-t-7\"><span class=\"label label-inverse p-t-5 p-b-5\">높이변경</span></div>\n";
									html += "	<div class=\"col-md-8 m-t-2\"><input type=\"text\" class=\"forn-control form-control-sm\" placeholder=\"높이값\" id=\"modifyPointCloudHeightValue\"></div>\n";
									html += "	<div class=\"col-md-2 m-t-3\"><a href=\"JavaScript:IDE.DATA.POINTCLOUD.changePointCloudHeight("+IDE.LAYER.LID+");\"><button type=\"button\" class=\"btn btn-yellow btn-sm\">변경</button></a></div>\n";
									html += "</div>\n";
									*/
									$("#modifyLayerInfoWrap").html(html);
								break;

								case 7:
									// 3DS
								break;

								case 31:
									// PHOTO
								break;

								case 32:
									// SPATIAL
								break;

								case 33:
									// INTEREST POINT
									layerType = "[관심지점]";
									// modifyLayerInfoWrap
									var rsInterest = result.rsInterest;
									IDE.TOOL.INTEREST.LID = rs.LID;
									IDE.TOOL.INTEREST.IID = rsInterest.IID;

									var html = "";
									html += "<table class=\"table table-bordered\">\n";
									html += "<tr>\n";
									html += "	<td colspan=\"2\"><b><i class=\"fa fa-comments\"></i> 관심지점 의견</b></td>\n";
									html += "	<td></td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td width=\"20%\">제목</td>\n";
									html += "	<td id=\"modifyInterestPointMessageTitle\" colspan=\"2\">"+rsInterest.TITLE+"</td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td>내용</td>\n";
									if(rsInterest.IMAGE_URL != "") {
										html += "	<td id=\"modifyInterestPointMessageContent\" colspan=\"2\"><img src=\""+rsInterest.IMAGE_URL+"\" width=\"200\"><br/>"+rsInterest.COMMENT+"</td>\n";
									} else {
										html += "	<td id=\"modifyInterestPointMessageContent\" colspan=\"2\">"+rsInterest.COMMENT+"<br/><small>"+rsInterest.REG_DATE+"</small></td>\n";
									}
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td colspan=\"3\">\n";
									html += "		<ul id=\"modifyInterestPointMessageList\" class=\"m-l-10\" style=\"padding-left:15px !important;\"></ul>\n";
									html += "	</td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td><input type=\"text\" class=\"form-control form-control-sm\" id=\"modifyInterestPointOtherName\" placeholder=\"이름\"></td>\n";
									html += "	<td><input type=\"text\" class=\"form-control form-control-sm\" id=\"modifyInterestPointOtherCont\" placeholder=\"내용\"></td>\n";
									html += "	<td width=\"20%\"><a href=\"JavaScript:IDE.TOOL.INTEREST.addModifyInterestComment();\"><button class=\"btn btn-primary btn-sm\">등록</button></a></td>\n";
									html += "</tr>\n";
									html += "</table>\n";
									$("#modifyLayerInfoWrap").html(html);

									// ADD INTEREST INFO
									// rsInterest

									// ADD COMMENT LIST
									if(result.rsInterestComment.length == 0) {
										html = "<li id=\"modifyInterestPointMessageDefault\">등록된 의견이 없습니다.</li>";
										$("#modifyInterestPointMessageList").append(html);
									} else {
										//rsInterestComment
										$("#modifyInterestPointMessageList").empty();
										$.each(result.rsInterestComment, function(k, v) {
											var html = "<li id=\"interestPointMessageListItem_"+v.ITCID+"\">"+v.COMMENT+" - "+v.NAME+" <small>"+v.REG_DATE+"</small></li>";
											$("#modifyInterestPointMessageList").append(html);
										});
									}
								break;

								case 51:
									// TERRAIN
									layerType = "[지형]";

									var html = "";
									html += "<table class=\"table\" style=\"background:#FFFFFF; font-size:8pt;\">\n";
									html += "<tbody>\n";
									html += "<tr>\n";
									html += "	<td colspan=\"3\" class=\"p-l-30\">- 촬영일 : "+rsData.REC_DATE+"<br/>- 등록일 : "+rsData.REG_DATE+"</td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td rowspan=\"6\" class=\"t-c\"><a href=\""+rsData.DATA_THUMBNAIL+"\" target=\"_blank\"><img src=\""+rsData.DATA_THUMBNAIL+"\" width=\"150\"></a></td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td>- MINX : "+rsData.MINX+"</td>\n";
									html += "	<td>- MINY : "+rsData.MINY+"</td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td>- MAXX : "+rsData.MAXX+"</td>\n";
									html += "	<td>- MAXY : "+rsData.MAXY+"</td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td>- WIDTH : "+rsData.WIDTH+"</td>\n";
									html += "	<td>- HEIGHT : "+rsData.HEIGHT+"</td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td>- BANDS : "+rsData.BANDS+"</td>\n";
									html += "	<td>- BITS : "+rsData.BITS+"</td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td>- RESOLUTION : "+rsData.RESOLUTION+"</td>\n";
									html += "	<td>- 좌표계 : "+IDE.UTIL.getCoordTypeByName(rsData.COORD_TYPE)+"</td>\n";
									html += "</tr>\n";
									html += "</tbody>\n";
									html += "</table>\n";

									$("#modifyLayerInfoWrap").html(html);
								break;

								case 52:
									$("#modifyImageConpareWrap").css("display", "flex");
									// IMAGE
									layerType = "[영상]";

									var html = "";
									html += "<table class=\"table\" style=\"background:#FFFFFF; font-size:8pt;\">\n";
									html += "<tbody>\n";
									html += "<tr>\n";
									html += "	<td colspan=\"3\" class=\"p-l-30\">- 촬영일 : "+rsData.REC_DATE+"<br/>- 등록일 : "+rsData.REG_DATE+"</td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td rowspan=\"6\" class=\"t-c\"><a href=\""+rsData.DATA_THUMBNAIL+"\" target=\"_blank\"><img src=\""+rsData.DATA_THUMBNAIL+"\" width=\"150\"></a></td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td>- MINX : "+rsData.MINX+"</td>\n";
									html += "	<td>- MINY : "+rsData.MINY+"</td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td>- MAXX : "+rsData.MAXX+"</td>\n";
									html += "	<td>- MAXY : "+rsData.MAXY+"</td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td>- WIDTH : "+rsData.WIDTH+"</td>\n";
									html += "	<td>- HEIGHT : "+rsData.HEIGHT+"</td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td>- BANDS : "+rsData.BANDS+"</td>\n";
									html += "	<td>- BITS : "+rsData.BITS+"</td>\n";
									html += "</tr>\n";
									html += "<tr>\n";
									html += "	<td>- RESOLUTION : "+rsData.RESOLUTION+"</td>\n";
									html += "	<td>- 좌표계 : "+IDE.UTIL.getCoordTypeByName(rsData.COORD_TYPE)+"</td>\n";
									html += "</tr>\n";
									html += "</tbody>\n";
									html += "</table>\n";

									$("#modifyLayerInfoWrap").html(html);

									var rsImage = result.rsImage;

									$.each(rsImage, function(k, v) {
										$("#modifyLayerCompareImageList").append(new Option(""+v.DATA_NAME+" | "+v.REG_DATE+"", ""+v.CVID+""));
									});


								break;

								case 53:
									// FACILITIES
								break;

								case 91:
									// SHAPE
									layerType = "[SHAPE]";
								break;
							}
						break;
					}

					$("#modifyLayerType").html(layerType);
				}
			});
		},
		callModifyLayerWindow:function() {
			$("#sideLayerInfoImage").css("display", "block");
		},
		closeModifyLayerWindow:function() {
			$("#sideLayerInfoImage").css("display", "none");
		},
		callChangeLayerName:function(LID) {

			IDE.LAYER.LID = LID;

			var formData = new FormData();
			formData.append("control", "loadChangeLayerName");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("LID", LID);

			$.ajax({
				type: "POST",
				url: "/builder/controller/ide/ctrlIDE.php",
				processData: false,
				contentType: false,
				data:formData,
				success : function(data) {

					var result = JSON.parse(data);

					switch(result.resultCode) {
						case "complete" :
							$("#editLayerName").modal('show');
							var rs = result.rs;
							$("#modifyLayerName").val(result.LAYER_NAME);
							$("#modifyLayerName").focus();
						break;
					}
				}
			});
		},
		confirmChangeLayerName:function() {
			var formData = new FormData();
			formData.append("control", "confirmChangeLayerName");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("LID", IDE.LAYER.LID);
			formData.append("layerName", $("#modifyLayerName").val());

			$.ajax({
				type: "POST",
				url: "/builder/controller/ide/ctrlIDE.php",
				processData: false,
				contentType: false,
				data:formData,
				success : function(data) {

					var result = JSON.parse(data);

					switch(result.resultCode) {
						case "complete" :
							$("#modifyLayerName").val("");
							$("#editLayerName").modal('hide');

							$("#mapLayerItemTitle_"+IDE.LAYER.LID).html(result.LAYER_NAME);

							$("#modifyLayerHead").html(result.LAYER_NAME+" <a href=\"javascript:IDE.LAYER.callChangeLayerName("+IDE.LAYER.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a>");
						break;
					}
				}
			});
		},
		deleteLayer:function(LID) {
			if(!confirm('해당 레이어를 삭제하시겠습니까?')) {
				return false;
			}

			var formData = new FormData();
			formData.append("control", "loadDeleteLayerInfo");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("LID", LID);

			$.ajax({
				type: "POST",
				url: "/builder/controller/ide/ctrlIDE.php",
				processData: false,
				contentType: false,
				data:formData,
				success : function(data) {

					var result = JSON.parse(data);

					switch(result.resultCode) {
						case "complete" :
							var rs = result.rs;

							console.log(rs);

							switch(parseInt(rs.LAYER_TYPE)) {
								case 1:
										// CSV
								break;

								case 2:
									// GPX
								break;

								case 3:
									// KML
								break;

								case 4:
									// SHP
								break;

								case 5:
									// PNG
								break;

								case 6:
									// LAS

									Module.XDEMapRemoveLayer("POINT_CLOUD_"+rs.DATAID+"");
									Module.XDRenderData();
									Module.XDRTTRefresh();
									$("#mapLayerItem_"+rs.LID).remove();

								break;

								case 7:
									// 3DS
									Module.XDEMapRemoveLayer(rs.LAYER_KEY);
									Module.XDRenderData();
									Module.XDRTTRefresh();
									$("#mapLayerItem_"+rs.LID).remove();
								break;

								case 31:
									// PHOTO
								break;

								case 32:
									// SPATIAL
								break;

								case 33:
									// 관심지점
								break;

								case 51:
									// TERRAIN
									$("#mapLayerItem_"+rs.LID).remove();
								break;

								case 52:
									// IMAGE
									Module.XDEMapRemoveLayer("IMAGE_DATA_"+rs.CVID+"");
									Module.XDRenderData();
									Module.XDRTTRefresh();
									$("#mapLayerItem_"+rs.LID).remove();

								break;

								case 53:
									// FACILITIES
								break;

								case 71:
									// DATASOURCE_WMS
								break;

								case 72:
									// DATASOURCE_WFS
								break;

								case 91:
									// GEOSERVER_WMS
									Module.XDEMapRemoveLayer(""+rs.WMS_FULLNAME+"");
									Module.XDRenderData();
									Module.XDRTTRefresh();
									$("#mapLayerItem_"+rs.LID).remove();
								break;
							}

							IDE.LAYER.confirmDeleteLayer(rs.LID);
						break;
					}
				}
			});
		},
		confirmDeleteLayer:function(LID) {
			var formData = new FormData();
			formData.append("control", "deleteLayer");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("LID", LID);

			$.ajax({
				type: "POST",
				url: "/builder/controller/ide/ctrlIDE.php",
				processData: false,
				contentType: false,
				data:formData,
				success : function(data) {

					var result = JSON.parse(data);

					switch(result.resultCode) {
						case "complete" :
							$("#mapLayerItem_"+LID).remove();
						break;
					}
				}
			});
		}
	},
	MAP:{
		OBJ:null,
		saveMapWithCoord:function(x, y) {

			var formData = new FormData();
			formData.append("control", "saveMapWithCoord");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("x", x);
			formData.append("y", y);

			$.ajax({
				type: "POST",
				url: "/builder/controller/ide/ctrlIDE.php",
				processData: false,
				contentType: false,
				data:formData,
				success : function(data) {

					var result = JSON.parse(data);

					switch(result.resultCode) {
						case "complete" :

						break
					}
				}
			});

		},
		moveMapCoord:function() {
			//console.log(IDE.MAP.OBJ);

			if(IDE.MAP.OBJ.MOVE_LAT != null && IDE.MAP.OBJ.MOVE_LON != null && IDE.MAP.OBJ.MOVE_LAT != "" && IDE.MAP.OBJ.MOVE_LON != "") {
				Module.getViewCamera().setViewAt(parseFloat(IDE.MAP.OBJ.MOVE_LON), parseFloat(IDE.MAP.OBJ.MOVE_LAT), 1000, 45, 0);
			}

		},
		callSaveMap:function() {
			//IDE.MAP.OBJ
			$("#modalSaveMap").modal("show");

			$("#saveMapName").val(IDE.MAP.OBJ.MAP_NAME);
		},
		saveMap:function() {
			var formData = new FormData();
			formData.append("control", "saveMap");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("mapName", $("#saveMapName").val());

			$.ajax({
				type: "POST",
				url: "/builder/controller/ide/ctrlIDE.php",
				processData: false,
				contentType: false,
				data:formData,
				success : function(data) {

					var result = JSON.parse(data);

					switch(result.resultCode) {
						case "complete" :
							alert('지도가 저장됐습니다');
							IDE.MAP.saveThumbnail(true);
						break
					}
				}
			});
		},
		saveThumbnail:function(isCoord) {

			var mapCanvas = document.getElementById("canvas");

			var imageData = mapCanvas.toDataURL("image/jpeg");

			imageData = imageData.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

			var lon = Module.getViewCamera().getLon(); 	// 경도
			var lat = Module.getViewCamera().getLat();	// 위도
			var alt = Module.getViewCamera().getAlt();	// 높이
			var angle = Module.getViewCamera().getTilt();	// 카메라 내려다보는 각도
			var heading = Module.getViewCamera().getHeading()	// 방위각

			console.log(isCoord, lon, lat, alt, angle, heading);

			var saveCoord = "N";

			if(isCoord) saveCoord = "Y";

			var formData = new FormData();
			formData.append("control", "saveThumbnail");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("thumbData", imageData);
			formData.append("lon", parseFloat(lon));
			formData.append("lat", parseFloat(lat));
			formData.append("alt", parseFloat(alt));
			formData.append("angle", parseFloat(angle));
			formData.append("heading", parseFloat(heading));
			formData.append("saveCoord", saveCoord);

			$.ajax({
				type: "POST",
				url: "/builder/controller/ide/ctrlIDE.php",
				processData: false,
				contentType: false,
				data:formData,
				success : function(data) {

					var result = JSON.parse(data);

					switch(result.resultCode) {
						case "complete" :
							IDE.MAP.OBJ = result.rs;
							$("#modalSaveMap").modal("hide");

							$("#ideMapTitleCont").html(IDE.MAP.OBJ.MAP_NAME);
						break;
					}
				},
				error : function(request,status,error) {
					alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
			});
		},
		loadMapInfo:function() {
			var formData = new FormData();
			formData.append("control", "loadMapInfo");
			formData.append("MAPID", IDE.GLOBAL.MAPID);

			$.ajax({
				url: "/builder/controller/ide/ctrlIDE.php",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function(result) {
					var result = JSON.parse(result);
					//console.log(result);

					switch(result.resultCode) {
						case "complete" :
							var rs = result.rs;

							IDE.MAP.OBJ = rs;
							IDE.GLOBAL.MEM_ID = result.MEM_ID;

							//console.log(rs);
							$("#ideMapTitleCont").html(rs.MAP_NAME);

							IDE.MAP.loadLayerGroup();



						break;

						default :
							alert('지도 정보를 불러올 수 없습니다.');
							document.history.go(-1);
							return false;
						break;
					}
				}
			});
		},
		loadLayerGroup:function() {
			var formData = new FormData();
			formData.append("control", "loadLayerGroup");
			formData.append("MAPID", IDE.GLOBAL.MAPID);

			$.ajax({
				url: "/builder/controller/ide/ctrlIDE.php",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function(result) {
					var result = JSON.parse(result);
					//console.log(result);

					switch(result.resultCode) {
						case "complete" :
							var rs = result.rs;

							/*
							var html = "";
							html += "<li id=\"layerGroup_"+rs.MLGID+"\" class=\"m-t-10 layerGroup\">\n";
							html += "	<div class=\"groupTitle\" id=\"layerGroupTitle_"+rs.MLGID+"\">\n";
							html += "		<i class=\"fa fa-folder-open\"></i> "+rs.GROUP_NAME+" <a href=\"javascript:IDE.LAYERGROUP.callChangeGroupName("+rs.MLGID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a>\n";
							html += "	</div>\n";
							html += "	<ul class=\"layerTreeWrap m-t-5\" id=\"layerGroupTree_"+rs.MLGID+"\">\n";
							html += "	</ul>\n";
							html += "</li>\n";

							$("#IDELayerTree").append(html);
							*/

							//console.log(rs);

							var html = "";

							$.each(rs, function(k, v) {
								html += "<li id=\"layerGroup_"+v.MLGID+"\" class=\"m-t-10 layerGroup\">\n";
								html += "	<div class=\"groupTitle\" id=\"layerGroupTitle_"+v.MLGID+"\">\n";
								html += "		<i class=\"fa fa-folder-open\"></i> "+v.GROUP_NAME+" <a href=\"javascript:IDE.LAYERGROUP.callChangeGroupName("+v.MLGID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"javascript:IDE.MAP.deleteLayerGroup("+v.MLGID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a>\n";
								html += "	</div>\n";
								html += "	<ul class=\"layerTreeWrap m-t-5\" id=\"layerGroupTree_"+v.MLGID+"\">\n";
								html += "	</ul>\n";
								html += "</li>\n";
							});

							$("#IDELayerTree").append(html);

							// Layer Load
							IDE.MAP.loadLayerList();
						break;
					}
				}
			});
		},
		deleteLayerGroup:function(mlgid) {
			if(!confirm('해당 그룹을 삭제하시겠습니까? 해당그룹에 속한 레이어는 기본그룹으로 이동됩니다.')) {
				return false;
			}
			var formData = new FormData();
			formData.append("control", "deleteLayerGroup");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("MLGID", mlgid);

			$.ajax({
				url: "/builder/controller/ide/ctrlIDE.php",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function(result) {
					var result = JSON.parse(result);
					//console.log(result);

					switch(result.resultCode) {
						case "complete" :
							var rsLID = result.rsLID;

							$.each(rsLID, function(k, v) {

								$("#defaultGroupTree").append($("#mapLayerItem_"+v.LID+""));
							});

							var MLGID = result.MLGID;
							$("#layerGroupTree_"+MLGID).remove();
							$("#layerGroup_"+MLGID).remove();

						break;
					}
				}
			});
		},
		loadLayerList:function() {
			var formData = new FormData();
			formData.append("control", "loadLayerList");
			formData.append("MAPID", IDE.GLOBAL.MAPID);

			$.ajax({
				url: "/builder/controller/ide/ctrlIDE.php",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function(result) {
					var result = JSON.parse(result);
					//console.log(result);

					switch(result.resultCode) {
						case "complete" :
							var rs = result.rs;
							$.each(rs, function(k, v) {
								switch(parseInt(v.LAYER_TYPE)) {
									case 1:
										// CSV
										var html = "";
										html += "<li id=\"mapLayerItem_"+v.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"csvData_"+v.LID+"\" checked/>[CSV] <a href=\"JavaScript:IDE.DATA.CSV.moveDataCoord("+v.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+v.LID+"\">"+v.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+v.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+v.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+v.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

										if(parseInt(v.MLGID) == 0) {
											$("#defaultGroupTree").prepend(html);

										} else {
											$("#layerGroupTree_"+v.MLGID+"").prepend(html);
										}

										$("#pointcloudData_"+v.LID).change(function() {
											if($(this).is(":checked")) {
												//IDE.DATA.POINTCLOUD.showHideControl("POINT_CLOUD_"+v.DATAID+"", "SHOW");
											} else {
												//IDE.DATA.POINTCLOUD.showHideControl("POINT_CLOUD_"+v.DATAID+"", "HIDE");
											}
										});
									break;

									case 2:
										// GPX
									break;

									case 3:
										// KML
									break;

									case 4:
										// SHP
									break;

									case 5:
										// PNG
									break;

									case 6:
										// LAS

										var html = "";
										html += "<li id=\"mapLayerItem_"+v.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"pointcloudData_"+v.LID+"\" checked/>[LAS] <a href=\"JavaScript:IDE.DATA.POINTCLOUD.moveDataCoord("+v.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+v.LID+"\">"+v.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+v.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+v.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+v.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

										if(parseInt(v.MLGID) == 0) {
											$("#defaultGroupTree").prepend(html);

										} else {
											$("#layerGroupTree_"+v.MLGID+"").prepend(html);
										}

										$("#pointcloudData_"+v.LID).change(function() {
											if($(this).is(":checked")) {
												IDE.DATA.POINTCLOUD.showHideControl("POINT_CLOUD_"+v.DATAID+"", "SHOW");
											} else {
												IDE.DATA.POINTCLOUD.showHideControl("POINT_CLOUD_"+v.DATAID+"", "HIDE");
											}
										});


										Module.XDEMapCreateLayer("POINT_CLOUD_"+v.DATAID+"","http://con.terrasense.co.kr/builder/hadoopFS/"+result.MEM_ID+"/data/pointcloud/"+v.DATAID+"",0, false, true, true, 19, 0, 19);
										Module.setVisibleRange("POINT_CLOUD_"+v.DATAID+"", 2.0, 100000);
										Module.XDRenderData();

									break;

									case 7:
										// 3DS
										IDE.DATA.MODEL_3DS.add3DSModel(v.DATAID, "N");
									break;

									case 31:
										// PHOTO
									break;

									case 32:
										// SPATIAL
									break;

									case 33:
										// 관심지점
										var html = "";
										html += "<li id=\"mapLayerItem_"+v.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"interestData_"+v.LID+"\" checked/>[관심] <a href=\"JavaScript:IDE.TOOL.INTEREST.moveDataCoord("+v.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+v.LID+"\">"+v.LAYER_NAME+"</span><span id=\"mapLayerItemCommentCnt_"+v.LID+"\">("+v.INTEREST_COMMENT_COUNT+")</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+v.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+v.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+v.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

										//$("#defaultGroupTree").prepend(html);

										if(parseInt(v.MLGID) == 0) {
											$("#defaultGroupTree").prepend(html);

										} else {
											$("#layerGroupTree_"+v.MLGID+"").prepend(html);
										}

									break;

									case 51:
										// TERRAIN
										var html = "";
										html += "<li id=\"mapLayerItem_"+v.LID+"\" class=\"layerItem\">[지형] <a href=\"JavaScript:IDE.DATA.TERRAIN.moveDataCoord("+v.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+v.LID+"\">"+v.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+rs.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+v.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+v.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

										//$("#defaultGroupTree").prepend(html);

										if(parseInt(v.MLGID) == 0) {
											$("#defaultGroupTree").prepend(html);

										} else {
											$("#layerGroupTree_"+v.MLGID+"").prepend(html);
										}

										Module.getMap().ClearMap();
										Module.getMap().SetDataAPI();
										//Module.SetPlanetImageryType(0);

										Module.getMap().SetServerData("con.terrasense.co.kr/builder/hadoopFS/", ""+result.MEM_ID+"/data/convert/terrain", ""+v.CVID+"", "bil", 0);//지형
										// MIN / MAX
										var ptMin = IDE.UTIL.transformCoord(v.MINX, v.MINY, v.COORD_TYPE);
										var ptMax = IDE.UTIL.transformCoord(v.MAXX, v.MAXY, v.COORD_TYPE);

										Module.getMap().SetDemBox(parseFloat(ptMin.x),parseFloat(ptMin.y),parseFloat(ptMax.x),parseFloat(ptMax.y), 20);

										IDE.TOOL.TERRAIN.DATAID = v.DATAID;
										//Module.XDEMapCreateLayer("YONGIN_SUNGBOK","http://www.egiscloud.com/builder/hadoopFS/terraexpo/data/convert/image/529",0,false,true,true,10,5,21, 0);
										Module.SetPlanetImageryType(-1);
									break;

									case 52:
										// IMAGE
										var html = "";
										html += "<li id=\"mapLayerItem_"+v.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"imageData_"+v.LID+"\" checked/>[영상] <a href=\"JavaScript:IDE.DATA.IMAGE.moveDataCoord("+v.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+v.LID+"\">"+v.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+v.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+v.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+v.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

										//$("#defaultGroupTree").prepend(html);

										if(parseInt(v.MLGID) == 0) {
											$("#defaultGroupTree").prepend(html);

										} else {
											$("#layerGroupTree_"+v.MLGID+"").prepend(html);
										}

										$("#imageData_"+v.LID).change(function() {
											if($(this).is(":checked")) {
												IDE.DATA.IMAGE.showHideControl("IMAGE_DATA_"+v.CVID+"", "SHOW");
											} else {
												IDE.DATA.IMAGE.showHideControl("IMAGE_DATA_"+v.CVID+"", "HIDE");
											}
										});

										Module.XDEMapRemoveLayer("IMAGE_DATA_"+v.CVID+"");
										Module.XDEMapCreateLayer("IMAGE_DATA_"+v.CVID+"","http://con.terrasense.co.kr/builder/hadoopFS/"+result.MEM_ID+"/data/convert/image/"+v.CVID+"",0,false,true,true,10,5,21);
										Module.XDRenderData();
										Module.XDRTTRefresh();
									break;

									case 53:
										// FACILITIES
									break;

									case 71:
										// DATASOURCE_WMS
									break;

									case 72:
										// DATASOURCE_WFS
									break;

									case 91:
										// GEOSERVER_WMS
										var html = "";
										html += "<li id=\"mapLayerItem_"+v.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"shapeData_"+v.LID+"\" checked/>[SHP] <a href=\"JavaScript:IDE.DATA.SHAPE.moveDataCoord("+v.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+v.LID+"\">"+v.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+v.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+v.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+v.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

										if(parseInt(v.MLGID) == 0) {
											$("#defaultGroupTree").prepend(html);
										} else {
											$("#layerGroupTree_"+v.MLGID+"").prepend(html);
										}

										$("#shapeData_"+v.LID).change(function() {
											if($(this).is(":checked")) {
												IDE.DATA.SHAPE.showHideControl(""+v.WMS_FULLNAME+"", "SHOW");
											} else {
												IDE.DATA.SHAPE.showHideControl(""+v.WMS_FULLNAME+"", "HIDE");
											}
										});

										Module.XDEMapCreateWMSLayer(""+v.WMS_FULLNAME+"", "http://www.terrasense.co.kr", parseInt(18195), "geoserver/wms?", "", 10, 21, 256,"1.1.0");

										Module.XDRenderData();
										Module.XDRTTRefresh();
									break;

									case 111:
										var html = "";
										html += "<li id=\"mapLayerItem_"+v.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"loadModelData_"+v.LID+"\" checked/>[MODEL] <a href=\"JavaScript:IDE.DATA.LOD_MODEL.moveDataCoord("+v.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+v.LID+"\">"+v.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+v.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+v.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+v.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

										if(parseInt(v.MLGID) == 0) {
											$("#defaultGroupTree").prepend(html);
										} else {
											$("#layerGroupTree_"+v.MLGID+"").prepend(html);
										}


										$("#loadModelData_"+v.LID).change(function() {
											if($(this).is(":checked")) {
												IDE.DATA.LOD_MODEL.showHideControl(""+v.XDLAYER_NAME+"", "SHOW");
											} else {
												IDE.DATA.LOD_MODEL.showHideControl(""+v.XDLAYER_NAME+"", "HIDE");
											}
										});

										Module.XDEMapRemoveLayer(""+v.XDLAYER_NAME+"");
										Module.XDEMapCreateLayer(""+v.XDLAYER_NAME+"","http://con.terrasense.co.kr:8080",0,false,true,false,20,12,12,0); // dorne model
										Module.setVisibleRange(""+v.XDLAYER_NAME+"", 1.0, 1000);

									break;

									case 141:
										// Drone Route;
										var html = "";
										html += "<li id=\"mapLayerItem_"+v.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"droneRouteData_"+v.LID+"\" checked/>[DRONE] <a href=\"JavaScript:IDE.DATA.DRONE_ROUTE.moveDataCoord("+v.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+v.LID+"\">"+v.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+v.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+v.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+v.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

										if(parseInt(v.MLGID) == 0) {
											$("#defaultGroupTree").prepend(html);
										} else {
											$("#layerGroupTree_"+v.MLGID+"").prepend(html);
										}

										IDE.DATA.DRONE_ROUTE.loadDroneRoute(v.RID);


									break;
								}
							});


							setTimeout(function() {
								IDE.MAP.moveMapCoord();
							}, 1000);
						break;

					}
				}
			});
		}
	},
	LAYERGROUP:{
		MLGID:null,
		callChangeGroupName:function(mlgid) {

			var formData = new FormData();
			formData.append("control", "loadGroupName");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("MLGID", mlgid);

			$.ajax({
				url: "/builder/controller/ide/ctrlIDE.php",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function(result) {
					var result = JSON.parse(result);
					//console.log(result);

					switch(result.resultCode) {
						case "complete" :
							IDE.LAYERGROUP.MLGID = mlgid;
							$("#editGroupModal").modal("show");
							$("#modifyGroupName").val(result.groupName);
							$("#modifyGroupName").focus();
						break;

					}
				}
			});
		},
		confirmChangeGroupName:function() {
			var formData = new FormData();
			formData.append("control", "conformChangeGroupName");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("MLGID", IDE.LAYERGROUP.MLGID);
			formData.append("groupName", $("#modifyGroupName").val());

			$.ajax({
				url: "/builder/controller/ide/ctrlIDE.php",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function(result) {
					var result = JSON.parse(result);
					//console.log(result);

					switch(result.resultCode) {
						case "complete" :
							$("#editGroupModal").modal("hide");
							var rs = result.rs;
							$("#layerGroupTitle_"+rs.MLGID+"").html("");
							var html = "";
							html += "		<i class=\"fa fa-folder-open\"></i> "+rs.GROUP_NAME+" <a href=\"javascript:IDE.LAYERGROUP.callChangeGroupName("+rs.MLGID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a>\n";

							$("#layerGroupTitle_"+rs.MLGID+"").html(html);

							$("#modifyGroupName").val("");

						break;

					}
				}
			});
		},
		confirmChangeDefaultGroupName:function() {
			var formData = new FormData();
			formData.append("control", "confirmChangeDefaultGroupName");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("defGroupName", $("#modifyDefaultGroupName").val());

			$.ajax({
				url: "/builder/controller/ide/ctrlIDE.php",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function(result) {
					var result = JSON.parse(result);
					//console.log(result);

					switch(result.resultCode) {
						case "complete" :
							$("#editDefaultGroupModal").modal('hide');
							$("#modifyDefaultGroupName").val("");

							$("#defaultGroupTitle").html(result.defGroupName);
						break;
					}
				}
			});
		},
		callChangeDefaultGroupName:function() {

			var formData = new FormData();
			formData.append("control", "loadDefaultGroupName");
			formData.append("MAPID", IDE.GLOBAL.MAPID);

			$.ajax({
				url: "/builder/controller/ide/ctrlIDE.php",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function(result) {
					var result = JSON.parse(result);
					//console.log(result);

					switch(result.resultCode) {
						case "complete" :
							$("#editDefaultGroupModal").modal('show');

							$("#modifyDefaultGroupName").val(result.defGroupName);
							$("#modifyDefaultGroupName").focus();
						break;
					}
				}
			});

		},
		callAddLayerGroup:function() {
			$("#addGroupModal").modal("show");

			$("#addGroupName").focus();
		},
		addGroup:function() {
			if($("#addGroupName").val() == "") {
				alert('그룹명을 입력하세요');
				$("#addGroupName").focus();
				return false;
			}

			var formData = new FormData();
			formData.append("control", "addLayerGroup");
			formData.append("MAPID", IDE.GLOBAL.MAPID);
			formData.append("groupName", $("#addGroupName").val());

			$.ajax({
				url: "/builder/controller/ide/ctrlIDE.php",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function(result) {
					var result = JSON.parse(result);
					//console.log(result);

					switch(result.resultCode) {
						case "complete" :
							$("#addGroupModal").modal("hide");
							console.log('add');


							var rs = result.rs;

							var html = "";
							html += "<li id=\"layerGroup_"+rs.MLGID+"\" class=\"m-t-10 layerGroup\">\n";
							html += "	<div class=\"groupTitle\" id=\"layerGroupTitle_"+rs.MLGID+"\">\n";
							html += "		<i class=\"fa fa-folder-open\"></i> "+rs.GROUP_NAME;
							html += "		<a href=\"javascript:IDE.LAYERGROUP.callChangeGroupName("+rs.MLGID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a>\n";
							html += "		<a href=\"javascript:IDE.MAP.deleteLayerGroup("+rs.MLGID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a>\n";
							html += "	</div>\n";
							html += "	<ul class=\"layerTreeWrap m-t-5\" id=\"layerGroupTree_"+rs.MLGID+"\">\n";
							html += "	</ul>\n";
							html += "</li>\n";

							$("#IDELayerTree").append(html);

							$("#addGroupName").val("");
						break;
					}
				}
			});
		}
	},
	LIBRARY:{
		BASE:{
			isOpenLibrary:false,
			callLibrary:function() {
				$("#sideLibrary").css("display", "block");
				IDE.LIBRARY.BASE.isOpenLibrary = true;
			},
			closeLibrary:function() {
				IDE.LIBRARY.BASE.isOpenLibrary = false;
				$("#sideLibrary").css("display", "none");
			}
		}
	},
	DATA:{
		CSV:{
			saveMoveCoord:function(pt) {

			},
			addCSVData:function(dataId, isMove) {
				// ADD POI On MAP
				var formData = new FormData();
				formData.append("control", "addCSVPointData");
				formData.append("DATAID", dataId);
				formData.append("MAPID", IDE.GLOBAL.MAPID);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);

						switch(result.resultCode) {
							case "complete" :

								var rs = result.rs;
								var rsData = result.rsData;
								console.log(result);

								var layerName = "CSV_LAYER_"+rsData.DATAID;
								Module.getMap().createLayer(0, layerName);
								Module.getMap().setLayerVisibleRange(layerName, 0, 1000000);
								var poi = IDE.CANVAS.getColorCircle(4, rsData.POINT_COLOR);


								var moveCoord = null;

								for(var i = 0; i < rs.COORD_X.length; i++) {
									if(rs.COORD_X[i] != "" && rs.COORD_Y[i]  != "") {
										var pt = IDE.UTIL.transformCoord(rs.COORD_X[i], rs.COORD_Y[i], rsData.COORD_TYPE);

										if(i == 0) {
											moveCoord = pt;
										}
										Module.getAddObject().Add3DPoint(layerName, layerName, parseFloat(pt.x), parseFloat(pt.y), 15, poi.data, poi.width, poi.height, rs.LABEL[i]);
									}
								}
								Module.getViewCamera().setViewAt(parseFloat(moveCoord.x), parseFloat(moveCoord.y), 960.8662902172655, 90, 0);

							break;
						}
					}
				});
			}
		},
		DRONE_ROUTE:{
			droneMoveMode:false,
			moveDataCoord:function(lid) {
				var formData = new FormData();
				formData.append("control", "moveDroneRoute");
				formData.append("LID", lid);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);

						switch(result.resultCode) {
							case "complete" :
								//
								var rs = result.rs;
								Module.getViewCamera().setViewAt(parseFloat(rs.MOVE_LON), parseFloat(rs.MOVE_LAT), 960.8662902172655, 90, 0);
							break;
						}
					}
				});
			},
			loadDroneRoute:function(rid) {
				var formData = new FormData();
				formData.append("control", "addDroneRoute");
				formData.append("RID", rid);
				formData.append("MAPID", IDE.GLOBAL.MAPID);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);

						switch(result.resultCode) {
							case "complete" :
								//
								// module draw drone route

							break;
						}
					}
				});
			},
			droneControl:function(ctl) {
				if(ctl) {
					IDE.DATA.DRONE_ROUTE.DroneMove(true);
				} else {
					IDE.DATA.DRONE_ROUTE.DroneMove(false);
				}
			},
			addDroneRoute:function(rid) {
				console.log(rid);

				var formData = new FormData();
				formData.append("control", "addDroneRoute");
				formData.append("RID", rid);
				formData.append("MAPID", IDE.GLOBAL.MAPID);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);

						switch(result.resultCode) {
							case "complete" :
								console.log(result);

								var rs = result.rs;

								var html = "";
								html += "<li id=\"mapLayerItem_"+rs.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"droneRouteData_"+rs.LID+"\" checked/>[DRONE] <a href=\"JavaScript:IDE.DATA.DRONE_ROUTE.moveDataCoord("+rs.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+rs.LID+"\">"+rs.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+rs.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+rs.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+rs.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a><br/><a href=\"JavaScript:IDE.DATA.DRONE_ROUTE.DroneMove(true);\"><button class=\"btn btn-sm btn-success btn-icon btn-circle\"><i class=\"fa fa-play\" style=\"color:#FFFFFF;\"></i></a> <a href=\"JavaScript:IDE.DATA.DRONE_ROUTE.DroneMove(false);\"><button class=\"btn btn-sm btn-success btn-icon btn-circle\"><i class=\"fa fa-stop\" style=\"color:#FFFFFF;\"></i></a></li>";

								$("#defaultGroupTree").prepend(html);

								//
								// module draw drone route
								var coords = result.coords;
								var routeArr = new Array();
								Module.getViewCamera().setViewAt(parseFloat(coords[0].LON), parseFloat(coords[0].LAT), 300, 30, 1);

								setTimeout(function() {
									for(var i=0; i<coords.length-1; i++) {
										routeArr.push(parseFloat(coords[i].LAT));
										routeArr.push(parseFloat(coords[i].LON));
										routeArr.push(parseFloat(coords[i].ALT));

										routeArr.push(parseFloat(coords[i+1].LAT));
										routeArr.push(parseFloat(coords[i+1].LON));
										routeArr.push(parseFloat(coords[i+1].ALT));
									}

									var layerName = "droneRoute";
									Module.getMap().createLayer(1,layerName);
									Module.getMap().setLayerEditable(layerName);
									Module.getMap().setLayerVisibleRange(layerName,0,1000000);

									Module.getAddObject().AddDroneLine(0, routeArr, 6, 3);

									setTimeout(function() {
										var result = Module.getAddObject().AddDroneModellingData("droneObject", "./data", "Drone.3ds");
									}, 500);
								}, 1000);
							break;
						}
					}
				});
			},
			DroneMove:function(_mode) {
				IDE.DATA.DRONE_ROUTE.droneMoveMode = _mode;
				if(IDE.DATA.DRONE_ROUTE.droneMoveMode == true) {
					setTimeout(function() {
						Module.getMap().setLayerEditable("droneObject");
						Module.XDDroneMoveMode();
						IDE.DATA.DRONE_ROUTE.DroneMove(IDE.DATA.DRONE_ROUTE.droneMoveMode);
					}, 10);
				}
			}
		},
		MODEL_3DS:{
			rsFiles:null,
			rs:null,
			Cn:0,
			Tn:0,
			moveLon:0.0,
			moveLat:0.0,
			isMove:"Y",
			moveDataCoord:function(lid) {
				var formData = new FormData();
				formData.append("control", "move3DSDataCoord");
				formData.append("lid", lid);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);

						switch(result.resultCode) {
							case "complete" :
								var rs = result.rs;
								Module.getViewCamera().setViewAt(parseFloat(rs.MOVE_LON), parseFloat(rs.MOVE_LAT), 960.8662902172655, 90, 0);
							break;
						}
					}
				});
			},
			saveMoveCoord:function(lid) {
				var formData = new FormData();
				formData.append("control", "save3DSMoveCoord");
				formData.append("moveLon", IDE.DATA.MODEL_3DS.moveLon);
				formData.append("moveLat", IDE.DATA.MODEL_3DS.moveLat);
				formData.append("lid", lid);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);

						switch(result.resultCode) {
							case "complete" :
								var rs = result.rs;
								Module.getViewCamera().setViewAt(parseFloat(rs.MOVE_LON), parseFloat(rs.MOVE_LAT), 960.8662902172655, 90, 0);
							break;
						}
					}
				});
			},
			showHideControl:function(layerKey, act) {
				var visible = false;

				if(act == "SHOW") {
					visible = true;
				}
				Module.getMap().setLayerVisible(layerKey, visible);

				Module.XDRenderData();
				//Module.XDRTTRefresh();
			},
			progressLayerData:function(lid) {
				//IDE.DATA.MODEL_3DS.Tn
				//IDE.DATA.MODEL_3DS.Cn
				$("#model3DSDataLoad_"+lid+"_count").html("("+IDE.DATA.MODEL_3DS.Tn+"/"+IDE.DATA.MODEL_3DS.Cn+")");

				var pgArray = [".", "..", "..."];

				if(IDE.DATA.MODEL_3DS.Tn == IDE.DATA.MODEL_3DS.Cn) {
					$("#model3DSDataLoad_"+lid+"_message").html("<i class=\"fas fa-spinner fa-spin\"></i> 모델 데이터 배치중"+pgArray[Math.floor(Math.random() * pgArray.length)]+"");

					IDE.UX.PANNEL.closeExtention();

					IDE.LIBRARY.BASE.closeLibrary();

					setTimeout(function() {
						$("#model3DSDataLoad_"+lid).remove();
					}, 2000);
				} else {
					$("#model3DSDataLoad_"+lid+"_message").html("<i class=\"fas fa-spinner fa-spin\"></i> 모델 데이터 읽는중"+pgArray[Math.floor(Math.random() * pgArray.length)]+"");
				}

			},
			add3DSModel:function(dataId, isMove) {
				var formData = new FormData();
				formData.append("control", "add3DSDataLayer");
				formData.append("DATAID", dataId);
				formData.append("MAPID", IDE.GLOBAL.MAPID);

				IDE.DATA.MODEL_3DS.isMove = isMove;


				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);

						switch(result.resultCode) {
							case "complete" :
								var rs = result.rs;
								//console.log(rs);
								var rsFiles = result.rsFiles;



								var _canvas = document.getElementById('canvas');
								Module.getMap().setMapLoadCompleteEventLevel(13);	// 지형 로딩 체크할 레벨 설정
								Module.getMap().createLayer(9, ""+rs.LAYER_KEY+"");

								Module.XDBeginModellingData();	// 3DS 객체 생성 변수 초기화


								IDE.DATA.MODEL_3DS.rs = rs;
								IDE.DATA.MODEL_3DS.rsFiles = rsFiles;
								IDE.DATA.MODEL_3DS.Tn = IDE.DATA.MODEL_3DS.rsFiles.length;
								IDE.DATA.MODEL_3DS.Cn = 0;
								IDE.DATA.MODEL_3DS.coordType = rs.COORD_TYPE;

								// ADD LAYER TREE
								var html = "";
								html += "<li id=\"mapLayerItem_"+rs.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"model3DSData_"+rs.LID+"\" checked/>[3DS] <a href=\"JavaScript:IDE.DATA.MODEL_3DS.moveDataCoord("+rs.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+rs.LID+"\">"+rs.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+rs.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+rs.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+rs.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a><div id=\"model3DSDataLoad_"+rs.LID+"\"><span id=\"model3DSDataLoad_"+rs.LID+"_count\" style=\"color:#00FF00;\"></span> <span id=\"model3DSDataLoad_"+rs.LID+"_message\" style=\"color:#00BCBC;\"></span></div></li>";

								if(parseInt(rs.MLGID) == 0) {
									$("#defaultGroupTree").prepend(html);

								} else {
									$("#layerGroupTree_"+rs.MLGID+"").prepend(html);
								}

								$("model3DSData_"+rs.LID).change(function() {
									if($(this).is(":checked")) {
										IDE.DATA.MODEL_3DS.showHideControl(rs.LAYER_KEY, "SHOW");
									} else {
										IDE.DATA.MODEL_3DS.showHideControl(rs.LAYER_KEY, "HIDE");
									}
								});

								IDE.DATA.MODEL_3DS.progressLayerData(rs.LID);

								IDE.DATA.MODEL_3DS.readData(IDE.DATA.MODEL_3DS.Cn, rs.LID);

							break;
						}
					}
				});
			},
			readData:function(Cn, lid) {

				if(Cn == IDE.DATA.MODEL_3DS.Tn) {

					// End
					var lonlat = Module.XDGetModellingDataLonLat();	// 카메라 이동할 3DS 위치 가져오기
					lonlat = lonlat.split("#");

					IDE.DATA.MODEL_3DS.moveLon = lonlat[0];
					IDE.DATA.MODEL_3DS.moveLat = lonlat[1];

					if(IDE.DATA.MODEL_3DS.isMove == "Y") {
						Module.getViewCamera().setViewAt(parseFloat(lonlat[0]), parseFloat(lonlat[1]), 960.8662902172655, 90, 0);
					}

					Module.XDEndModellingData(parseInt(IDE.DATA.MODEL_3DS.rs.COORD_TYPE));

				} else {

					//console.log("http://con.terrasense.co.kr"+IDE.DATA.MODEL_3DS.rs[Cn].FILE_LINK_URL);

					var xhr = new XMLHttpRequest();
					xhr.open("GET", "http://con.terrasense.co.kr"+IDE.DATA.MODEL_3DS.rsFiles[Cn].FILE_LINK_URL, true);
					xhr.responseType = 'blob';
					xhr.send();
					xhr.onload = function() {
						console.log("load");

						var reader = new FileReader();
						reader.readAsDataURL(xhr.response);
						reader.onload =  function(e){
							var data3ds = e.target.result.split(',');
							Module.XDAddModellingData(data3ds[1], IDE.DATA.MODEL_3DS.rsFiles[Cn].FILE_NAME, parseInt(IDE.DATA.MODEL_3DS.rs.COORD_TYPE));	// 3DS 데이터 입력
							IDE.DATA.MODEL_3DS.Cn += 1;
							IDE.DATA.MODEL_3DS.readData(IDE.DATA.MODEL_3DS.Cn);

							IDE.DATA.MODEL_3DS.progressLayerData(IDE.DATA.MODEL_3DS.rs.LID);
						};
					}
				}


			}
		},
		LOD_MODEL:{
			showHideControl:function(layerKey, act) {
				var visible = false;

				if(act == "SHOW") {
					visible = true;
				}

				Module.getMap().setLayerVisible(layerKey, visible);

				Module.XDRenderData();
				Module.XDRTTRefresh();
			},
			moveDataCoord:function(lid) {
				var formData = new FormData();
				formData.append("control", "loadLodModelDataCoord");
				formData.append("lid", lid);

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								console.log(result);

								var rs = result.rs;

								if(rs.MOVE_LAT != null && rs.MOVE_LON != null && rs.MOVE_LAT != "" && rs.MOVE_LON != "") {
									var pt = IDE.UTIL.transformCoord(rs.MOVE_LON, rs.MOVE_LAT, rs.COORD_TYPE);

									Module.getViewCamera().setViewAt(parseFloat(pt.x), parseFloat(pt.y), 1000, 45, 0);

								}
							break;
						}
					}
				});
			},
			addLodModel:function(dataId) {
				var formData = new FormData();
				formData.append("control", "addLodModel");
				formData.append("DATAID", dataId);
				formData.append("MAPID", IDE.GLOBAL.MAPID);

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								console.log(result);

								var rs = result.rs;

								var html = "";
								html += "<li id=\"mapLayerItem_"+rs.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"loadModelData_"+rs.LID+"\" checked/>[MODEL] <a href=\"JavaScript:IDE.DATA.LOD_MODEL.moveDataCoord("+rs.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+rs.LID+"\">"+rs.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+rs.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+rs.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+rs.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

								$("#defaultGroupTree").prepend(html);

								$("#loadModelData_"+rs.LID).change(function() {
									if($(this).is(":checked")) {
										IDE.DATA.LOD_MODEL.showHideControl(""+rs.XDLAYER_NAME+"", "SHOW");
									} else {
										IDE.DATA.LOD_MODEL.showHideControl(""+rs.XDLAYER_NAME+"", "HIDE");
									}
								});
								//console.log(rs.XDLAYER_NAME);

								Module.XDEMapRemoveLayer(""+rs.XDLAYER_NAME+"");
								Module.XDEMapCreateLayer(""+rs.XDLAYER_NAME+"","http://con.terrasense.co.kr:8080",0,false,true,false,20,12,12,40); // dorne model
								Module.setVisibleRange(""+rs.XDLAYER_NAME+"", 1.0, 10000);

								if(rs.MOVE_LAT != null && rs.MOVE_LON != null && rs.MOVE_LAT != "" && rs.MOVE_LON != "") {
									Module.getViewCamera().setViewAt(parseFloat(rs.MOVE_LON), parseFloat(rs.MOVE_LAT), 1000, 45, 0);
									IDE.MAP.saveMapWithCoord(parseFloat(rs.MOVE_LON), parseFloat(rs.MOVE_LAT));
								}

								IDE.UX.PANNEL.closeExtention();

							break;
						}
					}
				});
			}
		},
		SHAPE:{
			isHeight:"N",
			selectSortGroup:function() {
				var formData = new FormData();
				formData.append("control", "shapeSortGroup");
				formData.append("DGID", $("#shapeSortGroup").val());

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						console.log(result);
						switch(result.resultCode) {
							case "complete" :
								// ideLibraryTerrain
								var rs = result.rs;

								$("#ideLibraryShape").empty();

								$.each(rs, function(k, v) {
									var html = "";
									html += "<tr>\n";
									html += "	<td>"+(rs.length - k)+"</td>\n";
									html += "	<td id=\"dataName_"+v.DATAID+"\" onClick=\"JavaScript:GLOBAL.DATA.SHAPE.changeDataName("+v.DATAID+");\">"+v.DATA_NAME+"</td>\n";
									html += "	<td>"+IDE.UTIL.getCoordTypeByName(v.COORD_TYPE)+"</td>\n";
									html += "	<td>"+IDE.UTIL.getShapeType(parseInt(v.SHP_DATA_TYPE))+"</td>\n";
									html += "	<td>"+v.REG_DATE+"</td>\n";
									html += "	<td><a href=\"JavaScript:IDE.DATA.SHAPE.addShape("+v.DATAID+");\"><button type=\"button\" class=\"btn btn btn-lime btn-xs\"><i class=\"fa fa-globe\"></i> 불러오기</button></a></td>\n";
									html += "</tr>\n";

									$("#ideLibraryShape").append(html);
								});

							break;
						}
					}
				});
			},
			showHideControl:function(layerKey, act) {
				var visible = false;

				if(act == "SHOW") {
					visible = true;
				}

				Module.getMap().setLayerVisible(layerKey, visible);

				Module.XDRenderData();
				Module.XDRTTRefresh();
			},
			moveDataCoord:function(lid) {
				var formData = new FormData();
				formData.append("control", "loadShapeDataCoord");
				formData.append("lid", lid);

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								console.log(result);

								var rs = result.rs;

								if(rs.MOVE_LAT != null && rs.MOVE_LON != null && rs.MOVE_LAT != "" && rs.MOVE_LON != "") {
									//var pt = IDE.UTIL.transformCoord(rs.MOVE_LON, rs.MOVE_LAT, rs.COORD_TYPE);

									Module.getViewCamera().setViewAt(parseFloat(rs.MOVE_LON), parseFloat(rs.MOVE_LAT), 1000, 45, 0);

								}
							break;
						}
					}
				});
			},
			addShape:function(dataId) {

				var formData = new FormData();
				formData.append("control", "addShape");
				formData.append("DATAID", dataId);
				formData.append("MAPID", IDE.GLOBAL.MAPID);

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								console.log(result);

								var rs = result.rs;


								var html = "";
								html += "<li id=\"mapLayerItem_"+rs.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"shapeData_"+rs.LID+"\" checked/>[SHP] <a href=\"JavaScript:IDE.DATA.SHAPE.moveDataCoord("+rs.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+rs.LID+"\">"+rs.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+rs.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+rs.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+rs.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

								$("#defaultGroupTree").prepend(html);

								$("#shapeData_"+rs.LID).change(function() {
									if($(this).is(":checked")) {
										IDE.DATA.SHAPE.showHideControl(""+rs.WMS_FULLNAME+"", "SHOW");
									} else {
										IDE.DATA.SHAPE.showHideControl(""+rs.WMS_FULLNAME+"", "HIDE");
									}
								});

								Module.XDEMapCreateWMSLayer(""+rs.WMS_FULLNAME+"", "http://www.terrasense.co.kr", parseInt(18195), "geoserver/wms?", "", 10, 21, 256,"1.1.0");
								Module.XDRenderData();
								Module.XDRTTRefresh();

								if(rs.MOVE_LAT != null && rs.MOVE_LON != null && rs.MOVE_LAT != "" && rs.MOVE_LON != "") {
									//var pt = IDE.UTIL.transformCoord(rs.MOVE_LON, rs.MOVE_LAT, rs.COORD_TYPE);
									Module.getViewCamera().setViewAt(parseFloat(rs.MOVE_LON), parseFloat(rs.MOVE_LAT), 1000, 45, 0);

									IDE.MAP.saveMapWithCoord(parseFloat(rs.MOVE_LON), parseFloat(rs.MOVE_LAT));
								}

								IDE.UX.PANNEL.closeExtention();

							break;
						}
					}
				});






			}
		},
		POINTCLOUD:{
			changePointCloudHeight:function(lid) {
				if($("#modifyPointCloudDemAlt").val() == "") {
					alert('변경할 높이값 숫자를 입력하세요');
					$("#modifyPointCloudDemAlt").focus();
					return false;
				}

				var formData = new FormData();
				formData.append("control", "changePointCloudLayerHeight");
				formData.append("LID", lid);
				formData.append("demAlt", $("#modifyPointCloudDemAlt").val());

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						console.log(result);
						switch(result.resultCode) {
							case "complete" :
								// ideLibraryTerrain
								var rs = result.rs;
								Module.XDEMapRemoveLayer("POINT_CLOUD_"+rs.DATAID+"");
								Module.XDEMapCreateLayer("POINT_CLOUD_"+rs.DATAID+"","http://con.terrasense.co.kr/builder/hadoopFS/"+result.MEM_ID+"/data/pointcloud/"+rs.DATAID+"",0, false, true, true, 19, 0, 19, parseInt(rs.DEL_ALT));
								Module.setVisibleRange("POINT_CLOUD_"+rs.DATAID+"", 2.0, 100000);
								Module.XDRenderData();

								alert('변경됐습니다');

							break;
						}
					}
				});
			},
			selectSortGroup:function() {
				var formData = new FormData();
				formData.append("control", "pointCloudSortGroup");
				formData.append("DGID", $("#pointCloudSortGroup").val());

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						console.log(result);
						switch(result.resultCode) {
							case "complete" :
								// ideLibraryTerrain
								var rs = result.rs;

								$("#ideLibraryPointCloud").empty();


								$.each(rs, function(k, v) {
									var html = "";
									html += "<tr>\n";
									html += "	<td>"+(rs.length - k)+"</td>\n";
									html += "	<td id=\"dataName_"+v.DATAID+"\" onClick=\"JavaScript:GLOBAL.DATA.POINTCLOUD.changeDataName("+v.DATAID+");\">"+v.DATA_NAME+"</td>\n";
									html += "	<td>"+IDE.UTIL.getCoordTypeByName(v.COORD_TYPE)+"</td>\n";
									html += "	<td>"+v.REG_DATE+"</td>\n";
									html += "	<td><a href=\"JavaScript:IDE.DATA.POINTCLOUD.addPointCloud("+v.DATAID+");\"><button type=\"button\" class=\"btn btn btn-lime btn-xs\"><i class=\"fa fa-globe\"></i> 불러오기</button></a></td>\n";
									html += "</tr>\n";

									$("#ideLibraryPointCloud").append(html);
								});

							break;
						}

					}
				});
			},
			moveDataCoord:function(lid) {
				var formData = new FormData();
				formData.append("control", "loadPointcloudDataCoord");
				formData.append("lid", lid);

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								console.log(result);

								var rs = result.rs;

								if(rs.MOVE_LAT != null && rs.MOVE_LON != null && rs.MOVE_LAT != "" && rs.MOVE_LON != "") {
									var pt = IDE.UTIL.transformCoord(rs.MOVE_LON, rs.MOVE_LAT, rs.COORD_TYPE);

									Module.getViewCamera().setViewAt(parseFloat(pt.x), parseFloat(pt.y), 1000, 45, 0);

								}
							break;
						}
					}
				});
			},
			showHideControl:function(layerKey, act) {
				var visible = false;

				if(act == "SHOW") {
					visible = true;
				}

				Module.getMap().setLayerVisible(layerKey, visible);

				Module.XDRenderData();
				Module.XDRTTRefresh();
			},
			addPointCloud:function(dataId) {
				var formData = new FormData();
				formData.append("control", "loadPointcloud");
				formData.append("DATAID", dataId);
				formData.append("MAPID", IDE.GLOBAL.MAPID);

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								console.log(result);

								var rs = result.rs;

								var html = "";
								html += "<li id=\"mapLayerItem_"+rs.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"pointcloudData_"+rs.LID+"\" checked/>[LAS] <a href=\"JavaScript:IDE.DATA.POINTCLOUD.moveDataCoord("+rs.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+rs.LID+"\">"+rs.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+rs.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+rs.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+rs.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

								$("#defaultGroupTree").prepend(html);

								$("#pointcloudData_"+rs.LID).change(function() {
									if($(this).is(":checked")) {
										IDE.DATA.POINTCLOUD.showHideControl("POINT_CLOUD_"+rs.DATAID+"", "SHOW");
									} else {
										IDE.DATA.POINTCLOUD.showHideControl("POINT_CLOUD_"+rs.DATAID+"", "HIDE");
									}
								});


								Module.XDEMapCreateLayer("POINT_CLOUD_"+rs.DATAID+"","http://con.terrasense.co.kr/builder/hadoopFS/"+result.MEM_ID+"/data/pointcloud/"+rs.DATAID+"",0, false, true, true, 19, 0, 19, 0);
								Module.setVisibleRange("POINT_CLOUD_"+rs.DATAID+"", 2.0, 100000);
								Module.XDRenderData();

								if(rs.MOVE_LAT != null && rs.MOVE_LON != null && rs.MOVE_LAT != "" && rs.MOVE_LON != "") {
									var pt = IDE.UTIL.transformCoord(rs.MOVE_LON, rs.MOVE_LAT, rs.COORD_TYPE);
									Module.getViewCamera().setViewAt(parseFloat(pt.x), parseFloat(pt.y), 1000, 45, 0);


									IDE.MAP.saveMapWithCoord(parseFloat(pt.x), parseFloat(pt.y));
								}

								IDE.LIBRARY.BASE.closeLibrary();


							break;
						}
					}
				});
			}
		},
		IMAGE:{
			selectSortGroup:function() {
				var formData = new FormData();
				formData.append("control", "imageSortGroup");
				formData.append("DGID", $("#imageSortGroup").val());

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						console.log(result);
						switch(result.resultCode) {
							case "complete" :
								// ideLibraryTerrain
								var rs = result.rs;

								$("#ideLibraryImage").empty();


								$.each(rs, function(k, v) {
									var html = "";
									html += "<tr>\n";
									html += "	<td>"+(rs.length - k)+"</td>\n";
									html += "	<td id=\"dataName_"+v.CVID+"\" onClick=\"JavaScript:GLOBAL.DATA.IMAGE.changeDataName("+v.CVID+");\">"+v.DATA_NAME+"</td>\n";
									html += "	<td>"+IDE.UTIL.getCoordTypeByName(v.COORD_TYPE)+"</td>\n";
									html += "	<td><a href=\""+v.DATA_THUMBNAIL+"\" target=\"_blank\"><img src=\""+v.DATA_THUMBNAIL+"\" width=\"50\"></a></td>\n";
									html += "	<td>"+v.REG_DATE+"</td>\n";
									html += "	<td><a href=\"JavaScript:IDE.DATA.IMAGE.addImage("+v.CVID+");\"><button type=\"button\" class=\"btn btn btn-lime btn-xs\"><i class=\"fa fa-globe\"></i> 불러오기</button></a></td>\n";
									html += "</tr>\n";

									$("#ideLibraryImage").append(html);
								});

							break;
						}

					}
				});
			},
			moveDataCoord:function(lid) {
				var formData = new FormData();
				formData.append("control", "loadImageDataCoord");
				formData.append("LID", lid);

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								console.log(result);

								var rs = result.rs;

								if(rs.MOVE_LAT != null && rs.MOVE_LON != null && rs.MOVE_LAT != "" && rs.MOVE_LON != "") {
									var pt = IDE.UTIL.transformCoord(rs.MOVE_LON, rs.MOVE_LAT, rs.COORD_TYPE);

									Module.getViewCamera().setViewAt(parseFloat(pt.x), parseFloat(pt.y), 1000, 45, 0);

									//IDE.MAP.saveMap();
								}
							break;
						}
					}
				});
			},
			showHideControl:function(layerKey, act) {
				var visible = false;

				if(act == "SHOW") {
					visible = true;
				}

				Module.getMap().setLayerVisible(layerKey, visible);

				Module.XDRenderData();
				Module.XDRTTRefresh();
			},
			addImage:function(cvid) {
				var formData = new FormData();
				formData.append("control", "addImageLayer");
				formData.append("CVID", cvid);
				formData.append("MAPID", IDE.GLOBAL.MAPID);

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								var rs = result.rs;

								var html = "";
								html += "<li id=\"mapLayerItem_"+rs.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"imageData_"+rs.LID+"\" checked/>[영상] <a href=\"JavaScript:IDE.DATA.IMAGE.moveDataCoord("+rs.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+rs.LID+"\">"+rs.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+rs.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+rs.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+rs.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

								$("#defaultGroupTree").prepend(html);

								$("#imageData_"+rs.LID).change(function() {
									if($(this).is(":checked")) {
										IDE.DATA.IMAGE.showHideControl("IMAGE_DATA_"+rs.CVID+"", "SHOW");
									} else {
										IDE.DATA.IMAGE.showHideControl("IMAGE_DATA_"+rs.CVID+"", "HIDE");
									}
								});

								Module.XDEMapRemoveLayer("IMAGE_DATA_"+rs.CVID+"");
								// Module.XDEMapCreateLayer("image", "http://yp.egiscloud.com/builder/hadoopFS/ypdemo/data/convert/image/843", 8080, true, true, true, 10, 0, 16);
								Module.XDEMapCreateLayer("IMAGE_DATA_"+rs.CVID+"","http://yp.egiscloud.com/builder/hadoopFS/"+result.MEM_ID+"/data/convert/image/"+rs.CVID+"",0,false,true,true,10,0,21);
								Module.XDRenderData();
								//Module.XDRTTRefresh();

								if(rs.MOVE_LAT != null && rs.MOVE_LON != null && rs.MOVE_LAT != "" && rs.MOVE_LON != "") {
									var pt = IDE.UTIL.transformCoord(rs.MOVE_LON, rs.MOVE_LAT, rs.COORD_TYPE);
									Module.getViewCamera().setViewAt(parseFloat(pt.x), parseFloat(pt.y), 1000, 45, 0);

									IDE.MAP.saveMapWithCoord(parseFloat(pt.x), parseFloat(pt.y));
								}

								IDE.LIBRARY.BASE.closeLibrary();
							break
						}
					}
				});
			}
		},
		TERRAIN:{
			selectSortGroup:function() {
				var formData = new FormData();
				formData.append("control", "terrainSortGroup");
				formData.append("DGID", $("#terrainSortGroup").val());

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						console.log(result);
						switch(result.resultCode) {
							case "complete" :
								// ideLibraryTerrain
								var rs = result.rs;

								$("#ideLibraryTerrain").empty();

								$.each(rs, function(k, v) {
									var html = "";
									html += "<tr>\n";
									html += "	<td>"+(rs.length - k)+"</td>\n";
									html += "	<td id=\"dataName_"+v.CVID+"\" onClick=\"JavaScript:GLOBAL.DATA.TERRAIN.changeDataName("+v.CVID+");\">"+v.DATA_NAME+"</td>\n";
									html += "	<td>"+IDE.UTIL.getCoordTypeByName(v.COORD_TYPE)+"</td>\n";
									html += "	<td><a href=\""+v.DATA_THUMBNAIL+"\" target=\"_blank\"><img src=\""+v.DATA_THUMBNAIL+"\" width=\"50\"></a></td>\n";
									html += "	<td>"+v.REG_DATE+"</td>\n";
									html += "	<td><a href=\"JavaScript:IDE.DATA.TERRAIN.addTerrain("+v.CVID+");\"><button type=\"button\" class=\"btn btn btn-lime btn-xs\"><i class=\"fa fa-globe\"></i> 불러오기</button></a></td>\n";
									html += "</tr>\n";

									$("#ideLibraryTerrain").append(html);
								});

							break;
						}

					}
				});
			},
			moveDataCoord:function(lid) {
				var formData = new FormData();
				formData.append("control", "loadImageDataCoord");
				formData.append("LID", lid);

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								console.log(result);

								var rs = result.rs;

								if(rs.MOVE_LAT != null && rs.MOVE_LON != null && rs.MOVE_LAT != "" && rs.MOVE_LON != "") {
									var pt = IDE.UTIL.transformCoord(rs.MOVE_LON, rs.MOVE_LAT, rs.COORD_TYPE);

									Module.getViewCamera().setViewAt(parseFloat(pt.x), parseFloat(pt.y), 1000, 45, 0);

								}
							break;
						}
					}
				});
			},
			addTerrain:function(cvid) {
				var formData = new FormData();
				formData.append("control", "addTerrain");
				formData.append("CVID", cvid);
				formData.append("MAPID", IDE.GLOBAL.MAPID);

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								var rs = result.rs;
								console.log(result);

								var html = "";
								html += "<li id=\"mapLayerItem_"+rs.LID+"\" class=\"layerItem\">[지형] <a href=\"JavaScript:IDE.DATA.TERRAIN.moveDataCoord("+rs.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+rs.LID+"\">"+rs.LAYER_NAME+"</span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+rs.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+rs.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+rs.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

								$("#defaultGroupTree").prepend(html);


								//return;
								Module.getMap().ClearMap();
								Module.getMap().SetDataAPI();
								//Module.SetPlanetImageryType(0);

								Module.getMap().SetServerData("con.terrasense.co.kr/builder/hadoopFS/", ""+result.MEM_ID+"/data/convert/terrain", ""+cvid+"", "bil", 0);//지형
								// MIN / MAX
								var ptMin = IDE.UTIL.transformCoord(rs.MINX, rs.MINY, rs.COORD_TYPE);
								var ptMax = IDE.UTIL.transformCoord(rs.MAXX, rs.MAXY, rs.COORD_TYPE);

								Module.getMap().SetDemBox(parseFloat(ptMin.x),parseFloat(ptMin.y),parseFloat(ptMax.x),parseFloat(ptMax.y), 20);

								Module.SetPlanetImageryType(-1);
								if(rs.MOVE_LAT != null && rs.MOVE_LON != null && rs.MOVE_LAT != "" && rs.MOVE_LON != "") {
									var pt = IDE.UTIL.transformCoord(rs.MOVE_LON, rs.MOVE_LAT, rs.COORD_TYPE);
									Module.getViewCamera().setViewAt(parseFloat(pt.x), parseFloat(pt.y), 1000, 45, 0);

									IDE.MAP.saveMapWithCoord(parseFloat(pt.x), parseFloat(pt.y));
								}

								IDE.LIBRARY.BASE.closeLibrary();

								IDE.TOOL.TERRAIN.DATAID = rs.DATAID;
							break;
						}
					}
				});
			} // End of addTerrain
		} // End of Terrain
	},
	TOOL:{
		Pn:1,
		INTEREST:{
			isRun:false,
			Lon:0.0,
			Lat:0.0,
			Alt:0.0,
			LID:null,
			IID:null,
			addModifyInterestComment:function() {
				if($("#modifyInterestPointOtherName").val() == "") {
					alert('작성자명을 입력하세요');
					$("#modifyInterestPointOtherName").focus();
					return false;
				}
				if($("#modifyInterestPointOtherCont").val() == "") {
					alert('내용을 입력하세요');
					$("#modifyInterestPointOtherCont").focus();
					return false;
				}

				var formData = new FormData();
				formData.append("control", "addModifyInterestComment");
				formData.append("LID", IDE.TOOL.INTEREST.LID);
				formData.append("IID", IDE.TOOL.INTEREST.IID);
				formData.append("name", $("#modifyInterestPointOtherName").val());
				formData.append("content", $("#modifyInterestPointOtherCont").val());
				formData.append("MAPID", IDE.GLOBAL.MAPID);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						console.log(result);

						switch(result.resultCode) {
							case "complete" :
								var rs = result.rs;

								$("#mapLayerItemCommentCnt_"+result.LID+"").html("("+result.cnt+")");

								//$("#interestPointMessageDefault").remove();

								var html = "";
								html += "<li id=\"modifyInterestPointMessageListItem_"+rs.ITCID+"\">"+rs.COMMENT+" - "+rs.NAME+" <small>"+rs.REG_DATE+"</small></li>";
								$("#modifyInterestPointMessageList").prepend(html);
								$("#modifyInterestPointOtherName").val("");
								$("#modifyInterestPointOtherCont").val("");



							break;
						}
					}
				});
			},
			addInterestComment:function() {
				if($("#interestPointOtherName").val() == "") {
					alert('작성자명을 입력하세요');
					$("#interestPointOtherName").focus();

					return false;
				}

				if($("#interestPointOtherCont").val() == "") {
					alert('관심지점 의견 내용을 입력하세요');
					$("#interestPointOtherCont").focus();
					return false;
				}


				var formData = new FormData();
				formData.append("control", "addInterestComment");
				formData.append("LID", IDE.TOOL.INTEREST.LID);
				formData.append("IID", IDE.TOOL.INTEREST.IID);
				formData.append("name", $("#interestPointOtherName").val());
				formData.append("content", $("#interestPointOtherCont").val());
				formData.append("MAPID", IDE.GLOBAL.MAPID);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						console.log(result);

						switch(result.resultCode) {
							case "complete" :
								var rs = result.rs;

								$("#mapLayerItemCommentCnt_"+result.LID+"").html("("+result.cnt+")");

								$("#interestPointMessageDefault").remove();

								var html = "";
								html += "<li id=\"interestPointMessageListItem_"+rs.ITCID+"\">"+rs.COMMENT+" - "+rs.NAME+" <small>"+rs.REG_DATE+"</small></li>";
								$("#interestPointMessageList").prepend(html);
								$("#interestPointOtherName").val("");
								$("#interestPointOtherCont").val("");



							break;
						}
					}
				});
			},
			closeMessageBox:function() {
				$("#interestPointMessagesWrap").css("display", "none");
				$("#interestPointMessageList").empty();

				$("#interestPointOtherName").val("");
				$("#interestPointOtherCont").val("");

			},
			callMessageBox:function(lid) {
				IDE.TOOL.INTEREST.LID = lid;

				var formData = new FormData();
				formData.append("control", "loadInterestMessage");
				formData.append("LID", lid);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						console.log(result);

						switch(result.resultCode) {
							case "complete" :
								$("#interestPointMessageList").empty();

								var rsInt = result.rsInt;
								var rsComment = result.rsComment;

								IDE.TOOL.INTEREST.IID = rsInt.IID;

								$("#interestPointMessagesWrap").css("display", "block");

								$("#interestPointMessageTitle").html(rsInt.TITLE);
								var html = "";

								if(rsInt.IMAGE_URL != "") {
									html += "<img src=\""+rsInt.IMAGE_URL+"\" width=\"200\">";
								}
								html += "<p>"+rsInt.COMMENT+"</p>";
								html += "<small>"+rsInt.REG_DATE+"</small>";
								$("#interestPointMessageContent").html(html);
								// interestPointMessageList

								var html = "";
								if(rsComment.length == 0) {
									html = "<li id=\"interestPointMessageDefault\">등록된 의견이 없습니다.</li>";
									$("#interestPointMessageList").append(html);
								} else {
									$("#interestPointMessageDefault").remove();

									//
									$.each(rsComment, function(k, v) {
										var html = "<li id=\"interestPointMessageListItem_"+v.ITCID+"\">"+v.COMMENT+" - "+v.NAME+" <small>"+v.REG_DATE+"</small></li>";
										$("#interestPointMessageList").append(html);
									});
								}

							break;
						}
					}
				});
			},
			checkExtention:function() {

				console.log($("#interestPictureUpload")[0].files);

				var fileType = $("#interestPictureUpload")[0].files[0].type;

				console.log(fileType);

				if(fileType == "image/jpeg" || fileType == "image/png") {
					var reader = new FileReader();

					reader.onload = function(e) {
						var html = "<img src=\""+e.target.result+"\" width=\"100\">";

						$("#interestImagePreview").html(html);
					};

					reader.readAsDataURL($("#interestPictureUpload")[0].files[0]);

				} else {
					alert('이미지만 등록할 수 있습니다.');
					return false;
				}
			},
			showHideControl:function() {

			},
			moveDataCoord:function(lid) {
				var formData = new FormData();
				formData.append("control", "loadInterestDataCoord");
				formData.append("lid", lid);

				$.ajax({
					url: "/builder/controller/library/ctrlLibrary.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								var rs = result.rs;
								//console.log(rs);
								if(rs.MOVE_LAT != null && rs.MOVE_LON != null && rs.MOVE_LAT != "" && rs.MOVE_LON != "") {
									Module.getViewCamera().setViewAt(parseFloat(rs.MOVE_LON), parseFloat(rs.MOVE_LAT), 500, 45, 0);
								}
							break;
						}
					}
				});
			},
			confirmInterest:function() {


				var formData = new FormData();
				formData.append("control", "insertInterestPointLayer");
				formData.append("MAPID", IDE.GLOBAL.MAPID);
				formData.append("title", $("#interestPointWriteTitle").val());
				formData.append("comment", $("#interestPointWriteComment").val());
				formData.append("lon", IDE.TOOL.INTEREST.Lon);
				formData.append("lat", IDE.TOOL.INTEREST.Lat);
				formData.append("alt", IDE.TOOL.INTEREST.Alt);
				formData.append("imageFile", $("#interestPictureUpload")[0].files[0]);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);

						switch(result.resultCode) {
							case "complete" :
								$("#interestImagePreview").html("");
								$("#interestPictureUpload").val("");


								var rs = result.rs;
								var inter = result.rsInter;

								//console.log(rs);

								IDE.TOOL.INTEREST.cancelClose();

								var html = "";
								html += "<li id=\"mapLayerItem_"+rs.LID+"\" class=\"layerItem\"><input type=\"checkbox\" class=\"form-check-input\" id=\"interestData_"+rs.LID+"\" checked/>[관심] <a href=\"JavaScript:IDE.TOOL.INTEREST.moveDataCoord("+rs.LID+");\" class=\"layerLink\"><span id=\"mapLayerItemTitle_"+rs.LID+"\">"+rs.LAYER_NAME+"</span><span id=\"mapLayerItemCommentCnt_"+rs.LID+"\"></span></a> <a href=\"javascript:IDE.LAYER.callChangeLayerName("+rs.LID+");\" class=\"btn btn-default btn-icon btn-circle btn-xs\"><i class=\"fa fa-pencil\" style=\"font-size:6pt !important;\"></i></a> <a href=\"JavaScript:IDE.LAYER.modifyLayer("+rs.LID+");\" class=\"btn btn-primary btn-icon btn-circle btn-xs\"><i class=\"fa fa-cog\"></i></a> <a href=\"javascript:IDE.LAYER.deleteLayer("+rs.LID+");\" class=\"btn btn-danger btn-icon btn-circle btn-xs\"><i class=\"fa fa-trash-alt\" style=\"font-size:6pt !important;\"></i></a></li>";

								$("#defaultGroupTree").prepend(html);

								$("#interestData_"+rs.LID).change(function() {
									if($(this).is(":checked")) {
										//IDE.TOOL.INTEREST.showHideControl("IMAGE_DATA_"+rs.CVID+"", "SHOW");
									} else {
										//IDE.TOOL.INTEREST.showHideControl("IMAGE_DATA_"+rs.CVID+"", "HIDE");
									}
								});

								// Create POI
								var html = "";
								if(rs.THUMB_URL != "") {
									html = "<img src=\""+inter.THUMB_URL+"\" style=\"vertical-align:middle;\"> "+rs.LAYER_NAME+"";
									$("#interestPointBubbly").html(html);
								} else {
									$("#interestPointBubbly").html(rs.LAYER_NAME);
								}

								//console.log($("#interestPointWrap").width(), $("#interestPointWrap").height());

								setTimeout(function() {
									html2canvas(document.getElementById("interestPointBubbly"),{background:null, letterRendering: 1, allowTaint : true}).then(function(cv) {
										//console.log(cv);
										var ctx = cv.getContext('2d');
										var image = new Image();
										image.width = cv.width;
										image.height = cv.height;

										console.log(cv.width, cv.height);

										var layerName = "INTEREST_DATA_"+rs.LID+"";

										image.onload = function() {
											ctx.drawImage(image, 0, 0, image.width, image.height);

											var layerImage = ctx.getImageData(0,0, cv.width, cv.height);

											console.log(layerImage.width, layerImage.height);

											//$("#interestPointImage").attr("src", layerImage);

											//console.log(layerImage.data, layerImage.width, layerImage.height);

											var altitude = 70;
											Module.getMap().removeLayer(layerName);
											Module.getMap().createLayer(0,layerName);
											Module.getMap().setLayerEditable(layerName);
											Module.getMap().setLayerVisibleRange(layerName,0,1000000);

											Module.getAddObject().CreateBoardTexture(layerName, layerName,  parseFloat(rs.MOVE_LON), parseFloat(rs.MOVE_LAT), (Module.getMap().getHeightMem(parseFloat(rs.MOVE_LON), parseFloat(rs.MOVE_LAT))+100), layerImage.data, layerImage.width, layerImage.height, false, 10, 500, 3000, 255, 255, 255,255);


										}
										image.src= cv.toDataURL("image/png");

										console.log($("#interestPointBubbly").width(), $("#interestPointBubbly").height());

									});
								}, 500);



							break;
						}
					}
				});
			},
			cancelClose:function() {
				$("#interestPointWriteTitle").val("관심지점 의견");
				$("#interestPointWriteComment").val("");
				$("#interestPointCoord").html("");
				$("#interestPointBoxWrap").css("display", "none");

				IDE.TOOL.INTEREST.Lon = 0.0;
				IDE.TOOL.INTEREST.Lat = 0.0;
				IDE.TOOL.INTEREST.Alt = 0.0;

				Module.getMap().removeLayer("interestPoint");
			},
			addPoint:function() {
				console.log('addPoint');
				Module.XDSetMouseState(32);

				IDE.TOOL.INTEREST.isRun = true;

				$("#canvas").on("click", function(event) {
					if(IDE.TOOL.INTEREST.isRun == true) {
						var scX = event.pageX;
						var scY = event.pageY;

						var lonLatValue = Module.XDGetLonLatByScreenPos(scX-220, scY-50);
						var lonLatArray = lonLatValue.split("#");

						IDE.TOOL.INTEREST.Lon = parseFloat(lonLatArray[0]);
						IDE.TOOL.INTEREST.Lat = parseFloat(lonLatArray[1]);
						IDE.TOOL.INTEREST.Alt = parseFloat(lonLatArray[2]);

						var imageArray = [1, 2, 3, 4, 5];
						var selectImage = imageArray[Math.floor(Math.random() * imageArray.length)];

						var imageName = null;
						imageName = "/assets/img/poi/poi_"+selectImage+".png";

						var poiImage = new Image();
						poiImage.src = imageName;
						poiImage.width = 27;
						poiImage.height = 27;

						poiImage.onload = function() {
							var canvas = document.createElement('canvas');
							var context = canvas.getContext('2d');
							canvas.width = poiImage.width;
							canvas.height = poiImage.height;
							context.drawImage(poiImage, 3, 0, poiImage.width-6, poiImage.height);
							var image = context.getImageData(0,0,canvas.width,canvas.height);

							var layerName = "interestPoint";

							Module.getMap().removeLayer(layerName);
							Module.getMap().createLayer(0,layerName);
							Module.getMap().setLayerEditable(layerName);
							Module.getMap().setLayerVisibleRange(layerName,0,1000000);

							Module.getAddObject().Add3DPoint(layerName, "start", parseFloat(lonLatArray[0]), parseFloat(lonLatArray[1]), parseFloat(lonLatArray[2]), image.data, image.width, image.height, "관심지점");
							Module.XDSetMouseState(1);

							// Send result Delegate
							//var args = [_lat, _lon, _alt];
							//CXDMap.GLOBAL.EVENTS.delegate(args);
						}



						Module.XDSetMouseState(1);
						IDE.TOOL.INTEREST.isRun = false;

						var pt = IDE.UTIL.transformCoordTM(parseFloat(lonLatArray[0]), parseFloat(lonLatArray[1]), "20");

						$("#interestPointCoord").html("<i class=\"fa fa-map-marker-alt\"> "+pt.x.toFixed(2)+", "+pt.y.toFixed(2)+", "+parseFloat(lonLatArray[2]).toFixed(2)+"");
						$("#interestPointBoxWrap").css("display", "block");
						$("#interestPointWriteComment").focus();
					}
				});
			}
		},
		COMPARE_HEIGHT:{
			sourceHID:null,
			currentDataName:"",
			isCompare:false,
			sourceRs:null,
			targetRs:null,
			chart:null,
			isCheckLine:false,
			checkPointConfirm:function() {
				$("#compareTerrainHeight").modal('show');
				$("#terrainHeightComparePointWrap").css("display", "none");

				Module.XDClearDistanceMeasurement();

				Module.XDClearybridOnRTTLine();
				Module.XDUpdateMeshData(false);

				IDE.TOOL.COMPARE_HEIGHT.isCheckLine = false;
			},
			showTargetPoint:function(hid) {
				IDE.TOOL.COMPARE_HEIGHT.isCheckLine = true;



				$("#compareTerrainHeight").modal('hide');
				$("#terrainHeightComparePointWrap").css("display", "block");

				var formData = new FormData();
				formData.append("control", "loadTargetPoint");
				formData.append("HID", hid);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);

						switch(result.resultCode) {
							case "complete" :
								var rs = result.rs;

								//Module.XDSetSlicePointList(parseFloat(rs.S_LON), parseFloat(rs.S_LAT), parseFloat(rs.S_ALT));
								//Module.XDSetSlicePointList(parseFloat(rs.E_LON), parseFloat(rs.E_LAT), parseFloat(rs.E_ALT));

								Module.XDSetHybridOnRTTLine(parseFloat(rs.S_LON), parseFloat(rs.S_LAT), parseFloat(rs.S_ALT), parseFloat(rs.E_LON), parseFloat(rs.E_LAT), parseFloat(rs.E_ALT));

								Module.XDUpdateMeshData(true);

								Module.getViewCamera().setViewAt(parseFloat(rs.S_LON), parseFloat(rs.S_LAT), 500, 45, 0);

								Module.XDSetMouseState(1);

							break;
						}
					}
				});
			},
			offOtherTool:function() {
				$("#viewTool_Other_1").removeClass("toolActive");
				$("#viewTool_Other_2").removeClass("toolActive");
				$("#viewTool_Other_3").removeClass("toolActive");
				$("#viewTool_Other_4").removeClass("toolActive");
			},
			backToList:function() {
				$("#compareTerrainHeightSavedDataViewWrap").css("display", "none");
				$("#compareTerrainHeightSavedDataViewUIWrap").css("display", "none");

				$("#compareTerrainHeightListWrap").css("display", "flex");

				if(IDE.TOOL.COMPARE_HEIGHT.chart != null) {
					IDE.TOOL.COMPARE_HEIGHT.chart.destroy();
					IDE.TOOL.COMPARE_HEIGHT.chart = null;
				}
			},
			closeAndReset:function() {
				IDE.TOOL.COMPARE_HEIGHT.backToList();
				$("#compareTerrainHeight").modal('hide');

				IDE.TOOL.COMPARE_HEIGHT.offOtherTool();

				IDE.TOOL.COMPARE_HEIGHT.isCompare = false;

			},
			executeCompare:function() {

				if(IDE.TOOL.COMPARE_HEIGHT.chart != null) {
					IDE.TOOL.COMPARE_HEIGHT.chart.destroy();
					IDE.TOOL.COMPARE_HEIGHT.chart = null;
				}

				var t = Module.XDGetHeightsMeasurement(IDE.TOOL.TERRAIN.checkMeter);

				Module.XDClearDistanceMeasurement();

				t = JSON.parse(t);

				var s = JSON.parse(IDE.TOOL.COMPARE_HEIGHT.sourceRs.HEIGHTS);

				var sourceLabel = [];
				var sourceData = [];

				for(var i = 0; i < s.length; i++) {
					sourceLabel[i] = i + 1;
					sourceData[i] = s[i][2];
				}

				var targetLabel = [];
				var targetData = [];

				for(var i = 0; i < t.length; i++) {
					targetLabel[i] = i + 1;
					targetData[i] = t[i][2];
				}

				//console.log(sourceData);
				//console.log(targetData);

				var lineChartData = {
					labels: sourceLabel,
					datasets: [{
						label: IDE.TOOL.COMPARE_HEIGHT.sourceRs.DATA_NAME,
						borderColor: COLOR_BLUE,
						pointBackgroundColor: COLOR_BLUE,
						pointRadius: 2,
						borderWidth: 2,
						backgroundColor: COLOR_BLUE_TRANSPARENT_3,
						data: sourceData
					},{
						label: IDE.TOOL.COMPARE_HEIGHT.currentDataName,
						borderColor: COLOR_RED,
						pointBackgroundColor: COLOR_RED,
						pointRadius: 2,
						borderWidth: 2,
						backgroundColor: COLOR_RED_TRANSPARENT_3,
						data: targetData
					}]
				}

				var ctx = document.getElementById('compareTerrainHeightListDataChartView').getContext('2d');
				IDE.TOOL.COMPARE_HEIGHT.chart = new Chart(ctx, {
					type: 'line',
					data: lineChartData
				});
			},
			compareCurrentHeightData:function() {
				var formData = new FormData();
				formData.append("control", "loadSourceHeightData");
				formData.append("HID", IDE.TOOL.COMPARE_HEIGHT.sourceHID);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);

						switch(result.resultCode) {
							case "complete" :
								var rs = result.rs;

								IDE.TOOL.COMPARE_HEIGHT.isCompare = true;
								//IDE.TOOL.COMPARE_HEIGHT.targetRs = rs;

								Module.XDSetSlicePointList(parseFloat(rs.S_LON), parseFloat(rs.S_LAT), parseFloat(rs.S_ALT));
								Module.XDSetSlicePointList(parseFloat(rs.E_LON), parseFloat(rs.E_LAT), parseFloat(rs.E_ALT));

							break;
						}
					}
				});
			},
			viewListHeightData:function(hid) {
				var formData = new FormData();

				formData.append("control", "loadHeightDataWithDataName");
				formData.append("HID", hid);
				formData.append("DATAID", IDE.TOOL.TERRAIN.DATAID);


				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :

								if(IDE.TOOL.COMPARE_HEIGHT.chart != null) {
									IDE.TOOL.COMPARE_HEIGHT.chart.destroy();
									IDE.TOOL.COMPARE_HEIGHT.chart = null;
								}

								var rs = result.rs;

								IDE.TOOL.COMPARE_HEIGHT.currentDataName = result.dataName;
								IDE.TOOL.COMPARE_HEIGHT.sourceHID = hid;
								IDE.TOOL.COMPARE_HEIGHT.sourceRs = rs;

								$("#compareTerrainCurrentTerrainName").html(IDE.TOOL.COMPARE_HEIGHT.currentDataName);

								//$("#checkHeightSavedDataListUIWrap").css("display", "none");
								$("#compareTerrainHeightListWrap").css("display", "none");


								$("#compareTerrainHeightSavedDataViewWrap").css("display", "flex");
								$("#compareTerrainHeightSavedDataViewUIWrap").css("display", "flex");

								var s = JSON.parse(rs.HEIGHTS);

								var l = [];
								var c = [];

								for(var i = 0; i < s.length; i++) {
									l[i] = i + 1;
									c[i] = s[i][2];
								}

								Chart.defaults.global.defaultFontColor = COLOR_BLACK;
								Chart.defaults.global.defaultFontFamily = FONT_FAMILY;
								Chart.defaults.global.defaultFontStyle = FONT_WEIGHT;

								var lineChartData = {
									labels: l,
									datasets: [{
										label: rs.TITLE+"("+rs.DATA_NAME+")",
										borderColor: COLOR_BLUE,
										pointBackgroundColor: COLOR_BLUE,
										pointRadius: 2,
										borderWidth: 2,
										backgroundColor: COLOR_BLUE_TRANSPARENT_3,
										data: c
									}]
								}

								var ctx = document.getElementById('compareTerrainHeightListDataChartView').getContext('2d');
								IDE.TOOL.COMPARE_HEIGHT.chart = new Chart(ctx, {
									type: 'line',
									data: lineChartData
								});


							break;
						}
					}
				});
			},
			callDataList:function() {
				var prevMode = Toolbar.mode;
				if (prevMode > 0) {
					Toolbar.off(prevMode);

					// 선택 스타일 해제
					$("#viewTool_"+prevMode).removeClass("toolActive");
				}

				$("#viewTool_Other_4").addClass("toolActive");

				var formData = new FormData();
				formData.append("control", "loadTerrainHeightDataAll");

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								var rs = result.rs;

								$("#compareTerrainHeightListTR").empty();

								var total = rs.length;
								$.each(rs, function(k, v) {
									var html = "";
									html += "<tr id=\"checkHeightListHeightData_"+v.HID+"\">\n";
									html += "	<td>"+(total - k)+"</td>\n";
									html += "	<td>"+v.TITLE+"</td>\n";
									html += "	<td>"+v.DATA_NAME+"</td>\n";
									html += "	<td>"+v.REG_DATE+"</td>\n";
									html += "	<td><a href=\"JavaScript:IDE.TOOL.COMPARE_HEIGHT.showTargetPoint("+v.HID+");\"><button class=\"btn btn-sm btn-yellow\">측정지점</button></a></td>\n";
									html += "	<td><a href=\"JavaScript:IDE.TOOL.COMPARE_HEIGHT.viewListHeightData("+v.HID+");\"><button class=\"btn btn-sm btn-info\">보기</button></a></td>\n";
									html += "	<td><a href=\"JavaScript:IDE.TOOL.COMPARE_HEIGHT.deleteListHeightData("+v.HID+");\"><button class=\"btn btn-sm btn-white\">삭제</button></a></td>\n";
									html += "</tr>\n";
									$("#compareTerrainHeightListTR").append(html);
								});
								$("#compareTerrainHeight").modal("show");
							break;
						}
					}
				});
			},
		},
		TERRAIN:{
			checkHeightPoints:null,
			checkMeter:1,
			heightResult:null,
			DATAID:0,
			saveTerrainHeightValue:function() {
				$("#saveHeightData").modal('show');
			},
			saveTerrainHeightConfirm:function() {
				var formData = new FormData();
				formData.append("control", "saveHeightData");
				formData.append("MAPID", IDE.GLOBAL.MAPID);
				formData.append("title", $("#saveHeightDataName").val());
				formData.append("meter", IDE.TOOL.TERRAIN.checkMeter);
				formData.append("points", IDE.TOOL.TERRAIN.checkHeightPoints);
				formData.append("heightResult", IDE.TOOL.TERRAIN.heightResult);
				formData.append("DATAID", IDE.TOOL.TERRAIN.DATAID);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :
								alert('저장됐습니다');
								$("#saveHeightData").modal('hide');
							break;
						}
					}
				});
			},
			callHeightDataList:function() {
				// checkHeightCurrentChartWrap
				// display flex
				$("#checkHeightCurrentChartWrap").css("display", "none");
				$("#checkHeightCurrentChartUIWrap").css("display", "none");

				// checkHeightSavedDataListTR
				// checkHeightSavedDataListWrap
				var formData = new FormData();
				formData.append("control", "loadSavedHeightData");
				formData.append("DATAID", IDE.TOOL.TERRAIN.DATAID);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :

								$("#checkHeightSavedDataListWrap").css("display", "flex");
								$("#checkHeightSavedDataListUIWrap").css("display", "flex");

								var rs = result.rs;

								$("#checkHeightTargetTerrainName").html(result.dataName);

								$("#checkHeightSavedDataListTR").empty();

								var total = rs.length;

								$.each(rs, function(k, v) {
									var html = "";
									html += "<tr id=\"checkHeightListHeightData_"+v.HID+"\">\n";
									html += "	<td>"+(total - k)+"</td>\n";
									html += "	<td>"+v.TITLE+"</td>\n";
									html += "	<td>"+v.DATA_NAME+"</td>\n";
									html += "	<td>"+v.REG_DATE+"</td>\n";
									html += "	<td><a href=\"JavaScript:IDE.TOOL.TERRAIN.viewListHeightData("+v.HID+");\"><button class=\"btn btn-sm btn-info\">보기</button></a></td>\n";
									html += "	<td><a href=\"JavaScript:IDE.TOOL.TERRAIN.deleteListHeightData("+v.HID+");\"><button class=\"btn btn-sm btn-white\">삭제</button></a></td>\n";
									html += "</tr>\n";
									$("#checkHeightSavedDataListTR").append(html);
								});
							break;
						}
					}
				});
			},
			closeAndReset:function() {
				$("#checkHeightSavedDataListWrap").css("display", "none");
				$("#checkHeightSavedDataListUIWrap").css("display", "none");

				$("#checkHeightSavedDataViewWrap").css("display", "none");
				$("#checkHeightSavedDataViewUIWrap").css("display", "none");

				$("#checkHeightCurrentChartWrap").css("display", "flex");
				$("#checkHeightCurrentChartUIWrap").css("display", "flex");

				$("#modalResultTerrainHeight").modal('hide');
			},
			backToCurrentHeight:function() {
				$("#checkHeightSavedDataListWrap").css("display", "none");
				$("#checkHeightSavedDataListUIWrap").css("display", "none");

				$("#checkHeightSavedDataViewWrap").css("display", "none");
				$("#checkHeightSavedDataViewUIWrap").css("display", "none");

				$("#checkHeightCurrentChartWrap").css("display", "flex");
				$("#checkHeightCurrentChartUIWrap").css("display", "flex");
			},
			backToListData:function() {
				$("#checkHeightSavedDataViewWrap").css("display", "none");
				$("#checkHeightSavedDataViewUIWrap").css("display", "none");

				$("#checkHeightSavedDataListUIWrap").css("display", "flex");
				$("#checkHeightSavedDataListWrap").css("display", "flex");
			},
			deleteListHeightData:function(hid) {
				if(!confirm('해당 데이터를 삭제하시겠습니까?')) {
					return false;
				}

				var formData = new FormData();
				formData.append("control", "deleteListHeightData");
				formData.append("HID", hid);
				formData.append("DATAID", IDE.TOOL.TERRAIN.DATAID);

				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);

						switch(result.resultCode) {
							case "complete" :
								var rs = result.rs;

								$("#checkHeightTargetTerrainName").html(result.dataName);

								$("#checkHeightSavedDataListTR").empty();

								var total = rs.length;

								$.each(rs, function(k, v) {
									var html = "";
									html += "<tr id=\"checkHeightListHeightData_"+v.HID+"\">\n";
									html += "	<td>"+(total - k)+"</td>\n";
									html += "	<td>"+v.TITLE+"</td>\n";
									html += "	<td>"+v.DATA_NAME+"</td>\n";
									html += "	<td>"+v.REG_DATE+"</td>\n";
									html += "	<td><a href=\"JavaScript:IDE.TOOL.TERRAIN.viewListHeightData("+v.HID+");\"><button class=\"btn btn-sm btn-info\">보기</button></a></td>\n";
									html += "	<td><a href=\"JavaScript:IDE.TOOL.TERRAIN.deleteListHeightData("+v.HID+");\"><button class=\"btn btn-sm btn-white\">삭제</button></a></td>\n";
									html += "</tr>\n";
									$("#checkHeightSavedDataListTR").append(html);
								});
							break;
						}
					}
				});
			},
			viewListHeightData:function(hid) {

				var formData = new FormData();

				formData.append("control", "loadHeightData");
				formData.append("HID", hid);


				$.ajax({
					url: "/builder/controller/ide/ctrlIDE.php",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						var result = JSON.parse(result);
						//console.log(result);

						switch(result.resultCode) {
							case "complete" :

								var rs = result.rs;

								$("#checkHeightSavedDataListUIWrap").css("display", "none");
								$("#checkHeightSavedDataListWrap").css("display", "none");


								$("#checkHeightSavedDataViewWrap").css("display", "flex");
								$("#checkHeightSavedDataViewUIWrap").css("display", "flex");

								var s = JSON.parse(rs.HEIGHTS);

								var l = [];
								var c = [];

								for(var i = 0; i < s.length; i++) {
									l[i] = i + 1;
									c[i] = s[i][2];
								}

								Chart.defaults.global.defaultFontColor = COLOR_BLACK;
								Chart.defaults.global.defaultFontFamily = FONT_FAMILY;
								Chart.defaults.global.defaultFontStyle = FONT_WEIGHT;

								var lineChartData = {
									labels: l,
									datasets: [{
										label: rs.TITLE,
										borderColor: COLOR_BLUE,
										pointBackgroundColor: COLOR_BLUE,
										pointRadius: 2,
										borderWidth: 2,
										backgroundColor: COLOR_BLUE_TRANSPARENT_3,
										data: c
									}]
								}

								var ctx = document.getElementById('listDataChartView').getContext('2d');
								var lineChart = new Chart(ctx, {
									type: 'line',
									data: lineChartData
								});


							break;
						}
					}
				});
			}
		},
		FILL:{
			slopeHeight:0,
			callFillupDown:function() {
				$("#toolFillUpDownWrap").css("display", "block");
			},
			closeFillupDown:function() {
				IDE.TOOL.FILL.reset();
				$("#toolFillUpDownWrap").css("display", "none");
			},
			selectFillPolygon:function() {
				Module.XDSetMouseState(24);
			},
			setSlopeHeight:function() {
				Module.XDSetMouseState(85);
			},
			settedSlopeHeight:function() {
				$("#fillUpSettedHeight").html(IDE.TOOL.FILL.slopeHeight);
			},
			executeFillupFinal:function() {
				var result = Module.XDCutRegionPlanetary(IDE.TOOL.FILL.slopeHeight, parseInt($("#fillUpSetupAngle").val()));
				result = result.split(",");
				var t25in = 0;
				var t25out = 0;

				t25in = Math.round(parseFloat(result[0]) / 16.0);
				t25out = Math.round(parseFloat(result[1]) / 16.0);

				// 25 : 16.0m3
				// 20 : 12.8m3

				var html = "";
				html += "<span style=\"color:#007FFF;\"><strong>IN</strong> : "+result[0]+" m<sup>3</sup><br/>(<i class=\"fa fa-truck-monster\"></i> 25T : "+t25in+"대);</span><br/><span style=\"color:#FFAA00;\"><strong>OUT</strong> : "+result[1]+" m<sup>3</sup><br/>(<i class=\"fa fa-truck-monster\"></i> 25T : "+t25out+"대);</span>";
				$("#fillUpResultWrap").html(html);
			},
			reset:function() {
				$("#fillUpSettedHeight").html("");
				$("#fillUpResultWrap").html("3. 결과");
				Module.XDSetMouseState(1);
				$("#fillUpSetupAngle").val(45);
				$("#fillUpSettedHeightValue").val("");
				Module.XDAnalClear();
				IDE.TOOL.FILL.slopeHeight = 0;
			}
		},
		closeTerrainHeight:function() {

		},
		callTerrainHeight:function() {
			$("#viewTool_Other_1").addClass("toolActive");
			Module.XDCreateLayer(5, "XDLMeasureSlice");
			Module.XDSetSliceMeasurement();
			Module.XDSetSliceGap(IDE.TOOL.TERRAIN.checkMeter);


		},
		executeTerrainHeight:function(e) {
			//console.log(e);
			IDE.TOOL.Pn += 1;

			if(IDE.TOOL.Pn == 2) {

				var s = Module.XDGetHeightsMeasurement(IDE.TOOL.TERRAIN.checkMeter);

				IDE.TOOL.TERRAIN.heightResult = s;

				IDE.TOOL.TERRAIN.checkHeightPoints = Module.XDGetSlicePointList();

				Module.XDClearDistanceMeasurement();


				//console.log(IDE.TOOL.TERRAIN.checkHeightPoints);

				if(s) {
					s = JSON.parse(s);

					var l = [];
					var c = [];

					for(var i = 0; i < s.length; i++) {
						l[i] = i + 1;
						c[i] = s[i][2];
					}

					//console.log(c);



					/*
					d = [124.590198, 124.608753, 124.611745, 124.544925, 124.420054, 124.397532, 125.447466, 126.246148, 124.154591, 123.869692, 119.871473, 118.429635, 118.433343, 118.013971, 117.882985, 117.848096, 118.391891, 119.443786, 120.394669, 121.020059, 120.976795, 120.631504, 119.678033, 118.822629, 118.078957, 117.5884, 117.387339, 116.941818, 116.315941, 115.743993, 115.383318, 115.332903, 115.295708, 115.215506, 115.153728, 115.46029, 115.866319, 116.101074, 116.207392, 116.143126, 116.217266, 116.00442, 116.060256, 116.129962, 116.29581, 116.120014, 115.797873, 115.535294, 115.360662, 115.267333, 115.449927, 115.315946, 115.061929, 114.638081, 114.231826, 113.961044, 113.60632, 113.576893, 113.570788, 113.522932, 113.503067, 113.437769];

					c = [136.276365, 136.733239, 137.077323, 137.290194, 137.455525, 137.615033, 137.839476, 138.039806, 138.264137, 138.524105, 138.782182, 138.698691, 138.58782, 138.534487, 138.353194, 138.314747, 138.348769, 138.233213, 138.183729, 138.034131, 137.898975, 137.803355, 137.602621, 137.410147, 137.112419, 136.872742, 136.576851, 136.188257, 135.642606, 135.182637, 134.584089, 133.93396, 133.29778, 132.73698, 132.251918, 131.943566, 131.549491, 131.288148, 131.160736, 131.297515, 131.442019, 131.538943, 131.739766, 131.912099, 132.070187, 132.263893, 132.414904, 132.650678, 132.872091, 132.975891, 133.183653, 133.338444, 133.452155, 133.539858, 133.507989, 133.393755, 133.361152, 133.339884, 133.195633, 132.932469, 132.732264];

					*/

					Chart.defaults.global.defaultFontColor = COLOR_BLACK;
					Chart.defaults.global.defaultFontFamily = FONT_FAMILY;
					Chart.defaults.global.defaultFontStyle = FONT_WEIGHT;

					var lineChartData = {
						labels: l,
						datasets: [{
							label: 'Terrain Height',
							borderColor: COLOR_BLUE,
							pointBackgroundColor: COLOR_BLUE,
							pointRadius: 2,
							borderWidth: 2,
							backgroundColor: COLOR_BLUE_TRANSPARENT_3,
							data: c
						}]
					}

					/*
					var lineChartData = {
						labels: l,
						datasets: [{
							label: '성복동 181025 지점 1',
							borderColor: COLOR_BLUE,
							pointBackgroundColor: COLOR_BLUE,
							pointRadius: 2,
							borderWidth: 2,
							backgroundColor: COLOR_BLUE_TRANSPARENT_3,
							data: c
						},{
							label: '성복동 190522 지점 1',
							borderColor: COLOR_RED,
							pointBackgroundColor: COLOR_RED,
							pointRadius: 2,
							borderWidth: 2,
							backgroundColor: COLOR_RED_TRANSPARENT_3,
							data: d
						}]
					}*/

					var ctx = document.getElementById('line-chart').getContext('2d');
					var lineChart = new Chart(ctx, {
						type: 'line',
						data: lineChartData
					});

					$("#modalResultTerrainHeight").modal('toggle');
				}

				Module.XDSetMouseState(1);
				Module.XDClearDistanceMeasurement();
				Module.XDEMapRemoveLayer("XDLMeasureDist");
				$("#viewTool_Other_1").removeClass("toolActive");
				IDE.TOOL.Pn = 1;
			} else {
				return;
			}
		} // end of executeTerrainHeight
	},
	UX:{
		isExtend:true,
		sideExpand:function() {
			$("#content").css("margin-left", "60");
			if(IDE.UX.PANNEL.isOpenExtention) {
				$("#sideExtention").css("left", "60px");
			}
		},
		sideExtend:function() {
			$("#content").css("margin-left", "220px");
			if(IDE.UX.PANNEL.isOpenExtention) {
				$("#sideExtention").css("left", "220px");
			}
		},
		BASEMAP:{
			Bn:0,
			callBaseMap:function() {
				IDE.UX.PANNEL.callExtention();

				// Call Basemap Contents
				$("#sideExtentionBaseMap").css("display", "block");
			}
		},
		PANNEL:{
			isOpenExtention:false,
			closeExtention:function() {
				IDE.UX.PANNEL.isOpenExtention = false;
				$("#sideExtention").css("display", "none");
			},
			callExtention:function() {
				IDE.UX.PANNEL.isOpenExtention = true;
				$("#sideExtention").css("display", "block");
				$("#sideExtention").css("left", "220px");
			}
		}
	},
	AI:{
		itv:null,
		isn:null,
		isnt:0,
		ps:[
			["10", "20", "40", "70", "100"],
			["0", "15", "50", "68", "80", "95", "100"],
			["5", "25", "45", "95", "100"],
			["30", "60", "90", "100"],
			["5", "20", "30", "40", "50", "55", "70", "100"],
			["8", "15", "24", "38", "55", "78", "95", "100"],
			["9", "17", "25", "38", "47", "55", "62", "68", "72", "84", "96", "100"],
			["13", "19", "26", "35", "48", "59", "65", "79", "91", "100"],
			["5", "17", "29", "35", "46", "66", "82", "100"],
			["2", "9", "34", "44", "62", "78", "88", "100"]
		],
		detectLegend : {

			legend : {
				class_0 : {
					name : "건물(지붕형)",
					key : "building_roof",
					color : [252, 213, 180],
					hexColor : "#fcd5b4",
					count : 0
				},
				class_1 : {
					name : "건물(옥상형)",
					key : "building_roof",
					color : [250, 191, 143],
					hexColor : "#fabf8f",
					count : 0
				},
				class_12 : {
					name : "대",
					key : "empty",
					color : [49, 134, 155],
					hexColor : "#31869b",
					count : 0
				},
				class_15 : {
					name : "창고용지",
					key : "storage_site",
					color : [33, 89, 103],
					hexColor : "#215967",
					count : 0
				},
				class_11 : {
					name : "임야",
					key : "forest",
					color : [168, 232, 37],
					hexColor : "#a8e825",
					count : 0
				},
				class_5 : {
					name : "전, 답",
					key : "farm",
					color : [196, 215, 155],
					hexColor : "#c4d79b",
					count : 0
				},
				class_14 : {
					name : "과수원",
					key : "fruit_garden",
					color : [216, 228, 188],
					hexColor : "#d8e4bc",
					count : 0
				},
				class_2 : {
					name : "비닐하우스(백)",
					key : "vinyl_house_white",
					color : [196, 189, 151],
					hexColor : "#c4bd97",
					count : 0
				},
				class_3 : {
					name : "비닐하우스(흑)",
					key : "vinyl_house_black",
					color : [148, 138, 84],
					hexColor : "#948a54",
					count : 0
				},
				class_4 : {
					name : "도로",
					key : "road",
					color : [242, 242, 242],
					hexColor : "#f2f2f2",
					count : 0
				},
				class_10 : {
					name : "주차장",
					key : "parking_area",
					color : [166, 166, 166],
					hexColor : "#a6a6a6",
					count : 0
				},
				class_13 : {
					name : "철도용지",
					key : "railroad_site",
					color : [217, 217, 217],
					hexColor : "#d9d9d9",
					count : 0
				},
				class_6 : {
					name : "하천",
					key : "river",
					color : [22, 54, 92],
					hexColor : "#16365c",
					count : 0
				},
				class_7 : {
					name : "유지",
					key : "site",
					color : [83, 141, 213],
					hexColor : "#538dd5",
					count : 0
				},
				class_8 : {
					name : "제방",
					key : "river_bank",
					color : [141, 180, 226],
					hexColor : "#8db4e2",
					count : 0
				},
				class_16 : {
					name : "염전",
					key : "salt",
					color : [197, 217, 241],
					hexColor : "#c5d9f1",
					count : 0
				},
				class_9 : {
					name : "묘지",
					key : "cemetery",
					color : [150, 54, 52],
					hexColor : "#963634",
					count : 0
				},
				class_others : {
					name : "기타",
					key : "others",
					color : [255, 255, 255],
					hexColor : "#ffffff",
					count : 0
				}
			},

			legendCountUp : function(_classNumber) {

				var legendInfo = this.legend["class_"+_classNumber];

				if (typeof legendInfo == 'undefined') {
					legendInfo = this.legend["class_others"];
				}

				legendInfo.count++;
			},
			getLegendColor : function(_classNumber) {

				var legendInfo = this.legend["class_"+_classNumber];
				if (typeof legendInfo == 'undefined') {
					legendInfo = this.legend["class_others"];
				}

				return legendInfo.color;
			},
			getLegendName : function(_classNumber) {

				var legendInfo = this.legend["class_"+_classNumber];
				if (typeof legendInfo == 'undefined') {
					legendInfo = this.legend["class_others"];
				}

				return legendInfo.name;
			},
			clearCount : function() {

				var data = [];

				for (var id in this.legend) {

					if (this.legend.hasOwnProperty(id)) {
						this.legend[id].count = 0;
					}
				}

				return data;
			},
			getLegendGraphData : function() {

				var data = [];

				for (var id in this.legend) {

					if (this.legend.hasOwnProperty(id)) {

						if (this.legend[id].count > 0) {
							data.push({
								label : this.legend[id].name,
								value : this.legend[id].count,
								color : this.legend[id].hexColor
							});
						}
					}
				}

				return data;
			},

			getLegendGraphHexColorList : function() {

				var colors = [];

				for (var id in this.legend) {

					if (this.legend.hasOwnProperty(id)) {

						if (this.legend[id].count > 0) {
							colors.push(this.legend[id].hexColor);
						}
					}
				}

				return colors;
			}
		},

		showHideControl:function(layer, s) {

			if(s == "SHOW") {

				if(layer == "yp_cadstral") {
					setWmsLayerVisible("khaia:yp_area", true);	// 추가 sumin 201030
					//Module.XDEMapCreateWMSLayer("khaia:yp_area", "http://www.egiscloud.com", parseInt(8043), "geoserver/wms?", "", 10, 21, 256,"1.1.0");
					//Module.XDRenderData();
					//Module.XDRTTRefresh();
				}
			} else {
				setWmsLayerVisible("khaia:yp_area", false);	// 추가 sumin 201030
			}

		},
		reset:function() {
			$("#ai_process_scanning_text").html("0%");
			$("#ai_process_scanning").css("width", "0%");

			$("#ai_process_detect").css("width", "0%");
			$("#ai_process_detect_text").html("0%");

			$("#ai_process_batch").css("width", "00%");
			$("#ai_process_batch_text").html("0%");

			$("#AIDetectionResultWrap").css("display", "none");
			$("#aiDetectionProgressWrap").css("display", "none");
			$("#aiTotalGraphWrap").css("display", "none");

			$("#aiResultTblWrap").css("display", "none");

			$("#aiDetectResultTbl").empty();
			$("#morris-donut-chart").empty();
			$("#aiDetectTotal").html("");

			IDE.AI.isn = null;
			IDE.AI.itv = null;
			IDE.AI.isnt = 0;

			$("#AIDetectionResultWrap").css("display", "none");
			$("#aiDetectionProgressWrap").css("display", "none");


			var layerList = new Module.JSLayerList(true);
			var layer = layerList.nameAtLayer("ML_RESULT_RECT");
			if (layer != null) {
				layer.removeAll();
			}

			var layer = layerList.nameAtLayer("ML_RESULT_SELECT_POSITION");
			if (layer != null) {
				layer.removeAll();
			}

			setTimeout(function(){
				GLOBAL.Control.setMouseRotMode(true);
			}, 1000);
		},
		startAIDetect:function() {
			IDE.AI.reset();
			$("#ai_process_scanning_text").html("0%");
			$("#ai_process_scanning").css("width", "0%");

			$("#ai_process_detect").css("width", "0%");
			$("#ai_process_detect_text").html("0%");

			$("#ai_process_batch").css("width", "0%");
			$("#ai_process_batch_text").html("0%");

			$("#AIDetectionResultWrap").css("display", "block");
			$("#aiDetectionProgressWrap").css("display", "block");

			$("#aiDetectResultTbl").empty();
			$("#morris-donut-chart").empty();
			$("#aiDetectTotal").html("");

			IDE.AI.isn = null;
			IDE.AI.itv = null;
			IDE.AI.isnt = 0;



			IDE.AI.stepAIImageScanning();
		},
		stepAIImageScanning:function() {


			var imagePc = 0;

			//var inStep
			if(IDE.AI.isn == null) {
				IDE.AI.isn = Math.floor((Math.random() * 9));

				console.log("IDE AI isn : "+IDE.AI.isn);
			}

			//console.log(IDE.AI.ps[IDE.AI.isn].length);

			if(IDE.AI.isnt == 0) {
				imagePc = IDE.AI.ps[IDE.AI.isn][0];
				IDE.AI.isnt++;

				IDE.AI.itv = setTimeout(function() {
					IDE.AI.stepAIImageScanning();
				}, 1000);

				console.log("isnt == 0");
			} else {
				if(IDE.AI.isnt < (IDE.AI.ps[IDE.AI.isn].length - 1)) {

					IDE.AI.isnt++;

					IDE.AI.itv = setTimeout(function() {
						IDE.AI.stepAIImageScanning();
					}, 1000);

				} else {
					clearTimeout(IDE.AI.itv);

					$("#ai_process_detect").css("width", "30%");
					$("#ai_process_detect_text").html("30%");
					IDE.AI.detectAI(3);

					console.log('detectAI  3');
				}

				imagePc = IDE.AI.ps[IDE.AI.isn][IDE.AI.isnt];

				console.log('imagePc : ' + imagePc);
			}
			$("#ai_process_scanning_text").html(imagePc+"%");
			$("#ai_process_scanning").css("width", imagePc+"%");


		},
		detectAI:function(an) {
			//IDE.AI.stepAIImageScanning();

			$("#ai_process_detect").css("width", "50%");
			$("#ai_process_detect_text").html("50%");


			var detect_type = "";
			switch(an) {
				case 1:
					detect_type = "gun";
				break;

				case 2:
					detect_type = "coco";
				break;

				case 3:
					detect_type = "bld";
				break;

				case 4:
					detect_type = "boat";
				break;
			}

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
			copyCanvas.width = Module.canvas.width;
			copyCanvas.height = Module.canvas.height;

			// 3D 지도 캔버스 이미지를 추출해 2D 변환용 캔버스로 옮긴다
			ctx.drawImage(Module.canvas, 0, 0);
			if (TB_UserDraw.isOpen){
				TB_UserDraw.removeDrawCanvasBorder();
				ctx.drawImage(TB_UserDraw.canvas, 0, 0);
			}

			/*
			var canvasBlob = copyCanvas.toBlob(function(blob){
				var url = URL.createObjectURL(blob);



			}, "image/png", 1.0);

			*/

			var dataUrl = copyCanvas.toDataURL();

			/*
			var blobBin = atob(dataUrl.split(',')[1]);
			var array = [];
			for(var i = 0; i < blobBin.length; i++) {
				array.push(blobBin.charCodeAt(i));
			}
			var file= new Blob([new Uint8Array(array)], {type: 'image/png'});

			var f = IDE.AI.blobToFile(file, "ai_source.png");
			console.log(file);
			console.log(f);


			//var blob = dataURItoBlob(dataUrl);

			*/

			var ff = dataURLtoFile(dataUrl,'hello.png');
			/*
			var url = URL.createObjectURL(ff);
			var dl = document.createElement('a');
			dl.setAttribute('href', url);
			dl.setAttribute("download", 'XDMapScreenShot.png');
			document.body.appendChild(dl);
			dl.click();
			document.body.removeChild(dl);

			return;
			*/

			$("#ai_process_detect").css("width", "70%");
			$("#ai_process_detect_text").html("70%");

			console.log(ff);

			var formData = new FormData();
			formData.append("file", ff);
			formData.append("return_type", "json");
			//formData.append("return_type", "file");
			formData.append("detect_type", detect_type);

			$.ajax({
				//url:"http://218.235.147.32:5000/detectai",
				url:"http://61.254.11.250:5750/detectai",
				//url:"http://192.168.1.58:5000/upload",
				//url:"/builder/controller/ai/ctrlAI.php",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				//enctype: 'multipart/form-data',
				success:function(result) {

					/*
					var blob = new Blob([result]);

					//link.href =window.URL.createObjectURL(blob);

					var url = window.URL.createObjectURL(blob);
					var dl = document.createElement('a');
					dl.setAttribute('href', url);
					dl.setAttribute("download", 'XDMapScreenShot.png');
					document.body.appendChild(dl);
					dl.click();
					document.body.removeChild(dl);

					return;
					*/
					console.log(result);
					//var result=JSON.parse(result);
					$("#ai_process_detect").css("width", "100%");
					$("#ai_process_detect_text").html("100%");

					$("#aiTotalGraphWrap").css("display", "block");
					$("#aiResultTblWrap").css("display", "block");

					if(result.response.length > 0) {
						IDE.AI.markupMachineDetectResult(copyCanvas.width, copyCanvas.height, result, function(result) {
							copyCanvas.remove();
						});
					}
				}
			});
		},

		sortDetectResult : function(_cellWidthNum, _cellHeightNum, _result) {

			var resultCell = {};
			for (var i=0; i<_cellHeightNum; i++) {

				resultCell[i] = {};

				for (var j=0; j<_cellWidthNum; j++) {

					resultCell[i][j] = {
						result : []
					};
				}
			}

			for (var i=0; i<_result.length; i++) {

				var detections = _result[i].detections.split(" ");

				var cellIndex_x = parseInt( parseFloat(detections[1])*10.0 );
				var cellIndex_y = parseInt( parseFloat(detections[2])*10.0 );

				resultCell[cellIndex_y][cellIndex_x].result.push(_result[i]);
			}

			return resultCell;
		},

		markupMachineDetectResult : async function(_imageWidth, _imageHeight, _result, _complateCallback) {

			var result = _result.response;
			var splitCellCount = 10;

			// 결과 반환할 레이어
			var layerList = new Module.JSLayerList(true);
			var layer = layerList.nameAtLayer("ML_RESULT_RECT");
			if (layer == null) {
				layer = layerList.createLayer("ML_RESULT_RECT", Module.ELT_SKY_LINE);
				layer.setMaxDistance(200000.0);
				layer.setSelectable(false);
			} else {
				layer.removeAll();
			}

			var donutGraph = null;

			this.detectLegend.clearCount();

			// 그리드 canvas 세팅
			var result = DRAW.OVERVIEW.createCanvas("gridCanvas");
			if( result == -1 )
				console.log( "create overview cnavas error");

			// result 2이면 새로 생성되기 떄문에 setGrid 해준다
			if( result > 1 ) 	DRAW.OVERVIEW.setGrid();
			console.log( "============================================================= get? create? canvas " + result);

			DRAW.CANVAS.INIT.clearCanvas();
			DRAW.CANVAS.INIT.setCanvasSize( Module.canvas.width, Module.canvas.height);

			DRAW.CANVAS.ETC.setColor( "rgba(255,255,255,0.7)", 1 );
			DRAW.CANVAS.LINE.setStyle( 1, "butt", "round" );
			DRAW.CANVAS.ETC.initGrid();
			DRAW.CANVAS.ETC.setVisible( "gridCanvas", true );

			// 그리드 단위로 결과 데이터 정렬
			var result = _result.response;
			result = this.sortDetectResult(splitCellCount, splitCellCount, result);

			var processIndex = 1;
			for (var i=0; i<splitCellCount; i++) {

				for (var j=0; j<splitCellCount; j++) {

					var cellResult = result[i][j].result;

					DRAW.CANVAS.INIT.clearRect( 0, 0, DRAW.CANVAS.CANVAS_MAIN.width, DRAW.CANVAS.CANVAS_MAIN.height);
					DRAW.CANVAS.ETC.drawGrid( splitCellCount, splitCellCount, 1 );
					DRAW.CANVAS.ETC.setColor( "rgba(255,255,255,0.7)", 0 );
					DRAW.CANVAS.ETC.drawGridRect( j, splitCellCount-i );

					for (var k=0; k<cellResult.length; k++) {

						var result_detections = cellResult[k].detections.split(" ");

						var line = this.createRectLine(
							"result_"+i+"_"+j+"_"+k,
							_imageWidth, _imageHeight,
							cellResult[k],
							this.detectLegend.getLegendColor(result_detections[0])
						);

						// 레이어에 객체 추가
						layer.addObject(line, 0);

						this.insertDetectPositionMoveButton(
							processIndex,
							_imageWidth, _imageHeight,
							result_detections[1], result_detections[2],
							cellResult[k].class,
							result_detections[0],
							cellResult[k].confidence
						);

						// 그래프 업데이트
						// this.detectLegend.legendCountUp(result_detections[0]);

						// if (donutGraph == null) {
						// 	donutGraph = new Morris.Donut({
						// 		element: 'morris-donut-chart',
						// 		data: this.detectLegend.getLegendGraphData(),
						// 		labelColor:"#FFFFFF",
						// 		colors : this.detectLegend.getLegendGraphHexColorList()
						// 	});
						// } else {
						// 	donutGraph.setData(this.detectLegend.getLegendGraphData());
						// }

						// 진행률 표시
						var rate = (processIndex / _result.response.length * 100.0).toFixed(2);
						$("#ai_process_batch").css("width", rate + "%");
						$("#ai_process_batch_text").html(rate + "%");

						processIndex++;
						// sleep(50.0 * Math.random());
						await sleep(50.0 * Math.random());
					}
				}
			}

			if (_complateCallback) {
				_complateCallback(_result);
			}

			DRAW.CANVAS.ETC.setVisible( "gridCanvas" , false );
			$("#ai_process_batch").css("100%");
			$("#ai_process_batch_text").html("100%");

			$(".layer-panel.result").show();
			$(".layer-panel.loading").hide();

			Module.XDRenderData();
		},

		createRectLine : function(_key, _imageWidth, _imageHeight, _data, _color) {

			var line = Module.createLineString(_key);

			// 좌표 리스트 생성
			var result_detections = _data.detections.split(" ");

			var coordinates = this.getDetectionRectCoordinates(
				_imageWidth, _imageHeight,
				result_detections[1], result_detections[2],
				result_detections[3], result_detections[4]
			);

			var parts = new Module.Collection();
			parts.add(5);
			line.setPartCoordinates(coordinates, parts);

			var color = new Module.JSColor(255, _color[0], _color[1], _color[2]);

			var lineStyle = new Module.JSPolyLineStyle();
			lineStyle.setWidth(1.1);
			lineStyle.setColor(color);
			line.setStyle(lineStyle);

			return line;
		},

		insertDetectPositionMoveButton : function(_index, _imageWidth, _imageHeight, _centerScreen_x, _centerScreen_y, _classType, _classNumber, _confidenct) {

			var center = this.screenToLonLatAlt(parseFloat(_centerScreen_x)*_imageWidth, parseFloat(_centerScreen_y)*_imageHeight, 0.0);

			var className = this.detectLegend.getLegendName(_classNumber);

			var html = "";
			html += "<tr>\n";
			html += "	<td>"+_index+"</td>\n";
			html += "	<td class='text-left'>"+_classType+"</td>\n";
			html += "	<td>"+className+"</td>\n";
			html += "	<td>"+_confidenct+"</td>\n";
			html += "	<td>\n"
			html += "		<a class=\"icon-btn location\" href=\"javascript:IDE.AI.moveDetectPosition(" + center.Longitude + "," + center.Latitude + "," + center.Altitude + ", '" + className + "');\">\n";
			html += "		</a>\n";
			html += "	</td>\n";
			html += "</tr>\n";

			$("#aiDetectResultTbl").append(html);
		},

		getDetectionRectCoordinates : function (_imageWidth, _imageHeight, _centerX, _centerY, _width, _height) {

			var coordinates = new Module.JSVec3Array();

			var center_x = parseFloat(_centerX) * _imageWidth;
			var center_y = parseFloat(_centerY) * _imageHeight;

			var halfWidth = (parseFloat(_width) * _imageWidth) / 2;
			var halfHeight = (parseFloat(_height) * _imageHeight) / 2;

			var screenPos_min_x = center_x - halfWidth;
			var screenPos_min_y = center_y - halfHeight;

			var screenPos_max_x = center_x + halfWidth;
			var screenPos_max_y = center_y + halfHeight;

			coordinates.push( this.screenToLonLatAlt(screenPos_min_x, screenPos_min_y, 2.0) );	// left-top
			coordinates.push( this.screenToLonLatAlt(screenPos_max_x, screenPos_min_y, 2.0) );	// right-top
			coordinates.push( this.screenToLonLatAlt(screenPos_max_x, screenPos_max_y, 2.0) );	// right-bottom
			coordinates.push( this.screenToLonLatAlt(screenPos_min_x, screenPos_max_y, 2.0) );	// left-bottom
			coordinates.push( this.screenToLonLatAlt(screenPos_min_x, screenPos_min_y, 2.0) );	// left-top

			return coordinates;
		},

		moveDetectPosition : function(_lon, _lat, _alt, cln) {

			var position = new Module.JSVector3D(_lon, _lat, _alt+100.0);

			// 카메라 위치 이동
			var camera = new Module.getViewCamera();
			camera.setTilt(90.0);
			camera.setLocation(position);

			// 위치 표시
			var layerList = new Module.JSLayerList(true);
			var layer = layerList.nameAtLayer("ML_RESULT_SELECT_POSITION");
			if (layer == null) {
				layer = layerList.createLayer("ML_RESULT_SELECT_POSITION", Module.ELT_3DPOINT);
				layer.setMaxDistance(200000.0);
				layer.setSelectable(false);
			} else {
				layer.removeAll();
			}

			var point = new Module.createPoint("point_"+layer.getObjectCount());
			position.Altitude = _alt;
			point.setPosition(position);
			// point.setText("O");
			point.setText(cln);

			layer.addObject(point, 0);
		},

		screenToLonLatAlt : function(_screenX, _screenY, _moveAltitude) {
			var pos = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(_screenX, _screenY));
			pos.Altitude += _moveAltitude;
			return pos;
		},

		screenToLonLat : function(_screenX, _screenY) {
			var pos = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(_screenX, _screenY));
			return new Module.JSVector2D(pos.Longitude, pos.Latitude);
		},

		blobToFile:function(bl, fname) {
			bl.lastModifiedDate = new Date();
			bl.name = fname;
			return bl;
		}
	},
	SIMULATION:{
		FLOOD:{
			callFlood:function() {
				///////////////////// 영역으로 물판 생성 /////////////////////
				Module.XDEMapRemoveLayer("waterPlaneLayer");
				Module.XDCreateLayer(17, "waterPlaneLayer");
				var vMin = new Module.JSVector2D(127.281666, 36.480379);
				var vMax = new Module.JSVector2D(127.290618, 36.487052);
				Module.CreateWaterPlane("waterPlaneLayer", "waterplane", vMin, vMax, 50);
			},
			removeFlood:function() {
				Module.XDEMapRemoveLayer("waterPlaneLayer");
			},
			moveSimulationCoord:function() {
				Module.getViewCamera().setViewAt(127.285, 36.4829, 1000, 45, 0);
			},
			plusLevel:function(h) {
				var h = Module.SetWaterHeight("waterPlaneLayer", "waterplane", h);
				//console.log(h);
				$("#floodCurrentHeight").html(""+h+"m");
			},
			minusLevel:function(h) {
				var h = Module.SetWaterHeight("waterPlaneLayer", "waterplane", h);
				//console.log(h);
				$("#floodCurrentHeight").html(""+h+"m");
			},
			callFloodControl:function() {
				$("#floodControlWrap").css("display", "block");
			},
			closeFloodControl:function() {
				IDE.SIMULATION.FLOOD.removeFlood();
				$("#floodControlWrap").css("display", "none");
			}
		}
	},
	CANVAS:{
		getColorCircle:function(radius, color) {
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');
			canvas.width = radius * 4;
			canvas.height = radius * 4;
			var x = canvas.width / 2;
			var y = canvas.height / 2;

			context.beginPath();
			context.arc(x, y, radius, 0, 2*Math.PI, false);
			context.fillStyle = color;
			context.fill();
			context.lineWidth = 2;
			context.strokeStyle = 'white';
			context.stroke();
			return context.getImageData(0,0,canvas.width,canvas.height);
		}
	},
	UTIL:{
		getShapeType:function(t) {
			var shapeType = "";
			switch(t) {
				case 1:
					shapeType = "LINE STRING";
				break;

				case 2:
					shapeType = "POLYGON";
				break;

				case 3:
					shapeType = "POINT";
				break;

				case 4:
					shapeType = "MULTI POINT";
				break;

				case 5:
					shapeType = "MULTI LINE STRING";
				break;

				case 6:
					shapeType = "MULTI POLYGON";
				break;

				case 7:
					shapeType = "GEOMETRY COLLECTION";
				break;
			}

			return shapeType;
		},
		currentCoord:function(x, y, a) {
			//console.log(arguments);
			/*
			var pt = IDE.UTIL.transformCoordTM(x, y, "13");

			$("#globalCoordInfoX").html(pt.x);
			$("#globalCoordInfoY").html(pt.y);

			$("#globalCoordInfo").html("<i class=\"fa fa-map-marker-alt\"> "+pt.x.toFixed(2)+", "+pt.y.toFixed(2)+", "+parseFloat(a).toFixed(2)+"");
			*/

			//var pt = IDE.UTIL.transformCoordTM(x, y, "13");

			$("#globalCoordInfoX").html(x);
			$("#globalCoordInfoY").html(y);

			$("#globalCoordInfo").html("<i class=\"fa fa-map-marker-alt\"> "+x+", "+y+", "+parseFloat(a)+"");
		},
		getQueryVariable:function(variable) {
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i=0;i<vars.length;i++) {
				var pair = vars[i].split("=");
				if (pair[0] == variable) {
					return pair[1];
				}
			}
		},
		getCoordTypeByName:function(t) {
			var coordType = "Unknown";

			switch(t) {
				case "13" :
					coordType = "EPSG:4326";
				break;

				case "14" : //보정된 오래된 지리원 표준 - 서부원점 epsg:5173

					coordType = "EPSG:5173";
				break;

				case "15" : //보정된 오래된 지리원 표준 - 중부원점 epsg:5174

					coordType = "EPSG:5174";
				break;

				case "16" : //보정된 오래된 지리원 표준 - 동부원점 epsg:5176

					coordType = "EPSG:5176";
				break;

				case "17" : //타원제 바꾼 지리원 표준 - 중부원점 epsg:5181

					coordType = "EPSG:5181";
				break;

				case "18" : //타원제 바꾼 지리원 표준 - 동부원점 epsg:5183

					coordType = "EPSG:5183";
				break;

				case "19" : //보정된 오래된 지리원 표준 - 제주원점 epsg:5175

					coordType = "EPSG:5175";

				break;

				case "20" : // 2017년 국토지리정보원 표준 - 중부원점 epsg:5186

					coordType = "EPSG:5186";
				break;

				case "21" : // 2017년 국토지리정보원 표준 - 서부원점 epsg:5185

					coordType = "EPSG:5185";
				break;

				case "24" : // UTM-K (Bessel): 새주소지도에서 사용 중 epsg:5178

					coordType = "EPSG:5178";
				break;

				case "25" : // 네비게이션용 KATEC 좌표계(KOTI-KATEC)

					coordType = "KOTI-KATEC";
				break;

				case "26" : // UTM-K (GRS80): 네이버지도에서 사용중인 좌표계  epsg:5179

					coordType = "EPSG:5179";
				break;

				case "34" : // UTM Zone 51 Northern(Bessel) epsg:32651

					coordType = "EPSG:32651";
				break;

				case "35" : // UTM Zone 52 Northern(Bessel)  epsg:32652
					coordType = "EPSG:32652";
				break;

				case "135" :
					coordType = "EPSG:32750";
				break;
			}
			return coordType;
		},
		transformCoord:function(x, y, t) {

			Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

			var source = null;

			switch(t) {
				case "13" :
					source = new Proj4js.Proj("EPSG:4326");
				break;

				case "14" : //보정된 오래된 지리원 표준 - 서부원점 epsg:5173
					Proj4js.defs["EPSG:5173"] = "+proj=tmerc +lat_0=38 +lon_0=125.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("EPSG:5173");
				break;

				case "15" : //보정된 오래된 지리원 표준 - 중부원점 epsg:5174
					Proj4js.defs["EPSG:5174"] = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("EPSG:5174");
				break;

				case "16" : //보정된 오래된 지리원 표준 - 동부원점 epsg:5176
					Proj4js.defs["EPSG:5176"] = "+proj=tmerc +lat_0=38 +lon_0=129.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("EPSG:5176");
				break;

				case "17" : //타원제 바꾼 지리원 표준 - 중부원점 epsg:5181
					Proj4js.defs["EPSG:5186"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5186");
				break;

				case "18" : //타원제 바꾼 지리원 표준 - 동부원점 epsg:5183
					Proj4js.defs["EPSG:5187"] = "+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5187");
				break;

				case "19" : //보정된 오래된 지리원 표준 - 제주원점 epsg:5175
					Proj4js.defs["EPSG:5182"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=550000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5182");

				break;

				case "20" : // 2017년 국토지리정보원 표준 - 중부원점 epsg:5186
					Proj4js.defs["EPSG:5186"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5186");
				break;

				case "21" : // 2017년 국토지리정보원 표준 - 서부원점 epsg:5185
					Proj4js.defs["EPSG:5185"] = "+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5185");
				break;

				case "24" : // UTM-K (Bessel): 새주소지도에서 사용 중 epsg:5178
					Proj4js.defs["EPSG:5178"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("EPSG:5178");
				break;

				case "25" : // 네비게이션용 KATEC 좌표계(KOTI-KATEC)
					Proj4js.defs["KOTI-KATEC"] = "+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
					source = new Proj4js.Proj("KOTI-KATEC");
				break;

				case "26" : // UTM-K (GRS80): 네이버지도에서 사용중인 좌표계  epsg:5179
					Proj4js.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:5179");
				break;

				case "34" : // UTM Zone 51 Northern(Bessel) epsg:32651
					Proj4js.defs["EPSG:32651"] = "+proj=utm +zone=51 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:32651");
				break;

				case "35" : // UTM Zone 52 Northern(Bessel)  epsg:32652

					Proj4js.defs["EPSG:32652"] = "+proj=utm +zone=52 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:32652");
				break;

				case "130" :
					// UTM 48N
					Proj4js.defs["EPSG:32648"] = "+proj=utm +zone=48 +datum=WGS84 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:32648");
				break;

				case "131" :
					// UTM 48S
					Proj4js.defs["EPSG:32748"] = "+proj=utm +zone=48 +south +datum=WGS84 +units=m +no_defs";
					source = new Proj4js.Proj("EPSG:32748");
				break;

				case "135" :
					Proj4js.defs["EPSG:32750"] = "+proj=utm +zone=50 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ";
					source = new Proj4js.Proj("EPSG:32750");

				break;

			}

			var dest = new Proj4js.Proj("EPSG:4326");

			console.log(source, dest);
			console.log(x, y, t);

			var pt = new Proj4js.Point(x, y);
			console.log(pt);

			var rs = Proj4js.transform(source, dest, pt);
			console.log(rs);

			return rs;
		},
		transformCoordTM:function(x, y, t) {

			Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

			var source = null;

			switch(t) {
				case "20" : // 2017년 국토지리정보원 표준 - 중부원점 epsg:5186
					source = new Proj4js.Proj("EPSG:4326");
				break;
			}

			Proj4js.defs["EPSG:5186"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
			var dest = new Proj4js.Proj("EPSG:5186");

			var pt = new Proj4js.Point(x, y);

			var rs = Proj4js.transform(source, dest, pt);

			return rs;
		}
	}
}

// IDE EVENTS
$("#addGroupName").on("keyup", function(e) {
	if(e.keyCode == 13) {
		IDE.LAYERGROUP.addGroup();
	}
});

$("#modifyGroupName").on("keyup", function(e) {
	if(e.keyCode == 13) {
		IDE.LAYERGROUP.confirmChangeGroupName();
	}
});

$("#modifyDefaultGroupName").on("keyup", function(e) {
	if(e.keyCode == 13) {
		IDE.LAYERGROUP.confirmChangeDefaultGroupName();
	}
});

$("#saveMapName").on("keyup", function(e) {
	if(e.keyCode == 13) {
		IDE.MAP.saveMap();
	}
});

$("#modifyLayerName").on("keyup", function(e) {
	if(e.keyCode == 13) {
		IDE.LAYER.confirmChangeLayerName();
	}
});

$("#showBuilding").change(function() {
	if($(this).is(":checked")) {
		Module.getMap().setLayerVisible("facility_build", true);
		Module.getMap().setLayerVisible("facility_bridge", true);
	} else {
		Module.getMap().setLayerVisible("facility_build", false);
		Module.getMap().setLayerVisible("facility_bridge", false);
	}
});

$("#modifyLayerCompareImageList").change(function() {
	if(this.value == "") {
		return;
	}

	IDE.LAYER.loadImageData(this.value);
});

$("#lodModelCheck").change(function() {
	if($(this).is(':checked')) {
		/*
		Module.XDEMapRemoveLayer("drone_190103");
		Module.XDEMapCreateLayer("drone_190103","http://xdmap.com:8080",0,false,true,false,20,12,12,0); // dorne model
		Module.setVisibleRange( "drone_190103", 1.0, 1000 );
		*/

		Module.XDEMapRemoveLayer("190103_model");
		Module.XDEMapCreateLayer("190103_model","http://con.terrasense.co.kr:8080",0,false,true,false,20,12,12,0); // dorne model
		Module.setVisibleRange( "190103_model", 1.0, 1000);

		/*
		Module.XDEMapRemoveLayer("190103_model");
		Module.XDEMapCreateLayer("190103_model","http://con.terrasense.co.kr/static/data/190103_model",0,false,true,true,20,12,12,0); // dorne model
		Module.setVisibleRange( "190103_model", 1.0, 1000 );
		*/

		//Module.SetDrawTerrain(false);
		//Module.SetPlanetImageryType(-1);


		Module.getViewCamera().setViewAt(parseFloat(127.28544517357837), parseFloat(36.48290177408396), 1000, 45, 0);

	} else {
		Module.XDEMapRemoveLayer("190103_model");
	}
});

$("#lodModelCheck190315").change(function() {
	if($(this).is(':checked')) {
		/*
		Module.XDEMapRemoveLayer("190315_model");
		Module.XDEMapCreateLayer("190315_model","http://con.terrasense.co.kr/static/data/190315_model",0,false,true,true,20,12,12,0); // dorne model
		Module.setVisibleRange( "190315_model", 1.0, 1000 );
		*/

		Module.XDEMapRemoveLayer("190315_model");
		Module.XDEMapCreateLayer("190315_model","http://con.terrasense.co.kr:8080",0,false,true,false,20,12,12,0); // dorne model
		Module.setVisibleRange( "190315_model", 1.0, 1000);

		//Module.SetDrawTerrain(false);
		//Module.SetPlanetImageryType(-1);


		Module.getViewCamera().setViewAt(parseFloat(127.28544517357837), parseFloat(36.48290177408396), 1000, 45, 0);

	} else {
		Module.XDEMapRemoveLayer("190315_model");
	}
});


$("#lodModelCheck190411").change(function() {
	if($(this).is(':checked')) {
		/*
		Module.XDEMapRemoveLayer("190411_model");
		Module.XDEMapCreateLayer("190411_model","http://con.terrasense.co.kr/static/data/190411_model",0,false,true,true,20,12,12,0); // dorne model
		Module.setVisibleRange( "190411_model", 1.0, 1000 );
		*/

		Module.XDEMapRemoveLayer("190411_model");
		Module.XDEMapCreateLayer("190411_model","http://con.terrasense.co.kr:8080",0,false,true,false,20,12,12,0); // dorne model
		Module.setVisibleRange( "190411_model", 1.0, 1000);
		//Module.SetDrawTerrain(false);
		//Module.SetPlanetImageryType(-1);


		Module.getViewCamera().setViewAt(parseFloat(127.28544517357837), parseFloat(36.48290177408396), 1000, 45, 0);

	} else {
		Module.XDEMapRemoveLayer("190411_model");
	}
});

$("#lodModelCheck190510").change(function() {
	if($(this).is(':checked')) {
		/*
		Module.XDEMapRemoveLayer("190510_model");
		//Module.XDEMapCreateLayer("drone_190103","http://xdmap.com:8080",0,false,true,false,20,12,12,0); // dorne model
		Module.XDEMapCreateLayer("190510_model","http://con.terrasense.co.kr:8080",0,false,true,false,20,12,12,0); // dorne model
		//Module.XDEMapCreateLayer("190510_model","http://con.terrasense.co.kr",0,false,true,true,20,12,12,0); // dorne model
		Module.setVisibleRange( "190510_model", 1.0, 1000 );
		//Module.SetDrawTerrain(false);
		//Module.SetPlanetImageryType(-1);
		*/
		Module.XDEMapRemoveLayer("190510_model");
		Module.XDEMapCreateLayer("190510_model","http://con.terrasense.co.kr:8080",0,false,true,false,20,12,12,0); // dorne model
		Module.setVisibleRange( "190510_model", 1.0, 1000);


		Module.getViewCamera().setViewAt(parseFloat(127.28544517357837), parseFloat(36.48290177408396), 1000, 45, 0);

	} else {
		Module.XDEMapRemoveLayer("190510_model");
	}
});


function OnEventSelectedObject(_layer, _key) {
	//console.log(arguments);

	var layer = _layer.split("_");

	if(layer[0] == "INTEREST") {
		IDE.TOOL.INTEREST.callMessageBox(layer[2]);
	}
}

var sliderElement = document.querySelector('.js-decimal');
// var initSliderElement = new Powerange(sliderElement, {
// 	decimal: false,
// 	callback: IDE.LAYER.changeCompareDivRate,
// 	max: 100,
// 	start: 50,
// 	hideRange : true
// });
var handlePosition =  $("#SLD_range-handle").position();

// IDE.LAYER.offsetLeft = handlePosition.left;

$("#SLD_range-handle").html("<i class=\"fa fa-angle-left m-t-10\"></i> <i class=\"fa fa-angle-right m-t-10\"></i>");

$(function() {
	//console.log(initSliderElement);

});

$("#interestPointOtherCont").on("keyup", function(e) {
	if(e.keyCode == 13) {
		IDE.TOOL.INTEREST.addInterestComment();
	}
});

$("#modifyInterestPointOtherCont").on("keyup", function(e) {
	if(e.keyCode == 13) {
		IDE.TOOL.INTEREST.addModifyInterestComment();
	}
});


function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});


}

function dataURLtoFile(dataurl, fileName) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, {type:mime});
    }

function sleep(ms) {
	return new Promise(function(resolve){
		setTimeout(resolve, ms);
	});
}

var grid = null;




$("#yp_cadstral").change(function() {
	if($(this).is(":checked")) {
		IDE.AI.showHideControl("yp_cadstral", "SHOW");
		$("#cadastralLegeldWrap").css("display", "block");
	} else {
		IDE.AI.showHideControl("yp_cadstral", "HIDE");
		$("#cadastralLegeldWrap").css("display", "none");
	}
});

$("#yp_cadstral_info").change(function() {
	if($(this).is(":checked")) {
		IDE.DATA.MODEL_3DS.showHideControl( "BOARD_LAYER", "SHOW" );
		IDE.DATA.MODEL_3DS.showHideControl( "POLYGON_LAYER", "SHOW" );
	} else {
		IDE.DATA.MODEL_3DS.showHideControl( "BOARD_LAYER", "HIDE" );
		IDE.DATA.MODEL_3DS.showHideControl( "POLYGON_LAYER", "HIDE" );
	}
});

$("#yp_jiga").change(function() {
	if($(this).is(":checked")) 		LAYER.setVisibleLayer( "YP_JIGA_POI", true );
	else							LAYER.setVisibleLayer( "YP_JIGA_POI", false );
});

// 구역 정보
$("#yp_zone_statistics").change(function() {
	if($(this).is(":checked"))	IDE.DATA.MODEL_3DS.showHideControl( "YP_ZONE_STATISTICS", "SHOW" );
	else						IDE.DATA.MODEL_3DS.showHideControl( "YP_ZONE_STATISTICS", "HIDE" );
});

// 일치 여부
$("#yp_obj_same").change(function() {
	if($(this).is(":checked")) {
		
		var radioObj = document.all("mouse_option");
		for( var i=0; i<radioObj.length; i++ ) {
			if( radioObj[i].checked ) {
				radioObj[i].checked = false;
			}
		}
		
		IDE.CADASTRAL.areaPolygon(1);
		IDE.DATA.MODEL_3DS.showHideControl( "Area_POLYGON_LAYER", "SHOW" );
	} else {
		IDE.DATA.MODEL_3DS.showHideControl( "Area_POLYGON_LAYER", "HIDE" );
	}
	
});
// 토지용도
$("#yp_land_use").change(function() {
	if($(this).is(":checked")) {		
	
		var radioObj = document.all("mouse_option");
		for( var i=0; i<radioObj.length; i++ ) {
			if( radioObj[i].checked ) {
				radioObj[i].checked = false;
			}
		}
		
		IDE.CADASTRAL.areaPolygon(2);	
		IDE.DATA.MODEL_3DS.showHideControl( "Area_POLYGON_LAYER", "SHOW" );
	} else {
		IDE.DATA.MODEL_3DS.showHideControl( "Area_POLYGON_LAYER", "HIDE" );
	}
});



// WMS 레이어 로드 sumin 201030
function setWmsLayerVisible(_layerName, _visible) {

	var layerList = new Module.JSLayerList(false);
	var layer = layerList.nameAtLayer("khaia:yp_area");

	if (layer == null) {

		//Module.SetProxy("http://api.xdmap.com/proxy.php?url=");

		layer = layerList.createWMSLayer(_layerName);
		layer.setConnectionWMS("http://www.egiscloud.com:8043/geoserver/wms?", 0, "");
		layer.setLevelWMS(10, 21);
		layer.setLayersWMS("khaia:yp_area");
		layer.setTileSizeWMS(256);
		layer.setWMSVersion("1.1.0");
		layer.setCrsWMS("EPSG:5186", 20);
		layer.setProxyRequest(false);
		layer.setBBoxOrder(true);

	} else {
		if (layer.getType() != 11) {
			return;
		}
	}

	layer.setVisible(_visible);
}
