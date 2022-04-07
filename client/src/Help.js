import React from 'react'

const Help = ({ setHelpStatus }) => {
    return (
        <div style={{ display: 'relative', maxWidth: "600px", padding: "0.75rem", paddingBottom: "1rem" }}>
            <div className="header" onClick={() => setHelpStatus(false)}><img alt="close" src="close.svg" style={{ width: "24px", height: "24px" }} /></div>
            <h1 style={{ textAlign: "center", fontWeight:"300",borderBottom:"1px solid #FFF", padding:"8px 0"}}>WORDLE</h1>
            <h3 style={{ textAlign: "center" }}>HOW TO PLAY</h3>
            <p>Guess the <strong>WORDLE</strong> in five tries.
            </p>
            <p>Each guess must be a valid five-letter word. Hit the enter button to submit.
            </p>
            <p>After each guess, the color of the tiles will change to show how close your guess was to the word.
            </p>
            <hr />
            <h3>Examples</h3>

            <div style={{ maxWidth: "500px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div className={`box exact-match`}>W</div>
                <div className={`box `}>E</div>
                <div className={`box `}>A</div>
                <div className={`box `}>R</div>
                <div className={`box `}>Y</div>
            </div>
            <p>The letter W is in the word and in the correct spot.</p>
            <div style={{ maxWidth: "500px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div className={`box `}>P</div>
                <div className={`box partial-match`}>I</div>
                <div className={`box `}>L</div>
                <div className={`box `}>L</div>
                <div className={`box `}>S</div>
            </div>
            <p>The letter I is in the word but in the wrong spot.</p>
            <div style={{ maxWidth: "500px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div className={`box`}>V</div>
                <div className={`box`}>A</div>
                <div className={`box`}>G</div>
                <div className={`box no-match`}>U</div>
                <div className={`box`}>E</div>
            </div>
            <p>The letter U is not in the word in any spot.</p>
            <hr />
            <strong>A new WORDLE will be available each day!</strong>
        </div>
    )
}

export default Help