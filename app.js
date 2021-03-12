
var http = require('http');
var fs = require('fs');
var path = require('path');

function serveStaticFile(response, path, contentType, responseCode) { 
    if (!responseCode) responseCode = 200; 
    fs.readFile(__dirname + path, function (err, data) {
        if (err) { //page will show "500 - Internal error with a response code 500"  if server found error 
            response.writeHead(500, { "Content-Type": "text/plain" }) 
            response.end("500 - Internal error with a response code 500")
        }
        else { // otherwise it will do following cases
            response.writeHead(responseCode, { "Content-Type": contentType });
            response.end(data);
        }
    })
}


http.createServer(function (require, response) {
    var path = require.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch (path) {
        case "": //in this case if you write only "localhost:3000" , the server will show index.html page
            serveStaticFile(response, "/index.html", "text/html");
            break;
        case "/about": // there are server will open about.html page if you write "/about" after "localhost:3000"
            serveStaticFile(response, "/about.html", "text/html");
            break;
        case "/style.css": // this line helps to open pages with style.css
            serveStaticFile(response, "/style.css", "text/css");
            break;
        case "/img/welcome.jpg": // this line helps to show index.html file with welcome picture
            serveStaticFile(response, "/img/welcome.jpg", "image/jpeg");
            break;
        case "/img/about.jpg": // this line helps to show about.html file with picture 
            serveStaticFile(response, "/img/about.jpg", "image/jpeg");
            break;
        case "/img/gallery/study": // if you write "/img/gallery/study"  after "localhost:3000" the server will show picture which is named study
            serveStaticFile(response, "/img/gallery/study.jpg", "image/jpeg");
            break;
        case "/img/gallery/graduation": // if you write "/img/gallery/graduation"  after "localhost:3000" the server will show picture which is named graduation
            serveStaticFile(response, "/img/gallery/graduation.jpg", "image/jpeg");
            break;
        case "/video/students/memes": // if you write "/video/students/memes"  after "localhost:3000" the server will show video which is named memes
            serveStaticFile(response, "/video/students/memes.mp4", "video/mp4");
            break;
        case "/img/cry.jpg": // these lines help to open picture which is named cry when it needed
            serveStaticFile(response, "/img/cry.jpg", "image/jpeg");
            break;
        default: //otherwise it will open error.html page 
            serveStaticFile(response, "/error.html", "text/html", 404);
            break;

    }

}).listen(3000);

console.log("Serving is running on port 3000!");

