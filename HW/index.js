//Feature 1
function formatDate(now) {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = week[now.getDay()];
  let date = now.getDate();
  let mth = month[now.getMonth()];
  let year = now.getFullYear();
  let time = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  let currDay = document.querySelector("#day");
  //console.log(currDay);
  let currDate = document.querySelector("#date");
  //console.log(currDate);
  let currTime = document.querySelector("#time");
  //console.log(currTime);
  currDay.innerHTML = day;
  currDate.innerHTML = `${date} ${mth} ${year}`;
  currTime.innerHTML = time;
}

function showCelcius(response) {
  let temperature = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#currTemp");
  newTemp.innerHTML = `${temperature}°C`;
  let city = response.data.name;
  let searchLocation = document.querySelector("#location");
  searchLocation.innerHTML = city;
}

function showFahrenheit(response) {
  let temperature = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#currTemp");
  newTemp.innerHTML = `${temperature}°F`;
}

function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#place");
  let city = inputCity.value;
  let searchLocation = document.querySelector("#location");
  searchLocation.innerHTML = city;
  let apiKey = "48571143cbf4c6549c7ce57d24d91240";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCelcius);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#place");
  let city = inputCity.value;
  let searchLocation = document.querySelector("#location");
  searchLocation.innerHTML = city;
  let apiKey = "48571143cbf4c6549c7ce57d24d91240";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showFahrenheit);
}

function retrievePosition(position) {
  let apiKey = "48571143cbf4c6549c7ce57d24d91240";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCelcius);
}

function retrievePosition1() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let curButton = document.querySelector(".btn-info");
curButton.addEventListener("click", retrievePosition1);

let now = new Date();
formatDate(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
form.addEventListener("click", search);

let celcius = document.querySelector("#cel");
let fahrenheit = document.querySelector("#fah");
celcius.addEventListener("click", search); //Already in Celcius by default
fahrenheit.addEventListener("click", convertFahrenheit);
