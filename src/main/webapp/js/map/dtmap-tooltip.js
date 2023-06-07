window.dtmap = window.dtmap || {}
dtmap.tooltip = (function () {

    let _element;
    let _isActive = false;
    let _offset = {
        x: 10,
        y: 15
    }

    function on() {
        if (!_element) {
            _element = document.createElement('div');
            _element.className = 'map-tooltip';
            dtmap.container.appendChild(_element);
            addEventListener();
        }
        _isActive = true;
    }

    function off() {
        if (_element) {
            removeEventListner();
            _element.remove();
            _element = undefined;
        }
        _isActive = false;
    }

    function setHtml(html) {
        if (_element) {
            _element.innerHTML = html;
        }
    }

    function addEventListener() {
        dtmap.container.addEventListener('mousemove', onMouseMove);
    }

    function removeEventListner() {
        dtmap.container.removeEventListener('mousemove', onMouseMove)
    }

    function onMouseMove(e) {
        $(_element).css('left', e.x + _offset.x).css('top', e.y + _offset.y);
    }

    let module = {
        on: on,
        off: off,
        setHtml: setHtml
    }

    Object.defineProperties(module, {
        offset: {
            get: function () {
                return _offset;
            },
            set: function (offset) {
                _.merge(_offset, offset)
            }
        },
        element: {
            get: function () {
                return _element;
            }
        }
    })

    return module
}())