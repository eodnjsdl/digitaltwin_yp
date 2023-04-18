<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
$(document).ready(function(){
	console.log("roadSectListView.jsp");
		
	// 교통시설 메뉴 - 이벤트
	var $container = $("#container");
    var $target = $container.find('#bottomPopup .facility-select');
	
	$target.on('change', function() {
		getTransportationFacility(this.value);
	});
	
	selectTunnelWithFilters();
});
</script>

<!-- 업무 > 시설관리 > 교통시설 > 터널 -->
<div class="popup-header">교통시설</div>
<div class="popup-body trfc">
	<div class="bottom-popup-body bottom-popup-group">						
		<!-- 검색영역 -->
		<div class="items search-area">
			<div class="top-search">
				<select name="selectBoxTrfc" id="selectBoxTrfc" class="form-select facility-select">
					<option value="roadSection">도로구간</option>
					<option value="railRoadTrack">철도선로</option>
					<option value="railRoadStation">철도역사</option>
					<option value="subwayTrack">지하철선로</option>
					<option value="subwayStation">지하철역사</option>
					<option value="bridge">교량</option>
					<option value="overpass">고가도로</option>
					<option value="tunnel" selected>터널</option>
				</select>
			</div>
			<div class="tabBoxDepth2-wrap">
                <div class="tabBoxDepth2">
					<ul>
						<li data-tab="waterProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
						<li data-tab="waterSpace"><button type="button" class="inner-tab">공간검색</button></li>
					</ul>
				</div>
				<div class="tab-cont waterProperty on tunnl">
					<div class="srch-default">
						<table class="srch-tbl">
							<colgroup>
								<col style="width: 30%;">
								<col style="width: auto;">
							</colgroup>
							<tbody id="lSrchOptions">
								<tr>
									<th scope="row">읍면동</th>
									<td>
										<select name="emdKorNm" id="emdKorNm" class="form-select">
											<option value="41830">전체</option>
											<c:forEach items="${sccoEndList}" var="emdList" varStatus="status">
												<option value="<c:out value='${emdList.emdCd}' />" <c:if test="${searchVO.emdKorNm == emdList.emdCd}">selected</c:if>>
													<c:out value="${emdList.emdKorNm}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" class="form-control" id="tunKorNm" name="tunKorNm" placeholder="터널명"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn-wrap">
						<div><button type="submit" class="btn type01 search">조회</button></div>
					</div>
				</div>
				<div class="tab-cont waterSpace">
					<div class="space-search-group">
						<div class="space-search-items">
							<span class="form-radio text group">
								<span><input type="radio" name="trfcSelect" id="rChk1-1" checked="checked" value="1"><label for="rChk1-1">현재화면영역</label></span>
								<span><input type="radio" name="trfcSelect" id="rChk1-2" value="2"><label for="rChk1-2">사용자 정의</label></span>
							</span>
						</div>
						<div class="space-search-items areaSrchTool">
							<span class="drawing-obj small">
								<span><input type="radio" name="trfcAreaDrawing" id="aChk1" value="1"><label for="aChk1" class="obj-sm01"></label></span>
								<span><input type="radio" name="trfcAreaDrawing" id="aChk2" value="2"><label for="aChk2" class="obj-sm02"></label></span>
								<span><input type="radio" name="trfcAreaDrawing" id="aChk3" value="3"><label for="aChk3" class="obj-sm03"></label></span>
								<span><input type="radio" name="trfcAreaDrawing" id="aChk4" value="4"><label for="aChk4" class="obj-sm04"></label></span>
							</span>
						</div>
						<div class="space-search-items areaSrchTool">경계로부터 <span class="form-group"><input type="text" onkeyup = "this.value=this.value.replace(/[^-0-9]/g,'');" class="form-control align-center" name="bufferCnt" id="bufferCnt" value="0" placeholder="0"> <sub>m</sub></span> 이내 범위</div>
					</div>
					<div class="btn-wrap">
						<div><button type="submit" class="btn type01 search">조회</button></div>
					</div>
				</div>
			</div>
		</div>
		<!-- //검색영역 -->
		<div class="items data-area">
            <div class="bbs-top">
                <div class="bbs-list-num">조회결과 : <strong></strong>건</div>
                <div>
					<button type="button" class="btn basic bi-excel trfcExcelDownload" id="selectRoadSectionExcelList">엑셀저장</button>
				</div>
            </div>
            <div class="bbs-list-wrap" style="height: 267px;">
                <div class="bbs-default">
                <form:form>
                	<div data-ax5grid="tunnelListGrid" data-ax5grid-config="{}" style="height: 267px;"></div> 
                </form:form>
                </div>
            </div>
        </div>
	</div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('교통시설')"></button>
<button type="button" class="popup-close" title="닫기" onclick="removeLayer()"></button>
<button type="button" class="popup-reset" class="초기화" onclick="getTransportationFacility('tunnel')"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>				
<!-- //업무 > 시설관리 > 교통시설 > 터널 -->