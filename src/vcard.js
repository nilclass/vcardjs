
// exported globals
var VCard;

(function() {

    VCard = function() {
    };

    VCard.prototype = {

        // don't set attributes directly. always use this method.
        // it may call callbacks in the future.
        setAttribute: function(key, value) {
            console.log('set attribute', key, value);
            this[key] = value;
        },

    };

})();
