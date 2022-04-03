import React from 'react'

function Header({ setHelpStatus,setStatStatus }) {
  return (<header>
    <span style={{cursor:"pointer"}} onClick={() => setHelpStatus(true)}><img src="help-icon.svg" style={{ width: "32px", height: "32px" }} /></span>
    <h1 style={{ padding: "1rem", letterSpacing: "2px" }}>
     | Wordle | 
      </h1>
      <span style={{marginRight:"2rem",cursor:"pointer"}} onClick={() => setStatStatus(true)}><img src="stats.svg" style={{ width: "32px", height: "32px" }} /></span>
    </header >)
}

export default Header