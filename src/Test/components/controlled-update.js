// import React from 'react';

// class ControlledUpdate extends React.Component {
//   shouldComponentUpdate({ shouldUpdate }) {
//     return shouldUpdate;
//   }
//   render() {
//     return this.props.children;
//   }
// }

// export default ControlledUpdate;


import React from 'react';

const ControlledUpdate = React.memo(({ shouldUpdate, children }) => {
  return <React.Fragment>{children}</React.Fragment>;
}, (prevProps, nextProps) => !nextProps.shouldUpdate);

export default ControlledUpdate;

// import React, { useEffect, useState } from 'react';

// const ControlledUpdate = ({ shouldUpdate, children }) => {
//   const [shouldRender, setShouldRender] = useState(true);

//   useEffect(() => {
//     if (shouldUpdate !== undefined) {
//       setShouldRender(shouldUpdate);
//     }
//   }, [shouldUpdate]);

//   if (!shouldRender) return null;

//   return <>{children}</>;
// };

// export default ControlledUpdate;