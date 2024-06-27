// import React from 'react';
// import { noHandler } from '../../utils';

// import './index.scss';

// class YearPicker extends React.Component {
//   years_to_display = 12;
//   state = {
//     year: null,
//     years: []
//   };

//   componentDidMount() {
//     const { year } = this.props;
//     this.setYearData(year, year);
//   }
//   componentWillReceiveProps({ year }) {
//     this.setYearData(year, year);
//   }

//   setYearData = (selectedYear, startYear) => {
//     this.setState({
//       year: selectedYear,
//       years: this.getYearsToRender(startYear),
//       sartYear: startYear,
//       endYear: startYear + this.years_to_display - 1
//     });
//   };

//   getYearsToRender = year => {
//     let counter = year,
//       limit = year + this.years_to_display,
//       years = [];
//     while (counter < limit) {
//       years.push(counter++);
//     }
//     return years;
//   };

//   onYearChange = incrementBy => {
//     const { year, years } = this.state;
//     this.setYearData(year, years[0] + this.years_to_display * incrementBy);
//   };

//   render() {
//     const { year, years, sartYear, endYear } = this.state;
//     const { visible } = this.props;
//     const { onChange = noHandler('no handler for year picker') } = this.props;
//     return (
//       <div className={`year-picker${visible ? ' visible' : ' hidden'}`}>
//         <div className="navigator">
//           <button className="arrow prev" onClick={e => this.onYearChange(-1)} />
//           <div className="values">
//             {' '}
//             {sartYear} - {endYear}
//           </div>
//           <button className="arrow next" onClick={e => this.onYearChange(1)} />
//         </div>
//         <div className="year-grid">
//           {years.map((yearItem, index) => {
//             return (
//               <div
//                 key={index}
//                 className={`year-container${
//                   year === yearItem ? ' selected' : ''
//                 }`}
//                 onClick={() => onChange(yearItem)}
//               >
//                 {' '}
//                 <div className="year">{yearItem}</div>{' '}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }

// export default YearPicker;


import React, { useEffect, useState } from 'react';
import { noHandler } from '../../utils';
import './index.scss';

const YearPicker = ({ year: initialYear, visible, onChange = noHandler('no handler for year picker') }) => {
  const yearsToDisplay = 12;
  const [year, setYear] = useState(null);
  const [years, setYears] = useState([]);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);

  useEffect(() => {
    setYear(initialYear);
    setYearData(initialYear);
  }, [initialYear]);

  const setYearData = (selectedYear) => {
    const yearsToRender = getYearsToRender(selectedYear);
    setStartYear(selectedYear);
    setEndYear(selectedYear + yearsToDisplay - 1);
    setYears(yearsToRender);
  };

  const getYearsToRender = (year) => {
    let counter = year;
    const limit = year + yearsToDisplay;
    const years = [];
    while (counter < limit) {
      years.push(counter++);
    }
    return years;
  };

  const onYearChange = (incrementBy) => {
    setYearData(startYear + yearsToDisplay * incrementBy);
  };

  return (
    <div className={`year-picker${visible ? ' visible' : ' hidden'}`}>
      <div className="navigator">
        <button className="arrow prev" onClick={() => onYearChange(-1)} />
        <div className="values">
          {startYear} - {endYear}
        </div>
        <button className="arrow next" onClick={() => onYearChange(1)} />
      </div>
      <div className="year-grid">
        {years.map((yearItem, index) => (
          <div
            key={index}
            className={`year-container${year === yearItem ? ' selected' : ''}`}
            onClick={() => onChange(yearItem)}
          >
            <div className="year">{yearItem}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearPicker;