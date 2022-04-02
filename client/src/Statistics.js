import React from 'react'

const Statistics = ({ stats,setStatStatus }) => {
    
    return (
        <div style={{ display: 'relative', maxWidth: "600px", minWidth:"450px",padding: "0.5rem",paddingBottom:"1rem" }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: "pointer", fontSize:"1.2rem", fontWeight:"800"}} onClick={() => setStatStatus(false)}>X</div>
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