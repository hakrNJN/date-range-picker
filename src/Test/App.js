import React from 'react';
import './App.css';
import DatePicker from './components';

const App = () => {

  const onDateSelect = (startDate, endDate) => {
    console.log(
      ' date selected: startDate => %s , endDate => %s',
      startDate,
      endDate
    );
  };

  const onClose = (startDate, endDate) => {
    console.log(
      ' ok/select:  startDate => %s , endDate => %s ',
      startDate,
      endDate
    );
  };

  const PickerWithCustomePlaceholder = ({ onDateSelect }) => {
    const placeholder = ({ startDate, endDate }) => {
      let _startDate = '';
      let _endDate = '';
      if (startDate) {
        _startDate = `${startDate.getDate()}/${startDate.getMonth() +
          1}/${startDate.getFullYear()}`;
      }
  
      if (endDate) {
        _endDate = `${endDate.getDate()}/${endDate.getMonth() +
          1}/${endDate.getFullYear()}`;
      }
      return (
        <div>
          <div
            className="_placeholder"
            style={{ border: '1px solid gray', padding: '5px 10px' }}
          >
            {!_startDate ? 'click here ' : `${_startDate} - ${_endDate}`}
          </div>
        </div>
      );
    };
    return (
      <div>
        <br />
        <br />
        <h3>With custom placeholder</h3>
        <br />
        <DatePicker placeholder={placeholder} onDateSelect={onDateSelect} />
      </div>
    );
  };

  const date = new Date()
  console.log(date)
  return (
    <div className="App">
        <div>
          <DatePicker
            onDateSelected={onDateSelect}
            defaultValue={{
              startDate: date,
              endDate: ''
          }}
          
            onClose={onClose}
            onOpen={() => console.log(' openend')}
            // dateFormat="DD-MM-YYYY h:miA"
            // disableRange
            // rangeTillEndOfDay
            // selectTime
          />
        </div>
        <div>
          <h2> With custom footer</h2>
          <DatePicker
            onDateSelected={onDateSelect}
            onClose={onClose}
            disableRange
            // rangeTillEndOfDay
            selectTime
            footer={({ startDate, endDate, close, today }) => (
              <div
                style={{
                  border: '1px solid green',
                  padding: '2px, 10px',
                  minWidth: 200,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                {startDate ? startDate.getDate() : null}
                {endDate ? ', ' + endDate.getDate() : null}
                <button onClick={close}>OK</button>
                <button onClick={today}>Today</button>
              </div>
            )}
          />
        </div>
        <br />
        <div>
          <h2> With custom date format and placeholder text</h2>
          <DatePicker
            onDateSelected={onDateSelect}
            onClose={onClose}
            disableRange
            dateFormat="MMMM dd  YYYY @ h:mi A"
            placeholderText="Date of birth and time"
            selectTime
          />
        </div>
        <br />
        <div>
          <h2> Close onSelect </h2>
          <DatePicker
            onDateSelected={onDateSelect}
            onClose={onClose}
            disableRange
            dateFormat="MMMM dd  YYYY @ h:mi A"
            placeholderText="Date of birth and time"
            // selectTime
            closeOnSelect
          />
        </div>
        <br />
        <div>
          <h1> Controlled visibility </h1>
          <ControlledVisibility />
        </div>
        <br />
        <PickerWithCustomePlaceholder onDateSelect={onDateSelect} />
      </div>
  )
}

export default App






const ControlledVisibility =() => {
 const state = { visible: true };
 const onDateSelect = (f, l) => console.log(' date selecred ', f, l);
  return (
    <DatePicker
      onDateSelected={onDateSelect}
      defaultValue={{
        startDate: new Date(),
        endDate: ''
      }}
      onClose={() => this.setState({ visible: false })}
      onOpen={() => this.setState({ visible: true })}
      visible={this.state.visible}
      closeOnOutsideClick={false}
      // dateFormat="DD-MM-YYYY h:miA"
      // disableRange
      // rangeTillEndOfDay
      // selectTime
    />
  );
}

