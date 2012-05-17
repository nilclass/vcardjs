
// exported globals
var VCard;

(function() {

    VCard = function() {
    };

    VCard.prototype = {

        // don't set attributes directly. always use this method.
        // it may call callbacks in the future.
        setAttribute: function(key, value) {
            this[key] = value;
        },

        addAttribute: function(key, value) {
            console.log('add attribute', key, value);
            if(VCard.multivaluedKeys[key]) {
                if(this[key]) {
                    this[key].push(value);
                } else {
                    this.setAttribute(key, [value]);
                }
            } else {
                this.setAttribute(key, value);
            }
        },

        toJCard: function() {
            var jcard = {};
            for(var k in VCard.allKeys) {
                var key = VCard.allKeys[k];
                if(this[key]) {
                    jcard[key] = this[key];
                }
            }
            return jcard;
        }

    };

    VCard.allKeys = [
        'fn', 'n', 'nickname', 'photo', 'bday', 'anniversary', 'gender',
        'tel', 'email'
    ];

    VCard.multivaluedKeys = {
        email: true,
        tel: true
    };

})();
