// 成长任务完成数量
var od_number = '';
// 每日任务完成数量
var od_number_day = '';

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

	// 我的推荐码
	var reg_code = localStorage.getItem('REG_CODE') == null ? "0" : localStorage.getItem('REG_CODE');

	var url = serverAddress + "/order_App/taskProgress_App.do";
	mui.ajax(url, {
		data: {
			REG_CODE: reg_code
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
				od_number = data.obj[0].OD_NUMBER;
				document.getElementById('od_number').innerHTML = od_number;
				// 每日任务数量统计
				od_number_day = data.obj[0].OD_NUMBER_DAY;
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
			//异常处理；
			/*mui.toast('网络异常，请稍后再试！');*/
			document.getElementById('od_number_day').innerHTML = 0;
			document.getElementById('od_number').innerHTML = 0;
			document.getElementById('od_number_next').innerHTML = 1;
			document.getElementById('od_number_next_2').innerHTML = 1;
			document.getElementById('jiangli_content').innerHTML = '全平台通用满30减5优惠券1张';
			/*document.getElementById('jiangli_growup').src = '../../image/lqjl2.png';
			document.getElementById('jiangli_day').src = '../../image/lqjl2.png';*/
			// 加载完毕后关闭等待框，并展示页面
			var currentView = plus.webview.currentWebview();
			currentView.show('slide-in-right', 200);
			plus.nativeUI.closeWaiting();
		}
	});
});

// 接收wode页面中传递过来的个人信息
window.addEventListener('tuijian', function(event) {
	// 我的推荐码
	var reg_code = event.detail.REG_CODE;
	// 别人的推荐码
	var offer_code = event.detail.OFFER_CODE;
	if(offer_code != 0) {
		document.getElementById('offer_code').readOnly = 'readOnly';
		document.getElementById('offer_code').value = offer_code;
	}
	document.getElementById('reg_code').value = reg_code;
});

// 跳转填写我的推荐人推荐码
document.getElementById("offer_code").addEventListener("tap", function() {

	var offer_code = localStorage.getItem('OFFER_CODE') == null ? "0" : localStorage.getItem('OFFER_CODE');
	if(offer_code == 0) {
		// 设定等待动画框，新页面加载完毕后再显示
		var nwaiting = plus.nativeUI.showWaiting();
		var webviewShow = plus.webview.create('recommend-input.html', 'recommend-input');
		var offer_code_input = plus.webview.getWebviewById('recommend-input');
	}
});

// 刷新页面
window.addEventListener('refresh', function(e) {
	var offer_code = localStorage.getItem('OFFER_CODE') == null ? "0" : localStorage.getItem('OFFER_CODE');
	document.getElementById('offer_code').value = offer_code;
	//获得列表界面的webview  
	var list = plus.webview.currentWebview().opener();
	//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
	mui.fire(list, 'refresh');
	//返回true，继续页面关闭逻辑  
	return true;
});

// 领取成长任务奖励
document.getElementById("lingqu_growup").addEventListener("tap", function() {

	// 满50减10成长任务领取张数
	var validate_c5010 = localStorage.getItem('VALIDATE_C5010') == null ? "0" : localStorage.getItem('VALIDATE_C5010');
	// 满30减5成长任务领取张数
	var validate_c305 = localStorage.getItem('VALIDATE_C305') == null ? "0" : localStorage.getItem('VALIDATE_C305');
	// 满50减5每日任务领取张数
	var validate_c505 = localStorage.getItem('VALIDATE_C505') == null ? "0" : localStorage.getItem('VALIDATE_C505');
	// 发放优惠卷的张数
	var times = "";
	// 305就是三十减五，5010就是五十减十，详见文档
	var type = "";

	/* 根据优惠卷领取张数判断成长任务领取进度
		成长任务：
		序号 任务内容 奖励
		1 成功推荐1人下单或接单（ 累计） 全平台通用满30减5优惠券1张
		2 成功推荐3人下单或接单（ 累计） 全平台通用满30减5优惠券3张
		3 成功推荐5人下单或接单（ 累计） 全平台通用满50减10优惠券1张
		4 成功推荐10人下单或接单（ 累计） 全平台通用满50减10优惠券3张
		5 成功推荐20人下单或接单（ 累计） 全平台通用满50减10优惠券5张
		每日任务：
		序号 任务内容 奖励
		1 成功推荐1人下单或接单 全平台通用满50减5优惠券1张1张
	*/

	switch(true) {
		case(validate_c305 == 0):
			times = "1";
			type = "305";
			break;
		case(validate_c305 == 1):
			times = "3";
			type = "305";
			break;
		case((validate_c305 == 4) && (validate_c5010 == 0)):
			times = "1";
			type = "5010";
			break;
		case((validate_c305 == 4) && (validate_c5010 == 1)):
			times = "3";
			type = "5010";
			break;
		case((validate_c305 == 4) && (validate_c5010 == 4)):
			times = "5";
			type = "5010";
			break;
	}
	// 是否隐藏
	var growup_true = document.getElementById('jiangli_growup_2').hidden;
	// 灰色领取奖励图标不可点击
	if(growup_true == false && (times != "" && type != "")) {
		// 退出登录时不允许领取
		var token = localStorage.getItem('TOKEN');
		if(token != null) {
			var waiting = plus.nativeUI.showWaiting();
			var url = serverAddress + "/portal/taskGrowup.do";
			mui.ajax(url, {
				data: {
					times: times,
					type: type
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
						// 刷新父页面列表
						var list = plus.webview.currentWebview().opener();
						//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
						mui.fire(list, 'refresh');

						switch(type) {
							case '305':

								localStorage.setItem('VALIDATE_C305', (Number(validate_c305) + Number(times)).toString());
								break;
							case '5010':
								localStorage.setItem('VALIDATE_C5010', (Number(validate_c5010) + Number(times)).toString());
								break;
						}
						// 刷新成长任务列表
						refresh_tuijianma(2);
						plus.nativeUI.closeWaiting();

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
		}
	}
});

// 领取每日任务奖励
document.getElementById("lingqu_day").addEventListener("tap", function() {

	// 是否隐藏
	var day_true = document.getElementById('jiangli_day_2').hidden;
	// 灰色领取奖励图标不可点击
	if(day_true == false) {
		var url = serverAddress + "/portal/taskDaily.do";
		// 退出登录时不允许领取
		var token = localStorage.getItem('TOKEN');
		if(token != null) {
			var waiting = plus.nativeUI.showWaiting();
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
						// 刷新父页面列表
						var list = plus.webview.currentWebview().opener();
						//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
						mui.fire(list, 'refresh');
						localStorage.setItem('VALIDATE_C505', 1);
						// 刷新每日任务列表
						refresh_tuijianma(1);
						plus.nativeUI.closeWaiting();
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
		}
	}

});

function refresh_tuijianma(status) {
	// 满50减10成长任务领取张数
	var validate_c5010 = localStorage.getItem('VALIDATE_C5010') == null ? "0" : localStorage.getItem('VALIDATE_C5010');
	// 满30减5成长任务领取张数
	var validate_c305 = localStorage.getItem('VALIDATE_C305') == null ? "0" : localStorage.getItem('VALIDATE_C305');
	// 满50减5每日任务领取张数
	var validate_c505 = localStorage.getItem('VALIDATE_C505') == null ? "0" : localStorage.getItem('VALIDATE_C505');

	// statsus = 1 是页面加载时，status = 2 是领取成长任务后
	if(status == 1 || status == 2) {

		/* 根据优惠卷领取张数判断成长任务领取进度
			成长任务：
			序号 任务内容 奖励
			1 成功推荐1人下单或接单（ 累计） 全平台通用满30减5优惠券1张
			2 成功推荐3人下单或接单（ 累计） 全平台通用满30减5优惠券3张
			3 成功推荐5人下单或接单（ 累计） 全平台通用满50减10优惠券1张
			4 成功推荐10人下单或接单（ 累计） 全平台通用满50减10优惠券3张
			5 成功推荐20人下单或接单（ 累计） 全平台通用满50减10优惠券5张
			每日任务：
			序号 任务内容 奖励
			1 成功推荐1人下单或接单 全平台通用满50减5优惠券1张1张
		*/

		switch(true) {
			case(validate_c305 == 0):
				document.getElementById('od_number_next').innerHTML = '1';
				document.getElementById('od_number_next_2').innerHTML = '1';
				document.getElementById('jiangli_content').innerHTML = '奖励：全平台通用满30减5优惠券1张';
				if(od_number >= 1) {
					document.getElementById('jiangli_growup_1').hidden = 'hidden';
					document.getElementById('jiangli_growup_2').hidden = '';
				} else {
					document.getElementById('jiangli_growup_1').hidden = '';
					document.getElementById('jiangli_growup_2').hidden = 'hidden';
				}
				break;
			case(validate_c305 == 1):
				document.getElementById('od_number_next').innerHTML = '3';
				document.getElementById('od_number_next_2').innerHTML = '3';
				document.getElementById('jiangli_content').innerHTML = '奖励：全平台通用满30减5优惠券3张';
				if(od_number >= 3) {
					document.getElementById('jiangli_growup_1').hidden = 'hidden';
					document.getElementById('jiangli_growup_2').hidden = '';
				} else {
					document.getElementById('jiangli_growup_1').hidden = '';
					document.getElementById('jiangli_growup_2').hidden = 'hidden';
				}
				break;
			case((validate_c305 == 4) && (validate_c5010 == 0)):
				document.getElementById('od_number_next').innerHTML = '5';
				document.getElementById('od_number_next_2').innerHTML = '5';
				document.getElementById('jiangli_content').innerHTML = '奖励：全平台通用满50减10优惠券1张';
				if(od_number >= 5) {
					document.getElementById('jiangli_growup_1').hidden = 'hidden';
					document.getElementById('jiangli_growup_2').hidden = '';
				} else {
					document.getElementById('jiangli_growup_1').hidden = '';
					document.getElementById('jiangli_growup_2').hidden = 'hidden';
				}
				break;
			case((validate_c305 == 4) && (validate_c5010 == 1)):
				document.getElementById('od_number_next').innerHTML = '10';
				document.getElementById('od_number_next_2').innerHTML = '10';
				document.getElementById('jiangli_content').innerHTML = '奖励：全平台通用满50减10优惠券3张';
				if(od_number >= 10) {
					document.getElementById('jiangli_growup_1').hidden = 'hidden';
					document.getElementById('jiangli_growup_2').hidden = '';
				} else {
					document.getElementById('jiangli_growup_1').hidden = '';
					document.getElementById('jiangli_growup_2').hidden = 'hidden';
				}
				break;
			case((validate_c305 == 4) && (validate_c5010 == 4)):
				document.getElementById('od_number_next').innerHTML = '20';
				document.getElementById('od_number_next_2').innerHTML = '20';
				document.getElementById('jiangli_content').innerHTML = '奖励：全平台通用满50减10优惠券5张';
				if(od_number >= 20) {
					document.getElementById('jiangli_growup_1').hidden = 'hidden';
					document.getElementById('jiangli_growup_2').hidden = '';
				} else {
					document.getElementById('jiangli_growup_1').hidden = '';
					document.getElementById('jiangli_growup_2').hidden = 'hidden';
				}
				break;
			case((validate_c305 >= 4) && (validate_c5010 >= 9)):
				document.getElementById('od_number_next').innerHTML = '20';
				document.getElementById('od_number_next_2').innerHTML = '20';
				document.getElementById('jiangli_growup_1').hidden = 'hidden';
				document.getElementById('jiangli_growup_2').hidden = 'hidden';
				document.getElementById('jiangli_growup_3').hidden = '';
				document.getElementById('jiangli_content').innerHTML = '奖励：全平台通用满50减10优惠券5张';
				break;
		}

	}
	if(status == 1) {
		switch(true) {
			case(validate_c505 == 0):
				if(od_number_day >= 1) {
					document.getElementById('jiangli_day_1').hidden = 'hidden';
					document.getElementById('jiangli_day_2').hidden = '';
				} else {
					document.getElementById('jiangli_day_1').hidden = '';
					document.getElementById('jiangli_day_2').hidden = 'hidden';
				}
				break;
			case(validate_c505 == 1):
				document.getElementById('jiangli_day_1').hidden = 'hidden';
				document.getElementById('jiangli_day_2').hidden = 'hidden';
				document.getElementById('jiangli_day_3').hidden = '';
				break;
		}

	}
}