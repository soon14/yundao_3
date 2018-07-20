// 附近车辆坐标
var carlist = [];

mui.init({
	swipeBack: false,
	keyEventBind: {
		backbutton: true //打开back按键监听
	}
});
mui.plusReady(function() {
	var url = serverAddress + "/applogistics/queryLogisticsAttachment.do";
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
				var record = [];
				var result = data.obj.length;

				for(var i = 0; i < result; i++) { //如果从后台获取数据不为null则push到obj中
					if(data.obj[i] != null) {
						record.push(data.obj[i]);
					}
				}
				//图片
				var img_url = serverAddress + "/" + data.obj[0].LOGOPATH;
				data.obj[0]["LOGOPATH_NEW"] = img_url; //往json添加图片地址
				var img_url2 = serverAddress + "/" + data.obj[1].LOGOPATH;
				data.obj[1]["LOGOPATH_NEW"] = img_url2; //往json添加图片地址
				var str = template('radio-tigan', {
					"record": record
				});
				document.getElementById("tuijian-ctn").innerHTML = str;
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

});
mui('.mui-scroll-wrapper').scroll();

// 顶部灰色
mui('#segmentedControl').on('tap', '.mui-control-item:not(.mui-active)', function() {
	var type = this.getAttribute('data-index');
	if(type == 1) {
		document.getElementById("a_1").style.display = "block";
		document.getElementById("a_2").style.display = "none";
		document.getElementById("a_3").style.display = "none";
	} else if(type == 2) {
		document.getElementById("a_1").style.display = "none";
		document.getElementById("a_2").style.display = "block";
		document.getElementById("a_3").style.display = "none";
	} else {
		document.getElementById("a_1").style.display = "none";
		document.getElementById("a_2").style.display = "none";
		document.getElementById("a_3").style.display = "block";
	}
});

// 添加data_fahuo自定义事件监听
window.addEventListener('data_fahuo', function(event) {
	//获得起始点页面参数
	document.getElementById("num_count").innerHTML = event.detail.COUNT;
	carlist = event.detail.CARLIST;
});
mui('#xinxi').on('tap', 'a', function() {
	var id = this.getAttribute("id");
	var arry = id.split("_");
	if(localStorage.getItem("TOKEN") == null) {
		mui.openWindow({
			url: "../login/login.html"
		});
	} else {
		mui.openWindow({
			url: 'zhuanche_xiadan.html',
			id: 'zhuanche_xiadan',
			show: {
				autoShow: false, //页面loaded事件发生后自动显示，默认为true
				event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
			},
			waiting: {
				autoShow: true //自动显示等待框，默认为true
			}
		});
		var main3 = plus.webview.getWebviewById('zhuanche_xiadan');
		main3.addEventListener('loaded', function() {
			mui.fire(main3, "CAR_TYPE_dd", arry[1]);
		});
	}
});
mui('#xinxi2').on('tap', 'a', function() {
	var id = this.getAttribute("id");
	var arry = id.split("_");
	console.log(arry[1]);
	if(localStorage.getItem("TOKEN") == null) {
		mui.openWindow({
			url: "../login/login.html"
		});
	} else {
		mui.openWindow({
			url: 'shunfengche_xiadan.html',
			id: 'shunfengche_xiadan',
			show: {
				autoShow: false, //页面loaded事件发生后自动显示，默认为true
				event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
			},
			waiting: {
				autoShow: true //自动显示等待框，默认为true
			}
		});
		var main3 = plus.webview.getWebviewById('shunfengche_xiadan');
		main3.addEventListener('loaded', function() {
			mui.fire(main3, "CAR_TYPE_dd", arry[1]);
		});
	}
});

// 点击专车附近车辆，展示百度地图
document.getElementById("a_1").addEventListener("tap", function() {
	var num_count = document.getElementById('num_count').innerHTML;
	if(num_count != 0) {
		mui.openWindow({
			url: 'fujincheliang.html',
			id: 'fujincheliang',
			show: {
				autoShow: false, //页面loaded事件发生后自动显示，默认为true
				event: 'loaded', //页面显示时机，默认为titleUpdate事件时显示
				duration: 200
			},
			waiting: {
				autoShow: true //自动显示等待框，默认为true
			}
		});

		var fujincheliang = plus.webview.getWebviewById('fujincheliang');
		mui.fire(fujincheliang, "data_carlist", {
			CARLIST: carlist // 附近车辆坐标
		});
	}
});

// 登录后刷新发货页头部附近车辆数量和车辆坐标
window.addEventListener('refresh', function(e) {
	wid = plus.geolocation.getCurrentPosition(function(p) {
		var lng = p.coords.longitude;
		var lat = p.coords.latitude;
		/**
		 * 国内火星坐标系 (GCJ-02)、WGS84坐标系与百度坐标系 (BD-09) 的转换
		 * 
		 * @param lng
		 * @param lat
		 */

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

		var url = serverAddress + "/appRegister/queryCarList_App.do";
		mui.ajax(url, {
			data: {
				LNG: lng, // 经度
				LAT: lat // 纬度
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
					p = JSON.stringify(p);
					localStorage.setItem("P", p);
					// 向index发送信息
					var index = plus.webview.getLaunchWebview();
					mui.fire(index, "loginSuccess");
					document.getElementById("num_count").innerHTML = data.attributes.COUNT; // 附近车辆数
					carlist = data.attributes.CARLIST; // 附近车辆坐标
				}
				if(data.success == false) {
					localStorage.setItem("P", p);
					//mui.toast(decodeURI(data.msg));
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//mui.toast('网络异常，请稍后再试！');
			}
		});

	}, function(e) {
		console.log("Geolocation error: " + e.message);
	}, {
		timeout: 10000
	});
	return true;
});
//物流
mui("h5").on('tap', 'span', function(e) { // 城市选择
	if(window.plus) {
		var id = this.getAttribute("id"); //获取省市区判断是起始还是终点弹层
		mui.openWindow({
			url: '../order/city_select.html',
			id: 'city_select.html',
			extras: {
				classes: id,
			},
			waiting: {
				autoShow: false //自动显示等待框，默认为true
			},
			styles: {
				top: '0px',
				//				top: topoffset,
				bottom: '0px',
				background: 'transparent',
				opacity: 1,
				//				mask:'rgba(0,0,0,0.5)',
				zindex: "100"
			}
		});
	} else {
		mui.toast("请在html5+引擎环境使用");
	}
})
window.addEventListener("fahuo_baginEvent", function(event) { //起始路线
	var provinceCode = event.detail.provinceCode; //省id
	var provinceName = event.detail.provinceName; //省i
	var cityCode = event.detail.cityCode; //市id
	var cityName = event.detail.cityName; //市i
	var areaCode = event.detail.areaCode; //区id
	var areaName = event.detail.areaName; //区i
	document.getElementById("xuanzediqu-start").innerText = cityName; //给input赋值
	document.getElementById("start1").innerText = provinceCode; //给span赋值为了获取省市区id
	document.getElementById("start2").innerText = cityCode;
	document.getElementById("start3").innerText = areaCode;
});
window.addEventListener("fahuo_endEvent", function(event) { //终点路线
	var provinceCode = event.detail.provinceCode; //省id
	var provinceName = event.detail.provinceName; //省i
	var cityCode = event.detail.cityCode; //市id
	var cityName = event.detail.cityName; //市i
	var areaCode = event.detail.areaCode; //区id
	var areaName = event.detail.areaName; //区i
	document.getElementById("xuanzediqu-end").innerText = cityName;; //给input赋值
	document.getElementById("end1").innerText = provinceCode; //给span赋值为了获取省市区id
	document.getElementById("end2").innerText = cityCode;
	document.getElementById("end3").innerText = areaCode;
});
// 点击开始搜索跳转到物流列表页
window.addEventListener("cityChangeEvent", function(e) { //获取当前位置
	var cityName = e.detail.CITY_name;
	var PROVINCE_CODE = e.detail.PROVINCE_CODE;
	var CITY_CODE = e.detail.CITY_CODE;
	var AREA_CODE = e.detail.AREA_CODE;
	document.getElementById("xuanzediqu-start").innerText = cityName; //给input赋值
	document.getElementById("kaishisousuo").addEventListener('tap', function() {
		var bproCode = document.getElementById("start1").innerText; //起点省ID
		var bcityCode = document.getElementById("start2").innerText; //起点市ID
		var bareaCode = document.getElementById("start3").innerText; //起点区ID
		var eproCode = document.getElementById("end1").innerText; //终点省ID
		var ecityCode = document.getElementById("end2").innerText; //终点省ID
		var eareaCode = document.getElementById("end3").innerText; //终点区ID
		//手动选择起始省市区传的数据
		var data = {
			BPROVINCE: bproCode,
			BCITY: bcityCode,
			BAREA: bareaCode,
			EPROVINCE: eproCode,
			ECITY: ecityCode,
			EAREA: eareaCode
		}
		//默认当前起始位置传递的数据
		var data_start = {
			BPROVINCE: PROVINCE_CODE,
			BCITY: CITY_CODE,
			BAREA: AREA_CODE,
			EPROVINCE: eproCode,
			ECITY: ecityCode,
			EAREA: eareaCode
		}
		if(bproCode == "") { //如果省为空把前起始位置赋给传递数据
			var post_data = data_start;

		} else if(bproCode !== "") { //如果省不为为空把选择的省市区赋给传递数据
			var post_data = data
		}
		mui.openWindow({
			url: '../order/logistics.html',
			id: 'logistics',
			extras: post_data, //自定义扩展参数
			show: {
				autoShow: false, //页面loaded事件发生后自动显示，默认为true
				event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
			},
			waiting: {
				autoShow: true //自动显示等待框，默认为true
			}
		});
	});
}, false);

//localStorage.setItem("result", data);
//	console.log(JSON.stringify(data))
//	为您推荐求地址