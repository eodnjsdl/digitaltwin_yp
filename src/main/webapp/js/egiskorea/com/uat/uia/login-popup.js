$(document).ready(function(){
	
	$( "#dialog-findId" ).dialog({
		autoOpen: false, //자동 open
		draggable: false, //draggable 
		modal: true, //overlay 배경
		classes: {
			"ui-dialog": "login-dialog"
		},
		width: 500,
		show: {
			effect: "fadeIn",
			duration: 100
		},
		hide: {
			effect: "fadeOut",
			duration: 100
		},
	});

	$( "#findId" ).on( "click", function() {
		$( "#dialog-findId" ).dialog( "open" );
	});
	
	
	$( "#dialog-findPw" ).dialog({
		autoOpen: false, //자동 open
		draggable: false, //draggable 
		modal: true, //overlay 배경
		classes: {
			"ui-dialog": "login-dialog"
		},
		width: 500,
		show: {
			effect: "fadeIn",
			duration: 100
		},
		hide: {
			effect: "fadeOut",
			duration: 100
		},
	});

	$( "#findPw" ).on( "click", function() {
		$( "#dialog-findPw" ).dialog( "open" );
	});

});