mui.init({
	beforeback: function() {
		//返回true，继续页面关闭逻辑  
		mui.back;
		return true;
	}
});

mui.plusReady(function() {

	// 总积分
	var jifen = localStorage.getItem('JIFEN') == null ? "0" : localStorage.getItem('JIFEN');
	// 总积分
	document.getElementById('jifen_total').innerHTML = jifen;
	// 可使用积分
	document.getElementById('jifen_use').innerHTML = jifen;
	// 个人姓名
	document.getElementById('geren_name').innerHTML = localStorage.getItem('GEREN_NAME');
	// 图片
	var head_photo = localStorage.getItem('HEAD_PHOTO');
	// 读取缓存图片
	if(head_photo != null) {
		document.getElementById('head-img').src = 'data:image/png;base64,' + head_photo;
	} else {
		// 默认头像图片
		document.getElementById('head-img').src = '../../image/touxiang.png';
	}

	// 根据积分查询所属会员、会员vip图标、还有多少积分可以升级
	switch(true) {

		case(1000 > jifen >= 0):
			document.getElementById('huiyuan_level').innerHTML = '普通司机';
			document.getElementById('vip_level').src = '../../image/v1.png';
			// 差多少积分可以升级
			var cha = 1000 - jifen;
			document.getElementById('cha').innerHTML = cha;
			// 可升级成什么会员
			document.getElementById('next_level').innerHTML = '铜牌司机';
			break;

		case(3000 > jifen >= 1000):
			document.getElementById('huiyuan_level').innerHTML = '铜牌司机';
			document.getElementById('vip_level').src = '../../image/v1.png';
			// 差多少积分可以升级
			var cha = 3000 - jifen;
			document.getElementById('cha').innerHTML = cha;
			// 可升级成什么会员
			document.getElementById('next_level').innerHTML = '银牌司机';
			break;

		case(10000 > jifen >= 3000):
			document.getElementById('huiyuan_level').innerHTML = '银牌司机';
			document.getElementById('vip_level').src = '../../image/v1.png';
			// 差多少积分可以升级
			var cha = 10000 - jifen;
			document.getElementById('cha').innerHTML = cha;
			// 可升级成什么会员
			document.getElementById('next_level').innerHTML = '金牌司机';
			break;

		case(30000 > jifen >= 10000):
			document.getElementById('huiyuan_level').innerHTML = '金牌司机';
			document.getElementById('vip_level').src = '../../image/v1.png';
			// 差多少积分可以升级
			var cha = 30000 - jifen;
			document.getElementById('cha').innerHTML = cha;
			// 可升级成什么会员
			document.getElementById('next_level').innerHTML = '铂金司机';
			break;
		case(100000 > jifen >= 30000):
			document.getElementById('huiyuan_level').innerHTML = '铂金司机';
			document.getElementById('vip_level').src = '../../image/v1.png';
			// 差多少积分可以升级
			var cha = 100000 - jifen;
			document.getElementById('cha').innerHTML = cha;
			// 可升级成什么会员
			document.getElementById('next_level').innerHTML = '钻石司机';
			break;
		case(jifen >= 100000):
			document.getElementById('huiyuan_level').innerHTML = '钻石司机';
			document.getElementById('vip_level').src = '../../image/v1.png';
			// 差多少积分可以升级
			var cha = 0;
			document.getElementById('cha').innerHTML = cha;
			break;
	}
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();

});

// 会员和积分等级说明
document.getElementById("huiyuandengji").addEventListener('tap', function() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var webviewShow = plus.webview.create('huiyuandengji.html', 'huiyuandengji');
});