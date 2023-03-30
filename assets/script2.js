const submitBtn = document.getElementById('submit-btn');
const city = document.getElementById("city"); 

const APIkey = "8af4e7bd8712d038a037b999da84959e";

const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" //I know this works

const measurement = "&units=imperial" //I know this works

//"https://api.openweathermap.org/data/2.5/forecast?q=wyoming&appid=8af4e7bd8712d038a037b999da84959e&units=imperial "

// const getForecast = fetch(queryURL+cityInput+"&appid="+APIkey+measurement)

 function getCity(e){
  e.preventDefault();
const city =document.getElementById('city').value
console.log(city)
const requestUrl = queryURL+city+"&appid="+APIkey+measurement


function getAPI(requestUrl){
  fetch(requestUrl)
  .then((response)=> response.json())
  .then((responseData) => {
    console.log(responseData)

    //I really want to replace "0" with "i"
    const dailyForecastCard ={
   "temp": responseData.list[0].main.temp,
   "clouds": responseData.list[0].weather.main, //not getting this one
   "windSd": responseData.list[0].wind.speed,
   "humidity": responseData.list[0].humidity,  //not getting this one
   "icon": responseData.list[0].weather.icon//not getting this one- need to obtain the icon from openweathermap
  }
    console.log(dailyForecastCard);
  
  //for loop here, attempting to loop through 0-4 and obtain all the data from those points?
 var dailyForecastDays = function(dailyForecastCard) {    
      var i = [0, 1, 2, 3, 4]              
    for (var i = 1; i <= num; i++) {                     
      console.log(i);                                    
    }
    dailyForecastDays(dailyForecastCard);   
  };

  // var map = (arr, cb) => {                                 ???
  //   var result = [];                                     ???
  //   for (var index = 0; index < arr.length; index++) {   ???
  //     var currentElement = arr[index];                   ???
  //     result.push(cb(currentElement, index));            ???
  //   }
  //   return result;                                       ???
  // };

//I kept this around in case I need it later:
  //  const lat = responseData.city.coord.lat 
  //  const lon = responseData.city.coord.lon
  //  console.log(lat) //43.0002
  //  console.log(lon) //-107.5009

  //  const http = "https://api.openweathermap.org/data/2.5/weather?lat="
  //  const requestLatLon = http + lat + "&lon=" + lon + "&appid=" + APIkey + measurement

   //https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=8af4e7bd8712d038a037b999da84959e&units=imperial (functional)

//  function weatherData(requestLatLon){
// fetch(requestLatLon)
// .then((response)=>response.json())
// .then((responseWeather)=>{
//   console.log(responseWeather)
// })
// }
//  weatherData(requestLatLon);
})
}

getAPI(requestUrl);
}



//data handler functions- parse temp, humidity, etc. 1. current forecast to local storage.  2. 5 day forecast.
//function data.map (look up tutorial)
//create card with info that we want

// localStorage.setItem
// localStorage.getItem

//using the city we will send to API, get back lat & lon
//lat & lon to get weather info
//current weather info to display on card
//5 day forecast


  


submitBtn.addEventListener('click', getCity);