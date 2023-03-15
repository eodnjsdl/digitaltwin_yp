<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script>
$(document).ready(function(){
	// 팝업창 닫기 event
    $(".lnb-work .lnb-close").click(function() {
        $(".lnb-work").stop().fadeOut(100);
        $("#lnb li[data-menu]").removeClass("on");
    });
});
</script>
						<div class="lnb-header"><h2 class="tit">업무</h2></div>
						<div class="lnb-body">
							<div class="scroll-y">
								<ul class="lnb-list">
									<li><p class="lnb-dep1">공간정보활용</p>
										<ul class="lnb-dep2">
											<li><button type="button" id="constructionPlan" class="leftPopup" data-popup="constructionPlan">사업공유관리</button></li>
											<li><button type="button" id="undergroundWaterManagement" class="bottomPopup" data-popup="undergroundWaterManagement" style="text-decoration: underline;">지하수관리</button></li>
											<li><button type="button" id="renewableEnergy" class="bottomPopup" data-popup="renewableEnergy">신재생에너지</button></li>
											<li><button type="button" id="safetyFacilitiesManagement" class="bottomPopup" data-popup="safetyFacilitiesManagement">안전시설물관리</button></li>
											<li><button type="button" id="inBusinessEstaInfo" class="bottomPopup" data-popup="inBusinessEstaInfo">관내업소정보조회</button></li>
											<li><button type="button" id="atmospherePollution" class="leftPopup" data-popup="atmospherePollution">대기오염</button></li>
										</ul>
									</li>
									<li><p class="lnb-dep1">시설관리</p>
										<ul class="lnb-dep2">
											<li><button type="button" id="waterSupplyFacility" class="bottomPopup" data-popup="waterSupplyFacility" style="text-decoration: underline;">상수도시설</button></li>
											<li><button type="button" id="sewerSupplyFacility" class="bottomPopup" data-popup="sewerSupplyFacility">하수도시설</button></li>
											<li><button type="button" id="transportationFacility" class="bottomPopup" data-popup="transportationFacility">교통시설</button></li>
											<li><button type="button" id="physicalEducationFacility" class="bottomPopup" data-popup="physicalEducationFacility">체육시설</button></li>
											<li><button type="button" id="welfareFacility" class="bottomPopup" data-popup="welfareFacility">복지시설</button></li>
											<li><button type="button" id="faciReseMng" class="leftPopup" data-popup="faciReseMng">시설예약관리</button></li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
						
						<div class="lnb-util">
							<button type="button" class="manualBtn" title="도움말" onclick="manualTab('업무')"></button>
							<button type="button" class="lnb-close" title="닫기"></button>
						</div>