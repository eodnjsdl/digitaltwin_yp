/**
 *
 * @param options
 * @param {string} options.title 제목
 *  @param {string} options.messages 메세지
 *  @param {function} options.submit 확인 콜백함수
 *  @param {function} options.cancel 취소 콜백함수
 *  @param {Object} options.toastrOptions toastr 옵션
 */
toastr.confirm = (function () {
    var $toast;
    var promise;

    function confirm(options) {
        if ($toast !== undefined) {
            return;
        }
        promise = $.Deferred();
        var defaultOptions = {
            // "closeButton": false,
            // "debug": false,
            // "newestOnTop": false,
            // "progressBar": false,
            // "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": 0,
            "extendedTimeOut": 0,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "tapToDismiss": false
        }

        var title = options.title || '';
        var message = options.message || '';
        var submit = options.submit;
        var cancel = options.cancel;
        var method = options.method || 'info';


        var html = '<div class="toast-message">' + message + '</div></div><div class="toast-confirm-btn-bar"><button type="button" class="btn btn-xs submit">확인</button><button type="button" class="btn btn-xs close">취소</button></div>'
        $toast = toastr[method](html, title, Object.assign({}, defaultOptions, options.toastrOptions));
        $toast.addClass('toast-confirm');
        $toast.delegate('.submit', 'click', function () {
            toastr.clear($toast, {force: true});
            if (submit && typeof submit === 'function') {
                submit.call();
            }
            $toast = undefined;
            promise.resolve();
        });
        $toast.delegate('.close', 'click', function () {
            toastr.clear($toast, {force: true});
            if (cancel && typeof cancel === 'function') {
                cancel.call();
            }
            $toast = undefined;
            promise.reject();
        });
        return promise;
    }

    return confirm;
})()
