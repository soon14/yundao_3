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

document.getElementById("check_shunfeng").addEventListener("tap", function() {
	var nwaiting = plus.nativeUI.showWaiting();
	mui.openWindow({
		url: '../order/along_car_xq.html',
		id: 'along_car_xq',
		extras: {},
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: false //自动显示等待框，默认为true
		}
	});
})

var workState = 0; //0为上班中 1为休息中
var refreshBtn = document.getElementById("refresh");
var workStateBtn = document.getElementById("chooseCity1");
var title = document.getElementById("title");
var zhuanche = document.getElementById("check_zhuanche");
var shunfengche = document.getElementById("check_shunfengche");
var zhuancheId;

var Bofang_timeout;

var map = null;

//最近订单起点终点
var latelyStart = '';
var latelyEnd = '';

mui.plusReady(function() {
	//initEventListener();
	refresh();
});

/*function initEventListener() {
	
	window.addEventListener("myEvent", function(event) {
		if(event.detail.data == "1") {
			getOrderList();
		}
	})
}*/

var em = null;

refreshBtn.addEventListener("tap", refresh, false);

function refresh() {
	if(map == null) {
		map = new plus.maps.Map("baidumap");
		map.hide();
	}
	getOrderList();
	var date = new Date();
	document.getElementById("current_time").innerHTML = "更新时间: " + date.format("yyyy-MM-dd hh:mm");
}

var _domReady = false;

// 兼容性样式调整44
var _adjust = false;

function compatibleAdjust() {
	if(_adjust || !window.plus || !_domReady) {
		return;
	}
	_adjust = true;
	// iOS平台特效
	if('iOS' == plus.os.name) {
		document.getElementById('content').className = 'scontent'; // 使用div的滚动条
		if(navigator.userAgent.indexOf('StreamApp') >= 0) { // 在流应用模式下显示返回按钮
			document.getElementById('back').style.visibility = 'visible';
		}
	}
	// 关闭启动界面
	setTimeout(function() {
		plus.navigator.closeSplashscreen();
		plus.navigator.setStatusBarBackground('#FFFFFF');
		if(plus.navigator.isImmersedStatusbar()) {
			plus.navigator.setStatusBarStyle('UIStatusBarStyleBlackOpaque');
		}
	}, 500);
}

function goOrderDetail() {
	mui.openWindow({
		url: "order_xiangqing.html",
		id: "order_xiangqing",
		extras: {
			OD_ID: zhuancheId
		}
	});
}

//获取专车订单
function getOrderList() {
	var url = serverAddress + "/order_App/carOrder_App.do";
	var params = {
		"OD_TYPE": 1
	};
	mui.ajax(url, {
		data: params,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			/*'Content-Type': 'application/json'*/
		},
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.success == true) {
				zhuancheInfoList(data);
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
}

function zhuancheInfoList(data) {
	if(data) {
		var infoList = data.obj;
		if(!infoList || infoList.length < 1) {
			document.getElementById("zw_order").className = "display-block";
		} else {
			document.getElementById("zw_order").className = "display-no";
			var appointTime = JSON.parse(decodeObj(infoList[0].DATE_YJYONGCHE));
			//若当前时间在预约时间一小时之内 禁止下班
			if(new Date().getTime() > appointTime.time - 3600000 &&
				parseInt(infoList[0].OD_STATUS) < 4 && parseInt(infoList[0].STATUS_QUXIAO) == 0) {
				var parentPage = plus.webview.currentWebview().opener();
				mui.fire(parentPage, "appEvent", {
					"keyWord": "workstate",
					"state": "nooff"
				});

				zhuancheId = infoList[0].OD_ID;
				var url = serverAddress + "/order_App/order_Detail.do";
				var params = {
					"OD_ID": zhuancheId,
					"USERTYPE": 2
				}
				mui.ajax(url, {
					data: params,
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
							var tmp = data.attributes.ORDER_DETAIL[0];
							var p1 = new plus.maps.Point(tmp.ADDRESS_LNG_BEGIN, tmp.ADDRESS_LAT_BEGIN);
							var p2 = new plus.maps.Point(tmp.ADDRESS_LNG_END, tmp.ADDRESS_LAT_END);
							var waypoints = [];
							var tmpwp = data.attributes.ORDER_TUJING;
							if(tmpwp && tmpwp.length > 0) {
								for(var i = 0; i < tmpwp.length; i++) {
									waypoints.push(new plus.maps.Point(tmpwp[i].ADDRESS_LNG_TUJING, tmpwp[i].ADDRESS_LAT_TUJING));
								}
							}
							getPosition(p1, p2, waypoints);
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
				document.getElementById("zw_order").className = "display-block";
				//当前车主有预约订单且当前时间为预约时间前1小时时，自动变更为上班状态
				var parentPage = plus.webview.currentWebview().opener();
				mui.fire(parentPage, "appEvent", {
					"keyWord": "workstate",
					"state": "autoon",
					"appointTime": appointTime
				});
			}
		}
	}
}

var ws = null,
	wo = null;

function getPosition(p1, p2, waypoints) {

	plus.geolocation.getCurrentPosition(function(data) {
		if(data) {
			ws = plus.webview.currentWebview();
			wo = ws.opener();
			if(map == null) {
				map = new plus.maps.Map("baidumap");
				createSubview();
			} else {
				map.show();
				createSubview();
			}
			var point = new plus.maps.Point(JSON.stringify(data.coords.longitude), JSON.stringify(data.coords.latitude));
			map.centerAndZoom(point, 12);
			var searchObj = new plus.maps.Search(map);
			searchObj.onRouteSearchComplete = function(state, result) {
				if(state == 0) {
					if(result.routeNumber <= 0) {
						console.log("没有检索到结果");
					}
					for(var i = 0; i < result.routeNumber; i++) {
						map.addOverlay(result.getRoute(i));
					}
				} else {
					console.log("检索失败");
				}
			}
			searchObj.drivingSearch(p1, "", p2, "");

			ws.show("pop-in");

		}
	})
}

function createSubview() { // 创建加载内容窗口
	var topoffset = '70px';
	if(plus.navigator.isImmersedStatusbar()) { // 兼容immersed状态栏模式
		topoffset = (Math.round(plus.navigator.getStatusbarHeight()) + 70) + 'px';
	}
	var wsub = plus.webview.create('../order/maps_map_sub.html', '../order/maps_map_sub.html', {
		bottom: topoffset,
		left: '10px',
		right: '15px',
		height: '60px',
		position: 'absolute',
		scrollIndicator: 'none',
		background: 'transparent'
	});
	ws.append(wsub);
}

var menu = null,
	main = null;
var showMenu = false,
	isBofang = true,
	floatw = null;

window.addEventListener("close_map", function(event) {
	var status = event.detail.STATUS;
	var waypoints = [];
	if(status == 1) {
		ws = null;
		map.clearOverlays();
		map.hide();
		document.getElementById("zw_order").className = "display-no";
	} else if(status == 2) {
		document.getElementById("zw_order").className = "display-block";
		var od_id = event.detail.OD_ID;
		zhuancheId = od_id;

		var index = plus.webview.getLaunchWebview();
		mui.fire(index, 'orderend', {
			STATUS: 0,
			TITLE: '抢单'
		});

		var url = serverAddress + "/order_App/order_Detail.do";
		var params = {
			"OD_ID": od_id,
			"USERTYPE": 2
		}
		mui.ajax(url, {
			data: params,
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
					var tmp = data.attributes.ORDER_DETAIL[0];
					var p1 = new plus.maps.Point(tmp.ADDRESS_LNG_BEGIN, tmp.ADDRESS_LAT_BEGIN);
					var p2 = new plus.maps.Point(tmp.ADDRESS_LNG_END, tmp.ADDRESS_LAT_END);

					var tmpwp = data.attributes.ORDER_TUJING;
					if(tmpwp && tmpwp.length > 0) {
						for(var i = 0; i < tmpwp.length; i++) {
							waypoints.push(new plus.maps.Point(tmpwp[i].ADDRESS_LNG_TUJING, tmpwp[i].ADDRESS_LAT_TUJING));
						}
					}
					getPosition(p1, p2, waypoints);
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
	}

});