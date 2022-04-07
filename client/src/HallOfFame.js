import React, { useState } from 'react'
import { InsertIntoBoard } from './network/words';

const HallOfFame = ({ setStatStatus, setShowHOF, category }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const enterHandler = async () => {
        if (name.trim() !== '') {
            const endTime = Date.now()
            const timer = Math.ceil(((endTime - localStorage.getItem("time")) / 1000))
            await InsertIntoBoard(name, category, timer)
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
            <input maxLength="15" className={`${error && 'error'}`} autoFocus type="text" placeholder="Your hall of fame name" onChange={(e) => { setName(e.target.value) }} value={name} />
            <button className="btn-enter" onClick={enterHandler}>Enter</button>
        </div>
    )
}

export default HallOfFame