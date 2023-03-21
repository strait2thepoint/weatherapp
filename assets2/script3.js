const APIkey = "8af4e7bd8712d038a037b999da84959e";

const queryURL = "http://api.openweathermap.org/data/2.5/forecast?" //I know this works

const measurement = "&units=imperial" //I know this works

let lat = '42.3314'
let lon = '-83.0458'
var url = (queryURL) + "lat="+ lat + "&lon=" + lon + "&appid=" + (APIkey) + (measurement); //I know this works

const variableHere = document.getElementById("myData").???;

fetch(url, {
    cache: "reload",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById("myData").innerHTML =(
       data.temp
       data.weather.icon

        
        )
      console.log(data);
    })

