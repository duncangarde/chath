
function chLoadAssets() {
	// [
	//   'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.3/iframeResizer.min.js',
	//   'file:///C:/sites/shelftaught/shelftaught-iframe-js/iframe-load-actions.js',
	// ].forEach(function(src) {
	//   if (document.querySelectorAll('[src="' + src + '"]').length > 0) {
	//   	if (typeof iFrameResize === 'function') {
	//   		iFrameResize();
	//   	};
	//   	if (typeof stReceiveMessage === 'function') {
	//   		window.addEventListener("message", stReceiveMessage);
	//   	};
	//   	if (typeof iFrameLazyLoad === 'function') {
	//   		iFrameLazyLoad();
	//   	};
	//   }
	//   else {
	// 	  var script = document.createElement('script');
	// 	  script.src = src;
	// 	  script.async = false;
	// 	  document.head.appendChild(script);
	//   };
	// });
	console.log('hi');
	[
	  'https://use.typekit.net/zzx2vim.css',
	  'pest.css'
	].forEach(function(href) {
	  if (document.querySelectorAll('[href="' + href +'"]').length > 0) {
	  }
	  else {
		  var link = document.createElement('link');
		  link.href = href;
		  link.rel = "stylesheet"
		  link.async = false;
		  document.head.appendChild(link);
	  };
	});
}
