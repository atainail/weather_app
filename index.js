window.onscroll = function () { window.scrollTo(0, 0); };

let input = document.querySelector(".user_input");
let error = document.querySelector(".error");
let currTemp = document.querySelector(".temperature");
let currIcon = document.querySelector(".current_day_icon");
let currDescription = document.querySelector(".current_description");
let dynamic_bg = document.querySelector(".dynamic_bg");
let currDay = document.querySelector(".current_day_name");
let currTime = document.querySelector(".current_time");

let currLocation = document.querySelector(".city_country");
let currLowHigh = document.querySelector(".current_low_high");
let humidity = document.querySelector(".humidity");


let day1 = document.querySelector(".weekday1");
let day1Name = day1.querySelector(".name");
let day1Icon = day1.querySelector(".icon");
let day1LowHigh = day1.querySelector(".low_high");

let day2 = document.querySelector(".weekday2");
let day2Name = day2.querySelector(".name");
let day2Icon = day2.querySelector(".icon");
let day2LowHigh = day2.querySelector(".low_high");

let day3 = document.querySelector(".weekday3");
let day3Name = day3.querySelector(".name");
let day3Icon = day3.querySelector(".icon");
let day3LowHigh = day3.querySelector(".low_high");

let day4 = document.querySelector(".weekday4");
let day4Name = day4.querySelector(".name");
let day4Icon = day4.querySelector(".icon");
let day4LowHigh = day4.querySelector(".low_high");

let day5 = document.querySelector(".weekday5");
let day5Name = day5.querySelector(".name");
let day5Icon = day5.querySelector(".icon");
let day5LowHigh = day5.querySelector(".low_high");

let sunny = "forecast/sunny.png";
let cloudy = "forecast/cloudy.png";
let partlyCloudy = "forecast/partly_cloudy.png";
let rainy = "forecast/rainy.png";
let thunder = "forecast/thunder.png";
let snowy = "forecast/snowy.png";

let nightClear = "forecast/night_clear.png";
let nightCloudy = "forecast/night_cloudy.png";
let nightSnowy = "forecast/night_snowy.png";
let nightRainy = "forecast/night_rainy.png";
let nightThunder = "forecast/night_thunder.png";

document.addEventListener("keypress", function(e){
    if(e.key === "Enter"){               
        if(input.value == "" || input.value == null || input.value.length < 3){
            error.style.display = "block";
        } else {
            error.style.display = "none";               
            fetch (`https://api.openweathermap.org/data/2.5/forecast/?q=${input.value}&units=imperial&cnt=6&appid=34c9b51c7081ad31630509c9efaed8b6`)
            .then(response => response.json())
            .then(displayData)
            .catch(err => error.style.display = "block");
            input.value = null;           
        }
    }
});

let displayData = (data) => {
  let weekDay;
  let date;
  let month;
    function getTime(dt, timezone) {
      const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
      const utc_milliseconds = utc_seconds * 1000;
      const local_date = new Date(utc_milliseconds).toUTCString();
      date = local_date.substring(5, 8);
      weekDay = local_date.substring(0, 3);
      month = local_date.substring(8, 11);
      return local_date;
    }

    getTime(data.list[0].dt, data.city.timezone);

    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    let mainDay;
    for(let i = 0; i < days.length; i++){
      if(days[i].includes(`${weekDay}`)){
        mainDay = days[i];
      }
    }
    let index = days.indexOf(mainDay);

    // returns current time
    let x = new Date();
    x.setSeconds(x.getSeconds() + data.city.timezone); 
    let localTime = x.toISOString().substring(11, 16);
    //////


    let sunrise = new Date(data.city.sunrise * 1000);
let sunset = new Date(data.city.sunset * 1000);

let sunriseHrs = sunrise.getHours();
let sunsetHrs = sunset.getHours();

function isdayTime(){
  if(localTime.substring(0, 2) > sunriseHrs) {
    return true;
  }
  return false;
}


    currTemp.innerText = `${Math.trunc(data.list[0].main.temp)}° F`;
    currDay.innerHTML = `${weekDay} ${month}, ${date}`;
    currLocation.innerHTML = `${data.city.name}, ${data.city.country}`;
    currLowHigh.innerHTML = `H:${Math.trunc(data.list[0].main.temp_max)}°  L:${Math.trunc(data.list[0].main.temp_min)}°`;   
    currTime.innerHTML = `${localTime}`;   
    let desc = data.list[0].weather[0].description;
    
    if(desc.includes("clear")){
        if(isdayTime()) {
          currIcon.innerHTML = `<img src ="${sunny}">`;
          dynamic_bg.innerHTML = `<video autoplay playsinline muted loop class="dynamic_bg">
            <source src="forecast/sunny.mp4" type="video/mp4">
            </video>`; 
        } else {
          currIcon.innerHTML = `<img src ="${nightClear}">`;
          dynamic_bg.innerHTML = `<video autoplay playsinline muted loop class="dynamic_bg">
            <source src="forecast/moon.mp4" type="video/mp4">
            </video>`; 
        }
        currDescription.innerHTML = `${desc}`;      
    }

    else if(desc.includes("rain")){
      if(isdayTime()) {
        currIcon.innerHTML = `<img src ="${rainy}">`;
        
      } else {
        currIcon.innerHTML = `<img src ="${nightRainy}">`;
      }
        currDescription.innerHTML = `${desc}`;
        dynamic_bg.innerHTML = `<video autoplay playsinline muted loop class="dynamic_bg">
        <source src="forecast/rainy.mp4" type="video/mp4">
      </video>`;    
    }

 

    else if(desc.includes("scattered")){
        currIcon.innerHTML = `<img src ="${cloudy}">`;
        currDescription.innerHTML = `${desc}`;
        dynamic_bg.innerHTML = `<video autoplay playsinline muted loop class="dynamic_bg">
        <source src="forecast/cloudy.mp4" type="video/mp4">
      </video>`;    
    } 

    else if(desc.includes("broken") || desc.includes("few") 
    || desc.includes("overcast")){
      if(isdayTime()) {
        currIcon.innerHTML = `<img src ="${partlyCloudy}">`;
        
      } else {
        currIcon.innerHTML = `<img src ="${nightCloudy}">`;
      }
        currDescription.innerHTML = `${desc}`;
        dynamic_bg.innerHTML = `<video autoplay playsinline muted loop class="dynamic_bg">
        <source src="forecast/cloudy.mp4" type="video/mp4">
      </video>`;    
    }

    else if(desc.includes("snow") || desc.includes("sleet")){
      if(isdayTime()) {
        currIcon.innerHTML = `<img src ="${snowy}">`;
        
      } else {
        currIcon.innerHTML = `<img src ="${nightSnowy}">`;
      }
        currDescription.innerHTML = `${desc}`;
        dynamic_bg.innerHTML = `<video autoplay playsinline muted loop class="dynamic_bg">
        <source src="forecast/snowy.mp4" type="video/mp4">
      </video>`;    
    }

    else if(desc.includes("storm")){
      if(isdayTime()) {
        currIcon.innerHTML = `<img src ="${thunder}">`;
        
      } else {
        currIcon.innerHTML = `<img src ="${nightThunder}">`;
      }
        currDescription.innerHTML = `${desc}`;
        dynamic_bg.innerHTML = `<video autoplay playsinline muted loop class="dynamic_bg">
        <source src="forecast/thunder.mp4" type="video/mp4">
      </video>`;    
    }

    dynamic_bg.muted = true;

    humidity.innerHTML = `${data.list[0].main.humidity}`;

    function weekday(dayDiv) {
        let day = `day${dayDiv}Name`;
        return eval(day).innerHTML = `${days[index]}`;
    }

    function lowHigh(listNum) {
        let lowHigh = `day${listNum}LowHigh`;
        return eval(lowHigh).innerHTML = `H:${Math.trunc(data.list[listNum].main.temp_max)}°  L:${Math.trunc(data.list[listNum].main.temp_min)}°`;
    }
   
    function icon(dayDiv, listNum) {
        let day = `day${dayDiv}Icon`;   
        let weeklyDesc = data.list[listNum].weather[0].description;
        
        if(weeklyDesc.includes("clear")){
            return eval(day).innerHTML = `<img src ="${sunny}">`;  
        }
        else if(weeklyDesc.includes("rain")){
            return eval(day).innerHTML = `<img src ="${rainy}">`;  
        }
        else if(weeklyDesc.includes("scattered")){
            return eval(day).innerHTML = `<img src ="${cloudy}">`;  
        }
        else if(weeklyDesc.includes("broken") || weeklyDesc.includes("few") 
        || weeklyDesc.includes("overcast")){
            return eval(day).innerHTML = `<img src ="${partlyCloudy}">`;  
        }
        else if(weeklyDesc.includes("snow") || desc.includes("sleet")){
            return eval(day).innerHTML = `<img src ="${snowy}">`;  
        }
        else if(weeklyDesc.includes("storm")){
            return eval(day).innerHTML = `<img src ="${thunder}">`;  
        }
    }
   
    for(let i = 1; i <= 5; i++){     
        lowHigh(i);
        icon(i, i); 
        if(index >= 6 || index == -1){
            index = 0;
            weekday(i);           
        } else { 
            index++;  
            weekday(i);                       
        }
    } 
}

console.log(`Weather Icons from https://www.iconfinder.com/iconsets/weather-color-2
Background videos from https://www.pexels.com/search/videos/
Other icons from https://icons8.com/icons/`)
