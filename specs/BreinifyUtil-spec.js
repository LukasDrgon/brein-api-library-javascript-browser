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
});