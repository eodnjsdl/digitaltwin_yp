<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="egis" uri="http://www.egiskorea.com/jsp/egis" %>
<%
    /**
     * @file Name : selectTMapList.jsp
     * @Description : 주제도 팝업 페이지
     * @Modification Information
     * @
     * @  수정일                         수정자                  수정내용
     * @ -------        --------    ---------------------------
     * @ 2022.03.10      이준호                  최초생성
     *
     * @author 플랫폼개발부문 DT솔루션 이준호
     * @since 2022.03.07
     * @version 1.0
     *
     */
%>
<%--@elvariable id="themaMapVO" type="egiskorea.com.mngr.info.service.ThemaMapVO"--%>
<div class="lnb-header"><h2 class="tit">주제도</h2></div>
<div class="lnb-body">
    <div class="srch-box">
        <form id="themaMap-form" method="post">
            <div class="form-row">
                <div class="col">
                    <input type="text" name="searchKeyword" class="form-control" placeholder="주제도명 검색"
                           list="tmap-options" autocomplete="off">
                    <c:if test="${fn:length(dataList) > 0}">
                        <datalist id="tmap-options">
                            <c:forEach var="themaMapVO" items="${dataList}" varStatus="status">
                                <option value="${themaMapVO.themamapNm}"></option>
                            </c:forEach>
                        </datalist>
                    </c:if>
                </div>
                <div class="col-auto">
                    <button type="submit" class="btn type01 search btn-search">검색</button>
                </div>
            </div>
        </form>
    </div>
    <div class="theme-group">
        <p class="tit">양평군 주제도</p>
        <div class="scroll-y">
            <ul class="theme-list-dep1">
                <c:choose>
                <c:when test="${fn:length(themaMapList) > 0}">
                <c:set var="count" value="1"/>
                <c:forEach var="themaMapVO" items="${themaMapList}" varStatus="status">
                <c:choose>
                <c:when test="${prevClCode ne themaMapVO.themamapClCode}">
                <c:if test="${!status.first}">
            </ul>
            </li>
            <c:set var="count" value="1"/>
            </c:if>
            <li><span class="form-checkbox"><input type="checkbox" class="tm tm-chk-all"
                                                   id="theme${themaMapVO.themamapClCode}"><label
                    for="theme${themaMapVO.themamapClCode}">${themaMapVO.themamapCl}</label></span>
                <ul class="theme-list-dep2">
                    <li>
                                                <span class="form-checkbox">
                                                    <input type="checkbox" class="tm tm-chk"
                                                           id="theme${themaMapVO.themamapClCode}-${count}"
                                                           data-layer_nm="${themaMapVO.layerNm}">
                                                    <label for="theme${themaMapVO.themamapClCode}-${count}">${themaMapVO.themamapNm}</label>
                                                </span>
                    </li>
                    </c:when>
                    <c:otherwise>
                        <li>
                                        <span class="form-checkbox">
                                            <input type="checkbox" class="tm tm-chk"
                                                   id="theme${themaMapVO.themamapClCode}-${count}"
                                                   data-layer_nm="${themaMapVO.layerNm}">
                                            <label for="theme${themaMapVO.themamapClCode}-${count}">${themaMapVO.themamapNm}</label>
                                        </span>
                        </li>
                    </c:otherwise>
                    </c:choose>
                    <c:if test="${status.last}">
                </ul>
            </li>
            </c:if>
            <c:set var="count" value="${count + 1}"/>
            <c:set var="prevClCode" value="${themaMapVO.themamapClCode}"/>
            </c:forEach>
            </c:when>
            <c:otherwise>
                <li>주제도 자료가 없습니다.<br/>다른 검색조건을 선택해주세요.</li>
            </c:otherwise>
            </c:choose>

            <%--
            <li><span class="form-checkbox"><input type="checkbox" name="" id="theme1"><label for="theme1">상수시설</label></span>
                <ul class="theme-list-dep2">
                    <li><span class="form-checkbox"><input type="checkbox" name="" id="theme1-1"><label for="theme1-1">상수관로 (설치년도)</label></span></li>
                </ul>
            </li>
            <li><span class="form-checkbox"><input type="checkbox" name="" id="theme2"><label for="theme2">하수시설</label></span>
                <ul class="theme-list-dep2">
                    <li><span class="form-checkbox"><input type="checkbox" name="" id="theme2-1"><label for="theme2-1">하수관로 (설치년도)</label></span></li>
                </ul>
            </li>
            <li><span class="form-checkbox"><input type="checkbox" name="" id="theme3"><label for="theme3">건축물</label></span>
                <ul class="theme-list-dep2">
                    <li><span class="form-checkbox"><input type="checkbox" name="" id="theme3-1"><label for="theme3-1">건축물이력</label></span></li>
                    <li><span class="form-checkbox"><input type="checkbox" name="" id="theme3-2"><label for="theme3-2">건축물허가</label></span></li>
                </ul>
            </li>
            <li><span class="form-checkbox"><input type="checkbox" name="" id="theme4"><label for="theme4-2">토지/건물 소유권</label></span>
                <ul class="theme-list-dep2">
                    <li><span class="form-checkbox"><input type="checkbox" name="" id="theme4-1"><label for="theme4-1">공유재산 (새올행정)</label></span></li>
                    <li><span class="form-checkbox"><input type="checkbox" name="" id="theme4-2"><label for="theme4-2">토지소유권구분(토지대장)</label></span></li>
                </ul>
            </li>
            --%>
            </ul>
        </div>
    </div>
</div>
<div class="lnb-util">
    <button type="button" class="manualBtn" title="도움말"></button>
    <button type="button" class="lnb-resetBtn" title="초기화"></button>
    <button type="button" class="lnb-close" title="닫기"></button>
</div>


<script>

    $(document).ready(function () {
        initBythematicMap();
        eventBindBythematicMap();
        tmLayerCheckedInit(); //주제도 레이어 체크된거 있으면 체크해놓기.
    });

    /**
     * 레이어 추가
     * @param {string} layerId 레이어 아이디
     */
    function _addThemeLayerId(layerId) {
        themeLayer.layerIds.push(layerId);
    }

    /**
     * 레이어 아이디 삭제
     * @param {string} layerId 레이어 아이디
     */
    function _removeThemeLayerId(layerId) {
        const index = themeLayer.layerIds.findIndex((layer) => layer == layerId);
        if (index > -1) {
            themeLayer.layerIds.splice(index, 1);
        }
    }

    /**
     * 레이어 찾기
     * @param {string} layerId
     */
    function _findThemeLayerId(layerId) {
        return themeLayer.layerIds.find((layer) => layer == layerId);
    }

    function initBythematicMap() {
        if (!$(".lnb-theme .scroll-y").hasClass("mCustomScrollbar")) {
            $(".scroll-y").mCustomScrollbar({
                scrollbarPosition: "outside"
            });
        }
        //LEFT 메뉴 닫기 버튼
        $(".lnb-util .lnb-close").click(function () {
            ($(this).parent().parent()).stop().fadeOut(100);
            $("#lnb li[data-menu]").removeClass("on");
        });
    }

    function eventBindBythematicMap() {
        /**
         * @description 주제도 초기화 이벤트
         * @Author 플랫폼개발부문 DT솔루션 이준호
         * @Date 2022.03.10
         */
        $('.lnb-theme .lnb-resetBtn').click(function () {
            themeLayer.layerIds = [];
            $(".lnb-theme input[name='searchKeyword']").val(''); //키워드 초기화
            //기존에 활성화 되어 있는 주제도 레이어 off 및 체크박스 체크 해제
            var $tmChk = $('.tm-chk');
            $tmChk.each(function (index, item) {
                var layerNm = item.dataset.layer_nm; //주제도 레이어명
                dtmap.showLayer({
                    id: layerNm,
                    type: 'WMS',
                    visible: false,
                    layerNm: layerNm
                });

                // if (mapType == '3D') { //3d
                //     var layerList = new Module.JSLayerList(false); //레이어 리스트 조회
                //     var layerId = 'TM_LAYER_' + layerNm.replace('digitaltwin:', '').toUpperCase(); //layerId 생성
                //     var layer = layerList.nameAtLayer(layerId); //레이어 이름으로 레이어 객체 조회
                //     if (layer != null) {
                //         layer.setVisible(false);
                //     }
                // } else if (mapType == '2D') {
                //     var isLayer = store.findLayerId(layerNm);
                //     const yMap = app2D.getYMap();
                //     yMap.removeWMSLayer(layerNm);
                //     store.removeLayerId(layerNm);
                // }

                item.checked = false;
            });
            $('.tm-chk-all').prop('checked', false);
            aj_selectThematicMapList(); //주제도 검색
        });

        /**
         * @description 주제도 닫기 이벤트
         * @Author 플랫폼개발부문 DT솔루션 이준호
         * @Date 2022.03.15
         */
        $(".lnb-theme .lnb-close").click(function () {
            $('.lnb-theme').stop().fadeOut(100);
            $("#lnb li[data-menu]").removeClass("on");
        });

        /**
         * @description 주제도 검색 이벤트
         * @Author 플랫폼개발부문 DT솔루션 이준호
         * @Date 2022.03.10
         */
        $('#themaMap-form').submit(function (e) {
            e.preventDefault();
            aj_selectThematicMapList(); //주제도 검색
            return false;
        });

        /**
         * @description 부모 체크박스 클릭 이벤트
         * @Author 플랫폼개발부문 DT솔루션 이준호
         * @Date 2022.03.10
         */
        $('.tm-chk-all').click(function () {
            var $this = $(this);
            var checked = $this.is(':checked');

            var childrenChk = $this.closest('li').children('.theme-list-dep2').find('.tm-chk'); //자식 노트(체크박스) 찾기
            childrenChk.prop('checked', checked); //자식 노드 체크

            childrenChk.each(function (index, item) {
                var layerNm = item.dataset.layer_nm; //주제도 레이어명

                if (checked) {
                    _addThemeLayerId(layerNm);
                } else {
                    _removeThemeLayerId(layerNm);
                }

                dtmap.showLayer({
                    id: layerNm,
                    type: 'WMS',
                    visible: checked,
                    layerNm: layerNm
                });
                // if (mapType == '3D') { //3D 지도일 경우
                //     var layerList = new Module.JSLayerList(false); //레이어 리스트 조회
                //     var layerId = 'TM_LAYER_' + layerNm.replace('digitaltwin:', '').toUpperCase(); //layerId 생성
                //     var layer = layerList.nameAtLayer(layerId); //레이어 이름으로 레이어 객체 조회
                //
                //     if (layer == null) {
                //         loadWMS_3D(layerId, layerNm, "")
                //     } else {
                //         layer.setVisible(checked);
                //     }
                // } else if (mapType == '2D') {  //2D 지도일 경우
                //     const yMap = app2D.getYMap();
                //     if (checked) {
                //         yMap.addWMSLayer(layerNm, null, 2);
                //     } else {
                //         yMap.removeWMSLayer(layerNm);
                //     }
                // }
            });
        });

        /**
         * @description 자식 체크박스 클릭 이벤트
         * @Author 플랫폼개발부문 DT솔루션 이준호
         * @Date 2022.03.10
         */
        $('.tm-chk').click(function () {
            var $this = $(this);
            var layerNm = $this.data('layer_nm'); //주제도 레이어명
            var checked = $this.is(':checked');
            var parentUl = $this.closest('ul[class="theme-list-dep2"]');
            var brotherChkLength = parentUl.find('.tm-chk').length; //형재 노드(체크박스) 갯수
            var brotherCheckedLength = parentUl.find('.tm-chk:checked').length; //형제 노드(체크박스) 체크된 갯수
            var parentChk = parentUl.closest('li').find('.tm-chk-all'); //부모 노드(체크박스) 찾기

            var _style = {
                fill: {
                    color: 'rgba(255,128,128,0.28)'
                },
                stroke: {
                    color: '#FF8080',
                    width: 4
                },
            };

            //형제 노드(체크박스) 갯수 == 형제 노드(체크박스) 체크된 갯수가 같으면 부모 체크 박스 체크 해주기.
            if (brotherChkLength == brotherCheckedLength) {
                parentChk.prop('checked', true);
            } else {
                parentChk.prop('checked', false);
            }

            if (checked) {
                _addThemeLayerId(layerNm);
            } else {
                _removeThemeLayerId(layerNm);
            }

            console.log(layerNm);
            dtmap.showLayer({
                id: layerNm,
                type: 'WMS',
                visible: checked,
                layerNm: layerNm
            });
            // if (mapType == '3D') { //3D 지도일 경우
            //     var layerList = new Module.JSLayerList(false); //레이어 리스트 조회
            //     var layerId = 'TM_LAYER_' + layerNm.replace('digitaltwin:', '').toUpperCase(); //layerId 생성
            //     var layer = layerList.nameAtLayer(layerId); //레이어 이름으로 레이어 객체 조회
            //
            //     if (layer == null) {
            //         loadWMS_3D(layerId, layerNm, "")
            //     } else {
            //         layer.setVisible(checked);
            //     }
            // } else if (mapType == '2D') { //2D 지도일 경우
            //     const yMap = app2D.getYMap();
            //     if (checked) {
            //         yMap.addWMSLayer(layerNm, null, 2);
            //     } else {
            //         yMap.removeWMSLayer(layerNm);
            //     }
            // }

        });

    }

    /**
     * @description 주제도 팝업 뜰때 기존에 활성화 시킨 주제도 레이어 체크박스에 체크해주기.
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.11
     */
    function tmLayerCheckedInit() {
        var $tmChk = $('.tm-chk');

        $tmChk.each(function (index, item) {
            var layerNm = item.dataset.layer_nm; //주제도 레이어명

            // if (mapType == '2D') { //2d
            item.checked = _findThemeLayerId(layerNm) ? true : false;
            // } else if (mapType == '3D') { //3d
            //
            //     var layerList = new Module.JSLayerList(false); //레이어 리스트 조회
            //     var layerId = 'TM_LAYER_' + layerNm.replace('digitaltwin:', '').toUpperCase(); //layerId 생성
            //     var layer = layerList.nameAtLayer(layerId); //레이어 이름으로 레이어 객체 조회
            //     if (layer != null) {
            //         var checked = layer.getVisible();
            //         item.checked = checked;
            //     }
            // }

            // //형제 노드(체크박스) 찾아서 모두 체크되면 부모 체크해주기
            var parentUl = $(item).closest('ul[class="theme-list-dep2"]');
            var brotherChkLength = parentUl.find('.tm-chk').length; //형재 노드(체크박스) 갯수
            var brotherCheckedLength = parentUl.find('.tm-chk:checked').length; //형제 노드(체크박스) 체크된 갯수
            var parentChk = parentUl.closest('li').find('.tm-chk-all'); //부모 노드(체크박스) 찾기
            //형제 노드(체크박스) 갯수 == 형제 노드(체크박스) 체크된 갯수가 같으면 부모 체크 박스 체크 해주기.
            if (brotherChkLength == brotherCheckedLength) {
                parentChk.prop('checked', true);
            } else {
                parentChk.prop('checked', false);
            }

        });
    }

</script>