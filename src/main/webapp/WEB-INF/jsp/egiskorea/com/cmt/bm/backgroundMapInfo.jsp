<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="egis" uri="http://www.egiskorea.com/jsp/egis" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
/**
 * @file Name : backgroundMapInfo.jsp
 * @Description : 배경지도 팝업 페이지
 * @Modification Information
 * @
 * @  수정일                         수정자                  수정내용
 * @ -------        --------    ---------------------------
 * @ 2022.03.07      이준호                  최초생성
 *
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.03.07
 * @version 1.0
 *
 */
%>

<div class="popup-header">배경지도</div>
<div class="popup-body">
    <div class="tool-popup-body tool-bgMap-body">
        <div class="scroll-y">
            <%--@elvariable id="comDefaultCodeVO" type="egovframework.com.cmm.ComDefaultCodeVO"--%>
            <c:set var="bgCount" value="1"/>
            <c:forEach var="comDefaultCodeVO" items="${bmCodeList}" varStatus="bmStatus">
                <p class="cont-tit marT0">${comDefaultCodeVO.codeNm}</p>
                <div class="mapBgType-group">
                    <c:set target="${mapServiceVO}" property="bmCode" value="${comDefaultCodeVO.code}"/>
                    <c:set var="mapServiceList" value="${bgMapInfoSvc.selectBackgroundMapInfoList(mapServiceVO)}"/>
                    <c:choose>
                        <c:when test="${fn:length(mapServiceList) > 0}">
                            <ul class="mapBgType-list">
                                <%--@elvariable id="mapServiceVO" type="egiskorea.com.mngr.sver.service.MapServiceVO"--%>
                                <c:forEach items="${mapServiceList}" var="mapServiceVO" varStatus="mapStatus">
                                    <fmt:formatNumber var="count" minIntegerDigits="2" value="${bgCount}" type="number"/>
                                    <li>
                                        <input type="radio" name="mapBgType" class="mapBgType" id="mapBgType${count}" value="<c:out value='${mapServiceVO.serviceId}'/>" data-service_url="<c:out value='${mapServiceVO.serviceUrl}'/>" data-bm_code="<c:out value='${mapServiceVO.bmCode}'/>">
                                        <label for="mapBgType${count}">
                                            <div class="img">
                                                <c:choose>
                                                    <c:when test="${not empty mapServiceVO.streFileNm && not empty mapServiceVO.originalFileNm}"><%--디비에 파일이름이 존재할 경우--%>
                                                        <c:choose>
                                                            <c:when test="${egis:isFile(mapServiceVO.streFileNm)}"><%--실제로 파일이 존재할 경우--%>
                                                                <img src="<c:url value='/com/cmm/image.do'/>?attach=<c:out value='${egis:encrypt(mapServiceVO.streFileNm)}'/>" alt="${mapServiceVO.originalFileNm}">
                                                            </c:when>
                                                            <c:otherwise><%--이미지가 없을 경우 기본이미지 출력--%>
                                                                <img src="<c:url value='/images/common/img_noimg.png'/>" alt="기본 이미지"/>
                                                            </c:otherwise>
                                                        </c:choose>
                                                    </c:when>
                                                    <c:otherwise><%--이미지가 등록되지 않았을 경우 기본이미지 출력--%>
                                                        <img src="<c:url value='/images/common/img_noimg.png'/>" alt="기본 이미지"/>
                                                    </c:otherwise>
                                                </c:choose>
                                            </div>
                                            <p class="text"><c:out value="${mapServiceVO.serviceNm}"/></p>
                                        </label>
                                    </li>
                                    <c:set var="bgCount" value="${bgCount + 1}"/>
                                </c:forEach>
                            </ul>
                        </c:when>
                        <c:otherwise>
                            등록된 배경지도가 없습니다.
                        </c:otherwise>
                    </c:choose>
                </div>
            </c:forEach>
            <%--
            <p class="cont-tit">항공사진</p>
            <div class="mapBgType-group">
                <ul class="mapBgType-list">
                    <li><input type="radio" name="mapBgType" id="mapBgType03"><label for="mapBgType03"><div class="img"><img src="/images/etc/mapBg-img02.jpg" alt=""></div><p class="text">2021</p></label></li>
                    <li><input type="radio" name="mapBgType" id="mapBgType04"><label for="mapBgType04"><div class="img"><img src="/images/etc/mapBg-img02.jpg" alt=""></div><p class="text">2020</p></label></li>
                    <li><input type="radio" name="mapBgType" id="mapBgType05"><label for="mapBgType05"><div class="img"><img src="/images/etc/mapBg-img02.jpg" alt=""></div><p class="text">2019</p></label></li>
                    <li><input type="radio" name="mapBgType" id="mapBgType06"><label for="mapBgType06"><div class="img"><img src="/images/etc/mapBg-img02.jpg" alt=""></div><p class="text">2018</p></label></li>
                    <li><input type="radio" name="mapBgType" id="mapBgType07"><label for="mapBgType07"><div class="img"><img src="/images/etc/mapBg-img02.jpg" alt=""></div><p class="text">2011</p></label></li>
                    <li><input type="radio" name="mapBgType" id="mapBgType08"><label for="mapBgType08"><div class="img"><img src="/images/etc/mapBg-img02.jpg" alt=""></div><p class="text">2016</p></label></li>
                </ul>
            </div>
            <p class="cont-tit">주제도</p>
            <div class="mapBgType-group">
                <ul class="mapBgType-list">
                    <li><input type="radio" name="mapBgType" id="mapBgType09"><label for="mapBgType03"><div class="img"><img src="/images/etc/mapBg-img03.jpg" alt=""></div><p class="text">지적도</p></label></li>
                </ul>
            </div>
            --%>
        </div>
        <div class="position-bottom btn-wrap">
            <div><button type="button" class="btn basic bi-check" id="bg-apply">적용</button></div>
        </div>
    </div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('배경지도')"></button>
<button type="button" id="bg-popup-close" class="popup-close" title="닫기"></button>

<script>
/**
 * @description 배경지도 현재 배경지도 타입에 선택되게 해주는 함수.
 * @Author 플랫폼개발부문 DT솔루션 이준호
 * @Date 2022.03.14
 */
function mapBgTypeCheckedInit() {
    var $mapBgType = $('.mapBgType');
    $mapBgType.each(function(index, item) {
        var value = item.value;
        if (value.includes(m_bgType)) {
            item.checked = true;
        } else {
            item.checked = false;
        }
    });
}
$(function(){
    //Module.SetPlanetImageryType(0); //배경지도 초기화
    mapBgTypeCheckedInit();
});
</script>