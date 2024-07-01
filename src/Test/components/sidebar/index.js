import { noHandler } from '../../utils';
import './index.scss';
const sidebar = ({ onToday = noHandler(), on3Day = noHandler(),
  onSevenday = noHandler(), OnMonth = noHandler(), on3Month = noHandler(),
  on6Month = noHandler(), on1Year= noHandler(), onThisMonth= noHandler(), onYTD= noHandler() }) => {
  return (
    <Buttons onToday={onToday} on3Day={on3Day} onSevenday={onSevenday} OnMonth={OnMonth} on3Month={on3Month}
    on6Month={on6Month} on1Year={on1Year} onThisMonth={onThisMonth} onYTD={onYTD}/>
  )
}

const Buttons = ({ onToday, on3Day, onSevenday, OnMonth, on3Month, on6Month, on1Year, onThisMonth, onYTD }) => {
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
        <button className="day" onClick={on6Month}>
          Last 6 Months
        </button>
        <button className="day" onClick={on1Year}>
          Last 1 Year
        </button>
        <button className="day" onClick={onThisMonth}>
          This Month
        </button>
        <button className="day" onClick={onYTD}>
          Year to Date 
        </button>
      </div>
    );
  };

export default sidebar