"use strict"
class InfoLayer {
	constructor() {
	}
	setTableView(_type) {
		var legendViewerVal = $("#LegendViewer").val();
		
		if( !_type ) {
			$("#map_YP_InfoList").css("display", "none");
			return;
		}
		
		if(legendViewerVal == "n") {
			$("#map_YP_InfoList").css("display", "none");
		} else {
			$("#map_YP_InfoList").css("display", "block");
		}
	}
	setData(_data) {
		
		$("#map_YP_InfoList").html("국토센서스관련 지목현황조사파일 속성정보");
		var html = "";
/*		 
		Lp.global.fields = [];
		Lp.global.orders = [];

		var tblLength = tbl.length;
		html += "	<th width='2.5%' class=\"p-5 text-center\"><button class=\"btn btn-purple btn-xs\"><i class=\"fa fa-map-marker-alt\"></i></button></th>\n";

		for(var i = 0; i < tbl.length; i++) {
			html += "	<th class=\"p-5\">"+tbl[i].column_name+" </th>\n";
			var col = "<option value=\""+tbl[i].column_name+"\">"+tbl[i].column_name+"</option>";
			 
			Lp.global.fields.push(tbl[i].column_name);

			var ord = {
				"Field" : tbl[i].column_name,
				"Ord" : "none"
			}
			Lp.global.orders.push(ord);

			$("#popupViewSelectColumn").append(col);
		}

		$("#propertyTblHead").html(html);
		$("#map_0_propertyTableWrap").css("display", "block");

		Lp.property.loadSplitData(1);
		$("#map_0_propertyTableContent").scroll(function(e) {
			var t = $("#map_0_propertyTableContent").scrollTop();
			var h = $("#propertyTbl").height();
			var v = h - t;
			if(v < 240) {
				Lp.property.loadSplitData(Lp.global.Pn+1);
				}
			});
*/
	}
}

var CInfoTable = new InfoLayer();