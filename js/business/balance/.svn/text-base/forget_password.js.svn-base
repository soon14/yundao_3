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
	    softinputMode: "adjustResize"  // 弹出软键盘时自动改变webview的高度
	});
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});