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

var od_id;
var od_type;
mui.plusReady(function() {
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});

var textarea = document.getElementById('textarea');

function checkLen(obj) {
	var maxChars = 60; //最多字符数  

	if(obj.value.length > maxChars) {
		obj.value = obj.value.substring(0, maxChars);
		return false;
	}
	var curr = maxChars - obj.value.length;
	document.getElementById("shengyu").innerHTML = curr.toString();
}

// 接收order_xiangqing页面中传递过来的订单ID
window.addEventListener('loading', function(event) {
	od_id = event.detail.OD_ID;
	od_type = event.detail.OD_TYPE;
});

// 投诉
document.getElementById("tousu").addEventListener('tap', function() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var radio = document.getElementsByName("radio1");
	var complain_content;
	for(var i = 0; i < radio.length; i++) { //循环radio长度		
		if(radio[i].checked) {
			switch(i) {
				case 0:
					complain_content = '司机服务态度差';
					break;
				case 1:
					complain_content = '司机乱收费';
					break;
				case 2:
					complain_content = '司机恶意绕道';
					break;
				case 3:
					complain_content = '司机爽约或拒运';
					break;
				case 4:
					complain_content = '货物丢失或损坏';
					break;
			}
		}
	}
	var url = serverAddress + "/order_App/saveOrder_Complain_App.do";
	mui.ajax(url, {
		data: {
			OD_ID: od_id,
			COMPLAIN_CONTENT: complain_content
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
				var order_xiangqing = plus.webview.getWebviewById('order_xiangqing');
				mui.fire(order_xiangqing, 'close');
			}
			if(data.success == false) {
				plus.nativeUI.closeWaiting();
				mui.toast(decodeURI(data.msg));
				return false;
			}
		},
		error: function(xhr, type, errorThrown) {
			// 异常处理；
			// mui.toast('服务器异常，请稍后再试！');
			plus.nativeUI.closeWaiting();
		}
	});
});

// 其他问题
document.getElementById("qita").addEventListener('tap', function() {
	mui.openWindow({
		url: 'complaint.html',
		id: 'complaint',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
	var complaint = plus.webview.getWebviewById('complaint');
	complaint.addEventListener('loaded', function() {
		mui.fire(complaint, "loading", {
			OD_ID: od_id,
			OD_TYPE: od_type
		});
	});
});