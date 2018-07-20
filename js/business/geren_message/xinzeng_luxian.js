var num = 1;
var point_tujing_sum = 0; //记录途径点的个数
var table = document.body.querySelector('.jingting_class');
var content = document.querySelector('.mui-content');

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

mui.plusReady(function() {
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});

// 经停点
mui('#OA_task_1').on('tap', '.mui-btn', function(event) {
	var elem = this;
	var li = elem.parentNode.parentNode;
	mui.confirm('确认删除该条记录？', '经停点', btnArray, function(e) {
		if(e.index == 0) {
			point_tujing_sum = 0; //记录途径点的个数 -= 1;
			li.parentNode.removeChild(li);
		} else {
			setTimeout(function() {
				mui.swipeoutClose(li);
			}, 0);
		}
	});
});

var btnArray = ['确认', '取消'];

mui('#tianjiaLi').on('tap', 'a', function(e) {
	if(point_tujing_sum >= 10) {
		mui.toast("最多只能有十个经停点！");
		return false;
	}
	point_tujing_sum++;
	i = point_tujing_sum;
	var li_ = document.createElement('li');
	li_.className = "mui-table-view-cell";
	var div_ = document.createElement('div');
	div_.className = "mui-slider-right mui-disabled";
	var a_ = document.createElement('button');
	a_.className = "mui-btn mui-btn-red";
	a_.innerText = "删除";
	var div2_ = document.createElement('div');
	div2_.className = "mui-slider-handle";
	var a2_ = document.createElement('a');
	a2_.id = "tujing_id_" + i;
	a2_.href = "#";
	a2_.value = i;
	a2_.className = "tingjingdian";
	var div3_ = document.createElement('div');
	div3_.className = "mui-media-body mui-ellipsis";
	var span_ = document.createElement('span');
	span_.className = "jingting";

	span_.innerHTML = "<img src='../../image/jing.png'>";
	var span2_ = document.createElement('span');
	span2_.style.color = "#999999";
	span2_.style.fontSize = "0.2916rem";
	span2_.style.fontWeight = "100";

	span2_.id = "tujing_name_" + i;
	span2_.innerHTML = "请选择经停点";

	var i_ = document.createElement('i');
	i_.className = "mui-icon mui-icon-arrowright mui-pull-right";
	i_.id = "jingtingicon";
	li_.appendChild(div_);
	li_.appendChild(div2_);
	div_.appendChild(a_);
	div2_.appendChild(a2_);
	a2_.appendChild(div3_);
	a2_.appendChild(i_);
	div3_.appendChild(span_);
	span_.appendChild(span2_);
	span2_.appendChild(i_);
	table.appendChild(li_);
	//动态生成经停点的隐藏input
	for(var i1 = 1; i1 <= i; i1++) {
		var newEl1 = document.createElement('input');
		newEl1.id = "addressjingting_name_end" + i1;
		newEl1.type = "hidden";
		var newEl2 = document.createElement('input');
		newEl2.id = "addressjingting_lng_end" + i1;
		newEl2.type = "hidden";
		var newEl3 = document.createElement('input');
		newEl3.id = "addressjingting_lat_end" + i1;
		newEl3.type = "hidden";
		var newEl4 = document.createElement('input');
		newEl4.id = "addressjingting_name_end_bieming" + i1;
		newEl4.type = "hidden";
		var newEl5 = document.createElement('input');
		newEl5.id = "personjingting_shouhuo" + i1;
		newEl5.type = "hidden";
		var newEl6 = document.createElement('input');
		newEl6.id = "personjingting_shouhuo_phone" + i1;
		newEl6.type = "hidden";
		content.appendChild(newEl1);
		content.appendChild(newEl2);
		content.appendChild(newEl3);
		content.appendChild(newEl4);
		content.appendChild(newEl5);
		content.appendChild(newEl6);
	}
});

mui('#OA_task_1').on('tap', 'a', function() {
	// 关闭软键盘
	document.activeElement.blur();
	//经停点类型为1，终点类型为2
	var id = this.getAttribute('id');
	//用indexOf方法判断是否是途径点
	var tujing_true = id.indexOf("tujing") == -1 ? false : true;
	if(tujing_true == true) {
		num = id.split('_')[2];
		mui.openWindow({
			url: 'jingting_message.html',
			id: 'jingting_message'
		});
		var jingting_message = plus.webview.getWebviewById('jingting_message');
		mui.fire(jingting_message, 'getDetail', {
			WHICH: num,
			STATUS: 1
		});
	}
});

document.getElementById("begin_address").addEventListener('tap', function() {
	// 关闭软键盘
	document.activeElement.blur();
	mui.openWindow({
		url: 'begin_message.html',
		id: 'begin_message'
	});

	var begin_message = plus.webview.getWebviewById('begin_message');
	mui.fire(begin_message, "data_xinzeng_luxian", {
		STATUS: 1
	});
});

document.getElementById("end_address").addEventListener('tap', function() {
	// 关闭软键盘
	document.activeElement.blur();
	mui.openWindow({
		url: 'end_message.html',
		id: 'end_message'
	});
	var end_message = plus.webview.getWebviewById('end_message');
	mui.fire(end_message, "data_xinzeng_luxian", {
		STATUS: 1
	});
});

// 添加data_begin_message自定义事件监听
window.addEventListener('data_begin_message', function(event) {
	//获得起始点页面参数
	document.getElementById("begin_text").innerHTML = event.detail.ADDRESS_NAME_BEGIN;
	document.getElementById("address_name_begin").value = event.detail.ADDRESS_NAME_BEGIN;
	document.getElementById("address_lng_begin").value = event.detail.ADDRESS_LNG_BEGIN;
	document.getElementById("address_lat_begin").value = event.detail.ADDRESS_LAT_BEGIN;
	document.getElementById("address_name_begin_bieming").value = event.detail.ADDRESS_NAME_BEGIN_BIEMING;
	document.getElementById("person_fahuo").value = event.detail.PERSON_FAHUO;
	document.getElementById("person_fahuo_phone").value = event.detail.PERSON_FAHUO_PHONE;
});

// 添加data_end_message自定义事件监听
window.addEventListener('data_end_message', function(event) {
	//获得终点页面参数
	document.getElementById("end_text").innerHTML = event.detail.ADDRESS_NAME_END;
	document.getElementById("address_name_end").value = event.detail.ADDRESS_NAME_END;
	document.getElementById("address_lng_end").value = event.detail.ADDRESS_LNG_END;
	document.getElementById("address_lat_end").value = event.detail.ADDRESS_LAT_END;
	document.getElementById("address_name_end_bieming").value = event.detail.ADDRESS_NAME_END_BIEMING;
	document.getElementById("person_shouhuo").value = event.detail.PERSON_SHOUHUO;
	document.getElementById("person_shouhuo_phone").value = event.detail.PERSON_SHOUHUO_PHONE;
});

// 添加data_jingting_message自定义事件监听
window.addEventListener('data_jingting_message', function(event) {
	//获得终点页面参数
	document.getElementById("tujing_name_" + num).innerHTML = event.detail.ADDRESS_NAME_END;
	document.getElementById("addressjingting_name_end" + num).value = event.detail.ADDRESS_NAME_END;
	document.getElementById("addressjingting_lng_end" + num).value = event.detail.ADDRESS_LNG_END;
	document.getElementById("addressjingting_lat_end" + num).value = event.detail.ADDRESS_LAT_END;
	document.getElementById("addressjingting_name_end_bieming" + num).value = event.detail.ADDRESS_NAME_END_BIEMING;
	document.getElementById("personjingting_shouhuo" + num).value = event.detail.PERSON_SHOUHUO;
	document.getElementById("personjingting_shouhuo_phone" + num).value = event.detail.PERSON_SHOUHUO_PHONE;
});

//发送请求按钮的点击事件
document.getElementById("save_address").addEventListener('tap', function() {
	document.getElementById("save_address").setAttribute("class","mui-btn mui-btn-block mui-btn-primary mui-disabled");	
	var address_name_bieming = document.getElementById("searchinput").value.trim();
	var address_name_begin = document.getElementById("address_name_begin").value;
	var address_lng_begin = document.getElementById("address_lng_begin").value;
	var address_lat_begin = document.getElementById("address_lat_begin").value;
	var address_name_begin_bieming = document.getElementById("address_name_begin_bieming").value;
	var person_fahuo = document.getElementById("person_fahuo").value;
	var person_fahuo_phone = document.getElementById("person_fahuo_phone").value;
	var address_name_end = document.getElementById("address_name_end").value;
	var address_lng_end = document.getElementById("address_lng_end").value;
	var address_lat_end = document.getElementById("address_lat_end").value;
	var address_name_end_bieming = document.getElementById("address_name_end_bieming").value;
	var person_shouhuo = document.getElementById("person_shouhuo").value;
	var person_shouhuo_phone = document.getElementById("person_shouhuo_phone").value;

	var JSONMessage = {
		ADDRESS_NAME_BEGIN: address_name_begin,
		ADDRESS_LNG_BEGIN: address_lng_begin,
		ADDRESS_LAT_BEGIN: address_lat_begin,
		ADDRESS_NAME_BEGIN_BIEMING: address_name_begin_bieming,
		PERSON_FAHUO: person_fahuo,
		PERSON_FAHUO_PHONE: person_fahuo_phone,
		ADDRESS_NAME_END: address_name_end,
		ADDRESS_LNG_END: address_lng_end,
		ADDRESS_LAT_END: address_lat_end,
		ADDRESS_NAME_END_BIEMING: address_name_end_bieming,
		PERSON_SHOUHUO: person_shouhuo,
		PERSON_SHOUHUO_PHONE: person_shouhuo_phone,
		ADDRESS_NAME_BIEMING: address_name_bieming,
		POINT_TUJING_SUM: point_tujing_sum
	};
	console.log(point_tujing_sum);
	for(var k = 1; k <= point_tujing_sum; k++) {
		var addressjingting_name_end = document.getElementById("addressjingting_name_end" + k).value;
		var addressjingting_lng_end = document.getElementById("addressjingting_lng_end" + k).value;
		var addressjingting_lat_end = document.getElementById("addressjingting_lat_end" + k).value;
		var addressjingting_name_end_bieming = document.getElementById("addressjingting_name_end_bieming" + k).value;
		var personjingting_shouhuo = document.getElementById("personjingting_shouhuo" + k).value;
		var personjingting_shouhuo_phone = document.getElementById("personjingting_shouhuo_phone" + k).value;
		JSONMessage["ADDRESS_NAME_END_A" + k] = addressjingting_name_end;
		JSONMessage["ADDRESS_LNG_END_A" + k] = addressjingting_lng_end;
		JSONMessage["ADDRESS_LAT_END_A" + k] = addressjingting_lat_end;
		JSONMessage["PERSON_NAME_A" + k] = personjingting_shouhuo;
		JSONMessage["PERSON_PHONE_A" + k] = personjingting_shouhuo_phone;
	}
	if(person_fahuo_phone == "") {
		mui.toast('请填写发货人电话号')
		document.getElementById("save_address").setAttribute("class","mui-btn mui-btn-block mui-btn-primary");
		return false;
	}
	if(person_shouhuo_phone == "") {
		mui.toast('请填写收货人电话号')
		document.getElementById("save_address").setAttribute("class","mui-btn mui-btn-block mui-btn-primary");
		return false;
	}
	if(address_name_bieming == "") {
		mui.toast('请填写路线别名')
		document.getElementById("save_address").setAttribute("class","mui-btn mui-btn-block mui-btn-primary");
		return false;
	}
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var url = serverAddress + "/address/saveAddress_App.do";
	mui.ajax(url, {
		data: JSONMessage,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			/*'Content-Type': 'application/json'*/
		},
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.success == true) {
				plus.nativeUI.closeWaiting();
				//获得列表界面的webview  
				var list = plus.webview.currentWebview().opener();
				//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
				mui.fire(list, 'refresh');
				mui.back();
				return true

			}
			if(data.success == false) {
				plus.nativeUI.closeWaiting();
				mui.toast(decodeURI(data.msg));
			}

		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
			plus.nativeUI.closeWaiting();
			mui.toast('网络超时，请稍后再试！');
			
		}
	});
});

// 禁用所有输入框软键盘的搜索按钮，防止出现创建重复页面
mui(".mui-page-content").on('keydown', 'input', function(e) {

	if(13 == e.keyCode) { //点击了“搜索”  
		document.activeElement.blur(); //隐藏软键盘 
	}
}, false);