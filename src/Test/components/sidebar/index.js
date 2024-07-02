import { noHandler } from '../../utils';
import './index.scss';
const sidebar = ({
  onToday = noHandler(),
  on3Day = noHandler(),
  onSevenday = noHandler(),
  OnMonth = noHandler(),
  on3Month = noHandler(),
  on6Month = noHandler(),
  on1Year = noHandler(),
  onThisMonth = noHandler(),
  onYTD = noHandler(),
  onClose = noHandler(),
  provider,

}) => {

  const handleClick = ()=>{}

  return (
    <SidePanel onToday={onToday} on3Day={on3Day} onSevenday={onSevenday} OnMonth={OnMonth} on3Month={on3Month}
    on6Month={on6Month} on1Year={on1Year} onThisMonth={onThisMonth} onYTD={onYTD} onClose={onClose} provider={provider}  />
  )
}

const SidePanel = ({ onToday, on3Day, onSevenday, OnMonth, on3Month, on6Month, on1Year, onThisMonth, onYTD, onClose, provider }) => {
  const { startDate, endDate } = provider;
  let fDate = '', lDate = ''
  if (startDate && startDate.customObject) {
    const {
      date,
      monthNameShort,
      year,
    } = startDate.customObject;
    fDate += `${date} ${monthNameShort} ${year}`;
  }
  if (endDate && endDate.customObject) {
    const {
      date,
      monthNameShort,
      year,
    } = endDate.customObject;
    lDate += `${date} ${monthNameShort} ${year}`;
  }
  return (
    <div className='sidebar'>
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
      <Buttons
        disableSelect={!fDate && !lDate}
        onClose={e => onClose(startDate._date, endDate ? endDate._date:null)}
      />
    </div>
  );
};


const Buttons = ({ disableSelect, onClose }) => {
  return (
    <button disabled={disableSelect} className="selectBtn" onClick={onClose}>
      {' '}
      Select{' '}
    </button>
  );
};
export default sidebar