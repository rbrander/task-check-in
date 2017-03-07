import React from 'react';

const CalendarDay = ({ date, isCompleted, onClick }) => {
  const baseCSS = 'flex items-top justify-left pa1';
  const today = new Date();
  const isToday = today.toDateString() === date.toDateString();
  const bgColour = (isToday ? 'bg-light-yellow' :'bg-white');
  const completed = (isCompleted ? 'completed' : '');
  const pointer = (onClick ? 'pointer' : '');
  return (
    <div
      className={ `day ${ baseCSS } ${ bgColour } ${ completed } ${ pointer }` }
      onClick={ (e) => {
        if (onClick) {
          onClick(e, date);
        }
      } }
    >
      { date.getDate() }
    </div>
  );
}

CalendarDay.propTypes = {
  date: React.PropTypes.instanceOf(Date).isRequired,
  isCompleted: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func,
}

export default CalendarDay;