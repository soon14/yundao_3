var orderCount = 5;
// 第几页默认从0开始
var currentPage_1 = 1;
var currentPage_2 = 1;
var currentPage_3 = 1;
var currentPage_4 = 1;
// 传递到html数据模板的object对象
var record_1 = [];
var record_2 = [];
var record_3 = [];
var record_4 = [];

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
	var url = serverAddress + "/order_App/carOrder_App.do";
	//已完成
	mui.ajax(url, {
		data: {
			OD_STATUS: 4,
			showCount: orderCount,
			currentPage: currentPage_1
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
					document.getElementById("item1_1_null").className = "display-block";
					//					document.querySelector(".mui-pull-bottom-tips").className = "display-none";
					if(document.querySelector(".mui-pull-bottom-tips")) {
						document.querySelector(".mui-pull-bottom-tips").parentNode.removeChild(document.querySelector(".mui-pull-bottom-tips"));
					}
					//					var item_null="<div id='item1_1_null' class='display-none'><div class='mui-content-padded wutu' style='text-align:center;padding-top:1.8rem;'><div><img src='../../image/dingdan/wudingdan.png' /></div><p>您还没有此类订单</p></div><div class='mui-content-padded anniu'><button id='save_address' class='mui-btn mui-btn-block mui-btn-primary'>下一步</button></div></div>"

				} else {
					for(var i = 0; i < data.obj.length; i++) {
						// 时间
						var sys_date = decodeURIComponent(data.obj[i].DATE_XIADAN);
						var json_time = date_Minutes_format(sys_date);
						data.obj[i].DATE_XIADAN = json_time;
						//起点
						var address_begin = decodeURIComponent(data.obj[i].ADDRESS_NAME_BEGIN).replace(/\+/g, " ");
						data.obj[i].ADDRESS_NAME_BEGIN = address_begin;
						//终点
						var address_end = decodeURIComponent(data.obj[i].ADDRESS_NAME_END).replace(/\+/g, " ");
						data.obj[i].ADDRESS_NAME_END = address_end;
						//车辆名称
						var car_name_n = decodeURI(data.obj[i].CAR_NAME);
						data.obj[i].CAR_NAME = car_name_n;
					}
					record_1 = data.obj;
					var str = template('radio-tigan', {
						"record": record_1
					});
					//点击订单跟踪跳转到订单详情页面
					//				document.getElementById("item1_1").innerHTML = str;
					document.querySelector(".item1_1").innerHTML = str;
				}
			}
			if(data.success == false) {
				mui.toast(data.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			/*mui.toast('网络异常，请稍后再试！');*/
			document.getElementById("item1_1_null").className = "display-block";
			//			document.querySelector(".mui-pull-bottom-tips").className = "display-none";
			if(document.querySelector(".mui-pull-bottom-tips")) {
				document.querySelector(".mui-pull-bottom-tips").parentNode.removeChild(document.querySelector(".mui-pull-bottom-tips"));
			}

		}
	});

	//进行中
	mui.ajax(url, {
		data: {
			OD_STATUS: 3,
			showCount: orderCount,
			currentPage: currentPage_2
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
					document.getElementById("item2_2_null").className = "display-block";
					//					document.querySelector(".mui-pull-bottom-tips").className = "display-none";
					if(document.querySelector(".mui-pull-bottom-tips")) {
						document.querySelector(".mui-pull-bottom-tips").parentNode.removeChild(document.querySelector(".mui-pull-bottom-tips"));
					}
				} else {
					for(var i = 0; i < data.obj.length; i++) {
						// 时间
						var sys_date = decodeURIComponent(data.obj[i].DATE_XIADAN);
						var json_time = date_Minutes_format(sys_date);
						data.obj[i].DATE_XIADAN = json_time;
						//起点
						var address_begin = decodeURIComponent(data.obj[i].ADDRESS_NAME_BEGIN).replace(/\+/g, " ");
						data.obj[i].ADDRESS_NAME_BEGIN = address_begin;
						//终点
						var address_end = decodeURIComponent(data.obj[i].ADDRESS_NAME_END).replace(/\+/g, " ");
						data.obj[i].ADDRESS_NAME_END = address_end;
						//车辆名称
						var car_name_n = decodeURI(data.obj[i].CAR_NAME);
						data.obj[i].CAR_NAME = car_name_n;
					}
					record_2 = data.obj;
					var str = template('radio-tigan', {
						"record": record_2
					});
					//				document.getElementById("item2_2").innerHTML = str;
					document.querySelector(".item2_2").innerHTML = str;
				}
			}
			if(data.success == false) {
				mui.toast(data.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			/*mui.toast('网络异常，请稍后再试！');*/
			document.getElementById("item2_2_null").className = "display-block";
			//			document.querySelector(".mui-pull-bottom-tips").className = "display-none";
			if(document.querySelector(".mui-pull-bottom-tips")) {
				document.querySelector(".mui-pull-bottom-tips").parentNode.removeChild(document.querySelector(".mui-pull-bottom-tips"));
			}
		}
	});
	//其他
	mui.ajax(url, {
		data: {
			OD_TYPE: 2,
			showCount: orderCount,
			currentPage: currentPage_3
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
					document.getElementById("item3_3_null").className = "display-block";
					//					document.querySelector(".mui-pull-bottom-tips").className = "display-none";
					if(document.querySelector(".mui-pull-bottom-tips")) {
						document.querySelector(".mui-pull-bottom-tips").parentNode.removeChild(document.querySelector(".mui-pull-bottom-tips"));
					}
				} else {
					for(var i = 0; i < data.obj.length; i++) {
						// 时间
						var sys_date = decodeURIComponent(data.obj[i].DATE_XIADAN);
						var json_time = date_Minutes_format(sys_date);
						data.obj[i].DATE_XIADAN = json_time;
						//起点
						var address_begin = decodeURIComponent(data.obj[i].ADDRESS_NAME_BEGIN).replace(/\+/g, " ");
						data.obj[i].ADDRESS_NAME_BEGIN = address_begin;
						//终点
						var address_end = decodeURIComponent(data.obj[i].ADDRESS_NAME_END).replace(/\+/g, " ");
						data.obj[i].ADDRESS_NAME_END = address_end;
						//车辆名称
						var car_name_n = decodeURI(data.obj[i].CAR_NAME);
						data.obj[i].CAR_NAME = car_name_n;
					}
					record_3 = data.obj;
					var str = template('radio-tigan', {
						"record": record_3
					});
					//				document.getElementById("item3_3").innerHTML = str;
					document.querySelector(".item3_3").innerHTML = str;
				}
			}
			if(data.success == false) {
				mui.toast(data.msg);
				document.getElementById("item3_3_null").className = "display-block";
				//			document.querySelector(".mui-pull-bottom-tips").className = "display-none";
				if(document.querySelector(".mui-pull-bottom-tips")) {
					document.querySelector(".mui-pull-bottom-tips").parentNode.removeChild(document.querySelector(".mui-pull-bottom-tips"));
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			/*mui.toast('网络异常，请稍后再试！');*/
			document.getElementById("item3_3_null").className = "display-block";
			//			document.querySelector(".mui-pull-bottom-tips").className = "display-none";
			if(document.querySelector(".mui-pull-bottom-tips")) {
				document.querySelector(".mui-pull-bottom-tips").parentNode.removeChild(document.querySelector(".mui-pull-bottom-tips"));
			}
		}
	});

	// 加载完毕后关闭等待框，并展示页面
	//	var currentView = plus.webview.currentWebview();
	//	currentView.show('slide-in-right', 200);
	//	plus.nativeUI.closeWaiting();
})

//点击订单跟踪跳转到订单详情页面
mui(".mui-slider-group").on('tap', 'a', function(e) {
	var id = this.getAttribute("id");
	var type = this.getAttribute("name");
	var url = "";
	if(type == 2) {
		url = "../checkline/order_detail.html";
	} else if(type == 4) {
		url = "../order/order_wuliu_xq.html";
	} else {
		url = "../order/order_xiangqing.html";
	}
	mui.openWindow({
		url: url,
		id: 'order_xiangqing',
		extras: {
			OD_ID: id,
		}, //自定义扩展参数
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
});

// 加载个数，默认999
var loading_count_up = 999;
var loading_count_down = 999;

(function($) {
	//阻尼系数
	var deceleration = mui.os.ios ? 0.003 : 0.0009;
	$('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration: deceleration
	});
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				down: {
					callback: function() {
						if(document.querySelector(".mui-pull-bottom-tips")) {
							document.querySelector(".mui-pull-bottom-tips").parentNode.removeChild(document.querySelector(".mui-pull-bottom-tips"));
						}
						var self = this;
						setTimeout(function() {
							var ul = self.element.querySelector('.mui-table-view');
							createFragment(ul, index, orderCount, true);
							// 当刷新非默认并且出来的数量少于设置的条数时，则表示没有新数据可以刷新，停止刷新
							if(loading_count_down != 999 || loading_count_down < orderCount) {
								ul.insertBefore(createFragment(ul, index, orderCount, true), ul.firstChild);
								self.endPullDownToRefresh(true);
							} else {
								self.endPullDownToRefresh();
							}
						}, 1000);
					}
				},
				up: {
					callback: function() {
						if(document.querySelector(".mui-pull-bottom-tips")) {
							document.querySelector(".mui-pull-bottom-tips").parentNode.removeChild(document.querySelector(".mui-pull-bottom-tips"));
						}
						var self = this;
						setTimeout(function() {
							var ul = self.element.querySelector('.mui-table-view');
							createFragment(ul, index, orderCount);
							// 当加载非默认并且出来的数量少于设置的条数时，则表示没有新数据可以加载，停止加载
							if(loading_count_up != 999 || loading_count_up < orderCount) {
								ul.appendChild(createFragment(ul, index, orderCount));
								self.endPullUpToRefresh(true);
							} else {
								self.endPullUpToRefresh();
							}
						}, 1000);
					}
				}
			});
		});
		var createFragment = function(ul, index, count, reverse) {
			var tab_num = index + 1;
			//var length = ul.querySelectorAll('li').length;
			var fragment = document.createDocumentFragment();
			var recode_num = [];
			var JSONMessage;

			// 刷新或者加载时先清空原有数量，防止数据异常
			if(reverse == true) {
				loading_count_down = 999;
			} else {
				loading_count_up = 999;
			}
			// 通过选项卡的选择，访问后台数据参数的变化
			switch(tab_num) {
				case 1:
					if(reverse == true) {
						currentPage_1 = 1;
					} else {
						currentPage_1++;
						recode_num = record_1;
					}
					JSONMessage = {
						OD_STATUS: 5,
						showCount: orderCount,
						currentPage: currentPage_1
					};
					break;
				case 2:
					if(reverse == true) {
						currentPage_2 = 1;
					} else {
						currentPage_2++;
						recode_num = record_2;
					}
					JSONMessage = {
						OD_STATUS: 2,
						showCount: orderCount,
						currentPage: currentPage_2
					};

					break;
				case 3:
					if(reverse == true) {
						currentPage_3 = 1;
					} else {
						currentPage_3++;
						recode_num = record_3;
					}
					JSONMessage = {
						OD_TYPE: 2,
						showCount: orderCount,
						currentPage: currentPage_3
					};

					break;
			}
			var url = serverAddress + "/order_App/carOrder_App.do";
			mui.ajax(url, {
				data: JSONMessage,
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
				timeout: 30000, //超时时间设置为30秒；
				headers: {
					/*'Content-Type': 'application/json'*/
				},
				success: function(data) {
					//服务器返回响应，根据响应结果，分析是否登录成功；						
					if(data.success == true) {
						if(data.obj.length == 0 && document.getElementById("item" + tab_num + "_" + tab_num + "_null") != null) {
							document.getElementById("item" + tab_num + "_" + tab_num + "_null").className = "display-block";
						} else {
							for(var i = 0; i < data.obj.length; i++) {
								// 时间
								var sys_date = decodeURIComponent(data.obj[i].DATE_XIADAN);
								var json_time = date_Minutes_format(sys_date);
								data.obj[i].DATE_XIADAN = json_time;
								//起点
								var address_begin = decodeURIComponent(data.obj[i].ADDRESS_NAME_BEGIN).replace(/\+/g, " ");
								data.obj[i].ADDRESS_NAME_BEGIN = address_begin;
								//终点
								var address_end = decodeURIComponent(data.obj[i].ADDRESS_NAME_END).replace(/\+/g, " ");
								data.obj[i].ADDRESS_NAME_END = address_end;
								//车辆名称
								var car_name_n = decodeURI(data.obj[i].CAR_NAME);
								data.obj[i].CAR_NAME = car_name_n;

								// 上拉加载时用来判断当加载列表时有新数据录入导致某条数据重复出现的处理

								// 用来统计是否存在该条记录
								var count = 0;
								for(var o = 0; o < recode_num.length; o++) {
									// 循环比对是否已经加载过该条记录
									if(data.obj[i].OD_ID == recode_num[o].OD_ID) {
										count++;
									}
								}

								// 如果没有则添加到相应的tab标签下的数据模板
								if(count == 0) {
									// 若是下拉刷新则添加到数组首位显示，上拉加载时
									if(reverse == true) {
										/*recode_num.splice(0, 0, data.obj[i]);*/
										recode_num.push(data.obj[i]);
									} else {
										recode_num.push(data.obj[i]);
									}
								}
							}

							// 组合完数据返回给相应的数据模板，用以下一次请求时刷新数据
							switch(tab_num) {
								case 1:
									record_1 = recode_num;
									break;
								case 2:
									record_2 = recode_num;
									break;
								case 3:
									record_3 = recode_num;
									break;
							}

							var str = template('radio-tigan', {
								"record": recode_num
							});
							//						alert(str);
							//						document.getElementById("item" + tab_num + "_" + tab_num).innerHTML = str;
							document.querySelector(".item" + tab_num + "_" + tab_num).innerHTML = str;
							// 判断刷新还是加载
							if(reverse == true) {
								loading_count_down = data.obj.length;
							} else {
								loading_count_up = data.obj.length;
							}
						}
					}
					if(data.success == false) {
						mui.toast(data.msg);
					}
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					/*mui.toast('网络异常，请稍后再试！');*/
				}
			});

			return fragment;
		};
	});
})(mui);