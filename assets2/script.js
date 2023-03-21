let lat = '42.9634'
let long = '-85.6681'

let gotPosition = function(pos){
    // let lat = pos.coords.latitude;
    // let long = pos.coords.longitude;
    getForecast(lat, long);
}

// let url = "api.openweathermap.org/data/2.5/forecast?lat=" +(lat)+ "&lon=" +(long)+ "&appid=8af4e7bd8712d038a037b999da84959e&units=imperial";
// let getForecast = function(lat, long){
//     // let url = "https://api.openweathermap.org/data/2.5/oncall?lat=" + lat + "&lon=" + long + "&appid=8af4e7bd8712d038a037b999da84959e" //maybe I can take off the currently here so I get the current data as well... &exclude=current,minutely,hourly
//    getWeatherText(url);
// }

var url = api.openweathermap.org/data/2.5/forecast?lat=42.9634&lon=-85.6681&appid=8af4e7bd8712d038a037b999da84959e&units=imperial
console.log(url)


function getWeatherText (url){
    let weatherObject = await fetch(url);
    let weatherText = await weatherObject.text();
    parseWeather(weatherText);
}

let parseWeather = function(weatherText){
    let weatherJSON = JSON.parse(weatherText);
    console.log(weatherJSON);
    let dailyForecast = weatherJSON.daily;
    //console.log(dailyForecast);
    for (i = 0; i < dailyForecast.length; i++) {
        let day = dailyForecast[i];
        let today = new Date().getDay() + i;
        if (today > 6){
            today = today - 7;
    }
        let dayOfWeek = getDayOfWeek(today);
        let description = day.weather[0].icon;
        let sunrise = timestampToTime(day.sunrise);
        let sunset = timestampToTime(day.sunset);
        let highTemp = kToF(day.temp.max);
        let lowTemp = kToF(day.temp.min);
        let humidity = day.humidity;
        let windSpeed = day.wind_speed;
        let windGust = day.wind_gust;
        displayWeatherDay(dayOfWeek, description, icon, sunrise, sunset, highTemp, lowTemp, humidity, windSpeed, windGust);
    }
}

let displayWeatherDay = function(dayOfWeek, description, icon, sunrise, sunset, highTemp, lowTemp, humidity, windSpeed, windGust){
    let out = "<div class='weatherDay'><img scr='http://openweathermap.org/img/wn" + icon + ".png'/>";
    out += "<h2>" + dayOfWeek + "</h2>";
    out += "<h3>" + description + "</h3>";
    out += "<p>Sunrise: " + sunrise + "</p>";
    out += "<p>Sunset: " + sunset + "</p>";
    out += "<p>High Temperature: " + highTemp + "F</p>";
    out += "<p>Low Temperature: " + lowTemp + "F</p>";
    out += "<p>Humidity: " + humidity + "%</p>";
    out += "<p>Wind Speed: " + Math.round(windSpeed) + "with gusts up to " + Math.round(windGust) + "</p></div>";
    document.getElementById("forecasat").innerHTML += out;
}

let getDayOfWeek = function(dayNum){
    var weekday = new Array(7);
    weekday[0] ="Sunday";
    weekday[1] ="Monday";
    weekday[2] ="Tuesday";
    weekday[3] ="Wednesday";
    weekday[4] ="Thursday";
    weekday[5] ="Friday";
    weekday[6] ="Saturday";
}


// let kToF = function(kelvinTemp){
//     const celsius = kelvinTemp - 273;
//     const fahrenheit = Math.floor(celsius * (9/5) +32);
//     return fahrenheit
// }

let timestampToTime = function(timeStamp){
    let date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    let minutes = "";
    if (date.getMinutes()<10){
        minutes = "0" + date.getMinutes();
    }else{
        minutes = date.getMinutes();
    }
    return hours + ":" + minutes;
}