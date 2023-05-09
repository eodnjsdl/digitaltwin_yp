<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="popup-header">지도저장</div>
<div class="popup-body">

    <div class="tool-popup-body">
        <h3 class="cont-txt marT0">현재 지도화면을 저장합니다.</h3>
        <div class="saveMap-thumb">
            <img src="" alt="">
        </div>
        <div class="btn-wrap">
            <div>
                <button type="button" class="btn basic bi-png">PNG생성</button>
            </div>
        </div>

        <div class="bbs-write-default">
            <table class="bbs-write">
                <colgroup>
                    <col style="width: 20%;">
                    <col style="width: auto;">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="row">형식</th>
                    <td>
<span class="form-radio text group">
	<span><input type="radio" name="saveMap" id="saveMapPNG"
                                                     checked="checked"><label
                                                for="saveMapPNG">PNG(이미지)</label></span>
	<span><input type="radio" name="saveMap" id="saveMapPDF"><label
                                                for="saveMapPDF">PDF(이미지+메모)</label></span>
</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div class="cont" style="height: 147px;">
                            <textarea id="stre-memo" class="form-control"
                                      placeholder="메모를 작성해주세요"></textarea>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="position-bottom btn-wrap">
            <div>
                <button type="button" class="btn basic bi-download">다운로드</button>
            </div>
        </div>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('지도저장')"></button>
<button type="button" class="popup-close" title="닫기"></button>
