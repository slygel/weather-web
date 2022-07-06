const apikey = "ec4cedb1e04c5d6bbdfe57ed8ee29272";

const search = document.querySelector(".search");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const value = document.querySelector(".value");
const shortDesc = document.querySelector(".short-desc");
const visibility = document.querySelector(".visibility span");
const wind = document.querySelector(".wind span");
const sun = document.querySelector(".sun span");
const time = document.querySelector(".time");
const content = document.querySelector(".content");
const body = document.querySelector("body");
const form = document.getElementById("form");

async function getTheWeather(){
    const capitalSearch = search.value.trim();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=${apikey}`;
    const data = await fetch(url).then(res => res.json());

    if(data.cod == 200){

        content.classList.remove("hide");
        city.innerText = data.name+",";
        country.innerText = data.sys.country;
        visibility.innerText = data.visibility + "m";
        wind.innerText = data.wind.speed + "m/s";
        sun.innerText = data.main.humidity + "%";
        value.innerText = KtoC(data.main.temp) + "°C";
        shortDesc.innerText = data.weather[0].main;
        time.innerText = new Date().toLocaleString("vi");
        
        body.setAttribute("class","cold");
        if(KtoC(data.main.temp) > 24 && KtoC(data.main.temp) <= 29){
            body.setAttribute("class","warm");
        }
    
        if(KtoC(data.main.temp) >= 13 && KtoC(data.main.temp) <= 24){
            body.setAttribute("class","cool");
        }
    
        if(KtoC(data.main.temp) >= 0 && KtoC(data.main.temp) <= 12){
            body.setAttribute("class","cold");
        }

        if(KtoC(data.main.temp) >= 30 && KtoC(data.main.temp) <= 40){
            body.setAttribute("class","hot");
        }
    
        }else{
            content.classList.add("hide");
        }
}

function KtoC(K){
    return Math.floor(K-273.15);
}

search.addEventListener('keypress' , e =>{
    if(e.code === 'Enter'){
        getTheWeather();
    }
});