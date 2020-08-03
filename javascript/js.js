$(document).ready(function ($) {
    $("input[type='tel']").mask("+7 (999) 99-99-999");

    $('.owl-carousel').owlCarousel({
        nav: false,
        dots: true,
        navText: ["", ""],
        stopOnHover: true,
        smartSpeed: 1000,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                margin: 0
            },
            961: {
                items: 2
            },
            1301: {
                items: 3,
                nav: true,
                dots: false
            }
        }
    });

    const keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);

        console.log('modernizr', Modernizr.passiveeventlisteners);

        window.addEventListener('wheel', preventDefault,
            Modernizr.passiveeventlisteners ? {
                passive: false
            } : false); // modern standard
        document.addEventListener('mousewheel', preventDefault,
            Modernizr.passiveeventlisteners ? {
                passive: false
            } : false); // older browsers, IE
        window.addEventListener('mousewheel', preventDefault,
            Modernizr.passiveeventlisteners ? {
                passive: false
            } : false); // older browsers, IE
        window.addEventListener('touchmove', preventDefault,
            Modernizr.passiveeventlisteners ? {
                passive: false
            } : false); // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        document.removeEventListener('mousewheel', preventDefault, false);
        window.removeEventListener('mousewheel', preventDefault, false);
        window.removeEventListener('wheel', preventDefault, false);
        window.removeEventListener('touchmove', preventDefault, false);
        document.onkeydown = null;
    }

    function disableScrollMob() {
        let pagePosition = window.scrollY;
        document.body.classList.add('disable-scroll');
        document.body.dataset.position = pagePosition;
        document.body.style.top = -pagePosition + 'px';
    }

    function enableScrollMob() {
        let pagePosition = parseInt(document.body.dataset.position, 10);
        document.body.style.top = 'auto';
        document.body.classList.remove('disable-scroll');
        window.scroll({
            top: pagePosition,
            left: 0
        });
        document.body.removeAttribute('data-position');
    }

    const menuBar = $('.menu-bar');
    const popupMenu = $('.mobile-menu');
    const closeMobMenu = $('.mobile-menu-close');
    const openMobMenu = $('.mobile-menu-btn');
    const topBarElement = $('.header__address');

    $(openMobMenu).on('click', function () {
        $(popupMenu).slideToggle(200);
        $(topBarElement).slideToggle(200);
        $(openMobMenu).toggleClass('mobile-menu-close');

        if ($(openMobMenu).hasClass('mobile-menu-close') && $(menuBar).outerWidth() <= 480) {
            disableScroll();
        }
        if (!$(openMobMenu).hasClass('mobile-menu-close') && $(menuBar).outerWidth() <= 480) {
            enableScroll();
        } else {
            return false;
        }
    });

    const callBackBtn = $('.get-call-btn');
    const detailesBtn = $('.get-detailes-btn');
    const popup = $('.popup');
    const callBackPopup = $('.callback-popup');
    const detailesPopup = $('.detailes-popup');
    const formPopup = $('.form-popup');

    $(callBackBtn).on('click', function (event) {
        event.preventDefault;
        $(popup).fadeIn(230, function () {
            $(callBackPopup)
                .css('display', 'block')
                .animate({
                    'opacity': '1',
                    'margin-top': '12%'
                }, 230)
        });

        const windowHeight = $(window).height();
        const windowWidth = $(window).width();
        if (windowHeight < 580) {
            disableScrollMob();
        } else {
            disableScroll();
        }
    });

    $(detailesBtn).on('click', function (event) {
        event.preventDefault;
        $(popup).fadeIn(230, function () {
            $(detailesPopup)
                .css('display', 'block')
                .animate({
                    'opacity': '1',
                    'margin-top': '10%'
                }, 240)
        });

        const windowHeight = $(window).height();
        const windowWidth = $(window).width();
        if (windowHeight < 580) {
            disableScrollMob();
        } else {
            disableScroll();
        }
    });

    $(popup).on('click', function (event) {
        if (event.target === this) {
            $(this).fadeOut(230, function () {
                $(formPopup)
                    .css('display', 'none')
                    .animate({
                        'opacity': '0',
                        'margin-top': '7%'
                    }, 240);
            });
            const windowHeight = $(window).height();
            const windowWidth = $(window).width();
            if (windowHeight < 580) {
                enableScrollMob();
            } else {
                enableScroll();
            }
        }
    });

    const navItem = $('.navigation-item');

    $(navItem).on('click', function (event) {
        event.preventDefault();

        const href = $(this).attr('href');
        const offset = $(href).offset().top;

        $('body, html').animate({
            scrollTop: offset,
        }, 800);

        if ($('body').outerWidth() < 481) {
            $(openMobMenu).trigger('click');
        }
    });

    const submitBtn = $('.form-popup__btn');
    $(submitBtn).on('click', function (e) {
        $('input[required]').addClass('req');
    });


    $('.header').prepend('<div class="header__bg-items" aria-hidden="true"><div class="header__bg-item">{ }</div><div class="header__bg-item">#</div><div class="header__bg-item">&lt;div&gt;</div><div class="header__bg-item">&lt;div&gt;</div><div class="header__bg-item">&lt;/&gt;</div><div class="header__bg-item">{ }</div><div class="header__bg-item">#</div><div class="header__bg-item">&lt;div&gt;</div><div class="header__bg-item">&lt;div&gt;</div><div class="header__bg-item">&lt;/&gt;</div></div>');

    $('.section-layout').prepend('<div class="section-layout__decor" aria-hidden="true"><span class="section-layout__decor-item">{ }</span><span class="section-layout__decor-item">#</span><span class="section-layout__decor-item">&lt;div&gt;</span><span class="section-layout__decor-item">{ }</span><span class="section-layout__decor-item">&lt;/&gt;</span></div>');
});
