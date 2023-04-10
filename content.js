const times = [
    "8:40 ~ 9:55",
    "10:10 ~ 11:25",
    "12:15 ~ 13:30",
    "13:45 ~ 15:00",
    "15:15 ~ 16:30",
    "16:45 ~ 18:00",
    "18:00 ~ 19:15",
    "19:20 ~ 20:35"
]

function waitLoad() {
    const jsInitCheckTimer = setInterval(jsLoaded, 1000);
    function jsLoaded() {
        // iframeで読み込んでいるテーブル用HTMLを取得
        let iframeEl = document.getElementById("main-frame-if");
        let iframeDocument = iframeEl.contentDocument || iframeEl.contentWindow.document;

        // テーブルコンテンツがロードされるまで待つ
        if (iframeDocument.querySelector("table.rishu-koma") != null) {
            clearInterval(jsInitCheckTimer);
            display(iframeDocument);
        }
    }
}

function display(document) {

    // テーブルコンテンツから「1限〜8限」の行を抜き出す
    const table = document.querySelector("table.rishu-koma");
    let rows = table.children[0].children;
    rows = Array.prototype.slice.call(rows);
    rows = rows.slice(1);
    
    // 授業時間を差し込む
    rows.forEach((row, index) => {
        let head = row.querySelectorAll("td.rishu-koma-head")[1];
        head.innerHTML += `<br />${times[index]}`;
    });
}

window.addEventListener("load", waitLoad, false);
