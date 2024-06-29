
import React, { useEffect, useState } from 'react';

import {
  SelectDays,
  dateToInt,
  getActualDate,
  getCustomDateObject,
  getNewMonthFrom,
  getTime,
  noHandler
} from '../../utils';

import { monthsFull, monthsShort } from '../../const';

import { Context } from '../context';
import Footer from '../footer';
import Grids from '../grids';
import MonthPicker from '../month-picker';
import Navigator from '../navigator';
import SideBar from '../sidebar';
import TimePicker from '../time-picker';
import YearPicker from '../year-picker';
import './index.scss';

const ANIMATE_LEFT = 'move-left';
const ANIMATE_RIGHT = 'move-right';
const START_DATE_TIME = {
  hours: '12',
  minutes: '00',
  period: 'AM'
};
const END_DATE_TIME = {
  hours: '12',
  minutes: '00',
  period: 'AM'
};
const END_DATE_TIME_END_OF_DAY = {
  hours: '11',
  minutes: '59',
  period: 'PM'
};

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

const getTimes = (provider, rangeTillEndOfDay) => {
  const { startDate, endDate } = provider;
  let date1Time = { ...START_DATE_TIME };
  let date2Time = rangeTillEndOfDay
    ? { ...END_DATE_TIME_END_OF_DAY }
    : { ...END_DATE_TIME };
  if (startDate && startDate.customObject) {
    const { hours, minutes, period } = startDate.customObject;
    date1Time = { hours, minutes, period };
  }
  if (endDate && endDate.customObject) {
    const { hours, minutes, period } = endDate.customObject;
    date2Time = { hours, minutes, period };
  }
  return {
    date1Time,
    date2Time
  };
}

const Calendar = (props) => {
  const actualDate = new Date();
  const actualIntDate = dateToInt(getCustomDateObject(actualDate));
  const [isAnimating, setIsAnimating] = useState(false);
  const [enableRange, setEnableRange] = useState(!props.disableRange);
  const [state, setState] = useState({
    date: new Date(actualDate),
    animationClass: '',
    showMonthPopup: false,
    showYearPopup: false,
    showTimePopup: false
  });
  // const prevIsVisibleRef = useRef(props.isVisible);
  const { defaultValue, disableRange, provider, isVisible } = props;

  useEffect(() => {
    let startDate = getDefaultValues(defaultValue ? defaultValue.startDate : null);
    let endDate = getDefaultValues(defaultValue ? defaultValue.endDate : null);
    if (endDate && !startDate) {
      console.warn(
        'defaultValue prop must have a startDate if there is an endDate'
      );
      return;
    }

    if (startDate) {
      provider.updateContext({
        startDate,
        endDate
      });
      setState({ ...state, date: startDate._date });
    }
  }, []);//props.defaultValue, props.provider, state

  useEffect(() => {
    setEnableRange(disableRange !== true);
    if (!isVisible && isVisible !== undefined) {
      setTimeout(() => {
        setState({
          ...state,
          showMonthPopup: false,
          showYearPopup: false,
          showTimePopup: false
        });
      }, 300);
    }
  }, []);//disableRange, isVisible

  const onMonthChange = (increment) => {
    if (isAnimating) return;
    setState((prevState) => ({
      ...prevState,
      animationClass: increment === 1 ? ANIMATE_RIGHT : ANIMATE_LEFT
    }));
    setIsAnimating(true);

    setTimeout(() => {
      setState((prevState) => {
        const { date } = prevState;
        date.setMonth(date.getMonth() + increment);
        return {
          ...prevState,
          animationClass: '',
          date
        };
      });
      setIsAnimating(false);
    }, 500);
  };

  const onMonthSelect = () => setState({ ...state, showMonthPopup: true });

  const monthChanged = (month, monthIndex) => {
    const { date } = state;
    date.setMonth(monthIndex);
    setState({ ...state, date, showMonthPopup: false });
  };

  const onYearSelect = () => setState({ ...state, showYearPopup: true });;

  const yearChanged = (year) => {
    const { date } = state;
    date.setFullYear(year);
    setState({ ...state, date, showYearPopup: false });
  };

  const onDateSelect = (date) => {
    const {
      onDateSelected = noHandler(),
      selectTime,
      provider,
      rangeTillEndOfDay,
      onClose,
      closeOnSelect
    } = props;

    const { date1Time, date2Time } = getTimes(provider, rangeTillEndOfDay);
    const { selectedDate1, selectedDate2 } = getIntDates(provider);

    const newState = { selectedDate1, selectedDate2 };

    if (!enableRange && !!date) {
      setState({ ...state, showTimePopup: !!selectTime ? true : showTimePopup });
      provider.updateContext({
        startDate: getActualDate(date, date1Time)
      });
      onDateSelected(getActualDate(date, date1Time));
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

    const d1 = newState.selectedDate1, d2 = newState.selectedDate2;

    newState.date2Time = d1 === d2 ? { ...END_DATE_TIME_END_OF_DAY } : date2Time;


    setState({ ...state, newState });

    const _startDate = getActualDate(d1, date1Time);
    const _endDate = getActualDate(d2, date2Time);

    provider.updateContext({
      startDate: _startDate,
      endDate: _endDate
    });

    onDateSelected(_startDate, _endDate);
    if (!!selectTime) {
      setState({ ...state, showTimePopup: true })
    } else if (!selectTime && d2) {
      closeOnSelect && onClose();
    }
  };

  const selectDays = () => {
    SelectDays({
      isAnimating,
      setIsAnimating,
      actualDate,
      actualIntDate,
      enableRange,
      state,
      setState,
      props,
      value:7
    });
  };

  const selectToday = () => {
    if (isAnimating) return;
    const { date } = state;
    const {
      selectTime,
      onDateSelected,
      provider,
      onClose,
      closeOnSelect
    } = props;
    const savedDate = getCustomDateObject(date);
    const currentDate = getCustomDateObject(new Date(actualDate));

    if (date === actualIntDate) {
      onDateSelect();
    }

    const goingBack =
      currentDate.year < savedDate.year ||
        (currentDate.year === savedDate.year &&
          currentDate.month < savedDate.month)
        ? true
        : false;

    if (goingBack) {
      setState({
        ...state,
        animationClass: ANIMATE_LEFT
      });
    } else if (currentDate.month > savedDate.month) {
      setState({
        ...state,
        animationClass: ANIMATE_RIGHT
      });
    }

    const fDate = getActualDate(actualIntDate, { ...START_DATE_TIME });
    const lDate = enableRange
      ? getActualDate(actualIntDate, { ...END_DATE_TIME_END_OF_DAY })
      : null;
    provider.updateContext({
      startDate: fDate,
      endDate: lDate
    });

    if (onDateSelected) {
      onDateSelected(fDate, lDate);
      closeOnSelect && onClose();
    }

    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        animationClass: '',
        date
      }));
        setIsAnimating(false);
      if (!enableRange && !!selectTime) {
        // this.showTime();
      }
    }, 500);
  };

  // const handleDaysAgo = (value) => {
  //   selectDaysAgo({ ...props, state, setState, isAnimating,setIsAnimating, onDateSelect }, value)
  // }

  const selectSevenDay = () => {
    if (isAnimating) return;
    const { date } = state;
    const {
      selectTime,
      onDateSelected,
      provider,
      onClose,
      closeOnSelect
    } = props;

    if (date === actualIntDate) {
      onDateSelect();
    }


    const fDate = enableRange
      ? getActualDate(actualIntDate - 7, { ...START_DATE_TIME })
      : null;
    const lDate = getActualDate(actualIntDate, { ...END_DATE_TIME_END_OF_DAY });
    provider.updateContext({
      startDate: fDate,
      endDate: lDate
    });

    if (onDateSelected) {
      onDateSelected(fDate, lDate);
      closeOnSelect && onClose();
    }

    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        animationClass: '',
        date: new Date(actualDate)
      }));
      setIsAnimating(false);
      if (!enableRange && !!selectTime) {
        // this.showTime();
      }
  }, 500);
};

const showTime = () => {
  setState({
    ...state,
    showTimePopup: true
  });
};

const closeTime = () => setState({
  ...state,
  showTimePopup: false
});;

const onTimeSelected = (hours, minutes, period) => {
  const {
    onDateSelected,
    rangeTillEndOfDay,
    closeOnSelect,
    onClose
  } = props;
  let { date1Time, date2Time } = getTimes(provider, rangeTillEndOfDay);
  const { selectedDate1, selectedDate2 } = getIntDates(provider);

  if (selectedDate2) {
    date2Time = { hours, minutes, period };
  } else {
    date1Time = { hours, minutes, period };
    date2Time = !!rangeTillEndOfDay
      ? { ...END_DATE_TIME_END_OF_DAY }
      : { ...END_DATE_TIME };
  }
  setState({
    ...state,
    showTimePopup: false
  })
  const _startDate = getActualDate(selectedDate1, date1Time);
  const _endDate = !!selectedDate2
    ? getActualDate(selectedDate2, date2Time)
    : void 0;
  provider.updateContext({
    startDate: _startDate,
    endDate: _endDate
  });
  onDateSelected(_startDate, _endDate);
  if (closeOnSelect && enableRange && _endDate) {
    onClose();
  } else if (closeOnSelect && !enableRange) {
    onClose();
  }
};

const {
  date,
  animationClass,
  showMonthPopup,
  showYearPopup,
  showTimePopup
} = state;

const { onClose = noHandler(), footer, selectTime } = props;
const prevMonth = getNewMonthFrom(date, -1);
const nextMonth = getNewMonthFrom(date, 1);
const currentMonth = getNewMonthFrom(date, 0);
const { month, year } = getCustomDateObject(date);

return (
  <div className="full-date-picker-container">
  <div className="date-picker-content">
    <div className="date-picker">
      <MonthPicker
        months={monthsShort}
        selected={month}
        visible={showMonthPopup}
        onChange={monthChanged}
      />
      <YearPicker
        year={year}
        visible={showYearPopup}
        onChange={yearChanged}
      />
      <TimePicker
        visible={showTimePopup}
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
        prevMonth={prevMonth}
        currentMonth={currentMonth}
        nextMonth={nextMonth}
        animationClass={animationClass}
        onDateSelect={onDateSelect}
        rangeEnabled={enableRange}
      />
    </div>
    <Footer
      customFooter={footer}
      onToday={selectToday}
      onSevenday={selectDays}
      onClose={onClose}
      showTime={!!selectTime}
    />
  </div>
  <div className="sidebar"><SideBar/> </div>
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


  // import React from 'react';

  // import {
  //   dateToInt,
  //   getActualDate,
  //   getCustomDateObject,
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

  // function getDefaultValues(date) {
  //   if (!date) return null;

  //   if (!date instanceof Date) {
  //     console.warn(
  //       ' start and end must be a valid date object in defaultValue prop '
  //     );
  //     return null;
  //   }

  //   let customDate = getCustomDateObject(date);
  //   let time = getTime(12, date);
  //   return getActualDate(dateToInt(customDate), time);
  // }


  // function getIntDates(provider) {
  //   return {
  //     selectedDate1: provider.startDate ? provider.startDate._intDate : '',
  //     selectedDate2: provider.endDate ? provider.endDate._intDate : ''
  //   };
  // }

  // function getTimes(provider, rangeTillEndOfDay) {
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
  // class Calander extends React.Component {
  //   actualDate = new Date();
  //   actualIntDate = dateToInt(getCustomDateObject(this.actualDate));
  //   //flag to prevent month change when the month slide animation is still running
  //   is_animating = false;
  //   enable_range = false;
  //   state = {
  //     date: new Date(this.actualDate),
  //     animationClass: '',
  //     showMonthPopup: false,
  //     showYearPopup: false,
  //     showTimePopup: false
  //   };

  //   componentDidMount() {
  //     const { defaultValue, disableRange, provider } = this.props;
  //     this.enable_range = disableRange !== true;
  //     let startDate = getDefaultValues(
  //       defaultValue ? defaultValue.startDate : null
  //     );
  //     let endDate = getDefaultValues(defaultValue ? defaultValue.endDate : null);

  //     if (endDate && !startDate) {
  //       console.warn(
  //         ' defaultValue prop must have a startDate if there is an endDate '
  //       );
  //       return;
  //     }

  //     if (startDate) {
  //       provider.updateContext({
  //         startDate,
  //         endDate
  //       });
  //       this.setState({ ...this.state, date: startDate._date });
  //     }
  //   }

  //   componentWillReceiveProps({ disableRange, isVisible }) {
  //     this.enable_range = disableRange !== true;
  //     if (!isVisible && this.props.isVisible !== isVisible) {
  //       // if calendar is hiding, make sure all the popup hide as well
  //       // so user dont see them next time when calendar is visible
  //       // using time-out with 300ms so hiding of popup transition is not visible to user when hide animation is running
  //       setTimeout(
  //         () =>
  //           this.setState({
  //             showMonthPopup: false,
  //             showYearPopup: false,
  //             showTimePopup: false
  //           }),
  //         300
  //       );
  //     }
  //   }

  //   onMonthChange = increment => {
  //     if (this.is_animating) return;
  //     this.setState({animationClass: increment === 1 ? ANIMATE_RIGHT : ANIMATE_LEFT})
  //     // if (increment === 1) {
  //     //   this.setState({
  //     //     animationClass: ANIMATE_RIGHT
  //     //   });
  //     // } else {
  //     //   this.setState({
  //     //     animationClass: ANIMATE_LEFT
  //     //   });
  //     // }
  //     this.is_animating = true;
  //     // added timeout of same time as animation, so after the animation is done we can remove the animation class
  //     setTimeout(() => {
  //       const { date } = this.state;
  //       date.setMonth(date.getMonth() + increment);
  //       this.setState(
  //         {
  //           animationClass: '',
  //           date: date
  //         },
  //         () => (this.is_animating = false)
  //       );
  //     }, 500);
  //   };

  //   onMonthSelect = () => {
  //     this.setState({
  //       showMonthPopup: true
  //     });
  //   };

  //   monthChanged = (month, monthIndex) => {
  //     const { date } = this.state;
  //     date.setMonth(monthIndex);
  //     this.setState({
  //       date,
  //       showMonthPopup: false
  //     });
  //   };

  //   onYearSelect = () => {
  //     this.setState({
  //       showYearPopup: true
  //     });
  //   };

  //   yearChanged = year => {
  //     const { date } = this.state;
  //     date.setFullYear(year);
  //     this.setState({
  //       date,
  //       showYearPopup: false
  //     });
  //   };

  //   onDateSelect = date => {
  //     const {
  //       onDateSelected = noHandler(),
  //       selectTime,
  //       provider,
  //       rangeTillEndOfDay,
  //       onClose,
  //       closeOnSelect
  //     } = this.props;
  //     const { showTimePopup } = this.state;
  //     const { date1Time, date2Time } = getTimes(provider, rangeTillEndOfDay);
  //     const { selectedDate1, selectedDate2 } = getIntDates(provider);

  //     const newState = {
  //       selectedDate1,
  //       selectedDate2
  //     };
  //     console.log(`new state = ${JSON.stringify(newState)}`)

  //     if (!this.enable_range && !!date) {
  //       this.setState({
  //         showTimePopup: !!selectTime ? true : showTimePopup
  //       });

  //       console.log(date,date1Time)
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
  //       // make sure selectedDate1 is always smaller then selectedDate2
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

  //     const d1 = newState.selectedDate1,
  //       d2 = newState.selectedDate2;

  //     newState.date2Time =
  //       d1 === d2 ? { ...END_DATE_TIME_END_OF_DAY } : date2Time;


  //       console.log(`this state is = > ${JSON.stringify(this.state)}`)
  //     console.log(`new state is = ${JSON.stringify(newState)}`)

  //     this.setState(newState);
  //     const _startDate = getActualDate(d1, date1Time);
  //     const _endDate = getActualDate(d2, date2Time);


  //     provider.updateContext({
  //       startDate: _startDate,
  //       endDate: _endDate
  //     });

  //     onDateSelected(_startDate, _endDate);
  //     if (!!selectTime) {
  //       this.showTime();
  //     } else if (!selectTime && d2) {
  //       closeOnSelect && onClose();
  //     }
  //     console.log(`Modified this state = > ${JSON.stringify(this.state)}`)
  //   };


  //   selectToday = () => {
  //     // return if cards are animating
  //     if (this.is_animating === true) return;

  //     const { date } = this.state;
  //     const {
  //       selectTime,
  //       onDateSelected,
  //       provider,
  //       onClose,
  //       closeOnSelect
  //     } = this.props;
  //     const savedDate = getCustomDateObject(date);
  //     const currentDate = getCustomDateObject(new Date(this.actualDate));

  //     if (date === this.actualIntDate) {
  //       this.onDateSelect();
  //     }

  //     const goingBack =
  //       currentDate.year < savedDate.year ||
  //       (currentDate.year === savedDate.year &&
  //         currentDate.month < savedDate.month)
  //         ? true
  //         : false;
  //     if (goingBack) {
  //       this.setState({
  //         animationClass: ANIMATE_LEFT
  //       });
  //     } else if (currentDate.month > savedDate.month) {
  //       this.setState({
  //         animationClass: ANIMATE_RIGHT
  //       });
  //     }

  //     const fDate = getActualDate(this.actualIntDate, { ...START_DATE_TIME });
  //     const lDate = this.enable_range
  //       ? getActualDate(this.actualIntDate, {
  //           ...END_DATE_TIME_END_OF_DAY
  //         })
  //       : null;
  //     provider.updateContext({
  //       startDate: fDate,
  //       endDate: lDate
  //     });

  //     if (onDateSelected) {
  //       onDateSelected(fDate, lDate);
  //       closeOnSelect && onClose();
  //     }

  //     // added timeout of same time as animation, so after the animation is done we can remove the animation class
  //     setTimeout(() => {
  //       this.setState(
  //         {
  //           animationClass: '',
  //           date: new Date(this.actualDate)
  //         },
  //         () => {
  //           this.is_animating = false;
  //           if (!this.enable_range && !!selectTime) {
  //             // this.showTime();
  //           }
  //         }
  //       );
  //     }, 500);
  //   };

  //   showTime = () => {
  //     this.setState({
  //       showTimePopup: true
  //     });
  //   };

  //   closeTime = () => {
  //     this.setState({
  //       showTimePopup: false
  //     });
  //   };

  //   onTimeSelected = (hours, minutes, period) => {
  //     const {
  //       onDateSelected,
  //       rangeTillEndOfDay,
  //       provider,
  //       closeOnSelect,
  //       onClose
  //     } = this.props;
  //     let { date1Time, date2Time } = getTimes(provider, rangeTillEndOfDay);
  //     const { selectedDate1, selectedDate2 } = getIntDates(provider);

  //     if (selectedDate2) {
  //       date2Time = {
  //         hours,
  //         minutes,
  //         period
  //       };
  //     } else {
  //       date1Time = {
  //         hours,
  //         minutes,
  //         period
  //       };
  //       date2Time = !!rangeTillEndOfDay
  //         ? { ...END_DATE_TIME_END_OF_DAY }
  //         : { ...END_DATE_TIME };
  //     }
  //     this.setState({
  //       showTimePopup: false
  //     });
  //     const _startDate = getActualDate(selectedDate1, date1Time);
  //     const _endDate = !!selectedDate2
  //       ? getActualDate(selectedDate2, date2Time)
  //       : void 0;
  //     provider.updateContext({
  //       startDate: _startDate,
  //       endDate: _endDate
  //     });
  //     onDateSelected(_startDate, _endDate);
  //     if (closeOnSelect && this.enable_range && _endDate) {
  //       onClose();
  //     } else if (closeOnSelect && !this.enable_range) {
  //       onClose();
  //     }
  //   };

  //   render() {
  //     const {
  //       date,
  //       animationClass,
  //       showMonthPopup,
  //       showYearPopup,
  //       showTimePopup
  //     } = this.state;
  //     const { onClose = noHandler(), footer, selectTime } = this.props;
  //     const prevMonth = getNewMonthFrom(date, -1);
  //     const nextMonth = getNewMonthFrom(date, 1);
  //     const currentMonth = getNewMonthFrom(date, 0);
  //     const { month, year } = getCustomDateObject(date);
  //     return (
  //       <div className="full-date-picker-container">
  //         <div>
  //           <div className="date-picker">
  //             <MonthPicker
  //               months={monthsShort}
  //               selected={month}
  //               visible={showMonthPopup}
  //               onChange={this.monthChanged}
  //             />
  //             <YearPicker
  //               year={year}
  //               visible={showYearPopup}
  //               onChange={this.yearChanged}
  //             />
  //             <TimePicker visible={showTimePopup} onDone={this.onTimeSelected} />
  //             <Navigator
  //               month={monthsFull[month]}
  //               year={year}
  //               onMonthChange={this.onMonthChange}
  //               onSelectMonth={this.onMonthSelect}
  //               onSelectYear={this.onYearSelect}
  //             />
  //             <Grids
  //               prevMonth={prevMonth}
  //               currentMonth={currentMonth}
  //               nextMonth={nextMonth}
  //               animationClass={animationClass}
  //               onDateSelect={this.onDateSelect}
  //               rangeEnabled={this.enable_range}
  //             />
  //           </div>
  //           <Footer
  //             customFooter={footer}
  //             onToday={this.selectToday}
  //             onClose={onClose}
  //             showTime={!!selectTime}
  //           />
  //         </div>
  //       </div>
  //     );
  //   }
  // }


  // export default function(props) {
  //   return (
  //     <Context.Consumer>
  //       {provider => <Calander {...props} provider={provider} />}
  //     </Context.Consumer>
  //   );
  // }

}