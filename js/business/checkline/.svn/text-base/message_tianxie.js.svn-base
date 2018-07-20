mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	},
	beforeback: function() {
		// 关闭软键盘
		document.activeElement.blur();
		//返回true，继续页面关闭逻辑  
		mui.back;
		return true;
	}
});

mui.plusReady(function() {
	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
	});
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});

function addNextButtonEvent() {
	mui("#save_address")[0].addEventListener('tap', function(data) {
		// 关闭软键盘
		document.activeElement.blur();
		var uname = document.getElementById("name").value;
		var carno = document.getElementById('carno').value;
		var telnumber = document.getElementById('phone').value;
		var checktime = document.getElementById('time').value;

		if(uname.length < 2 || uname.length > 10) {
			alert("您必须输入姓名，且长度为2-10之间");
			return;
		}
		var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
		if(carno.search(re) == -1) {
			alert("输入的车牌号格式不正确");
			return;
		}
		if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(telnumber))) {
			alert(telnumber);
			alert("不是完整的11位手机号或者正确的手机号前七位");
			return;
		}
		if(checktime.length == 0) {
			alert("请您选择检车时间");
			return;
		}
		validCarNo();
	});
}

function validCarNo() {
	var url = serverAddress + "/appcheckingline/queryRunningCheckOrderByPlantNo.do";
	var carNo = document.getElementById("carno").value;
	var param = {
		"PLATE_NO": carNo
	};
	mui.ajax(url, {
		data: param,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			/*'Content-Type': 'application/json'*/
		},
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.success == true) {
				if(data.obj.length > 0) {
					mui.toast("此车牌号有未完成订单，你无法下单");
				} else {
					openNextWindow();
				}
			}
			if(data.success == false) {
				//mui.toast(decodeURI(data.msg));
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//mui.toast('网络异常，请稍后再试！');
		}
	});
}

function openNextWindow() {
	var uname = document.getElementById("name").value;
	var carno = document.getElementById('carno').value;
	var telnumber = document.getElementById('phone').value;
	var checktime = document.getElementById('time').value;
	var self = plus.webview.currentWebview();
	var clID = self.CHECKINGLINE_ID;
	var clName = self.CHECKINGLINE_NAME;
	var clAddress = self.ADDRESS;
	var clPrice = self.PRICE;
	var clCarType = self.CAR_TYPE;
	var params = {
		CUSTORMER_NAME: uname,
		PHONE_NO: telnumber,
		CHECK_TIME: checktime,
		PLATE_NO: carno,
		CHECKINGLINE_ID: clID,
		PRICE: clPrice,
		CHECKINGLINE_NAME: clName,
		ADDRESS: clAddress,
		CAR_TYPE: clCarType,
		APPUSERID: self.APPUSERID,
		TYPE_ITEM: self.TYPE_ITEM

	};

	mui.openWindow({
		url: '../jianche/jianche_dingdanqueren.html',
		id: 'jianche_dingdanqueren.html',
		extras: params,
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});

}

function initEventListener() {
	mui("#time")[0].addEventListener("click", function() {
		var options = {};
		var id = this.getAttribute('id');
		var picker = new mui.DtPicker(options);
		picker.show(function(rs) {
			document.getElementById('time').value = rs.text;
			picker.dispose();
		});
	});

	addNextButtonEvent();
}

initEventListener();

// 关闭页面
window.addEventListener('close', function(e) {
	setTimeout(function() {
		// 加载完毕后关闭等待框，并展示页面
		plus.nativeUI.closeWaiting();
		mui.back();
	}, 1000);
});