import http from 'http';
import fs from 'fs';

http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, data) {
    if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('File not found');
        res.end();
    } else {
        // Send the HTML content with a 200 status code and 'text/html' content type
        console.log('Server is running !');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }
  });
}).listen(8080, () => {
    console.log(`Server started.`);
});
