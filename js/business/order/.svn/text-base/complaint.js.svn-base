// 订单ID
var od_id;
// 订单类型
var od_type;

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
	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
	});
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
	var complain_content = document.getElementById('textarea').value;
	console.log(complain_content);
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
				console.log(od_type);
				switch(true) {
					// 专车或顺风车
					case(od_type == 1 || od_type == 3):
						console.log(111);
						var parent = plus.webview.currentWebview().opener().opener();
						mui.fire(parent, 'close');
						break;
						// 检车线或物流
					case(od_type == 2 || od_type == 4):
						console.log(123);
						var parent = plus.webview.currentWebview().opener();
						mui.fire(parent, 'close');
						break;
				}
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