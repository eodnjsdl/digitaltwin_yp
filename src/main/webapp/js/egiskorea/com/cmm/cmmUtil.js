
var cmmUtil = {

  /**
   * 좌표로 주소 가져오기 (EPSG:5179)
   * @param {number} x X 좌표
   * @param {number} y Y 좌표
   */
  reverseGeocoding: function (x, y) {
    const deferred = $.Deferred();
    const format = new ol.format.WKT();

    var position_5174 = proj4(dtmap.crs, "EPSG:5174", [x , y]); //5179좌표에서 5174로 변경

    const point_5174 = new ol.geom.Point([position_5174[0], position_5174[1]]);
    const wkt_5174 = format.writeGeometry(point_5174);
    
    const point_5179 = new ol.geom.Point([x, y]);
    const wkt_5179 = format.writeGeometry(point_5179);
    
    //$.post("/gis/reverseGeocoding.do", { wkt: wkt }
    $.post("/gis/reverseGeocoding5174.do", { wkt5174: wkt_5174, wkt5179: wkt_5179 })
      .done((response) => {
        const result = JSON.parse(response)["result"];
        if (result["emdKorNm"]) {
          let address = ``;
          address += result["emdKorNm"] + ` `;
          address += result["liKorNm"] + ` `;
          address += result["mntnYn"] == "2" ? `산 ` : ``;
          address += parseInt(result["lnbrMnnm"]);
          address += parseInt(result["lnbrSlno"])
            ? `-${parseInt(result["lnbrSlno"])}`
            : ``;
          result["address"] = address;
        }
        if (result["rn"]) {
          let roadAddress = ``;
          roadAddress += result["rn"] + ` `;
          roadAddress += result["buldMnnm"];
          roadAddress += parseInt(result["buldSlno"])
            ? `-${parseInt(result["buldSlno"])}`
            : ``;
          result["roadAddress"] = roadAddress;
        }
        deferred.resolve(result);
      })
      .fail(() => {
        alert("주소 정보를 가져오는데 실패했습니다.");
      });
    return deferred;
  },

  /**
   * @description 좌표로 주소 가져오기 (5174 주소검색)
   * @author 플랫폼개발부문 DT솔루션 이준호
   * @date 2022.07.26
   * @param {object} x x._5174, x._5179 좌표
   * @param {object} y y._5174, y._5159 좌표
   */
  reverseGeocoding5174: function (x, y) {

    //console.log('xObj : ', x);
    //console.log('yObj : ', y);

    const deferred = $.Deferred();
    const format = new ol.format.WKT();

    const point_5174 = new ol.geom.Point([x._5174, y._5174]);
    const wkt_5174 = format.writeGeometry(point_5174);

    const point_5179 = new ol.geom.Point([x._5179, y._5179]);
    const wkt_5179 = format.writeGeometry(point_5179);

    $.post("/gis/reverseGeocoding5174.do", { wkt5174: wkt_5174, wkt5179: wkt_5179 })
        .done((response) => {
          const result = JSON.parse(response)["result"];
          if (result["emdKorNm"]) {
            let address = ``;
            address += result["emdKorNm"] + ` `;
            address += result["liKorNm"] + ` `;
            address += result["mntnYn"] == "2" ? `산 ` : ``;
            address += parseInt(result["lnbrMnnm"]);
            address += parseInt(result["lnbrSlno"])
                ? `-${parseInt(result["lnbrSlno"])}`
                : ``;
            result["address"] = address;
          }
          if (result["rn"]) {
            let roadAddress = ``;
            roadAddress += result["rn"] + ` `;
            roadAddress += result["buldMnnm"];
            roadAddress += parseInt(result["buldSlno"])
                ? `-${parseInt(result["buldSlno"])}`
                : ``;
            result["roadAddress"] = roadAddress;
          }
          deferred.resolve(result);
        })
        .fail(() => {
          alert("주소 정보를 가져오는데 실패했습니다.");
        });
    return deferred;
  },



    //이미지 확대
    zoomInImage: function(src) {
      var html = "";
      html += "<img src='"+src+"' id='zoomActionImg' alt='이미지' data-action='zoom'/>"
        $("#wrap").empty(html).append(html);

    }


};
