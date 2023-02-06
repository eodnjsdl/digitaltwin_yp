<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<style>
	#yanggeunri_3d::after {
		content: ' 양근리';
	}
	.liData {
		margin-left: 1rem;
	}
</style>
<script>
	$(document).ready(function(){	
		
		// 레이어 메뉴 토글 event
		$(".layer-list .layer-toggle").click(function(){
			$(this).find(".open").removeClass("open").addClass("close");

			if($(this).hasClass("close")){
				$(this).removeClass("close").addClass("open").attr("title", "펼치기");
				$(this).next(".layer-list-dep2").slideUp(200);
				$(this).parent(".riDiv").next(".riCheckBox").slideUp(200);

			}else if( $(this).hasClass("open")){
				$(this).removeClass("open").addClass("close").attr("title", "접기");
				$(this).next(".layer-list-dep2").slideDown(200);
				$(this).parent(".riDiv").next(".riCheckBox").slideDown(200);
			}
		});

		
		//초기화
		$(".popup-right.opened .lnb-resetBtn").click(function() {
			// 레이어 전체 비활성화
			if(app2D){
				var layers = store.layerIds;
				var yMap = app2D.getYMap();
				
				for(var i = 0; i < layers.length; i++){
					if(layers[i] != "tgd_scco_sig"){
						yMap.removeWMSLayer(layers[i]);
						store.removeLayerId(layers[i]);
						
						i--;
					}
				}
			} else{
				dronChkCount = 0;
				modelObjChk = false;
				landmarkObjChk = false;
				
				var userlayerFalse = new Module.JSLayerList(false);
				var falseCount = userlayerFalse.count();
				for(var i = 0; i < falseCount; i++){
					if(userlayerFalse.indexAtLayer(i).getName() != "layer_S_140"){ // 법정구역시군구 제외
						if(userlayerFalse.indexAtLayer(i).getVisible()){
							userlayerFalse.indexAtLayer(i).setVisible(false);
						} 	
					}
				}
				
				var userlayerTrue = new Module.JSLayerList(true);
				var trueCount = userlayerTrue.count();
				for(var i =0; i < trueCount; i++){
					if(userlayerTrue.indexAtLayer(i).getVisible()){
						userlayerTrue.indexAtLayer(i).setVisible(false);
					} 
				}
			}
			
			$('#rightPopup [name="searchKeyword"]').val(null); 
			aj_selectLayerList('top', true);
		});
		
		//팝업창 오픈 시  레이어 가시화여부 체크
		layerChecked();
		
		//3차원 영상 면 > 리 정보 조회
		myeonList();
		
	});
	function myeonList() {
		let cnt = $('#ctgr_025 > ul.layer-list-dep2 > li').length;
		let idx = "";
		let myeon = "";
		let myeonText = "";
		let liTag = "";
		let myeonId = "";
		let myeonNm = "";
		let liVal = "";
		let len = "";
		if (cnt > 0) {
			myeon = $('#ctgr_025 > ul.layer-list-dep2 > li');
			for(let i = 0; i < cnt; i++) {
				myeonText = myeon[i].innerText;
				idx = ypMyeon.indexOf(myeonText.trim());
				myeonId = myeon[i].children[0].id;
				myeonNm = myeon[i].children[0].name;
				len = ypLiLod[idx].length;
				if (myeonText == '강상면') {
					$('#ctgr_025 > ul.layer-list-dep2 > li[title="'+myeonText+'"]').append('<ul class="riCheckBox" title="'+myeonText+'"></ul>');
				} else {
					$('#ctgr_025 > ul.layer-list-dep2 > li[title="'+myeonText+'"]').append('<ul class="riCheckBox" title="'+myeonText+'" style="display: none;"></ul>');
				}
				for(let j = 0; j < len; j++) {
					liVal = ypLiLod[idx][j];
					liValTxt = ypLiLodNm[idx][j];
					liTag = "";
					liTag += '<li title="'+myeonText+' '+liValTxt+'" class="liData">';
					liTag += '<span class="form-checkbox">';
					liTag += '<input type="checkbox" id="'+myeonId+'_'+j+'" name="'+myeonNm+'" class="only3d" value="'+liVal+'">';
					liTag += '<label for="'+myeonId+'_'+j+'" data-title="'+liValTxt+'">'+liValTxt+'</label></span></li>';
					$('#ctgr_025 > ul.layer-list-dep2 > li[title="'+myeonText+'"] > ul').append(liTag);
				}
			}
		}
	}
</script>

<div class="popup-header">3D 레이어</div>
<div class="popup-body">

	<div class="tool-popup-body tool-layer-body">						
		<div class="srch-box">
			<form action="">
				<div class="form-row">
					<div class="col"><input type="text" name="searchKeyword" class="form-control" placeholder="레이어명 검색" onkeypress="javascript:if(event.keyCode==13) aj_selectLayerList('top');"></div>
					<div class="col-auto"><button type="button" class="btn type01 search" onclick="aj_selectLayerList('top');">검색</button></div>
				</div>
			</form>
		</div>

		<div class="scroll-y">
			<ul class="layer-list topLayer">
				<c:forEach var="result" items="${resultList}" varStatus="status">
					<c:if test="${result.lyrCl ne ctgr}">
						<c:if test="${!status.first}">
								</ul>
							</li>
						</c:if>
					
						<li id="ctgr_<c:out value="${result.lyrCl}"/>">
						
						<c:if test="${result.lyrCl ne '025' && result.lyrCl ne '060'}">
							<span class="form-checkbox">
								<c:if test="${result.lyrClNm ne '정사영상'}">
								<input type="checkbox" name="chk_ctgr_<c:out value="${result.lyrCl}"/>" id="chk_ctgr_<c:out value="${result.lyrCl}"/>_2">
								</c:if>												
								<label for="chk_ctgr_<c:out value="${result.lyrCl}"/>_2" data-title="<c:out value="${result.lyrClNm}"/>"><c:out value="${result.lyrClNm}"/></label>
							</span>
						</c:if>
						<c:if test="${result.lyrCl eq '025' || result.lyrCl eq '060'}">
							<span class="form-checkbox">
								${result.lyrClNm }
							</span>
						</c:if>	
							
						<button type="button" class="layer-toggle close" title="접기"></button>
						<ul class="layer-list-dep2">
							
					</c:if>
					
					
						<c:if test="${result.lyrCl eq '060' }">
							<li title="<c:out value="${result.dataName}"/>">
								<span class="form-checkbox">
									<input type="checkbox" id="layer_POI_<c:out value="${result.dataid}"/>_2"
										name="layer_POI_${result.dataid}"
										data-table="${result.shpTableName}" data-store="${result.shpDataStoreName}"
										data-shpType="${result.shpDataType}" data-desc="${result.dataDesc}" class="only3d">
										
									<label for="layer_POI_${result.dataid}_2" data-title="${result.dataName}">${result.dataName}</label>
								</span>
							</li>
						</c:if>
						<c:if test="${result.lyrCl ne '060' }">
							
							<c:if test="${result.lyrCl ne '025' }">
								<li title="<c:out value="${result.dataName}"/>">
									<span class="form-checkbox">
										<input type="checkbox" id="layer_<c:out value="${result.dataType}"/>_<c:out value="${result.dataid}"/>_2"
											name="layer_${result.dataType}_${result.dataid}"
											data-table="${result.shpTableName}" data-store="${result.shpDataStoreName}"
											data-shpType="${result.shpDataType}" data-desc="${result.dataDesc}" class="only3d">
											
										<label for="layer_${result.dataType}_${result.dataid}_2" data-title="${result.dataName}">${result.dataName}</label>
									</span>
								</li>
							</c:if>
							
							<c:if test="${result.lyrCl eq '025' }">
								<li class="ctgr025" title="<c:out value="${result.dataName}"/>">
									<input type="hidden" id="layer_<c:out value="${result.dataType}"/>_<c:out value="${result.dataid}"/>_2"
												name="layer_${result.dataType}_${result.dataid}"
												data-table="${result.shpTableName}" data-store="${result.shpDataStoreName}"
												data-shpType="${result.shpDataType}" data-desc="${result.dataDesc}" class="only3d">
									<%-- <span>${result.dataName}</span> --%>
									<div class="riDiv">
									<c:if test="${result.dataName eq '강상면'}">
										<span>${result.dataName}</span>
										<button type="button" class="dep3 layer-toggle close" title="접기"></button>
									</c:if>
									<c:if test="${result.dataName ne '강상면'}">
										<span>${result.dataName}</span>
										<button type="button" class="dep3 layer-toggle open" title="펼치기"></button>
									</c:if>
									</div>
								</li>
							</c:if>
							
						</c:if>
					
					
					
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
									
<!-- 				<li>건물 -->
<!-- 					<button type="button" class="layer-toggle close" title="접기"></button> -->
<!-- 					<ul class="layer-list-dep2"> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id="" checked><label for="">건물</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">건물군</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">건물출입구</label></span></li>											 -->
<!-- 					</ul> -->
<!-- 				</li> -->
<!-- 				<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">경계</label></span> -->
<!-- 					<button type="button" class="layer-toggle close" title="접기"></button> -->
<!-- 					<ul class="layer-list-dep2"> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">시도 법정경계</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">시군구 법정경계</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">읍면동 법정경계</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">리 법정경계</label></span></li> -->
<!-- 					</ul> -->
<!-- 				</li> -->
<!-- 				<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">교통</label></span> -->
<!-- 					<button type="button" class="layer-toggle close" title="접기"></button> -->
<!-- 					<ul class="layer-list-dep2"> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">교량</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">도로(실폭)</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">안전지대</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">인도(보도)</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">입체교차부</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">지하철</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">지하철역사</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">지하철출입구</label></span></li> -->
<!-- 						<li><span class="form-checkbox"><input type="checkbox" name="" id=""><label for="">철도</label></span></li> -->
<!-- 					</ul> -->
<!-- 				</li> -->
			</ul>
		</div>
	</div>

</div>
<button type="button" class="lnb-resetBtn" title="초기화"></button>
<button type="button" class="popup-close" title="닫기"></button>