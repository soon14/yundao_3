mui.init({
	// 回退监听
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
	//获取我的余额
	var url = serverAddress + "/appUserAccount/queryUserAccountInfo.do";
	mui.ajax(url, {
		data: {},
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			/*'Content-Type': 'application/json'*/
		},
		success: function(data) {
			if(data.success == true) {				
				var money = data.obj.ACCOUNT_YUE;
				document.getElementById("yue_money").innerHTML = "￥"+money; //给余额赋值
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
});
// 余额明细
document.getElementById("detail_id").addEventListener('tap', function() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var balance = plus.webview.create('../balance/balance_list_parent.html', 'balance_list_parent');
});

// 充值
document.getElementById("recharge").addEventListener('tap', function() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var recharge = plus.webview.create('../balance/recharge.html', 'recharge');
});
//余额
document.getElementById("withdrawals").addEventListener('tap', function() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var recharge = plus.webview.create('../balance/withdrawals.html', 'withdrawals');
});

// 设置提现密码
document.getElementById("tixian_password").addEventListener('tap', function() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var balance = plus.webview.create('../balance/setup_password.html', 'setup_password');
});