<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/egiskorea/com/job/cctv/cctv.js"></script>
<script>
</script>

<div class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 445px;" id="insertSafetyFacilCctvMngView">
	<div class="popup-header" id="cctv-title-div">CCTV관리 등록하기</div>
	<div class="popup-body">
		<div class="sub-popup-body">
			<div class="data-write-wrap" style="height: 100%;">
				<div class="scroll-y">
					<div class="data-default">
						<table class="data-write">
							<colgroup>
								<col style="width: 23%;">
								<col style="width: auto;">
								<col style="width: 23%;">
								<col style="width: auto;">
							</colgroup>
							<tbody>
								<tr>
									<th scope="row">기기ID</th>
									<td><input type="text" class="form-control" id="cctv-deviceid" maxlength="20"></td>
									<th scope="row">기기구분</th>
									<td><select name="cctv-insert-selbox" class="form-control" id="cctv-insert-selbox"></select></td>
								</tr>
								<tr>
									<th scope="row">명칭</th>
									<td colspan="3">
										<div class="col"><input type="text" class="form-control" id="cctv-label" maxlength="254"></div>
									</td>
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><input type="text" class="form-control" id="cctv-adres" maxlength="255"></div>
											<div class="col" style="display: none;"><input type="text" class="form-control" id="cctv-location" readonly placeholder="경도, 위도"></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location" onclick="CCTV.setLocation();">지도에서 선택</button></div>
										</div>
									</td>
								</tr>
								<!-- <tr>
									<td colspan="4">
										<div class="form-row">
											<div class="col"><input type="text" class="form-control" id="cctv-location" readonly placeholder="경도, 위도"></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location" onclick="CCTV.setLocation();">지도에서 선택</button></div>
										</div>
									</td>
								</tr> -->
							</tbody>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap" id="cctv-btn-div">
					<div><button type="button" class="btn basic bi-write2" onclick="CCTV.insertCctv();">등록</button> <button type="button" class="btn basic bi-cancel closeSub" onclick="CCTV.removeCmmPOI();">취소</button></div>
				</div>
			</div>							
		</div>
	</div>
	<button type="button" class="popup-close" title="닫기" onclick="SFFM.cancelModal();CCTV.removeCmmPOI();"></button>				
</div>
<!-- //업무 > 공간정보활용 > 안전시설물관리 > CCTV관리 등록하기 -->