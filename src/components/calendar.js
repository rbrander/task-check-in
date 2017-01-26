import React from 'react';

const Calendar = ({month, year}) => {
  // make a date object for the first day of the given month/year
  const date = new Date(year, month - 1, 1);

  // get the day of the week for the first day of the month
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday ... 6 = Saturday

  // get the number of days in the month
  const numberOfDaysInMonth = new Date(year, month, 0).getDate();

  // calculate number of rows?
  const DAYS_IN_WEEK = 7;
  const numWeeks = Math.ceil((dayOfWeek + numberOfDaysInMonth) / DAYS_IN_WEEK);
  const weeks = [];

  // first add the initial buffer (if there is any)
  for (let week = 0; week < numWeeks; week++) {
    const row = [];
    for (let day = 0; day < DAYS_IN_WEEK; day++) {
      const isFirstWeek = (week === 0);
      const date = (week * 7) + day - dayOfWeek + 1;
      const isBlank = ((isFirstWeek && day < dayOfWeek) || (date > numberOfDaysInMonth));
      const value = '  ' + (isBlank ? ' ' : date.toString());
      row.push(value.substr(-2));
    }
    weeks.push(row);
  }

  // print the calendar in the console
  const monthName = date.toDateString().split(' ')[1];
  console.log('Calendar for ' + monthName +' ' + year);
  weeks.forEach(week => console.log(week.join(' ')));

  // Rendering
  // Calculate the percentage of the width each day will hold
  var pctWidth = (100 / DAYS_IN_WEEK);
  var weekHeight = (pctWidth / 2) + 'vw';
  return (
    <div className="flex items-center justify-center">
      <div>
        <div className="f3 tc">{monthName} {year}</div>
        <div className="flex flex-column bt br shadow-5" style={{width: '50vw'}}>
          { weeks.map((week, weekIdx) => {
              // On the last week, we need to know the index of the first empty day
              // for drawing borders
              const firstBlankDayIdx = week.reduce((firstIdx, day, dayIdx) =>
                (day === '  ') && dayIdx < firstIdx ? dayIdx : firstIdx, DAYS_IN_WEEK);
              return (
                <div key={weekIdx + ':'} style={ {height: weekHeight} } className="bb flex">
                  { week.map((day, dayIdx) => {
                      // blank days can appear in the first and last week
                      // when there is a blank day, there shouldn't be a border applied
                      const hasNoBorder = (
                        ((weekIdx === 0) && (day === '  ') && (dayIdx > 0)) ||
                        ((weekIdx === weeks.length - 1) && (dayIdx > firstBlankDayIdx))
                      );
                      const border = (hasNoBorder ? '' : ' bl');
                      const bgColour = (day === '  ' ? ' bg-light-gray' : ' bg-white');
                      return (
                        <div key={weekIdx + ':' + dayIdx} style={{width: `${pctWidth}%`}} 
                             className={'flex items-center justify-center' + bgColour + border}>
                          { day }
                        </div>
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  month: React.PropTypes.number.isRequired, // value is between 1 and 12
  year: React.PropTypes.number.isRequired,
};

export default Calendar;