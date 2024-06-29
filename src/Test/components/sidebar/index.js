import './index.scss';
const sidebar = () => {
  return (
    <Buttons/>
  )
}

const Buttons = ({ onToday, onSevenday, onClose }) => {
    return (
      <div className="sideButtons">
        <button className="day" onClick={onToday}>
          Today
        </button>
        <button className="day" onClick={onSevenday}>
          Last 3 Days
        </button>
        <button className="day" onClick={onSevenday}>
          Last 7 Days
        </button>
        <button className="day" onClick={onSevenday}>
          Last 30 Days
        </button>
        <button className="day" onClick={onSevenday}>
          Last 3 Months
        </button>
        <button className="day" onClick={onSevenday}>
          Last 6 Months
        </button>
        <button className="day" onClick={onSevenday}>
          Last 1 Year
        </button>
        <button className="day" onClick={onSevenday}>
          This Month
        </button>
        <button className="day" onClick={onSevenday}>
          Year to Date 
        </button>
      </div>
    );
  };

export default sidebar