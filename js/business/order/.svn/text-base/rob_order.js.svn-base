mui.init({
	swipeBack: false
});

mui.plusReady(initData);

var daojishi1 = 5;
var daojishi2 = 60;
var od_type = "";

var cityUtil = {

	'getPosBaidu': function getPosBaidu(callback) {
		plus.geolocation.getCurrentPosition(function getinfo(position) {
				callback(position);
			},
			function(e) {
				alert("获取百度定位位置信息失败：" + e.message);
			}, {
				provider: 'baidu'
			});
	}
}

document.querySelector(".top-order-right").addEventListener("tap", function() {
	mui.back();
});

//载入订单数据
function initData() {
	setInterval(function() {
		if(daojishi1 >= 0) {
			document.getElementById('daojishi1').innerHTML = daojishi1 + "秒";
			daojishi1--;
		} else if(daojishi1 < 0 && daojishi2 >= 0) {
			document.querySelector(".btn-bg-hui").style.display = "none";
			document.querySelector('.btn-bg').style.display = "";
			document.getElementById('daojishi2').innerHTML = daojishi2 + 's';
			daojishi2--;
		} else if(daojishi2 < 0) {
			mui.back();
		}
	}, 1000);

	var w = plus.webview.currentWebview();
	var data = w;
	if(data) {
		var od_id = data.OD_ID;
		var c_lng, c_lat;
		cityUtil.getPosBaidu(function(position) {
			c_lng = position.coords.longitude;
			c_lat = position.coords.latitude;
			getGPSDisance(c_lng, c_lat, data);

		});

		document.querySelector('.btn-bg').addEventListener('tap', function() {
			if(daojishi1 < 0) {
				//抢单
				var waiting = plus.nativeUI.showWaiting();
				var url = serverAddress + "/order_App/order_Liucheng.do";
				var params = {
					"OD_STATUS": 2,
					"STATUS_ORDER_HIS": 2,
					"OD_ID": data.OD_ID,
					"LNG": c_lng,
					"LAT": c_lat
				};
				mui.ajax(url, {
					data: params,
					dataType: 'json', //服务器返回json格式数据
					type: 'get', //HTTP请求类型
					timeout: 30000, //超时时间设置为30秒；
					headers: {
						/*'Content-Type': 'application/json'*/
					},
					success: function(data) {
						//服务器返回响应，根据响应结果，分析是否登录成功；
						if(data.success == true) {
							startPlay("抢单成功，祝您工作好心情");
							var dingdan = plus.webview.getWebviewById('view/order/dingdan.html');
							dingdan.reload(true);
							var qiangdan = plus.webview.getWebviewById('view/order/qiangdan.html');
							/*qiangdan.reload(true);*/
							mui.fire(qiangdan, "close_map", {
								STATUS: 2,
								OD_ID: od_id
							});
							// 跳转首页
							var index = plus.webview.getLaunchWebview();
							mui.fire(index, 'orderend', {
								STATUS: 0,
								TITLE: '抢单'
							});
							mui.fire(index, "loginSuccess");
							mui.openWindow({
								url: "order_xiangqing.html",
								id: "order_xiangqing",
								show: {
									autoShow: false, //页面loaded事件发生后自动显示，默认为true
									event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
								},
								extras: {
									OD_ID: od_id
								},
								waiting: {
									autoShow: true //自动显示等待框，默认为true
								}
							});

							var order_xiangqing = plus.webview.getWebviewById('order_xiangqing');
							order_xiangqing.addEventListener('loaded', function() {
								mui.fire(order_xiangqing, "close_rob", {
									STATUS: 1
								});
							});

						}
						if(data.success == false) {
							mui.toast(decodeURI(data.msg));
							plus.nativeUI.closeWaiting();
							mui.back();
						}
					},
					error: function(xhr, type, errorThrown) {
						//异常处理；
						//mui.toast('服务器异常，请稍后再试！');
						plus.nativeUI.closeWaiting();
						mui.back();
					}
				});

			}
		});

		document.getElementById("start").innerHTML = data.ADDRESS_NAME_BEGIN;
		1
		if(data.DATE_YJYONGCHE) {
			//			if(stringToDate(data.DATE_YJYONGCHE).getTime() == new Date().getTime()) {
			if(data.DATE_YJYONGCHE == data.DATE_XIADAN) {
				document.getElementById("od_status").innerHTML = '<img src="../../image/sj.png"/>实时';
				od_type = "实时";
			} else {
				document.getElementById("od_status").innerHTML = '<img src="../../image/sj.png"/>预约';
				od_type = "预约";
			}
		}

		//		document.getElementById("jingtingLi").style.display = "none";
		document.getElementById("end").innerHTML = data.ADDRESS_NAME_END;
		document.getElementById("tel").innerHTML = "取货电话：" + data.PERSON_SHOUHUO_PHONE;
		if(data.EWAI_1 == 1) {
			document.getElementById("extra").innerHTML += "需要装卸  "
		}
		if(data.EWAI_2 == 1) {
			document.getElementById("extra").innerHTML += "需带回单  "
		}
		if(data.EWAI_3 == 1) {
			document.getElementById("extra").innerHTML += "需带回款: " + data.EWAI_3_MONEY + " 元"
		}
		document.getElementById("price").innerHTML = (parseInt(data.MONEY_SHIJI) - parseInt(data.MONEY_BAOXIAN)) + "元";

		//使用推送中的数据
		var waypoints = [];
		if(data.POINT_TUJING_SUM > 0) {
			//						for(var i = 0; i < data.POINT_TUJING_SUM; i++) {
			//							waypoints[i] = new new plus.maps.Point(data.ORDER_TUJING[i].ADDRESS_LNG_TUJING, data.ORDER_TUJING[i].ADDRESS_LAT_TUJING);
			//						}
		}
		//		var params = {
		//			start: new plus.maps.Point(data.ADDRESS_LNG_BEGIN, data.ADDRESS_LAT_BEGIN),
		//			end: new plus.maps.Point(data.ADDRESS_LNG_END, data.ADDRESS_LAT_END),
		//			tujing: waypoints
		//		}

	}
}

//字符串转时间
function stringToDate(fDate) {
	if(fDate) {
		return new Date(Date.parse(fDate.replace(/-/g, "/")));
	}
}

function getGPSDisance(lng1, lat1, data) { //#lat为纬度, lng为经度, 一定不要弄错 ZC2017040114974268
	var dis = 0;
	var p1 = new plus.maps.Point(lng1, lat1);
	var p2 = new plus.maps.Point(data.ADDRESS_LNG_BEGIN, data.ADDRESS_LAT_BEGIN);
	plus.maps.Map.calculateDistance(p1, p2, function(event) {
		var distance = event.distance;
		dis = distance;
		dis = (dis / 1000).toFixed(2);

		if(data.STATUS_CHARGE) {
			if(data.STATUS_CHARGE == 1) {
				document.getElementById("distance").innerHTML = "距离您" + dis + "km" + "<p>一口价</p>";
			} else if(data.STATUS_CHARGE == 2) {
				document.getElementById("distance").innerHTML = "距离您" + dis + "km" + "<p>按里程计费</p>";
			}
		}
		var str = "距您" + dis + "公里, 有" + od_type + "订单";
		data.POINT_TUJING_SUM = parseInt(data.POINT_TUJING_SUM);
		if(data.POINT_TUJING_SUM > 0) {
			str += ",有" + data.POINT_TUJING_SUM + "个经停点";
		}
		if(data.EWAI_1 == 1 || data.EWAI_2 == 1 || data.EWAI_3 == 1) str += ",有额外服务"
		if(data.BEIZHU) str += ",请查看货主留言";
		startPlay(str);
	}, function(e) {
		alert("Failed:" + JSON.stringify(e));
		return;
	})

}

function startPlay(str) {
	if(plus.os.name == "Android") {
		var main = plus.android.runtimeMainActivity();
		var SpeechUtility = plus.android.importClass('com.iflytek.cloud.SpeechUtility');
		SpeechUtility.createUtility(main, "appid=sunlei.dcloud");
		var SynthesizerPlayer = plus.android.importClass('com.iflytek.cloud.SpeechSynthesizer');
		var play = SynthesizerPlayer.createSynthesizer(main, null);
		play.startSpeaking(str, null);
	} else if(plus.os.name == "iOS") {
		var AVSpeechSynthesizer = plus.ios.importClass("AVSpeechSynthesizer");
		var AVSpeechUtterance = plus.ios.importClass("AVSpeechUtterance");
		var AVSpeechSynthesisVoice = plus.ios.import("AVSpeechSynthesisVoice");
		var sppech = new AVSpeechSynthesizer();
		var voice = AVSpeechSynthesisVoice.voiceWithLanguage("zh-CN");
		var utterance = AVSpeechUtterance.speechUtteranceWithString(str);
		utterance.setVoice(voice);
		sppech.speakUtterance(utterance);
		//停止
		//		sppech.stopSpeakingAtBoundary(0);
		//		//暂停
		////		sppech.pauseSpeakingAtBoundary(0);
		//		//继续
		////		sppech.continueSpeaking(0);
		//		plus.ios.deleteObject(voice);
		//		plus.ios.deleteObject(utterance);
		//		plus.ios.deleteObject(sppech);
	}

}