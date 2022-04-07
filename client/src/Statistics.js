import React, { useEffect, useState } from 'react'
import { fetchLeaderboard } from './network/words';
const Statistics = ({ stats, setStatStatus }) => {
    //const lb = [{ rank: 1, name: 'Aadesh' }, { rank: 2, name: 'Harsha' }, { rank: 3, name: 'Manjeet' }, { rank: 4, name: 'Dalee' }, { rank: 5, name: 'Aditya' }, { rank: 6, name: 'Bhumika' }, { rank: 7, name: 'Rajat' }, { rank: 8, name: 'Naveen' }, { rank: 9, name: 'Pavithra' }, { rank: 10, name: 'Aadesh' }]
    const [leaderboard, setLeaderboard] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const leaderboard = await fetchLeaderboard();
            setLeaderboard(leaderboard);
        }
        fetchAPI();
    }, [])

    return (
        <div style={{ display: 'relative', maxWidth: "600px", minWidth: "400px", overflow: "hidden", padding: "1rem", paddingBottom: "1rem" }}>
            <div className="header" onClick={() => setStatStatus(false)}><img alt="close" src="close.svg" style={{ width: "24px", height: "24px" }} /></div>
            <h2 style={{ textAlign: "center" }}>Statistics</h2>
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
            <h2 style={{ textAlign: "center", marginBottom: "0" }}>Leaderboard</h2>
            <div className="leaderboard">
                {leaderboard.length > 0 ?
                    <div className="row title">
                        <span>Rank</span>
                        <span>Name</span>
                    </div> : <h5 style={{ width: "100%", textAlign: "center", marginBottom: "0" }}>No data available</h5>}
                {leaderboard.length > 0 && leaderboard.map((leader,index) => (<div className="row">
                    <span>{index+1}</span>
                    <span>{leader.name}</span>
                </div>))}
            </div>
        </div>
    )
}

export default Statistics