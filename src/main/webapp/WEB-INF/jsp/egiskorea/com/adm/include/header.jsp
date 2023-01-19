<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!doctype html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>관리자</title>

		<script src="/adm/js/plugin/jquery/jquery-3.4.1.min.js"></script>

		<%--Font Awesome--%>
		<link rel="stylesheet" href="/adm/js/plugin/fontawesome-free-6.0.0/css/all.min.css"/>

		<!-- jquery-ui -->
		<script src="/adm/js/plugin/jquery-ui/jquery-ui.js"></script>
		<link rel="stylesheet" href="/adm/js/plugin/jquery-ui/jquery-ui.css">

		<%-- jquery-serialize-object --%>
		<script src="<c:url value='/adm/js/plugin/jquery-serialize-object/jquery.serialize-object.min.js'/>"></script>

		<!-- mCustomScrollbar -->
		<script src="/adm/js/plugin/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
		<link rel="stylesheet" href="/adm/js/plugin/mCustomScrollbar/jquery.mCustomScrollbar.css">
		
		<!-- chart -->
		<script src="/adm/js/plugin/chart/Chart.js"></script>

		<%--waitme.js--%>
		<link rel="stylesheet" href="<c:url value='/adm/js/plugin/waitme/waitMe.min.css'/>">
		<script src="<c:url value='/adm/js/plugin/waitme/waitMe.min.js'/>"></script>

		<script src="/adm/js/adm-ui.js"></script>
		
		<!-- 공통 function 파일 -->
		<script src="/js/egiskorea/com/common.js"></script>		

		<link rel="stylesheet" href="/adm/css/common/common.css">
		<!-- adm -->
		<link rel="stylesheet" href="/adm/css/common.css">
		<link rel="stylesheet" href="/adm/css/datepicker.css">
	</head>
	<body>
		<!-- wrap -->
		<div id="wrap">
			<!-- header -->
			<header id="header">
				<div><h1 class="logo"><a href="javascript:void(0);">스마트시티 <strong>IN 양평</strong></a></h1></div>
				<div><a href="javascript:void(0);" class="admin">관리자페이지</a></div>
			</header>
			<!-- //header -->
			<!-- container -->
			<div id="container">
				<!-- side -->
				<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/side.jsp" %>
				<!-- //side -->