<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script>
datepicker();
</script>
<!-- 업무 > 시설관리 > 상수도시설 > 소방시설 -->
<div class="bottom-popup-body bottom-popup-group" style="left: 320px;width: 1600px;height: 378px;">
    <div class="popup-header">상수도시설</div>
    <div class="popup-body">
        <div class="bottom-popup-body bottom-popup-group">						
            <!-- 검색영역 -->
            <div class="items search-area">
                <div class="top-search">
                    <select class="form-select" onchange="if(this.value) window.open(this.value);" id="wtlFtrIdn">
                        <option value="SA119">소방시설</option>
                        <option value="/contents/work-02-01-02.html">유량계</option>
                        <option value="/contents/work-02-01-03.html">상수맨홀</option>
                        <option value="/contents/work-02-01-04.html">상수관로</option>
                        <option value="/contents/work-02-01-05.html">수압계</option>
                        <option value="/contents/work-02-01-06.html">배수지</option>
                        <option value="/contents/work-02-01-07.html">급수관로</option>
                        <option value="/contents/work-02-01-08.html">변류시설</option>
                    </select>
                </div>
                <div class="tabBoxDepth2-wrap">
                    <div class="tabBoxDepth2">
                        <ul>
                            <li data-tab="waterProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
                            <li data-tab="waterSpace"><button type="button" class="inner-tab">공간검색</button></li>
                        </ul>
                    </div>
                    <div class="tab-cont waterProperty on">
                        <div class="srch-default">
                            <table class="srch-tbl">
                                <colgroup>
                                    <col style="width: 30%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th scope="row">시설구분</th>
                                        <td>
                                            <select class="form-select">
                                                <option value="">전체</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">설치년도</th>
                                        <td>
                                            <select name="" id="" class="form-select">
                                                <option value="">전체</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><input type="text" class="form-control" placeholder="읍면동"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><input type="text" class="form-control" placeholder="소화전형식"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="btn-wrap">
                            <div><button type="button" class="btn type01 search">조회</button></div>
                        </div>
                    </div>
                    <div class="tab-cont waterSpace">
                        <div class="space-search-group">
                            <div class="space-search-items">
                                <span class="form-radio text group">
                                    <span><input type="radio" name="test" id="rChk1-1" checked="checked"><label for="rChk1-1">현재화면영역</label></span>
                                    <span><input type="radio" name="test" id="rChk1-2"><label for="rChk1-2">사용자 정의</label></span>
                                </span>
                            </div>
                            <div class="space-search-items">
                                <span class="drawing-obj small">
                                    <span><input type="radio" name="areaDrawing" id="aChk1" checked="checked"><label for="aChk1" class="obj-sm01"></label></span>
                                    <span><input type="radio" name="areaDrawing" id="aChk2"><label for="aChk2" class="obj-sm02"></label></span>
                                    <span><input type="radio" name="areaDrawing" id="aChk3"><label for="aChk3" class="obj-sm03"></label></span>
                                    <span><input type="radio" name="areaDrawing" id="aChk4"><label for="aChk4" class="obj-sm04"></label></span>
                                </span>
                            </div>
                            <div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center" placeholder="0"> <sub>m</sub></span> 이내 범위</div>
                        </div>
                        <div class="btn-wrap">
                            <div><button type="button" class="btn type01 search">조회</button></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- //검색영역 -->
            <div class="items data-area">
                <div class="bbs-top">
                    <div class="bbs-list-num" id="wtlCntRessult">조회결과 : <strong>50</strong>건</div>
                    <div><button type="button" class="btn basic bi-write" data-popup="work-02-01-regist">등록</button> <button type="button" class="btn basic bi-excel">엑셀저장</button> <button type="button" class="btn basic bi-delete2">삭제</button></div>
                </div>
                <div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
                    <div class="bbs-default">
                        <div class="bbs-list-head">
                            <table class="bbs-list">
                                <colgroup>
                                    <col style="width: 36px;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
                                        </th>
                                        <th scope="col">지형지물부호</th>
                                        <th scope="col">관리번호</th>
                                        <th scope="col">행정읍면동</th>
                                        <th scope="col">관리기관</th>
                                        <th scope="col">도엽번호</th>
                                        <th scope="col">설치일자</th>
                                        <th scope="col">위치</th>
                                        <th scope="col">수용가번호</th>
                                        <th scope="col">소화전방식</th>
                                        <th scope="col">소화전구경<br>(mm)</th>
                                        <th scope="col">관경<br>(mm)</th>
                                        <th scope="col">방향각</th>
                                        <th scope="col">급수탑높이</th>
                                        <th scope="col">공사번호</th>
                                        <th scope="col">기관관리번호</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="scroll-y">
                            <table class="bbs-list">
                                <colgroup>
                                    <col style="width: 36px;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">
                                    <col style="width: auto;">			
                                </colgroup>
                                <tbody id="wtlTbody">
                                    <tr>
                                        <td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
                                        <td><a href="javascript:void(0);" data-popup="work-02-01-detail">급수탑</a></td>
                                        <td>2020110001</td>
                                        <td>강하면</td>
                                        <td>경기동 양평군 수도사업소</td>
                                        <td>377100515C</td>
                                        <td>199.01.01</td>
                                        <td>경기도 양평군 강하면 123</td>
                                        <td>-</td>
                                        <td>지하단구</td>
                                        <td>100.0</td>
                                        <td>100.0</td>
                                        <td>0</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="pagination" id="wtlPaging">
                        <a href="javascript:void(0);" class="first" title="처음"></a>
                        <a href="javascript:void(0);" class="prev" title="이전"></a>
                        <strong class="current">1</strong>
                        <a href="javascript:void(0);">2</a>
                        <a href="javascript:void(0);">3</a>
                        <a href="javascript:void(0);">4</a>
                        <a href="javascript:void(0);">5</a>
                        <a href="javascript:void(0);" class="next" title="다음"></a>
                        <a href="javascript:void(0);" class="last" title="마지막"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button type="button" class="manualBtn" title="도움말" onclick="manualTab('상수도시설')"></button>
    <button type="button" class="popup-close" title="닫기"></button>
    <button type="button" class="popup-reset" class="초기화"></button>
    <button type="button" class="popup-bottom-toggle" title="접기"></button>				
</div>
<!-- //업무 > 시설관리 > 상수도시설 > 소방시설 -->