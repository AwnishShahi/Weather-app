const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res)
{
    res.sendFile(__dirname + `/html.htm`);   
});
app.post("/", function (req, res)
{
    const query = req.body.city;
    const apiKey = "cb100bd1ba45152aaa68aff24b0dff81";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

        https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const ic = weatherData.weather[0].icon;
        const iurl = `https://openweathermap.org/img/wn/${ic}@2x.png`;
        // console.log(weatherData);
        // const obj = {
        //     name: "AJ",
        //     section: "a"
        // }
        // console.log(JSON.stringify(obj))
        // const tem = weatherData.main.temp;
        // console.log(tem);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        // res.send(`<p><h1>The temprature in London is ${temp} degrees Celcius.</h1> And the current weather is ${weatherDescription}.</p>`);
        res.write(
          `<h1>The temprature in ${query} is ${temp} degrees Celcius.</h1> `
        );
        res.write(`<p>And the current weather is ${weatherDescription}.</p>`);
        res.write(`<img src="${iurl}" alt="Weather Image">`);
        res.send();
      });
    });
})
app.listen("3000", function () {
  console.log("Server is running at port 3000");
});
