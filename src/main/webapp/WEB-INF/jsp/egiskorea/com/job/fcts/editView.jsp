<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<style type="text/css">
	.popup-panel.popup-sub .editView-popup-close {
	    top: 0;
	    right: 0;
	    width: 39px;
	    height: 39px;
	    border-left: 1px solid #44516A;
	    background: url(/images/icon/popup-close2.svg) no-repeat 50% 50%;
	    border-top-right-radius: 10px;
	    position: absolute;
	}
</style>

<!-- js -->
<script src="/js/egiskorea/com/job/fcts/editView.js"></script>			<!-- 공간정보 편집도구 -->

<div class="popup-header">공간정보 편집도구</div>
<div class="popup-body">
    <div class="sub-popup-body space-editTool">
        <div class="data-default">
            <table class="data-write">
                <tbody>
                    <tr>
                        <td>
                            <div class="form-row">
                                <div>
                                    <select name="edit-snap-target" class="form-select">
                                    </select>
                                </div>
                                <div class="col-auto"><button type="button" class="btn basic btn-xsm edit-btn-snap">스냅</button></div>
                                <div class="col-auto">
                                	<!-- <button type="button" class="icon-btn edit edit-btn-modify" title="수정"></button> --> 
                                	<button type="button" class="icon-btn delete edit-btn-remove" title="삭제"></button>
                                </div>
                                <div class="col-auto" style="margin-left: auto;"><button type="button" class="btn type03 btn-xsm edit-btn-add">객체추가</button></div>
                            </div>
                        </td>
                    </tr>
                    <tr class="tr_coordinate">
                        <td>
                            <div class="form-row">
                                <div class="col">
                                    <select class="form-select">
                                        <option value="EPSG:4326">위경도</option>
                                    </select>
                                </div>
                                <div class="col"><input type="number" class="form-control edit-x"></div>
                                <div class="col"><input type="number" class="form-control edit-y"></div>
                                <div class="col-auto"><button type="button" class="btn type03 btn-xsm edit-add-coordinate">좌표추가</button></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <input type="hidden" class="pointTempGeomWKT" 	value="">
        <input type="hidden" class="lineTempGeomWKT" 	value="">
        <input type="hidden" class="polygonTempGeomWKT"	value="">

        <div class="position-bottom btn-wrap"><div><button type="button" class="btn basic bi-check edit-btn-apply">적용</button></div></div>
    </div>
</div>
<button type="button" class="editView-popup-close" title="닫기"></button>
