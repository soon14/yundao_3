var record = [];

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
	var self = plus.webview.currentWebview();
	var url = serverAddress + "/appcheckingline/queryCheckingLineByItem.do";
	mui.ajax(url, {
		data: {
			"PROVINCE_ID": self.PROVINCE_CODE,
			"CITY_ID": self.CITY_CODE,
			"AREA_ID": self.AREA_CODE,
			"ITEM_ID": self.dictionaries_ID || ""
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
				//				// 通知页面模板数据传递
				record = data.obj;
				for(var i in record) {
					record[i].CAR_TYPE = self.CAR_TYPE;
					record[i].TYPE_ITEM = self.dictionaries_ID;
				}
				var str = template('checkline_list', {
					"record": record
				});
				document.getElementById("mui-template").innerHTML = str;
				//
				//				var list = plus.webview.currentWebview().opener();
				//				//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
				//				mui.fire(list, 'refresh', {
				//					count: count_tongzhi
				//				});
			}
			if(data.success == false) {
				mui.toast(decodeURI(data.msg));
			}
			// 加载完毕后关闭等待框，并展示页面
			var currentView = plus.webview.currentWebview();
			currentView.show('slide-in-right', 200);
			plus.nativeUI.closeWaiting();
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			/*mui.toast('网络异常，请稍后再试！');*/
		}
	});
});

mui(".mui-content").on('click', 'button', function(e) {
	var id = this.getAttribute("id");
	mui.openWindow({
		url: '../jianche/message_tianxie.html',
		id: 'message_tianxie.html',
		extras: record[parseInt(id)], //自定义扩展参数
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
});