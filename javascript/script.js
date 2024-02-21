let form = document.querySelector("form")
let container = document.getElementById("container")
 let forecastBox = document.querySelector(".forecast-container")

let kelvinToCelsius = (tempInKelvin) => tempInKelvin - 273.15;

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let input = document.querySelector("input");

    let iframe = document.querySelector("iframe")
    iframe.src = `https://www.google.com/maps?q=${input.value}&t=&z=13&ie=UTF8&iwloc=&output=embed`


    getData(input.value)
    getForecast(input.value)
})

let getData = async (inp)=>{
    let url= ` https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=b80f88eb21235860c485526431858990`
    let response = await fetch(url);
    let data = await response.json();

     let temp = document.getElementById("temp")
     temp.innerHTML = `<b>Current Temperature :</b>  ${kelvinToCelsius(data.main.temp).toFixed(1)}°C`
     
     let maxTemp = document.getElementById("max-temp")
     maxTemp.innerHTML = `<b>Max Temperature☀️ :</b>  ${kelvinToCelsius(data.main.temp_max).toFixed(1)}°C`

    let minTemp = document.getElementById("min-temp")
    minTemp.innerHTML = `<b>Min Temperature🌤️ :</b>  ${kelvinToCelsius(data.main.temp_min).toFixed(1)}°C`

    let wind = document.getElementById("wind")
    wind.innerHTML = `<b> Wind 💨:</b>   { speed : ${data.wind.speed},  deg : ${data.wind.deg}}`

    let clouds = document.getElementById("clouds")
    clouds.innerHTML = `<b>Clouds ⛅🌨️:</b>  {all : ${data.clouds.all}}%`

   let sunrise = document.getElementById("sunrise")
   sunrise.innerHTML = `<b>Sunrise🌅  :</b>  ${new Date(data.sys.sunrise*1000)}`

   let sunset = document.getElementById("sunset")
   sunset.innerHTML =  `<b>Sunset🌇 :</b>  ${new Date(data.sys.sunset*1000)}`


}


let getForecast = async (inp1)=> {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${inp1}&appid=7f37666b148ef7b26142f7f143f232dc`;

    let res = await fetch(url);
    let data1 = await res.json();

    let forecastHTML = '';
  
    const forecastData = data1.list.filter((ele,index) => index % 8 === 0);
    forecastData.forEach(item => {

        const iconCode = item.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        forecastHTML += `
            <div>
                <p>Date: ${new Date(item.dt * 1000).toLocaleDateString()}</p>
                <img src="${iconUrl}" alt="Weather Icon"> 
                <p>Temperature: ${kelvinToCelsius(item.main.temp).toFixed(1)}°C</p>
                <p>Weather: ${item.weather[0].description}</p>
            </div>
        `;
    });

    forecastBox.innerHTML = forecastHTML;
};