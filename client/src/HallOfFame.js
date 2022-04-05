import React, { useState } from 'react'
import { InsertIntoBoard } from './network/words';

const HallOfFame = ({ setStatStatus, setShowHOF, category }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const enterHandler = () => {
        if (name.trim() !== '') {
            const timer = localStorage.getItem("time")
            // API call to insert data
            // Switch to stats board
            InsertIntoBoard(name, category, timer)
            setShowHOF(false)
            setStatStatus(true)
        }
        else {
            setError(true)
        }
    }
    return (
        <div className="hallOfFame">
            <img src="halloffame.svg" alt="HallOfGame" />
            <label style={{ fontSize: "1.3rem", color: "#50c7af", fontWeight: "700" }}>Congratulations!</label>
            <label style={{ fontSize: "1rem" }}>You've entered our Hall of Game!</label>
            <input maxlength="15" className={`${error && 'error'}`} autoFocus type="text" placeholder="Your hall of fame name" onChange={(e) => { setName(e.target.value) }} value={name} />
            <button className="btn-enter" onClick={enterHandler}>Enter</button>
        </div>
    )
}

export default HallOfFame