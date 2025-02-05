import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";


const calendarcss = () => {
  return {
    backgroundColor: "#ffffff",
    borderRadius: "1rem", 
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
  };
};

const CalendarComponent = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="flex justify-center items-center p-4 rounded-lg ">
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
        <Calendar 
          onChange={onChange} 
          value={value} 
          className="bg-white p-4"
          calendarType="gregory"
          style={calendarcss()}  
          formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
          tileClassName={({ date, view }) => 'rounded-lg'}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
