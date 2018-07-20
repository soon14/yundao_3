// 默认城市
var city_name;
// 每页显示多少条
var orderCount = 5;
// 第几页默认从0开始
var currentPage = 1;
// 传递到html数据模板的object对象
var record = [];
mui.init({
	swipeBack: false,
	keyEventBind: {
		backbutton: true //打开back按键监听
	}
});
mui.plusReady(function() {
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
	city_name = localStorage.getItem('CITY_NAME');
	document.getElementById('xzqi').innerHTML = city_name; //从抢单页面获取的起点市
	document.getElementById('didian_qd').innerHTML = city_name; //从抢单页面获取的起点市
	document.getElementById('start1').innerHTML = city_name; //从抢单页面获取的起点市
	var ecityCode = document.getElementById("end1").innerText; //终点市
	currentPage = 1;
	var url = serverAddress + "/order_App/carOrder_SF_App.do";
	mui.ajax(url, {
		data: {
			ADDRESS_NAME_BEGIN: city_name,
			ADDRESS_NAME_END: ecityCode,
			OD_TYPE: 3,
			showCount: orderCount,
			currentPage: currentPage
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
				if(data.obj.length == 0) {
					document.getElementById("zanwu").className = "along-bottom display-block";
				} else {
					document.getElementById("zanwu").className = "along-bottom display-no";
					for(var i = 0; i < data.obj.length; i++) {
						// 下单时间
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
				}
				record = data.obj;
				var str = template('radio-tigan', {
					"record": record
				});
				document.getElementById("xiangqing-list").innerHTML = str;
				//点击列表内容跳转到订单详情页面
				mui(".shunfengche-list").on('tap', 'li', function(e) {
					var id = this.getAttribute("id"); //获取订单id
					mui.openWindow({
						url: "../order/order_xiangqing.html",
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
				})
			}
			if(data.success == false) {
				mui.toast(data.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast('网络异常，请稍后再试！');
		}
	});
})
var shouqi_id = document.getElementById('djsq');
mui(".djsq").on('tap', 'div', function(e) {
	var id = this.getAttribute("id");
	if(id == "djsq") { //收起
		document.getElementById("djsq").className = "display-no";
		document.getElementById("djfk").className = "display-block";
		document.getElementById("tianjia").className = "display-no";
		document.getElementById("didian").className = "didian display-block";
		document.getElementById("wrapper").className = "mui-scroll-wrapper wrapper-sh";
	} else if(id == "djfk") { //放开
		document.getElementById("djsq").className = "display-block";
		document.getElementById("djfk").className = "display-no";
		document.getElementById("tianjia").className = "display-block";
		document.getElementById("didian").className = "didian display-no";
		document.getElementById("wrapper").className = "mui-scroll-wrapper wrapper";
	}
})
mui(".mui-slider-group").on('tap', 'ul', function(e) {
	var id = this.getAttribute("id");
	var url = "../order/order_xiangqing.html";
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
})

mui(".along-top").on('tap', 'a', function(e) { // 城市选择
	if(window.plus) {
		var id = this.getAttribute("id"); //获取省市区判断是起始还是终点弹层
		console.log(id)
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
				//	top: topoffset,
				bottom: '0px',
				background: 'transparent',
				opacity: 1,
				//	mask:'rgba(0,0,0,0.5)',
				zindex: "100"
			}
		});
	} else {
		mui.toast("请在html5+引擎环境使用");
	}
})

window.addEventListener("shunfeng_baginEvent", function(event) { //起始路线
	var provinceCode = event.detail.provinceCode; //省id
	var provinceName = event.detail.provinceName; //省名称
	var cityCode = event.detail.cityCode; //市id
	var cityName = event.detail.cityName; //市名称
	var areaCode = event.detail.areaCode; //区id
	var areaName = event.detail.areaName; //区名称
	document.getElementById("xzqi").innerText = cityName; //给input赋值
	document.getElementById("didian_qd").innerText = cityName; //赋值
	document.getElementById("start1").innerText = cityName; //给span赋值为了获取省市区id
	console.log(cityName)
});
window.addEventListener("shunfeng_endEvent", function(event) { //终点路线
	var provinceCode = event.detail.provinceCode; //省id
	var provinceName = event.detail.provinceName; //省名称
	var cityCode = event.detail.cityCode; //市id
	var cityName = event.detail.cityName; //市名称
	var areaCode = event.detail.areaCode; //区id
	var areaName = event.detail.areaName; //区名称
	document.getElementById("xzzd").innerText = cityName; //给input赋值
	document.getElementById("didian_zd").innerText = cityName; //赋值
	document.getElementById("end1").innerText = cityName; //给span赋值为了获取省市区id
	console.log(cityName)
});
//点击搜索事件

document.getElementById("search").addEventListener('tap', function() {
	var bcityCode = document.getElementById("start1").innerText; //起点市
	var ecityCode = document.getElementById("end1").innerText; //终点市
	if(bcityCode == "" && ecityCode == "") {
		mui.toast('请选择起始点');
	} else {
		currentPage = 1;
		var url = serverAddress + "/order_App/carOrder_SF_App.do";
		mui.ajax(url, {
			data: {
				ADDRESS_NAME_BEGIN: bcityCode,
				ADDRESS_NAME_END: ecityCode,
				OD_TYPE: 3,
				showCount: orderCount,
				currentPage: currentPage
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
					if(data.obj.length == 0) {
						document.getElementById("zanwu").className = "along-bottom display-block";
					} else {
						document.getElementById("zanwu").className = "along-bottom display-no";
						for(var i = 0; i < data.obj.length; i++) {
							// 下单时间
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
					}
					record = data.obj;
					var str = template('radio-tigan', {
						"record": record
					});
					document.getElementById("xiangqing-list").innerHTML = str;
					//点击列表内容跳转到订单详情页面
					mui(".shunfengche-list").on('tap', 'li', function(e) {
						var id = this.getAttribute("id"); //获取订单id
						mui.openWindow({
							url: "../order/order_xiangqing.html",
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
					})
				}
				if(data.success == false) {
					mui.toast(data.msg);
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				mui.toast('网络异常，请稍后再试！');
			}
		});

	}
})
//点击列表内容跳转到订单详情页面
mui(".shunfengche-list").on('tap', 'li', function(e) {
	var id = this.getAttribute("id"); //获取订单id
	mui.openWindow({
		url: "../order/order_xiangqing.html",
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
})
// 加载个数，默认999
var loading_count_up = 999;
var loading_count_down = 999;
mui.init();
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
			var bcityCode = document.getElementById("start1").innerText; //起点市
			var ecityCode = document.getElementById("end1").innerText; //终点市
			//var length = ul.querySelectorAll('li').length;
			var fragment = document.createDocumentFragment();
			var recode_num = [];
			// 刷新或者加载时先清空原有数量，防止数据异常
			if(reverse == true) {
				loading_count_down = 999;
				currentPage = 1;
				/*recode_num = record;*/
			} else {
				loading_count_up = 999;
				currentPage++;
				recode_num = record;
			}
			if(bcityCode == "" && ecityCode == "") {

			} else {
				var url = serverAddress + "/order_App/carOrder_SF_App.do";
				mui.ajax(url, {
					data: {
						ADDRESS_NAME_BEGIN: bcityCode,
						ADDRESS_NAME_END: ecityCode,
						OD_TYPE: 3,
						showCount: orderCount,
						currentPage: currentPage
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
							if(data.obj.length == 0) {
								document.getElementById("zanwu").className = "along-bottom display-block";
							} else {
								document.getElementById("zanwu").className = "along-bottom display-no";
								for(var i = 0; i < data.obj.length; i++) {
									// 下单时间
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
								record = recode_num;
								var str = template('radio-tigan', {
									"record": recode_num
								});
								document.getElementById("xiangqing-list").innerHTML = str;
								//点击列表内容跳转到订单详情页面
								mui(".shunfengche-list").on('tap', 'li', function(e) {
									var id = this.getAttribute("id"); //获取订单id
									mui.openWindow({
										url: "../order/order_xiangqing.html",
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
								})
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
			}
			return fragment;
		};
	});
})(mui);