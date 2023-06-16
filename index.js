window.onscroll = function () { window.scrollTo(0, 0); };

let input = document.querySelector(".user_input");
let error = document.querySelector(".error");
let currTemp = document.querySelector(".temperature");
let currIcon = document.querySelector(".current_day_icon");
let currDescription = document.querySelector(".current_description");
let dynamic_bg = document.querySelector(".dynamic_bg");
let currDay = document.querySelector(".current_day_name");

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

let cloudy = "forecast/cloudy.png";
let sunny = "forecast/sunny.png";
let night = "forecast/moon";
let rainy = "forecast/rainy.png";
let thunder = "forecast/thunder.png";
let snowy = "forecast/snowy.png";

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
    console.log(data.list)
    let d = new Date();
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let month = months[d.getMonth()];
    let weekDay = days[d.getDay()];
    let date = d.getDate();
    
    currTemp.innerText = `${Math.trunc(data.list[0].main.temp)}° F`;
    currDay.innerHTML = `${weekDay} ${month}, ${date}`;
    currLocation.innerHTML = `${data.city.name}, ${data.city.country}`;
    currLowHigh.innerHTML = `H:${Math.trunc(data.list[0].main.temp_max)}°  L:${Math.trunc(data.list[0].main.temp_min)}°`;   
    let desc = data.list[0].weather[0].description;
    
    if(desc.includes("Sun") || desc.includes("sun")){
        currIcon.innerHTML = `<img src ="${sunny}">`;
        currDescription.innerHTML = `${desc}`;
        dynamic_bg.innerHTML = `<video autoplay playsinline muted loop class="dynamic_bg">
        <source src="forecast/sunny.mp4" type="video/mp4">
      </video>`;    
    }

    else if(desc.includes("Rain") || desc.includes("rain")){
        currIcon.innerHTML = `<img src ="${rainy}">`;
        currDescription.innerHTML = `${desc}`;
        dynamic_bg.innerHTML = `<video autoplay playsinline muted loop class="dynamic_bg">
        <source src="forecast/rainy.mp4" type="video/mp4">
      </video>`;    
    }

    else if(desc.includes("Cloud") || desc.includes("cloud")){
        currIcon.innerHTML = `<img src ="${cloudy}">`;
        currDescription.innerHTML = `${desc}`;
        dynamic_bg.innerHTML = `<video autoplay playsinline muted loop class="dynamic_bg">
        <source src="forecast/cloudy.mp4" type="video/mp4">
      </video>`;    
    } 

    else if(desc.includes("Snow") || desc.includes("snow")){
        currIcon.innerHTML = `<img src ="${snowy}">`;
        currDescription.innerHTML = `${desc}`;
        dynamic_bg.innerHTML = `<video autoplay playsinline muted loop class="dynamic_bg">
        <source src="forecast/snowy.mp4" type="video/mp4">
      </video>`;    
    }  

    else if(desc.includes("Storm") || desc.includes("storm")){
        currIcon.innerHTML = `<img src ="${thunder}">`;
        currDescription.innerHTML = `${desc}`;
        dynamic_bg.innerHTML = `<video autoplay playsinline muted loop class="dynamic_bg">
        <source src="forecast/thunder.mp4" type="video/mp4">
      </video>`;    
    }  

    dynamic_bg.muted = true;

    humidity.innerHTML = `${data.list[0].main.humidity}`;

    let index = days.indexOf(`${days[d.getDay() + 1]}`);

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
        
        if(weeklyDesc.includes("Sun") || weeklyDesc.includes("sun") || 
        weeklyDesc.includes("Clear") || weeklyDesc.includes("clear")){
            return eval(day).innerHTML = `<img src ="${sunny}">`;             
        }
    
        else if(weeklyDesc.includes("Rain") || weeklyDesc.includes("rain")){
            return eval(day).innerHTML = `<img src ="${rainy}">`;   
        }
    
        else if(weeklyDesc.includes("Cloud") || weeklyDesc.includes("cloud")){
            return eval(day).innerHTML = `<img src ="${cloudy}">`;      
        } 
    
        else if(weeklyDesc.includes("Snow") || weeklyDesc.includes("snow")){
            return eval(day).innerHTML = `<img src ="${snowy}">`;     
        }   
        else if(weeklyDesc.includes("Storm") || weeklyDesc.includes("storm")){
            return eval(day).innerHTML = `<img src ="${thunder}">`;     
        }   
    }

    for(let i = 1; i <= 5; i++){
        weekday(i);
        lowHigh(i);
        icon(i, i);

        if(index >= 6){
            index = 0;
        } else {
            index++; 
        }
    }   
}

console.log(`Weather Icons from https://www.iconfinder.com/weather-icons?price=free
Background videos from https://www.pexels.com/search/videos/`)
