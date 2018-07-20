mui.plusReady(function() {
	// 加载完毕后关闭等待框，并展示页面
	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
	});
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
})

// 禁用所有输入框软键盘的搜索按钮，防止出现创建重复页面
/*mui(".mui-input-group").on('keydown', 'input', function(e) {

	if(13 == e.keyCode) { //点击了“搜索”  
		document.activeElement.blur(); //隐藏软键盘 
	}
}, false);*/

//发送请求按钮的点击事件
document.getElementById("reg").addEventListener('tap', function() {
	// 设定等待动画框，新页面加载完毕后再显示
//	var nwaiting = plus.nativeUI.showWaiting();
	// 关闭软键盘
	document.activeElement.blur();
	var phone = document.getElementById("account").value;
	var password = document.getElementById("password").value;
	var checked = document.getElementById('register_user').checked;
	var phone_validate = /1[3|5|7|8|]\d{9}/;//验证手机号码是否正确
	if(checked == false) {
		mui.toast('注册协议必须遵守');
		plus.nativeUI.closeWaiting();
		return false;
	}
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
	var url = serverAddress + "/appRegister/addUser_App_First.do";
	mui.ajax(url, {
		data: {
			PHONE: phone,
			USERTYPE: '2',
			CODE: password,
			IMEI_PHONE: plus.device.imei
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
				localStorage.setItem('PHONE', phone);
				localStorage.setItem('USERTYPE', '2');
				localStorage.setItem('REGISTER_PAGE ', '1');
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
				var register_driver = plus.webview.getWebviewById('register_driver');
				// 当下一页面加载完毕后关闭该页面
				register_driver.addEventListener('loaded', function() {
					mui.fire(register_driver, "close_register", {
						STATUS: 1
					});
				});
			}
			if(data.success == false) {
				mui.toast(decodeURI(data.msg));
				plus.nativeUI.closeWaiting();
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast('网络超时，请稍后再试！');
			plus.nativeUI.closeWaiting();
		}
	});
});

//发送请求按钮的点击事件
document.getElementById("yanzhengBtn").addEventListener('tap', function() {
	// 关闭软键盘
	document.activeElement.blur();
	var phone = document.getElementById("account").value;
	var phone_validate = /1[3|5|7|8|]\d{9}/;//验证手机号码是否正确
	if(phone == "") {
		mui.toast('请填写手机号')
		return false;
	}
	if(phone != 11 && !phone_validate.test(phone)) {
		mui.toast('手机位数不正确或者号码错误');
		return false;
	}
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
			//服务器返回响应，根据响应结果，分析是否登录成功；
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
		}
	});
});

document.getElementById("user_document").addEventListener('tap', function() {
	// 关闭软键盘
	document.activeElement.blur();
	mui.openWindow({
		url: 'login-agreement.html',
		id: 'login_agreement',
		extras: {
			//自定义扩展参数，可以用来处理页面间传值
			/*USERNAME: username*/
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
});