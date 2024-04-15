const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message.includes('logged') ) {
    return (
      <div className='success'>
        {message}
      </div>
    )
  } else {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
}

export default Notification