/**
 *
 */

var cmmUtil = {
  /**
   * name     : 엑셀 저장
   * function : cmmUtil.excelDown(table,chk1,name);
   * args     : table id, 체크박스 name, 파일명
   */
  excelDown: function (th, tb, name) {
    var len = $("input[name=" + tb + "]:checked").length;
    var exNm = name.toString();

    var thead = $("#" + th)[0].outerHTML;

    var html = thead.replace("</table>", "");
    html += "<tbody>";
    for (var i = 0; i < len; i++) {
      var text = $("input[name=" + tb + "]:checked")[i].parentNode.parentNode
        .parentNode.parentNode.outerHTML;
      html += text;
    }

    html += "</tbody></table>";

    var url = "data:text/csv;charset=euc-kr," + html;
    var link = document.createElement("a");
    link.href = url;

    link.style = "visibility:hidden";
    link.download = exNm + ".xls";

    document.body.appendChild(link);
    link.click();
  },

  /**
   * 지도 초기화
   */
  resetMap: function () {
    if (app2D) {
      const yMap = app2D.getYMap();
      yMap.reset();
    } else {
      // TO-DO 3D 지도 부분
    }
  },

  /**
   * 지도 중심점 반환 (EPSG:5179)
   * @returns {Array.<number>} 지도 중심점 (ex: [999028.8152684278, 1943589.1358372485])
   */
  getMapCenter: function () {
    if (app2D) {
      const yMap = app2D.getYMap();
      return yMap.getMap().getView().getCenter();
    } else {
      var centerMap = Module.getViewCamera().getCenterPoint();
      return centerMap;
    }
  },

  /**
   * 지도 축척레벨 반환
   * @returns {numbber} 축척레벨
   */
  getMapZoom: function () {
    if (app2D) {
      const yMap = app2D.getYMap();
      return yMap.getMap().getView().getZoom();
    } else {
      var zoomLevel = Module.getViewCamera().getMapZoomLevel() + 4; //줌레벨 차이가 있어 2D기준으로 맞췄습니다_박규호
      return zoomLevel;
    }
  },

  /**
   * 지도 이벤트 등록
   * @param {string} type 타입
   * @param {Function} handler 핸들러
   */
  onMap: function (type, handler) {
    if (app2D) {
      const yMap = app2D.getYMap();
      const map = yMap.getMap();
      map.on(type, () => {
        if (handler) {
          handler({
            center: cmmUtil.getMapCenter(),
            zoom: cmmUtil.getMapZoom(),
          });
        }
      });
    } else {
      // TO-DO 3D 지도 부분
    }
  },

  /**
   * 지도 영역 반환 (EPSG:5179)
   * @returns {Array.<number>} 영역 (ex: [997883.5433546376, 1943030.2192834874, 1000174.0871822181, 1944148.0523910096])
   */
  getMapExtent: function () {
    if (app2D) {
      const yMap = app2D.getYMap();
      return yMap.getMap().getView().calculateExtent();
    } else {
      // TO-DO 3D 지도 부분
      var x = 0;
      var y = 0;
      var x2 = $("#canvas")[0].width;
      var y2 = $("#canvas")[0].height;

      var min = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(x, y));
      var max = Module.getMap().ScreenToMapPointEX(
        new Module.JSVector2D(x2, y2)
      );

      var minx = min.Longitude;
      var miny = min.Latitude;
      var minxy = new Module.JSVector2D(minx, miny);
      var maxx = max.Longitude;
      var maxy = max.Latitude;
      var maxxy = new Module.JSVector2D(maxx, maxy);
      var minCood = GLOBAL.Projection.convertProjection(0, minxy, 26);
      var maxCood = GLOBAL.Projection.convertProjection(0, maxxy, 26);
      return [minCood.x, minCood.y, maxCood.x, maxCood.y];
    }
  },

  /**
   * 영역을 Polygon으로 변경 (2D)
   * @param {Array.<number>} extent 영역
   * @returns {ol.geom.Polygon} 면형공간정보
   */
  toPolygonFromExtent: function (extent) {
    return ol.geom.Polygon.fromExtent(extent);
  },

  /**
   * Geometry를 WKT로 변경 (2D)
   * @param {ol.geom.Geometry} geometry 공간정보
   * @returns {string} WKT
   */
  toWKT: function (geometry) {
    const format = new ol.format.WKT();
    return format.writeGeometry(geometry);
  },

  /**
   * 지도 중심점 경위도 반환
   * @returns {Array.<number>} 경위도 (ex : [127.48901375126452, 37.49155200087505])
   */
  getMapCenterLonLat: function () {
    if (app2D) {
      return ol.proj.toLonLat(this.getMapCenter(), "EPSG:5179");
    } else {
      var center = Module.getViewCamera().getCenterPoint();
      var lonlat = [center.Longitude, center.Latitude];
      return lonlat;
    }
  },

  /**
   * name     : 공간검색 사용자정의
   * function : cmmUtil.spitalDraw(type);
   * args     : type - 선택도구
   */
  spitalDraw: function (type) {
    this.drawClear();

    if (app2D) {
      const yMap = app2D.getYMap();
      const select = yMap.getModule("select");
      let drawType = "";

      switch (type) {
        case "1":
          drawType = "Point";
          break;
        case "2":
          drawType = "LineString";
          break;
        case "3":
          drawType = "Box";
          break;
        case "4":
          drawType = "Circle";
          break;
      }

      if (drawType) {
        select.once(drawType, "drawend", true).done((event) => {
          const feature = event.feature;
          setTimeout(() => {
            yMap.getModule("highlight").addFeature("sky", feature);
          }, 100);
        });
      }
    } else {
      switch (type) {
        case "1":
          Module.XDSetMouseState(Module.MML_INPUT_LINE);
          $("#canvas").on("mousedown", function () {
            Module.getMap().clearInputPoint();
          });
          break;
        case "2":
          Module.XDSetMouseState(Module.MML_INPUT_LINE);
          $("#canvas").off();
          $("#canvas").on("dblclick", function () {
            Module.XDSetMouseState(1);
          });
          break;
        case "3":
          Module.XDSetMouseState(Module.MML_INPUT_RECT);
          break;
        case "4":
          Module.XDSetMouseState(Module.MML_INPUT_CIRCLE);
          break;
      }
    }
  },

  /**
   * name     : 지도위 마우스로 라인 그리기
   * function : cmmUtil.drawLine(callbak);
   * args     : callbak - 좌표값 리턴처리할 함수명
   */
  drawLine: function (callbak) {
    this.drawClear();

    if (app2D) {
      const yMap = app2D.getYMap();
      const select = yMap.getModule("select");
      let drawType = "LineString";

      select.once(drawType, "drawend", true).done((event) => {
        const feature = event.feature;
        setTimeout(() => {
          yMap.getModule("highlight").addFeature("sky", feature);
          cmmUtil.getLinePosition(callbak);
        }, 100);
      });
    } else {
      Module.XDSetMouseState(Module.MML_INPUT_LINE);
      $("#canvas").off();
      $("#canvas").on("dblclick", function () {
        Module.XDSetMouseState(1);
        cmmUtil.getLinePosition(callbak);
      });
    }
  },

  getLinePosition(callback) {
    if (app2D) {
      /*const yMap = app2D.getYMap();
		const mapProjection = yMap.getMap().getView().getProjection().getCode();
		var chk = $("input[name=" + id + "Select]:checked").val();
		if (chk == "1") {
			const extent = cmmUtil.getMapExtent();
			const geometry = cmmUtil.toPolygonFromExtent(extent).transform(mapProjection, "EPSG:4326");
			return cmmUtil.toWKT(geometry);
		} else {
			const wkt = cmmUtil.getSelectFeatureWKT();
			if (wkt) {
				const format = new ol.format.WKT();
				const geometry = format.readGeometry(wkt).transform(mapProjection, "EPSG:4326");
				return cmmUtil.toWKT(geometry);
			} else {
				return null;
			}
		}*/
    } else {
      var resultLine = "",
        data = "";
      var pList = Module.getMap().getInputPointList().count - 1;
      var point = "";
      for (var i = 0; i < pList; i++) {
        var lonlat = Module.getMap().getInputPointList().item(i);
        var position = TransformCoordinate(
          lonlat.Longitude,
          lonlat.Latitude,
          13,
          26
        );
        if (i != 0) {
          data += " , ";
        } else {
          point = position;
        }
        data += position.x + " " + position.y;
      }
      resultLine = "LINESTRING(" + data + ")";

      cmmUtil.reverseGeocoding(point.x, point.y).done((result) => {
        address = result["address"];
        if (address == "" || address == undefined) {
          address = "-";
        }
        callback(resultLine, address);
      });
    }

    Module.XDSetMouseState(1);
  },
  /**
   * 시설물 선택
   * @param {string} featureType 공간객체타입 (레이어명)
   */
  selectFacility: function (featureType) {
    // 2D
    if (app2D) {
      const yMap = app2D.getYMap();
      yMap.getModule("highlight").clearSource("sky");

      const selectFacility = yMap.getModule("selectFacility");
      selectFacility.active(featureType, (event) => {
        if (event["selected"].length > 0) {
          const feature = event["selected"][0];
          yMap.getModule("highlight").clearSource("sky");
          yMap.getModule("highlight").addFeature("sky", feature);
          selectFacility.reset();
        }
      });
    } else {
      // TO-DO 3D 지도 부분
    }
  },

  /**
   * 선택 그리기 공간객체 WKT 가져오기
   * @returns {string} WKT
   */
  getSelectFeatureWKT: function () {
    // 2D
    if (app2D) {
      const yMap = app2D.getYMap();
      const module = yMap.getModule("highlight");
      const features = module.getFeatures("sky");
      if (features.length > 0) {
        const feature = features[0];
        let geometry = feature.getGeometry().clone();
        if (geometry instanceof ol.geom.Circle) {
          geometry = ol.geom.Polygon.fromCircle(geometry);
        }
        return this.toWKT(this.toSystemProjection(geometry));
      } else {
        return null;
      }
    } else {
      // trArea :   ,   srchSpace :   ,   areaSearchArea : 검색
      if (
        $("#trArea").hasClass("on") ||
        $("#srchSpace").hasClass("on") || 
        ( $(".areaSearchArea").hasClass("on") && $('.lnb-search').css("display") == "block" )
      ) {
        //3d 영역기준
        var chk = "";
        if (
          $("input[name='download-search-drawing']:checked").val() != undefined
        ) {
          chk = $("input[name='download-search-drawing']:checked").val();
        } else if (
          $("input[name='rad-facility-drawing']:checked").val() != undefined
        ) {
          chk = $("input[name='rad-facility-drawing']:checked").val();
        } else if (
          $("input[name='rad-search-drawing']:checked").val() != undefined
        ) {
          chk = $("input[name='rad-search-drawing']:checked").val();
        } else if($('#rad-facility-drawing-box').val() != undefined) {
        	chk = $('#rad-facility-drawing-box').val();
        } else if($('#searchForm .on .drawing-obj.small input:checked').val() != undefined) {
        	chk = $('#searchForm .on .drawing-obj.small input:checked').val();
        } else {
        	console.log("그리기 도구 선택되지 않음");
        }
        
        var pList = Module.getMap().getInputPointList().count;
        if (pList < 1) {
        } else {
          var data = "";

          for (var i = 0; i < pList; i++) {
            var lonlat = Module.getMap().getInputPointList().item(i);
            var tData = TransformCoordinate(
              lonlat.Longitude,
              lonlat.Latitude,
              13,
              26
            );

            if (i != 0) {
              data += ",";
            }
            data += tData.x + " " + tData.y;
          }

          switch (chk) {
            case "1":
              result = "POINT(" + data + ")";
              break;
            case "2":
              result = "LINESTRING(" + data + ")";
              break;
            case "3":
              result = "POLYGON((" + data + "))";
              break;
            case "4":
              result = "POLYGON((" + data + "))";
              break;
          }
        }
        return result;
      } else {
        //3d 시설물기준
        if (GLOBAL.SelectObject != null) {
              		  
          var type = GLOBAL.SelectObject.split("-")[0];
          var layerName = GLOBAL.SelectObject.split("-")[1];
          var id = GLOBAL.SelectObject.split("-")[2];
          var geomList = "";
          var result = "";

          //선택된 객체 id값받아서 지오서버로 지오메트리 받아오기
          var uurl =
            geo_url +
            "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=digitaltwin%3A" +
            layerName +
            "&srsname=EPSG:4326&outputFormat=application%2Fjson&cql_filter=gid=" +
            id +
            "";

          $.ajax({
            type: "GET",
            url: uurl,
            async: false,
            success: (data, status) => {
              if (status == "success") {
              result = this.make3DGeometry(data,"5179")
              GLOBAL.selectObjectData = data
              } else {
                alert("ERROR!");
                return;
              }
            },
          });
          return result;
        }
      }
    }
  },

  /**
   * name     : 공간검색 조회
   * function : cmmUtil.spitalSearch(id);
   * args     : id - 업무영문명 및 공검색 객체 name에 다 붙어있어야함
   * ex		: sportsSelect - 화면영역, 사용자정의 value - 1, 2
   *            sportsAreaDrawing - 그리기 도구 value - 1, 2, 3, 4
   */
  spitalSearch: function (id) {
    if (app2D) {
      const yMap = app2D.getYMap();
      const mapProjection = yMap.getMap().getView().getProjection().getCode();
      var chk = $("input[name=" + id + "Select]:checked").val();
      if (chk == "1") {
        const extent = cmmUtil.getMapExtent();
        const geometry = cmmUtil
          .toPolygonFromExtent(extent)
          .transform(mapProjection, "EPSG:4326");
        return cmmUtil.toWKT(geometry);
      } else {
        const wkt = cmmUtil.getSelectFeatureWKT();
        if (wkt) {
          const format = new ol.format.WKT();
          const geometry = format
            .readGeometry(wkt)
            .transform(mapProjection, "EPSG:4326");
          return cmmUtil.toWKT(geometry);
        } else {
          return null;
        }
      }
    } else {
      var chk = $("input[name=" + id + "Select]:checked").val();
      var chk2 = $("input[name=" + id + "AreaDrawing]:checked").val();
      var result = "";

      if (chk == "1") {
        var x = 0;
        var y = 0;
        var x2 = $("#canvas")[0].width;
        var y2 = $("#canvas")[0].height;

        var min = Module.getMap().ScreenToMapPointEX(
          new Module.JSVector2D(x, y)
        );
        var max = Module.getMap().ScreenToMapPointEX(
          new Module.JSVector2D(x2, y2)
        );

        var minx = min.Longitude;
        var miny = min.Latitude;

        var maxx = max.Longitude;
        var maxy = max.Latitude;

        result =
          "POLYGON((" +
          parseFloat(minx) +
          " " +
          parseFloat(miny) +
          ", " +
          parseFloat(maxx) +
          " " +
          parseFloat(miny) +
          ", " +
          parseFloat(maxx) +
          " " +
          parseFloat(maxy) +
          ", " +
          parseFloat(minx) +
          " " +
          parseFloat(maxy) +
          ", " +
          parseFloat(minx) +
          " " +
          parseFloat(miny) +
          "))";
      } else {
        var pList = Module.getMap().getInputPointList().count;
        if (pList < 1) {
        	var layerList = new Module.JSLayerList(true);
			var layer = layerList.nameAtLayer("Line_Arr_Option");
			if(layer != null) {
				layer.removeAll();
			}
          alert("영역을 선택해주세요.");
        } else {
          var data = "";
          if (chk2 == "2") {
            pList - 1;
          }
          for (var i = 0; i < pList; i++) {
            var lonlat = Module.getMap().getInputPointList().item(i);
            if (i != 0) {
              data += " , ";
            }
            data += lonlat.Longitude + " " + lonlat.Latitude;
          }
          switch (chk2) {
            case "1":
              result = "POINT(" + data + ")";
              break;
            case "2":
              result = "LINESTRING(" + data + ")";
              break;
            case "3":
              result = "POLYGON((" + data + "))";
              break;
            case "4":
              result = "POLYGON((" + data + "))";
              break;
          }
          createLineArr();
        }
      }
      Module.XDSetMouseState(1);
      /*this.drawClear();*/
      return result;
    }
  },

  /**
   * 그리기 초기화
   */
  drawClear: function () {
    if (app2D) {
      const yMap = app2D.getYMap();
      yMap.getModule("highlight").clearSource("sky");
      yMap.getModule("highlight").clearSource("yellow");
    } else {
      Module.getMap().clearInputPoint();
      $("#canvas").on("mousedown", function () {});
      Module.XDSetMouseState(1);
    }
  },

  // 맵 지도 클릭지점 좌표값 리턴(클릭이벤트 등록후 삭제 한다.)
  getPosition: function (callback) {
    var mapType = $('input:radio[name="mapType"]:checked').val();
    if (mapType == "2D") {
      const yMap = app2D.getYMap();
      const select = yMap.getModule("select");
      select.once("Point", "drawend", true).done((event) => {
        const feature = event.feature;
        const geometry = this.toMapProjection(feature.getGeometry());
        const position = geometry.getCoordinates();
        callback(parseFloat(position[0]), parseFloat(position[1]));
      });
    } else {
      Module.canvas.onclick = function (e) {
        var Projection = Module.getProjection();
        var positionString = Module.GetClickPosition();
        var position = positionString.split("_");
        var pointX = Number(position[0]); //x 좌표
        var pointY = Number(position[1]); //y 좌표
        var alt = Module.getMap().getTerrHeightFast(pointX, pointY);
        // 클릭이벤트 제거
        Module.canvas.onclick = "";
        var position = TransformCoordinate(pointX, pointY, 13, 26);

        callback(
          parseFloat(position.x),
          parseFloat(position.y),
          parseFloat(alt)
        );
      };
    }
  },

  // 맵 지도 클릭지점 좌표값 리턴(클릭이벤트 등록후 삭제 한다.)
  getPositionGeom: function (callback) {
    var address = "";

    if (app2D) {
      const yMap = app2D.getYMap();
      const select = yMap.getModule("select");
      select.once("Point", "drawend", true).done((event) => {
        const feature = event.feature;
        const geometry = this.toMapProjection(feature.getGeometry());
        var position = geometry.getCoordinates();
        // 좌표정보로 주소값 반환
        cmmUtil.reverseGeocoding(position[0], position[1]).done((result) => {
          address = result["address"];
          if (address == "" || address == undefined) {
            address = "-";
          }
          callback(
            "POINT(" +
              parseFloat(position[0]) +
              " " +
              parseFloat(position[1]) +
              ")",
            address
          );
        });
      });
    } else {
      Module.canvas.onclick = function (e) {
        var Projection = Module.getProjection();
        var positionString = Module.GetClickPosition();
        var position = positionString.split("_");
        var pointX = Number(position[0]); //x 좌표
        var pointY = Number(position[1]); //y 좌표
        var alt = Module.getMap().getTerrHeightFast(pointX, pointY);
        // 클릭이벤트 제거
        Module.canvas.onclick = "";
        var vPos = new Module.JSVector3D(
          parseFloat(pointX),
          parseFloat(pointY),
          parseFloat(alt)
        );
        var position = TransformCoordinate(pointX, pointY, 13, 26);
        createPoint(vPos, GLOBAL.NomalIcon, GLOBAL.NomalIcon);
        GLOBAL.StartPoint = true;
        // 좌표정보로 주소값 반환
        cmmUtil.reverseGeocoding(position.x, position.y).done((result) => {
          address = result["address"];
          if (address == "" || address == undefined) {
            address = "-";
          }
          callback(
            "POINT(" +
              parseFloat(position.x) +
              " " +
              parseFloat(position.y) +
              ")",
            address,
            vPos
          );
        });
      };
    }
  },

  setCameraMove: function (lon, lat, is4326) {
    var mapType = $('input:radio[name="mapType"]:checked').val();
    if (mapType == "2D") {
      const yMap = app2D.getYMap();
      const map = yMap.getMap();
      if (is4326) {
        const coordinate = ol.proj.transform(
          [lon, lat],
          "EPSG:4326",
          store.getPrj()
        );
        lon = coordinate[0];
        lat = coordinate[1];
      }
      map.getView().setCenter([Number(lon), Number(lat)]);
    } else {
      // 좌표계 4326 일 때
      if (is4326) {
        setCameraMoveLonLat_3D(lon, lat);

        // 좌표계 5179 일 때
      } else {
        var position = TransformCoordinate(Number(lon), Number(lat), 26, 13);
        //setCameraMove_3D(position.x, position.y);
        setCameraMoveLonLat_3D(position.x, position.y);
      }
    }
  },
  
  setCameraMovelonlatAlt: function (lon, lat, is4326, alt, dit) {
	    var mapType = $('input:radio[name="mapType"]:checked').val();
	    if (mapType == "2D") {
	      const yMap = app2D.getYMap();
	      const map = yMap.getMap();
	      if (is4326) {
	        const coordinate = ol.proj.transform(
	          [lon, lat],
	          "EPSG:4326",
	          store.getPrj()
	        );
	        lon = coordinate[0];
	        lat = coordinate[1];
	      }
	      map.getView().setCenter([Number(lon), Number(lat)]);
	    } else {
	      // 좌표계 4326 일 때
	      if (is4326) {
	        setCameraMoveLonLatAlt_3D(lon, lat, alt, dit);

	        // 좌표계 5179 일 때
	      } else {
	        var position = TransformCoordinate(Number(lon), Number(lat), 26, 13);
	        //setCameraMove_3D(position.x, position.y);
	        setCameraMoveLonLatAlt_3D(position.x, position.y, alt, dit);
	      }
	    }
	  },
  /**
   * 표시된 것들 삭제
   */
  clearHighlight: function () {
    if (app2D) {
      const yMap = app2D.getYMap();
      const highlight = yMap.getModule("highlight");
      highlight.clearSource("red");
    } else {
      // TO-DO 3D 지도 부분
    }
  },

  /**
   * 공간정보 표시
   * @param {string} wkt WKT
   * @param {string} icon 아이콘
   */
  highlightGeometry: function (wkt, icon, options) {
    if (app2D) {
      const format = new ol.format.WKT();
      const geometry = format.readGeometry(wkt);
      const yMap = app2D.getYMap();
      const highlight = yMap.getModule("highlight");
      highlight.clearSource("red");
      const feature = new ol.Feature(geometry);
      if (icon) {
        feature.set("icon", icon);
      }
      highlight.addFeatures("red", [feature]);
      if (!options || !options["notMove"]) {
        highlight.move("red");
      }

      // 3D
    } else {
      // TO-DO 3D 지도 부분

      var icon3D = "";
      if (icon != undefined) {
        icon3D = icon;
      } else {
        icon3D = "./images/poi/nomal_poi.png";
      }
      if (wkt == undefined) {
        return;
      }

      var RED = new Module.JSColor(255, 0, 0);
      var BLUE = new Module.JSColor(0, 0, 255);
      var YELLOW = new Module.JSColor(255, 255, 0);
      var WHITE = new Module.JSColor(255, 255, 255);
      var POLYGON_FILLCOLOR = new Module.JSColor(100, 255, 0, 0);

      // POI 오브젝트를 추가할 레이어 생성
      var layerList = new Module.JSLayerList(true);
      var dataType = wkt.split("(")[0];

      // 생성되어 있는 POI 레이어가 있을때 지워주기
      if (GLOBAL.LayerId.PoiLayerId != null) {
        var poiLayerCheck = layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId);
        if (poiLayerCheck == null) {
          GLOBAL.LayerId.PoiLayerId = null;
          Module.XDRenderData();
        } else {
          layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
          GLOBAL.LayerId.PoiLayerId = null;
          Module.XDRenderData();
        }
      }
      // 생성되어있는 LINE 레이어가 있을때 지워주기
      if (GLOBAL.LayerId.LineLayerId != null) {
        layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId).removeAll();
        GLOBAL.LayerId.LineLayerId = null;
        Module.XDRenderData();
      }
      // 생성되어있는 POLYGON 레이어가 있을때 지워주기
      if (GLOBAL.LayerId.PolygonLayerId != null) {
        layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
        GLOBAL.LayerId.PolygonLayerId = null;
        Module.XDRenderData();
      }
      GLOBAL.LayerId.PoiLayerId = "sach_3D_Poi";
      GLOBAL.PoiLayer = layerList.createLayer(
        GLOBAL.LayerId.PoiLayerId,
        Module.ELT_3DPOINT
      );

      var pointArray;

      // multipolygon
      if (dataType == "MULTIPOLYGON" || dataType == "POLYGON") {
        pointArray = wkt.split("(((")[1].split(")))")[0].split(" ");

        // linestring
      } else if (dataType == "MULTILINESTRING" || dataType == "LINESTRING") {
        pointArray = wkt.split("((")[1].split("))")[0].split(" ");
        // poi
      } else {
        pointArray = wkt.split("(")[1].split(")")[0].split(" ");
      }

      // POI 설정
      var pointX = parseFloat(pointArray[0]);
      var pointY = parseFloat(pointArray[1]);

      //	  var pointArray2 = ol.proj.transform([pointX, pointY],'EPSG:5179','EPSG:4326')

      cmmUtil.setCameraMove(pointX, pointY);
      //	  cmmUtil.setCameraMove(pointArray2[0], pointArray2[1], true);

      var data = wkt.split("(");
      var extractionArray = [],
        secondExtArray = [],
        pointArray = [];
      var lineStringArray = [];
      var mackerPointArray = [];

      if (dataType == "MULTILINESTRING" || dataType == "LINESTRING") {
        GLOBAL.LayerId.LineLayerId = "sach_3D_Line";
        lineLayer = layerList.createLayer(
          GLOBAL.LayerId.LineLayerId,
          Module.ELT_3DLINE
        );
        extractionArray = data[2].split("))");
        secondExtArray = extractionArray[0].split(",");

        for (var j = 0; j < secondExtArray.length; j++) {
          var x = parseFloat(secondExtArray[j].split(" ")[0]); //x 좌표
          var y = parseFloat(secondExtArray[j].split(" ")[1]); //y 좌표
          var pointArray = ol.proj.transform([x, y], "EPSG:5179", "EPSG:4326");
          lineStringArray.push([
            parseFloat(pointArray[0]),
            parseFloat(pointArray[1]),
            1000,
          ]);
        }

        let object_option = {
          coordinates: {
            coordinate: lineStringArray, // 정점 배열
            style: "XYZ",
            // style에 따른 배열 관계
            // "XY" = [x, y],[x, y],[..]
            // "XYZ" = [x, y, z],[x, y, z],[...]
            // "XYZARRAY" = [x, y, z, x, y, z ...]
            // "JSVector3D" = JSVector3D 인스턴스
          },
          type: 0, // 실선 생성
          union: true, // 지형 결합 유무
          depth: true, // 오브젝트 겹침 유무
          color: new Module.JSColor(255, 255, 0, 0), // ARGB 설정
          width: 3, // 선 굵기
        };

        var SachLineString = "SachLineString";
        let line = Module.createLineString(SachLineString);
        console.log(line.createbyJson(object_option));

        let appendlineLayer = layerList.nameAtLayer("sach_3D_Line");
        appendlineLayer.addObject(line, 0);
        appendlineLayer.setMaxDistance(GLOBAL.MaxDistance);
      } else if (dataType == "MULTIPOLYGON" || dataType == "POLYGON") {
        //			console.log("polygon")
        GLOBAL.LayerId.PolygonLayerId = "sach_3D_Polygon";
        polygonLayer = layerList.createLayer(
          GLOBAL.LayerId.PolygonLayerId,
          Module.ELT_PLANE
        );

        extractionArray = data[3].split(")))");
        secondExtArray = extractionArray[0].split(",");

        var polygonVertex = new Module.JSVec3Array();

        var arrayCnt = secondExtArray.length - 1;

        for (var j = 0; j < arrayCnt; j++) {
          var x = parseFloat(secondExtArray[j].split(" ")[0]); //x 좌표
          var y = parseFloat(secondExtArray[j].split(" ")[1]); //y 좌표
          var pointArray = ol.proj.transform([x, y], "EPSG:5179", "EPSG:4326");
          polygonVertex.push(
            new Module.JSVector3D(
              parseFloat(pointArray[0]),
              parseFloat(pointArray[1]),
              15.0
            )
          );
        }

        let polygon = Module.createPolygon("SachPolygon");

        // 폴리곤 색상 설정
        var polygonStyle = new Module.JSPolygonStyle();
        polygonStyle.setFill(true);
        polygonStyle.setFillColor(POLYGON_FILLCOLOR);
        polygonStyle.setOutLine(true);
        polygonStyle.setOutLineWidth(2.0);
        polygonStyle.setOutLineColor(RED);
        polygon.setStyle(polygonStyle);

        var part = new Module.Collection();
        part.add(arrayCnt);

        polygon.setPartCoordinates(polygonVertex, part);

        polygonLayer.addObject(polygon, 0);
        polygonLayer.setMaxDistance(GLOBAL.MaxDistance);

        // if(polygon) end

        // poi
      } else {
        var position = TransformCoordinate(pointX, pointY, 26, 13);
        //	    			  var posiText = posiText = features[i].values_.ftr_idn;
        var options = {
          layer: GLOBAL.PoiLayer,
          lon: position.x,
          lat: position.y,
          alt: 1000,
          text: "",
          markerImage: icon3D,
          lineColor: new Module.JSColor(0, 0, 255),
        };
        createLinePoi2(options);
      }
    } // 3D
  },

  /**
   * 공간객체 목록 표시
   * @param {string} geojson GeoJSON
   * @param {string} icon 아이콘
   * @param {Object} options 옵션 (notMove : 이동 막기, notClear : 삭제 막기, onClick : 선택 시 이벤트)
   */
  highlightFeatures: function (geojson, icon,options) {
    const format = new ol.format.GeoJSON();
    const features = format.readFeatures(geojson);

    if (app2D) {
      if (icon) {
        features.forEach((feature) => {
          feature.set("icon", icon);
        });
      }

      const yMap = app2D.getYMap();
      const highlight = yMap.getModule("highlight");
      if (!options || !options["notClear"]) {
        highlight.clearSource("red");
      }
      const onClick = options && options.onClick ? options.onClick : null;
      if (features && features.length > 0) {
        highlight.addFeatures("red", features, function (feature) {
          highlight.clearSelected("red");
          feature.set("selected", true);
          if (onClick) {
            onClick(feature);
          }
        });
        if (!options || !options["notMove"]) {
          highlight.move("red");
        }
      }
    } else {
      if (icon != undefined) {
        features.forEach((feature) => {
          feature.set("icon", icon);
        });
      }
      if (features.length == 0) {
        return;
      }

      // POI 오브젝트를 추가할 레이어 생성
      var layerList = new Module.JSLayerList(true);
      var dataType = features[0].geometryChangeKey_.target.getType();
      // 생성되어 있는 POI 레이어가 있을때 지워주기
      if (GLOBAL.LayerId.PoiLayerId != null) {
        layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
        GLOBAL.LayerId.PoiLayerId = null;
        Module.XDRenderData();
      }
      // 생성되어있는 LINE 레이어가 있을때 지워주기
      if (GLOBAL.LayerId.LineLayerId != null) {
        layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId).removeAll();
        GLOBAL.LayerId.LineLayerId = null;
        Module.XDRenderData();
      }
      GLOBAL.LayerId.PoiLayerId = "swgWrpp_POI";
      GLOBAL.PoiLayer = layerList.createLayer(
        GLOBAL.LayerId.PoiLayerId,
        Module.ELT_3DPOINT
      );
      // POI 설정
      for (var i = 0; i < features.length; i++) {
        var pointX = parseFloat(
          features[i].values_.geometry.flatCoordinates[0]
        );
        var pointY = parseFloat(
          features[i].values_.geometry.flatCoordinates[1]
        );
        var position = TransformCoordinate(pointX, pointY, 26, 13);
        if(features[i].values_.ftr_idn == null || features[i].values_.ftr_idn == undefined ||features[i].values_.ftr_idn == ""){
        	var posiText = (posiText = "");
        }else{
        	
        	var posiText = (posiText = features[i].values_.ftr_idn);
        }
        var posiLayerKey = (posiLayerKey = features[i].id_);
        
        if( i == 0 ){
        	cmmUtil.setCameraMove(pointX, pointY);
        }

        var options = {
          layer: GLOBAL.PoiLayer,
          lon: position.x,
          lat: position.y,
          alt: 15,
          text: posiText,
          layerKey : posiLayerKey,
          markerImage: features[i].values_.icon,
          lineColor: new Module.JSColor(0, 0, 255),
        };

        if (typeof options.markerImage == 'undefined' && dataType == 'Point') {
          options.poiColor = "#ff0000";
          options.type = "C";
        }

        createLinePoi2(options);

        // 파이프 라인 그리기
        var pipeGo = features[i].id_.split('.')[0];
        
        if (pipeGo == 'swl_conn_ls' || pipeGo== 'swl_pipe_lm' ||  pipeGo=='swl_side_ls' ||  pipeGo=='swl_pipe_as' || 
        	pipeGo=='wtl_pipe_lm' ||  pipeGo=='wtl_flow_ps' ||  pipeGo=='wtl_pipe_ps' || pipeGo=='wtl_sply_ls') {
    	//if (dataType == "MultiLineString" || dataType == "MultiPolygon") {
          GLOBAL.LayerId.LineLayerId = "PipeLine";
          var lineLayer = layerList.createLayer(GLOBAL.LayerId.LineLayerId, 0);
          lineLayer.setEditable(true);
          var pipeStringArray = [];
          var geomData = features[i].values_.geometry.flatCoordinates;
          var geomList = [];
          for (var k = 0; k < geomData.length; k += 2) {
            if (k != 0) {
              geomList += ",";
            }
            geomList += geomData[k] + " " + geomData[k + 1];
          }
          for (var j = 0; j < geomList.split(",").length; j++) {
            var position = TransformCoordinate(
              parseFloat(geomList.split(",")[j].split(" ")[0]),
              parseFloat(geomList.split(",")[j].split(" ")[1]),
              26,
              13
            );
            // 지형 높이 구하기
            var alt = Module.getMap().getTerrHeightFast(position.x, position.y);
            pipeStringArray.push([position.x, position.y, alt]);
          }
          // 콜렉션 생성
          var vPointList = new Module.Collection();

          // 콜렉션, jsvector3d 형태로 집어넣기 (x, y, z)
          for (var m = 0, len = pipeStringArray.length; m < len; m += 1) {
            var vPoint = new Module.JSVector3D(
              pipeStringArray[m][0],
              pipeStringArray[m][1],
              pipeStringArray[m][2]
            );
            vPointList.add(vPoint);
          }

          // 파이프 옵션
          var startColor = new Module.JSColor(200, 0, 0, 255), // 파이프 시작 색상
            endColor = new Module.JSColor(200, 0, 0, 255), // 파이프 끝 색상
            segment = 10, // 파이프 단면 세그먼트
            radius = 5; // 파이프 단면 반지름

          // 파이프 생성
          var object = Module.createPipe(GLOBAL.LayerId.LineLayerId + "_" + i);
          object.create(
            vPointList,
            startColor,
            endColor,
            segment,
            radius,
            radius / 2.0
          );

          // 파이프 오브젝트를 레이어에 추가
          lineLayer.addObject(object, 0);

          // 간소화 출력 거리 설정
          object.setSimplifyRange(object.getExtent() * 2.0);
        } /*else if(dataType == 'MultiPolygon'){
	    		  GLOBAL.LayerId.PolygonLayerId = "PipePolygon";
	    		  var polygonLayer = layerList.createLayer(GLOBAL.LayerId.PolygonLayerId , 0);
	    		  polygonLayer.setEditable(true);
	    	  }*/
      }
      // 마우스 상태 설정
		Module.XDSetMouseState(Module.MML_SELECT_POINT);
    }
  },

  /**
   * 공간정보 이동
   * @param {string} wkt WKT
   */
  moveGeometry: function (wkt) {
    if (app2D) {
      const yMap = app2D.getYMap();
      const format = new ol.format.WKT();
      const geometry = format.readGeometry(wkt);
      const feature = new ol.Feature(geometry);
      util.gis.moveFeatures(yMap.getMap(), [feature]);
    } else {
    	
      const format = new ol.format.WKT();   
      const geometry = format.readGeometry(wkt);
      const pointX = geometry.flatCoordinates[0];
      const pointY = geometry.flatCoordinates[1];
      cmmUtil.setCameraMovelonlatAlt(pointX, pointY,false ,20, 90);
      

    }
  },

  /**
   * 공간객체 목록 이동
   * @param {string} geojson GeoJSON
   */
  moveFeatures: function (geojson) {
    if (app2D) {
      const format = new ol.format.GeoJSON();
      const features = format.readFeatures(geojson);
      const yMap = app2D.getYMap();
      util.gis.moveFeatures(yMap.getMap(), features);
    } else {
      //geoJson에 bbox가 있을때만 가능
      //bbox로 가져옴_박규호
      //데이터타입이 다를때가 있음 string or object_박규호
      if (typeof geojson == "string") {
        var data = JSON.parse(geojson);
        data = data.features[0].properties.bbox;
      } else {
        var data = geojson.bbox;
      }
      coordMin = proj4("EPSG:5179", "EPSG:4326", [data[0], data[1]]);
      coordMax = proj4("EPSG:5179", "EPSG:4326", [data[2], data[3]]);
      var json = {
        boundary: {
          // 카메라 이동 위치
          min: new Module.JSVector2D(coordMin[0], coordMin[1]), // 좌하단
          max: new Module.JSVector2D(coordMax[0], coordMax[1]), // 우상단
        },
        animation: false,
        complete: function () {
          var alt = Module.getViewCamera().getAltitude();
          if (alt < 600) {
            //지번검색시 bbox가 너무 작으므로 지도가 너무 확대되서 어쩔 수 없이 체크 후 고도값 설정 _박규호
            Module.getViewCamera().setAltitude(600);
          }
        },
      };
      Module.getViewCamera().moveLonLatBoundarybyJson(json); // 성공 시 success 반환 실패 시 실패 오류 반환
    }
  },

  /**
   * 지도 좌표계로 공간정보 변환
   * @param {ol.geom.Geometry} geometry 공간정보
   * @returns {ol.geom.Geometry} 좌표 변환된 공간정보
   */
  toMapProjection: function (geometry) {
    if (app2D) {
      const yMap = app2D.getYMap();
      const mapProjection = yMap.getMap().getView().getProjection().getCode();
      const systemPrj = store.getPrj();
      if (mapProjection == systemPrj) {
        return geometry;
      } else {
        return geometry.transform(systemPrj, mapProjection);
      }
    } else {
      return geometry;
    }
  },

  /**
   * 시스템 좌표계로 공간정보 변환
   * @param {ol.geom.Geometry} geometry 공간정보
   * @returns {ol.geom.Geometry} 좌표 변환된 공간정보
   */
  toSystemProjection: function (geometry) {
    if (app2D) {
      const yMap = app2D.getYMap();
      const mapProjection = yMap.getMap().getView().getProjection().getCode();
      const systemPrj = store.getPrj();
      if (mapProjection == systemPrj) {
        return geometry;
      } else {
        return geometry.transform(mapProjection, systemPrj);
      }
    } else {
      return geometry;
    }
  },

  /**
   * 스냅 레이어 표시
   * @param {string} featureType 공간객체타입 (레이어명)
   */
  highlightSnapLayer: function (featureType) {
    if (app2D) {
      const yMap = app2D.getYMap();
      const editTool = yMap.getModule("editTool");
      editTool.snap(featureType);
    } else {
      if (featureType) {
        if (GLOBAL.layerBox != null) {
          delWfSLayer(GLOBAL.layerBox);
        }
        Module.XDSetMouseState(6);
        createLayerWfS(featureType, GLOBAL.layerBox);
      }
    }
  },

  /**
   * 편집 공간정보 객체 추가
   * @param {string} wkt WKT
   */
  addEditGeometry: function (wkt) {
    if (app2D) {
      const yMap = app2D.getYMap();
      const editTool = yMap.getModule("editTool");
      const format = new ol.format.WKT();
      const geometry = format.readGeometry(wkt);
      editTool.addGeometry(geometry);
    } else {
      // TO-DO 3D 지도 부분
    }
  },

  /**
   * 편집 공간정보 객체 추가 (그리기)
   * @param {string} type `Point, LineString, Polygon`
   */
  drawEditGeometry: function (type) {
    if (app2D) {
      const yMap = app2D.getYMap();
      const editTool = yMap.getModule("editTool");
      editTool.add(type);
    } else {
      // TO-DO 3D 지도 부분

      switch (type) {
        case "Point":
          Module.XDSetMouseState(Module.MML_INPUT_LINE);
          $("#canvas").on("mousedown", function () {
            Module.getMap().clearInputPoint();
          });
          break;
        case "LineString":
          Module.XDSetMouseState(Module.MML_INPUT_LINE);
          $("#canvas").off();
          $("#canvas").on("dblclick", function () {
            Module.XDSetMouseState(1);
          });
          break;
        case "Polygon":
          Module.XDSetMouseState(Module.MML_INPUT_AREA);
          $("#canvas").on("dblclick", function () {
            Module.XDSetMouseState(1);
          });
          break;
      }
    }
  },

  /**
   * 편집 공간정보 점편집
   */
  modifyEditGeometry: function () {
    if (app2D) {
      const yMap = app2D.getYMap();
      const editTool = yMap.getModule("editTool");
      editTool.modify();
    } else {
      // TO-DO 3D 지도 부분
    }
  },

  /**
   * 편집 공간정보 삭제
   */
  removeEditGeometry: function () {
    if (app2D) {
      const yMap = app2D.getYMap();
      const editTool = yMap.getModule("editTool");
      editTool.clear();
    } else {
      // TO-DO 3D 지도 부분
    }
  },

  /**
   * 편집 공간정보 가져오기
   * @returns WKT
   */
  getEditGeometry: function () {
    if (app2D) {
      const format = new ol.format.WKT();
      const yMap = app2D.getYMap();
      const editTool = yMap.getModule("editTool");
      const geometry = editTool.getGeometry();
      if (geometry) {
        return format.writeGeometry(geometry);
      } else {
        return null;
      }
    } else {
      var pList = Module.getMap().getInputPointList().count;
      if (pList < 1) {
      } else {
        for (var i = 0; i < pList; i++) {
          var lonlat = Module.getMap().getInputPointList().item(i);
          if (i != 0) {
            data += " , ";
          }
          data += lonlat.Longitude + " " + lonlat.Latitude;
        }
        switch (chk2) {
          case "1":
            result = "POINT(" + data + ")";
            break;
          case "2":
            result = "LINESTRING(" + data + ")";
            break;
          case "3":
            result = "POLYGON((" + data + "))";
            break;
        }
      }
    }
  },

  /**
   * 좌표로 주소 가져오기 (EPSG:5179)
   * @param {number} x X 좌표
   * @param {number} y Y 좌표
   */
  reverseGeocoding: function (x, y) {
    const deferred = $.Deferred();
    const format = new ol.format.WKT();

    var position_5174 = proj4("EPSG:5179", "EPSG:5174", [x , y]); //5179좌표에서 5174로 변경

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

  /**
   * 공간객체 ID 로 이동
   * @param {strng} featureType 공간객체타입 (레이어명)
   * @param {number} gid GID
   */
  moveFeatureByGid(featureType, gid) {
    const filter = ol.format.filter.equalTo(`gid`, gid);
    util.gis.getFeature([featureType], filter).done((geojson) => {
      this.highlightFeatures(geojson);
    });
  },

  /**
   * 3d폴리곤생성(wfs)
   *	@param List<Map<?,?>>
   */
  createMultiPolygon: function (result) {
    var layerList = new Module.JSLayerList(true);
    var polygonLayer = layerList.createLayer("POLYGON_LAYER", Module.ELT_PLANE);

    var geomList = result.geometry.coordinates[0][0];

    var polygonVertex = new Module.JSVec3Array();

    var part = new Module.Collection();
    part.add(geomList.length);

    for (var i = 0; i < geomList.length; i++) {
      polygonVertex.push(
        new Module.JSVector3D(
          parseFloat(geomList[i][0]),
          parseFloat(geomList[i][1]),
          15.0
        )
      );
    }

    var reulstId = result.id.split(".")[0];
    let polygon = Module.createPolygon(
      "POLYGON-" + reulstId + "-" + String(result.properties.gid)
    );

    var RED = new Module.JSColor(255, 0, 0);
    var BLUE = new Module.JSColor(0, 0, 255);
    var YELLOW = new Module.JSColor(255, 255, 0);
    var WHITE = new Module.JSColor(255, 255, 255);

    // 폴리곤 색상 설정
    var polygonStyle = new Module.JSPolygonStyle();
    polygonStyle.setOutLine(true);
    polygonStyle.setOutLineWidth(2);
    if ($("#landBuilding").parents().hasClass("active")) {
      polygonStyle.setOutLineColor(new Module.JSColor(250, 190, 25, 16));
      polygonStyle.setFill(true);
      polygonStyle.setFillColor(new Module.JSColor(100, 190, 25, 16));
    } else {
      polygonStyle.setOutLineColor(new Module.JSColor(50, 5, 153, 255));
      polygonStyle.setFill(true);
      polygonStyle.setFillColor(new Module.JSColor(100, 5, 153, 204));
    }

    polygon.setStyle(polygonStyle);
    polygon.setPartCoordinates(polygonVertex, part);

    polygonLayer.setMaxDistance(GLOBAL.MaxDistance);
    polygonLayer.addObject(polygon, 0);
  },
  /**
   * wfs point생성
   */
  createMultiPoint: function (data) {
    var geom = data.geometry.coordinates;
    var type = data.geometry.type;
    var id = data.id;
    var layerName = id.split(".")[0];
    var gid = id.split(".")[1];

    var lon = parseFloat(geom[0]);
    var lat = parseFloat(geom[1]);
    var alt = Module.getMap().getTerrHeightFast(lon, lat);
    //		var pointCount = 0;
    var width = 120;
    var height = 30;
    var _position = new Module.JSVector3D(lon, lat, alt);

    var layerList = new Module.JSLayerList(true);
    var layer = layerList.createLayer("POI", Module.ELT_3DPOINT);
    layer.setMaxDistance(GLOBAL.MaxDistance);

    var drawCanvas = document.createElement("canvas");
    drawCanvas.width = width;
    drawCanvas.height = height;

    var ctx = drawCanvas.getContext("2d");

    var dotSize = 10;
    cmmUtil.drawDot(
      ctx,
      drawCanvas.width,
      drawCanvas.height,
      dotSize * 0.5,
      "rgba( 051, 153, 204, 0.6)",
      4,
      "rgba(1, 0, 0, 50)"
    );

    ctx.fillStyle = "rgba(255,255, 255, 0.7)";
    ctx.fill();

    //		setText(ctx, width/2, 15, name, "rgb(255, 255, 255)", 12);

    var imageData = ctx.getImageData(0, 0, width, height).data;

    var poi = Module.createPoint("POINT-" + layerName + "-" + gid);
    poi.setPosition(_position);
    poi.setImage(imageData, width, height);
    poi.addScreenPosition(0, -height * 0.5 + dotSize * 0.5);

    layer.addObject(poi, 0);
    //		pointCount++;
  },
  /**
   *  멀티라인생성 (wfs)
   */
  createMultiLine: function (data) {
    var geomList = data.geometry.coordinates[0];

    var layerList = new Module.JSLayerList(true);
    var lineLayer = "";
    var lineStringArray = [];

    lineLayer = layerList.createLayer("MultiLineString", Module.ELT_3DLINE);

    for (var i = 0; i < geomList.length; i++) {
      var alt = Module.getMap().getTerrHeightFast(
        parseFloat(geomList[i][0]),
        parseFloat(geomList[i][1])
      );
      lineStringArray.push([
        parseFloat(geomList[i][0]),
        parseFloat(geomList[i][1]),
        alt + 3,
      ]);
    }

    let object_option = {
      coordinates: {
        coordinate: lineStringArray, // 정점 배열
        style: "XYZ",
        // style에 따른 배열 관계
        // "XY" = [x, y],[x, y],[..]
        // "XYZ" = [x, y, z],[x, y, z],[...]
        // "XYZARRAY" = [x, y, z, x, y, z ...]
        // "JSVector3D" = JSVector3D 인스턴스
      },
      type: 0, // 실선 생성
      union: false, //객체선택 하기위해 false					// 지형 결합 유무
      depth: true, // 오브젝트 겹침 유무
      color: new Module.JSColor(200, 5, 153, 255), // ARGB 설정
      width: 1.1, // 선 굵기
    };

    let line = Module.createLineString(
      "MultiLineString-" + data.id.split(".")[0] + "-" + data.properties.gid
    );

    console.log(line.createbyJson(object_option)); //요기서 실행시켜줌 지우면안됨

    let appendlineLayer = layerList.nameAtLayer("MultiLineString");
    appendlineLayer.addObject(line, 0);
    appendlineLayer.setMaxDistance(GLOBAL.MaxDistance);
  },
  drawDot: function (
    ctx,
    width,
    height,
    radius,
    lineColor,
    lineWidth,
    fillColor
  ) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(width * 0.5, height - radius, radius, 0, 2 * Math.PI, false);
    ctx.closePath();

    ctx.fillStyle = fillColor;
    ctx.fill();

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.stroke();
  },
  // 차수정보 레이어 표출(poi, line)
  setOdrLayers: function (poiLayerId, lineLayerId, img, orderList) {
    if (app2D) {
      //alert("2D환경 POI마커는 개발중입니다!");
    } else {
      if (orderList.length == 0) {
        return;
      }

      // 레이어 생성
      var layerList = new Module.JSLayerList(true);
      // poi 레이어 있을떄 삭제 처리
      /*if(GLOBAL.LayerId.PoiLayerId != null){
			layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
			GLOBAL.LayerId.PoiLayerId = null;
			Module.XDRenderData();
		}*/
      // poi 레이어 있을떄 삭제 처리
      if (GLOBAL.LayerId.LowPoiLayerId != null) {
        var lowLayer = layerList.nameAtLayer(GLOBAL.LayerId.LowPoiLayerId);
        if (lowLayer.getObjectCount() > 0) {
          lowLayer.removeAll();
          GLOBAL.LayerId.LowPoiLayerId = null;
        }
      }
      // Line 레이어 있을떄 삭제 처리
      if (GLOBAL.LayerId.LineLayerId != null) {
        var lineLayer = layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId);
        if (lineLayer.getObjectCount() > 0) {
          lineLayer.removeAll();
          GLOBAL.LayerId.LineLayerId = null;
        }
      }

      // POI 레이어 이름은 각 해당 테이블명
      GLOBAL.LayerId.LowPoiLayerId = poiLayerId;
      var lowLayer = layerList.nameAtLayer(GLOBAL.LayerId.LowPoiLayerId);
      if (lowLayer == null) {
        GLOBAL.PoiLayer = layerList.createLayer(
          GLOBAL.LayerId.LowPoiLayerId,
          Module.ELT_3DPOINT
        );
      } else {
        GLOBAL.PoiLayer = layerList.nameAtLayer(GLOBAL.LayerId.LowPoiLayerId);
      }

      var lineLayer = layerList.nameAtLayer(lineLayerId);
      if (lineLayer == null) {
        layerList.createLayer(LineLayerId, Module.ELT_3DLINE);
      }

      // POI 설정
      for (var i = 0; i < orderList.length; i++) {
        var pointX = Number(orderList[i].lon); //x 좌표
        var pointY = Number(orderList[i].lat); //y 좌표
        var position = TransformCoordinate(pointX, pointY, 26, 13);
        var options = {
          layer: GLOBAL.PoiLayer,
          lon: position.x,
          lat: position.y,
          alt: 15,
          text: orderList[i].cntrkOdr + "차",
          markerImage: img, // 해당 마커 이미지 Url
          lineColor: new Module.JSColor(0, 0, 255),
        };
        createLinePoi2(options);

        // 라인 그리기
        if (orderList[i].cntrkSctnTy == "LINE") {
          GLOBAL.LayerId.LineLayerId = lineLayerId;
          var lineLayer = layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId);

          var lineStringArray = [];
          var geom = orderList[i].geom.split("(");
          var extractionArray = geom[1].split(")");
          var secondExtArray = extractionArray[0].split(",");

          for (var j = 0; j < secondExtArray.length; j++) {
            var position = TransformCoordinate(
              parseFloat(secondExtArray[j].split(" ")[0]),
              parseFloat(secondExtArray[j].split(" ")[1]),
              26,
              13
            );
            lineStringArray.push([position.x, position.y, 1000]);
          }

          let lineOption = {
            coordinates: {
              coordinate: lineStringArray, // 정점 배열
              style: "XYZ",
            },
            type: 0, // 실선 생성
            union: true, // 지형 결합 유무
            depth: true, // 오브젝트 겹침 유무
            color: new Module.JSColor(255, 255, 0, 0), // ARGB 설정
            width: 3, // 선 굵기
          };

          var odrLineString = "odrLineString" + i;
          let line = Module.createLineString(odrLineString);
          console.log(line.createbyJson(lineOption));

          //lineLayer = layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId);
          lineLayer.addObject(line, 0);
          lineLayer.setMaxDistance(GLOBAL.MaxDistance);
        }
      }
    }
  },
  // 반경  화면에 표출 center - x,y 좌표값, radius - 반경값, segment - 원 표출 포인트 개수(좌표 + 반경값으로 몇개(segment)의 지점으로 반경을 그려줌 )
  setRadius: function (center, radius, segment) {
    var lineStringArray = [];
    var geom = center.split("(");
    var extractionArray = geom[1].split(")");
    var secondExtArray = extractionArray[0].split(",");

    var position = "";
    for (var j = 0; j < secondExtArray.length; j++) {
      position = TransformCoordinate(
        parseFloat(secondExtArray[j].split(" ")[0]),
        parseFloat(secondExtArray[j].split(" ")[1]),
        26,
        13
      );
    }
    var alt = Module.getMap().getTerrHeightFast(
      Number(position.x),
      Number(position.y)
    );

    createCirclePolygon(
      new Module.JSVector3D(position.x, position.y, alt),
      radius,
      segment
    );
  },

  // 라인 poi마커 표출 poiLayerList - 레이어 표출 리스트, layerId - 레이어명, layerKey - 속성검색을 위한 key값, layerTextKey - poi마커 표출시 표출할 text값, imgUrl - 표출할 이미지 경로
  setPointLayer: function (
    poiLayerList,
    layerId,
    layerKey,
    layerTextKey,
    imgUrl,
    onClick
  ) {
    if (app2D) {
      const format = new ol.format.GeoJSON();
      const features = [];
      poiLayerList.forEach((item) => {
        const feature = new ol.Feature(
          new ol.geom.Point([parseFloat(item["lon"]), parseFloat(item["lat"])])
        );
        feature.setId(item[layerKey]);
        feature.set("text", item[layerTextKey]);
        features.push(feature);
      });
      if (features.length > 0) {
        const geojson = format.writeFeatures(features);
        cmmUtil.highlightFeatures(geojson, imgUrl, {
          notMove: true,
          onClick: function (feature) {
            if (onClick) {
              onClick(feature);
            }
          },
        });
      } else {
        cmmUtil.clearHighlight();
      }
    } else {
      // 마우스 상태 설정
      Module.XDSetMouseState(Module.MML_SELECT_POINT);

      // POI 오브젝트를 추가 할 레이어 생성
      var layerList = new Module.JSLayerList(true);

      // 생성된어 있는 POI 레이어가 있을때 지워주기
      if (GLOBAL.LayerId.PoiLayerId != null) {
        var layer = layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId);
        if (layer != null) {
          //layerList.delLayerAtName(GLOBAL.LayerId.PoiLayerId);
        	layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
        	GLOBAL.LayerId.PoiLayerId = null;
        }

        Module.XDRenderData();
      }

      // POI 레이어 이름은 각 해당 테이블명
      GLOBAL.LayerId.PoiLayerId = layerId;
      GLOBAL.PoiLayer = layerList.createLayer(
        GLOBAL.LayerId.PoiLayerId,
        Module.ELT_3DPOINT
      );

      // POI 설정
      for (var i = 0; i < poiLayerList.length; i++) {
        var pointX = Number(poiLayerList[i].lon); //x 좌표
        var pointY = Number(poiLayerList[i].lat); //y 좌표
        var position = TransformCoordinate(pointX, pointY, 26, 13); // 4326좌표로 변환
        var options = {
          layer: GLOBAL.PoiLayer,
          layerKey: poiLayerList[i][layerKey],
          lon: position.x,
          lat: position.y,
          text: poiLayerList[i][layerTextKey],
          markerImage: imgUrl, // 해당 마커 이미지 Url
          lineColor: new Module.JSColor(0, 0, 255),
        };
        createLinePoi2(options);
      }
    }
  },

  /**
   * JSTS 공간 정보로 변경
   * @param {ol.geom.Geometry} geometry Openlayers 공간정보
   * @returns JSTS 공간정보
   */
  toJstsGeometry: function (geometry) {
    const format = new jsts.io.OL3Parser();
    return format.read(geometry);
  },

  /**
   * Openlayers 공간 정보로 변경
   * @param {geometry} geometry JSTS 공간정보
   * @returns Openlayers 공간정보
   */
  toOlGeometry: function (geometry) {
    const format = new jsts.io.OL3Parser();
    return format.write(geometry);
  },

  /**
   * 버퍼 공간 정보 표시 (버퍼가 0 이상인 경우만 표시)
   * @param {string} wkt WKT
   * @param {number} buffer 버퍼
   */
  showBufferGeometry: function (wkt, buffer) {
    if (app2D) {
      const yMap = app2D.getYMap();
      const highlight = yMap.getModule("highlight");
      highlight.clearSource("yellow");

      if (buffer > 0) {
        const format = new ol.format.WKT();
        const geom = format.readGeometry(wkt);
        const bufferedGeom = this.toJstsGeometry(geom).buffer(buffer);
        highlight.addFeatures("yellow", [
          new ol.Feature(this.toOlGeometry(bufferedGeom)),
        ]);
      }
    } else {
      // TO-DO 3D
    }
  },
  make3DGeometry(data,coods){
	  var result = "";
	  var geomList ="";
	  var type = data.features[0].geometry.type
	  
	  if(coods=="4326"){
		  if (type == "POLYGON" || type == "MultiPolygon") {
	          var geomData = data.features[0].geometry.coordinates[0][0];	          	
	          for (var i = 0; i < geomData.length; i++) {
	            if (i != 0) {
	              geomList += ",";
	            }	           
	            geomList += geomData[0] + " " + geomData[1];
	          }
	          result = "MultiPolygon(((" + geomList + ")))";
	        } else if (type == "Point") {
	          var geomData = data.features[0].geometry.coordinates;
	          geomList += geomData[0] + " " + geomData[1];
	          result = "Point(" + geomList + ")";
	        } else if (type == "MultiLineString") {	          
	          var geomData = data.features[0].geometry.coordinates[0];
	          for (var i = 0; i < geomData.length; i++) {
	            if (i != 0) {
	              geomList += ",";
	            }	           
	            geomList += geomData[i][0] + " " + geomData[i][1];
	          }
	          result = "MultiLineString((" + geomList + "))";
	        }
	  }else if(coods == "5179"){		
		  if (type == "POLYGON" || type == "MultiPolygon") {
	          var geomData = data.features[0].geometry.coordinates[0][0];	          	
	          for (var i = 0; i < geomData.length; i++) {
	            if (i != 0) {
	              geomList += ",";
	            }
	            var tData = TransformCoordinate(
	            		geomData[i][0],
	            		geomData[i][1],
	                    13,
	                    26
	                  );
	            geomList += tData.x + " " + tData.y;
	          }
	          result = "MultiPolygon(((" + geomList + ")))";
	        } else if (type == "Point") {
	          var geomData = data.features[0].geometry.coordinates;	          
	          var tData = TransformCoordinate(
	          		geomData[0],
	          		geomData[1],
	                  13,
	                  26
	                );
	          geomList += tData.x + " " + tData.y;
	          result = "Point(" + geomList + ")";
	        } else if (type == "MultiLineString") {	          
	          var geomData = data.features[0].geometry.coordinates[0];
	          for (var i = 0; i < geomData.length; i++) {
	            if (i != 0) {
	              geomList += ",";
	            }
	            var tData = TransformCoordinate(
	              		parseFloat(geomData[0]),
	              		parseFloat(geomData[1]),
	                      13,
	                      26
	                    );
	            geomList += tData.x + " " + tData.y;
	          }
	          result = "MultiLineString((" + geomList + "))";
	        }
	  }	 
	  return result;
  },
  
  // 상하수도 list클릭시 poi 하이라이트
  wrppSwg_sethigh(id){
	  var layerList = new Module.JSLayerList(true);
	  var layer = layerList.nameAtLayer("swgWrpp_POI");
	  
	  for(var i = 0; i < layer.getObjectCount(); i++) {
		 var point = layer.indexAtObject(i);
		
		 if(point.getId() == id){
			point.setHighlight(true);
		 } else {
			point.setHighlight(false);
		 }
	 }
  },
  //layerId : layer 아이디
  // poiKey : 레이어에 등록되어있는 poikey값(poi마커 등록시 좌표값획들을위해 좌표가 추가되야함.)
  // vis : 좌표(4326 : true, 5179 : false)

  /**
   * POI 하이라이트 해주는 함수
   * @param layerId 레이어 이름
   * @param poiKey POI id 값
   */
  setPoiHighlight : function(layerId, poiKey) {
	  if (app2D) {
        var yMap = app2D.getYMap();
        var feature = yMap.getFeature(poiKey); //POI id를 통해 feature 객체 조회
        yMap.poiIconHighlight(feature, 'on'); //POI 아이콘 하이라이트 해주기.
	  } else {
		  setPoiHighlight(layerId, poiKey);
	  }
  },

  /**
   * @description feature POI 아이콘 Highlight되어 있는 아이콘 모두 Highlight 제거 해주는 함수.
   * @Author 플랫폼개발부문 DT솔루션 이준호
   * @Date 2022.04.27
   */
  setPoiHighlightRemove : function() {
    if (app2D) {
      var yMap = app2D.getYMap();
      var features = yMap.getFeatures();
      for (feature in features) {
        yMap.poiIconHighlight(features[feature], 'off');
      }
    }
  }
  
};
