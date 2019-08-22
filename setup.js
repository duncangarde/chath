function chLoad(version, file_name, element) {
	chLoadAssets(version);
	chLoadHtml(element, version, file_name);
	chLoadTriggers();
}

function chLoadAssets(version) {
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

function chhLoadTriggers() {
	var answers = document.querySelectorAll(".ans-sym");
	 for (let i = 0; i < answers.length; i++) {
	     answers[i].addEventListener("click", function() {
	       chhExpandSibling(this.parentNode.parentNode);
	       chhPickSelf(this);
	     });
	 }
	var see_alls = document.querySelectorAll(".chh-see-all");
	 for (let i = 0; i < see_alls.length; i++) {
	     see_alls[i].addEventListener("click", function() {
	     	var cont = this.closest('[data-class="chh-qa-section"]');
	     	var collapseds = cont.querySelectorAll('[data-class="ans-cont"]');
			 for (let i = 0; i < collapseds.length; i++) {
			     chhExpandSibling(collapseds[i].parentNode)
			 };
	     });
	 }
}

function chhAppearSeeAll(el) {
	var cont = el.closest('[data-class="chh-qa-section"]');
	cont.querySelector('.chh-see-all').classList.remove('hidden')
}

function chhDisappearSeeAll(el) {
	var cont = el.closest('[data-class="chh-qa-section"]');
	cont.querySelector('.chh-see-all').classList.add('hidden')
}

function chhPickSelf(el) {
	var self_active = el.classList.contains('picked');
	var us = el.parentNode.children;
	for (i = 0; i < us.length; i++) {
	  us.item(i).classList.remove('picked');
	};
	if (!self_active)
	{
		el.classList.add('picked');
	};
}

function chhExpandSibling(el) {
	var parent = el.parentNode;
	var expandable = el.nextElementSibling;
	if (expandable && !el.classList.contains('expanded')) 
	{
		el.classList.add('expanded');
		var this_level_height = expandable.scrollHeight
		var parent_level_height = 0
		if (expandable.parentNode.classList.contains('expandable')) {
			parent_level_height = expandable.parentNode.scrollHeight;
			total_height = this_level_height + parent_level_height
			expandable.parentNode.style.height = 'auto';
		}
		expandable.style.height = this_level_height + 'px';
		expandable.classList.remove('collapsed');
	}
}

		 	
function chhToggleSiblings(el) {
	var parent = el.parentNode;
	var expandable = el.nextElementSibling;
	if (el.classList.contains('expanded')) 
	{
		chhDisappearSeeAll(el);
		el.querySelector('.p-symbol').classList.remove('hidden');
		el.querySelector('.t-symbol').classList.add('hidden');
		el.classList.remove('expanded');
		expandable.style.height = "";
	} 
	else 
	{
		chhAppearSeeAll(el);
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
