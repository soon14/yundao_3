var carTypeList = [];

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

document.getElementById("van").addEventListener("click", function() {
	gotoChecklineList(1);
});
document.getElementById("truck").addEventListener("click", function() {
	gotoChecklineList(2);
});
document.getElementById("motorbike").addEventListener("click", function() {
	gotoChecklineList(3);
});
document.getElementById("specialcar").addEventListener("click", function() {
	gotoChecklineList(4);
});

function getCarType() {
	var url = serverAddress + "/appcheckingline/itemlist.do";
	mui.ajax(url, {
		data: {},
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			/*'Content-Type': 'application/json'*/
		},
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.success == true) {
				carTypeList = data.obj;
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
getCarType();
var carTypeData = {};

function gotoChecklineList(type) {

	for(var i in carTypeList[type]) {
		carTypeData[i] = carTypeList[type][i];
	}
	var cartype = '';
	switch(type) {
		case 1:
			cartype = "小型客车";
			break;
		case 2:
			cartype = "多轴货车";
			break;
		case 3:
			cartype = "摩托车及低速车";
			break;
		case 4:
			cartype = "特种车辆";
			break;
		default:
			break;
	}
	carTypeData.CAR_TYPE = cartype;
	mui.openWindow({
		url: "../jianche/jianche_xiadan.html",
		id: "jianche_xiadan.html",
		extras: carTypeData,
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
		},
		waiting: {
			autoShow: true //自动显示等待框，默认为true
		}
	});
}

window.addEventListener("cityChangeEvent", function(e) {
	if(e.detail.keyWord == "cityChanged") {
		carTypeData.CITY_CODE = e.detail.CITY_CODE;
		carTypeData.PROVINCE_CODE = e.detail.PROVINCE_CODE;
		carTypeData.AREA_CODE = e.detail.AREA_CODE;
	}
}, false);