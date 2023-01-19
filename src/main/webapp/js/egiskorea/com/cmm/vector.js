/**
 * 마커 표시.
 */
class Vector{
    constructor(store){

        this.source = new ol.source.Vector();
        this.yMap = app2D.getYMap();

        this.layer = new ol.layer.Vector({
            source: this.source,
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: "images/icon/bi-location-sm-on.svg",
                    scale: 0.5,
                }),
            }),
            zIndex: 800,
        });
        this.addFeatures(store);

    }

    destory(){
        this.yMap.getMap().removeLayer(this.layer);
        this.source = null;
        this.layer = null;

    }


    addFeatures(item) {
        if (item) {
            for (var key in item){
              var wkt  =  item[key].wkt;
              if(wkt!=""){
                  const format = new ol.format.WKT();
                  const geometry = format.readGeometry(wkt);
                  const position = geometry.getCoordinates();
                  const x = parseFloat(position[0], 10);
                  const y = parseFloat(position[1], 10);
                  const feature = new ol.Feature(new ol.geom.Point([x, y]));
                  this.source.addFeature(feature);
              }
            }
        }
    }
}