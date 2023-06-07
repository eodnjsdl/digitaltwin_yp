<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script>
$(document).ready(function(){
	//console.log("busRouteDetail.jsp");
	
	$('.busRouteDetail > .popup-header label').removeClass();
	$('.busRouteDetail > .popup-header input').removeClass();
		
	var busRouteTy = '<c:out value="${busRouteVO.route_ty}"/>';
	
	if (busRouteTy == 13 || busRouteTy == 21 || busRouteTy == 22 || busRouteTy == 23) {
		$('.busRouteDetail > .popup-header label').addClass('greenBusNumb');
		$('.busRouteDetail > .popup-header input').addClass('greenBusTxt');
	} else if(busRouteTy == 12) {
		$('.busRouteDetail > .popup-header label').addClass('blueBusNumb');
		$('.busRouteDetail > .popup-header input').addClass('blueBusTxt');
	} else if(busRouteTy == 11 || busRouteTy == 16) {
		$('.busRouteDetail > .popup-header label').addClass('redBusNumb');
		$('.busRouteDetail > .popup-header input').addClass('redBusTxt');
	} else if(busRouteTy == 15) {
		$('.busRouteDetail > .popup-header label').addClass('pinkBusNumb');
		$('.busRouteDetail > .popup-header input').addClass('pinkBusTxt');
	} else if(busRouteTy == 30) {
		$('.busRouteDetail > .popup-header label').addClass('yellowBusNumb');
		$('.busRouteDetail > .popup-header input').addClass('yellowBusTxt');
	} else if(busRouteTy == 14) { // 광역급행형시내버스 -> 일반좌석버스로 설정
		$('.busRouteDetail > .popup-header label').addClass('blueBusNumb');
		$('.busRouteDetail > .popup-header input').addClass('blueBusTxt');
	} else if(busRouteTy == 41 || busRouteTy == 42 || busRouteTy == 43) { // 시외버스 -> 따복버스로 설정
		$('.busRouteDetail > .popup-header label').addClass('pinkBusNumb');
		$('.busRouteDetail > .popup-header input').adsssdClass('pinkBusTxt');
	} else if(busRouteTy == 51 || busRouteTy == 52 || busRouteTy == 53) { // 공항버스 -> 굿모닝글자버스로 설정
		$('.busRouteDetail > .popup-header label').addClass('goodmBusNumb');
		$('.busRouteDetail > .popup-header input').addClass('goodmBusTxt');
	} else {
		$('.busRouteDetail > .popup-header label').addClass('nomalBusNumb');
		$('.busRouteDetail > .popup-header input').addClass('nomalBusTxt');
	}
});

function cancelbusRouteDetail() {
	ui.closeSubPopup();							// 창 닫기
	dtmap.vector.clearSelect();					// 선택 해제
	dtmap.vector.removeFeatureById('ol_uid');	// 정류소 지우기
	TFCANALS.Ax5UiGrid.clearSelect();			// 그리드 선택 해제
}

// 경유정류소 그리기
function drawCrdnt(xCrdnt, yCrdnt, sttnNm) {
	dtmap.vector.removeFeatureById('ol_uid');
	
	var x = parseFloat(xCrdnt);
	var y = parseFloat(yCrdnt);
	
	// 중심점 이동 및 zoom 설정
	var point = new ol.geom.Point([x, y]);
	if (dtmap.mod == "2D") {
		var tranPoint = point.transform("EPSG:4326", "EPSG:5179");
		var options = {
			zoom : 20
		}
		
		dtmap.setCenter(tranPoint.getCoordinates(), options);
	} else if (dtmap.mod == "3D") {
		var center = point.flatCoordinates;
		center.push(parseFloat(500));	// 고도 추가(zoom 역할)
		
		dtmap.setCenter(center);
	}
	
	const styleOptions = {
		label: {
			text: sttnNm
		},
		marker: {
			src: '/images/map/busSt_02_ico.png'
		},
		zIndex: 9999
	};
	
	dtmap.vector.addPoint({
		id: 'ol_uid',
		coordinates: [x, y],
		crs: 'EPSG:4326',
		style: styleOptions
	})
}
</script>

<!-- 업무 > 교통분석 > 버스노선정보 > 버스노선 상세보기 -->
<div class="busRouteDetail">
	<div class="popup-header">
		<label for="dataBusNumb" class="nomalBusNumb"><c:out value="${busRouteVO.route_ty_nm}"/></label>
		<input type="text" id="dataBusNumb" class="nomalBustxt" value="<c:out value="${busRouteVO.route_nm}"/>" readonly>
	</div>
	<div class="popup-body">
		<div class="sub-popup-body">
			<div class="data-list-wrap">
				<div class="data-default bus">
					<div class="data-detail">
						<ul>
							<li>
								<label for="cdpntSttn">기점 정류소</label>
								<input type="text" id="cdpntSttn" value="${busRouteVO.cdpnt_sttn_nm} (${busRouteVO.cdpnt_sttn_no})" readonly="readonly">
								<div>
									<div>
										<small>첫차</small>
										<span>${busRouteVO.cdpnt_fircar_time}</span>
									</div>
									<div>
										<small>막차</small>
										<span>${busRouteVO.cdpnt_ltcar_time}</span>
									</div>
								</div>
							</li>
							<li>
								<label for="tmnlSttn">종점 정류소</label>
								<input type="text" id="tmnlSttn" value="${busRouteVO.tmnl_sttn_nm} (${busRouteVO.tmnl_sttn_no})" readonly="readonly">
								<div>
									<div>
										<small>첫차</small>
										<span>${busRouteVO.tmnl_fircar_time}</span>
									</div>
									<div>
										<small>막차</small>
										<span>${busRouteVO.tmnl_ltcar_time}</span>
									</div>
								</div>
							</li>
							<li>
								<label for="caralcTime">배차 시간</label>
								<input type="text" id="caralcTime" value="${busRouteVO.mumm_caralc_time}분 ~ ${busRouteVO.mxmm_caralc_time}분" readonly="readonly">
							</li>
						</ul>
					</div>
				</div>
				<div class="scroll-y">
					<div class="data-default bus">
						<ol>
							<c:forEach items="${thrghSttnList}" var="thrghSttn" varStatus="status">
								<li>
									<a href="javascript:drawCrdnt('<c:out value="${thrghSttn.xCrdnt}" />', '<c:out value="${thrghSttn.yCrdnt}" />', '<c:out value="${thrghSttn.sttnNm}" />')" data-popup="busRouteDetail">
										<span class="routeIcon"></span>
										<span class="routeInfo">
											<label for="routeSt${status.index}" class="sttnNm">${thrghSttn.sttnNm}</label>
											<input type="text" id="routeSt${status.index}" class="sttnNo" value="${thrghSttn.sttnNo}" readonly="readonly">
										</span>
									</a>
								</li>
							</c:forEach>
						</ol>
					</div>
				</div>
				<div class="position-bottom btn-wrap">
					<div>
						<button type="button" class="btn type01" onclick="cancelbusRouteDetail();">닫기</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<button type="button" class="sub-popup-close" title="닫기" onClick="cancelbusRouteDetail()"></button>
</div>
<!-- //업무 > 교통분석 > 버스노선정보 > 버스노선 상세보기 end -->