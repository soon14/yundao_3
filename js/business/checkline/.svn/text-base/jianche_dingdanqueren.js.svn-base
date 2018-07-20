var couponCustomerId;
var jcCoupons = new Array();

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

function initContent() {
	var self = plus.webview.currentWebview();
	var contactor = self.CUSTORMER_NAME;
	var carnumber = self.PLATE_NO;
	var contact = self.PHONE_NO;
	var checktime = self.CHECK_TIME;
	var price = self.PRICE;
	var checklineName = self.CHECKINGLINE_NAME;
	var address = self.ADDRESS;
	var phone = self.PHONE_NO;
	var clPhone = self.CLPHONE;
	var carType = self.CAR_TYPE;
	var clID = self.CHECKINGLINE_ID;
	var dicID = self.TYPE_ITEM;
	var clUserID = self.APPUSERID;
	document.getElementById('cl_checkTime').innerText = checktime;
	document.getElementById("cl_carType").innerText = carType;
	document.getElementById('cl_carNo').innerText = carnumber;
	document.getElementById('cl_contactor').innerText = contactor;
	document.getElementById("cl_contactPhone").innerText = contact;
	document.getElementById('cl_checklineName').innerText = checklineName;
	document.getElementById('cl_address').innerText = address ? address : "";
	document.getElementById('cl_price').innerText = price + "元";

	getJCCoupons();

	document.getElementById('xiadan').addEventListener('tap', function() {
		var nwaiting = plus.nativeUI.showWaiting();
		var url = serverAddress + "/appcheckingline/createOrder.do";
		mui.ajax(url, {
			data: {
				CUSTORMER_NAME: encodeURIComponent(contactor),
				PHONE_NO: contact,
				TYPE_ITEM: dicID,
				PLANE_DATE: checktime,
				CHECKINGLINE_ID: clID,
				PLATE_NO: encodeURIComponent(carnumber),
				APPUSER_ID: clUserID,
				COUPON_CUSTOMER_ID: couponCustomerId
			},
			dataType: 'json',
			type: 'get',
			async: false,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			timeout: 60000,
			success: function(data) {
				if(data.success == true) {
					var wait_payment = plus.webview.create('../payment/wait-payment.html', 'wait-payment');
					mui.fire(wait_payment, "loading", {
						
						"OD_TYPE": "JC",
						"OD_ID": data.obj.CHECKINGLINEORDER_ID,
						"MONEY": actualPrice  || data.obj.PRICE
					});
					
//					mui.openWindow({
//						url: "../payment/wait-payment.html",
//						id: "wait-payment.html",
//						extras: {
//							"orderType": "JC",
//							"orderId": data.obj.CHECKINGLINEORDER_ID,
//							"orderPrice": data.obj.PRICE
//						}
//					});
//					plus.nativeUI.closeWaiting();
				} else {
					plus.nativeUI.closeWaiting();
					alert(data.msg);
				}
			},
			error: function(xhr, type, errorThrown) {
				plus.nativeUI.closeWaiting();
			}
		});
	})
}

function getJCCoupons() {
	var url = serverAddress + "/portal/listAllCouponByCustomerIdForUse.do";
	var couScope = "7b1d8cf070764ce0bdef55e1ed373b10";
	var param = {
		"SCOPE": couScope
	};
	mui.ajax(url, {
		data: param,
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			/*'Content-Type': 'application/json'*/
		},
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.success == true) {
				if(data.obj && data.obj.length > 0) {
					fillJCCoupons(data);
				}
			}
			if(data.success == false) {
				//mui.toast(decodeURI(data.msg));
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//mui.toast('网络异常，请稍后再试！');
		}
	});
}

mui.plusReady(initContent);

function fillJCCoupons(data) {
	for(var i = 0; i < data.obj.length; i++) {
		var c = data.obj[i];
		var cou = {
			"type": "", //0-折扣，1-满减
			"title": "",
			"subtitle": "",
			"couponId": "",
			"couponCustomerId": "",
			"fee": "",
			"condition": ""
		};
		if(c.SCALE == "0") {
			cou.type = "1";
			cou.fee = c.MONEY;
		} else {
			cou.type = "0";
			cou.fee = c.SCALE * 10;
		}
		cou.title = c.NAME;
		cou.subtitle = c.SCOPE_NAME;
		cou.couponId = c.COUPON_ID;
		cou.condition = c.USER_LIMIT_AMUNT;
		cou.couponCustomerId = c.COUPON_CUSTOMER_ID;
		jcCoupons.push(cou);
	}
	calcCoupon();
}

var actualPrice = 0;

function calcCoupon() {
	var couponMoney = 0;
	var self = plus.webview.currentWebview();
	var price = self.PRICE;
	var money;
	for(var i = 0; i < jcCoupons.length; i++) {
		var c = jcCoupons[i];
//		if(c.type == "0") //折扣
//		{
//			money = price * (1 - c.fee / 10);
//			if(money > couponMoney) {
//				couponMoney = money;
//				couponCustomerId = c.couponCustomerId;
//			}
//		}
		if(c.type == "1") //满减
		{
			if(parseInt(price) > parseInt(c.condition)) {
				if(parseInt(c.fee) > parseInt(couponMoney)) {
					couponMoney = c.fee;
					couponCustomerId = c.couponCustomerId;
				}
			}
		}
	}
	actualPrice = price - couponMoney;
	if(couponMoney == 0) {
		document.getElementById('cl_price').innerText = price + "元";
	} else {
		document.getElementById('cl_price').innerText = actualPrice + "元  (减免" + couponMoney + "元)";
	}
}

