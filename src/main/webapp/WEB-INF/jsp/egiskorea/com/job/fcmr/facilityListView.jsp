<%@ page language="java" contentType="text/html; charset=UTF-8" %>

<script>

	//jqeury
	$(document).ready(function(){
		console.log("facilityList.jsp");	
	});


	//functions
    function readGeoJSON(data) {
        if (!data.crs || !data.features || data.features.length === 0) {
            return;
        }
        var crs = data.crs.properties.name;
        if (crs.includes('urn:ogc:def:crs:EPSG::')) {
            crs = crs.replace('urn:ogc:def:crs:EPSG::', 'EPSG:');
        }
        var format = new ol.format.GeoJSON();
        return format.readFeatures(data, {
            dataProjection: crs,
            featureProjection: map2d.map.getView().getProjection()
        });
    }

    //sample 농업용공공관정 (digitaltwin:tgd_agr_public_tbwll)
    function call_wfs() {
        var bounds;
        var options;
        var grid = new ax5.ui.grid();
        var $container = $("#container");
        var $target = $container.find('#sampleGridDiv [data-ax5grid="attr-grid"]')
        $target.css('height', 'inherit');
        grid.setConfig({
            target: $target,
            sortable: true,
            multipleSelect: false,
            columns: [
                {key: "adres", label: "주소", width: 65},
                {key: "calbr", label: "구경"},
                {key: "detail_prpos_se", label: "세부용도구분"},
                {key: "devlop_year", label: "개발년도"},
                {key: "dph", label: "심도"},
                {key: "dscrgpp_calbr", label: "토출관구경"},
                {key: "fclts_chck_de", label: "시설물점검일자"},
                {key: "fclts_sttus", label: "시설물상태"},
                {key: "fclty_nm", label: "시설명"},
                {key: "manage_instt_nm", label: "관리기관명"},
                {key: "manage_se", label: "관리구분"},
                {key: "prpos_se", label: "용도구분"},
            ],
            page: {
                navigationItemCount: 9,
                height: 30,
                display: true,
                firstIcon: '|<',
                prevIcon: '<',
                nextIcon: '>',
                lastIcon: '>|',
                onChange: function () {
                	//search(this.page.selectPage);
                	alert(this.page.selectPage);
                }
            }
        
        });
        options = {
            typeNames: 'tgd_agr_public_tbwll' + "",
        }
        const promise = dtmap.wfsGetFeature(options);
        promise.then(function (data) {
            //그리드 데이터 전처리
            const list = [];
            for (let i = 0; i < data.features.length; i++) {
                const {id, properties} = data.features[i];
                list.push({...properties, ...{id: id}});
            }
            //grid.setData(list);
            /////////////
            grid.setData(
            	{	
            		list: list,
            		page: {
            			currentPage : 0,
            			pageSize:10,
            			totalElements: 500,
            			totalPages:50
            		}
            	}	
            );

            //지도에 GeoJSON 추가
            dtmap.vector.readGeoJson(data, function (feature) {

                /**
                 * 스타일 콜백 예시
                 */

                let properties = feature.getProperties();
                let dph = Number(properties['dph']);
                if (dph >= 110) {
                    return {
                        marker: {
                            src: '/images/poi/subway_1.png'
                        },
                        label: {
                            text: '텍스트 직접입력'
                        }
                    }
                } else if (dph >= 100 && dph < 110) {
                    return {
                        marker: {
                            src: '/images/poi/subway_2.png'
                        },
                        label: {
                            column: 'fclty_nm'
                        }
                    }
                } else {
                    return {
                        fill: {
                            color: 'rgba(46,161,255,0.68)'
                        },
                        stroke: {
                            color: '#89dfff',
                            width: 4
                        },
                        radius: 10,
                        label: {
                            column: 'fclty_nm'
                        }
                    }
                }
            });

            dtmap.vector.fit();
        });
    }

    function fn_insert() {
        ui.openPopup("rightSubPopup");
        var container = "#rightSubPopup";
        $(container).load("/job/sample/pageInsert.do", function () {
            toastr.warning("등록팝업", "🙂 Ajax 🙂 호 🙂 출 🙂 ");
            $(".scroll-y").mCustomScrollbar({
                scrollbarPosition: "outside",
            });
        });
    }

    function fn_downloadExcel() {
        toastr.error("엑셀다운로드", "🙂 Ajax 🙂 호 🙂 출 🙂 ");
    }

    function fn_pageDetail() {
        ui.openPopup("rightSubPopup");
        var container = "#rightSubPopup";
        $(container).load("/job/sample/pageDetail.do", function () {
            toastr.warning("상세팝업 + 상세정보 표출", "🙂 Ajax 🙂 호 🙂 출 🙂 ");
            $(".scroll-y").mCustomScrollbar({
                scrollbarPosition: "outside",
            });
        });
    }

    //
</script>
<!-- 업무 > 공통 -->
<div class="popup-header">샘플 상세보기</div>
<div class="popup-body">
    <div class="bottom-popup-body bottom-popup-group">
        <!-- 검색영역 -->
        <div class="items search-area">
            <div class="top-search">
                <select class="form-select facility-select">
                    <option value="1">샘플대장1</option>
                    <option value="2">샘플대장2</option>
                </select>
            </div>
            <div class="tabBoxDepth2-wrap">
                <div class="tabBoxDepth2">
                    <ul>
                        <li data-tab="groundwaterProperty" class="on">
                            <button type="button" class="inner-tab">속성검색</button>
                        </li>
                        <li data-tab="groundwaterSpace" id="srchSpace">
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
                            </tbody>
                        </table>
                    </div>
                    <div class="btn-wrap">
                        <div>
                            <button type="button" class="btn type01 search facility-attribute-search">조회</button>
                        </div>
                    </div>
                </div>
                <div class="tab-cont groundwaterSpace">
                    <div class="space-search-group">
                        <div class="space-search-items">
							<span class="form-radio text group">
								<span><input type="radio" name="rad-facility-area" id="rad-facility-area-extent"
                                             value="extent" checked="checked"><label for="rad-facility-area-extent">현재화면영역</label></span>
								<span><input type="radio" name="rad-facility-area" id="rad-facility-area-custom"
                                             value="custom"><label for="rad-facility-area-custom">사용자 정의</label></span>
							</span>
                        </div>
                        <div class="space-search-items space-facility-area" style="display:none;">
							<span class="drawing-obj small">
								<span><input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-point"
                                             value="1" checked="checked"><label for="rad-facility-drawing-point"
                                                                                class="obj-sm01"></label></span>
								<span><input type="radio" name="rad-facility-drawing"
                                             id="rad-facility-drawing-linestring" value="2"><label
                                        for="rad-facility-drawing-linestring" class="obj-sm02"></label></span>
								<span><input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-box"
                                             value="3"><label for="rad-facility-drawing-box"
                                                              class="obj-sm03"></label></span>
								<span><input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-circle"
                                             value="4"><label for="rad-facility-drawing-circle"
                                                              class="obj-sm04"></label></span>
							</span>
                        </div>
                        <div class="space-search-items">경계로부터 <span class="form-group"><input type="text"
                                                                                              class="form-control align-center area-facility-buffer"
                                                                                              placeholder="0" value="0"> <sub>m</sub></span>
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
                    <button type="button" class="btn basic" onclick="getFacilityDetailView('WaterSupplyFacility');">상세보기</button>
                    <button type="button" class="btn basic" onclick="call_wfs();">Ajax</button>
                    <button type="button" class="btn basic bi-write btn_add" onclick="getFacilityInsertView('WaterSupplyFacility');">등록</button>
                    <button type="button" class="btn basic bi-excel btn_excel" onclick="fn_downloadExcel();">엑셀저장
                    </button>
                </div>
            </div>
            <div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
                <div class="bbs-default">

                    <div id="baseGridDiv" style="height:inherit; display: flex;flex-direction: column">
                        <!-- <div style="display: inline-block">
                            <label>농업용공공관정</label>
                        </div> -->
                        <div id="gridax5" data-ax5grid="attr-grid" data-ax5grid-config="{}" style="flex: 1"></div>
                    </div>
                    '


                </div>

                <div class="pagination">
                </div>
            </div>
        </div>
    </div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('상수도시설')"></button>
<button type="button" class="popup-close"
        onClick="toastr.warning('removeLayer(); cmmUtil.drawClear();', 'onclick 이벤트');" title="닫기"></button>
<button type="button" class="popup-reset" class="초기화"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>
<!-- //업무 > 시설물 공통 -->