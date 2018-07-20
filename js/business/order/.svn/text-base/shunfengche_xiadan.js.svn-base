var num = 1;
var car_type = 0; //用于存储车型
var content = document.querySelector('.mui-content');
var jsms = {}; //用于存储经停点坐标
var allkm; //总公里数
var shiji = 0; //实际金额
var yuji = 0; //预估金额
var youhui_ID=0;//优惠卷ID
var huoyun = ""; //保险金额
var youhui=0;
var arry1 = [0, 0, 0, 0]; //用于存储额外信息
var beizhu = ""; //用于存储备注留言信息
var huoyuntype = 1; //用于存储货运险类型

var i = 0;
var sss=0;
var icount = 0; //记录经停点个数
var table = document.body.querySelector('.jingting_class');
var content = document.querySelector('.mui-content');
mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	},
	swipeBack: false, //启用右滑关闭功能
	beforeback: function() {
		//返回true，继续页面关闭逻辑  
		mui.back;
		return true;
	}
});

mui('#scroll').scroll({
	indicators: true //是否显示滚动条  
});
mui.plusReady(function() {
	//获取用车类型

	plus.geolocation.getCurrentPosition(function(p) {
		lng = p.coords.longitude;
		lat = p.coords.latitude;
		/**
		 * 国内火星坐标系 (GCJ-02)、WGS84坐标系与百度坐标系 (BD-09) 的转换
		 * 
		 * @param lng
		 * @param lat
		 */

		// 判断iOS系统还是Android系统
		if(plus.os.name == 'iOS') {
			// WGS84转GCJ-02
			var point_gcj02 = GPS.gcj_encrypt(lat, lng);
			var lng_gcj02 = point_gcj02.lon;
			var lat_gcj02 = point_gcj02.lat
			// GCJ-02转BD-09
			var point_bd09 = GPS.bd_encrypt(lat_gcj02, lng_gcj02);
			lng = point_bd09.lon;
			lat = point_bd09.lat
		} else {
			// Android系统
			// GCJ-02转BD-09
			var point_gcj02 = GPS.bd_encrypt(lat, lng);
			lng = point_gcj02.lon;
			lat = point_gcj02.lat
		}
		console.log(lng);
		console.log(lat);
		country = p.address.country;
		province = p.address.province;
		city = p.address.city;
		district = p.address.district;
		street = p.address.street;
		addresses = p.addresses;

		document.getElementById("address_name_begin").value = addresses;
		document.getElementById("address_lng_begin").value = lng;
		document.getElementById("address_lat_begin").value = lat;
		document.getElementById("begin_text").innerHTML = addresses;
		document.getElementById("phone").innerHTML = localStorage.getItem('PHONE');

	}, function(e) {
		mui.toast("坐标获取异常： " + e.message);
	}, {
		timeout: 15000
	});
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});

window.addEventListener('CAR_TYPE_dd', function(event) {
	//获得上一页传来的车型
	car_type = event.detail;
	localStorage.setItem("car_type", event.detail);
});

//用车时间事件
var now = new Date();
document.getElementById("chose_time").addEventListener('tap', function() {
	var dtpicker = new mui.DtPicker({
		"type": "datetime",
		beginDate: new Date(), //设置开始日期 
		endDate: new Date(now.getFullYear(), now.getMonth() + 1, now.getDay() + 3), //设置开始日期 */
		"customData": {
			/*"h": [
				{ value: "am", text: "上午" },
				{ value: "pm", text: "下午" },
			],*/
			"i": [{
					"text": "00",
					"value": "00"
				},
				{
					"text": "15",
					"value": "15"
				},
				{
					"text": "30",
					"value": "30"
				},
				{
					"text": "45",
					"value": "45"
				}
			]

		}
	});
	dtpicker.show(function(rs) {
		/*mui.toast(rs.text);*/
		document.getElementById("time_text").innerHTML = rs.text;
	})
});

//常用路线按钮点击事件
document.getElementById("user_address").addEventListener('tap', function(e) {
	mui.openWindow({
		id: 'select_luxian',
		url: '../geren_message/select_luxian.html',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
	var detail = plus.webview.getWebviewById('select_luxian');
	mui.fire(detail, 'getDetail', {
		STATUS: 2
	});
});

//额外服务按钮点击事件
document.getElementById("erwai").addEventListener('tap', function(e) {
	mui.openWindow({
		id: 'additional-services',
		url: '../car-order/additional-services.html',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
});

//货运险按钮点击事件
document.getElementById("huoyun").addEventListener('tap', function(e) {
	mui.openWindow({
		id: 'freight_insurance',
		url: '../car-order/freight-insurance.html',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
});
//优惠卷点击事件
document.getElementById("youhuijuan").addEventListener('tap', function(e) {
	if(document.getElementById("jianyibaojia").innerHTML==""){
		mui.toast("请选择目的地");
		return false;
	}
	//if(youhui_ID==0){
		mui.openWindow({
			id: 'coupon',
			url: '../coupon/coupon.html',
			show: {
				autoShow: false, //页面loaded事件发生后自动显示，默认为true
				event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
			},
			waiting: {
				autoShow: true //自动显示等待框，默认为true
			}
		});
		var detail = plus.webview.getWebviewById('coupon');
		mui.fire(detail, 'xiadan_money', {
			MONEY: shiji
		});
	//}else{
	//	mui.toast("您已经选择过优惠卷！");
	//}
});
//留言按钮点击事件
document.getElementById("liuyan").addEventListener('tap', function(e) {
	mui.openWindow({
		id: 'message',
		url: '../car-order/message.html',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
});
// 经停点
mui('#OA_task_1').on('tap', '.mui-btn', function(event) {
	var elem = this;
	var li = elem.parentNode.parentNode;
	mui.confirm('确认删除该条记录？', '经停点', btnArray, function(e) {
		if(e.index == 0) {
			icount -= 1;
			li.parentNode.removeChild(li);
			getDestance();
		} else {
			setTimeout(function() {
				mui.swipeoutClose(li);
			}, 0);
		}
	});
});
var btnArray = ['确认', '取消'];

mui('#tianjiaLi').on('tap', 'a', function(e) {
	if(icount >= 10) {
		mui.toast("最多只能有十个经停点！");
		return false;
	}
	sss += 1;
	icount = sss;
	var li_ = document.createElement('li');
	li_.className = "mui-table-view-cell zhongjian";
	var div_ = document.createElement('div');
	div_.className = "mui-slider-right mui-disabled";
	var a_ = document.createElement('button');
	a_.className = "mui-btn mui-btn-red";
	a_.innerText = "删除";
	var div2_ = document.createElement('div');
	div2_.className = "mui-slider-handle";
	var a2_ = document.createElement('a');
	a2_.id = "tujing_id_" + sss;
	a2_.href = "#";
	a2_.value = sss;
	a2_.className = "tingjingdian";
	var div3_ = document.createElement('div');
	div3_.className = "mui-media-body mui-ellipsis";
	var span_ = document.createElement('span');
	span_.className = "jingting";

	span_.innerHTML = "<img src='../../image/jing.png'>";
	var span2_ = document.createElement('span');
	span2_.style.color = "#999999";
	span2_.style.fontSize = "0.28rem";
	span2_.style.fontWeight = "100";

	span2_.id = "tujing_name_" + sss;
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
	for(var i1 = 1; i1 <= sss; i1++) {
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
//选择经停点
mui(".jingting_class").on('tap', 'a', function(e) {
	//获取a标签id
	var id = this.getAttribute("id");
	//console.log(id);
	//获取是第几个动态生成的标签
	num = id.split("_")[2];
	//console.log(num);
	//传值给详情页面，通知加载新数据
	/*var detail = mui.get*/

	//				//打开新闻详情
	mui.openWindow({
		id: 'jingting_message',
		url: '../geren_message/jingting_message.html',
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
	var detail = plus.webview.getWebviewById('jingting_message');
	mui.fire(detail, 'getDetail', {
		WHICH: num,
		STATUS: 4
	});
});
//选择发货地
document.getElementById("begin_address").addEventListener('tap', function() {

	mui.openWindow({
		url: '../geren_message/begin_message.html',
		id: 'begin_message',
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
	var detail = plus.webview.getWebviewById('begin_message');
	mui.fire(detail, 'data_xinzeng_luxian', {
		STATUS: 4
	});
});
//选择目的地
document.getElementById("end_address").addEventListener('tap', function() {

	mui.openWindow({
		url: '../geren_message/end_message.html',
		id: 'end_message',
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
	var detail = plus.webview.getWebviewById('end_message');
	mui.fire(detail, 'data_xinzeng_luxian', {
		STATUS: 4
	});
});

// 添加data_son_fahuo自定义事件监听 从begin_message.html页面获取
window.addEventListener('data_son_fahuo_to_ORDER', function(event) {

	//获得起始点页面参数
	document.getElementById("begin_text").innerHTML = event.detail.ADDRESS_NAME_BEGIN;
	document.getElementById("address_name_begin").value = event.detail.ADDRESS_NAME_BEGIN;
	document.getElementById("address_lng_begin").value = event.detail.ADDRESS_LNG_BEGIN;
	document.getElementById("address_lat_begin").value = event.detail.ADDRESS_LAT_BEGIN;
	document.getElementById("address_name_begin_bieming").value = event.detail.ADDRESS_NAME_BEGIN_BIEMING;
	document.getElementById("person_fahuo").value = event.detail.PERSON_FAHUO;
	document.getElementById("person_fahuo_phone").value = event.detail.PERSON_FAHUO_PHONE;
	document.getElementById("phone").innerHTML = event.detail.PERSON_FAHUO_PHONE;
});

// 添加data_son_shouhuo自定义事件监听 从end_message.html页面获取
window.addEventListener('data_son_shouhuo_to_ORDER', function(event) {
	//获得终点页面参数
	document.getElementById("end_text").innerHTML = event.detail.ADDRESS_NAME_END;
	document.getElementById("address_name_end").value = event.detail.ADDRESS_NAME_END;
	document.getElementById("address_lng_end").value = event.detail.ADDRESS_LNG_END;
	document.getElementById("address_lat_end").value = event.detail.ADDRESS_LAT_END;
	document.getElementById("address_name_end_bieming").value = event.detail.ADDRESS_NAME_END_BIEMING;
	document.getElementById("person_shouhuo").value = event.detail.PERSON_SHOUHUO;
	document.getElementById("person_shouhuo_phone").value = event.detail.PERSON_SHOUHUO_PHONE;

	getDestance();
	document.querySelector("#next_page").setAttribute("class", "mui-btn mui-btn-block mui-btn-primary");
});
// 添加data_son_shouhuo自定义事件监听 从jingting_message.html页面获取
window.addEventListener('data_son_shouhuo_to_ORDER_JINGTING2', function(event) {
	//获得终点页面参数
	//	console.log(event.detail.ADDRESS_NAME_END);
	document.getElementById("tujing_name_" + num).innerHTML = event.detail.ADDRESS_NAME_END;
	document.getElementById("addressjingting_name_end" + num).value = event.detail.ADDRESS_NAME_END;
	document.getElementById("addressjingting_lng_end" + num).value = event.detail.ADDRESS_LNG_END;
	document.getElementById("addressjingting_lat_end" + num).value = event.detail.ADDRESS_LAT_END;
	document.getElementById("addressjingting_name_end_bieming" + num).value = event.detail.ADDRESS_NAME_END_BIEMING;
	document.getElementById("personjingting_shouhuo" + num).value = event.detail.PERSON_SHOUHUO;
	document.getElementById("personjingting_shouhuo_phone" + num).value = event.detail.PERSON_SHOUHUO_PHONE;

	jsms["jingting_lnd_end" + num] = event.detail.ADDRESS_LNG_END;
	jsms["jingting_lat_end" + num] = event.detail.ADDRESS_LAT_END;
	getDestance();
});

//货运险页面传过来的值
window.addEventListener('loading', function(event) {
	//获得起始点页面参数
	console.log(event.detail.RADIO_VALUE_NEW);
	console.log(event.detail.RADIO_MONEY_NEW);
	document.getElementById('huoyun_span').innerHTML = event.detail.RADIO_MONEY_NEW + "元";
	// 先减去原先的货运险金额，然后将新的货运险金额加上，并将新的货运险金额赋给货运险金额字段
	if(shiji != 0) {
		shiji -= huoyun;
	}
	shiji += parseInt(event.detail.RADIO_MONEY_NEW);
	huoyun = parseInt(event.detail.RADIO_MONEY_NEW);
	document.getElementById("jianyibaojia").innerHTML = "约" + shiji + "元";

});
//优惠卷页面传过来的值
window.addEventListener('yhj_money', function(event) {
	//获得起始点页面参数
	console.log(event.detail.YOUHUI_ID);
	console.log(event.detail.YOUHUI_MONEY);
	document.getElementById('youhuijuan_span').innerHTML = "您的优惠卷为"+event.detail.YOUHUI_MONEY+"元";
	youhui_ID=event.detail.YOUHUI_ID;
	// 先减去原先的货运险金额，然后将新的货运险金额加上，并将新的货运险金额赋给货运险金额字段
	if(shiji != 0) {
		shiji += youhui;
	}
	shiji -= parseInt(event.detail.YOUHUI_MONEY);
	youhui = parseInt(event.detail.YOUHUI_MONEY);
	document.getElementById("jianyibaojia").innerHTML = "约" + shiji + "元";
});
//额外服务页面传过来的值
window.addEventListener('ewaidata', function(event) {
	//获得起始点页面参数
	arry1 = event.detail.ewai_data;
	console.log(event.detail.ewai_data[2]);
	if(arry1[0] == 0 && arry1[1] == 0 && arry1[2] == 0) {
		document.getElementById("ewai_span").innerHTML = '卸载、回单回款等服务';
	} else {
		document.getElementById("ewai_span").innerText = ewai(arry1[0], arry1[1], arry1[2], arry1[3]);
	}

});
//留言页面传过来的值
window.addEventListener('beizhu', function(event) {
	console.log(event.detail.beizhuneirong);
	beizhu = event.detail.beizhuneirong;
	document.getElementById("liuyan_span").innerText = beizhu;
});
//选择路线页面传过来的值
window.addEventListener('data_message_total', function(event) {
	var tujing = document.getElementById("tujing");
	var childs = tujing.childNodes;
	for(var i = 0; i < childs.length; i++) {
		//		alert(childs[i].nodeName); 
		tujing.removeChild(childs[i]);
	}
	var arrydata = event.detail.ADDRESS_ID;
	console.log("address_id:" + arrydata);
	var url = serverAddress + "/address/address_Detail_App.do";
	mui.ajax(url, {
		data: {
			ADDRESS_ID: arrydata
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
				document.getElementById("begin_text").innerHTML = decodeURI(data.attributes.ADDRESS_DETAIL[0].ADDRESS_NAME_BEGIN);
				document.getElementById("end_text").innerHTML = decodeURI(data.attributes.ADDRESS_DETAIL[0].ADDRESS_NAME_END);
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
				console.log("经停点个数：" + point_tujing_sum);
				icount = point_tujing_sum;
				sss=point_tujing_sum;
				if(point_tujing_sum != 0) {
					for(var i1 = 1; i1 <= point_tujing_sum; i1++) {
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
						a2_.id = "tujing_id_" + i1;
						a2_.href = "#";
						a2_.value = i1;
						a2_.className = "tingjingdian";
						var div3_ = document.createElement('div');
						div3_.className = "mui-media-body mui-ellipsis";
						var span_ = document.createElement('span');
						span_.className = "jingting";
						span_.innerHTML = "<img src='../../image/jing.png'>";
						var span2_ = document.createElement('span');
						span2_.style.color = "#999999";
						span2_.style.fontSize = "0.28rem";
						span2_.style.fontWeight = "100";
						span2_.id = "tujing_name_" + i1;
						// 途径点地点名
						span2_.innerHTML = decodeURI(data.attributes.ADDRESS_TUJING[i1 - 1].ADDRESS_NAME_TUJING);
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
						for(var k = 1; k <= i1; k++) {
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
							jsms["jingting_lnd_end" + k] = data.attributes.ADDRESS_TUJING[k - 1].ADDRESS_LNG_TUJING;
							jsms["jingting_lat_end" + k] = data.attributes.ADDRESS_TUJING[k - 1].ADDRESS_LAT_TUJING;
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
			getDestance();
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
			mui.toast('网络超时，请稍后再试！');
		}
	});
});
//计算公里数和预计金额
function getDestance() {

	var xishu, qibu;
	//	alert("车型" + car_type);
	if(car_type == 0) {
		car_type = localStorage.getItem("car_type");
	}
	if(car_type == 1) {
		xishu = 3;
		qibu = 28;
	}
	if(car_type == 2) {
		xishu = 4;
		qibu = 48;
	}
	if(car_type == 3) {
		xishu = 4;
		qibu = 48;
	}
	if(car_type == 4) {
		xishu = 4;
		qibu = 78;
	}
	localStorage.setItem("car_type", car_type);
	var address_lng_begin = document.getElementById("address_lng_begin").value;
	var address_lat_begin = document.getElementById("address_lat_begin").value;
	var address_lng_end = document.getElementById("address_lng_end").value;
	var address_lat_end = document.getElementById("address_lat_end").value;
	console.log(address_lng_begin);
	console.log(address_lat_begin);
	console.log(address_lng_end);
	console.log(address_lat_end);
	var jingtingpoint = [];
	var allkm = 0;
	console.log(icount);
	if(icount > 0) {
		for(var i = 0; i < icount; i++) {
			var Key = 'jingting_lnd_end' + (i + 1);
			console.log(jsms["jingting_lnd_end" + (i + 1)]);
			console.log(jsms["jingting_lat_end" + (i + 1)]);
			jingtingpoint.push(new BMap.Point(jsms["jingting_lnd_end" + (i + 1)], jsms["jingting_lat_end" + (i + 1)]));
		}
		for(var i = 0; i < jingtingpoint.length; i++) {
			console.log(JSON.stringify(jingtingpoint[i]));
		}
	}
	var map = new BMap.Map("allmap");
	var transit = new BMap.DrivingRoute(map, {
		renderOptions: {
			map: map
		},
		onSearchComplete: function(results) {
			if(transit.getStatus() != BMAP_STATUS_SUCCESS) {
				return;
			}
			var plan = results.getPlan(0);
			allkm = plan.getDistance(false);
			console.log(allkm);
			huoyun = document.getElementById('huoyun_span').innerText;
			huoyun = huoyun.replace("元", "");
			console.log(huoyun);
			if(allkm > 5000) {
				var dykm = Math.ceil((allkm - 5000) / 1000);
				console.log("gongli" + dykm);
				console.log("wuwai" + (dykm * xishu));
				yuji = parseInt(qibu + dykm * xishu);
				shiji = parseInt(qibu + dykm * xishu + parseInt(huoyun)-parseInt(youhui));
				console.log("实际1：" + shiji);
			} else {
				yuji = parseInt(qibu);
				shiji = parseInt(qibu + parseInt(huoyun)-parseInt(youhui));
				console.log("实际2：" + shiji);
			}
			document.getElementById("jianyibaojia").innerHTML = "约" + shiji + "元";
			document.querySelector("#next_page").setAttribute("class", "mui-btn mui-btn-block mui-btn-primary");
		}

	});
	if(address_lng_begin != null && address_lat_begin != null && address_lng_end != null && address_lat_end != null && address_lng_begin != "" && address_lat_begin != "" && address_lng_end != "" && address_lat_end != "") {
		transit.search(new BMap.Point(address_lng_begin, address_lat_begin), new BMap.Point(address_lng_end, address_lat_end), {
			startCity: "长春",
			endCity: "长春",
			waypoints: jingtingpoint
		}); //waypoints表示途经点
	} else {
		mui.toast("请选择目的地");
	}
}

//下一步按钮的点击事件
document.getElementById("next_page").addEventListener('tap', function(e) {
	//		e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
	//		var btnArray = ['', '我知道了'];
	//		mui.prompt('当前运力紧张，临时提价<br>加价倍率<span style="color:#FF9700">×1.4倍</span>', '', '<span style="color:#020202;font-size:20px">动态调价提醒</span>', btnArray, function(e) {
	//			if(e.index == 0) {
	//				mui.openWindow({
	//					url: '../car-order/order-confirm.html',
	//					id: 'order-confirm',
	//					waiting: {
	//						autoShow: false //自动显示等待框，默认为true
	//					}
	//				});
	//			} else {
	//				mui.openWindow({
	//					url: '../car-order/order-confirm.html',
	//					id: 'order-confirm',
	//					waiting: {
	//						autoShow: false //自动显示等待框，默认为true
	//					}
	//				});
	//			}
	//		});

	//订单信息整合到JSON中
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
	var EWAI_1 = arry1[0];
	var EWAI_2 = arry1[1];
	var EWAI_3;
	console.log(arry1[2]);
	if(arry1[2] != 0) {
		EWAI_3 = 1;
	} else {
		EWAI_3 = arry1[2];
	}
	var EWAI_3_MONEY = arry1[3];
	var OD_TYPE = 3;
	var CAR_TYPE = car_type;
	var shijian = document.getElementById("time_text").innerText == "现在" ? getNowFormatDate() : document.getElementById("time_text").innerText;
	console.log(shijian);

	var dangqianshijian = getNowFormatDate();
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
		DATE_XIADAN: dangqianshijian,
		DATE_YJYONGCHE: shijian,
		BEIZHU: beizhu,
		CAR_TYPE: CAR_TYPE,
		MONEY_YUJI: yuji,
		MONEY_SHIJI: shiji,
		MONEY_XIAOFEI: 0,
		MONEY_BAOXIAN: huoyun,
		STATUS_BAOXIAN: huoyuntype,
		POINT_TUJING_SUM: icount,
		STATUS_QUXIAO: 0,
		EWAI_1: EWAI_1,
		EWAI_2: EWAI_2,
		EWAI_3: EWAI_3,
		EWAI_3_MONEY: EWAI_3_MONEY,
		OD_TYPE: OD_TYPE,
		OD_STATUS: 1,
		STATUS_ORDER_HIS: 1,
		STATUS_CHARGE: 2,
		COUPON_CUSTOMER_ID: youhui_ID,
		ADDRESS_NAME_END_A1: '',
		ADDRESS_LNG_END_A1: '',
		ADDRESS_LAT_END_A1: '',
		PERSON_NAME_A1: '',
		PERSON_PHONE_A1: ''
	};
	for(var i1 = 1; i1 <= sss; i1++) {
		var addressjingting_name_end = document.getElementById("addressjingting_name_end" + i1).value;
		var addressjingting_lng_end = document.getElementById("addressjingting_lng_end" + i1).value;
		var addressjingting_lat_end = document.getElementById("addressjingting_lat_end" + i1).value;
		var addressjingting_name_end_bieming = document.getElementById("addressjingting_name_end_bieming" + i1).value;
		var personjingting_shouhuo = document.getElementById("personjingting_shouhuo" + i1).value;
		var personjingting_shouhuo_phone = document.getElementById("personjingting_shouhuo_phone" + i1).value;
		JSONMessage["ADDRESS_NAME_END_A" + i1] = addressjingting_name_end;
		JSONMessage["ADDRESS_LNG_END_A" + i1] = addressjingting_lng_end;
		JSONMessage["ADDRESS_LAT_END_A" + i1] = addressjingting_lat_end;
		JSONMessage["PERSON_NAME_A" + i1] = personjingting_shouhuo;
		JSONMessage["PERSON_PHONE_A" + i1] = personjingting_shouhuo_phone;
	}
	console.log(JSON.stringify(JSONMessage));

	var nwaiting = plus.nativeUI.showWaiting();
	mui.openWindow({
		url: '../car-order/shunfeng-order-confirm.html',
		id: 'shunfeng-order-confirm',
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
	var webviewShow = plus.webview.getWebviewById('shunfeng-order-confirm');
	webviewShow.addEventListener('loaded', function() {
		mui.fire(webviewShow, 'ORDER_CESHI', {
			order_messageJSON: JSONMessage
		});
	});
	/*detail.addEventListener('loaded', function() {
		mui.toast("加载完毕"); //运行到这里会控制台会显示plus is not defined
		mui.fire(detail, 'ORDER_CESHI', {
			order_messageJSON: JSONMessage
		});
	});*/
});

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hours + seperator2 + minutes;
	return currentdate;
}

// 关闭页面
window.addEventListener('close', function(e) {
	setTimeout(function() {
		// 加载完毕后关闭等待框，并展示页面
		plus.nativeUI.closeWaiting();
		mui.back();
	}, 1000);
});

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