class TLayer {
	constructor(_type) {
		this.m_type = _type;
		this.m_layerList = null;
		this.m_layerName = null;
		this.m_layer = null;
	}
	createLayer(_name) {
		if (this.m_layerName == _name) return true;

		this.m_layer = this.findLayer(_name);
		if (this.m_layer == null) {
			this.m_layer = this.m_layerList.createLayer(_name, this.m_type);
			this.m_layerName = _name;
//			console.log(" layerName : " + _name + " type : " + this.m_type);
		} else {
			// 추가하자
			this.setLayer(_name);
			return true;
		}
		return true;
	}
	deleteLayer() {
		if (this.m_layerName == null) {
			console.log("deleted layer");
			return true;
		}
		var result = this.m_layerList.delLayerAtName(this.m_layerName);
		if (result) {
			this.m_layer = null;
			this.m_layerName = null;
			console.log("delete : " + this.m_layerName + " layer OK");
		}
		else console.log("delete : " + this.m_layerName + " layer error");
		return result;
	}
	createObject(_name, _type) {
		var object = null;
		if (_type == 0) object = Module.createPolygon(_name);				// EOT_POLYHEDRON
		else if (_type == 1) object = Module.createColorPolygon(_name);		// 컬러 폴리곤
		else if (_type == 3) object = Module.createBillboard(_name);		// EOT_BILLBOARD
		else if (_type == 4) object = Module.createLineString(_name);		// EOT_3DLINE
		else if (_type == 5) object = Module.createPoint(_name);			// EOT_3DPOINT
		else object = Module.createPolygon(_name);		// ETC
		return object;
	}

	addObject(_obj, _type) {
		this.m_layer.addObject(_obj, _type);
	}
	createShape(...args) {
		this.addObject(this.getObject(args), 0);
	}
	getShape(...args) {
		return this.getObject(args);
	}
	removeAllObject() {
		this.m_layer.removeAll();
	}
	findLayer(_layername) {
		return this.m_layerList.nameAtLayer(_layername);
	}
	setLayerList() {
		if (typeof Module === "undefined") console.log("Load Module Fail");
		else this.m_layerList = new Module.JSLayerList(true);
	}
	setLayer(_name) {
		if (this.m_layerName == _name) return true;
		var layer = this.findLayer(_name);
		var type = layer.getType();

		if (layer == null || type != 5) return false;
		this.m_layer = layer;
		this.m_layerName = _name;
		return true;
	}
	setMaxDistance(_value) {
		this.m_layer.setMaxDistance(_value);
	}
	setVisibleLayer(_type) {
		if (this.m_layer == null) return -1;
		else this.m_layer.setVisible(_type);
		Module.XDRenderData();
		return 1;
	}
}
class POLYGON extends TLayer {
	constructor() {
		super(1);
		super.setLayerList();
	}
	getObject(args) {
		var type = args[0];
		var polygon = null;
		if (type == 0) polygon = this.getPolygon(args);
		else if (type == 1) polygon = this.getWillPolygon(args);
		else if (type == 2) polygon = this.getCircle(args);
		
		return polygon;
	}
	getPolygon(args) {
		// 인자 정리
		var key, position, parts, height, fr, fg, fb, fa, sr, sg, sb, sa;
		key = args[1];
		position = args[2];
		parts = args[3];
		height = args[4];
		fr = args[5];
		fg = args[6];
		fb = args[7];
		fa = args[8];
		sr = args[9];
		sg = args[10];
		sb = args[11];
		sa = args[12];
		
		// 객체 생성
		var polygon = this.createObject(key, 0);
		
		// 색상 설정
		var polygonStyle = new Module.JSPolygonStyle();		
		
		if(fr == 0 && fg == 0 && fb == 0 &&  fa == 0 ) return null;
		polygonStyle.setFill(true);
		polygonStyle.setFillColor(new Module.JSColor(fa, fr, fg, fb));
		
		if(sr != 0 || sg != 0 || sb != 0 || sa != 0 ) {
			polygonStyle.setOutLine(true);
			polygonStyle.setOutLineColor(new Module.JSColor(sa, sr, sg, sb));
		}
		
		polygon.setStyle(polygonStyle);
		polygon.setPartCoordinates(position, parts);
		// 다각형 높이 설정
		polygon.setHeight(height);
		return polygon;
	}
	getWillPolygon(args) {
		var key, position, parts, height, fr, fg, fb, fa, sr, sg, sb, sa;
		key = args[1];
		position = args[2];
		parts = args[3];
		height = args[4];
		fr = args[5];
		fg = args[6];
		fb = args[7];
		fa = args[8];
		sr = args[9];
		sg = args[10];
		sb = args[11];
		sa = args[12];			

		var polygon = Module.createColorPolygon(key);
		var firstColor = new Module.JSColor(fa, fr, fg, fb);
		var nextColor = new Module.JSColor(sa, sr, sg, sb);
		
		polygon.SetVerticalPlane(position,
			parts,
			height,
			firstColor, 	// 하단 그라데이션 JSColor ( a, r, g, b )
			nextColor		// 상단 그라데이션
		);
		
		polygon.SetCullMode(1);
		return polygon;
	}
	getCircle(args) {
		// 인자 정리
		var key, position, radius, shape, height, fr, fg, fb, fa, sr, sg, sb, sa;
		key = args[1];
		position = args[2];
		radius = args[3];
		shape = args[4]
		height = args[5];		
		fr = args[6];
		fg = args[7];
		fb = args[8];
		fa = args[9];
		sr = args[10];
		sg = args[11];
		sb = args[12];
		sa = args[13];
		
		// 객체 생성
		var polygon = this.createObject(key, 0);
		
		var polygonStyle = new Module.JSPolygonStyle();		
		if(fr == 0 && fg == 0 && fb == 0 &&  fa == 0 ) return null;
		polygonStyle.setFill(true);
		polygonStyle.setFillColor(new Module.JSColor(fa, fr, fg, fb));
		if(sr != 0 || sg != 0 || sb != 0 || sa != 0 ) {
			polygonStyle.setOutLine(true);
			polygonStyle.setOutLineColor(new Module.JSColor(sa, sr, sg, sb));
		}
		
		polygon.setStyle(polygonStyle);
		
		polygon.setCircle(position, radius, shape);
		polygon.setCullMode(1);
		polygon.setHeight(height);
		return polygon;
	}
	createWillLineObject(_objkey, _position, _linewidth, _color) {
		//createWillLineObject(_objkey, _position, _linewidth, _color) {
					var key, position, parts, height, fr, fg, fb, fa, sr, sg, sb, sa;
		key = args[1];
		position = args[2];
		parts = args[3];
		height = args[4];
		fr = args[5];
		fg = args[6];
		fb = args[7];
		fa = args[8];
		sr = args[9];
		sg = args[10];
		sb = args[11];
		sa = args[12];			

		var polygon = Module.createLineString(key);		
		var lineStyle = new Module.JSPolyLineStyle();
		
		lineStyle.setWidth(2);
		lineStyle.setColor(new Module.JSColor(fa, fr, fg, fb));					// 맨위 색상
		polygon.setStyle(lineStyle);		
		polygon.setPartCoordinates(position, parts);
		
		return polygon;
			/*
		// 벽 위 선 그리기
		var line = Module.createLineString(_objkey);
		var coordinates = new Module.JSVec3Array();
		var parts = new Module.Collection();

		for (var i = 0, len = _position.length / 3; i < len; i++) {
			coordinates.push(new Module.JSVector3D(_position[(i * 3)], _position[(i * 3) + 1], _position[(i * 3) + 2]));
		}
		parts.add(_position.length / 3);

		var color = new Module.JSColor(_color["fill_color_a"], _color["fill_color_r"], _color["fill_color_g"], _color["fill_color_b"]);
		line.setPartCoordinates(coordinates, parts);

		var lineStyle = new Module.JSPolyLineStyle();
		lineStyle.setWidth(_linewidth);
		lineStyle.setColor(color);					// 맨위 색상
		line.setStyle(lineStyle);

		this.addObject(line, 0);
		//super.addObject(line, 0);
		*/
	}
}
class BILLBOARD extends TLayer {
	constructor() {
		super(3);
		super.setLayerList();
	}
	getObject(args) {
		// 인자 정리
		var key, lon, lat, alt, image, size, scale;
		key = args[0];
		lon = args[1];
		lat = args[2];
		alt = args[3];
		image = args[4];
		size = args[5];
		scale = args[6];
		// 객체 생성
		var billboard = this.createObject(key, 3);
		var position = new Module.JSVector3D(lon, lat, alt);
		billboard.setImage(
			position,
			image,
			size["width"],
			size["height"]
		);
		billboard.setSizeScale(scale, scale, scale);
		return billboard;
	}
}
class SKYLINE extends TLayer {
	constructor() {
		super(102);
		super.setLayerList();
	}
	getObject(args) {
		// 인자 정리
		var key,
			coordinates, coordinatesStyle,
			shapeStyle, shapeAddHeight, shapeDepth,
			r, g, b, a,
			linewidth;

		key = args[0];
		coordinates = args[1];
		coordinatesStyle = args[2];
		shapeStyle = args[3];				// 지형 결합, 일반
		shapeAddHeight = args[4];			// 지형 결합 시 높이 설정
		shapeDepth = args[5];
		r = args[6];
		g = args[7];
		b = args[8];
		a = args[9];
		linewidth = args[10];
		
		// 객체 생성 ( 3D Line )
		var line = this.createObject(key, 4);
		var data = {
			coordinates: {
				coordinate: coordinates,
				style: coordinatesStyle,
			},
			shape: {
				style: shapeStyle,
				height: shapeAddHeight,
				depth: shapeDepth
			},
			color: {
				fill: { a: a, r: r, g: g, b: b },
			},
			width: linewidth,
		};
		line.createCombinatLine(data);
		return line;
	}
}
class RTTLINE extends TLayer {
	constructor() {
		super(4);
		super.setLayerList();
	}
	getObject(args) {
		// 인자 정리
		var key, coordinates, coordinatesStyle, r, g, b, a, linewidth;
		key = args[0];
		coordinates = args[1];
		coordinatesStyle = args[2];
		r = args[3];
		g = args[4];
		b = args[5];
		a = args[6];
		linewidth = args[7];
		// 객체 생성 ( RTT Line )
		var line = this.createObject(key, 4);
		var data = {
			coordinates: {
				coordinate: coordinates,
				style: coordinatesStyle,
			},
			color: {
				fill: { a: a, r: r, g: g, b: b },
			},
			width: linewidth,
		};
		console.log(line.createCombinatLine(data));
		return line;
	}
}
class POI extends TLayer {
	constructor(TCANVAS) {
		super(5);
		super.setLayerList();
		this.m_draw = TCANVAS;
	}
	getObject(args) {
		// 인자 정리
		var key, lon, lat, alt, image, size, font, linemode, linecolor;
		key = args[0];
		lon = args[1];
		lat = args[2];
		alt = args[3];
		image = args[4];
		size = args[5];
		font = args[6];
		linemode = args[7];
		linecolor = args[8];
		// 객체 생성
		var poi = this.createObject(key, 5);
		var fillColor = new Module.JSColor(font[1]["fill_color_a"], font[1]["fill_color_r"], font[1]["fill_color_g"], font[1]["fill_color_b"]);				//ARGB 순서
		var strokeColor = new Module.JSColor(font[1]["stroke_color_a"], font[1]["stroke_color_r"], font[1]["stroke_color_g"], font[1]["stroke_color_b"]);
		poi.setText(font[0]["text"]);
		poi.setFontStyle(font[0]["font_name"],
			font[0]["font_size"],
			font[0]["font_weight"],
			fillColor,
			strokeColor);
		var position = new Module.JSVector3D(lon, lat, alt);
		poi.setPosition(position);
		poi.setImage(image, size["width"], size["height"]);

		if (linemode) {
			var lineColor = new Module.JSColor(linecolor["fill_color_a"], linecolor["fill_color_r"], linecolor["fill_color_g"], linecolor["fill_color_b"]);
			poi.setPositionLine(0, lineColor);
		}
		return poi;
	}
	setfont(...args) {
		// 인자 정리
		var text, fname, fsize, fweight, fr, fg, fb, fa, sr, sg, sb, sa;
		text = args[0];
		fname = args[1];
		fsize = args[2];
		fweight = args[3];
		fr = args[4];
		fg = args[5];
		fb = args[6];
		fa = args[7];
		sr = args[8];
		sg = args[9];
		sb = args[10];
		sa = args[11];

		if (text == null) text = " ";
		if (fname == null) fname = "맑은 고딕";
		if (fsize < 7) fsize = 15;
		if (fweight < 100) fweight = 600;
		// 객체 생성
		var color = this.m_draw.setJSONColor(fr, fg, fb, fa, sr, sg, sb, sa);
		var reusult_font = [{
			"text": text,
			"font_name": fname,
			"font_size": fsize,
			"font_weight": fweight,
		}];
		reusult_font.push(color);
		return reusult_font;

	}
}
class GRAPH extends TLayer {
	constructor() {
		super(113);
		super.setLayerList();
	}
	getObject(args) {
		var key, lon, lat, alt, name, dataSet;
		key = args[0];
		lon = args[1];
		lat = args[2];
		alt = args[3];
		name = args[4];
		dataSet = args[5];

		var graph = Module.createBarGraph(key);

		// 범례				
		graph.insertLegend("Legend1", "일치", new Module.JSColor(200, 22, 90, 158));
		graph.insertLegend("Legend2", "불일치", new Module.JSColor(200, 150, 111, 30));
		graph.insertLegend("Legend3", "조사전", new Module.JSColor(200, 150, 150, 150));

		// 데이터 추가 (데이터는 범례가 추가된 순서대로 적용됨)
		var dataSetList = [
			{
				// 첫번째 데이터 셋 
				FieldName: name,	// 데이터 셋의 명칭
				Data: dataSet		// 범례 추가 순서에 따라 '가스, 전기, 수도, 기타' 순
			},
		];

		for (var i = 0, len = dataSetList.length; i < len; i++) {
			// 데이터 전송 객체 생성
			var data = new Module.Collection();

			// 데이터 값 입력
			for (var j = 0, subLen = dataSetList[i].Data.length; j < subLen; j++) {
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
			new Module.JSVector3D( lon,  lat,  alt),
			new Module.JSSize2D(450, 788),
			0);	// 0(막대가 가로로 배열된 형태), 1(막대가 쌓인 형태) 				
		graph.setGridVisible(false);

		return graph;
	}
}
class ANIOBJECT extends TLayer {
	constructor() {
		super(0);
		super.setLayerList();
		this.m_celObj = null;
	}
	createAniObject(_objkey) {
		var position = [];
		position.push(127.42774585592929, 37.510980395540386, 10);

		this.m_celObj = Module.createAniObject(_objkey);
		var data = {
			key: _objkey,
			positiontype: "XYZ",
			position: position,
		}
		var result = this.m_celObj.Create(data);
		console.log(result);
	}
	createPolygon(_objkey, _position, _image, _size) {

		var data = {
			key: _objkey,
			shape: "polygon",
			position: _position,
			positiontype: "XYZ",
			fcolor: { a: 255, r: 255, g: 255, b: 255 },
			ocolor: { a: 255, r: 255, g: 255, b: 255 },
			image: _image,
			imagesize: _size,
			height: 200
		}
		this.m_celObj.addObject(data);

		/*
		// 이미지 생성
		CIMAGE.draw(10, 0, 0, 0);
		var data = tcanvas.getData();
		var size = tcanvas.getSize();
		var font = tPOI.setfont( "test", null, 0, 0, 255, 255, 255, 255, 0, 0, 0, 255 );

		"text": _text,
		"font_name": _fname,
		"font_size": _fsize,
		"font_weight": _fweight,

		//ARGB 순서
		var fillColor 	= new Module.JSColor( font[1]["fill_color_a"], font[1]["fill_color_r"], font[1]["fill_color_g"], font[1]["fill_color_b"] );
		var strokeColor	= new Module.JSColor( font[1]["stroke_color_a"], font[1]["stroke_color_r"], font[1]["stroke_color_g"], font[1]["stroke_color_b"] );
		poi.setText( font[0]["text"] );
		poi.setFontStyle(	font[0]["font_name"],
							font[0]["font_size"],
							font[0]["font_weight"],
							fillColor,
							strokeColor);
		var position = new Module.JSVector3D(_lon, _lat, _alt);
		poi.setPosition( position );
		var result = poi.setImage( _image, _size["width"], _size["height"] );

		if( _linemode ){
			var lineColor = new Module.JSColor( _linecolor["fill_color_a"], _linecolor["fill_color_r"], _linecolor["fill_color_g"], _linecolor["fill_color_b"] );
			poi.setPositionLine(0, lineColor);
		}
		super.addObject(poi, 0);
		*/

	}

	createPOI(_objkey, _position) {
		/*
		var poi = Module.createPoint( _objkey );
		
		// 이미지 생성
		CIMAGE.draw(10, 0, 0, 0);
		var data = tcanvas.getData();
		var size = tcanvas.getSize();
		var font = tPOI.setfont( "test", null, 0, 0, 255, 255, 255, 255, 0, 0, 0, 255 );

		"text": _text,
		"font_name": _fname,
		"font_size": _fsize,
		"font_weight": _fweight,

		//ARGB 순서
		var fillColor 	= new Module.JSColor( font[1]["fill_color_a"], font[1]["fill_color_r"], font[1]["fill_color_g"], font[1]["fill_color_b"] );
		var strokeColor	= new Module.JSColor( font[1]["stroke_color_a"], font[1]["stroke_color_r"], font[1]["stroke_color_g"], font[1]["stroke_color_b"] );
		poi.setText( font[0]["text"] );
		poi.setFontStyle(	font[0]["font_name"],
							font[0]["font_size"],
							font[0]["font_weight"],
							fillColor,
							strokeColor);
		var position = new Module.JSVector3D(_lon, _lat, _alt);
		poi.setPosition( position );
		var result = poi.setImage( _image, _size["width"], _size["height"] );

		if( _linemode ){
			var lineColor = new Module.JSColor( _linecolor["fill_color_a"], _linecolor["fill_color_r"], _linecolor["fill_color_g"], _linecolor["fill_color_b"] );
			poi.setPositionLine(0, lineColor);
		}
		super.addObject(poi, 0);
		*/



		var type = "polygon";

		var data = {
			key: _objkey,
			type: "rotate",
			shape: "polygon",
			positiontype: "XYZ",
			position: _position,
			color: { a: 128, r: 128, g: 128, b: 128 },
			height: 20
		}
		console.log(ani.Create(data));
		this.addObject(ani, 0);
		//super.addObject(ani, 0);
	}
}
class Common {
	constructor() { }
	setPosition(_position, _alt, _type) {
		var i, len, str_pos = null;
		var reuslt_coordinates = [];
		var polygonsArray, xyz;

		if (_type == "coordinates") {
			str_pos = _position;
			for (i = 0, len = (str_pos.length >> 1); i < len; i++) {
				var tmp_pos = new Array();
				tmp_pos.push(parseFloat(str_pos[(i * 2)]), parseFloat(str_pos[(i * 2) + 1]), _alt);
				reuslt_coordinates.push(tmp_pos);
				tmp_pos = null;
			}
		} else if (_type == "POLYGON" || _type == "MULTILINESTRING" || _type == "MULTIPOLYGON") {
			//var str = _type + "(";
			str_pos = _position.replaceAll(_type, "");
			str_pos = str_pos.trim();
			str_pos = str_pos.replaceAll("))", ")");
			str_pos = str_pos.replaceAll("(", "");
			str_pos = str_pos.split('),');

			str_pos.forEach((item, index) => {
				polygonsArray = item.replaceAll(")", "").split(',');
				var singlePolygon = null;
				singlePolygon = [];

				polygonsArray.forEach((element, index) => {
					xyz = element.trim().split(' ');
					var tmp_pos = [];
					tmp_pos.push(parseFloat(xyz[0].trim()), parseFloat(xyz[1].trim()), _alt);
					singlePolygon.push(tmp_pos);
					tmp_pos = null;
				});
				reuslt_coordinates.push(singlePolygon);
			});
		}
		return reuslt_coordinates;
	}
	setGeometry(_def) {
		var source;
		if (_def == 4326) {
			// Latitude/Logitude (WGS84) 엔진 13번
			Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
			source = new Proj4js.Proj("EPSG:4326");
		} else if (_def == 5174) {
			// 엔진 23번
			Proj4js.defs["EPSG:5174"] = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
			source = new Proj4js.Proj("EPSG:5174");
		}
		else if (_def == 5186) {
			// Korea TM WGS84 2010(Middle) 엔진 20번
			Proj4js.defs["EPSG:5186"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
			source = new Proj4js.Proj("EPSG:5186");
		}
		return source;
	}
	transformCoordinates(_source, _dest, _position) {
		var x, y, pt, rs;
		var list = [];
		var min = { x: 999, y: 999 }, max = { x: 0, y: 0 };

		_position.forEach((item, index) => {
			x = Number(item[0]);
			y = Number(item[1]);
			
			pt = new Proj4js.Point(x, y);
			rs = Proj4js.transform(_source, _dest, pt);
			var position = [];
			position.push(rs["x"], rs["y"], Number(item[2]));
			list.push(position);

			if (rs["x"] < min.x) min.x = rs["x"];
			else if (rs["x"] > max.x) max.x = rs["x"];

			if (rs["y"] < min.y) min.y = rs["y"];
			else if (rs["y"] > max.y) max.y = rs["y"];
		});
		return {
			min: min,
			max: max,
			coordinates: list
		};
	}
	setAABBOX(_coordinates) {
		var minx, miny,
			maxx, maxy;

		maxx = minx = _coordinates[0][0];
		maxy = miny = _coordinates[0][1];
		_coordinates.forEach((item, index) => {
			if (minx > item[0]) minx = item[0];
			if (maxx < item[0]) maxx = item[0];
			if (miny > item[1]) miny = item[1];
			if (maxy < item[1]) maxy = item[1];
		});
		return {
			minx: minx,
			maxx: maxx,
			miny: miny,
			maxy: maxy
		};
	}
	getPickPoint(_lon, _lat) {
		return Module.getMap().getLonLatHeight(_lon, _lat);
	}
	getMassCenter(_poslist) {
		var Ret = [];
		var cen_tmp = [];
		var area, area_sum, i;

		area = area_sum = 0.0;
		Ret[0] = Ret[1] = 0.0;
		cen_tmp[0] = cen_tmp[1] = 0.0;	
		_poslist.forEach((item, index) => {
			if(_poslist.length-1 != index) {
				cen_tmp[0] = parseFloat(_poslist[0][0] + item[0] + _poslist[index + 1][0]);
				cen_tmp[1] = parseFloat(_poslist[0][1] + item[1] + _poslist[index + 1][1]);
				
				var x1, x2, x3, x4;
				x1 = parseFloat(item[0] - _poslist[0][0]);
				x2 = parseFloat(_poslist[index + 1][1] - _poslist[0][1]);
				x3 = parseFloat(_poslist[index + 1][0] - _poslist[0][0]);
				x4 = parseFloat(item[1] - _poslist[0][1]);
				area = parseFloat(x1 * x2 - x3 * x4);
				
				Ret[0] += area * cen_tmp[0];
				Ret[1] += area * cen_tmp[1];
				area_sum = parseFloat(area_sum + area);
			}
		})

		Ret[0] = parseFloat(Ret[0] / (3 * area_sum));
		Ret[1] = parseFloat(Ret[1] / (3 * area_sum));

		var result_center = [];
		result_center.push(Ret[0], Ret[1])
		return result_center;
	}
	getUVPosition(_position) {
		var list = [];
		var center = { x: 0, y: 0 };
		var width = Math.abs(_position.max.x - _position.min.x);
		var height = Math.abs(_position.max.y - _position.min.y);

		for (var i = 0, len = (_position.coordinates.length) / 3; i < len; i++) {
			center.x = Math.abs(_position.min.x - _position.coordinates[(i * 3)]) / width;
			center.y = Math.abs(_position.min.y - _position.coordinates[(i * 3) + 1]) / height;
			list.push(center.x, center.y);
		}
		return {
			center: center,
			uv: list
		};
	}

	convertCoordinatesToXY(_coordinates, _width, _height) {
		var minx, miny,
			maxx, maxy,
			lenx, leny;

		maxx = minx = _coordinates[0][0];
		maxy = miny = _coordinates[0][1];
		console.log(_coordinates[0]);
		console.log(minx, miny, maxx, maxy);

		_coordinates.forEach((item, index) => {
			if (minx > item[0]) minx = item[0];
			if (maxx < item[0]) maxx = item[0];
			if (miny > item[1]) miny = item[1];
			if (maxy < item[1]) maxy = item[1];
		});
		lenx = maxx - minx;
		leny = maxy - miny;
		console.log(minx, miny, maxx, maxy);

		_coordinates.forEach((item, index) => {
			item[0] -= minx;
			item[0] = _width * (item[0] / lenx);
			item[1] -= miny;
			item[1] = _height - (_height * (item[1] / leny));	// 스크린좌표는 좌상단 기준점 opengle은 좌하단 임으로 변경
		});
		return _coordinates;
	}
}

var tPolygon = new POLYGON();
var tBill = new BILLBOARD();
var tSkyLine = new SKYLINE();
var tRttLine = new RTTLINE();
var tPOI = new POI(tcanvas);
var tGraph = new GRAPH();
var tAni = new ANIOBJECT();
var tCommon = new Common();