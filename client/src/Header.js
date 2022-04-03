import React from 'react'

function Header({ setHelpStatus,setStatStatus }) {
  return (<header style={{paddingRight:"2rem",}}>
    <span style={{cursor:"pointer"}} onClick={() => setHelpStatus(true)}><img src="help-icon.svg" style={{ width: "32px", height: "32px" }} /></span>
    <h1 className="app-title" >
     | Wordle |
      </h1>
      <span style={{cursor:"pointer"}} onClick={() => setStatStatus(true)}><img src="stats.svg" style={{ width: "32px", height: "32px" }} /></span>
    </header >)
}

export default Header