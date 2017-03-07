import React from 'react';
import CalendarDay from './calendar-day';
import { DAYS_IN_WEEK } from '../constants';
import './calendar.css';

const Calendar = ({ month, year, completions, onDayClick }) => {
  // make a date object for the first day of the given month/year
  const date = new Date(year, month - 1, 1);
  const monthName = date.toDateString().split(' ')[1];

  // get the day of the week for the first day of the month
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday ... 6 = Saturday

  // get the number of days in the month
  const numberOfDaysInMonth = new Date(year, month, 0).getDate();

  // filter out any completions that are not in this month
  const completionsInMonth = completions.filter(completedDate => (
    (completedDate.getFullYear() === year) &&
    (completedDate.getMonth() === (month - 1))
  ));

  // calculate number of rows?
  const numWeeks = Math.ceil((dayOfWeek + numberOfDaysInMonth) / DAYS_IN_WEEK);
  const weeks = [];

  // first add the initial buffer (if there is any)
  for (let week = 0; week < numWeeks; week++) {
    const row = [];
    for (let day = 0; day < DAYS_IN_WEEK; day++) {
      const date = (week * 7) + day - dayOfWeek + 1;
      const isBlank = (date < 1) || (date > numberOfDaysInMonth)
      const hasCompleted = completionsInMonth
        .some(completedDate => completedDate.getDate() === date);
      const isCompleted = !isBlank && hasCompleted;
      row.push({
        isBlank,
        isCompleted,
        date: new Date(year, month - 1, date),
      });
    }
    weeks.push(row);
  }

  // Rendering
  // Calculate the percentage of the width each day will hold
  const pctWidth = (100 / DAYS_IN_WEEK);
  const weekHeight = (pctWidth / 2) + 'vw';
  return (
    <div className="flex items-center justify-center">
      <div>
        <div className="f3 tc">{monthName} {year}</div>
        <div className="flex flex-column bt br shadow-5" style={{width: '50vw'}}>
          { weeks.map((week, weekIdx) => {
              return (
                <div
                  key={ weekIdx + ':' }
                  style={{ height: weekHeight }}
                  className="bb flex"
                >
                  { week.map((day, dayIdx) => {
                      // Border left is needed on:
                      // - all non-blank cells
                      // - first cell of the calendar (if blank)
                      // - last day + 1
                      const isFirstCell = (weekIdx === 0) && (dayIdx === 0);
                      const isDayAfterLast = (day.isBlank && dayIdx > 0 && !week[dayIdx - 1].isBlank);
                      const border = (isFirstCell || isDayAfterLast || !day.isBlank) ? 'bl' : '';
                      const background = (day.isBlank ? 'bg-light-gray' : 'bg-white');
                      return (
                        <div
                          key={weekIdx + ':' + dayIdx}
                          style={{width: `${pctWidth}%`}}
                          className={ border + ' ' + background }
                        >{  day.isBlank ? null : (
                              <CalendarDay
                                date={ day.date }
                                isCompleted={ day.isCompleted }
                                onClick={ (e) => { onDayClick(e, day.date); } }
                              />
                            )
                          }
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
  completions: React.PropTypes.array,
  onDayClick: React.PropTypes.func,
};

export default Calendar;