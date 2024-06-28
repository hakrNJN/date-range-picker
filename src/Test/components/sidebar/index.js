import React from 'react';

const sidebar = () => {
  return (
    <Buttons/>
  )
}

const Buttons = ({ disableSelect, onToday, onSevenday, onClose }) => {
    return (
      <div className="buttons">
        <button className="today" onClick={onToday}>
          Today
        </button>
        <button className="today" onClick={onSevenday}>
          Last 7 Days
        </button>
        <button className="today" onClick={onSevenday}>
          Last 30 Days
        </button>
        <button className="today" onClick={onSevenday}>
          Last 3 Months
        </button>
        <button className="today" onClick={onSevenday}>
          Last 6 Months
        </button>
        <button className="today" onClick={onSevenday}>
          Last 1 Year
        </button>
        <button className="today" onClick={onSevenday}>
          This Month
        </button>
        <button className="today" onClick={onSevenday}>
          Year to Date 
        </button>
      </div>
    );
  };

export default sidebar
