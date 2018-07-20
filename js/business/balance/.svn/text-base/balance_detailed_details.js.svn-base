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
})

// 加载页面
window.addEventListener('loading', function(e) {
	var money = e.detail.MONEY_NEW; //金额
	var time = e.detail.SYS_DATE_NEW; //时间
	var satatus = e.detail.STATUS_NEW; //状态：1收入，2支出
	var order_id = e.detail.OD_ID_NEW; //订单id
	var beizhu = e.detail.BEIZHU_NEW; //备注
	var record = [{
		"MONEY": money,
		"SYS_DATE": time,
		"STATUS": satatus,
		"OD_ID": order_id,
		"BEIZHU": beizhu
	}]
	// 明细详情页面模板数据传递
	var str = template('radio-tigan', {
		"record": record
	});
	document.getElementById("mui-template").innerHTML = str;
});