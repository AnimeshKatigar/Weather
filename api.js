const express = require("express");
const https= require("https");
const bodyParser = require("body-parser")
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));



app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");

});


app.post("/",function(req,res){
  const query=req.body.CityName
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&appid=6ba76c91652f92d7b2885099fd47997d";


  https.get(url, function(response){
    console.log(response.statusCode);


    response.on("data",function(data){
      const weatherdata= JSON.parse(data);
      const temp = weatherdata.main.temp
      const description = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"


      res.render("weather", {qquery:query, temperature:temp, desc:description, image:imgURL});


      })


  });



app.listen(process.env.PORT || 3002 ,function(){
  console.log("Server is up running on port 3002...");
});
