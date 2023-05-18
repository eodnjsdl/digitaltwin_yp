<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<script>


</script>

<div class="popup-header">레이어 정보</div>
<div class="popup-body">
    <div class="left-popup-body">
        <form id="layerInfoForm" name="layerInfoForm">
            <input type="hidden" name="lyrDtlKnd" value="${layerSet.lyrDtlKnd}">
            <input type="hidden" name="tblNm" value="${layerSet.tblNm}">
            <input type="hidden" name="lyrId" value="${layerSet.lyrId}">
            <input type="hidden" id="styleInfo" name="styleInfo">

            <div class="tabBoxDepth1-wrap">
                <div class="tabBoxDepth1">
                    <ul>
                        <li data-tab="layerBasic" class="on">
                            <button type="button" class="inner-tab">기본</button>
                        </li>
                        <li data-tab="layerStyle">
                            <button type="button" class="inner-tab">스타일</button>
                        </li>
                        <li data-tab="layerLabel">
                            <button type="button" class="inner-tab">라벨</button>
                        </li>
                    </ul>
                </div>
                <div class="tab-cont layerBasic on">
                    <h3 class="cont-tit">기본정보</h3>
                    <div class="data-default">
                        <table class="data-write">
                            <colgroup>
                                <col style="width: 20%;">
                                <col style="width: auto;">
                                <col style="width: 20%;">
                                <col style="width: auto;">
                            </colgroup>
                            <tbody>
                            <tr>
                                <th scope="row">명칭</th>
                                <td><input type="text" name="lyrNm" class="form-control"
                                           value="<c:out value='${layerSet.lyrNm}'/>"></td>
                                <th scope="row">테이블</th>
                                <td class="td_table_nm"><c:out value='${layerSet.tblNm}'/></td>
                            </tr>
                            <tr>
                                <th scope="row">타입</th>
                                <td>
                                    <c:choose>
                                        <c:when test="${layerSet.lyrDtlKnd eq 'P'}">점형</c:when>
                                        <c:when test="${layerSet.lyrDtlKnd eq 'L'}">선형</c:when>
                                        <c:when test="${layerSet.lyrDtlKnd eq 'A'}">면형</c:when>
                                        <c:otherwise>-</c:otherwise>
                                    </c:choose>
                                </td>
                                <th scope="row">데이터량</th>
                                <td><fmt:formatNumber value="${layerDataSize}" pattern="#,###"/></td>
                            </tr>
                            <tr>
                                <th scope="row">갱신 형태</th>
                                <td>
                                    <select name="rnwlStle" class="form-select">
                                        <option value="0" <c:if test="${layerSet.rnwlStle eq '0'}">selected</c:if>>자동
                                        </option>
                                        <option value="1" <c:if test="${layerSet.rnwlStle eq '1'}">selected</c:if>>수동
                                        </option>
                                    </select>
                                </td>
                                <th scope="row">갱신 주기</th>
                                <td>
                                    <div class="form-row">
                                        <div class="col-6">
                                            <input type="text" name="rnwlCycle" class="form-control"
                                                   value="<c:out value='${layerSet.rnwlCycle}'/>">
                                        </div>
                                        <div class="col-6">
                                            <select name="rnwlUnit" class="form-select">
                                                <option value="s"
                                                        <c:if test="${layerSet.rnwlUnit eq 's'}">selected</c:if>>초
                                                </option>
                                                <option value="m"
                                                        <c:if test="${layerSet.rnwlUnit eq 'm'}">selected</c:if>>분
                                                </option>
                                                <option value="h"
                                                        <c:if test="${layerSet.rnwlUnit eq 'h'}">selected</c:if>>시
                                                </option>
                                                <option value="D"
                                                        <c:if test="${layerSet.rnwlUnit eq 'D'}">selected</c:if>>일
                                                </option>
                                                <option value="W"
                                                        <c:if test="${layerSet.rnwlUnit eq 'W'}">selected</c:if>>주
                                                </option>
                                                <option value="M"
                                                        <c:if test="${layerSet.rnwlUnit eq 'M'}">selected</c:if>>월
                                                </option>
                                                <option value="Y"
                                                        <c:if test="${layerSet.rnwlUnit eq 'Y'}">selected</c:if>>년
                                                </option>
                                                <option value="A"
                                                        <c:if test="${layerSet.rnwlUnit eq 'A'}">selected</c:if>>상시
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">최신 업데이트</th>
                                <td>
                                    <fmt:parseDate value="${layerSet.lastModfDt}" var="lastModfDt"
                                                   pattern="yyyy-MM-dd HH:mm:ss"/>
                                    <fmt:formatDate value="${lastModfDt}" pattern="yyyy-MM-dd HH:mm"/>
                                </td>
                                <th scope="row">공유 형태</th>
                                <td>
                                    <select name="cnrsStle" class="form-select">
                                        <option value="0" <c:if test="${layerSet.cnrsStle eq '0'}">selected</c:if>>등록자만
                                            사용
                                        </option>
                                        <option value="1" <c:if test="${layerSet.cnrsStle eq '1'}">selected</c:if>>모든
                                            사용자
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 class="cont-tit">속성정보</h3>
                    <div class="data-default" style="height: 431px;">
                        <table class="data-write">
                            <colgroup>
                                <col style="width: auto;">
                                <col style="width: auto;">
                                <col style="width: 17%;">
                                <col style="width: 15%;">
                                <col style="width: 80px;">
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col">필드명(한글)</th>
                                <th scope="col">필드명(영문)</th>
                                <th scope="col">타입</th>
                                <th scope="col">길이</th>
                                <th scope="col">표출</th>
                            </tr>
                            </thead>
                        </table>
                        <div class="scroll-y">
                            <table class="data-write tbl-all-center">
                                <colgroup>
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: 17%;">
                                    <col style="width: 15%;">
                                    <col style="width: 80px;">
                                </colgroup>
                                <tbody>
                                <c:forEach items="${layerAttributeList}" var="result" varStatus="status">
                                    <input type="hidden" name="atrbIdArr" value="<c:out value='${result.atrbId}'/>">
                                    <input type="hidden" name="eprssAtArr">
                                    <tr>
                                        <td><input type="text" name="atrbNmArr" class="form-control"
                                                   value="<c:out value='${result.atrbNm}'/>"></td>
                                        <td><c:out value='${result.atrbId}'/></td>
                                        <td>
                                            <c:set var="atrbType" value="${result.atrbType}"/>
                                            <c:if test="${fn:contains(atrbType, 'num')}">숫자형</c:if>
                                            <c:if test="${fn:contains(atrbType, 'char')}">문자형</c:if>
                                            <c:if test="${fn:contains(atrbType, 'geom')}">geometry</c:if>
                                        </td>
                                        <td><c:out value='${result.atrbLt}'/></td>
                                        <td>
                                            <input type="radio" name="eprssAt"
                                                   <c:if test="${result.eprssAt eq 'Y'}">checked</c:if>>
                                        </td>
                                    </tr>
                                </c:forEach>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="tab-cont layerStyle">
                    <!-- 선형 -->
                    <div>
                        <div class="row marT30">
                            <div class="col-6">
                                <div class="data-default">
                                    <table class="data-list tbl-all-center">
                                        <colgroup>
                                            <col style="width: 20%;">
                                            <col style="width: auto;">
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th scope="col">심볼</th>
                                            <th scope="col">규칙이름</th>
                                        </tr>
                                        </thead>
                                        <tbody class="style_rules">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="toggle_style style_fill">
                                    <p class="form-label"><input type="checkbox" id="style_fill_checkbox"> <label
                                            for="style_fill_checkbox">채우기</label></p>
                                    <div class="tbl-list">
                                        <div class="term">색상</div>
                                        <div class="desc">
                                            <input type="text" name="fill" class="style-fill-color">
                                        </div>
                                    </div>
                                </div>
                                <div class="toggle_style style_stroke">
                                    <p class="form-label"><input type="checkbox" id="style_stroke_checkbox"> <label
                                            for="style_stroke_checkbox">테두리</label></p>
                                    <div class="tbl-list vertical-tbl">
                                        <div class="items">
                                            <div class="term">색상</div>
                                            <div class="desc">
                                                <div class="form-row">
                                                    <div class="col-3"><input type="number" name="stroke-width" min="1"
                                                                              max="50" step="1" value="3" value=""
                                                                              class="form-control"></div>
                                                    <div class="col-9"><input type="text" name="stroke"
                                                                              class="style-stroke-color"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="items items-line items-polygon">
                                            <div class="term">패턴</div>
                                            <div class="desc">
                                                <select name="stroke-dasharray" class="form-select">
                                                    <option value="">실선</option>
                                                    <option value="2 2">점선</option>
                                                    <option value="6 2">파선</option>
                                                    <option value="6 2 2 2">쇄선</option>
                                                    <option value="6 2 2 2 2 2">이중쇄선</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tabBoxDepth2-wrap toggle_style style_point">
                                    <div class="tabBoxDepth2">
                                        <ul>
                                            <!-- <li data-tab="layerStyleMarker" class="on"><button type="button" class="inner-tab">단순마커</button></li> -->
                                            <li data-tab="layerStyleImages" class="on">
                                                <button type="button" class="inner-tab">이미지</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-cont layerStyleMarker">
                                        <div class="tbl-list vertical-tbl">
                                            <div class="items align-items-start">
                                                <div class="term">모양</div>
                                                <div class="desc">
                                                                    <span class="layer-marker">
                                                                        <span><input type="radio" name="layerMarker"
                                                                                     id="" checked="checked"><label
                                                                                for="" class="obj-01"></label></span>
                                                                        <span><input type="radio" name="layerMarker"
                                                                                     id=""><label for=""
                                                                                                  class="obj-02"></label></span>
                                                                        <span><input type="radio" name="layerMarker"
                                                                                     id=""><label for=""
                                                                                                  class="obj-03"></label></span>
                                                                        <span><input type="radio" name="layerMarker"
                                                                                     id=""><label for=""
                                                                                                  class="obj-04"></label></span>
                                                                        <span><input type="radio" name="layerMarker"
                                                                                     id=""><label for=""
                                                                                                  class="obj-05"></label></span>
                                                                        <span><input type="radio" name="layerMarker"
                                                                                     id=""><label for=""
                                                                                                  class="obj-06"></label></span>
                                                                        <span><input type="radio" name="layerMarker"
                                                                                     id=""><label for=""
                                                                                                  class="obj-07"></label></span>
                                                                        <span><input type="radio" name="layerMarker"
                                                                                     id=""><label for=""
                                                                                                  class="obj-08"></label></span>
                                                                        <span><input type="radio" name="layerMarker"
                                                                                     id=""><label for=""
                                                                                                  class="obj-09"></label></span>
                                                                    </span>
                                                </div>
                                            </div>
                                            <div class="items">
                                                <div class="term">색상</div>
                                                <div class="desc"><input type="text" class="colorPicker"></div>
                                            </div>
                                            <div class="items">
                                                <div class="term">테두리</div>
                                                <div class="desc">
                                                    <div class="form-row">
                                                        <div class="col-4"><input type="number" min="" max="" step=""
                                                                                  value="1" class="form-control"></div>
                                                        <div class="col-8"><input type="text" class="colorPicker"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="items">
                                                <div class="term">크기</div>
                                                <div class="desc"><input type="number" min="" max="" step="" value="1"
                                                                         class="form-control"></div>
                                            </div>
                                            <div class="items">
                                                <div class="term">위치</div>
                                                <div class="desc">
                                                    <select name="" id="" class="form-select">
                                                        <option value="">중앙</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-cont layerStyleImages on">
                                        <div class="symbol-group">
                                            <button type="button">
                                                <img src="/images/poi/bridge_poi.png" data-icon="bridge_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/building_poi.png" data-icon="building_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/buildingEnter_poi.png"
                                                     data-icon="buildingEnter_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/cctv_poi.png" data-icon="cctv_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/cctv_water_level.png"
                                                     data-icon="cctv_water_level"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/commManhole_poi.png"
                                                     data-icon="commManhole_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/commPole_poi.png" data-icon="commPole_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/constructionPlan_poi.png"
                                                     data-icon="constructionPlan_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/constructionSchedule_poi.png"
                                                     data-icon="constructionSchedule_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/drainValve_poi.png" data-icon="drainValve_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/electricManhole_poi.png"
                                                     data-icon="electricManhole_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/exhaustValve_poi.png"
                                                     data-icon="exhaustValve_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/expansionJoint_poi.png"
                                                     data-icon="expansionJoint_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/faciRese_poi.png" data-icon="faciRese_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/gasPipe_poi.png" data-icon="gasPipe_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/gasValve_poi.png" data-icon="gasValve_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/governor_poi.png" data-icon="governor_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/hydrant_poi.png" data-icon="hydrant_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/icon1.png" data-icon="icon1"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/inBusinessEsta_poi.png"
                                                     data-icon="inBusinessEsta_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/lpgManhole_poi.png" data-icon="lpgManhole_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/memo_poi.png" data-icon="memo_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/nomal_poi.png" data-icon="nomal_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/nonreturnValve_poi.png"
                                                     data-icon="nonreturnValve_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/overpass_poi.png" data-icon="overpass_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/park_poi.png" data-icon="park_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/poto_poi.png" data-icon="poto_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/prsRelifValve_poi.png"
                                                     data-icon="prsRelifValve_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/prsStandStock_poi.png"
                                                     data-icon="prsStandStock_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/railroadStation_poi.png"
                                                     data-icon="railroadStation_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/railroadTrack_poi.png"
                                                     data-icon="railroadTrack_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/renewableEnergy_poi.png"
                                                     data-icon="renewableEnergy_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/riverLake_poi.png" data-icon="riverLake_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/roadSection_poi.png"
                                                     data-icon="roadSection_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/safetyValve_poi.png"
                                                     data-icon="safetyValve_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/sports_poi.png" data-icon="sports_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/stopValve_poi.png" data-icon="stopValve_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/street_lamp.png" data-icon="street_lamp"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/streetLight_poi.png"
                                                     data-icon="streetLight_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/subwayStation_poi.png"
                                                     data-icon="subwayStation_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/subwayTrack_poi.png"
                                                     data-icon="subwayTrack_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/switch_poi.png" data-icon="switch_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/swlDeptPs_poi.png" data-icon="swlDeptPs_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/swlDranPs_poi.png" data-icon="swlDranPs_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/swlManhPs_poi.png" data-icon="swlManhPs_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/swlPumpPs_poi.png" data-icon="swlPumpPs_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/swlSpewPs_poi.png" data-icon="swlSpewPs_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/swlSpotPs_poi.png" data-icon="swlSpotPs_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/swlVentPs_poi.png" data-icon="swlVentPs_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/transformer_poi.png"
                                                     data-icon="transformer_poi"/></button>
                                            <button type="button">
                                                <img src="/images/poi/tunnel_poi.png" data-icon="tunnel_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/underpass_poi.png" data-icon="underpass_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/underPowerPipeLine_poi.png"
                                                     data-icon="underPowerPipeLine_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/underWaterAgri_poi.png"
                                                     data-icon="underWaterAgri_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/underWaterDevelop_poi.png"
                                                     data-icon="underWaterDevelop_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/underWaterUseFacil_poi.png"
                                                     data-icon="underWaterUseFacil_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/waterTower_poi.png" data-icon="waterTower_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/welfare_poi.png" data-icon="welfare_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/wtlManhPs_poi.png" data-icon="wtlManhPs_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/wtlPrgaPs_poi.png" data-icon="wtlPrgaPs_poi"/>
                                            </button>
                                            <button type="button">
                                                <img src="/images/poi/wtlServPs_poi.png" data-icon="wtlServPs_poi"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p class="form-label">유효 줌 레벨</p>
                                <div class="drawing-slider-box validZoomLevel">
                                    <div class="drawing-slider">
                                        <div class="style-scale"></div>
                                    </div>
                                    <input type="text" class="value-num" value="" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- //선형 -->

                    <!--
                    <div>
                        <div class="row">
                            <div class="col-6">
                                <p class="form-label">유효축척</p>
                                <div class="input-group">
                                    <div class="input-group-text">
                                        <span class="form-checkbox">
                                            <span><input type="checkbox" name="" id="chk2" checked="checked"><label for="chk2"></label></span>
                                        </span>
                                    </div>
                                    <input type="text" class="form-control">
                                    <div class="input-group-text">~</div>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    -->
                </div>
                <div class="tab-cont layerLabel">
                    <div class="row marB30">
                        <div class="col-6">
                            <p class="form-label">라벨 필드</p>
                            <div class="tbl-list">
                                <div class="term">값</div>
                                <div class="desc">
                                    <select class="form-select">
                                        <option value="">FTR_IDN</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row marB30">
                        <div class="col-6">
                            <p class="form-label">유효축척</p>
                            <div class="input-group">
                                <div class="input-group-text">
													<span class="form-checkbox">
														<span><input type="checkbox" name="" id="chk2"
                                                                     checked="checked"><label for="chk2"></label></span>
													</span>
                                </div>
                                <input type="text" class="form-control">
                                <div class="input-group-text">~</div>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p class="cont-txt">라벨스타일</p>
                        </div>
                        <div class="col-6 marB5">
                            <div class="tbl-list">
                                <div class="term">글씨</div>
                                <div class="desc" style="width: 190px;">
                                    <input type="text" class="colorPicker">
                                </div>
                            </div>
                        </div>
                        <div class="col-6 marB5">
                            <div class="tbl-list">
                                <div class="term">배경</div>
                                <div class="desc" style="width: 190px;">
                                    <input type="text" class="colorPicker">

                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="tbl-list">
                                <div class="term">폰트</div>
                                <div class="desc flex-grow-1">
                                    <select class="form-select">
                                        <option value="">돋움체</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="tbl-list">
                                <div class="term">크기</div>
                                <div class="desc flex-grow-1">
                                    <select class="form-select">
                                        <option value="">26px</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="position-bottom btn-wrap">
                    <div>
                        <button type="button" class="btn basic bi-check">적용</button>
                    </div>
                </div>
            </div>
        </form>


    </div>
</div>
<button type="button" class="popup-close" title="닫기"></button>
<%--<button type="button" class="popup-left-toggle" title="접기"></button>--%>

<script>
    $(document).ready(function () {

        $('.colorPicker').minicolors({
            control: 'hue',
            defaultValue: 'rgba(255, 0, 0)',
            format: 'rgb',
            theme: 'default',
            opacity: false,
            swatches: []
        });
        //symbol 클릭 시 active
        $(".symbol-group button").on("click", function () {
            $(this).addClass("active").siblings().removeClass('active');
        });

        //symbol 직접 등록 클릭 시 active
        $(".symbol-register input[type='radio']").click(function () {
            var radioChk = $(this).is(":checked");
            if (radioChk) {
                $(this).closest("li").addClass('active').siblings().removeClass('active');
            }
        });

        // 심볼 직접 등록 항목 추가
        var symbolFileArr = [];
        $("#file").on("change", function (e) {
            var files = Array.prototype.slice.call(e.target.files);
            var iconItemStr = "";
            var cnt = 0;

            if (files.length > 0) {
                $("#symbolIconList").empty();
                $("input[name='drawingType']").prop("checked", false);
                $("#drawing3").prop("checked", true);

                symbolFileArr = [];

                files.forEach(function (f) {
                    var reader = new FileReader();

                    if (f.type.split("/")[0] !== "image") {
                        typeChk = false;
                    }

                    reader.onload = function (e) {
                        var checked = cnt === 0 ? "checked" : "";

                        iconItemStr = "<li><span><input type='radio' name='symbolIcon' id='symbolIcon" + cnt + "' " + checked + ">"
                            + "<label for='symbolIcon" + cnt + "'><img src='" + e.target.result + "' alt=''> " + f.name + "</label></span>"
                            + "<button type='button' class='symbol-delete' onclick='removeSymbolItem(this);'></button>"
                            + "</li>";

                        cnt++;

                        $("#symbolIconList").append(iconItemStr);
                    }

                    reader.readAsDataURL(f);
                    symbolFileArr.push(f);
                });
            }
        });


        $("#leftPopup .popup-close").on("click", function (e) {
            $(".layer-list li").removeClass("active");
        });

        // 적용
        $(".bi-check").on("click", function (e) {
            const style = layerStyle.getStyleInfo();
            $('#styleInfo').val(style);
            aj_updateLayerInfo();
        });

        layerStyle.load($(".td_table_nm").text());


        // 레이어 정보 수정
        function aj_updateLayerInfo() {
            var activeLayer = $(".layer-list li.active input[type='checkbox']").attr("id");
            var layerId = Number(activeLayer.split("_")[2]);
            var tblNm = $("input[name='tblNm']").val();
            var eprssBtns = $("input[name='eprssAt']");

            for (var i = 0; i < eprssBtns.length; i++) {
                $($("input[name='eprssAtArr']")[i]).val($(eprssBtns[i]).prop("checked") ? "Y" : "N");
            }

            var formData = new FormData($("#layerInfoForm")[0]);

            $.ajax({
                type: "POST",
                url: "/lyr/lyi/updateLayerInfo.do",
                data: formData,
                dataType: "json",
                processData: false,
                contentType: false,
                beforeSend: function (jqXHR, settings) {
                    ui.loadingBar("show");
                },
                success: function (returnData) {
                    if (returnData.callback === "success") {
                        alert(returnData.message);
                        aj_updateLayerInfoView(layerId);
                        aj_selectLayerList("left");

                        $("#" + activeLayer).closest("li").addClass("active");

                        dtmap.layer.removeLayer(activeLayer);
                        $('#' + activeLayer).prop('checked', 'checked').change();
// 				// 레이어 재로드 여부 확인
// 				var layerType = $("input[name='lyrDtlKnd']").val();
// 				var layerListType = layerType == "P" ? true : false;
// 				var layerList = new Module.JSLayerList(layerListType);
// 				var layer = layerList.nameAtLayer(activeLayer);
//
// 				// 기존 레이어 삭제 후 재로드
// 				if(layer != null){
// 					var visible = layer.getVisible();
// 					layer.removeAll();
// 					if (layerType == "P") {
// 						loadPOI_3D(activeLayer, layerId, layerTable);
// 					} else{
// // 						loadWMS_3D(activeLayer, storageId + ":" + layerTable, "");
// 						layer.clearWMSCache();
// 					}
//
// 					layerList = new Module.JSLayerList(layerListType);
// 					layer = layerList.nameAtLayer(activeLayer);
// 					layer.setVisible(visible);
// 				}
                    } else {
                        alert(returnData.message);
                        return false;
                    }
                },
                error: function (request, status, error) {
                    alert('Error!');
                    console.log("code:" + request.status + "\nmessage:" + request.responseText + "\nerror:" + error);
                },
                complete: function () {
                    loadingShowHide("hide");
                }
            });
        }
    });

</script>