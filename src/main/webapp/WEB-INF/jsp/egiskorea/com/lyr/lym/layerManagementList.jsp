<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<script>
$(document).ready(function(){
	// 레이어 항목 체크 및 해제
	$(".layerSrch-list-group li input").off("click").click(function(){
		var checked = $(this).prop("checked");
		var imgSrc = $(this).siblings("label").find("img").attr("src");
		var alt = $(this).siblings("label").find("img").attr("alt");
		var listName = $(this).siblings("label").find(".layeMng-list-nm").html();
		var listId = $(this).attr("id"); 
		var addList = "";
		
		if(checked){ // 목록 추가 
			addList = "<li title=" + listName + "><img src='" + imgSrc + "' alt='" + alt + "'><span> " + listName
			 		+ "</span><button type='button' class='delete-btn' title='삭제' data-id='" + listId + "'></button></li>";
			
			$("#selectedLayerList").append(addList);
		} else{ // 목록 삭제
			$("#selectedLayerList button[data-id='" + listId + "']").closest("li").remove();
		}
		
		if($("#selectedLayerList li").length == $(".layerSrch-list-group li").length){
			$("#lyrAllChk").prop("checked", true);
			$("label[for='lyrAllChk']").html(" 전체 해제");
		}
	});
	
	// 레이어 항목 삭제
	$(document).on("click", "#selectedLayerList .delete-btn", function(){
		var listId = $(this).data("id");
		
		$(this).closest("li").remove();
		$("#" + listId).prop("checked", false);
		
		if($("#selectedLayerList li").length == 0){
			$("#lyrAllChk").prop("checked", false);
			$("label[for='lyrAllChk']").html(" 전체 선택");	
		}
	});
	
	// 전체 선택 및 해제
	$("#lyrAllChk").off("click").click(function(){
		var chk = $(this).prop("checked");
		
		if(chk){
			$("label[for='lyrAllChk']").html(" 전체 해제");	
			$(".layerSrch-list-group input[type='checkbox']").prop("checked", true);
			
			var layerItems = $(".layerSrch-list-group li input");
			
			for(var i = 0; i < layerItems.length; i++){
				var imgSrc = $(layerItems[i]).siblings("label").find("img").attr("src");
				var alt = $(layerItems[i]).siblings("label").find("img").attr("alt");
				var listName = $(layerItems[i]).siblings("label").find(".layeMng-list-nm").html();
				var listId = $(layerItems[i]).attr("id"); 
				var addList = "<li title=" + listName + "><img src='" + imgSrc + "' alt='" + alt + "'><span> " + listName
		 					+ "</span><button type='button' class='delete-btn' title='삭제' data-id='" + listId + "'></button></li>";
		
				$("#selectedLayerList").append(addList);
			}
			
		} else{		
			$("label[for='lyrAllChk']").html(" 전체 선택");
			$(".layerSrch-list-group input[type='checkbox']").prop("checked", false);
			$("#selectedLayerList").empty();
		}
	});
});

// 레이어 관리 정보 삭제
function aj_deleteLayerManagementInfo(){
	var selectedLayerList = $("#selectedLayerList .delete-btn");
	var layerListStr = "";
	
	if(selectedLayerList.length > 0){
		for(var i = 0; i < selectedLayerList.length; i++){
			layerListStr += $(selectedLayerList[i]).data("id").replaceAll("layerMngItem_", "") + "/";
		}
		
		layerListStr = layerListStr.slice(0, -1);
		
		ui.loadingBar("show");
		$.ajax({
			type : "POST",
			url : "/lyr/lym/deleteLayerManagementInfo.do",
			data : {
				"layerIds" : layerListStr
			},
			dataType : "json",
			async : false,
			success : function(returnData, status){
				if(returnData.result == "success"){
					alert("레이어가 성공적으로 삭제되었습니다.");
					
					aj_selectLayerList("left");
					aj_selectLayerManagementList();
					
					$(".scroll-y").mCustomScrollbar({
						scrollbarPosition:"outside"
					});
				} else if (returnData.result == "fail"){
					alert("레이어 삭제를 실패하였습니다.");
				}
			}, complete : function(){
				ui.loadingBar("hide");
			}
		});	
	} else{
		alert("삭제할 레이어를 선택하십시오.");
	}
} 

// 개인별 레이어 목록 항목 추가
function aj_insertLayerListInfo(){
	var selectedLayerList = $("#selectedLayerList .delete-btn");
	var layerListStr = "";
	
	if(selectedLayerList.length > 0){
		for(var i = 0; i < selectedLayerList.length; i++){
			layerListStr += $(selectedLayerList[i]).data("id").replaceAll("layerMngItem_", "") + "/";
		}
		
		layerListStr = layerListStr.slice(0, -1);
		
		ui.loadingBar("show");
		$.ajax({
			type : "POST",
			url : "/lyr/lym/insertLayerListInfo.do",
			data : {
				"layerIds" : layerListStr
			},
			dataType : "json",
			async: false,
			success : function(returnData, status){
				if(returnData.result == "success") {
					alert("레이어를 목록에 성공적으로 추가하였습니다.");
					
					$("#leftPopup .popup-close").click();
					aj_selectLayerList("left");
					
					$(".scroll-y").mCustomScrollbar({
						scrollbarPosition:"outside"
					});
				} else if (returnData.result == "fail"){ 
					alert("레이어를 목록에 추가하는 데 실패하였습니다.");
					return;
				} 
			}, complete : function(){
				ui.loadingBar("hide");
			}
		});
	} else{
		alert("적용할 레이어를 선택하십시오.");
	}	
}

// 레이어 관리 정보 세팅
function setLayerManagementListInfo(layerId, layerType, shapeType, shareCheck){	
	var image = "";
	var alt = "";
	
	// 아이콘 이미지
	switch(layerType){
		// 지형, 영상
		case "T" : case "I" :
			image = "img"; alt = "이미지"; break;
		// LOD
		case "L" :
			image = "drone"; alt = "드론"; break;
		// 시설물, 3DS, Object, CSV, POI
		case "F" : case "D" : case "O" : case "C" : case "POI" :
			image = "point"; alt = "점형"; break;
		// 그래프
		case "G" : 
			image = "face";	alt = "면형"; break;
		// Shape
		case "S" :
			switch(shapeType){
				case 3 : case 4 :
					image = "point"; alt = "점형"; break;
				case 1 : case 5 :
					image = "line";	alt = "선형";	 break;
				case 2 : case 6 : case 7 :
					image = "face";	alt = "면형"; break;
			}
			
			break;
	}
	
	$("label[for='layerMngItem_" + layerId + "'] img").attr("src", "/images/icon/layer-list-" + image +".png");
	$("label[for='layerMngItem_" + layerId + "'] img").attr("alt", alt);
	
	// 공유여부
	if(shareCheck != "N"){
		$("label[for='layerMngItem_" + layerId + "']").closest("li").addClass("share");
	}
}
</script>
				<!-- 레이어 > 레이어관리 -->
					<div class="popup-header">레이어관리</div>
					<div class="popup-body">
						<div class="left-popup-body layerMng-body">						
							<div class="tabBoxDepth1-wrap">
								<div class="tabBoxDepth1">
									<ul>
										<li class="on"><button type="button" id="layerManagement" class="inner-tab leftPopup" data-popup="left-layer-mng">목록관리</button></li>
										<li><button type="button" id="dataConversion" class="inner-tab leftPopup" data-popup="left-layer-mng">등록관리</button></li>
									</ul>
								</div>
								<!-- 목록관리 -->
								<div class="tab-cont layerListMng on">
									<div class="layerListMng-group">
										<div class="items search-items">
											<p class="cont-tit">레이어 검색</p>
											<div class="search-items-panel">
												<div class="search-header">
													<div class="form-row">
														<div class="col-auto">
															<select name="searchCondition" id="" class="form-select">
																<option value="">레이어 분류</option>
																<c:forEach var="result" items="${layerClassification}" varStatus="status">
																	<option value="<c:out value="${result.code}"/>"><c:out value="${result.codeNm}"/></option>
																</c:forEach>
															</select>
														</div>
														<div class="col"><input type="text" name="searchKeyword" class="form-control" onKeypress="javascript:if(event.keyCode==13) aj_selectLayerManagementList()"></div>
														<div class="col-auto"><button type="button" class="btn btn-xsm type06" onclick="aj_selectLayerManagementList()">검색</button></div>
													</div>
												</div>
												<div class="search-header">
													<span class="form-checkbox">
														<span><input type="checkbox" id="lyrAllChk"><label for="lyrAllChk"> 전체 선택</label></span>
													</span>
												</div>
												<div class="search-body">
													<div class="scroll-y">
														<div class="layerSrch-list-group">
															<ul>
																<c:forEach var="result" items="${layerManagementList}" varStatus="status">
																	<li title="<c:out value="${result.dataName}"/>">
																		<span class="form-checkbox">
																			<input type="checkbox" name="layerMngItem_<c:out value="${result.dataid}"/>" id="layerMngItem_<c:out value="${result.dataid}"/>">
																			<label for="layerMngItem_<c:out value="${result.dataid}"/>">
																				<img src="" alt="">
																				<span class="layeMng-list-nm"><c:out value="${result.dataName}"/></span>
																			</label>
																		</span>
																		
																		<script>
																			setLayerManagementListInfo("${result.dataid}", "${result.dataType}", Number("${result.shpDataType}"), "${result.shareYn}");
																		</script>
																	</li>
																</c:forEach>
																<c:if test="${fn:length(layerManagementList) == 0}">
																	<li class="noData">
																		<p>검색 결과가 없습니다.</p>
																	</li>
																</c:if>
															</ul>															
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="items select-items ">
											<p class="cont-tit">선택한 레이어 목록</p>
											<div class="select-items-panel scroll-y">
												<ul id="selectedLayerList"></ul>
											</div>
										</div>
									</div>
									<div class="layerList-legend">
										<span><img src="/images/icon/layer-list-drone.png" alt="드론"> : 드론</span>
										<span><img src="/images/icon/layer-list-point.png" alt="점형"> : 점형</span>
										<span><img src="/images/icon/layer-list-line.png" alt="선형"> : 선형</span>
										<span><img src="/images/icon/layer-list-face.png" alt="면형"> : 면형</span>
										<span><img src="/images/icon/layer-list-img.png" alt="이미지"> : 이미지</span>
									</div>
									<div class="layerList-share">
										<p>※ <strong>공유함</strong> / 공유안함</p>
									</div>
									<div class="position-bottom btn-wrap">
										<div class="position-absolute left">
<!-- 											<button type="button" class="btn basic" onclick="">전체선택</button> -->
											<button type="button" class="btn basic bi-delete" onclick="aj_deleteLayerManagementInfo()">선택삭제</button>
										</div>
										<div><button type="button" class="btn basic bi-check" onclick="aj_insertLayerListInfo()">적용</button></div>
									</div>
								</div>
								<!-- //목록관리 -->
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-left-toggle" title="접기"></button>	
				<!-- //레이어 > 레이어관리 -->																		