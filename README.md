# node-fetch-response-matchers

[![Build Status](https://travis-ci.org/kfiron/node-fetch-response-matchers.svg?branch=master)](https://travis-ci.org/kfiron/node-fetch-response-matchers)

Matchers for node-fetch promise response.
It helps the tests to be more declarative.

## TL;DR

- Verbose way to test node-fetch response:
```javascript
   it('some-test', function(done){
      nodeFetch('http://localhost/')
         .then(res => {
            expect(res.status).to.equal(200);
            return text();
         }).then(text => {
            expect(text).to.equal('foo');
            done();
         })
   });
```

- Using this lib in more declarative way with hide the promise complexity:
```javascript
   it('some-test', function(){
     return nodeFetch('http://localhost/').to.be.successful()
                            .and.haveBodyText('foo');

   });
```



## Install (for dev only - used by tests)
```shell
$ npm i node-fetch-response-matchers --save-dev
```

## Usage example
```javascript

const nodeFetchMatchers = require('node-fetch-response-matchers');
const nodeFetch = require('node-fetch');
const chai = require('chai');

chai.use(nodeFetchMatchers);

describe('test suite', function(){
    it('http success test', function(){
        return nodeFetch('http://localhost/').to.be.successful();
    });
    it('http not found test', function(){
        return nodeFetch('http://localhost/').to.be.notFound();
    });
    it('http status assert', function(){
        return nodeFetch('http://localhost/').to.haveStatus(500);
    });
    it('have header', function(){
       return nodeFetch('http://localhost/').to.haveHeader('connection', 'close');
    });
    it('header exists', function(){
        return nodeFetch('http://localhost/').to.headerExists('connection');
    });
    it('have body object', function(){
       return nodeFetch('http://localhost/').to.haveBodyObject({foo: 'bar'});
    });
    it('have body text', function(){
       return nodeFetch('http://localhost/').to.haveBodyText('foo');
    });
    it('match body by regexp', function(){
       return nodeFetch('http://localhost/').to.haveBodyRegexpMatch(/foo/gi);
    });
});
```

## API description
You can all use chai "not" and compose by chai "and", for example

```javascript
   it('not', function(){
      return nodeFetch('http://localhost/').to.not.be.successful();
   });
   it('and', function(){
      return nodeFetch('http://localhost/').to.be.successful()
                                                .and.haveBodyText('foo');
   });
```


## Status matchers

| API function         | params   | description                      |
| ---------------------|----------| ---------------------------------|
| successful()         | ()       | Assert that the status is 200 OK |
| created()            | ()       | Assert that the status is 201    |
| unAuthorized()       | ()       | Assert that the status is 401    |
| rejected()           | ()       | Assert that the status is 403    |
| notFound()           | ()       | Assert that the status is 404    |
| serverError()        | ()       | Assert that the status is 500    |
| serviceUnAvailable() | ()       | Assert that the status is 503    |
| haveStatus()         | (status) | Assert that the status is provided number argument    |



## Body matchers

| API function         | params    | description                             |
| ----------------------|----------| ----------------------------------------|
| haveBodyObject()      | (obj)    | Assert equal provided object            |
| haveBodyText()        | (text)   | Assert equal provided string text       |
| haveBodyRegexpMatch() | (regexp) | Assert match body on regular expression |



## Header matchers

| API function  | params         | description                                                     |
| --------------|----------------| ----------------------------------------------------------------|
| haveHeader()  | (name, value)  | Assert that response contains header by provided name and value |
| headerExists()| (name)         | Assert that response contains header by provided name           |

