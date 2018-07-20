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

mui.plusReady(function() {
	// 加载完毕后关闭等待框，并展示页面
	var currentView = plus.webview.currentWebview();
	currentView.show('slide-in-right', 200);
	plus.nativeUI.closeWaiting();
});

window.addEventListener('refresh', function(event) {
	//获得获取客服问题ID
	var id = event.detail.KEFU_ID;
	var title = event.detail.TITLE;
	if(id == "item1_1") {
		var record = [{
			"title": '什么是等候费？如何计算？',
			"content": '司机接单就位后有一定的免费等候时间来进行货物的装卸，如果超出免费等候时间则会产生等候费用。等候费用的计算方式按照各城市各个车型的相应收费标准进行计算，具体收费标准请参考运到APP中“我的”个人中心——“收费标准',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);

	} else if(id == "item1_2") {
		var record = [{
			"title": '订单服务过程中如产生过路过桥费、停车费等费用由谁承担？',
			"content": '目前部分订单在行驶过程中会产生过路过桥费、停车费等费用，司机在行驶过程中为保证货物及时到达会先行支付，如果是必需的费用，客户需要在订单完成时补充付款给司机。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item1_3") {
		var record = [{
			"title": '额外服务有哪些？如何收费（包括回单回款，装卸费等费用）？',
			"content": '额外服务有回单回款、花卉搬运、马桶拆装、洗手池拆装、花洒拆装等，不同的司机具备不同的技能，目前免费的项目有回单回款、花卉搬运，其他项目技能则会根据技能不同收取不等的费用，客户可自主与司机进行商议。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item1_4") {
		var record = [{
			"title": '收货时付款和发车时付款',
			"content": '用户在下单时可以选择收货时付款和发车时付款。收货时付款即为到达最后一个目的地时，根据实际行驶里程、等候时间来计算费用；发车时付款即在发车前，根据预估里程、等候时间收费（其中等候时间按装货时间的两倍来计算）',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item2_1") {
		var record = [{
			"title": '如何下单？',
			"content": '登录运到APP ,选择适合车型后→完善订单信息→点击“下一步”进行订单确认→选择支付时间后点击“立即下单“→在选择司机后进入相应的订单显示页面，跟随页面流程的提示进行下单。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item2_2") {
		var record = [{
			"title": '如何创建城际订单？',
			"content": '城际订单下单流程与普通订单基本一致，首先需要确定下单城市是否已经开通城际订单业务，如若已经开通则可以按照普通订单的流程进行下单，下单时仅需要在输入目的地时选择已开通的城际城市，再输入详细地址即可。注：目前城际订单有城市限制，部分城市没有开通城际订单业务。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item2_3") {
		var record = [{
			"title": '如何取消订单？',
			"content": '客户可以在司机开始运输之前自主取消订单，如若订单已经在运输途中，为保障司机的利益客户无法自主取消订单，此时如果因合理原因需要取消订单，需要联系司机进行协商，司机同意后致电客服中心取消订单。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item2_4") {
		var record = [{
			"title": '订单已有司机接单时，能否更改目的地？',
			"content": '订单如果已被有司机接单，客户则无法在运到的APP客户端修改目的地，如果需要进行目的地的修改，用户需要联系司机进行目的地修改，或者在与司机协商后致电客服中心进行目的地修改。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item2_5") {
		var record = [{
			"title": '货物在运输过程中出现损坏，怎么办？',
			"content": '订单将由中国人民保险为您提供货物损失险，如运输中出现货物损失，请尽量于开始服务后24小内在对应订单的详情页进行“物损理赔”。注意：1）、建议您在货物到达目的地时，进行验货；2）、如果订单已完成，您可以在详情页进行“理赔申诉”；3） 、物损理赔在线报案功能服务目前已开通大部分一二线城市，其他城市可通过拨打客服电话进行物损理赔，客服电话：××××××',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item2_6") {
		var record = [{
			"title": '已经对订单进行评价，是否能够修改评价？',
			"content": '如果对已完成的订单已经进行了评价，评价入口则会自动关闭，无法修改评价内容。注：五星评价为好评，一星评价为差评，请您谨慎评价。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item2_7") {
		var record = [{
			"title": '为什么预估价格与实际收费不一样？',
			"content": '预估价格是根据预估里程进行价格计算，预估里程则是根据百度地图上的最短路程进行预估的，不是实际行驶里程。车辆实际行驶过程中，司机会为规避堵车路段等因素选择更佳路线，因此预估价格可能会和实际收费不符。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item3_1") {
		var record = [{
			"title": '运到订单，如何进行支付？支付方式有几种？',
			"content": '目前运到订单可以选择发车前付款和收货后付款，客户可根据自身实际需求进行选择，在选择付款方式后，确认支付方式便可以进行付款；运到订单目前有四种支付方式：微信支付、余额支付及现金支付。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item3_2") {
		var record = [{
			"title": '订单在线支付时被重复扣款了，怎么办？',
			"content": '如果订单出现在线支付时被重复扣款的情况，系统在48小时内会自动将重复扣除的款项按原支付路径退回至用户支付的账户内，客户可在48小时后进行核实；如依旧有异常，可以联系客服中心解决。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item3_3") {
		var record = [{
			"title": '如何充值会员？',
			"content": '登录运到APP后，进入“我的 – 个人中心”页面，点击“我的余额”后进入账户余额界面，点击页面底部“立即充值”选择相应会员套餐后，进入支付界面，选择支付方式后付款即可。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item4_1") {
		var record = [{
			"title": '如何使用优惠券？',
			"content": '用户下单时，系统会自动匹配当前可用的面额最高的优惠券，结算时系统自动减免优惠券相应面额；在“完善订单信息”界面下方点击订单价格进入“车费预估”界面，在车费预估界面点击“优惠券抵扣”则可以自主选择优惠券。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item4_2") {
		var record = [{
			"title": '如何查看我的优惠券？',
			"content": '在“我的”个人中心里面，点击“我的优惠券”。可查看目前可使用的优惠券；页面底部点击“查看已使用 / 过期优惠券”后，可查看已使用及已过期的优惠券。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item4_3") {
		var record = [{
			"title": '从哪些渠道可以获得优惠券？',
			"content": '获取优惠券的途径：用户第一次登录运到APP时，系统会自动赠送优惠券。注：首单优惠券每个手机号和【设备】都只能获得1次。分享朋友圈—订单完成后，分享运到红包至微信朋友圈或者直接发送给微信好友，可获得相应面额优惠券。注：每个手机号及设备仅可参与一次。红包优惠券—用户分享至微信朋友圈或直接发送给微信好友的红包链接，点击即可领取不等面值的优惠券。积分兑换—用户在运到消费获得的奖励积分可用于兑换优惠券，积分可在运到APP客户端“我的 – 我的积分”查看。充值送券—为运到账户充值时，系统将会随充值套餐自动赠送多张优惠券。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item4_4") {
		var record = [{
			"title": '如何获得积分，积分怎样使用？',
			"content": '积分是用户在运到消费获得的奖励，消费1元得1积分（不包括优惠券消费）；积分可用来在运到积分平台兑换优惠券。红包优惠券—用户分享至微信朋友圈或直接发送给微信好友的红包链接，点击即可领取不等面值的优惠券。积分兑换—用户在运到消费获得的奖励积分可用于兑换优惠券，积分可在运到APP客户端“我的 – 我的积分”查看。充值送券—为运到账户充值时，系统将会随充值套餐自动赠送多张优惠券。',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
	} else if(id == "item1_1_wt") {
		var record = [{
			"title": '关于提现收费规则说明',
			"content": '关于提现收费规则说明关于提现收费规则说明',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
		document.getElementById("biaoti").innerHTML = title;
	} else if(id == "item2_1_wt") {
		var record = [{
			"title": '忘记提现密码怎么办？',
			"content": '如果您遗忘了您的提取密码，请拨打电话0431-6655665咨询修改密码的相关事宜',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
		document.getElementById("biaoti").innerHTML = title;
	} else if(id == "item3_1_wt") {
		var record = [{
			"title": '提现支持哪些银行？',
			"content": '静待市场部确定支持哪些银行',
		}]
		var str = template('radio-tigan', {
			"record": record
		});
		$(".mui-content").html(str);
		document.getElementById("biaoti").innerHTML = title;
	}
});