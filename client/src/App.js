import './App.css';
import React, { useState } from "react"
//importing componetns
import Header from "./components/Header.js"
import HowItWorks from "./components/HowItWorks.js"
import Email from "./components/Email.js"
import Popup from "./components/Popup.js"

import background from "./images/background.png"

import Axios from "axios"

function App() {

  const [email, setEmail] = useState("")
  const [number, setNumber] = useState()
  const [timestamp, setTimestamp] = useState()
  const [popupDisplay, setPopupDisplay] = useState("none")
  const [error, setError] = useState("")
  const [popupSentin, setPopupSentin] = useState("")

  function handleChange(event) {
    setEmail(event.target.value)
    // setting random number here because it wasnt working on press of the button
    let randomNumber = Math.floor(Math.random() * 10000);
    setNumber(randomNumber)
    setTimestamp(Date.now())
  }

  const handleClick = async (event) => {
    event.preventDefault()
    try {
      const newEmail = {email, number, timestamp}
      //setNumber! - done
      const registerRes = await Axios.post(
        "http://localhost:5000/users/enter",
        newEmail
      )
      //console.log(registerRes)
      //probably also reset variables
      setPopupSentin("Your number has been sent into our database. Good luck!")
    } catch (err) {
      if (err.response.data.msg) {
        setError(err.response.data.msg)
        setNumber("")
      }
    }
    setPopupDisplay("")
  }

  const okClick = (event) => {
    event.preventDefault()
    setPopupDisplay("none")
    setEmail("")
    setError("")
    setPopupSentin("")
  }

  return (
    <div className="App">
      <Header />
      <Popup 
        popupDisplay={popupDisplay} 
        okClick={okClick}
        number={number}
        error={error}
        popupSentin={popupSentin}
      />
      <Email 
        handleChange={handleChange} 
        handleClick={handleClick} 
        value={email}
        number={number}
      />
      <HowItWorks />
      <div className="background-div"></div>
    </div>
  );
}

export default App;
