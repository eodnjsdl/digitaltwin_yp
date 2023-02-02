window.dtmap = window.dtmap || {};
window.dtmap.util = (function () {


    const altitudes = [3261870, 3261870, 3261870, 3261870, 3261870, 3261870, 3261870, 2258000, 976670, 564200, 267000, 145500, 70100, 35280, 17750, 8950, 4350, 2150, 1100, 600]

    function altToZoom(alt) {
        var closest = altitudes.reduce(function (prev, curr) {
            return (Math.abs(curr - alt) < Math.abs(prev - alt) ? curr : prev);
        });
        let zoom = altitudes.indexOf(closest)
        return zoom === zoom < 6 ? 6 : zoom;
    }

    function zoomToAlt(zoom) {
        return altitudes[Math.round(zoom)];
    }

    let module = {
        altToZoom: altToZoom,
        zoomToAlt: zoomToAlt
    }
    return module;
})();