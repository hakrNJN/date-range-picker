// import React from 'react';
// import ReactDOM from 'react-dom';

// import Calendar from './calendar';
// import { Provider } from './context';
// import Placeholder from './placeholder';

// /*
//   apis ==>

//    onDateSelected (function)  - 'gets called when a date/range is selected and time selected',
//    onClose (function) - 'when your pressed ok/select button in footer'
//    disableRange (boolean) - 'if true user can select only one single'
//    selectTime (boolean) - if true time picker will show up each time a date gets selected
//    rangeTillEndOfDay (boolean) - if true end(last) date of range will have time of 11:59 PM(end of day) else it will have 12:00
//    selectTime(boolean) - show time picker if true after very date selection

//    placeholder (function which return a React Component) - if user wants custom placeholder, placeholder function will recieve following object as param
//       {startDate (date object),
//       endDate (date object)}
      
//    footer (function which return a React Component) - if user wants custom footer, footer will recieve following object as param
//       {startDate (date object)
//       endDate (date object)
//       today (function) - to select today's date
//       close (function) - closes the calendar and calls onClose API callback}

//  */

// const hiddenStyle = {
//   top: '-150%'
// }
// class RangePicker extends React.Component {
//   calendar_ref = React.createRef();
//   popup_ref = React.createRef();
//   isVisibilityControlled = false;
//   constructor(props) {
//     super(props);
//     this.isVisibilityControlled = typeof props.visible === 'boolean';
//     this.state = {
//       showCalendar: false,
//       style: hiddenStyle
//     };
//   }

//   componentDidMount() {
//     const { current: popup } = this.popup_ref;
//     window.addEventListener('mousedown', this.handleOutsideClick, false);
//     popup && popup.addEventListener('mousedown', this.preventBubbling, false);

//     if (this.isVisibilityControlled) {
//       this.setState({});
//     }
//   }

//   componentWillUnmount() {
//     const { current: popup } = this.popup_ref;
//     window.removeEventListener('mousedown', this.handleOutsideClick, false);
//     popup &&
//       popup.removeEventListener('mousedown', this.preventBubbling, false);
//   }

//   preventBubbling = e => {
//     e.stopPropagation();
//   };

//   handleOutsideClick = () => {
//     const { closeOnOutsideClick, onClose } = this.props;
//     if (closeOnOutsideClick === false) {
//       return;
//     }
//     const { showCalendar } = this.state;

//     // if calendar is hidden, return.
//     if (!showCalendar) {
//       return;
//     }

//     // if user clicked outside of the calendar then hide it
//     this.setState({
//       showCalendar: false
//     });

//     onClose && onClose();
//   };

//   calculateCalendarPosition = isVisible => {
//     const { current } = this.calendar_ref;
//     if (!current || !isVisible) return hiddenStyle;
//     const top = current.offsetTop;
//     const left = current.offsetLeft;
//     return {
//       left,
//       top
//     };
//   };

//   toggleCalendar = () => {
//     const { showCalendar } = this.state;
//     const { onOpen, visible } = this.props;
//     if (
//       (this.isVisibilityControlled && !visible) ||
//       (!this.isVisibilityControlled && !showCalendar)
//     ) {
//       onOpen && onOpen();
//     }

//     if (this.isVisibilityControlled) return;

//     let style = this.calculateCalendarPosition(!showCalendar);
//     this.setState({
//       showCalendar: !showCalendar,
//       style
//     });
//   };

//   onClose = () => {
//     const { onClose } = this.props;
//     this.toggleCalendar();
//     onClose && onClose();
//   };

//   onDateSelected = (startDate, endDate) => {
//     console.log(startDate,endDate)
//     const { onDateSelected } = this.props;
//     console.log(startDate._date,endDate._date)
//     const firstDate = startDate ? startDate._date : null;
//     const lastDate = endDate ? endDate._date : null;
//     onDateSelected && onDateSelected(firstDate, lastDate);
//     console.log(firstDate, lastDate)
//   };

//   render() {
//     const { showCalendar } = this.state;
//     const { placeholder, dateFormat, placeholderText } = this.props;
//     const visible = this.isVisibilityControlled
//       ? this.props.visible === true
//       : showCalendar;
//     const style = this.calculateCalendarPosition(visible);
//     return (
//       <Provider>
//         <div className="date-picker-app-wrapper" ref={this.calendar_ref}>
//           <div className="user-placeholder" onClick={this.toggleCalendar}>
//             <Placeholder
//               customPlaceholder={placeholder}
//               showTime={this.props.selectTime}
//               placeholder={placeholderText}
//               format={dateFormat}
//             />
//           </div>
//           {PortalCreator(
//             <div
//               style={style}
//               className={'calendar' + (visible ? ' visible' : '')}
//               ref={this.popup_ref}
//             >
//               <Calendar
//                 {...this.props}
//                 onDateSelected={this.onDateSelected}
//                 isVisible={visible}
//                 onClose={this.onClose}
//               />
//             </div>
//           )}
//         </div>
//       </Provider>
//     );
//   }
// }

// const PortalCreator = child => {
//   let container = document.getElementById('__range-picker-container');
//   if (!container) {
//     container = document.createElement('div');
//     container.id = '__range-picker-container';
//     document.body.appendChild(container);
//   }
//   return ReactDOM.createPortal(child, container);
// };

// export default RangePicker;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar';
import { Provider } from './context';
import Placeholder from './placeholder';

const hiddenStyle = {
  top: '-150%',
};

const RangePicker = (props) => {
  const {
    onDateSelected,
    onClose,
    closeOnOutsideClick = true,
    onOpen,
    visible,
    placeholder,
    dateFormat,
    placeholderText,
  } = props
  const calendarRef = useRef();
  const popupRef = useRef();

  const isVisibilityControlled = typeof visible === 'boolean';

  const [showCalendar, setShowCalendar] = useState(false);
  const [style, setStyle] = useState(hiddenStyle);

  useEffect(() => {
    const popup = popupRef.current;
    window.addEventListener('mousedown', handleOutsideClick, false);
    popup && popup.addEventListener('mousedown', preventBubbling, false);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick, false);
      popup && popup.removeEventListener('mousedown', preventBubbling, false);
    };
  }, []);

  useEffect(() => {
    if (isVisibilityControlled) {
      setStyle(calculateCalendarPosition(visible));
    }
  }, [visible]);

  const preventBubbling = (e) => {
    e.stopPropagation();
  };

  const handleOutsideClick = () => {
    if (closeOnOutsideClick === false) {
      return;
    }

    if (!showCalendar) {
      return;
    }

    setShowCalendar(false);
    onClose && onClose();
  };

  const calculateCalendarPosition = useCallback(
    (isVisible) => {
      const current = calendarRef.current;
      if (!current || !isVisible) return hiddenStyle;
      const top = current.offsetTop;
      const left = current.offsetLeft;
      return {
        left,
        top,
      };
    },
    [calendarRef]
  );

  const toggleCalendar = () => {
    if ((isVisibilityControlled && !visible) || (!isVisibilityControlled && !showCalendar)) {
      onOpen && onOpen();
    }

    if (isVisibilityControlled) return;

    const newStyle = calculateCalendarPosition(!showCalendar);
    setShowCalendar(!showCalendar);
    setStyle(newStyle);
  };

  const handleDateSelected = (startDate, endDate) => {
    const firstDate = startDate ? startDate._date : null;
    const lastDate = endDate ? endDate._date : null;
    onDateSelected && onDateSelected(firstDate, lastDate);
  };

  const handleClose = (startDate,endDate) => {
    toggleCalendar();
    onClose && onClose(startDate,endDate);
  };

  const currentVisible = isVisibilityControlled ? visible === true : showCalendar;
  const currentStyle = calculateCalendarPosition(currentVisible);

  return (
    <Provider>
      <div className="date-picker-app-wrapper" ref={calendarRef}>
        <div className="user-placeholder" onClick={toggleCalendar}>
          <Placeholder
            customPlaceholder={placeholder}
            showTime={props.selectTime}
            placeholder={placeholderText}
            format={dateFormat}
          />
        </div>
        {PortalCreator(
          <div
            style={currentStyle}
            className={'calendar' + (currentVisible ? ' visible' : '')}
            ref={popupRef}
          >
            <Calendar
              {...props}
              onDateSelected={handleDateSelected}
              isVisible={currentVisible}
              onClose={handleClose}
            />
          </div>
        )}
      </div>
    </Provider>
  );
};

const PortalCreator = (child) => {
  let container = document.getElementById('__range-picker-container');
  if (!container) {
    container = document.createElement('div');
    container.id = '__range-picker-container';
    document.body.appendChild(container);
  }
  return ReactDOM.createPortal(child, container);
};

export default RangePicker;
