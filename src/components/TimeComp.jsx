import React, { useState, useEffect } from 'react'
import "../css/home.css"
import Lottie from 'lottie-react';
import sun from "../lottie/sun.json"
import moon from "../lottie/moon.json"
function TimeComp() {

  const user = "karthik"
  const [time, setTime] = useState('00:00 am')
  const [hrs, setHrs] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const formatedHours = hours % 12 || 12;
      const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      setTime(`${formatedHours}:${formatedMinutes}:${formatedSeconds}${ampm}`)
      setHrs(hours)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])
  return (
    <div style={{}} className='time-comp'>
      <pre className="time">{time}</pre>
      {
        hrs >= 18 ? (<div className='day-night' >
          <Lottie animationData={moon} />
        </div>) : (<div className='day-night'>
          <Lottie animationData={sun} />
        </div>)
      }

    </div>
  )
}

export default TimeComp