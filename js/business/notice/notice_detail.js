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
	var url = serverAddress + "/notice/listNotice_App.do";
	//获得起始点页面参数
	mui.ajax(url, {
		data: {
			NOTICE_ID: self.NOTICE_ID,
			READ_STATUS: self.READ_STATUS
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
				document.getElementById('TITLE').innerHTML = decodeURI(data.obj[0].TITLE);
				document.getElementById('CONTENT').innerHTML = decodeURI(data.obj[0].CONTENT);
				var sys_date = decodeURIComponent(data.obj[0].SYS_DATE);
				var json_time = date_All_format(sys_date);
				document.getElementById('SYS_DATE').innerHTML = json_time;

				// 刷新通知列表
				var list = plus.webview.currentWebview().opener();
				list.reload(true);
				//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
				mui.fire(list, 'refresh');
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
			mui.toast('服务器异常，请稍后再试！');
		}
	});
});
// 添加getDetail自定义事件监听
window.addEventListener('getDetail', function(event) {

});