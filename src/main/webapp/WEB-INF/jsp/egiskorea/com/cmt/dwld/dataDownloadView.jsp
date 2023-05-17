<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="popup-header">데이터 내보내기</div>
<div class="popup-body">
    <div class="tool-popup-body top-dataOut-body">
        <div class="tabBoxDepth1-wrap">
            <div class="tabBoxDepth1">
                <ul>
                    <li data-id="tr_area" id="trArea" class="on"><button type="button" class="inner-tab">영역기준</button></li>
                    <li data-id="tr_facility" id="trFacility"><button type="button" class="inner-tab">시설물 기준</button></li>
                </ul>
            </div>
            <div class="tab-cont dataOut01 on">
                <div class="data-default">
                    <table class="data-write">
                        <colgroup>
                            <col style="width: 30%;">
                            <col style="width: auto;">
                        </colgroup>
                        <tbody>
                            <tr class="tr_toggle tr_area">
                                <th scope="row" class="th_search_area_span" rowspan="2">검색영역지정</th>
                                <td>
                                    <span class="form-radio text group">
                                        <span><input type="radio" name="download-search-area" id="download-search-area-extent" value="extent" checked="checked"><label for="download-search-area-extent">현재화면영역</label></span>
                                        <span><input type="radio" name="download-search-area" id="download-search-area-custom" value="custom"><label for="download-search-area-custom">사용자 정의</label></span>
                                    </span>
                                </td>
                            </tr>
                            <tr class="tr_toggle tr_area tr_search_area">
                                <td>
                                    <span class="drawing-obj small">
                                        <span><input type="radio" name="download-search-drawing" id="download-search-drawing-point" value="1" checked="checked"><label for="download-search-drawing-point" class="obj-sm01"></label></span>
                                        <span><input type="radio" name="download-search-drawing" id="download-search-drawing-linestring" value="2"><label for="download-search-drawing-linestring" class="obj-sm02"></label></span>
                                        <span><input type="radio" name="download-search-drawing" id="download-search-drawing-box" value="3"><label for="download-search-drawing-box" class="obj-sm03"></label></span>
                                        <span><input type="radio" name="download-search-drawing" id="download-search-drawing-polygon" value="4"><label for="download-search-drawing-polygon" class="obj-07"></label></span>
                                        <span><input type="radio" name="download-search-drawing" id="download-search-drawing-circle" value="5"><label for="download-search-drawing-circle" class="obj-sm04"></label></span>
                                    </span>
                                </td>
                            </tr>
                            <tr class="tr_toggle tr_area">
                                <td>경계로부터 <span class="marL5 marR10"><input type="text" class="form-control w-60 align-center area-search-buffer" placeholder="0" value="0"> <sub>m</sub></span> 이내 범위</td>
                            </tr>
                            <tr class="tr_toggle tr_facility">
                                <th scope="row" rowspan="2">검색영역지정</th>
                                <td>
                                    <div class="form-row">
                                        <div class="col">
                                            <select name="standard-search-target" class="form-select" id="facilitySelectList">
                                            </select>
                                        </div>
                                        <div class="col-auto"><button type="button" class="btn type01 bi-location btn-select-map">지도에서 선택</button></div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="tr_toggle tr_facility">
                                <td>경계로부터 <span class="marL5 marR10"><input type="text" class="form-control w-60 align-center facility-search-buffer" placeholder="0" value="0"> <sub>m</sub></span> 이내 범위</td>
                            </tr>
                            <tr>
                                <th scope="row">저장내용</th>
                                <td>
                                    <span class="form-radio text group">
                                        <span><input type="radio" name="download-type" id="download-type-shape" value="shape" checked="checked"><label for="download-type-shape">Shape File</label></span>
                                        <span><input type="radio" name="download-type" id="download-type-excel" value="excel"><label for="download-type-excel">엑셀파일</label></span>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="btn-wrap justify-content-end marT5">
                    <div><button type="button" class="btn basic bi-reset btn_reset">초기화</button></div>
                </div>

                <div class="data-default marT20" style="height: 435px;">
                    <table class="data-write">
                        <colgroup>
                            <col style="width: 10%;">
                            <col style="width: auto;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">
<%--                                    <span class="form-checkbox"><span><input type="checkbox" name="download-feature-type-all" id="download-feature-type-all"><label for="download-feature-type-all"></label></span></span>--%>
                                </th>
                                <th scope="col">데이터명</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="scroll-y">
                        <table class="data-list">
                            <colgroup>
                                <col style="width: 10%;">
                                <col style="width: auto;">
                            </colgroup>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="position-bottom btn-wrap">
                    <div><button type="button" class="btn basic bi-out2 btn_downlaod">내보내기</button></div>
                </div>
            </div>
        </div>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('데이터 내보내기')"></button>
<button type="button" class="popup-close" title="닫기"></button>
                