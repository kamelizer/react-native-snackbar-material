import React from 'react';
import Portal from '../portal';
import SnackContainer from './SnackContainer';

function notice(props) {
  const key = Portal.add(
    <SnackContainer {...props} onAnimationEnd={() => Portal.remove(key)} />,
  );
  return key;
}

export default {
  show(props) {
    return notice(props);
  },
  info(props) {
    props.type = 'info';
    return notice(props);
  },
  success(props) {
    props.type = 'success';
    return notice(props);
  },
  error(props) {
    props.type = 'error';
    return notice(props);
  },
  warning(props) {
    props.type = 'warning';
    return notice(props);
  },
};
