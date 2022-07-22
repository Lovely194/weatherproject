const express= require("express");
const https= require("https");
const bodyparser= require("body-parser");


const app= express();
app.use(bodyparser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){

const query=req.body.cityName;
const units="metric";
const appkey= "622d855457e1fab8563f5a30776d2492";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&&appid="+appkey;
https.get(url,function(response){
console.log(response.statusCode);
response.on("data",function(data){
const weatherdata= JSON.parse(data);

const temp=weatherdata.main.temp;

const weatherdescription=weatherdata.weather[0].description;
const icon=weatherdata.weather[0].icon;
const imageURL="https://api.openweathermap.org/img/wn/"+icon +"@2x.png";

res.write("<p>The weather is currently"+weatherdescription+"</p>")
res.write("<h1>The temperature in"+query+"is currently" +temp+"</h1>")
res.write("<img src="+icon+">")
res.send()
})
})
})

app.listen(3000,function(){
    console.log("server started on port 3000");
})