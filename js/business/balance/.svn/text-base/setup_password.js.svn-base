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
	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
	});
	var fee_password = localStorage.getItem('FEE_PASSWORD');
	if(fee_password == 1) {
		document.getElementById('fee_password').style.display = '';
	}
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});

// 忘记密码
document.getElementById("wj-password").addEventListener('tap', function() {
	// 关闭软键盘
	document.activeElement.blur();
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var recharge = plus.webview.create('../balance/forget_password.html', 'forget_password');
});

// 提交提现密码
document.getElementById("recharge").addEventListener('tap', function() {
	// 关闭软键盘
	document.activeElement.blur();
	var url = serverAddress + "/order_App/editFee_Password_App.do";
	// 新密码
	var raice_1 = document.getElementById("raice_1").value;
	// 再次输入的新密码
	var raice_2 = document.getElementById("raice_2").value;
	// 访问后台的参数集合
	var JSONMessage = {};
	// 正整数
	var num_validate = /^[1-9]\d*$/;
	// 是否已经存在提现密码
	var fee_password = localStorage.getItem('FEE_PASSWORD');
	if(fee_password == 1) {
		// 旧密码
		var raice = document.getElementById("raice").value;
		if(raice == "") {
			mui.toast('旧密码不能为空')
			return false;
		}
		if(!num_validate.test(raice)) {
			mui.toast("请填写正确的旧密码");
			return false;
		}
		if(raice.length != 6) {
			mui.toast("请填写正确的6位旧密码");
			return false;
		}
		JSONMessage["FEE_PASSWORD_OLD"] = raice;
	}
	if(raice_1 == "") {
		mui.toast('新密码不能为空')
		return false;
	}
	if(!num_validate.test(raice_1)) {
		mui.toast("请填写正确的新密码");
		return false;
	}
	if(raice_1.length != 6) {
		mui.toast("请填写正确的6位新密码");
		return false;
	}
	if(raice_2 == "") {
		mui.toast('再次输入的新密码不能为空')
		return false;
	}
	if(!num_validate.test(raice_2)) {
		mui.toast("请填写正确的再次输入密码");
		return false;
	}
	if(raice_2.length != 6) {
		mui.toast("请填写正确的6位再次输入的密码");
		return false;
	}
	if(raice_1 != raice_2) {
		mui.toast('两次输入的密码不一致')
		return false;
	}

	JSONMessage["FEE_PASSWORD"] = raice_1;

	mui.ajax(url, {
		data: JSONMessage,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			/*'Content-Type': 'application/json'*/
		},
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.success == true) {
				localStorage.setItem('FEE_PASSWORD', '1');
				plus.webview.currentWebview().close();
			}
			if(data.success == false) {
				mui.toast(decodeURI(data.msg));
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast('服务器异常，请稍后再试！');
		}
	});

});