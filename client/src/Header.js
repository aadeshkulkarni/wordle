import React from 'react'

function Header({ setHelpStatus,setStatStatus }) {
  return (<header>
    <span onClick={() => setHelpStatus(true)}><img src="help-icon.svg" style={{ width: "25px", height: "25px" }} /></span>
    <h1 style={{ padding: "1rem", letterSpacing: "2px" }}>
     | Wordle | 
      </h1>
      <span style={{marginRight:"2rem"}} onClick={() => setStatStatus(true)}>Board</span>
    </header >)
}

export default Header