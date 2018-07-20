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

	var url = serverAddress + "/order_App/userAccountlistPage.do";
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
						//备注
						var beizhu = decodeURI(data.obj[i].BEIZHU);
						data.obj[i].BEIZHU = beizhu;
						// 时间
						var sys_date = decodeURIComponent(data.obj[i].SYS_DATE);
						var json_time = date_Minutes_format(sys_date);
						data.obj[i].SYS_DATE = json_time;

						record.push(data.obj[i]);
					}

				} else {
					for(var i = 0; i < data.obj.length; i++) {
						//备注
						var beizhu = decodeURI(data.obj[i].BEIZHU);
						data.obj[i].BEIZHU = beizhu;
						// 时间
						var sys_date = decodeURIComponent(data.obj[i].SYS_DATE);
						var json_time = date_Minutes_format(sys_date);
						data.obj[i].SYS_DATE = json_time;
						// 上拉加载时用来判断当加载列表时有新数据录入导致某条数据重复出现的处理

						// 用来统计是否存在该条记录
						var count = 0;
						for(var o = 0; o < record.length; o++) {
							// 循环比对是否已经加载过该条记录
							if(data.obj[i].HIS_ID == record[o].HIS_ID) {
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
				if(data.obj.length == 0) {
					document.getElementById("zanwu").className = ".mui-content bg-whf6 balance-detailed-body display-block";
				}
				//参数为true代表没有更多数据了
				mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.obj.length < 5));

				// 加载完毕后关闭等待框，并展示页面
				var currentView = plus.webview.currentWebview();
				currentView.show('slide-in-right', 200);
				plus.nativeUI.closeWaiting();
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

})
// 点击a标签跳转到明细详情页面
mui(".mui-content").on('tap', 'a', function(e) {
	var money = this.getAttribute("money"); //金额	
	var satatus = this.parentNode.getAttribute("status"); //类型	
	var time = this.getAttribute("time"); //时间	
	var order_id = this.parentNode.getAttribute("id"); //交易单号	
	var beizhu = this.getAttribute("beizhu"); //备注

	//var money = document.getElementById('qianbao_yue').innerHTML; //获取余额值，传值给余额页面
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var balance_detailed_details = plus.webview.create('../balance/balance_detailed_details.html', 'balance_detailed_details');
	//传值给详情页面，通知加载新数据
	mui.fire(balance_detailed_details, "loading", {
		MONEY_NEW: money,
		SYS_DATE_NEW: time,
		STATUS_NEW: satatus,
		OD_ID_NEW: order_id,
		BEIZHU_NEW: beizhu
	});
})

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	setTimeout(function() {
		var url = serverAddress + "/order_App/userAccountlistPage.do";
		mui.ajax(url, {
			data: {
				showCount: orderCount,
				currentPage: 0
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
						//备注
						var beizhu = decodeURI(data.obj[i].BEIZHU);
						data.obj[i].BEIZHU = beizhu;
						// 时间
						var sys_date = decodeURIComponent(data.obj[i].SYS_DATE);
						var json_time = date_Minutes_format(sys_date);
						data.obj[i].SYS_DATE = json_time;
						// 上拉加载时用来判断当加载列表时有新数据录入导致某条数据重复出现的处理

						// 用来统计是否存在该条记录
						var count = 0;
						for(var o = 0; o < record.length; o++) {
							// 循环比对是否已经加载过该条记录
							if(data.obj[i].HIS_ID == record[o].HIS_ID) {
								count++;
							}
						}
						// 如果没有则在首位添加
						if(count == 0) {
							record.splice(0, 0, data.obj[i]);
						}
					}

					var str = template('radio-tigan', {
						"record": record
					});
					document.getElementById("mui-template").innerHTML = str;

					//参数为true代表没有更多数据了
					mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.obj.length < 5));
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
				mui.toast('网络异常，请稍后再试！');
				// 加载完毕后关闭等待框，并展示页面
				var currentView = plus.webview.currentWebview();
				currentView.show('slide-in-right', 200);
				plus.nativeUI.closeWaiting();
			}
		});

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
		var url = serverAddress + "/order_App/userAccountlistPage.do";
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
							//备注
							var beizhu = decodeURI(data.obj[i].BEIZHU);
							data.obj[i].BEIZHU = beizhu;
							// 时间
							var sys_date = decodeURIComponent(data.obj[i].SYS_DATE);
							var json_time = date_Minutes_format(sys_date);
							data.obj[i].SYS_DATE = json_time;

							record.push(data.obj[i]);
						}

					} else {
						for(var i = 0; i < data.obj.length; i++) {
							//备注
							var beizhu = decodeURI(data.obj[i].BEIZHU);
							data.obj[i].BEIZHU = beizhu;
							// 时间
							var sys_date = decodeURIComponent(data.obj[i].SYS_DATE);
							var json_time = date_Minutes_format(sys_date);
							data.obj[i].SYS_DATE = json_time;
							// 上拉加载时用来判断当加载列表时有新数据录入导致某条数据重复出现的处理

							// 用来统计是否存在该条记录
							var count = 0;
							for(var o = 0; o < record.length; o++) {
								// 循环比对是否已经加载过该条记录
								if(data.obj[i].HIS_ID == record[o].HIS_ID) {
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

					//参数为true代表没有更多数据了
					mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.obj.length < 5));

					// 加载完毕后关闭等待框，并展示页面
					var currentView = plus.webview.currentWebview();
					currentView.show('slide-in-right', 200);
					plus.nativeUI.closeWaiting();
				}
				if(data.success == false) {
					mui.toast(data.msg);
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				mui.toast('网络异常，请稍后再试！');
				// 加载完毕后关闭等待框，并展示页面
				var currentView = plus.webview.currentWebview();
				currentView.show('slide-in-right', 200);
				plus.nativeUI.closeWaiting();
			}
		});
	}, 1000);
	currentPage++;
}