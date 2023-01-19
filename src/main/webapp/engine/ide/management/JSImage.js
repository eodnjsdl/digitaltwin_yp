class TImage {
	constructor(TCANVAS) {
		this.m_draw = TCANVAS;
		this.m_gridX = 0;
		this.m_gridY = 0;
	}
	setjimokImage(_w, _h, _info) {
		this.m_draw.clearCanvas();
		this.m_draw.setCanvasSize(_w, _h);
		//전체 검은색 rect 테스트용
		//this.m_draw.setColor( "rgba(0,0,0,1)", 0 );
		//this.m_draw.drawRect( 0, 0, _w, _h, 0 );
		// 내부 외부 설정
		this.m_draw.setColor("rgba(255,255,255,0.8)", 0);
		this.m_draw.setColor("rgba(206,206,206,1)", 1);
		this.m_draw.drawOutLine(_w, _h, 1, 10, 10, 5, _h / 3, 10, 1);

		this.m_draw.drawOtion(2);


		this.m_draw.setTextAlignment("top", "start");
		var fontwidth = 900;
		var fonsize = 30;
		this.m_draw.setTextStyle(fontwidth + " " + fonsize + "px Arial");
		this.m_draw.setColor("rgba(0,0,0,1)", 0);
		this.m_draw.setLineStyle(2, "butt", "round");

		//this.m_draw.drawText( _text, ( _w >> 1 ), _h/3, 0 );
		var str = "지번정보\t\t\t : " + _info["pnu"] + "(" + _info["jibun"] + ")";
		this.m_draw.drawText(str, (_w >> 2), _h * 0.25, 0);

		str = "조사결과\t\t\t : " + _info["same"];
		this.m_draw.drawText(str, (_w >> 2), _h * 0.25 + fonsize, 0);
		str = "원지목\t\t\t\t\t\t : " + _info["name"];
		this.m_draw.drawText(str, (_w >> 2), _h * 0.25 + (fonsize << 1), 0);
	}
	setjimokBoard(_w, _h, _x, _y, _radius, _tail, _info) {
		this.m_draw.clearCanvas();
		this.m_draw.setCanvasSize(_w, _h);
		//전체 검은색 rect 테스트용
		//this.m_draw.setColor( "rgba(0,0,0,1)", 0 );
		//this.m_draw.drawRect( 0, 0, _w, _h, 0 );
		var pos_x, pos_y;
		pos_x = _x;
		pos_y = _y;
		this.m_draw.setShadow(5, "rgba(255,255,255,1)");

		this.m_draw.clearColorMap();
		// 그라데이션 적용
		var colors = [
			{ "index": 0.6, "color": "rgba(148, 250, 254, 1)" },
			{ "index": 0.8, "color": "rgba(142, 230, 230, 1)" },
			{ "index": 1, "color": "rgba(146, 224, 210, 1)" },
		];

		for (var color of colors) this.m_draw.insertColorMap(color.index, color.color);

		this.m_draw.setColor("rgba(255,255,255,0.7)", 0)
		this.m_draw.setRadialGradient((_w >> 1), (_h >> 1), 0, (_w >> 1), (_h >> 1), _h, 1);
		// 테스트 그라데이션
		//this.m_draw.setRadialGradient( ( _w >> 1 ), ( _h >> 1 ), 0, ( _w >> 1 ), ( _h >> 1 ), _h, 0 );
		//this.m_draw.drawRect( ( _w >> 1 ), ( _h >> 1 ), _h, 0, Math.PI + (Math.PI * 2) / 2, 0 );
		this.m_draw.drawOutLine(_w, _h, 10, _x, _y, _radius, 10, 10, _tail);
		this.m_draw.drawOtion(2);

		pos_x += _radius * 2;
		pos_y += _radius * 2;
		this.m_draw.setTextAlignment("top", "start");
		var fontwidth = 900;
		var fonsize = 14;
		var fontline = fonsize + (fonsize >> 2);
		this.m_draw.setTextStyle(fontwidth + " " + fonsize + "px Arial");
		this.m_draw.setColor("rgba(255,255,255,1)", 0)
		this.m_draw.setColor("rgba(0,0,0,1)", 1)
		this.m_draw.setLineStyle(2, "butt", "round");

		var str = "지번정보\t\t\t : " + _info["pnu"] + "(" + _info["jibun"] + ")";
		this.m_draw.drawText(str, pos_x, pos_y, 2); pos_y += fontline;

		if (_info["fday"] != null) str = "조사정보\t\t\t : " + _info["sday"] + " ~ " + _info["fday"];
		else str = "조사정보\t\t\t : " + _info["sday"] + " ~ " + _info["eday"];
		this.m_draw.drawText(str, pos_x, pos_y, 2); pos_y += fontline;

		if (_info["researchsub"] != null) str = "조사자\t\t\t\t\t\t : " + _info["researchmain"] + "(" + _info["researchsub"] + ")";
		else str = "조사자\t\t\t\t\t\t : " + _info["researchmain"];
		this.m_draw.drawText(str, pos_x, pos_y, 2); pos_y += fontline;

		str = "조사결과\t\t\t : " + _info["same"];
		this.m_draw.drawText(str, pos_x, pos_y, 2); pos_y += fontline;
		str = "원지목\t\t\t\t\t\t : " + _info["name"];
		this.m_draw.drawText(str, pos_x, pos_y, 2); pos_y += fontline;
		str = "재설정지목 : " + _info["editname"];
		this.m_draw.drawText(str, pos_x, pos_y, 2); pos_y += fontline;
		str = "현실지목\t\t\t : " + _info["realmain"] + "(" + _info["realsub"] + ")";
		this.m_draw.drawText(str, pos_x, pos_y, 2); pos_y += fontline;
		str = "토지용도\t\t\t : " + _info["land"];
		this.m_draw.drawText(str, pos_x, pos_y, 2); pos_y += fontline;
		str = "건물용도\t\t\t : " + _info["build"];
		this.m_draw.drawText(str, pos_x, pos_y, 2); pos_y += fontline;
	}
	setBoard(_w, _h, _text, _tailtype) {
		this.m_draw.clearCanvas();
		this.m_draw.setCanvasSize(_w, _h);
		//전체 검은색 rect 테스트용
		//this.m_draw.setColor("rgba(0,0,0,1)", 0);
		//this.m_draw.drawRect(0, 0, _w, _h, 0);
		// 내부 외부 설정
		this.m_draw.setColor("rgba(255,255,255,0.8)", 0);
		this.m_draw.setColor("rgba(206,206,206,1)", 1);
		this.m_draw.setLineStyle(2, "butt", "round");
		this.m_draw.drawOutLine(_w, _h, 1, 10, 10, 35, 35, 35, _tailtype);

		this.m_draw.drawOtion(2);

		var fontwidth = 900;
		var fonsize = 30;
		var fontline = fonsize + (fonsize >> 2);
		this.m_draw.setTextStyle(fontwidth + " " + fonsize + "px Arial");
		this.m_draw.setColor("rgba(255,255,255,1)", 0)
		this.m_draw.setColor("rgba(0,0,0,1)", 1)
		this.m_draw.setTextAlignment("middle", "center");

		this.m_draw.drawText(_text, (_w >> 1), (_h >> 1) - (35 >> 1), 1);
	}
	setinfoBoard(_w, _h, _text) {
		this.m_draw.clearCanvas();
		this.m_draw.setCanvasSize(_w, _h);
		//전체 검은색 rect 테스트용
		//CETC.setColor( "rgba(0,0,0,1)", 0 );
		//CRECT.draw( 0, 0, _w, _h, 0 );		
		// 내부 외부 설정
		this.m_draw.setColor("rgba(255,255,255,0.8)", 0);
		this.m_draw.setColor("rgba(206,206,206,1)", 1);
		this.m_draw.drawOutLine(_w, _h, 1, 10, 10, 5, _h / 3, 10, 1);

		this.m_draw.drawOtion(2);

		this.m_draw.setTextStyle("700 20px Arial");
		this.m_draw.setTextAlignment("middle", "center");
		this.m_draw.setColor("rgba(0,0,0,1)", 0);
		this.m_draw.drawText(_text, (_w >> 1), _h / 3, 0);
	}
	setjigaPOI(_w, _h, _imgnum, _jibun, _prise, _linewidth, _fontcolor) {
		this.m_draw.clearCanvas();
		this.m_draw.setCanvasSize(_w, _h);
		this.m_draw.drawImage(_imgnum, 0, 0, 1);

		var prise = parseFloat(_prise / 10000);
		var fcolor = "rgba(" + _fontcolor["fill_color_r"] + "," + _fontcolor["fill_color_g"] + "," + _fontcolor["fill_color_b"] + "," + parseFloat(_fontcolor["fill_color_a"] / 255.0) + ")";
		var scolor = "rgba(" + _fontcolor["stroke_color_r"] + "," + _fontcolor["stroke_color_g"] + "," + _fontcolor["stroke_color_b"] + "," + parseFloat(_fontcolor["stroke_color_a"] / 255.0) + ")";

		prise = prise.toPrecision(3);

		this.m_draw.setTextStyle("bold 12px 맑은 고딕");
		this.m_draw.setTextAlignment("middle", "center");

		this.m_draw.setColor(scolor, 1);
		this.m_draw.setColor(fcolor, 0);
		this.m_draw.setLineStyle(_linewidth, "butt", "round");		// 외각선 
		this.m_draw.drawText(_jibun, 40, 32, 2);

		this.m_draw.setTextStyle("bold 15px 맑은 고딕");
		this.m_draw.drawText(prise + "천", 40, 55, 2);
	}
	setViewinfoBoard(_info) {
		var lineCount = 0,
			fontwidth, fontsize,
			width, height, hheight;

		for (var key in _info) lineCount++;

		fontwidth = 1000;
		fontsize = 20;

		width = 200;
		hheight = height = 28 * (lineCount + 1);
		height *= 1.5;

		this.m_draw.clearCanvas();
		this.m_draw.setCanvasSize(width, height);

		//배경 색상
		//this.m_draw.setColor("rgba(0,0,0,0.1)", 0);
		//this.m_draw.setColor("rgba(0,0,0,0.1)", 1);
		//this.m_draw.drawRect(0, 0, width, height, 2);

		this.m_draw.setColor("rgba(128,128,128,0.3)", 0);
		this.m_draw.setColor("rgba(255,255,255,0.3)", 1);
		this.m_draw.drawOutLine(width, hheight, 2, 5, 5, 5, 0, 5, 0);
		this.m_draw.drawOtion(2);

		this.m_draw.setTextAlignment("top", "start");
		this.m_draw.setTextStyle(fontwidth + " " + fontsize + "px  맑은 고딕");
		this.m_draw.setLineStyle(2, "butt", "round");

		this.m_draw.setColor("rgba(5,125,70,1)", 0);
		this.m_draw.setColor("rgba(0,40,10,1)", 1);
		lineCount = 0
		for (var key in _info) {
			this.m_draw.drawText(key, 15, 15 + (30 * lineCount), 2);
			lineCount++;
		}

		this.m_draw.setColor("rgba(255,124,0,1)", 0);
		this.m_draw.setColor("rgba(118,87,49,1)", 1);
		lineCount = 0

		for (var key in _info) {
			this.m_draw.drawText(_info[key], 115, 10 + (30 * lineCount), 2);
			lineCount++;
		}
		width = width >> 1;

		this.m_draw.setColor("rgba(128,128,128,0.3)", 0);
		this.m_draw.setColor("rgba(255,255,255,0.3)", 1);
		this.m_draw.drawLine(width, hheight - 6, width, height-20, 2);;
		this.m_draw.drawCircle(width, height - 16, 5, 0, (Math.PI / 180) * 360, false, 2);
	}

	setViewAreaBoard(_info, _callbackStr, _callbackColor) {
		console.log(_info);

		var lineCount = 0,
			str, color,
			fontwidth, fontsize,
			width, height,
			bx, by, maxTextLen, nowTextLen;

		for (var key in _info) lineCount++;

		fontwidth = 1000;
		fontsize = 13;

		width = 250;
		height = 20 + (lineCount * (fontsize + (fontsize >> 1)));

		this.m_draw.clearCanvas();
		this.m_draw.setCanvasSize(width, height);

		// 박스 출력
		bx = 5;
		lineCount = 0;
		for (var key in _info) {
			color = _callbackColor(key);
			this.m_draw.setColor("rgba(" + color.r + "," + color.g + "," + color.b + ",1)", 0);
			this.m_draw.setColor("rgba(255,255,255,1)", 1);

			by = 5 + (lineCount * (fontsize + (fontsize >> 1)));
			this.m_draw.drawRect(bx, by, fontsize, fontsize, 2);
			lineCount++;
		}
		// 폰트 처리 항목
		this.m_draw.setTextAlignment("top", "start");
		this.m_draw.setTextStyle(fontwidth + " " + fontsize + "px  맑은 고딕");
		this.m_draw.setLineStyle(2, "butt", "round");
		this.m_draw.setColor("rgba(0,0,0,1)", 0);
		this.m_draw.setColor("rgba(255,255,255,1)", 1);
		bx = 10 + fontsize;
		maxTextLen = lineCount = 0;
		for (var key in _info) {
			str = _callbackStr(key);
			by = 7 + (lineCount * (fontsize + (fontsize >> 1)));
			this.m_draw.drawText(str, bx, by, 2);
			nowTextLen = this.m_draw.getTextLength(str);
			if (maxTextLen < nowTextLen.width) maxTextLen = nowTextLen.width;
			lineCount++;
		}
		// 폰트 처리 갯수
		bx = 20 + fontsize + maxTextLen;
		lineCount = 0;
		for (var key in _info) {
			str = " : " + _info[key];
			by = 7 + (lineCount * (fontsize + (fontsize >> 1)));
			this.m_draw.drawText(str, bx, by, 2);
			lineCount++;
		}
	}

	setViewJigaBoard(_info, _callbackColor) {
		var lineCount = 0,
			color, prise,
			fontwidth, linesize,
			width, height,
			bx, by;

		fontwidth = 700;
		linesize = 20;
		lineCount = 17;

		width = 25;
		height = linesize + (lineCount * linesize);

		this.m_draw.clearCanvas();
		this.m_draw.setCanvasSize(width, height);

		bx = 5;
		lineCount = 0;

		for (var i = 0; i < 18; i++) {
			prise = 40000 * (i + 1);
			if (i == 0) color = { "r": 0, "g": 0, "b": 0 };
			// else color = _callbackColor(prise);
			// this.m_draw.setColor("rgba(" + color.r + "," + color.g + "," + color.b + ",1)", 0);
			// this.m_draw.setColor("rgba(255,255,255,1)", 1);
			by = i * linesize;
			// this.m_draw.drawRect(bx, by, linesize, linesize, 2);
			lineCount++;
		}

		// this.m_draw.setColor("rgba(255,255,255,1)", 0);
		// this.m_draw.setColor("rgba(255,255,255,1)", 1);
		// this.m_draw.setTextAlignment("middle", "center");
		// this.m_draw.setTextStyle(fontwidth + " " + 10 + "px Arial");

		bx = 5 + (linesize >> 1);
		by = (linesize >> 1);

		// this.m_draw.drawText("만원", bx, by, 0);

		for (var i = 0; i < 17; i++) {
			prise = 40000 * (i + 1);
			prise /= 10000;
			if (i == 0) prise = "~" + prise;
			if (i == 16) prise = prise + "~";
			by = (i + 1) * linesize + (linesize >> 1);
			$('.legend-box .legend-range .range').eq(i).html(prise);
			// this.m_draw.drawText(prise, bx, by, 0);
		}
	}

	
	setGridLine(_xindex, _yindex, _mode) {
		var i = 0;
		var width, height;
		var size = this.m_draw.getSize();
		width = size.width;
		height = size.height;
		this.m_gridX = width / _xindex;
		this.m_gridY = height / _yindex;
		for (i = 0; i < _xindex - 1; i++) {
			this.m_draw.drawLine(
				this.m_gridX + (i * this.m_gridX),
				0,
				this.m_gridX + (i * this.m_gridX),
				height,
				_mode
			);
		}
		for (i = 0; i < _yindex - 1; i++) {
			this.m_draw.drawLine(
				0,
				this.m_gridY + (i * this.m_gridY),
				width,
				this.m_gridY + (i * this.m_gridY),
				_mode
			);
		}
	}
	setGridRect(_indexX, _indexY) {

		var w, h;
		var height;

		var size = this.m_draw.getSize();
		height = size.height;

		w = this.m_gridX * _indexX;
		h = height - this.m_gridY * _indexY;
		this.m_draw.drawRect(w, h, this.m_gridX, this.m_gridY, 0);
	}
}
var tImage = new TImage(tcanvas);