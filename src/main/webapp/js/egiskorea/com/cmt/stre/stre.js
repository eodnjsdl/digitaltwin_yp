// 그리기 도구 목록
function aj_saveMap() {
    new MapStore();
}

/**
 * 지도 저장
 */
class MapStore {
    /**
     * 생성자
     */
    constructor() {
        this.width = 1920;
        this.height = 1080;
        this.render();
        this.bindEvents();
    }

    /**
     * 표시
     * @param {Object} data 검색 조건
     * @param {number} pageIndex 페이지 번호
     */
    render() {
        var html = $("#saveMapDiv").children().clone();
        $("#rightPopup").html(html);
    }

    /**
     * 이벤트 연결
     */
    bindEvents() {
        // PNG 생성
        $(".bi-png", this.element).bind("click", this.createImage);

        // 다운로드
        $(".bi-download", this.element).bind("click", () => {
            this.download();
        });
    }

    /**
     * PNG 이미지 생성
     */
    createImage() {
        // 2D
        if (app2D) {
            const yMap = app2D.getYMap();
            yMap.exportImage().done((data, width, height) => {
                $(".saveMap-thumb img").attr("src", data);
                this.width = width;
                this.height = height;
            });
        } else {
            var mapCanvas = Module.canvas;


            // 스크린 샷 만들 canvas
            var captureCanvas = document.createElement('canvas'),
                ctx = captureCanvas.getContext('2d')
            ;

            // 크기는 지도 canvas와 동일하게 설정
            captureCanvas.width = mapCanvas.width;
            captureCanvas.height = mapCanvas.height;

            var img = new Image();

            img.onload = function () {

                // 지도 캔버스 화면을 복사
                ctx.drawImage(this, 0, 0, mapCanvas.width, mapCanvas.height);

            };
            img.src = mapCanvas.toDataURL("image/jpeg");
            $(".saveMap-thumb img").attr("src", img.src);
        }
    }

    /**
     * 다운로드
     */
    download() {
        const src = $(".saveMap-thumb img").attr("src");
        const type = $("input[name=saveMap]:checked").attr("id");
        if (type == "saveMapPNG") {
            var link = document.createElement("a");
            link.download = "map_image_" + this.getTime() + ".png";
            link.href = src;
            link.click();
        } else if (type == "saveMapPDF") {
            const src = $(".saveMap-thumb img").attr("src");
            const pdf = new jspdf.jsPDF("p", "mm", "a4");
            pdf.addFileToVFS('malgun.ttf', _fonts);  //_fonts 변수는 Base64 형태로 변환된 내용입니다.
            pdf.addFont('malgun.ttf', 'malgun', 'normal');
            pdf.setFont('malgun');
            pdf.addImage('/images/pdf_logo.jpg', "JPEG", 50, 3, 20, 20);
            pdf.text(75, 15, '스마트IN양평플랫폼');
            const imageHeight = Math.floor(190 / this.width * this.height);
            //console.log(imageHeight);
            pdf.addImage(src, "JPEG", 10, 30, 190, imageHeight);
            pdf.setFontSize(12);
            const cn = $("#stre-memo").val();
            var splitTitle = pdf.splitTextToSize(cn, 190);
            pdf.text(10, 40 + imageHeight, splitTitle);
            var nm = "map_image_" + this.getTime() + ".pdf";
            pdf.save(nm);
        }

    }

    getTime() {
        var today = new Date();
        var year = this.leadingZeros(today.getFullYear(), 4); // 년도
        var month = this.leadingZeros(today.getMonth() + 1, 2);  // 월
        var date = this.leadingZeros(today.getDate(), 2);  // 날짜
        var hours = this.leadingZeros(today.getHours(), 2); // 시
        var minutes = this.leadingZeros(today.getMinutes(), 2);  // 분
        var seconds = this.leadingZeros(today.getSeconds(), 2);  // 초
        var date = year + month + date + hours + minutes + seconds;
        return date;
    }

    leadingZeros(n, digits) {

        var zero = '';
        n = n.toString();

        if (n.length < digits) {
            for (var i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    }
}
