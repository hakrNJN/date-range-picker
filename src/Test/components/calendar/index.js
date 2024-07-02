
// import React, { useEffect, useState } from 'react';

// import {
//   dateToInt,
//   getActualDate,
//   getCustomDateObject,
//   getDaysBefore,
//   getFYFirstDate,
//   getMonthFirstDate,
//   getNewMonthFrom,
//   getTime,
//   noHandler
// } from '../../utils';

// import { monthsFull, monthsShort } from '../../const';

// import { Context } from '../context';
// import Footer from '../footer';
// import Grids from '../grids';
// import MonthPicker from '../month-picker';
// import Navigator from '../navigator';
// import SideBar from '../sidebar';
// import TimePicker from '../time-picker';
// import YearPicker from '../year-picker';
// import './index.scss';

// const ANIMATE_LEFT = 'move-left';
// const ANIMATE_RIGHT = 'move-right';
// const START_DATE_TIME = {
//   hours: '12',
//   minutes: '00',
//   period: 'AM'
// };
// const END_DATE_TIME = {
//   hours: '12',
//   minutes: '00',
//   period: 'AM'
// };
// const END_DATE_TIME_END_OF_DAY = {
//   hours: '11',
//   minutes: '59',
//   period: 'PM'
// };

// const getDefaultValues = (date) => {
//   if (!date) return null;
//   if (!(date instanceof Date)) {
//     console.warn('start and end must be a valid date object in defaultValue prop');
//     return null;
//   }
//   let customDate = getCustomDateObject(date);
//   let time = getTime(12, date);
//   return getActualDate(dateToInt(customDate), time);
// }

// const getIntDates = (provider) => {
//   return {
//     selectedDate1: provider.startDate ? provider.startDate._intDate : '',
//     selectedDate2: provider.endDate ? provider.endDate._intDate : ''
//   };
// }

// const getTimes = (provider, rangeTillEndOfDay) => {
//   const { startDate, endDate } = provider;
//   let date1Time = { ...START_DATE_TIME };
//   let date2Time = rangeTillEndOfDay
//     ? { ...END_DATE_TIME_END_OF_DAY }
//     : { ...END_DATE_TIME };
//   if (startDate && startDate.customObject) {
//     const { hours, minutes, period } = startDate.customObject;
//     date1Time = { hours, minutes, period };
//   }
//   if (endDate && endDate.customObject) {
//     const { hours, minutes, period } = endDate.customObject;
//     date2Time = { hours, minutes, period };
//   }
//   return {
//     date1Time,
//     date2Time
//   };
// }

// const Calendar = (props) => {
//   const actualDate = new Date();
//   const actualIntDate = dateToInt(getCustomDateObject(actualDate));
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [enableRange, setEnableRange] = useState(!props.disableRange);
//   const [state, setState] = useState({
//     date: new Date(actualDate),
//     animationClass: '',
//     showMonthPopup: false,
//     showYearPopup: false,
//     showTimePopup: false
//   });
//   // const prevIsVisibleRef = useRef(props.isVisible);
//   const { defaultValue, disableRange, provider, isVisible } = props;

//   useEffect(() => {
//     let startDate = getDefaultValues(defaultValue ? defaultValue.startDate : null);
//     let endDate = getDefaultValues(defaultValue ? defaultValue.endDate : null);
//     if (endDate && !startDate) {
//       console.warn(
//         'defaultValue prop must have a startDate if there is an endDate'
//       );
//       return;
//     }

//     if (startDate) {
//       provider.updateContext({
//         startDate,
//         endDate
//       });
//       setState({ ...state, date: startDate._date });
//     }
//   }, []);//props.defaultValue, props.provider, state

//   useEffect(() => {
//     setEnableRange(disableRange !== true);
//     if (!isVisible && isVisible !== undefined) {
//       setTimeout(() => {
//         setState({
//           ...state,
//           showMonthPopup: false,
//           showYearPopup: false,
//           showTimePopup: false
//         });
//       }, 300);
//     }
//   }, []);//disableRange, isVisible

//   const onMonthChange = (increment) => {
//     if (isAnimating) return;
//     setState((prevState) => ({
//       ...prevState,
//       animationClass: increment === 1 ? ANIMATE_RIGHT : ANIMATE_LEFT
//     }));
//     setIsAnimating(true);

//     setTimeout(() => {
//       setState((prevState) => {
//         const { date } = prevState;
//         date.setMonth(date.getMonth() + increment);
//         return {
//           ...prevState,
//           animationClass: '',
//           date
//         };
//       });
//       setIsAnimating(false);
//     }, 500);
//   };

//   const onMonthSelect = () => setState({ ...state, showMonthPopup: true });

//   const monthChanged = (month, monthIndex) => {
//     const { date } = state;
//     date.setMonth(monthIndex);
//     setState({ ...state, date, showMonthPopup: false });
//   };

//   const onYearSelect = () => setState({ ...state, showYearPopup: true });;

//   const yearChanged = (year) => {
//     const { date } = state;
//     date.setFullYear(year);
//     setState({ ...state, date, showYearPopup: false });
//   };

//   const onDateSelect = (date) => {
//     const {
//       onDateSelected = noHandler(),
//       selectTime,
//       provider,
//       rangeTillEndOfDay,
//       onClose,
//       closeOnSelect
//     } = props;

//     const { date1Time, date2Time } = getTimes(provider, rangeTillEndOfDay);
//     const { selectedDate1, selectedDate2 } = getIntDates(provider);

//     const newState = { selectedDate1, selectedDate2 };

//     if (!enableRange && !!date) {
//       setState({ ...state, showTimePopup: !!selectTime ? true : showTimePopup });
//       provider.updateContext({
//         startDate: getActualDate(date, date1Time)
//       });
//       onDateSelected(getActualDate(date, date1Time));
//       !selectTime && closeOnSelect && onClose();
//       return;
//     }


//     if (!selectedDate1) {
//       newState.selectedDate1 = date;
//       newState.selectedDate2 = null;
//     } else if (!!selectedDate1 && !selectedDate2) {
//       if (date < selectedDate1) {
//         newState.selectedDate1 = date;
//         newState.selectedDate2 = selectedDate1;
//       } else {
//         newState.selectedDate2 = date;
//       }
//     } else if (!!selectedDate1 && !!selectedDate2) {
//       newState.selectedDate1 = date;
//       newState.selectedDate2 = null;
//     }

//     const d1 = newState.selectedDate1, d2 = newState.selectedDate2;

//     newState.date2Time = d1 === d2 ? { ...END_DATE_TIME_END_OF_DAY } : date2Time;


//     setState({ ...state, newState });

//     const _startDate = getActualDate(d1, date1Time);
//     const _endDate = getActualDate(d2, date2Time);

//     provider.updateContext({
//       startDate: _startDate,
//       endDate: _endDate
//     });

//     onDateSelected(_startDate, _endDate);
//     if (!!selectTime) {
//       setState({ ...state, showTimePopup: true })
//     } else if (!selectTime && d2) {
//       closeOnSelect && onClose();
//     }
//   };


//   const selectToday = () => {
//     if (isAnimating) return;
//     const { date } = state;
//     const {
//       selectTime,
//       onDateSelected,
//       provider,
//       onClose,
//       closeOnSelect
//     } = props;
//     const savedDate = getCustomDateObject(date);
//     const currentDate = getCustomDateObject(new Date(actualDate));

//     if (date === actualIntDate) {
//       onDateSelect();
//     }

//     const goingBack =
//       currentDate.year < savedDate.year ||
//         (currentDate.year === savedDate.year &&
//           currentDate.month < savedDate.month)
//         ? true
//         : false;

//     if (goingBack) {
//       setState({
//         ...state,
//         animationClass: ANIMATE_LEFT
//       });
//     } else if (currentDate.month > savedDate.month) {
//       setState({
//         ...state,
//         animationClass: ANIMATE_RIGHT
//       });
//     }

//     const fDate = getActualDate(actualIntDate, { ...START_DATE_TIME });
//     const lDate = enableRange
//       ? getActualDate(actualIntDate, { ...END_DATE_TIME_END_OF_DAY })
//       : null;
//     provider.updateContext({
//       startDate: fDate,
//       endDate: lDate
//     });

//     if (onDateSelected) {
//       onDateSelected(fDate, lDate);
//       closeOnSelect && onClose();
//     }

//     setTimeout(() => {
//       setState((prevState) => ({
//         ...prevState,
//         animationClass: '',
//         date
//       }));
//         setIsAnimating(false);
//       if (!enableRange && !!selectTime) {
//         // this.showTime();
//       }
//     }, 500);
//   };

//   const selectDaysAgo = (value) => {
//     if (isAnimating) return;
//     const { date } = state;
//     const {
//       selectTime,
//       onDateSelected,
//       provider,
//       onClose,
//       closeOnSelect
//     } = props;

//     if (date === actualIntDate) {
//       onDateSelect();
//     }

//     const fDate = enableRange
//       ? getDaysBefore( value)
//       : null;
//     const lDate = getActualDate(actualIntDate, { ...END_DATE_TIME_END_OF_DAY });
//     provider.updateContext({
//       startDate: fDate,
//       endDate: lDate
//     });

//     if (onDateSelected) {
//       onDateSelected(fDate, lDate);
//       closeOnSelect && onClose();
//     }

//     setTimeout(() => {
//       setState((prevState) => ({
//         ...prevState,
//         animationClass: '',
//         date: new Date(actualDate)
//       }));
//       setIsAnimating(false);
//       if (!enableRange && !!selectTime) {
//         // this.showTime();
//       }
//   }, 500);
//   };
  
//   const selectYTD = () => {
//     if (isAnimating) return;
//     const { date } = state;
//     const {
//       selectTime,
//       onDateSelected,
//       provider,
//       onClose,
//       closeOnSelect
//     } = props;

//     if (date === actualIntDate) {
//       onDateSelect();
//     }
//     const fDate = enableRange
//       ? getFYFirstDate()
//       : null;
//     const lDate = getActualDate(actualIntDate, { ...END_DATE_TIME_END_OF_DAY });
//     provider.updateContext({
//       startDate: fDate,
//       endDate: lDate
//     });

//     if (onDateSelected) {
//       onDateSelected(fDate, lDate);
//       closeOnSelect && onClose();
//     }

//     setTimeout(() => {
//       setState((prevState) => ({
//         ...prevState,
//         animationClass: '',
//         date: new Date(actualDate)
//       }));
//       setIsAnimating(false);
//       if (!enableRange && !!selectTime) {
//         // this.showTime();
//       }
//   }, 500);
// }
//   const selectMTD = () => {
//     if (isAnimating) return;
//     const { date } = state;
//     const {
//       selectTime,
//       onDateSelected,
//       provider,
//       onClose,
//       closeOnSelect
//     } = props;

//     if (date === actualIntDate) {
//       onDateSelect();
//     }
//     const fDate = enableRange
//       ? getMonthFirstDate()
//       : null;
//     const lDate = getActualDate(actualIntDate, { ...END_DATE_TIME_END_OF_DAY });
//     provider.updateContext({
//       startDate: fDate,
//       endDate: lDate
//     });

//     if (onDateSelected) {
//       onDateSelected(fDate, lDate);
//       closeOnSelect && onClose();
//     }

//     setTimeout(() => {
//       setState((prevState) => ({
//         ...prevState,
//         animationClass: '',
//         date: new Date(actualDate)
//       }));
//       setIsAnimating(false);
//       if (!enableRange && !!selectTime) {
//         // this.showTime();
//       }
//   }, 500);
// }
  
// const showTime = () => {
//   setState({
//     ...state,
//     showTimePopup: true
//   });
// };

// const closeTime = () => setState({
//   ...state,
//   showTimePopup: false
// });;

// const onTimeSelected = (hours, minutes, period) => {
//   const {
//     onDateSelected,
//     rangeTillEndOfDay,
//     closeOnSelect,
//     onClose
//   } = props;
//   let { date1Time, date2Time } = getTimes(provider, rangeTillEndOfDay);
//   const { selectedDate1, selectedDate2 } = getIntDates(provider);

//   if (selectedDate2) {
//     date2Time = { hours, minutes, period };
//   } else {
//     date1Time = { hours, minutes, period };
//     date2Time = !!rangeTillEndOfDay
//       ? { ...END_DATE_TIME_END_OF_DAY }
//       : { ...END_DATE_TIME };
//   }
//   setState({
//     ...state,
//     showTimePopup: false
//   })
//   const _startDate = getActualDate(selectedDate1, date1Time);
//   const _endDate = !!selectedDate2
//     ? getActualDate(selectedDate2, date2Time)
//     : void 0;
//   provider.updateContext({
//     startDate: _startDate,
//     endDate: _endDate
//   });
//   onDateSelected(_startDate, _endDate);
//   if (closeOnSelect && enableRange && _endDate) {
//     onClose();
//   } else if (closeOnSelect && !enableRange) {
//     onClose();
//   }
// };

// const {
//   date,
//   animationClass,
//   showMonthPopup,
//   showYearPopup,
//   showTimePopup
// } = state;

// const { onClose = noHandler(), footer, selectTime } = props;
// const prevMonth = getNewMonthFrom(date, -1);
// const nextMonth = getNewMonthFrom(date, 1);
// const currentMonth = getNewMonthFrom(date, 0);
// const { month, year } = getCustomDateObject(date);

// return (
//   <div className="full-date-picker-container">
//   <div className="date-picker-content">
//     <div className="date-picker">
//       <MonthPicker
//         months={monthsShort}
//         selected={month}
//         visible={showMonthPopup}
//         onChange={monthChanged}
//       />
//       <YearPicker
//         year={year}
//         visible={showYearPopup}
//         onChange={yearChanged}
//       />
//       <TimePicker
//         visible={showTimePopup}
//         onDone={onTimeSelected}
//       />
//       <Navigator
//         month={monthsFull[month]}
//         year={year}
//         onMonthChange={onMonthChange}
//         onSelectMonth={onMonthSelect}
//         onSelectYear={onYearSelect}
//       />
//       <Grids
//         prevMonth={prevMonth}
//         currentMonth={currentMonth}
//         nextMonth={nextMonth}
//         animationClass={animationClass}
//         onDateSelect={onDateSelect}
//         rangeEnabled={enableRange}
//       />
//     </div>
//     <Footer
//       customFooter={footer}
//       onToday={selectToday}
//       onSevenday={() => selectDaysAgo(7)}
//       onClose={onClose}
//       showTime={!!selectTime}
//     />
//   </div>
//     <div className="sidebar"><SideBar
//       onToday={selectToday}
//       on3Day={() => selectDaysAgo(3)}
//       onSevenday={() => selectDaysAgo(7)}
//       OnMonth={() => selectDaysAgo(30)}
//       on3Month={() => selectDaysAgo(90)}
//       on6Month={() => selectDaysAgo(180)}
//       on1Year={() => selectDaysAgo(365)}
//       onThisMonth={selectMTD}
//       onYTD={selectYTD}
//       /> </div>
// </div>
// );
// };

// // eslint-disable-next-line import/no-anonymous-default-export
// export default function (props) {
//   return (
//     <Context.Consumer>
//       {provider => <Calendar {...props} provider={provider} />}
//     </Context.Consumer>
//   );

import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { monthsFull, monthsShort } from '../../const';
import {
  dateToInt,
  getActualDate,
  getCustomDateObject,
  getDaysBefore,
  getFYFirstDate,
  getMonthFirstDate,
  getNewMonthFrom,
  getTime,
  noHandler
} from '../../utils';
import { Context } from '../context';
import Footer from '../footer';
import Grids from '../grids';
import MonthPicker from '../month-picker';
import Navigator from '../navigator';
import SideBar from '../sidebar';
import TimePicker from '../time-picker';
import YearPicker from '../year-picker';
import './index.scss';

// Constants
const ANIMATE_LEFT = 'move-left';
const ANIMATE_RIGHT = 'move-right';
const START_DATE_TIME = { hours: '12', minutes: '00', period: 'AM' };
const END_DATE_TIME = { hours: '12', minutes: '00', period: 'AM' };
const END_DATE_TIME_END_OF_DAY = { hours: '11', minutes: '59', period: 'PM' };

// Initial State
const getInitialState = (actualDate) => ({
  date: new Date(actualDate),
  animationClass: '',
  showMonthPopup: false,
  showYearPopup: false,
  showTimePopup: false,
  isAnimating: false,
  enableRange: true,
});

// Actions
const SET_DATE = 'SET_DATE';
const SET_ANIMATION = 'SET_ANIMATION';
const TOGGLE_POPUP = 'TOGGLE_POPUP';
const SET_IS_ANIMATING = 'SET_IS_ANIMATING';
const SET_ENABLE_RANGE = 'SET_ENABLE_RANGE';

// Reducer
const calendarReducer = (state, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, date: action.date };
    case SET_ANIMATION:
      return { ...state, animationClass: action.animationClass };
    case TOGGLE_POPUP:
      return { ...state, [action.popup]: action.value };
    case SET_IS_ANIMATING:
      return { ...state, isAnimating: action.isAnimating };
    case SET_ENABLE_RANGE:
      return { ...state, enableRange: action.enableRange };
    default:
      return state;
  }
};

// Helper functions
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const updateProviderContext = debounce((provider, startDate, endDate) => {
  // console.log(startDate,endDate)
  provider.updateContext({ startDate, endDate });
}, 300);


const getDefaultValues = (date) => {
  if (!date) return null;
  if (!(date instanceof Date)) {
    console.warn('start and end must be a valid date object in defaultValue prop');
    return null;
  }
  let customDate = getCustomDateObject(date);
  let time = getTime(12, date);
  return getActualDate(dateToInt(customDate), time);
}

const getIntDates = (provider) => {
  return {
    selectedDate1: provider.startDate ? provider.startDate._intDate : '',
    selectedDate2: provider.endDate ? provider.endDate._intDate : ''
  };
}

const getInitialValues = (defaultValue) => ({
  startDate: getDefaultValues(defaultValue ? defaultValue.startDate : null),
  endDate: getDefaultValues(defaultValue ? defaultValue.endDate : null),
});

const getTimesMemoized = (provider, rangeTillEndOfDay) => {
  const { startDate, endDate } = provider;
  let date1Time = { ...START_DATE_TIME };
  let date2Time = rangeTillEndOfDay ? { ...END_DATE_TIME_END_OF_DAY } : { ...END_DATE_TIME };

  if (startDate && startDate.customObject) {
    const { hours, minutes, period } = startDate.customObject;
    date1Time = { hours, minutes, period };
  }
  if (endDate && endDate.customObject) {
    const { hours, minutes, period } = endDate.customObject;
    date2Time = { hours, minutes, period };
  }
  return { date1Time, date2Time };
};

const Calendar = (props) => {
  const actualDate = new Date();
  const actualIntDate = dateToInt(getCustomDateObject(actualDate));

  const [state, dispatch] = useReducer(calendarReducer, getInitialState(actualDate));
  const { defaultValue, disableRange, provider, isVisible, onDateSelected = noHandler, selectTime, rangeTillEndOfDay, closeOnSelect, onClose = noHandler, footer } = props;

  const prevProviderRef = useRef(provider);
  const prevDefaultValueRef = useRef(defaultValue);

  useEffect(() => {
    if (prevDefaultValueRef.current !== defaultValue) {
      prevDefaultValueRef.current = defaultValue;

      const { startDate, endDate } = getInitialValues(defaultValue);
      if (endDate && !startDate) {
        console.warn('defaultValue prop must have a startDate if there is an endDate');
        return;
      }
      if (startDate) {
        updateProviderContext(provider, startDate, endDate);
        dispatch({ type: SET_DATE, date: startDate._date });
      }
    }
  }, [defaultValue, provider]);

  useEffect(() => {
    if (prevProviderRef.current !== provider) {
      prevProviderRef.current = provider;
    }
  }, [provider]);

  useEffect(() => {
    dispatch({ type: SET_ENABLE_RANGE, enableRange: disableRange !== true });

    if (!isVisible && isVisible !== undefined) {
      setTimeout(() => {
        dispatch({ type: TOGGLE_POPUP, popup: 'showMonthPopup', value: false });
        dispatch({ type: TOGGLE_POPUP, popup: 'showYearPopup', value: false });
        dispatch({ type: TOGGLE_POPUP, popup: 'showTimePopup', value: false });
      }, 300);
    }
  }, [disableRange, isVisible]);

  const handleDateChange = useCallback((increment) => {
    if (state.isAnimating) return;

    dispatch({ type: SET_ANIMATION, animationClass: increment === 1 ? ANIMATE_RIGHT : ANIMATE_LEFT });
    dispatch({ type: SET_IS_ANIMATING, isAnimating: true });

    setTimeout(() => {
      const newDate = new Date(state.date);
      newDate.setMonth(newDate.getMonth() + increment);

      dispatch({ type: SET_DATE, date: newDate });
      dispatch({ type: SET_ANIMATION, animationClass: '' });
      dispatch({ type: SET_IS_ANIMATING, isAnimating: false });
    }, 500);
  }, [state.date, state.isAnimating]);

  const onMonthChange = (increment) => handleDateChange(increment);

  const onMonthSelect = () => dispatch({ type: TOGGLE_POPUP, popup: 'showMonthPopup', value: true });

  const monthChanged = (monthIndex) => {
    const newDate = new Date(state.date);
    newDate.setMonth(monthIndex);
    dispatch({ type: SET_DATE, date: newDate });
    dispatch({ type: TOGGLE_POPUP, popup: 'showMonthPopup', value: false });
  };

  const onYearSelect = () => dispatch({ type: TOGGLE_POPUP, popup: 'showYearPopup', value: true });

  const yearChanged = (year) => {
    const newDate = new Date(state.date);
    newDate.setFullYear(year);
    dispatch({ type: SET_DATE, date: newDate });
    dispatch({ type: TOGGLE_POPUP, popup: 'showYearPopup', value: false });
  };

  const handleDateSelect = (date) => {
    const { date1Time, date2Time } = getTimesMemoized(provider, rangeTillEndOfDay);
    const { selectedDate1, selectedDate2 } = getIntDates(provider);

    let newState = { selectedDate1, selectedDate2 };
    let startDate, endDate;

    if (!state.enableRange && !!date) {
      dispatch({ type: TOGGLE_POPUP, popup: 'showTimePopup', value: !!selectTime ? true : state.showTimePopup });
      startDate = getActualDate(date, date1Time);
      updateProviderContext(provider, startDate, endDate);
      onDateSelected(startDate);
      !selectTime && closeOnSelect && onClose();
      return;
    }

    if (!selectedDate1) {
      newState.selectedDate1 = date;
      newState.selectedDate2 = null;
    } else if (!!selectedDate1 && !selectedDate2) {
      if (date < selectedDate1) {
        newState.selectedDate1 = date;
        newState.selectedDate2 = selectedDate1;
      } else {
        newState.selectedDate2 = date;
      }
    } else if (!!selectedDate1 && !!selectedDate2) {
      newState.selectedDate1 = date;
      newState.selectedDate2 = null;
    }

    const d1 = newState.selectedDate1;
    const d2 = newState.selectedDate2;
    newState.date2Time = d1 === d2 ? { ...END_DATE_TIME_END_OF_DAY } : date2Time;

    dispatch({ type: SET_DATE, date: new Date(state.date), ...newState });

    startDate = getActualDate(d1, date1Time);
    endDate = d2 ? getActualDate(d2, date2Time) : undefined;
    updateProviderContext(provider, startDate, endDate);
    onDateSelected(startDate, endDate);
    if (closeOnSelect && state.enableRange && endDate) {
      onClose();
    }
  };

  const selectToday = () => {
    if (state.isAnimating) return;

    const currentDate = new Date();
    const savedDate = new Date(state.date);
    const goingBack = currentDate < savedDate;
    dispatch({ type: SET_ANIMATION, animationClass: goingBack ? ANIMATE_LEFT : ANIMATE_RIGHT });

    const fDate = getActualDate(actualIntDate, { ...START_DATE_TIME });
    const lDate =  null;
    updateProviderContext(provider, fDate, lDate);

    onDateSelected(fDate, lDate);
    closeOnSelect && onClose();

    setTimeout(() => {
      dispatch({ type: SET_ANIMATION, animationClass: '' });
      dispatch({ type: SET_IS_ANIMATING, isAnimating: false });
    }, 500);
  };

  const selectDaysAgo = (value) => {
    if (state.isAnimating) return;
    // console.log(getDaysBefore(value))
    const fDate = state.enableRange ? getDaysBefore(value) : null;
    const lDate = getActualDate(actualIntDate, { ...END_DATE_TIME_END_OF_DAY });
    updateProviderContext(provider, fDate, lDate);

    onDateSelected(fDate, lDate);
    closeOnSelect && onClose();

    setTimeout(() => {
      dispatch({ type: SET_ANIMATION, animationClass: '' });
      dispatch({ type: SET_DATE, date: new Date(actualDate) });
      dispatch({ type: SET_IS_ANIMATING, isAnimating: false });
    }, 500);
  };

  const selectYTD = () => {
    if (state.isAnimating) return;

    const fDate = state.enableRange ? getFYFirstDate() : null;
    const lDate = getActualDate(actualIntDate, { ...END_DATE_TIME_END_OF_DAY });
    updateProviderContext(provider, fDate, lDate);

    onDateSelected(fDate, lDate);
    closeOnSelect && onClose();

    setTimeout(() => {
      dispatch({ type: SET_ANIMATION, animationClass: '' });
      dispatch({ type: SET_DATE, date: new Date(actualDate) });
      dispatch({ type: SET_IS_ANIMATING, isAnimating: false });
    }, 500);
  };

  const selectMTD = () => {
    if (state.isAnimating) return;

    const fDate = state.enableRange ? getMonthFirstDate() : null;
    const lDate = getActualDate(actualIntDate, { ...END_DATE_TIME_END_OF_DAY });
    updateProviderContext(provider, fDate, lDate);

    onDateSelected(fDate, lDate);
    closeOnSelect && onClose();

    setTimeout(() => {
      dispatch({ type: SET_ANIMATION, animationClass: '' });
      dispatch({ type: SET_DATE, date: new Date(actualDate) });
      dispatch({ type: SET_IS_ANIMATING, isAnimating: false });
    }, 500);
  };

  const onTimeSelected = (hours, minutes, period) => {
    let { date1Time, date2Time } = getTimesMemoized(provider, rangeTillEndOfDay);
    const { selectedDate1, selectedDate2 } = getIntDates(provider);

    if (selectedDate2) {
      date2Time = { hours, minutes, period };
    } else {
      date1Time = { hours, minutes, period };
      date2Time = !!rangeTillEndOfDay ? { ...END_DATE_TIME_END_OF_DAY } : { ...END_DATE_TIME };
    }
    dispatch({ type: TOGGLE_POPUP, popup: 'showTimePopup', value: false });

    const startDate = getActualDate(selectedDate1, date1Time);
    const endDate = !!selectedDate2 ? getActualDate(selectedDate2, date2Time) : undefined;
    updateProviderContext(provider, startDate, endDate);
    onDateSelected(startDate, endDate);
    if (closeOnSelect && state.enableRange && endDate) {
      onClose();
    } else if (closeOnSelect && !state.enableRange) {
      onClose();
    }
  };

  const memoizedCurrentMonth = useMemo(() => getNewMonthFrom(state.date, 0), [state.date]);
  const memoizedPrevMonth = useMemo(() => getNewMonthFrom(state.date, -1), [state.date]);
  const memoizedNextMonth = useMemo(() => getNewMonthFrom(state.date, 1), [state.date]);
  const { month, year } = useMemo(() => getCustomDateObject(state.date), [state.date]);

  return (
    <div className="full-date-picker-container">
      <div className="date-picker-content">
        <div className="date-picker">
          <MonthPicker
            months={monthsShort}
            selected={month}
            visible={state.showMonthPopup}
            onChange={monthChanged}
          />
          <YearPicker
            year={year}
            visible={state.showYearPopup}
            onChange={yearChanged}
          />
          <TimePicker
            visible={state.showTimePopup}
            onDone={onTimeSelected}
          />
          <Navigator
            month={monthsFull[month]}
            year={year}
            onMonthChange={onMonthChange}
            onSelectMonth={onMonthSelect}
            onSelectYear={onYearSelect}
          />
          <Grids
            prevMonth={memoizedPrevMonth}
            currentMonth={memoizedCurrentMonth}
            nextMonth={memoizedNextMonth}
            animationClass={state.animationClass}
            onDateSelect={handleDateSelect}
            rangeEnabled={state.enableRange}
          />
        </div>
        <Footer
          customFooter={footer}
          onToday={selectToday}
          onSevenday={() => selectDaysAgo(7)}
          onClose={onClose}
          showTime={!!selectTime}
        />
      </div>
      <SideBar
        onToday={selectToday}
        on3Day={() => selectDaysAgo(3)}
        onSevenday={() => selectDaysAgo(7)}
        OnMonth={() => selectDaysAgo(30)}
        on3Month={() => selectDaysAgo(90)}
        on6Month={() => selectDaysAgo(180)}
        on1Year={() => selectDaysAgo(365)}
        onThisMonth={selectMTD}
        onYTD={selectYTD}
        onClose={onClose}
        provider={provider}
      />
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
  return (
    <Context.Consumer>
      {provider => <Calendar {...props} provider={provider} />}
    </Context.Consumer>
  );
};