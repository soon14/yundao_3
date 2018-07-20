var client_id = "";
var lng = "";
var lat = "";
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
	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
	});
	client_id = plus.push.getClientInfo().clientid;
	plus.geolocation.getCurrentPosition(function(p) {
		lng = p.coords.longitude;
		lat = p.coords.latitude;
		var c = p.address.city;
		// 顺风车订单接单列表起始点默认值定位当前城市
		localStorage.setItem('CITY_NAME', c);
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

	}, function(e) {
		mui.toast("坐标获取异常： " + e.message);
		return false;
	}, {
		timeout: 15000
	});
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 1000);
	plus.nativeUI.closeWaiting();
});

//登录
document.getElementById("login").addEventListener('tap', function() {
	// 关闭软键盘
	document.activeElement.blur();
	// 设定等待动画框，新页面加载完毕后再显示
	//	var nwaiting = plus.nativeUI.showWaiting();
	var phone = document.getElementById("phone").value;
	var password = document.getElementById("password").value;
	localStorage.setItem('PHONE', phone);
	localStorage.setItem('USERTYPE', '2');
	var phone_validate = /1[3|5|7|8|]\d{9}/; //验证手机号码是否正确
	if(phone == "") {
		mui.toast('请填写手机号');
		plus.nativeUI.closeWaiting();
		return false;
	}
	if(phone != 11 && !phone_validate.test(phone)) {
		mui.toast('手机位数不正确或者号码错误');
		return false;
	}
	if(password == "") {
		mui.toast('请填验证码');
		plus.nativeUI.closeWaiting();
		return false;
	}
	if(client_id == "") {
		mui.toast('网络异常请稍后再试');
		plus.nativeUI.closeWaiting();
		return false;
	}
	if(lng == "" || lat == "") {
		mui.toast('坐标点异常请稍后再试');
		plus.nativeUI.closeWaiting();
		return false;
	}
	var url = serverAddress + "/appRegister/login_Car.do";
	mui.ajax(url, {
		data: {
			PHONE: phone,
			USERTYPE: '2',
			CODE: password,
			IMEI_PHONE: plus.device.imei,
			CLIENT_ID: client_id,
			LNG: lng,
			LAT: lat
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
				plus.nativeUI.closeWaiting();
				localStorage.setItem('TOKEN', data.obj[0].TOKEN);

				var index = plus.webview.getLaunchWebview();
				mui.fire(index, "loginSuccess");
				mui.fire(index, 'orderend', {
					STATUS: 0,
					TITLE: '抢单'
				});
				//关闭抢单子webview
				var btn = plus.webview.getWebviewById("../order/maps_map_sub.html");
				if(btn) btn.close();
				// 刷新抢单页面
				var qiangdan = plus.webview.getWebviewById('view/order/qiangdan.html');
				qiangdan.reload(true);
				// 刷新订单管理页面
				var dingdan = plus.webview.getWebviewById('view/order/dingdan.html');
				dingdan.reload(true);
				// 检车页面刷新方法写在fahuo页面中
				/*var jianche = plus.webview.getWebviewById('view/order/jianche.html');
				jianche.reload(true);*/
				// 刷新通知页面
				var notice = plus.webview.getWebviewById('view/notice/notice.html');
				notice.reload(true);
				// 刷新我的页面
				var wode = plus.webview.getWebviewById('view/geren_message/wode.html');
				mui.fire(wode, 'refresh');
				// 设定等待动画框，新页面加载完毕后再显示
				var nwaiting_2 = plus.nativeUI.showWaiting();
				setTimeout(function() {
					// 加载完毕后关闭等待框，并展示页面
					plus.nativeUI.closeWaiting();
					mui.back();
				}, 1000);

			}
			if(data.success == false) {
				plus.nativeUI.closeWaiting();
				if(data.obj == null) {
					mui.openWindow({
						id: 'register',
						url: 'register.html',
						show: {
							autoShow: false, //页面loaded事件发生后自动显示，默认为true
							event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
						},
						waiting: {
							autoShow: true //自动显示等待框，默认为true
						}
					});
				} else {
					var user_status = data.obj[0].USER_STATUS;
					localStorage.setItem('USER_STATUS', data.obj[0].USER_STATUS);
					switch(true) {
						case(user_status == 0):
							mui.openWindow({
								id: 'register_driver',
								url: 'register_driver.html',
								show: {
									autoShow: false, //页面loaded事件发生后自动显示，默认为true
									event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
								},
								waiting: {
									autoShow: true //自动显示等待框，默认为true
								}
							});
							break;

						case(user_status == 1):
							mui.openWindow({
								id: 'register_input_file',
								url: 'register-input-file.html',
								show: {
									autoShow: false, //页面loaded事件发生后自动显示，默认为true
									event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
								},
								waiting: {
									autoShow: true //自动显示等待框，默认为true
								}
							});
							break;

						case(user_status == 2):
							mui.openWindow({
								id: 'examine',
								url: 'examine.html',
								show: {
									autoShow: false, //页面loaded事件发生后自动显示，默认为true
									event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
								},
								waiting: {
									autoShow: true //自动显示等待框，默认为true
								}
							});
							break;

						case(user_status == 3):
							mui.openWindow({
								id: 'examine_error',
								url: 'examine-error.html',
								show: {
									autoShow: false, //页面loaded事件发生后自动显示，默认为true
									event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
								},
								waiting: {
									autoShow: true //自动显示等待框，默认为true
								}
							});
							break;
					}
				}
				//mui.toast(decodeURI(data.msg));
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast('网络超时，请稍后再试！');
			plus.nativeUI.closeWaiting();
			return false;
		}
	});
});

//验证码
document.getElementById("verification").addEventListener('tap', function() {
	// 关闭软键盘
	document.activeElement.blur();
	var phone = document.getElementById("phone").value;
	var phone_validate = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
	if(phone == "") {
		mui.toast('请填写手机号');
		return false;
	}

	if(phone != 11 && !phone_validate.test(phone)) {
		mui.toast('手机位数不正确');
		return false;
	}
	var daojishi2 = 60;
	var daojishi_interval = setInterval(function() {
		if(daojishi2 > 0) {
			document.querySelector('#verification').innerHTML = daojishi2 + "秒";
			document.querySelector('#verification').setAttribute("class", "mui-btn mui-btn-block mui-btn-Verification mui-disabled");
			daojishi2--;

		} else {
			document.querySelector('#verification').innerHTML = "获取验证码";
			document.querySelector('#verification').setAttribute("class", "mui-btn mui-btn-block mui-btn-Verification");
			clearInterval(daojishi_interval);
		}
	}, 1000);
	var url = serverAddress + "/appRegister/acquireValidNum.do";
	mui.ajax(url, {
		data: {
			PHONE: phone,
			USERTYPE: "2"
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			/*'Content-Type': 'application/json'*/
		},
		success: function(data) {
			if(data.success == true) {
				mui.toast(data.obj[0].CODE, {
					duration: 'long'
				});
			}
			if(data.success == false) {
				mui.toast(decodeURI(data.msg));
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast('网络超时，请稍后再试！');
			return false;
		}
	});
});

//注册
document.getElementById("zhuche").addEventListener('tap', function() {
	// 关闭软键盘
	document.activeElement.blur();
	mui.openWindow({
		url: 'register.html',
		id: 'register.html',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
});