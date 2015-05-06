var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/public'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('public/index.html', { root: __dirname });
});

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'));