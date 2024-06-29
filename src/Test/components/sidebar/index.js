import './index.scss';
const sidebar = () => {
  return (
    <Buttons/>
  )
}

const Buttons = ({ onToday, on3Day, onSevenday, OnMonth, on3Month, on6MOnth, on1Year, onThisMOnth, onYTD }) => {
    return (
      <div className="sideButtons">
        <button className="day" onClick={onToday}>
          Today
        </button>
        <button className="day" onClick={on3Day}>
          Last 3 Days
        </button>
        <button className="day" onClick={onSevenday}>
          Last 7 Days
        </button>
        <button className="day" onClick={OnMonth}>
          Last 30 Days
        </button>
        <button className="day" onClick={on3Month}>
          Last 3 Months
        </button>
        <button className="day" onClick={on6MOnth}>
          Last 6 Months
        </button>
        <button className="day" onClick={on1Year}>
          Last 1 Year
        </button>
        <button className="day" onClick={onThisMOnth}>
          This Month
        </button>
        <button className="day" onClick={onYTD}>
          Year to Date 
        </button>
      </div>
    );
  };

export default sidebar