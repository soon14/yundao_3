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
	var url = serverAddress + "/order_App/listRange_App.do";
	var range_list = localStorage.getItem('RANGE_LIST') == null ? "" : localStorage.getItem('RANGE_LIST');
	// 是否存在货运险缓存数据，存在直接调用缓存，否则访问服务器
	if(range_list != "") {
		document.getElementById("mui-template").innerHTML = range_list;
		var currentView = plus.webview.currentWebview();
		currentView.show('slide-in-right', 200);
		plus.nativeUI.closeWaiting();
	} else {
		mui.ajax(url, {
			data: {},
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 30000, //超时时间设置为30秒；
			headers: {
				/*'Content-Type': 'application/json'*/
			},
			success: function(data) {
				if(data.success == true) {
					var record = data.obj;
					var str = template('radio-tigan', {
						"record": record
					});
					localStorage.setItem("RANGE_LIST", str);
					document.getElementById("mui-template").innerHTML = str;
					var currentView = plus.webview.currentWebview();
					currentView.show('slide-in-right', 200);
					plus.nativeUI.closeWaiting();
				};
				if(data.success == false) {
					mui.toast(decodeURI(data.msg));
					var currentView = plus.webview.currentWebview();
					currentView.show('slide-in-right', 200);
					plus.nativeUI.closeWaiting();
				};
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				mui.toast('服务器异常，请稍后再试！');
				var currentView = plus.webview.currentWebview();
				currentView.show('slide-in-right', 200);
				plus.nativeUI.closeWaiting();
			}
		});
	}
});

// 保存按钮
document.getElementById("baocun").addEventListener('tap', function() {
	var url = serverAddress + "/order_App/editRange_App.do";
	var radio = document.getElementsByName("radio1");
	var radioLength = radio.length;
	var range;
	for(var i = 0; i < radioLength; i++) {
		if(radio[i].checked) {
			var radioValue = radio[i].value; //type
			range = document.getElementById(i).innerHTML; // 公里数		
		}
	}
	mui.ajax(url, {
		data: {
			RANGE: range
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			/*'Content-Type': 'application/json'*/
		},
		success: function(data) {
			if(data.success == true) {
				var parent = plus.webview.currentWebview().opener();
				localStorage.setItem('RANGE', range);
				mui.back();
			};
			if(data.success == false) {
				mui.toast(decodeURI(data.msg));
				var currentView = plus.webview.currentWebview();
				currentView.show('slide-in-right', 200);
				plus.nativeUI.closeWaiting();
			};
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast('服务器异常，请稍后再试！');
			var currentView = plus.webview.currentWebview();
			currentView.show('slide-in-right', 200);
			plus.nativeUI.closeWaiting();
		}
	});
});