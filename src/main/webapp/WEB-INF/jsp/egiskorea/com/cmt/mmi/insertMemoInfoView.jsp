<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<script>
// 메모정보 목록조회
$(".btn-wrap .bi-cancel").on("click", function(){
        $(this).addClass("active");
//         rightPopupOpen('memoInfo');
        aj_selectMemoInfoList($("#insertFormMemo")[0]);
        
});
// 메모정보 등록
$(".btn-wrap .bi-edit").on("click", function(){
    aj_insertMemoInfo($("#insertFormMemo")[0]);
});

//지도에서 선택
$(".top-memo-body .bi-location").on("click", aj_selectMemoLocation);

</script>

<!-- top > 메모정보 > 등록  -->
    <div class="popup-header">메모정보</div>
    <div class="popup-body">
        
        <div class="tool-popup-body top-memo-body">	
            <form:form name="insertFormMemo" id="insertFormMemo" method="post" onsubmit="insertFormMemo(); return false;">	
                <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
                <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
                <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
                <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">
            
            <h3 class="cont-tit">메모 등록하기</h3>
            <div class="bbs-write-default">
                <table class="bbs-write">
                    <colgroup>
                        <col style="width: 20%;">
                        <col style="width: 30%;">
                        <col style="width: 20%;">
                        <col style="width: 30%;">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">제목</th>
                            <td colspan="3"><input type="text" class="form-control" name="sj"></td>
                        </tr>
                        <tr>
                            <th scope="row">작성자</th>
                            <td colspan="3"><c:out value="${emplyrId}" /></td>
                        </tr>
                        <tr>
                            <th scope="row">공유</th>
                            <td colspan="3">
                                <span class="form-radio text group">
                                    <span><input type="radio" name="pnrsAt" id="share1-1" checked="" value="0"><label for="share1-1">공유함</label></span>
                                    <span><input type="radio" name="pnrsAt" id="share1-2" value="1"><label for="share1-2">공유안함</label></span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">위치</th>
                            <td colspan="3"><input type="text" class="form-control w-70p" id="loc_memo" readonly> <button type="button" class="btn type01 bi-location">지도에서 선택</button></td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <div class="cont">
                                    <textarea name="memoCn" id="" class="form-control" style="height: 395px;"></textarea>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="position-bottom btn-wrap">
                <div><button type="button" class="btn basic bi-edit">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
            </div>
                <input type="hidden" id="wkt" name="wkt">
            </form:form>		
        </div>
    </div>
    <button type="button" class="manualBtn" title="도움말" onclick="manualTab('메모정보')"></button>
    <button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 메모정보 > 등록  -->