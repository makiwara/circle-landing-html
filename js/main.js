/* Prepare icons */
var data = [ 
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    'practice-1-books', 'practice-2-lecture', 'practice-3-research', 'practice-4-studies', 'practice-5-reflect',
    'orbita', 'box', 'practice-circle', 'practice-line',
    'blob-big', 'blob-small', 'blob-orbita',
    'send', 'above', 'pos' ];
var fallback = {}, placement = {};
for (var i=0; i<data.length; i++) {
    fallback['symbol-'+data[i]] = data[i] + '.png';
    placement['.icon-'+data[i]] = 'symbol-'+data[i];
}
var resize = {
	'.icon-pos .svg_icon': [41, 41],
	'.icon-above .svg_icon': [126, 126],
	'.icon-send .svg_icon': [138, 87],
	'.icon-blob-big .svg_icon': [140, 140],
	'.icon-blob-small .svg_icon': [140, 140],
	'.icon-blob-orbita .svg_icon': [1100, 1100],
	'.icon-orbita .svg_icon': [550, 500],
	'.icon-box    .svg_icon': [236, 116],
	'.icon-practice-circle .svg_icon': [550, 500]	
}
var resize_small = {
	'.icon-pos .svg_icon': [41, 41],
	'.icon-above .svg_icon': [126, 126],
	'.icon-send .svg_icon': [138, 87],
	'.icon-blob-big .svg_icon': [140, 140],
	'.icon-blob-small .svg_icon': [140, 140],
	'.icon-orbita .svg_icon': [412, 375],
	'.icon-box    .svg_icon': [236, 116],	
	'.icon-practice-line   .svg_icon': [80, 650],
	'.icon-practice-circle .svg_icon': [334, 304]	
}
$.svgIcons('img/icons/icons.svg', { 
        w: 64,
        h: 64,
        fallback_path: 'img/icons/', 
        fallback: fallback,
        callback: resizer,
        placement: placement
})

var resizeTimeout;
$(window).resize(function(){
	resizeTimeout = setTimeout(resizer, 100);
})
function resizer() {
	sticky_programme();
	menu_pos();
	if ($(window).width() >= 1023)
		$.resizeSvgIcons(resize);
	else
		$.resizeSvgIcons(resize_small);
}


/* sticky programme */
$(sticky_programme);
$(window).scroll(sticky_programme);
var sticky_programme_state = 'down';
function sticky_programme() {
	if ($(window).width() >= 768) {
		var parts = [];
		$(".programme-part").each(function() {
			parts[parts.length] = $(this).offset().top;
		})
		var menu = [];
		$("section#programme li").each(function() {
			menu[menu.length] = $(this).offset().left;
		})
		var menuHeight = $('nav').height();
		var programmeHeight = $('section#programme').height();
		var programmeOffset = $('.programme-place').offset().top;
		var practicesOffset = $('.programme-end').offset().top +2;
		var position = $(document).scrollTop();
		var new_state = sticky_programme_state;
		if (programmeOffset-menuHeight > position) new_state = 'down';
		else
			if (practicesOffset-menuHeight-programmeHeight > position) new_state = 'stick';
			else
				new_state = 'up';
		if (sticky_programme_state != new_state) {
			if (new_state == 'down') {
				$('.programme-place').css({ height: 'auto' });
				$('section#programme').css({ position:'inherit', top: 'auto' });
			}
			if (new_state == 'stick') {
				$('.programme-place').css({ height: programmeHeight });
				$('section#programme').css({ position:'fixed', width: '100%', top: menuHeight });
			}
			if (new_state == 'up') {
				$('.programme-place').css({ height: programmeHeight });
				$('section#programme').css({ position:'absolute', width: '100%', top: practicesOffset - programmeHeight });
			}
		}
		/* moving title */
		if (new_state == 'down') 
			$('section#programme .icon-box').css({
				left: menu[0]
			})
		if (new_state == 'up') 
			$('section#programme .icon-box').css({
				left: menu[menu.length-1]
			})
		if (new_state == 'stick') {
			var target = 0;
			for (var i=1; i<parts.length; i++)
				if (parts[i]-menuHeight-programmeHeight > position) { target = i; break }
			if (target > 0) {
				var part_len = parts[target] - parts[target-1];
				var menu_len = menu[target] - menu[target-1];
				var new_pos = menu_len*(position-parts[target-1]+menuHeight+programmeHeight)/part_len;
				$('section#programme .icon-box').css({
					left: menu[target-1]+(new_pos>0?new_pos:0)
				})
			}
		}
		sticky_programme_state = new_state;
	}
}

$('a').smoothScroll({ offset: -72 });



/* menu pos */
$(menu_pos);
$(window).scroll(menu_pos);
function menu_pos() {
	if ($(window).width() >= 768) {
		var parts = [];
		var menu = [];
		$("nav li a").each(function() {
			parts[menu.length] = $($(this).attr('href')).offset().top;
			menu[menu.length] = $(this).offset().left;
		})
		parts[menu.length] = $('footer').offset().top;
		menu[menu.length] = $('nav ul').offset().left + $('nav ul').width();
		var menuHeight = $('nav').height();
		var position = $(document).scrollTop();
		var target = 0;
		for (var i=1; i<parts.length; i++)
			if (parts[i]-menuHeight > position) { target = i; break }
		if (target > 0) {
			var part_len = parts[target] - parts[target-1];
			var menu_len = menu[target] - menu[target-1];
			var new_pos = menu_len*(position-parts[target-1]+menuHeight)/part_len;
			$('nav .icon-pos').css({
				left: menu[target-1]+(new_pos>0?new_pos:0)
			})
		}
	}
}