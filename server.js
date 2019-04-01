
var express = require('express');
var app = express();
var moment = require('moment');

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  if (req.params.date_string === undefined) {
    res.json({"unix": new Date().getTime(), "utc": new Date().toUTCString()});
    return;
  }
  if (req.params.date_string.match(/-/g) === null) {
    req.params.date_string = moment.unix(req.params.date_string / 1000).utc();
  }
  if (moment(req.params.date_string).isValid() === false) {
    res.json({"error" : "Invalid Date"});
    return;
  }
  res.json({"unix": new Date(req.params.date_string).getTime(), "utc": new Date(req.params.date_string).toUTCString()});
});

const port = process.env.PORT || 3000;

var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});