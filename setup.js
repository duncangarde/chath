
function chLoadAssets(version) {
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
	var css_assets = ['https://use.typekit.net/zzx2vim.css']
	if (version) {
		css_assets.push('https://cdn.jsdelivr.net/gh/duncangarde/chath@' + version + '/pest.css')
	} else {
		css_assets.push('pest.css')
	}
	
	css_assets.forEach(function(href) {
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

function chLoadHtml(setup, version, file_frag) {
    var xmlhttp;
    if (window.XMLHttpRequest) 
    {
        xmlhttp = new XMLHttpRequest();
    } 
    else 
    {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() 
    {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) 
        {
           if(xmlhttp.status == 200){
           		var el = setup.parentNode;
           		var elChild = document.createElement('div');
           		elChild.classList.add('chh-container');
           		elChild.innerHTML = xmlhttp.responseText;
           		el.appendChild(elChild);
           }
           else {
               alert('Error');
           }
        }
    }

    xmlhttp.open("GET", 'https://cdn.jsdelivr.net/gh/duncangarde/chath@' + version + '/' + file_frag + '_headless.html', true);
    xmlhttp.send();
}

function chhToggleSiblings(el) {
	var parent = el.parentNode;
	var expandable = el.nextElementSibling;
	if (el.classList.contains('expanded')) {
		el.querySelector('.p-symbol').classList.remove('hidden');
		el.querySelector('.t-symbol').classList.add('hidden');
		el.classList.remove('expanded');
		expandable.style.height = "";
	} else {
		el.querySelector('.p-symbol').classList.add('hidden');
		el.querySelector('.t-symbol').classList.remove('hidden');
		el.classList.add('expanded');
		var this_level_height = expandable.scrollHeight
		var parent_level_height = 0
		if (expandable.parentNode.classList.contains('expandable')) {
			parent_level_height = expandable.parentNode.scrollHeight;
			total_height = this_level_height + parent_level_height
			expandable.parentNode.style.height = 'auto';
		}
		

		expandable.style.height = this_level_height + 'px';

	}
}
