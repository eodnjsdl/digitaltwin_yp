$(document).ready(function () {

    /**
     *  popup draggable
     */
    $(".popup-draggable").draggable({
        containment: "#container",
        cancel: ""
    });

    /**
     * popup close button
     */
    $(document).on('click', '.popup-panel .popup-close', function () {
        $(this).closest('.popup-panel').removeClass('opened');
    })

});

/**
 * loading bar
 */
function loadingBar(type, target) {
    var _target = $('body');
    var _position = "fixed";
    if(target !== undefined) {
        _target = target;
        _position = "absolute";
    }
    if (type === "show") {
        _target.append('<div class="loadingWrapper" style="position:'+ _position + '; top:0; left:0; width:100%; height:100%; background-color:rgba(0, 0, 0, 0.5); background-image:url(/images/common/loading.gif); background-position:center center; background-repeat:no-repeat; z-index: 10000;"></div>');
    } else if (type === "hide") {
        $('.loadingWrapper').remove();
    }
}

/**
 * datePicker
 */
function callDatePicker(){
    $( ".datepicker" ).datepicker({
        showOn: 'both',
        buttonImage: '/images/icon/form-calendar.svg',
    });
}
