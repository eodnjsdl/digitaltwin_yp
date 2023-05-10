# dtmap 예제

## WFS GetFeature
```javascript
/** WFS GetFeature 호출함수
@param {object} options
@param {string | string[]}options.typeNames 레이어 명
@param {number} [options.perPage=10] 한 페이지당 피쳐 개수
@param {number} [options.page=1] 페이지 번호
@param {ol.geom.Geometry} [options.geometry] intersects 도형 (우선)
@param {number[]} [options.bbox] 검색 영역 [minX, minY, maxX, maxY] (geometry 있을경우 수행안함)
@param {string} [options.sortBy] 정렬 컬럼명
@param {string} [options.sortOrder='ASC'] 정렬 방식 'ASC', 'DESC
@param {string} [options.cql] cql 필터 (cql필터 가 있을경우 json request로 수행)         -> 필터방식은 둘중 택 1
@param {string | string[]} [options.filter] 필터 수식 (배열일 경우 and 연산으로 처리됨)   -> 필터방식은 둘중 택 1
 **/

 //1. XML Filter 방식
 dtmap.wfsGetFeature({
     typeNames : 'wtl_fire_ps',
     page : 1,
     perPage : 10,
     sortBy : 'gid', //정렬 컬럼명
     orderBy : 'ASC', //정렬 방식
     filter : ['gid > 10', 'gid < 20'] //조건이 여러개일 경우 배열, 단건일경우 스트링으로 입력
 })

//2. CQL 방식
dtmap.wfsGetFeature({
     typeNames : 'wtl_fire_ps',
     page : 1,
     perPage : 10,
     sortBy : 'gid', //정렬 컬럼명
     orderBy : 'DESC', //정렬 방식
     cql : 'gid > 10 and gid < 20'
 })
```

## dtmap.draw
### 1. 그리기 및 편집
```javascript
//그리기 활성화
dtmap.draw.active({
    type: 'Point', // 'Point', 'LineString', 'Polygon', 'Rectangle', 'Triangle', 'Box', 'Marker', 'Text'
    once : false // true 일경우 한번만 그리기 (도형 그릴때 기존 도형 삭제)
})

//편집 활성화
const feature = dtmap.vector.getFeature(featureId); //편집대상 피쳐검색
dtmap.draw.clear(); //그리기 소스 및 스냅레이어 초기화
dtmap.draw.active({type:'Modify'}); //그리기 편집 활성화 'Modify' 'Translate'
dtmap.draw.addFeatures(feature); //편집 대상 피쳐 추가

//스냅레이어 설정
dtmap.draw.setSnapLayer('digitaltwin:lsmd_cont_ldreg_41830');

//스냅레이어 클리어
dtmap.draw.clearSnapLayer();

//편집 완료된 결과 받기
dtmap.draw.writeGeoJson(); //결과 GeoJson String 리턴

//버퍼 적용하기
dtmap.draw.setBuffer(10); //적용
dtmap.draw.setBuffer(0); //해제

```

## dtmap.vector
### 1. GeoJSON 피쳐추가
```javascript
 dtmap.vector.readGeoJson(json)
```
### 2. 직접 좌표 입력하여 피쳐 추가
- #### Point 추가
```javascript
 dtmap.vector.addPoint({
  id: '피쳐아이디',
  coordinates: [127,36],
  crs: 'EPSG:4326',
  style: style //스타일 옵션 (벡터 스타일옵션 참고)
})
```
- #### Line 추가 
```javascript
 dtmap.vector.addLine({
  id: '피쳐아이디',
  coordinates: [[127,36],[127.12,36.12],...],
  crs: 'EPSG:4326',
  style: style //스타일 옵션 (벡터 스타일옵션 참고)
})
```
- #### Polygon 추가 
```javascript
 dtmap.vector.addPolygon({
  id: '피쳐아이디',
  coordinates: [[[127,36],[127.12,36.12],...]],
  crs: 'EPSG:4326',
  style: style //스타일 옵션 (벡터 스타일옵션 참고)
})
```
### 벡터 스타일 옵션
- 벡터 표출시 적용할 수 있는 스타일 옵션
- `marker`, `radius` 옵션의 경우, 도형이 **Point**인 경우에만 적용됨
- `stroke`옵션의 `startArrow`, `endArrow` 옵션의 경우, 도형이 **LineString**인 경우에만 적용됨
- `label` 옵션의 `text`, `column` 옵션은 둘중 한개만 선택하여 적용
- `offsetHeight` : 3D POI의 수직막대 길이 설정
```javascript
const options = {
    //채움색
    fill : {
      color : '#ff0000', //hex String | rgb String
      opacity : 1
    },
    //선색
    storke:{
      color: 'rgb(0,139,255)',
      opacity: 1,
      width: 3,
      lineDash: 'solid',
      /* LineString일 경우만 적용 */
      startArrow: false, //시작점 화살표
      endArrow: false //끝점 화살표
    },
    //라벨
    label : {
      bold: false,
      italic: false,
      fontSize: 14,
      fontFamily: 'sans-serif',
      textAlign: 'center',
      textBaseline: "bottom",
      offsetY: 15,
      //텍스트 채움색
      fill: {
        color: '#ffffff',
        opacity: 1
      },      
      //텍스트 선색
      stroke: {
        color: '#000000',
        opacity: 1,
        width: 3
      },
      text : '텍스트 직접입력', //라벨 텍스트 문자  (text or column 중 택1)
      column : 'title' //라벨로 출력할 피쳐의 속성명 (text or column 중 택1)
    },
    /* Point일 경우에만 해당되는 옵션 */
    //Point 반지름
    radius : 8,
    //Point 이미지 설정
    marker : {
      anchor: [0.5, 1], //이미지 중심위치 (0~1 [x,y] 비율값 [0,0] 좌상단 [1,1] 우하단) 
      scale: 1, //스케일값
      opacity: 1 
    },
    //3D POI 수직 막대길이
    offsetHeight : 10
}
```

## 지도 이벤트
- `dtmap.on(eventType,listener)` 지도 이벤트 리스너 등록
- `dtmpa.off(eventType,listener)` 지도 이벤트 리스너 삭제 
  - listner가 지정되지 않은경우, **eventType에 해당하는 모든 리스너 삭제**
    ```javascript
    /**
     * 이벤트 리스너는 dtmap 객체안에서 공통으로 관리되므로,
     * 이벤트 리스너 등록시, Named Function 사용을 권장합니다.
     */
    //이벤트 등록
    dtmap.on('select', onSelect);
    //이벤트 해제
    dtmap.off('select', onSelect);
    
    function onSelect(e) {
        //콜백
    }
    ```
- eventType : `click` `select` `drawstart` `drawend`
### 1. 객체 선택
```javascript
dtmap.on('select', onSelect); //리스너 등록

function onSelect(e) {
    //dtmap.vector에 등록된 객체가 선택되었을 경우 발생

    //2D 이벤트 데이터
    // {
    //     id : 'wtl_fire_ps.8',        // 피쳐 아이디
    //     feature : ol.Feature,        // ol Feature 객체
    //     geometry : ol.geom.Geometry, //ol geometry 객체
    //     property : {}                // 속성정보
    // }
    //3D 이벤트 데이터
    // {
    //     id : 'wtl_fire_ps.8',        // 피쳐 아이디
    //     object : JSObejct3D,         // JSObejct3D 객체
    //     property : {}                // 속성정보
    // }

    dtmap.vector.select(e.id); // 선택된 객체 하이라이트

}

dtmap.off('select', onSelect); //리스너 해제
```

### 2. 지도 클릭
```javascript
dtmap.on('click', onClick);

function onClick(e) {
    //2D 이벤트 데이터
    // {
    //     coordinate : [x,y],
    //     pixel : [x,y]        
    // }

    //3D 이벤트 데이터
    // {
    //     coordinate : [x,y],
    //     pixel : [x,y],
    //     altitude : number
    // }
}
```

## dtmap.util
### 1. GeoJson / WKT <-> ol.Feature 유틸함수
- GeoJson / WKT 데이터와 OpenLayers Feature 객체간 변화 함수
```javascript
/**
 * @param {string} wkt WKT문자열
 * @param {object} properties 속성 데이터
 * @return {ol.Feature[]} ol.Feature 배열
 */
dtmap.util.readWKT(wkt, properties);
/**
 * @param {ol.Feature[]} features 피쳐 배열
 * @return {string} WKT 문자열
 */
dtmap.util.writeWKT(features);

/**
 * @param {object|string} json GeoJson 데이터
 * @return {ol.Feature[]} ol.Feature 배열
 */
dtmap.util.readGeoJson(json);
/**
 * @param {ol.Feature[]} features 피쳐 배열
 * @param {object} geojson Object
 */
dtmap.util.writeGeoJson(features);

```


## 화면좌표 <-> 지리좌표
### 1. dtmap.getCoordinateFromPixel(pixel)
- 픽셀좌표 -> 지리좌표
```javascript
dtmap.getCoordinateFromPixel([256,256])
//return [997807.1859371968, 1944007.0682623633] //2D
//return [127.4612355768713, 37.507434759010906, 69.31937682256103] //3D
```

### 2. dtmap.getPixelFromCoordinate(coordinate)
- 지리좌표 -> 픽셀좌표
- 3D의 경우 `[x,y]` 또는 `[x,y,z]`로 입력 받으나, `z값`에 따라 화면 좌표가 달라질 수 있음.
```javascript
dtmap.getPixelFromCoordinate([997807.1859371968, 1944007.0682623633]) //2D
dtmap.getPixelFromCoordinate([127.4612355768713, 37.507434759010906, 69.31937682256103]) //3D
// 3D의 경우 [127.4612355768713, 37.507434759010906, 69.31937682256103] 와 [127.4612355768713, 37.507434759010906, 0]의 화면좌표는 서로다름.
//retrun [256,256]
```