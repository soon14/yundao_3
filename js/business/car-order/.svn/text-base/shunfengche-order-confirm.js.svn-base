mui.init({
	beforeback: function() {
		//返回true，继续页面关闭逻辑  
		mui.back;
		return true;
	}
});

var price_select = {
	licheng: 0,
	yikoujia: 0
};
mui('#scroll').scroll({
	indicators: true //是否显示滚动条  
});
var price_select = {
	licheng: 0,
	yikoujia: 0
};
var yikoujia = 0;
var JSONMESSAGE = {};
mui.plusReady(function() {
	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
	});
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();

});
document.getElementById("xiadan").addEventListener('tap', function() {
	console.log(JSON.stringify(JSONMESSAGE));
	var url = serverAddress + "/order_App/saveOrder_App.do";
	document.querySelector("#xiadan").setAttribute("class", "mui-btn mui-btn-block mui-btn-primary mui-btn-w mui-disabled");
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	mui.ajax(url, {
		data: JSONMESSAGE,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			/*'Content-Type': 'application/json'*/
		},
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log(data.success);
			if(data.success == true) {
				var index = plus.webview.getLaunchWebview();
				mui.fire(index, 'orderend', {
					STATUS: 1,
					TITLE: '订单'
				});
				// 刷新订单管理页面
				var dingdan = plus.webview.getWebviewById('view/order/dingdan.html');
				dingdan.reload(true);
				var shunfengche_xiadan = plus.webview.currentWebview().opener();
				mui.fire(shunfengche_xiadan, 'close');
			}
			if(data.success == false) {
				document.querySelector("#xiadan").setAttribute("class", "mui-btn mui-btn-block mui-btn-primary mui-btn-w");
				mui.toast(decodeURI(data.msg));
			}
		},
		error: function(xhr, type, errorThrown) {
			document.querySelector("#xiadan").setAttribute("class", "mui-btn mui-btn-block mui-btn-primary mui-btn-w");

			//异常处理；
			mui.toast('网络异常，请稍后再试！');
		}
	});

});

document.getElementById("price").addEventListener('tap', function(e) {
	e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
	var btnArray = ['取消', '确定'];
	var num_validate = /^[1-9]\d*$/;
	//	mui.prompt('一口价', '金额', '', btnArray, function(e) {
	//		console.log(e.index);
	//		if(e.index == 1) {
	//			if(JSON.stringify(JSONMESSAGE) != "{}"&&num_validate.test(e.value)) {
	//				JSONMESSAGE.STATUS_CHARGE = 1;
	//				JSONMESSAGE.MONEY_SHIJI=parseInt(e.value)+parseInt(JSONMESSAGE.MONEY_BAOXIAN);
	//				JSONMESSAGE.MONEY_YUJI = e.value;
	//				document.getElementById("shijiprice").innerHTML = parseInt(JSONMESSAGE.MONEY_SHIJI)+"元";
	//				price_select.yikoujia=JSONMESSAGE.MONEY_SHIJI;
	//				alert('您的一口价填加成功' + e.value);
	//				document.querySelector("#xiadan").setAttribute("class", "mui-btn mui-btn-block mui-btn-primary mui-btn-w");
	//			}else{
	//				mui.toast("请正确填写价格");
	//				return false;
	//			}
	//		} else {
	//		}
	//	});
	confirm_yikoujia();

});
var confirm_yikoujia = function(content, onPopupClick) {
	var oDiv = document.createElement('div');
	var mengban = document.createElement('div');
	mengban.innerHTML = '<div class="mui-popup-backdrop mui-active" style="display: block;"></div>'
	oDiv.innerHTML = '<div class="confirm_yikoujia"><div class="mui-popup mui-popup-in"style="display: block;"><div class="mui-popup-inner"><div class="mui-popup-text">金额</div><div class="mui-popup-input"><div class="mui-input-row"><label>金额</label><input id="account"type="text"class="mui-input"></div></div></div><div class="mui-popup-buttons"><span class="mui-popup-button" id="quxiao">取消</span><span class="mui-popup-button mui-popup-button-bold"id="queding">确认</span></div></div></div>'
	document.body.appendChild(mengban);
	document.body.appendChild(oDiv);
	// 正整数
	var num_validate = /^[1-9]\d*$/;

	document.getElementById("queding").addEventListener('tap', function() {
		if(JSON.stringify(JSONMESSAGE) != "{}" && num_validate.test(document.getElementById("account").value)) {
			JSONMESSAGE.STATUS_CHARGE = 1;
			JSONMESSAGE.MONEY_SHIJI = parseInt(document.getElementById("account").value) + parseInt(JSONMESSAGE.MONEY_BAOXIAN);
			JSONMESSAGE.MONEY_YUJI = document.getElementById("account").value;
			document.getElementById("shijiprice").innerHTML = parseInt(JSONMESSAGE.MONEY_SHIJI) + "元";
			price_select.yikoujia = JSONMESSAGE.MONEY_SHIJI;
			// mui.toast('您的一口价填加成功' + document.getElementById("account").value);
			document.querySelector("#xiadan").setAttribute("class", "mui-btn mui-btn-block mui-btn-primary mui-btn-w");
			document.querySelector("#xiadan").innerHTML = "立即下单";
		} else {
			mui.toast("请正确填写价格");
			return false;
		}
		document.body.removeChild(mengban);
		document.body.removeChild(oDiv);
		return false;
	});
	document.getElementById("quxiao").addEventListener('tap', function() {
		document.getElementById("account").blur(); //输入框失去焦点
		document.body.removeChild(mengban);
		document.body.removeChild(oDiv);
	});
}
document.getElementById("xiaofei").addEventListener('tap', function(e) {
	confirm();
});
var confirm = function(content, onPopupClick) {
	var oDiv = document.createElement('div');
	var mengban = document.createElement('div');
	mengban.innerHTML = '<div class="mui-popup-backdrop mui-active" style="display: block;"></div>'
	oDiv.innerHTML = '<div class="mui-popup mui-popup-in" style="display:block;"id="licheng"><div class="mui-popup-inner"><div class="mui-popup-title" >提示:优惠劵不能抵扣小费费用</div><div class="mui-popup-text"><div id="btn_s" class="mui-row"><div class="mui-col-sm-4 mui-col-xs-4"><button id="btn_1" type="button" class="mui-btn mui-btn-outlined" name="moneyW">¥ 10</button></div><div class="mui-col-sm-4 mui-col-xs-4"><button id="btn_2" type="button" class="mui-btn mui-btn-outlined" name="moneyW">¥ 20</button></div><div class="mui-col-sm-4 mui-col-xs-4"><button id="btn_3" type="button" class="mui-btn mui-btn-outlined" name="moneyW">¥ 30</button></div></div></div><div class="mui-popup-input"><div class="mui-input-row"><input id="account" type="text" class="mui-input" placeholder="其他金额，请在此输入（最高200元）" style="border:0"></div></div></div><div class="mui-popup-buttons"><span class="mui-popup-button" id="quxiao">取消</span><span class="mui-popup-button mui-popup-button-bold" id="queding">确认</span></div></div>'
	document.body.appendChild(mengban);
	document.body.appendChild(oDiv);
	var money = "";
	mui("#btn_s").on("tap", "button", function(e) {

		if(this.id == "btn_1") {
			money = 10;
			document.getElementById("btn_2").style.color = '#333';
			document.getElementById("btn_2").style.borderColor = '#ccc';
			document.getElementById("btn_3").style.color = '#333';
			document.getElementById("btn_3").style.borderColor = '#ccc';
			this.style.color = '#d94949';
			this.style.borderColor = '#d94949';

		}
		if(this.id == "btn_2") {
			money = 20;
			document.getElementById("btn_1").style.color = '#333';
			document.getElementById("btn_1").style.borderColor = '#ccc';
			document.getElementById("btn_3").style.color = '#333';
			document.getElementById("btn_3").style.borderColor = '#ccc';
			this.style.color = '#d94949';
			this.style.borderColor = '#d94949';
		}
		if(this.id == "btn_3") {
			money = 30;
			document.getElementById("btn_1").style.color = '#333';
			document.getElementById("btn_1").style.borderColor = '#ccc';
			document.getElementById("btn_2").style.color = '#333';
			document.getElementById("btn_2").style.borderColor = '#ccc';
			this.style.color = '#d94949';
			this.style.borderColor = '#d94949';
		}
		document.getElementById("account").value = money;
		document.getElementById("account").blur();
	});
	document.getElementById("queding").addEventListener('tap', function() {
		extraFee = document.getElementById("account").value;
		// 正整数
		var num_validate = /^[1-9]\d*$/;
		console.log(num_validate.test(extraFee));
		if(!num_validate.test(extraFee)) {
			mui.toast("请填写正确小费金额");
			return false;
		}

		document.getElementById("account").blur();
		if(extraFee >= 200) {
			mui.toast("小费最高不可超过200元")
			extraFee = 200;
		}
		document.getElementById("xiaofei_span").innerHTML = "+" + extraFee + "元";
		if(JSON.stringify(JSONMESSAGE) != "{}") {
			JSONMESSAGE.MONEY_XIAOFEI = extraFee;
			JSONMESSAGE.MONEY_SHIJI = parseInt(JSONMESSAGE.MONEY_SHIJI) + parseInt(extraFee);
			console.log(JSONMESSAGE.MONEY_SHIJI);
		}

		document.body.removeChild(mengban);
		document.body.removeChild(oDiv);
		console.log(extraFee);
		return false;

	});
	document.getElementById("quxiao").addEventListener('tap', function() {
		document.getElementById("account").blur();
		document.body.removeChild(mengban);
		document.body.removeChild(oDiv);
		return false;
	});

}
//获取下单页面JSON
window.addEventListener('ORDER_CESHI', function(event) {
	//获得事件参数
	JSONMESSAGE = event.detail.order_messageJSON;
	price_select.licheng = JSONMESSAGE.MONEY_YUJI;
	//	mui.toast(JSON.stringify(event.detail.order_messageJSON));
	document.getElementById("yongcheshijian").innerText = JSONMESSAGE.DATE_YJYONGCHE;
	console.log(JSONMESSAGE.CAR_TYPE);
	console.log(typeof(JSONMESSAGE.CAR_TYPE));
	console.log(huoquchetype(JSONMESSAGE.CAR_TYPE));
	document.getElementById("car_type").innerText = huoquchetype(JSONMESSAGE.CAR_TYPE);
	console.log(JSONMESSAGE.EWAI_1);
	console.log(JSONMESSAGE.EWAI_2);
	console.log(JSONMESSAGE.EWAI_3);
	console.log(JSONMESSAGE.EWAI_3_MONEY);
	if(JSONMESSAGE.EWAI_1 == 0 && JSONMESSAGE.EWAI_2 == 0 && JSONMESSAGE.EWAI_3 == 0 && JSONMESSAGE.EWAI_3_MONEY == 0) {
		document.getElementById("ewai").innerText = '无';
	} else {
		document.getElementById("ewai").innerText = ewai(JSONMESSAGE.EWAI_1, JSONMESSAGE.EWAI_2, JSONMESSAGE.EWAI_3, JSONMESSAGE.EWAI_3_MONEY);
	}
	document.getElementById("begin_address").innerHTML = JSONMESSAGE.ADDRESS_NAME_BEGIN;
	document.getElementById("end_address").innerHTML = JSONMESSAGE.ADDRESS_NAME_END;
	document.getElementById("shijiprice").innerHTML = JSONMESSAGE.MONEY_SHIJI + "元";

});
//获取车型名称
function huoquchetype(type) {
	switch(parseInt(type)) {
		case 1:
			return "小型面包";
			break;
		case 2:
			return "中型面包";
			break;
		case 3:
			return "重型货车";
			break;
		case 4:
			return "大型货车";
			break;
	}
}

function ewai(str1, str2, str3, jiner) {
	var EWString = "";
	switch(str1) {
		case 1:
			EWString += '需要装载（与司机议价）,';
			break;
		case 0:
			EWString += '';
			break;
	}
	switch(str2) {
		case 1:
			EWString += '需带回单（免费）,';
			break;
		case 0:
			EWString += '';
			break;
	}
	switch(str3) {
		case 1:
			EWString += '需要回款（免费）' + jiner + '元,';
			break;
		case 0:
			EWString += '';
			break;
	}

	EWString = (EWString.substring(EWString.length - 1) == ',') ? EWString.substring(0, EWString.length - 1) : EWString;
	console.log(EWString);
	return EWString;
}

// 保险条件
//document.getElementById("tiaojian").addEventListener('tap', function() {
//	mui.openWindow({
//		url: 'insurance-agreement.html',
//		id: 'insurance-agreement',
//		show: {
//			autoShow: false, //页面loaded事件发生后自动显示，默认为true
//			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
//		},
//		waiting: {
//			autoShow: false //自动显示等待框，默认为true
//		}
//	});
//});