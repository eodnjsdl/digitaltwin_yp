<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/egiskorea/com/job/sffm/sffm.js"></script>
<script>
callDatePicker();
</script>

<div class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 445px;" id="insertSafetyFacilLampMngView">
	<div class="popup-header" id="sffm-title-div">가로등관리 등록하기</div>
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
									<th scope="row">관리번호</th>
									<td><input type="text" class="form-control" id="sffm-manage-no" maxlength="19"></td>
									<th scope="row">설치일자</th>
									<td><div class="datapicker-group"><input type="text" class="datepicker" id="sffm-instl-de" maxlength="11"></div></td>
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><input type="text" class="form-control" id="sffm-adres" maxlength="65"></div>
											<div class="col" style="display: none;"><input type="text" class="form-control" id="sffm-location" readonly placeholder="경도, 위도"></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location" onclick="SFFM.setLocation();">지도에서 선택</button></div>
											<input type="hidden" name="geom" id="geom">
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">가로등수</th>
									<td colspan="3"><input type="text" class="form-control" id="sffm-strtlgt-cnt" maxlength="12"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap" id="sffm-btn-div">
					<div><button type="button" class="btn basic bi-write2" onclick="SFFM.insertSffm();">등록</button> <button type="button" class="btn basic bi-cancel closeSub" onclick="SFFM.cancelModal();WLRE.removeCmmPOI();">취소</button></div>
				</div>
			</div>							
		</div>
	</div>
	<button type="button" class="popup-close" title="닫기" onclick="SFFM.cancelModal();WLRE.removeCmmPOI();"></button>				
</div>
<!-- //업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 등록하기 -->