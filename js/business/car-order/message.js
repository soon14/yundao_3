mui.init({
	// 回退监听
	beforeback: function() {
		// 关闭软键盘
		document.activeElement.blur();
		//返回true，继续页面关闭逻辑  
		mui.back;
		return true;
	}
});

mui.plusReady(function() {
	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
	});
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();

});
var neirong = "";
mui('#ButtonList').on('tap', 'button', function(e) {
	if(this.style.backgroundImage.indexOf('biankuang3.png') > 0) {
		this.style.backgroundImage = 'url(../../image/biankuang4.png)';
		neirong += this.value + ',';
		console.log("1" + neirong);
		document.getElementById("textarea").value = neirong;
		var Str = document.getElementById('textarea').value;
		console.log("2" + Str);
		Str = (Str.substring(Str.length - 1) == ',') ? Str.substring(0, Str.length - 1) : Str;
		console.log("3" + Str);
		document.getElementById("textarea").value = Str;
		this.style.color = '#da4b49';
	} else if(this.style.backgroundImage.indexOf('biankuang4.png') > 0) {
		this.style.backgroundImage = 'url(../../image/biankuang3.png)';
		this.style.color = '#7c919f';
		var textareaValue = document.getElementById('textarea').value;
		textareaValue = textareaValue.replace("," + this.value, "");
		neirong = neirong.replace("," + this.value, "");
		console.log("4" + textareaValue);
		document.getElementById('textarea').value = textareaValue;
	}
});

document.getElementById("tijiao").addEventListener("tap", function() {
	var neirong = document.getElementById("textarea").value;
	//	neirong = (neirong.substring(neirong.length - 1) == ',') ? neirong.substring(0, neirongstr.length - 1) : neirong;
	if(neirong != null && neirong != "") {

		mui.openWindow({
			url: '../order/zhuanche_xiadan.html',
			id: 'zhuanche_xiadan',
		});
		var detail = plus.webview.getWebviewById('zhuanche_xiadan');
		mui.fire(detail, 'beizhu', {
			beizhuneirong: neirong
		});
		var detail2 = plus.webview.getWebviewById('shunfengche_xiadan');
		mui.fire(detail2, 'beizhu', {
			beizhuneirong: neirong
		});
		mui.back();
	} else {
		mui.toast("请填写内容");
		return false;
	}
});