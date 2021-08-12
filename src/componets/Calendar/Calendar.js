import React from 'react';
import ReactCalendar from 'react-calendar';

import './calendar.global.css';

const Calendar = ({ start, end, selectRange, onCalendar }) => {
    const handleChange = (nextVal) => {
        onCalendar(nextVal);
    };

    return (
        <ReactCalendar
            value={[start, end]}
            onChange={handleChange}
            locale="en"
            calendarType="US"
            selectRange={selectRange}
            allowPartialRange
        />
    );
};

Calendar.defaultProps = {
    start: new Date(),
    end: new Date(),
    selectRange: true,
    onCalendar: (v) => v,
};

export default Calendar;
