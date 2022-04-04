import React from 'react'

const Statistics = ({ stats,setStatStatus }) => {
    
    return (
        <div style={{ display: 'relative', maxWidth: "600px", minWidth:"400px",overflow:"hidden",padding: "1rem",paddingBottom:"1rem" }}>
            <div className="header" onClick={() => setStatStatus(false)}><img alt="close" src="close.svg" style={{ width: "24px", height: "24px" }} /></div>
            <h1 style={{textAlign:"center"}}>Statistics</h1>
            <div className="stat-container">
            <div className="stat">
                <span className="figures">{stats.played}</span>
                <span>Played</span>
            </div>
            <div className="stat">
                <span className="figures">{stats.winPercentage}</span>
                <span>Win %</span>
            </div>
            <div className="stat">
                <span className="figures">{stats.streak}</span>
                <span>Current Streak</span>
            </div>
            <div className="stat">
                <span className="figures">{stats.maxStreak}</span>
                <span>Max Streak</span>
            </div>
            </div>
        </div>
    )
}

export default Statistics