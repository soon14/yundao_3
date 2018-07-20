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
	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
	});
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});

(function($) {
	$.init();
	//	var result = $('#result')[0];
	// var riqi=document.getElementById('insurancedate').value;//获取保险日期的val值
	var btns = $('.btn');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			// 关闭软键盘
			document.activeElement.blur();
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			/*
			 * 首次显示时实例化组件
			 * 示例为了简洁，将 options 放在了按钮的 dom 上
			 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
			 */
			var picker = new $.DtPicker(options);
			picker.show(function(rs) {
				/*
				 * rs.value 拼合后的 value
				 * rs.text 拼合后的 text
				 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
				 * rs.m 月，用法同年
				 * rs.d 日，用法同年
				 * rs.h 时，用法同年
				 * rs.i 分（minutes 的第二个字母），用法同年
				 */

				//	result.innerText = '选择结果: ' + rs.text;
				//	riqi.val(result.innerText)

				document.getElementById('insurancedate').value = rs.text; //给保险val赋值

				/* 
				 * 返回 false 可以阻止选择框的关闭
				 * return false;
				 */
				/*
				 * 释放组件资源，释放后将将不能再操作组件
				 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
				 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
				 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
				 */
				picker.dispose();
			});
		}, false);
	});

	//车辆类型
	$.ready(function() {
		var userPicker = new $.PopPicker();
		userPicker.setData([{
			value: '0',
			text: '小型面包'
		}, {
			value: '1',
			text: '金杯'
		}, {
			value: '2',
			text: '中型货车'
		}, {
			value: '3',
			text: '大型货车'
		}]);
		var showUserPickerButton = document.getElementById('showUserPicker');
		var userResult = document.getElementById('userResult');
		showUserPickerButton.addEventListener('tap', function(event) {
			// 关闭软键盘
			document.activeElement.blur();
			userPicker.show(function(items) {
				document.getElementById('car_type').value = items[0].text; //给选择车辆的input val赋值
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		}, false);
	});

	//发送请求按钮的点击事件
	document.getElementById("reg").addEventListener('tap', function() {
		// 设定等待动画框，新页面加载完毕后再显示
		var nwaiting = plus.nativeUI.showWaiting();
		// 关闭软键盘
		document.activeElement.blur();
		var name = document.getElementById("name").value;
		var sfid = document.getElementById("sfid").value;
		var car_no = document.getElementById("car_no").value;
		var car_type = document.getElementById("car_type").value;
		var riqi = document.getElementById("insurancedate").value;
		var phone = localStorage.getItem("PHONE");
		var usertype = localStorage.getItem("USERTYPE");
		if(name == "") {
			mui.toast('请填写姓名');
			plus.nativeUI.closeWaiting();
			return false;
		}
		if(sfid == "") {
			mui.toast('请填写身份证');
			plus.nativeUI.closeWaiting();
			return false;
		}
		if(car_no == "") {
			mui.toast('请填写车牌号');
			plus.nativeUI.closeWaiting();
			return false;
		}
		if(car_type == "") {
			mui.toast('请选择车辆类型');
			plus.nativeUI.closeWaiting();
			return false;
		}
		if(riqi == "") {
			mui.toast('请选择车险到期日');
			plus.nativeUI.closeWaiting();
			return false;
		}
		var url = serverAddress + "/appRegister/updateCar_App_Second.do";
		mui.ajax(url, {
			data: {
				NAME: name,
				SFID: sfid,
				CAR_NO: car_no,
				CAR_TYPE: car_type,
				CAR_INSURANCE_EXPIRE: riqi,
				PHONE: phone,
				USERTYPE: usertype
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
					var register_input_file = plus.webview.getWebviewById('register_input_file');
					// 当下一页面加载完毕后关闭该页面
					register_input_file.addEventListener('loaded', function() {
						mui.fire(register_input_file, "close_register_dirver", {
							STATUS: 1
						});
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
})(mui);

// 关闭注册第一步页面
window.addEventListener('close_register', function(e) {
	plus.webview.currentWebview().opener().close();
});