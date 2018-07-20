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
mui.init({
	swipeBack: true //启用右滑关闭功能
});
var array_img = [];
var image_sfid = ''; //身份证
var image_xingche = ''; //行车证
var image_jiashi = ''; //驾驶证
mui('body').on('shown', '.mui-popover', function(e) {
	//console.log('shown', e.detail.id);//detail为当前popover元素
});
mui('body').on('hidden', '.mui-popover', function(e) {
	//console.log('hidden', e.detail.id);//detail为当前popover元素
});
//头像
var num;
mui('#OA_task_1').on('tap', 'a', function() {
	var Array = [];
	if(mui.os.plus) {
		if(this.getAttribute("id") != null) {
			var id = this.getAttribute("id");
			console.log(id);
			Array = id.split("_");
			num = Array[1];
			console.log(Array[1]);
		}
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
					getImage(Array[1]); /*拍照*/
					break;
				case 2:
					galleryImg(Array[1]); /*打开相册*/
					break;
				default:
					break;
			}
		})
	}
}, false);

// 选择拍照
function getImage(i) {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			document.getElementById("image_" + i).innerHTML = "<img src='" + entry.toLocalURL() + "'id='imgpaizhao'/>";

			document.getElementById("imgpaizhao").style.width = 500;
			document.getElementById("imgpaizhao").style.height = 350;
			var s = entry.toLocalURL() + "?version=" + new Date().getTime();
			console.log(s);
			uploadHead(s); /*上传图片*/
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(s) {
		console.log("error" + s);
	})
}

// 本地相册选择 
function galleryImg(i) {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
				root.getFile("head.png", {}, function(file) {
					//文件已存在 
					file.remove(function() {
						entry.copyTo(root, 'head.png', function(e) {
								document.getElementById("image_" + i).innerHTML = "<img src='" + entry.toLocalURL() + "'id='imgpaizhao'/>";
								document.getElementById("imgpaizhao").style.width = 500;
								document.getElementById("imgpaizhao").style.height = 350;
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

	var image = new Image();
	image.src = imgPath;
	image.onload = function() {
		getBase64Image(image);
	};
}

//将图片压缩转成base64 
function getBase64Image(img) {

	var expectWidth = 500;
	var expectHeight = 350;
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
					maxWidth: 500,
					maxHeight: 350,
					quality: 1,
					orientation: Orientation
				});
			}
			var dataURL = canvas.toDataURL("image/png", 1);
			imgData_new = dataURL.replace("data:image/png;base64,", "");
			// localStorage.setItem('HEAD_PHOTO', imgData_new);
			//	var list = plus.webview.currentWebview().opener();
			//	mui.fire(list, "refresh", {
			//		HEAD_PHOTO: imgData_new
			//	});
			//	array_img.push(imgData_new);
			switch(true) {
				case(num == 1):
					image_xingche = imgData_new;
					break;
				case(num == 2):
					image_jiashi = imgData_new;
					break;
				case(num == 3):
					image_sfid = imgData_new;
					break;
			}
			setTimeout(function() {
				// 加载完毕后关闭等待框，并展示页面
				plus.nativeUI.closeWaiting();
			}, 1000);
		});
	}, 1000);

}

//发送请求按钮的点击事件
document.getElementById("reg").addEventListener('tap', function() {
	// 设定等待动画框，新页面加载完毕后再显示
	var nwaiting = plus.nativeUI.showWaiting();
	var phone = localStorage.getItem("PHONE");
	var usertype = localStorage.getItem("USERTYPE");

	if(image_sfid == '') {
		mui.toast('请上传身份证');
		plus.nativeUI.closeWaiting();
		return false;
	}
	if(image_xingche == '') {
		mui.toast('请上传行车证');
		plus.nativeUI.closeWaiting();
		return false;
	}
	if(image_jiashi == '') {
		mui.toast('请上传驾驶证');
		plus.nativeUI.closeWaiting();
		return false;
	}

	/*在这里调用上传接口*/
	var url = serverAddress + "/appRegister/updateCar_App_Third.do";
	mui.ajax(url, {
		data: {
			IMAGE_1: image_sfid,
			IMAGE_2: image_xingche,
			IMAGE_3: image_jiashi,
			PHONE: phone,
			USERTYPE: usertype
		},
		dataType: 'json',
		type: 'post',
		timeout: 20000,
		success: function(data) {
			if(data.success == true) {
				localStorage.setItem('REGISTER_PAGE ', '3');
				mui.openWindow({
					id: 'examine',
					url: 'examine.html',
					show: {
						autoShow: false, //页面loaded事件发生后自动显示，默认为true
						event: 'loaded' //页面显示时机，默认为titleUpdate事件时显示
					},
					waiting: {
						autoShow: true //自动显示等待框，默认为true
					}
				});
				var examine = plus.webview.getWebviewById('examine');
				// 当下一页面加载完毕后关闭该页面
				examine.addEventListener('loaded', function() {
					mui.fire(examine, "close_register_input_file", {
						STATUS: 1
					});
				});
			}
			if(data.success == false) {
				mui.toast(decodeURI(data.msg));
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('网络超时，请稍后再试！');
		}
	});
});

// 关闭注册第二步页面
window.addEventListener('close_register_dirver', function(e) {
	plus.webview.currentWebview().opener().close();
});