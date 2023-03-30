<%@ page language="java" contentType="text/html; charset=UTF-8" %>

<!-- 소방시설  -->
<!-- 속성검색 option -->
<tr>  
	<th scope="row">읍면동</th>  
	<td>    
		<select name="hjd_cde" class="form-select">
			<option value="">선택</option>
		</select>  
	</td>
</tr>
<tr>  
	<th scope="row">소화전형식</th>  
	<td>    
		<select name="mof_cde" class="form-select">
			<option value="">선택</option>
		</select>  
	</td>
</tr>
<tr>  
	<th scope="row">관경</th>  
	<td>    
		<input type="number" name="std_dip_min" class="form-control" value="" style="width:68px">    
		<input type="number" name="std_dip_max" class="form-control" value="" onkeyup="inputKeyup()" style="width:68px">  
	</td>
</tr>
<!-- 속성검색 option end-->