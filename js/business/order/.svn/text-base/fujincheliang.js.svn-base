var map;

mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	},
	beforeback: function() {
		//返回时清空地图上所有的覆盖物图层，防止另一个入口打开页面时出现多余的坐标信息
		map.clearOverlays();
		return true;
	}
});

mui.plusReady(function() {
	var self = plus.webview.currentWebview();

	if(self.sign == "driver") {
		if(!map) {
			console.log(1);
			map = new plus.maps.Map("baidumap");
			var scale;
			if(plus.os.name == "Android") {
				scale = 13;
			} else {
				scale = 14;
			}
			map.getUserLocation(function(state, pos) {
				if(0 == state) {
					map.setCenter(pos);
				}
			});
		}

		if(!self.startLNG) {
			map.getUserLocation(function(state, pos) {
				if(0 == state) {
					self.startLNG = pos.longitude;
					self.startLAT = pos.latitude;
				}
			});
		}

		var startMarker = new plus.maps.Marker(new plus.maps.Point(self.startLNG, self.startLAT));
		startMarker.setIcon("../../image/begin.png");
		var endMarker = new plus.maps.Marker(new plus.maps.Point(self.endLNG, self.endLAT));
		startMarker.setIcon("../../image/end.png");
		map.addOverlay(startMarker);
		map.addOverlay(endMarker);
		map.addOverlay(new plus.maps.Route(new plus.maps.Point(self.startLNG, self.startLAT), new plus.maps.Point(self.endLNG, self.endLAT)));
		var userName = self.username;
		if(userName) {
			var url = serverAddress + "/order_App/queryCarGps_App.do";
			mui.ajax(url, {
				data: {
					"USERNAME_CAR": decodeURIComponent(userName)
				},
				dataType: 'json',
				type: 'get',
				async: false,
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				timeout: 60000,
				success: function(data) {
					if(data.success == true) {
						var driverLNG = data.obj[0].LNG;
						var driverLAT = data.obj[0].LAT;
						var driverMarker = new plus.maps.Marker(new plus.maps.Point(driverLNG, driverLAT));
						driverMarker.setIcon("../../image/che.png");
						map.addOverlay(driverMarker);
						plus.nativeUI.closeWaiting();
					} else {
						plus.nativeUI.closeWaiting();
						mui.toast(data.msg);
					}
				},
				error: function(xhr, type, errorThrown) {}
			});
		}

	}

});

window.addEventListener('data_carlist', function(e) {
	var carlist = e.detail.CARLIST;
	if(!map) {
		map = new plus.maps.Map("baidumap");
		var scale;
		if(plus.os.name == "Android") {
			scale = 13;
		} else {
			scale = 14;
		}
	}
	map.centerAndZoom(new plus.maps.Point(carlist[0].LNG, carlist[0].LAT), scale);
	document.getElementById("title").innerHTML = '附近车辆';
	for(var i = 0; i < carlist.length; i++) {
		var marker = new plus.maps.Marker(new plus.maps.Point(carlist[i].LNG, carlist[i].LAT));
		if(plus.os.name == "Android") {
			marker.setIcon("../../image/che.png");
		} else {
			marker.setIcon("../../image/che60.png");
		}
		map.addOverlay(marker);
	}
	document.getElementById("reset").addEventListener('tap', function() {
		map.showUserLocation(true);
		map.getUserLocation(function(state, pos) {
			if(0 == state) {
				map.setCenter(pos);
			}
		});
	})
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting
});

// 物流公司订单点击地图接收
window.addEventListener('data_wuliulist', function(e) {
	var zuobiao_x = e.detail.ZUOBIAO_X;
	var zuobiao_y = e.detail.ZUOBIAO_Y;
	var name = e.detail.NAME;
	var sihn = e.detail.SIHN;
	//物流
	if(sihn == "wuliu") {
		if(!map) {
			map = new plus.maps.Map("baidumap");
			var scale;
			if(plus.os.name == "Android") {
				scale = 13;
			} else {
				scale = 13;
			}
			map.centerAndZoom(new plus.maps.Point(zuobiao_y, zuobiao_x), scale);
		}

		document.getElementById("title").innerHTML = name;
		var marker = new plus.maps.Marker(new plus.maps.Point(zuobiao_y, zuobiao_x));
		if(plus.os.name == "Android") {
			marker.setIcon("../../image/wl80.png");
		} else {
			marker.setIcon("../../image/wl60.png");
		}
		map.addOverlay(marker);
		plus.nativeUI.closeWaiting();
		return true;
	}
});

window.addEventListener('data_car_now', function(e) {
	var carlist = e.detail.CARLIST;
	if(!map) {
		map = new plus.maps.Map("baidumap");
		var scale;
		if(plus.os.name == "Android") {
			scale = 13;
		} else {
			scale = 13;
		}
	}
	map.centerAndZoom(new plus.maps.Point(carlist[0].LNG, carlist[0].LAT), scale);
	document.getElementById("title").innerHTML = '司机当前位置';
	for(var i = 0; i < carlist.length; i++) {
		var marker = new plus.maps.Marker(new plus.maps.Point(carlist[i].LNG, carlist[i].LAT));
		// 起点坐标
		if(i == 0) {
			if(plus.os.name == "Android") {
				marker.setIcon("../../image/begin60.png");
			} else {
				marker.setIcon("../../image/begin60.png");
			}
		}
		// 终点坐标
		if(i == 1) {
			if(plus.os.name == "Android") {
				marker.setIcon("../../image/end60.png");
			} else {
				marker.setIcon("../../image/end60.png");
			}
		}
		// 经停点坐标
		if(i != 0 && i != 1 && i != (carlist.length - 1)) {
			if(plus.os.name == "Android") {
				marker.setIcon("../../image/tujing.png");
			} else {
				marker.setIcon("../../image/tujing60.png");
			}
		}
		// 当前坐标
		if(i == (carlist.length - 1)) {
			if(plus.os.name == "Android") {
				marker.setIcon("../../image/che.png");
			} else {
				marker.setIcon("../../image/che60.png");
			}
		}
		map.addOverlay(marker);
	}
	document.getElementById("reset").addEventListener('tap', function() {
		map.showUserLocation(true);
		map.getUserLocation(function(state, pos) {
			if(0 == state) {
				map.setCenter(pos);
			}
		});
	})
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});