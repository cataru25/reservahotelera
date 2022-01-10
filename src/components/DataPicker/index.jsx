import React, { useEffect, useState } from "react";
import "./datepicker.scss";

const DatePicker = ({ name, onChange, reset, selected }) => {

  const handleOption = (e) => {
    const value = e.target.value;
    onChange(name, value);
  };

  return (
    <div className="filter__container">
      <img className="calendar-icon"
        src="https://img.icons8.com/material-outlined/24/000000/calendar--v1.png"
        alt="calendar-icon" />
      <input className="filter__input input"
        onChange={handleOption}
        value={selected}
        type="date" />
    </div>
  );
};

export default DatePicker;
