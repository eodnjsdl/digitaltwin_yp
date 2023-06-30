<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!-- webApp -->
<script src="/js/egiskorea/com/common.js"></script>
<script src="/js/map-ui.js"></script>
<!-- webApp -->

<script>
	$(document).ready(function() {
		var ldstcPhotoAtflId = "<c:out value='${result.ldstcPhotoAtflId}'/>";
		var accdPhotoAtflId = "<c:out value='${result.accdPhotoAtflId}'/>";
		
		if (ldstcPhotoAtflId != "") {
			$("#ldstcPhoto").attr("src", "<c:url value='/cmm/fms/getImage.do'/>?atchFileId=<c:out value='${result.ldstcPhotoAtflId}'/>");
		}
		if (accdPhotoAtflId != "") {
			$("#accdPhoto").attr("src", "<c:url value='/cmm/fms/getImage.do'/>?atchFileId=<c:out value='${result.accdPhotoAtflId}'/>");
		}
	})

    // 속성정보에서 수정 클릭시
    function webApp_fn_select_update(pnu) {
        webApp_leftSubPopupOpen("examinationInfoView", pnu);
    }
    
    // 속성정보에서 삭제 클릭시
    function webApp_fn_select_delete(orgFid) {
        if (confirm("<spring:message code="common.delete.msg" />")) {
            $.ajax({
                type: "POST",
                url: "/webApp/emi/deleteExaminationInfoList.do",
                data: {
                    "selCodes"	: orgFid
                },
                dataType: "html",
                success: function (returnData, status) {
                    if (status == "success") {
                        if (removeLine(returnData) == "ok") {
                            toastr.success("<spring:message code="success.common.delete" />");
                            ui.closeSubPopup();
                            dtmap.vector.clear();
                            
                            if ($('#leftPopup').html() != "") {
                        		webApp_clickTerritory("<c:out value='${result.pnu.substring(0, 10)} '/>");
                        	}
                        } else {
                            toastr.success("<spring:message code="fail.common.delete" />");
                        }
                    } else {
                        toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                        return;
                    }
                }
            });
        }
    }
    
    // 속성정보 팝업 닫기
    function webApp_cancel_examinationInfo() {
    	$("#leftSubPopup").removeClass("opened").empty();

    	if ($('#leftPopup').html() != "") {
    		webApp_clickTerritory("<c:out value='${result.pnu.substring(0, 10)} '/>");
    	}
    }
</script>
<!-- 국토정보관리 > 속성정보 > 더보기 -->
<form:form name="detailForm" method="post">
    <input type="hidden" name="pnu">
    <div class="popup-header">속성정보</div>
    <div class="popup-body">
        <div class="sub-popup-body territory-info-body">
            <h3 class="cont-tit">기본정보</h3>
            <div class="data-default">
                <table class="data-write">
                    <colgroup>
                        <col style="width: 17%;">
                        <col style="width: auto;">
                        <col style="width: 17%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">지번</th>
                        <td><c:out value="${result.addr} "/></td>
                        <th scope="row">최종변경일자</th>
                        <td><c:out value="${result.updateDate} "/></td>
                    </tr>
                    <tr>
	                    <th scope="row">조사자(정)</th>
                        <td><c:out value="${result.main}"/></td>
                        <th scope="row">원지목</th>
                        <td><c:out value="${result.ori}"/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="tabBoxDepth1-wrap" style="height: calc(100% - 160px);">
                <div class="tabBoxDepth1">
                    <ul>
                        <li data-tab="proTab01" class="on">
                            <button type="button" class="inner-tab">지목조사</button>
                        </li>
                        <li data-tab="proTab02">
                            <button type="button" class="inner-tab">공통항목</button>
                        </li>
                        <li data-tab="proTab03">
                            <button type="button" class="inner-tab">토지특성</button>
                        </li>
                        <li data-tab="proTab04">
                            <button type="button" class="inner-tab">주택특성</button>
                        </li>
                        <li data-tab="proTab05">
                            <button type="button" class="inner-tab">토지피복</button>
                        </li>
                        <li data-tab="proTab06">
                            <button type="button" class="inner-tab">사진</button>
                        </li>
                    </ul>
                </div>
                <!-- 지목조사 -->
                <div class="tab-cont proTab01 on">
                    <div class="scroll-y">
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">지목일치여부</th>
                                    <td><c:out value="${result.j0100}"/></td>
                                    <th scope="row">현실지목 대분류</th>
                                    <td><c:out value="${result.j0301}"/></td>
                                </tr>
                                <tr>
                                    <th scope="row">재설정 지목</th>
                                    <td><c:out value="${result.j0200}"/></td>
                                    <th scope="row">현실지목 소분류</th>
                                    <td><c:out value="${result.j0302}"/></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="row">
                            <div class="col-6">
                                <h4 class="cont-stit">토지용도</h4>
                                <div class="data-default">
                                    <table class="data-write">
                                        <colgroup>
                                            <col style="width: 35%;">
                                            <col style="width: auto;">
                                        </colgroup>
                                        <tbody>
                                        <tr>
                                            <th scope="row">용도1</th>
                                            <td><c:out value="${result.j0401}"/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">용도1(%)</th>
                                            <td><c:out value="${result.j0401p}"/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">용도2</th>
                                            <td><c:out value="${result.j0402}"/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">용도2(%)</th>
                                            <td><c:out value="${result.j0402p}"/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">용도3</th>
                                            <td><c:out value="${result.j0403}"/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">용도3(%)</th>
                                            <td><c:out value="${result.j0403p}"/></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-6">
                                <h4 class="cont-stit">건물용도</h4>
                                <div class="data-default">
                                    <table class="data-write">
                                        <colgroup>
                                            <col style="width: 35%;">
                                            <col style="width: auto;">
                                        </colgroup>
                                        <tbody>
                                        <tr>
                                            <th scope="row">용도1</th>
                                            <td><c:out value="${result.j0501}"/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">용도1(%)</th>
                                            <td><c:out value="${result.j0501p}"/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">용도2</th>
                                            <td><c:out value="${result.j0502}"/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">용도2(%)</th>
                                            <td><c:out value="${result.j0502p}"/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">용도3</th>
                                            <td><c:out value="${result.j0503}"/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">용도3(%)</th>
                                            <td><c:out value="${result.j0503p}"/></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <h4 class="cont-stit">국공유지</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">국공유지</th>
                                    <td><c:out value="${result.g0100}"/></td>
                                    <th scope="row">유지무단</th>
                                    <td><c:out value="${result.g0101}"/></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">조사자 의견</h4>
                        <div>
                        	<textarea name="opinion" class="form-control" readonly><c:out value="${result.opinion}"/></textarea>
                        </div>
                    </div>
                </div>
                <!-- //지목조사 -->
                <!-- 공통항목 -->
                <div class="tab-cont proTab02">
                    <div class="scroll-y">
                        <h4 class="cont-stit marT0">공적규제</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">용도지역</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.c0100p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.c0100n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.c0100c}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">용도지구</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.c0200p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.c0200n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.c0200c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">기타제한<br>-<br>기타<br>(제주도)</th>
                                    <td class="align-top">
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.c0301n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">기타</div>
                                            <div class="col"><c:out value="${result.c0301e}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">기타제한<br>-<br>도시계획<br>신설</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.c0302p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.c0302n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.c0302c}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">기타</div>
                                            <div class="col"><c:out value="${result.c0302e}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">지형지세</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">고저</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.c0401p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.c0401n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.c0401c}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">형상</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.c0402p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.c0402n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.c0402c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">방위</th>
                                    <td colspan="3">
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.c0403p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.c0403n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.c0403c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">도로조건</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">도로접면</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.c0500p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.c0500n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.c0500c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">유해시설 접근성</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">철도, 고속도로등</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.c0601p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.c0601n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.c0601c}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">폐기물, 수질오염</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.c0602p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.c0602n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.c0602c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- //공통항목 -->
                <!-- 토지특성 -->
                <div class="tab-cont proTab03">
                    <div class="scroll-y">
                        <h4 class="cont-stit marT0">공적규제</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">기타제한</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.l0100p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.l0100n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.l0100c}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">기타</div>
                                            <div class="col"><c:out value="${result.l0100e}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">토지이용상황</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">대분류</th>
                                    <td class="align-top">
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.l0201p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.l0201n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.l0201c}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">소분류</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.l0202p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.l0202n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.l0202c}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">기타</div>
                                            <div class="col"><c:out value="${result.l0202e}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">농지</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">구분</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.l0301p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.l0301n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.l0301c}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">비옥도</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.l0302p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.l0302n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.l0302c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">경지정리</th>
                                    <td colspan="3">
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.l0303p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.l0303n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.l0303c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">임야</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">임야</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.l0400p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.l0400n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.l0400c}"/></div>
                                        </div>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">도로조건</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">도로거리</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.l0500p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.l0500n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.l0500c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">대규모 개발사업</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">사업방식</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.l0601p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.l0601n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.l0601c}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">사업단계</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.l0602p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.l0602n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.l0602c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- //토지특성 -->
                <!-- 주택특성 -->
                <div class="tab-cont proTab04">
                    <div class="scroll-y">
                        <h4 class="cont-stit marT0">공적규제</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">기타제한</th>
                                    <td class="align-top">
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b0101p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b0101n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b0101c}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">개발사업 지역구분</th>
                                    <td class="align-top">
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b0102p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b0102n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b0102c}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">기타</div>
                                            <div class="col"><c:out value="${result.b0102e}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">토지이용상황</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">대분류</th>
                                    <td class="align-top">
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b0201p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b0201n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b0201c}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">소분류</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b0202p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b0202n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b0202c}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">기타</div>
                                            <div class="col"><c:out value="${result.b0202e}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">지형지세</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">토지용도구분</th>
                                    <td colspan="3">
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b0300p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b0300n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b0300c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">건물구조</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b0400p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b0400n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b0400c}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">기타</div>
                                            <div class="col"><c:out value="${result.b0400e}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">건물지붕</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b0500p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b0500n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b0500c}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">기타</div>
                                            <div class="col"><c:out value="${result.b0500e}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">건물용도</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">대분류</th>
                                    <td class="align-top">
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b0601p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b0601n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b0601c}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">소분류</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b0602p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b0602n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b0602c}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">기타</div>
                                            <div class="col"><c:out value="${result.b0602e}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 class="cont-stit">주택특성</h4>
                        <div class="data-default">
                            <table class="data-write">
                                <colgroup>
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">중개축</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b0700p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b0700n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b0700c}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">리모델링</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b0800p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b0800n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b0800c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">특수<br>부대시설</th>
                                    <td class="align-top">
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b0900p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b0900n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b0900c}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">기타</div>
                                            <div class="col"><c:out value="${result.b0900e}"/></div>
                                        </div>
                                    </td>
                                    <th scope="row">주택유형<br>구분</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b1000p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b1000n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b1000c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">공가<br>주택구분</th>
                                    <td colspan="3">
                                        <div class="form-row">
                                            <div class="col-auto tit">이전</div>
                                            <div class="col"><c:out value="${result.b1100p}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">현재</div>
                                            <div class="col"><c:out value="${result.b1100n}"/></div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-auto tit">변경</div>
                                            <div class="col"><c:out value="${result.b1100c}"/></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- //주택특성 -->
                <!-- 토지피복 -->
                <div class="tab-cont proTab05">
                    <div class="data-default">
                        <table class="data-write">
                            <colgroup>
                                <col style="width: 17%;">
                                <col style="width: auto;">
                                <col style="width: 17%;">
                                <col style="width: auto;">
                            </colgroup>
                            <tbody>
                            <tr>
                                <th scope="row">전<br>(시설재배지)</th>
                                <td><c:out value="${result.t0100}"/></td>
                                <th scope="row">기타재배지<br>(원예)</th>
                                <td><c:out value="${result.t0200}"/></td>
                            </tr>
                            <tr>
                                <th scope="row">산림지역<br>(활엽)</th>
                                <td><c:out value="${result.t0300}"/></td>
                                <th scope="row">초지<br>(자연,인공)</th>
                                <td><c:out value="${result.t0400}"/></td>
                            </tr>
                            <tr>
                                <th scope="row">습지<br>(내륙,연안)</th>
                                <td><c:out value="${result.t0500}"/></td>
                                <th scope="row">나지<br>(자연,기타)</th>
                                <td><c:out value="${result.t0600}"/></td>
                            </tr>
                            <tr>
                                <th scope="row">수역(해양수)</th>
                                <td colspan="3"><c:out value="${result.t0700}"/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
	            <!-- //토지피복 -->
	            <!-- 사진 -->
	            <div class="tab-cont proTab06">
		            <div class="scroll-y">
	                    <div class="data-default">
	                        <table class="data-write">
	                            <tbody>
	                            <tr>
	                                <th scope="row">원경</th>
	                            </tr>
	                            <tr>
	                                <td>
	                                	<div class="detailPhoto">
	                                		<img src="" id="ldstcPhoto" width="500 "/>
	                                	</div>
	                                </td>
	                            </tr>
	                            <tr>
	                                <th scope="row">근경</th>
	                            </tr>
	                            <tr>
	                                <td>
	                                	<div class="detailPhoto">
	                                		<img src="" id="accdPhoto" width="500 "/>
	                                	</div>
	                                </td>
	                            </tr>
	                            </tbody>
	                        </table>
	                    </div>
                    </div>
                </div>
                <!-- //사진 -->
            </div>
            <div>
            	<button type="button" class="btn basic bi-excel" style="text-align: left; margin: 0 3px;"
					onClick="webApp_fn_download_excelData(this.form,'<c:out value="${result.pnu}" />')">엑셀저장
                </button>
            	<button type="button" class="btn basic bi-delete2" style="float: right; margin: 0 3px;"
					onClick="webApp_fn_select_delete('<c:out value="${result.orgFid}" />')">삭제
            	</button>
                <button type="button" class="btn basic bi-edit" style="float: right; margin: 0 3px;"
					onClick="webApp_fn_select_update('<c:out value="${result.pnu}" />')">수정
                </button>
            </div>
        </div>
    </div>
    <button type="button" class="webAppExaminationInfo-popup-close" title="닫기" onclick="webApp_cancel_examinationInfo();"></button>
</form:form>
<!-- //국토정보관리 > 속성정보 > 더보기 -->