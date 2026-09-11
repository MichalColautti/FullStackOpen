const Notification = ({ message, isError }) => {
  if (message === "") {
    return null;
  }

  const notificationStyle = {
    padding: '10px',
    background: 'lightgrey',
    borderColor: isError ? 'red' : 'green',
    borderRadius: '5px',
    color: isError ? 'red' : 'green',
    borderWidth: '4px',
    borderStyle: 'solid',
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
