const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
    
const query = req.body.cityName;
const apiKey = "9b8291d66cca72035079ce140ab12185";
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units="+ units;
https.get(url, function(response){

    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/" + icon + ".png";
        
        res.write("<p>The weather is currently " + weatherDescription + "<p>");
        res.write("<h1>The temperature in " + query + " is " + temp + "degrees Celcius.</h1>");
        res.write("<img src="+ imageURL +">");
        res.send();
    });

});

});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});