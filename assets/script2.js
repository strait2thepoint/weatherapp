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
  })

}

getAPI(requestUrl);{}
}
//data handler functions- parse temp, humidity, etc. 1. current forecast to local storage.  2. 5 day forecast.
//function data.map (look up tutorial)
//create card with info that we want

//using the city we will send to API, get back lat & lon
//lat & lon to get weather info
//current weather info to display on card
//5 day forecast


  


submitBtn.addEventListener('click', getCity);