if (navigator.standalone) {
    alert('전체화면모드입니다.');
}


/*
    *
    URI 받아오기 여기를 참고 해볼것.
    http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters

    gup('q', 'hxxp://example.com/?q=abc')
    */
var vurl;

function gup(name, url) {
    if (!url) url = window.location.href;
    vurl = url;
    ////console.log('url : '+vurl+'\nwindow.location.href : '+window.location.href+'\nlocation.href : '+location.href);
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    var res = results == null ? null : results[1];
    //console.log(results + '>>>>' + res);
    return res;
}


var testKey = String(gup('KEY'));
//console.log('TEST KEY : ' + testKey);

var Common2 = {};
//Common2.engine = {version : "v1.0.A.180604a"}
Common2.engine = {
    version: "v1.2.A"
}

//var enginePath = "./engine/180314a/";
//var enginePath = "./engine/190114/";
//var enginePath = "./engine/190129/";
//var enginePath = "./engine/shadow/";
//var enginePath = "./engine/shadow/";
//var enginePath = "./engine/190722/";
//var enginePath = "./engine/200113/";	<<
//var enginePath = "./engine/200203/";

var enginePath = "./engine/";

Common2.location = {
    lon: 0,
    lat: 0,
    alt: 0,
    angle: 0,
    heading: 0,
    board: 0
}; //,cam:{lon:0,lat:0,alt:0},viewat:{lon:0,lat:0,alt:0}};

Common2.location.cam = {
    lon: 0,
    lat: 0,
    alt: 0
};
Common2.location.viewat = {
    lon: 0,
    lat: 0,
    alt: 0
};
Common2.lon = parseFloat(gup('LON'));
Common2.lat = parseFloat(gup('LAT'));
Common2.alt = (function () {
    var _alt = gup('ALT');
    return (_alt == null) ? 3000 : _alt;
})();
Common2.heading = (function () {
    var _heading = parseFloat(gup('HEADING'));
    return (_heading == null) ? 90 : _heading;
})();
Common2.angle = (function () {
    var _angle = parseFloat(gup('ANGLE'));
    return (_angle == null) ? 0 : _angle;
})();
Common2.shareMoveto = (Common2.lon && Common2.lat) ? true : false;

/* 3 Address 위치 지정 sumin 180122 */
Common2.threeWordAddress = gup('address', parent.window.location.href);
Common2.shareMoveto = (Common2.threeWordAddress) ? true : false;


Common2.href = vurl;

Common2.etc = (function () {
    //		dataGetAddress : "//xdmap.com:8443",			// 서버 접속 주소
    //		resourceAddress : Common2.etc.dataGetAddress+"/SVR_WEBGL/getme?PATH=/usr/local/egis/data/",			// 서버 접속 주소
    //		vWorldGetAddress : "xdworld.vworld.kr:8080",
    //		APIServerAddress : "/adp/adp.php?q="+Common2.etc.vWorldGetAddress,
    //		dataGetPort : 8443,										// 서버 접속 포트
    //		SSL : false,												// 추가 170221 sumin
    //		setSSL : function(_bSet){
    //			if (_bSet){
    //				this.vWorldGetAddress = "//xdworld.vworld.kr";
    //				this.dataGetAddress = "//xdmap.com:8443";
    //				this.dataGetPort = 8443;
    //			} else {
    //				this.vWorldGetAddress = "http://xdworld.vworld.kr:8080";
    //				this.dataGetAddress = "http://xdmap.com:8080";
    //				this.dataGetPort = 8080;
    //			}
    //		}
    //
    //		Common2.etc.setSSL(true);

    //	var ssl = false;
    var ssl = (location.protocol == 'https:') ? true : false;
    Common2.ssl = ssl;
    //	if (location.protocol != 'https:'){
    //		location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    //	}
    //console.log("HTTPS mode : " + ssl);

    var xdmapSVR = ssl ? "//xdmap.com:8443" : "http://xdmap.com:8080";
    var vworldSVR = ssl ? "/adp/adp.php?q=xdworld.vworld.kr:8080" : "http://xdworld.vworld.kr:8080";
    //	var vworldSVR = ssl?xdmapSVR+"/SVR_WEBGL/XDProxy?URL=http://xdworld.vworld.kr:8080":"http://xdworld.vworld.kr:8080";
    var xdmapRsrc = xdmapSVR + "/SVR_WEBGL/getme?PATH=/usr/local/egis/data/";
    var vworldAPI = ssl ? "/adp/adp.php?q=" + "xdworld.vworld.kr:8080" : "http://xdworld.vworld.kr:8080";
    //		var vworldAPI = xdmapSVR+"/SVR_WEBGL/XDProxy?URL=http://xdworld.vworld.kr:8080";
    var imageryNaver = ssl ? "/adp/adp.php?q=//onetile1.map.naver.net" : "//onetile1.map.naver.net";
    var imageryBing = ssl ? "/adp/adp.php?q=//h1.ortho.tiles.virtualearth.net" :
        "//h1.ortho.tiles.virtualearth.net";
    var that = {
        dataGetAddress: xdmapSVR,
        resourceAddress: xdmapRsrc,
        vWorldGetAddress: vworldSVR,
        APIServerAddress: vworldAPI,
        dataGetPort: ssl ? 8443 : 8080,
        imageryNaverAddress: imageryNaver,
        imageryBingAddress: imageryBing,
    }
    return that;
})();

Common2.SET_MEM = 256;

Common2.createElement = function(e, o, n, t, a, r) {
    var i = document.createElement(e);
    if (o && (i.id = o), n)
        for (var s = n.split(";"), d = 0, l = s.length; d < l; d += 1) {
            var u = s[d].split(":");
            i.style[u[0]] = u[1]
        }
    return t && (i.innerHTML = t), a && (i.addEventListener ? i.addEventListener("click", a) : i.attachEvent("onclick", a)), r && r.appendChild(i), i
}

$(function(){
    /* 펜그리기 캔버스 */
    var e = document.createElement("canvas");
    e.width = $('#canvas').width();
    e.height = $('#canvas').height();
    Common2.canvas = e;
});