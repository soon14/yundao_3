mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	},
	beforeback: function() {
		// 关闭软键盘
		document.activeElement.blur();
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

// 跳转填写我的推荐人推荐码
document.getElementById("save_code").addEventListener("tap", function() {
	// 关闭软键盘
	document.activeElement.blur();
	var offer_code = document.getElementById('offer_code').value.trim();
	// 验证中文
	var no_chinese = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
	if(offer_code == '') {
		mui.toast('请输入推荐人推荐码');
		return false;
	} else if(no_chinese.test(offer_code)) {
		mui.toast('推荐码不能存在中文');
		return false;
	}
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var url = serverAddress + "/market/editMarket_App.do";
	mui.ajax(url, {
		data: {
			OFFER_CODE: offer_code
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			/*'Content-Type': 'application/json'*/
		},
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.success == true) {
				plus.nativeUI.closeWaiting();
				localStorage.setItem('OFFER_CODE', offer_code);
				// 刷新父页面
				var list = plus.webview.currentWebview().opener();
				//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
				mui.fire(list, 'refresh');
				//返回true，继续页面关闭逻辑  
				var webview = plus.webview.currentWebview().close();
			}
			if(data.success == false) {
				plus.nativeUI.closeWaiting();
				mui.toast(decodeURI(data.msg));
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			/*mui.toast('网络异常，请稍后再试！');*/
			plus.nativeUI.closeWaiting();
		}
	});
});