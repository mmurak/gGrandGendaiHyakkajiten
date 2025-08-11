class GlobalManager {
	constructor() {
		this.textEntry = document.getElementById("TextEntry");
		this.textEntry.addEventListener("focus", () => {this.textEntry.select();});
		this.indexSearch = document.getElementById("IndexSearch");
		this.indexSearch.addEventListener("click", searchIndex);
		this.eraseEntry = document.getElementById("EraseEntry");
		this.eraseEntry.addEventListener("click", eraseTextEntry);
		this.pageEntry = document.getElementById("PageEntry");
		this.pageEntry.addEventListener("focus", () => {this.pageEntry.select();});
		this.openPage = document.getElementById("OpenPage");
		this.openPage.addEventListener("click", openDirect);
		this.erasePage = document.getElementById("ErasePage");
		this.erasePage.addEventListener("click", erasePageEntry);
		document.addEventListener("keyup", (evt) => {
			if (evt.key == "Enter") {
				if (isElementFocused(this.pageEntry)) {
					openDirect();
					this.pageEntry.focus();
				} else if (evt.shiftKey) {
					searchIndex();
					this.textEntry.focus();
				}
			} else if (evt.key == "Escape") {
				if (isElementFocused(this.pageEntry)) {
					erasePageEntry();
				} else if (isElementFocused(this.textEntry)) {
					eraseTextEntry();
				}
			}
		});
		this.shingoEntry = document.getElementById("ShingoEntry");
		this.shingoEntry.addEventListener("focus", () => {this.shingoEntry.select();});
		this.shingoSearch = document.getElementById("ShingoSearch");
		this.shingoSearch.addEventListener("click", searchShingo);
		this.shingoEraser = document.getElementById("ShingoEraser");
		this.shingoEraser.addEventListener("click", eraseShingo);
		this.japan = document.getElementById("Japan");
		this.geoEntry = document.getElementById("GeoEntry");
		this.geoEntry.addEventListener("focus", () => {this.geoEntry.select();});
		this.geoSearch = document.getElementById("GeoSearch");
		this.geoSearch.addEventListener("click", searchGeo);
		this.geoEraser = document.getElementById("GeoEraser");
		this.geoEraser.addEventListener("click", eraseGeo);
		this.dossier = document.getElementById("Dossier");
		//
		this.idxURL = "https://dl.ndl.go.jp/pid/12405003/1/";
		this.volInfo = [
			[],
			["https://dl.ndl.go.jp/pid/12404973/1/", 4, 444],
			["https://dl.ndl.go.jp/pid/12404974/1/", 4, 408],
			["https://dl.ndl.go.jp/pid/12404975/1/", 4, 417],
			["https://dl.ndl.go.jp/pid/12404976/1/", 4, 424],
			["https://dl.ndl.go.jp/pid/12404977/1/", 4, 412],	// 5
			["https://dl.ndl.go.jp/pid/12404978/1/", 4, 427],
			["https://dl.ndl.go.jp/pid/12404979/1/", 4, 424],
			["https://dl.ndl.go.jp/pid/12404980/1/", 4, 411],
			["https://dl.ndl.go.jp/pid/12404981/1/", 4, 431],
			["https://dl.ndl.go.jp/pid/12404982/1/", 4, 416],	// 10
			["https://dl.ndl.go.jp/pid/12404983/1/", 4, 413],
			["https://dl.ndl.go.jp/pid/12404984/1/", 4, 434],
			["https://dl.ndl.go.jp/pid/12404985/1/", 4, 419],
			["https://dl.ndl.go.jp/pid/12404986/1/", 4, 417],
			["https://dl.ndl.go.jp/pid/12404987/1/", 4, 443],	// 15
			["https://dl.ndl.go.jp/pid/12404988/1/", 4, 417],
			["https://dl.ndl.go.jp/pid/12404989/1/", 4, 409],
			["https://dl.ndl.go.jp/pid/12404990/1/", 4, 447],
			["https://dl.ndl.go.jp/pid/12404991/1/", 4, 408],
			["https://dl.ndl.go.jp/pid/12404992/1/", 4, 416],	// 20
			["https://dl.ndl.go.jp/pid/12404993/1/", 4, 443],
			["https://dl.ndl.go.jp/pid/12404994/1/", 4, 432],
			["https://dl.ndl.go.jp/pid/12404995/1/", 4, 425],
			["https://dl.ndl.go.jp/pid/12404996/1/", 4, 427],
			["https://dl.ndl.go.jp/pid/12404997/1/", 4, 421],	// 25
			["https://dl.ndl.go.jp/pid/12404998/1/", 4, 436],
			["https://dl.ndl.go.jp/pid/12404999/1/", 4, 431],
			["https://dl.ndl.go.jp/pid/12405000/1/", 4, 409],
			["https://dl.ndl.go.jp/pid/12405001/1/", 4, 425],
			["https://dl.ndl.go.jp/pid/12405002/1/", 4, 419],	// 30
			["https://dl.ndl.go.jp/pid/12405003/1/", 4, 748],
			["https://dl.ndl.go.jp/pid/12405004/1/", 3, 373],
			["https://dl.ndl.go.jp/pid/12405005/1/", 3, 407],	// 33
		];
		this.URL = 0;
		this.OFFSET = 1;
		this.ENDPAGE = 2;
	}
}
const G = new GlobalManager();
const R = new Regulator();

loadSelector(G.dossier, dossierIndex);

G.textEntry.focus();

function searchIndex() {
	let target = G.textEntry.value;
	target = target.replace(/[ァ-ン]/g, (s) => {
		return String.fromCharCode(s.charCodeAt(0) - 0x60);
	});
	let rTarget = R.regulate(target);
	if (rTarget.length == 0)  return;
	let idx = wabunIndex.length - 1;
	while (wabunIndex[idx] > rTarget) {
		idx--;
	}
	const page = wabunIndex[0] + idx;
	windowOpen(G.idxURL + page, "索引検索結果");
}

function searchShingo() {
	let target = G.shingoEntry.value;
	target = target.replace(/[ァ-ン]/g, (s) => {
		return String.fromCharCode(s.charCodeAt(0) - 0x60);
	});
	let rTarget = R.regulate(target);
	if (rTarget.length == 0)  return;
	let idx = shingoIndex.length - 1;
	while (shingoIndex[idx] > rTarget) {
		idx--;
	}
	const page = shingoIndex[0] - idx;
	windowOpen(G.volInfo[32][0] + page, "新語索引検索結果");
}

function eraseShingo() {
	G.shingoEntry.value = "";
}

function searchGeo() {
	let target = G.geoEntry.value;
	target = target.replace(/[ァ-ン]/g, (s) => {
		return String.fromCharCode(s.charCodeAt(0) - 0x60);
	});
	let rTarget = R.regulate(target);
	if (rTarget.length == 0)  return;
	let master = japanesePlaceNames;
	let url = "https://dl.ndl.go.jp/pid/12405003/1/";
	if (!G.japan.checked) {
		master = globalPlaceNames;
		url = "https://dl.ndl.go.jp/pid/12405005/1/";
	}
	let idx = master.length - 1;
	while (master[idx] > rTarget) {
		idx--;
	}
	const page = master[0] + idx;
	windowOpen(url + page, "新語索引検索結果");
}

function eraseGeo() {
	G.geoEntry.value = "";
}

function openCountry() {
	windowOpen("https://dl.ndl.go.jp/pid/12405005/1/96", "国索引");
}

function openDirect() {
	const value = G.pageEntry.value;
	const m = value.match(/(\d\d)(\d+)/);
	if (m == null) {
		alert("閲覧したい巻数を2桁で、続けてページ数を指定してください。");
		return;
	}
	const volNo = Number(m[1]);
	const page = Number(m[2]);
	if (checkInput(volNo, page) == -1)  return;
	let fixedPage = fixMissingPages(volNo, page);
	fixedPage = fixOverlayPages(volNo, page);
	const frame = Math.trunc(Number(fixedPage) / 2) + G.volInfo[volNo][G.OFFSET];
	windowOpen(G.volInfo[volNo][G.URL] + frame, "検索結果");
}

function fixMissingPages(volNo, page) {
	const missingPages = [	// VolNo, PageFrom(inclusive), PageTo(inclusive)
//		[30, 507, 508],
	];
	// このロジックは1巻中に欠落ページが散在している場合を想定していない点に注意。
	for (let i = 0; i < missingPages.length; i++) {
		if (volNo == missingPages[i][0]) {
			if ((page >= missingPages[i][1]) && (page <= missingPages[i][2])) {
				alert("このページは欠落しています。");
				return missingPages[i][1];
			}
			if (page > missingPages[i][2]) {
				return page - (missingPages[i][2] - missingPages[i][1] + 1);
			}
		}
	}
	return page;
}

function fixOverlayPages(volNo, page) {
	const overlayPages = [	// VolNo, PageAt, NumberOfPages
		[19, 278, 4],
		[22, 230, 2],
		[24, 301, 4],
		[25, 366, 4],
	];
	// このロジックは1巻中にオーバーレイページが散在している場合を想定していない点に注意。
	for (let i = 0; i < overlayPages.length; i++) {
		if (volNo == overlayPages[i][0]) {
			if (page > overlayPages[i][1]) {
				return page + overlayPages[i][2];
			}
		}
	}
	return page;
}

function checkInput(volNo, page) {
	if ((volNo >= G.volInfo.length) || (volNo < 1)) {
		alert("巻数には1〜" + (G.volInfo.length - 1) + "を指定してください。");
		return -1;
	}
	if ((G.volInfo[volNo][G.ENDPAGE] < page) || (page < 1)) {
		alert(volNo + "巻で指定可能なページ数は1〜" + G.volInfo[volNo][G.ENDPAGE] + "です。");
		return -1;
	}
	return 0;
}

function eraseTextEntry() {
	G.textEntry.value = "";
	G.textEntry.focus();
}

function erasePageEntry() {
	G.pageEntry.value = "";
	G.pageEntry.focus();
}

function windowOpen(url, title) {
	window.open(url, title);
	G.textEntry.focus();
}

function isElementFocused(elem) {
	return document.activeElement === elem && document.hasFocus();
}

function loadSelector(selector, data) {
	selector.appendChild(document.createElement("option"));
	for (let i = 0; i < data.length; i++) {
		let name = data[i][0];
		let val = data[i][1]
		let elem = document.createElement("option");
		elem.text = name;
		elem.value = val;
		selector.appendChild(elem);
	}
	selector.addEventListener("change", () => {
		const frameNo = selector[selector.selectedIndex].value;
		window.open(G.volInfo[32][0] + frameNo, "各種資料");
		selector.selectedIndex = 0;
	});
}
