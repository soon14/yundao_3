// 百度地图API功能
//var map = new BMap.Map("baidu"); // 创建Map实例
//map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
//map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
//map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
//map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
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
	var url = serverAddress + "/applogistics/findLogisticsById.do";
	var url_wangdian = serverAddress + "/applogistics/queryLogisticsDotsDetail.do";
	if(self.LOGISTICS_DOT_ID !== undefined) { //查询网点详细信息
		document.getElementById("chakanwd").className = "mui-content-padded display-no";
		mui.ajax(url_wangdian, {
			data: {
				LOGISTICS_DOT_ID: self.LOGISTICS_DOT_ID
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
					document.getElementById("title").innerHTML = data.obj.NAME; //标题
					document.getElementById("heis").innerHTML = data.obj.NAME; //物流公司名
					document.getElementById("hs").innerHTML = data.obj.ADDRESS; //物流公司地址
					document.getElementById("lvs-b").innerHTML = data.obj.PHONE; //物流公司电话
					document.getElementById("yunjia").innerHTML = data.obj.COMMENTS; //运价详情	
					document.getElementById("logistic_x").innerHTML = data.obj.ZUOBIAO_X; //物流公司所在位置的经度
					document.getElementById("logistic_y").innerHTML = data.obj.ZUOBIAO_Y; //物流公司所在位置的纬度
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
		mui.ajax(url, {
			data: {
				LOGISTICS_ID: self.LOGISTICS_ID,
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
					document.getElementById("fw").innerHTML = data.obj.COUNTRYWIDE_NAME; //物流公司运输范围						
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
	}
	if(self.LOGISTICS_DOT_ID == undefined) { //获取物流信息
		document.getElementById("chakanwd").className = "mui-content-padded display-block";
		mui.ajax(url, {
			data: {
				LOGISTICS_ID: self.LOGISTICS_ID,
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
					//				console.log(JSON.stringify(data.obj.AREANAME))	
					document.getElementById("title").innerHTML = data.obj.NAME; //标题
					document.getElementById("heis").innerHTML = data.obj.NAME; //物流公司名
					document.getElementById("hs").innerHTML = data.obj.ADDRESS; //物流公司地址
					document.getElementById("lvs-b").innerHTML = data.obj.PHONE; //物流公司电话
					document.getElementById("fw").innerHTML = data.obj.COUNTRYWIDE_NAME; //物流公司运输范围
					document.getElementById("yunjia").innerHTML = data.obj.COMMENTS; //运价详情
					document.getElementById("logistic_id").innerHTML = data.obj.LOGISTICS_ID; //物流id
					document.getElementById("logistic_x").innerHTML = data.obj.ZUOBIAO_X; //物流公司所在位置的经度
					document.getElementById("logistic_y").innerHTML = data.obj.ZUOBIAO_Y; //物流公司所在位置的纬度
					document.getElementById("img-url").src = serverAddress + "/"+data.obj.LOGOPATH; //物流公司图片
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
	}

	//查看其它网点
	document.getElementById("check-btn").addEventListener('tap', function() {
		var logistic_id = document.getElementById("logistic_id").innerHTML;
		var nwaiting = plus.nativeUI.showWaiting();
		mui.openWindow({
			url: '../order/logistics_xq.html',
			extras: {
				LOGISTICS_ID: self.LOGISTICS_ID,
				DPROVINCE: self.DPROVINCE,
				DCITY: self.DCITY,
				DAREA: self.DAREA,
				SPROVINCE: self.SPROVINCE,
				SCITY: self.SCITY,
				SAREA: self.SAREA,
				ZUOBIAO_X: self.ZUOBIAO_X,
				ZUOBIAO_Y: self.ZUOBIAO_Y
			},
			show: {
				autoShow: false, //页面loaded事件发生后自动显示，默认为true
				event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
			},
			waiting: {
				autoShow: false //自动显示等待框，默认为true
			}
		});
	});
})

//查看运价详情
document.getElementById("square2").addEventListener('tap', function() {
	var content = document.getElementById("yunjia").innerHTML;
	console.log(content)
	var nwaiting = plus.nativeUI.showWaiting();
	mui.openWindow({
		url: '../logistics/tariff-details.html',
		extras: {
			COMMENTS: content,
		},
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: false //自动显示等待框，默认为true
		}
	});
});
//点击查看地图，跳转到地图页面
document.getElementById("check-map").addEventListener('tap', function() {
	var logistic_x = document.getElementById("logistic_x").innerHTML; //物流公司所在位置的经度
	var logistic_y = document.getElementById("logistic_y").innerHTML; //物流公司所在位置的纬度
	var logistic_name = document.getElementById("title").innerHTML //物流公司名
	mui.openWindow({
		url: 'fujincheliang.html',
		id: 'fujincheliang',
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded', //页面显示时机，默认为titleUpdate事件时显示
			duration: 200
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
	var fujincheliang = plus.webview.getWebviewById('fujincheliang');
	mui.fire(fujincheliang, "data_wuliulist", {
		ZUOBIAO_X: logistic_x,
		ZUOBIAO_Y: logistic_y,
		NAME: logistic_name,
		SIHN: "wuliu"
	});

});
//联系物流公司
document.getElementById("call-tel").addEventListener('tap', function() {
	var phone = document.getElementById("lvs-b").innerHTML;
	if(mui.os.plus) {
		plus.device.dial(phone);
	} else {
		location.href = 'tel:' + phone;
	}

});

document.getElementById("xiadan").addEventListener('tap', function(e) {
	e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
	var btnArray = ['取消', '确定'];
	mui.prompt('请输入原价，支付时自动计算折扣', '在此输入金额', '', btnArray, function(e) {

		if(e.index == 1) {
			//			alert('您输入的金额' + e.value);
			var price = e.value;
			var logistic_id = document.getElementById("logistic_id").innerHTML;
			// 正整数
			var num_validate = /^[1-9]\d*$/;
			if(e.value != "" && num_validate.test(e.value)) {
				var url = serverAddress + "/applogistics/createlogisticsorder.do";
				mui.ajax(url, {
					data: {
						PRICE: price,
						LOGISTICS_ID: logistic_id
					},
					dataType: 'json', //服务器返回json格式数据
					type: 'get', //HTTP请求类型
					timeout: 30000, //超时时间设置为30秒；
					headers: {
						/*'Content-Type': 'application/json'*/
					},
					success: function(data) {
						//服务器返回响应，根据响应结果，分析是否登录成功；
						if(data.success == true) { //下单成功后点击是跳转到订单管理页面			
							var btnArray = ['否', '是'];
							mui.confirm('下单成功', '提示', btnArray, function(e) {

								if(e.index == 1) {
									var index = plus.webview.getLaunchWebview();
									mui.fire(index, 'orderend', {
										STATUS: 1,
										TITLE: '订单'
									});
									// 刷新订单管理页面
									var dingdan = plus.webview.getWebviewById('view/order/dingdan.html');
									dingdan.reload(true);
									var logistics = plus.webview.currentWebview().opener();
									mui.fire(logistics, 'close');

								} else {
									//								info.innerText = 'MUI没有得到你的认可，继续加油'
								}
							})
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
			} else {
				mui.toast("请正确填写价格");
				return false;
			}

		} else {
			//info.innerText = '你点了取消按钮';
		}
	})
});