var mainSwiper;
var logoSlider;
// var productSlider;
var similarSlider;

$(() => {
	fillImages();
	updateInput();
	$('body').on('click', '.burger', toggleBurger);
	$('body, html').on('click', closeBurger);
	$('body').on('click', '.mega-menu .close', closeMegaMenu);
	$('body').on('click', '.back a', closeL3);
	$('body').on('click', '.mega-menu a', preventOpen);
	$('body').on('click', '.folder-trigger', openL3);
	// $('body').on('click', '.folder > a', openL3);
	$('body').on('click', hideFloatingBlocks);
	// $('body').on('click', '#login-trigger', openLogin);
	$('body').on('click', '.close-trigger', closeModal);
	// $('body').on('click', '.shadow', closeModalShadow);
	// $('body').on('click', '#switch-register', switchRegister);
	// $('body').on('click', '#switch-login', switchLogin);
	// $('body').on('click', '#switch-forgot', switchForgot);
	$('body').on('click', '.category-image', linkMobile);
	$('body').on('click', '#reset-filters', resetFilters);
	$('body').on('click', '.filters-trigger', toggleFilters);
	$('body').on('click', '.close-sidebar', closeSidebar);
	$('body').on('click', '#close-mega-menu', closeMegaMenu);
	$('body').on('click', '.change-view', toggleView);
	$('body').on('change', '#is_company_no, #is_company_yes', toggleUrData);
	$('body').on('click', '.tab-link', openTab);
	$(window).on('scroll', updateFloatingCart);
	$('body').on('change', '.password-radio', setPasswordType);
	$('body').on('change', '.input-field input', updateInputFieldLabel);
	$(window).on('resize', setupEvents);
	$('body').on('click', '.order-list tr', toggleOrderRow);
	$('body').on('click', '.edit-profile', showModalEditProfile);
	$('body').on('click', 'button.rs-item', fillImages);
	$('body').on('click', '.needUpdateInput', function () {
        setTimeout(function () {
            updateInput();
        }, 2000)
    });

	$('body').on('click', '.mobile-arrow', openMenu);
	// Заглушка
	// $('body').on('click', '.more a', () => {return false;});

	initSliders();
	// initSlider();
	setupEvents();

});

function closeMegaMenu(e){
	e?.preventDefault();
	$('.mega-menu').removeClass('active');
}

function preventOpen(e){
	// debugger;
	// if($(window).width() <= 900 && ($(this.parentElement).find('.l2-wrapper').length > 0 || $(this.parentElement).find('.l3-wrapper').length > 0) || $(this.parentElement).hasClass('back')){
	// 	e.preventDefault();
	// 	return false;
	// }

	if($(this.parentElement).hasClass('back')){
		e.preventDefault();
		return false;
	}
}

function openL3(e){
	if(e.originalEvent.target.className != 'folder-trigger'){
		if($(window).width() <= 900){
			e?.preventDefault();
			e?.stopPropagation();
			$(this).parents('.folder').toggleClass('hover');
		}
	}else{
		e?.preventDefault();
		e?.stopPropagation();
		$(this).parents('.folder').toggleClass('hover');
	}

}

function updateInput() {
    console.log('ok');
    $('.input-field input').each((index, el) => {
        if($(el).val() === '' || $(el).val() === ' '){
            $(el).removeClass('nempty');
        }else{
            $(el).addClass('nempty');
        }
    });
}

function showModalEditProfile(e) {
    e?.preventDefault();
    var modal =  $(this).data('modal');
    $('#'+modal+'').addClass('opened');
    $('.shadow').addClass('opened');
}

function toggleOrderRow(){

	var nested = $(this).next();
	var already = nested.hasClass('expanded');

	$('.nested').removeClass('expanded');
	if(already){
		nested.removeClass('expanded');
	}else{
		nested.addClass('expanded');
	}
}

function setPasswordType(){
	var id=$(this).attr('id');
	if(id == 'auto'){
		$('.manual-password').addClass('hidden');
		$('.auto-password').removeClass('hidden');
	}else{
		$('.auto-password').addClass('hidden');
		$('.manual-password').removeClass('hidden');
	}
}

function initSlider(){
	var elems = document.querySelector('.slider');
	if(!elems){
		return;
	}
	noUiSlider.create(elems, {
		start: [200000, 1800000],
		connect: true,
		tooltips: [
			true, true
		],
		range: {
			min: 0,
			max: 2000000
		},
		format: {
			to: number_value => {
				return Intl.NumberFormat('ru-RU').format(Math.round(number_value)) + '₽';
			},
			from: str_value => {
				return Number(str_value.replace('₽', ''));
			}
		}
	})
}

function openTab(e){
	e?.preventDefault();
	var parent = $(this).parents('.tabs-control');
	var targetPage = $(this).data('page');
	
	parent.find('.tab-page').removeClass('active');
	parent.find('.tab-link').removeClass('active');

	$('#'+targetPage).addClass('active');
	$(this).addClass('active');
}

function updateFloatingCart(){
	if($('html, body').scrollTop() >= 200){
		$('.floating-cart').addClass('visible');
	}else{
		$('.floating-cart').removeClass('visible');
	}
}

function toggleUrData(){
	if ($(this).attr('id') == 'is_company_yes') {
		$('.ur-data').removeClass('hidden')
	} else {
		$('.ur-data').addClass('hidden');
	}
}

function toggleView(e){
	e?.preventDefault();
	var oldclass = $(this).hasClass('list') ? 'cards' : 'list';
	var newclass = $(this).hasClass('list') ? 'list' : 'cards';
	document.cookie = 'viewMode = '+ newclass;
	document.cookie = 'oldMode = '+ oldclass;
	
	var text = $(this).hasClass('list') ? 'В виде карточек' : 'В виде списка';

	$(this).text(text);
	$(this).attr('class', 'change-view ' + oldclass);
	$('.products').attr('class', 'products ' + newclass);
}

function hideFloatingBlocks(e){
	if(e.originalEvent){
		var path = e.originalEvent.path;
		if(path.indexOf($('.sidebar')[0]) == -1){
			$('.sidebar').removeClass('active');
		}
	}

}

function toggleFilters(e){
	e?.preventDefault();
	e?.stopPropagation();
	$('.sidebar').toggleClass('active');
}

function closeSidebar(e) {
    e?.preventDefault();
    e?.stopPropagation();
    $('.sidebar').removeClass('active');
}

function closeMegaMenu(e) {
    e?.preventDefault();
    e?.stopPropagation();
    $('.mega-menu').removeClass('active');
}

function resetFilters(e){
	e?.preventDefault();
	$('#filters')[0].reset();
	
	$('.input-field input').each((index, el) => {
		if($(el).val() == ''){
			$(el).removeClass('nempty');
		}else{
			$(el).addClass('nempty');
		}
	})
}

function linkMobile(){
	if($(window).width() <= 700){
		var url = $(this).data('url');
		window.location.href = url;
	}
}

function closeModal(e){
	e?.preventDefault();
	var modal = $(this).data('modal');
	$('#'+modal+'').removeClass('opened');
	$('.shadow').removeClass('opened');
}

function closeModalShadow(){
	$('.modal, .shadow').removeClass('opened');
}

function openLogin(e){
	e.preventDefault();
	$('#login, .shadow').addClass('opened');
}

function closeLogin(e){
	e?.preventDefault();
	$('#login, .shadow').removeClass('opened');
}

function switchRegister(e){
	e?.preventDefault();
	$('.modal').removeClass('opened');
	$('.shadow, #register').addClass('opened')
}

function switchLogin(e){
	e?.preventDefault();
	$('.modal').removeClass('opened');
	$('.shadow, #login').addClass('opened')
}

function switchForgot(e){
	e?.preventDefault();
	$('.modal').removeClass('opened');
	$('.shadow, #forgot').addClass('opened')
}

function updateInputFieldLabel(){

	if($(this).val() == ''){
		$(this).removeClass('nempty');
	}else{
		$(this).addClass('nempty');
	}
}

function initSliders(){
	if($('#hero-swiper').length > 0){
		mainSwiper = new Swiper('#hero-swiper', {
			speed: 1200,
			effect: 'slide',
			loop: true,
			autoplay: {
				delay: 5000
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets'
			}
		});
	}

	if($('#logo-slider').length){
		logoSlider = new Swiper('#logo-slider', {
			autoplay: {
				delay: 5000
			},
			loop: true,
			breakpoints: {
				1200: {
					slidesPerView: 6,
					spaceBetween: 20
				},
				900:{
					slidesPerView: 4
				},
				300: {
					slidesPerView: 3
				}
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true
			}
		});
	}

	if($('#product-slider').length){
	// 	productSlider = new Swiper('#product-slider', {
	// 		init: false,
	// 		effect: 'none',
	// 		pagination: {
	// 			el: '.product-pagination',
	// 			type: 'bullets',
	// 			renderBullet: (index, className) => {
    //
	// 				var thumbs = $('#product-slider .product-photo');
	// 				var thumb = $(thumbs[index]).data('src');
    //                 // if(!$(thumbs[index]).hasClass('hidden')) {
    //                     return '<span class="' + className + '"><span class="thumbnail lazy-image" data-src="' + thumb + '"></span></span>'
    //                 // } else {
    //                 //     return '';
    //                 // }
	// 			},
	// 			clickable: true
	// 		}
	// 	});
    //
	// 	productSlider.init();
		fillImages();
	}

	if($('#similar-slider').length){
		similarSlider = new Swiper('#similar-slider', {
			breakpoints: {
				1200: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				900:{
					slidesPerView: 3,
					spaceBetween: 20,
				},
				700:{
					slidesPerView: 2,
					spaceBetween: 10,
				},
				400:{
					slidesPerView: 1,
					spaceBetween: 0
				}
			}
		});
	}
}

function fillImages(){
	$('.lazy-image').each((index, el) => {
		var src = $(el).data('src');

		if(src){
			$(el).css({
				backgroundImage: 'url('+src+')'
			})
		}
	})
}

function closeL3(){
	$('.megamenu .l2 li').removeClass('hover');
	$('.mega-menu .l2 li').removeClass('hover');
}

function closeBurger(e){
	
	if(!e.target.closest('.megamenu') && !e.target.closest('.mega-menu') && !e.target.closest('.burger')){
		$('.megamenu, .mega-menu, .burger').removeClass('active');
		$('.megamenu li, .mega-menu li').removeClass('hover');
	}

}

function closeMenu(){
	$(this).removeClass('hover');
}

function setupEvents(){
	// Старая менюшка
	var eventType = $(window).width() >= 900 ? 'mouseover': 'click';
	
	$('.megamenu li').unbind('click');
	$('.megamenu li').unbind('mouseover');
	eventType == 'mouseover' ? $('.megamenu li, .mega-menu li').bind('mouseleave', closeMenu) : $('.megamenu li, .megamenu li').unbind('mouseleave', closeMenu);

	$('.megamenu li').bind(eventType, function(e){
		openMenu(this, e);
	});

	// Новая менюшка
	var eventType = $(window).width() >= 900 ? 'mouseover': 'click';
	$('.mega-menu .l1 li').unbind('click');
	$('.mega-menu .l1 li').unbind('mouseover');

	// Навешиваем классическое поведение только на 1-й уровень меню
	// На второй уровень событием назначается клик (вне зависимости от размера окна)
	$('.mega-menu .l1 > li').bind(eventType, function(e){
		openMenu(this, e);
	});
}

function openMenu(el, e){

	var level;
	
	if(!e)
		return;


	var element = e.originalEvent.target;
	
	var initial = $(el).hasClass('hover');
	
	if(!$(el).hasClass('folder-trigger') && !$(element).hasClass('mobile-arrow')){
		if($(window).width() <= 900)
		return;
	}else{
		e?.preventDefault();
	}
	

	$(el).parents('ul').hasClass('l1') ? level = ".l1" : "";
	$(el).parents('ul').hasClass('l2') ? level = ".l2" : "";
	$(el).parents('ul').hasClass('l3') ? level = ".l3" : "";
	$(level+' > li').removeClass('hover');
	
	if($(window).width() <= 900){
		if(!initial){
			$(el).addClass('hover');
		}else{
			$(el).removeClass('hover');
		}
	}else{
		$(el).addClass('hover');
	}
	


	return false;
}

function toggleBurger(e){
	e.preventDefault();
	$('.burger, .megamenu, .mega-menu').toggleClass('active');
}

