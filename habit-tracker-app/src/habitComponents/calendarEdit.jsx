import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../css/calendar.css";

// User will select days from the calendar to set the days of the month that they want to complete the habit on.
function CalendarEdit(props) {
  
  return(
    <div style={{ padding: "20px" }}>
      <h2>Multi-select calendar</h2>
      <div className="calendar-container">
      <DayPicker
      className="calendar"
      animate
        mode="multiple"
        captionLayout="dropdown"
        disabled={{ before: new Date() }}
        selected={props.daysInMonthSelected}
        onSelect={(e) => {props.setDaysInMonthSelected(e); 
          props.updateGoalField("daysInMonthSelected", e)}}
        
        startMonth={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
        endMonth={new Date(2035, 6)} />
      </div>
      {/* {daysInMonthSelected.length > 0 && (
        <p style={{ marginTop: "20px" }}>
          You selected: {daysInMonthSelected.map((date) => date.toISOString().split("T")[0]).join(", ")}
        </p>
      )} */}
    </div>
  )
}

export default CalendarEdit;