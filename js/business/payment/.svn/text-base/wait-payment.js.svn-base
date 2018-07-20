// 订单ID
var od_id;
// 支付金额
var money;
//页面跳转标记
var sign;
mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	}
	//			beforeback: function() {
	//				//		//返回true，继续页面关闭逻辑  
	//				//		var info_fill = plus.webview.currentWebview().opener().opener();
	//				//		mui.fire(info_fill, 'close');
	//				////		mui.back;
	//				//		return true;
	//					}
});

mui.plusReady(function() {
	var currentView = plus.webview.currentWebview();
	// 加载完毕后关闭等待框，并展示页面
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
	var _back = mui.back;
	mui.back = function() {
		var info_fill = plus.webview.currentWebview().opener().opener();
		if(info_fill.id == "message_tianxie.html"){
			mui.fire(info_fill, 'close');
		}else {
			_back();
		}
		return;
	};
});

var orderType, orderPrice, orderId;

// 加载页面
window.addEventListener('loading', function(e) {
	od_id = e.detail.OD_ID;
	money = e.detail.MONEY;
	orderPrice = e.detail.MONEY;
	sign = e.detail.SIGN;
	orderType = e.detail.OD_TYPE;
	document.getElementById("money_id").innerHTML = money; //把页面金额赋值
	if(sign == "chongzhi") { //充值
		document.getElementById("zhe1").innerHTML = "";
		document.getElementById("zhe2").innerHTML = "";
		//		document.getElementById("zhe3").innerHTML = "";
		document.getElementById("cash").hidden = 'hidden';
		document.getElementById("yezf").hidden = 'hidden';
	}
	if(sign == 1) { //专车、或者顺风车
		document.getElementById("zhe1").innerHTML = "";
		document.getElementById("zhe2").innerHTML = "";
		document.getElementById("zhe3").innerHTML = "";
	}
	if(orderType == "JC") {
		document.getElementById("zhe1").innerHTML = "";
		document.getElementById("zhe2").innerHTML = "";
		document.getElementById("cash").hidden = 'hidden';
		document.getElementById("zhe3").innerHTML = "";
	}
});

// 确认支付
document.getElementById("queren").addEventListener('tap', function() {
	handleConfirm();
});

function handleConfirm() {
	var payChannel;
	var ps = document.getElementsByName("style");
	for(var i = 0; i < ps.length; i++) {
		var c = ps[i];
		if(c.checked) {
			payChannel = c.getAttribute("id");
		}
	}
	gotoPay(payChannel);
}

function weixinPay() {
	var pays = {};
	plus.payment.getChannels(function(channels) {
			var txt = "支付通道信息：";
			for(var i in channels) {
				var channel = channels[i];
				if(channel.id == 'qhpay' || channel.id == 'qihoo') { // 过滤掉不支持的支付通道：暂不支持360相关支付
					continue;
				}
				pays[channel.id] = channel;
				txt += "id:" + channel.id + ", ";
				txt += "description:" + channel.description + ", ";
				txt += "serviceReady:" + channel.serviceReady + "； ";
			}
		},
		function(e) {
			console.log("获取支付通道失败：" + e.message);
		});

	url = serverAddress + "/appAllin/to_allin_weixin_pay.do";
	mui.ajax(url, {
		data: {
			OD_ID: od_id,
			PRICE: orderPrice
		},
		dataType: 'json',
		type: 'get',
		async: false,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		timeout: 60000,
		success: function(data2) {
			if(data2.success == true) {
				plus.nativeUI.closeWaiting();
				plus.payment.request(pays['wxpay'], JSON.stringify(data2), function(result) {
					plus.nativeUI.closeWaiting();
					mui.toast("支付成功！");
					mui.openWindow("payment-success.html");
				}, function(e) {
					plus.nativeUI.closeWaiting();
					mui.toast(JSON.stringify(e));
					mui.toast("支付失败！");
					mui.openWindow("payment-error.html");

				});
			}

		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.closeWaiting();
			mui.toast("支付失败", "错误", "OK", null);
		}
	});
}

function yinlianpay() {
	mui.openWindow({
		url: "tl_bank_pay.html",
		id: "tl_bank_pay.html",
		extras: {
			orderId: od_id,
			orderPrice: orderPrice
		}
	});
}

function gotoPay(channel) {
	if(channel == "pay2") {
		weixinPay();
	}
	if(channel == "pay1") {
		yinlianpay();
	}
	if((orderType == "ZC" || orderType == "SF") && channel == "pay4") {
		// 设定等待动画框，新页面加载完毕后再显示
		var nwaiting = plus.nativeUI.showWaiting();
		var od_type;
		console.log(od_id);
		if(od_id.startsWith("ZC")) {
			od_type = "1";
		} else if(od_id.startsWith("SF")) {
			od_type = "3";
		}
		var url = serverAddress + "/order_App/updateOrder_Pay_App.do";
		mui.ajax(url, {
			data: {
				OD_ID: od_id,
				STATUS_ZHIFU: '0',
				OD_TYPE: od_type,
				STATUS_ORDER_HIS: '12',
				LNG: '0',
				LAT: '0'
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 30000, //超时时间设置为30秒；
			headers: {
				/*'Content-Type': 'application/json'*/
			},
			success: function(data) {
				//服务器返回响应
				if(data.success == true) {
					plus.nativeUI.closeWaiting();
					mui.toast("支付成功");
					// 刷新订单管理页面
					var dingdan = plus.webview.getWebviewById('view/order/dingdan.html');
					dingdan.reload(true);
					// 刷新我的页面
					var wode = plus.webview.getWebviewById('view/geren_message/wode.html');
					wode.reload(true);
					var order_xiangqing = plus.webview.currentWebview().opener();
					mui.fire(order_xiangqing, 'close');
					mui.openWindow("payment-success.html");
				}
				if(data.success == false) {
					mui.toast("支付失败");
					plus.nativeUI.closeWaiting();
					mui.openWindow("payment-error.html");
				}
			},
			error: function(xhr, type, errorThrown) {
				plus.nativeUI.closeWaiting();
				mui.toast("支付失败", "错误", "OK", null);
				mui.openWindow("payment-error.html");
				mui.back();
			}
		});
	}
	if(orderType == "LO" && channel == "pay3") {
		mui.toast("此处将用户支付信息发送给后台，接到后台返回后直接返回");
		mui.back();
	}
	if(orderType == "LO" && channel != "pay3") {
		mui.toast("此处将用户支付信息支付价格为9折，发送给后台，接到后台返回后直接返回");
		mui.back();
	}
	if(orderType == "JC" && channel == "pay4") {
		var url = serverAddress + "/appcheckingline/payForOrder.do";
		mui.ajax(url, {
			data: {
				"CHECKINGLINEORDER_ID": od_id
			},
			dataType: 'json',
			type: 'get',
			async: false,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			timeout: 60000,
			success: function(data2) {
				if(data2) {
					plus.nativeUI.closeWaiting();
					mui.toast("支付成功！");
					mui.openWindow("payment-success.html");
				}
			},
			error: function(xhr, type, errorThrown) {
				plus.nativeUI.closeWaiting();
				mui.toast("支付失败", "错误", "OK", null);
			}
		});
	}
}