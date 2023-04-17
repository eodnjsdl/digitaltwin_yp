<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<script>
$(document).ready(function(){
	//슬라이더바
	var handle = $("#custom-handle");
	$(".slider-box .slider").slider({
		value: 100,
		min: 0,
		max: 100,
		step: 10,
		range: "min",
		create: function() {
			handle.text( $( this ).slider("value"));
		},
		slide: function(event, ui) {
			handle.text(ui.value);
			setPlanetTransparency(ui.value);
		},
		change: function(event, ui){
		}
	});

	// 레이어 관리 버튼 활성화 체크
	if($(".layerMng-body").closest("#leftPopup").hasClass("opened")){
		$("button.layer-mng").addClass("active");
	}

	// 레이어 정보 상세보기 클릭 event
	$(".layer-list .layer-detail").click(function(){
		var layerId = $(this).closest("li").find(".form-checkbox input[type='checkbox']").attr("id").split("_")[2];

		$(".layer-list li").find(".active").removeClass("active");
		$(this).closest("li").addClass("active").siblings().removeClass("active");

		leftPopupOpen("layerInfo", layerId);

		if(!$(this).closest("li").find("input[type='checkbox']").prop("checked")){
			$(this).closest("li").find("input[type='checkbox']").click();
		}
	});

	// 레이어 메뉴 토글 event
	$(".layer-list .layer-toggle").click(function(){
		$(this).find(".open").removeClass("open").addClass("close");

		if($(this).hasClass("close")){
			$(this).removeClass("close").addClass("open").attr("title", "펼치기");
			$(this).next(".layer-list-dep2").slideUp(200);

		}else if( $(this).hasClass("open")){
			$(this).removeClass("open").addClass("close").attr("title", "접기");
			$(this).next(".layer-list-dep2").slideDown(200);
		}
	});

	// 레이어관리 button event
	$(".lnb-layer .layer-mng").on("click", function(){
		$(this).addClass("active");
		leftPopupOpen("layerManagement");
	});

	// 팝업창 닫기 event
    $(".lnb-layer .lnb-close").click(function() {
        $(".lnb-layer").stop().fadeOut(100);
        $("#lnb li[data-menu]").removeClass("on");
        $('#leftPopup.opened').removeClass('opened');
    });

	// 초기화 button event
	$("#side .lnb-layer .lnb-resetBtn").click(function() {
		dtmap.layer.clear();
		$('.lnb-layer [name="searchKeyword"]').val(null);
		aj_selectLayerList('left', true);
	});

	// 팝업창 오픈 시  레이어 가시화여부 체크
	// layerChecked();
});

// 개인별 레이어 목록 항목 제거
function aj_deleteLayerListInfo(btn){
	var chkId = $(btn).closest("li").find("input[type='checkbox']").attr("id");
	var layerId  = chkId.split("_")[2];
	var layerType = chkId.split("_")[1];
	var layerName = $(btn).closest("li").find("input[type='checkbox']").attr("data-table");

	var checked = $(btn).closest("li").find("input[type='checkbox']").prop("checked");



	 if (!confirm("레이어를 목록에서 제거하시겠습니까?")) {
		return;
	}


	if(app2D) {
		onOffLayer2D(layerType, layerId, false);
	} else {
		onOffLayer3D(layerType, layerId, false);
	}

/* 	if(checked) {
		$(btn).closest("li").find("input[type='checkbox']").prop("checked", false);
	} */

	$.ajax({
		type : "POST",
		url : "/lyr/lym/deleteLayerListInfo.do",
		data : {
			dataid : layerId
		},
		dataType : "json",
		async: false,
		success : function(returnData, status){
			if(returnData.result == "success") {
				alert("레이어를 목록에서 성공적으로 제거하였습니다.");
				aj_selectLayerList("left");

				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			} else if (returnData.result == "fail"){
				alert("레이어를 목록에서 제거하는 데 실패하였습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}
</script>

						<div class="lnb-header"><h2 class="tit">레이어</h2></div>
						<div class="lnb-body">
							<div class="srch-box marB5">
								<form action="">
									<div class="form-row">
										<div class="col"><input type="text" name="searchKeyword" class="form-control" placeholder="레이어명 검색" onkeypress="javascript:if(event.keyCode==13) aj_selectLayerList('left');"></div>
										<div class="col-auto"><button type="button" class="btn type01 search" onclick="aj_selectLayerList('left');">검색</button></div>
									</div>
								</form>
							</div>

							<div class="btn-wrap justify-content-end marT5 marB10"><button type="button" id="layerManagement" class="btn basic bi-setting layer-mng leftPopup" data-popup="left-layer-mng">레이어관리</button></div>

							<div class="scroll-y">
								<ul class="layer-list">
									<c:forEach var="result" items="${resultList}" varStatus="status">
										<c:if test="${result.lyrCl ne ctgr}">
											<c:if test="${!status.first}">
													</ul>
												</li>
											</c:if>

											<li id="ctgr_<c:out value="${result.lyrCl}"/>">
											<span class="form-checkbox">
												<c:if test="${result.lyrClNm ne '정사영상'}">
												<input type="checkbox" name="chk_ctgr_<c:out value="${result.lyrCl}"/>" id="chk_ctgr_<c:out value="${result.lyrCl}"/>">
												</c:if>
												<label for="chk_ctgr_<c:out value="${result.lyrCl}"/>" data-title="<c:out value="${result.lyrClNm}"/>" "><c:out value="${result.lyrClNm}"/></label>
											</span>
											<button type="button" class="layer-toggle close" title="접기"></button>
											<ul class="layer-list-dep2">

										</c:if>

										<li title="<c:out value="${result.dataName}"/>">
											<span class="form-checkbox">
												<input type="checkbox" id="layer_<c:out value="${result.dataType}"/>_<c:out value="${result.dataid}"/>"
													name="layer_<c:out value="${result.dataType}"/>_<c:out value="${result.dataid}"/>"
													data-table="<c:out value="${result.shpTableName}"/>" data-store="<c:out value="${result.shpDataStoreName}"/>"
													data-shpType="<c:out value="${result.shpDataType}"/>" data-desc="<c:out value="${result.dataDesc}"/>"  <c:if test="${result.dataType eq 'I' or result.dataType eq 'D' or result.dataType eq 'L' or result.dataType eq 'G'}">class="only3d"</c:if>>
													
												<label for="layer_<c:out value="${result.dataType}"/>_<c:out value="${result.dataid}"/>" data-title="<c:out value="${result.dataName}"/>"><c:out value="${result.dataName}"/></label>
											</span>
											<div>
												<c:if test="${result.dataType eq 'S'}">
													<button type="button" class="layer-btn layer-detail" data-popup="left-layer-info" title="정보"></button>
												</c:if>
												<c:if test="${result.emplyrId ne 'SYSTEM'}">
													<button type="button" class="layer-btn layer-delete" title="삭제" onclick="aj_deleteLayerListInfo(this)"></button>
												</c:if>
											</div>
										</li>

										<c:if test="${status.last}">
												</ul>
											</li>
										</c:if>
										<c:set var="ctgr" value="${result.lyrCl}"/>
									</c:forEach>
									<c:if test="${fn:length(resultList) == 0}">
										<li class="noData">
											<p>검색 결과가 없습니다.</p>
										</li>
									</c:if>
								</ul>


							</div>

						</div>

						<div class="lnb-util"><button type="button" class="manualBtn" title="도움말"></button> <button type="button" class="lnb-resetBtn" title="초기화"></button><button type="button" class="lnb-close" title="닫기"></button></div>
						<script>
							$(document).ready(function(){
								$(".layer-list .layer-detail").click(function(){
									$(".layer-list li").find(".active").removeClass("active");
									$(this).closest("li").addClass("active").siblings().removeClass("active");
								});

								$(".layer-list .layer-toggle").click(function(){
									$(this).find(".open").removeClass("open").addClass("close");

									if( $(this).hasClass("close") ){
										$(this).removeClass("close").addClass("open").attr("title","펼치기");
										$(this).next(".layer-list-dep2").slideUp(200);

									}else if( $(this).hasClass("open")){
										$(this).removeClass("open").addClass("close").attr("title","접기");
										$(this).next(".layer-list-dep2").slideDown(200);
									}
								});
							});
						</script>
						