var status = 0

mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	},
	beforeback: function() {
		clear_all();
		//返回true，继续页面关闭逻辑  
		mui.back;
		return true;
	}
});

mui.plusReady(function() {
	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
	});
	/*plus.geolocation.getCurrentPosition(translatePoint, function(e) {
		mui.toast("异常:" + e.message);
	});*/
	// 加载完毕后关闭等待框，并展示页面
	/*var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();*/

});

// 禁用所有输入框软键盘的搜索按钮，防止出现创建重复页面
mui(".mui-input-group").on('keydown', 'input', function(e) {

	if(13 == e.keyCode) { //点击了“搜索”  
		document.activeElement.blur(); //隐藏软键盘 
	}
}, false);

//获取订单页面传过来的类型
window.addEventListener('data_xinzeng_luxian', function(event) {
	//获得事件参数
	status = event.detail.STATUS;
	if(status == 1 || status == 3 || status == 4) {
		var addresses_gps = localStorage.getItem('ADDRESSES_GPS') == null ? "" : localStorage.getItem('ADDRESSES_GPS');
		document.getElementById("ADDRESS_NAME_BEGIN").value = addresses_gps;
	}
	if(status == 2) {
		/*document.getElementById("ADDRESS_NAME_BEGIN_TEXT").placeholder = event.detail.ADDRESS_NAME_BEGIN;*/
		document.getElementById("ADDRESS_NAME_BEGIN").value = event.detail.ADDRESS_NAME_BEGIN;
		document.getElementById("ADDRESS_LNG_BEGIN").value = event.detail.ADDRESS_LNG_BEGIN;
		document.getElementById("ADDRESS_LAT_BEGIN").value = event.detail.ADDRESS_LAT_BEGIN;
		document.getElementById("ADDRESS_NAME_BEGIN_BIEMING").value = event.detail.ADDRESS_NAME_BEGIN_BIEMING;
		document.getElementById("PERSON_FAHUO").value = event.detail.PERSON_FAHUO;
		document.getElementById("PERSON_FAHUO_PHONE").value = event.detail.PERSON_FAHUO_PHONE;
	}
});

var city = '';

function translatePoint(position) {
	city = position.address.city;
}
document.getElementById("save_fahuo").addEventListener('tap', function() {
	//	document.getElementById("save_fahuo").setAttribute("class","mui-btn mui-btn-block mui-btn-primary mui-disabled");
	var address_name_begin = document.getElementById("ADDRESS_NAME_BEGIN").value; // 起点
	var address_lng_begin = document.getElementById("ADDRESS_LNG_BEGIN").value; // 起点经度
	var address_lat_begin = document.getElementById("ADDRESS_LAT_BEGIN").value; // 起点纬度
	var address_name_begin_bieming = document.getElementById("ADDRESS_NAME_BEGIN_BIEMING").value.trim(); // 起点简称
	var person_fahuo = document.getElementById("PERSON_FAHUO").value.trim(); // 发货人
	var person_fahuo_phone = document.getElementById("PERSON_FAHUO_PHONE").value.trim(); // 电话

	var phone_validate = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;

	if(address_lng_begin == "") {
		mui.toast("请从下拉列表中选择输入的发货地址");
		//		document.getElementById("save_fahuo").setAttribute("class","mui-btn mui-btn-block mui-btn-primary");
		return false;
	}
	if(person_fahuo_phone == "" || !phone_validate.test(person_fahuo_phone)) {
		mui.toast("请正确填写发货人电话");
		//		document.getElementById("save_fahuo").setAttribute("class","mui-btn mui-btn-block mui-btn-primary");
		return false;
	}

	if(status == 1) {
		var xinzeng_luxian = plus.webview.getWebviewById('xinzeng_luxian');
		mui.fire(xinzeng_luxian, "data_begin_message", {
			ADDRESS_NAME_BEGIN: address_name_begin,
			ADDRESS_LNG_BEGIN: address_lng_begin,
			ADDRESS_LAT_BEGIN: address_lat_begin,
			ADDRESS_NAME_BEGIN_BIEMING: address_name_begin_bieming,
			PERSON_FAHUO: person_fahuo,
			PERSON_FAHUO_PHONE: person_fahuo_phone
		});
	}
	if(status == 2) {
		var xiugai_luxian = plus.webview.getWebviewById('xiugai_luxian');
		mui.fire(xiugai_luxian, "data_begin_message", {
			ADDRESS_NAME_BEGIN: address_name_begin,
			ADDRESS_LNG_BEGIN: address_lng_begin,
			ADDRESS_LAT_BEGIN: address_lat_begin,
			ADDRESS_NAME_BEGIN_BIEMING: address_name_begin_bieming,
			PERSON_FAHUO: person_fahuo,
			PERSON_FAHUO_PHONE: person_fahuo_phone
		});
	}
	if(status == 3) {
		var zhuanche_xiadan = plus.webview.getWebviewById('zhuanche_xiadan');
		mui.fire(zhuanche_xiadan, "data_son_fahuo_to_ORDER", {
			/*mui.fire(zhuanche_xiadan, "data_begin_message", {*/
			ADDRESS_NAME_BEGIN: address_name_begin,
			ADDRESS_LNG_BEGIN: address_lng_begin,
			ADDRESS_LAT_BEGIN: address_lat_begin,
			ADDRESS_NAME_BEGIN_BIEMING: address_name_begin_bieming,
			PERSON_FAHUO: person_fahuo,
			PERSON_FAHUO_PHONE: person_fahuo_phone
		});
	}
	if(status == 4) {
		var shunfengche_xiadan = plus.webview.getWebviewById('shunfengche_xiadan');
		mui.fire(shunfengche_xiadan, "data_son_fahuo_to_ORDER", {
			/*mui.fire(zhuanche_xiadan, "data_begin_message", {*/
			ADDRESS_NAME_BEGIN: address_name_begin,
			ADDRESS_LNG_BEGIN: address_lng_begin,
			ADDRESS_LAT_BEGIN: address_lat_begin,
			ADDRESS_NAME_BEGIN_BIEMING: address_name_begin_bieming,
			PERSON_FAHUO: person_fahuo,
			PERSON_FAHUO_PHONE: person_fahuo_phone
		});
	}
	clear_all();
	mui.back();

});

// 百度地图API功能
function G(id) {
	return document.getElementById(id);
}

var map = new BMap.Map("l-map");
map.centerAndZoom(city, 12); // 初始化地图,设置城市和地图级别。

var ac = new BMap.Autocomplete( //建立一个自动完成的对象
	{
		"input": "ADDRESS_NAME_BEGIN",
		"location": map
	});

ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
	var str = "";
	var _value = e.fromitem.value;
	var value = "";
	if(e.fromitem.index > -1) {
		value = _value.province + _value.city + _value.district + _value.street + _value.business;
	}
	str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

	value = "";
	if(e.toitem.index > -1) {
		_value = e.toitem.value;
		value = _value.province + _value.city + _value.district + _value.street + _value.business;
	}
	str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
	//G("searchResultPanel_begin").innerHTML = str;
});

var myValue;
ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
	var _value = e.item.value;
	myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
	document.getElementById("ADDRESS_NAME_BEGIN").value = myValue;
	//G("searchResultPanel_begin").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

	setPlace();
});

function setPlace() {
	map.clearOverlays(); //清除地图上所有覆盖物
	function myFun() {
		var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
		/*map.centerAndZoom(pp, 18);
		map.addOverlay(new BMap.Marker(pp)); //添加标注*/
		document.getElementById("ADDRESS_LNG_BEGIN").value = pp.lng; //获取经度
		document.getElementById("ADDRESS_LAT_BEGIN").value = pp.lat; //获取纬度
	}
	var local = new BMap.LocalSearch(map, { //智能搜索
		onSearchComplete: myFun
	});
	local.search(myValue);
}

// 监听地址栏内容变化，有变化时清空地址和经纬度坐标
document.getElementById("ADDRESS_NAME_BEGIN").addEventListener('input', function() {
	/*document.getElementById("ADDRESS_NAME_BEGIN").value = ""; // 起点*/
	document.getElementById("ADDRESS_LNG_BEGIN").value = ""; // 起点经度
	document.getElementById("ADDRESS_LAT_BEGIN").value = ""; // 起点纬度
});

// 返回或保存之后清空该页的文本框内容
function clear_all() {
	document.getElementById("ADDRESS_NAME_BEGIN").value = ""; // 起点
	/*document.getElementById("ADDRESS_NAME_BEGIN_TEXT").placeholder = "请输入起点";
	document.getElementById("ADDRESS_NAME_BEGIN_TEXT").value = "";// 清空输入框*/
	document.getElementById("ADDRESS_LNG_BEGIN").value = ""; // 起点经度
	document.getElementById("ADDRESS_LAT_BEGIN").value = ""; // 起点纬度
	document.getElementById("ADDRESS_NAME_BEGIN_BIEMING").value = ""; // 起点简称
	document.getElementById("PERSON_FAHUO").value = ""; // 发货人
	document.getElementById("PERSON_FAHUO_PHONE").value = ""; // 电话
	// 关闭软键盘
	document.activeElement.blur();
}