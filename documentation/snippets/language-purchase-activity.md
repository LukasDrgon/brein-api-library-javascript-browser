>
```javascript--browser
var sId = Breinify.UTL.cookie.get('JSESSIONID');
var tags = {
    'productIds': [ '125689', '982361', '157029' ],
    'productPrices': [ 134.23, 15.13, 12.99 ]
};
Breinify.activity({ 'sessionId': sId }, 'checkOut', tags);
```