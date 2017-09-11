"use strict";

describe('BreinifyUtil', function () {

    //noinspection JSUnresolvedFunction
    it('is available through Breinify', function () {

        //noinspection JSUnresolvedVariable
        var util = window['Breinify'].UTL;

        //noinspection JSUnresolvedFunction
        expect(typeof util).toBe('object');
    });

    //noinspection JSUnresolvedFunction
    it('param retrieval in loc is working correctly', function () {
        var url;

        url = 'https://sample.com/search#q=SearchValue&p=5';
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.param('q', '#', null, null, url)).toBe('SearchValue');
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.param('p', '#', null, null, url)).toBe('5');
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.hasParam('p', '#', null, null, url)).toBe(true);
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.hasParam('unknown', '#', null, null, url)).toBe(false);
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.paramIs(5, 'p', '#', null, null, url)).toBe(true);

        url = 'https://moreSample.com/search#q=What%20Am%20I%20Searching%20for%20(%3F%25!%23%24)&p=1';
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.param('q', '#', null, null, url)).toBe('What Am I Searching for (?%!#$)');

        url = 'http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=What%20Am%20I%20Searching%20for%20(%3F%25!%23%24)&rh=i%3Aaps%2Ck%3AWhat+Am+I+Searching+for+(%3F%25!%23%24)';
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.param('field-keywords', null, null, null, url)).toBe('What Am I Searching for (?%!#$)');
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.parsedParam('string', 'url', null, null, null, url)).toBe('search-alias=aps');
    });

    //noinspection JSUnresolvedFunction
    it('calculates the correct md5', function () {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.md5('philipp.meisen@breinify.com')).toBe('b82052775f777ec53787a3c2d3bc3b5d');
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.md5('Hello World')).toBe('b10a8db164e0754105b7a99be72e3fe5');
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.md5('')).toBe('d41d8cd98f00b204e9800998ecf8427e');
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.md5(null)).toBeNull();
    });

    //noinspection JSUnresolvedFunction
    it('can handle cookies', function () {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.cookie.get('undefined')).toBeNull();
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.cookie.all()).toEqual({});

        // set some cookies
        Breinify.UTL.cookie.set('cookie', 'value');
        Breinify.UTL.cookie.set('cookie', 'lastValue');
        Breinify.UTL.cookie.set('anotherCookie', 'anotherValue');
        Breinify.UTL.cookie.set('specialChars', '?%&*)(');
        Breinify.UTL.cookie.set('empty', '');

        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.cookie.all()).toEqual({
            'anotherCookie': 'anotherValue',
            'cookie': 'lastValue',
            'empty': '',
            'specialChars': '?%&*)('
        });

        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.cookie.get('cookie')).toEqual('lastValue');
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.cookie.get('anotherCookie')).toEqual('anotherValue');
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.cookie.get('empty')).toEqual('');

        Breinify.UTL.cookie.reset('cookie');

        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.cookie.all()).toEqual({
            'anotherCookie': 'anotherValue',
            'empty': '',
            'specialChars': '?%&*)('
        });
    });

    //noinspection JSUnresolvedFunction
    it('detects empty values', function () {

        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.isEmpty()).toBe(true);
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        expect(Breinify.UTL.isEmpty(null)).toBe(true);
    });


    //noinspection JSUnresolvedFunction
    it('simple object works', function () {
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.isSimpleObject(null)).toBe(true);
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.isSimpleObject({})).toBe(true);
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.isSimpleObject({'array': ['string1']})).toBe(true);
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.isSimpleObject({'array': ['string1', 'string2']})).toBe(true);
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.isSimpleObject({'array': [1, 2]})).toBe(true);
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.isSimpleObject({'array': [1, 2, null, 3]})).toBe(true);
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.isSimpleObject({'array': [1, 2, null, '3']})).toBe(false);
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.isSimpleObject({'val1': 1, 'val2': 2, 'val3': []})).toBe(true);
    });

    //noinspection JSUnresolvedFunction
    it('trimQuotes', function() {
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.trimQuotes(null)).toBeNull();
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.trimQuotes({})).toEqual({});
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.trimQuotes('"Test"')).toEqual('Test');
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.trimQuotes('  "Test"   ')).toEqual('  "Test"   ');
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.trimQuotes('\'Test\'', true)).toEqual('Test');
    });

    //noinspection JSUnresolvedFunction
    it('extractsNeededInformation', function() {
        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.extract('http://google.de')).toEqual({
            full: 'http://google.de',
            username: null,
            password: null,
            port: null,
            protocol: 'http',
            domain: 'google.de',
            path: null,
            parameters: null
        });

        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.extract('http://api.breinify.com/activity')).toEqual({
            full: 'http://api.breinify.com/activity',
            username: null,
            password: null,
            port: null,
            protocol: 'http',
            domain: 'api.breinify.com',
            path: '/activity',
            parameters: null
        });

        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.extract('http://142.42.1.1/')).toEqual({
            full: 'http://142.42.1.1/',
            username: null,
            password: null,
            port: null,
            protocol: 'http',
            domain: '142.42.1.1',
            path: '/',
            parameters: null
        });

        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.extract('https://142.42.1.1:8080/')).toEqual({
            full: 'https://142.42.1.1:8080/',
            username: null,
            password: null,
            port: 8080,
            protocol: 'https',
            domain: '142.42.1.1',
            path: '/',
            parameters: null
        });

        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.extract('http://foo.com/blah_(wikipedia)_blah#cite-1')).toEqual({
            full: 'http://foo.com/blah_(wikipedia)_blah#cite-1',
            username: null,
            password: null,
            port: null,
            protocol: 'http',
            domain: 'foo.com',
            path: '/blah_(wikipedia)_blah',
            parameters: '#cite-1'
        });

        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.extract('http://code.google.com/events/#&product=browser')).toEqual({
            full: 'http://code.google.com/events/#&product=browser',
            username: null,
            password: null,
            port: null,
            protocol: 'http',
            domain: 'code.google.com',
            path: '/events/',
            parameters: '#&product=browser'
        });

        //noinspection JSUnresolvedFunction
        expect(Breinify.UTL.loc.extract('http://foo.bar/?q=Test%20URL-encoded%20stuff')).toEqual({
            full: 'http://foo.bar/?q=Test%20URL-encoded%20stuff',
            username: null,
            password: null,
            port: null,
            protocol: 'http',
            domain: 'foo.bar',
            path: '/',
            parameters: '?q=Test%20URL-encoded%20stuff'
        });
    });
});