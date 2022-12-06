"use strict";
const JSCCommon = { 
	// Работа с модальнами окнами (Открытие, закрытие)
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			// showClass: "fancybox-throwOutUp",
			// hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if(!element) return;
			let modal = document.querySelector("#" + element.dataset.src);
			const data = element.dataset;

			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	},
	// Открытие, закрытие моб. меню
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	// кнопка для закрытя меню
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	// Мобильное меню
	mobileMenu() { 
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// Работа с вкладками
	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs
	// маска для инпута в котором вводится номер телефона
	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({"mask":"+9(999)999-99-99", showMaskOnHover: false}).mask(InputTel);
	},
	// Вычесляет высоту экрана
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	// Анимация скрола
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	// Получение текущего года
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	// расскрытие, закрытие каталога
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	// Функция для выпадашки, как в каталоге
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						// else {
						// 	$(this.parentElement).removeClass('active');
						// 	$(this.parentElement).find('.dd-content-js').slideUp(function () {
						// 		$(this).removeClass('active');
						// 	});
						// }
					});

				});
			}
		}
	},
	//  парсит картинку в свг
	imgToSVG() {
    const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);
	
			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
	
						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;
	
						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};
	
		convertImages('.img-svg-js');
  },
	// включает ползунки
	customRange() {
		$('.default-ion-slider').each(function () {
			var $range = $(this);
			var $itemsInGroup = $( '[data-slider-group="' + $range.data('slider-group') + '"]' );
			var $fromInput = $itemsInGroup.filter(".js-input-from");
			var $toInput = $itemsInGroup.filter(".js-input-to");

			// Initialize some global variables
			var range, min, max, from, to;

			// Update the input fields with the correct to and from values
			var updateValues = function () {
					$fromInput.prop("value", from);
					$toInput.prop("value", to);
			};

			// Set properties from ionRangeSlider
			var getProps = function (data) {
					from = data.from;
					to = data.to;
					min = data.min;
					max = data.max;
			}

			// Attach change and start events to the slider
			$range.ionRangeSlider({
					onChange: function (data) {
							getProps(data);
							updateValues();
					},
					onStart: function (data) {
							getProps(data);
							updateValues();
					}
			});

			// Save the slider instance to a variable
			range = $range.data("ionRangeSlider");

			// Update the slider values with the variables from our inputs
			var updateRange = function () {
					range.update({
							from: from,
							to: to
					});
			};

			// Attach change events to the "from" input field
			$fromInput.on("change", function () {
					from = +$(this).prop("value");
					if (typeof min !== "undefined" && from < min) {
							from = min;
					}
					if (from > to) {
							from = to;
					}

					updateValues();
					updateRange();
			});

			// Attach change events to the "to" input field
			$toInput.on("change", function () {
					to = +$(this).prop("value");
					if (typeof max !== "undefined" && to > max) {
							to = max;
					}
					if (to < from) {
							to = from;
					}

					updateValues();
					updateRange();
			});
	});
	},
};
const $ = jQuery;

function eventHandler() {
	//  вызов всех функций выше
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	JSCCommon.customRange();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	//  ПиксельПерфект
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	// Добовляет классы для фиксации меню
	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}
	//  проверка ширины экрана
	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();

	//  параметры по умолчанию для слайдера
	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}
	//  вызов слайдера
	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});
	//  вызов слайдера
	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	//  вызов слайдера
	// modal window
	let defSlidersWraps = document.querySelectorAll('.default-slider-wrap');
	defSlidersWraps.forEach(defSlidersWrap => {
		const defaultSwiper = new Swiper(defSlidersWrap.querySelector('.default-slider'), {
			slidesPerView: 'auto',
			observer: true,
			navigation: {
				nextEl: defSlidersWrap.querySelector('.swiper-button-next'),
				prevEl: defSlidersWrap.querySelector('.swiper-button-prev'),
			},
		});
	});
	//  вызов слайдера
	const cardtSwiper = new Swiper('.card__img-slider--js', {
		slidesPerView: 1,
		spaceBetween: 2,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});
	//  при наведении меняется картинки на слайдере 
	$('.card__img-slider--js .swiper-pagination-bullet').hover(function() {
		$( this ).trigger( "click" );
	});
	//  меняет z-index
	$('.zIndex').hover(function() {
		if(window.innerWidth >= 992) {
			$(this).addClass('zIndexHover').addClass('zIndexHoverImportant');
		}
	}, function() {
		if(window.innerWidth >= 992) {
			$(this).removeClass('zIndexHover');
			setTimeout(() => {
				$(this).removeClass('zIndexHoverImportant');
			}, 360);
		}
	});

	// параметры по умолчанию для слайдера
	let mainSl = {
		slidesPerView: 1,
		simulateTouch: false,
		effect: 'fade',
		loop: true,
		// reverseDirection: true,
		// enabled: false,
		fadeEffect: {
			crossFade: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		// breakpoints: {
		// 	768: {
		// 		enabled: true,
		// 	},
		// }
	}
	//  вызов слайдера
	const headerBlockMiddleSwiper = new Swiper('.headerBlock__swiper-middle--js', {
		...mainSl,
	});
	const headerBlockTextSwiper = new Swiper('.headerBlock__swiper-text--js', {
		spaceBetween: 50,
		...mainSl,
	});
	const headerBlockBgSwiper = new Swiper('.headerBlock__swiper-bg--js', {
		...mainSl,
	});
	const headerBlockImgSwiper = new Swiper('.headerBlock__swiper-img--js', {
		...mainSl,
	});

	const sProdCardThumbSwiper = new Swiper('.sProdCard__thumb-slider--thumb-js', {
		slidesPerView: 5,
		spaceBetween: 4,
		direction: 'vertical',
		navigation: {
			nextEl: '.sProdCard__thumb-arrow-wrap .swiper-button-next',
			prevEl: '.sProdCard__thumb-arrow-wrap .swiper-button-prev',
		},
	});
	const sProdCardSwiper2 = new Swiper('.sProdCard__slider--js2', {
		slidesPerView: 1,
		navigation: {
			nextEl: '.sProdCard__swiper-wrap .swiper-button-next',
			prevEl: '.sProdCard__swiper-wrap .swiper-button-prev',
		},
		thumbs: {
			swiper: sProdCardThumbSwiper,
		},
	});
	const sProdCardSwiper = new Swiper('.sProdCard__slider--js', {
		slidesPerView: 1,
		navigation: {
			nextEl: '.sProdCard__swiper-wrap .swiper-button-next',
			prevEl: '.sProdCard__swiper-wrap .swiper-button-prev',
		},
		// thumbs: {
		// 	swiper: sProdCardThumbSwiper,
		// },
	});

	//  открывает, закрывает Фильтр
	let category = document.querySelector('.filter__category--js');
	if(category) {
		category.addEventListener('click', function() {
			$('.filter__category-body').slideToggle();
			$(this).toggleClass('active');
		});
	}

	let filterBtn = document.querySelector('.sCatalog__cotrol-btn--js');
	if(filterBtn) {
		filterBtn.addEventListener('click', function(e) {
			e.preventDefault();
			$('.filter').toggleClass('active');
		});
	};
	//  по клику во вне фильтра - фильтр закроется
	document.addEventListener('click', function(event) {
		// let filter = document.querySelector('.filter');
		let filter = event.target.closest(".filter"); // (1)
		let filterBtn = event.target.closest('.sCatalog__cotrol-btn--js'); // (1)
		if(!filter && !filterBtn) {
			$('.filter').removeClass('active');
		}
	})
	// Кастомное добавление файлов
	FilePond.registerPlugin(
		FilePondPluginImagePreview
	);
	FilePond.create(
		document.querySelector('.filepond')
	);

	const sProdCardColorSwiper = new Swiper('.sProdCard__color-slider--js', {
		slidesPerView: 'auto',
		spaceBetween: 3,
		navigation: {
			nextEl: '.sProdCard__arrow-wrap .swiper-button-next',
			prevEl: '.sProdCard__arrow-wrap .swiper-button-prev',
		},
	});

	//  Когда от верха страницы прокручено больше 800пх добавляет класс .active на кнопку скролла верх
	let scrollTopBtn = document.querySelector('.scrollTop');
	$(document).scroll(function() {
		let y = $(this).scrollTop();
		if (y > 800) {
			$(scrollTopBtn).addClass('active');
		} else {
			$(scrollTopBtn).removeClass('active');
		}
	});
	//  по нажатию на кнопку скролит наверх 
	scrollTopBtn.addEventListener('click', () => window.scrollTo(0, 0));

	let customDropdowns = document.querySelectorAll('.custom-dropdown--js');
	if(customDropdowns) {
		for (let customDropdown of customDropdowns) {
			customDropdown.querySelector('.custom-dropdown__wrap').addEventListener('click', function() {
				$(customDropdown.querySelector('.choose-color')).toggleClass('active');
			});
			document.addEventListener('click', function(e) {
				if (!e.target.closest('.custom-dropdown--js')) {
					$(customDropdown.querySelector('.choose-color')).removeClass('active');
				}
			})
		}
	};

	let caseContainer = document.querySelector('.pb_front');
	if(caseContainer) {
		function getCellNum(elem, setDirection) {
			// let verticalCells = document.querySelector('.radio-buttons.vertical').querySelectorAll('.custom-input');
			let cells = document.querySelector(elem).querySelectorAll('.custom-input');
			for (let cell of cells) {
				cell.addEventListener('click', function() {
					let cellNum = cell.querySelector('input').value;
					if (setDirection == "vertical") {
						caseContainer.querySelector('.pb_front_cells').style.setProperty('--verticalCells', cellNum);
					} if (setDirection == "horizontal") {
						caseContainer.querySelector('.pb_front_cells').style.setProperty('--horizontalCells', cellNum);
					}
				});
			}
		};
		getCellNum('.radio-buttons.vertical', 'vertical');
		getCellNum('.radio-buttons.horizontal', 'horizontal');

		let table = document.querySelector('.table');
		let trs = table.querySelectorAll('.tr');
		for (let i = 0; i < trs.length; i ++) {
			let tds = trs[i].querySelectorAll('.td');
			for (let j = 0; j < tds.length; j ++) {
				tds[j].addEventListener('click', function() {
					caseContainer.querySelector('.pb_front_cells').style.setProperty('--verticalCells', i + 1);
					caseContainer.querySelector('.pb_front_cells').style.setProperty('--horizontalCells', j + 1);
					let verticalBtns = document.querySelector('.radio-buttons.vertical').querySelectorAll('.custom-input');
					let horizontalBtns = document.querySelector('.radio-buttons.horizontal').querySelectorAll('.custom-input');
					verticalBtns[i].querySelector('input').checked = 'checked';
					horizontalBtns[j].querySelector('input').checked = 'checked';
				});
			};
		};
	}
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }