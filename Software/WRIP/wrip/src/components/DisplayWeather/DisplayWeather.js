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
      {!isEmpty(info) &&
        info.list.map((item) => (
          <div class="cards">
            <div className="cards__container">
              <div className="cards__wrapper">
                <ul className="cards__items">
                  <li className="cards__item">
                    <div className="cards__item__link">
                      <figure className="cards__item__pic-wrap">
                        <img
                          className="cards__item__img"
                          src={imageUrl(item)}
                        />
                      </figure>
                      <div lassName="cards__item__info">
                        <h5 className="cards__item__text"></h5>
                        <p className="cards__item__text">
                          {parseInt(item.temp.day)}° | {item.weather[0].main}
                        </p>
                        <button onClick={() => handleClick(item)}>
                          Date: {new Date(item.dt * 1000).toLocaleDateString()}
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      <div id="Empfehlung"></div>
    </div>
  );
}

export default DisplayWeather;
