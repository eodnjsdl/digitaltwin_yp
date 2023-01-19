$(document).ready(function(){

	//gnb 현재 페이지 위치
	var sub_loc1 = $("#content .page-tit").text();

	$("#gnb li a").each(function(dix){
		var txt = $(this).text();
		if( sub_loc1 == txt ){
			$(this).parent().addClass("active").siblings().removeClass("active");
		} else if ($(".gnb-dep2 li").hasClass("active")){
			$(".gnb-dep2 .active").parents(".gnb-dep2").parent().addClass("active")
		}
	});

	$(".scroll-y").mCustomScrollbar({
		scrollbarPosition:"outside"
	});

	$(".scroll-x").mCustomScrollbar({
		axis:"x",
		scrollbarPosition:"outside",
		advanced:{autoExpandHorizontalScroll:true}
	});

	$(".scroll-yx").mCustomScrollbar({
		axis:"yx",
		scrollbarPosition:"outside"
	});

	//datepicker Language ko
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
		closeText: '닫기',
		currentText: '오늘',
		buttonImageOnly: false,
		showButtonPanel: true,
		maxDate: 0,
		changeYear: true,
		changeMonth: true
    });

	//datepicker
	$(".datepicker").datepicker({
		showOn: 'both',
		//buttonImage: '../../images/adm/form/form-calendar.png',
		buttonText: '클릭하시면 좌측의 텍스트박스에 달력이 열립니다. 달은 CTRL/COMMAND+방향키로 컨트롤이 가능합니다.',
		onChangeMonthYear: function (year, month, inst) {  } // 년 또는 월이 변경시 이벤트 발생
	});	
	
	//datepicker from to
	var dateFormat = "yy-mm-dd",
	from = $(".datepickerFrom")
		.datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		showOn: "both",
		//buttonImage: '../../images/adm/form/form-calendar.png',
		buttonText: '클릭하시면 좌측의 텍스트박스에 달력이 열립니다. 달력은 CTRL/COMMAND+방향키로 컨트롤이 가능합니다.'
		})
		.on( "change", function() {
		to.datepicker( "option", "minDate", getDate( this ) );
		}),
	to = $(".datepickerTo").datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		showOn: "both",
		//buttonImage: '../../images/adm/form/form-calendar.png',
		buttonText: '클릭하시면 좌측의 텍스트박스에 달력이 열립니다. 달력은 CTRL/COMMAND+방향키로 컨트롤이 가능합니다.'
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


	//popup
	$(".popup-panel").dialog({
		autoOpen: false, //자동 open
		draggable: false, //draggable 
		modal: true, //overlay 배경
		resizable: false,
		show: {
			effect: "fadeIn",
			duration: 100
		},
		hide: {
			effect: "fadeOut",
			duration: 100
		},

		open: function(){
			$("body").css("overflow", "hidden");
		},
		close: function(){
			$("body").css("overflow", "auto");
		}		
		  
	});
	
	
	//tabBox > 1depth
	$(".tabBoxDepth1-wrap .tabBoxDepth1 > ul > li > .inner-tab").each(function(){ 
		$(this).click(function(){
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});	
	});

	
});


//popup
function popup_open(target) {
	$('.popup-panel.'+target).dialog("open");	
}

// loading
function loadingShowHide(type) {
	if (type == "show") {
		$('body').append('<div class="loadingWrapper" style="position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0, 0, 0, 0.5); background-image:url(/images/common/loading.gif); background-position:center center; background-repeat:no-repeat; z-index: 10000;"></div>');
	} else if (type == "hide") {
		$('.loadingWrapper').remove();
	}
}

