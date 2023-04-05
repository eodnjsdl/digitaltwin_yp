<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- 업무 > 시설관리 > 체육시설 -->
<div class="popup-header">체육시설</div>
<div class="popup-body">
    <div class="bottom-popup-body bottom-popup-group">
        <div class="items search-area">
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
                            <tbody id="lSrchOptions">
								<tr>
								<th scope="row">시설구분</th>
									<td>
										<select name="sports_fcty_tp_cd" id="sports_fcty_tp_cd" class="form-select">
											<option value="">전체</option>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">운영방식</th>
									<td>
										<select name="sports_oper_mthd_cd" id="sports_oper_mthd_cd" class="form-select">
											<option value="">전체</option>
											<option value="위탁">위탁</option>
										</select>
									</td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" class="form-control" id="sporSearchAdres" name="sporSearchAdres" onkeypress="if( event.keyCode == 13 ){ searchPhyEduFaciList(1);} "placeholder="읍면동"></td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" class="form-control" id="sporSearchAlsfc_nm" name="sporSearchAlsfc_nm" onkeypress="if( event.keyCode == 13 ){ searchPhyEduFaciList(1);}" placeholder="시설명"></td>
								</tr>
							</tbody>
                        </table>
                    </div>
                    <div class="btn-wrap">
						<div><button type="button" class="btn type01 search" onclick="searchPhyEduFaciList(1);">조회</button></div>
					</div>
				</div>
				<div class="tab-cont waterSpace">
					<div class="space-search-group">
						<div class="space-search-items">
							<span class="form-radio text group">
								<span><input type="radio" name="sportsSelect" id="rChk1-1" value="1" checked=""><label for="rChk1-1">현재화면영역</label></span>
								<span><input type="radio" name="sportsSelect" id="rChk1-2" value="2"><label for="rChk1-2">사용자 정의</label></span>
							</span>
						</div>
						<div class="space-search-items areaSrchTool">
							<span class="drawing-obj small">
								<span><input type="radio" name="sportsAreaDrawing" id="aChk1" value="1"><label for="aChk1" class="obj-sm01"></label></span>
								<span><input type="radio" name="sportsAreaDrawing" id="aChk2" value="2"><label for="aChk2" class="obj-sm02"></label></span>
								<span><input type="radio" name="sportsAreaDrawing" id="aChk3" value="3"><label for="aChk3" class="obj-sm03"></label></span>
								<span><input type="radio" name="sportsAreaDrawing" id="aChk4" value="4"><label for="aChk4" class="obj-sm04"></label></span>
							</span>
						</div>
						<div class="space-search-items areaSrchTool">경계로부터 <span class="form-group"><input type="text" onKeyup="this.value=this.value.replace(/[^-0-9]/g,'');" id="sportsBuffer" class="form-control align-center"onkeypress="if( event.keyCode == 13 ){ aj_selectPhysicalEducationFacilityList($('#spor_searchForm')[0],'spital'); }" value="0"> <sub>m</sub></span> 이내 범위</div>
					</div>
					<div class="btn-wrap">
						<div><button type="button" class="btn type01 search" onclick="aj_selectPhysicalEducationFacilityList($('#spor_searchForm')[0],'spital');">조회</button></div>
					</div>
				</div>
			</div>
		</div>
		<div class="items data-area">
            <div class="bbs-top">
                <div class="bbs-list-num">조회결과 : --건</div>
                <div>
                    <button type="button" class="btn basic bi-write btn_add" onclick="insertPhyEduFaciView();">등록</button>
                    <button type="button" class="btn basic bi-excel btn_excel" onclick="fn_downloadExcel();">엑셀저장</button>
                </div>
            </div>
            <div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
                <div class="bbs-default">
                    <div id="baseGridDiv" style="height:inherit; display: flex;flex-direction: column">
                        <div id="gridax5" data-ax5grid="attr-grid" data-ax5grid-config="{}" style="flex: 1"></div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('체육시설')"></button>
<button type="button" class="popup-close" title="닫기" onclick="removeLayer(); destroy();"></button>
<button type="button" class="popup-reset" class="초기화" onclick="bottomPopupOpen('physicalEducationFacility');"></button>
<button type="button" class="popup-bottom-toggle" title="접기" onclick="toggleFold(this);"></button>				
<!-- 업무 > 시설관리 > 체육시설 end -->