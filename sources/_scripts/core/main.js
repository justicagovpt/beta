var justica = justica || {};

justica.MAIN = (function () {

    return {
        init: function () {
            $('[data-control]').each(function (index, elem) {
                var data = $(elem).data(),
                    control = data.control;

                if (!justica[control]) return;

                if (typeof justica[control] === 'function') {
                    var obj = new justica[control];
                    obj.init(elem, data);
                } else if (typeof justica[control] === 'object') {
                    justica[control].init(elem, data);
                }
            });

            //-------------- barra de cookies
            var justicagovpt_cookies = "justicagovpt_cookies";

            //Adiciona barra de cookies caso não tenha sido aceite
            if (document.cookie.indexOf(justicagovpt_cookies) == -1) {
                $('body').append('<div class="justica-cookie_bar sticky_top" data-control="cookie_bar"><div class="container"><div class="row"><div class="col-sm-12"><p>Este website utiliza cookies. Ao continuar a navegação está a aceitar a sua utilização. Caso pretenda saber mais, consulte a legislação <a href="http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm" target="_blank">aqui</a></p></div></div></div></div>');
            }

            //-------------- MENU ##############
            //var elMenuLink = $('ul.navbar-nav li > a, ul.navbar-nav li > span');



            //-------------- SUBMENU height DESKTOP
            if ($(window).width() > 892) {

                $("ul.nav > .menu_item.dropdown > ol.dropdown-menu").each(function () {
                    $(this).attr('data-height', $(this).height());
                    $(this).height(0);
                    $(this).css('opacity', 'inherit');
                });

                var menuButtons = $("ul.nav > .menu_item.dropdown");
                menuButtons.click(function () {
                    var openMenu = $("ul.nav > .menu_item.dropdown.open");
                    var menuDropdownPane = $(this).children('ol.dropdown-menu');

                    //reset menu
                    menuButtons.removeClass('open');
                    $(this).children('.sub_menu_title').removeClass('onactive');


                    if (!openMenu.length || !openMenu.is(menuDropdownPane.parent())) {

                        $(this).children('.sub_menu_title').addClass('onactive');

                        //open menu
                        menuDropdownPane.animate({
                            height: parseInt(menuDropdownPane.attr('data-height')) + 20
                        }, {
                            queue: false,
                            duration: 250
                        });

                        //toggle classe active menu
                        //$(this).children('a, span').toggleClass('onactive');

                        //add classe menu
                        $(this).closest('.menu_item.dropdown').addClass('open');
                    } else {
                        $(this).children('.sub_menu_title').removeClass('onactive');
                        $('ol.dropdown-menu').height(0);
                    }
                });

                //close menu

                $('body').click(function () {
                    if ($("ul.nav > .menu_item.dropdown.open").length) {
                        $('ol.dropdown-menu').height(0);
                        $('.dropdown .open').removeClass('open');
                    }
                });
                $('.dropdown-menu').click(function () {
                    event.stopPropagation();
                });

            } else {

                //MENU MOBILE
                $('.button_menu_mobile').on('click', function () {
                    if ($('.button_menu_mobile').hasClass('collapsed')) {
                        $('body').css('overflow', 'hidden');
                    } else {
                        $('body').css('overflow', 'visible');
                    }
                });

                $('.navbar-mobile .dropdown>a').on('click', function () {

                    if ($(this).siblings('.dropdown-menu').is(':visible')) {

                        //HIDE
                        $(this).siblings('.dropdown-menu').hide('fast');
                        $(this).siblings('.dropdown-menu').removeClass('opened');
                        $(this).find('b').css('transform', 'rotate(0deg)');

                    } else {

                        //reset
                        $('.navbar-mobile').find('b').css('transform', 'rotate(0deg)');
                        $(this).parent().siblings().children('.opened').hide('fast');
                        $(this).parent().siblings().children('.opened').removeClass('opened');
                        $(this).parent().children('.opened').hide('fast');

                        //SHOW
                        $(this).siblings('.dropdown-menu').show('fast');
                        $(this).siblings('.dropdown-menu').addClass('opened');
                        $(this).find('b').css('transform', 'rotate(180deg)');
                    }
                    event.stopPropagation();
                });

            }


            //-------------- menu click a
            /*  $('ol.open').not('.olsubmenu').children('li').find('a:first span:first').attr('disabled');


            //-------------- SUBMENU height
            $("ul.nav > .menu_item.dropdown > ol.dropdown-menu").each(function () {
                $(this).attr('data-height', $(this).height());
                $(this).height(0);
                $(this).css('opacity', 'inherit');
            });

            $("ul.nav > .menu_item.dropdown").children('.link').not('.sub_menu_title').on('click', function () {

                var menu = $(this).parent().children('ol.dropdown-menu');





                if ($(this).siblings('ol.dropdown-menu').hasClass('open')) {

                    //close dropdown
                    $("ul.nav > .menu_item.dropdown").siblings().removeClass('open').height(0);

                    //remove active
                    elMenuLink.removeClass('onactive');

                }

                //toggle open
                $(this).siblings('ol.dropdown-menu').toggleClass('open');

                menu.animate({
                    height: parseInt(menu.attr('data-height')) + 20
                }, {
                    queue: false,
                    duration: 250
                });
            });
*/

            //-------------- click menu and place height
            /* elMenuLink.on('click', function (e) {
                 if ($(this).siblings().hasClass('open')) {

                     //close dropdown
                     $(this).siblings().removeClass('open').css('height', '0px');

                     //remove active
                     elMenuLink.removeClass('onactive');

                 } else {

                     if ($(this).is('a') || $(this).attr('href') == '#') {

                         //remover altura + class
                         //$(this).parentsUntil('ul.nav', 'li').siblings().find('ol.dropdown-menu').removeClass('open').css('height', '0px');
                         return false;
                     }
                 }
             });*/

            //-------------- click off menu and close submenu
            /* $('html').on('click', function () {

                 if (elMenuLink.siblings().hasClass('open')) {

                     //close dropdown
                     elMenuLink.parentsUntil('ul.nav', 'li').siblings().find('ol.dropdown-menu').removeClass('open').css('height', '0px');

                     //remove active
                     elMenuLink.removeClass('onactive');
                 };

             });*/


            //-------------- background image for header ##############
            /* var elBackground = $('.backgroundImg'),
                 urlDesktop = elBackground.data('image-desktop'),
                 urlMobile = elBackground.data('image-mobile');

             $(window).on('load resize', function () {
                 if ($(window).width() <= 768) {
                     //mobile image
                     elBackground.css('background-image', urlMobile);
                 } else {
                     //desktop image
                     elBackground.css('background-image', urlDesktop);
                 }
             });*/

            //-------------- Active search ##############

            $('.search-bar input').on('focus', function () {
                $('.searchInputContainer').addClass('focus');
            });
            $('.search-bar input').on('blur', function () {
                $('.searchInputContainer').removeClass('focus');
            });

            //-------------- initialize slider news ##############
            $('.responsive').slick({
                dots: true,
                infinite: false,
                speed: 300,
                arrows: false,
                slidesToShow: 4,
                slidesToScroll: 3,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,

                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 410,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,

                        }
                    }
                  ]
            });

            //-------------- initialize slider graphs ##############
            $('.graphs').slick({
                dots: true,
                infinite: false,
                speed: 300,
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 2,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 514,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 425,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,

                        }
                    }
                  ]
            });

            //-------------- initialize slider news inner ##############
            $('.responsiveinner').slick({
                dots: false,
                infinite: false,
                speed: 300,
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 2,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 500,
                        settings: 'unslick'
                    }
                  ]
            });


            //-------------- STEP 5 SCRIPT
            $('.RCBE_STEP_5').find('input[type=radio]').on('click', function () {
                if ($(this).val() == 'sim') {
                    //Show textbox
                    $(this).parent().siblings('.qual').show('slow');
                } else {
                    $(this).parent().siblings('.qual').hide('slow');
                    $('.RCBE_STEP_5').find('.fields_step5').find('input, select').attr('disabled', false);
                    $('.RCBE_STEP_5').find('select').val('default');
                }
            });

            $('.RCBE_STEP_5').find('select').on('change', function () {
                if ($(this).val() != "default") {
                    $('.RCBE_STEP_5').find('.fields_step5').find('input, select').attr('disabled', true);
                } else {
                    $('.RCBE_STEP_5').find('.fields_step5').find('input, select').attr('disabled', false);
                }
            });


            //-------------- SCRIPT RCBE ADD BENEFICIARIES
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })


            $(function () {
                var frm_cnt = 0;

                $(document).on('click', '.add', function () {
                    var original = $('#form_block\\[' + frm_cnt + '\\]');
                    var originCnt = frm_cnt;
                    var originVal = $("input[name='sex\\[" + frm_cnt + "\\]']:checked").val();

                    frm_cnt++;

                    original
                        .clone()
                        .hide()
                        .insertAfter(original)
                        .attr('id', 'form_block[' + frm_cnt + ']')
                        .find("input[type='radio'][checked]").prop('checked', true)
                        .end() // 一
                        .find('input, textarea').each(function (idx, obj) {
                            $(obj).attr({
                                id: $(obj).attr('id').replace(/\[[0-9]\]+$/, '[' + frm_cnt + ']'),
                                name: $(obj).attr('name').replace(/\[[0-9]\]+$/, '[' + frm_cnt + ']')
                            });
                            if ($(obj).attr('type') == 'text') {
                                $(obj).val('');
                            }
                        });

                    // clone
                    var clone = $('#form_block\\[' + frm_cnt + '\\]');
                    clone.children('span.close').show();
                    clone.slideDown('slow');

                    // original
                    original.find("input[name='sex\\[" + originCnt + "\\]'][value='" + originVal + "']").prop('checked', true);

                    associarEventosStep4(this);
                });

                $(document).on('click', '.close', function () {
                    var removeObj = $(this).parent();
                    removeObj.fadeOut('fast', function () {
                        removeObj.remove();
                        frm_cnt = 0;
                        $(".form-block[id^='form_block']").each(function (index, formObj) {
                            if ($(formObj).attr('id') != 'form_block[0]') {
                                frm_cnt++;
                                $(formObj)
                                    .attr('id', 'form_block[' + frm_cnt + ']') // id
                                    .find('input, textarea').each(function (idx, obj) {
                                        $(obj).attr({
                                            id: $(obj).attr('id').replace(/\[[0-9]\]+$/, '[' + frm_cnt + ']'),
                                            name: $(obj).attr('name').replace(/\[[0-9]\]+$/, '[' + frm_cnt + ']')
                                        });
                                    });
                            }
                        });
                    });
                });
            });


            //-------------- GRID TO LIST
            if ($('section').hasClass('justica-LP_noticias_grelha_lista')) {

                $('#list').click(function (event) {
                    event.preventDefault();
                    //reset
                    $('#items_change .slide').removeClass('col-md-3 col-sm-4 col-xs-12');
                    $('#items_change').removeClass('grid');

                    //Active styles buttons
                    $('#grid').removeClass('active');
                    $('#list').addClass('active');

                    //listview
                    $('#items_change').addClass('list');
                    $('#items_change .slide').addClass('col-xs-12');
                    $('#items_change .img-a').addClass('col-xs-3');
                    $('#items_change .content-wrapper').addClass('col-xs-9');
                });
                $('#grid').click(function (event) {
                    event.preventDefault();
                    //reset
                    $('#items_change .slide').removeClass('col-xs-12');
                    $('#items_change').removeClass('list');
                    $('#items_change .img-a').removeClass('col-xs-3');
                    $('#items_change .content-wrapper').removeClass('col-xs-9');

                    //Active styles buttons
                    $('#list').removeClass('active');
                    $('#grid').addClass('active');


                    //gridview
                    $('#items_change').addClass('grid');
                    $('#items_change .slide').addClass('col-md-3 col-sm-4 col-xs-12');
                });

            } else if ($('section').hasClass('justica-LP_guias_grelha_lista')) {

                $('#list').click(function (event) {
                    event.preventDefault();
                    //reset
                    $('#items_change .slide').removeClass('col-md-3 col-sm-4 col-xs-12');
                    $('#items_change').removeClass('grid');

                    //Active styles buttons
                    $('#grid').removeClass('active');
                    $('#list').addClass('active');

                    //listview
                    $('#items_change').addClass('list');
                    $('#items_change em').addClass(' col-sm-push-9 col-sm-3 col-xs-12');
                    $('#items_change .guias-text').addClass(' col-sm-pull-3 col-sm-9 col-xs-12');
                    $('#items_change .slide').addClass('col-xs-12');
                    $('#items_change img').hide('fast');
                });
                $('#grid').click(function (event) {
                    event.preventDefault();
                    //reset
                    $('#items_change em').removeClass(' col-sm-push-9 col-sm-3 col-xs-12');
                    $('#items_change .guias-text').removeClass(' col-sm-pull-3 col-sm-9 col-xs-12');
                    $('#items_change').removeClass('list');
                    $('#items_change .slide').removeClass('col-xs-12');
                    $('#items_change img').show('fast');

                    //Active styles buttons
                    $('#list').removeClass('active');
                    $('#grid').addClass('active');


                    //gridview
                    $('#items_change').addClass('grid');
                    $('#items_change .slide').addClass('col-md-3 col-sm-4 col-xs-12');

                });
            }


            //-------------- organismo collapse
            $('.justica-documentos_organismo .doc .text').on('click', function () {
                $(this).toggleClass('expanded');
            });

            $('.justica-servicos_organismo .wrap_list').on('click', function () {
                $(this).toggleClass('height_open');
             });

            //--------------SCROLL EVENTS
            //cta sticky bottom
            $('.sticky_bottom').css({
                "-webkit-transform": "translate(-50%, 80px)"
            });
            $(window).bind('scroll', function () {

                //-------------- scrolls acepts cookies
                if ($(window).scrollTop() > 50) {

                    $('.sticky_top').css({
                        "-webkit-transform": "translate(-50%, -80px)"
                    });
                    setTimeout(function () {
                        $('.sticky_top').remove();
                    }, 800);
                }

                //-------------- cta_SERVICOS when scrolls it appears
                var stickyEl = $('.sticky_bottom'),
                    elHeight = stickyEl.height(),
                    distTop = 0;

                if ($('aside .buttonExecutaServico.start').length > 0) {
                    distTop = $('aside .buttonExecutaServico.start').offset().top;
                }

                if ($(window).scrollTop() > distTop) {

                    $('body').css('margin-bottom', elHeight + 'px');

                    stickyEl.css({
                        "-webkit-transform": "translate(-50%, 0px)"
                    });
                } else {
                    $('body').css('margin-bottom', 'inherit');

                    stickyEl.css({
                        "-webkit-transform": "translate(-50%, 80px)"
                    });
                }
            });

            //PREVENT MORE THAN n words in news titles and organisms (DELETE WHEN DONE FROM DATABASE)
            $(justica.MAIN.maxWordCount());


            //FILTROS PESQUISA MOBILE
            $(".justica-pesquisa_body aside").find('.filter').on('click', function () {
                var thisEl = $(this),
                    elParent = thisEl.parent('aside');

                if (thisEl.hasClass('clicked')) {

                    thisEl.removeClass('clicked');
                    elParent.animate({
                        right: -205
                    }, {
                        easing: 'swing',
                        duration: 300,
                        complete: function () {
                            elParent.removeClass('open');
                        }
                    });
                } else {

                    elParent.animate({
                        right: 0
                    }, {
                        easing: 'swing',
                        duration: 300,
                        complete: function () {
                            thisEl.addClass('clicked');
                        }
                    });
                    elParent.addClass('open');
                }
            });

            //RESULTADOS DE PESQUISA (FILTROS)
            $(".justica-pesquisa_body aside").find("input").on('change', function () {
                $(this).each(function () {
                    var thisID = $(this).val();
                    if ($(this).is(':checked')) {
                        //SHOW
                        $('#' + thisID).show('slow');
                    } else {
                        //HIDE
                        $('#' + thisID).hide('slow');
                    }
                })
            });


        },

        maxWordCount: function () {
            var news_title = $('.news-title:not(.big_headline)'),
                organism = $('p.organismo:not(.big_headline)'),
                maxLengthOrg = 30,
                maxLengthNews = 45,
                dots = "...";

            news_title.each(function () {
                var titleText = $.trim($(this).text());
                if (titleText.length >= maxLengthNews) {
                    $(this).text(titleText.substring(0, maxLengthNews) + dots);
                }

            });

            organism.each(function () {
                var titleText = $.trim($(this).text());
                if (titleText.length >= maxLengthOrg) {
                    $(this).text(titleText.substring(0, maxLengthOrg) + dots);
                }

            });
        }

    }
})();

function associarEventosStep4(element) {
    //SHOW HIDE estrangeiro IN STEP  4
    $(element).closest('.RCBE_STEP_4').find('.form_block:last').find('.residencia select').on('change', function () {
        if ($(this).val() != "domestic") {
            $(this).parent().parent().parent().find(".estrangeiro").show('slow')
        } else {
            $(this).parent().parent().parent().find(".estrangeiro").hide('slow')
        }
    });

    //SHOW HIDE interesse detido IN STEP 4
    $(element).closest('.RCBE_STEP_4').find('.form_block:last').find('.interesse_detido .int_title').on('click', function () {
        $(this).siblings('.lista_gigante').css('height', '100%');
    });

    //SHOW porque click True IN STEP 4
    $(element).closest('.RCBE_STEP_4').find('.form_block:last').find('.lista_gigante').find('.form_item input[type=radio]').on('click', function () {
        if ($(this).val() == 'True') {
            $(this).siblings('.break').find('.porque').show('slow');
        } else {
            $(this).siblings('.break').find('.porque').hide('slow');
        }
    });
};

$(document).ready(function () {
    justica.MAIN.init();
    associarEventosStep4('.form_block');
});
