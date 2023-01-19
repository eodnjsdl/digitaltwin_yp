class TCanvas {
	constructor() {
		this.m_canvasID = null;
		this.m_canvas = null;
		this.m_ctx = null;
		this.m_imaList = [];
		this.m_colorMap = [];
	}
	// 초기화 
	clearCanvas() {
		if (this.m_ctx == null) return;
		this.clearContextRect(0, 0, this.m_canvas.width, this.m_canvas.height);
		this.m_canvas.width = this.m_ctx.width = 0;
		this.m_canvas.height = this.m_ctx.height = 0;
	}
	clearContextRect(..._args) {
		this.m_ctx.clearRect(_args[0], _args[1], _args[2], _args[3]);
	}
	clearImgList() {
		this.m_imaList = null;
		this.m_imaList = [];
	}
	clearColorMap() {
		this.m_colorMap = null;
		this.m_colorMap = [];
	}
	clearCanvasElement() {
		var item = document.getElementById(this.m_canvasID);
		document.body.removeChild(item);
	}
	// 생성
	createCanvas(_id) {
		var canvas = document.getElementById(_id);
		if (canvas != null) {
			// 기존에 있는 캔버스와 연결
			this.m_canvasID = canvas.id;
			this.setCanvas(canvas);
			return 1;
		}
		// 기존 캔버스가 없다면 생성
		canvas = document.createElement("canvas");
		// 캔버스 생성할 수 없거나 문제가 발생하면 -1 반환
		if (typeof canvas == 'undefined' || canvas == null) return -1;
		this.m_canvasID = _id;
		this.setCanvas(canvas);
		return 2;
	}
	createImageData(_width, _height) {
		return this.m_ctx.createImageData(_width, _height);
	}
	// 그리기
	drawLine(_ix, _iy, _ax, _ay, _mode) {
		this.m_ctx.beginPath();
		this.m_ctx.moveTo(_ix, _iy);
		this.m_ctx.lineTo(_ax, _ay);
		this.drawOtion(_mode);
	}
	drawCurve(_x, _y, _radius, _mode) {
		var array = new Array();
		//배열 초기화
		for (var i = 0; i < 4; ++i)		array[i] = 0;
		if (_mode == 0) {
			array[0] = _x + _radius;
			array[1] = _y; // 기준점
			array[2] = array[0];
			array[3] = array[1] + _radius; // 마지막 끝점
		} else if (_mode == 1) {
			array[0] = _x;
			array[1] = _y + _radius;
			array[2] = array[0] - _radius;
			array[3] = array[1];
		} else if (_mode == 2) {
			array[0] = _x - _radius;
			array[1] = _y;
			array[2] = array[0];
			array[3] = array[1] - _radius;
		} else if (_mode == 3) {
			array[0] = _x;
			array[1] = _y - _radius;
			array[2] = array[0] + _radius;
			array[3] = array[1];
		}
		this.m_ctx.quadraticCurveTo(array[0], array[1], array[2], array[3]);
		return array
	}
	drawRect(_x, _y, _width, _height, _mode) {
		if (_mode == 0) this.m_ctx.fillRect(_x, _y, _width, _height);
		else if (_mode == 1) this.m_ctx.strokeRect(_x, _y, _width, _height);
		else {
			this.m_ctx.fillRect(_x, _y, _width, _height);
			this.m_ctx.strokeRect(_x, _y, _width, _height);
		}
	}
	drawCircle(_x, _y, _radius, _startAngle, _endAngle, _drawvector, _mode) {
		this.m_ctx.beginPath();
		this.m_ctx.arc(_x, _y, _radius, _startAngle, _endAngle, _drawvector);
		this.m_ctx.closePath();
		this.drawOtion(_mode);
	}
	drawText(_text, _x, _y, _mode) {
		if (_mode == 0) this.m_ctx.fillText(_text, _x, _y);
		else if (_mode == 1) this.m_ctx.strokeText(_text, _x, _y);
		else {
			this.m_ctx.strokeText(_text, _x, _y);
			this.m_ctx.fillText(_text, _x, _y);
		}
	}
	drawImage(_num, _x, _y, _mode) {
		var img = this.m_imaList[_num];
		if (_mode == 0) {
			this.clearCanvas();
			this.setCanvasSize(img.width, img.height);
		}
		this.m_ctx.drawImage(img, _x, _y);
	}
	drawArrow(_cx, _cy, _bx, _by, _width, _height, _mode) {
		var half_width = _width >> 1;
		var half_height = _height >> 1;
		var wing_len = (_width >> 2) - (_bx >> 2);
		this.m_ctx.beginPath();
		this.m_ctx.moveTo(_cx, _cy - half_height + _by);
		this.m_ctx.lineTo(_cx - half_width + _bx, _cy);
		this.m_ctx.lineTo(_cx - half_width + wing_len + _bx, _cy);
		this.m_ctx.lineTo(_cx - half_width + wing_len + _bx, _cy + half_height - _by);
		this.m_ctx.lineTo(_cx + half_width - wing_len - _bx, _cy + half_height - _by);
		this.m_ctx.lineTo(_cx + half_width - wing_len - _bx, _cy);
		this.m_ctx.lineTo(_cx + half_width - _bx, _cy);
		this.m_ctx.lineTo(_cx, _cy - half_height + _by);
		this.drawOtion(_mode);
	}
	drawOutLine(..._args) {
		var centerx, centery,
			w, h, lineWidth,
			pos_x, pos_y,
			radius, pointHeight, pointWidth,
			pointType;

		w = _args[0];
		h = _args[1];
		lineWidth = _args[2];
		pos_x = _args[3];
		pos_y = _args[4];
		radius = _args[5];
		pointHeight = _args[6];
		pointWidth = _args[7];
		pointType = _args[8];

		centerx = w >> 1;
		centery = h >> 1;

		w -= ((radius << 1) + (pos_x << 1));
		h -= ((radius << 1) + (pos_y << 1));

		pos_x += (lineWidth >> 1);;
		pos_y += (lineWidth >> 1);;
		w -= lineWidth;
		h -= lineWidth;

		this.setLineStyle(lineWidth, "butt", "round");
		//시작
		pos_x = pos_x + radius;
		this.m_ctx.beginPath();
		this.m_ctx.moveTo(pos_x, pos_y); pos_x = pos_x + (w);
		this.m_ctx.lineTo(pos_x, pos_y);
		// 모서리_우상단
		var pos = this.drawCurve(pos_x, pos_y, radius, 0);
		pos_x = pos[2];

		if (pointType == 0) pos_y = pos[3] + h;			// 일반
		else pos_y = pos[3] + (h - pointHeight);		// 뽀족		
		// 모서리_우하단
		this.m_ctx.lineTo(pos_x, pos_y);
		pos = this.drawCurve(pos_x, pos_y, radius, 1);

		pos_x = pos[2];
		pos_y = pos[3];

		this.drawOutLineTail(pointType, pos_x, pos_y, w, centerx, pointHeight, pointWidth, pos[2]);
		// 모서리_좌하단
		pos_x = pos[2] - w;
		pos_y = pos[3];
		this.m_ctx.lineTo(pos_x, pos_y);
		pos = this.drawCurve(pos_x, pos_y, radius, 2);
		// 모서리_좌상단
		pos_x = pos[2];
		pos_y = pos[3] - h;

		if (pointType == 0) pos_y = pos[3] - h;		// 일반
		else pos_y = pos[3] - (h - pointHeight);	// 뽀족

		this.m_ctx.lineTo(pos_x, pos_y);
		pos = this.drawCurve(pos_x, pos_y, radius, 3);
	}
	drawOutLineTail(_type, _x, _y, _w, _centerx, _height, _width, _pos) {

		this.m_ctx.lineTo(_x, _y);// 우하단 커브 마지막
		if (_type == 1) {
			this.m_ctx.lineTo(_centerx + (_height >> 2) + (_width >> 1), _y);
			this.m_ctx.lineTo(_centerx, _y + _height);
			this.m_ctx.lineTo(_centerx - (_height >> 2) - (_width >> 1), _y);
		} else if (_type == 2) {
			//svar 
			this.m_ctx.lineTo((_centerx >> 1) + (_height >> 2) + (_width >> 1), _y);
			this.m_ctx.lineTo((_centerx >> 1), _y + _height);
			this.m_ctx.lineTo((_centerx >> 1) - (_height >> 2) - (_width >> 1), _y);
		}
		this.m_ctx.lineTo(_pos - _w, _y);//  좌하단 커브 시작

	}
	drawOtion(_mode) {
		if (_mode == 0) this.m_ctx.fill();
		else if (_mode == 1) this.m_ctx.stroke();
		else {
			this.m_ctx.fill();
			this.m_ctx.stroke();
		}
	}
	// 설정
	setCanvas(_canvas) {
		this.m_canvas = _canvas;
		this.m_canvas.id = this.m_canvasID;
		this.m_ctx = this.m_canvas.getContext("2d");
		//console.log(this.m_canvasID);
		//console.log(this.m_canvas.id);
	}
	setCanvasSize(_width, _height) {
		this.m_canvas.width = this.m_ctx.width = _width;
		this.m_canvas.height = this.m_ctx.height = _height;
	}
	setLineStyle(_linewidth, _cap, _jone) {
		this.m_ctx.lineWidth = _linewidth;
		this.m_ctx.lineCap = _cap;
		this.m_ctx.lineJoin = _jone;
	}
	setTextStyle(_fonttype) {
		this.m_ctx.font = _fonttype;
	}
	// 참조 textBaseline	https://www.w3schools.com/tags/canvas_textbaseline.asp
	// 참조 textAlign		https://www.w3schools.com/tags/canvas_textalign.asp
	setTextAlignment(_base, _Align) {
		this.m_ctx.textBaseline = _base;
		this.m_ctx.textAlign = _Align;
	}
	setShadow(_linewidth, _color) {
		this.m_ctx.shadowBlur = _linewidth;
		this.m_ctx.shadowColor = _color;
	}
	setSave() {
		this.m_ctx.save();
	}
	setRestore() {
		this.m_ctx.restore();
	}
	setTranslate(_x, _y) {
		this.m_ctx.translate(_x, _y);
	}
	setRotate(_angle) {
		var radians = _angle * (Math.PI / 180);
		this.m_ctx.rotate(radians);
	}
	setColor(_color, _mode) {
		if (_mode == 0) this.m_ctx.fillStyle = _color;
		else if (_mode == 1) this.m_ctx.strokeStyle = _color;
		else {
			this.m_ctx.fillStyle = _color;
			this.m_ctx.strokeStyle = _color;
		}
	}
	setRadialGradient(_ix, _iy, _iradius, _ax, _ay, _aradius, _mode) {
		var lingrad = this.m_ctx.createRadialGradient(_ix, _iy, _iradius, _ax, _ay, _aradius);

		for (var key of this.m_colorMap) {
			lingrad.addColorStop(key.index, key.color);
		}
		this.setColor(lingrad, _mode);
	}
	setJSONColor(_fr, _fg, _fb, _fa, _sr, _sg, _sb, _sa) {
		if (_fr == null) _fr = 255;
		if (_fg == null) _fg = 255;
		if (_fb == null) _fb = 255;
		if (_fa == null) _fa = 255;
		if (_sr == null) _sr = 0;
		if (_sg == null) _sg = 0;
		if (_sb == null) _sb = 0;
		if (_sa == null) _sa = 255;

		var reusult_font_color = {
			"fill_color_r": _fr,
			"fill_color_g": _fg,
			"fill_color_b": _fb,
			"fill_color_a": _fa,
			"stroke_color_r": _sr,
			"stroke_color_g": _sg,
			"stroke_color_b": _sb,
			"stroke_color_a": _sa
		};
		return reusult_font_color;
	}
	setVisible(_canvas, _mode) {
		var item = document.getElementById(_canvas);
		if (typeof item == 'undefined' && item == null)
			console.log(" setVisible getElementById error");
		if (_mode == true) item.style.display = "block";
		else item.style.display = "none";
	}
	setZindex(_index) {
		var canvasRect = Module.canvas.getBoundingClientRect();

		tcanvas.clearCanvas();
		tcanvas.setCanvasSize(canvasRect.width, canvasRect.height);

		//console.log(canvasRect);
		//console.log(this.m_canvas.id);
		this.m_canvas.style.position = "fixed";
		this.m_canvas.style.left = canvasRect.left + "px";
		this.m_canvas.style.top = canvasRect.top + "px";
		this.m_canvas.style.zIndex = _index;


		if (document.getElementById(this.m_canvasID)) return;
		console.log("setZindex");
		document.body.appendChild(this.m_canvas);
	}
	getTextLength(_text) {
		return this.m_ctx.measureText(_text);
	}
	getSize() {
		var reusult_Cnavas_size = {
			"width": this.m_ctx.width,
			"height": this.m_ctx.height,
		};
		return reusult_Cnavas_size;
	}
	getData() {
		return this.m_ctx.getImageData(0, 0, this.m_ctx.width, this.m_ctx.height).data;
	}
	getImageCount() {
		return this.IMAGE_LIST.length;
	}
	insertImage(_num, _imgSrc, _type) {
		this.m_imaList[_num] = null;
		this.m_imaList[_num] = new Image;
		this.m_imaList[_num].src = _imgSrc;
	}
	insertColorMap(_index, _color) {
		var item = { "index": _index, "color": _color };
		this.m_colorMap.push(item);
	}
	insertCanvasImageData(_indata, _x, _y) {
		this.m_ctx.putImageData(_indata, _x, _y);
	}
	saveCanvasImage(_filename) {
		if (this.m_canvas.width == 0 || this.m_canvas.height == 0) {
			console.log("size null");
			return;
		}
		var link = document.createElement('a');
		link.download = _filename;
		link.href = this.m_canvas.toDataURL();
		link.click();
	}
}
var tcanvas = new TCanvas();