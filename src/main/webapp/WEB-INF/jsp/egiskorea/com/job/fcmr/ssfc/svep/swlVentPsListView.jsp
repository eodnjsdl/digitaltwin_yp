<%@ page language="java" contentType="text/html; charset=UTF-8" %>

<!-- js -->
<!-- <script src="/js/egiskorea/com/job/fcmr/ssfc/svep/swlVentPs.js"></script>		환기구  -->

<!-- 업무 > 시설관리 > 하수도시설 > 환기구 -->
<div class="popup-header">하수도관리</div>
<div class="popup-body">
    <div class="bottom-popup-body bottom-popup-group">
        <!-- 검색영역 -->
        <div class="items search-area">
            <div class="top-search">
                <select class="form-select facility-select">
                    <option value="swlConnLs">하수연결관</option>
                    <option value="swlDeptPs">하수관거심도</option>
                    <option value="swlDranPs">하수처리장</option>
                    <option value="swlManhPs">하수맨홀</option>
                    <option value="swlPipeAs">면형하수관거</option>
                    <option value="swlPipeLm">하수관거</option>
                    <option value="swlPumpPs">하수펌프장</option>
                    <option value="swlSideLs">측구</option>
                    <option value="swlSpewPs">토구</option>
                    <option value="swlSpotPs">물받이</option>
                    <option value="swlVentPs" selected="selected">환기구</option>
                </select>
            </div>
            <div class="tabBoxDepth2-wrap">
                <div class="tabBoxDepth2">
                    <ul>
                        <li data-tab="groundwaterProperty" class="on">
                            <button type="button" class="inner-tab">속성검색</button>
                        </li>
                        <li data-tab="groundwaterSpace">
                            <button type="button" class="inner-tab">공간검색</button>
                        </li>
                    </ul>
                </div>
                <div class="tab-cont groundwaterProperty on">
                    <div class="srch-default">
                        <table class="srch-tbl">
                            <colgroup>
                                <col style="width: 30%;">
                                <col style="width: auto;">
                            </colgroup>
                            <tbody id="lSrchOptions">
                            	<tr>  
									<th scope="row">읍면동</th>  
									<td>    
										<select name="hjd_cde" class="form-select">
											<option value="">전체</option>
										</select>  
									</td>
								</tr>
								<tr>  
									<th scope="row">관재질</th>  
									<td>    
										<select name="mop_cde" class="form-select">
											<option value="">전체</option>
										</select>  
									</td>
								</tr>
								<tr>  
									<th scope="row">흡출기형식</th>  
									<td>    
										<select name="mof_cde" class="form-select">
											<option value="">전체</option>
										</select>  
									</td>
								</tr>
								<tr>  
									<th scope="row">흡출기재질</th>  
									<td>    
										<select name="hmp_cde" class="form-select">
											<option value="">전체</option>
										</select>
									</td>
								</tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="btn-wrap">
                        <div>
                            <button type="button" class="btn type01 search facility-attribute-search" onclick="selectSwlVentPsList(1)">조회</button>
                        </div>
                    </div>
                </div>
                <div class="tab-cont groundwaterSpace">
                    <div class="space-search-group">
                        <div class="space-search-items">
							<span class="form-radio text group">
								<span>
									<input type="radio" name="rad-facility-area" id="rad-facility-area-extent" value="extent" checked="checked">
									<label for="rad-facility-area-extent">현재화면영역</label>
								</span>
								<span>
									<input type="radio" name="rad-facility-area" id="rad-facility-area-custom" value="custom">
									<label for="rad-facility-area-custom">사용자 정의</label>
								</span>
							</span>
                        </div>
                        <div class="space-search-items space-facility-area" style="display:none;">
							<span class="drawing-obj small">
								<span>
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-point" value="1" checked="checked">
									<label for="rad-facility-drawing-point" class="obj-sm01"></label>
								</span>
								<span>
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-linestring" value="2">
									<label for="rad-facility-drawing-linestring" class="obj-sm02"></label>
								</span>
								<span>
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-box" value="3">
									<label for="rad-facility-drawing-box" class="obj-sm03"></label>
								</span>
								<span>
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-circle" value="4">
									<label for="rad-facility-drawing-circle" class="obj-sm04"></label>
								</span>
							</span>
                        </div>
                        <div class="space-search-items space-facility-area" style="display:none;">
                        	경계로부터 
                        	<span class="form-group">
                        		<input type="text" class="form-control align-center area-facility-buffer" placeholder="0" value="0"><sub>m</sub>
                        	</span>
                        	이내 범위
                        </div>
                    </div>
                    <div class="btn-wrap">
                        <div>
                            <button type="button" class="btn type01 search facility-spatial-search">조회</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- //검색영역 -->
        <div class="items data-area">
            <div class="bbs-top">
                <div class="bbs-list-num">조회결과 : --건</div>
                <div>
                    <button type="button" class="btn basic bi-write btn_add" onclick="insertSwlVentPsView();">등록</button>
                    <button type="button" class="btn basic bi-excel btn_excel" onclick="downloadExcelSwlConnLs();">엑셀저장
                    </button>
                </div>
            </div>
            <div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
                <div class="bbs-default">
                    <div id="baseGridDiv" style="height:inherit; display: flex;flex-direction: column;">
                        <div id="gridax5" data-ax5grid="attr-grid" data-ax5grid-config="{}" style="flex: 1"></div>
                        <div data-ax5grid="attr-grid-excel" style="diplay:none;"></div>
                        <input type="hidden" class="hiddenPage" value="1" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('환기구')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<button type="button" class="popup-reset" title="초기화"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>
<!-- //업무 > 시설관리 > 하수도시설 > 환기구 end -->