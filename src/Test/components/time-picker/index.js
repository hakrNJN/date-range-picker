
// import React from 'react';
// import './index.scss';
// import Picker from './picker';

// const getMinutes = () => {
//   let i = 0,
//     limit = 60,
//     minutes = [];
//   for (i; i < limit; i += 1) {
//     minutes.push(i < 10 ? '0' + i : '' + i);
//   }
//   return minutes;
// };

// const hours = [
//   '12',
//   '01',
//   '02',
//   '03',
//   '04',
//   '05',
//   '06',
//   '07',
//   '08',
//   '09',
//   '10',
//   '11'
// ];
// const minutes = getMinutes();
// const period = ['AM', 'PM'];

// class TimePicker extends React.Component {
//   visible = false;
//   temp_state = {
//     hours: '12',
//     minutes: '00',
//     period: 'AM'
//   };

//   onChange = (type, val) => {
//     const { onChange } = this.props;
//     this.temp_state[type] = val;
//     if (onChange) {
//       let { hours, minutes, period } = this.temp_state;
//       onChange(hours, minutes, period);
//     }
//   };

//   onDone = () => {
//     const { onDone } = this.props;
//     if (onDone) {
//       let { hours, minutes, period } = this.temp_state;
//       onDone(hours, minutes, period);
//     }
//   };

//   render() {
//     const { visible } = this.props;
//     if (!!visible && visible !== this.visible) {
//       this.temp_state = {
//         hours: '12',
//         minutes: '00',
//         period: 'AM'
//       };
//     }
//     this.visible = visible;
//     return (
//       <div
//         className={`time-picker-container${!!visible ? ' visible' : ' hidden'}`}
//         onClick={this.onDone}
//       >
//         <div className="time-picker" onClick={e => e.stopPropagation()}>
//           <div key={visible}>
//             <Picker onChange={this.onChange} values={hours} label="hours" />
//             <Picker onChange={this.onChange} values={minutes} label="minutes" />
//             <Picker onChange={this.onChange} values={period} label="period" />
//             <div className="done">
//               <button onClick={this.onDone}> Done </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default TimePicker;

import React, { useEffect, useState } from 'react';
import './index.scss';
import Picker from './picker';

const getMinutes = () => {
  let i = 0,
    limit = 60,
    minutes = [];
  for (i; i < limit; i += 1) {
    minutes.push(i < 10 ? '0' + i : '' + i);
  }
  return minutes;
};

const hours = [
  '12',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11'
];
const minutes = getMinutes();
const period = ['AM', 'PM'];

const TimePicker = ({ visible, onChange, onDone }) => {
  const [tempState, setTempState] = useState({
    hours: '12',
    minutes: '00',
    period: 'AM'
  });

  const [prevVisible, setPrevVisible] = useState(false);

  useEffect(() => {
    if (!!visible && visible !== prevVisible) {
      setTempState({
        hours: '12',
        minutes: '00',
        period: 'AM'
      });
    }
    setPrevVisible(visible);
  }, [visible, prevVisible]);

  const handleChange = (type, val) => {
    setTempState(prevState => ({
      ...prevState,
      [type]: val
    }));

    if (onChange) {
      onChange(tempState.hours, tempState.minutes, tempState.period);
    }
  };

  const handleDone = () => {
    if (onDone) {
      onDone(tempState.hours, tempState.minutes, tempState.period);
    }
  };

  return (
    <div
      className={`time-picker-container${!!visible ? ' visible' : ' hidden'}`}
      onClick={handleDone}
    >
      <div className="time-picker" onClick={e => e.stopPropagation()}>
        <div key={visible}>
          <Picker onChange={handleChange} values={hours} label="hours" />
          <Picker onChange={handleChange} values={minutes} label="minutes" />
          <Picker onChange={handleChange} values={period} label="period" />
          <div className="done">
            <button onClick={handleDone}> Done </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;