var cityUtil = {

	'getPosBaidu': function getPosBaidu(callback) {
		plus.geolocation.getCurrentPosition(function getinfo(position) {
				callback(position);
			},
			function(e) {
				alert("获取百度定位位置信息失败：" + e.message);
			}, { provider: 'baidu' });
	},

	'getCityName': function getCityName(callback) {
		plus.geolocation.getCurrentPosition(function getinfo(position) {
				var p = position.address.province; //获取城市信息
				var c = position.address.city;
				callback(p, c);
			},
			function(e) {
				alert("获取百度定位位置信息失败：" + e.message);
			}, { provider: 'baidu' });
	},

	'getCityCode': function getCityCode(province, city, area, callback) {
		for(var i = 0; i < cityData3.length; i++) {
			var p = cityData3[i];
			if(p.text == province) {
				for(var j = 0; j < p.children.length; j++) {
					var c = p.children[j];
					if(c.text == city) {
						for(var k = 0; k < c.children.length; k++) {
							var a = c.children[k];
							if(a.text == area) {
								callback(p.value, c.value, a.value);
								return;
							}
						}
					}
				}
			}
		}
	}
};

var ajaxUtil = {
	'getRequest': function getRequest(url, params, callback) {
		mui.ajax(url, {
			data: params,
			dataType: 'json',
			type: 'get',
			async: false,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			timeout: 60000,
			success: function(data) {
				if(data.success == true) {
					if(callback != null) {
						mDecodeUrl(data.obj);
						callback(data);
					}
				} else {
					alert(decodeURI(data.msg));
					//		mui.back();
				}
			},
			error: function(xhr, type, errorThrown) {
				mui.toast("<网络连接失败，请登录>", "错误", "OK", null);
			}
		});
	},

	'postRequest': function getRequest(url, params, callback) {
		mui.ajax(url, {
			data: params,
			dataType: 'json',
			type: 'post',
			async: false,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			timeout: 60000,
			success: function(data) {
				if(data.success == true) {
					if(callback != null) {
						mDecodeUrl(data.obj);
						callback(data);
					}
				} else {
					alert(decodeURI(data.msg));
					//		mui.back();
				}
			},
			error: function(xhr, type, errorThrown) {
				mui.toast("<网络连接失败，请登录>", "错误", "OK", null);
			}
		});
	},

	'postRequestAsyn': function postRequestAsyn(url, params, s_callback, e_callback, showWaiting) {
		if(showWaiting) {
			plus.nativeUI.showWaiting();
		}
		mui.ajax(url, {
			data: params,
			dataType: 'json',
			type: 'post',
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			timeout: 60000,
			success: function(data) {
				if(data.success == true) {
					if(showWaiting) {
						plus.nativeUI.closeWaiting();
					}
					if(s_callback != null) {
						mDecodeUrl(data.obj);
						s_callback(data);
					}
				} else {
					if(showWaiting) {
						plus.nativeUI.closeWaiting();
					}
					if(e_callback) {
						e_callback(data);
					} else {
						alert(decodeURIComponent(data.msg));
						//		mui.back();
					}
				}
			},
			error: function(xhr, type, errorThrown) {
				plus.nativeUI.closeWaiting();
				mui.toast("<网络连接失败，请登录>", "错误", "OK", null);
			}
		});
	}
};

var windowUtil = {
	'openNextWindow': function(w_id, w_url, params) {
		mui.openWindow({
			id: w_id,
			url: w_url,
			extras: params,
			createNew: false,
			waiting: {
				autoShow: true, //自动显示等待框，默认为true
				title: '正在加载...', //等待对话框上显示的提示内容
			}
		});
	}
};

//给data.obj解码
function mDecodeUrl(data) {
	for(var m in data) {
		if(typeof(data[m]) != "object") {
			data[m] = decodeURIComponent(data[m]).replace(/\+/g, " ");
		} else {
			mDecodeUrl(data[m]);
		}
	}
}

//给params编码
function mEncodeUrl(data) {
	if(data) {
		for(var m in data) {
			if(typeof(data[m]) != "object") {
				data[m] = encodeURIComponent(data[m]);
			} else {
				mEncodeUrl(data[m]);
			}
		}
	}
}

function app_decode(data) {
	var patt1 = new RegExp("\\+", "gi");
	var patt2 = new RegExp('\"\{', "gi");
	var patt3 = new RegExp('\}\"', "gi");
	var patt4 = new RegExp('\"\\[', "gi");
	var patt5 = new RegExp('\]\"', "gi");
	var strData = decodeURIComponent(JSON.stringify(data));
	strData = strData.replace(patt1, " ");
	strData = strData.replace(patt2, "{");
	strData = strData.replace(patt3, "}");
	strData = strData.replace(patt4, "[");
	strData = strData.replace(patt5, "]");
	var datas = JSON.parse(strData);
	return datas;
}

function decodeObj(data) {
	var strData;
	if(typeof data == "string") {
		strData = decodeURIComponent(data);
	} else {
		strData = decodeURIComponent(JSON.stringify(data));
	}
	var patt1 = new RegExp("\\+", "gi");
	strData = strData.replace(patt1, " ");
	return strData;
}

function formatDate(date1) {
	var app_date = new Date(date1.time);
	return app_date.format("yyyy-MM-dd hh:mm:ss");
}

Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
				(o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}