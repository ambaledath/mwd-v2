var ambaledath = ambaledath || {};

ambaledath.index = function () {

    "use strict";

    function init() {
        console.log(113);
    }

    return {
        init: init
    };

}();

document.addEventListener("DOMContentLoaded", function(event) {

    ambaledath.index.init();

});
