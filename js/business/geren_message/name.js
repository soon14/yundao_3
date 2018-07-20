mui.init({
	keyEventBind: {
		backbutton: true, //打开back按键监听
	},
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
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});

// 姓名保存
document.getElementById("save").addEventListener('tap', function() {
	// 关闭软键盘
	document.activeElement.blur();
	document.getElementById("save").setAttribute("class", "mui-btn-link mui-pull-right mui-disabled");
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var name = document.getElementById('account').value.trim();
	var url = serverAddress + "/order_App/updateUser_Info_App.do";
	if(name.length != 0) {
		mui.ajax(url, {
			data: {
				NAME: name
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 30000, //超时时间设置为30秒；
			headers: {
				/*'Content-Type': 'application/json'*/
			},
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				if(data.success == true) {
					plus.nativeUI.closeWaiting();
					localStorage.setItem('GEREN_NAME', name);
					// 刷新父页面列表
					var list = plus.webview.currentWebview().opener();
					//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
					mui.fire(list, 'refresh');
					plus.webview.getWebviewById('name').close();
					mui.back();
				}
				if(data.success == false) {
					plus.nativeUI.closeWaiting();
					mui.toast(decodeURI(data.msg));
				}
			},
			error: function(xhr, type, errorThrown) {
				// 异常处理；
				// mui.toast('服务器异常，请稍后再试！');
				plus.nativeUI.closeWaiting();
			}
		});
	} else {
		plus.nativeUI.closeWaiting();
		mui.toast("请填写名字！");
		document.getElementById("save").setAttribute("class", "mui-btn-link mui-pull-right");
		return false;
	}

});

// 接收geren_message页面中传递过来的姓名
window.addEventListener('user_name', function(event) {
	var geren_name = event.detail.GEREN_NAME;
	document.getElementById('account').value = geren_name;
});