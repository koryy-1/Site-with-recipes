const http = require("http");
const path = require('path');
const fs = require('fs');

const host = 'localhost';
const port = 3000;

var getFiles = function (requestedFile) {
	var files = fs.readdirSync("./pages");
	for (var i in files){
		if (requestedFile.includes(files[i])){
			return true;
		}
	}
	return false;
};
  

const requestListener = function (req, res) {
	const fixPath = (filename) => path.join(__dirname, filename);
    const readFile = (filename) => fs.readFileSync(fixPath(filename), 'utf-8');
	const pagesPath = "./pages"
    switch(req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(readFile(`${pagesPath}/index.html`));
            break;
        case '/app.css':
			res.setHeader('Content-Type', 'text/css')
            res.writeHead(200);
            res.end(readFile(req.url));
            break;
        case '/app.js':
			res.setHeader('Content-Type', 'text/javascript')
            res.writeHead(200);
            res.end(readFile(req.url));
            break;
        default:
			if (getFiles(req.url))
				res.end(readFile(pagesPath + req.url));
			else {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('404 Not Found');
			}
    }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});