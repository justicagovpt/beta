var justica = justica || {};

justica.CONTROL_menu = (function () {

    return {

        init: function (element, data) {
            this.dropdown();

        },

        dropdown: function () {
            $('ul li a').on('click', function() {
                $(this).siblings().toggleClass('open');
                console.log($(this).siblings());
            });
            $('ul li a').on('blur', function() {
                $(this).siblings().removeClass('open');
                console.log($(this).siblings());
            });
        }
    }




});