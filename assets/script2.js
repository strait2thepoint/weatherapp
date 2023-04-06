//lines 2-6 are for the main current day forecast box
const cTemp = document.getElementById('currenttemp');
const cHumidity = document.getElementById('currenthumidity');
const cWindSpeed = document.getElementById('currentwindSpeed');
const cDescription = document.getElementById('currentdescription');
const cIcon = document.getElementById('icon');

//five day forecast:
const temp = document.querySelectorAll(".temperature");
const humidity = document.querySelectorAll(".humidity");
const windSpeed = document.querySelectorAll(".windspeed");
const description = document.querySelectorAll(".description");
const icon = document.querySelectorAll(".icon")

//submit button and city area:
const submitBtn = document.getElementById('submit-btn');
const city = document.getElementById("city"); 

//API call that obtains weather for selected city
const APIkey = "8af4e7bd8712d038a037b999da84959e";
const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" 
const measurement = "&units=imperial" 

//obtaining the city information from the input
function getCity(){
const city =document.getElementById('city').value
return city;
}

// const temps = (fiveDayArr) => console.log(`${temp[0]}`); //also goes with for/of
//getting the data for 5 days only
const getFiveDayData = (data)=>{
  const fiveDay = data.slice(1,6);
 const fiveDayArr = fiveDay.map((targetDay)=>{
  return {
     temp: targetDay.main.temp,
      clouds : targetDay.weather[0].main, 
      windSpeed : targetDay.wind.speed,
      humidity : targetDay.main.humidity,  
      icon : `https://openweathermap.org/img/wn/${targetDay.weather[0].icon}@2x.png`   
} 
}) 

return fiveDayArr; //create cards
// console.log(fiveDayArr) //I can use fiveDayArr as input for the next function.  
}

// console.log(`Temperature:\n`); //trying out the for/of method

// for(const temp of temps){ //trying out for/of
//   outputTemps(temp);
// }


//Thinking that I need to loop through the length of the array in order to obtain the data and then attach it to the cards.  Not sure how to do that.
//parse data into cards?

//for loop here, attempting to loop through 0-4 and obtain all the data from those points?
// var dailyForecastDays = function(dailyForecastCard) {    
//   var i = [0, 1, 2, 3, 4]              
//   for (var i = 1; i <= num; i++) {                     
//     console.log(i);                                    
//   }
//   dailyForecastDays(dailyForecastCard);   
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

//data handler functions- parse temp, humidity, etc. 1. current forecast to local storage.  2. 5 day forecast.
//function data.map (look up tutorial)
//create card with info that we want
//get weather icon from API

//SAVE SEARCHED CITIES IN LOCAL STORAGE
// localStorage.setItem
// localStorage.getItem

//fetching the data from the API.  This is the API call
const fetchData = async (requestUrl) =>{ 
  const response = await fetch(requestUrl) 
  const responseData = await response.json()
  return responseData.list
}

//Making the URL for the API call
const makeURL = (cityName)=>{
  const requestUrl = `${queryURL}${cityName}&appid=${APIkey}${measurement}`
return requestUrl;
}

//When we click the submit button, we call all these functions above
 const handleSubmit = async (e)=>{
  e.preventDefault()
 const city = getCity()
const requestURL = makeURL(city)
const responseData  = await fetchData(requestURL)
const fiveDayData = getFiveDayData(responseData) 
  makeFiveDay(fiveDayData)
//fiveDayData needs to go into a call response
}

const makeFiveDay = (data) => {
  console.log("in my make five Day")
  console.log(data)
var cardContainer = document.querySelector(".card-container").children
for (let i = 0; i < cardContainer.length; i++) {
var myImage = cardContainer[i].children[0].children[0]
var myTemperature = cardContainer[i].children[0].children[2].children[0]
var myHumidity = cardContainer[i].children[0].children[2].children[1]
var myDescription = cardContainer[i].children[0].children[2].children[2]
var myWindSpeed = cardContainer[i].children[0].children[2].children[3]
console.log(myImage)
}
}
//eventlistener for the submit button, this starts the whole machine
submitBtn.addEventListener('click', handleSubmit);

//Found code that might be useful from https://www.tutorialspoint.com/how-to-append-data-to-div-element-using-javascript#:~:text=We%20can%20append%20data%20to,content%20within%20the%20.
// var div = document.querySelector('div');
// var p = document.createElement('p');
// p.textContent = 'This is some data that will be appended to the div element';
// div.appendChild(p);

