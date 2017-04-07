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
            
        }
    }
})();

$(document).ready(function () {
    justica.MAIN.init();
});