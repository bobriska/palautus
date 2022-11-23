const Notification = ({ message }) => {
    if (!message) {
      return null
    }
  
    return (
      <div className={message[0]}>
        {message[1]}
      </div>
    )
  }

  export default Notification