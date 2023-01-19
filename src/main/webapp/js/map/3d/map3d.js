window.dtmap = window.dtmap || {}
dtmap.map3d = (function () {
    function setCenter() {
        console.log('3d setCenter');
    }

    const module = {
        setCenter: setCenter
    }
    return module;
}())

