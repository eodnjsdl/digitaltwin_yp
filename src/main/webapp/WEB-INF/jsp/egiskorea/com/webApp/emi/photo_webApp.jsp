<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!-- 지목조사 -->
<div class="tab-cont proTab06">
	<div class="scroll-y">
		<div class="data-default">
			<table class="data-write">
				<tbody>
                 <tr>
                     <th scope="row">원경</th>
                     
                 </tr>
                 <tr style="height: 500px">
                     <td><img name="far" /></td>
                 </tr>
                 <tr style="height: 500px">
                     <th scope="row">근경</th>
                     
                 </tr>
                 <tr>
                     <td><img name="near" /></td>
                 </tr>
                 </tbody>
			</table>
		</div>
	</div>
	<div class="position-bottom btn-wrap justify-content-end examinationBtn">
		<button type="button" class="btn basic bi-save" style="margin: 0 3px;" onClick="fn_update_examinationInfo(this.form)">수정</button>
		<button type="button" class="btn basic bi-cancel" style="margin: 0 3px;" onclick="webApp_fn_cancel_examinationInfo(this.form)">취소</button>
	</div>
</div>