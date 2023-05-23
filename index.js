/**
 * Primary file for api
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// server
const server = http.createServer(function(req, res) {
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
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });
    req.on('end',function(){
        buffer += decoder.end();
        // send reponse
        res.end('hello world\n');
    
        //log request path
        // console.log('request recieved path: '+ trimmedPath + 'with method: ' + method + ' with query param ', queryStringObject);
        console.log('request recieve with these payload: ', buffer);
    });


});

server.listen(3000, function() {
    console.log('listening to port 3000');
})