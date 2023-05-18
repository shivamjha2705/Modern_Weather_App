const apiKey = "a929a69287d04abad6603ee09e067b6c";
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=dumka&appid=${apiKey}`;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          weatherReport(data);
        });
    });
  }
});

function weatherReport(data) {
  var urlcast =
    `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` +
    `appid=${apiKey}`;
    fetch(urlcast)
        .then((res) => {
          return res.json();
        })
        .then((forecast) => {
          // console.log(forecast);
          hourForecast(forecast);
          dayForecast(forecast);

          // getting city name 
          document.getElementById('city').innerText=data.name+ ', '+data.sys.country;

          // getting temperature
          document.getElementById('temperature').innerText=Math.floor(data.main.temp - 273)+ ' °C';

          // getting clouds details
          document.getElementById('clouds').innerText= data.weather[0].description;

          let icon = data.weather[0].icon;
          
          let iconurl = "https://api.openweathermap.org/img/w/" + icon +".png";
          
          document.getElementById('img').src=iconurl;
          
           
        });
}

document.getElementById('search').addEventListener('click',()=>{
  var place = document.getElementById('input').value;
  var urlsearch =  `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`;

  fetch(urlsearch)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          weatherReport(data);
        });
  var place = document.getElementById('input').value='';
})

// https://api.openweathermap.org/img/w/04d.png
function hourForecast(forecast){
  document.querySelector('.templist').innerHTML = '';
  for(let i=0;i<5;i++){
    var date= new Date(forecast.list[i].dt*1000);
    let hourR = document.createElement('div');
    hourR.setAttribute('class','next');
    let div = document.createElement('div');
    let time = document.createElement('p');
    time.setAttribute('class','time');
    time.innerText = (date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00','');
    let temp  = document.createElement('p');
    temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273)+ ' °C' + '/' + Math.floor(forecast.list[i].main.temp_min - 273)+ ' °C';

    div.appendChild(time);
    div.appendChild(temp);

    let desc =  document.createElement('p');
    desc.setAttribute('class','desc');
    desc.innerText = forecast.list[i].weather[0].description;

    hourR.appendChild(div);
    hourR.appendChild(desc);
    document.querySelector('.templist').appendChild(hourR)
  }

}
function dayForecast(forecast){
  document.querySelector('.weekF').innerHTML = '';
  for(let i=8;i<forecast.list.length;i+=8){
    console.log(forecast.list[i]);
    let div = document.createElement('div');
    div.setAttribute('class','dayF');
    
    let day  =  document.createElement('p');
    day.setAttribute('class','date');
    day.innerText = new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Kolkata');
    div.appendChild(day);

    let temp  =  document.createElement('p');
    temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273)+ ' °C' + '/' + Math.floor(forecast.list[i].main.temp_min - 273)+ ' °C';
    div.appendChild(temp);

    let desc  =  document.createElement('p');
    desc.setAttribute('class','desc');
    desc.innerText = forecast.list[i].weather[0].description;
    div.appendChild(desc);

    document.querySelector('.weekF').appendChild(div)

  }
}
