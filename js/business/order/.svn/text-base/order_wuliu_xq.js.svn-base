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

mui('.mui-scroll-wrapper').scroll();

var order_id;
mui.plusReady(function() {
	var url = serverAddress + "/applogistics/viewOrderDetail.do"; //订单状态url
	var self = plus.webview.currentWebview();
	order_id = self.OD_ID;
	// 查询订单明细记录
	mui.ajax(url, {
		data: {
			LOGISTICSORDER_ID: self.OD_ID
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
				console.log(JSON.stringify(data))
				
				var result = data.attributes.statusList; //获取订单状态数据
				var result_xq = data.attributes.order; //获取订单详情数据
				var address = result_xq.ADDRESS;
				var iphone = result_xq.PHONE;
				//订单状态
				for(var i = 0; i < result.length; i++) {
					//年月
					var sys_date = result[i].CREATEDATE_NEW;
					var json_data = sys_date.substring(0, 10);
					result[i]["SYS_DATE_NEW"] = json_data; //往json添加年月数据
					//时间	
					var json_time = sys_date.substring(10, 16);
					result[i]["SYS_MINUTES_NEW"] = json_time; //往json添加时间数据						
				}
				// 订单状态--已取消，已完成，已下单
				var od_status = result[result.length-1].STATUSNAME;
				if(od_status=="已下单"){
					document.getElementById("dibu_wuliu").className = "mui-table-view mui-grid-view mui-grid-9 display-block";
					document.getElementById("dibu_xiadan").className = "mui-table-view display-no";
				}else if(od_status=="已取消"){
					document.getElementById("dibu_xiadan").className = "mui-table-view display-block";
					document.getElementById("dibu_wuliu").className = "mui-table-view mui-grid-view mui-grid-9 display-no";
				}else if(od_status=="已完成"){
					document.getElementById("dibu_xiadan").className = "mui-table-view display-block";
					document.getElementById("dibu_wuliu").className = "mui-table-view mui-grid-view mui-grid-9 display-no";
				}
				var record = result;
				var str = template('radio-tigan', {
					"record": record
				});
				document.getElementById("orde_status").innerHTML = str;
				if(result.length == 1) {
					document.getElementsByTagName("li")[0].className = "exp-content-list list-item-1";
				} else {
					//第一个li的icon
					document.getElementsByTagName("li")[0].className = "exp-content-list list-item-1";
					//最后一个li的icon
					document.getElementsByTagName("li")[result.length - 1].className = "exp-content-list list-item-11";
				}
				if(document.getElementsByTagName("li")[0]) {
					document.getElementById("wlzt").className = "mui-ellipsis display-block";
					document.getElementById("dizhi").innerHTML = address;
					document.getElementById("ipone").innerHTML = iphone;
				}
				
				//订单详情
				var record_xq = [result_xq];
				var str_xq = template('radio-tigan_2', {
					"result_xq": record_xq
				});
				document.getElementById("lvst").innerHTML = str_xq;
				//联系电话
				document.getElementById("ipone").addEventListener('tap', function() {
					if(mui.os.plus) {
						plus.device.dial(iphone);
					} else {
						location.href = 'tel:' + iphone;
					}

				});
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
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});

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
			OD_TYPE: 4
		});
	});
});
//取消订单
document.getElementById("dibu_quxiao").addEventListener('tap', function() {
	mui.confirm("您确定要取消此订单吗？", "", ["确定", "返回"], function(e) {
		if(e.index == 0) {
			var url = serverAddress + "/applogistics/applyBeginRetreat.do";
			mui.ajax(url, {
				data: {
					LOGISTICSORDER_ID: order_id
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
						alert("订单取消成功");
						mui.back();
					}
				}
			})
		} else {
			
		}
	});
})
//支付订单
document.getElementById("dibu_zhifu").addEventListener('tap', function() {
	mui.openWindow({
		url: '../payment/wait-payment.html',
		id: 'wait_payment',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
})
//再次下单
document.getElementById("dibu_xiadan").addEventListener("tap", function() {
		// 设定等待动画框，新页面加载完毕后再显示
		var nwaiting = plus.nativeUI.showWaiting();
		// 跳转首页
		var index = plus.webview.getLaunchWebview();
		mui.fire(index, 'orderend', {
			STATUS: 0,
			TITLE: '发货'
		});
		setTimeout(function() {
			// 加载完毕后关闭等待框，并展示页面
			plus.webview.currentWebview().close();
			plus.nativeUI.closeWaiting();
		}, 1000);
}, false);

// 关闭页面
window.addEventListener('close', function(e) {
	setTimeout(function() {
		// 加载完毕后关闭等待框，并展示页面
		plus.nativeUI.closeWaiting();
		mui.back();
	}, 1000);
});