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
	var url = serverAddress + "/portal/listAllCouponByCustomerIdOutUse.do";
	mui.ajax(url, {
		data: {},
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			/*'Content-Type': 'application/json'*/
		},
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.success == true) {
				for(var i = 0; i < data.obj.length; i++) {
					//开始时间
					var start = data.obj[i].BEGINDATE.substring(0, 10);
					data.obj[i].BEGINDATE = start;
					//结束时间
					var end = data.obj[i].ENDDATE.substring(0, 10);
					data.obj[i].ENDDATE = end;
					//折扣
					var scale = data.obj[i].SCALE * 10;
					data.obj[i].SCALE = scale;
				}
				// 通知页面模板数据传递
				var record = data.obj;
				var str = template('radio-tigan', {
					"record": record
				});
				document.getElementById("mui-template").innerHTML = str;
			}
			if(data.success == false) {
				mui.toast(data.msg);
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
})