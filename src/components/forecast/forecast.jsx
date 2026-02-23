import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Forecast = ({ data }) => {
  if (!data || !data.list) return null;

  const todayIndex = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(todayIndex).concat(
    WEEK_DAYS.slice(0, todayIndex)
  );

  return (
    <>
      <label className="title">7-Day Forecast</label>

      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={`${item.dt}-${idx}`}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    className="icon-small"
                    alt="weather"
                  />

                  <label className="day">{forecastDays[idx]}</label>

                  <label className="description">
                    {item.weather[0].description}
                  </label>

                  <label className="min-max">
                    {Math.round(item.main.temp_max)}°C /
                    {Math.round(item.main.temp_min)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>

            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div><strong>Pressure:</strong> {item.main.pressure} hPa</div>
                <div><strong>Humidity:</strong> {item.main.humidity}%</div>
                <div><strong>Clouds:</strong> {item.clouds.all}%</div>
                <div><strong>Wind:</strong> {item.wind.speed} m/s</div>
                <div><strong>Feels like:</strong> {Math.round(item.main.feels_like)}°C</div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;