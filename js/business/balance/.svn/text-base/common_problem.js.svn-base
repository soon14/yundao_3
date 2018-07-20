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
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});

// 点击客服问答列表查看详情
mui(".kefu").on('tap', 'a', function(e) {
	//获取a标签id--即客服问答id
	var id = this.getAttribute("id");
	var title = this.getAttribute("title");
	//var kefu = plus.webview.getWebviewById('kefu-wenda');
	var nwaiting = plus.nativeUI.showWaiting();

	mui.openWindow({
		url: '../about-us/kefu-wenda.html',
		id: 'kefu_wenda',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});

	var kefu_wenda = plus.webview.getWebviewById('kefu_wenda');
	kefu_wenda.addEventListener('loaded', function() {
		mui.fire(kefu_wenda, "refresh", {
			KEFU_ID: id,
			TITLE: title
		});
	});

});

//客服电话
document.getElementById("lianxitel").addEventListener('tap', function() {
	if(plus.os.name == 'iOS') {
		location.href = 'tel:114';
	} else {
		plus.device.dial("114");
	}
});