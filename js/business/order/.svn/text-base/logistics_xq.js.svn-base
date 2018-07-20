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
mui.plusReady(function() {//首次进入页面获取的是起始点网点
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
	var self = plus.webview.currentWebview();
	var id = self.LOGISTICS_ID; //物流id
	var bproCode = self.SPROVINCE; //起点省ID
	var bcityCode = self.SCITY; //起点市ID
	var bareaCode = self.SAREA; //起点区ID	
	var eproCode = self.DPROVINCE; //终点省ID
	var ecityCode = self.DCITY; //终点市ID
	var eareaCode = self.DAREA; //终点区ID
	var zuobiaox = self.ZUOBIAO_X; //精度
	var zuobiaoy = self.ZUOBIAO_Y; //纬度
	var url = serverAddress + "/applogistics/queryLogisticsDotsApp.do";
	var post_begin={LOGISTICS_ID:id,PROVINCE:bproCode,CITY:bcityCode,AREA:bareaCode,LONGITUDE:zuobiaoy,LATITUDE:zuobiaox};//开始网点
	var post_end={LOGISTICS_ID:id,PROVINCE:eproCode,CITY:ecityCode,AREA:eareaCode,LONGITUDE:zuobiaoy,LATITUDE:zuobiaox};//目的地网点
	mui.ajax(url, {
	data: post_begin,
	dataType: 'json', //服务器返回json格式数据
	type: 'get', //HTTP请求类型
	timeout: 30000, //超时时间设置为30秒；
	headers: {
		/*'Content-Type': 'application/json'*/
	},
	success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.success == true) {
				if(data.obj.length==0){
					document.getElementById("zanwuwd").className = "wl-null display-block";
					document.getElementById("xzwd_btn").className = "mui-content-padded display-no";
				}
				for(var i = 0; i < data.obj.length; i++) {					
					data.obj[i].DISTANCE = parseInt(data.obj[i].DISTANCE);// 距离
				}
				var record=data.obj;
				var str = template('radio-tigan', {"record": record});
				document.getElementById("wuliu").innerHTML = str;
			}
			if(data.success == false) {
				mui.toast(decodeURI(data.msg));
			}			
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast('服务器异常，请稍后再试！');
		}
	});
//
	mui(".mui-content-padded").on('tap', 'button', function(e) {
		var id = this.getAttribute("id");//获取button的id，判断是起始网点还是目的地网点
		if(id=="mdwangdian"){//目的地网点
			document.getElementById("mdwangdian").className = "mui-btn mui-btn-block display-no";
			document.getElementById("qswangdian").className = "mui-btn mui-btn-block display-block";
			var post_num = post_end ;//请求数据
		}else if(id=="qswangdian"){//起始地网点
			document.getElementById("mdwangdian").className = "mui-btn mui-btn-block display-block";
			document.getElementById("qswangdian").className = "mui-btn mui-btn-block display-no";
			var post_num = post_begin;//请求数据
		}
		mui.ajax(url, {
		data: post_num,
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
						data.obj[i].DISTANCE = parseInt(data.obj[i].DISTANCE);// 距离
					}
					var record=data.obj;
					var str = template('radio-tigan', {"record": record});
					document.getElementById("wuliu").innerHTML = str;
				}
				if(data.success == false) {
					mui.toast(decodeURI(data.msg));
				}			
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				mui.toast('服务器异常，请稍后再试！');
			}
		});		
	})
	
	//点击物流框跳转到物流详情页面
	mui("#wuliu").on('tap', 'a', function(e) {							
		var id = this.getAttribute("id");//获取a标签id--即物流id
		var wangid = this.getAttribute("wangid");//获取网点id
		mui.openWindow({
			url: '../order/logistics_company.html',
			extras: {
				LOGISTICS_ID: id,
				LOGISTICS_DOT_ID: wangid,
				SIGN:"wangdian",							
			}, //自定义扩展参数
			show: {
				autoShow: false, //页面loaded事件发生后自动显示，默认为true
				event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
			},
			waiting: {
				autoShow: true //自动显示等待框，默认为true
			}
		});
	})
	
})