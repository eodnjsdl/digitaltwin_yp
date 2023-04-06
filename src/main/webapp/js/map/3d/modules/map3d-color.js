window.map3d = window.map3d || {};
map3d.Color = (function () {
    function Color(options) {
        if (typeof options === 'string') {
            parseColor.call(this, options);
        } else {
            parseColor.call(this, options.color);
            parseOpacity.call(this, options.opacity);
        }
    }

    function parseColor(color) {
        const obj = rgbToObject(hexToRGB(color));
        this.r = obj.r;
        this.g = obj.g;
        this.b = obj.b;
        this.a = obj.a;
    }

    function parseOpacity(opacity) {
        if (opacity) {
            opacity = Number(opacity);
            if (opacity >= 0 && opacity <= 1) {
                this.a = opacity * 255;
            } else {
                this.a = opacity
            }
        }
    }

    Color.prototype.toJSColor = function () {
        return new Module.JSColor(this.a || 255, this.r, this.g, this.b);
    }

    Color.prototype.toHex = function () {
        let hex = '#' +
            this.r.toString(16) +
            this.g.toString(16) +
            this.b.toString(16);
        if (this.a) {
            hex += this.a.toString(16);
        }

        return hex;
    }

    Color.prototype.toRGB = function () {
        if (this.a) {
            return `rgba(${this.r},${this.g},${this.b},${this.a})`
        } else {
            return `rgb(${this.r},${this.g},${this.b})`
        }
    }

    function hexToRGB(str) {
        if (str.indexOf("#") >= 0) {
            let red = parseInt(str[1] + str[2], 16);
            let green = parseInt(str[3] + str[4], 16);
            let blue = parseInt(str[5] + str[6], 16);

            return "rgba(" + red + "," + green + "," + blue + ", 255)";
        }
        return str;
    }

    function rgbToObject(rgb) {
        const colors = ['r', 'g', 'b', 'a'];
        const ary = rgb.slice(
            rgb.indexOf("(") + 1,
            rgb.indexOf(")")
        ).trim().split(",");
        let obj = {};
        ary.forEach((k, i) => {
            obj[colors[i]] = Number(k);
        });
        return obj;
    }

    return Color;
}())