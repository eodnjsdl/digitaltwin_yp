$(document).ready(function(){

	//scroll
	$(".scroll-y").mCustomScrollbar({
		scrollbarPosition:"outside"
	});

	//map 상단 도구툴
	$("#map-aside .tool-btn").click(function(){
		$(this).parent().addClass("active").siblings().removeClass("active");
	});
	
	//map 상단 도구툴 ToolTip
	$("#map-aside .tool-btn").tooltip({
		show: null,						
		tooltipClass: "style1",
		position: {
			my: "center+9 top+3",
			at: "center bottom",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" ).addClass( "arrow" ).appendTo( this );
			}
		},
		show: {
			duration: "fast"
		},
		hide: {
			effect: "hide"
		}
	});	


	//map 상단 게시판
	$("#map-aside .bbs-btn").tooltip({
		show: null,						
		tooltipClass: "style1",
		position: {
			my: "center+17 top+3",
			at: "center bottom",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" ).addClass( "arrow" ).appendTo( this );
			}
		},
		show: {
			duration: "fast"
		},
		hide: {
			effect: "hide"
		}
	});


	// MAP > right Control
	$(".map-control .ctrl-group .ctrl-btn").click(function(){
		$(this).toggleClass("active").siblings().removeClass("active");	
	});


	//map Zoon In, out
	$('.map-zoom-tool').rangeslider({
		polyfill: false,
		onSlide: function(position, value) {
			//$sliderValue.text(value);
		},onSlideEnd: function(position, value) {
			//smap.zoomTo(value);
		}
	});


	// Side > LNB
	$("#lnb li[data-menu]").click(function(){
		$(this).toggleClass("on").siblings().removeClass("on");
		$(".lnb-list").find(".on").removeClass("on");

		if( $("#lnb li[data-menu]").hasClass("on") ){
			$("#side .lnb-cont").stop().fadeOut(100);
			$("."+$(this).data("menu")).stop().fadeIn(100);
		} else {			
			$("#side .lnb-cont").stop().fadeOut(100);
		}
	});

	// Side > LNB ToolTip
	$("#lnb .lnb-btn").tooltip({
		show: null,
		tooltipClass: "style2",
		position: {
			my: "left center",
			at: "right+14 center",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" ).addClass( "arrow" ).appendTo( this );
			}
		},
		show: {
			duration: "fast"
		},
		hide: {
			effect: "hide"
		}
	});

	// Side > LNB depth
	$(".lnb-dep2 button").click(function(){
		$(".lnb-list, .lnb-dep2").find(".on").removeClass("on");
		$(this).parent().addClass("on");		
	});


	// Side > util
	$(".side-util li").click(function(){
		$(this).toggleClass("on").siblings().removeClass("on");

		if( $(".side-util li[data-menu]").hasClass("on") ){
			$("#side .lnb-cont").stop().fadeOut(100);
			$("."+$(this).data("menu")).stop().fadeIn(100);
		} else {			
			$("#side .lnb-cont").stop().fadeOut(100);
		}
	});


	// Side > util toolTip
	$("#side .side-btn").tooltip({
		show: null,
		tooltipClass: "style3",
		position: {
			my: "left center",
			at: "right+10 center",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" ).addClass( "arrow" ).appendTo( this );
			}
		},
		show: {
			duration: "fast"
		},
		hide: {
			effect: "hide"
		}
	});


	//calendar Language ko
	$.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년',
		/* 접근성 */
		// closeText: '닫기',
		// currentText: '오늘',
		// buttonImageOnly: false,
		// showButtonPanel: true
    });

	//calendar
	$( ".datepicker" ).datepicker({
		showOn: 'both',
		buttonImage: '../images/icon/form-calendar.svg',
		//buttonText: '클릭하시면 좌측의 텍스트박스에 달력이 열립니다. 달력은 CTRL/COMMAND+방향키로 컨트롤이 가능합니다.'
	});	
	
	//calendar from to
	var dateFormat = "yy-mm-dd",
	from = $( ".from" )
		.datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		showOn: "both",
		buttonImage: '../images/icon/form-calendar.svg',
		//buttonText: '클릭하시면 좌측의 텍스트박스에 달력이 열립니다. 달력은 CTRL/COMMAND+방향키로 컨트롤이 가능합니다.'
		})
		.on( "change", function() {
		to.datepicker( "option", "minDate", getDate( this ) );
		}),
	to = $( ".to" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		showOn: "both",
		buttonImage: '../images/icon/form-calendar.svg',
		//buttonText: '클릭하시면 좌측의 텍스트박스에 달력이 열립니다. 달력은 CTRL/COMMAND+방향키로 컨트롤이 가능합니다.'
	})
	.on( "change", function() {
		from.datepicker( "option", "maxDate", getDate( this ) );
	});

	function getDate( element ) {
	var date;
	try {
		date = $.datepicker.parseDate( dateFormat, element.value );
	} catch( error ) {
		date = null;
	}

	return date;
	}


	//tabBox > 1depth
	$(".tabBoxDepth1-wrap .tabBoxDepth1 > ul > li > .inner-tab").each(function(){ 
		$(this).click(function(){
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});	
	});

	//tabBox > 2depth
	$(".tabBoxDepth2-wrap .tabBoxDepth2 > ul > li > .inner-tab").each(function(){ 
		$(this).click(function(){
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});	
	});

	//tabBox > 3depth
	$(".tabBoxDepth3-wrap .tabBoxDepth3 > ul > li > .inner-tab").each(function(){ 
		$(this).click(function(){
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});	
	});

	//tabBox > 4depth
	$(".tabBoxDepth4-wrap .tabBoxDepth4 > ul > li > .inner-tab").each(function(){ 
		$(this).click(function(){
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});	
	});	


	//popup
	$("button[data-popup], a[data-popup]").click(function(){
		if($(this).hasClass("dataPopup")){
			$("."+$(this).data("popup")).siblings().removeClass("opened");
		}
		$("."+$(this).data("popup")).addClass("opened");
	});
	
	//popup close
	$(".popup-panel .popup-close").click(function(){
		$(this).parent().removeClass("opened");
	});

	// left popup 접기/펼치기
	$(".popup-panel .popup-left-toggle").each(function() {
		$(this).click(function(){
			$(this).parent().toggleClass("fold");

			if( $(this).parent().hasClass("fold") ){
				$(this).attr("title","펼치기");
			} else {			
				$(this).attr("title","접기");
			}
		});
	});
				
	//bottom popup 접기/펼치기
	$(".popup-panel .popup-bottom-toggle").each(function() {
		$(this).click(function(){
			$(this).parent().toggleClass("fold");
			
			if( $(this).parent().hasClass("fold") ){
				$(this).attr("title","펼치기");
			} else {			
				$(this).attr("title","접기");
			}
		});
	});


	//분석 popup 접기/펼치기
	$(".small-popup .popup-toggle").each(function() {
		$(this).click(function(){
			$(this).parent().toggleClass("fold");
			
			if( $(this).parent().hasClass("fold") ){
				$(this).attr("title","펼치기");
			} else {			
				$(this).attr("title","접기");
			}
		});
	});

	

});


//map Zoon In / out
function mapZoomControlPlusRe(){
	var zoomControlValueRe = parseInt($('.map-zoom-tool').val()) + 1;
	$('.map-zoom-tool').val(zoomControlValueRe).change();
	$('.map-zoom-tool').val(zoomControlValueRe);
}

function mapZoomControlMinusRe(){
	var zoomControlValueRe = parseInt($('.map-zoom-tool').val()) - 1;
	$('.map-zoom-tool').val(zoomControlValueRe).change();
	$('.map-zoom-tool').val(zoomControlValueRe);
}

