<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<style type="text/css">
	.popup-panel.popup-sub .phy-popup-close {
	    top: 0;
	    right: 0;
	    width: 39px;
	    height: 39px;
	    border-left: 1px solid #44516A;
	    background: url(/images/icon/popup-close2.svg) no-repeat 50% 50%;
	    border-top-right-radius: 10px;
	    position: absolute;
	}
</style>

<script>
$(".scroll-y").mCustomScrollbar({
	scrollbarPosition: "outside"
});

//체육시설 시설정보 목록 페이징
function test(pageNo) {
	var gid = $('#gid').val();
	phyFaciMngViewPaging(pageNo, gid);
}

//geom 값 넣기
function phyMapClick() {
	dtmap.draw.active({type: 'Point', once: true});
	dtmap.draw.setBuffer(0);	// 공간검색으로 인한 범위 변경
	
	dtmap.on('drawend', phyEduFaciGeom);
}

function phyEduFaciGeom(e) {
	dtmap.draw.dispose();
	var geom = e.geometry;
	const position = geom.getFlatCoordinates();
	var xObj = parseFloat(position[0]);
	var yObj = parseFloat(position[1]);
	
	cmmUtil.reverseGeocoding(xObj, yObj).done((result) => {
		//$("input[name=asstn_fclty_nm]").val('경기도 양평군 ' + result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([xObj, yObj]);
		const wkt = format.writeGeometry(point);
		$("#phyFaciMng input[name=geom]").val(wkt);
	});
}
</script>

<!-- 업무 > 시설관리 > 체육시설 > 상세보기 > 시설정보 관리 -->
<div class="popup-header">체육시설 > 시설정보 관리</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="">
				<div class="data-default">
					<form id="phyFaciMngFrm" method="post">
						<table id="phyFaciMng" class="data-write">
							<colgroup>
								<col style="width: 23%;">
								<col style="width: auto;">
								<col style="width: 23%;">
								<col style="width: auto;">
							</colgroup>
							<tbody>
								<tr>
									<th scope="row">시설명</th>
									<td colspan="3">
										<input type="text" class="form-control" id="asstn_fclty_nm" name="asstn_fclty_nm" style="width: 74%;margin-right: 2px;">
										<input type="hidden"  name="geom" id="geom" style="width: 74%;margin-right: 2px;">
										<input type="hidden" name="gid" id="gid" value="${gid}">
										<button type="button" class="btn type01 bi-location btn-select-map" id="" onclick="phyMapClick();">지도에서 선택</button>
									</td>
								</tr>
								<tr>
									<th scope="row">운영시간</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col-auto">
												<select name="oper_strt_time" id="oper_strt_time" class="form-select">
													<option value="00:00">00 시</option>
													<option value="01:00">01 시</option>
													<option value="02:00">02 시</option>
													<option value="03:00">03 시</option>
													<option value="04:00">04 시</option>
													<option value="05:00">05 시</option>
													<option value="06:00">06 시</option>
													<option value="07:00">07 시</option>
													<option value="08:00">08 시</option>
													<option value="09:00">09 시</option>
													<option value="10:00">10 시</option>
													<option value="11:00">11 시</option>
													<option value="12:00">12 시</option>
													<option value="13:00">13 시</option>
													<option value="14:00">14 시</option>
													<option value="15:00">15 시</option>
													<option value="16:00">16 시</option>
													<option value="17:00">17 시</option>
													<option value="18:00">18 시</option>
													<option value="19:00">19 시</option>
													<option value="20:00">20 시</option>
													<option value="21:00">21 시</option>
													<option value="22:00">22 시</option>
													<option value="23:00">23 시</option>
												</select>
											</div>
											<div class="col-auto">~</div>
											<div class="col-auto">
												<select name="oper_end_time" id="oper_end_time" class="form-select">
													<option value="00:00">00 시</option>
													<option value="01:00">01 시</option>
													<option value="02:00">02 시</option>
													<option value="03:00">03 시</option>
													<option value="04:00">04 시</option>
													<option value="05:00">05 시</option>
													<option value="06:00">06 시</option>
													<option value="07:00">07 시</option>
													<option value="08:00">08 시</option>
													<option value="09:00">09 시</option>
													<option value="10:00">10 시</option>
													<option value="11:00">11 시</option>
													<option value="12:00">12 시</option>
													<option value="13:00">13 시</option>
													<option value="14:00">14 시</option>
													<option value="15:00">15 시</option>
													<option value="16:00">16 시</option>
													<option value="17:00">17 시</option>
													<option value="18:00">18 시</option>
													<option value="19:00">19 시</option>
													<option value="20:00">20 시</option>
													<option value="21:00">21 시</option>
													<option value="22:00">22 시</option>
													<option value="23:00">23 시</option>
												</select>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">예약가능여부</th>
									<td>
										<span class="form-radio text group">
											<span><input type="radio" name="rsrv_at" id="rsrv_at_y" value="Y" checked="checked"><label for="rsrv_at_y">Y</label></span>
											<span><input type="radio" name="rsrv_at" id="rsrv_at_n" value="N"><label for="rsrv_at_n">N</label></span>
										</span>
									</td>
									<th scope="row">층(호)수</th>
									<td><input type="text" class="form-control" id="ho_cnt" name="ho_cnt" value="1"></td>
								</tr>
								<tr>
									<th scope="row">시설설명</th>
									<td colspan="3"><input type="text" class="form-control" id="fclty_dc" name="fclty_dc"></td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div class="data-list-wrap marT10" style="height: 169px;">
					<div class="data-default" style="height: 80%">
						<table class="data-list tbl-all-center">
							<colgroup>
								<col style="width: 36px;">
								<col style="width: 7%;">
								<col style="width: 15%;">											
								<col style="width: 15%;">
								<col style="width: 13%;">
								<col style="width: 13%;">
								<col style="width: auto;">
							</colgroup>
							<thead>
								<tr>
									<th scope="col"><span class="form-checkbox"><span><input type="checkbox" name="sporFacChkAll" id="sporFacChkAll" value="sporFacChkAll"><label for="sporFacChkAll"></label></span></span></th>
									<th scope="col">No</th>
									<th scope="col">시설명</th>
									<th scope="col">운영시간</th>
									<th scope="col">예약가능여부</th>
									<th scope="col">층(호)수</th>
									<th scope="col">시설설명</th>
								</tr>
							</thead>												
						</table>
						<div class="scroll-y" style="overflow: auto;">
							<table class="data-list tbl-all-center">
								<colgroup>
									<col style="width: 36px;">
									<col style="width: 7%;">
									<col style="width: 15%;">											
									<col style="width: 15%;">
									<col style="width: 13%;">
									<col style="width: 13%;">
									<col style="width: auto;">
								</colgroup>
								<tbody>
									<c:forEach items="${sportsList}" var="sporList" varStatus="status">
										<tr>
											<td><span class="form-checkbox"><span><input type="checkbox" name="sporFacMngcheck" id="${sporList.asstnFcltySn}" value ="${sporList.asstnFcltySn}"><label for="${sporList.asstnFcltySn}"></label></span></span></td>
											<td><c:out value="${sporList.asstnFcltySn}"></c:out></td>
											<td><c:out value="${sporList.asstnFcltyNm}"></c:out></td>
											<td><c:out value="${sporList.operStrtTime}~${sporList.operEndTime}"></c:out></td>
											<td><c:out value="${sporList.rsrvAt}"></c:out></td>
											<td><c:out value="${sporList.hoCnt}층"></c:out></td>
											<td><c:out value="${sporList.fcltyDc}"></c:out></td>
										</tr>
									</c:forEach>
									<c:if test="${fn:length(sportsList) == 0}">
										<tr>
											<td class="noData" colspan="7">데이터가 없습니다.</td>
										</tr>
									</c:if>
								</tbody>
							</table>
						</div>
					</div>
						<input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${SportsVO.pageIndex}' />">
						<input type="hidden" name="gid" id="gid" value="<c:out value='${gid}' />">
						<div class="pagination">
							<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="test"/>
						</div>
				</div>					
			</div>
			<div class="position-bottom btn-wrap">
				<div class="position-absolute left"><button type="button" class="btn basic bi-delete2" onclick="deletePhyFaciMng();">선택삭제</button></div>
				<div>
					<button type="button" class="btn basic bi-write2" onclick="insertPhyFaciMng(${gid});">등록</button>
					<button type="button" class="btn basic bi-cancel" onclick="selectPhyEduFaciDetail(${gid});">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기"></button> -->
<button type="button" class="phy-popup-close" title="닫기" onclick="selectPhyEduFaciDetail(${gid});"></button>
<!-- 업무 > 시설관리 > 체육시설 > 상세보기 > 시설정보 관리 end -->