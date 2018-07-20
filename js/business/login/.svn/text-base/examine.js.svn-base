mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	}
});

mui.back = function() {
	var btn = ["确定", "取消"];
	mui.confirm('确认关闭当前窗口？', '提示', btn, function(e) {
		if(e.index == 0) {
			plus.runtime.quit(); //退出APP
		}
	});
}

mui.plusReady(function() {
	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
	});
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});

// 关闭
document.getElementById("close").addEventListener('tap', function() {
	plus.webview.currentWebview().close();
});

// 关闭注册第三步页面
window.addEventListener('close_register_input_file', function(e) {
	plus.webview.currentWebview().opener().close();
});