// CAVAS 기능별 검색어
// - INIT - , - LINE -, - RECT -, - CIRCLE -, - TEXT -, - IMAGE -, - Etc -

var DRAW = {
	CANVAS : {
		CANVAS_MAIN: null,
		CONTEXT: null,
		INIT : {
			clearRect : function( _ix, iy, _ax, _ay ) {
				DRAW.CANVAS.CONTEXT.clearRect( _ix, iy, _ax, _ay );
			},

			clearCanvas : function( ) {
				// CONTEXT가 NULL이면 이전에 데이터가 없다
				if(DRAW.CANVAS.CONTEXT == null) return;

				DRAW.CANVAS.CONTEXT.clearRect( 0, 0, DRAW.CANVAS.CANVAS_MAIN.width, DRAW.CANVAS.CANVAS_MAIN.height );
				DRAW.CANVAS.CANVAS_MAIN.width	= DRAW.CANVAS.CONTEXT.width	= 0;
				DRAW.CANVAS.CANVAS_MAIN.height	= DRAW.CANVAS.CONTEXT.height	= 0;
			},

			createCanvas : function( _name ) {
				var canvas = document.getElementById( _name );

				if( canvas != null ) {
					// 기존에 있는 캔버스와 연결
					DRAW.CANVAS.INIT.setCanvas( canvas );
					return 1;
				}
				// 기존 캔버스가 없다면 생성
				canvas = document.createElement("canvas");
				canvas.id = _name;

				// 캔버스 생성할 수 없거나 문제가 발생하면 -1 반환
				if( typeof canvas == 'undefined' || canvas == null )	return -1;
				DRAW.CANVAS.INIT.setCanvas( canvas );
				return 2;
			},

			setCanvasSize : function( _width, _height ) {
				DRAW.CANVAS.CANVAS_MAIN.width	= DRAW.CANVAS.CONTEXT.width		= _width;
				DRAW.CANVAS.CANVAS_MAIN.height	= DRAW.CANVAS.CONTEXT.height	= _height;
			},

			setCanvas : function( _canvas ) {
				DRAW.CANVAS.CANVAS_MAIN = _canvas;
				DRAW.CANVAS.CONTEXT = _canvas.getContext( "2d" );
			},
			getCanvas : function( )
			{
				return DRAW.CANVAS.CANVAS_MAIN.id;
			},
		},

		LINE : {
			setStyle : function( _linewidth, _cap, _jone )
			{
				DRAW.CANVAS.CONTEXT.lineWidth = _linewidth;
				DRAW.CANVAS.CONTEXT.lineCap = _cap;
				DRAW.CANVAS.CONTEXT.lineJoin = _jone;
			},
			draw : function( _ix, _iy, _ax, _ay, _mode )
			{
				DRAW.CANVAS.CONTEXT.beginPath( );
				DRAW.CANVAS.CONTEXT.moveTo( _ix, _iy );
				DRAW.CANVAS.CONTEXT.lineTo( _ax, _ay );
				DRAW.CANVAS.ETC.drawOtion( _mode );
			},
			drawCurve: function( _x, _y, _radius, _mode ) {
				var array = new Array( );
				//배열 초기화
				for( var i = 0; i < 4; ++i )		array[i] = 0;
				if( _mode == 0 ) {
					array[0] = _x + _radius;
					array[1] = _y; // 기준점
					array[2] = array[0];
					array[3] = array[1] + _radius; // 마지막 끝점
				} else if( _mode == 1 ) {
					array[0] = _x;
					array[1] = _y + _radius;
					array[2] = array[0] - _radius;
					array[3] = array[1];
				} else if( _mode == 2 ) {
					array[0] = _x - _radius;
					array[1] = _y;
					array[2] = array[0];
					array[3] = array[1] - _radius;
				} else if( _mode == 3 ) {
					array[0] = _x;
					array[1] = _y - _radius;
					array[2] = array[0] + _radius;
					array[3] = array[1];
				}
				DRAW.CANVAS.CONTEXT.quadraticCurveTo( array[0], array[1], array[2], array[3] );
				return array
			},
		},
		RECT : {
			draw : function( _x, _y, _width, _height, _mode ) {
				if( _mode == 0 )		DRAW.CANVAS.CONTEXT.fillRect( _x, _y, _width, _height );
				else if( _mode == 1 )	DRAW.CANVAS.CONTEXT.strokeRect( _x, _y, _width, _height );
				else {
					DRAW.CANVAS.CONTEXT.fillRect( _x, _y, _width, _height );
					DRAW.CANVAS.CONTEXT.strokeRect( _x, _y, _width, _height );
				}
			},
		},
		CIRCLE : {
			draw : function( _x, _y, _radius, _startAngle, _endAngle, _drawvector, _mode ) {
				DRAW.CANVAS.CONTEXT.beginPath( );
				DRAW.CANVAS.CONTEXT.arc( _x, _y, _radius, _startAngle, _endAngle, _drawvector );
				DRAW.CANVAS.CONTEXT.closePath( );
				DRAW.CANVAS.ETC.drawOtion( _mode );
			},
		},

		TEXT : {
			setStyle: function( _fonttype ) {
				DRAW.CANVAS.CONTEXT.font = _fonttype;
			},
			setAlignment: function( _base, _Align ) {
				DRAW.CANVAS.CONTEXT.textBaseline = _base;
				DRAW.CANVAS.CONTEXT.textAlign = _Align;
			},
			draw : function( _text, _x, _y, _mode ) {

				if( _mode == 0 )		DRAW.CANVAS.CONTEXT.fillText( _text, _x, _y );
				else if( _mode == 1 )	DRAW.CANVAS.CONTEXT.strokeText( _text, _x, _y );
				else {

					DRAW.CANVAS.CONTEXT.strokeText( _text, _x, _y );
					DRAW.CANVAS.CONTEXT.fillText( _text, _x, _y );
				}
			},
		},
		IMAGE : {
			IMAGE_LIST: [],
			init : function( )
			{
				DRAW.CANVAS.IMAGE.IMAGE_LIST = null;
				DRAW.CANVAS.IMAGE.IMAGE_LIST = [];
			},
			checkOnload : function( _num, _type )
			{
				if( _type == "POI")
					console.log( "load img OK", _num, _type );
			},
			setImage: function( _num, _imgSrc, _type )
			{
				DRAW.CANVAS.IMAGE.IMAGE_LIST[_num] = null;
				DRAW.CANVAS.IMAGE.IMAGE_LIST[_num] = new Image;
				DRAW.CANVAS.IMAGE.IMAGE_LIST[_num].onload = DRAW.CANVAS.IMAGE.checkOnload( _num, _type );
				DRAW.CANVAS.IMAGE.IMAGE_LIST[_num].src = _imgSrc;
			},
			getData: function( )
			{
				return DRAW.CANVAS.CONTEXT.getImageData( 0, 0, DRAW.CANVAS.CONTEXT.width, DRAW.CANVAS.CONTEXT.height ).data;
			},
			getImageCount : function( )
			{
				return DRAW.CANVAS.IMAGE.IMAGE_LIST.length;
			},
			draw : function( _num, _x, _y, _mode )
			{
				var img = DRAW.CANVAS.IMAGE.IMAGE_LIST[_num];
				if( _mode == 0 ) {
					DRAW.CANVAS.INIT.clearCanvas( );
					DRAW.CANVAS.INIT.setCanvasSize( img.width, img.height );
				}
				DRAW.CANVAS.CONTEXT.drawImage( img, _x, _y );
			},
		},
		ETC : {
			COLOR_MAP: [],
			GRID_X: 0,
			GRID_Y: 0,
			initColorMap : function( )
			{
				DRAW.CANVAS.ETC.COLOR_MAP = null;
				DRAW.CANVAS.ETC.COLOR_MAP = [];
			},
			initGrid : function( )
			{
				DRAW.CANVAS.ETC.GRID_X = 0;
				DRAW.CANVAS.ETC.GRID_Y = 0
			},
			setColor : function( _color, _mode ) {
				if( _mode == 0 )			DRAW.CANVAS.CONTEXT.fillStyle = _color;
				else if( _mode == 1 )		DRAW.CANVAS.CONTEXT.strokeStyle = _color;
				else {
					DRAW.CANVAS.CONTEXT.fillStyle = _color;
					DRAW.CANVAS.CONTEXT.strokeStyle = _color;
				}
			},
			setJSONColor : function( _fr, _fg, _fb, _fa, _sr, _sg, _sb, _sa )
			{
				if( _fr == null )			_fr = 255;
				if( _fg == null )			_fg = 255;
				if( _fb == null )			_fb = 255;
				if( _fa == null )			_fa = 255;
				if( _sr == null )			_sr = 0;
				if( _sg == null )			_sg = 0;
				if( _sb == null )			_sb = 0;
				if( _sa == null )			_sa = 255;
				
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
			},
			setColorMap : function( _index, _color )
			{
				var item = { "index" : _index, "color" : _color};
				DRAW.CANVAS.ETC.COLOR_MAP.push( item );
			},
			setShadow : function( _linewidth, _color )
			{
				DRAW.CANVAS.CONTEXT.shadowBlur = _linewidth;
				DRAW.CANVAS.CONTEXT.shadowColor = _color;
			},
			setVisible : function( _canvas, _mode )
			{
				var item = document.getElementById(_canvas);

				if( typeof item == 'undefined' && item == null )
					console.log( " setVisible getElementById error" );

				if( _mode == true )		item.style.display = "block";
				else 					item.style.display = "none";
			},
			setRadialGradient : function( _ix, _iy, _iradius, _ax, _ay, _aradius, _mode )
			{
				var lingrad = DRAW.CANVAS.CONTEXT.createRadialGradient( _ix, _iy, _iradius, _ax, _ay, _aradius );

				for( var key in DRAW.CANVAS.ETC.COLOR_MAP ){
					lingrad.addColorStop( DRAW.CANVAS.ETC.COLOR_MAP[key].index, DRAW.CANVAS.ETC.COLOR_MAP[key].color );
				}

				if( _mode == 0 )	 		DRAW.CANVAS.CONTEXT.fillStyle = lingrad;
				else if( _mode == 1 )		DRAW.CANVAS.CONTEXT.strokeStyle = lingrad;
				else {
					DRAW.CANVAS.CONTEXT.fillStyle = lingrad; 	// 채움 스타일에 그레이디언트를 적용한다
					DRAW.CANVAS.CONTEXT.strokeStyle = lingrad;
				}
			},
			getSize : function( )
			{
				var reusult_Cnavas_size =	{
												"width": DRAW.CANVAS.CONTEXT.width,
												"height": DRAW.CANVAS.CONTEXT.height,
											};
				return reusult_Cnavas_size;
			},
			drawOtion : function( _mode )
			{
				if( _mode == 0 )				DRAW.CANVAS.CONTEXT.fill( );
				else if( _mode == 1 )			DRAW.CANVAS.CONTEXT.stroke( );
				else {
					DRAW.CANVAS.CONTEXT.fill( );
					DRAW.CANVAS.CONTEXT.stroke( );
				}
			},
			drawGrid : function( _xindex, _yindex, _mode )
			{
				var i=0;
				var width, height;

				width = DRAW.CANVAS.CANVAS_MAIN.width;
				height = DRAW.CANVAS.CANVAS_MAIN.height;

				DRAW.CANVAS.ETC.GRID_X = width / _xindex;
				DRAW.CANVAS.ETC.GRID_Y = height / _yindex;

				for( i = 0; i<_xindex-1; i++ ) {

					DRAW.CANVAS.LINE.draw(
											DRAW.CANVAS.ETC.GRID_X +( i * DRAW.CANVAS.ETC.GRID_X ),
											0,
											DRAW.CANVAS.ETC.GRID_X +( i * DRAW.CANVAS.ETC.GRID_X ),
											height,
											_mode
										);
				}

				for( i = 0; i<_yindex-1; i++ ) {
					DRAW.CANVAS.LINE.draw(
											0,
											DRAW.CANVAS.ETC.GRID_Y +( i * DRAW.CANVAS.ETC.GRID_Y ),
											width,
											DRAW.CANVAS.ETC.GRID_Y +( i * DRAW.CANVAS.ETC.GRID_Y ),
											_mode
										);
				}
			},
			drawGridRect : function( _xindex, _yindex )
			{
				var w, h;
				var height;

				height = DRAW.CANVAS.CANVAS_MAIN.height;

				w = DRAW.CANVAS.ETC.GRID_X * _xindex;
				h = height - DRAW.CANVAS.ETC.GRID_Y * _yindex;

				DRAW.CANVAS.RECT.draw( w, h, DRAW.CANVAS.ETC.GRID_X, DRAW.CANVAS.ETC.GRID_Y, 0 );
			},
			// 현재 캔버스 이미지 다운로드 기능
			saveCanvasImage : function( _filename )
			{
				if( DRAW.CANVAS.CANVAS_MAIN.width == 0 || DRAW.CANVAS.CANVAS_MAIN.height == 0 ) {
					console.log( "size null" );
					return;
				}

				link = document.createElement( 'a' );
				link.download = _filename;
				link.href = DRAW.CANVAS.CANVAS_MAIN.toDataURL( )
				link.click( );
			},
		},
	},





// =================================== Z BUFFER를 이용한 기능





	OVERVIEW : {
		CANVAS_OVERVIEW: null,
		CANVAS_MAIN: null,
		OVERVIEWMODE: 0,
		createCanvas : function( _canvas ) {
			var canvas = document.getElementById(_canvas);

			if( canvas != null ) {
				// 기존에 있는 캔버스와 연결
				DRAW.OVERVIEW.setOverViewCanvas( canvas );
				return 1;
			}
			// 기존 캔버스가 없다면 생성
			canvas = document.createElement("canvas");

			// 캔버스 생성할 수 없거나 문제가 발생하면 -1 반환
			if( typeof canvas == 'undefined' || canvas == null )	return -1;
			DRAW.OVERVIEW.setOverViewCanvas( canvas );
			return 2;
		},

		setOverViewCanvas : function( _canvas ) {
			// 기존 캔버스 데이터 삭제
			DRAW.CANVAS.INIT.clearCanvas();
			// 기존 캠버스를 OVERVIEW 캔버스로 저장
			DRAW.OVERVIEW.CANVAS_MAIN = DRAW.CANVAS.INIT.getCanvas();
			DRAW.OVERVIEW.CANVAS_OVERVIEW = _canvas;
			// overview 활성화
			DRAW.OVERVIEW.OVERVIEWMODE = 1;
		},

		setGrid : function( )
		{
			var canvasRect = Module.canvas.getBoundingClientRect();
			DRAW.OVERVIEW.CANVAS_OVERVIEW.style.position	= "fixed";
			DRAW.OVERVIEW.CANVAS_OVERVIEW.style.left		= canvasRect.left+"px";
			DRAW.OVERVIEW.CANVAS_OVERVIEW.style.top			= canvasRect.top+"px";
			DRAW.OVERVIEW.CANVAS_OVERVIEW.style.zIndex		= "99";
			DRAW.OVERVIEW.CANVAS_OVERVIEW.id				= "gridCanvas";
			document.body.appendChild(DRAW.OVERVIEW.CANVAS_OVERVIEW);

			// 캔버스 교체
			DRAW.CANVAS.INIT.setCanvas( DRAW.OVERVIEW.CANVAS_OVERVIEW );
		},

		setOriginalCanvas : function()
		{
			// 기존 캔버스 데이터 삭제
			DRAW.CANVAS.INIT.clearCanvas();
			// OVERVIEW 캔버스 저장
			var canvas = document.getElementById(DRAW.OVERVIEW.CANVAS_MAIN);
			DRAW.CANVAS.INIT.createCanvas( canvas );
		}
	},
}
var CCANVAS = DRAW.CANVAS;
var CINIT = DRAW.CANVAS.INIT;
var CLINE = DRAW.CANVAS.LINE;
var CRECT = DRAW.CANVAS.RECT;
var CCIRCLE = DRAW.CANVAS.CIRCLE;
var CTEXT = DRAW.CANVAS.TEXT;
var CIMAGE = DRAW.CANVAS.IMAGE;
var CETC = DRAW.CANVAS.ETC;