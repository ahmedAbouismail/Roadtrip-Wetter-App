import isEmpty from "lodash.isempty";
import DateField from "../DateForm/DateField";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { func } from "prop-types";
import "./DisplayWeather.css";

function DisplayWeather({ info }) {
  const [startDate, setStartDate] = useState([]);
  // const [startDate, setStartDate] = useState(null);

  // const imageUrl = (item) =>{  "http://openweathermap.org/img/wn/" +
  // `${item.cod != 404 ? item.weather[0].icon : null}` +
  // "/@2x.png";}

  function imageUrl(item) {
    return (
      "http://openweathermap.org/img/wn/" +
      `${item.cod != 404 ? item.weather[0].icon : null}` +
      "@2x.png"
    );
  }

  function handleClick(item) {
    if (
      item.weather[0].main === "Rain" ||
      item.weather[0].main === "Thunderstorm" ||
      item.weather[0].main === "Snow" ||
      item.weather[0].main === "Shower rain" ||
      item.weather[0].main === "Mist" ||
      item.weather[0].main === "Drizzle" ||
      item.weather[0].main === "Dust"
    ) {
      document.getElementById("Empfehlung").innerText =
        "Sie haben " +
        `${new Date(item.dt * 1000).toLocaleDateString()}` +
        "ausgewählt." +
        " Wir empfehlen Ihnen die folgeden Tagen: " +
        `${getBestDays()}`;
    } else {
      document.getElementById("Empfehlung").innerText =
        "Empfelung: Passt zu einer guten Reise";
    }
  }

  function getBestDays() {
    const goodDays = [];
    info.list.map((item) => {
      if (
        item.weather[0].main != "Rain" &&
        item.weather[0].main != "Thunderstorm" &&
        item.weather[0].main != "Snow" &&
        item.weather[0].main != "Shower rain" &&
        item.weather[0].main != "Mist" &&
        item.weather[0].main != "Drizzle" &&
        item.weather[0].main != "Dust"
      ) {
        goodDays.push(new Date(item.dt * 1000).toLocaleDateString());
      }
    });
    if (isEmpty(goodDays)) {
      return "Keine Empfehlung";
    }
    return goodDays;
  }
  return (
    <div>
      <div>
        <div id="Empfehlung" className="empf"></div>
        <div className="table_wrapper">
          <div className="table_box">
            {!isEmpty(info) &&
              info.list.map((item) => (
                <table className="t">
                  <tr className="tr">
                    <td className="td">
                      <p className="weather_text">
                        {parseInt(item.temp.day)}° | {item.weather[0].main}
                      </p>
                    </td>
                    <td className="td">
                      <img className="icon" src={imageUrl(item)} />
                    </td>
                    <td className="td">
                      <button className="btn" onClick={() => handleClick(item)}>
                        {new Date(item.dt * 1000).toLocaleDateString()}
                      </button>
                    </td>
                  </tr>
                </table>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayWeather;
