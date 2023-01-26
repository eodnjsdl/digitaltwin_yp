window.dtmap = window.dtmap || {}
dtmap.config = function () {
    let EMAP_KEY;

    /**
     *
     * @type {{maxZoom: number, center: number[], minZoom: number, zoom: number, projection: string, target: string}}
     */
    const map2d = {
        target: 'map2D',
        projection: 'EPSG:5179',
        center: [999028.8152684278, 1943589.1358372485],
        zoom: 17,
        minZoom: 6,
        maxZoom: 19
    }

    const map3d = {
        target: 'map3D',
        totalMemory: 256 * 1024 * 1024
    }


    const module = {
        EMAP_KEY: EMAP_KEY,
        map2d: map2d,
        map3d: map3d
    }
    return module
}()