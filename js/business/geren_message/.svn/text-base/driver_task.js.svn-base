// 订单数量
var od_number = '';
// 今日订单数量
var order_number_day = '';
// 成长任务领取次数
var task_number;
// 每日任务领取次数
var task_number_day;

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

	od_number = localStorage.getItem("TASK_NUMBER_ALL");
	order_number_day = localStorage.getItem("TASK_NUMBER_DAY");

	var url = serverAddress + "/order_App/taskCount_App.do";
	mui.ajax(url, {
		data: {
			//			REG_CODE: reg_code
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
				// 成长任务数量统计
				task_number = data.obj[0].TASK_NUMBER;
				//				document.getElementById('od_number').innerHTML = od_number;
				// 每日任务数量统计
				task_number_day = data.obj[0].TASK_NUMBER_DAY;
				document.getElementById('od_number_day').innerHTML = od_number_day;
				refresh_tuijianma(1);
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
			// 加载完毕后关闭等待框，并展示页面
			var currentView = plus.webview.currentWebview();
			currentView.show('slide-in-right', 200);
			plus.nativeUI.closeWaiting();
		}
	});
});

// 刷新页面
window.addEventListener('refresh', function(e) {
	//获得列表界面的webview  
	var list = plus.webview.currentWebview().opener();
	//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
	mui.fire(list, 'refresh');
	//返回true，继续页面关闭逻辑  
	return true;
});

// 领取成长任务奖励
document.getElementById("lingqu_growup").addEventListener("tap", function() {

	// 是否隐藏
	var growup_true = document.getElementById('jiangli_growup_2').hidden;
	// 灰色领取奖励图标不可点击
	if(growup_true == false) {
		var waiting = plus.nativeUI.showWaiting();
		// 退出登录时不允许领取
		var token = localStorage.getItem('TOKEN');
		if(token != null) {
			var url = serverAddress + "/order_App/order_Car_GroupTask_App.do";
			mui.ajax(url, {
				data: {
					"MONEY": document.getElementById("growaward").innerHTML,
					"STATUS_TASK": 7
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
						// 刷新成长任务列表
						getNewProgress();
						var wode = plus.webview.getWebviewById("view/geren_message/wode.html");
						wode.reload(true);

					}
					if(data.success == false) {
						plus.nativeUI.closeWaiting();
						mui.toast(decodeURI(data.msg));
					}
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					/*mui.toast('网络异常，请稍后再试！');*/
					plus.nativeUI.closeWaiting();
				}
			});
		} else {
			mui.toast('请登录后再进行领取');
			plus.nativeUI.closeWaiting();
		}
	}
});

function getNewProgress() {
	var url = serverAddress + "/order_App/taskCount_App.do";
	mui.ajax(url, {
		data: {
			//			REG_CODE: reg_code
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
				// 成长任务数量统计
				task_number = data.obj[0].TASK_NUMBER;
				refresh_tuijianma(2);
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
			// 加载完毕后关闭等待框，并展示页面
			var currentView = plus.webview.currentWebview();
			currentView.show('slide-in-right', 200);
			plus.nativeUI.closeWaiting();
		}
	});
}

// 领取每日任务奖励
document.getElementById("lingqu_day").addEventListener("tap", function() {

	// 是否隐藏
	var day_true = document.getElementById('jiangli_day_2').hidden;
	// 灰色领取奖励图标不可点击
	if(day_true == false) {
		var url = serverAddress + "/order_App/order_Car_GroupTask_App.do";
		// 退出登录时不允许领取
		var waiting = plus.nativeUI.showWaiting();
		var token = localStorage.getItem('TOKEN');

		if(token != null) {
			mui.ajax(url, {
				data: {
					"MONEY": 6,
					"STATUS_TASK": 8
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
						// 刷新每日任务列表
						task_number_day = "1";
						refresh_tuijianma(1);
						plus.nativeUI.closeWaiting();
						var wode = plus.webview.getWebviewById("view/geren_message/wode.html");
						wode.reload(true);
					}
					if(data.success == false) {
						mui.toast(decodeURI(data.msg));
						plus.nativeUI.closeWaiting();
					}
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					/*mui.toast('网络异常，请稍后再试！');*/
					plus.nativeUI.closeWaiting();
				}
			});
		} else {
			mui.toast('请登录后再进行领取');
			plus.nativeUI.closeWaiting();
		}
	}

});

function refresh_tuijianma(status) {

	// statsus = 1 是页面加载时，status = 2 是领取成长任务后
	//每日任务
	if(status == 1) {
		if(task_number_day >= "1") {
			document.getElementById("od_number_day").innerHTML = 1;
			document.getElementById('jiangli_day_1').hidden = 'hidden';
			document.getElementById('jiangli_day_2').hidden = 'hidden';
			document.getElementById('jiangli_day_3').hidden = '';
		} else if(task_number_day == "0") {
			if(order_number_day == 0) {
				document.getElementById("od_number_day").innerHTML = 0;
				document.getElementById('jiangli_day_1').hidden = '';
				document.getElementById('jiangli_day_2').hidden = 'hidden';
				document.getElementById('jiangli_day_3').hidden = 'hidden';
			} else if(order_number_day >= 1) {
				document.getElementById("od_number_day").innerHTML = 1;
				document.getElementById('jiangli_day_1').hidden = 'hidden';
				document.getElementById('jiangli_day_2').hidden = '';
				document.getElementById('jiangli_day_3').hidden = 'hidden';
			}
		}
	} else if(status == 2) {
		if(task_number_day >= "1") {
			document.getElementById("od_number_day").innerHTML = 1;
			document.getElementById('jiangli_day_1').hidden = 'hidden';
			document.getElementById('jiangli_day_2').hidden = 'hidden';
			document.getElementById('jiangli_day_3').hidden = '';
		}
	}

	//成长任务
	var no = parseInt(od_number);

	//	document.getElementById('jiangli_growup_1').hidden = '';
	//	document.getElementById('jiangli_growup_2').hidden = 'hidden';
	//	if(no == 1 || no == 5 || no == 20 || no == 50 || no == 100 || no == 500) {
	//		if(status == 1) {
	//			document.getElementById('jiangli_growup_1').hidden = 'hidden';
	//			document.getElementById('jiangli_growup_2').hidden = '';
	//		} else if(status == 2) {
	//			document.getElementById('jiangli_growup_1').hidden = '';
	//			document.getElementById('jiangli_growup_2').hidden = 'hidden';
	//			no++;
	//		}
	//	}
	if(task_number == 0) {
		document.getElementById("od_number_next").innerHTML = 1;
		document.getElementById("finish").innerHTML = "完成1单";
		document.getElementById("growaward").innerHTML = "5";
		document.getElementById("od_number").innerHTML = no <= 1 ? no : 1;
	} else if(task_number == 1) {
		document.getElementById("od_number_next").innerHTML = 5;
		document.getElementById("finish").innerHTML = "完成5单";
		document.getElementById("growaward").innerHTML = "10";
		document.getElementById("od_number").innerHTML = no <= 5 ? no : 5;
	} else if(task_number == 2) {
		document.getElementById("od_number_next").innerHTML = 20;
		document.getElementById("finish").innerHTML = "完成20单";
		document.getElementById("growaward").innerHTML = "20";
		document.getElementById("od_number").innerHTML = no <= 20 ? no : 20;
	} else if(task_number == 3) {
		document.getElementById("od_number_next").innerHTML = 50;
		document.getElementById("finish").innerHTML = "完成50单";
		document.getElementById("growaward").innerHTML = "50";
		document.getElementById("od_number").innerHTML = no <= 50 ? no : 50;
	} else if(task_number == 4) {
		document.getElementById("od_number_next").innerHTML = 100;
		document.getElementById("finish").innerHTML = "完成100单";
		document.getElementById("growaward").innerHTML = "80";
		document.getElementById("od_number").innerHTML = no <= 100 ? no : 100;
	} else if(task_number == 5) {
		document.getElementById("od_number_next").innerHTML = 500;
		document.getElementById("finish").innerHTML = "完成500单";
		document.getElementById("growaward").innerHTML = "100";
		document.getElementById("od_number").innerHTML = no <= 500 ? no : 500;
	}
	if(document.getElementById("od_number_next").innerHTML == document.getElementById("od_number").innerHTML) {
		document.getElementById('jiangli_growup_1').hidden = 'hidden';
		document.getElementById('jiangli_growup_2').hidden = '';
	} else {
		document.getElementById('jiangli_growup_1').hidden = '';
		document.getElementById('jiangli_growup_2').hidden = 'hidden';
	}

}