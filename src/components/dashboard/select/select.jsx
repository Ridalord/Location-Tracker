import { React, useState } from 'react'
import classes from "./select.module.css"


export default function Select() {
  const [selectedValue, setSelectedValue] = useState('today');

  // Handler function to update the selected value
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <select
      id="selectDate"
      value={selectedValue}
      onChange={handleSelectChange}
      className={classes.select}
    >
      <option value="today">Today</option>
      <option value="yesterday">Yesterday</option>
      <option value="this_week">This Week</option>
      <option value="month">Last 30 days</option>
      <option value="two_month">Last 60 days</option>
      <option value="three_month">Last 90 days</option>
      <option value="six_month">Last 180 days</option>
      <option value="year">Last 365 days</option>
    </select>

  )
}