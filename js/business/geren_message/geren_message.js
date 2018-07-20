// 旧头像
var imgData_old = "";
// 新头像
var imgData_new = "";

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

//头像
document.getElementById('head_photo').addEventListener('tap', function() {
	if(mui.os.plus) {
		var a = [{
			title: "拍照"
		}, {
			title: "从手机相册选择"
		}];
		plus.nativeUI.actionSheet({
			/*title: "修改用户头像",*/
			cancel: "取消",
			buttons: a
		}, function(b) { /*actionSheet 按钮点击事件*/
			switch(b.index) {
				case 0:
					break;
				case 1:
					getImage(); /*拍照*/
					break;
				case 2:
					galleryImg(); /*打开相册*/
					break;
				default:
					break;
			}
		})
	}
}, false);

// 选择拍照
function getImage() {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var s = entry.toLocalURL() + "?version=" + new Date().getTime();
			uploadHead(s); /*上传图片*/
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(s) {
		console.log("error" + s);
	}, {
		filename: "_doc/head.png"
	})
}

// 本地相册选择 
function galleryImg() {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
				root.getFile("head.png", {}, function(file) {
					//文件已存在 
					file.remove(function() {
						entry.copyTo(root, 'head.png', function(e) {
								var e = e.fullPath + "?version=" + new Date().getTime();
								uploadHead(e); /*上传图片*/
								//变更大图预览的src 
								//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现 
							},
							function(e) {
								console.log('copy image fail:' + e.message);
							});
					}, function() {
						console.log("delete image fail:" + e.message);
					});
				}, function() {
					//文件不存在 
					entry.copyTo(root, 'head.png', function(e) {
							var path = e.fullPath + "?version=" + new Date().getTime();
							uploadHead(path); /*上传图片*/
						},
						function(e) {
							console.log('copy image fail:' + e.message);
						});
				});
			}, function(e) {
				console.log("get _www folder fail");
			})
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(a) {}, {
		filter: "image"
	})
};

//上传图片 
function uploadHead(imgPath) {
	head_image.src = imgPath;
	head_image.style.width = 80;
	head_image.style.height = 80;

	var image = new Image();
	image.src = imgPath;
	image.onload = function() {
		getBase64Image(image);
	};
}

//将图片压缩转成base64 
function getBase64Image(img) {

	var expectWidth = 80;
	var expectHeight = 80;
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();

	var canvas = document.createElement("canvas");
	setTimeout(function() {
		var ctx = canvas.getContext("2d");
		canvas.width = expectWidth;
		canvas.height = expectHeight;
		ctx.drawImage(img, 0, 0, expectWidth, expectHeight);

		var mpImg = new MegaPixImage(img);
		EXIF.getData(img, function() {
			EXIF.getAllTags(this);
			/**
			 * 图片的旋转方向信息
			 * 1、图片没有发生旋转
			 * 6、顺时针90°
			 * 8、逆时针90°
			 * 3、180° 旋转
			 */
			var Orientation = EXIF.getTag(this, 'Orientation');
			if(Orientation != "" && Orientation != null) {
				// 方向信息，canvas 显示形式，canvas 对象，that,宽度，高度
				mpImg.render(canvas, {
					maxWidth: 80,
					maxHeight: 80,
					quality: 1,
					orientation: Orientation
				});
			}
			var dataURL = canvas.toDataURL("image/png", 1);
			imgData_new = dataURL.replace("data:image/png;base64,", "");
			localStorage.setItem('HEAD_PHOTO', imgData_new);
			var list = plus.webview.currentWebview().opener();
			mui.fire(list, "refresh", {
				HEAD_PHOTO: imgData_new
			});
			setTimeout(function() {
				// 加载完毕后关闭等待框，并展示页面
				plus.nativeUI.closeWaiting();
			}, 2000);
		});
	}, 1000);

}
// 姓名
document.getElementById("geren_name").addEventListener("tap", function() {
	var geren_name = localStorage.getItem('GEREN_NAME') == null ? "" : localStorage.getItem('GEREN_NAME');
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var webviewShow = plus.webview.create('name.html', 'name');
	var name = plus.webview.getWebviewById('name');
	name.addEventListener('loaded', function() {
		mui.fire(name, "user_name", {
			GEREN_NAME: geren_name
		});
	});

});

// 性别选择
var leixinginput = document.getElementById('leixinginput');
mui('body').on('tap', '.mui-popover-action li>a', function() {
	var a = this,
		parent;
	//根据点击按钮，反推当前是哪个actionsheet
	for(parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
		if(parent.classList.contains('mui-popover-action')) {
			break;
		}
	}
	//关闭actionsheet
	mui('#' + parent.id).popover('toggle');
	if(parent.id == "forward") {

		var sex = a.innerText == "男" ? "1" : "2";
		var url = serverAddress + "/order_App/updateUser_Info_App.do";
		mui.ajax(url, {
			data: {
				SEX: sex
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 30000, //超时时间设置为30秒；
			headers: {
				/*'Content-Type': 'application/json'*/
			},
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				if(data.success == true) {
					localStorage.setItem('SEX', a.innerHTML);
					// 刷新父页面
					var list = plus.webview.currentWebview().opener();
					//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
					mui.fire(list, 'refresh');
				}
				if(data.success == false) {
					mui.toast(decodeURI(data.msg));
				}
			},
			error: function(xhr, type, errorThrown) {
				// 异常处理；
				// mui.toast('服务器异常，请稍后再试！');
			}
		});
		leixinginput.innerText = a.innerText;
	}
});

// 个性签名
document.getElementById("signatureLi").addEventListener("tap", function() {
	var sign_name = localStorage.getItem('SIGN_NAME') == null ? "" : localStorage.getItem('SIGN_NAME');
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var webviewShow = plus.webview.create('gexingqianming.html', 'gexingqianming');
	var gexingqianming = plus.webview.getWebviewById('gexingqianming');
	gexingqianming.addEventListener('loaded', function() {
		mui.fire(gexingqianming, "sign_name", {
			SIGN_NAME: sign_name
		})
	});
});

// 接收wode页面中传递过来的个人信息
window.addEventListener('geren_message', function(event) {
	var head_photo = event.detail.HEAD_PHOTO;
	var geren_name = event.detail.GEREN_NAME;
	var sex = event.detail.SEX;
	var sign_name = event.detail.SIGN_NAME;
	if(head_photo == null || head_photo == '') {
		// 默认头像图片
		document.getElementById('head_image').src = '../../image/touxiang.png';
	} else {
		// 头像图片base64编码转为图片
		document.getElementById('head_image').src = 'data:image/png;base64,' + head_photo;
	}

	document.getElementById('user_name').innerHTML = geren_name;
	document.getElementById('leixinginput').innerHTML = sex;
	document.getElementById('sign_name').innerHTML = sign_name;

});

// 刷新页面
window.addEventListener('refresh', function(e) {
	var head_photo = localStorage.getItem('HEAD_PHOTO') == null ? "" : localStorage.getItem('HEAD_PHOTO');
	var geren_name = localStorage.getItem('GEREN_NAME') == null ? "" : localStorage.getItem('GEREN_NAME');
	var sex = localStorage.getItem('SEX') == null ? "" : localStorage.getItem('SEX');
	var sign_name = localStorage.getItem('SIGN_NAME') == null ? "" : localStorage.getItem('SIGN_NAME');
	document.getElementById('head_image').innerHTML = head_photo;
	document.getElementById('user_name').innerHTML = geren_name;
	document.getElementById('leixinginput').innerHTML = sex;
	document.getElementById('sign_name').innerHTML = sign_name;
	//获得列表界面的webview  
	var list = plus.webview.currentWebview().opener();
	//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
	mui.fire(list, 'refresh');
	//返回true，继续页面关闭逻辑  
	return true;
});