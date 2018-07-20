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

document.getElementById("chongzhi").addEventListener('tap', function() {
	var raice = document.getElementById("raice").value;
	// 正整数
	var num_validate = /^[1-9]\d*$/;
	if(raice == !"" && num_validate.test(raice)) {
		// 关闭软键盘
		document.activeElement.blur();
		var url = serverAddress + "/appUserAccount/recharge.do";
		mui.ajax(url, {
			data: {
				PRICE: raice
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
					//点击下一步，如果服务器响应成功，跳转到支付页面

					// 设定等待动画框，新页面加载完毕后再显示
					var nwaiting = plus.nativeUI.showWaiting();
					var wait_payment = plus.webview.create('../payment/wait-payment.html', 'wait-payment');
					mui.fire(wait_payment, "loading", {
						MONEY: raice,
						SIGN: "chongzhi"
					});
				}
				if(data.success == false) {
					mui.toast(decodeURI(data.msg));
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//mui.toast('网络超时，请稍后再试！');
			}
		});
	} else {
		mui.toast('请输入正确金额')
		return false;
	}

});