<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script>
$(document).ready(function(){
	//console.log("busRouteDetail.jsp");
	
	$('.work-03-01-regist > .popup-header label').removeClass();
	$('.work-03-01-regist > .popup-header input').removeClass();
		
	var busRouteTy = '<c:out value="${busRouteVO.route_ty}"/>';
	//console.log(busRouteTy);
	
	if (busRouteTy == 13 || busRouteTy == 21 || busRouteTy == 22 || busRouteTy == 23) {
		$('.work-03-01-regist > .popup-header label').addClass('greenBusNumb');
		$('.work-03-01-regist > .popup-header input').addClass('greentxt');
	} else if(busRouteTy == 12) {
		$('.work-03-01-regist > .popup-header label').addClass('blueBusNumb');
		$('.work-03-01-regist > .popup-header input').addClass('bluetxt');
	} else if(busRouteTy == 11 || busRouteTy == 16) {
		$('.work-03-01-regist > .popup-header label').addClass('redBusNumb');
		$('.work-03-01-regist > .popup-header input').addClass('redtxt');
	} else if(busRouteTy == 15) {
		$('.work-03-01-regist > .popup-header label').addClass('pinkBusNumb');
		$('.work-03-01-regist > .popup-header input').addClass('pinktxt');
	} else if(busRouteTy == 30) {
		$('.work-03-01-regist > .popup-header label').addClass('yellowBusNumb');
		$('.work-03-01-regist > .popup-header input').addClass('yellowtxt');
	} else if(busRouteTy == 14) { // 광역급행형시내버스 -> 일반좌석버스로 설정
		$('.work-03-01-regist > .popup-header label').addClass('blueBusNumb');
		$('.work-03-01-regist > .popup-header input').addClass('bluetxt');
	} else if(busRouteTy == 41 || busRouteTy == 42 || busRouteTy == 43) { // 시외버스 -> 따복버스로 설정
		$('.work-03-01-regist > .popup-header label').addClass('pinkBusNumb');
		$('.work-03-01-regist > .popup-header input').addClass('pinktxt');
	} else if(busRouteTy == 51 || busRouteTy == 52 || busRouteTy == 53) { // 공항버스 -> 굿모닝글자버스로 설정
		$('.work-03-01-regist > .popup-header label').addClass('goodmBusNumb');
		$('.work-03-01-regist > .popup-header input').addClass('goodmtxt');
	} else {
		$('.work-03-01-regist > .popup-header label').addClass('nomalBusNumb');
		$('.work-03-01-regist > .popup-header input').addClass('nomaltxt');
	}
});

function cancelbusRouteDetail() {
	ui.closeSubPopup();							// 창 닫기
	dtmap.vector.clearSelect();					// 선택 해제
	dtmap.vector.removeFeatureById('ol_uid');	// 정류소 지우기
	FACILITY.Ax5UiGrid.clearSelect();			// 그리드 선택 해제
}

// 경유정류소 그리기
function drawCrdnt(xCrdnt, yCrdnt, sttnNm) {
	var x = parseFloat(xCrdnt);
	var y = parseFloat(yCrdnt);

	const styleOptions = {
		label: {
			text: sttnNm
		},
		marker: {
			src: '/images/map/busSt_02_ico.png'
		},
		zIndex: 9999
	};
	
	dtmap.vector.removeFeatureById('ol_uid');
	
	dtmap.vector.addPoint({
		id: 'ol_uid',
		coordinates: [x, y],
		crs: 'EPSG:4326',
		style: styleOptions
	})
	
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
		center.push(100);	// 고도 추가(zoom 역할)
		
		dtmap.setCenter(center);
	}
}
</script>

<!-- 업무 > 교통분석 > 버스노선정보 > 버스노선 상세보기 -->
<div class="work-03-01-regist">
	<div class="popup-header">
		<label for="dataBusNumb" class="nomalBusNumb"><c:out value="${busRouteVO.route_ty_nm}"/></label>
		<input type="text" id="dataBusNumb" class="nomaltxt" value="<c:out value="${busRouteVO.route_nm}"/>" readonly>
	</div>
	<div class="popup-body">
		<div class="sub-popup-body">
			<div class="data-write-wrap" style="height: 100%;">
				<div class="data-default bus">
					<div class="data-write">
						<ul>
							<li>
								<label for="cdpntSttnNm">기점 정류소명</label>
								<input type="text" id="cdpntSttnNm" value="${busRouteVO.cdpnt_sttn_nm}" readonly="readonly">
							</li>
							<li>
								<label for="tmnlSttnNm">종점 정류소명</label>
								<input type="text" id="tmnlSttnNm" value="${busRouteVO.tmnl_sttn_nm}" readonly="readonly">
							</li>
							<li>
								<label for="cdpntSttnNo">기점 정류소 번호</label>
								<input type="text" id="cdpntSttnNo" class="readNo" value="${busRouteVO.cdpnt_sttn_no}" readonly="readonly">
							</li>
							<li>
								<label for="tmnlSttnNo">종점 정류소 번호</label>
								<input type="text" id="tmnlSttnNo" class="readNo" value="${busRouteVO.tmnl_sttn_no}" readonly="readonly">
							</li>
						</ul>
					</div>
				</div>
				<div class="scroll-y">
					<div class="data-default bus">
						<ol>
							<c:forEach items="${thrghSttnList}" var="thrghSttn" varStatus="status">
								<li>
									<a href="javascript:drawCrdnt('<c:out value="${thrghSttn.xCrdnt}" />', '<c:out value="${thrghSttn.yCrdnt}" />', '<c:out value="${thrghSttn.sttnNm}" />')" data-popup="work-03-01-detail">
										<span class="route_ico"></span>
										<span class="route_info">
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