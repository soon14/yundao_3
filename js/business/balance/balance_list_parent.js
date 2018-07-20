mui.plusReady(function() {
	var topoffset;
	var iszhichi = plus.navigator.isImmersedStatusbar();
	console.log(iszhichi);

	if(iszhichi) {
		console.log(Math.round(plus.navigator.getStatusbarHeight()));
		topoffset = (Math.round(plus.navigator.getStatusbarHeight()) + 45) + 'px';
		document.querySelector("header").style.height = topoffset;
		document.querySelector("header").style.paddingTop = "20px";
	} else {
		topoffset = 45 + 'px';
		document.querySelector("header").style.height = topoffset;
	}
	var subpage_style = {
		top: topoffset,
	};

	mui.init({
		subpages: [{
			url: '../balance/balance_detailed_list.html', //下拉刷新内容页面地址
			id: 'balance_detailed_list', //内容页面标志
			//		styles: {
			//			top: '150px' //内容页面顶部位置,需根据实际页面布局计算，若使用标准mui导航，顶部默认为48px；
			//		}
			styles: subpage_style
		}],
		// 回退监听
		beforeback: function() {
			//返回true，继续页面关闭逻辑  
			mui.back;
			return true;
		}
	});
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
})