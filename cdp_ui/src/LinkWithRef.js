// LinkWithRef.js (or LinkWithRef.tsx)
import React from 'react';
import { useMyContext } from './MyContext';

const LinkWithRef = React.forwardRef((props, ref) => {
  const { state } = useMyContext();

  // Destructure basename from state, providing a default if it's not available
  const { basename = '' } = state || {};

  return (
    <a {...props} ref={ref} data-basename={basename}>
      {props.children}
    </a>
  );
});

export default LinkWithRef;
