mui.init({
	gestureConfig: {
		tap: true, //默认为true
		doubletap: true, //默认为false
		longtap: true, //默认为false
		swipe: true, //默认为true
		drag: true, //默认为true
		hold: false, //默认为false，不监听
		release: false //默认为false，不监听
	},
	// 回退监听
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
var arry1 = [0, 0, 0, 0];
mui('button').on('tap', 'span', function(e) {
	if(this.parentNode.style.backgroundImage.indexOf('biankuang1.png') > 0) {
		this.parentNode.style.backgroundImage = 'url(../../image/biankuang2.png)';
		this.parentNode.style.color = '#d94949';
		//		this.style.color="#d94949";
		//		this.chilstyle.color="#f19191";
		if(this.innerText.indexOf("回款") > 0) {
			confirm();
			arry1[2] = 1;
		}

		if(this.innerText.indexOf("装卸") > 0) {
			arry1[0] = 1;
		}

		if(this.innerText.indexOf("回单") > 0) {
			arry1[1] = 1;
		}
	} else if(this.parentNode.style.backgroundImage.indexOf('biankuang2.png') > 0) {
		this.parentNode.style.backgroundImage = 'url(../../image/biankuang1.png)';
		this.parentNode.style.color = '#424242';
		//		this.style.color="#424242";
		//		document.getElementById("dibu").style.color="#424242";
		if(this.innerText.indexOf("回款") > 0) {
			arry1[2] = 0;
		}

		if(this.innerText.indexOf("装卸") > 0) {
			arry1[0] = 0;
		}

		if(this.innerText.indexOf("回单") > 0) {
			arry1[1] = 0;
		}
	}
});

var confirm = function(content, onPopupClick) {
	var oDiv = document.createElement('div');
	var mengban = document.createElement('div');
	mengban.innerHTML = '<div class="mui-popup-backdrop mui-active" style="display: block;"></div>'
	oDiv.innerHTML = '<div class="mui-popup mui-popup-in"style="display: block;"><div class="mui-popup-inner"><div class="mui-popup-title">提示</div><div class="mui-popup-text">司机需带回</div><div class="mui-popup-input"><div class="mui-input-row"><label>金额</label><input id="account"type="text"class="mui-input"placeholder="最高10000元"></div></div></div><div class="mui-popup-buttons"><span class="mui-popup-button" id="quxiao">取消</span><span class="mui-popup-button mui-popup-button-bold"id="queding">确认</span></div></div>'
	document.body.appendChild(mengban);
	document.body.appendChild(oDiv);
	// 正整数
	var num_validate = /^[1-9]\d*$/;

	document.getElementById("queding").addEventListener('tap', function() {
		if(document.getElementById("account").value != "" && num_validate.test(document.getElementById("account").value)) {
			arry1[3] = document.getElementById("account").value;
			console.log(arry1[3]);
		} else {
			mui.toast("请正确填写价格");
			return false;
		}
		document.body.removeChild(mengban);
		document.body.removeChild(oDiv);
		return false;
	});
	document.getElementById("quxiao").addEventListener('tap', function() {
		document.body.removeChild(mengban);
		document.body.removeChild(oDiv);
		document.getElementById("buttonid3").style.backgroundImage = 'url(../../image/biankuang1.png)';
		return false;
	});
}
document.getElementById("queren").addEventListener('tap', function() {

	var detail = plus.webview.currentWebview().opener();
	mui.fire(detail, 'ewaidata', {
		ewai_data: arry1
	});
	mui.back();
});