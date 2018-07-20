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

mui('.mui-scroll-wrapper').scroll();

var order_status, order_id, order_price;
mui.plusReady(function() {
	//	var url = serverAddress + "/order_App/order_His_App.do"; //订单状态url
	var url_detail = serverAddress + "/appcheckingline/viewOrderDetail.do"; //订单详情url
	var self = plus.webview.currentWebview();
	order_id = self.OD_ID;
	//获得订单状态页面
	mui.ajax(url_detail, {
		data: {
			"CHECKINGLINEORDER_ID": order_id
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
				//********************订单详情****************
				//预约时间
				var order_time = decodeURIComponent(data.attributes.order.PLANE_DATE);
				data.attributes.order.PLANE_DATE = order_time;
				//车型
				var car_type = decodeURI(data.attributes.order.ITEM_NAME);
				data.attributes.order.ITEM_NAME = car_type;
				//车牌号
				var car_no = decodeURI(data.attributes.order.PLATE_NO);
				data.attributes.order.PLATE_NO = car_no;
				//联系人
				var person = decodeURI(data.attributes.order.CUSTORMER_NAME);
				data.attributes.order.CUSTORMER_NAME = person;
				//联系方式
				var phone = decodeURI(data.attributes.order.PHONE_NO);
				data.attributes.order.PHONE_NO = phone;
				//检车线
				var checkline = decodeURI(data.attributes.order.CHECKINGLINE_NAME);
				data.attributes.order.CHECKINGLINE_NAME = checkline;
				//目的地
				var address = decodeURI(data.attributes.order.ADDRESS);
				data.attributes.order.ADDRESS = address;
				//价格
				var price = decodeURI(data.attributes.order.PRICE);
				var couponMoney = 0;
				if(data.attributes.order.COUPON_MONEY){
					couponMoney = decodeURI(data.attributes.order.COUPON_MONEY);
				}
				data.attributes.order.PRICE = parseInt(price) - parseInt(couponMoney);
				order_price = price;

				var record = data.attributes.order;
				var str = template('radio-tigan_2', {
					"record": record
				});
				document.getElementById("lvst").innerHTML = str;

				//********************订单状态****************
				data.obj = data.attributes.statusList;
				for(var i = 0; i < data.obj.length; i++) {
					//内容状态
					var content = decodeURI(data.obj[i].CONTENT);
					data.obj[i].CONTENT = content;
					//年月
					var sys_date = decodeURIComponent(data.obj[i].CREATEDATE_NEW);
					var json_data = sys_date.substring(0, 10);
					data.obj[i]["SYS_DATE_NEW"] = json_data; //往json添加年月数据
					//时间	
					var json_time = sys_date.substring(10, 16);
					data.obj[i]["SYS_MINUTES_NEW"] = json_time; //往json添加时间数据		

					var code = data.obj[i].DICTIONARY_CODE;
					var currentCount;
					if(code == "cd513102f9d94d31a337d7e4a389f462") {
						currentCount = "1";
					}
					if(code == "0d9343c3c85645c1831e1fb57742149b") {
						currentCount = "2";
					}
					if(code == "38d3a4f5f2df404ba89995290408ce7c") {
						currentCount = "3";
					}
					if(code == "c5a8e8ecd6f5433ab7dd8885c132486b") {
						currentCount = "4";
					}
					if(code == "4f4503622043435580181ba9ab0a1924") {
						currentCount = "5";
					}
					if(code == "b46aed6760fc4ef29b1cd1e033832893") {
						currentCount = "6";
					}
					if(code == "6b15711ab67d4610a8681e3c7ac7d108") {
						currentCount = "7";
					}
					data.obj[i].STATUS_ORDER_HIS = currentCount;

				}
				order_status = data.obj[data.obj.length - 1].STATUS_ORDER_HIS;
				var record = data.obj;
				var str = template('radio-tigan', {
					"record": record
				});
				document.getElementById("orde_status").innerHTML = str;
				if(data.obj.length == 1) {
					document.getElementsByTagName("li")[0].className = "exp-content-list list-item-1";
				} else {
					//第一个li的icon
					document.getElementsByTagName("li")[0].className = "exp-content-list list-item-1";
					//最后一个li的icon
					document.getElementsByTagName("li")[data.obj.length - 1].className = "exp-content-list list-item-11";
				}
				if(order_status == "2") {
					document.getElementById("nav").addEventListener("click", function() {
						checkDriverLocation(data.attributes.order.ZUOBIAO_Y, data.attributes.order.ZUOBIAO_X);
					})
				};

				addFooterListener();
			}
			if(data.success == false) {
				mui.toast(decodeURI(data.msg));
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast('服务器异常，请稍后再试！');
		}
	})

})
////点击功能键刷新页面
//document.getElementById("dibu").addEventListener('click', function() {
//	//获得列表界面的webview  
//	var list = plus.webview.currentWebview().opener();
//	//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
//	mui.fire(list, 'refresh');
//	//返回true，继续页面关闭逻辑  
//	return true;
//})

function addFooterListener() {
	orderData = order_status;
	if(orderData == "1") //订单已提交未支付
	{
		document.getElementById("text_left").innerHTML = "取消订单";
		document.getElementById("text_right").innerHTML = "前往支付";
		document.getElementById("dibu1").addEventListener("click", function() {
			cancelOrder();
		}, false);
		document.getElementById("dibu2").addEventListener("click", function() {
			var wait_payment = plus.webview.create('../payment/wait-payment.html', 'wait-payment');
			mui.fire(wait_payment, "loading", {
				
				"OD_TYPE": "JC",
				"OD_ID": order_id,
				"MONEY": order_price
			});
		}, false);
	}
	if(orderData == "2" || orderData == "3" || orderData == "4") //支付成功、检车线已接单、等待检车
	{
		$("#dibujianche").removeClass("mui-grid-view");
		document.getElementById("dibujianche").innerHTML = '<li class="mui-table-view-cell"><p>取消订单</p></li>';
		document.getElementById("dibujianche").addEventListener("tap", function() {
			cancelOrder();
		}, false);
	}
	if(orderData == "5" || orderData == "6") //检车中，已完成
	{
		$("#dibujianche").removeClass("mui-grid-view");
		document.getElementById("dibujianche").innerHTML = '<li class="mui-table-view-cell"></li>';
	}
	if(orderData == "7") //检车中，已完成
	{
		$("#dibujianche").removeClass("mui-grid-view");
		document.getElementById("dibujianche").innerHTML = '<li class="mui-table-view-cell"><p>再次下单</p></li>';
		document.getElementById("dibujianche").addEventListener("tap", function() {
			var mainPage = plus.webview.getLaunchWebview();
			mui.fire(mainPage, "appEvent", {
				"keyWord": "goCheckline"
			})
			mui.back();
		}, false);
	}
}

function cancelOrder() {
	mui.confirm("您确定要取消此订单吗？", "", ["确定", "返回"], function(e) {
		if(e.index == 0) {
			var url = serverAddress + "/appcheckingline/applyBeginRetreat.do";
			mui.ajax(url, {
				data: {
					"CHECKINGLINEORDER_ID": order_id
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
						alert("取消订单申请已受理");
						mui.back();
					} else {
						mui.toast('服务器异常，请稍后再试！');
					}
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					mui.toast('服务器异常，请稍后再试！');
				}
			})
		} else {}
	});
}

function checkDriverLocation(endLNG, endLAT) {

	var lng, lat;
	lng = endLNG;
	lat = endLAT;
	var url = null,
		nid = null,
		f = null;
	switch(plus.os.name) {
		case "Android":
			url = "baidumap://map/navi?location=" + lat + "," + lng;
			nid = "com.baidu.BaiduMap";
			break;
		case "iOS":
			url = "baidumap://map/navi?location=" + lat + "," + lng +
				"&title=DCloud&content=%e6%89%93%e9%80%a0HTML5%e6%9c%80%e5%a5%bd%e7%9a%84%e7%a7%bb%e5%8a%a8%e5%bc%80%e5%8f%91%e5%b7%a5%e5%85%b7&src=HelloH5";
			nid = "itunes.apple.com/cn/app/bai-du-de-tu-yu-yin-dao-hang/id452186370?mt=8";
			break;
		default:
			return;
			break;
	}
	plus.runtime.openURL(url, function(e) {
		plus.nativeUI.confirm("检查到您未安装\"百度地图\"!", function(i) {
			if(i.index == 0) {
				//		f(id);
			}
		});
	});
};

// 客服
document.getElementById("kefu_button").addEventListener('tap', function() {
	// 点击客服图标，若为专车或顺风车订单，进入投诉页；若为检车线或物流订单，直接进入问题填写页面
	mui.openWindow({
		url: '../order/complaint.html',
		id: 'complaint',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
	var complaint = plus.webview.getWebviewById('complaint');
	complaint.addEventListener('loaded', function() {
		mui.fire(complaint, "loading", {
			OD_ID: order_id,
			OD_TYPE: 2
		});
	});
});