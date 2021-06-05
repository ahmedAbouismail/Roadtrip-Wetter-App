import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Example = () => {
    const [startDate, setStartDate] = useState(null);
    return (
        <div>
        <label htmlFor="datePicker">Datum</label>
        <DatePicker
            id="datePicker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            maxDate={addDays(new Date(), 7)}
            placeholderText="Select a date between today and 7 days in the future"
        />
        </div>
    );
  };

export default Example