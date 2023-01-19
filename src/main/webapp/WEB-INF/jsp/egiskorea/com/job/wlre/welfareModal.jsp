<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %> 

<script src="/js/egiskorea/com/job/wlre/wlre.js"></script>
<script>
$(document).ready(function() {
	var cdHtml = $('#wlre-search-fclty-se').html();
	$('#wlre-fclty-se').append(cdHtml);
});
</script>				
				<!-- 업무 > 시설관리 > 복지시설 > 등록하기 -->
				<div id="wlreInsert_Div" class="popup-panel popup-sub work-02-05-regist opened" style="bottom: 398px;right: 70px;width: 550px;height: 330px;">
					<div class="popup-header" id="wlre-title-div">복지시설 등록하기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
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
											<th scope="row">시설명</th>
											<td colspan="3"><input type="text" class="form-control" id="wlre-fclty-nm" maxlength="50"></td>												
										</tr>										
										<tr>
											<th scope="row">시설구분</th>
											<td>
<!-- 											<input type="text" class="form-control" id="wlre-fclty-se" maxlength="50"> -->
												<select name="wlre-fclty-se" class="form-control" id="wlre-fclty-se">
												</select>
											</td>
											<th scope="row">전화번호</th>
											<td><input type="text" class="form-control" id="wlre-cttpc-telno" maxlength="20"></td>
										</tr>	
										<tr>
											<th scope="row">도로명주소</th>
											<td><input type="text" class="form-control" id="wlre-rn-adres" maxlength="200"></td>
											<th scope="row">우편번호</th>
											<td><input type="text" class="form-control" id="wlre-zip" maxlength="6"></td>											
										</tr>	
										<tr>
											<th scope="row">지번주소</th>
											<td colspan="3">
												<div class="form-row">
													<div class="col"><input type="text" class="form-control" id="wlre-lnm-adres" maxlength="200"></div>
													<div class="col" style="display: none;"><input type="text" class="form-control" id="wlre-location" readonly placeholder="경도, 위도"></div> 
													<div class="col-auto"><button type="button" class="btn type01 bi-location" onclick="WLRE.setLocation();">지도에서 선택</button></div>
													<input type="hidden" name="geom" id="geom">
												</div>
											</td>												
										</tr>
									</tbody>
								</table>
							</div>
							<div class="position-bottom btn-wrap" id="wlre-btn-div" style="margin-bottom: 20px;">
								<div><button type="button" class="btn basic bi-write2" onclick="WLRE.insertWelfare();">등록</button> <button type="button" class="btn basic bi-cancel closeSub" onclick="WLRE.cancelModal();WLRE.removeCmmPOI();">취소</button></div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기" onclick="WLRE.cancelModal();WLRE.removeCmmPOI();"></button>				
				</div>
				<!-- //업무 > 시설관리 > 복지시설 > 등록하기 -->