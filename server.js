/*
Require calls for the server
Express - the express server framework, handles POST and GET commands.
MongoClient - the MongoDB client, handles saving and retrieving data 
*/
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;



/*
Instance our express environment by calling its constructor and assinging to a variable
*/
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("./"));
app.use(express.json());



/*
Sets an AJAX route for root operation. When root route is accessed the index.html page is served. This way our index would not need to be in the root location
it just happens that in this instance it is.
Note that in an express environment routes control our server side access. Provided files can access resources to send that are included in the static declaration above
*/
app.get("/", function (req, res) {
    res.sendFile("./index.html");
});

/*
Sets an AJAX GET route for the /getnews route. This is the route callled by Angular when using the $http service in the url (e.g. localhost:3000/getnews)
It returns the default_news.json contents to the request
*/
app.get("/getnews", function (req, res) {
    MongoClient.connect('mongodb://40.127.94.32:27017/yan0680', function (err, db) {
        if (err)
        {console.log("error here"); throw err;}
        console.log("connected");
        (db.db('yan0680')).collection('news').find().toArray(function (err, result) {
            if (err) throw err;

            console.log(result);
            res.json(result);
        })
    });
});


/*
Sets an AJAX POST route for /writenews route. Called when an AJAX request is made by $http service 
*/
app.post("/writenews", function (req, res) {

    MongoClient.connect('mongodb://40.127.94.32:27017/yan0680', function (err, db) {
        if (err)
         throw err;
        console.log(req.body);
        (db.db('yan0680')).collection('news').insertOne(req.body, (err, result) => {

        })
    });

});


/*
Sets the liusten port for the server. Note that in this case the server watches port 3000, NOT port 8000
*/
app.listen(3000, function () {
    console.log("Listening on port 3000");
});
