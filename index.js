/**
 * Primary file for api
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// server
const server = http.createServer(function (req, res) {
    // get url and parse it
    var parseUrl = url.parse(req.url, true);

    //get the path
    var path = parseUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // get http method
    var method = req.method.toLowerCase();

    // get querystring as an object
    var queryStringObject = parseUrl.query;

    // get the headers as object
    var headers = req.headers;

    // get payload, if any
    var decoder = new StringDecoder('utf-8');
    // get the payload, if any
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();
        // choose a handler for the route 
        var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // construct data object to send to handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        // route the request to a handler specified in the router
        chosenHandler(data, function (statusCode, payload) {
            // default status code
            statusCode = typeof (statusCode) === 'number' ? statusCode : 200;

            // use the payload by callback or default to empty object
            payload = typeof (payload) == 'object' ? payload : {};

            // convert payload to string
            var payloadString = JSON.stringify(payload);
            
            // return response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);

            res.end(payloadString);
            //log request path
            // console.log('request recieved path: '+ trimmedPath + 'with method: ' + method + ' with query param ', queryStringObject);
            console.log('returning this response', statusCode, payloadString);
        });

        // send reponse
        // res.end('hello world\n');

    });


});

server.listen(3000, function () {
    console.log('listening to port 3000');
});

// handlers
var handlers = {};

// sample handler
handlers.sample = function (data, callback) {
    // callback = http code and sample object
    callback(400, { 'name': 'sample handler' });
};

handlers.notFound = function (data, callback) {
    callback(404);
}

//  define a request router
var router = {
    'sample': handlers.sample
};