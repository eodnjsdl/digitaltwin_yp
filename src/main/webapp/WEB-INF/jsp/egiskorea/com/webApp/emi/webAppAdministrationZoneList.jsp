<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!-- webApp -->
<script src="/js/egiskorea/com/geo/emi/examinationInfo.js"></script>
<!-- webApp -->

<script>
    $(document).ready(function () {
        eventBindByLandInfoList();
        //tabBox > 1depth
        $(document).on("click", ".tabBoxDepth1-wrap .tabBoxDepth1 > ul > li > .inner-tab", function(){
            $(this).each(function(){
                $(this).parent().addClass("on").siblings().removeClass("on");
                $("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
            });
        });
    });

    function eventBindByLandInfoList() {
        // 새로고침
        $(".lnb-territory .lnb-resetBtn").unbind('click').bind('click', function () {
            webApp_selectAdministrationZoneList($("#tmpForm")[0])
        });
    }

    function fn_select_all_list() {
        $(".territory-list li").each(function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active")
            }
        });
        dtmap.clear();
    }

    function fn_select_list() {
        document.searchForm.pageIndex.value = 1;
        webApp_selectAdministrationZoneList($("#searchForm")[0]);
    }

    function fn_select_linkPage(pageNo) {
        document.searchForm.pageIndex.value = pageNo;
        webApp_selectAdministrationZoneList($("#searchForm")[0]);
    }

    function fn_delete_administrationZone(txt, dataSeq) {
        if (confirm(txt + "를 삭제하시겠습니까?")) {
            $.ajax({
                type: "POST",
                url: "/geo/emi/deleteAdministrationZone.do",
                data: {
                    "dataSeq": dataSeq
                },
                dataType: "html",
                success: function (returnData, status) {
                    if (status == "success") {
                        if (!removeLine(returnData) == "ok") {
                            alert(txt + "를 삭제하였습니다.");
                            webApp_selectAdministrationZoneList($("#searchForm")[0]);
                        } else {
                            alert("삭제에 실패했습니다.");
                        }
                    } else {
                        toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                        return;
                    }
                }
            });
        }
    }


</script>
<!-- 국토정보관리 -->
<div class="lnb-header"><h2 class="tit">국토정보관리 웹앱용</h2></div>
<div class="lnb-body">
    <div class="btn-wrap">
<!--         <button type="button" id="insertAdministrationZoneView" class="btn bi-write leftPopup"
                data-popup="territory-Regist" onclick="aj_insertAdministrationZoneView()">등록
        </button> -->
    </div>
    <div class="bbs-top">
        <form:form name="searchForm" id="searchForm" method="post" onsubmit="fn_select_list(); return false;">
            <input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
            <div>
                <select name="code1" class="form-select" onChange="fn_select_list();">
                    <option value="">전체</option>
                    <c:forEach items="${code1List}" var="result" varStatus="status">
                        <option value="<c:out value="${result.code}" />"
                                <c:if test="${searchVO.code1 eq result.code}">selected="selected"</c:if>><c:out
                                value="${result.codeNm}"/></option>
                    </c:forEach>
                </select>
            </div>
        </form:form>
        <div>
            <button type="button" class="btn basic bi-all" onClick="fn_select_all_list()">전체 보기</button>
        </div>
    </div>
        <div class="column-titles">
	        <ul class="territory-list territory-list-titles" >
		        <li id="result-title" class="result-container">
			        <a class="result-container">
						<span class="title">
						  <span class="title-tit">조사데이터</span>
						</span>
						<span class="title">
						  <span class="title-writer">작성자</span>
						</span>
						<span class="title">
						  <span class="title-date">최초생성일</span>
						</span>
			        </a>
                    <div class="title-delete">
                    	<span></span>
                    </div>
				<li>
			</ul>
	    </div>
    <div class="territory-list-wrap" style="border-top: 0px">
        <ul class="territory-list">
            <c:forEach items="${resultList}" var="result" varStatus="status">
                <li><a href="javascript:webApp_clickTerritory('<c:out value="${result.code2}" />','1')" data-popup="territory-detail" class="result-container">
					  <span class="result">
					    <span class="result-tit"><c:out value="${result.code1Nm}"/> <c:out value="${result.code2Nm}"/></span>
					  </span>
					  <span class="result">
					    <span class="result-writer"><c:out value="${result.userNm}"/></span>
					  </span>
					  <span class="result">
					    <span class="result-date"><c:out value="${result.frstRegistPnttm}"/></span>
					  </span>
					</a>
                    <div class="result-delete">
                        <button type="button" class="icon-btn delete" title="삭제"
                                onClick="fn_delete_administrationZone('<c:out value="${result.code1Nm}" /> <c:out value="${result.code2Nm}" /> 조사데이터','<c:out value="${result.dataSeq}" />')"></button>
                    </div>
                </li>
            </c:forEach>
            <c:if test="${fn:length(resultList) == 0}">
                <li>
                    <spring:message code="common.nodata.msg"/>
                </li>
            </c:if>
        </ul>
        <div class="pagination">
            <ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="fn_select_linkPage"/>
        </div>
    </div>
</div>
<div class="lnb-util">
    <button type="button" class="lnb-resetBtn" title="초기화"></button>
    <button type="button" class="lnb-close" title="닫기"></button>
</div>
<script>
    function webApp_clickTerritory(p1, p2) {
    	webApp_selectExaminationInfoList($("#tmpForm")[0], p1, p2);
    }
    $(document).ready(function () {
        $(".lnb-territory .bi-write").click(function () {
            $(this).addClass("active");
        });

        $(".territory-list a").click(function () {
            $(this).parent().addClass("active").siblings().removeClass("active");
        });
    });
</script>
<!-- //국토정보관리 -->