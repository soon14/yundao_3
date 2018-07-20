mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	},
	beforeback: function() {
		//返回true，继续页面关闭逻辑  
		run();
		return true;
	}
});

mui.plusReady(function() {
	var dingdan = plus.webview.getWebviewById('view/order/dingdan.html');
	dingdan.reload(true);

	var x = plus.webview.currentWebview();
	var array = [];
	if(x.opener()) {
		while(x.opener().id != "view/order/jianche.html") {
			x = x.opener();
			array.push(x);
		}
		for(var i = array.length - 1; i >= 0; i--) {
			array[i].close();
		}
	}
	setTimeout(function() {
		var index = plus.webview.getLaunchWebview();
		mui.fire(index, 'orderend', {
			STATUS: 1,
			TITLE: '订单'
		})
	}, 1000)

});

//	if(plus.webview.currentWebview().opener()) {
//		if(plus.webview.currentWebview().opener().opener()) {
//			if(plus.webview.currentWebview().opener().opener().opener() &&
//				plus.webview.currentWebview().opener().opener().opener().opener().id == "jianche_xiadan.html") {
//				plus.webview.currentWebview().opener().opener().opener().close();
//				setTimeout(function() {
//					var index = plus.webview.getLaunchWebview();
//					mui.fire(index, 'orderend', {
//						STATUS: 1,
//						TITLE: '订单'
//					})
//				}, 2000);
//			}
//			plus.webview.currentWebview().opener().opener().close();
//		}
//		plus.webview.currentWebview().opener().close();
//	}

//setTimeout(function(){
//	var index = plus.webview.getLaunchWebview();
//	mui.fire(index, 'orderend', {
//		STATUS: 1,
//		TITLE: '订单'
//	})}, 2000);
//

function run() { //3s倒计时
	//	if(plus.webview.currentWebview().opener()){
	//		if(plus.webview.currentWebview().opener().opener()){
	//			plus.webview.currentWebview().opener().opener().close();
	//		}
	//		plus.webview.currentWebview().opener().close();
	//	}
	//	plus.webview.currentWebview().opener().opener().close();
	//	plus.webview.currentWebview().opener().close();
	var s = document.getElementById("djs");
	if(s.innerHTML == 0) {
		plus.webview.currentWebview().close();
		return false;
	}
	//	plus.webview.currentWebview().opener().opener().close();
	//	plus.webview.currentWebview().opener().close();
	//	var dingdan = plus.webview.getWebviewById('view/order/dingdan.html');
	//	dingdan.reload(true);

	s.innerHTML = s.innerHTML * 1 - 1;
}
window.setInterval("run();", 1000);