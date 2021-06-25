import {React, useState} from 'react';
import '../../App.css';
import Planing from '../Frontend/Planing';
import Autocomplete from '../google-autocomplete/AutoCompelete'
import DateField from '../DateForm/DateField'
import OrteDisplay from '../ort-display/ort-display';
import isEmpty from 'lodash.isempty';
import Weather from '../weather/weather'
import DisplayWeather from '../DisplayWeather/DisplayWeather';

// const init = [{
//   data: null
// }];
function RoutePlaning() {
  const [orte, setOrte] = useState([]);
  const [weather, setWeather] = useState([]);
  const [date, setDate] = useState([]);
  const APIKEY = "29f32e030521b02c5cb257c4aa3c1d5e";

  // var date = null

  const handleOrt = (id ,n, la, ln)=>{
    console.log("params", n,la, ln);
      setOrte([...orte, [id, n, la, ln]])
      console.log("Ort", orte);
  };

  // const handleMarker =(marker)=>{
  //   setMarkers([...markers, markers])
  // }
  const handleDelete =({target: {id}})=>{
    const values = [...orte];
    values.splice(id, 1);
    setOrte(values);

    const weatherValues = [...weather];
    weatherValues.splice(id, 1);
    setWeather(weatherValues);
  }

  async function weatherData(la, ln) {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${la}&lon=${ln}&units=metric&cnt=16&appid=${APIKEY}`
    )
    .then((res) => res.json())
    .then((data) => data)
  
    setWeather([...weather, { data: data }]);
  }

  function handleClick(e){
    console.log("id", e.target.id);
    console.log("key", e.target.key);

  }

  function handleDate(dateValue)
  {
      setDate([...date, {dateValue}])
      console.log("Dates" ,date);
  }
  return (
    <>
      {/* <Planing /> */}
        <Autocomplete handleOrt={handleOrt} weatherData={weatherData} orte={orte}/>
        {console.log("After comp", orte)}
        {console.log("After data", weather)}
        {!isEmpty(orte) 
          && orte.map((ort)=>(
            <div style={{marginTop:'1000px'}}>
            <p 
            key={orte.indexOf(ort)}
            >{ort[1]}</p>

            
            <button
            id={orte.indexOf(ort)}
            onClick={handleDelete}
            >
              Delete
            </button>
            </div>
          ))
        }

      { !isEmpty(weather)&&
        weather.map((info)=>(
          console.log("Info", info),
          <div>
            <DisplayWeather info = {info.data}/>
          </div>
        ))
      }
      
    </>
  );
}

export default RoutePlaning;
