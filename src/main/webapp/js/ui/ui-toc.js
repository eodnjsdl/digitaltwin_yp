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

            dtmap.showLayer({
                id: id,
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