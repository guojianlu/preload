//图片预加载
(function ($) {

	function Preload(imgs,options) {
		this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
		this.opts = $.extend({}, Proload.DEFAULT, options);

		this._unordered();
	}

	Preload.DEFAULT = {
		each: null,   //每一张图片加载完毕后执行
		all: null     //所有图片加载完毕后执行
	};
	Preload.prototype._unordered = function () {  //无序加载
		var imgs = this.imgs,
		    opts = this.opts,
		    count = 0, 
		    len = imgs.length;

		$.each(imgs,function (i,src) {
			if (typeof src != 'string') return;

			var imgObj = new Image();
			//异步方法
			//将图片都提前加载到缓存中
			//然后页面需要直接从缓存中拿
			$(imgObj).on('load error',function () {
				opts.each && opts.each(count);
				// $progress.html(Math.round((count + 1) / len *100) + '%');

				if(count >= len -1) {
					// $('.loading').hide();
					// document.title = '1/' + len;
					opts.all && opts.all();
				}

				count++;
			});

			imgObj.src=src;
		});

	}

	//对象级插件
	// $.fn.extend ->  $('#img').preload()
	//工具级插件
	// $.extend -> $.preload()

	$.extend({
		preload: function (imgs,opts) {
			new Proload(imgs,opts);
		}
	});


})(jQuery);