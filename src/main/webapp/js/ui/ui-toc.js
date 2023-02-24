$(document).ready(function () {

    $(document).on('change', '.layer-list-dep2 :checkbox', function (e) {
        try {
            let visible = this.checked;
            let $this = $(this);
            let id = $this.attr('id');
            let table = $this.data('table');
            let store = $this.data('store');
            let shpType = $this.data('shptype');
            let desc = $this.data('desc');

            let type = dtmap.mod === '3D' ? LAYER_TYPE[id.split('_')[1]] : 'WMS';
            let layerId = id.split('_')[2];
            let only3d = id.split('_')[3];

            if (only3d && dtmap.mod !== '3D') {
                console.warn('3D지도에서만 사용 가능합니다.');
            }


            //TODO 임시 DB화 후 삭제
            if(id==='layer_F_89_2'){
                desc = 'building_object';
            }else if(id==='layer_F_118_2'){
                desc = 'landmark';
            }


            dtmap.showLayer({
                id: layerId,
                type: type,
                visible: visible,
                table: table,
                store: store,
                shpType: shpType,
                layerNm: desc
            });
        } catch (e) {
            console.log(e);
        }
    });

});