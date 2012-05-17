
(function($) {


    // SOURCE: http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript
    var params = {};
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q))
        params[d(e[1])] = d(e[2]);
    // -------------------------------------------------------------------------

    var tests = {
        vcf: "VCF"
    };

    function setTitle(title) {
        $('#qunit-header').html(
            $('#qunit-header').html().replace('{{TITLE}}', title)
        );
    }

    function renderNav() {
        var nav = $('#nav');
        for(var key in tests) {
            var label = tests[key];
            var item = $('<a>');
            item.attr('href', '?test=' + key);
            item.text(label);
            nav.append(item);
        }
    }

    $(document).ready(function() {
        renderNav();

        if(params.test) {
            setTitle(tests[params.test]);
            $('head').append($('<script src="' + params.test + '.js">'));
        } else {
            setTitle("Choose a test.");
        }
    });

})(jQuery);