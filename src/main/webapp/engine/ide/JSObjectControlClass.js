var LAYER = {
	LAYERLIST: null,
	deleteLayer : function( _layername )
	{
		var result = LAYER.LAYERLIST.delLayerAtName( _layername );
		if( result )	console.log( "delete : " + _layername + " layer OK" );
		else 			console.log( "delete : " + _layername + " layer error" );
	},
	setLayerList : function()
	{
		LAYER.LAYERLIST = new Module.JSLayerList( true );
	},
	createLayer : function( _layername, _type )
	{
		var olayer = LAYER.findLayer( _layername );
		
		if ( olayer == null ) {
			olayer = LAYER.LAYERLIST.createLayer( _layername, _type );			
		} else {			
			return null;
		}
		return olayer;
	},
	findLayer : function( _layername )
	{
		return LAYER.LAYERLIST.nameAtLayer( _layername );
	},
	setVisibleLayer : function( _layername, _type )
	{
		var olayer = LAYER.findLayer( _layername );
		if ( olayer == null )	return -1;
		else 					olayer.setVisible( _type );
		Module.XDRenderData();				
		return 1;
	},
	OBJECT : {
		POI : {
			OLAYER: null,
			LAYERNAME: null,
			createLayer : function( _layername )
			{
				if( LAYER.OBJECT.POI.LAYERNAME == _layername)		return 2;
				LAYER.OBJECT.POI.LAYERNAME = _layername;
				LAYER.OBJECT.POI.OLAYER = LAYER.createLayer( LAYER.OBJECT.POI.LAYERNAME, Module.ELT_3DPOINT );
				
				if( LAYER.OBJECT.POI.OLAYER != null ) {
					// 레이어 생성 완료
					LAYER.OBJECT.POI.OLAYER.setMaxDistance( 200000.0 );
					console.log( " POI " + _layername + " layer OK" );
				} else {
					// 레이어 생성 실패
					console.log( " POI " + _layername + " layer error" );
					return -1;
				}
				return 1;
			},
			createObject : function( _objkey, _lon, _lat, _alt, _image, _size, _font, _linemode, _linecolor )
			{
				var poi = Module.createPoint( _objkey );
				//ARGB 순서
				var fillColor 	= new Module.JSColor( _font[1]["fill_color_a"], _font[1]["fill_color_r"], _font[1]["fill_color_g"], _font[1]["fill_color_b"] );
				var strokeColor	= new Module.JSColor( _font[1]["stroke_color_a"], _font[1]["stroke_color_r"], _font[1]["stroke_color_g"], _font[1]["stroke_color_b"] );
				poi.setText( _font[0]["text"] );
				poi.setFontStyle(	_font[0]["font_name"],
									_font[0]["font_size"],
									_font[0]["font_weight"], 
									fillColor, 
									strokeColor);
									
				var position = new Module.JSVector3D(_lon, _lat, _alt);
				poi.setPosition( position );
				
				var result = poi.setImage( _image, _size["width"], _size["height"] );
				
				if( _linemode ){
					var lineColor = new Module.JSColor( _linecolor["fill_color_a"], _linecolor["fill_color_r"], _linecolor["fill_color_g"], _linecolor["fill_color_b"] );
					poi.setPositionLine(0, lineColor);
				}
				
				LAYER.OBJECT.POI.OLAYER.addObject(poi, 0);
			},
			setLayer : function( _layername )
			{
				if( LAYER.OBJECT.POI.LAYERNAME == _layername)		return 1;
				var olayer = LAYER.findLayer( _layername );
				var type = olayer.getType();
				if( olayer == null || type != Module.ELT_3DPOINT )	return -1;
				
				LAYER.OBJECT.POI.LAYERNAME = _layername;
				LAYER.OBJECT.POI.OLAYER = olayer;
				return 1;				
			},
			setfont : function( _text, _fname, _fsize, _fweight, _fr, _fg, _fb, _fa, _sr, _sg, _sb, _sa )
			{				
				if( _text == null )			_text = " ";
				if( _fname == null )		_fname = "맑은 고딕";
				if( _fsize < 7 )			_fsize = 15;
				if( _fweight < 100 )		_fweight = 600;
				
				//var color = LAYER.ETC.setColor(_fr, _fg, _fb, _fa, _sr, _sg, _sb, _sa);
				var color = CETC.setJSONColor(_fr, _fg, _fb, _fa, _sr, _sg, _sb, _sa);
				
				var reusult_font =	[ { 
										"text": _text,
										"font_name": _fname,
										"font_size": _fsize,
										"font_weight": _fweight,
									} ];
				reusult_font.push(color);
				return reusult_font;
			},
			removeAllObject : function()
			{
				LAYER.OBJECT.POI.OLAYER.removeAll();
			},
			deleteLayer : function()
			{
				LAYER.deleteLayer( LAYER.OBJECT.POI.LAYERNAME );
				LAYER.OBJECT.POI.OLAYER = null;
				LAYER.OBJECT.POI.LAYERNAME = null;
			},
		},
		BILLBOARD : {
			OLAYER: null,
			LAYERNAME: null,
			createLayer : function( _layername )
			{
				if( LAYER.OBJECT.BILLBOARD.LAYERNAME == _layername)		return 2;
				LAYER.OBJECT.BILLBOARD.LAYERNAME = _layername;
				LAYER.OBJECT.BILLBOARD.OLAYER = LAYER.createLayer( LAYER.OBJECT.BILLBOARD.LAYERNAME, Module.ELT_BILLBOARD );
				if( LAYER.OBJECT.BILLBOARD.OLAYER != null ) {
					// 레이어 생성 완료
					LAYER.OBJECT.BILLBOARD.OLAYER.setMaxDistance( 200000.0 );
					console.log( " BILLBOARD " + _layername + " layer OK" );
				} else {
					// 레이어 생성 실패
					console.log( " BILLBOARD " + _layername + " layer error" );
					return -1;
				}
				return 1;
			},
			createObject : function( _objkey, _lon, _lat, _alt, _image, _size, scale )
			{
				var billboard = Module.createBillboard( _objkey );
				var position = new Module.JSVector3D(_lon, _lat, _alt);
				billboard.setImage(
								position,
								_image,
								_size["width"],
								_size["height"]
							);

				billboard.setSizeScale( scale, scale, scale );
				LAYER.OBJECT.BILLBOARD.OLAYER.addObject(billboard, 0);
			},
			getObject : function( _objkey, _lon, _lat, _alt, _image, _size, scale )
			{
				var billboard = Module.createBillboard( _objkey );
				var position = new Module.JSVector3D(_lon, _lat, _alt);
				billboard.setImage(
								position,
								_image,
								_size["width"],
								_size["height"]
							);

				billboard.setSizeScale( scale, scale, scale );
				return billboard;
			},
			setLayer : function( _layername )
			{
				if( LAYER.OBJECT.BILLBOARD.LAYERNAME == _layername)		return 1;
				
				var olayer = LAYER.findLayer( _layername );
				var type = olayer.getType();
				if( olayer == null || type != Module.ELT_BILLBOARD )	return -1;
				
				LAYER.OBJECT.BILLBOARD.LAYERNAME = _layername;
				LAYER.OBJECT.BILLBOARD.OLAYER = olayer;
				return 1;				
			},
			removeAllObject : function()
			{
				LAYER.OBJECT.BILLBOARD.OLAYER.removeAll();
			},
			deleteLayer : function()
			{
				LAYER.deleteLayer( LAYER.OBJECT.BILLBOARD.LAYERNAME );
				LAYER.OBJECT.BILLBOARD.OLAYER = null;
				LAYER.OBJECT.BILLBOARD.LAYERNAME = null;
			},
		},
		WALL : {
			OLAYER: null,
			LAYERNAME: null,
			createLayer : function( _layername )
			{
				if( LAYER.OBJECT.WALL.LAYERNAME == _layername)		return 2;
				LAYER.OBJECT.WALL.LAYERNAME = _layername;
				LAYER.OBJECT.WALL.OLAYER = LAYER.createLayer( LAYER.OBJECT.WALL.LAYERNAME, Module.ELT_POLYHEDRON );
				
				if( LAYER.OBJECT.WALL.OLAYER != null ) {
					// 레이어 생성 완료
					LAYER.OBJECT.WALL.OLAYER.setMaxDistance( 200000.0 );
					console.log( " WALL " + _layername + " layer OK" );
				} else {
					// 레이어 생성 실패
					console.log( " WALL " + _layername + " layer error" );
					return -1;
				}
				return 1;
			},
			createObject : function( _objkey, _position, _color )
			{
				var polygon = Module.createColorPolygon( _objkey );
				var coordinates = new Module.JSVec3Array();
				var parts = new Module.Collection();
				
				for( var i=0, len = _position.length/3; i<len; i++ ) {
					coordinates.push( new Module.JSVector3D(_position[ (i*3) ], _position[ (i*3)+1 ], _position[ (i*3)+2 ]) );
				}
				parts.add(_position.length/3);
				
				var firstColor 	= new Module.JSColor( _color["fill_color_a"], _color["fill_color_r"], _color["fill_color_g"], _color["fill_color_b"] );
				var nextColor	= new Module.JSColor( _color["stroke_color_a"], _color["stroke_color_r"], _color["stroke_color_g"], _color["stroke_color_b"] );
				
				// 폴리곤 수직 벽면 형태 정의
				polygon.SetVerticalPlane(	coordinates,
												parts,
												-50.0, 
												firstColor, 		// 하단 그라데이션 JSColor ( a, r, g, b )
												nextColor		// 상단 그라데이션
											);
											
				polygon.SetCullMode( 1 );
				LAYER.OBJECT.WALL.OLAYER.addObject( polygon, 0 );
			},
			createLineObject : function( _objkey, _position, _linewidth, _color )
			{
				var line = Module.createLineString( _objkey );
				var coordinates = new Module.JSVec3Array();
				var parts = new Module.Collection();
				
				for( var i=0, len = _position.length/3; i<len; i++ ) {
					coordinates.push( new Module.JSVector3D(_position[ (i*3) ], _position[ (i*3)+1 ], _position[ (i*3)+2 ]) );
				}	
				parts.add(_position.length/3);
				
				var color = new Module.JSColor( _color["fill_color_a"], _color["fill_color_r"], _color["fill_color_g"], _color["fill_color_b"] );
				
				line.setPartCoordinates( coordinates, parts );
				
				var lineStyle = new Module.JSPolyLineStyle();
				lineStyle.setWidth( _linewidth );
				lineStyle.setColor( color );					// 맨위 색상
				line.setStyle( lineStyle );
				
				LAYER.OBJECT.WALL.OLAYER.addObject( line, 0 );
			},
			getObject : function( _objkey, _position, _color )
			{
				var polygon = Module.createColorPolygon( _objkey );
				var coordinates = new Module.JSVec3Array();
				var parts = new Module.Collection();
				
				for( var i=0, len = _position.length/3; i<len; i++ ) {
					coordinates.push( new Module.JSVector3D(_position[ (i*3) ], _position[ (i*3)+1 ], _position[ (i*3)+2 ]) );
				}
				parts.add(_position.length/3);
				
				var firstColor 	= new Module.JSColor( _color["fill_color_a"], _color["fill_color_r"], _color["fill_color_g"], _color["fill_color_b"] );
				var nextColor	= new Module.JSColor( _color["stroke_color_a"], _color["stroke_color_r"], _color["stroke_color_g"], _color["stroke_color_b"] );
				
				// 폴리곤 수직 벽면 형태 정의
				polygon.SetVerticalPlane(	coordinates,
												parts,
												-50.0, 
												firstColor, 		// 하단 그라데이션 JSColor ( a, r, g, b )
												nextColor		// 상단 그라데이션
											);
											
				polygon.SetCullMode( 1 );
				return polygon;
			},
			getLineObject : function( _objkey, _position, _linewidth, _color )
			{
				var line = Module.createLineString( _objkey );
				var coordinates = new Module.JSVec3Array();
				var parts = new Module.Collection();
				
				for( var i=0, len = _position.length/3; i<len; i++ ) {
					coordinates.push( new Module.JSVector3D(_position[ (i*3) ], _position[ (i*3)+1 ], _position[ (i*3)+2 ]) );
				}	
				parts.add(_position.length/3);
				
				var color = new Module.JSColor( _color["fill_color_a"], _color["fill_color_r"], _color["fill_color_g"], _color["fill_color_b"] );
				
				line.setPartCoordinates( coordinates, parts );
				
				var lineStyle = new Module.JSPolyLineStyle();
				lineStyle.setWidth( _linewidth );
				lineStyle.setColor( color );					// 맨위 색상
				line.setStyle( lineStyle );
				
				return line;
			},
			setLayer : function( _layername )
			{
				if( LAYER.OBJECT.WALL.LAYERNAME == _layername)		return 1;
				var olayer = LAYER.findLayer( _layername );
				var type = olayer.getType();
				if( olayer == null || type != Module.ELT_POLYHEDRON )	return -1;
				
				LAYER.OBJECT.WALL.LAYERNAME = _layername;
				LAYER.OBJECT.WALL.OLAYER = olayer;
				return 1;				
			},
			removeAllObject : function()
			{
				LAYER.OBJECT.WALL.OLAYER.removeAll();
			},
			deleteLayer : function()
			{
				LAYER.deleteLayer( LAYER.OBJECT.WALL.LAYERNAME );
				LAYER.OBJECT.WALL.OLAYER = null;
				LAYER.OBJECT.WALL.LAYERNAME = null;
			},
		},
		GRAPH : {
			OLAYER: null,
			LAYERNAME: null,
			createLayer : function( _layername )
			{
				if( LAYER.OBJECT.GRAPH.LAYERNAME == _layername)		return 2;
				LAYER.OBJECT.GRAPH.LAYERNAME = _layername;
				LAYER.OBJECT.GRAPH.OLAYER = LAYER.createLayer( LAYER.OBJECT.GRAPH.LAYERNAME, Module.ELT_GRAPH );
				
				if( LAYER.OBJECT.GRAPH.OLAYER != null ) {
					// 레이어 생성 완료
					LAYER.OBJECT.GRAPH.OLAYER.setMaxDistance( 1000000.0 );
					console.log( " GRAPH " + _layername + " layer OK" );
				} else {
					// 레이어 생성 실패
					console.log( " GRAPH " + _layername + " layer error" );
					return -1;
				}
				return 1;
			},
			createObject : function( _key, _name, _dataSet, _lon, _lat, _alt )
			{
				// 그래프 오브젝트 생성
				var graph = Module.createBarGraph(_key);
				
				// 범례				
				graph.insertLegend("Legend1", "일치", new Module.JSColor(200, 22, 90, 158));
				graph.insertLegend("Legend2", "불일치", new Module.JSColor(200, 150, 111, 30));
				graph.insertLegend("Legend3", "조사전", new Module.JSColor(200, 150, 150, 150));

				// 데이터 추가 (데이터는 범례가 추가된 순서대로 적용됨)
				var dataSetList = [
					{
						// 첫번째 데이터 셋 
						FieldName : _name,				// 데이터 셋의 명칭
						Data : _dataSet		// 범례 추가 순서에 따라 '가스, 전기, 수도, 기타' 순
					},
				];
								
				for (var i=0, len=dataSetList.length; i<len; i++) {		
					// 데이터 전송 객체 생성
					var data = new Module.Collection();
					
					// 데이터 값 입력
					for (var j=0, subLen=dataSetList[i].Data.length; j<subLen; j++) {
						data.add(dataSetList[i].Data[j]);
					}					
					// 데이터 셋 명칭, 데이터 값으로 데이터 셋 입력
					graph.insertDataSet(dataSetList[i].FieldName, data);
				}
				
				// 그래프 y축 최대, 최소 값 범위 설정
				graph.setValueRange(0.0, 20000.0, 1000.0);
	
				// 단위 표시 텍스트 설정
				graph.setUnitText("(갯수)");
				// 바 상승 애니메이션 속도 설정
				graph.setAnimationSpeed(0.1);
				// 그래프 생성 
				graph.create(
							//new Module.JSVector3D(126.78693528538836, 35.01813429887883, 60.0),
							new Module.JSVector3D( _lon, _lat, _alt ),
							new Module.JSSize2D( 450, 788 ),
							0);	// 0(막대가 가로로 배열된 형태), 1(막대가 쌓인 형태) 				
				graph.setGridVisible(false);
				LAYER.OBJECT.GRAPH.OLAYER.addObject( graph, 0 );
			},
		},
	},
	ETC : {
		newsetPosition : function( _position, _alt, _type )
		{
			var i, len;
			var str_pos = null;
			var reuslt_position = [];
		
			if( _type == "coordinates" ){
				str_pos = _position;
				for( i=0, len = (str_pos.length >> 1); i<len; i++) {
					var tmp_pos = [];
					tmp_pos.push( parseFloat(str_pos[ ( i*2 ) ]), parseFloat(str_pos[ ( i*2 ) +1 ]), _alt );
					reuslt_position.push( tmp_pos );
					tmp_pos = null;
				}
			} else if( _type == "POLYGON" ){
				str_pos = _position.replaceAll( "POLYGON(", "" );
				str_pos = str_pos.replaceAll( "))", ")" );
				str_pos = str_pos.replaceAll( "(", "" );
				str_pos = str_pos.split( '),' );

				for( var polygons of str_pos ) {
					var single = polygons.replaceAll( ")", "" );
					single = polygons.split( ',' );
					
					var singlePolygon = null;
					singlePolygon = []
					for( var arr of single ) {
						var tmp_pos = [];
						var list = arr.split( ' ' );
						tmp_pos.push( parseFloat(list[0]), parseFloat(list[1]), _alt );
						singlePolygon.push( tmp_pos );
						tmp_pos = null;
					}
					reuslt_position.push( singlePolygon );
				}
			} else if( _type == "XY" ) {
				//console.log( _position );
				for( var xy of _position[0] ) {
					var tmp_pos = [];
					tmp_pos.push( parseFloat(xy[0]), parseFloat( xy[1] ), _alt );
					reuslt_position.push( tmp_pos );
					tmp_pos = null;					
				}
			}
			return reuslt_position;
		},
		setPosition : function( _position, _alt, _type )
		{	
			var i, len;
			var str_pos = null;
			var reuslt_position = new Array();
			
			if( _type == "coordinates" ){
				str_pos = _position;
				
				for( i=0, len = (str_pos.length >> 1); i<len; i++) {
					var tmp_pos = new Array();
					tmp_pos.push( parseFloat(str_pos[ ( i*2 ) ]), parseFloat(str_pos[ ( i*2 ) +1 ]), _alt );
					reuslt_position.push( tmp_pos );
					tmp_pos = null;
				}
				
			} else if( _type == "POLYGON" ){
				str_pos = _position.replaceAll( "POLYGON((", "" );
				str_pos = str_pos.replaceAll( "))", "" );
				str_pos = str_pos.split( ',' );
				
				for( i=0, len = str_pos.length; i<len; i++ ) {
					var tmp_pos = new Array();
					var list = str_pos[i].split( ' ' );						
					tmp_pos.push( parseFloat(list[0]), parseFloat(list[1]), _alt );
					reuslt_position.push( tmp_pos );
					tmp_pos = null;
				}
			}
			return reuslt_position;
		},
		setGeometry : function( _def )
		{
			var source;
			if( _def == 4326 ) {
				// Latitude/Logitude (WGS84) 엔진 13번
				Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
				source = new Proj4js.Proj("EPSG:4326");
			} else if( _def == 5174 ) {
				// 엔진 23번
				Proj4js.defs["EPSG:5174"] = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
				source = new Proj4js.Proj("EPSG:5174");
			}
			else if( _def == 5186 ) {
				// Korea TM WGS84 2010(Middle) 엔진 20번
				Proj4js.defs["EPSG:5186"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
				source = new Proj4js.Proj("EPSG:5186");
			}
			return source;
		},
		transformPosition : function( _source, _dest, _position, _alt )
		{
			var i, len;
			var x, y, pt, rs;
			var list = [];
			for( i=0, len = _position.length; i<len; ++i )
			{
				x = Number( _position[i][0] );
				y = Number( _position[i][1] );
				pt = new Proj4js.Point( x, y );
				rs = Proj4js.transform( _source, _dest, pt );				
				list.push( rs["x"], rs["y"], _alt );
			}
			return list;
		},
		getMassCenter : function ( _poslist )
		{
			var Ret = [];
			var cen_tmp = [];
			var area, area_sum, i;

			area = area_sum = 0.0;
			Ret[0] = Ret[1] = 0.0;
			cen_tmp[0] = cen_tmp[1] = 0.0;
			
			for( var i=0, len = _poslist.length/3; i < len -1; ++i ) {
				cen_tmp[0] = parseFloat( _poslist[ 0 ] + _poslist[ (i*3) ]		+ _poslist[ ((i+1)*3) ] );
				cen_tmp[1] = parseFloat( _poslist[ 1 ] + _poslist[ (i*3)+1 ]	+ _poslist[ ((i+1)*3)+1 ] );
								
				var x1, x2, x3, x4;
				x1 = parseFloat( _poslist[ (i*3) ] 			- _poslist[ 0 ] );
				x2 = parseFloat( _poslist[ ((i+1)*3)+1 ]	- _poslist[ 1 ] );
				x3 = parseFloat( _poslist[ ((i+1)*3) ]		- _poslist[ 0 ] );
				x4 = parseFloat( _poslist[ (i*3)+1 ]		- _poslist[ 1 ] );			
				area = parseFloat( x1 * x2 - x3 * x4 );
				
				Ret[0] += area * cen_tmp[0];
				Ret[1] += area * cen_tmp[1];
				area_sum = parseFloat( area_sum + area );
			}
			
			Ret[0] = parseFloat( Ret[0] / (3 * area_sum) );
			Ret[1] = parseFloat( Ret[1] / (3 * area_sum) );

			var result_center = [];
			result_center.push(Ret[0], Ret[1])		
			return result_center;	
		},
	},
	CREATE : {
		YANGPYEONG : {
			loadGuData : function ()
			{
				var data = [
					{ "PNU": "41830250",	"name": "양평읍",	"lon": 127.512910269425,	"lat": 37.494441458099,	"0": 0,	"1": 0, 	"2" : 0,	"null" : 35361 },
					{ "PNU": "41830310",	"name": "강상면",	"lon": 127.472695540588,	"lat": 37.468040680096,	"0": 11,"1": 1199, 	"2" : 486,	"null" : 16871 },
					{ "PNU": "41830320",	"name": "강하면",	"lon": 127.417922811753,	"lat": 37.480306689959,	"0": 0,	"1": 0, 	"2" : 0,	"null" : 18583 },
					{ "PNU": "41830330",	"name": "양서면",	"lon": 127.376441998262,	"lat": 37.547529992480,	"0": 0,	"1": 0, 	"2" : 0,	"null" : 14258 },
					{ "PNU": "41830340",	"name": "옥천면",	"lon": 127.469792076315,	"lat": 37.533914479859,	"0": 0,	"1": 0, 	"2" : 0,	"null" : 12522 },
					{ "PNU": "41830350",	"name": "서종면",	"lon": 127.389289772973,	"lat": 37.583438024053,	"0": 0,	"1": 0, 	"2" : 0,	"null" : 0 },
					{ "PNU": "41830360",	"name": "단월면",	"lon": 127.672459617014,	"lat": 37.542874592931,	"0": 0,	"1": 0, 	"2" : 0,	"null" : 0 },
					{ "PNU": "41830370",	"name": "청운면",	"lon": 127.750304160653,	"lat": 37.539240794309,	"0": 0,	"1": 0, 	"2" : 0,	"null" : 0 },
					{ "PNU": "41830380",	"name": "양동면",	"lon": 127.755003173825,	"lat": 37.419542988768,	"0": 0,	"1": 0, 	"2" : 0,	"null" : 0 },
					{ "PNU": "41830395",	"name": "지평면",	"lon": 127.658367085792,	"lat": 37.446020355035,	"0": 0,	"1": 0, 	"2" : 0,	"null" : 0 },
					{ "PNU": "41830400",	"name": "용문면",	"lon": 127.595499255042,	"lat": 37.486162262118,	"0": 0,	"1": 0, 	"2" : 0,	"null" : 2728 },
					{ "PNU": "41830410",	"name": "개군면",	"lon": 127.552143136605,	"lat": 37.429885888874,	"0": 0,	"1": 0, 	"2" : 0,	"null" : 13520 }
					];
				
				// 그래프 생성
				var objkey, name,
					dataSet,
					lon, lat, alt;
						
				for(key of data) {
					objkey = key["PNU"];
					name = key["name"];
					dataSet = [ key["1"], key["2"], (key["0"] + key["null"])];
					lon = key["lon"];
					lat = key["lat"];
					alt = 300;
					OGRAPH.createObject( objkey, name, dataSet, lon, lat, alt);					
				}
			},			
			// 지목 데이터 가시화
			// - 빌보드, 벽
			loadData : function ( _data, _lon, _lat, _alt )
			{
				var ids		= _data["cadastral"]["OGR_FID"];
				var pnu 	= _data["cadastral"]["pnu"];
				var jibun	= _data["cadastral"]["jibun"];
				let	name 	= this.checkOneJiMok		( _data["cadastral"]["i"] );
				let	same 	= this.checkSame			( _data["cadastral"]["j"] );
				var mode 	= Number( _data["cadastral"]["k"] );
				
				if( same == "일치" ) {
					if( mode == 0 ) 	editname = name;
					color = CETC.setJSONColor( 35, 114, 191, 255, 35, 114, 191, 255 );
				} else if( same == "불일치" )	{
					if( mode == 0 )		editname = "미정";
					color = CETC.setJSONColor( 190, 140, 42, 255, 190, 140, 42, 255 );
				} else {
					if( mode == 0 )		editname = this.checkOneJiMok( mode );
					color = CETC.setJSONColor( 255, 255, 255, 255, 255, 255, 255, 255 );
				}
				
				var source = OETC.setGeometry( 5186 );
				var dest = OETC.setGeometry( 4326 );
				
				var position = OETC.setPosition( _data["cadastral"]["geometry"], 80, "POLYGON" );				
				position = OETC.transformPosition( source, dest, position, 60.0 );
				
				// 중심좌표 반환
				var center = OETC.getMassCenter(position);
				
				
				if( isNaN(center[0]) || isNaN(center[1]) )
				{
					console.log("NnN");
					center[0] = position[0];
					center[1] = position[1];
				}
				OWALL.createObject( "WALL_1", position, color );
				OWALL.createLineObject( "WALL_LINE_1", position, 5, color );
				
				var info = { "pnu" : pnu, "jibun" : jibun, "name" : name, "same" : same };
				IYYBILL.setjimokBoard( 512, 256, info);
				var data = CIMAGE.getData();
				var size = CETC.getSize();
				
				var scale = 0.1;
				OBILL.createObject( ids, center[0], center[1], 80, data, size, scale );
				
				/*
				var ids				= _data["cadastral"]["OGR_FID"];
				var pnu 			= _data["cadastral"]["pnu"];
				var jibun 			= _data["cadastral"]["jibun"];
				var sday 			= _data["cadastral"]["d"];
				var eday 			= _data["cadastral"]["e"];
				var fday 			= _data["cadastral"]["f"];
				var researchmain	= _data["cadastral"]["g"];
				let	researchsub 	= _data["cadastral"]["h"];
				let	name 			= this.checkOneJiMok		( _data["cadastral"]["i"] );
				let	same 			= this.checkSame			( _data["cadastral"]["j"] );
				let	realmain		= this.checkRealJiMokMain	( _data["cadastral"]["l"] );
				let	realsub 		= this.checkRealJiMokSub	( _data["cadastral"]["m"] );
				let	land 			= this.checkLand			( _data["cadastral"]["n"] );
				let	build			= this.checkBuild			( _data["cadastral"]["t"] );				
				let	editname;
				var color;
				var mode = Number( _data["cadastral"]["k"] );
				
				
				if( same == "일치" ) {
					if( mode == 0 ) 	editname = name;
					color = CETC.setJSONColor( 35, 114, 191, 255, 35, 114, 191, 255 );
				} else if( same == "불일치" )	{
					if( mode == 0 )		editname = "미정";
					color = CETC.setJSONColor( 190, 140, 42, 255, 190, 140, 42, 255 );
				} else {
					if( mode == 0 )		editname = this.checkOneJiMok( mode );
					color = CETC.setJSONColor( 255, 255, 255, 255, 255, 255, 255, 255 );
				}
				
				var source = OETC.setGeometry( 5186 );
				var dest = OETC.setGeometry( 4326 );
				
				var position = OETC.setPosition( _data["cadastral"]["geometry"], 80, "POLYGON" );				
				position = OETC.transformPosition( source, dest, position, 50.0 );
				// 중심좌표 반환
				var center = OETC.getMassCenter(position);
				console.log(position);
				
				if( isNaN(center[0]) || isNaN(center[1]) )
				{
					console.log("NnN");
					center[0] = position[0];
					center[1] = position[1];
				}
				console.log(center);
				OWALL.createObject( "WALL_1", position, color );
				OWALL.createLineObject( "WALL_LINE_1", position, 5, color );
						
				var info = { "pnu" : pnu, "jibun" : jibun, "sday" : sday, "eday" : eday, "fday" : fday, "researchmain" : researchmain, "researchsub" : researchsub, "name" : name, "same" : same, "editname" : editname, "realmain" : realmain, "realsub" : realsub, "land" : land, "build" :  build };
				IYYBILL.setjimokBoard( 480, 230, 10, 10, 10, info);
				var data = CIMAGE.getData();
				var size = CETC.getSize();
				
				var scale = 0.1;
				OBILL.createObject( ids, center[0], center[1], 70, data, size, scale );
				*/
			},			
			loadJSON : function()
			{
				//5186
				var data = [
					{ "PNU": "4183025021102810001",	"JIBUN": "281-1대",	"PY_JIGA_1": 770800.0,	"CALC_JIG_1": 921200.0,		"VRFY_JIG_1": 921200.0,		"READ_JIG_1": 921200.0,		"PY2_JIGA_1": 742600.0,		"PY3_JIGA_1": 741600.0,		"PY4_JIGA_1": 718100.0,		"coordinates": [ 243434.892925247724634, 543359.679550807923079, 243426.920404514006805, 543350.550259028794244, 243433.136579055018956, 543345.658581463154405, 243418.118485933955526, 543328.372032539686188, 243414.845610979653429, 543326.194900344242342, 243404.288327252987074, 543334.224354934645817, 243402.552267746126745, 543335.826263023307547, 243427.998717042035423, 543365.425190664129332, 243434.892925247724634, 543359.679550807923079 ] },
					{ "PNU": "4183025021102820002",	"JIBUN": "282-2대",	"PY_JIGA_1": 820000.0,	"CALC_JIG_1": 980000.0,		"VRFY_JIG_1": 980000.0,		"READ_JIG_1": 980000.0,		"PY2_JIGA_1": 790000.0,		"PY3_JIGA_1": 789000.0,		"PY4_JIGA_1": 764000.0,		"coordinates": [ 243397.914826153108152, 543390.110622191103175, 243402.541950624348829, 543386.588861261494458, 243396.829292012233054, 543380.091651841299608, 243397.846642825083109, 543372.231760419323109, 243403.415986036707181, 543363.756081660976633, 243398.075244990264764, 543359.000875449040905, 243386.432870308926795, 543369.209263278404251, 243393.638374018308241, 543378.843516045133583, 243390.769253376696724, 543381.979360279510729, 243397.914826153108152, 543390.110622191103175 ] },
					{ "PNU": "4183025021102720001",	"JIBUN": "272-1대",	"PY_JIGA_1": 844600.0,	"CALC_JIG_1": 1009000.0,	"VRFY_JIG_1": 1009000.0,	"READ_JIG_1": 1009000.0,	"PY2_JIGA_1": 813700.0,		"PY3_JIGA_1": 812600.0,		"PY4_JIGA_1": 786900.0,		"coordinates": [ 243396.152922271605348, 543322.58707555080764, 243396.359909146849532, 543322.839083008584566, 243404.288327252987074, 543334.224354934645817, 243414.845610979653429, 543326.194900344242342, 243405.009237693739124, 543314.15554648602847, 243396.152922271605348, 543322.58707555080764 ] },
					{ "PNU": "4183025021102800001",	"JIBUN": "280-1대",	"PY_JIGA_1": 844600.0,	"CALC_JIG_1": 1009000.0,	"VRFY_JIG_1": 1009000.0,	"READ_JIG_1": 1009000.0,	"PY2_JIGA_1": 813700.0,		"PY3_JIGA_1": 812600.0,		"PY4_JIGA_1": 786900.0,		"coordinates": [ 243404.288327252987074, 543334.224354934645817, 243396.359909146849532, 543322.839083008584566, 243396.152922271605348, 543322.58707555080764, 243394.43403162190225, 543320.487013686215505, 243391.132926777878311, 543323.350840352941304, 243392.261864973406773, 543324.510882716509514, 243401.936246652243426, 543336.394230410340242, 243402.552267746126745, 543335.826263023307547, 243404.288327252987074, 543334.224354934645817 ] },
					{ "PNU": "4183025021102820005",	"JIBUN": "282-5대",	"PY_JIGA_1": 806600.0,	"CALC_JIG_1": 936400.0,		"VRFY_JIG_1": 936400.0,		"READ_JIG_1": 936400.0,		"PY2_JIGA_1": 773200.0,		"PY3_JIGA_1": 771800.0,		"PY4_JIGA_1": 747300.0,		"coordinates": [ 243433.136579055018956, 543345.658581463154405, 243426.920404514006805, 543350.550259028794244, 243434.892925247724634, 543359.679550807923079, 243443.83919696637895, 543352.190018408000469, 243442.380286474130116, 543350.47996532660909, 243439.551347646687645, 543349.625842937501147, 243435.350641249038745, 543343.915696314186789, 243433.136579055018956, 543345.658581463154405 ] },
					{ "PNU": "4183025021102700003",	"JIBUN": "270-3대",	"PY_JIGA_1": 1583000.0,	"CALC_JIG_1": 1622000.0,	"VRFY_JIG_1": 0.0,			"READ_JIG_1": 1622000.0,	"PY2_JIGA_1": 1544000.0,	"PY3_JIGA_1": 1536000.0,	"PY4_JIGA_1": 1489000.0,	"coordinates": [ 243450.877635716024088, 543319.462598414858803, 243450.017689297819743, 543318.436567267868668, 243437.510274835280143, 543329.664907549624331, 243431.063172213471262, 543333.020586717058904, 243424.321248978289077, 543332.497283085016534, 243418.118485933955526, 543328.372032539686188, 243433.136579055018956, 543345.658581463154405, 243435.350641249038745, 543343.915696314186789, 243435.207929585041711, 543337.623739535338245, 243447.454159806482494, 543330.476355072692968, 243443.856400793854846, 543325.815227680839598, 243450.877635716024088, 543319.462598414858803 ] },
					{ "PNU": "4183025021102710001",	"JIBUN": "271-1대",	"PY_JIGA_1": 1583000.0,	"CALC_JIG_1": 1622000.0,	"VRFY_JIG_1": 0.0,			"READ_JIG_1": 1622000.0,	"PY2_JIGA_1": 1544000.0,	"PY3_JIGA_1": 1536000.0,	"PY4_JIGA_1": 1489000.0,	"coordinates": [ 243450.017689297819743, 543318.436567267868668, 243442.932134524540743, 543309.900311287958175, 243414.845610979653429, 543326.194900344242342, 243418.118485933955526, 543328.372032539686188, 243424.321248978289077, 543332.497283085016534, 243431.063172213471262, 543333.020586717058904, 243437.510274835280143, 543329.664907549624331, 243450.017689297819743, 543318.436567267868668 ] },
					{ "PNU": "4183025021102690020",	"JIBUN": "269-20대",	"PY_JIGA_1": 760000.0,	"CALC_JIG_1": 0.0,			"VRFY_JIG_1": 0.0,			"READ_JIG_1": 0.0,			"PY2_JIGA_1": 720000.0,		"PY3_JIGA_1": 718000.0,		"PY4_JIGA_1": 695000.0,		"coordinates": [ 243421.627144020982087, 543269.538657765486278, 243401.333801820437657, 543280.521644569816999, 243408.294162987644086, 543293.320861134445295, 243428.698361303395359, 543285.470854626153596, 243429.334430399991106, 543283.847896491992287, 243421.627144020982087, 543269.538657765486278 ] },
					{ "PNU": "4183025021102690012",	"JIBUN": "269-12대",	"PY_JIGA_1": 227400.0,	"CALC_JIG_1": 236200.0,		"VRFY_JIG_1": 0.0,			"READ_JIG_1": 236200.0,		"PY2_JIGA_1": 218300.0,		"PY3_JIGA_1": 217600.0,		"PY4_JIGA_1": 210600.0,		"coordinates": [ 243466.655018643883523, 543286.456579543300904, 243458.674843462620629, 543291.665174078778364, 243443.721400072798133, 543303.947394375456497, 243434.279951337899547, 543293.493046011892147, 243431.352185919415206, 543288.856949006556533, 243428.698361303395359, 543285.470854626153596, 243408.294162987644086, 543293.320861134445295, 243404.229123477591202, 543294.88466320571024, 243381.545500457548769, 543312.430489015998319, 243383.89430095005082, 543316.397564876941033, 243387.248488356970483, 543311.715755006065592, 243400.250817267457023, 543302.276423169649206, 243403.592901788011659, 543299.850594909978099, 243405.321854583540699, 543300.587668009568006, 243428.392144502460724, 543290.272802690276876, 243438.503412885882426, 543304.563151306239888, 243442.932134524540743, 543309.900311287958175, 243450.017689297819743, 543318.436567267868668, 243450.877635716024088, 543319.462598414858803, 243457.947195398621261, 543327.893854493275285, 243461.553264753572876, 543325.755036018206738, 243453.908691365766572, 543317.722750535816886, 243446.386212601501029, 543307.596487178117968, 243451.161377271462698, 543303.168740162858739, 243460.495699585881084, 543294.504234761465341, 243467.815845794335473, 543290.043604182312265, 243466.655018643883523, 543286.456579543300904 ] },
					{ "PNU": "4183025021102690019",	"JIBUN": "269-19대",	"PY_JIGA_1": 921100.0,	"CALC_JIG_1": 969600.0,		"VRFY_JIG_1": 0.0,			"READ_JIG_1": 969600.0,		"PY2_JIGA_1": 872600.0,		"PY3_JIGA_1": 870200.0,		"PY4_JIGA_1": 842300.0,		"coordinates": [ 243429.334430399991106, 543283.847896491992287, 243442.170632622059202, 543277.212534907739609, 243444.692702949221712, 543275.238665639888495, 243442.400069172435906, 543267.609621283248998, 243445.459171299327863, 543264.846782768378034, 243451.662302768614609, 543260.90109712514095, 243449.842407695250586, 543258.915029747178778, 243440.031218304706272, 543264.749535751179792, 243433.857653408835176, 543256.278320891782641, 243422.270151668228209, 543269.260689313756302, 243421.993173150316579, 543268.837680012802593, 243421.627144020982087, 543269.538657765486278, 243429.334430399991106, 543283.847896491992287 ] },
					{ "PNU": "4183025021102740003",	"JIBUN": "274-3대",	"PY_JIGA_1": 2131000.0,	"CALC_JIG_1": 2184000.0,	"VRFY_JIG_1": 0.0,			"READ_JIG_1": 2184000.0,	"PY2_JIGA_1": 2079000.0,	"PY3_JIGA_1": 2068000.0,	"PY4_JIGA_1": 2005000.0,	"coordinates": [ 243400.029658062092494, 543240.080904699629173, 243421.876200153899845, 543224.45202550617978, 243413.333643743098946, 543216.201700756093487, 243403.911527488467982, 543220.367237722384743, 243392.467370902129915, 543225.763672654749826, 243387.22025859716814, 543229.125406560488045, 243384.875167898688233, 543231.515280617633834, 243395.869556989695411, 543243.009691644809209, 243397.173387866903795, 543246.490723648457788, 243394.462329800764564, 543248.228586155804805, 243399.566672480490524, 543261.75171227089595, 243406.909801024536137, 543257.674079709104262, 243405.649918816750869, 543255.310040883952752, 243398.224613288097316, 543241.37181209679693, 243400.029658062092494, 543240.080904699629173 ] },
					{ "PNU": "4183025021102740005",	"JIBUN": "274-5대",	"PY_JIGA_1": 1580000.0,	"CALC_JIG_1": 1590000.0,	"VRFY_JIG_1": 0.0,			"READ_JIG_1": 1590000.0,	"PY2_JIGA_1": 1540000.0,	"PY3_JIGA_1": 1530000.0,	"PY4_JIGA_1": 1480000.0,	"coordinates": [ 243393.24548651126679, 543245.004556090570986, 243382.902074828685727, 543233.893171753152274, 243382.592079497786472, 543233.844157990417443, 243376.303851429111091, 543239.920822907472029, 243372.031676427781349, 543244.488591779838316, 243365.893356394197326, 543252.554247819818556, 243368.065254499961156, 543254.413332269177772, 243366.443203589966288, 543255.807247206335887, 243378.677559353760444, 543267.818710746942088, 243392.821128500974737, 543252.920474147540517, 243390.629400127305416, 543247.346418158034794, 243393.24548651126679, 543245.004556090570986 ] },
					{ "PNU": "4183025021102720002",	"JIBUN": "272-2대",	"PY_JIGA_1": 793700.0,	"CALC_JIG_1": 948600.0,		"VRFY_JIG_1": 948600.0,		"READ_JIG_1": 948600.0,		"PY2_JIGA_1": 764700.0,		"PY3_JIGA_1": 763700.0,		"PY4_JIGA_1": 739500.0,		"coordinates": [ 243400.250817267457023, 543302.276423169649206, 243404.944350815436337, 543311.688563026254997, 243394.43403162190225, 543320.487013686215505, 243396.152922271605348, 543322.58707555080764, 243405.009237693739124, 543314.15554648602847, 243414.845610979653429, 543326.194900344242342, 243442.932134524540743, 543309.900311287958175, 243438.503412885882426, 543304.563151306239888, 243428.392144502460724, 543290.272802690276876, 243405.321854583540699, 543300.587668009568006, 243403.592901788011659, 543299.850594909978099, 243400.250817267457023, 543302.276423169649206 ] },
					{ "PNU": "4183025021102690021",	"JIBUN": "269-21대",	"PY_JIGA_1": 844600.0,	"CALC_JIG_1": 1009000.0,	"VRFY_JIG_1": 1009000.0,	"READ_JIG_1": 1009000.0,	"PY2_JIGA_1": 813700.0,		"PY3_JIGA_1": 812600.0,		"PY4_JIGA_1": 786900.0,		"coordinates": [ 243381.545500457548769, 543312.430489015998319, 243404.229123477591202, 543294.88466320571024, 243391.584308251214679, 543271.102273970609531, 243386.529145914391847, 543275.527008230099455, 243383.494048399792518, 543278.184848673990928, 243372.224739309109282, 543286.892265408765525, 243369.517486803175416, 543292.889094421640038, 243381.545500457548769, 543312.430489015998319 ] },
					{ "PNU": "4183025021102740001",	"JIBUN": "274-1대",	"PY_JIGA_1": 962600.0,	"CALC_JIG_1": 1150000.0,	"VRFY_JIG_1": 1150000.0,	"READ_JIG_1": 1150000.0,	"PY2_JIGA_1": 927400.0,		"PY3_JIGA_1": 926200.0,		"PY4_JIGA_1": 896900.0,		"coordinates": [ 243372.224739309109282, 543286.892265408765525, 243383.494048399792518, 543278.184848673990928, 243386.529145914391847, 543275.527008230099455, 243378.677559353760444, 543267.818710746942088, 243366.443203589966288, 543255.807247206335887, 243364.940167818131158, 543256.849170357570983, 243359.899446249590255, 543273.522808454697952, 243372.224739309109282, 543286.892265408765525 ] },
					{ "PNU": "4183025021102810002",	"JIBUN": "281-2대",	"PY_JIGA_1": 770800.0,	"CALC_JIG_1": 921200.0,		"VRFY_JIG_1": 921200.0,		"READ_JIG_1": 921200.0,		"PY2_JIGA_1": 742600.0,		"PY3_JIGA_1": 741600.0,		"PY4_JIGA_1": 718100.0,		"coordinates": [ 243407.357591577630956, 543349.81337181373965, 243407.217537760763662, 543351.016355910920538, 243405.358478170004673, 543352.641258200863376, 243412.837286619556835, 543355.552576591377147, 243407.357591577630956, 543349.81337181373965 ] },
					{ "PNU": "4183025021102810000",	"JIBUN": "281대",	"PY_JIGA_1": 706800.0,	"CALC_JIG_1": 844700.0,		"VRFY_JIG_1": 844700.0,		"READ_JIG_1": 844700.0,		"PY2_JIGA_1": 680900.0,		"PY3_JIGA_1": 680100.0,		"PY4_JIGA_1": 658500.0,		"coordinates": [ 243421.376804823754355, 543364.63989458407741, 243422.208761508663883, 543365.445926190936007, 243422.057588911993662, 543369.252889194642194, 243414.061346901027719, 543375.928471394698136, 243414.62531303340802, 543376.573492041323334, 243427.998717042035423, 543365.425190664129332, 243402.552267746126745, 543335.826263023307547, 243401.936246652243426, 543336.394230410340242, 243399.761172147816978, 543338.400115263997577, 243407.743740737438202, 543346.479415797279216, 243407.357591577630956, 543349.81337181373965, 243412.837286619556835, 543355.552576591377147, 243418.074152463348582, 543357.591799534857273, 243423.237906400318025, 543362.094999661436304, 243421.376804823754355, 543364.63989458407741 ] },
					{ "PNU": "4183025021102760001",	"JIBUN": "276-1제",	"PY_JIGA_1": 145800.0,	"CALC_JIG_1": 161300.0,		"VRFY_JIG_1": 0.0,			"READ_JIG_1": 161300.0,		"PY2_JIGA_1": 140900.0,		"PY3_JIGA_1": 140100.0,		"PY4_JIGA_1": 135500.0,		"coordinates": [ 243334.11599862028379, 543265.851692110882141, 243327.345823274139548, 543270.856343498802744, 243317.928990883781807, 543290.709756693686359, 243321.955964175926056, 543290.602941361255944, 243320.049716390523827, 543296.35880884330254, 243322.944234339374816, 543306.421861423063092, 243336.296886453812476, 543289.841602026601322, 243347.274419716850389, 543276.273210393730551, 243344.221595985407475, 543272.936097417259589, 243334.11599862028379, 543265.851692110882141 ] },
					{ "PNU": "4183025021102690026",	"JIBUN": "269-26제",	"PY_JIGA_1": 213800.0,	"CALC_JIG_1": 227700.0,		"VRFY_JIG_1": 0.0,			"READ_JIG_1": 227700.0,		"PY2_JIGA_1": 204900.0,		"PY3_JIGA_1": 204000.0,		"PY4_JIGA_1": 197500.0,		"coordinates": [ 243364.335642284393543, 543224.65139726921916, 243354.454862556332955, 543243.430797784239985, 243334.11599862028379, 543265.851692110882141, 243344.221595985407475, 543272.936097417259589, 243347.274419716850389, 543276.273210393730551, 243350.898588705982547, 543271.948410021956079, 243365.893356394197326, 543252.554247819818556, 243372.031676427781349, 543244.488591779838316, 243380.397112599399406, 543233.496060542180203, 243387.22025859716814, 543229.125406560488045, 243392.467370902129915, 543225.763672654749826, 243403.911527488467982, 543220.367237722384743, 243413.333643743098946, 543216.201700756093487, 243416.440682142652804, 543214.82685345702339, 243412.888906552514527, 543210.520725358277559, 243404.272569707623916, 543219.380262005026452, 243393.218586621020222, 543220.908745323889889, 243392.828587216994492, 543220.96272709290497, 243373.916597165109124, 543223.993839822942391, 243364.335642284393543, 543224.65139726921916 ] },
					{ "PNU": "4183025021102740004",	"JIBUN": "274-4대",	"PY_JIGA_1": 1290000.0,	"CALC_JIG_1": 1299000.0,	"VRFY_JIG_1": 0.0,			"READ_JIG_1": 1299000.0,	"PY2_JIGA_1": 1258000.0,	"PY3_JIGA_1": 1250000.0,	"PY4_JIGA_1": 1209000.0,	"coordinates": [ 243378.677559353760444, 543267.818710746942088, 243386.529145914391847, 543275.527008230099455, 243391.584308251214679, 543271.102273970609531, 243397.930643906933255, 543262.658630418474786, 243399.566672480490524, 543261.75171227089595, 243394.462329800764564, 543248.228586155804805, 243393.24548651126679, 543245.004556090570986, 243390.629400127305416, 543247.346418158034794, 243392.821128500974737, 543252.920474147540517, 243378.677559353760444, 543267.818710746942088 ] },
					{ "PNU": "4183025021102750000",	"JIBUN": "275전",	"PY_JIGA_1": 933100.0,	"CALC_JIG_1": 1115000.0,	"VRFY_JIG_1": 1115000.0,	"READ_JIG_1": 1115000.0,	"PY2_JIGA_1": 899000.0,		"PY3_JIGA_1": 897800.0,		"PY4_JIGA_1": 869400.0,		"coordinates": [ 243359.899446249590255, 543273.522808454697952, 243364.940167818131158, 543256.849170357570983, 243366.443203589966288, 543255.807247206335887, 243368.065254499961156, 543254.413332269177772, 243365.893356394197326, 543252.554247819818556, 243350.898588705982547, 543271.948410021956079, 243347.274419716850389, 543276.273210393730551, 243351.119197699852521, 543280.476352679659612, 243359.899446249590255, 543273.522808454697952 ] },
					{ "PNU": "4183025021102800000",	"JIBUN": "280대",	"PY_JIGA_1": 1267000.0,	"CALC_JIG_1": 1276000.0,	"VRFY_JIG_1": 0.0,			"READ_JIG_1": 1276000.0,	"PY2_JIGA_1": 1235000.0,	"PY3_JIGA_1": 1277000.0,	"PY4_JIGA_1": 1235000.0,	"coordinates": [ 243316.950542500067968, 543344.515286674490198, 243322.980219582270365, 543350.553514186642133, 243333.216720275871921, 543359.732908906415105, 243351.994804349145852, 543376.571632993291132, 243360.250000908272341, 543370.847055093036033, 243379.266318695183145, 543404.431657675653696, 243397.914826153108152, 543390.110622191103175, 243390.769253376696724, 543381.979360279510729, 243393.638374018308241, 543378.843516045133583, 243386.432870308926795, 543369.209263278404251, 243398.075244990264764, 543359.000875449040905, 243405.358478170004673, 543352.641258200863376, 243407.217537760763662, 543351.016355910920538, 243407.357591577630956, 543349.81337181373965, 243407.743740737438202, 543346.479415797279216, 243399.761172147816978, 543338.400115263997577, 243401.936246652243426, 543336.394230410340242, 243392.261864973406773, 543324.510882716509514, 243391.132926777878311, 543323.350840352941304, 243394.43403162190225, 543320.487013686215505, 243404.944350815436337, 543311.688563026254997, 243400.250817267457023, 543302.276423169649206, 243387.248488356970483, 543311.715755006065592, 243383.89430095005082, 543316.397564876941033, 243381.545500457548769, 543312.430489015998319, 243369.517486803175416, 543292.889094421640038, 243372.224739309109282, 543286.892265408765525, 243359.899446249590255, 543273.522808454697952, 243351.119197699852521, 543280.476352679659612, 243347.247970350028481, 543286.122131334035657, 243337.7765911045135, 543296.057620435371064, 243334.741063464956824, 543308.138386368169449, 243329.524307716288604, 543325.591010258765891, 243327.85020582305151, 543328.110913920449093, 243316.950542500067968, 543344.515286674490198 ] },
					{ "PNU": "4183025021102820004",	"JIBUN": "282-4대",	"PY_JIGA_1": 820000.0,	"CALC_JIG_1": 980000.0,		"VRFY_JIG_1": 980000.0,		"READ_JIG_1": 980000.0,		"PY2_JIGA_1": 790000.0,		"PY3_JIGA_1": 789000.0,		"PY4_JIGA_1": 764000.0,		"coordinates": [ 243421.376804823754355, 543364.63989458407741, 243423.237906400318025, 543362.094999661436304, 243418.074152463348582, 543357.591799534857273, 243412.837286619556835, 543355.552576591377147, 243405.358478170004673, 543352.641258200863376, 243398.075244990264764, 543359.000875449040905, 243403.415986036707181, 543363.756081660976633, 243413.549377527815523, 543375.345452631241642, 243421.376804823754355, 543364.63989458407741 ] },
					{ "PNU": "4183025021102760000",	"JIBUN": "276대",	"PY_JIGA_1": 1202000.0,	"CALC_JIG_1": 1210000.0,	"VRFY_JIG_1": 0.0,			"READ_JIG_1": 1210000.0,	"PY2_JIGA_1": 1171000.0,	"PY3_JIGA_1": 1171000.0,	"PY4_JIGA_1": 1132000.0,	"coordinates": [ 243351.119197699852521, 543280.476352679659612, 243347.274419716850389, 543276.273210393730551, 243336.296886453812476, 543289.841602026601322, 243322.944234339374816, 543306.421861423063092, 243323.635119415062945, 543308.820873999036849, 243334.741063464956824, 543308.138386368169449, 243337.7765911045135, 543296.057620435371064, 243347.247970350028481, 543286.122131334035657, 243351.119197699852521, 543280.476352679659612 ] },
					{ "PNU": "4183025021102690027",	"JIBUN": "269-27대",	"PY_JIGA_1": 699200.0,	"CALC_JIG_1": 736000.0,		"VRFY_JIG_1": 0.0,			"READ_JIG_1": 736000.0,		"PY2_JIGA_1": 662400.0,		"PY3_JIGA_1": 660500.0,		"PY4_JIGA_1": 639400.0,		"coordinates": [ 243404.229123477591202, 543294.88466320571024, 243408.294162987644086, 543293.320861134445295, 243401.333801820437657, 543280.521644569816999, 243421.627144020982087, 543269.538657765486278, 243421.993173150316579, 543268.837680012802593, 243417.303535764687695, 543261.69952235755045, 243418.793661201896612, 543258.695614124648273, 243416.184784736076836, 543256.437512881006114, 243411.053794854728039, 543257.097273438819684, 243408.675849388091592, 543256.311171100591309, 243405.649918816750869, 543255.310040883952752, 243406.909801024536137, 543257.674079709104262, 243399.566672480490524, 543261.75171227089595, 243397.930643906933255, 543262.658630418474786, 243391.584308251214679, 543271.102273970609531, 243404.229123477591202, 543294.88466320571024 ] },
					{ "PNU": "4183025021102690002",	"JIBUN": "269-2대",	"PY_JIGA_1": 2131000.0,	"CALC_JIG_1": 2184000.0,	"VRFY_JIG_1": 0.0,			"READ_JIG_1": 2184000.0,	"PY2_JIGA_1": 2079000.0,	"PY3_JIGA_1": 2068000.0,	"PY4_JIGA_1": 2005000.0,	"coordinates": [ 243418.793661201896612, 543258.695614124648273, 243417.303535764687695, 543261.69952235755045, 243421.993173150316579, 543268.837680012802593, 243422.270151668228209, 543269.260689313756302, 243433.857653408835176, 543256.278320891782641, 243438.916863732709317, 543250.801595129421912, 243427.292407642118633, 543240.883142876671627, 243427.201401007390814, 543241.044137450284325, 243418.793661201896612, 543258.695614124648273 ] },
				];				
				
				var source = OETC.setGeometry( 5186 );
				var dest = OETC.setGeometry( 4326 );
				
				for(key in data) {
					
					var position = OETC.setPosition( data[key]["coordinates"], 80, "coordinates" );				
					position = OETC.transformPosition( source, dest, position, 50.0 );
					var center = OETC.getMassCenter(position);
					OCREATEYY.createjigaPOI( data[key]["PNU"], data[key]["JIBUN"], data[key]["PY_JIGA_1"], center );
				}
			},			
			createjigaPOI : function( _objkey, _jibun, _prise, _center )
			{
				var color, prise;
				prise = parseFloat(_prise/30000);
				color = CETC.setJSONColor( 255, 255, 255, 255, 0, 0, 0, 255 );
				
				IYYPOI.setjigaPOI( 80, 80, 0, _jibun, _prise, 4, color );
				
				if( prise < 10)			color = CETC.setJSONColor( 22, 22, 173, 255, 22, 22, 173, 255 );
				else if( prise < 20)	color = CETC.setJSONColor( 31, 67, 184, 255, 31, 67, 184, 255 );
				else if( prise < 30)	color = CETC.setJSONColor( 31, 181, 176, 255, 31, 181, 176, 255 );
				else if( prise < 40)	color = CETC.setJSONColor( 43, 195, 155, 255, 43, 195, 155, 255 );
				else if( prise < 50)	color = CETC.setJSONColor( 174, 180, 26, 255, 174, 180, 26, 255 );
				else if( prise < 60)	color = CETC.setJSONColor( 202, 179, 52, 255, 202, 179, 52, 255 );
				else if( prise < 70)	color = CETC.setJSONColor( 187, 67, 38, 255, 187, 67, 38, 255 );
				else					color = CETC.setJSONColor( 241, 90, 88, 255, 241, 90, 88, 255 );
				
				var data = CIMAGE.getData();
				var size = CETC.getSize();
				var font = OPOI.setfont( "", null, 0, 0, 255, 255, 255, 255, 0, 0, 0, 255 );
				OPOI.createObject( _objkey, _center[0], _center[1], prise+60, data, size, font, true, color);
			},	
			checkOneJiMok : function( _num )	// 재설정 지목
			{
							
				if( _num == "undefined" || _num == "null" || _num == "")	return "미조사"
				
				var str = "";
				
				_num = Number( _num );
				
				if		( _num == 1 )		str = "전"			;
				else if	( _num == 2 ) 		str = "답"			;
				else if	( _num == 3 ) 		str = "과수원"			;
				else if	( _num == 4 ) 		str = "목장용지"		;
				else if	( _num == 5 ) 		str = "임야"			;
				else if	( _num == 6 ) 		str = "광천지"			;
				else if	( _num == 7 ) 		str = "염전"			;
				else if	( _num == 8 ) 		str = "대"			;
				else if	( _num == 9 ) 		str = "공장용지"		;
				else if	( _num == 10 ) 		str = "학교용지"		;
				else if	( _num == 11 ) 		str = "주차장"			;
				else if	( _num == 12 ) 		str = "주유소"			;
				else if	( _num == 13 ) 		str = "창고용지"		;
				else if	( _num == 14 ) 		str = "도로"			;
				else if	( _num == 15 ) 		str = "철도용지"		;
				else if	( _num == 16 ) 		str = "제방"			;
				else if	( _num == 17 ) 		str = "하천"			;
				else if	( _num == 18 ) 		str = "구거"			;
				else if	( _num == 19 ) 		str = "유지"			;
				else if	( _num == 20 ) 		str = "양어장"			;
				else if	( _num == 21 ) 		str = "수도용지"		;
				else if	( _num == 22 ) 		str = "공원"			;
				else if	( _num == 23 ) 		str = "체육용지"		;
				else if	( _num == 24 ) 		str = "유원지"			;
				else if	( _num == 25 ) 		str = "종교용지"		;
				else if	( _num == 26 ) 		str = "사적지"			;
				else if	( _num == 27 ) 		str = "묘지"			;
				else if	( _num == 28 ) 		str = "잡종지"			;
				else						str = "재설정확인요망"+_num;
				return str;
			},			
			checkSame : function( _num )
			{
				if( _num == "undefined" || _num == "null" || _num == "")	return "미조사"
				
				var str = "";

				_num = Number( _num );

				if( _num == 1 ) 			str = "일치"			;
				else if( _num == 2 ) 		str = "불일치"			;
				else						str = "일치불일치확인요망"+_num;
				return str;		
			},
			checkRealJiMokMain : function( _num )	// 현실지목(대분류)
			{
				if( _num == "undefined" || _num == "null" || _num == "")	return "미조사"
				
				var str = "";

				_num = Number( _num );

				if( _num == 1 ) 			str = "대지"			;
				else if( _num == 2 ) 		str = "교통용지"		;
				else if( _num == 3 ) 		str = "공공용지"		;
				else if( _num == 4 ) 		str = "농경용지지"		;
				else if( _num == 5 ) 		str = "임야"			;
				else if( _num == 6 ) 		str = "수역용지"		;
				else if( _num == 7 ) 		str = "체육용지"		;
				else if( _num == 8 ) 		str = "문화용지"		;
				else if( _num == 9 ) 		str = "산업용지지"		;
				else if( _num == 10 ) 		str = "에너지용지지"		;
				else if( _num == 11 ) 		str = "장례용지"		;
				else if( _num == 12 ) 		str = "기타용지"		;
				else						str = "현실지목대확인요망"+_num;
				return str;
			},
			checkRealJiMokSub : function( _num )	// 현실지목 (소분류)
			{
				if( _num == "undefined" || _num == "null" || _num == "")	return "미조사"
				
				var str = "";
				
				_num = Number( _num );
				
				if		( _num == 1)		str = "단독주택용지"		;
				else if	( _num == 2) 		str = "연립주택용지"		;
				else if	( _num == 3) 		str = "다세대주택용지"	;
				else if	( _num == 4) 		str = "아파트용지"		;
				else if	( _num == 5) 		str = "주상아파트용지"	;
				else if	( _num == 6) 		str = "주상용지"		;
				else if	( _num == 7) 		str = "학교용지"		;
				else if	( _num == 8) 		str = "종교용지"		;
				else if	( _num == 9) 		str = "상업.업무용지"	;
				else if	( _num == 10 ) 		str = "주거용나지"		;
				else if	( _num == 11 ) 		str = "상업.업무용나지"	;
				else if	( _num == 12 ) 		str = "주상용나지"		;
				else if	( _num == 13 ) 		str = "도로"			;
				else if	( _num == 14 ) 		str = "철도용지"		;
				else if	( _num == 15 ) 		str = "공항용지"		;
				else if	( _num == 16 ) 		str = "항만용지"		;
				else if	( _num == 17 ) 		str = "여객자동차터미널용지";
				else if	( _num == 18 ) 		str = "고속도로휴게소용지"	;
				else if	( _num == 19 ) 		str = "주차장"			;
				else if	( _num == 20 ) 		str = "공공시설용지"		;
				else if	( _num == 21 ) 		str = "군사용지"		;
				else if	( _num == 22 ) 		str = "공공용나지"		;
				else if	( _num == 23 ) 		str = "전"			;
				else if	( _num == 24 ) 		str = "답"			;
				else if	( _num == 25 ) 		str = "염전"			;
				else if	( _num == 26 ) 		str = "과수원"			;
				else if	( _num == 27 ) 		str = "목장용지"		;
				else if	( _num == 28 ) 		str = "조림지"			;
				else if	( _num == 29 ) 		str = "자연임지"		;
				else if	( _num == 30 ) 		str = "토지임야"		;
				else if	( _num == 31 ) 		str = "하천"			;
				else if	( _num == 32 ) 		str = "구거"			;
				else if	( _num == 33 ) 		str = "유지"			;
				else if	( _num == 34 ) 		str = "제방"			;
				else if	( _num == 35 ) 		str = "스키장"			;
				else if	( _num == 36 ) 		str = "골프장"			;
				else if	( _num == 37 ) 		str = "운동장"			;
				else if	( _num == 38 ) 		str = "경주장"			;
				else if	( _num == 39 ) 		str = "승마장"			;
				else if	( _num == 40 ) 		str = "사적지"			;
				else if	( _num == 41 ) 		str = "문화시설용지"		;
				else if	( _num == 42 ) 		str = "유원지"			;
				else if	( _num == 43 ) 		str = "공원"			;
				else if	( _num == 44 ) 		str = "콘도미니엄"		;
				else if	( _num == 45 ) 		str = "공업용지"		;
				else if	( _num == 46 ) 		str = "지식산업용지"		;
				else if	( _num == 47 ) 		str = "공업용나지"		;
				else if	( _num == 48 ) 		str = "창고용지"		;
				else if	( _num == 49 ) 		str = "광업용지"		;
				else if	( _num == 50 ) 		str = "열공급용지"		;
				else if	( _num == 51 ) 		str = "전기공급용지"		;
				else if	( _num == 52 ) 		str = "주유소용지"		;
				else if	( _num == 53 ) 		str = "충전소용지"		;
				else if	( _num == 54 ) 		str = "묘지"			;
				else if	( _num == 55 ) 		str = "화장장"			;
				else if	( _num == 56 ) 		str = "축산물위생시설"	;
				else if	( _num == 57 ) 		str = "오·폐수처리용지"	;
				else if	( _num == 58 ) 		str = "광천지"			;
				else if	( _num == 59 ) 		str = "방송·통신시설용지"	;
				else if	( _num == 60 ) 		str = "용도미지정용지"	;
				else						str = "현실지목소확인요망"+_num
				return str;
			},
			checkLand : function( _num )	// 토지용도
			{
				if( _num == "undefined" || _num == "null" || _num == "")	return "미조사"
				
				var str = "";
				
				_num = Number( _num );
				
				if		( _num == 1)		str = "단독주택용지"		;
				else if	( _num == 2) 		str = "연립주택용지"		;
				else if	( _num == 3) 		str = "다세대주택용지"	;
				else if	( _num == 4) 		str = "아파트용지"		;
				else if	( _num == 5) 		str = "주상아파트용지"	;
				else if	( _num == 6) 		str = "주상용지"		;
				else if	( _num == 7) 		str = "학교용지"		;
				else if	( _num == 8) 		str = "상업.업무용지"	;
				else if	( _num == 9) 		str = "종교용지"		;
				else if	( _num == 10 ) 		str = "주거용나지"		;
				else if	( _num == 11 ) 		str = "상업.업무용나지"	;
				else if	( _num == 12 ) 		str = "주상용나지"		;
				else if	( _num == 13 ) 		str = "주차장"			;
				else if	( _num == 14 ) 		str = "철도용지"		;
				else if	( _num == 15 ) 		str = "공항용지"		;
				else if	( _num == 16 ) 		str = "항만용지"		;
				else if	( _num == 17 ) 		str = "여객자동차터미널용"	;
				else if	( _num == 18 ) 		str = "도로"			;
				else if	( _num == 19 ) 		str = "고속도로휴게소용지"	;
				else if	( _num == 20 ) 		str = "공공용나지"		;
				else if	( _num == 21 ) 		str = "공공시설용지"		;
				else if	( _num == 22 ) 		str = "전"			;
				else if	( _num == 23 ) 		str = "답"			;
				else if	( _num == 24 ) 		str = "목장용지"		;
				else if	( _num == 25 ) 		str = "과수원"			;
				else if	( _num == 26 ) 		str = "조림"			;
				else if	( _num == 27 ) 		str = "자연림"			;
				else if	( _num == 28 ) 		str = "토지임야"		;
				else if	( _num == 29 ) 		str = "하천"			;
				else if	( _num == 30 ) 		str = "구거"			;
				else if	( _num == 31 ) 		str = "제방"			;
				else if	( _num == 32 ) 		str = "유지"			;
				else if	( _num == 33 ) 		str = "스키장"			;
				else if	( _num == 34 ) 		str = "골프장"			;
				else if	( _num == 35 ) 		str = "운동장"			;
				else if	( _num == 36 ) 		str = "경주장"			;
				else if	( _num == 37 ) 		str = "승마장"			;
				else if	( _num == 38 ) 		str = "사적지"			;
				else if	( _num == 39 ) 		str = "문화시설용지"		;
				else if	( _num == 40 ) 		str = "유원지"			;
				else if	( _num == 41 ) 		str = "공원"			;
				else if	( _num == 42 ) 		str = "공업용지"		;
				else if	( _num == 43 ) 		str = "지식산업용지"		;
				else if	( _num == 44 ) 		str = "공업용나지"		;
				else if	( _num == 45 ) 		str = "창고용지"		;
				else if	( _num == 46 ) 		str = "광업용지"		;
				else if	( _num == 47 ) 		str = "열공급용지"		;
				else if	( _num == 48 ) 		str = "전기공급용지"		;
				else if	( _num == 49 ) 		str = "주유소용지"		;
				else if	( _num == 50 ) 		str = "충전소용지"		;
				else if	( _num == 51 ) 		str = "묘지"			;
				else if	( _num == 52 ) 		str = "화장장"			;
				else if	( _num == 53 ) 		str = "콘도미니엄"		;
				else if	( _num == 54 ) 		str = "도축장"			;
				else if	( _num == 55 ) 		str = "오.폐수처리용지"	;
				else if	( _num == 56 ) 		str = "염전"			;
				else if	( _num == 57 ) 		str = "광천지"			;
				else if	( _num == 58 ) 		str = "군사용지"		;
				else if	( _num == 59 ) 		str = "방송.통신시설용지"	;
				else if	( _num == 60 ) 		str = "잡종지"			;
				else if	( _num == 61 ) 		str = "기타(의견작성)"	;
				else						str = "토지확인요망"+_num;
				return str;
			},
			checkBuild : function( _num )	// 건물용도
			{
				if( _num == "undefined" || _num == "null" || _num == "")	return "미조사"
				
				var str = "";
				
				_num = Number( _num );
				
				if		( _num == 11 )		str = "단독주택"		;
				else if	( _num == 12 )		str = "다가구주택"		;
				else if	( _num == 13 )		str = "다중주택"		;
				else if	( _num == 21 )		str = "아파트"			;
				else if	( _num == 22 )		str = "연립주택"		;
				else if	( _num == 23 )		str = "다세대주택"		;
				else if	( _num == 24 )		str = "기숙사"			;
				else if	( _num == 31 )		str = "제1종근린생활시설"	;
				else if	( _num == 32 )		str = "제2종근린생활시설"	;
				else if	( _num == 33 ) 		str = "문화및집회시설"	;
				else if	( _num == 34 ) 		str = "종교시설"		;
				else if	( _num == 35 ) 		str = "판매시설"		;
				else if	( _num == 36 ) 		str = "운수시설 "		;
				else if	( _num == 37 ) 		str = "의료시설"		;
				else if	( _num == 38 ) 		str = "교육연구시설"		;
				else if	( _num == 39 ) 		str = "노유자시설"		;
				else if	( _num == 40 ) 		str = "수련시설"		;
				else if	( _num == 41 ) 		str = "운동시설"		;
				else if	( _num == 42 ) 		str = "업무시설"		;
				else if	( _num == 43 ) 		str = "숙박시설"		;
				else if	( _num == 44 ) 		str = "위락시설"		;
				else if	( _num == 45 ) 		str = "교정및군사시설"	;
				else if	( _num == 46 ) 		str = "방송통신시설"		;
				else if	( _num == 47 ) 		str = "발전시설"		;
				else if	( _num == 48 ) 		str = "묘지관련시설"		;
				else if	( _num == 49 ) 		str = "관광휴게시설"		;
				else if	( _num == 51 ) 		str = "공장"			;
				else if	( _num == 52 ) 		str = "창고시설"		;
				else if	( _num == 53 ) 		str = "위험물저장및처리시설";
				else if	( _num == 54 ) 		str = "자동차관련시설"	;
				else if	( _num == 55 ) 		str = "동물및식물관련시설"	;
				else if	( _num == 56 ) 		str = "자원순환관련시설"	;
				else if	( _num == 61 ) 		str = "주?상용건물"		;
				else if	( _num == 62 ) 		str = "주?산용건물"		;
				else if	( _num == 63 ) 		str = "기타복합용건물"	;
				else if	( _num == 99 ) 		str = "기타"			;
				else						str = "건물확인요망"+_num;
				return str;
			},
		},
	},
}
var OPOI = LAYER.OBJECT.POI;
var OBILL = LAYER.OBJECT.BILLBOARD;
var OWALL = LAYER.OBJECT.WALL;
var OGRAPH = LAYER.OBJECT.GRAPH;
var OETC = LAYER.ETC;
var OCREATEYY = LAYER.CREATE.YANGPYEONG;