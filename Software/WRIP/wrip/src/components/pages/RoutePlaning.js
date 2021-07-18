import { React, useState, createRef, useEffect } from "react";
import "../../App.css";
import Autocomplete from "../google-autocomplete/AutoCompelete";
import DateField from "../DateForm/DateField";
import OrteDisplay from "../ort-display/ort-display";
import isEmpty from "lodash.isempty";
import Weather from "../weather/weather";
import DisplayWeather from "../DisplayWeather/DisplayWeather";
import { Button } from "./../Frontend/Button";
import { createFileName, useScreenshot } from 'use-react-screenshot'
import html2canvas from 'html2canvas';
import AutoComplete from "../google-autocomplete-comp/Autocomplete";



function RoutePlaning() {
  const ref = createRef(null);

  const [inputField, setInputField]  = useState(
    {mapApiLoaded: null,
      mapInstance: null,
      mapApi: null}
  );
  const [orte, setOrte] = useState([]);
  const [weather, setWeather] = useState([]);
  const [date, setDate] = useState([]);
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });
  const [ready, setReady] = useState(false);
  const APIKEY = "29f32e030521b02c5cb257c4aa3c1d5e";

  // var date = null

  const handleOrt = (id, n, la, ln) => {
    console.log("params", n, la, ln);
    setOrte([...orte, [id, n, la, ln]]);
    console.log("Ort", orte);
  };

  
  const handleDelete = (id) => {
    const values = [...orte];
    
    const element = orte.filter((ort)=> ort[0] === id);
    const index = orte.indexOf(element[0]);
    values.splice(index, 1);
    setOrte(values);
    console.log("element", element[0]);
    console.log("Index", index);
    console.log("Ort ID", id);
    

    const weatherValues = [...weather];
    const weatherElement = weather.filter((info)=> info.id === id);
    const WeatherIndex = weather.indexOf(weatherElement[0]);
    weatherValues.splice(WeatherIndex, 1);
    setWeather(weatherValues);
    console.log("weatherElement", weatherElement[0]);
    console.log("WeatherIndex", WeatherIndex);
    console.log("Ort ID", id);
  };

  async function weatherData(place_id, la, ln) {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${la}&lon=${ln}&units=metric&cnt=16&appid=${APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => data);

    setWeather([...weather, { id: place_id ,data: data }]);
  }

  const handleInput = (mapApiLoaded, mapInstance, mapApi)=>{
    setInputField({
      mapApiLoaded: mapApiLoaded,
      mapInstance: mapInstance,
      mapApi: mapApi,
    })
  }

  const addPlace = (place) => {
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    handleOrt(place.place_id, place.name, lat, lng);
    if (lat != null && lng != null) {
      weatherData(place.place_id ,lat, lng);
    }
  };

  return (
    <>
      
      <div>
       
        {console.log("Ready in body", ready)}
        <Autocomplete
            handleInput = {handleInput}
            // handleOrt={handleOrt}
            // weatherData={weatherData}
            orte={orte}
          />
        
        {inputField.mapApiLoaded && 
        <AutoComplete
            map={inputField.mapInstance}
            mapApi={inputField.mapApi}
            addplace={addPlace}
        />}
                
        {console.log("After comp", orte)}
        {console.log("After data", weather)}

        {!isEmpty(orte) &&
          orte.map((ort) => (
            <div>
              <div>
                <Button
                  className="btns"
                  buttonStyle="btn--primary"
                  buttonSize="btn--large"
                  // id={orte.indexOf(ort)}
                  id = {ort[0]}
                  onClick={()=> handleDelete(ort[0])}
                >
                  Delete: <p 
                  // key={orte.indexOf(ort)}
                  key={ort[0]}
                  >{ort[1]}</p>
                </Button>
              </div>
              {
                !isEmpty(weather) &&
                weather.map(
                  (info) => (
                    console.log("Weather", weather),
                    console.log("Info", info),
                    (
                      <div>
                        {info.id === ort[0] && <DisplayWeather info={info.data} />}
                      </div>
                    )
                  )
                )
              }
              {/* {!isEmpty(weather) &&
                weather.map(
                  (info) => (
                    console.log("Weather", weather),
                    console.log("Info", info),
                    (
                      <div>
                        <DisplayWeather info={info.data} />
                      </div>
                    )
                  )
                )} */}
            </div>
          ))}
      
      </div>
      
      </>
  );
}

export default RoutePlaning;
