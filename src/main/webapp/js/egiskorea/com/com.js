/**
 * 2D 유틸
 */
const util = {};

util.ajaxSetting = () => {
  let isSend = true;

  // AJAX 요청 중 로딩바 표시
  $(document)
    .ajaxStart(function () {
      loadingShowHide("show");
    })
    .ajaxComplete(function () {
      loadingShowHide("hide");
    })
    .ajaxError(function (event, jqxhr) {
      if (jqxhr.status == 302) {
        isSend = false;
        if (
          confirm(`사용자 정보가 없습니다. 5초 후 로그인 페이지로 이동합니다.`)
        ) {
          // TO-DO 로그인 페이지 주소로 이동 필요
          location.href = "/";
        }
        setTimeout(() => {
          // TO-DO 로그인 페이지 주소로 이동 필요
          location.href = "/";
        }, 5000);
      } else if (jqxhr.status == 403) {
        if (isSend) {
          isSend = false;

          if (
            confirm(`세션이 만료되었습니다. 5초 후 로그인 페이지로 이동합니다.`)
          ) {
            // TO-DO 로그인 페이지 주소로 이동 필요
            location.href = "/";
          }
          setTimeout(() => {
            // TO-DO 로그인 페이지 주소로 이동 필요
            location.href = "/";
          }, 5000);
        }
      } else {
        console.log("요청이 실패했습니다.");
        loadingShowHide("hide");
      }
    });
};

/**
 * GIS 유틸
 */
util.gis = {};

/**
 * WFS GetFeature 데이터 가져오기
 * @param {Array.<String>} featureTypes 객체타입 목록
 * @param {ol.filter.Filter=} filter 필터
 * @param {number=} maxFeatures 최대 객체 수
 * @param {number=} page  페이지 인덱스
 * @returns
 */
util.gis.getFeatureData = (
  featureTypes,
  filter,
  maxFeatures,
  startIndex,
  propertyNames
) => {
  const params = {
    srsName: store.getPrj(),
    featureTypes: featureTypes,
    filter: filter,
    outputFormat: "application/json",
  };
  if (propertyNames) {
    params["propertyNames"] = propertyNames;
  }
  if (maxFeatures) {
    params["maxFeatures"] = maxFeatures;
  }
  if (startIndex) {
    params["startIndex"] = startIndex;
  }
  const featureRequest = new ol.format.WFS().writeGetFeature(params);
  return new XMLSerializer().serializeToString(featureRequest);
};

/**
 * WFS GetFeature
 * @param {Array.<String>} featureTypes 객체타입 목록
 * @param {ol.filter.Filter=} filter 필터
 * @param {number=} maxFeatures 최대 객체 수
 * @param {number=} page  페이지 인덱스
 * @returns
 */
util.gis.getFeature = (
  featureTypes,
  filter,
  maxFeatures,
  page,
  propertyNames
) => {
  const url = "/gis/wfs";
  const startIndex = page ? page * maxFeatures : 0;
  const data = util.gis.getFeatureData(
    featureTypes,
    filter,
    maxFeatures,
    startIndex,
    propertyNames
  );

  return $.ajax({
    url: url,
    type: "POST",
    data: data,
    contentType: "text/plain;charset=UTF-8",
    dataType: "json",
  }).fail(() => {
    console.log(`${featureTypes.join(",")} 공간 검색에 실패하였습니다.`);
    loadingShowHide("hide");
  });
};

/**
 * 공간 객체 목록으로 위치 이동
 * @param {ol.Map} map 지도 객체
 * @param {Array.<ol.Feature>} features 공간 객체 목록
 */
util.gis.moveFeatures = (map, features) => {
  const view = map.getView();
  const max = [];
  for (let i = 0, len = features.length; i < len; i++) {
    const feature = features[i];
    const extent = feature.getGeometry().getExtent();
    if (i == 0) {
      max[0] = extent[0];
      max[1] = extent[1];
      max[2] = extent[2];
      max[3] = extent[3];
    } else {
      if (max[0] > extent[0]) max[0] = extent[0];
      if (max[1] > extent[1]) max[1] = extent[1];
      if (max[2] < extent[2]) max[2] = extent[2];
      if (max[3] < extent[3]) max[3] = extent[3];
    }
  }

  if (max.length == 4) {
    let center = null;
    let zoom = null;
    if (max[0] == max[2] && max[1] == max[3]) {
      zoom = 19;
      center = [max[0], max[1]];
    } else {
      zoom =
        view.getZoomForResolution(
          view.getResolutionForExtent(max, map.getSize())
        ) - 1;
      if (zoom > 19) zoom = 19;
      center = ol.extent.getCenter(max);
    }

    const height = $(".content-area").height();
    if (height) {
      const delta = (view.getResolutionForZoom(zoom) * height) / 2;
      add(center, [0, -delta]);
    }

    view.setCenter([center[0], center[1]]);
    view.setZoom(zoom);
  }
};

/**
 * 스타일 유틸
 */
util.style = {};

/**
 * 색상 가져오기
 */
util.style.getColor = (colorString, opacity) => {
  const color = ol.color.fromString(colorString);
  const strokeOpacity = 1 - opacity * 0.01;
  color[3] = strokeOpacity;
  return color;
};

/**
 * 선 스타일 가져오기
 */
util.style.getLineDash = (type, width) => {
  let lineDash = null;
  if (type == "SOLID") {
    lineDash = [];
  } else if (type == "DOT") {
    lineDash = [width * 2, width * 2];
  } else if (type == "DASHED") {
    lineDash = [width * 6, width * 2];
  } else if (type == "DASH-DOTTED") {
    lineDash = [width * 6, width * 2, width * 2, width * 2];
  } else if (type == "DASH-DOUBLE-DOTTED") {
    lineDash = [
      width * 6,
      width * 2,
      width * 2,
      width * 2,
      width * 2,
      width * 2,
    ];
  } else {
    console.log(`지원되지 않는 선 패턴입니다.`);
  }
  return lineDash;
};

/**
 * 폰트 가져오기
 */
util.style.getFont = (feature) => {
  let font = ``;

  if (feature.get("fontBold")) {
    font += ` bold`;
  }
  if (feature.get("fontItalic")) {
    font += ` italic`;
  }
  const fontSize = feature.get("fontSize");
  font += ` ${fontSize}px`;
  const fontFamily = feature.get("fontFamily");
  font += ` ${fontFamily} `;
  return font;
};

/**
 * 화살표 스타일 추가
 * @param {Array.<ol.style.Style>} styles 스타일 목록
 * @param {ol.Feature} feature 도형
 * @param {number} resolution 해상도
 * @param {ol.geom.Point} start 시작점
 * @param {ol.geom.Point} end 종료점
 */
util.style.addArrowStyles = (styles, feature, resolution, start, end) => {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const rotation = Math.atan2(dy, dx);
  const offset = feature.get("strokeWidth") * 2 * resolution;
  const line1 = new ol.geom.LineString([
    end,
    [end[0] - offset, end[1] + offset],
  ]);
  line1.rotate(rotation, end);
  const line2 = new ol.geom.LineString([
    end,
    [end[0] - offset, end[1] - offset],
  ]);
  line2.rotate(rotation, end);
  styles.push(
    new ol.style.Style({
      geometry: line1,
      stroke: new ol.style.Stroke({
        color: util.style.getColor(
          feature.get("strokeColor"),
          feature.get("strokeOpacity")
        ),
        width: feature.get("strokeWidth"),
      }),
    })
  );
  styles.push(
    new ol.style.Style({
      geometry: line2,
      stroke: new ol.style.Stroke({
        color: util.style.getColor(
          feature.get("strokeColor"),
          feature.get("strokeOpacity")
        ),
        width: feature.get("strokeWidth"),
      }),
    })
  );
};

/** 배열 유틸 */
util.array = {};

/**
 * 정렬 (공간 객체)
 * @param {Array.<ol.Feature>} arr 공간객체 목록
 * @param {string} propertyName 정렬할 프로퍼티 명
 * @returns
 */
util.array.sort = (arr, propertyName) => {
  return arr.sort((a, b) => {
    if (a.get(propertyName) < b.get(propertyName)) {
      return -1;
    } else if (a.get(propertyName) > b.get(propertyName)) {
      return 1;
    }
    return 0;
  });
};

/**
 * 정렬 (일반 객체)
 * @param {Array.<Object>} arr 배열
 * @param {string} propertyName 정렬할 프로퍼티 명
 * @returns
 */
util.array.sortObject = (arr, propertyName) => {
  return arr.sort((a, b) => {
    if (a[propertyName] < b[propertyName]) {
      return -1;
    } else if (a[propertyName] > b[propertyName]) {
      return 1;
    }
    return 0;
  });
};

/** 코드 유틸 */
util.code = {};

/**
 * 코드 목록
 * @param {string} codeId 코드 아이디
 * @returns 코드 목록
 */
util.code.load = (codeId) => {
  const deferred = $.Deferred();

  $.get("/com/cmm/selectCmmCodeDetail.do", { codeId: codeId })
    .done((response) => {
      const list = JSON.parse(response)["list"];
      const data = list.map((item) => {
        return { code: item["code"], codeNm: item["codeNm"] };
      });
      deferred.resolve(data);
    })
    .fail(() => {
      alert(`코드 정보를 가져오는데 실패했습니다.`);
    });

  return deferred;
};

/**
 * SLD 읽기
 * @param {string} sld SLD
 * @returns 스타일
 */
util.sld = {
  getBase64: function (src) {
    const deferred = $.Deferred();
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext("2d").drawImage(image, 0, 0);
      deferred.resolve(canvas.toDataURL("image/png"));
    };
    image.src = `./images/poi/${src}`;
    return deferred;
  },

  /**
   * SLD 읽기
   * @param {string} sld SLD
   * @returns 스타일
   */
  readSld: function (sld) {
    const obj = {};

    const xml = $.parseXML(sld);
    const node = $(xml);

    obj["name"] = this.readName($(node.find("sld\\:NamedLayer")));
    obj["rules"] = this.readRules(node);

    return obj;
  },

  /**
   * 명칭 읽기
   * @param {jQueryNode} node 노드
   * @returns 명칭
   */
  readName: function (node) {
    return node.find("> se\\:Name").text();
  },

  /**
   * 규칙 목록 읽기
   * @param {jQueryNode} node 노드
   * @returns 규칙 목록
   */
  readRules: function (node) {
    const rules = [];
    node
      .find("se\\:Rule")
      .toArray()
      .forEach((rule) => {
        rules.push(this.readRule(rule));
      });
    return rules;
  },

  /**
   * 규칙 읽기
   * @param {element} rule 규칙 Element
   * @returns 규칙
   */
  readRule: function (rule) {
    const node = $(rule);
    const obj = {
      name: this.readName(node),
      minScale: this.readMinScale(node),
      maxScale: this.readMaxScale(node),
    };

    const filter = this.readFilter(node);
    if (filter) {
      obj["filter"] = filter;
    }

    const point = this.readPoint(node);
    if (point) {
      obj["point"] = point;
    }

    const line = this.readLine(node);
    if (line) {
      obj["line"] = line;
    }

    const polygon = this.readPolygon(node);
    if (polygon) {
      obj["polygon"] = polygon;
    }

    const text = this.readText(node);
    if (text) {
      obj["text"] = text;
    }

    return obj;
  },

  /**
   * 최소 축척 읽기
   * @param {jQueryNode} node 노드
   * @returns 최소 축척
   */
  readMinScale: function (node) {
    let minScale = null;
    if (node.find("> se\\:MinScaleDenominator").length > 0) {
      minScale = parseInt(node.find("> se\\:MinScaleDenominator").text(), 10);
    }
    return minScale;
  },

  /**
   * 최대 축척 읽기
   * @param {jQueryNode} node 노드
   * @returns 최대 축척
   */
  readMaxScale: function (node) {
    let maxScale = null;
    if (node.find("> se\\:MaxScaleDenominator").length > 0) {
      maxScale = parseInt(node.find("> se\\:MaxScaleDenominator").text(), 10);
    }
    return maxScale;
  },

  /**
   * 필터 읽기
   * @param {jQueryNode} node 노드
   * @returns 필터
   */
  readFilter: function (node) {
    let filter = null;
    const filterNode = node.find("ogc\\:Filter");
    if (filterNode.length > 0) {
      filter = filterNode.html();
      // IE 오류로 추가
      if (!filter) {
        filter = $("<div>").append(filterNode).html();
      }
      filter = filter.trim();
    }
    return filter;
  },

  /**
   * 점 스타일 읽기
   * @param {jQueryNode} node 노드
   * @returns 점 스타일
   */
  readPoint: function (node) {
    let point = null;
    const pointNode = node.find("se\\:PointSymbolizer");
    if (pointNode.length > 0) {
      point = {
        graphic: this.readGraphic(pointNode),
      };
    }
    return point;
  },

  /**
   * 선 스타일 읽기
   * @param {jQueryNode} node 노드
   * @returns 선 스타일
   */
  readLine: function (node) {
    let line = null;
    const lineNode = node.find("se\\:LineSymbolizer");
    if (lineNode.length > 0) {
      line = {
        stroke: this.readStroke(lineNode),
      };
    }
    return line;
  },

  /**
   * 면 스타일 읽기
   * @param {jQueryNode} node 노드
   * @returns 면 스타일
   */
  readPolygon: function (node) {
    let polygon = null;
    const polygonNode = node.find("se\\:PolygonSymbolizer");
    if (polygonNode.length > 0) {
      polygon = {
        fill: this.readFill(polygonNode),
        stroke: this.readStroke(polygonNode),
      };
    }
    return polygon;
  },

  /**
   * 문자 스타일 읽기
   * @param {jQueryNode} node 노드
   * @returns 문자 스타일
   */
  readText: function (node) {
    let text = null;
    const textNode = node.find("se\\:TextSymbolizer");
    if (textNode.length > 0) {
      text = {
        label: this.readLabel(textNode),
        font: this.readFont(textNode),
        halo: this.readHalo(textNode),
      };
    }
    return text;
  },

  /**
   * 그래픽 읽기
   * @param {jQueryNode} node 노드
   * @returns
   */
  readGraphic: function (node) {
    let graphic = null;
    const graphicNode = node.find("se\\:Graphic");
    if (graphicNode.length > 0) {
      graphic = {
        opacity: graphicNode.find("se\\:Opacity").text(),
        size: graphicNode.find("se\\:Size").text(),
        anchorPoint: this.readAnchorPoint(graphicNode),
      };

      const mark = this.readMark(graphicNode);
      if (mark) {
        graphic["mark"] = mark;
      }

      const externalGraphic = this.readExternalGraphic(graphicNode);
      if (externalGraphic) {
        graphic["externalGraphic"] = externalGraphic;
      }
    }
    return graphic;
  },

  /**
   * 마커 읽기
   * @param {jQueryNode} node 노드
   * @returns 마커
   */
  readMark: function (node) {
    let mark = null;
    const markNode = node.find("se\\:Mark");
    if (markNode.length > 0) {
      mark = {
        wellKnownName: markNode.find("se\\:WellKnownName").text(),
        fill: readFill(markNode),
        stroke: readStroke(markNode),
      };
    }
    return mark;
  },

  /**
   * 외부 그래픽 읽기
   * @param {jQueryNode} node 노드
   * @returns 외부 그래픽
   */
  readExternalGraphic: function (node) {
    let externalGraphic = null;
    const externalGraphicNode = node.find("se\\:ExternalGraphic");
    if (externalGraphicNode.length > 0) {
      externalGraphic = {
        href: externalGraphicNode
          .find("se\\:OnlineResource")
          .attr("xlink:href"),
        format: externalGraphicNode.find("se\\:Format").text(),
      };
    }
    return externalGraphic;
  },

  /**
   * 점 위치 읽기
   * @param {jQueryNode} node 노드
   * @returns 점 위치
   */
  readAnchorPoint: function (node) {
    let anchorPoint = null;
    const anchorPointNode = node.find("se\\:AnchorPoint");
    if (anchorPointNode.length > 0) {
      anchorPoint = {
        anchorPointX: anchorPointNode.find("se\\:AnchorPointX").text(),
        anchorPointY: anchorPointNode.find("se\\:AnchorPointY").text(),
      };
    }
    return anchorPoint;
  },

  /**
   * 채우기 읽기
   * @param {jQueryNode} node 노드
   * @returns 채우기 스타일
   */
  readFill: function (node) {
    let fill = null;
    const fillNode = node.find("se\\:Fill");
    if (fillNode.length > 0) {
      fill = this.readSvgParameter(fillNode);
    }
    return fill;
  },

  /**
   * 테두리 읽기
   * @param {jQueryNode} node 노드
   * @returns 테두리 스타일
   */
  readStroke: function (node) {
    let stroke = null;
    const strokeNode = node.find("se\\:Stroke");
    if (strokeNode.length > 0) {
      stroke = this.readSvgParameter(strokeNode);
    }
    return stroke;
  },

  /**
   * SVG 변수 읽기
   * @param {jQueryNode} node 노드
   * @returns SVG 변수
   */
  readSvgParameter: function (node) {
    let parameters = {};
    const svgParameterNode = node.find("se\\:SvgParameter");
    svgParameterNode.toArray().forEach((item) => {
      const itemNode = $(item);
      const key = itemNode.attr("name");
      parameters[key] = itemNode.text();
    });
    return parameters;
  },

  /**
   * 라밸 읽기
   * @param {jQueryNode} node 노드
   * @returns 라벨
   */
  readLabel: function (node) {
    let label = null;
    const labelNode = node.find("se\\:Label");
    if (labelNode.length > 0) {
      label = this.readPropertyName(labelNode);
    }
    return label;
  },

  /**
   * 글꼴 읽기
   * @param {jQueryNode} node 노드
   * @returns 글꼴
   */
  readFont: function (node) {
    let font = null;
    const fontNode = node.find("se\\:Font");
    if (fontNode.length > 0) {
      font = this.readSvgParameter(fontNode);
    }
    return font;
  },

  /**
   * 글자 배경 읽기
   * @param {jQueryNode} node 노드
   * @returns 글자 배경
   */
  readHalo: function (node) {
    let halo = null;
    const haloNode = node.find("se\\:Halo");
    if (haloNode.length > 0) {
      halo = {
        radius: this.readRadius(haloNode),
        fill: this.readFill(haloNode),
      };
    }
    return halo;
  },

  /**
   * 반경 읽기
   * @param {jQueryNode} node 노드
   * @returns 반경
   */
  readRadius: function (node) {
    let radius = null;
    const radiusNode = node.find("se\\:Radius");
    if (radiusNode.length > 0) {
      radius = radiusNode.text();
    }
    return radius;
  },

  /**
   * 속성 명칭 읽기
   * @param {jQueryNode} node 노드
   * @returns 속성 명칭
   */
  readPropertyName: function (node) {
    let name = null;
    const nameNode = node.find("ogc\\:PropertyName");
    if (nameNode.length > 0) {
      name = nameNode.text();
    }
    return name;
  },

  /**
   * 레벨로 최대 축척 가져오기
   * @param {number} zoom 축척 레벨
   * @returns 최대 축척
   */
  getMaxScaleFromZoom: function (zoom) {
    return (
      (Math.floor(590995197.0793662 / Math.pow(2, zoom)) +
        Math.floor(590995197.0793662 / Math.pow(2, zoom - 1))) /
      2
    );
  },

  /**
   * 레벨로 최소 축척 가져오기
   * @param {number} zoom 축척 레벨
   * @returns 최소 축척
   */
  getMinScaleFromZoom: function (zoom) {
    return (
      (Math.floor(590995197.0793662 / Math.pow(2, zoom)) +
        Math.floor(590995197.0793662 / Math.pow(2, zoom + 1))) /
      2
    );
  },

  /**
   * 최대 축척로 레벨 가져오기
   * @param {number} scale 축척
   * @returns 레벨
   */
  getZoomFromMaxScale: function (scale) {
    let zoom = 0;
    if (scale) {
      let value = 590995197.0793662;
      while (value > scale) {
        value = value / 2;
        zoom++;
      }
    }
    return zoom;
  },

  /**
   * 최소 축척로 레벨 가져오기
   * @param {number} scale 축척
   * @returns 레벨
   */
  getZoomFromMinScale: function (scale) {
    let zoom = 0;
    if (scale) {
      let value = 590995197.0793662;
      while (value > scale) {
        value = value / 2;
        zoom++;
      }
    }
    return zoom - 1;
  },

  /**
   * SLD 쓰기
   * @param {Object} style 스타일
   * @returns SLD
   */
  writeSld: function (style) {	  
	if (style.name == "") { //스타일 이름이 없을 경우 레이어 정보에서 테이블 이름을 넣어준다.
		if($("#layerInfoForm").length > 0){
			style.name = $('.td_table_nm').text();
		}
	}
	
    let xml = ``;
    xml += `<?xml version="1.0" encoding="UTF-8"?>`;
    xml += `<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" `;
    xml += `xmlns:ogc="http://www.opengis.net/ogc" `;
    xml += `xmlns:gml="http://www.opengis.net/gml" `;
    xml += `xmlns:se="http://www.opengis.net/se" `;
    xml += `xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1.0">`;
    xml += `<sld:NamedLayer>`;
    xml += `<se:Name>${style.name}</se:Name>`;
    xml += `<sld:UserStyle>`;
    xml += `<isDefault>1</isDefault>`;
    xml += `<se:FeatureTypeStyle>`;
    style.rules.forEach((rule) => {
      xml += `<se:Rule>`;
      xml += `<se:Name>${rule.name}</se:Name>`;

      if (rule["filter"]) {
        xml += rule["filter"];
      }

      if (rule["maxScale"]) {
        xml += `<se:MaxScaleDenominator>${rule["maxScale"]}</se:MaxScaleDenominator>`;
      }
      if (rule["minScale"]) {
        xml += `<se:MinScaleDenominator>${rule["minScale"]}</se:MinScaleDenominator>`;
      }

      if (rule["point"]) {
        xml += `<se:PointSymbolizer>`;
        xml += this.writeGraphic(rule["point"]["graphic"]);
        xml += `</se:PointSymbolizer>`;
      }

      if (rule["line"]) {
        xml += `<se:LineSymbolizer>`;
        xml += this.writeStroke(rule["line"]["stroke"]);
        xml += `</se:LineSymbolizer>`;
      }

      if (rule["polygon"]) {
        xml += `<se:PolygonSymbolizer>`;
        xml += this.writeStroke(rule["polygon"]["stroke"]);
        xml += this.writeFill(rule["polygon"]["fill"]);
        xml += `</se:PolygonSymbolizer>`;
      }

      if (style["text"]) {
        xml += `<se:TextSymbolizer>`;
        xml += this.writeLabel(style["text"]["label"]);
        xml += this.writeFont(style["text"]["font"]);
        xml += this.writeHalo(style["text"]["halo"]);

        const anchor = {
          anchorPointX: 0.5,
          anchorPointY: 0.5,
        };
        const displacement = {
          displacementX: 0,
          displacementY: 0,
        };
        if (rule["point"]) {
          anchor["anchorPointY"] = 0;
          displacement["displacementY"] = 10;
        }

        xml += this.writeLabelPlacement(anchor, displacement);
        xml += this.writeFill({
          fill: "#000000",
          "fill-opacity": 1,
        });

        if (rule["line"]) {
          xml += `<VendorOption name="followLine">true</VendorOption>`;
        }

        xml += `</se:TextSymbolizer>`;
      }

      xml += `</se:Rule>`;
    });
    xml += `</se:FeatureTypeStyle>`;
    xml += `</sld:UserStyle>`;
    xml += `</sld:NamedLayer>`;
    xml += `</sld:StyledLayerDescriptor>`;
    return xml;
  },

  /**
   * 그래픽 쓰기
   * @param {Object} graphic 그래픽
   * @returns 문자열
   */
  writeGraphic: function (graphic) {
    let xml = ``;
    if (graphic) {
      xml += `<se:Graphic>`;
      if (graphic["mark"]) {
        xml += this.writeMark(graphic["mark"]);
      } else if (graphic["externalGraphic"]) {
        xml += this.writeExternalGraphic(graphic["externalGraphic"]);
      }

      if (graphic["opacity"]) {
        xml += `<se:Opacity>${graphic["opacity"]}</se:Opacity>`;
      }

      if (graphic["size"]) {
        xml += `<se:Size>${graphic["size"]}</se:Size>`;
      }

      if (graphic["anchorPoint"]) {
        xml += this.writeAnchorPoint(graphic["anchorPoint"]);
      }

      xml += `</se:Graphic>`;
    }
    return xml;
  },

  /**
   * 마크 쓰기
   * @param {Object} mark 마크
   * @returns 문자열
   */
  writeMark: function (mark) {
    let xml = ``;
    if (mark) {
      xml += `<se:Mark>`;
      xml += `<se:WellKnownName>${mark["wellKnownName"]}</se:WellKnownName>`;
      if (mark["fill"]) {
        xml += this.writeFill(mark["fill"]);
      }
      if (mark["stroke"]) {
        xml += this.writeStroke(mark["stroke"]);
      }
      xml += `</se:Mark>`;
    }
    return xml;
  },

  /**
   * 외부 그래픽 쓰기
   * @param {Object} externalGraphic 외부 그래픽
   * @returns 문자열
   */
  writeExternalGraphic: function (externalGraphic) {
    let xml = ``;
    if (externalGraphic) {
      xml += `<se:ExternalGraphic>`;
      xml += `  <se:OnlineResource xlink:type="simple" xlink:href="${externalGraphic["href"]}" />`;
      xml += `  <se:Format>${externalGraphic["format"]}</se:Format>`;
      xml += `</se:ExternalGraphic>`;
    }
    return xml;
  },

  /**
   * 테두리 쓰기
   * @param {Object} stroke 테두리
   * @returns
   */
  writeStroke: function (stroke) {
    let xml = ``;
    if (stroke) {
      xml += `<se:Stroke>`;
      xml += this.writeSvgParameters(stroke);
      xml += `</se:Stroke>`;
    }
    return xml;
  },

  /**
   * SVG 파라미터 쓰기
   * @param {Object} obj SVG 파라미터
   * @returns 문자열
   */
  writeSvgParameters: function (obj) {
    let xml = ``;
    if (obj) {
      for (const [key, value] of Object.entries(obj)) {
        if (value) {
          xml += `<se:SvgParameter name="${key}">${value}</se:SvgParameter>`;
        }
      }
    }
    return xml;
  },

  /**
   * 채우기 쓰기
   * @param {Object} fill 채우기
   * @returns 문자열
   */
  writeFill: function (fill) {
    let xml = ``;
    if (fill && fill["fill"]) {
      xml += `<se:Fill>`;
      for (const [key, value] of Object.entries(fill)) {
        if (value) {
          xml += `<se:SvgParameter name="${key}">${value}</se:SvgParameter>`;
        }
      }
      xml += `</se:Fill>`;
    }
    return xml;
  },

  /**
   * 점 위치 쓰기
   * @param {Object} anchorPoint 점 위치
   * @returns 문자열
   */
  writeAnchorPoint: function (anchorPoint) {
    let xml = ``;
    if (anchorPoint) {
      xml += `<se:AnchorPoint>`;
      xml += `<se:AnchorPointX>${anchorPoint["anchorPointX"]}</se:AnchorPointX>`;
      xml += `<se:AnchorPointY>${anchorPoint["anchorPointY"]}</se:AnchorPointY>`;
      xml += `</se:AnchorPoint>`;
    }
    return xml;
  },

  /**
   * 라벨 쓰기
   * @param {Object} label 라벨
   * @returns 문자열
   */
  writeLabel: function (label) {
    let xml = ``;
    xml += `<se:Label>`;
    xml += this.writePropertyName(label);
    xml += `</se:Label>`;
    return xml;
  },

  /**
   * 속성 명칭 쓰기
   * @param {string} name 속성 명칭
   * @returns 문자열
   */
  writePropertyName: function (name) {
    let xml = ``;
    xml += `<ogc:PropertyName>${name}</ogc:PropertyName>`;
    return xml;
  },

  /**
   * 글꼴 쓰기
   * @param {Object} font 글꼴
   * @returns 문자열
   */
  writeFont: function (font) {
    let xml = ``;
    if (font) {
      xml += `<se:Font>`;
      xml += this.writeSvgParameters(font);
      xml += `</se:Font>`;
    }
    return xml;
  },

  /**
   * 라벨 위치 쓰기
   * @param {Object} anchorPoint 점 위치
   * @param {Object} displacement 거리
   * @returns
   */
  writeLabelPlacement: function (anchorPoint, displacement) {
    let xml = ``;
    xml += `<se:LabelPlacement>`;
    xml += `<se:PointPlacement>`;
    xml += this.writeAnchorPoint(anchorPoint);
    xml += `  <se:Displacement>`;
    xml += `    <se:DisplacementX>${displacement["displacementX"]}</se:DisplacementX>`;
    xml += `    <se:DisplacementY>${displacement["displacementY"]}</se:DisplacementY>`;
    xml += `  </se:Displacement>`;
    xml += `</se:PointPlacement>`;
    xml += `</se:LabelPlacement>`;
    return xml;
  },

  /**
   * 글자 배경 쓰기
   * @param {Object} halo 글자 배경
   * @returns 문자열
   */
  writeHalo: function (halo) {
    let xml = ``;
    if (halo) {
      xml += `<se:Halo>`;
      xml += `<se:Radius>${halo["radius"]}</se:Radius>`;
      xml += this.writeFill(halo["fill"]);
      xml += `</se:Halo>`;
    }
    return xml;
  },
};

/**
 * 저장소 (전역에서 사용할 데이터들 캐싱 역할)
 */
class Store {
  /**
   * 생성자
   */
  constructor() {
    this.facility = new FacilityData();
    this.prj = "EPSG:5179";
    this.emd = new FeatureData(`읍면동`, `tgd_scco_emd`, null, null, [
      "gid",
      "emd_cd",
      "emd_kor_nm",
    ]);
    this.layerIds = [];
  }

  /**
   * 지도 Projection 가져오기
   * @returns
   */
  getPrj() {
    return this.prj;
  }

  /**
   * 법정동 가져오기
   */
  getEmd() {
    this.emd;
  }

  /**
   * 레이어 추가
   * @param {string} layerId 레이어 아이디
   */
  addLayerId(layerId) {
    this.layerIds.push(layerId);
  }

  /**
   * 레이어 아이디 삭제
   * @param {string} layerId 레이어 아이디
   */
  removeLayerId(layerId) {
    const index = this.layerIds.findIndex((layer) => layer == layerId);
    if (index > -1) {
      this.layerIds.splice(index, 1);
    }
  }

  /**
   * 레이어 찾기
   * @param {string} layerId
   */
  findLayerId(layerId) {
    return this.layerIds.find((layer) => layer == layerId);
  }

  /**
   * 레이어 아이디 목록 가져오기
   * @returns 레이어 아이디
   */
  getLayerIds() {
    return this.layerIds;
  }
}

/**
 * 데이터
 */
class Data {
  /**
   * 생성자
   */
  constructor(name) {
    this.name = name;
    this.data = null;
  }

  /**
   * 데이터 설정
   * @param {Object} data 데이터
   */
  setData(data) {
    this.data = data;
  }

  /**
   * 데이터 가져오기
   * @returns 데이터
   */
  getData() {
    return this.data;
  }
}

/**
 * 시설물
 */
class FacilityData extends Data {
  /**
   * 생성자
   */
  constructor(name) {
    super(name);
    this.data = [];
    this.loadAll();
  }

  /**
   * 전체 검색
   * @returns
   */
  loadAll() {
    const deferred = $.Deferred();
    if (this.promise == null) {
      this.promise = $.getJSON(
        "/com/mngr/info/selectAllLayerManageList.do"
      ).done((response) => {
        this.setData(util.array.sortObject(response["list"], "lyrNm"));
        deferred.resolve();
        this.promise = null;
      });
    }
    return deferred;
  }
}

/**
 * 공간객체 데이터
 */
class FeatureData {
  /**
   * 생성자
   * @param {string} name 명칭
   * @param {string} featureType 공간객체 타입 (레이어명)
   */
  constructor(name, featureType) {
    this.name = name;
    this.featureType = featureType;
    this.promise = null;
  }

  /**
   * 데이터 설정
   * @param {Object} data 데이터
   */
  setData(data) {
    this.data = data;
  }

  /**
   * 데이터 가져오기
   * @returns 데이터
   */
  getData() {
    const deferred = $.Deferred();
    if (this.data) {
      deferred.resolve(this.data);
    } else {
      this.loadAll().done(() => {
        deferred.resolve(this.data);
      });
    }
    return deferred;
  }

  /**
   * 전체 데이터 가져오기
   */
  loadAll() {
    const deferred = $.Deferred();
    if (this.promise == null) {
      this.promise = util.gis.getFeature([this.featureType]).done((geojson) => {
        try {
          const format = new ol.format.GeoJSON();
          this.setData(format.readFeatures(geojson));
          deferred.resolve();
          this.promise = null;
        } catch (error) {
          console.log(`${this.name} 을 가져오는데 실패했습니다.`);
        }
      });
    }
    return deferred;
  }
}

/**
 * 페이징
 */
class Paging {
  /**
   * 생성자
   * @param {string} selector 선택자
   * @param {Object} data 데이터
   * @param {Function} onPageClick 선택 시 실행할 함수
   */
  constructor(selector, data, onPageClick) {
    this.selector = selector;

    const def = {
      page: 0,
      total: 0,
      pageSize: 5,
      listSize: 5,
    };
    this.data = $.extend(def, data);
    this.onPageClick = onPageClick;

    this.render();
    this.bindEvents();
  }

  /**
   * 표시
   */
  render() {
    let tag = "";

    const firstPageNo =
      this.data.pageSize * Math.floor(this.data.page / this.data.pageSize);
    const totalPageCount = Math.ceil(this.data.total / this.data.listSize);

    let lastPageNo = firstPageNo + this.data.pageSize;
    if (lastPageNo > totalPageCount) {
      lastPageNo = totalPageCount;
    }

    if (firstPageNo != 0) {
      tag +=
        '<a href="#" class="page first" title="처음" data-page-index="0"></a>';
      tag +=
        '<a href="#" class="page prev" title="이전" data-page-index="' +
        (firstPageNo - this.data.pageSize) +
        '"></a>';
    }

    for (let i = firstPageNo; i < lastPageNo; i++) {
      if (i === this.data.page) {
        tag +=
          '<a href="#" class="current" title="' +
          (i + 1) +
          '">' +
          (i + 1) +
          "</a>";
      } else {
        tag += '<a href="#" data-page-index="' + i + '">' + (i + 1) + "</a>";
      }
    }

    if (lastPageNo != totalPageCount) {
      tag +=
        '<a href="#" class="page next" title="다음" data-page-index="' +
        (firstPageNo + this.data.pageSize) +
        '"></a>';
      tag +=
        '<a href="#" class="page last" title="마지막" data-page-index="' +
        (totalPageCount - 1) +
        '"></a>';
    }

    $(this.selector).html(tag);
  }

  /**
   * 이벤트 연결
   */
  bindEvents() {
    const that = this;
    $("a", this.selector).click(function () {
      const node = $(this);
      const page = node.attr("data-page-index");
      if (page != undefined) {
        if (that.onPageClick) {
          that.onPageClick(parseInt(page, 10));
        }
      }
    });
  }
}
