<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script>
// 사진정보 목록 조회
function fn_select_poto_list(){
	document.searchFormPoto.pageIndex.value = 1;
	aj_selectPotoInfoList($("#searchFormPoto")[0], "");
}
// 사진정보 목록 페이지이동
function fn_select_poto_linkPage(pageNo){
	document.searchFormPoto.pageIndex.value = pageNo;
	aj_selectPotoInfoList($("#searchFormPoto")[0], "");
}
// 사진정보 등록페이지 이동
$(".tool-popup-body .bi-write").on("click", function(){
		$(this).addClass("active");
		rightPopupOpen('insertPotoInfo', $("#searchFormPoto")[0]);
});
//사진정보 상세조회
function selectPotoInfoView(id){
	//rightPopupOpen('selectPotoInfoView');
	aj_selectPotoInfoView(id,$("#searchFormPoto")[0]);
}

$(function() {
	if(app2D){
        const ids = [];
		const wkts = [];
	    <c:forEach  items="${resultList}" var="item">
		    ids.push("${item.phtoId}");
		    wkts.push("${item.wkt}");
	    </c:forEach>
	    const reader = new ol.format.WKT();
	    const features = [];
	    wkts.forEach((wkt, index) => {
	        if(wkt) {
                const feature = new ol.Feature(reader.readGeometry(wkt));
                feature.setId(ids[index]);
                features.push(feature);
	        }
	    });
	    if(features.length > 0) {
	        const format = new ol.format.GeoJSON();
	        const geojson = format.writeFeatures(features);
	        cmmUtil.highlightFeatures(geojson, "/images/poi/poto_poi.png", { onClick: function(feature) {
	        	selectPotoInfoView(feature.getId());
            }});
	    }
	}else{
	var list  = ${gsonResultList};
		
		var layerList = new Module.JSLayerList(true);
		var Layer = layerList.createLayer("POI_img", Module.ELT_3DPOINT);
		for(var i=0; i<list.length; i++){
			if(list[i].wkt){
				var pointX = parseFloat(list[i].wkt.split(" ")[0].split("(")[1])		
				var pointY = parseFloat(list[i].wkt.split(" ")[1].split(")")[0])
				//5179 -> 4326
			 	var position = TransformCoordinate(pointX, pointY, 26, 13);
				
				var alt = Module.getMap().getTerrHeightFast(position.x,position.y);	
				
				createImagePoi(position.x,position.y, alt,"/images/poi/poto_poi.png",i,Layer)
				GLOBAL.layerBox = "POI_img"
			}
			
		}
	}
   
});


</script>
<!-- top > 사진정보 -->
<div class="popup-header">사진정보</div>
<div class="popup-body">
    <form:form name="searchFormPoto" id="searchFormPoto" method="post" onsubmit="fn_select_poto_list(); return false;">	
        <input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
    <div class="tool-popup-body">						
        <div class="srch-box">
            <form action="">
                <div class="form-row">
                    <div class="col-auto">
                        <select class="form-select" name="searchCnd">
                            <option value="0" <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if>>제목</option>
                            <option value="1" <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if>>작성자</option>
                        </select>
                    </div>
                    <div class="col"><input type="text" name="searchWrd" class="form-control" value="<c:out value="${searchVO.searchWrd}"/>"></div>
                    <div class="col-auto"><button type="submit" class="btn type01 search">조회</button></div>
                </div>
            </form>
        </div>

        <div class="btn-wrap justify-content-end">
            <div><button type="button" class="btn bi-write">등록</button></div>
        </div>

        <div class="bbs-top marT10">
            <div class="bbs-list-num">조회결과 : <strong><c:out value="${resultCnt}" /></strong>건</div>
            <div class="list-sort">
                <span class="form-radio text group">
                    <span><input type="radio" name="sortKind" id="rChk3-1" checked value="0" <c:if test="${searchVO.sortKind == '0'}">checked</c:if>><label for="rChk3-1">제목순</label></span>
                    <span><input type="radio" name="sortKind" id="rChk3-2" value="1"  <c:if test="${searchVO.sortKind == '1'}">checked</c:if>><label for="rChk3-2">최신순</label></span>
                </span>
            </div>
        </div>
        </form:form>
        <div class="bbs-list-wrap" style="height: 586px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
            <div class="bbs-default">
                <div class="bbs-list-head">
                    <table class="bbs-list">
                        <colgroup>
                            <col style="width: 13%;">
                            <col style="width: auto;">
                            <col style="width: 20%;">
                            <col style="width: 20%;">
                            <col style="width: 15%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">제목</th>
                                <th scope="col">작성자</th>
                                <th scope="col">등록일</th>
                                <th scope="col">공유</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="scroll-y">
                    <table class="bbs-list">
                        <colgroup>
                            <col style="width: 13%;">
                            <col style="width: auto;">
                            <col style="width: 20%;">
                            <col style="width: 20%;">
                            <col style="width: 15%;">							
                        </colgroup>
                        <tbody>
                            <c:forEach items="${resultList}" var="result" varStatus="status">
									<tr>
										<td><c:out value="${(result.pageIndex-1) * result.pageUnit + status.count}"/></td>
										<td class="subject align-left"><a href="javascript:selectPotoInfoView('<c:out value="${result.phtoId}" />');"><c:out value="${result.sj}" /></a></td>
										<td><c:out value="${result.userNm}" /></td>
										<td><c:out value="${result.regDt}" /></td>
										<td><c:if test="${result.pnrsAt == '0'}">공유</c:if><c:if test="${result.pnrsAt == '1'}">공유안함</c:if></td>
									</tr>
                            </c:forEach>
                            <c:if test="${fn:length(resultList) == 0}">
                                <tr>
                                    <td class="noData" colspan="5">데이터가 없습니다.</td>
                                </tr>
                            </c:if>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="pagination">
                <ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="fn_select_poto_linkPage"/>
            </div>
        </div>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('사진정보')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 사진정보 -->