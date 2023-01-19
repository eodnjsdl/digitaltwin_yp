<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/egiskorea/com/job/fcrm/fcrm.js"></script>
<script>
// 시설예약관리 단일삭제
function fn_select_delete(gid, rsrvSn){
	
	if(confirm("<spring:message code="common.delete.msg" />")){
		$.ajax({
			type : "POST",
			url: "/job/fcrm/deleteFaciReseMng.do",
			data : { "gid" : gid, "rsrvSn" : rsrvSn },
			dataType : "json",
			success : function(returnData, status){
				if(returnData.result == "success") {
					alert("<spring:message code="success.common.delete" />");
					aj_selectFaciReseMngList($("#searchForm")[0]);
				}else{
					alert("<spring:message code="fail.common.delete" />");
					return;
				}
			}, complete : function(){
			}
		});
	}
}

// 시설예약관리 수정페이지 열기
function fn_select_update(gid, rsrvSn){
	aj_updateFaciReseMngView(gid, rsrvSn);
}
</script>                            
    <div class="data-write-wrap">
        <div class="scroll-y">
            <p class="cont-tit">예약시설 정보</p>
            <div class="data-default">
                <table class="data-detail">
                    <colgroup>
                        <col style="width: 32%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">시설명</th>
                            <td><c:out value="${result.fcltyDc}" /></td>
                        </tr>
                        <tr>
                            <th scope="row">예약시설</th>
                            <td><c:out value="${result.asstnFcltyNm}" /></td>
                        </tr>
                        <tr>
                            <th scope="row">운영시간</th>
                            <td><c:out value="${result.operStrtTime}" /> ~ <c:out value="${result.operEndTime}" /></td>
                        </tr>
                        <tr>
                            <th scope="row">예약가능여부</th>
                            <td>
                            	<c:if test="${result.rsrvAt == 'N'}">
                            		<c:out value="가능" />
                            	</c:if>
                            	<c:if test="${result.rsrvAt == 'Y'}">
                            		<c:out value="불가능" />
                            	</c:if>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">층(호)수</th>
                            <td><c:out value="${result.hoCnt}" />층</td>
                        </tr>
                        <tr>
                            <th scope="row">시설설명</th>
                            <td><c:out value="${result.fcltyDc}" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p class="cont-tit">예약 정보</p>
            <div class="data-default">
                <table class="data-write">
                    <colgroup>
                        <col style="width: 32%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">예약일</th>
                            <td><c:out value="${result.rsrvDe}" /></td>
                        </tr>
                        <tr>
                            <th scope="row">예약시간</th>
                            <td><c:out value="${result.rsrvStrtTm}" /> ~ <c:out value="${result.rsrvEndTm}" /></td>
                        </tr>
                        <tr>
                            <th scope="row">예약자</th>
                            <td><c:out value="${result.rsvctmNm}" /></td>
                        </tr>
                        <tr>
                            <th scope="row">연락처</th>
                            <td><c:out value="${result.rsvctmCttpc}" /></td>
                        </tr>
                        <tr>
                            <th scope="row">비용</th>
                            <td><c:out value="${result.useCt}" />원</td>
                        </tr>
                        <tr>
                            <th scope="row">비고</th>
                            <td><c:out value="${result.rm}" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="position-bottom btn-wrap justify-content-end">
        	<div>
                <input type="hidden" id="fcrmDtl" data-rsrvsn='<c:out value="${result.rsrvSn}" />'/>
	        	<button type="button" class="btn basic bi-edit" onClick="fn_select_update('<c:out value="${result.gid}" />','<c:out value="${result.rsrvSn}" />')">수정</button>
				<button type="button" class="btn basic bi-delete2" onclick="fn_select_delete('<c:out value="${result.gid}" />', '<c:out value="${result.rsrvSn}" />')">삭제</button>
	            <button type="button" class="btn basic bi-cancel" id="faciListBtn">취소</button>
        	</div>
        </div>
    </div>
