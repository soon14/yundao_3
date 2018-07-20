mui.init({
	// 回退监听
	beforeback: function() {
		// 关闭软键盘
		document.activeElement.blur();
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
document.getElementById("tixian").addEventListener('tap', function(e) {
	// 关闭软键盘
	document.activeElement.blur();
	e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
	var btnArray = ['取消', '确定'];
	mui.prompt('请输入6位提现密码', '在此输入密码', '', btnArray, function(e) {
		if(e.index == 1) {
			var password = e.value;
			return true;
		} else {
			//info.innerText = '你点了取消按钮';
			return false;
		}

	})

})
// 常见问题
document.getElementById("tixian-wenti").addEventListener('tap', function() {
	// 关闭软键盘
	document.activeElement.blur();
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var recharge = plus.webview.create('../balance/common_problem.html', 'common_problem');
});