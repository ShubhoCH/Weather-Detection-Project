const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName
    const apiKey = "5e6720c5a76608e4cc0a599be8554a67";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>In " + query + " the weather is currently: <b>" + weatherDescription.toUpperCase() +"</b></p>");
            res.write("<h1>The temp. is: " + temp + " Kelvin</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
});







app.listen(3000, function(){
    console.log("Server Started Shubho!");
});