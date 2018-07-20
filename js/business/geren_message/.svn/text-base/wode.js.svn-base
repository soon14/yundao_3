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
var innerXingXing="";
mui.plusReady(function() {
	var url = serverAddress + "/order_App/queryUser_Info_App.do";
	var token = localStorage.getItem('TOKEN');
	if(token != null) {
		document.getElementById("exit_id").style.display = 'block';
		document.getElementById("login_id").style.display = 'none';
	} else {
		document.getElementById("exit_id").style.display = 'none';
		document.getElementById("login_id").style.display = 'block';
	}
	mui.ajax(url, {
		data: {
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
				// 头像base64编码
				var image = data.obj[0].IMAGE;
				if(image != null && image != '') {
					// 头像base64编码存入缓存
					localStorage.setItem('HEAD_PHOTO', image);
					// 头像图片base64编码转为图片
					document.getElementById('head-img').src = 'data:image/png;base64,' + image;
				} else {
					var head_photo = localStorage.getItem('HEAD_PHOTO');
					// 读取缓存图片
					if(head_photo != null) {
						document.getElementById('head-img').src = 'data:image/png;base64,' + head_photo;
					} else {
						// 默认头像图片
						document.getElementById('head-img').src = '../../image/touxiang.png';
					}

				}
				// 电话
				//document.getElementById('phone').innerHTML = localStorage.getItem('PHONE');
				// 姓名
				var name = decodeURI(data.obj[0].NAME);
				if(name != '0') {
					// 个人姓名存入缓存
					localStorage.setItem('GEREN_NAME', name);
					document.getElementById('geren_name').innerHTML = localStorage.getItem('GEREN_NAME');
				} else {
					// 默认个人姓名
					document.getElementById('geren_name').innerHTML = '佚名';
				}
				// 性别
				var sex = data.obj[0].SEX;
				if(sex != '0') {
					// 性别存入缓存
					sex = sex == '1' ? "男" : '女';
					localStorage.setItem('SEX', sex);
				}
				// 个性签名
				var sign_name = decodeURI(data.obj[0].SIGN_NAME);
				if(sign_name != '0') {
					// 个人姓名存入缓存
					localStorage.setItem('SIGN_NAME', sign_name);
				}

				// 我的余额
//				var account_yue = data.obj[0].ACCOUNT_YUE;
//				account_yue = '￥' + account_yue;
//				document.getElementById('qianbao_yue').innerHTML = account_yue;
				// 我的优惠卷
//				document.getElementById('count_coupon').innerHTML = data.obj[0].COUNT_COUPON + '张';
				// 积分
//				document.getElementById('totalscore').innerHTML = data.obj[0].TOTALSCORE + '积分';
//				localStorage.setItem('JIFEN', data.obj[0].TOTALSCORE);
				// 我的推荐码
				var reg_code = data.obj[0].REG_CODE;
				localStorage.setItem('REG_CODE', reg_code);
				// 别人的推荐码
				var offer_code = data.obj[0].OFFER_CODE;
				localStorage.setItem('OFFER_CODE', offer_code);

				// 满50减10成长任务领取张数
				var validate_c5010 = data.obj[0].VALIDATE_C5010;
				localStorage.setItem('VALIDATE_C5010', validate_c5010);
				// 满30减5成长任务领取张数
				var validate_c305 = data.obj[0].VALIDATE_C305;
				localStorage.setItem('VALIDATE_C305', validate_c305);
				// 满50减5每日任务领取张数
				var validate_c505 = data.obj[0].VALIDATE_C505;
				localStorage.setItem('VALIDATE_C505', validate_c505);
				// 当前用户状态
				var user_status = data.obj[0].USER_STATUS;
				localStorage.setItem('USER_STATUS', user_status);
				// 当前用户接单范围
				var range = data.obj[0].RANGE;
				localStorage.setItem('RANGE', range);
				
				// 今日完成
				document.getElementById('od_number_day').innerHTML = data.obj[0].OD_NUMBER_DAY;
				// 本月完成
				document.getElementById('od_number_month').innerHTML = data.obj[0].OD_NUMBER_MONTH;
				// 本月收入
				document.getElementById('money_month').innerHTML = data.obj[0].MONEY_MONTH;
				// 总体评分
				document.getElementById('score').innerHTML = data.obj[0].SCORE;
				
				for(var i=1;i<=data.obj[0].SCORE;i++){
					innerXingXing+="<i data-index='"+i+"' class='xingxing'><img src='../../image/wode/xingxing.png'></i>"
				}
				//含有小数
				//console.log((data.obj[0].SCORE.toString()).indexOf(".")!=-1);
				if((data.obj[0].SCORE.toString()).indexOf(".")!=-1){
					innerXingXing+="<i data-index='"+i+"' class='xingxing'><img src='../../image/wode/xingxingBan.png'></i>";
				}
				//console.log(innerXingXing);
				(innerXingXing)?innerXingXing=innerXingXing:innerXingXing="<i data-index='"+i+"' class='xingxing'><img src='../../image/wode/xingxingBan.png'></i>"
				document.getElementById("xingxing").innerHTML=innerXingXing;
				
				var totalscore = data.obj[0].TOTALSCORE;
				// 根据积分查询所属会员、会员vip图标、还有多少积分可以升级
				switch(true) {

					case(1000 > totalscore >= 0):
						document.getElementById('totalscore_name').innerHTML = '普通司机';
						break;

					case(3000 > totalscore >= 1000):
						document.getElementById('totalscore_name').innerHTML = '铜牌司机';
						break;

					case(10000 > totalscore >= 3000):
						document.getElementById('totalscore_name').innerHTML = '银牌司机';
						break;

					case(30000 > totalscore >= 10000):
						document.getElementById('totalscore_name').innerHTML = '金牌司机';
						break;
					case(100000 > totalscore >= 30000):
						document.getElementById('totalscore_name').innerHTML = '铂金司机';
						break;
					case(totalscore >= 100000):
						document.getElementById('totalscore_name').innerHTML = '钻石司机';
						break;
				}

				// 今日完成订单数量
				var order_number_day = data.obj[0].OD_NUMBER_DAY;
				localStorage.setItem('TASK_NUMBER_DAY',order_number_day);
				// 全部完成订单数量
				var order_number_all = data.obj[0].OD_NUMBER_ALL;
				localStorage.setItem('TASK_NUMBER_ALL', order_number_all);

				// 是否设置了提现密码
				var fee_password = data.obj[0].FEE_PASSWORD;
				localStorage.setItem('FEE_PASSWORD', fee_password);

			}
			if(data.success == false) {
				mui.toast(decodeURI(data.msg));
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			/*mui.toast('网络异常，请稍后再试！');*/
		}
	});

});

// 个人信息
document.getElementById("geren_message").addEventListener('tap', function() {
	// 从缓存中读取个人信息，并将缓存信息传递给个人信息页面
	var head_photo = localStorage.getItem('HEAD_PHOTO') == null ? "" : localStorage.getItem('HEAD_PHOTO');
	var geren_name = localStorage.getItem('GEREN_NAME') == null ? "" : localStorage.getItem('GEREN_NAME');
	var sex = localStorage.getItem('SEX') == null ? "" : localStorage.getItem('SEX');
	var sign_name = localStorage.getItem('SIGN_NAME') == null ? "" : localStorage.getItem('SIGN_NAME');

	mui.openWindow({
		url: 'geren_message.html',
		id: 'geren_message',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});

	var geren_message = plus.webview.getWebviewById('geren_message');
	geren_message.addEventListener('loaded', function() {
		mui.fire(geren_message, "geren_message", {
			HEAD_PHOTO: head_photo,
			GEREN_NAME: geren_name,
			SEX: sex,
			SIGN_NAME: sign_name
		});
	});
});

// 推荐好友
document.getElementById("tuijianma").addEventListener('tap', function() {
	// 我的推荐码
	var reg_code = localStorage.getItem('REG_CODE');
	// 别人的推荐码
	var offer_code = localStorage.getItem('OFFER_CODE');

	mui.openWindow({
		url: '../recommend-code/recommend-code.html',
		id: 'recommend-code',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
	var recommend_code = plus.webview.getWebviewById('recommend-code');
	recommend_code.addEventListener('loaded', function() {
		mui.fire(recommend_code, "tuijian", {
			REG_CODE: reg_code,
			OFFER_CODE: offer_code
		});
	});

});

//服务标准
document.getElementById("fuwubiaozhun").addEventListener('tap', function() {
	var nwaiting = plus.nativeUI.showWaiting();
	mui.openWindow({
		url: 'fuwubiaozhun-agreement.html',
		id: 'fuwubiaozhun_agreement',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
});


// 我的余额
document.getElementById("yuer").addEventListener('tap', function() {
	var money = document.getElementById('qianbao_yue').innerHTML; //获取余额值，传值给余额页面

	mui.openWindow({
		url: '../balance/balance.html',
		id: 'balance',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
	var balance = plus.webview.getWebviewById('balance');
	balance.addEventListener('loaded', function() {
		mui.fire(balance, "loading", {
			MONEY_NEW: money
		});
	});

});
// 我的优惠卷
document.getElementById("wodeyouhuijuan").addEventListener('tap', function() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var webviewShow = plus.webview.create('../coupon/coupon.html', 'coupon');
});

// 我的等级与积分
document.getElementById("wodedengji").addEventListener('tap', function() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var webviewShow = plus.webview.create('wodedengji.html', 'wodedengji');
});

// 接单范围设置
document.getElementById("range").addEventListener('tap', function() {
	
	mui.openWindow({
		url: '../car-order/car_range.html',
		id: 'car_range',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
});

// 关于我们
document.getElementById("about").addEventListener('tap', function() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var webviewShow = plus.webview.create('../about-us/about-us.html', 'about-us');
});

// 刷新页面
window.addEventListener('refresh', function(e) {
	var url = serverAddress + "/order_App/updateUser_Info_App.do";
	var head_photo = e.detail.HEAD_PHOTO;
	// 提交头像图片
	if(head_photo != null) {
		document.getElementById('head-img').src = 'data:image/png;base64,' + head_photo;

		mui.ajax(url, {
			data: {
				IMAGE: head_photo
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
					// 存入缓存
					localStorage.setItem('HEAD_PHOTO', head_photo);
				}
				if(data.success == false) {
					mui.toast(decodeURI(data.msg));
				}

			},
			error: function(xhr, type, errorThrown) {
				// 异常处理；
				// mui.toast('服务器异常，请稍后再试！');
			}
		});

	} else {
		// 刷新页面
		location.reload();
	}
	return true;
});

// 退出登录
document.getElementById("exit_id").addEventListener('tap', function() {
	var url = serverAddress + "/order_App/work_Status.do";
	var params = {
		"WORK_STATUS": "0"
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
			if(data.success == true) {
				localStorage.clear();
				document.getElementById("exit_id").style.display = 'none';
				document.getElementById("login_id").style.display = 'block';
			}
			if(data.success == false) {
				mui.toast(decodeURI(data.msg));
			}

		},
		error: function(xhr, type, errorThrown) {
			// 异常处理；
			mui.toast('服务器异常，请稍后再试！');
		}
	});
});

// 登录
document.getElementById("login_id").addEventListener('tap', function() {
	mui.openWindow({
		id: 'login',
		url: '../login/login.html',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
});

// 下单成功后优惠卷减1
window.addEventListener('youhuijuan', function(e) {
	var a = document.getElementById('count_coupon').innerHTML;

	document.getElementById('count_coupon').innerHTML = (parseInt(a) - 1) + '张';
});

// 司机任务
document.getElementById("drivertask").addEventListener('tap', function(){
	mui.openWindow({
		id: 'drivertask',
		url: '../geren_message/driver_task.html',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
})