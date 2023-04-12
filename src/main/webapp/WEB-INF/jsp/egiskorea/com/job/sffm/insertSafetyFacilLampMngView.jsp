<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<script src="/js/egiskorea/com/job/sffm/sffm.js"></script>
<script>
ui.callDatePicker();
//가로등 등록하기 버튼
$('#lampRegist').on('click', function(){
	var form = new FormData();

	// $("#geom").val("POINT(998475.8757163942 1943527.8912290551)");
	// $("#adres").val("경기도 양평읍 양근리 638");
	var manage_no = $('#manage-no').val();
	var instl_de = $('#instl-de').val();
	var adres = $('#adres').val();
	var geom = $('#geom').val();
	var strtlgt_cnt = $('#strtlgt-cnt').val();


	if(manage_no == ''){
		alert("관리번호를 입력해주세요!");
		return;
	}else{
		form.append('manageNo', manage_no);
	}
	if(instl_de == ''){
		alert("설치일을 입력해주세요!");
		return;
	}else{
		form.append('instlDe', instl_de);
	}
	if(adres == ''){
		alert("주소를 입력해주세요!");
		return;
	}else{
		form.append('adres', adres);
	}
	if(geom == ''){
		alert("주소를 입력해주세요!");
		return;
	}else{
		form.append('geom', geom);
	}
	if(strtlgt_cnt == ''){
		alert("가로등수를 입력해주세요!");
		return;
	}else{
		form.append('strtlgtCnt', strtlgt_cnt);
	}

	form.append('lat', $('#lat').val());
	form.append('lon', $('#lon').val());
	// form.append('alt', Module.getMap().getTerrHeightFast(parseFloat(127.48846105), parseFloat(37.49131546)).toFixed(6));
	form.append('alt', "1");
	form.append('stdde', new Date().toISOString().substring(0, 10));
	// if(confirm("<spring:message code="common.regist.msg" />")){	//등록하시겠습니까?
		for (let key of form.keys()) {
		console.log(key, ":", form.get(key));
	}
       	ui.loadingBar("show");
       	$.ajax({
       		type : "POST",
       		url	 : "/job/sffm/insertSffm.do",
       		data : form,
			processData : false,
			contentType : false,
			dataType: "json",
			success : function(returnData, status){
				console.log(status);
				console.log(returnData);
				if(returnData.result == "success") {
					$("#rightSubPopup").removeClass("opened").html("");
					initGrid();
					setData(0); 
				} else {
					// alert("<spring:message code="fail.common.insert" />");
					return;
				}
			},error : function (request,status,error){
				console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			} ,
			complete : function(){
				ui.loadingBar("hide");
				
			}, 
       	});
	// }




})

</script>

<%--<div class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 445px;" id="insertSafetyFacilLampMngView">--%>
	<div class="popup-header" id="sffm-title-div">가로등관리 등록하기</div>
	<div class="popup-body">
		<div class="sub-popup-body">
			<div class="data-write-wrap" style="height: 100%;">
				<div class="scroll-y">
					<div class="data-default">
						<table class="data-write">
							<colgroup>
								<col style="width: 23%;">
								<col style="width: auto;">
								<col style="width: 23%;">
								<col style="width: auto;">
							</colgroup>
							<tbody>
								<tr>
									<th scope="row">관리번호</th>
									<td><input type="text" class="form-control" id="manage-no" maxlength="19"></td>
									<th scope="row">설치일자</th>
									<td><div class="datapicker-group"><input type="text" class="datepicker" id="instl-de" maxlength="11"></div></td>
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><input type="text" class="form-control" id="adres" maxlength="65"></div>
											<div class="col" style="display: none;"><input type="text" class="form-control" id="location" readonly placeholder="경도, 위도"></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location" id="mapSelectBtn" onclick="fn_getLocation()">지도에서 선택</button></div>
											<input type="hidden" name="geom" id="geom">
											<input type="hidden" name="lon" id="lon">
											<input type="hidden" name="lat" id="lat">
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">가로등수</th>
									<td colspan="3"><input type="text" class="form-control" id="strtlgt-cnt" maxlength="12"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap" id="sffm-btn-div">
					<div>
						<button type="button" class="btn basic bi-write2" id="lampRegist">등록</button>
						<button type="button" class="btn basic bi-cancel closeSub">취소
						</button>
					</div>
				</div>
			</div>							
		</div>
	</div>
	<button type="button" class="popup-close" title="닫기" onclick="cancelModal();removeCmmPOI();"></button>
</div>
<!-- //업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 등록하기 -->