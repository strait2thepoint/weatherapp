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

return fiveDayArr;  
}

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
  // console.log("today's data")
  // console.log(data[i])
var myImage = cardContainer[i].children[0].children[0]
console.log(myImage)
myImage.src = data[i].icon
var myTemperature = cardContainer[i].children[0].children[2].children[0]
var myHumidity = cardContainer[i].children[0].children[2].children[1]
var myDescription = cardContainer[i].children[0].children[2].children[2]
var myWindSpeed = cardContainer[i].children[0].children[2].children[3]
}
}
//eventlistener for the submit button, this starts the whole machine
submitBtn.addEventListener('click', handleSubmit);
