mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	},
	beforeback: function() {
		//返回true，继续页面关闭逻辑  JSON.stringify(timeParam)
		mui.back;
		return true;
	}
});
//localStorage.getItem("result")
//console.log(JSON.stringify(localStorage.getItem("result")))

mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var url = serverAddress + "/applogistics/queryLogisticsBySD.do";
	mui.ajax(url, {
		data: {
			SPROVINCE: self.BPROVINCE,
			SCITY: self.BCITY,
			SAREA: self.BAREA,
			DPROVINCE: self.EPROVINCE,
			DCITY: self.ECITY,
			DAREA: self.EAREA

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
				if(data.obj.length == 0) {
					document.getElementById("zanwuwl").className = "wl-null display-block";
				}
				for(var i = 0; i < data.obj.length; i++) {
					//图片
					var img_url =serverAddress + "/"+data.obj[i].LOGOPATH;
					data.obj[i]["LOGOPATH_NEW"] = img_url; //往json添加图片地址
				}
				var record = data.obj;
				var str = template('radio-tigan', {
					"record": record
				});
				document.getElementById("wuliu").innerHTML = str;
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
	//点击物流框跳转到物流详情页面
	mui("#wuliu").on('tap', 'a', function(e) {
		var id = this.getAttribute("id"); //获取a标签id--即物流id
		var zuobiao_x = this.getAttribute("zuobiao_x"); //获取a标签zuobiao_x--即物流精度
		var zuobiao_y = this.getAttribute("zuobiao_y"); //获取a标签zuobiao_y--即物流纬度
		mui.openWindow({
			url: '../order/logistics_company.html',
			id: 'logistics_company',
			extras: {
				SIGN: "wuliu",
				LOGISTICS_ID: id,
				SPROVINCE: self.BPROVINCE,
				SCITY: self.BCITY,
				SAREA: self.BAREA,
				DPROVINCE: self.EPROVINCE,
				DCITY: self.ECITY,
				DAREA: self.EAREA,
				ZUOBIAO_X: zuobiao_x,
				ZUOBIAO_Y: zuobiao_y

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

// 关闭页面
window.addEventListener('close', function(e) {
	setTimeout(function() {
		// 加载完毕后关闭等待框，并展示页面
		plus.nativeUI.closeWaiting();
		mui.back();
	}, 1000);
});