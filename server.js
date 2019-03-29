
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date_string?', function (req, res, next) {
  if (req.params.date_string === undefined) {
    res.json({"unix": new Date().getTime(), "utc": new Date().toUTCString()});
    return;
  }
  res.json({"unix": new Date(req.params.date_string).getTime(), "utc": new Date(req.params.date_string).toUTCString()});
});

const port = process.env.PORT || 3000;

var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});