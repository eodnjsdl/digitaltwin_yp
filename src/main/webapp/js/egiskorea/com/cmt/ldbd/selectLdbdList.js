// 지적/건물 목록 호출
function aj_selectLandBuilderList(data){
  new SelectLdbdList(data)
}

// let selectLdbdList = null;
// $(function () {
//   selectLdbdList = new SelectLdbdList();
// });
/**
 * 지적/건물검색
 */
class SelectLdbdList {
  /**
   * 생성자
   */
  constructor(data) {

    this.selector = ".ldbdList";
    this.params = {};
    this.features = null;
    this.loadSearchTarget();
    this.bindEvents();
    this.mapevent(data);
    this.totalcount = 0;
    this.result = null;
    this.properties  = null;
    this.feature = null;
    this.idx = null;
    this.result_feature = null;
    this.result_feature_array ={};
  }

  /**
   * 초기화
   */
  reset() {}

  /**
   * 검색 대상 불러오기
   */
  loadSearchTarget() {
    const that = this ;
    loadingShowHide("show");
    $.ajax({
      type : "POST",
      url : "/cmt/ldbd/selectLandBuilderList.do",
      dataType : "html",
      async: false,
      success : function(returnData, status){
        if(status == "success") {
          $("#rightPopup").html(returnData);
          that.mapevent();


        }else{
          alert("ERROR!");
          return;
        }
      }, complete : function(){
        loadingShowHide("hide");
      }
    });

  }

  mapevent(data){
	  if(app2D){
		  
		  const that = this ;
		  const yMap = app2D.getYMap();
		  const select = yMap.getModule("select");
          if(data){

          }
		  select.on("Point", "drawend", (event) => {
			  that.feature = event.feature;
			  setTimeout(() => {
				  $(".building-list", this.selector).empty();
				  this.totalcount  = 0;
				  yMap.getModule("highlight").addFeature("sky", that.feature);
				  that.searchArea("lsmd_cont_ldreg_41830");
			  }, 100);
		  }, true);
	  }else{
//		  loadingShowHide("show");
		 
		   var layerName = "lsmd_cont_ldreg_41830"
		   var wmsLayer = falseLayerList.createWMSLayer(layerName);
		      
		   let option = {
		         url : geo_url+"/wms?", //wms URL
		         layer : 'digitaltwin:'+layerName,//layer 명
		         minimumlevel : 0,
		         maximumlevel : 16,
		         tilesize : 256,
		         srs : "EPSG:4326", 
		         parameters : {
		         version : "1.1.0"
		         }
		     };
		      		      
		   if(wmsLayer != null){
			   wmsLayer.setProxyRequest(true);//프록시 붙여서 보내기
			   wmsLayer.setWMSProvider(option); // 옵션 적용
			   wmsLayer.setBBoxOrder(true);// 비박스 적용 _무의미
			   wmsLayer.clearWMSCache();//캐시 삭제
			   wmsLayer.setVisible(true);//가시화 온 
		   }
		  
		   Module.XDSetMouseState(1); 
		   GLOBAL.layerWMS = layerName;
	    }
	  
  }

  /**
   * 이벤트 연결
   */
  bindEvents() {
    const that = this;

    //시설물 클릭시 이벤트.
    $("#rightPopup").on("click", ".land_buld_jijuk li", {}, function () {
        
      $("#emd,#jibun,#jimok,#road,#buildnm,#build-bon,#build-bu").html("");
      var html = "";
     if(app2D){
    	 const format = new ol.format.WKT();
         const wkt = format.writeGeometry(that.result_feature_array["jijuk"].getGeometry());
         cmmUtil.highlightGeometry(wkt,false,{ notMove: true });
    	 const node = $(this);
         node.siblings().removeClass("active");
         $("#build li").removeClass("active");
         node.addClass("active");
         const id = node.attr("data-id");
         $("#jibun", that.selector).html(node.attr("data-jibun"));
         $("#jimok", that.selector).html(node.attr("data-jimok"));

         var road = that.result.roadAddress
         if(road=='null'||road ==undefined ){
           road="";
         }
    
         html +="<tr>";
         html+='    <td>읍면동(리)</td>               ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="emd">'+node.attr("data-addr") +'</sapn>     ';
         html+='    </td>                         ';
         html+='  </tr>                           ';
         html+='  <tr>                            ';
         html+='    <td>지번</td>                   ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="jibun">'+node.attr("data-jibun") +'</sapn>   ';
         html+='    </td>                       ';
         html+='  </tr>                           ';
         html+='  <tr>                            ';
         html+='    <td>지목</td>                   ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="jimok">'+node.attr("data-jimok") +'</sapn>   ';
         html+='    </td>                         ';
         html+='  </tr>                           ';
         html+='  <tr>                            ';
         html+='    <td>도로명</td>                  ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="road">'+road+'</sapn>    ';
         html+='    </td>                         ';
         html+='  </tr>                           ';


     }else{
    	 var tag  = $("#jijuk li")[0].dataset;
         //console.log('tag : ', tag);
    	 html +="<tr>";
         html+='    <td>읍면동(리)</td>               ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="emd">'+tag.addr +'</sapn>     ';
         html+='    </td>                         ';
         html+='  </tr>                           ';
         html+='  <tr>                            ';
         html+='    <td>지번</td>                   ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="jibun">'+tag.jibun +'</sapn>   ';
         html+='    </td>                       ';
         html+='  </tr>                           ';
         html+='  <tr>                            ';
         html+='    <td>지목</td>                   ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="jimok">'+tag.jimok +'</sapn>   ';
         html+='    </td>                         ';
         html+='  </tr>                           ';
         html+='  <tr>                            ';
         html+='    <td>도로명</td>                  ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="road">'+tag.road +'</sapn>    ';
         html+='    </td>                         ';
         html+='  </tr>                           ';
     }
     $("#build_item", that.selector).html(html);

    });
    $("#rightPopup").on("click", "#build li", {}, function () {
      $("#emd,#jibun,#jimok,#road,#buildnm,#build-bon,#build-bu").html("");
      var html = "";
     if(app2D){
         const format = new ol.format.WKT();
         const wkt = format.writeGeometry(that.result_feature_array["build"].getGeometry());
         cmmUtil.highlightGeometry(wkt,false,{ notMove: true });
    	 const node = $(this);
         $(".land_buld_jijuk li").removeClass("active");
    	 node.siblings().removeClass("active");
    	 node.addClass("active");
    	 const id = node.attr("data-id");
    	 $("#buildnm", that.selector).html(node.attr("data-buld_nm"));
    	 $("#build-bon", that.selector).html(node.attr("data-buld_mnnm"));
    	 $("#build-bu", that.selector).html(node.attr("data-lnbr_slno"));

         var jibun = $('.land_buld_jijuk li').attr('data-jibun');
         if (!jibun) {
             jibun = node.attr("data-jibun");
             if (jibun == 'null' && jibun == 'undefined') {
                 jibun = '';
             }
         }

         //console.log('jibun : ', jibun);

         var buildnm = node.attr("data-buld_nm");
         var buildDc = '';
         if(buildnm == 'null'){
           buildnm="";
         } else {
             var buld_nm_dc = node.attr("data-buld_nm_dc");
             buildDc = (buld_nm_dc != "null") ? ' ' + node.attr("data-buld_nm_dc") : '';
             buildnm = buildnm + buildDc;
         }

         //console.log('2d건물 ---');
         //console.log('that.result : ', that.result);

         var road = that.result.roadAddress
         if(road=='null'||road ==undefined ){
           road="";
         }
      
         html +="<tr>";
         html+='    <td>읍면동(리)</td>               ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="emd">'+node.attr("data-addr") +'</sapn>     ';
         html+='    </td>                         ';
         html+='  </tr>                           ';
         html+='  <tr>                            ';
         html+='    <td>지번</td>                   ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="jibun">'+jibun+'</sapn>   ';
         html+='    </td>                       ';
         html+='  </tr>                           ';
         html+='    <td>도로명</td>                  ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="road">'+road+'</sapn>    ';
         html+='    </td>                         ';
         html+='  </tr>                           ';
         html+='  <tr>                            ';
         html+='    <td>건물명</td>                  ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="buildnm">'+buildnm+'</sapn> ';
         html+='    </td>                         ';
         html+='  </tr>                           ';
         html+='  <tr>                            ';
         html+='    <td>건물본번</td>                 ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="build-bon">'+node.attr("data-buld_mnnm")+'</sapn>';
         html+='    </td>                         ';
         html+='  </tr>                           ';
         html+='  <tr>                            ';
         html+='    <td>건물부번</td>                 ';
         html+='    <td className="align-center"> ';
         html+='      <sapn id="build-bu">'+node.attr("data-lnbr_slno")+'</sapn>';
         html+='    </td>                         ';
         html+='  </tr>                           ';

//         $("#build_item", that.selector).html(html);
     }else{
        var tag  = this.dataset;
        var road = (tag.doro != 'undefined' && tag.doro != "null") ? tag.doro : ''; //도로명
        //console.log('tag : ', tag);
        //+(tag.buld_mnnm ? tag.buld_mnnm : '')+
        var buildnm = tag.buld_nm;
        var buildDc = '';
        if(buildnm == 'null'){
            buildnm = '';
        } else {
            buildDc = (tag.buld_nm_dc != "null") ? ' ' + tag.buld_nm_dc : '';
            buildnm = buildnm + buildDc;
        }

        html +="<tr>";
        html+='    <td>읍면동(리)</td>               ';
        html+='    <td className="align-center"> ';
        html+='      <sapn id="emd">'+tag.addr+'</sapn>     ';
        html+='    </td>                         ';
        html+='  </tr>                           ';
        html+='  <tr>                            ';
        html+='    <td>지번</td>                   ';
        html+='    <td className="align-center"> ';
        html+='      <sapn id="jibun">'+tag.jibun+'</sapn>   ';
        html+='    </td>                       ';
        html+='  </tr>                           ';
        html+='    <td>도로명</td>                  ';
        html+='    <td className="align-center"> ';
        html+='      <sapn id="road">'+ road +'</sapn>    ';
        html+='    </td>                         ';
        html+='  </tr>                           ';
        html+='  <tr>                            ';
        html+='    <td>건물명</td>                  ';
        html+='    <td className="align-center"> ';
        html+='      <sapn id="buildnm">'+ buildnm +'</sapn> ';
        html+='    </td>                         ';
        html+='  </tr>                           ';
        html+='  <tr>                            ';
        html+='    <td>건물본번</td>                 ';
        html+='    <td className="align-center"> ';
        html+='      <sapn id="build-bon">'+(tag.buld_mnnm ? tag.buld_mnnm : '')+'</sapn>';
        html+='    </td>                         ';
        html+='  </tr>                           ';
        html+='  <tr>                            ';
        html+='    <td>건물부번</td>                 ';
        html+='    <td className="align-center"> ';
        html+='      <sapn id="build-bu">'+(tag.lnbr_slno ? tag.lnbr_slno : '')+'</sapn>';
        html+='    </td>                         ';
        html+='  </tr>                           ';
     }
     $("#build_item", that.selector).html(html);
    });
    //위치이동버튼
    $(".bi-location2", that.selector).on("click",function () {
    	if(app2D){
            const format = new ol.format.WKT();
            let wkt="";

            if($("#build li").attr('class')=="active"){
                wkt = format.writeGeometry(that.result_feature_array["build"].getGeometry());
            }
            else{
                wkt = format.writeGeometry(that.result_feature_array["jijuk"].getGeometry());
            }
    		cmmUtil.highlightGeometry(wkt);    		
    	}else{
    		var tag = $("#jijuk li")
    		if(tag.length != 0){
    			var pnu = tag[0].dataset.pnu
    			var uurl= geo_url+'/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=digitaltwin%3Alsmd_cont_ldreg_41830&srsname=EPSG:4326&maxFeatures=50&outputFormat=application%2Fjson&cql_filter=pnu='+pnu+''
   				$.get(uurl,mapMove3d)
    		}
    	}
    });

    $(".popup-close").on("click",function () {
	    if(app2D){
	      const yMap = app2D.getYMap();
	      const highlight = yMap.getModule("highlight");
	      highlight.clearSource("red");
	    }
    });
  }

  /**
   * 영역 검색
   * @param {jQuery.Event} event 이벤트
   */
  searchArea(featureType) {
    const params = {};
    const getAreaFilter = this.getAreaFilter.bind(this);
    const search = this.search.bind(this);
    const filter = getAreaFilter();
    if (filter) {
      params["featureType"] = featureType;
      params["filter"] = filter;
      params["page"] = 0;
      params["pageSize"] = 10;
      params["title"] = "건물";
      search(params);
    } else {
      $("[name=rad-search-drawing]:first", this.selector).trigger("click");
      alert("검색 영역을 지정하여 주십시오.");
    }
  }

  /**
   * 검색조건 가져오기
   * @returns {ol.format.filter.dwithin} 검색조건
   */
  getAreaFilter() {
    let filter = null;
    let buffer = 0;
    if (app2D) {
      const yMap = app2D.getYMap();
      const map = yMap.getMap();
      const searchAreaType = $(
        "[name=rad-search-area]:checked",
        this.selector
      ).val();
      let geometry = null;
      if (searchAreaType == "extent") {
        geometry = ol.geom.Polygon.fromExtent(map.getView().calculateExtent());
        geometry = cmmUtil.toSystemProjection(geometry);
      } else {
        const features = yMap.getModule("highlight").getFeatures("sky");
        if (features.length > 0) {
          geometry = cmmUtil.toSystemProjection(
            features[0].getGeometry().clone()
          );

          if (geometry instanceof ol.geom.Circle) {
            buffer += geometry.getRadius();
            geometry = new ol.geom.Point(geometry.getCenter());
          }
        }
      }
      if (geometry) {
        return ol.format.filter.dwithin(
          "geom",
          geometry,
          buffer,
          store.getPrj()
        );
      } else {
        return null;
      }
    } else {
      // TO-DO 3D 지도 부분
    }
    return filter;
  }

  /**
   * 검색
   */
  search(params) {
	  
    const featureType = params["featureType"];
    const filter = params["filter"];
    const pageSize = params["pageSize"];
    const page = params["page"];

    util.gis
      .getFeature([featureType], filter, pageSize, page)
      .done((geojson) => {
        const format = new ol.format.GeoJSON();
        this.features = format.readFeatures(geojson);

        this.features.forEach((feature) => {
          feature.setGeometry(cmmUtil.toMapProjection(feature.getGeometry().clone()));
        });

        this.createResults(geojson["totalFeatures"], this.features);
      });

  }

  /**
   * 결과 생성
   * @param {number} totalFeatures 총 수
   * @param {Array.<numbeR>} features 도형 목록
   */
  createResults(totalFeatures, features) {
    const that = this;
    console.log(totalFeatures+"//"+features, that)
    this.params["total"] = totalFeatures;

    if (totalFeatures == 0) {
      // $(".search-empty", this.selector).show();
    } else {
      let tag = ``;
      let feture_idx;

      features.forEach((feature) => {
        that.result_feature  = feature;

        let properties = feature.getProperties();

        that.idx  = feature.getId() ;
        const searchTerm = "lsmd_cont_ldreg_41830";
        feture_idx = feature.getId().indexOf(searchTerm);

        let key = null;
        const geometry = cmmUtil.toMapProjection(that.feature.getGeometry());
        const position = geometry.getCoordinates();
//        console.log(geometry+"//"+position)
        let addr ;

        // console.log('2d에서 5179 x : ', position[0]);
        // console.log('2d에서 5179 y : ', position[1]);

        var position_5174 = proj4("EPSG:5179", "EPSG:5174", [position[0] ,position[1]]); //5179좌표에서 5174로 변경

        // console.log('2d에서 5174 x : ', position_5174[0]);
        // console.log('2d에서 5174 y : ', position_5174[1]);

        var xObj = { '_5174': position_5174[0], '_5179': position[0] };
        var yObj = { '_5174': position_5174[1], '_5179': position[1] };

        //cmmUtil.reverseGeocoding(position[0], position[1]).done((result)=>{
        cmmUtil.reverseGeocoding5174(xObj, yObj).done((result)=>{
          that.result = result;
          addr = result.emdKorNm +" "+result.liKorNm;

          //console.log('2d properties : ', properties);
          //console.log('2d result : ', result);
          //건물일때
          if (feture_idx == -1) {
            that.result_feature_array["build"] = feature;

            var lnbrMnnm = result.lnbrMnnm;
            if (result.lnbrMnnm) {
                lnbrMnnm = lnbrMnnm.replaceAll('0', '');
            }

            var lnbrSlno = result.lnbrSlno;
            if (result.lnbrSlno) {
                lnbrSlno = lnbrSlno.replaceAll('0', '');
            }

            var jibun = lnbrMnnm + "-" + lnbrSlno;

            tag += `<li><p class="tit" id="buildcount">`;
            tag += `<span id="build">`;
            tag +=`건물 (<strong >${totalFeatures}건</strong>)</span></p>`;
            tag += `<ul class="dep2" id="build"><li data-id="${properties.bsi_int_sn}" data-buld_mnnm="${properties.buld_mnnm}" data-buld_nm_dc="${properties.buld_nm_dc}" data-lnbr_slno="${properties.lnbr_slno}"  data-buld_nm="${properties.buld_nm}" data-addr="${addr}" data-jibun="${jibun}"><a href="javascript:void(0);" >${properties.buld_mnnm}-${properties.lnbr_slno}</a></li></ul>`;
            $(".building-list", this.selector).append(tag);

          } else {
            that.result_feature_array["jijuk"] = feature;
            const format = new ol.format.WKT();
            const wkt = format.writeGeometry(that.result_feature_array["jijuk"].getGeometry());
            cmmUtil.highlightGeometry(wkt,false,{ notMove: true });
            var jimok = properties.jibun.charAt(properties.jibun.length - 1); //열
            var jibun = properties.jibun.slice(0, -1); //문자

            tag += `<li><p class="tit" id="jijukcount">`;
            tag += `<span id="jijuk">`;
            tag +=`지적 (<strong >${totalFeatures}건</strong>)</span></p>`;
            tag += `<ul class="dep2 land_buld_jijuk" id="jijuk"><li data-id="${properties.gid}" data-pnu="${properties.pnu}" data-bbox="${properties.bbox}" data-jibun="${jibun}" data-jimok="${jimok}" data-addr="${addr} "><a href="javascript:void(0);" >${jibun}</a></li></ul>`;
            $(".building-list", this.selector).append(tag);
          }

          that.totalcount += totalFeatures;
          $("#totalcount", this.selector).html(
              `검색결과 (<strong >${that.totalcount}건</strong>)`
          );
        });

        if (feture_idx != -1) {
          that.searchArea("tgd_spbd_buld");
        }
        });
    }

    app2D.getYMap().getModule("highlight").clearSource("sky");
  }

  /**
   * 도형 표시
   * @param {*} id
   */
  showFeature(id) {
    if (app2D) {
      const yMap = app2D.getYMap();
      const findFeature = this.features.find(
        (feature) => feature.getId() == id
      );
      const highlight = yMap.getModule("highlight");
      highlight.clearSource("red");
      highlight.addFeature("red", findFeature);
      highlight.move("red");
    } else {
      // TO-DO 3D 지도 부분
    }
  }
}
