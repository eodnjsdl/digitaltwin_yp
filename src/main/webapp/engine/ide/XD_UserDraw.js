var XD_UserDraw = function () {
    var e = {
        canvas: null,
        context: null,
        tool: null,
        isOpen: !1,
        drawable: !1,
        penStyle: -1,
        parentDiv: null
    };
    return e.setDrawCanvasBorder = function () {
        var t = e.context,
            a = e.canvas;
        if (null != a && null != t) {
            var o = t.lineWidth,
                n = t.strokeStyle;
            t.lineWidth = 15,
            // t.strokeStyle = "#4be4a4",
            t.beginPath(), t.rect(0, 0, a.width, a.height), 
            // t.stroke(), 
            t.lineWidth = 5, t.strokeStyle = '#ff0000'
        }
    }, e.removeDrawCanvasBorder = function () {
        var t = e.context,
            a = e.canvas;
        null != a && null != t && (t.clearRect(0, 0, a.width, 2), t.clearRect(0, 0, 2, a.height), t.clearRect(0, a.height - 2, a.width, 2), t.clearRect(a.width - 2, 0, a.width, a.height))
    }, e.setUseableButtons = function (e) {
        // $("#masterContents").style.pointerEvents = e ? "auto" : "none"
    }, e.init = function () {
        var t = "position:fixed;left:0px;top:0px;background:rgba(0,0,0,0.5);z-index:8;";
        t += "color:#FFFFFF;text-align:center;vertical-align:middle;", t += "width:" + window.innerWidth + "px;", t += "height:" + window.innerHeight + "px;", t += "padding-top:" + window.innerHeight / 2 + "px;";
        var a = Common2.createElement("div", null, t, "", null, document.body),
            o = Common2.canvas,
            n = e.canvas,
            r = e.context;
        if (null == n) {
            var i = "position:fixed;top:" + $('#header').outerHeight() + "px;";
            i += "left:" + $('.side-header').width() + "px;cursor:pointer;z-index:6;", (n = Common2.createElement("canvas", "UserDrawCanvas", i, null, null, document.body)).width = o.width, n.height = o.height, document.addEventListener ? n.addEventListener("contextmenu", function (e) {
                e.preventDefault()
            }, !1) : n.attachEvent("oncontextmenu", function () {
                window.event.returnValue = !1
            }), e.tool = new e.createPencil, n.addEventListener("mousedown", e.ev_canvas, !1), n.addEventListener("mousemove", e.ev_canvas, !1), n.addEventListener("mouseup", e.ev_canvas, !1), n.addEventListener("touchstart", e.ev_canvas, !1), n.addEventListener("touchmove", e.ev_canvas, !1), n.addEventListener("toucnend", e.ev_canvas, !1), e.canvas = n
        }
        null == r && ((r = n.getContext("2d")).lineCap = "round", e.context = r), n.style.display = "block", Module.XDIsMouseOverDiv(!0), Module.XDSetMouseState(0), r.clearRect(0, 0, n.width, n.height), $("#toolsUserColorPicker") ? e.context.strokeStyle = $("#toolsUserColorPicker").value : e.context.strokeStyle = $("#toolsUserDrawColorDiv").style.background, n.style.zIndex = 4, html2canvas(document.body, {
            onrendered: function (e) {
                XD_UserDraw.isOpen = !0, XD_UserDraw.drawable = !0, XD_UserDraw.setDrawCanvasBorder(), XD_UserDraw.canvas.style.zIndex = 6, XD_UserDraw.setUseableButtons(!1),
                // $("#prepareLoader").style.display = "none",
                a.parentNode.removeChild(a), delete a, loadingShowHide("hide")
            },
            background: "#fff"
        })
    }, e.createPalette = function (t) {
        if (!$("#XDUserDrawPaletteCanvas")) {
            var a = document.createElement("canvas");
            a.id = "XDUserDrawPaletteCanvas", a.width = 200, a.height = 120, a.style.margin = "5px", a.style.position = "fixed", a.style.display = "none", a.style.top = "50px", a.style.right = "290px", a.style.border = "1px solid white", t.appendChild(a), e.parentDiv = t;
            var o = a.getContext("2d");
            o.clearRect(0, 0, a.width, a.height);
            var n = o.createLinearGradient(0, 0, a.width, 0);
            n.addColorStop(0, "#F00"), n.addColorStop(1 / 6, "#FF0"), n.addColorStop(2 / 6, "#0F0"), n.addColorStop(.5, "#0FF"), n.addColorStop(4 / 6, "#00F"), n.addColorStop(5 / 6, "#F0F"), n.addColorStop(1, "#F00"), o.fillStyle = n, o.fillRect(0, 0, a.width, a.height);
            var r = o.createLinearGradient(0, 0, 0, a.height);
            r.addColorStop(.3, "rgba(255,255,255,0)"), r.addColorStop(.7, "rgba(255,255,255,0)"), r.addColorStop(1, "rgba(255,255,255,1)"), o.fillStyle = r, o.fillRect(0, 0, a.width, a.height);
            var i = o.createLinearGradient(0, 0, 0, a.height);
            i.addColorStop(0, "rgba(0,0,0,1)"), i.addColorStop(.3, "rgba(0,0,0,0)"), i.addColorStop(1, "rgba(0,0,0,0)"), o.fillStyle = i, o.fillRect(0, 0, a.width, a.height), a.addEventListener("click", function (e) {
                var t = this.getContext("2d").getImageData(e.offsetX, e.offsetY, 1, 1).data,
                    a = "#" + ("000000" + (t[0] << 16 | t[1] << 8 | t[2]).toString(16)).slice(-6);
                XD_UserDraw.setPenColor(a), $("#previewBrushSize").style.backgroundColor = a, XD_UserDraw.parentDiv.style.backgroundColor = a
            }, !0)
        }
    }, e.createPencil = function () {
        var e = this;
        this.started = !1, this.mousedown = this.touchstart = function (t) {
            XD_UserDraw.drawable && (Module.XDIsMouseOverDiv(!0), XD_UserDraw.context.beginPath(), XD_UserDraw.context.moveTo(t._x, t._y), e.started = !0)
        }, this.mousemove = this.touchmove = function (t) {
            Module.XDIsMouseOverDiv(!0), e.started && (XD_UserDraw.context.lineTo(t._x, t._y), XD_UserDraw.context.stroke())
        }, this.mouseup = this.touchend = function (t) {
            e.started && (e.mousemove(t), e.started = !1)
        }
    }, e.ev_canvas = function (t) {
        if (t.touches) {
            if (1 != t.touches.length) return;
            t._x = parseInt(t.touches[0].clientX), t._y = parseInt(t.touches[0].clientY)
        } else t.layerX || 0 == t.layerX ? (t._x = t.layerX, t._y = t.layerY) : (t.offsetX || 0 == t.offsetX) && (t._x = t.offsetX, t._y = t.offsetY);
        var a = e.tool[t.type];
        a && a(t)
    }, e.setPenColor = function (t) {
        e.context.strokeStyle = t, e.setDrawCanvasBorder()
    }, e.saveUserDraw = function () {
        var t = e.canvas;
        if (t) {
            e.removeDrawCanvasBorder();
            var a = document.createElement("canvas"),
                o = a.getContext("2d");
            a.width = t.width, a.height = t.height;
            var n = new Image;
            n.onload = function () {
                o.drawImage(this, 0, 0, t.width, t.height);
                var e = new Image;
                e.onload = function () {
                    if (o.drawImage(this, a.width - this.width, a.height - this.height), XD_UserDraw.setDrawCanvasBorder(), a.msToBlob) {
                        var e = a.msToBlob();
                        return window.navigator.msSaveBlob(e, "XDMapScreenShot.png")
                    }
                    if (void 0 === a.toBlob) {
                        var t = a.toDataURL("image/png");
                        window.open(t, "_blank")
                    } else a.toBlob(function (e) {
                        var t = URL.createObjectURL(e),
                            a = document.createElement("a");
                        return a.setAttribute("href", t), a.setAttribute("download", "XDMapScreenShot.png"), document.body.appendChild(a), a.click(), document.body.removeChild(a), !0
                    }, "image/jpeg", 1)
                }, e.src = "./images/mashup/logo_watermark.png"
            }, n.src = t.toDataURL("image/jpeg")
        }
    }, e.finish = function () {
        e.isOpen = !1, e.drawable = !1,
        // UX.GLOBAL.toolbar.isUserDraw = !1,
        // Module.XDSetMouseState(1),
        e.canvas.style.display = "none", XD_UserDraw.setUseableButtons(!0)
    }, e
}();