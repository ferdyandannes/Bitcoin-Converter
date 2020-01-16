//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",  function(req, res){
  //console.log(req.body.crypto);
  //console.log(req.body.fiat);

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  // Concatenate the two string
  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var kurs = crypto+fiat;
  var finalURL = baseURL+kurs;

  // Response apa yg dikasih url itu ke kita
  request(finalURL, function(eror, response, body){
    // Take the data from JSON
    var data = JSON.parse(body);
    // last
    var price = data.last;
    // Average
    var price_avg = data.averages.week;
    // Date
    var date = data.display_timestamp;

    // Send the response
    //res.send("<h1>The current price of " + crypto  + " is " + price + fiat + "</h1>");
    //res.send("<h2>Current date " + date + "</h2>");

    res.write("<h1>The current price of " + crypto  + " is " + price + fiat + "</h1>");
    res.write("<h2>Current date " + date + "</h2>");
    res.send();

    console.log(price);
  })
});



app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
