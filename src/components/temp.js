// https://api.openweathermap.org/data/2.5/weather?q=Jamshedpur&appid=51f038e3177b0ecf30056c422ab9e8fb

import React, { useEffect, useState } from 'react'
import "./style.css"
import WeatherCard from './weatherCard';
const Temp = () => {

const [searchValue,setSearchValue] =useState("jamshedpur");
const [tempInfo,setTempInfo] = useState({});
const getWeatherInfo = async() => {
    try
    {
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=51f038e3177b0ecf30056c422ab9e8fb`;

        const res = await fetch(url);
        const data =await res.json();
        // console.log(data);

        const {temp,humidity,pressure} = data.main;
        const {main : weathermood}=data.weather[0];
        const {name}=data;
        const {speed}=data.wind;
        const {country,sunset}=data.sys;
    //    console.log(temp); 
        const myNewWeather = {
            temp,
            humidity,
            pressure,
            weathermood,
            name,
            speed,
            country,
            sunset,
        };
        setTempInfo(myNewWeather);
    }
    catch(error)
    {
        console.log(error);
    }
};

useEffect(() => {
    getWeatherInfo();
})
  return (
    <>
      <div className='wrap'>
        <div className='search'>
            <input type='search' 
            placeholder='Search...'
            autoFocus 
            id="search" 
            className='searchTerm' 
            value={ searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            />
            <button className='searchButton' type="button" onClick={getWeatherInfo}>
                Search
            </button>
        </div>
      </div>
      <WeatherCard tempInfo={tempInfo}/>
    </>
  )
}

export default Temp
