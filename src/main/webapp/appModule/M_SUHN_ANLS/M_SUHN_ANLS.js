/**
 * SUBJECT : 일조권분석 
 * AUTHOR : 이푸름 
 * LAST UPDATE : 2021.1.12
 * COMMENT :
 */

var M_SUHN_ANLS = {
	data : null,
	fromMin : 0,
	startMin : 0,
	endMin : 0,
	itv : null,
	timeStep : 1,
	destroy:function(){
		GLOBAL.Analysis.clearShadow();
	},
	init:function(){ // 초기화
		//정북방향보기
		viewNorth()
		// 실행 멈춤
		
		clearTimeout(M_SUHN_ANLS.itv);
		GLOBAL.Analysis.clearShadow();

		// 날짜 설정 초기화
		var today = new Date();
		var year = String(today.getFullYear());
		var month = String(today.getMonth() + 1).padStart(2, "0");
		var day = String(today.getDate()).padStart(2, "0");
		
		$("#sunDatepicker").val(year + "-" + month + "-" + day);
		//리스트 추가
		if($("#endHourList option").length <25){
			
			for(var i = 0; i < 24; i++){
				var hour = i < 10 ? "0" + String(i) : String(i);
	
				$("#startHourList").append("<option value=\"" + hour + "\">" + hour + "시" + "</li>");
				$("#endHourList").append("<option value=\"" + hour + "\">" + hour + "시" + "</li>");
			}

			for(var i = 0; i < 60; i++){
				var minute = i < 10 ? "0" + String(i) : String(i);

				$("#startMinuteList").append("<option value=\"" + minute + "\">" + minute + "분" + "</li>");
				$("#endMinuteList").append("<option value=\"" + minute + "\">" + minute + "분" + "</li>");
			}
		}
		//시간선택값 초기화
		$("#startHourList").val("06").attr("selected", "selected");
		
		$("#startMinuteList").val("00").attr("selected", "selected");
		
		$("#endHourList").val("18").attr("selected", "selected");
		
		$("#endMinuteList").val("00").attr("selected", "selected");

		this.calcTotalMin();

	},
	controlPlay:function(){ // 재생 // 그림자생성 -초기화로 다시 그려줌
		
		if(M_SUHN_ANLS.startMin > M_SUHN_ANLS.endMin){
			toastr.warning("시작시간이 종료시간보다 빨라야 합니다.");

			return false;
		}

		clearTimeout(M_SUHN_ANLS.itv);

		if(M_SUHN_ANLS.fromMin >= M_SUHN_ANLS.endMin) {

			return false;
		}
		
		M_SUHN_ANLS.itv = setTimeout(function() {
			//달력 값
			var currentDate = $("#sunDatepicker").val();

			currentDate = currentDate.split("-");
			//속도간격 적용
			M_SUHN_ANLS.fromMin += M_SUHN_ANLS.timeStep;
			
			//슬라이더 값변경
			M_SUHN_ANLS.data.slider({
				value : M_SUHN_ANLS.fromMin
				
			});
				
			var year = parseInt(currentDate[0]);
			var month = parseInt(currentDate[1]);
			var date = parseInt(currentDate[2]);
			var hour = parseInt(M_SUHN_ANLS.fromMin / 60);
			var minute = parseInt(M_SUHN_ANLS.fromMin % 60);
						
			var sh = hour < 10 ? "0"+hour : hour;
			var sm = minute < 10 ? "0"+minute : minute;
			$('#custom-handle .amount').html(sh+":"+sm);
			//그림자 생성 
			GLOBAL.Analysis.createShadow(year, month, date, hour, minute);

			M_SUHN_ANLS.controlPlay();
		}, 10);
	},
	controlPause:function(){ // 일시정지
		clearTimeout(M_SUHN_ANLS.itv);

	},
	controlStop:function(){ // 종료
		clearTimeout(M_SUHN_ANLS.itv);

		M_SUHN_ANLS.fromMin = M_SUHN_ANLS.startMin;
		M_SUHN_ANLS.data.slider({
			value : M_SUHN_ANLS.fromMin
		});

	},
	calcTotalMin:function(){ // 시간 업데이트
		clearTimeout(M_SUHN_ANLS.itv);

		var startHour = $("#startHourList option:selected").val()
		var startMinute = $("#startMinuteList option:selected").val()
		var endHour = $("#endHourList option:selected").val()
		var endMinute = $("#endMinuteList option:selected").val()

		var sH = parseInt(startHour) * 60;
		var sM = parseInt(startMinute);

		M_SUHN_ANLS.startMin = sH + sM;
		M_SUHN_ANLS.fromMin = M_SUHN_ANLS.startMin;

		var eH = parseInt(endHour) * 60;
		var eM = parseInt(endMinute);

		M_SUHN_ANLS.endMin = eH + eM;
		M_SUHN_ANLS.data = $(".sunlight-slider").slider();
				
		M_SUHN_ANLS.data.slider({
			min: M_SUHN_ANLS.startMin,
			max: M_SUHN_ANLS.endMin,
			value: M_SUHN_ANLS.fromMin			
		});
		//슬라이더값
		$('#custom-handle .amount').html(startHour + ":" + startMinute);
		//시작값 종료값 입력
		$("#shadowStartTime").html(startHour + ":" + startMinute);
		$("#shadowEndTime").html(endHour + ":" + endMinute);
	},
	changeSimulationTimeStep:function(){ // 속도간격 업데이트
		M_SUHN_ANLS.timeStep = parseInt($("#timeIntervalList option:selected").val());
	},
	changeProgressingTime:function(){ // 슬라이더 컨트롤을 통한 시간 업데이트
		M_SUHN_ANLS.fromMin = $(".sunlight-slider").slider("value");

		var hour = parseInt(M_SUHN_ANLS.fromMin / 60);
		var minute = parseInt(M_SUHN_ANLS.fromMin % 60);

		var sh = hour < 10 ? "0" + hour : hour;
		var sm = minute < 10 ? "0" + minute : minute;
		$("#custom-handle .amount").html(sh + ":" + sm);
	},
	reset:function(){ //리셋
		M_SUHN_ANLS.data = null;
		M_SUHN_ANLS.fromMin = 0;
		M_SUHN_ANLS.startMin =0;
		M_SUHN_ANLS.endMin = 0;
		M_SUHN_ANLS.itv = null;
				
		$("input:radio[name='play']").prop("checked", false); 
		
		this.init()
	}
	
}
$(document).ready(function(){
	   ui.callDatePicker();
	});

$(function(){
	//시작,종료 변경시 
	$(".sunlight-option-group select[name=selectTimeSet]").on("change",function(){		
		M_SUHN_ANLS.calcTotalMin()
	})
	//속도간격
	$("#timeIntervalList").off().on("change",function(){
		M_SUHN_ANLS.changeSimulationTimeStep()
	});
	//시작버튼	
	$("#play").off().on("click",function(){
		M_SUHN_ANLS.controlPlay()
		
	});
	//일시정지
	$("#pause").off().on("click",function(){
		M_SUHN_ANLS.controlPause()
	});
	//중단
	$("#stop").off().on("click",function(){
		M_SUHN_ANLS.controlStop()
	});
	//초기화버튼
	$("#sunReset").off().on("click",function(){
		M_SUHN_ANLS.reset();
	})
	
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