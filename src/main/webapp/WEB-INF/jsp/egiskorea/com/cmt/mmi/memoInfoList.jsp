<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script>

    $(document).ready(function () {
        eventBindByMemoInfoList();
        initLayerByMemoInfoList();
    });

    function eventBindByMemoInfoList() {
        // 메모정보 등록페이지 이동
        $(".top-memo-body .bi-write").off("click").on("click", function () {
            $(this).addClass("active");
            // rightPopupOpen('insertMemoInfo', $("#searchFormMemo")[0]);
            ui.openPopup("rightPopup");
            aj_insertMemoInfoView($("#searchFormMemo")[0]);
        });
        dtmap.off('select');
        dtmap.on('select', selectMemoPoi);
       
        // 전체선택/전체해제
        $(".memo_check_all").on("change", function () {
            const node = $(this);
            if (node.is(":checked")) {
                $(".bbs-list .memo_check:not(:checked)").trigger("click");
            } else {
                $(".bbs-list .memo_check:checked").trigger("click");
            }
        });
       
    }

    // 메모정보 목록 조회
    function fn_select_memo_list() {
        document.searchFormMemo.pageIndex.value = 1;
        aj_selectMemoInfoList($("#searchFormMemo")[0], "");
    }

    // 메모정보 목록 페이지이동
    function fn_select_memo_linkPage(pageNo) {
        document.searchFormMemo.pageIndex.value = pageNo;
        aj_selectMemoInfoList($("#searchFormMemo")[0], "");
    }

    //메모정보 상세조회
    function selectMemoInfoView(id) {
        //rightPopupOpen('selectMemoInfoView');
        aj_selectMemoInfoView(id, $("#searchFormMemo")[0]);
    }

    // 정렬(제목순, 최신순)
    function doOpenCheck(chk) {
        var obj = document.getElementsByName("searchList");
        for (var i = 0; i < obj.length; i++) {
            if (obj[i] != chk) {
                obj[i].checked = false;
            }
        }
    }

    function initLayerByMemoInfoList() {
        const ids = [];
        const wkts = [];
        const sj = [];
        <c:forEach  items="${resultList}" var="item">
        ids.push("${item.memoId}");
        wkts.push("${item.wkt}");
        sj.push("${item.sj}");
        </c:forEach>
        const reader = new ol.format.WKT();
        const features = [];
        wkts.forEach((wkt, index) => {
            if (wkt) {
                const feature = new ol.Feature(reader.readGeometry(wkt));
                feature.setId(ids[index]);
                feature.setProperties({"sj": sj[index]});
                features.push(feature);
            }
        });
        if (features.length > 0) {
            const format = new ol.format.GeoJSON();
            const geojson = format.writeFeatures(features);
            dtmap.draw.clear();
            dtmap.draw.dispose();
            dtmap.vector.clear();
            //지도에 GeoJSON 추가
            dtmap.vector.readGeoJson(geojson, function (feature) {
                return {
                    marker: {
                        src: '/images/poi/memo_poi.png'
                    },
                    label: {
                        text: feature.get("sj")
                    }
                }
            });
        }
    }


    function selectMemoPoi(event) {
        if (event) {
            var id = event.id; //피쳐 아이디
            if(id){
                dtmap.vector.select(id);
                selectMemoInfoView(id);
            }
        } else {
            toastr.warning("현재 화면에 검색영역이 존재하지 않습니다.");
        }

    }
  
    //체크 메모 일괄공유/일괄공유안함 처리
    function selectMemoShare(isShare) {
    	//console.log("selectMemoShare(isShare)");
    	//console.log(isShare);
    	
    	//체크된 데이터 확인
    	var selectMemoIdArray = new Array();
    	$(".bbs-list .memo_check").each(function(index) {
    		
    		if($(this).is(":checked")){
    			
	    		let selectMemoId =  $(this).data('memo-id');
	    		if(selectMemoId){
	    			selectMemoIdArray.push(selectMemoId);
	    		}
    		}
		});
    	
    	//console.log(selectMemoIdArray.length);
    	if(selectMemoIdArray.length == 0){
    		alert("선택된 데이터가 없습니다");
    		return false;
    	}
		
    	//console.log(selectMemoIdArray);
    	
    	if(isShare){
    		//console.log("일괄공유");
    		pnrsAt = "Y";
    	}else{
    		//console.log("일괄공유안함");
    		pnrsAt = "N";
    	}
    	
    	ui.loadingBar("side");
    	
    	$.ajax({
    		type : "POST",
    		url : "/cmt/mmi/updateMemoPnrsAtBundle.do",
    		data : {
    			 "pnrsAt"      			: pnrsAt, 
                 "updateMemoIdArray" 	: selectMemoIdArray   
    		},
    		dataType : "json",
    		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    		async: false,
    		success : function(returnData, status){
    	
    			if(status == "success") {
    				console.log("--success--");
    			    aj_selectMemoInfoList($("#searchFormMemo")[0], "");
    			}else{
    				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
    				return;
    			}
    		}, complete : function(){
    			ui.loadingBar("hide");
    		}
    	}); 
	}

</script>
<!-- top > 메모정보 -->
<div class="popup-header">메모정보</div>
<div class="popup-body memo-list">
    <div class="tool-popup-body top-memo-body">
        <form:form name="searchFormMemo" id="searchFormMemo" method="post"
                   onsubmit="fn_select_memo_list(); return false;">
            <div class="srch-box">
                <input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
                <div class="form-row">
                    <div class="col-auto">
                        <select class="form-select" name="searchCnd">
                            <option value="0" <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if>>제목
                            </option>
                            <option value="1" <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if>>작성자
                            </option>
                        </select>
                    </div>
                    <div class="col"><input type="text" name="searchWrd" class="form-control"
                                            value="<c:out value="${searchVO.searchWrd}"/>"></div>
                    <div class="col-auto">
                        <button type="submit" class="btn type01 search">조회</button>
                    </div>
                </div>
            </div>

            <div class="btn-wrap justify-content-end">
                <div>
                    <button type="button" class="btn bi-write">등록</button>
                </div>
            </div>

            <div class="bbs-top marT10">
                <div class="bbs-list-num">조회결과 : <strong><c:out value="${resultCnt}"/></strong>건</div>
                <div class="list-sort">
						<span class="form-radio text group">
							<span><input type="radio" name="sortKind" id="memoOrder1" value="0"
                                         <c:if test="${searchVO.sortKind == '0'}">checked</c:if>/> <label
                                    for="memoOrder1">제목순</label></span>
							<span><input type="radio" name="sortKind" id="memoOrder2" value="1"
                                         <c:if test="${searchVO.sortKind == '1'}">checked</c:if>/> <label
                                    for="memoOrder2">최신순</label></span>
						</span>
                </div>
            </div>
        </form:form>
        <div class="bbs-list-wrap" style="height: 586px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
            <div class="bbs-default">
                <div class="bbs-list-head">
                    <table class="bbs-list">
                        <colgroup>
                            <%-- <col style="width: 13%;"> --%>
                            <col style="width: 6%;">
                            <col style="width: 10%;">
                            <col style="width: auto;">
                            <col style="width: 20%;">
                            <col style="width: 20%;">
                            <col style="width: 15%;">
                        </colgroup>
                        <thead>
                        <tr>
                        	<th scope="col">
                                <span class="form-checkbox">
                                	<span>
                                		<input type="checkbox" name="check_all" id="memo_check_all" class="memo_check_all">
	                                 	<label for="memo_check_all"></label>
	                                 </span>
                                 </span>
                            </th>
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
                            <%-- <col style="width: 13%;"> --%>
                            <col style="width: 6%;">
                            <col style="width: 10%;">
                            <col style="width: auto;">
                            <col style="width: 20%;">
                            <col style="width: 20%;">
                            <col style="width: 15%;">
                        </colgroup>
                        <tbody>
                        <c:forEach items="${resultList}" var="result" varStatus="status">
                            <tr onclick="javascript:selectMemoInfoView('<c:out value="${result.memoId}"/>');">
                            	<td class="td-checkbox" onclick="event.stopPropagation()">
                                    <span class="form-checkbox">
                                    	<span>
                                    		<c:if test="${memoInfoVO.emplyrId == result.emplyrId }">
	                                    		<input type="checkbox" class="memo_check" id="memo_check_<c:out value="${result.memoId}" />" data-memo-id="<c:out value="${result.memoId}" />">
                                    		</c:if>
                                    		<c:if test="${memoInfoVO.emplyrId != result.emplyrId }">
	                                    		<input type="checkbox" class="memo_check" id="memo_check_<c:out value="${result.memoId}" />" data-memo-id="<c:out value="${result.memoId}" />" disabled="disabled" >
                                    		</c:if>
                                    		<label for="memo_check_<c:out value="${result.memoId}" />"></label>
                                    	</span>
                                    </span>
                                </td>
                                <td><c:out value="${(result.pageIndex-1) * result.pageUnit + status.count}"/></td>
                                <td class="subject align-left"><a><c:out value="${result.sj}"/></a></td>
                                <td><c:out value="${result.userNm}"/></td>
                                <td><c:out value="${result.regDt}"/></td>  <%-- <td><c:out value="${result.modfDt}"/></td> --%>
                                <td><c:if test="${result.pnrsAt == 'Y'}">공유</c:if><c:if
                                        test="${result.pnrsAt == 'N'}">공유안함</c:if></td>
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
                
                <!-- 메모 일괄 공유 추가  -->
                <div>
                	<button type="button" class="btn type01 search" onclick="selectMemoShare(true); return false;">일괄공유</button>
                	<button type="button" class="btn type01 search" onclick="selectMemoShare(false); return false;">일괄공유안함</button>
                </div>
                <!-- 메모 일괄 공유 추가  end -->
                
            </div>

            <div class="pagination">
                <ui:pagination paginationInfo="${paginationInfo}" type="pagination"
                               jsFunction="fn_select_memo_linkPage"/>
            </div>
        </div>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('메모정보')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 메모정보 -->