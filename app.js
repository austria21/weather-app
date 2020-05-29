const cityForm = document.querySelector('form');

const card = document.querySelector('.card');
const details = document.querySelector('.details');

const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
    // const cityDets = data.cityDets;
    // const weather = data.weather; or destructuring

    const { cityDets, weather} = data;
 

    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    //update day or night images && icon images
    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.png';
    // }
    // else{
    //     timeSrc = 'img/night.svg';
    // } or ternary operator
    let timeSrc = weather.IsDayTime ? 'img/day.png' :  'img/night.svg';
    time.setAttribute("src", timeSrc);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);

    // if contains d-none class remove it
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

 const updateCity = async (city) => {
    // console.log(city);
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    // return{
    //     cityDets : cityDets,
    //     weather: weather 
    // }; or Object shorthand notation

    return { cityDets, weather};
 };
cityForm.addEventListener("submit", e =>{
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
