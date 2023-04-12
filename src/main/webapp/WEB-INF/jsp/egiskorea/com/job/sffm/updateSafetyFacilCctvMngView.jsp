<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/egiskorea/com/job/sffm/cctv/cctv.js"></script>
<script src="/js/egiskorea/com/job/sffm/sffm.js"></script>
<script>
//cctv 수정
function cctvUpdate(gid){

		
		var form = $("#updateCctvForm")[0];
		var formData = new FormData(form);
		
		if($("#cctv-deviceid").val() == '') {
			alert("다시");
			return false;
		}
		if($("#cctv-insert-selbox option:selected").val() == '') {
			alert("다시");
			return false;
		}
		if($("#cctv-adres").val() == ''){
			alert("다시");
			return false;
		}
		if($("#cctv-label").val() == '') {
			alert("다시");
			return false;
		}
		formData.append('gid', gid);
		console.log(formData);
		for (let key of formData.keys()) {
		console.log(key, ":", formData.get(key));
	}
		
		if(confirm("<spring:message code="common.update.msg" />")){	//수정하시겠습니까?
			   $.ajax({
				   type : "POST",
				   url	 : "/job/cctv//updateCctv.do",
				   data : formData,
				processData : false,
				contentType : false,
				dataType: "json",
				success : function(returnData, status){
					console.log(returnData);
					console.log(status)
					if(returnData.result == "success") {
						alert("<spring:message code="success.common.update" />");
						setData($('button[data-ax5grid-page-selected=true]').text()-1); 
						fn_pageDetail(gid);
						
					} else {
						alert("<spring:message code="fail.common.update" />");
						return;
					}
				}
			   });
		}
		

}


$('#cctvRegist').on('click', function(){
	var form = new FormData($('#insertCctvForm')[0]);


	// if(confirm("<spring:message code="common.regist.msg" />")){	//등록하시겠습니까?
       	ui.loadingBar("show");
       	$.ajax({
       		type : "POST",
       		url	 : "/job/cctv/insertCctv.do",
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

<%--<div class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 445px;" id="insertSafetyFacilCctvMngView">--%>
	<div class="popup-header" id="cctv-title-div">CCTV관리 수정하기</div>
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
							<form:form id="updateCctvForm" method="post">
							<tbody>
								<tr>
									<th scope="row">기기ID</th>
									<td><input type="text" class="form-control" id="cctv-deviceid" name="deviceid" maxlength="20" value="<c:out value = '${result.deviceid}'/>"/></td>
									<th scope="row">기기구분</th>
									<td><select name="cctv-insert-selbox" class="form-control" id="cctv-insert-selbox" name="gbn" value="<c:out value = '${result.gbn}'/>"/>></select></td>
								</tr>
								<tr>
									<th scope="row">명칭</th>
									<td colspan="3">
										<div class="col"><input type="text" class="form-control" id="cctv-label" name="label" maxlength="254" value="<c:out value = '${result.label}'/>"/>></div>
									</td>
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><input type="text" class="form-control" id="cctv-adres" name="adres" maxlength="255" value="<c:out value = '${result.lgsrAdres}'/>"/>></div>
											<div class="col" style="display: none;"><input type="text" class="form-control" id="cctv-location" readonly placeholder="경도, 위도" />></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location" onclick="fn_getLocation()">지도에서 선택</button></div>
											<input type="hidden" name="geom" id="geom">
											<input type="hidden" name="lon" id="lon">
											<input type="hidden" name="lat" id="lat">
										</div>
									</td>
								</tr>
								<!-- <tr>
									<td colspan="4">
										<div class="form-row">
											<div class="col"><input type="text" class="form-control" id="cctv-location" readonly placeholder="경도, 위도"></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location" onclick="CCTV.setLocation();">지도에서 선택</button></div>
										</div>
									</td>
								</tr> -->
							</tbody>
							</form:form>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap" id="cctv-btn-div">
					<div>
						<button type="button" class="btn basic bi-write2" onclick="cctvUpdate(<c:out value="${result.gid}" />)">수정 완료</button>
						<button type="button" class="btn basic bi-cancel closeSub" >취소
						</button>
					</div>
				</div>
			</div>							
		</div>
	</div>
	<button type="button" class="popup-close" title="닫기" ></button>				
</div>
<!-- //업무 > 공간정보활용 > 안전시설물관리 > CCTV관리 등록하기 -->