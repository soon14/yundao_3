mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	},
	beforeback: function() {
		//返回true，继续页面关闭逻辑  
		mui.back;
		return true;
	}
});
	
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	document.getElementById("yunjia").innerHTML=self.COMMENTS;//运价详情内容
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
})