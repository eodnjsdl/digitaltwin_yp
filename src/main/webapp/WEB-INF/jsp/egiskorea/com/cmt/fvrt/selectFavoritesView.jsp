<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script>
    // 즐겨찾기 목록조회
    $(".btn-wrap .bi-list").on("click", function(){
        $(this).addClass("active");
        //rightPopupOpen('favorites');
        aj_selectFavoritesList($("#updateFormFavorites")[0], "");
    });

    // 즐겨찾기 수정
    $(".btn-wrap .bi-edit").on("click", function(){
    	if (app2D) {
        	aj_updateFavoritesView(null,$("#updateFormFavorites")[0]);
    	} else {
    		alert("해당 기능은 2D에서 가능합니다.");
    	}
    });
    // 즐겨찾기 삭제
    $(".btn-wrap .bi-delete").on("click", function(){
        aj_deleteFavoritesView('<c:out value="${result.bkmkId}" />');
    });


</script>
<!-- top > 즐겨찾기 -->
<div class="popup-header">즐겨찾기</div>
<div class="popup-body">
    <div class="tool-popup-body">
        <form:form name="updateFormFavorites" id="updateFormFavorites" method="post" onsubmit="updateFormFavorites(); return false;">
            <input type="hidden" name="emplyrId" value="<c:out value='${emplyrId}' />">
            <input type="hidden" name="bkmkId" id="bkmkId" value="<c:out value="${result.bkmkId}" />">
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">
        </form:form>
            <h3 class="cont-tit">즐겨찾기</h3>

            <div class="bbs-write-default">
                <table class="bbs-write">
                    <colgroup>
                        <col style="width: 18%;">
                        <col style="width: auto;">
                        <col style="width: 18%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td colspan="3"><c:out value="${result.bkmkNm}" /></td>
                    </tr>
                    <tr>
                        <th scope="row">등록일</th>
                        <td><c:out value="${result.regDt}" /></td>
                        <th scope="row">수정일</th>
                        <td><c:out value="${result.modfDt}" /></td>
                    </tr>
                    <tr>
                        <th scope="row">기본화면</th>
                        <td colspan="3">
                                <span class="form-checkbox text">
                                    <span><input type="checkbox" name="ch_bass" id="bass" ${result.bass == "y" ? "CHECKED" : ""} disabled><label for="bass">기본화면으로 저장</label></span>
                                </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div class="cont" style="height: 500px;">
                                <div class="btn-wrap justify-content-end marT0 marB5">
                                </div>
                                <div class="bookmark-basic"><img src="data:image:jpg;base64,<c:out value="${imgSrc}" />" alt=""></div>
                                <div class="marT10">
                                    <ul>
                                        <li><span class="">중심위치 : </span> <c:out value="${result.xcord}" />, <c:out value="${result.ycord}" /></li>
                                        <li><span class="">레벨 : </span> <c:out value="${result.cchLevel}" /></li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="position-bottom btn-wrap">
                <div class="position-absolute "><button type="button" class="btn basic bi-list">목록</button></div>
                <div class="position-absolute right"><button type="button" class="btn basic bi-edit">수정</button> <button type="button" class="btn basic bi-delete">삭제</button></div>
            </div>

    </div>


</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('즐겨찾기')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 즐겨찾기 -->