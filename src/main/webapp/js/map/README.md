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
     sortBy : 'gid',
     orderBy : 'ASC',
     filter : ['gid > 10', 'gid < 20']
 })

//2. CQL 방식
dtmap.wfsGetFeature({
     typeNames : 'wtl_fire_ps',
     page : 1,
     perPage : 10,
     sortBy : 'gid',
     orderBy : 'DESC',
     cql : 'gid > 10 and gid < 20'
 })
```

## 그리기 및 편집
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

