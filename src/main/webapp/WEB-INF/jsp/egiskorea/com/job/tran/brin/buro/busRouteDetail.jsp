<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<style>
.sttn-list-wrap {
	position: relative;
	margin-top: 15px;
 	height: 260px;
	border-top: 2px solid #44516A;
}

.sttn-list > li {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #C8D0DE;
}

.sttn-list > li:hover, .sttn-list > li.active {
	background-color: #F3F4F5;
}

.sttn-list > li > a {
	width: 100%;
	height: 100%;
	padding: 10px;
}

.sttn-list > li .sttnNm {
	color: #44516A;
	font-weight: 500;
	line-height: 1;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.sttn-list > li .sttnId {
	color: #44516A;
	font-size: 11px;
}
</style>

<script>
$(document).ready(function(){
	//console.log("busRouteDetail.jsp");
});

function cancelbusRouteDetail() {
	ui.closeSubPopup();							// 창 닫기
	dtmap.vector.clearSelect();					// 선택 해제
	dtmap.vector.removeFeatureById('ol_uid');	// 정류소 지우기
	FACILITY.Ax5UiGrid.clearSelect();			// 그리드 선택 해제
}

function drawCrdnt(xCrdnt, yCrdnt, sttnNm) {
	var x = parseFloat(xCrdnt);
	var y = parseFloat(yCrdnt);

	const styleOptions = {
		label: {
			text: sttnNm,
			fontSize: 14,
			fontFamily: 'sans-serif',
			textAlign: 'center'
		},
		marker: {
			src: 'data:image/png;base64,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'
		}
	};
	
	dtmap.vector.removeFeatureById('ol_uid');
	
	dtmap.vector.addPoint({
		id: 'ol_uid',
		coordinates: [x, y],
		crs: 'EPSG:4326',
		style: styleOptions
	})
	
	// 중심점 이동 및 zoom 설정
	// zoom 복구
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
<div class="popup-header"><c:out value="${busRouteVO.route_ty_nm}"/> (<c:out value="${busRouteVO.route_nm}"/>)</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-list-wrap" style="height: 100%;">
			<div>
				<div class="data-default">
					<table class="data-detail">
						<colgroup>
							<col style="width: 23%;">
							<col style="width: auto;">
							<col style="width: 23%;">
							<col style="width: auto;">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">기점정류소명</th>
								<td><c:out value="${busRouteVO.cdpnt_sttn_nm}"/></td>
								<th scope="row">기점정류소번호</th>
								<td><c:out value="${busRouteVO.cdpnt_sttn_no}"/></td>
							</tr>
							<tr>
								<th scope="row">종점정류소명</th>
								<td><c:out value="${busRouteVO.tmnl_sttn_nm}"/></td>
								<th scope="row">종점정류소번호</th>
								<td><c:out value="${busRouteVO.tmnl_sttn_no}"/></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="sttn-list-wrap scroll-y">
					<ul class="sttn-list">
						<c:forEach items="${thrghSttnList}" var="result" varStatus="status">
							<li>
								<a href="javascript:drawCrdnt('<c:out value="${result.xCrdnt}" />', '<c:out value="${result.yCrdnt}" />', '<c:out value="${result.sttnNm}" />')" data-popup="sttn-detail">
									<span class="sttnNm">${result.sttnNm}</span>
									<span class="sttnId">${result.sttnId}</span>
								</a>
							</li>
						</c:forEach>
					</ul>
				</div>
			</div>
			<div class="position-bottom btn-wrap justify-content-end">
				<div>
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="cancelbusRouteDetail();">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="sub-popup-close" title="닫기" onClick="cancelbusRouteDetail()"></button>
<!-- //업무 > 교통분석 > 버스노선정보 > 버스노선 상세보기 end -->