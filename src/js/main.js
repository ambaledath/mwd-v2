var app = app || {};

app.index = function () {

    "use strict";

    function init() {
        console.log('yay');
    }

    return {
        init: init
    };

}();

document.addEventListener("DOMContentLoaded", function(event) {

    app.index.init();

});
