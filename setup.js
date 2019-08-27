function chLoad(version, file_name, element) {
	chLoadAssets(version);
	chLoadHtml(element, version, file_name);
}

function chLoadAssets(version) {

	[
	  'https://unpkg.com/jspdf@latest/dist/jspdf.min.js',
	  'https://cdn.jsdelivr.net/npm/html2canvas@v1.0.0-rc.3/dist/html2canvas.min.js',
	  'https://cdn.jsdelivr.net/gh/eKoopmans/html2pdf@v0.9.1/dist/html2pdf.min.js',
	].forEach(function(src) {
		  var script = document.createElement('script');
		  script.src = src;
		  script.async = false;
		  document.head.appendChild(script);
	});

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
           		chhLoadTriggers();
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
	       chhPickTwins(this);
	     });
	 }
	var see_alls = document.querySelectorAll(".chh-see-all");
	 for (let i = 0; i < see_alls.length; i++) {
	     see_alls[i].addEventListener("click", function() {

	     	var cont = this.closest('[data-class="chh-qa-section"]');
	     	collapseds = cont.querySelectorAll('.collapsed');
	     	if (collapseds.length) {
			 this.innerHTML = "Close all"
			 for (let i = 0; i < collapseds.length; i++) {
			 	collapseds[i].classList.remove('collapsed');
			 }
	     	} else {
	     		this.innerHTML = "See all";
	     		cont.querySelector('.chh-q-to-a').click();  		
	     	}
	     });
	 }
}


function chhAppearSeeAll(el) {
	var cont = el.closest('[data-class="chh-qa-section"]');
	see_all = cont.querySelector('.chh-see-all');
	collapseds = cont.querySelectorAll('.collapsed');
	if (collapseds.length) {
		see_all.innerHTML = "See all"
	} else {
		see_all.innerHTML = "Close all"
	}
	see_all.classList.remove('hidden');
}

function chhDisappearSeeAll(el) {
	var cont = el.closest('[data-class="chh-qa-section"]');
	see_all = cont.querySelector('.chh-see-all');
	see_all.classList.add('hidden');
}

function chhPickTwins(el) {
	var answer_blocks = document.getElementById('view_container').querySelectorAll('.ans-cont');
	var print_blocks = document.getElementById('pdf_container').querySelectorAll('.ans-cont');

	for (let i = 0; i < answer_blocks.length; i++) {
	 	print_blocks[i].innerHTML = answer_blocks[i].innerHTML
	 }
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

function chhToggleQuestions (el) {
	var expandable = el.nextElementSibling;
	if (window.getComputedStyle(expandable).display === 'none') {
		chhAppearSeeAll(el);
	} else {
		chhDisappearSeeAll(el);
	}
	slideToggle(expandable);
}

function chhExpandSibling(el) {
	var parent = el.parentNode;
	parent.style.height = "auto";
	var expandable = el.nextElementSibling;
	if (expandable && window.getComputedStyle(expandable).display === 'none') {
		slideDown(expandable)
		expandable.classList.remove('collapsed');
	};
	cont = el.closest('[data-class="chh-qa-section"]');
	collapseds = cont.querySelectorAll('.collapsed');
	if (collapseds.length) {
		see_all.innerHTML = "See all"
	} else {
		see_all.innerHTML = "Close all"
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
	// else 
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

function slideUp(target, duration=200) {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout( () => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      //alert("!");
    }, duration);
  }

function slideDown(target, duration=300) {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;

    if (display === 'none')
      display = 'block';

    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout( () => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  }

function slideToggle(target, duration = 300) {
    if (window.getComputedStyle(target).display === 'none') {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
}

function savePDF () {
		view = document.getElementById('view_container');
		view.classList.add('hidden')
		container = document.getElementById('pdf_container');
		container.classList.remove('hidden');
		y = container.getBoundingClientRect().top + window.scrollY;
		window.scroll({top: y})
		var opt = {
		  margin:       10,
		  filename:     'pest-toolkit.pdf',
		  html2canvas: {scale: 2},
		  jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait'},
		  pagebreak: { mode: 'css'}
		};

		html2pdf().set(opt).from(container).save().then(function() {container.classList.add('hidden');view.classList.remove('hidden')});	
}