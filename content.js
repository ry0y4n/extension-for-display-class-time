const times = [
    "1限<br />8:40 ~ 9:55",
    "2限<br />10:10 ~ 11:25",
    "3限<br />12:15 ~ 13:30",
    "4限<br />13:45 ~ 15:00",
    "5限<br />15:15 ~ 16:30",
    "6限<br />16:45 ~ 18:00",
    "7限<br />18:00 ~ 19:15",
    "8限<br />19:20 ~ 20:35"
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
            let iframeDiv = document.getElementById("main-frame");

            // 別学期を開いたとき（iframeが更新された時を監視して）授業時間を差し込み直す
            observer.observe(iframeDiv, {
                attributes: true
            });
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
        head.innerHTML = `${times[index]}`;
    });
}

window.addEventListener("load", waitLoad, false);

const observer = new MutationObserver(records => {
    let iframeEl = document.getElementById("main-frame-if");
    let iframeDocument = iframeEl.contentDocument || iframeEl.contentWindow.document;

    display(iframeDocument);
})
