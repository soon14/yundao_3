// 订单ID
var order_id;
// 订单流程状态
var status_order_his;
// 起始点坐标
var address_lng_begin;
var address_lat_begin;
// 终点坐标
var address_lng_end;
var address_lat_end;
// 司机username
var username_car;
// 经停点数量
var tujingdiancount = 0;
// 经停点json数据
var JSONMessage_jingting = {};
// 坐标集合
var carlist = [];
// 订单类型
var od_type;

var order_status;
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

mui('.mui-scroll-wrapper').scroll();

mui.plusReady(function() {
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
	var url_detail = serverAddress + "/order_App/order_Detail.do"; //订单详情url
	var self = plus.webview.currentWebview();
	order_id = self.OD_ID;
	if(order_id.startsWith("ZC")) {
		od_type = '1';
		document.getElementById("dingdangaipai").style.display = "";
	} else if(order_id.startsWith("SF")) {
		od_type = '3';
		document.getElementById("dingdangaipai").style.display = "none";
	}

	var record = [];
	//获得订单状态页面
	getProcess(0);

	//获得订单详情页面
	mui.ajax(url_detail, {
		data: {
			OD_ID: order_id,
			USERTYPE: 2
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
				var result = data.attributes.ORDER_DETAIL;
				// 经停点数量
				tujingdiancount = result[0].POINT_TUJING_SUM;
				for(var i = 0; i < result.length; i++) {
					//起点
					var address_begin = decodeURIComponent(result[i].ADDRESS_NAME_BEGIN).replace(/\+/g, " ");
					result[i].ADDRESS_NAME_BEGIN = address_begin;
					//终点
					var address_end = decodeURIComponent(result[i].ADDRESS_NAME_END).replace(/\+/g, " ");
					result[i].ADDRESS_NAME_END = address_end;
					//备注
					var beizhu = decodeURIComponent(result[i].BEIZHU == null ? "无" : result[i].BEIZHU).replace(/\+/g, " ");
					result[i].BEIZHU = beizhu;
					//用车时间
					var yc_date = decodeURIComponent(result[i].DATE_YJYONGCHE);
					var json_yc_data = date_Minutes_format(yc_date);
					result[i].DATE_YJYONGCHE = json_yc_data;
					//车辆名称
					var car_name_n = decodeURI(result[i].CAR_NAME);
					result[i].CAR_NAME = car_name_n;
				}

				// 订单状态--0：默认；1：下单；2：抢单；3：运输中；4：送达；5：支付
				var od_status = result[0].OD_STATUS;
				// 是否取消订单--0：默认；1：是
				var status_quxiao = result[0].STATUS_QUXIAO;
				// 用户是否评价--0：默认；1：是；2：否
				var status_pingjia = result[0].STATUS_PINGJIA;
				// 用户实际支付金额
				var money_shiji = result[0].MONEY_SHIJI;
				// 车主登录名
				username_car = decodeURIComponent(result[0].USER_NAME_CAR);

				address_lng_begin = result[0].ADDRESS_LNG_BEGIN;
				address_lat_begin = result[0].ADDRESS_LAT_BEGIN;
				// 终点坐标
				address_lng_end = result[0].ADDRESS_LNG_END;
				address_lat_end = result[0].ADDRESS_LAT_END;
				var JSONMessage_begin = {
					LNG: address_lng_begin,
					LAT: address_lat_begin
				};
				var JSONMessage_end = {
					LNG: address_lng_end,
					LAT: address_lat_end
				};
				carlist.push(JSONMessage_begin);
				carlist.push(JSONMessage_end);

				var result_tujing = data.attributes.ORDER_TUJING;
				for(var i = 0; i < result_tujing.length; i++) {
					var JSONMessage_tujing = {
						LNG: result_tujing[i].ADDRESS_LNG_TUJING,
						LAT: result_tujing[i].ADDRESS_LAT_TUJING
					};
					carlist.push(JSONMessage_tujing);
				}

				var record = result;
				var str = template('radio-tigan_2', {
					"record": record
				});
				document.getElementById("lvst").innerHTML = str;

				var eleArr = document.querySelectorAll(".nav");
				for(var i = 0; i < eleArr.length; i++) {
					eleArr[i].addEventListener("tap", function() {
						if(order_status == 3 || order_status == 7) {
							checkDriverLocation(record[0].ADDRESS_LNG_BEGIN, record[0].ADDRESS_LAT_BEGIN, record[0].ADDRESS_LNG_END,
								record[0].ADDRESS_LAT_END, record[0].USER_NAME_CAR);
						}
					});
				}
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

// 点击底部按钮
document.getElementById("dibu").addEventListener('tap', function() {

	if(status_order_his == 14 || status_order_his == 12) {
		return;
	}
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var JSONMessage;

	var url = serverAddress + "/order_App/order_Liucheng.do";
	plus.geolocation.getCurrentPosition(function(data) {
		if(data) {
			var lng = data.coords.longitude;
			var lat = data.coords.latitude;

			var params;
			status_order_his++;
			if(status_order_his == 2) {
				params = {
					"STATUS_ORDER_HIS": status_order_his,
					"OD_ID": order_id,
					"LNG": lng,
					"LAT": lat
				}
			} else if(status_order_his == 6) {
				params = {
					"STATUS_ORDER_HIS": status_order_his,
					"OD_ID": order_id,
					"LNG": lng,
					"LAT": lat
				};
				getImage(params);
				return;
			} else if(tujingdiancount > 0 && status_order_his == 8) {
				params = {
					"STATUS_ORDER_HIS": 15,
					"OD_ID": order_id,
					"LNG": lng,
					"LAT": lat
				};

			} else if(tujingdiancount > 0 && status_order_his == 16) {
				params = {
					"STATUS_ORDER_HIS": status_order_his,
					"OD_ID": order_id,
					"LNG": lng,
					"LAT": lat
				};
			} else if(tujingdiancount > 0 && status_order_his == 17) {
				params = {
					"STATUS_ORDER_HIS": status_order_his,
					"OD_ID": order_id,
					"LNG": lng,
					"LAT": lat
				};
			} else if(tujingdiancount > 0 && status_order_his == 18) {
				params = {
					"STATUS_ORDER_HIS": 7,
					"OD_ID": order_id,
					"LNG": lng,
					"LAT": lat
				};
				tujingdiancount--;
			} else {
				params = {
					"STATUS_ORDER_HIS": status_order_his,
					"OD_ID": order_id,
					"LNG": lng,
					"LAT": lat
				};
			}
			if(status_order_his == 2 && od_type == '3') {
				params.OD_STATUS = 2;
			}
			if(status_order_his == 3) {
				params.OD_STATUS = 3;
			}
			if(status_order_his == 8) {
				params.OD_STATUS = 4;
			}
			if(status_order_his == 12) {
				params.OD_STATUS = 5;
				params.ACCOUNT_STATUS = 1;
			}
			if(status_order_his == 13) {
				mui.toast("订单已完成!");
			} else {
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

							if(status_order_his == 8) {
								getProcess(1);
							} else {
								getProcess(0);
							}
							plus.nativeUI.closeWaiting();
							if(status_order_his == 2) {
								var dingdan = plus.webview.getWebviewById('view/order/dingdan.html');
								dingdan.reload(true);
							}
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
		}
	})
});

function getProcess(status) {
	var url = serverAddress + "/order_App/order_His_App.do"; //订单状态url
	var record = [];
	var order_status;
	//获得订单状态页面
	mui.ajax(url, {
		data: {
			OD_ID: order_id,
			USERTYPE: 2
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
				for(var i = 0; i < data.obj.length; i++) {
					//用户姓名
					var user_name = decodeURI(data.obj[i].REAL_NAME_USER);
					data.obj[i].REAL_NAME_USER = user_name;
					//司机姓名
					var car_name = decodeURI(data.obj[i].REAL_NAME_CAR == undefined ? "佚名" : data.obj[i].REAL_NAME_CAR);
					data.obj[i].REAL_NAME_CAR = car_name;
					//内容状态
					var content = decodeURI(data.obj[i].CONTENT);
					data.obj[i].CONTENT = content;
					//年月
					var sys_date = decodeURIComponent(data.obj[i].SYS_DATE);
					var json_data = date_Minutes_format(sys_date).substring(0, 10);
					data.obj[i]["SYS_DATE_NEW"] = json_data; //往json添加年月数据
					//时间	
					var json_time = date_Minutes_format(sys_date).substring(10, 16);
					data.obj[i]["SYS_MINUTES_NEW"] = json_time; //往json添加时间数据		
					//计算等待时间
					if(i > 1) {
						var sys_date1 = decodeURIComponent(data.obj[i - 1].SYS_DATE);
						var json_time1 = date_All_format(sys_date1);
						var sys_date2 = decodeURIComponent(data.obj[i].SYS_DATE);
						var json_time2 = date_All_format(sys_date2);
						data.obj[i]["SYS_JS_TIME"] = date_Time_minus(json_time1, json_time2); //往json添加计算时间数据
					}
					record.push(data.obj[i]);
					order_status = data.obj[data.obj.length - 1].STATUS_ORDER_HIS;
					// 用来检查该订单进行到了哪一步
					status_order_his = data.obj[i].STATUS_ORDER_HIS;
					var p = document.querySelector('.dibu_p_class');
					// 底部按钮文字和逻辑功能处理
					p.innerHTML = changBtnText(status_order_his);
					// 已送达时刷新抢单, 订单页面

				}
				if(status_order_his == 8) {
					var btn = plus.webview.getWebviewById("../order/maps_map_sub.html");
					if(btn) btn.close();
					var qiangdan = plus.webview.getWebviewById("view/order/qiangdan.html");

					if(status == 1) {
						qiangdan.reload(true);
					}
					var dingdan = plus.webview.getWebviewById('view/order/dingdan.html');
					dingdan.reload(true);
					var wode = plus.webview.getWebviewById("view/geren_message/wode.html");
					wode.reload(true);

				}
				var str = template('radio-tigan', {
					"record": record
				});
				if(status_order_his == 14) {
					document.getElementById("dibu").style.display = "";
					document.querySelector('.dibu_p_class').innerHTML = "订单已取消";
					document.getElementById("dibu").disabled = true;
				}
				if(status_order_his >= 10 && status_order_his < 12) {
					document.getElementById("dibu_a").style.display = "";
					document.getElementById("dibu").style.display = "none";
				} else {
					document.getElementById("dibu_a").style.display = "none";
					document.getElementById("dibu").style.display = "";
				}

				document.getElementById("orde_status").innerHTML = str;
				if(data.obj.length == 1) {
					document.getElementsByTagName("li")[0].className = "exp-content-list list-item-1";
				} else {
					//第一个li的icon
					document.getElementsByTagName("li")[0].className = "exp-content-list list-item-1";
					//最后一个li的icon
					if((data.obj.length - 1) > 0) {
						document.getElementsByTagName("li")[data.obj.length - 1].className = "exp-content-list list-item-11 mui-media";
					} else {
						document.getElementsByTagName("li")[data.obj.length].className = "exp-content-list list-item-11 mui-media";
					}
				}
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

function checkDriverLocation(startLNG, startLAT, endLNG, endLAT, username) {
	mui.openWindow({
		url: "fujincheliang.html",
		id: "fujincheliang.html",
		extras: {
			"sign": "driver",
			"startLNG": startLNG,
			"startLAT": startLAT,
			"endLNG": endLNG,
			"endLAT": endLAT,
			"username": username
		}
	});
}

function getImage(params) {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var s = entry.toLocalURL() + "?version=" + new Date().getTime();
			console.log(s);
			uploadHead(params, s); /*上传图片*/
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(s) {
		console.log("error" + s);
	}, {
		filename: "_doc/tmp.jpg"
	})
}

//将图片压缩转成base64
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	if(width > height) {
		if(width > 500) {
			height = Math.round(height *= 500 / width);
			width = 500;
		}
	} else {
		if(height > 500) {
			width = Math.round(width *= 500 / height);
			height = 500;
		}
	}

	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/
	var dataURL = canvas.toDataURL("image/png", 0.8);
	return dataURL.replace("data:image/png;base64,", "");
}

//将Base64塞进字符串
function uploadHead(params, imgPath) {

	var image = new Image();
	image.src = imgPath;
	image.onload = function() {
		var imgData = getBase64Image(image);
		image_touxiang = imgData;
		upload(params, image_touxiang);
	}
}

function upload(params, image_touxiang) {

	/*在这里调用上传接口*/
	if(image_touxiang == "") {
		mui.toast("图片不存在, 请重新拍照!");
		return;
	}
	params.IMAGE = image_touxiang;
	var url = serverAddress + "/order_App/order_Liucheng.do";
	mui.ajax(url, {
		data: params,
		dataType: 'json',
		type: 'post',
		timeout: 20000,
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.success == true) {

				if(status_order_his == 8) {
					getProcess(1);
				} else {
					getProcess(0);
				}
				plus.nativeUI.closeWaiting();
				if(status_order_his == 2) {
					var dingdan = plus.webview.getWebviewById('view/order/dingdan.html');
					dingdan.reload(true);
				}
			}
			if(data.success == false) {
				mui.toast(decodeURI(data.msg));
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.alert('网络超时，请稍后再试！');
		}
	});
}

// 关闭页面
window.addEventListener('close', function(e) {
	setTimeout(function() {
		// 加载完毕后关闭等待框，并展示页面
		plus.nativeUI.closeWaiting();
		mui.back();
	}, 1000);
});

confirm = function(content, onPopupClick) {
	var oDiv = document.createElement('div');
	var mengban = document.createElement('div');
	mengban.innerHTML = '<div class="mui-popup-backdrop mui-active" style="display: block;"></div>'
	//	oDiv.innerHTML = '<div class="mui-popup mui-popup-in" style="display:block;padding-top:20px" id="licheng"><a id="icon-close"><span class="mui-icon mui-icon-close"></span></a><div class="mui-popup-inner" id="shangmian"><div class="mui-popup-title">为司机打分</div></div><div class="mui-popup-inner" id="zhongjian"><div class="mui-popup-text"><div class="mui-content-padded"><div class="icons mui-inline" id="xingxing"><i data-index="1" class="mui-icon mui-icon-star"></i><i data-index="2" class="mui-icon mui-icon-star"></i><i data-index="3" class="mui-icon mui-icon-star"></i><i data-index="4" class="mui-icon mui-icon-star"></i><i data-index="5" class="mui-icon mui-icon-star"></i></div></div></div></div><div class="mui-popup-buttons"><button class="mui-btn-block" id="queding">确定</button></div></div>';
	oDiv.innerHTML = '<div class="mui-popup mui-popup-in" style="display:block;padding-top:20px" id="licheng"><div class="mui-popup-inner" id="shangmian"><div class="mui-popup-title">为司机打分</div></div><div class="mui-popup-inner" id="zhongjian"><div class="mui-popup-text"><div class="mui-content-padded"><div class="icons mui-inline" id="xingxing"><i data-index="1" class="mui-icon mui-icon-star"></i><i data-index="2" class="mui-icon mui-icon-star"></i><i data-index="3" class="mui-icon mui-icon-star"></i><i data-index="4" class="mui-icon mui-icon-star"></i><i data-index="5" class="mui-icon mui-icon-star"></i></div></div></div></div><div class="mui-popup-buttons"><button class="mui-btn-block" id="queding">确定</button><button class="mui-btn-block" id="quxiao">取消</button></div></div>';
	//	mengban.style="z-index:99999";
	document.body.appendChild(mengban);
	document.body.appendChild(oDiv);
	var starIndex = 0;
	mui('#xingxing').on('tap', 'i', function() {
		var index = parseInt(this.getAttribute("data-index"));
		var parent = this.parentNode;
		var children = parent.children;
		if(this.classList.contains("mui-icon-star")) {
			for(var i = 0; i < index; i++) {
				children[i].classList.remove('mui-icon-star');
				children[i].classList.add('mui-icon-star-filled');
			}
		} else {
			for(var i = index; i < 5; i++) {
				children[i].classList.add('mui-icon-star')
				children[i].classList.remove('mui-icon-star-filled')
			}
		}
		//选择得星星个数
		starIndex = index;
	});
	document.getElementById("queding").addEventListener('tap', function() {
		// 设定等待动画框，新页面加载完毕后再显示
		var nwaiting = plus.nativeUI.showWaiting();
		document.body.removeChild(mengban);
		document.body.removeChild(oDiv);
		var ordercomment = '给予' + starIndex + "星评价";
		var url = serverAddress + "/order_App/saveOrder_Evaluate_App.do"; //订单评价
		mui.ajax(url, {
			data: {
				OD_ID: order_id,
				STARNUM: starIndex,
				ORDERCOMMENT: ordercomment
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 30000, //超时时间设置为30秒；
			headers: {
				/*'Content-Type': 'application/json'*/
			},
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				if(data.success == true) {
					// 刷新订单管理页面
					var dingdan = plus.webview.getWebviewById('view/order/dingdan.html');
					dingdan.reload(true);
					setTimeout(function() {
						// 加载完毕后关闭等待框，并展示页面
						plus.webview.currentWebview().close();
						plus.nativeUI.closeWaiting();
					}, 1000);
				}
				if(data.success == false) {
					mui.toast(decodeURI(data.msg));
					plus.nativeUI.closeWaiting();
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//mui.toast('服务器异常，请稍后再试！');
				plus.nativeUI.closeWaiting();
			}
		});

		return true;
	});
	document.getElementById("quxiao").addEventListener('tap', function(e) {
		document.body.removeChild(mengban);
		document.body.removeChild(oDiv);
		return false;
	});

}

// 查看司机位置
mui('#item1').on('tap', 'a', function() {
	var id = this.getAttribute('id');
	if(id != 'phone_car' && id != 'iphone_car' && id != 'phone_user' && id != 'iphone_car') {
		switch(true) {
			case(status_order_his == 10):
			case(status_order_his == 11):
			case(status_order_his == 12):
			case(status_order_his == 14):
				mui.toast('该状态不允许导航');
				return false;
				break;
		}
		var lng, lat;
		if(id == 'check_zuobiao_1') {
			lng = address_lng_begin;
			lat = address_lat_begin;
		} else if(id == 'check_zuobiao_2') {
			lng = address_lng_end;
			lat = address_lat_end;
		}
		var url = null,
			nid = null,
			f = null;
		switch(plus.os.name) {
			case "Android":
				url = "baidumap://map/navi?location=" + lat + "," + lng;
				nid = "com.baidu.BaiduMap";
				break;
			case "iOS":
				url = "baidumap://map/navi?location=" + lat + "," + lng +
					"&title=DCloud&content=%e6%89%93%e9%80%a0HTML5%e6%9c%80%e5%a5%bd%e7%9a%84%e7%a7%bb%e5%8a%a8%e5%bc%80%e5%8f%91%e5%b7%a5%e5%85%b7&src=HelloH5";
				nid = "itunes.apple.com/cn/app/bai-du-de-tu-yu-yin-dao-hang/id452186370?mt=8";
				break;
			default:
				return;
				break;
		}
		plus.runtime.openURL(url, function(e) {
			plus.nativeUI.confirm("检查到您未安装\"百度地图\"!", function(i) {
				if(i.index == 0) {
					//		f(id);
				}
			});
		});
	} else {
		var iphone = document.getElementById('iphone_car').innerHTML.trim();
		if(mui.os.plus) {
			plus.device.dial(iphone);
		} else {
			location.href = 'tel:' + iphone;
		}
	}
});

function changBtnText(lastStaue) {
	//此处返回none代表隐藏按钮，否则返回按钮文本
	var btnText = "";
	lastStaue = parseInt(lastStaue);
	switch(lastStaue - 1) {
		case 0:
			btnText = "接单";
			break;
		case 1:
			btnText = "前往货源地";
			break;
		case 2:
			btnText = "已到达货源地";
			break;
		case 3:
			btnText = "开始装货";
			break;
		case 4:
			btnText = "装货完毕（拍照）";
			break;
		case 5:
			btnText = "开始运货";
			break;
		case 6:
			btnText = tujingdiancount > 0 ? "到达途径点" : "已到达目的地";
			break;
		case 7:
			btnText = "开始卸货";
			break;
		case 8:
			btnText = "卸货完毕";
			break;
		case 9:
			btnText = "提醒货主";
			break;
		case 10:
			btnText = "已支付订单";
			break;
		case 11:
			btnText = "订单完结";
			break;
		case 12:
			btnText = "订单完结";
			break;
		case 13:
			btnText = "到达途径点";
			break;
		case 14:
			btnText = "途径点卸货";
			break;
		case 15:
			btnText = "途径点卸货完毕";
			break;
		case 16:
			btnText = "开始运货";
			break;
		default:
			btnText = " ";
			break;
	}
	return btnText;
}

document.getElementById("dingdangaipai").addEventListener('tap', function() {
	mui.confirm("确认改派？", '', ['是', '否'], function(e) {
		if(e.index == 0) {
			var nwaiting = plus.nativeUI.showWaiting();
			plus.geolocation.getCurrentPosition(function(data) {
				if(data && (status_order_his != 11 || status_order_his != 12)) {
					var lng = data.coords.longitude;
					var lat = data.coords.latitude;

					var url = serverAddress + "/order_App/updateOrder_Gaipai_App.do";
					var params = {
						"OD_STATUS": "1",
						"STATUS_ORDER_HIS": "18",
						"OD_ID": order_id,
						"LNG": lng,
						"LAT": lat
					};

					mui.ajax(url, {
						data: params,
						dataType: 'json', //服务器返回json格式数据
						type: 'post', //HTTP请求类型
						timeout: 30000, //超时时间设置为30秒；
						headers: {
							/*'Content-Type': 'application/json'*/
						},
						success: function(data) {
							//服务器返回响应，根据响应结果，分析是否登录成功；
							if(data.success == true) {
								plus.nativeUI.closeWaiting();
								mui.toast("订单改派成功!");
								var dingdan = plus.webview.getWebviewById('view/order/qiangdan.html');
								dingdan.reload(true);
								var btn = plus.webview.getWebviewById("../order/maps_map_sub.html");
								if(btn) btn.close();
								var shunfengche = plus.webview.getWebviewById('view/order/dingdan.html');
								shunfengche.reload(true);
								mui.back();
							}
							if(data.success == false) {
								plus.nativeUI.closeWaiting();
								mui.toast(decodeURI(data.msg));
							}
						},
						error: function(xhr, type, errorThrown) {
							// 异常处理；
							// mui.toast('服务器异常，请稍后再试！');
							plus.nativeUI.closeWaiting();
						}
					});
				} else {
					mui.toast("目前不能改派!");
				}
			})
		}
	})

})

document.getElementById("dibu1").addEventListener("tap", function() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var JSONMessage;

	var url = serverAddress + "/order_App/order_Liucheng.do";
	plus.geolocation.getCurrentPosition(function(data) {
		if(data) {
			var lng = data.coords.longitude;
			var lat = data.coords.latitude;

			var params = {
				"STATUS_ORDER_HIS": 11,
				"OD_ID": order_id,
				"LNG": lng,
				"LAT": lat,
			}

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
						getProcess(0);
						plus.nativeUI.closeWaiting();
					}
					if(data.success == false) {
						mui.toast(decodeURI(data.msg));
					}
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					mui.toast('服务器异常，请稍后再试！');
				}

			})
		}
	})
})

document.getElementById("dibu2").addEventListener("tap", function() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var JSONMessage;

	var url = serverAddress + "/order_App/order_Liucheng.do";
	plus.geolocation.getCurrentPosition(function(data) {
		if(data) {
			var lng = data.coords.longitude;
			var lat = data.coords.latitude;

			var params = {
				"STATUS_ORDER_HIS": 12,
				"OD_ID": order_id,
				"LNG": lng,
				"LAT": lat,
				"OD_STATUS": 5,
				"ACCOUNT_STATUS": 2,
				"QUDAO": 6,
				"ZF_TYPE": od_type,
			}

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
						getProcess(0);
						plus.nativeUI.closeWaiting();
					}
					if(data.success == false) {
						mui.toast(decodeURI(data.msg));
					}
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					mui.toast('服务器异常，请稍后再试！');
				}

			})
		}
	})
});

// 关闭个推弹出页
window.addEventListener('close_rob', function(e) {
	plus.webview.currentWebview().opener().close();
});