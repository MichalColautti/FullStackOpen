const Notification = ({ message }) => {
  if (message === "") {
    return null;
  }

  const notificationStyle = {
    padding: '10px',
    background: 'lightgrey',
    borderColor: 'green',
    borderRadius: '5px',
    color: 'green',
    borderWidth: '4px',
    borderStyle: 'solid',
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
