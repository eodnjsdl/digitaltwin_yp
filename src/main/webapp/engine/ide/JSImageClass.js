var IMAGE = {
	clear : function( _w, _h )
	{
		CINIT.clearCanvas();
		CINIT.setCanvasSize( _w, _h );
	},
	outLine : function( _w, _h, _linewidth, _pos_x, _pos_y, _radius, _pointheight, _pointtype )
	{
		let centerx, centery;
		centerx =  _w >> 1;
		centery =  _h >> 1;


		_w -= ( ( _radius << 1 ) + (_pos_x << 1) );
		_h -= ( ( _radius << 1 ) + (_pos_y << 1) );

		_pos_x += ( _linewidth >> 1 );;
		_pos_y += ( _linewidth >> 1 );;
		_w -=  _linewidth;
		_h -= _linewidth;

		CLINE.setStyle( _linewidth, "butt", "round" );
		//시작
		_pos_x = _pos_x + _radius;
		CCANVAS.CONTEXT.beginPath( );
		CCANVAS.CONTEXT.moveTo( _pos_x, _pos_y );		_pos_x = _pos_x + ( _w  );
		CCANVAS.CONTEXT.lineTo( _pos_x, _pos_y );
		// 모서리_우상단
		let pos = CLINE.drawCurve( _pos_x, _pos_y, _radius, 0 );
		_pos_x = pos[2];

		if( _pointtype == 0 ) 			_pos_y = pos[3] + _h ;														// 일반
		else if( _pointtype == 1 )		_pos_y = pos[3] + ( _h - _radius - _pointheight - ( _linewidth >> 1 ) );	// 뽀족
		// 모서리_우하단
		CCANVAS.CONTEXT.lineTo( _pos_x, _pos_y );
		pos = CLINE.drawCurve( _pos_x, _pos_y, _radius, 1 );

		_pos_x = pos[2] ;
		_pos_y = pos[3];

		if( _pointtype == 0 ) {
			CCANVAS.CONTEXT.lineTo( _pos_x, _pos_y);
			CCANVAS.CONTEXT.lineTo( pos[2] - _w, _pos_y );

		} else if( _pointtype == 1 ) {
			//if( _pointheight < 30)	_pointheight = 30;

			CCANVAS.CONTEXT.lineTo( _pos_x, _pos_y);
			CCANVAS.CONTEXT.lineTo( centerx + ( _pointheight >> 2 ) + ( _linewidth >> 1 ), _pos_y );
			CCANVAS.CONTEXT.lineTo( centerx, _pos_y + _radius + _pointheight + ( _linewidth >> 1 ) );
			CCANVAS.CONTEXT.lineTo( centerx - ( _pointheight >> 2 ) - ( _linewidth >> 1 ), _pos_y );
			CCANVAS.CONTEXT.lineTo( pos[2] - _w , _pos_y );
		}
		// 모서리_좌하단
		_pos_x = pos[2] - _w ;
		_pos_y = pos[3];
		DRAW.CANVAS.CONTEXT.lineTo( _pos_x, _pos_y );
		pos = CLINE.drawCurve( _pos_x, _pos_y, _radius, 2 );
		// 모서리_좌상단
		_pos_x = pos[2];
		_pos_y = pos[3] - _h;

		if( _pointtype == 0 ) 			_pos_y = pos[3] - _h;														// 일반
		else if( _pointtype == 1 )		_pos_y = pos[3] - ( _h - _radius - _pointheight - ( _linewidth >> 1 ) );	// 뽀족

		CCANVAS.CONTEXT.lineTo( _pos_x, _pos_y );
		pos = CLINE.drawCurve( _pos_x, _pos_y, _radius, 3 );
	},
	YANGPYEONG : {
		BILLBOARD : {
			setjimokBoard : function( _w, _h, _x, _y, _radius, _info )
			{
				IMAGE.clear( _w, _h );
				//전체 검은색 rect 테스트용
				//CETC.setColor( "rgba(0,0,0,1)", 0 );
				//CRECT.draw( 0, 0, _w, _h, 0 );
				let pos_x, pos_y;
				pos_x = _x;
				pos_y = _y;
				CETC.setShadow( 5, "rgba(255,255,255,1)" );
				// 그라데이션 적용
				let color = [
									{ "index" : 0.6, 	"color" : "rgba(148, 250, 254, 1)" },
									{ "index" : 0.8, 	"color" : "rgba(142, 230, 230, 1)" },
									{ "index" : 1, 		"color" : "rgba(146, 224, 210, 1)" },
							];

				CETC.initColorMap();
				for( key in color )
					CETC.setColorMap( color[key].index, color[key].color );

				CETC.setColor( "rgba(255,255,255,0.7)", 0 )
				CETC.setRadialGradient( ( _w >> 1 ), ( _h >> 1 ), 0, ( _w >> 1 ), ( _h >> 1 ), _h, 1 );
				// 테스트 그라데이션
				//CETC.setRadialGradient( ( _w >> 1 ), ( _h >> 1 ), 0, ( _w >> 1 ), ( _h >> 1 ), _h, 0 );
				//CCIRCLE.draw( ( _w >> 1 ), ( _h >> 1 ), _h, 0, Math.PI + (Math.PI * 2) / 2, 0 );
				IMAGE.outLine( _w, _h, 10, _x, _y, _radius, 10, 1 );
				CETC.drawOtion( 2 );

				pos_x += _radius*2;
				pos_y += _radius*2;
				CTEXT.setAlignment( "top", "start" );

				let fontwidth = 900;
				let fonsize = 14;
				let fontline = fonsize + (fonsize >> 2);

				CTEXT.setStyle( fontwidth+" "+ fonsize +"px Arial" );
				CETC.setColor( "rgba(255,255,255,1)", 0 )
				CETC.setColor( "rgba(0,0,0,1)", 1 )
				CLINE.setStyle( 2, "butt", "round" );

				let str = "지번정보\t\t\t : " + _info["pnu"] + "(" + _info["jibun"] + ")";
				CTEXT.draw( str, pos_x, pos_y, 2 );		pos_y += fontline;

				if(_info["fday"] != null)			str = "조사정보\t\t\t : " + _info["sday"] + " ~ " + _info["fday"];
				else 								str = "조사정보\t\t\t : " + _info["sday"] + " ~ " + _info["eday"];
				CTEXT.draw( str, pos_x, pos_y, 2 );		pos_y += fontline;


				if(_info["researchsub"] != null)	str = "조사자\t\t\t\t\t\t : " + _info["researchmain"] + "(" + _info["researchsub"] + ")";
				else								str = "조사자\t\t\t\t\t\t : " + _info["researchmain"];
				CTEXT.draw( str, pos_x, pos_y, 2 );		pos_y += fontline;

				str = "조사결과\t\t\t : " + _info["same"];
				CTEXT.draw( str, pos_x, pos_y, 2 );		pos_y += fontline;

				str = "원지목\t\t\t\t\t\t : " + _info["name"];
				CTEXT.draw( str, pos_x, pos_y, 2 );		pos_y += fontline;

				str = "재설정지목 : " + _info["editname"];
				CTEXT.draw( str, pos_x, pos_y, 2 );		pos_y += fontline;

				str = "현실지목\t\t\t : " + _info["realmain"] + "(" + _info["realsub"] + ")";
				CTEXT.draw( str, pos_x, pos_y, 2 );		pos_y += fontline;

				str = "토지용도\t\t\t : " + _info["land"];
				CTEXT.draw( str, pos_x, pos_y, 2 );		pos_y += fontline;

				str = "건물용도\t\t\t : " + _info["build"];
				CTEXT.draw( str, pos_x, pos_y, 2 );		pos_y += fontline;
			},
			setinfoBoard : function( _w, _h, _text )
			{
				DRAW.CANVAS.INIT.clearCanvas();
				DRAW.CANVAS.INIT.setCanvasSize( _w, _h );

				//전체 검은색 rect 테스트용
				//CETC.setColor( "rgba(0,0,0,1)", 0 );
				//CRECT.draw( 0, 0, _w, _h, 0 );

				// 내부 외부 설정
				CETC.setColor( "rgba(255,255,255,0.8)", 0 );
				CETC.setColor( "rgba(206,206,206,1)", 1 );
				IMAGE.outLine( _w, _h, 1, 10, 10, 5, _h/3, 1 );
				CETC.drawOtion( 2 );

				CTEXT.setStyle( "700 20px Arial" );
				CTEXT.setAlignment( "middle", "center");
				CETC.setColor( "rgba(0,0,0,1)", 0 );
				CTEXT.draw( _text, ( _w >> 1 ), _h/3, 0 );
			}
		},
		POI : {
			setjigaPOI : function ( _w, _h, _imgnum, _jibun, _prise, _linewidth, _fontcolor )
			{
				CINIT.clearCanvas();
				CINIT.setCanvasSize( _w, _h );
				CIMAGE.draw( _imgnum, 0, 0, 1 );		// 아파트 아이콘

				let prise = parseFloat(_prise/10000);
				let fcolor = "rgba(" + _fontcolor["fill_color_r"] + "," + _fontcolor["fill_color_g"] + "," + _fontcolor["fill_color_b"] + "," + parseFloat( _fontcolor["fill_color_a"]/255.0 ) + ")";
				let scolor = "rgba(" + _fontcolor["stroke_color_r"] + "," + _fontcolor["stroke_color_g"] + "," + _fontcolor["stroke_color_b"] + "," + parseFloat( _fontcolor["stroke_color_a"]/255.0 ) + ")";

				prise = prise.toPrecision(3);

				CTEXT.setStyle( "bold 12px 맑은 고딕" );
				CTEXT.setAlignment( "middle", "center" );

				CETC.setColor( scolor, 1 );
				CETC.setColor( fcolor, 0 );
				CLINE.setStyle( _linewidth, "butt", "round" );		// 외각선
				CTEXT.draw( _jibun, 40, 32, 2);

				CTEXT.setStyle( "bold 15px 맑은 고딕" );
				CTEXT.draw( prise+"천", 40, 55, 2);
			}
		},
	},
}
var IYYBILL = IMAGE.YANGPYEONG.BILLBOARD;
var IYYPOI = IMAGE.YANGPYEONG.POI;
