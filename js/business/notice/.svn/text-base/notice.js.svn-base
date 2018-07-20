// 首页通知角标未读个数
var count_tongzhi = 0;
// 每页显示多少条
var orderCount = 5;
// 第几页默认从0开始
var currentPage = 1;
// 传递到html数据模板的object对象
var record = [];
mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			height: 50, //可选,默认50.触发下拉刷新拖动距离,
			auto: false, //可选,默认false.自动下拉刷新一次
			contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
			callback: pulldownRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		},
		up: {
			height: 50, //可选.默认50.触发上拉加载拖动距离
			auto: false, //可选,默认false.自动上拉加载一次
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: pullupRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	},
	// 回退监听
	beforeback: function() {
		//返回true，继续页面关闭逻辑  
		mui.back;
		return true;
	}
});

mui.plusReady(function() {
	var token = localStorage.getItem('TOKEN');
	var url = serverAddress + "/notice/listNotice_App.do";
	if(token != null) {
		mui.ajax(url, {
			data: {
				showCount: orderCount,
				currentPage: currentPage
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

					// 首次加载时
					if(record.length == 0) {
						for(var i = 0; i < data.obj.length; i++) {
							// 标题
							data.obj[i].TITLE = decodeURI(data.obj[i].TITLE);
							// 内容
							data.obj[i].CONTENT = decodeURI(data.obj[i].CONTENT);
							// 时间
							var sys_date = decodeURIComponent(data.obj[i].SYS_DATE);
							var json_time = date_Minutes_format(sys_date);
							data.obj[i].SYS_DATE = json_time;
							// 是否已读
							if(data.obj[i].READ_STATUS != 1) {
								count_tongzhi += 1;
							}
							record.push(data.obj[i]);
						}

					} else {
						for(var i = 0; i < data.obj.length; i++) {
							// 标题
							data.obj[i].TITLE = decodeURI(data.obj[i].TITLE);
							// 内容
							data.obj[i].CONTENT = decodeURI(data.obj[i].CONTENT);
							// 时间
							var sys_date = decodeURIComponent(data.obj[i].SYS_DATE);
							var json_time = date_Minutes_format(sys_date);
							data.obj[i].SYS_DATE = json_time;
							// 是否已读
							if(data.obj[i].READ_STATUS != 1) {
								count_tongzhi += 1;
							}
							// 上拉加载时用来判断当加载列表时有新数据录入导致某条数据重复出现的处理

							// 用来统计是否存在该条记录
							var count = 0;
							for(var o = 0; o < record.length; o++) {
								// 循环比对是否已经加载过该条记录
								if(data.obj[i].NOTICE_ID == record[o].NOTICE_ID) {
									count++;
								}
							}
							// 如果没有则添加
							if(count == 0) {
								record.push(data.obj[i]);
							}
						}
					}
					var str = template('radio-tigan', {
						"record": record
					});
					document.getElementById("mui-template").innerHTML = str;
					var list = plus.webview.currentWebview().opener();
					//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
					mui.fire(list, 'refresh', {
						count: count_tongzhi
					});

					//参数为true代表没有更多数据了
					mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.obj.length < 2));
				}
				if(data.success == false) {
					mui.toast(data.msg);
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//				mui.toast('网络异常，请稍后再试！');
				document.getElementById("item4_4_null").className = "display-block";
			}
		});
	} else {
		document.getElementById("item4_4_null").className = "display-block";
		document.querySelector(".mui-card").style = "box-shadow:none;";
	}
	var backButtonPress = 0;
	var _back = mui.back;
	mui.back = function(flag) {
		if(flag) {
			_back();
		} else {
			backButtonPress++;
			if(backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 1000);
			return;
		}
	}
})
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	record = [];
	currentPage = 1;
	count_tongzhi = 0;
	setTimeout(function() {
		var token = localStorage.getItem('TOKEN');
		var url = serverAddress + "/notice/listNotice_App.do";
		if(token != null) {
			mui.ajax(url, {
				data: {
					showCount: orderCount,
					currentPage: currentPage
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
						// 用来统计是否存在该条记录
						var count = 0;
						// 添加的条数
						var add_count = 0;
						for(var i = 0; i < data.obj.length; i++) {
							// 标题
							data.obj[i].TITLE = decodeURI(data.obj[i].TITLE);
							// 内容
							data.obj[i].CONTENT = decodeURI(data.obj[i].CONTENT);
							// 时间
							var sys_date = decodeURIComponent(data.obj[i].SYS_DATE);
							var json_time = date_Minutes_format(sys_date);
							data.obj[i].SYS_DATE = json_time;
							// 是否已读
							if(data.obj[i].READ_STATUS != 1) {
								count_tongzhi += 1;
							}
							// 上拉加载时用来判断当加载列表时有新数据录入导致某条数据重复出现的处理

							for(var o = 0; o < record.length; o++) {
								// 循环比对是否已经加载过该条记录
								if(data.obj[i].NOTICE_ID == record[o].NOTICE_ID) {
									count++;
								}
							}
							// 如果没有则添加
							if(count == 0) {
								/*record.splice(0, 0, data.obj[i]);*/
								record.push(data.obj[i]);
							}
						}
						var str = template('radio-tigan', {
							"record": record
						});
						document.getElementById("mui-template").innerHTML = str;
						var list = plus.webview.currentWebview().opener();
						//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
						mui.fire(list, 'refresh', {
							count: count_tongzhi
						});

						//参数为true代表没有更多数据了
						mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.obj.length < 2));
					}
					if(data.success == false) {
						mui.toast(data.msg);
					}
					// 加载完毕后关闭等待框，并展示页面
					var currentView = plus.webview.currentWebview();
					currentView.show('slide-in-right', 200);
					plus.nativeUI.closeWaiting();
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					/*mui.toast('网络异常，请稍后再试！');*/
				}
			});
		}
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1000);
}

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	setTimeout(function() {
		var token = localStorage.getItem('TOKEN');
		var url = serverAddress + "/notice/listNotice_App.do";
		if(token != null) {
			mui.ajax(url, {
				data: {
					showCount: orderCount,
					currentPage: currentPage
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

						// 首次加载时
						if(record.length == 0) {
							for(var i = 0; i < data.obj.length; i++) {
								// 标题
								data.obj[i].TITLE = decodeURI(data.obj[i].TITLE);
								// 内容
								data.obj[i].CONTENT = decodeURI(data.obj[i].CONTENT);
								// 时间
								var sys_date = decodeURIComponent(data.obj[i].SYS_DATE);
								var json_time = date_Minutes_format(sys_date);
								data.obj[i].SYS_DATE = json_time;
								// 是否已读
								if(data.obj[i].READ_STATUS != 1) {
									count_tongzhi += 1;
								}
								record.push(data.obj[i]);
							}

						} else {
							for(var i = 0; i < data.obj.length; i++) {
								// 标题
								data.obj[i].TITLE = decodeURI(data.obj[i].TITLE);
								// 内容
								data.obj[i].CONTENT = decodeURI(data.obj[i].CONTENT);
								// 时间
								var sys_date = decodeURIComponent(data.obj[i].SYS_DATE);
								var json_time = date_Minutes_format(sys_date);
								data.obj[i].SYS_DATE = json_time;
								// 是否已读
								if(data.obj[i].READ_STATUS != 1) {
									count_tongzhi += 1;
								}
								// 上拉加载时用来判断当加载列表时有新数据录入导致某条数据重复出现的处理

								// 用来统计是否存在该条记录
								var count = 0;
								for(var o = 0; o < record.length; o++) {
									// 循环比对是否已经加载过该条记录
									if(data.obj[i].NOTICE_ID == record[o].NOTICE_ID) {
										count++;
									}
								}
								// 如果没有则添加
								if(count == 0) {
									record.push(data.obj[i]);
								}
							}
						}
						var str = template('radio-tigan', {
							"record": record
						});
						document.getElementById("mui-template").innerHTML = str;
						var list = plus.webview.currentWebview().opener();
						//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
						mui.fire(list, 'refresh', {
							count: count_tongzhi
						});

						//参数为true代表没有更多数据了
						mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.obj.length < 2));
					}
					if(data.success == false) {
						mui.toast(data.msg);
					}
					// 加载完毕后关闭等待框，并展示页面
					var currentView = plus.webview.currentWebview();
					currentView.show('slide-in-right', 200);
					plus.nativeUI.closeWaiting();
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					/*mui.toast('网络异常，请稍后再试！');*/
				}
			});
		}
	}, 1000);
	currentPage++;

}

// 点击通知列表查看详情
mui(".mui-content").on('tap', 'a', function(e) {
	//获取a标签id--即通告id
	var id = this.getAttribute("id");
	//获取a标签name--用来存放是否已读
	var read_status = this.getAttribute("name");
	// 点击之后修改图标为已读图标
	var image_readed = document.getElementById(id).getElementsByTagName("img")[0];
	image_readed.src = "../../image/tz_02.png";
	mui.openWindow({
		url: '../notice/notice_detail.html',
		id: 'notice_detail',
		extras: {
			NOTICE_ID: id,
			READ_STATUS: read_status
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

// 刷新首页通知未读角标
window.addEventListener('refresh', function(e) {
	//获得列表界面的webview  
	var list = plus.webview.currentWebview().opener();
	//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
	list.addEventListener('loaded', function() {
		mui.fire(list, "refresh", {
			count: count_tongzhi
		});
	});

	//返回true，继续页面关闭逻辑  
	return true;
});