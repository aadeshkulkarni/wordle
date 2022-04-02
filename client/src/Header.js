import React from 'react'

function Header({setHelpStatus}) {
    return (<header>
      <h1 style={{padding:"1rem",letterSpacing:"2px"}}><span onClick={()=>setHelpStatus(true)}><img src="help-icon.svg" style={{width:"25px",height:"25px"}}/></span> | Wordle</h1>
    </header>)
  }

export default Header