const APIkey = "8af4e7bd8712d038a037b999da84959e";

const queryURL = "http://api.openweathermap.org/data/2.5/forecast?" //I know this works

const measurement = "&units=imperial" //I know this works

//What is in the actual code:
// let gotPosition = function(pos){
//     let lat = pos.coords.latitude;
//     let lon = pos.coords.longitude;
//     getForecast(lat, lon);  
//     }

//My own version:
let gotPosition = function(pos){
let lat = '42.3314'
let lon = '-83.0458'
getForecast(lat, lon);  
}

//Modified what is in actual code:
// let getForecast = function(lat, lon){
//     let url = "https://api.openweathermap.org/data/2.5/onecall?lat=42.3314&lon=-83.0458&exclude=current,minutely,hourly&appid=8af4e7bd8712d038a037b999da84959e"
//     getWeatherText(url);
// }

//My own version:
let getForecast = function(lat, lon){
    let requestURL = (queryURL) + "lat="+ lat + "&lon=" + lon + "&appid=" + (APIkey) + (measurement); //I know this works by itself.  IDK in the function
    getWeatherText(requestURL);
}

async function getWeatherText (requestURL){
    let weatherObject = await fetch(requestURL);
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
navigator.geolocation.getCurrentPosition
(gotPosition);