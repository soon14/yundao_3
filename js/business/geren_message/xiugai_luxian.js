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

mui('#OA_task_1').on('tap', '.mui-btn', function(event) {
	var elem = this;
	var li = elem.parentNode.parentNode;
	mui.confirm('确认删除该条记录？', '运到APP', btnArray, function(e) {
		if(e.index == 0) {
			point_tujing_sum -= 1;
			li.parentNode.removeChild(li);
		} else {
			setTimeout(function() {
				mui.swipeoutClose(li);
			}, 0);
		}
	});
});
var btnArray = ['确认', '取消'];

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
			ADDRESS_NAME_END: (document.getElementById("addressjingting_name_end" + num).value == "0" ? "" : document.getElementById("addressjingting_name_end" + num).value),
			ADDRESS_LNG_END: (document.getElementById("addressjingting_lng_end" + num).value == "0" ? "" : document.getElementById("addressjingting_lng_end" + num).value),
			ADDRESS_LAT_END: (document.getElementById("addressjingting_lat_end" + num).value == "0" ? "" : document.getElementById("addressjingting_lat_end" + num).value),
			ADDRESS_NAME_END_BIEMING: (document.getElementById("addressjingting_name_end_bieming" + num).value == "0" ? "" : document.getElementById("addressjingting_name_end_bieming" + num).value),
			PERSON_SHOUHUO: (document.getElementById("personjingting_shouhuo" + num).value == "0" ? "" : document.getElementById("personjingting_shouhuo" + num).value),
			PERSON_SHOUHUO_PHONE: (document.getElementById("personjingting_shouhuo_phone" + num).value == "0" ? "" : document.getElementById("personjingting_shouhuo_phone" + num).value),
			WHICH: num,
			STATUS: 2
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

		ADDRESS_NAME_BEGIN: (document.getElementById("address_name_begin").value == "0" ? "" : document.getElementById("address_name_begin").value),
		ADDRESS_LNG_BEGIN: (document.getElementById("address_lng_begin").value == "0" ? "" : document.getElementById("address_lng_begin").value),
		ADDRESS_LAT_BEGIN: (document.getElementById("address_lat_begin").value == "0" ? "" : document.getElementById("address_lat_begin").value),
		ADDRESS_NAME_BEGIN_BIEMING: (document.getElementById("address_name_begin_bieming").value == "0" ? "" : document.getElementById("address_name_begin_bieming").value),
		PERSON_FAHUO: (document.getElementById("person_fahuo").value == "0" ? "" : document.getElementById("person_fahuo").value),
		PERSON_FAHUO_PHONE: (document.getElementById("person_fahuo_phone").value == "0" ? "" : document.getElementById("person_fahuo_phone").value),

		STATUS: 2
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

		ADDRESS_NAME_END: (document.getElementById("address_name_end").value == "0" ? "" : document.getElementById("address_name_end").value),
		ADDRESS_LNG_END: (document.getElementById("address_lng_end").value == "0" ? "" : document.getElementById("address_lng_end").value),
		ADDRESS_LAT_END: (document.getElementById("address_lat_end").value == "0" ? "" : document.getElementById("address_lat_end").value),
		ADDRESS_NAME_END_BIEMING: (document.getElementById("address_name_end_bieming").value == "0" ? "" : document.getElementById("address_name_end_bieming").value),
		PERSON_SHOUHUO: (document.getElementById("person_shouhuo").value == "0" ? "" : document.getElementById("person_shouhuo").value),
		PERSON_SHOUHUO_PHONE: (document.getElementById("person_shouhuo_phone").value == "0" ? "" : document.getElementById("person_shouhuo_phone").value),

		STATUS: 2
	});
});
var addid;

mui.plusReady(function() {

	//获取上一页的传值,常用路线ID
	var self = plus.webview.currentWebview();
	//获取别名放入输入框中
	addid = self.ADDRESS_ID;
	var url = serverAddress + "/address/address_Detail_App.do";
	mui.ajax(url, {
		data: {
			ADDRESS_ID: addid
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
				document.getElementById("searchinput").value = decodeURI(data.attributes.ADDRESS_DETAIL[0].ADDRESS_NAME_BIEMING);
				document.getElementById("begin_textXIU").innerHTML = decodeURI(data.attributes.ADDRESS_DETAIL[0].ADDRESS_NAME_BEGIN);
				document.getElementById("end_textXIU").innerHTML = decodeURI(data.attributes.ADDRESS_DETAIL[0].ADDRESS_NAME_END);
				document.getElementById("address_name_begin").value = decodeURI(data.attributes.ADDRESS_DETAIL[0].ADDRESS_NAME_BEGIN);
				document.getElementById("address_lng_begin").value = data.attributes.ADDRESS_DETAIL[0].ADDRESS_LNG_BEGIN;
				document.getElementById("address_lat_begin").value = data.attributes.ADDRESS_DETAIL[0].ADDRESS_LAT_BEGIN;
				document.getElementById("address_name_begin_bieming").value = decodeURI(data.attributes.ADDRESS_DETAIL[0].ADDRESS_NAME_BEGIN_BIEMING);
				document.getElementById("person_fahuo").value = decodeURI(data.attributes.ADDRESS_DETAIL[0].PERSON_FAHUO);
				document.getElementById("person_fahuo_phone").value = data.attributes.ADDRESS_DETAIL[0].PERSON_FAHUO_PHONE;

				document.getElementById("address_name_end").value = decodeURI(data.attributes.ADDRESS_DETAIL[0].ADDRESS_NAME_END);
				document.getElementById("address_lng_end").value = data.attributes.ADDRESS_DETAIL[0].ADDRESS_LNG_END;
				document.getElementById("address_lat_end").value = data.attributes.ADDRESS_DETAIL[0].ADDRESS_LAT_END;
				document.getElementById("address_name_end_bieming").value = decodeURI(data.attributes.ADDRESS_DETAIL[0].ADDRESS_NAME_END_BIEMING);
				document.getElementById("person_shouhuo").value = decodeURI(data.attributes.ADDRESS_DETAIL[0].PERSON_SHOUHUO);
				document.getElementById("person_shouhuo_phone").value = data.attributes.ADDRESS_DETAIL[0].PERSON_SHOUHUO_PHONE;

				point_tujing_sum = data.attributes.ADDRESS_DETAIL[0].POINT_TUJING_SUM; // 途径点个数
				if(point_tujing_sum != 0) {
					for(var i = 1; i <= point_tujing_sum; i++) {
						//						var li_ = document.createElement('li');
						//						li_.className = "mui-table-view-cell";
						//						var div_ = document.createElement('div');
						//						div_.className = "mui-slider-right mui-disabled";
						//						var a_ = document.createElement('button');
						//						a_.className = "mui-btn mui-btn-red";
						//						a_.innerText = "删除";
						//						var div2_ = document.createElement('div');
						//						div2_.className = "mui-slider-handle";
						//						var a2_ = document.createElement('a');
						//						a2_.id = "tujing_id_" + i;
						//						a2_.href = "#";
						//						a2_.value = i;
						//						a2_.className = "tingjingdian";
						//						var div3_ = document.createElement('div');
						//						div3_.className = "mui-media-body mui-ellipsis";
						//						var span_ = document.createElement('span');
						//						span_.className = "jingting";
						//						span_.innerHTML = "<img src='../../image/jing.png'>";
						//						var span2_ = document.createElement('span');
						//						span2_.style.color = "#000000";
						//						span2_.style.fontSize = "0.28rem";
						////						span2_.style.fontWeight = "100";
						//						span2_.id = "tujing_name_" + i;
						//						// 途径点地点名
						//						span2_.innerHTML = decodeURI(data.attributes.ADDRESS_TUJING[i - 1].ADDRESS_NAME_TUJING);
						//						var i_ = document.createElement('i');
						//						i_.className = "mui-icon mui-icon-arrowright mui-pull-right";
						//						i_.id = "jingtingicon";
						//						li_.appendChild(div_);
						//						li_.appendChild(div2_);
						//						div_.appendChild(a_);
						//						div2_.appendChild(a2_);
						//						a2_.appendChild(div3_);
						//						a2_.appendChild(i_);
						//						div3_.appendChild(span_);
						//						span_.appendChild(span2_);
						//						span2_.appendChild(i_);
						//						table.appendChild(li_);
						var jingting_div = "<li class='mui-table-view-cell'><div class='mui-slider-right mui-disabled'><a class='mui-btn mui-btn-red' href='#' >删除</a></div><a class='mui-slider-handle'  id='tujing_id_" + i + "' class='tingjingdian'><div class='mui-media-body mui-ellipsis mui-navigate-right'><span class='jingting'><img src='../../image/jing.png'></span><span id='tujing_name_" + i + "' style='color: #000000; font-size: 0.28rem;'>" + decodeURI(data.attributes.ADDRESS_TUJING[i - 1].ADDRESS_NAME_TUJING) + "<i class='mui-icon mui-icon-arrowright mui-pull-right' id='jingtingicon'></i></span></div></a></li>";
						table.innerHTML = jingting_div;
						//动态生成经停点的隐藏input
						for(var k = 1; k <= i; k++) {
							var newEL_1 = document.createElement('input');
							newEL_1.id = "addressjingting_name_end" + k;
							newEL_1.type = "hidden";
							newEL_1.value = decodeURI(data.attributes.ADDRESS_TUJING[k - 1].ADDRESS_NAME_TUJING);
							var newEL_2 = document.createElement('input');
							newEL_2.id = "addressjingting_lng_end" + k;
							newEL_2.type = "hidden";
							newEL_2.value = decodeURI(data.attributes.ADDRESS_TUJING[k - 1].ADDRESS_LNG_TUJING);
							var newEL_3 = document.createElement('input');
							newEL_3.id = "addressjingting_lat_end" + k;
							newEL_3.type = "hidden";
							newEL_3.value = decodeURI(data.attributes.ADDRESS_TUJING[k - 1].ADDRESS_LAT_TUJING);
							var newEL_4 = document.createElement('input');
							newEL_4.id = "addressjingting_name_end_bieming" + k;
							newEL_4.type = "hidden";
							var newEL_5 = document.createElement('input');
							newEL_5.id = "personjingting_shouhuo" + k;
							newEL_5.type = "hidden";
							newEL_5.value = decodeURI(data.attributes.ADDRESS_TUJING[k - 1].PERSON_NAME);
							var newEL_6 = document.createElement('input');
							newEL_6.id = "personjingting_shouhuo_phone" + k;
							newEL_6.type = "hidden";
							newEL_6.value = decodeURI(data.attributes.ADDRESS_TUJING[k - 1].PERSON_PHONE);
							content.appendChild(newEL_1);
							content.appendChild(newEL_2);
							content.appendChild(newEL_3);
							content.appendChild(newEL_4);
							content.appendChild(newEL_5);
							content.appendChild(newEL_6);

						}
					}

				}

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
			console.log(type);
			mui.toast('网络超时，请稍后再试！');
		}
	});
});

// 添加data_son_fahuo自定义事件监听
window.addEventListener('data_begin_message', function(event) {
	//获得起始点页面参数
	document.getElementById("begin_textXIU").innerHTML = event.detail.ADDRESS_NAME_BEGIN;
	document.getElementById("address_name_begin").value = event.detail.ADDRESS_NAME_BEGIN;
	document.getElementById("address_lng_begin").value = event.detail.ADDRESS_LNG_BEGIN;
	document.getElementById("address_lat_begin").value = event.detail.ADDRESS_LAT_BEGIN;
	document.getElementById("address_name_begin_bieming").value = event.detail.ADDRESS_NAME_BEGIN_BIEMING;
	document.getElementById("person_fahuo").value = event.detail.PERSON_FAHUO;
	document.getElementById("person_fahuo_phone").value = event.detail.PERSON_FAHUO_PHONE;
	return true;
});

// 添加data_son_shouhuo自定义事件监听
window.addEventListener('data_end_message', function(event) {
	//获得终点页面参数
	document.getElementById("end_textXIU").innerHTML = event.detail.ADDRESS_NAME_END;
	document.getElementById("address_name_end").value = event.detail.ADDRESS_NAME_END;
	document.getElementById("address_lng_end").value = event.detail.ADDRESS_LNG_END;
	document.getElementById("address_lat_end").value = event.detail.ADDRESS_LAT_END;
	document.getElementById("address_name_end_bieming").value = event.detail.ADDRESS_NAME_END_BIEMING;
	document.getElementById("person_shouhuo").value = event.detail.PERSON_SHOUHUO;
	document.getElementById("person_shouhuo_phone").value = event.detail.PERSON_SHOUHUO_PHONE;
	return true;
});

// 添加data_son_shouhuo自定义事件监听
window.addEventListener('data_jingting_message', function(event) {
	//获得终点页面参数
	document.getElementById("tujing_name_" + num).innerHTML = event.detail.ADDRESS_NAME_END;
	document.getElementById("addressjingting_name_end" + num).value = event.detail.ADDRESS_NAME_END;
	document.getElementById("addressjingting_lng_end" + num).value = event.detail.ADDRESS_LNG_END;
	document.getElementById("addressjingting_lat_end" + num).value = event.detail.ADDRESS_LAT_END;
	document.getElementById("addressjingting_name_end_bieming" + num).value = event.detail.ADDRESS_NAME_END_BIEMING;
	document.getElementById("personjingting_shouhuo" + num).value = event.detail.PERSON_SHOUHUO;
	document.getElementById("personjingting_shouhuo_phone" + num).value = event.detail.PERSON_SHOUHUO_PHONE;
	return true;
});

//发送请求按钮的点击事件
document.getElementById("xiugai_address").addEventListener('tap', function() {
	document.getElementById("xiugai_address").setAttribute("class","mui-btn mui-btn-block mui-btn-primary mui-disabled");
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
		ADDRESS_ID: addid,
		ADDRESS_NAME_BEGIN: address_name_begin,
		ADDRESS_LNG_BEGIN: address_lng_begin,
		ADDRESS_LAT_BEGIN: address_lat_begin,
		ADDRESS_NAME_BEGIN_BIEMING: address_name_begin_bieming,
		PERSON_FAHUO: person_fahuo,
		ADDRESS_NAME_END: address_name_end,
		ADDRESS_NAME_END: address_name_end,
		ADDRESS_LNG_END: address_lng_end,
		ADDRESS_LAT_END: address_lat_end,
		ADDRESS_NAME_END_BIEMING: address_name_end_bieming,
		PERSON_SHOUHUO: person_shouhuo,
		PERSON_SHOUHUO_PHONE: person_shouhuo_phone,
		ADDRESS_NAME_BIEMING: address_name_bieming,
		POINT_TUJING_SUM: point_tujing_sum
	};
	for(var k = 1; k <= point_tujing_sum; k++) {
		var addressjingting_name_end = document.getElementById("addressjingting_name_end" + k).value;
		var addressjingting_lng_end = document.getElementById("addressjingting_lng_end" + k).value;
		var addressjingting_lat_end = document.getElementById("addressjingting_lat_end" + k).value;
		var addressjingting_name_end_bieming = document.getElementById("addressjingting_name_end_bieming" + k).value;
		var personjingting_shouhuo = document.getElementById("personjingting_shouhuo" + k).value;
		var personjingting_shouhuo_phone = document.getElementById("personjingting_shouhuo_phone" + k).value;
		if(addressjingting_name_end == "") {
			mui.toast("请填写经停点地址");
			return false;
		}
		if(personjingting_shouhuo_phone == "") {
			mui.toast("请填写经停点收货人电话");
			return false;
		}
		if(address_name_bieming == "") {
			mui.toast('请填写路线别名')
			return false;
		}
		JSONMessage["ADDRESS_NAME_END_A" + k] = addressjingting_name_end;
		JSONMessage["ADDRESS_LNG_END_A" + k] = addressjingting_lng_end;
		JSONMessage["ADDRESS_LAT_END_A" + k] = addressjingting_lat_end;
		JSONMessage["PERSON_NAME_A" + k] = personjingting_shouhuo;
		JSONMessage["PERSON_PHONE_A" + k] = personjingting_shouhuo_phone;
	}

	if(person_fahuo_phone == "") {
		mui.toast('请填写发货人电话号')
		return false;
	}
	if(person_shouhuo_phone == "") {
		mui.toast('请填写收货人电话号')
		return false;
	}
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var url = serverAddress + "/address/editAddress_App.do";
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
				return true;

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
	span2_.style.color = "#000000";
	span2_.style.fontSize = "0.28rem";
	//	span2_.style.fontWeight = "100";

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
	var newEL_1 = document.createElement('input');
	newEL_1.id = "addressjingting_name_end" + i;
	newEL_1.type = "hidden";
	var newEL_2 = document.createElement('input');
	newEL_2.id = "addressjingting_lng_end" + i;
	newEL_2.type = "hidden";
	var newEL_3 = document.createElement('input');
	newEL_3.id = "addressjingting_lat_end" + i;
	newEL_3.type = "hidden";
	var newEL_4 = document.createElement('input');
	newEL_4.id = "addressjingting_name_end_bieming" + i;
	newEL_4.type = "hidden";
	var newEL_5 = document.createElement('input');
	newEL_5.id = "personjingting_shouhuo" + i;
	newEL_5.type = "hidden";
	var newEL_6 = document.createElement('input');
	newEL_6.id = "personjingting_shouhuo_phone" + i;
	newEL_6.type = "hidden";
	content.appendChild(newEL_1);
	content.appendChild(newEL_2);
	content.appendChild(newEL_3);
	content.appendChild(newEL_4);
	content.appendChild(newEL_5);
	content.appendChild(newEL_6);
});