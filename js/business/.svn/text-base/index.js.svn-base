//mui初始化
mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	},
	//	preloadPages: [{
	//		url: 'view/order/fujincheliang.html',
	//		id: 'fujincheliang'
	//	}],
	preloadLimit: 5 //预加载窗口数量限制(一旦超出,先进先出)默认不限制
});

var subpages = ['view/order/qiangdan.html', 'view/order/dingdan.html', 'view/order/jianche.html', 'view/notice/notice.html', 'view/geren_message/wode.html'];

var aniShow = {};
//创建子页面
var menuWebview;
var token = localStorage.getItem('TOKEN');

var workState = "0";
mui.plusReady(function() {
	var topoffset = tiaozhengTOP();
	var subpage_style = {
		top: topoffset,
		bottom: '51px'
	};
	//getWorkState();
	// 创建加载内容窗口
	//	var topoffset = '45px';
	//	if(plus.navigator.isImmersedStatusbar()) { // 兼容immersed状态栏模式
	//		// 获取状态栏高度并根据业务需求处理，这里重新计算了子窗口的偏移位置
	//		topoffset = (Math.round(plus.navigator.getStatusbarHeight()) + 45) + 'px';
	//	}
	// 使用偏移位置创建子窗口
	//	wc = plus.webview.create(null, 'doccontent', {
	//		top: topoffset,
	//		bottom: '0px',
	//		bounce: 'vertical',
	//		bounceBackground: '#FFFFFF'
	//	});

	var self = plus.webview.currentWebview();
	for(var i = 0; i < 5; i++) {
		var temp = {};
		var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
		if(i > 0) {
			sub.hide();
		} else {
			temp[subpages[i]] = "true";
			mui.extend(aniShow, temp); //将两个对象合并在一起
		}
		self.append(sub);
	}
	//首次进入系统设置标题
	var labelVal = "抢单";
	title.innerHTML = labelVal;

	var token = localStorage.getItem('TOKEN');
	// 当发货页面加载完毕后，根据坐标获取附近车辆数量和附近车辆坐标点
	var fahuo = plus.webview.getWebviewById("view/order/qiangdan.html");
	var jianche = plus.webview.getWebviewById("view/order/jianche.html");
	//接收推送
	push();
	if(fahuo != null && token != null && jianche != null) {
		wid = plus.geolocation.getCurrentPosition(function(p) {
			getWorkState();
			getPositionName(p);
			var url = serverAddress + "/appRegister/queryCarList_App.do";

			var lng = p.coords.longitude;
			var lat = p.coords.latitude;
			var addresses = p.addresses;
			localStorage.setItem("ADDRESSES_GPS", addresses);
			/**
			 * 国内火星坐标系 (GCJ-02)、WGS84坐标系与百度坐标系 (BD-09) 的转换
			 * 
			 * @param lng
			 * @param lat
			 */

			// 判断iOS系统还是Android系统
			if(plus.os.name == 'iOS') {
				// WGS84转GCJ-02
				var point_gcj02 = GPS.gcj_encrypt(lat, lng);
				var lng_gcj02 = point_gcj02.lon;
				var lat_gcj02 = point_gcj02.lat
				// GCJ-02转BD-09
				var point_bd09 = GPS.bd_encrypt(lat_gcj02, lng_gcj02);
				lng = point_bd09.lon;
				lat = point_bd09.lat
			} else {
				// Android系统
				// GCJ-02转BD-09
				var point_gcj02 = GPS.bd_encrypt(lat, lng);
				lng = point_gcj02.lon;
				lat = point_gcj02.lat
			}

			
			setTimeout(updateGps(workState), 3000);

			mui.ajax(url, {
				data: {
					LNG: lng, // 经度
					LAT: lat // 纬度
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
						mui.fire(fahuo, "data_fahuo", {
							COUNT: data.attributes.COUNT, // 附近车辆数
							CARLIST: data.attributes.CARLIST // 附近车辆坐标
						});
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

		}, function(e) {
			console.log("Geolocation error: " + e.message);
		}, {
			timeout: 10000
		});
	} else {
		mui.fire(fahuo, "data_fahuo", {
			COUNT: 0, // 附近车辆数
			CARLIST: [] // 附近车辆坐标
		});
	}

});
//激活当前项
var activeTab = subpages[0];

//监听下单是否完成，下单完成进入订单页面
window.addEventListener('orderend', function(event) {
	var status = event.detail.STATUS;
	var title = event.detail.TITLE;
	targetTab = subpages[status];
	document.querySelector(".mui-title").innerHTML = title;
	if(status == 0) {
		document.querySelector(".qiangdan").setAttribute("class", "mui-tab-item qiangdan mui-active");
		document.querySelector(".jianche").setAttribute("class", "mui-tab-item jianche");
		document.querySelector(".dingdan").setAttribute("class", "mui-tab-item dingdan");
		document.querySelector(".tongzhi").setAttribute("class", "mui-tab-item tongzhi");
		document.querySelector(".wode").setAttribute("class", "mui-tab-item wode");
		document.getElementById("chooseCity1").setAttribute("class", "mui-btn  mui-btn-link mui-pull-right");
		document.getElementById("shangban").setAttribute("class", "mui-pull-left dangqian");
	} else if(status == 1) {
		document.querySelector(".qiangdan").setAttribute("class", "mui-tab-item qiangdan");
		document.querySelector(".jianche").setAttribute("class", "mui-tab-item jianche");
		document.querySelector(".dingdan").setAttribute("class", "mui-tab-item dingdan mui-active");
		document.querySelector(".tongzhi").setAttribute("class", "mui-tab-item tongzhi");
		document.querySelector(".wode").setAttribute("class", "mui-tab-item wode");
		document.getElementById("chooseCity1").setAttribute("class", "mui-hidden");
		document.getElementById("shangban").setAttribute("class", "mui-hidden");
	}
//	if(mui.os.ios || aniShow[targetTab]) {
		plus.webview.show(targetTab);
//	} else {
//		var temp = {};
//		temp[targetTab] = "true";
//		mui.extend(aniShow, temp);
//		plus.webview.show(targetTab, "fade-in", 300);
//	}
	plus.webview.hide(activeTab);
	//更改当前活跃的选项卡
	activeTab = targetTab;
});

var title = document.getElementById("title");

//选项卡点击事件
mui(".mui-bar-tab").on('tap', 'a', function(e) {
	var targetTab = this.getAttribute('href');
	if(targetTab == activeTab) {
		return;
	}
	//更换标题
	var labelVal = this.querySelector('.mui-tab-label').innerHTML.substr(0, 1) + "" + this.querySelector('.mui-tab-label').innerHTML.substr(1, 1);
	title.innerHTML = labelVal;
	//隐藏右上按钮，切换首次有白屏
	if(targetTab.indexOf("dingdan") > 0 || targetTab.indexOf("notice") > 0 || targetTab.indexOf("wode") > 0 || targetTab.indexOf("jianche") > 0) {
		document.getElementById("chooseCity1").setAttribute("class", "mui-hidden");
		document.getElementById("shangban").setAttribute("class", "mui-hidden");
	} else {
		document.getElementById("chooseCity1").setAttribute("class", "mui-btn  mui-btn-link mui-pull-right");
		document.getElementById("shangban").setAttribute("class", "mui-pull-left dangqian");
	}
	if(targetTab.indexOf("jianche") > 0) {
		document.getElementById("chooseCity").setAttribute("class", "mui-btn mui-btn-link mui-pull-right");
	} else {
		document.getElementById("chooseCity").setAttribute("class", "mui-hidden");
	}
	//若为IOS平台或非首次显示，则直接显示
	if(mui.os.ios || aniShow[targetTab]) {
		plus.webview.show(targetTab);
	} else {
		var temp = {};
		temp[targetTab] = "true";
		mui.extend(aniShow, temp);
		plus.webview.show(targetTab, "fade-in", 300);
	}
	//隐藏当前;
	plus.webview.hide(activeTab);
	//更改当前活跃的选项卡
	activeTab = targetTab;
});

// 城市选择
var showCityPickerButton = document.getElementById('chooseCity');
showCityPickerButton.addEventListener('tap', function(event) {
	if(window.plus) {
		//		ws = plus.webview.currentWebview();
		//		// 显示遮罩层
		//		ws.setStyle({
		//			mask: "rgba(0,0,0,0.5)"
		//		});
		var topoffset = tiaozhengTOP();
		mui.openWindow({
			url: 'view/order/city_select.html',
			id: 'city_select.html',
			waiting: {
				autoShow: false //自动显示等待框，默认为true
			},
			styles: {
				//				top: '325px',
				top: topoffset,
				bottom: '0px',
				background: 'transparent',
				opacity: 1,
				//				mask:'rgba(0,0,0,0.5)',
				zindex: "100"
			}
		});
		// 点击关闭遮罩层
		//		ws.addEventListener("maskClick", function() {
		//			ws.setStyle({
		//				mask: "none"
		//			});
		//			if(plus.webview.getWebviewById("city_select.html")!=null)
		//			plus.webview.getWebviewById("city_select.html").close();
		//		}, false);
	} else {
		mui.toast("请在html5+引擎环境使用");
	}
}, false);

// 通知页面操作后刷新首页通知tab底栏角标
window.addEventListener('refresh', function(e) {
	// 未读通知数
	var count_reload = e.detail.count;
	if(count_reload != null) {
		document.getElementById('tongzhi_count').innerHTML = count_reload;
	} else {
		var count = document.getElementById('tongzhi_count').innerHTML;
		if(count != 0) {
			document.getElementById('tongzhi_count').innerHTML = count - 1;
		}
	}
});

window.addEventListener("appEvent", function(event) {
	if(event.detail.keyWord == "changeCity") {
		var provinceCode = event.detail.provinceCode;
		var provinceName = event.detail.provinceName;
		var cityCode = event.detail.cityCode;
		var cityName = event.detail.cityName;
		var areaCode = event.detail.areaCode;
		var areaName = event.detail.areaName;

		document.getElementById("city_name").innerText = cityName;
		//此处通知检车线地点已经修改
		var jianChePage = plus.webview.getWebviewById("view/order/jianche.html");
		var param = {
			"keyWord": "cityChanged",
			"PROVINCE_NAME": provinceName,
			"PROVINCE_CODE": provinceCode,
			"CITY_NAME": cityName,
			"CITY_CODE": cityCode,
			"AREA_NAME": areaName,
			"AREA_CODE": areaCode
		}
		mui.fire(jianChePage, "cityChangeEvent", param);
	} else if(event.detail.keyWord == "goCheckline") {
		targetTab = subpages[2];
		document.querySelector(".mui-title").innerHTML = "检车";
		document.querySelector(".jianche").setAttribute("class", "mui-tab-item jianche mui-active");
		document.querySelector(".dingdan").setAttribute("class", "mui-tab-item dingdan");
		if(mui.os.ios || aniShow[targetTab]) {
			plus.webview.show(targetTab);
		} else {
			var temp = {};
			temp[targetTab] = "true";
			mui.extend(aniShow, temp);
			console.log(JSON.stringify(aniShow));
			plus.webview.show(targetTab, "fade-in", 300);

		}
		plus.webview.hide(activeTab);
		//更改当前活跃的选项卡
		activeTab = targetTab;
	} else if(event.detail.keyWord == "workstate") {
		var workStateBtn = document.getElementById("chooseCity1");
		var state = event.detail.state;
		if(state == "nooff") {
			if(!workState) changeWorkState();
			workStateBtn.addEventListener('tap', null, false);
		} else if(state == "autoon") {
			var appointTime = event.detail.appointTime;
			if(appointTime) {
				setTimeout("if(!workState){changeWorkState()}", appointTime.time - new Date().getTime() - 3600000);
			}
		}
	}
});

// 登录成功后重新获取地区代码, 上班状态
window.addEventListener('loginSuccess', function(e) {
	getWorkState();
	var position = localStorage.getItem("P");
	position = JSON.parse(position);
	if(position) {
		getPositionName(position);
	}
});

// 首页登录时刷新页面
window.addEventListener('refresh_zuobiao', function(e) {
	location.reload();
	return true;
});

function sendLocInfo(p, c, a) {
	var mainPage = plus.webview.getLaunchWebview();
	var jianchePage = plus.webview.getWebviewById('view/order/jianche.html');
	var fahuoPage = plus.webview.getWebviewById('view/order/fahuo.html');
	var param = {
		"keyWord": "cityChanged",
		"PROVINCE_CODE": p,
		"CITY_CODE": c,
		"AREA_CODE": a,
		"CITY_name": ccname
	};
	mui.fire(jianchePage, "cityChangeEvent", param);

	mui.fire(fahuoPage, "cityChangeEvent", param);
}
var ccname;

function getPositionName(currentPosition) {
	var p = currentPosition.address.province; //获取城市信息
	var c = currentPosition.address.city;
	ccname = c;
	// 顺风车订单接单列表起始点默认值定位当前城市
	localStorage.setItem("CITY_NAME", c);
	var a = currentPosition.address.district;
	//document.getElementById("city_name").innerHTML = c;
	getPositionCode(p, c, a, sendLocInfo);
}

function getPositionCode(province, city, area, callback) {
	for(var i = 0; i < cityData3.length; i++) {
		var p = cityData3[i];
		if(p.text == province) {
			for(var j = 0; j < p.children.length; j++) {
				var c = p.children[j];
				if(c.text == city) {
					for(var k = 0; k < c.children.length; k++) {
						var a = c.children[k];
						if(a.text == area) {
							callback(p.value, c.value, a.value);
							return;
						}
					}
				}
			}
		}
	}
}

//获取上班状态
function getWorkState() {
	var workStateBtn = document.getElementById("shangxiaban");
	var url = serverAddress + "/order_App/query_Work_Status.do";
	ajaxUtil.postRequest(url, null, function(data) {
		if(data && data.obj && data.obj[0]) {
			workState = data.obj[0].WORK_STATUS;
			document.getElementById("shangban").innerHTML = workState == "0" ? "当前工作状态：休息中" : "当前工作状态：上班中";
			workStateBtn.innerHTML = workState == "0" ?
				"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我要上班" : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我要下班";
		} else {

		}
	});
}

document.getElementById("chooseCity1").addEventListener("click", changeWorkState, false);

function changeWorkState() {
	var title = document.getElementById("shangban");
	var workStateBtn = document.getElementById("shangxiaban");
	var url = serverAddress + "/order_App/work_Status.do";
	plus.nativeUI.showWaiting();
	if(workState == "1") {
		workState = "0";
		var params = {
			"WORK_STATUS": "0"
		};
		ajaxUtil.getRequest(url, params, function() {
			title.innerHTML = "当前工作状态：休息中";
			workStateBtn.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我要上班";
			plus.nativeUI.closeWaiting();
		});
	} else {
		workState = "1";
		var params = {
			"WORK_STATUS": "1"
		};
		ajaxUtil.getRequest(url, params, function() {
			title.innerHTML = "当前工作状态：上班中";
			workStateBtn.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我要下班";
			plus.nativeUI.closeWaiting();
		});
	}
	updateGps(workState);
}

var gpsInterval = null;

function updateGps2() {
	plus.geolocation.getCurrentPosition(function(data) {
		if(data) {
			var lng = data.coords.longitude;
			var lat = data.coords.latitude;

			// 判断iOS系统还是Android系统
			if(plus.os.name == 'iOS') {
				// WGS84转GCJ-02
				var point_gcj02 = GPS.gcj_encrypt(lat, lng);
				var lng_gcj02 = point_gcj02.lon;
				var lat_gcj02 = point_gcj02.lat
				// GCJ-02转BD-09
				var point_bd09 = GPS.bd_encrypt(lat_gcj02, lng_gcj02);
				lng = point_bd09.lon;
				lat = point_bd09.lat
			} else {
				// Android系统
				// GCJ-02转BD-09
				var point_gcj02 = GPS.bd_encrypt(lat, lng);
				lng = point_gcj02.lon;
				lat = point_gcj02.lat
			}

			var url = serverAddress + "/order_App/editGps_App.do";
			var params = {
				"LNG": lng,
				"LAT": lat
			};
			ajaxUtil.getRequest(url, params);
		}
	})
}

function updateGps(workState) {
	window.addEventListener("myEvent", function(event) {
		var a = event.detail.data;
		if(event.detail.keyWord && event.detail.keyWord == "logout") {
			closeWebPage();
		}
		if(a && gpsInterval) clearInterval(gpsInterval);
		gpsInterval = setInterval(updateGps2, 15000);

	});
	if(workState == "1") {
		if(gpsInterval) clearInterval(gpsInterval);
		gpsInterval = setInterval(updateGps2, 300000);
	} else {
		if(gpsInterval) clearInterval(gpsInterval);
	}
}

//**************个推***********************//
function push() {

	plus.push.setAutoNotification(false);
	plus.push.addEventListener("receive", function(msg) {
		var data1 = JSON.parse(msg.content);
		floatWebview(data1);
	}, false);
}

var floatw = null;

//通知弹出窗口
function floatWebview(data) {
	if(floatw) { // 避免快速多次点击创建多个窗口
		return;
	}
	//			var orderPage = plus.webview.getWebviewById("_tab_qiangdan.html");
	//			var param = { "keyWord": "recieve" };
	//			setTimeout(function() {
	//				mui.fire(orderPage, "recieve", param)
	//			}, 1000);
	floatw = plus.webview.create("view/order/rob_order.html", "rob_order.html", {
		width: '90%',
		height: '81%',
		margin: "auto",
		background: "rgba(0,0,0,0.8)",
		scrollIndicator: 'vertical',
		scalable: false,
		popGesture: 'none'
	}, data);
	floatw.addEventListener("loaded", function() {
		floatw.show('fade-in', 300);
		floatw = null;
	}, false);
}