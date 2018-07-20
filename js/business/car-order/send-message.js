var ordertype = 0; //接收订单页面
var xiugaitype = 0; //接收修改页面
var xinzengtype = 0; //接收新增页面
mui.init({
	
});
mui.plusReady(function() {
	plus.geolocation.getCurrentPosition(translatePoint, function(e) {
		mui.toast("异常:" + e.message);
	});
	//获取上页传过来的类型，如果是经停点为1，目的地为2
	var self = plus.webview.currentWebview();
	console.log(self.address_type);
	console.log(self.xiugaiaddress_type);
	console.log(self.xinzengaddress_type);
	xinzengtype = self.xinzengaddress_type;
	ordertype = self.address_type;
	xiugaitype = self.xiugaiaddress_type;
});

var city = '';

function translatePoint(position) {
	city = position.address.city;
}
document.getElementById("save_fahuo").addEventListener('tap', function() {
	var address_name_begin = document.getElementById("ADDRESS_NAME_BEGIN").value; // 起点
	var address_lng_begin = document.getElementById("ADDRESS_LNG_BEGIN").value; // 起点经度
	var address_lat_begin = document.getElementById("ADDRESS_LAT_BEGIN").value; // 起点纬度
	var address_name_begin_bieming = document.getElementById("ADDRESS_NAME_BEGIN_BIEMING").value; // 起点简称
	var person_fahuo = document.getElementById("PERSON_FAHUO").value; // 发货人
	var person_fahuo_phone = document.getElementById("PERSON_FAHUO_PHONE").value; // 电话

	if(address_name_begin == "") {
		mui.toast("请填写发货地址");
		return false;
	}
	if(person_fahuo_phone == "") {
		mui.toast("请填写发货人电话");
		return false;
	}
	var main = plus.webview.getWebviewById('xinzeng_luxian');
	var main2 = plus.webview.getWebviewById('xiugai_luxian');
	var main3 = plus.webview.getWebviewById('order_Add');
	//if(xinzengtype==2){
	mui.fire(main, "data_son_fahuo", {
		ADDRESS_NAME_BEGIN: address_name_begin,
		ADDRESS_LNG_BEGIN: address_lng_begin,
		ADDRESS_LAT_BEGIN: address_lat_begin,
		ADDRESS_NAME_BEGIN_BIEMING: address_name_begin_bieming,
		PERSON_FAHUO: person_fahuo,
		PERSON_FAHUO_PHONE: person_fahuo_phone
	});
	//}
	if(xiugaitype == 2) {
		mui.fire(main2, "data_son_fahuo3", {
			ADDRESS_NAME_BEGIN: address_name_begin,
			ADDRESS_LNG_BEGIN: address_lng_begin,
			ADDRESS_LAT_BEGIN: address_lat_begin,
			ADDRESS_NAME_BEGIN_BIEMING: address_name_begin_bieming,
			PERSON_FAHUO: person_fahuo,
			PERSON_FAHUO_PHONE: person_fahuo_phone
		});
	}
	if(ordertype == 2) {
		mui.fire(main3, "data_son_fahuo_to_ORDER", {
			ADDRESS_NAME_BEGIN: address_name_begin,
			ADDRESS_LNG_BEGIN: address_lng_begin,
			ADDRESS_LAT_BEGIN: address_lat_begin,
			ADDRESS_NAME_BEGIN_BIEMING: address_name_begin_bieming,
			PERSON_FAHUO: person_fahuo,
			PERSON_FAHUO_PHONE: person_fahuo_phone
		});
	}
	plus.webview.getWebviewById('begin_message').close();
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
	G("searchResultPanel_begin").innerHTML = str;
});

var myValue;
ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
	var _value = e.item.value;
	myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
	G("searchResultPanel_begin").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

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

function OnInput_begin(event) {
	document.getElementById("ADDRESS_LNG_BEGIN").value = ''; //清空起点经度
	document.getElementById("ADDRESS_LAT_BEGIN").value = ''; //清空起点纬度
}
// Internet Explorer 
function OnPropChanged_begin(event) {
	if(event.propertyName.toLowerCase() == "value") {
		document.getElementById("ADDRESS_LNG_BEGIN").value = ''; //清空起点经度
		document.getElementById("ADDRESS_LAT_BEGIN").value = ''; //清空起点纬度
	}
}