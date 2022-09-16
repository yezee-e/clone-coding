const API_KEY = 'abcf19118a589b2cbbbf87bf809fa89d';
const weather = document.querySelector('#weather span:first-child');
const city = document.querySelector('#weather span:last-child');

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = data.weather[0].main;
    });
}
function onGeoError() {
  alert("can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// latitude
// :
// 37.5259704
// longitude
// :
// 126.8842335

// JSON은 경량의 DATA교환 형식
