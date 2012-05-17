
/***
 ** DATE / TIME PARSER TESTS
 **/

module('VCF.parseDate');

test("YYYYMMDD", function() {
    var date = VCF.parseDate('19870417');
    equal(date.getUTCFullYear(), 1987, 'year');
    equal(date.getUTCMonth(), 3, 'month');
    equal(date.getUTCDate(), 17, 'day');
});

test("YYYY-MM", function() {
    var date = VCF.parseDate('1987-04');
    equal(date.getUTCFullYear(), 1987, 'year');
    equal(date.getUTCMonth(), 3, 'month');
});

test("YYYY", function() {
    var date = VCF.parseDate('1987');
    equal(date.getUTCFullYear(), 1987, 'year');
});

test("--MMDD", function() {
    var date = VCF.parseDate('--0417');
    equal(date.getUTCMonth(), 3, 'month');
    equal(date.getUTCDate(), 17, 'day')
});

test("---DD", function() {
    var date = VCF.parseDate('---17');
    equal(date.getUTCDate(), 17, 'day')
});

module('VCF.parseTime');

test("HHmmss", function() {
    var time = VCF.parseTime('235930');
    equal(time.getUTCHours(), 23, 'hours');
    equal(time.getUTCMinutes(), 59, 'minutes');
    equal(time.getUTCSeconds(), 30, 'seconds');
});

test("HHmmssZ", function() {
    var time = VCF.parseTime('235930Z');
    equal(time.getUTCHours(), 23, 'hours');
    equal(time.getUTCMinutes(), 59, 'minutes');
    equal(time.getUTCSeconds(), 30, 'seconds');
});

test("HHmmss+NN", function() {
    var time = VCF.parseTime('215930+02');
    equal(time.getUTCHours(), 23, 'hours');
    equal(time.getUTCMinutes(), 59, 'minutes');
    equal(time.getUTCSeconds(), 30, 'seconds');
});

test("HHmmss+NNNN", function() {
    var time = VCF.parseTime('162930+0730');
    equal(time.getUTCHours(), 23, 'hours');
    equal(time.getUTCMinutes(), 59, 'minutes');
    equal(time.getUTCSeconds(), 30, 'seconds');
});

test("HHmmss-NN", function() {
    var time = VCF.parseTime('015930-02');
    equal(time.getUTCHours(), 23, 'hours');
    equal(time.getUTCMinutes(), 59, 'minutes');
    equal(time.getUTCSeconds(), 30, 'seconds');
});

test("HHmmss-NNNN", function() {
    var time = VCF.parseTime('012930-0130');
    equal(time.getUTCHours(), 23, 'hours');
    equal(time.getUTCMinutes(), 59, 'minutes');
    equal(time.getUTCSeconds(), 30, 'seconds');
});

test("HHmm", function() {
    var time = VCF.parseTime('2359');
    equal(time.getUTCHours(), 23, 'hours');
    equal(time.getUTCMinutes(), 59, 'minutes');
});

test("HH", function() {
    var time = VCF.parseTime('23');
    equal(time.getUTCHours(), 23, 'hours');
});

test("--mmss", function() {
    var time = VCF.parseTime('--5930');
    equal(time.getUTCMinutes(), 59, 'minutes');
    equal(time.getUTCSeconds(), 30, 'seconds');
});

test("---ss", function() {
    var time = VCF.parseTime('---30');
    equal(time.getUTCSeconds(), 30, 'seconds');
});

module("VCF.parseDateTime");

test("YYYYMMDDTHHmmss", function() {
    var datetime = VCF.parseDateTime('19870417T172345');    
    equal(datetime.getUTCFullYear(), 1987, 'year');
    equal(datetime.getUTCMonth(), 3, 'month');
    equal(datetime.getUTCDate(), 17, 'day');
    equal(datetime.getUTCHours(), 17, 'hours');
    equal(datetime.getUTCMinutes(), 23, 'minutes');
    equal(datetime.getUTCSeconds(), 45, 'seconds');
});

test("--MMDDTHHmm", function() {
    var datetime = VCF.parseDateTime('--0417T1723');
    equal(datetime.getUTCMonth(), 3, 'month');
    equal(datetime.getUTCDate(), 17, 'day');
    equal(datetime.getUTCHours(), 17, 'hours');
    equal(datetime.getUTCMinutes(), 23, 'minutes');
});

test("---DDTHH", function() {
    var datetime = VCF.parseDateTime('---17T14');
    equal(datetime.getUTCDate(), 17, 'day');
    equal(datetime.getUTCHours(), 14, 'hours');
});

module("VCF.parseDateAndOrTime");

test("THHmmss", function() {
    var time = VCF.parseDateAndOrTime('T235930');
    equal(time.getUTCHours(), 23, 'hours');
    equal(time.getUTCMinutes(), 59, 'minutes');
    equal(time.getUTCSeconds(), 30, 'seconds');    
});


test("YYYYMMDDTHHmmss", function() {
    var datetime = VCF.parseDateAndOrTime('19870417T172345');    
    equal(datetime.getUTCFullYear(), 1987, 'year');
    equal(datetime.getUTCMonth(), 3, 'month');
    equal(datetime.getUTCDate(), 17, 'day');
    equal(datetime.getUTCHours(), 17, 'hours');
    equal(datetime.getUTCMinutes(), 23, 'minutes');
    equal(datetime.getUTCSeconds(), 45, 'seconds');
});


test("YYYY", function() {
    var date = VCF.parseDateAndOrTime('1987');
    equal(date.getUTCFullYear(), 1987, 'year');
});


/***
 ** LEXER TESTS
 **/

module('VCF.lex');

function testTokens(actual, expected) {
    var exp = expected.shift();
    if(! exp) {
        return;
    }
    equal(actual[0], exp[0], 'key = ' + exp[0]);
    equal(actual[1], exp[1], 'value = ' + exp[1]);
    deepEqual(actual[2], exp[2], 'attrs = ' + JSON.stringify(exp[2]));
    start();
}

var sample1 =
    "BEGIN:VCARD\r\n" +
    "VERSION:4.0\r\n" +
    "END:VCARD";

asyncTest("BEGIN, END and VERSION are recognized", function() {
    var expected = [
        ['BEGIN',   'VCARD', {}],
        ['VERSION', '4.0',   {}],
        ['END',     'VCARD', {}]
    ]
    VCF.lex(sample1, function() {
        testTokens(arguments, expected);
    });
});

var sample2 = 
    "BEGIN:VCARD\r\n" +
    "VERSION:4.0\r\n" +
    "FN:I am a full name\r\n" +
    "END:VCARD";

asyncTest("Simple FN statement is recognized", function() {
    var expected = [
        null, null,
        ['FN', "I am a full name", {}],
        null
    ]
    VCF.lex(sample2, function() {
        testTokens(arguments, expected);
    });
});

var sample3 = 
    "BEGIN:VCARD\r\n" +
    "VERSION:4.0\r\n" +
    "FN:I am a long name, that is broken in\r\n" +
    " to more than just a single line\r\n" +
    "\t to be exact three.\r\n" +
    "END:VCARD";

asyncTest("Folded FN statement is recognized", function() {
    var expected = [
        null, null,
        ['FN', "I am a long name, that is broken into more than just a single line to be exact three.", {}],
        null
    ]
    VCF.lex(sample3, function() {
        testTokens(arguments, expected);
    });
});

/***
 ** PARSER TESTS
 **/

module('VCF.parse');

var sample4 =
    "BEGIN:VCARD\r\n" +
    "END:VCARD\r\n";

asyncTest("A single vCard is recognized", function() {
    VCF.parse(sample4, function(vc) {
        ok(vc instanceof VCard, "this is a VCard object");
        start();
    });
});

var sample5 =
    "BEGIN:VCARD\r\n" +
    "END:VCARD\r\n" +
    "BEGIN:VCARD\r\n" +
    "END:VCARD\r\n";


asyncTest("Two vCards are recognized", function() {
    var i = 0;
    VCF.parse(sample5, function(vc) {
        ok(vc instanceof VCard, "this is a VCard object");
        i += 1;
        start();
    });
    equal(i, 2, "two vcards have been yielded");
});

var sample6 =
    "BEGIN:VCARD\r\n" +
    "VERSION:4.0\r\n" +
    "END:VCARD\r\n";

asyncTest("The version attribute is set correctly", function() {
    VCF.parse(sample6, function(vc) {
        equal(vc.version, '4.0', "vcard.version is 4.0");
        start();
    });
});

var sample7 =
    "BEGIN:VCARD\r\n" +
    "VERSION:4.0\r\n" +
    "FN:My formatted name\r\n" +
    "END:VCARD\r\n";

asyncTest("The fn attribute is set correctly", function() {

    VCF.parse(sample7, function(vc) {
        equal(vc.fn, 'My formatted name', "vcard.fn is correct");
        start();
    });

});

var sample8 =
    "BEGIN:VCARD\r\n" +
    "VERSION:4.0\r\n" +
    "N:Lessing;Gotthold;Ephraim;;\r\n" +
    "END:VCARD\r\n";

asyncTest("A three-part name is set correctly", function() {
    VCF.parse(sample8, function(vc) {
        ok(vc.n, "Name is set");
        deepEqual(vc.n, {
            'given-name': ['Gotthold'],
            'family-name': ['Lessing'],
            'additional-name': ['Ephraim']
        });

        start();
    });
});


var sample9 =
    "BEGIN:VCARD\r\n" +
    "VERSION:4.0\r\n" +
    "N:Lessing;Gotthold;Ephraim,Soundso;Dr.,Prof.;von und zu hier und da\r\n" +
    "END:VCARD\r\n";

asyncTest("A complex name with all parts and multiple values per part is set correctly", function() {
    VCF.parse(sample9, function(vc) {
        deepEqual(vc.n, {
            'given-name': ['Gotthold'],
            'family-name': ['Lessing'],
            'additional-name': ['Ephraim', 'Soundso'],
            'honorific-prefix': ['Dr.', 'Prof.'],
            'honorific-suffix': ['von und zu hier und da']
        });
        start();
    });
});

var sample10 =
    "BEGIN:VCARD\r\n" +
    "VERSION:4.0\r\n" +
    "NICKNAME:foo,bar,baz\r\n" +
    "END:VCARD\r\n";

asyncTest("nicknames are recognized", function(vc) {
    VCF.parse(sample10, function(vc) {
        deepEqual(vc.nickname, ['foo', 'bar', 'baz']);
        start();
    });
});

var sample11 =
    "BEGIN:VCARD\r\n" +
    "VERSION:4.0\r\n" +
    "BDAY:--0417\r\n" +
    "END:VCARD";

asyncTest('birthday is recognized', function(vc) {
    VCF.parse(sample11, function(vc) {
        ok(vc.bday, "Birthday is set");
        equal(vc.bday.getUTCDate(), 17, "Day is correct");
        equal(vc.bday.getUTCMonth(), 3, "Month is correct");
        start();
    });
});


var sample12 =
    "BEGIN:VCARD\r\n" +
    "VERSION:4.0\r\n" +
    "GENDER:{gender}\r\n" +
    "END:VCARD";

function testGender(text, value, expectedResult) {
    asyncTest("Gender: " + text, function() {
        VCF.parse(sample12.replace('{gender}', value), function(vc) {
            ok(vc.gender, "Gender is set");
            deepEqual(vc.gender, expectedResult);
            start();
        });
    });
}

testGender("male without identity", "M", {sex:'male'});
testGender("female without identity", "F", {sex:'female'});
testGender("female with identity", "F;boy", {sex:'female',identity:'boy'});
testGender("other without identity", "O", {sex:'other'});
testGender("none without identity", "N", {});
