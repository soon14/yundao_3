// 首页通知角标未读个数
var count_tongzhi = 0;
// 每页显示多少条
var orderCount = 5;
// 第几页默认从0开始
var currentPage = 1;
// 传递到html数据模板的object对象
var record = [];
mui.init({
	keyEventBind: {
		backbutton: true, //打开back按键监听
	},
	beforeback: function() {
		//返回true，继续页面关闭逻辑  
		mui.back;
		return true;
	}
});

//进入新增路线页面
document.getElementById("dibu").addEventListener('tap', function() {
	mui.openWindow({
		url: 'xinzeng_luxian.html',
		id: 'xinzeng_luxian',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
});

mui.plusReady(function() {

var token = localStorage.getItem('TOKEN');
	var url = serverAddress + "/address/listAddress_App.do";
	if(token != null) {

		mui.ajax(url, {
			data: {},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 30000, //超时时间设置为30秒；
			headers: {
				/*'Content-Type': 'application/json'*/
			},
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				if(data.success == true) {

					if(record.length == 0) {
						for(var i = 0; i < data.obj.length; i++) {
							// 标题
							data.obj[i].ADDRESS_NAME_BIEMING = decodeURI(data.obj[i].ADDRESS_NAME_BIEMING);
							// 内容
							data.obj[i].ADDRESS_NAME_BEGIN = decodeURI(data.obj[i].ADDRESS_NAME_BEGIN);
							//目的地
							data.obj[i].POINT_TUJING_SUM = parseInt(data.obj[i].POINT_TUJING_SUM) + 1;
							record.push(data.obj[i]);
						}
					} else {
						for(var i = 0; i < data.obj.length; i++) {
							// 标题
							data.obj[i].ADDRESS_NAME_BIEMING = decodeURI(data.obj[i].ADDRESS_NAME_BIEMING);
							// 内容
							data.obj[i].ADDRESS_NAME_BEGIN = decodeURI(data.obj[i].ADDRESS_NAME_BEGIN);
							//目的地
							data.obj[i].POINT_TUJING_SUM = parseInt(data.obj[i].POINT_TUJING_SUM) + 1;
							// 上拉加载时用来判断当加载列表时有新数据录入导致某条数据重复出现的处理

							// 用来统计是否存在该条记录
							var count = 0;
							for(var o = 0; o < record.length; o++) {
								// 循环比对是否已经加载过该条记录
								if(data.obj[i].ADDRESS_ID == record[o].ADDRESS_ID) {
									count++;
								}
							}
							// 如果没有则添加
							if(count == 0) {
								record.push(data.obj[i]);
							}
						}
					}
					// 通知页面模板数据传递
					var str = template('radio-tigan', {
						"record": record
					});
					document.getElementById("mui-template").innerHTML = str;
					//参数为true代表没有更多数据了
					//mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.obj.length < 2));
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
			}
		});
	}

});

/*进入修改路线页面*/
mui('.mui-content').on('tap', 'a', function() {
	//获取a标签id--即路线ID
	var id = this.getAttribute("id");
	mui.openWindow({
		url: 'xiugai_luxian.html',
		id: 'xiugai_luxian',
		extras: {
			ADDRESS_ID: id,
		}, //自定义扩展参数
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			duration: '200', //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
});

//删除按钮事件
mui('.OA_task_1').on('tap', '.mui-btn', function(event) {
	var id = this.getAttribute("id");
	var elem = this;
	var li = elem.parentNode.parentNode;
	var url = serverAddress + "/address/deleteAddress_App.do";
	mui.confirm('确认删除该条记录？', '运到APP', btnArray, function(e) {
		if(e.index == 0) {
			li.parentNode.removeChild(li);
			mui.ajax(url, {
				data: {
					ADDRESS_ID: id
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
						var wobj = plus.webview.getWebviewById("guanli_luxian");
						wobj.reload(true);
						mui.toast("路线删除成功！");
					}
					if(data.success == false) {
						mui.toast(decodeURI(data.msg));
					}
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
/*					mui.toast('网络异常，请稍后再试！');*/
				}
			});
		} else {
			setTimeout(function() {
				mui.swipeoutClose(li);
			}, 0);
		}
	});
});
var btnArray = ['确认', '取消'];

// 刷新页面
window.addEventListener('refresh', function(e) {
	// 刷新页面
	location.reload();
	return true;
});