/**
 * 양평 전용 레이어
 */

const LAYER_TYPE = {
    "S": 'SHP', //shape
    "I": 'IMG', // image
    "D": 'TDS', // 3ds
    "G": 'Graph', // graph
    "L": 'WMS', //
    "F": 'Facility', // facility
    "C": 'CSV', // csv
    "POI": 'POI', // poi
}


//양평지하시설물
const UNDER_FAC = {

    '상수관로': {
        pipe: [
            {
                name: 'WTL_MANH_PSZ',
                color: {
                    r: 255,
                    g: 0,
                    b: 0,
                    a: 255
                }
            }
        ],
        ghostSymbol: [
            {
                name: 'WTL_MANH_PSZ',
                color: {}
            },
            'WTL_VALV_PSZ'
        ]
    },
    '하수관로': {
        pip: ['SWL_PIPE_LMZ'],
        ghostSymbol: ['SWL_MANH_PSZ']
    },
    '천연가스관로': {
        pipe: ['UFL_GPIP_LMZ'],
        ghostSymbol: ['VALV_PSZ']
    },
    '통신관로': {
        pipe: ['UFL_KPIP_LSZ'],
        ghostSymbol: ['UFL_KMAN_PSZ']
    },
    '전력지중관로': {
        pipe: ['UFL_BPIP_LMZ'],
        ghostSymbol: ['UFL_BMAN_PSZ']
    },
    '농업용공공관정': {
        pipe: ['FAR_PMAN_LMZ'],
        ghostSymbol: ['FAR_PMAN_LMZ.geojson'],
        poi: ['FAR_PMAN_LMZ_poi']
    },
    '지하수개발': {
        pipe: ['GRW_DMAN_LMZ'],
        ghostSymbol: ['GRW_DMAN_LMZ.geojson'],
        poi: ['GRW_DMAN_LMZ_poi']
    },
    '지하수이용시설': {
        pipe: ['GRU_FMAN_LMZ'],
        ghostSymbol: ['GRU_FMAN_LMZ.geojson'],
        poi: ['GRU_FMAN_LMZ_poi']
    },
}