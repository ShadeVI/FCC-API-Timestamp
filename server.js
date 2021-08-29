// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
    const dateObj = new Date();

    res.json({
        unix: dateObj.getTime(),
        utc: dateObj.toUTCString(),
    });
});

app.get("/api/:date", (req, res) => {
    const dateObj = isNaN(req.params.date)
        ? new Date(req.params.date)
        : new Date(Number(req.params.date));

    if (dateObj.toString() === "Invalid Date") {
        res.json({
            error: "Invalid Date",
        });
    }

    res.json({
        unix: dateObj.getTime(),
        utc: dateObj.toUTCString(),
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
